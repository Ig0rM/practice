var connection = require('../connection.js');

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
	connection.update('articles', article, cb);
};