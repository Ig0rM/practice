exports.addPost = function(){
	var mysql = require('mysql');
  var mysqlUtilities = require('mysql-utilities');
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'frofer1990',
    database : 'practice_site'
  });
	connection.connect();


  mysqlUtilities.upgrade(connection);


  mysqlUtilities.introspection(connection);

  connection.insert('articles', {
    title: 'Lorem ipsum 1323',
    content: 'Lorem ipsum dolor sit amet, c',
    author: 'loreDm',
    date: '2014-08-18'
  }, function(err, results) {
    console.dir({insert:results, err:err});
  });


/*  connection.delete('articles', { id:2 }, function(err, affectedRows) {
    console.dir({delete:affectedRows});
  });*/
  
/*	connection.end();*/
  return true;
};