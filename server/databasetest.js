const http = require('http');
const express =require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Web3 = require('web3');
const BigNumber = require('bignumber.js');
const port=process.env.PORT || 8080;
const session = require('express-session');
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const multer = require('multer');
const path = require('path');
const encrypt= require('./encryptFolder.js');
const decrypt= require('./decryptFolder.js');
//const t = require('./passport.js');
const md5 = require('md5');

//setting the template engine
app.set('view engine','ejs');


var key = 'Sacred@Coders';
var options = { algorithm: 'aes256' };

app.use(express.static(__dirname + '/uploads'));

const Storage = multer.diskStorage({
	filename : function(req,file,cb){
		let temp = Date.now() + file.originalname;
		cb(null , temp)
		encrypt.enc('./uploads/'+temp,'./uploads/'+file.originalname+'encrypted_output.txt',key,options);
	},
	destination : function(req,file,cb){
		cb(null, 'uploads/')
	}
});

// const Storage2 = multer.diskStorage({
// 	filename : function(req,file,cb){
// 		let temp = Date.now() + file.originalname;
// 		cb(null , temp)
// 		encrypt.enc('./uploads/'+temp,'./uploads/encrypted_output.txt',key,options);
// 	},
// 	destination : function(req,file,cb){
// 		cb(null, 'uploads/')
// 	}
// });


const upload = multer({storage:Storage});



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var macfromip = require('macfromip');

var Patient = require('./models/patient');
//var Doctor = require('./models/doctor');
var Treatment = require('./models/treatment');



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


// app.get('/home',(req,res){

// 	res.render("home.ejs")

// })




app.post('/upload',upload.array('Image',10),(req,res)=>{
	console.log(req.files);
});


app.get('/decrypt',(req,res)=>{
	console.log("inside decrypt");
	decrypt.dec('./uploads/3.jpgencrypted_output.txt','./uploads/1.jpg',key,options);
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
	// const array = {firstName: req.body.firstName, contactNumber: req.body.contactNo};
	// console.log(array);
	// //var me = new Patient(patient);
	// var data = Patient(array);
	// console.log(data);
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



app.post('/signup',(req,res)=>{
 		
 		var patientId = req.body.patientId;
 		const firstName = req.body.firstName;
		const lastName = req.body.lastName;
 		var password = req.body.password;
		//var hash = bcrypt.hashSync(password,bcrypt.genSaltSync(9));
		//var hash  = generateHash(password);
		var hash = md5(password);
		console.log(password);
		console.log(hash); 
		dataArray = {patientId:patientId,firstName:firstName,lastName:lastName,password:hash}
		var data = new Patient(dataArray);
		data.save()
		.then(result => {
		console.log(result);
		console.log("success");
	})
		.catch(err => console.log(err));
})



// const bcrypt1 = require('bcrypt');
// const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';

// app.get('/', function(req,res){
// bcrypt1.genSalt(saltRounds, function(err, salt) {
//     bcrypt1.hash(myPlaintextPassword, salt, function(err, hash) {
//         console.log(hash);// Store hash in your password DB.
//     });
// });
// });

// // Load hash from your password DB.
// bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare(someOtherPlaintextPassword, hash, function(err, res) {
//     // res == false
// });

	app.post('/login', function(req,res){
		
		var patientId = req.body.patientId;
		var password = req.body.password;
		console.log(patientId);
		console.log("password is"+password);

	 	//console.log(hash);
	 	//var temp = "$2a$10$GuIMDdsadfsfo/5y.X9DcA92r5prOX4.q8PYagukgcpiXfOiYoHdT8LGNCjm";
		Patient.findOne({patientId : patientId},function(err , patients){
			if(err){
				console.log(err);
			}
			else{
				console.log(patients);
				console.log("found");
				//console.log("result is "+patients);
				//console.log("YE LE"+patients.password);
			 	//var hash = bcrypt.hashSync(password,bcrypt.genSaltSync(9)); 
			 	let hash = patients.password;
			 	console.log(hash)
			 	if(hash == md5(password)){

			 		console.log("sahi hia");

			 	}else{console.log("galat")}

			 	//let temp = compare(password,hash);
			 	//let temp = bcrypt.compareSync(password,hash);
			 	//console.log(temp);
			}
			});	
	});






//treatment form
app.post('/treatment_form',upload.array('Image',10),(req,res)=>{
	console.log(req.files);

	//var date = Array();
	//var symptoms = Array();
	//var treatmentDescription = Array();

	var arraydoctorId = Array();

	//let detailsCount=req.body.detailsCount;
	let doctorCount=req.body.doctorCount;
	//const treatmentId = req.body.treatmentId;
	const treatmentName = req.body.treatment_name;
	const patientId = req.body.pat_id;
	
	// for (var i = 0; i < detailsCount; i++) {
	// 	date.push(req.body.date[i]);
	// 	symptoms.push(eq.body.symptoms[i]);   //pawan karega
	// 	treatmentDescription.push(req.body.description[i]);
	// }
	//inserting all the doc ids in the mongo
	for (var i = 0; i < doctorCount; i++) {
		
		//let temp = req.body.arraydoctorId+'i';
		//console.log(temp);
		arraydoctorId.push(req.body['arraydoctorId'+i]); 
	
	}
	 //arraydoctorId=["asd","asasd"]
	// console.log(arraydoctorId[1]+'0')

	 console.log(arraydoctorId);	
	

	// for(let key of Object.keys(req.body)){

	// 	arraydoctorId[key] = req.body[key];

	
	// }
 //    //let i=0;

	// console.log(req.body['arraydoctorId'+i]);
	// console.log(arraydoctorId.doctorCount);


	//[{date:"5",file:["sda","sad"]},{date:"5",file:["sda","sad"]]

	//const date = req.body.date;
	//console.log(new Date());
	//let date = new Date();


	// for (var i = 0; i < doctorCount; i++) {
	
	// //let temp = req.body.arraydoctorId+'i';
	// //console.log(temp);
	// arraydoctorId.push(req.body['arraydoctorId'+i]); 

	// }
	//var myDate = new Date("2016-05-18T16:00:00Z");
	//console.log(myDate);

	// const dataArray = {treatmentId:"temp",patientId : req.body.pat_id,doctorId:arraydoctorId,};
	// console.log(dataArray);
	// var data = Treatment(dataArray);  
	// data.save(dataArray)
	// .then(result => {
	// console.log(result);
	// console.log("success");
	// })

	// .catch(err => console.log(err));
	
	//inserting all the symptoms  in the mongo
	// for (var i = 0; i < symptomsCount; i++) {   //inform pawan symptoms
		
	// 	//let temp = req.body.arraydoctorId+'i';
	// 	//console.log(temp);
	// 	arraydoctorId.push(req.body['symptomps'+i]); 
	
	// }
	//const dataArray = {treatmentId:"temp",patientId : req.body.pat_id,doctorId:arraydoctorId,reports:test[date:date,linjs];

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


//Login  
app.post('/login',(req, res)=>{

	const ID = req.body.ID;
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



// dId = 1;
// let temp = [tId:"1.2.3$p1",tId:"1.3$p2"tId:"3$p3"tId:"1.2.3$p4"];


app.listen(8080);