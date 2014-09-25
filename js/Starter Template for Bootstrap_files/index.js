$(function(){

	var AppState = Backbone.Model.extend({
    defaults: {
      username: "BLANK",
      state: "start",
      title: "",
      content: "",
      author: "",
      date: ""
    }
	});

	var appState = new AppState();

	var Router = Backbone.Router.extend({
    routes: {
      "": "start",
      "success": "success",
      "error": "error"
    },

    start: function () {
      appState.set({ 
      	username: 'START', 
      	state: 'start' 
      });
    },

    success: function () {
      appState.set({ 
      	username: 'SUCCESS',
        state: 'success'
      });
    },

    error: function () {
      appState.set({ 
      	state: "error" 
      });
    }
  });

	View = Backbone.View.extend({   
    siteHeader: $("#header"),
    siteContent: $("#accordion"),
    siteFooter: $("#siteFooter"),
    paginationBlock: $("#paginationBlock"),
    addArticleBlock: $("#addArticleBlock"),

    siteHeaders: {
      "start": _.template($('#siteHeader1').html())
    },

    siteContents: {
      "start": _.template($('#articlesShow').html())
    },

    pagination: {
      "start": _.template($('#pagination').html())
    },

    addArticle: {
      "start": _.template($('#addArticle').html())
    },

    siteFooters: {
      "start": _.template($('#siteFooter1').html())
    },

    render: function () {
  	 	var state = this.model.get("state");
      $(this.siteHeader).html(this.siteHeaders[state](this.model.toJSON()));
      $(this.siteFooter).html(this.siteFooters[state]());
      return this;
	  },

    showArticles: function() {
      var state = this.model.get("state");

      $(this.siteContent).html("");
      for (var i = this.model.attributes.articles.length-2; i >= 0; i--) {
        $(this.siteContent).html($(this.siteContent).html() + this.siteContents[state](this.model.attributes.articles[i]));
      }
      
      $(this.paginationBlock).html(this.pagination[state]());
      return this;
    },

    showAddArticle: function(){
      var state = this.model.get("state");
      $(this.siteContent).html(this.addArticle[state]());
      $(this.paginationBlock).html("");


      //article creation
      require(["additional/createArticle"], function(article) {
        $('#addArticleBlock').on('submit', function(){
          article.create({
              View: View,
              AppState: AppState,
              Router: Router
          });

          return false;
        });
      });

      return this;
    }

	});


  var app_router = new Router;
  
	app_router.on('route:success', function(){ 
      var view = new View({model: appState});
		  view.render();
  });

	app_router.on('route:start', function(){ 
      var view = new View({model: appState});
  	  view.render();
      
  });

	Backbone.history.start({pushState: true});



  require(["additional/loginForm"], function(article) {

  });

  //list articles and pagination
  require(["additional/getArticles"], function(articles) {
        articles.show({
                View: View,
                AppState: AppState,
                Router: Router
            });

        $('#nextListOfPages').on('click', function(config){
          if(!$(this).hasClass('disabled')){
            articles.showNext({
                  View: View,
                  AppState: AppState,
                  Router: Router
            });
          }
        });

        $('#previousListOfPages').on('click', function(config){
          if(!$(this).hasClass('disabled')){
            articles.showPrev({
                  View: View,
                  AppState: AppState,
                  Router: Router
            });
          }
        });
  });
  



});