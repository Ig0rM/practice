define([
    "../js/router"
  ], function (Router) {
  
  var Application = function(){
      Router.init();
  };

  return {
    init: Application
  };

});