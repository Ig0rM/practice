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
      this.$el.append( _.template( footerTemplate ) );
      return this;
    },

    removeAll: function() {
      this.$el.empty();
    }
  });

	return Footer;

});