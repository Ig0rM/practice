define([
    'Backbone',
    'text!appTemplates/profile.html'
  ], function (Backbone, profileTemplate) {

	//Footer view
  Contacts = Backbone.View.extend({


    initialize: function(){
    },

    render: function(){
      var self = this;
      var user;
      self.$el.empty();
      self.collection.fetch({
        success: function (data) {
          user = data.toJSON().pop();
          self.$el.append( _.template( profileTemplate )(user) );    
        }
      });

      return this;
    },

    removeAll: function() {
      this.$el.empty(); 
    }
  });

	return Contacts;

});