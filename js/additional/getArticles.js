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

				      	var Article = Backbone.Model.extend({
							    urlRoot: '/api/posts'
							  });

							  var article = new Article();
							  article.set({id: id});

							  article.destroy({
							  	data: id,

					        success: function () {
					            alert('Destroyed');
					        },
					        error: function () {
					            alert('Destroyed (error)');
					        }
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
			//check if the form is visible
			if (!$('#addOrEditArticleBlock').is(':visible')){
					var id = $(this).val();
					var prevTitle = $('#articleTitle-' + id).text();
					var prevText = $('#articleContent-' + id).text();
					var prevAuthor = $('#articleAuthor-' + id).text();
					var prevDate = $('#articleDate-' + id).text();

					//sliding edit form down
					$('#addOrEditArticleBlock').slideDown(500);
					

					$('#addOrEditArticleFormTitle').text('Edit article');
					$('#addSubmit').text('Confirm');
					//setting previous content of article
					$('#inputTitle').val(prevTitle);
					$('#inputText').val(prevText);
					$('#inputAuthor').val(prevAuthor);
					

					$('#addOrEditArticleBlock').off('submit');
					//when submited
					$('#addOrEditArticleBlock').on('submit', function(){


						var Article = Backbone.Model.extend({
					    urlRoot: '/api/posts'
					  });

					  var article = new Article();
					  article.set({
					    id: id,
					    title: $('#inputTitle').val(),
					    author: $('#inputAuthor').val(),
					    text: $('#inputText').val()
					  });

					  article.save();

						//show changes
						$('#articleTitle-' + id).text(article.get('title'));
						$('#articleContent-' + id).text(article.get('text'));
						$('#articleAuthor-' + id).text(article.get('author'));

						$('.notification-success').addClass('center');
			      $('.notification-success .alert-success').text('Article was successfully edited!');
			      $('.notification-success').fadeIn(1000).delay(1000).fadeOut(1000);

						//slide up when edited
				    $('#addOrEditArticleBlock').slideUp(500);

				    return false;
				});	//when submited
			}else{
					//sliding edit form up
					$('#addOrEditArticleBlock').slideUp(500);
			}
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

			var Articles = Backbone.Model.extend({
		    urlRoot: '/api/posts'
		  });

		  var articles = new Articles();
		  articles.fetch({
	      	data: posts,
	      	
	        success: function (articles) {
	        	var appState = new config.AppState();
		        var view = new config.View({model: appState});
		        var list = articles.toJSON();

		        appState.set({articles: list});
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

     			var Articles = Backbone.Model.extend({
				    urlRoot: '/api/posts'
				  });

				  var articles = new Articles();
				  articles.fetch({
			      	data: posts,
			      	
			        success: function (articles) {
			        	var appState = new config.AppState();
				        var view = new config.View({model: appState});
				        var list = articles.toJSON();

				        //checks id it was the last set of articles and disable button
				        if(articles.length < posts.limit){
				        	$('#nextListOfPages').addClass("disabled");
				        }

				        appState.set({articles: list});
				        view.showArticles();
				        delHandler();							
				        editHandler();
			        }
				  });
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

		      var Articles = Backbone.Model.extend({
				    urlRoot: '/api/posts'
				  });

				  var articles = new Articles();
				  articles.fetch({
			      	data: posts,
			      	
			        success: function (articles) {
			        	var appState = new config.AppState();
				        var view = new config.View({model: appState});
				        var list = articles.toJSON();
				        //checks id it was the first set of articles and disable button
					    	if(posts.page == 0){
					    		$('#previousListOfPages').addClass("disabled");
					    	}

			          appState.set({articles: list});
				        view.showArticles();
				        delHandler();							
				        editHandler();
			        }
				  });
		  		window.location.hash = "limit=" + posts.limit + "&page=" + posts.page;
		  }//else
    },

    //show articles by date
    //!!!! NOW SET FROM 24th to 32th 
    showByDate: function(config){
				$('#dateList a').each(function(){
					$(this).on('click', function(){
							var date = $(this).text();
							var posts = {
								limit: 40,
								page: 0,
								date: date
							};

				     var Articles = Backbone.Model.extend({
					    urlRoot: '/api/posts'
					  });

					  var articles = new Articles();
					  articles.fetch({
				      	data: posts,
				      	
				        success: function (articles) {
				        	var appState = new config.AppState();
					        var view = new config.View({model: appState});
					        var list = articles.toJSON();

					        appState.set({articles: list});
					        view.showArticles();
					        delHandler();							
					        editHandler();
				    		}
				  		});
				  		window.location.hash = "limit=" + posts.limit + "&page=" + posts.page;

					});
				});
    }

	};
});