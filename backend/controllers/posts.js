var Posts = require('../models/Posts.js');
var qs = require('querystring');
var moment = require('moment');
var DEFAULT_LIMIT = 4;
var DEFAULT_PAGE = 0;
var DEFAULT_DATE = "";

getUsername = function(req){
	var name;

	if (req.user.facebook.name){
    name = req.user.facebook.name;
  }else{
		name = req.user.local.name;
  }

  return name;
};

makeRes = function(res, err, result){
	if (err) {
			res.statusCode = 500;
			res.send(JSON.stringify(err));
		} else {
			res.statusCode = 200;
			res.send(JSON.stringify(result));
		}
	return true;
};

exports.search = function(req, res){
	var params = {
		word: req.params.word,
		author: getUsername(req)
	};

	Posts.search(params, function(err, posts){
		makeRes(res, err, posts);
	});

};

exports.index = function(req, res){

	var params = {
		limit : req.params.limit || DEFAULT_LIMIT,
		page : req.params.page || DEFAULT_PAGE,
		date : req.params.date || DEFAULT_DATE,
		author : getUsername(req)
	};

	Posts.list(params, function(err, posts){
		makeRes(res, err, posts);
	});
};

exports.create = function(req, res){
	var article = {
		title: 		req.body.title,
		content: 	req.body.text,
		author: 	getUsername(req),
		date: 		moment().format("MMM Do YY")
	};

	Posts.create(article, function(err, posts){
		makeRes(res, err, posts);
	});
};

exports.destroy = function(req, res){
	var id = req.params.id;

	Posts.destroy(id, function(err, posts){
		makeRes(res, err, posts);
	});
};

exports.update = function(req, res){
	var article = {
		id: 		req.body.id,
		title: 		req.body.title,
		content: 	req.body.text,
		author: 	getUsername(req),
		date: 		moment().format("MMM Do YY")
	};
	
	Posts.update(article, function(err, result){
			makeRes(res, err, result);
	});
};