var express = require('express');

var authRouter = express.Router();

var mongodb = require('mongodb').MongoClient;

var passport = require('passport');

var router = function (nav) {
	authRouter.route('/signUp')
		.post(function (req, res) {
			console.log(req.body);
			var url = 'mongodb://localhost:27017/LibreriaApp';
			mongodb.connect(url, function (err, db) {
				var collection = db.collection('users');
				var user = {
					username: req.body.userName,
					password: req.body.password
				};

				collection.insert(user, function (err, resultados) {
					req.login(resultados.ops[0], function () {
						res.redirect('/auth/profile');
					});
				});
			});

		});
	authRouter.route('/singIn')
		.post(passport.authenticate('local', {
			failureRedirect: '/'
	}), function (req, res) {
		res.redirect('/auth/profile');
	});
	authRouter.route('/profile')
		.all(function(req, res, next){
			if(!req.user){
				res.redirect('/Books');
			}
			next();
		})
		.get(function (req, res) {
			res.json(req.user);
		});
	return authRouter;
};

module.exports = router;