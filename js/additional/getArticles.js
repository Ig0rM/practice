function delHandler(){
	//deletion button click event
  $('.delButton').each(function(){
  	$(this).on('click', function(){
  			var id = $(this).val();

  			//first finish article editing or creation
				if ($('#addOrEditArticleBlock').is(':visible')){
						$('.notification-danger').addClass('center');
		      	$('.notification-danger .alert-danger').text('First finish article editiong');
		      	$('.notification-danger').fadeIn(1000).delay(1000).fadeOut(1000);
				}else{
			      if(confirm("You want to delete this article?")){
			      	$('#panel-' + id).fadeOut(500);

			        $.ajax({
			          url:"/api/posts",
			          type:'DELETE',
			          data: {id: id},
			          success:function(result){}
			        });

			        $('.notification-success').addClass('center');
		      		$('.notification-success .alert-success').text('Article was successfully deleted!');
		      		$('.notification-success').fadeIn(1000).delay(1000).fadeOut(1000);
		      	}
				}
  	});
	}); //deletion
}

function editHandler(){
	//editing button click event
	$('.editButton').each(function(){
		$(this).on('click', function(){
				var id = $(this).val();
				var prevTitle = $('#articleTitle-' + id).text();
				var prevText = $('#articleContent-' + id).text();
				var prevAuthor = $('#articleAuthor-' + id).text();
				var prevDate = $('#articleDate-' + id).text();

				//sliding edit form down
				if (!$('#addOrEditArticleBlock').is(':visible')){
					$('#addOrEditArticleBlock').slideDown(500);
				}

				$('#addOrEditArticleFormTitle').text('Edit article');
				$('#addSubmit').text('Confirm');
				//setting previous content of article
				$('#inputTitle').val(prevTitle);
				$('#inputText').val(prevText);
				$('#inputAuthor').val(prevAuthor);
				

				$('#addOrEditArticleBlock').off('submit');
				//when submited
				$('#addOrEditArticleBlock').on('submit', function(){
					var editedArticle = {
						id: id,
						title: $('#inputTitle').val(),
						author: $('#inputAuthor').val(),
						text: $('#inputText').val()
					}

					$.ajax({
			    	url:"/api/posts", 
			    	type:'PUT',
			    	data: editedArticle,
			    	success:function(result){}
			    });

					//show changes
					$('#articleTitle-' + id).text(editedArticle.title);
					$('#articleContent-' + id).text(editedArticle.text);
					$('#articleAuthor-' + id).text(editedArticle.author);

					$('.notification-success').addClass('center');
		      $('.notification-success .alert-success').text('Article was successfully edited!');
		      $('.notification-success').fadeIn(1000).delay(1000).fadeOut(1000);

					//slide up when edited
			    $('#addOrEditArticleBlock').slideUp(500);

			    return false;
				});	//when submited
				
		});
	}); //editing
}


//save list of articles when page reloads, gets page and limit fron url string
function checkUrl(){
	if(url('#limit') && url('#page')){
		return {
			limit: parseInt(url('#limit')),
			page: parseInt(url('#page'))
		};
	}else{
		return{limit: 4, page: 0};
	}
}

define(function () {

	return {

		//when page loads
		show: function(config){
			var posts = checkUrl();

      $.ajax({
	      url:"/api/posts", 
	      type:'GET',
	      data: posts,

	      success: function(result){
		        var appState = new config.AppState();
		        var view = new config.View({model: appState});
		        var articles = JSON.parse(result);

		        appState.set({articles: articles});
		        view.showArticles();
		        delHandler();							
		        editHandler();
    		}
  		});
  		window.location.hash = "limit=" + posts.limit + "&page=" + posts.page;
    },

		//if click nextButton
    showNext: function(config){
    	//che if all operations compleated
    	if ($('#addOrEditArticleBlock').is(':visible')){
						$('.notification-danger').addClass('center');
		      	$('.notification-danger .alert-danger').text('First finish article creation or edition');
		      	$('.notification-danger').fadeIn(1000).delay(1000).fadeOut(1000);
			}else{//else
		    	if($('#previousListOfPages').hasClass('disabled')){
		    		$('#previousListOfPages').removeClass("disabled");
		    	}

		    	var posts = checkUrl();
		    	posts.page += ( posts.limit-1 );
		    	var app_router = new config.Router();

		      $.ajax({
			      url:"/api/posts", 
			      type:'GET',
			      data: posts,

			      success: function(result){
			      		var appState = new config.AppState();
				        var view = new config.View({model: appState});
				        var articles = JSON.parse(result);

				        //checks id it was the last set of articles and disable button
				        if(articles.length < posts.limit){
				        	$('#nextListOfPages').addClass("disabled");
				        }

			          appState.set({articles: articles});
			          view.showArticles();
			          delHandler();							
				        editHandler();
		    		}
		  		});
		  		//Backbone.history.navigate("#tasks/", { trigger: true });
		  		//Backbone.history.navigate("#public", {trigger:true, replace: true});
		  		//app_router.navigate("/dddd", {trigger:true, replace: true});
		  		window.location.hash = "limit=" + posts.limit + "&page=" + posts.page;
  		}//else
    },


    //if click prevButton
    showPrev: function(config){
    	//che if all operations compleated
    	if ($('#addOrEditArticleBlock').is(':visible')){
						$('.notification-danger').addClass('center');
		      	$('.notification-danger .alert-danger').text('First finish article creation or edition');
		      	$('.notification-danger').fadeIn(1000).delay(1000).fadeOut(1000);
			}else{//else
		    	if($('#nextListOfPages').hasClass('disabled')){
		    		$('#nextListOfPages').removeClass("disabled");
		    	}
		 
		    	var posts = checkUrl();
		    	posts.page -= ( posts.limit-1 );

		      $.ajax({
			      url:'/api/posts', 
			      type:'GET',
			      data: posts,

			      success: function(result){
			      		var appState = new config.AppState();
				        var view = new config.View({model: appState});
				        var articles = JSON.parse(result);

				        //checks id it was the first set of articles and disable button
					    	if(posts.page == 0){
					    		$('#previousListOfPages').addClass("disabled");
					    	}

			          appState.set({articles: articles});
			          view.showArticles();
			          delHandler();							
				        editHandler();
		    		}
		  		});
		  		window.location.hash = "limit=" + posts.limit + "&page=" + posts.page;
		  }//else
    }

	};
});