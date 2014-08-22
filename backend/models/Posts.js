var connection = require('../connection.js');
require("date-format-lite")

var url = require('url');

exports.list = function(req, cb){
	 var bd = connection.bd();
		bd.query('SELECT * FROM articles LIMIT ' + url.parse(req._parsedUrl.path, true).query.limit + ' OFFSET ' + url.parse(req._parsedUrl.path, true).query.page, function(err, results) {
			console.log(results);
			cb(err, results);
  	});
};


exports.create = function(req, cb){
		var bd = connection.bd();
		var date = new Date();
 
  	bd.insert('articles', {
	    title: url.parse(req._parsedUrl.path, true).query.title,
	    content: url.parse(req._parsedUrl.path, true).query.text,
	    author: url.parse(req._parsedUrl.path, true).query.author,
	    date: date.format("D'th' MMM, YYYY")
  	}, function(err, results) {
    	console.log(results);
			cb(err, results);
  	});
	
};