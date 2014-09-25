define([], function (result) {

  //login form slide Up
  $(".glyphicon-chevron-up").on("click", function(){
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
  });

});