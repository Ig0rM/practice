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
  },
  {
    url: '/search',
    method: 'GET',
    callback: posts.search
  }
];

prepareParams = function(req, res){
  if (req.method == 'GET'){
    req.params = url.parse(req._parsedUrl.path, true).query;
    req.params = req.params || {};
  }else{

    //setting headers
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:9000");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Content-Range, Content-Disposition, Content-Description, accept");
    res.setHeader("Access-Control-Allow-Methods", "PUT, GET, POST, OPTIONS");
    res.setHeader("access-control-max-age", 10);

    // res.setHeader("content-length", 0);
    req.setEncoding('utf8');
  }
}

exports.createRoutes = function(middlewares) {
  middlewares.unshift(function(req, res, next) {

    prepareParams(req, res);

    res.send = function(err, data) {}
    routes.forEach(function(route){
      
      var reqUrlSplit = req._parsedUrl.pathname.split('/');
      var routeSplit = route.url.split('/');
      // console.log(reqUrlSplit);

      if ( ( (routeSplit[1]+routeSplit[2]) == (reqUrlSplit[1] + reqUrlSplit[2]) ) && (route.method == req.method) ) {
        route.callback(req, res);
      }else{

      }
    });
    return next();
  });
};