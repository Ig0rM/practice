var connection = require('../connection.js');
require("date-format-lite");

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
		cb(err, results);
  });
};

exports.destroy = function(id, cb){
	var bd = connection.bd();
	bd.delete('articles', { id: id }, function(err, affectedRows) {
    cb(err, affectedRows);
	});
};

exports.update = function(article, cb){
	var bd = connection.bd();
	var date = new Date();
/*	console.log(article.title);
	console.log(article.id);*/
 	/*alert('lol');*/
  bd.update('articles', {
  	id: article.id,
		title: article.title,
	  content: article.text,
	  author: article.author,
	  date: date.format("D'th' MMM, YYYY")
  }, function(err, results) {
  	console.log(results);
		cb(err, results);
  });
};

exports.show = function(id, cb){
	var bd = connection.bd();
	bd.queryRow('SELECT * FROM articles where id=?', [id], function(err, row) {
    cb(err, row);
  });
};