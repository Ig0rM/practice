define([
		'Backbone', 
		"appModels/Article"
	], function (Backbone, Article) {

	var Search = Backbone.Collection.extend({
		model: Article,
	  url: '/search'

	/*  search: function(word){
		   $.ajax({
	        url:"/search", 
	        type:'GET',
	        data: {word: word},
	        success:function(result){

	          var list = JSON.parse(result);
	          var accordion = self.$el.find("#accordion");
	          var template = accordionPanelTemplate;
	          var compiledTemplate = _.template( template );

	          
	          accordion.html('');
	                
	          for (var i = 0; i <= (list.length - 1); i++) {
	            accordion.html(accordion.html() + _.template( template ) (list[i]));
	          }

	          self.addEditButton(self.collection.model);
	          self.addDelButton(self.collection.model);
	                
	        }
	      });
	 	}*/
	});

	return Search;

});