define([
    'Backbone',
    'text!appTemplates/footer.html'
  ], function (Backbone, footerTemplate) {
	//Footer view
  Footer = Backbone.View.extend({
    siteFooter: $("#siteFooter"),

    initialize: function(){
      this.render();
    },

    render: function(){
      var template = footerTemplate;
      var compiledTemplate = _.template( template );
      this.$el.append( compiledTemplate );

      // var template = this.$el.find("#siteFooter1");
      // this.siteFooter.html( _.template( template.html() )() );
      // this.siteFooter.append(template);
      
      return this;
    }
  });

	return Footer;

});