var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();



//var port = 3030;
var port = process.env.PORT || 5000;

var nav = 
	[
		{
			 link: '/Books',
			 text: 'Libros'
		},
		{
			 link: '/Autores',
			 text: 'Autores'
		}
	];

//aunque paresca confuso, require se convirte en una funcion en donde (nav) vendria siendo el parametro 
var libroRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutest')(nav);
var authRouter = require('./src/routes/authRouter')(nav);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'library'}));

require('./src/config/passport')(app);



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


app.use('/Books', libroRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

//refactorizacion utilizando preprosesador JADE
app.get('/', function (req, res) {
	res.render('index', {
		title: 'Bienvenidos a Libros Shingo',
		nav: nav	
	});
}); 

//app.get('/books', function (req, res) {
//	res.send('Hola Books');
//});
app.listen(port, function (err) {
	console.log('corriendo servidor en el puerto ' + port);
});
