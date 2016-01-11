var express = require('express');

var app = express();

//var port = 3030;
var port = process.env.PORT || 5000 

app.use(express.static('public'));
app.use(express.static('src/views'));


app.get('/', function(req, res) {
    res.send('Hola mundo');
});
app.get('/books', function (req, res) {
    res.send('Hola Books');
});
app.listen(port, function (err) {
    console.log('corriendo servidor en el puerto ' + port);
});
