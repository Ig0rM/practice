var Posts = require('../models/Posts.js');

exports.get = function(req, res){
	Posts.list(req, function(err, posts){
		if (err) {
			res.statusCode = 500;
			res.end(JSON.stringify(err));
		} else {
			res.statusCode = 200;
			res.end(JSON.stringify(posts));
		}
	});
};

exports.post = function(req, res){
	Posts.create(req, function(err, posts){
		if (err) {
			res.statusCode = 500;
			res.end(JSON.stringify(err));
		} else {
			res.statusCode = 200;
			res.end(JSON.stringify(posts));
		}
	});
};