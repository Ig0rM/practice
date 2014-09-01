var connection = require('../connection.js');
require("date-format-lite");
var qs = require('querystring');
var data = '';


exports.list = function(limit, page, cb){
	var bd = connection.bd();
	bd.query('SELECT * FROM articles LIMIT ' + limit + ' OFFSET ' + page, function(err, results) {
		cb(err, results);
  });
};

exports.create = function(req, cb){
	var bd = connection.bd();
	var date = new Date();
	req.on('data', function(chunk){
		data += chunk;
	});

	req.on('end', function() {
    var article = qs.parse(data);
    data = '';
		bd.insert('articles', {
			title: article.title,
			content: article.text,
			author: article.author,
			date: date.format("D'th' MMM, YYYY")
		}, function(err, results) {
			cb(err, results);
		});
  });
  
};

exports.destroy = function(req, cb){
	req.on('data', function(chunk){
		data += chunk;
	});
	var bd = connection.bd();
	req.on('end', function() {
    var article = qs.parse(data);
    data = '';
		bd.delete('articles', { id: article.id }, function(err, affectedRows) {
	    cb(err, affectedRows);
		});
	});
};

exports.update = function(req, cb){
	var bd = connection.bd();
	var date = new Date();
	req.on('data', function(chunk){
		data += chunk;
	});
 	req.on('end', function() {
    var article = qs.parse(data);
    data = '';
	  bd.update('articles', {
	  	id: article.id,
			title: article.title,
		  content: article.text,
		  author: article.author,
		  date: date.format("D'th' MMM, YYYY")
	  }, function(err, results) {
			cb(err, results);
	  });
	});
};

exports.show = function(id, cb){
	var bd = connection.bd();
	bd.queryRow('SELECT * FROM articles where id=?', [id], function(err, row) {
    cb(err, row);
  });
};