var posts = require('./controllers/posts.js');

var routes = [
  {
    url:  '/api/posts',
    method: 'GET',
    callback:  posts.get
  },
  {
    url:  '/api/posts',
    method: 'POST',
    callback:  posts.post
  }
];

exports.createRoutes = function(middlewares) {
  middlewares.unshift(function(req, res, next) {

    routes.forEach(function(route){
      if ( (route.url == req._parsedUrl.pathname) && (route.method == req.method) ) {
        //connection.bd(function(err, bd){
         // if (!err){
            
           route.callback(req, res);
          // }else{
         //  res.end();
        //  }    
       // });
       
      }else{
        //res.end();
       // return next();
      }
    });

    return next();
    // for(var i = 0; i < routes.length; i++){

     /* console.log(req._parsedUrl);
      req.params = req._parsedUrl.query*/

      
    
  });
};
