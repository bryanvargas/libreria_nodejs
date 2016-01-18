var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongodb = require('mongodb').MongoClient;

module.exports = function () {
	passport.use(new LocalStrategy({
		usernameField: 'userName',
		password: 'password'
	}, function (username, password, done){
		var url = 'mongodb://localhost:27017/LibreriaApp';
		mongodb.connect(url, function (err, db) {
			var collection = db.collection('users');
			collection.findOne({
				username: username
			}, function (err, resultados){
				if( resultados.password === password){
					var user = resultados;
					done(null, user);					
				} else{
					done(null, false);
//					done('no encontrado', false);
				} 
			
			});
		});
	
	}));
};