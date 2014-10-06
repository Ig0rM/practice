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
      var template = profileTemplate;
      var compiledTemplate = _.template( template );
      this.$el.append( compiledTemplate );

      // var template = this.$el.find("#siteFooter1");
      // this.siteFooter.html( _.template( template.html() )() );
      // this.siteFooter.append(template);
      
      return this;
    },

    removeAll: function() {
      this.$el.empty();
    }
  });

	return Contacts;

});