var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();

app.set('view engine', 'ejs');
// app.set('views', __dirname);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));

var con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'test'
});

con.connect();


var urlencoded = app.use(bodyParser.urlencoded({ extended: false }));
// app.use('/public', express.static('public')); //this will use the static files from the public folder like js and css file without this the files will not be loaded.

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req,res){
	res.render("home");
});

app.get('/test', function(req, res){
	// var myObj;
	//res.writeHead(200, {'Content-Type': 'application/json'});
	// con.query("select * from patient", function(err, result){
		// console.log(result);
		// myObj = result;

		// res.sendFile(__dirname + '/views/test.html',result);
		
		// res.send(result);
		// console.log(result);
	// });

	res.render("test");
	
});

app.get('/test2', function(req,res){

	// res.render("test2")

	con.query("select * from patient", function(err, results){
		
		res.render("test2", {results: results});

	});

});

app.get('/card',function(req,res){
	res.render("card");
});

app.listen(5500);
