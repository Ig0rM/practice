define(['Backbone'], function (Backbone) {

	var User = Backbone.Model.extend({
	  urlRoot: '/user'
	});

	return User;
});