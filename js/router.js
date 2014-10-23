define([
			"jquery",
			"Backbone",
			"appModels/Article", 
	    "appViews/Header", 
	    "appViews/Content", 
	    "appViews/Footer",
	    "appViews/Contacts",
	    "appViews/Profile",
	    "appCollections/Articles",
	    "appCollections/Search",
	    "appCollections/Users"
   	], function (jquery, Backbone, Article, Header, Content, Footer, Contacts, Profile, Articles, Search, Users) {

	var init = function(){

			var Router = Backbone.Router.extend({
	    routes: {
		      "": "main",
		      "main": "main",
		      "limit/:lim/page/:pg": "showArticles",
		      "search/:word": "search",
		      "profile": "profile",
		      "contacts": "contacts",
		      "error": "error"
		    },

		    main: function () {
		    	var users = new Users();
		    	var profile = new Profile({
		        el: $("#profilePage"),
		        collection: users
		      });

		    	profile.removeAll();
		    	var contacts = new Contacts({
		        el: $("#contactsPage")
		      });

		    	contacts.removeAll();

		    	var articles = new Articles();
		    	var search = new Search();
		      var content = new Content({
		        el: $("#content"),
		        collection: articles
		      });

		      content.removeAll();
		      content.render();
		      content.startArticles();
		    },

		    showArticles: function(lim, pg){
		    	var articles = new Articles();
					var content = new Content({
		        el: $("#content"),
		        collection: articles
		      });

					content.removeAll();
					content.render();
					content.startArticles(lim, pg);
		    },

		    contacts: function(){
					var users = new Users();
		    	var profile = new Profile({
		        el: $("#profilePage"),
		        collection: users
		      });

		    	profile.removeAll();

		    	var articles = new Articles();
		    	var content = new Content({
		        el: $("#content"),
		        collection: articles
		      });

		    	content.removeAll();

		    	var contacts = new Contacts({
		        el: $("#contactsPage")
		      });

		    },

		    profile: function(){
		    	var contacts = new Contacts({
		        el: $("#contactsPage")
		      });

		    	contacts.removeAll();

		    	var articles = new Articles();
		    	var content = new Content({
		        el: $("#content"),
		        collection: articles
		      });

		    	content.removeAll();

		    	// var user = new User();
		    	var users = new Users();
		    	var profile = new Profile({
		        el: $("#profilePage"),
		        collection: users
		      });
		      profile.render();
		    },

		    search: function(word){
		    	var search = new Search();
		    	var articles = new Articles();
					var content = new Content({
		        el: $("#content"),
		        collection: search
		      });

					content.removeAll();
					content.render();
					content.findBySearch(word);
		    }

		  });

			var router = new Router();
			var header = new Header({
		      	el: $("#header")
		      });
			var footer = new Footer({
		      	el: $("#footer")
		      });

		Backbone.history.start();
	};

	return {
		init: init
	};
});