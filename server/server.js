//importing libraries
const express= require('express');
const bodyParser= require('body-parser');
const mysql = require('mysql');
const session = require('express-session');
const fs = require('fs');
const encrypt= require('./encryptFolder.js');
const decrypt= require('./decryptFolder.js');
const auth=require('./authentication.js');

//Declaring constants
var key = 'Sacred@Coders';
var options = { algorithm: 'aes256' };

//Object Creation
const app= express();

//Middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
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
	console.log('Got request for /Login');

	auth.login(req,res);
});






app.post('/logout',(req,res)=>{
	console.log('Got request for /logout');
	auth.logout(req,res);
});

app.all('/encrypt',(req,res)=>{
	encrypt.enc('input.txt','encrypted_output.txt',key,options);
	res.send('Successfully encrypted');
});

app.all('/decrypt',(req,res)=>{
	decrypt.dec('encrypted_output.txt','input.txt',key,options);
	res.send('Successfully decrypted');
});



//listening port

app.listen(8080);