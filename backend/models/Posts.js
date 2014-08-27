var connection = require('../connection.js');
require("date-format-lite")

exports.list = function(limit, page, cb){
	var bd = connection.bd();
	bd.query('SELECT * FROM articles LIMIT ' + limit + ' OFFSET ' + page, function(err, results) {
		cb(err, results);
  });
};

exports.create = function(article, cb){
	var bd = connection.bd();
	var date = new Date();
 
  bd.insert('articles', {
		title: article.title,
	  content: article.text,
	  author: article.author,
	  date: date.format("D'th' MMM, YYYY")
  }, function(err, results) {
    console.log(results);
		cb(err, results);
  });
};