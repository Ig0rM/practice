var _getConnection = function(){
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
  
  return connection;
};

var bd;

exports.bd = function() {
  if (bd){
    return bd;
  } else {
     bd = _getConnection();
     return bd;
  }
}