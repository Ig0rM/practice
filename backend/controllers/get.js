exports.getPosts = function(count){
  var result; 

	var mysql = require('mysql');
  var mysqlUtilities = require('mysql-utilities');
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'frofer1990',
    database : 'practice_site'
  });
	connection.connect();

  // Mix-in for Data Access Methods and SQL Autogenerating Methods
  mysqlUtilities.upgrade(connection);

  // Mix-in for Introspection Methods
  mysqlUtilities.introspection(connection);

  // Do something using utilities

  /*connection.query('SELECT * FROM articles LIMIT 3', function(err, results) {
    console.dir({query:results});
    console.dir(result);
    connection.end();
    return result;
  });*/

  
  /*connection.select('articles', '*', {  }, function(err, results) {
      console.dir({select:results, err:err});
  });*/

  /*connection.queryRow(
      'SELECT * FROM articles LIMIT ' + count,
      function(err, row) {
          console.dir({queryRow:row});
      }
  );*/

};