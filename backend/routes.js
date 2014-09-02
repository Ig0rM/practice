var posts = require('./controllers/posts.js');
var quote = require('./controllers/quote.js');

var url = require('url');

var routes = [
  {
    url:  '/api/posts',
    method: 'GET',
    callback:  posts.index
  },
  {
    url:  '/api/posts',
    method: 'POST',
    callback:  posts.create
  },
  {
    url:  '/quote',
    method: 'GET',
    callback:  quote.index
  },
  {
    url:  '/api/posts',
    method: 'DELETE',
    callback:  posts.destroy
  },
  {
    url:  '/api/posts',
    method: 'PUT',
    callback:  posts.update
  },
  {
    url:  '/api/posts/show',
    method: 'GET',
    callback:  posts.show
  }
];

prepareParams = function(req){
  if ( (req.method == 'POST') || (req.method == 'DELETE') || (req.method == 'PUT')) {
    
  }else{
    req.params = url.parse(req._parsedUrl.path, true).query;
    req.params = req.params || {};
  }
}

exports.createRoutes = function(middlewares) {
  middlewares.unshift(function(req, res, next) {
    prepareParams(req);
    res.send = function(err, data) {}
    routes.forEach(function(route){
      if ( (route.url == req._parsedUrl.pathname) && (route.method == req.method) ) {
        route.callback(req, res);
      }else{

      }
    });
    return next();
  });
};
