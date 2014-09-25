var Posts = require('../models/Posts.js');
var qs = require('querystring');
var DEFAULT_LIMIT = 4;
var DEFAULT_PAGE = 0;

var article;


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
	var data;
	
	req.on('data', function(chunk){
	 	data = chunk;
	});

	req.on('end', function() {
	 	article = qs.parse(data);


	    console.log(article);

		Posts.create(article, function(err, posts){
			//res.send(err, posts)

			if (err) {
				res.statusCode = 500;
				res.end(JSON.stringify(err));
			} else {
				res.statusCode = 200;
				res.end(JSON.stringify(posts));
			}
		});
	});
};

exports.destroy = function(req, res){
	var data;

	req.on('data', function(chunk){
	 	data = chunk;
	});

	req.on('end', function() {
	 	article = qs.parse(data);


		Posts.destroy(article, function(err, posts){
			//res.send(err, posts)
			if (err) {
				res.statusCode = 500;
				res.end(JSON.stringify(err));
			} else {
				res.statusCode = 200;
				res.end(JSON.stringify(posts));
			}
		});
	});
};

exports.update = function(req, res){
	var data;

	req.on('data', function(chunk){
	 	data = chunk;
	});

	req.on('end', function() {
		article = qs.parse(data);

		Posts.update(article, function(err, posts){
			//res.send(err, posts)
			if (err) {
				res.statusCode = 500;
				res.end(JSON.stringify(err));
			} else {
				res.statusCode = 200;
				res.end(JSON.stringify(posts));
			}
		});
	});
};

exports.show = function(req, res){
	var id = req.params.id || false;

	if (!id){
		return false;
	}
	Posts.show(id, function(err, posts){
		if (err) {
			res.statusCode = 500;
			res.end(JSON.stringify(err));
		} else {
			res.statusCode = 200;
			res.end(JSON.stringify(posts));
		}
	});
};