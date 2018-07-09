var express = require('express')
	, load = require('consign')
	, cookieParser = require('cookie-parser')
	, session = require('express-session')
	, bodyParser = require('body-parser')
	, methodOverride = require('method-override')
	, error = require('./middleware/error')
	, mongoose = require('mongoose')
	, app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookieParser('cart_lista_de_compras'));
app.use(session({
	secret: "trabalhonode18",
	name: 'cart_lista_de_compras',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

mongoose.connect('mongodb://trabalhonode:trabalhonode18@ds227821.mlab.com:27821/cart_lista_de_compras');
global.db = mongoose.connection;

load().include('models')
	.then('controllers')
	.then('routes')
	.into(app);

// Executa após as rotas se não encontrado
app.use(error.notFound);
// Executa ao ocorrer um erro
app.use(error.serverError);



app.listen(3000, function () {
	console.log("Lista de compras no ar.");
});