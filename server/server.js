//importing libraries
const express= require('express');
const bodyParser= require('body-parser');
const mysql = require('mysql');
const session = require('express-session');


//Object Creation
const app= express();

//Middleware
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
	secret: "sacred coders",
	resave: false,
	saveUninitialized: false

	}));



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//Login

app.post('/login',function (req,res){
	console.log('Got request for /login');
	//console.log(req);
	const userName= req.body.user;
	const password= req.body.pass;
	// if(req.session.user)
	// 	res.send("Session is already set");
	// else
	// {
	req.session.user=userName;
	console.log(req.session.userName);
	//console.log(userName);
	// const password= req.d.pass;
	const values= {'user':userName,'pass':password};
	console.log(values);
	res.send("Session is set");
	//}
	//res.send('You are logged in');
});

app.post('/logout',(req,res)=>{
	if(req.session.user)
	req.session.user=null;
	res.send("Logged out");


});





//listening port

app.listen(8080);