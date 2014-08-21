var startingPage = 0;
var limit = 3;
var counter = 1; //number of the list of articles

//adds element article
var showPosts = function(startingPage, limit){
	$.ajax({url:"http://localhost:9000/api/posts?limit=" + limit + "&page=" + startingPage, type:'GET', success:function(result){
	  var article = JSON.parse(result);

		for (var i = article.length-1; i >= 0; i--) {
			//inserts article before pagination buttons
		  $("#pagination").before("<div id='articlePreview'><div id='articleName'><a href='#'>"+ article[i].title +"</a></div><div id='previewText'><p class='previewText'>" + article[i].content + "</p></div><div id='date'><span id='author'>Posted by: <i>" + article[i].author + "</i></span><span id='actualDate'><a href='#'> " + article[i].date + "</a></span><span id='comments'><a href='#'> Comments(7)</a></span><span id='readMore'><a href='#'> Read more</a></span></div>");
		}
		$('#pagenum').text("Page " + counter);
	}});
};

//show posts when page is loaded
showPosts(startingPage, limit);


//when push prevPage button
$('#nextPage').on('click', function(){
	counter++;

	for(var i=0; i < limit; i++){
		if($('#articlePreview')){
			$('#articlePreview').remove();
		}
	}

	startingPage += limit;
	showPosts(startingPage, limit);
});

//when push next page button
$('#prevPage').on('click', function(){

	if (startingPage >= limit){
		startingPage -= limit;
		counter--;
	}

	for(var i=0; i < limit; i++){
		if($('#articlePreview')){
			$('#articlePreview').remove();
		}
	}

	showPosts(startingPage, limit);
});



$('#hmenu p').on('mousemove', function() {
  $(this).css('background-image', '../images/hmenuarrowhover.gif');
  $(this).css('background-color', '#2A3E59');
  $(this).css('border-bottom', '3px solid navy');
  $(this).find('a').css('color', '#FFFFFF');

});

$('#hmenu p').on('mouseleave', function() {
  $(this).css('background-image', '../images/hmenuarrow.gif');
  $(this).css('background-color', '#CBCBCB');
  $(this).css('border-bottom', '3px solid #A5A1A1');
  $(this).find('a').css('color', 'black');
});
