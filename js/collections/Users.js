define([
		'Backbone', 
		"appModels/User"
	], function (Backbone, User) {

	var Users = Backbone.Collection.extend({
		model: User,
	  url: '/user'
	});

	return Users;

});