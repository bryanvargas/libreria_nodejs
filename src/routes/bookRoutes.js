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
		.all(function (req, res, next) {
			var id = req.params.id;
			userModel.getLibro(id, function (err, booku) {
				if (booku.length === 0) {
					res.status(404).send('No Encontrado');
				} else {
					req.book = booku[0];
					next();
				}
			});
		})
		.get(function (req, res) {
			res.render('bookView', {
				title: 'Libro',
				nav: nav,
				book: req.book
			});
		});


	libroRouter.route('/')
		.get(function (req, res) {
			userModel.getLibros(function (err, books) {
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