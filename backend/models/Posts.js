var connection = require('../connection.js');
var moment = require('moment');


exports.search = function(params, cb){
  connection.search('articles', params, cb)
};

exports.list = function(params, cb){
	connection.index('articles', params, cb);
};

exports.create = function(article, cb){
	connection.create('articles', article, cb);

};

exports.destroy = function(id, cb){
	connection.delete('articles', id, cb);
};

exports.update = function(article, cb){
	var now = new Date();
	var newArticle = {
		id: 			article.id,
		title: 		article.title,
		content: 	article.text,
		author: 	article.author,
		date: 		moment().format("MMM Do YY")
	};

	connection.update('articles', newArticle, cb);

};

exports.show = function(id, cb){
	bd.queryRow('SELECT * FROM articles where id=?', [id], function(err, row) {
    cb(err, row);
  });
};