// alert("working");
var url = "https://blogger33333formative.blogspot.co.nz/";
var id = 5369044160670472941;
var key = "AIzaSyCgFuyPgeFu3SdmhX9PeiVTcfvf-8Qvyy4"

$.get("https://www.googleapis.com/blogger/v3/blogs/5369044160670472941/posts?key=AIzaSyCgFuyPgeFu3SdmhX9PeiVTcfvf-8Qvyy4", function(data){
  console.log(data);
});

// $.post("https://www.googleapis.com/blogger/v3/blogs/5369044160670472941/posts?key=AIzaSyCgFuyPgeFu3SdmhX9PeiVTcfvf-8Qvyy4", function(data) {
//   "title": "Second Post",
//   "content": "Content version 2"
// });


// POST https://www.googleapis.com/blogger/v3/blogs/8070105920543249955/posts/
// Authorization: /* OAuth 2.0 token here */
// Content-Type: application/json
//
// {
//   "kind": "blogger#post",
//   "blog": {
//     "id": "8070105920543249955"
//   },
//   "title": "A new post",
//   "content": "With <b>exciting</b> content..."
// }


$("button").click(function(){
    $.post("https://www.googleapis.com/blogger/v3/blogs/5369044160670472941/posts/",
    {
      "kind": "blogger#post",
      "blog": {
        "id": "8070105920543249955"
      },
      "title": "A new post",
      "content": "With <b>exciting</b> content..."
    })
});



// $("button").click(function(){
//     $.post("https://www.googleapis.com/blogger/v3/blogs/5369044160670472941/posts?key=AIzaSyCgFuyPgeFu3SdmhX9PeiVTcfvf-8Qvyy4",
//     {
//       title: "Donald Duck",
//       content: "Duckburg"
//     },
//     function(data,status){
//         alert("Data: " + data + "\nStatus: " + status);
//     });
// });

$('#post-button').click(function(){
  var blogTitle = $('#post-title').val();
  console.log(blogTitle);
  var blogContent = $('#blog-post-content').val();
  console.log(blogContent);
});
