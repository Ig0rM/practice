//save list of articles when page reloads, gets page and limit fron url string
function checkUrl(){

	if(url('#limit') && url('#page')){

		return {
			limit: parseInt(url('#limit')),
			page: parseInt(url('#page'))
		};

	}else{

		return{
			limit: 4,
			page: 0
		};

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
		        var view = new View({model: appState});
		        var articles = JSON.parse(result);


		        appState.set({articles: articles});
		        view.showArticles();
		        view.showAddArticle();
    		}
  		});
  		window.location.hash = "limit=" + posts.limit + "&page=" + posts.page;
    },


		//if click nextButton
    showNext: function(config){
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
		        var view = new View({model: appState});
		        var articles = JSON.parse(result);

		        //checks id it was the last set of articles and disable button
		        if(articles.length < posts.limit){
		        	$('#nextListOfPages').addClass("disabled");
		        }

	          appState.set({articles: articles});
	          view.showArticles();
    		}
  		});
  		//Backbone.history.navigate("#tasks/", { trigger: true });
  		//Backbone.history.navigate("#public", {trigger:true, replace: true});
  		//app_router.navigate("/dddd", {trigger:true, replace: true});
  		window.location.hash = "limit=" + posts.limit + "&page=" + posts.page;
    },


    //if click prevButton
    showPrev: function(config){
    	if($('#nextListOfPages').hasClass('disabled')){
    		$('#nextListOfPages').removeClass("disabled");
    	}
 
    	var posts = checkUrl();
    	posts.page -= ( posts.limit-1 );

      $.ajax({
	      url:"/api/posts", 
	      type:'GET',
	      data: posts,

	      success: function(result){
	      		var appState = new config.AppState();
		        var view = new View({model: appState});
		        var articles = JSON.parse(result);

		        //checks id it was the first set of articles and disable button
			    	if(posts.page == 0){
			    		$('#previousListOfPages').addClass("disabled");
			    	}

	          appState.set({articles: articles});
	          view.showArticles();
    		}
  		});
  		window.location.hash = "limit=" + posts.limit + "&page=" + posts.page;
    }

	};
});