define([
    'Backbone',
    'text!appTemplates/footer.html'
  ], function (Backbone, footerTemplate) {

	//Footer view
  Footer = Backbone.View.extend({

    initialize: function(){
      this.render();
    },

    render: function(){
      var template = footerTemplate;
      var compiledTemplate = _.template( template );
      
      this.$el.append( compiledTemplate );
      return this;
    }
  });

	return Footer;

});