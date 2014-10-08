var connection = require('../connection.js');
require("date-format-lite");

var bd = connection.bd();
var date;

exports.search = function(word, cb){
	bd.query('SELECT * FROM articles WHERE content LIKE \'%' + word + '%\'', function(err, results) {
		console.log(results);
		cb(err, results);
  });
};

exports.list = function(limit, page, date, cb){
	if(date != ''){
		var where = 'WHERE date > \'' + '24th ' + date + '\' AND date < \'' + '32th ' + date + '\'';
	}else{
		var where = '';
	}
	bd.query('SELECT * FROM articles ' + where + ' LIMIT ' + limit + ' OFFSET ' + page, function(err, results) {
		cb(err, results);
  });
};

exports.create = function(article, cb){
	date = new Date();

	bd.insert('articles', {
		title: 		article.title,
		content: 	article.text,
		author: 	article.author,
		date: 		date.format("D'th' MMM, YYYY")
	}, function(err, results) {
		cb(err, results);
	});
};

exports.destroy = function(id, cb){
	bd.delete('articles', { id: id }, function(err, affectedRows) {
    cb(err, affectedRows);
	});
};

exports.update = function(article, cb){
	date = new Date();

  bd.update('articles', {
  	id: 			article.id,
		title: 		article.title,
	  content: 	article.text,
	  author: 	article.author,
	  date: 		date.format("D'th' MMM, YYYY")
  }, function(err, results) {
		cb(err, results);
	});
};

exports.show = function(id, cb){
	bd.queryRow('SELECT * FROM articles where id=?', [id], function(err, row) {
    cb(err, row);
  });
};