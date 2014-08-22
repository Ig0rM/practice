var Quote = require('../models/Quote.js');

exports.get = function(req, res){
	Quite.get(req, function(err, posts){
		if (err) {
			res.statusCode = 500;
			res.end(JSON.stringify(err));
		} else {
			res.statusCode = 200;
			res.end(JSON.stringify(posts));
		}
	});
};