define(['Backbone'], function () {

	var Article = Backbone.Model.extend({
	  urlRoot: '/api/posts'
	});

	return Article;
});