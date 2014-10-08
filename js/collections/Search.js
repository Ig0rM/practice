define([
		'Backbone', 
		"appModels/Article"
	], function (Backbone, Article) {

	var Search = Backbone.Collection.extend({
		model: Article,
	  url: '/search'
	});

	return Search;

});