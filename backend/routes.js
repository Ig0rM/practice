var posts = require('./controllers/posts.js');
var url = require('url');

exports.createRoutes = function(app, passport){

  app.all(['/api/*', '/search', '/'], isLoggedIn);

  app.route('/api/posts')
    .get(function (req, res, next){
      req.params = url.parse(req._parsedUrl.path, true).query;
      req.params = req.params || {};
      posts.index(req, res);
    })
    .post(function (req, res, next){
      posts.create(req, res);
    });

  app.route('/api/posts/:id')
    .get(function (req, res, next){
      req.params = url.parse(req._parsedUrl.path, true).query;
      req.params = req.params || {};
      posts.show(req, res);
    })
    .put(function (req, res, next){
      posts.update(req, res);
    })
    .delete(function (req, res, next){
      posts.destroy(req, res);
    });

  app.route('/search')
    .get(function (req, res, next){
      req.params = url.parse(req._parsedUrl.path, true).query;
      req.params = req.params || {};
      posts.search(req, res);
    });

  app.route('/user')
    .get(function (req, res, next){
      if (req.user.facebook.name){
         res.send({
          user: req.user.facebook.name,
          id: req.user.facebook.id
        });
      }else{
        res.send({
          user: req.user.local.name,
          id: req.user.local.id
        });
      }
    });

  // render the page and pass in any flash data if it exists
  app.get('/login', function(req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') }); 
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
      successRedirect : '/', // redirect to the secure profile section
      failureRedirect : '/login', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
    }));

  // show the signup form
  app.get('/signup', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  app.get('/userinfo', isLoggedIn, function(req, res) {
    res.render('userinfo.ejs', {
      user : req.user // get the user out of session and pass to template
    });
  });

  // route for facebook authentication and login
  app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback',
      passport.authenticate('facebook', {
          successRedirect : '/#main',
          failureRedirect : '/'
      }));
  
  //logout
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

    
}

function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated()){
    return next();
  }
  // if they aren't redirect them to the home page
  res.redirect('/login');
}
