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


      //login form slide Up
   /*   $(".glyphicon-chevron-up").on("click", function(){
          $(".glyphicon-chevron-up").fadeOut(0);
          $(".glyphicon-chevron-down").fadeIn(100, function(){
              $("#loginForm").slideUp(400);
          });
      });

      //login form slide Down
      $(".glyphicon-chevron-down").on("click", function(){
          $(".glyphicon-chevron-down").fadeOut(0);
          $(".glyphicon-chevron-up").fadeIn(100, function(){
              $("#loginForm").slideDown(400);
          });
      });*/
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