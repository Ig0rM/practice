var posts = require('./controllers/posts.js');
var url = require('url');

exports.createRoutes = function(app, passport){
  

   app.all(['/api/*', '/search', '/'], isLoggedIn);

  app.route('/api/posts')
    .get(function (req, res, next){
      req.params = url.parse(req._parsedUrl.path, true).query;
      req.params = req.params || {};
      posts.index(req, res);
      // next();
    })
    .post(function (req, res, next){
      posts.create(req, res);
      // next();
    });

  app.route('/api/posts/:id')
    .get(function (req, res, next){
      req.params = url.parse(req._parsedUrl.path, true).query;
      req.params = req.params || {};
      posts.show(req, res);
      // next();
    })
    .put(function (req, res, next){
      posts.update(req, res);
      // next();
    })
    .delete(function (req, res, next){
      posts.destroy(req, res);
      // next();
    });

  app.route('/search')
    .get(function (req, res, next){
      req.params = url.parse(req._parsedUrl.path, true).query;
      req.params = req.params || {};
      posts.search(req, res);
      // next();
    });

  app.route('/user')
    .get(function (req, res, next){
      res.send({
        user: req.user.local.name,
        id: req.user.local.id
      });
      // next();
    });



    app.get('/login', function(req, res) {

      // render the page and pass in any flash data if it exists
      res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
      successRedirect : '/', // redirect to the secure profile section
      failureRedirect : '/login', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
    }));

  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
    app.get('/signup', function(req, res) {

      // render the page and pass in any flash data if it exists
      res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

  // process the signup form
  // app.post('/signup', do all our passport stuff here);
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));
  // =====================================
  // PROFILE SECTION =====================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile1', isLoggedIn, function(req, res) {
      res.render('profile.ejs', {
        user : req.user // get the user out of session and pass to template
      });
    });

  // =====================================
  // LOGOUT ==============================
  // =====================================
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
