var express = require('express');

var adminRouter = express.Router();

var mongodb = require('mongodb').MongoClient;

var books =[
			{
				titulo: 'War and Peace',
				genero: 'Ficcion Historica',
				autor: 'Lev Nikolayevich Tolstoy',
				leido: false
			},
			{
				titulo: 'Les Miserables',
				genero: 'Ficcion Historica',
				autor: 'Victor Hugo',
				leido: false
			},
			{
				titulo: 'Life On The Mississipi',
				genero: 'Historia',
				autor: 'Mark Twain',
				leido: false
			},
			{
				titulo: 'Childhood',
				genero: 'Biografia',
				autor: 'Lev Nikolayevich Tolstoy',
				leido: false
			},
			{
				titulo: 'The Dark World',
				genero: 'Fantasia',
				autor: 'Henry Kuttnel',
				leido: false
			}
		];



var router = function(nav){
	adminRouter.route('/addBooks')
	.get(function(req, res){
		var url = 'mongodb://localhost:27017/LibreriaApp';
		mongodb.connect(url, function (err, db) {
			var collection = db.collection('books');
			collection.insertMany(books, function (err, resultado) {
				res.send(resultado);
				db.close();
			});
		});
//		res.send('Agregando Libros');	
	});
	return adminRouter;
};

module.exports = router;