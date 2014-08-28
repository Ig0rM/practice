var Posts = require('../models/Posts.js');
var DEFAULT_LIMIT = 4;
var DEFAULT_PAGE = 0;

exports.index = function(req, res){
	var limit = req.params.limit || DEFAULT_LIMIT;
	var page = req.params.page || DEFAULT_PAGE;
	Posts.list(limit, page, function(err, posts){
		if (err) {
			res.statusCode = 500;
			res.end(JSON.stringify(err));
		} else {
			res.statusCode = 200;
			res.end(JSON.stringify(posts));
		}
	});
};

exports.create = function(req, res){
	var article = req.params || false;
	if (!article){
		return false;
	}

	Posts.create(article, function(err, posts){
		res.send(err, posts)
		if (err) {
			res.statusCode = 500;
			res.end(JSON.stringify(err));
		} else {
			res.statusCode = 200;
			res.end(JSON.stringify(posts));
		}
	});
};

exports.destroy = function(req, res){
	var id = req.params.id || false;
	if (!id){
		return false;
	}

	Posts.destroy(id, function(err, posts){
		res.send(err, posts)
		if (err) {
			res.statusCode = 500;
			res.end(JSON.stringify(err));
		} else {
			res.statusCode = 200;
			res.end(JSON.stringify(posts));
		}
	});
};