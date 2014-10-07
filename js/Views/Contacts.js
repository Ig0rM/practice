define([
    'Backbone',
    'text!appTemplates/contacts.html'
  ], function (Backbone, contactsTemplate) {
	
  //Contacts view
  Contacts = Backbone.View.extend({

    initialize: function(){
      this.render();
    },

    render: function(){
      this.$el.append( _.template( contactsTemplate ) );
      return this;
    },

    removeAll: function() {
      this.$el.empty();
    }
  });

	return Contacts;

});