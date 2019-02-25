const http = require('http');
const express =require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Web3 = require('web3');
const BigNumber = require('bignumber.js');
const port=process.env.PORT || 8080;
const session = require('express-session')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const multer = require('multer');
const path = require('path');
const encrypt= require('./encryptFolder.js');
const decrypt= require('./decryptFolder.js');


var key = 'Sacred@Coders';
var options = { algorithm: 'aes256' };

app.use(express.static(__dirname + '/uploads'));

const Storage = multer.diskStorage({
	filename : function(req,file,cb){
		let temp = Date.now() + file.originalname;
		cb(null , temp)
		encrypt.enc('./uploads/'+temp,'./uploads/encrypted_output.txt',key,options);
	},
	destination : function(req,file,cb){
		cb(null, 'uploads/')
	}
});

const upload = multer({storage:Storage});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var macfromip = require('macfromip');

var Patient = require('./models/patient');



//session
app.use(session({
  secret: 'sacred coders',
  resave: false,
  saveUninitialized: false
}))



app.get('/test',(req,res)=>{
	let ip =req.ip;
	console.log("sad"+ip.substr(1));
	macfromip.getMac(""+ip, function(err, data){
    if(err){
        console.log(err);
    }
    console.log("asd"+data);
});
	console.log(ip);

});


app.post('/upload',upload.single('Image'),(req,res)=>{
	console.log(req.file);
});


app.get('/decrypt',(req,res)=>{
	console.log("isnide decrypt");
	decrypt.dec('./uploads/encrypted_output.txt','./uploads/1.jpg',key,options);
});



//const requestIp = require('request-ip');
 
// inside middleware handler
// const ipMiddleware = function(req, res, next) {
//     const clientIp = requestIp.getClientIp(req); 
//     next();
// };


// const requestIp = require('request-ip');
// app.use(requestIp.mw())
 
// app.use(function(req, res) {
//     const ip = req.clientIp;
//     res.end(ip);
// });

// app.get('/test',(req,res)=>{
// 	let ip =req.clientIp;
// 	console.log("sad"+ip);
// 	macfromip.getMac(""+ip, function(err, data){
//     if(err){
//         console.log(err);
//     }
//     console.log("asd"+data);
// });
// 	console.log(ip);

// });





//Database Connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/MediChain2', {useNewUrlParser: true});
//.then(() => console.log("Connection Successful"));
//.catch((err) => concole.error(err));


app.post('/patient_registeration',(req,res)=>{
	// const contactNo = req.body.contactNo;
	// const firstname = req.body.firstName;
	const array = {firstName: req.body.firstName, contactNumber: req.body.contactNo};
	console.log(array);
	//var me = new Patient(patient);
	var data = Patient(array);
	console.log(data);
	// data.save(function(err){
	// 	if(err){
	// 		console.log("nahi hua");
	// 	}
	// 	else{
	// 		console.log("hua");
	// 	}
	// });


	data.save()
	.then(result => {
		console.log(result);
		console.log("success");
	})
	.catch(err => console.log(err));
	//me.save(array);
});




//get patients
app.get('/getPatients/:firstName',(req,res)=>{
	var temp = req.params.firstName;
	Patient.findById(temp)
	.exec()
	.then(doc => {
		console.log("database",doc);
		res.sendStatus(200);
	})
	.catch(err => {
		console.log(err);
		res.sendStatus(500).json({error : err});
	});
});


//delete

app.get('/deletePatients/:firstName',(req,res)=>{
	var temp = req.params.firstName;
	Patient.deleteOne({_id : temp})
	.exec()
	.then(result => {
		//console.log("database",doc);
		res.sendStatus(200);
	})
	.catch(err => {
		console.log(err);
		res.sendStatus(500).json({error : err});
	});
});


//update
app.post('/updatePatients/:firstName',(req,res)=>{
	var temp = req.params.firstName;
	Patient.updateOne({_id : temp},{ $set: { firstName: "Nishu" }})
	.exec()
	.then(result => {
		//console.log("database",doc);
		res.sendStatus(200);
	})
	.catch(err => {
		console.log(err);
		res.sendStatus(500).json({error : err});
	});
});


//LOGIN
app.post('/login',(req, res)=>{

	const firstName = req.body.firstName;
	const password = req.body.password;
	Patient.findOne({firstName:"Nishant"},function(err , patients){
		if(err){
				console.log(err);
		}
		else{
			console.log(patients);
		}

	});
});

app.get('/patientsTreated',(req,res)=>{
	const dId = req.body.contactNo;
	// const firstname = req.body.firstName;
	const array = {firstName: req.body.firstName, contactNumber: req.body.contactNo};
	console.log(array);
	//var me = new Patient(patient);
	var data = Patient(array);
	console.log(data);
	data.save(function(err){
		if(err){
			console.log("nahi hua");
		}
		else{
			console.log("hua");
		}
	});
	//me.save(array);
});



dId = 1;
let temp = [tId:"1.2.3$p1",tId:"1.3$p2"tId:"3$p3"tId:"1.2.3$p4"];


app.listen(8080);