var Posts = require('../models/Posts.js');
var qs = require('querystring');
var DEFAULT_LIMIT = 4;
var DEFAULT_PAGE = 0;
var DEFAULT_DATE = "";

var article;

exports.search = function(req, res){
	var word = req.params.word;
	Posts.search(word, function(err, posts){
		if (err) {
			res.statusCode = 500;
			res.end(JSON.stringify(err));
		} else {
			res.statusCode = 200;
			res.end(JSON.stringify(posts));
		}
	});

};

exports.index = function(req, res){
	var limit = req.params.limit || DEFAULT_LIMIT;
	var page = req.params.page || DEFAULT_PAGE;
	var date = req.params.date || DEFAULT_DATE;

	Posts.list(limit, page, date, function(err, posts){
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
	 //	article = qs.parse(data);
	 	article = JSON.parse(data);
   

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
	 	// article = qs.parse(data);
	 	id = JSON.parse(data);

		Posts.destroy(id, function(err, posts){
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
		// article = qs.parse(data);

		article = JSON.parse(data);
		// console.log(article);
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