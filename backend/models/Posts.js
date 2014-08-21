var connection = require('../connection.js');

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

  	bd.insert('articles', {
	    title: url.parse(req._parsedUrl.path, true).query.title,
	    content: url.parse(req._parsedUrl.path, true).query.text,
	    author: url.parse(req._parsedUrl.path, true).query.author,
	    date: '2014-08-18'
  	}, function(err, results) {
    	console.log(results);
			cb(err, results);
  	});
	
};