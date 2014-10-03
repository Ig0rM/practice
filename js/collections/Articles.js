define([
		'Backbone', 
		"appModels/Article"
	], function (Backbone, Article) {

	// var article = new Article();
	var Articles = Backbone.Collection.extend({
		model: Article,
	  url: '/api/posts'
	});

	return Articles;

});