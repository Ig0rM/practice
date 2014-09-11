var Posts = require('../models/Posts.js');
var qs = require('querystring');
var DEFAULT_LIMIT = 4;
var DEFAULT_PAGE = 0;

var article;
var data = "";

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
	req.on('data', function(chunk){
	 	data += chunk;
	});

			/*res.setHeader("Access-Control-Allow-Origin", "*");
  		res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
 			res.setHeader("Access-Control-Allow-Methods", "PUT, GET,POST,OPTIONS");*/

	req.on('end', function() {
	 	article = qs.parse(data);
    data = '';

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
	req.on('data', function(chunk){
	 	data += chunk;
	});

	req.on('end', function() {
	 	article = qs.parse(data);
	  data = '';

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
	req.on('data', function(chunk){
	 	data += chunk;
	});

	req.on('end', function() {
		article = qs.parse(data);
	  data = '';

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