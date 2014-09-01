var startingPage = 0;
var limit = 3;
var counter; //number of the list of articles
var lastPage = false;
var isEdited = false;
var article;
var posts;
//adds element article
var showPosts = function(startingPage, limit){
	posts = {
		limit: limit+1,
		page: startingPage
	};
	//to save progress whe page reloads
	$.ajax({
		url:"http://localhost:9000/api/posts", 
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
					if(confirm("You want to delete this article?")){
				    $.ajax({
				    	url:"http://localhost:9000/api/posts",
				    	type:'DELETE',
				    	data: {
				    		id: $(this).val()
				    	},
				    	success:function(result){}
				    });
				    $('#articlePreview-' + $(this).val()).fadeOut(400);
				  }
			  });
			}); 


			//adds edition of article preview
			$('.editButton').each(function(){
				$(this).on('click', function(){
					if(!isEdited){
						isEdited = true;
				//	if(confirm("You want to edit this article?")){
				    $.ajax({
				    	url:"http://localhost:9000/api/posts/show", 
				    	type:'GET',
				    	data: {
				    		id: $(this).val()
				    	},
				    	success:function(result){
				    	article = JSON.parse(result);

				    }});
				    $('#articlePreview-' + $(this).val()).after(
				    		'<form action="#" id="editForm-'+$(this).val()+'" class="editForm">Title: <input id="editTitle-'+$(this).val()+'" name="title" type="text" value='
				    		+ $('#articleName-' + $(this).val() + '.articleName').text() //article.title 
				    		+'> </br></br>Text: </br><textarea id="editText-'+$(this).val()+'" name="text" rows="5" cols="95"  value="">'
				    		+ $('#previewText-' + $(this).val() + '.previewText').text()
				    		+'</textarea></br></br><div id="editAuthor-'+$(this).val()+'">Author: <input id="editAuthorName-'+$(this).val()+'" name="author" type="text" value='
				    		+ $('#author-' + $(this).val() + '.author i').text()
				    		+'></div></br></br><input class="submitEditedArticle-'+$(this).val()+'" type="submit" name="submitEditedArticle" class="button-'+$(this).val()+'" value="Confirm"/></form>'
				    		);

				    $('#editForm-' + $(this).val()).slideDown(400);
				    var id = $(this).val();
				    
				    $('#editForm-' + $(this).val()).submit(function() {
				    	var editedArticle = {
				    		id: id,
				    		title: $('#editTitle-' + id).val(),
				    		author: $('#editAuthorName-' + id).val(),
				    		text: $('#editText-' + id).val()
				    	};
					    $.ajax({
					    	url:"http://localhost:9000/api/posts", 
					    	type:'PUT',
					    	data: editedArticle,
					    	success:function(result){
					    		$('#editForm-' + $(this).val()).remove();
					    	}
					    });
					    isEdited = false;
					  });
					}else{
						if($('#editForm-' + $(this).val()).height() > 0){
							var editId = $(this).val();
							$('#editForm-' + $(this).val()).slideUp(400, function(){
								$('#editForm-' + editId).remove();
								isEdited = false;	
							});
						}else{
							//nothing
						}				
					}  
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
