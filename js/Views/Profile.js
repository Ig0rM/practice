define([
    'Backbone',
    'text!appTemplates/profile.html'
  ], function (Backbone, profileTemplate) {

	//Footer view
  Contacts = Backbone.View.extend({

    initialize: function(){
      this.render();
    },

    render: function(){
      this.$el.append( _.template( profileTemplate ) );    
      return this;
    },

    removeAll: function() {
      this.$el.empty();
    }
  });

	return Contacts;

});