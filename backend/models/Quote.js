quotes = [
	{
		author: 'David Brent',
		text:		'There may be no "I" in team, but there\'s a "ME" if you look hard enough.'
	},
	{
		author: 'Pablo Picasso',
		text:		'Computers are useless.  They can only give you answers.'
	},
	{
		author: 'Alan Kay',
		text:		'Most software today is very much like an Egyptian pyramid with millions of bricks piled on top of each other, with no structural integrity, but just done by brute force and thousands of slaves.'
	}
];

exports.index = function(quote, cb){
	cb(null, quotes[quote]);
};