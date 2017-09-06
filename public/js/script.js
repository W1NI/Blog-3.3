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


$("button").click(function(){
    $.post("https://www.googleapis.com/blogger/v3/blogs/5369044160670472941/posts?key=AIzaSyCgFuyPgeFu3SdmhX9PeiVTcfvf-8Qvyy4",
    {
      title: "Donald Duck",
      content: "Duckburg"
    },
    function(data,status){
        alert("Data: " + data + "\nStatus: " + status);
    });
});

$('#post-button').click(function(){
  var blogTitle = $('#post-title').val();
  console.log(blogTitle);
  var blogContent = $('#blog-post-content').val();
  console.log(blogContent);
});
