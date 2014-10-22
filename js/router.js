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
	    "appCollections/Search"
   	], function (jquery, Backbone, Article, Header, Content, Footer, Contacts, Profile, Articles, Search) {

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
		    	var profile = new Profile({
		        el: $("#profilePage")
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

		    	var profile = new Profile({
		        el: $("#profilePage")
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

		    	var profile = new Profile({
		        el: $("#profilePage")
		      });
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