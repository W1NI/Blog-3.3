var express = require('express');
var cors = require('cors');
var config = require('./config');
var path = require('path');
var app = express();
var bodyParser = require("body-parser");
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

var blogger = google.blogger('v3');

var tokens;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.use(function(request, response, next){
	console.log(`${request.method} request for ${request.url}`);
	next();
});


app.post('/createGoogleBloggerPost', blogPost);
app.get("/sendPost", blogCallBack);

function getOAuthClient() {
    return new OAuth2(config.ClientID, config.ClientSecret, 'http://localhost:3000/sendPost');
}

function getAuthUrl() {
    var oauth2Client = getOAuthClient();
    var url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/blogger'
    });
    return url;
}

var body;
function blogPost(req, res, next){
    body = req.body;
 	var params = {
        auth: getAuthUrl()
    };
    res.json(params.auth);
}


function blogCallBack(req, res) {
    var oauth2Client = getOAuthClient();
    var code = req.query.code;
    oauth2Client.getToken(code, function (err, tokens) {

        if (!err) {
            oauth2Client.setCredentials(tokens);
            blogger.posts.insert({
                auth: oauth2Client,
                blogId: '5369044160670472941',
                resource: {
                  title: body['title'],
                  content: body['content']
                }
            }, function(){
                return res.redirect('/');
            });
        } else {
            console.log('Error Getting BloggerAPI Token', err);
        }
    });
}

app.use(express.static("./public"));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use('/config', express.static(path.join(__dirname)));

app.listen(3000);

console.log("Server running on port 3000");







// var express = require("express");
// var path = require("path");
// var readline = require('readline');
// var google = require('googleapis');
// var config = require('./config');
// var cors = require('cors');
//
// var app = express();
// var OAuth2Client = google.auth.OAuth2;
// var plus = google.plus('v1');
//
//
// var CLIENT_ID = config.clientID;
// var CLIENT_SECRET = config.clientSecret;
// var REDIRECT_URL = 'http://localhost:3000';
//
// var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
//
// var rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });
//
// function getAccessToken (oauth2Client, callback) {
//   // generate consent page url
//   var url = oauth2Client.generateAuthUrl({
//     access_type: 'offline', // will return a refresh token
//     scope: 'https://www.googleapis.com/auth/plus.me' // can be a space-delimited string or an array of scopes
//   });
//
//   console.log('Visit the url: ', url);
//   rl.question('Enter the code here:', function (code) {
//     // request access token
//     oauth2Client.getToken(code, function (err, tokens) {
//       if (err) {
//         return callback(err);
//       }
//       // set tokens to the client
//       // TODO:
//       oauth2Client.setCredentials(tokens);
//       callback();
//     });
//   });
// }
//
//
// getAccessToken(oauth2Client, function () {
//   // retrieve user profile
//   plus.people.get({ userId: 'me', auth: oauth2Client }, function (err, profile) {
//     if (err) {
//       return console.log('An error occured', err);
//     }
//     console.log(profile.displayName, ':', profile.tagline);
//   });
// });
//
//
//
//
// app.use(function(request, response, next){
//   console.log(`${request.method} request for ${request.url}`);
//   next();
// });
//
// app.use(express.static("./public"));
// app.use('/jquery', express.static(path.join(__dirname, "node_modules/jquery/dist")))
//
// app.listen(3000);
//
// console.log("Server running on port 3000");
