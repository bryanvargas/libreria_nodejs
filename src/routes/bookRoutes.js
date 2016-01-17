var express = require('express');

var libroRouter = express.Router();

var mongodb = require('mongodb').MongoClient;

var objectId = require('mongodb').ObjectID;

var router = function (nav) {
	
	var nave = nav;
	//single
	libroRouter.route('/:id')
		.get(function (req, res) {
			var id = new objectId(req.params.id);
			var url = 'mongodb://localhost:27017/LibreriaApp';
			mongodb.connect(url, function (err, db) {
				var collection = db.collection('books');
				collection.findOne({_id: id}, function (err, resultado) {
					res.render('bookView', {
						title: 'Libro',
						nav: nav,
						book: resultado
					});
				});
			});
		});

	libroRouter.route('/')
		.get(function (req, res) {
			var url = 'mongodb://localhost:27017/LibreriaApp';
			mongodb.connect(url, function (err, db) {
				var collection = db.collection('books');
				collection.find({}).toArray(function (err, resultados) {
					res.render('booksListView', {
						title: 'Libros',
						nav: nav,
						books: resultados
					});
				});
			});			
		});
	return libroRouter;
};

module.exports = router;