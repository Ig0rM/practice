var getPost = require('./controllers/get.js');
var addPost = require('./controllers/add.js');
/*var result;*/

exports.createRoutes = function(middlewares) {
  middlewares.unshift(function(req, res, next) {

    if ( (req.url == '/api/posts') && (req.method == 'GET') ) {
/*      result = getPost.getPosts(3);*/
      res.end('Hello, world from port sssssss !');
    }else if ( (req.url == '/api/posts/add') && (req.method == 'GET') ){
      res.end('Hello, world from port sssssss !');
      addPost.addPost();
    }else{
        return next();
    }
  });
};	