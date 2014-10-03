define([
			"jquery",
			"Backbone",
			"appModels/Article", 
	    "appViews/Header", 
	    "appViews/Content", 
	    "appViews/Footer",
	    "appCollections/Articles"
   	], function (jquery, Backbone, Article, Header, Content, Footer, Articles) {

	var init = function(){

			var Router = Backbone.Router.extend({
	    routes: {
		      "": "main",
		      "main": "main",
		      "profile": "profile",
		      "contacts": "contacts",
		      "error": "error"
		    }
		  });

			var router = new Router();

		  

			router.on('route:main', function () {
				//эта функция вызывает каждый раз при смене страницы!!
       	alert("on");
       	var articles = new Articles();
	      var header = new Header();
	      var content = new Content({
	        el: $("#content"),
	        collection: articles
	      });
	      var footer = new Footer();

    	});

			

		Backbone.history.start();
	};

	return {
		init: init
	};
});