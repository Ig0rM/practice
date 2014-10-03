define(['Backbone'], function () {
	//Footer view
  Footer = Backbone.View.extend({
    siteFooter: $("#siteFooter"),

    initialize: function(){
      this.render();
    },

    render: function(){
      var template = _.template( $("#siteFooter1").html());
      this.siteFooter.html( template() );
      return this;
    }
  });

	return Footer;

});