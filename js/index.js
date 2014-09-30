$(function(){

	var AppState = Backbone.Model.extend({
    defaults: {
      username: "BLANK",
      state: "main",
      title: "",
      content: "",
      author: "",
      date: ""
    }
	});

	var appState = new AppState();

	var Router = Backbone.Router.extend({
    routes: {
      "": "main",
      "main": "main",
      "profile": "profile",
      "contacts": "contacts",
      "error": "error"
    },

    main: function () {
      appState.set({ 
      	username: 'START', 
      	state: 'main' 
      });
    },

    profile: function () {
      appState.set({ 
        username: 'START', 
        state: 'profile' 
      });
    },

    contacts: function () {
      appState.set({ 
        username: 'START', 
        state: 'contacts' 
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
    addOrEditArticleBlock: $("#addOrEditArticleBlock"),
    profilePage: $("#profilePage"),
    contactsPage: $("#contactsPage"),
    mainArticleBlock: $("#mainArticleBlock"),
    rightSide: $("#rightSide"),

    siteHeaders: {
      "main": _.template($('#siteHeader1').html()),
      "profile": _.template($('#siteHeader1').html()),
      "contacts": _.template($('#siteHeader1').html())
    },

    siteContents: {
      "main": _.template($('#articlesShow').html())
    },

    pagination: {
      "main": _.template($('#pagination').html())
    },

    addOrEditArticle: {
      "main": _.template($('#addOrEditArticle').html())
    },

    siteFooters: {
      "main": _.template($('#siteFooter1').html()),
      "profile": _.template($('#siteFooter1').html()),
      "contacts": _.template($('#siteFooter1').html())
    },

    profile: {
      "profile": _.template($('#profileContent').html())
    },

    contacts: {
      "contacts": _.template($('#contactsContent').html())
    },

    mainArticle: {
      "main": _.template($('#mainArticleContent').html())
    },

    theme1show: {
      "main": _.template($('#theme1Content').html())
    },

    theme2show: {
      "main": _.template($('#theme2Content').html())
    },

    theme3show: {
      "main": _.template($('#theme3Content').html())
    },

    navigationBlock: {
      "main": _.template($('#articlesNavigationBlock').html())
    },

    render: function () {
  	 	var state = this.model.get("state");
      $(this.siteHeader).html(this.siteHeaders[state](this.model.toJSON()));
      $(this.paginationBlock).html(this.pagination[state]());
      $(this.mainArticleBlock).html(this.mainArticle[state]());
      $(this.rightSide).html(this.navigationBlock[state]());
      $(this.siteFooter).html(this.siteFooters[state]());
      return this;
	  },

    showArticles: function() {
      var state = this.model.get("state");

      $(this.siteContent).html("");
      for (var i = this.model.attributes.articles.length-2; i >= 0; i--) {
        $(this.siteContent).html($(this.siteContent).html() + this.siteContents[state](this.model.attributes.articles[i]));
      }
      
      return this;
    },

    showAddArticle: function(){
      var state = this.model.get("state");
      $(this.addOrEditArticleBlock).html(this.addOrEditArticle[state]());

      //discarding event submit handler
      $('#addOrEditArticleBlock').off('submit');
      //article creation
      require(["additional/createArticle"], function(article) {
        $('#addOrEditArticleBlock').on('submit', function(){
          article.create({
              View: View,
              AppState: AppState,
              Router: Router
          });

          return false;
        });
      }); //article creation

      return this;
    },

    renderProfile: function(){
      var state = this.model.get("state");
      $(this.siteHeader).html(this.siteHeaders[state](this.model.toJSON()));
      $(this.profilePage).html(this.profile[state]());
      $(this.siteFooter).html(this.siteFooters[state]());
      return this;
    },

    renderContacts: function(){
      var state = this.model.get("state");
      $(this.siteHeader).html(this.siteHeaders[state](this.model.toJSON()));
      $(this.contactsPage).html(this.contacts[state]());
      $(this.siteFooter).html(this.siteFooters[state]());
      return this;
    },

    theme1: function(){
      var state = this.model.get("state");
      $(this.mainArticleBlock).html(this.theme1show[state]());
    },

    theme2: function(){
      var state = this.model.get("state");
      $(this.mainArticleBlock).html(this.theme2show[state]());
    },

    theme3: function(){
      var state = this.model.get("state");
      $(this.mainArticleBlock).html(this.theme3show[state]());
    }

	});

  var app_router = new Router;
  
	app_router.on('route:success', function(){ 
      var view = new View({model: appState});
		  view.render();
  });

	app_router.on('route:main', function(){ 
      var view = new View({model: appState});
  	  view.render(); 
      view.showAddArticle();

      //list articles and pagination
      require(["additional/getArticles"], function(articles) {
            articles.show({
                    View: View,
                    AppState: AppState,
                    Router: Router
                });

            articles.showByDate({
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
      
      $('#createButton').on('click', function(){
        if ($('#addOrEditArticleBlock').is(':visible')){
          $('#addOrEditArticleBlock').slideUp(500);
        }else{
          var view = new View({model: appState});
          view.showAddArticle();
          $('#addOrEditArticleBlock').slideDown(500);
        }
      });

      //dropdown menu
      $('#theme1nav').on('click', function(){
        var view = new View({model: appState});
        view.theme1(); 
      });

      $('#theme2nav').on('click', function(){
        var view = new View({model: appState});
        view.theme2(); 
      });

      $('#theme3nav').on('click', function(){
        var view = new View({model: appState});
        view.theme3(); 
      });
  });

  app_router.on('route:profile', function(){ 
      var view = new View({model: appState});
      view.renderProfile(); 
      //view.showAddArticle();
  });

  app_router.on('route:contacts', function(){ 
      var view = new View({model: appState});
      view.renderContacts(); 
      //view.showAddArticle();
  });

	Backbone.history.start({pushState: true});

  require(["additional/loginForm"], function(article) {

  });

  require(["additional/searchForm"], function(article) {

  });
 
      
});