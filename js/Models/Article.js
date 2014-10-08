define(['Backbone'], function (Backbone) {

	var Article = Backbone.Model.extend({
	  urlRoot: '/api/posts'
	});

	return Article;
});