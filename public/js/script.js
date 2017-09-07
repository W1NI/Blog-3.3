var APIKey;
$.ajax({
	url: "config/config.json",
	dataType:"json",
	success:function(data){
		APIKey = data.APIKey
		getPosts();
	}
});

function getPosts(){
	$.ajax({
		url: "https://www.googleapis.com/blogger/v3/blogs/5369044160670472941/posts?key="+APIKey,
		type: "GET",
		dataType:"jsonp",
		beforeSend: function(x) {
			if (x && x.overrideMimeType) {
			  x.overrideMimeType("application/j-son;charset=UTF-8");
			}
		},
	    success: function(result) {
	    	var posts = result.items;
	    	for (var i = 0; i < posts.length; i++) {
	    		$("#Posts").append("<div class='pulledPosts'><h3>"+posts[i].title+"</h3><p>"+posts[i].content+"</p></div><br><hr>");
	    	};
	    }
	})
}

$("#postForm").submit(function(event){

	event.preventDefault();
	console.log("form sent");
	var title = $("#title").val();
	var content = $("#content").val();
	var url = "http://localhost:3000/createGoogleBloggerPost";
	if(title.length == 0){
		alert("please enter a title");
		return;
	}
	if(content.length == 0){
		alert("please enter some content");
		return;
	}
	$.ajax({
		url: url,
		type: "post",
		data: { title: title, content : content},
		dataType:"json",
        success: function(result) {
   			console.log(result);
        	window.location = result;
        },
        error:function(error){
        	console.log(error);
        }
	})
});








// // alert("working");
// var url = "https://blogger33333formative.blogspot.co.nz/";
// var id = 5369044160670472941;
// var key = "AIzaSyCgFuyPgeFu3SdmhX9PeiVTcfvf-8Qvyy4"
//
// $.get("https://www.googleapis.com/blogger/v3/blogs/5369044160670472941/posts?key=AIzaSyCgFuyPgeFu3SdmhX9PeiVTcfvf-8Qvyy4", function(data){
//   for (var i = 0; i < data.items.length; i++) {
//     console.log(data.items[i].title);
//   }
// });
//
// // $.post("https://www.googleapis.com/blogger/v3/blogs/5369044160670472941/posts?key=AIzaSyCgFuyPgeFu3SdmhX9PeiVTcfvf-8Qvyy4", function(data) {
// //   "title": "Second Post",
// //   "content": "Content version 2"
// // });
//
//
// // POST https://www.googleapis.com/blogger/v3/blogs/8070105920543249955/posts/
// // Authorization: /* OAuth 2.0 token here */
// // Content-Type: application/json
// //
// // {
// //   "kind": "blogger#post",
// //   "blog": {
// //     "id": "8070105920543249955"
// //   },
// //   "title": "A new post",
// //   "content": "With <b>exciting</b> content..."
// // }
//
//
// $("button").click(function(){
//     $.post("https://www.googleapis.com/blogger/v3/blogs/5369044160670472941/posts/",
//     {
//       "kind": "blogger#post",
//       "blog": {
//         "id": "8070105920543249955"
//       },
//       "title": "A new post",
//       "content": "With <b>exciting</b> content..."
//     })
// });
//
//
//
// // $("button").click(function(){
// //     $.post("https://www.googleapis.com/blogger/v3/blogs/5369044160670472941/posts?key=AIzaSyCgFuyPgeFu3SdmhX9PeiVTcfvf-8Qvyy4",
// //     {
// //       title: "Donald Duck",
// //       content: "Duckburg"
// //     },
// //     function(data,status){
// //         alert("Data: " + data + "\nStatus: " + status);
// //     });
// // });
//
// $('#post-button').click(function(){
//   var blogTitle = $('#post-title').val();
//   console.log(blogTitle);
//   var blogContent = $('#blog-post-content').val();
//   console.log(blogContent);
// });
