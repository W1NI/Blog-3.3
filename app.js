var express = require("express");
var path = require("path");
var readline = require('readline');
var google = require('googleapis');
var config = require('./config');


var app = express();
var OAuth2Client = google.auth.OAuth2;
var plus = google.plus('v1');


var CLIENT_ID = config.clientID;
var CLIENT_SECRET = config.clientSecret;
var REDIRECT_URL = 'http://localhost:3000';

var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getAccessToken (oauth2Client, callback) {
  // generate consent page url
  var url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/plus.me' 
  });

  console.log('Visit the url: ', url);
  rl.question('Enter the code here:', function (code) {
    // request access token
    oauth2Client.getToken(code, function (err, tokens) {
      if (err) {
        return callback(err);
      }
      // set tokens to the client
      // TODO:
      oauth2Client.setCredentials(tokens);
      callback();
    });
  });
}


getAccessToken(oauth2Client, function () {
  // retrieve user profile
  plus.people.get({ userId: 'me', auth: oauth2Client }, function (err, profile) {
    if (err) {
      return console.log('An error occured', err);
    }
    console.log(profile.displayName, ':', profile.tagline);
  });
});




app.use(function(request, response, next){
  console.log(`${request.method} request for ${request.url}`);
  next();
});

app.use(express.static("./public"));
app.use('/jquery', express.static(path.join(__dirname, "node_modules/jquery/dist")))

app.listen(3000);

console.log("Server running on port 3000");
