define([
		'Backbone', 
		"appModels/Article"
	], function (Backbone, Article) {

	var Articles = Backbone.Collection.extend({
		model: Article,
	  url: '/api/posts'
	});

	return Articles;

});