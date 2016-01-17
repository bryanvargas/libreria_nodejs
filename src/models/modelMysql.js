var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'shingo',
  password : 'vic00to00ria00@',
  database : 'nodejs'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});

//creamos un objeto para ir almacenando todo lo que necesitamos

var userModel = {};

//call
//callback es una funcione que se pasa como parametro
userModel.getLibros = function (callback) {
	if (connection) {
		connection.query('select * from books', function (error, rows) {
			if(error){
				throw error;
			}
			else {
				callback(null, rows);
			}
		});
	}
};

userModel.getLibro = function (id, callback) {
	if(connection){
		
		var sql = 'select * from books where titulo = ?';
		var insert = [id];
		sql = mysql.format(sql, insert);
//		var sql = 'select * from books where id = ?', [id];
		connection.query(sql, function(error, row){
			if(error){throw error;}
			else{callback(null, row);}
		});
	}
};

//connection.end();

module.exports = userModel;