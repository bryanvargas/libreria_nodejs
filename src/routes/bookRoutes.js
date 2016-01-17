var express = require('express');

var libroRouter = express.Router();

var sql = require('mysql');

var userModel = require('../models/modelMysql');

var router = function (nav) {
//	var books =[
//			{
//				titulo: 'War and Peace',
//				genero: 'Ficcion Historica',
//				autor: 'Lev Nikolayevich Tolstoy',
//				leido: false
//			},
//			{
//				titulo: 'Les Miserables',
//				genero: 'Ficcion Historica',
//				autor: 'Victor Hugo',
//				leido: false
//			},
//			{
//				titulo: 'Life On The Mississipi',
//				genero: 'Historia',
//				autor: 'Mark Twain',
//				leido: false
//			},
//			{
//				titulo: 'Childhood',
//				genero: 'Biografia',
//				autor: 'Lev Nikolayevich Tolstoy',
//				leido: false
//			},
//			{
//				titulo: 'The Dark World',
//				genero: 'Fantasia',
//				autor: 'Henry Kuttnel',
//				leido: false
//			}
//		];
	
	var nave = nav;
	//single
	libroRouter.route('/:id')
		.get(function (req, res) {
			var id = req.params.id;		
			userModel.getLibro(id, function(err, booku){
				//		res.send('Hello Singel Book');
				res.render('bookView', {
				title: 'Libro',
				nav: nav,
				book: booku[0]
				});	
			});		
		});

	libroRouter.route('/')
		.get(function (req, res) {		
			userModel.getLibros(function(err, books) {
				res.render('booksListView', {
					title: 'Libros',
					nav: nav,
					books: books
				});
			});
		});
	return libroRouter;
};

module.exports = router;