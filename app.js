var express = require('express');

var app = express();

//var port = 3030;
var port = process.env.PORT || 5000 

app.use(express.static('public'));
//app.use(express.static('src/views'));

app.set('views', './src/views');

/*Usando template engine JADE
app.set('view engine', 'jade');
*/

/*Usando template engine HANDLEBARS
var handlebars = require('express-handlebars');
app.engine('.hbs', handlebars({extname: '.hbs'}));

app.set('view engine', '.hbs');
*/

/*USO de plantilla EJS*/
app.set('view engine', 'ejs');	

/* queda obsoleto
app.get('/', function(req, res) {
    res.send('Hola mundo');
});
*/
//refactorizacion utilizando preprosesador JADE
app.get('/', function (req, res) {
	res.render('index', {
		title: 'Bienvenidos a HANDLEBARS',
		listDos: ['Categotia 1', 'Categotia 2' ,'Categotia 3' ,'Categotia 4']
	});
}); 

app.get('/books', function (req, res) {
    res.send('Hola Books');
});
app.listen(port, function (err) {
    console.log('corriendo servidor en el puerto ' + port);
});
