var Posts = require('../models/Posts.js');
var qs = require('querystring');
var moment = require('moment');
var DEFAULT_LIMIT = 4;
var DEFAULT_PAGE = 0;
var DEFAULT_DATE = "";


exports.search = function(req, res){
	var params = {
		word: req.params.word,
		author: req.user.local.name
	};

	Posts.search(params, function(err, posts){
		if (err) {
			res.statusCode = 500;
			res.send(JSON.stringify(err));
		} else {
			res.statusCode = 200;
			res.send(JSON.stringify(posts));
		}
	});

};

exports.index = function(req, res){
	var params = {
		limit : req.params.limit || DEFAULT_LIMIT,
		page : req.params.page || DEFAULT_PAGE,
		date : req.params.date || DEFAULT_DATE,
		author : req.user.local.name || null
	};

	Posts.list(params, function(err, posts){
		if (err) {
			res.statusCode = 500;
			res.send(JSON.stringify(err));
		} else {
			res.statusCode = 200;
			res.send(JSON.stringify(posts));
		}
	});
};

exports.create = function(req, res){
	var article = {
		title: 		req.body.title,
		content: 	req.body.text,
		author: 	req.user.local.name,
		date: 		moment().format("MMM Do YY")
	};

	Posts.create(article, function(err, posts){
		console.log("Posts.create");
		if (err) {
			res.statusCode = 500;
			res.send(JSON.stringify(err));
		} else {
			res.statusCode = 200;
			res.send(JSON.stringify(posts));
		}
	});
};

exports.destroy = function(req, res){
	var id = req.params.id;

	Posts.destroy(id, function(err, posts){
		if (err) {
			res.statusCode = 500;
			res.send(JSON.stringify(err));
		} else {
			res.statusCode = 200;
			res.send(JSON.stringify(posts));
		}
	});
};

exports.update = function(req, res){
	var article = {
		id: 		req.body.id,
		title: 		req.body.title,
		content: 	req.body.text,
		author: 	req.user.local.name,
		date: 		moment().format("MMM Do YY")
	};
	
	Posts.update(article, function(err, result){
			if (err) {
				res.statusCode = 500;
				res.send(JSON.stringify(err));
			} else {
				res.statusCode = 200;
				res.send(JSON.stringify(result));
			}
		});
};