var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'ehfhfh12',
  database : 'fintech'
});
 
connection.connect();
 
connection.query('SELECT * from user', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});
 
connection.end();