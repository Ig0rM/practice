var posts = require('./controllers/posts.js');
var quote = require('./controllers/quote.js');

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
  },
  {
    url:  '/quote',
    method: 'GET',
    callback:  quote.get
  }
];

exports.createRoutes = function(middlewares) {
  middlewares.unshift(function(req, res, next) {

    routes.forEach(function(route){
      if ( (route.url == req._parsedUrl.pathname) && (route.method == req.method) ) {
        route.callback(req, res);
      }else{

      }
    });

    return next();
  });
};
