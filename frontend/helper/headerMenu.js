var startingPage = 0;
var limit = 3;
var counter; //number of the list of articles
var lastPage = false;
var isEdited = false;
var article;
var posts;
var id;
//adds element article
var showPosts = function(startingPage, limit){
	posts = {
		limit: limit+1,
		page: startingPage
	};
	//to save progress whe page reloads
	$.ajax({
		url:"/api/posts", 
		type:'GET',
		data: posts,
		success:function(result){
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
				$("#newPosts").after("<div class='articlePreview' id='articlePreview-" 
					+ article[i].id 
					+ "'><span><button class='editButton' id='editButton-" 
					+ article[i].id 
					+ "' value=" 
					+ article[i].id 
					+ ">e</button></span><span><button class='delButton' id='delButton-" 
					+ article[i].id 
					+ "' value=" 
					+ article[i].id 
					+ ">x</button></span><div class='articleName' id='articleName-"
					+ article[i].id 
					+"'><a href='#'>"
					+ article[i].title 
					+"</a></div><div><p class='previewText' id='previewText-"
					+ article[i].id 
					+"'>"
					+ article[i].content 
					+ "</p></div><div class='date' id='date-"
					+ article[i].id 
					+"'><span class='author' id='author-"
					+ article[i].id 
					+"'>Posted by: <i>" 
					+ article[i].author 
					+ "</i></span><span class='actualDate' id='actualDate-"
					+ article[i].id 
					+"'><a href='#'> " 
					+ article[i].date 
					+ "</a></span><span class='comments' id='comments-"
					+ article[i].id 
					+"'><a href='#'> Comments(7)</a></span><span class='readMore' id='readMore-"
					+ article[i].id 
					+"'><a href='#'> Read more</a></span></div>");
			}
			$('#pagenum').text("Page " + counter);

			//adds deletion of article preview
			$('.delButton').each(function(){
				$(this).on('click', function(){
					var self = this;

					if(confirm("You want to delete this article?")){
				    $.ajax({
				    	url:"/api/posts",
				    	type:'DELETE',
				    	data: {
				    		id: $(this).val()
				    	},
				    	success:function(result){

				    	}/*,
				    	error:function(){
				    		console.log($(self).val());
				    		$('#articlePreview-' + $(self).val()).fadeOut(400);
				    	}*/
				    });
				    $('#articlePreview-' + $(this).val()).fadeOut(400);
				  }
			  });
			}); 

			//adds edition of article preview
			$('.editButton').each(function(){
				$(this).on('click', function(){
					id = $(this).val();
					if(!isEdited){
						isEdited = true;
				    $('#articlePreview-' + id).after(
				    		'<form action="#" id="editForm-' + id + '" class="editForm">Title: <input id="editTitle-' + id + '" name="title" type="text" value='
				    		+ $('#articleName-' + id + '.articleName').text() //article.title 
				    		+'> </br></br>Text: </br><textarea id="editText-' + id + '" name="text" rows="5" cols="95"  value="">'
				    		+ $('#previewText-' + id + '.previewText').text()
				    		+'</textarea></br></br><div id="editAuthor-' + id + '">Author: <input id="editAuthorName-' + id + '" name="author" type="text" value='
				    		+ $('#author-' + id + '.author i').text()
				    		+'></div></br></br><input class="submitEditedArticle-' + id + '" type="submit" name="submitEditedArticle" class="button-' + id + '" value="Confirm"/></form>'
				    	);

				    $("#editButton-" + id).text("v");
				    $('#editForm-' + id).slideDown(400);
				    $('#editForm-' + id).on('submit', function() {
				    	$('#articleName-' + id +' a').text($('#editTitle-' + id).val());
				    	$('#previewText-' + id).text($('#editText-' + id).val());
				    	$('#author-' + id +' i').text($('#editAuthorName-' + id).val());

				    	var editedArticle = {
				    		id: id,
				    		title: $('#editTitle-' + id).val(),
				    		author: $('#editAuthorName-' + id).val(),
				    		text: $('#editText-' + id).val()
				    	};
					    $.ajax({
					    	url:"/api/posts", 
					    	type:'PUT',
					    	data: editedArticle,
					    	success:function(result){						    	
					    	}
					    });
					    $("#editButton-" + id).text("e");
						  $('#editForm-' + id).remove();
						  isEdited = false;
					    return false;
					  });
					}else{
						if($('#editForm-' + id).height() > 0){
							$("#editButton-" + id).text("e");
							$('#editForm-' + id).slideUp(400, function(){
								$('#editForm-' + id).remove();
								isEdited = false;	
							});
						}else{
							//nothing
						}
					}
					//return false;
			  });
			});
		}
	});
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