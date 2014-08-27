var Quote = require('../models/Quote.js');
var DEFAULT_QUOTE = 0;

exports.index = function(req, res){
	var quote = req.params.quote || DEFAULT_QUOTE;

	Quote.index(quote, function(err, quotes){
		if (err) {
			res.statusCode = 500;
			res.end(JSON.stringify(err));
		} else {
			res.statusCode = 200;
			res.end(JSON.stringify(quotes));
		}
	});
};