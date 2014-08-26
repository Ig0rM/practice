var startingPage = 0;
var limit = 3;
var counter; //number of the list of articles
var lastPage = false;
//adds element article
var showPosts = function(startingPage, limit){
	//to save progress whe page reloads
	$.ajax({url:"http://localhost:9000/api/posts?limit=" + (limit+1) + "&page=" + startingPage, type:'GET', success:function(result){
		var article = JSON.parse(result);
		//if there war 3 las articles, its using to set flag which indicates that nex page will be blank
		if((article.length < (limit+1)) || (article.length == limit) ){
		 	lastPage = true;
		}else{
		 	lastPage = false;
		}

		var j;
		if(article.length == 4){
		 	j = 2;
		}else{
		 	j = 1;
		}
		for (var i = article.length-j; i >= 0; i--) {
		//inserts article before pagination buttons
			$("#pagination").before("<div id='articlePreview'><div id='articleName'><a href='#'>"+ article[i].title +"</a></div><div id='previewText'><p class='previewText'>" + article[i].content + "</p></div><div id='date'><span id='author'>Posted by: <i>" + article[i].author + "</i></span><span id='actualDate'><a href='#'> " + article[i].date + "</a></span><span id='comments'><a href='#'> Comments(7)</a></span><span id='readMore'><a href='#'> Read more</a></span></div>");
		}
		$('#pagenum').text("Page " + counter);
	}});
};



if(url('#limit') && url('#page')){
	limit = parseInt(url('#limit'));
	startingPage = parseInt(url('#page'));
	console.log(startingPage);
}

counter = startingPage/limit + 1;
//show posts when page is loaded
showPosts(startingPage, limit);

//when push prevPage button
$('#nextPage').on('click', function(){
	if(!lastPage){
		counter++;
		
		for(var i=0; i < limit; i++){
			if($('#articlePreview')){
				$('#articlePreview').remove();
			}
		}

		startingPage += limit;
		window.location.hash = "#limit=" + limit + "&page=" + startingPage;
		showPosts(startingPage, limit);
	}
});

//when push next page button
$('#prevPage').on('click', function(){
	if (startingPage >= limit){
		startingPage -= limit;
		window.location.hash = "#limit=" + limit + "&page=" + startingPage;
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
