define([
    'Backbone',
    'text!appTemplates/profile.html'
  ], function (Backbone, profileTemplate) {

	//Footer view
  Contacts = Backbone.View.extend({


    initialize: function(){
      // this.render();
    },

    render: function(){
      // console.log(this.collection);
      var self = this;
      var user;
      // var user = new this.model();
      self.$el.empty();
      this.collection.fetch({
        success: function (data) {
          // console.log(data.toJSON());
          user = data.toJSON().pop();
          self.$el.append( _.template( profileTemplate )(user) );    
        }
      });

      return this;
    },

    removeAll: function() {
     this.$el.empty(); 
    // this.$el.empty();
    }
  });

	return Contacts;

});