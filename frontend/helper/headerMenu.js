var startingPage = 0;
var limit = 3;
var counter; //number of the list of articles
var lastPage = false;
var isEdited = false;
var article;
//adds element article
var showPosts = function(startingPage, limit){
	//to save progress whe page reloads
	$.ajax({url:"http://localhost:9000/api/posts?limit=" + (limit+1) + "&page=" + startingPage, type:'GET', success:function(result){
		article = JSON.parse(result);
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
			$("#newPosts").after("<div class='articlePreview' id=" 
				+ article[i].id 
				+ "><span><button class='editButton' id=" 
				+ article[i].id 
				+ " value=" 
				+ article[i].id 
				+ ">e</button></span><span><button class='delButton' id=" 
				+ article[i].id 
				+ " value=" 
				+ article[i].id 
				+ ">x</button></span><div class='articleName' id="
				+ article[i].id 
				+"><a href='#'>"
				+ article[i].title 
				+"</a></div><div calss='previewText' id="
				+ article[i].id 
				+"><p class='previewText' id="
				+ article[i].id 
				+">" 
				+ article[i].content 
				+ "</p></div><div class='date' id="
				+ article[i].id 
				+"><span class='author' id="
				+ article[i].id 
				+">Posted by: <i>" 
				+ article[i].author 
				+ "</i></span><span class='actualDate' id="
				+ article[i].id 
				+"><a href='#'> " 
				+ article[i].date 
				+ "</a></span><span class='comments' id="
				+ article[i].id 
				+"><a href='#'> Comments(7)</a></span><span class='readMore' id="
				+ article[i].id 
				+"><a href='#'> Read more</a></span></div>");
		}
		$('#pagenum').text("Page " + counter);

		//adds deletion of article preview
		$('.delButton').each(function(){
			$(this).on('click', function(){
				if(confirm("You want to delete this article?")){
			    $.ajax({url:"http://localhost:9000/api/posts?id=" + $(this).val(), type:'DELETE',success:function(result){

			    }});
			    $('#' + $(this).val()).fadeOut('normal');
			  }
		  });
		}); 


		//adds edition of article preview
		$('.editButton').each(function(){
			$(this).on('click', function(){
				if(!isEdited){
					isEdited = true;
			//	if(confirm("You want to edit this article?")){
			    $.ajax({url:"http://localhost:9000/api/posts/show?id=" + $(this).val(), type:'GET',success:function(result){
			    	article = JSON.parse(result);
			    	
			    	//console.log(article.title);
			    }});
			    
			    $('#' + $(this).val()).after(
			    		'<form action="#" id="editForm">Title: <input id="editTitle" name="title" type="text" value='
			    		+ $('#' + $(this).val() + '.articleName').text() //article.title 
			    		+'> </br></br>Text: </br><textarea id="editText" name="text" rows="5" cols="95"  value="">'
			    		+ $('#' + $(this).val() + '.previewText').text()
			    		+'</textarea></br></br><div id="editAuthor">Author: <input id="editAuthorName" name="author" type="text" value='
			    		+ $('#' + $(this).val() + '.author i').text()
			    		+'></div></br></br><input class="submitEditedArticle" type="submit" name="submitEditedArticle" class="button" value="Confirm"/></form>'
			    		);
			    /*$('#' + $(this).val() +'.articlePreview').fadeOut('normal');
			    $('#editForm').fadeIn(400);*/
			    $('#editForm').slideDown(400);
			    var id = $(this).val();
			    $('#editForm').submit(function() {
				    $.ajax({url:"http://localhost:9000/api/posts?title=" + $('#editTitle').val() + "&author=" + $('#editAuthorName').val() +"&text=" + $('#editText').val() + "&id=" + id, type:'PUT',success:function(result){
				    	$('#editForm').remove();
				    }});
				    isEdited = false;
				  });
				}else{
					//nothing
				}  
		  });
		});
	}});
};

if(url('#limit') && url('#page')){
	limit = parseInt(url('#limit'));
	startingPage = parseInt(url('#page'));
}

counter = startingPage/limit + 1;
//show posts when page is loaded
showPosts(startingPage, limit);

//when push prevPage button
$('#nextPage').on('click', function(){
	if(!lastPage){
		counter++;
		
		for(var i=0; i < limit; i++){
			if($('.articlePreview')){
				$('.articlePreview').remove();
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
		if($('.articlePreview')){
			$('.articlePreview').remove();
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
