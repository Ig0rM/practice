
function next() {

	next.unshift(function(req, res, next) {

            res.end('Nonelloworld!');	
           return true;
          });

};	


exports.createRoutes = function(middlewares) {
			middlewares.unshift(function(req, res, next) {

            	if (req.url == '/helloworld') {
            		res.end('Hello, world from port !');
            		

            	


              var mysql = require('mysql');
              var mysqlUtilities = require('mysql-utilities');
                var connection = mysql.createConnection({
                  host     : 'localhost',
                  user     : 'root',
                  password : 'frofer1990',
                  database : 'world'
                });

                connection.connect();

                // Mix-in for Data Access Methods and SQL Autogenerating Methods
                mysqlUtilities.upgrade(connection);

                // Mix-in for Introspection Methods
                mysqlUtilities.introspection(connection);

                // Do something using utilities
                connection.queryRow(
                    'SELECT * FROM city where id=?', [4],
                    function(err, row) {
                        console.dir({queryRow:row});
                    }
                );

                /*var query = connection.query('SELECT * FROM city WHERE id=5');*/
                 
     /*           query.on('error', function(err) {
                    throw err;
                });
                 
                query.on('fields', function(fields) {
                    console.log(fields);
                });*/
                 
                /*query.on('result', function(row) {
                    console.log(row.Name);
                });*/
                 
                connection.end();
  /*              alert(query);*/
                }else{
                  next();
                }
          });
};	


