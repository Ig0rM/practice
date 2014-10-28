define([
    'Backbone',
    'text!appTemplates/header.html'
  ], function (Backbone, headerTemplate) {

  //Header view
  Header = Backbone.View.extend({

    initialize: function(){
      this.render();

      
      $('#searchForm').on('submit', function(){
        window.location.hash = "search/" + $('#searchField').val();
        return false;
      });
    },

    render: function(){
      this.$el.append( _.template( headerTemplate ) );
      return this;
    },
    
    removeAll: function() {
      this.$el.empty();
    }
  });

  return Header;

});