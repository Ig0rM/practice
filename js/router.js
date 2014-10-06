define([
			"jquery",
			"Backbone",
			"appModels/Article", 
	    "appViews/Header", 
	    "appViews/Content", 
	    "appViews/Footer",
	    "appViews/Contacts",
	    "appViews/Profile",
	    "appCollections/Articles"
   	], function (jquery, Backbone, Article, Header, Content, Footer, Contacts, Profile, Articles) {

	var init = function(){

			var Router = Backbone.Router.extend({
	    routes: {
		      "": "main",
		      "main": "main",
		      "mainNext": "main",
		      "profile": "profile",
		      "contacts": "contacts",
		      "error": "error"
		    },

		    main: function () {
		    	//глючит при повторном нажатии
		    	var profile = new Profile({
		        el: $("#profilePage")
		      });

		    	profile.removeAll();

		    	var contacts = new Contacts({
		        el: $("#contactsPage")
		      });

		    	contacts.removeAll();

		    	var articles = new Articles();

		      var content = new Content({
		        el: $("#content"),
		        collection: articles
		      });

		      content.startArticles();

		      
		    },
		    mainNext: function () {

		      
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
		    }

		  });

			var router = new Router();

			var header = new Header({
		      	el: $("#header")
		      });

			var footer = new Footer({
		      	el: $("#footer")
		      });

		  var newRoute = function() {

		  };

			// router.on('route:main', function () {
       	// alert("on");
       	

    	// });

		Backbone.history.start();
	};

	return {
		init: init
	};
});