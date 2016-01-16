var express = require('express');

var libroRouter = express.Router();

var router = function (nav) {
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

	var nave = nav;
	//single
	libroRouter.route('/:id')
		.get(function (req, res) {
			var id = req.params.id;
			//		res.send('Hello Singel Book');
			res.render('bookView', {
				title: 'Libro',
				nav: nave,
				book: books[id]
			});
		});

	libroRouter.route('/')
		.get(function (req, res) {
			res.render('booksListView', {
				title: 'Libros',
				nav: nave,
				books: books
			});
		});
	return libroRouter;
};

module.exports = router;