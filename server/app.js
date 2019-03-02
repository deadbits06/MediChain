const http = require('http');
const express =require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Web3 = require('web3');
const BigNumber = require('bignumber.js');
const session = require('express-session');
const bcrypt = require('bcrypt-nodejs');
const port=process.env.PORT || 8080;
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const macfromip = require('macfromip');
const md5 = require('md5');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));
//setting the template engine
app.set('view engine','ejs');

//Defining the models
var Patient = require('./models/patient');
var Staff = require('./models/staff');
var Treatment = require('./models/treatment');

//Database Connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/MediChain2', {useNewUrlParser: true});

//Web Connection
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
console.log(`Talking with a geth server ${web3.version.api} \n`);

const abiArray = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_dId",
				"type": "uint256"
			},
			{
				"name": "_MAC",
				"type": "string[]"
			}
		],
		"name": "addMAC",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_dId",
				"type": "uint256"
			},
			{
				"name": "_pId",
				"type": "uint256"
			}
		],
		"name": "addPatients",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_pId",
				"type": "uint256"
			},
			{
				"name": "_tId",
				"type": "string"
			}
		],
		"name": "addTreatmentToPatient",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_dId",
				"type": "uint256"
			},
			{
				"name": "_firstName",
				"type": "string"
			},
			{
				"name": "_lastName",
				"type": "string"
			},
			{
				"name": "_dob",
				"type": "string"
			},
			{
				"name": "_contactNumber",
				"type": "uint256"
			},
			{
				"name": "_email",
				"type": "string"
			},
			{
				"name": "_designation",
				"type": "string"
			},
			{
				"name": "_domain",
				"type": "string"
			},
			{
				"name": "_gender",
				"type": "string"
			},
			{
				"name": "_maritalStatus",
				"type": "bool"
			},
			{
				"name": "_address",
				"type": "address"
			}
		],
		"name": "doctorRegisteration",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_pId",
				"type": "uint256"
			},
			{
				"name": "_firstName",
				"type": "string"
			},
			{
				"name": "_lastName",
				"type": "string"
			},
			{
				"name": "_dob",
				"type": "string"
			},
			{
				"name": "_contactNumber",
				"type": "uint256"
			},
			{
				"name": "_email",
				"type": "string"
			},
			{
				"name": "_gender",
				"type": "string"
			},
			{
				"name": "_maritalStatus",
				"type": "bool"
			},
			{
				"name": "_insured",
				"type": "bool"
			}
		],
		"name": "patientRegisteration",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tId",
				"type": "string"
			},
			{
				"name": "_key",
				"type": "string"
			}
		],
		"name": "setSecretKey",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_dId",
				"type": "uint256"
			}
		],
		"name": "getMAC",
		"outputs": [
			{
				"name": "",
				"type": "string[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_pId",
				"type": "uint256"
			}
		],
		"name": "getPatient",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_dId",
				"type": "uint256"
			}
		],
		"name": "getPatientArray",
		"outputs": [
			{
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_tId",
				"type": "string"
			}
		],
		"name": "getSecretKey",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_pId",
				"type": "uint256"
			}
		],
		"name": "getTreatmentArray",
		"outputs": [
			{
				"name": "",
				"type": "string[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

const address = '0x1258daed7004add26107ee9a0408a0602edd283f';
const contract = web3.eth.contract(abiArray);
const contractInstance = contract.at(address);
web3.eth.defaultAccount = web3.eth.coinbase;

web3.eth.defaultAccount = "0x99AF2a086712c56D2705c814841FA97d355850Be";

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/',(req,res)=>{
	res.render("home");
});


app.get('/disease',function(req,res){
	res.render("disease");
});


app.get('/getSearch', function(req,res){
	res.render("search");
});


app.get('/doctor_register', (req,res)=>{
	res.render("doctor_register");
});

app.get('/patient_register', (req,res)=>{
	res.render("patient_register");
});

app.get('/nurse_register', (req,res)=>{
	res.render("nurse_register");
});

//Function to insert doctors data into blockchain
function set_doctor_registeration(staffId,firstName,lastName,dob,contactNumber,email,gender,maritalStatus,domain,designation,doctorAddress) {
    return contractInstance.doctorRegisteration(staffId,firstName,lastName,dob,contactNumber,email,gender,maritalStatus,domain,designation,doctorAddress,{ from: web3.eth.accounts[0], gas: 3000000 });
}

var doctorId = 1;

//Doctor Registeration

app.post('/doctor_register',(req,res)=>{

	const staffId = doctorId;
	const contactNumber = req.body.phone;
	const firstName = req.body.first_name;
	const lastName = req.body.last_name;
	const dob = req.body.birthday;
	const gender = req.body.gender;
	const email = req.body.email;
	const maritalStatus = req.body.status;
	const domain = req.body.domain;
	const designation = req.body.designation;
	const password = req.body.password;
	const time = new Date();
	var doctorAddress = assignAddressForDoctor();

	var hash = md5(password);
	console.log(password);
	console.log(hash);
	console.log("inside it");
	console.log("asd"+doctorAddress);
	
 	const dataArray = {staffId: staffId,firstName: firstName, lastName: lastName,password: hash,role: 1,registeration_time: time ,isBlocked: false ,isDeleted: false};
	
	var data = Staff(dataArray);
	data.save()
	.then(result => {
	console.log(result);
	console.log("success");
	doctorId++;

	// 	insertion in blockchain
	let temp = set_doctor_registeration(staffId,firstName,lastName,dob,contactNumber,email,gender,maritalStatus,domain,designation,doctorAddress);
	//console.log("saddas"+temp);
		res.render("login");
	})

});
var patientIdset=100;

//to call blockchain
function set_patient_registeration(patientId,firstName,lastName,dob,contactNumber,email,gender,maritalStatus,insured) {
    return contractInstance.patientRegisteration(patientId,firstName,lastName,dob,contactNumber,email,gender,maritalStatus,insured,{ from: web3.eth.accounts[1], gas: 3000000 });
}

app.get('/patient_register', function(req,res){
	res.render("patient_register");
});

//Patient registeration
app.post('/patient_register',(req,res)=>{
	const patientId = patientIdset;
	const contactNumber = req.body.phone;
	const firstName = req.body.first_name;
	const lastName = req.body.last_name;
	const dob = req.body.birthday;
	const gender = req.body.gender;
	const email = req.body.email;
	const maritalStatus = req.body.status;
	const occupation = req.body.occupation;
	const insured = req.body.insured;
	//const password = req.body.password;
	const time = new Date();
	//const patientAddress = assignAddressForPatient();
	// var hash = md5(password);
	// console.log(password);
	// console.log(hash);
	
	const dataArray = {patientId: patientId,firstName: firstName, lastName: lastName,registeration_time:time};
	
	var data = Patient(dataArray);
	data.save()
	.then(result => {
	console.log(result);
	console.log("success");
	patientIdset++;


	//insertion in blockchain
	let temp = set_patient_registeration(patientId,firstName,lastName,dob,contactNumber,email,gender,maritalStatus,insured);
	//console.log(temp);
	res.render("login");
	})
	.catch(err => console.log(err));
});


//doctor login

app.get('/login', function(req,res){

	res.render("login");

})


app.post('/login', function(req,res){
	
	var staffId = req.body.uname;
	var password = req.body.pass;
	
 	//console.log(hash);
 	//var temp = "$2a$10$GuIMDdsadfsfo/5y.X9DcA92r5prOX4.q8PYagukgcpiXfOiYoHdT8LGNCjm";
	Staff.findOne({staffId : staffId},function(err , staff){
		if(err){
			console.log(err);
		}
		else{
			console.log(staff);
			console.log("found");
			//console.log("result is "+patients);
			//console.log("YE LE"+patients.password);
		 	//var hash = bcrypt.hashSync(password,bcrypt.genSaltSync(9));
		 	let role=staff.role;
		 	console.log(role);

		 	let hash = staff.password;
		 	console.log(hash)
		 	if(hash == md5(password)){

		 		console.log("sahi hia");
		 		res.render("home");

		 	}else{console.log("galat");
		 		res.render("login");
		 	}

		 	//let temp = compare(password,hash);
		 	//let temp = bcrypt.compareSync(password,hash);
		 	//console.log(temp);
		}
		});	
});

//to get address from session which holds did
// function getAddress(doctorId){
// 	return contractInstance.getdoctorAddress(doctorId,{ from: web3.eth.accounts[9], gas: 3000000 });
// }

//let temp=getAddress(doctorId);


app.get('/nurse_registeration', (req,res)=>{
	res.render("nurse_register");
});


// function set_nurse(staffId,firstName,lastName,dob,contactNumber,email,gender,maritalStatus,domain,designation,doctorAddress) {
//     return contractInstance.nusreRegisteration(staffId,firstName,lastName,dob,contactNumber,email,gender,maritalStatus,domain,designation,doctorAddress,{ from: doctorAddress, gas: 3000000 });
// }


//Nurse Registeration
app.post('/nurse_registeration',(req,res)=>{

	const staffId = req.body.staffId;
	const contactNumber = req.body.phone;
	const firstName = req.body.first_name;
	const lastName = req.body.last_name;
	const dob = req.body.birthday;
	const gender = req.body.gender;
	const email = req.body.email;
	const maritalStatus = req.body.status;
	//const domain = req.body.domain;
	//const designation = req.body.designation;
	const password = req.body.password;
	const time = new Date().toLocaleTimeString();
	const nurseAddress = web3.eth.accounts[1];

	var hash = md5(password);
	console.log(password);
	console.log(hash);
	//const role = 1;
	console.log("inside it");
	console.log(nurseAddress);
	
	const dataArray = {staffId: staffId,firstName: firstName, lastName: lastName,password: hash,role: 2,registeration_time: time ,isBlocked: false ,isDeleted: false};
	
	var data = Staff(dataArray);
	data.save(dataArray)
	.then(result => {
	console.log(result);
	console.log("success");
	//insertion in blockchain
	//let temp = set_doctor(staffId,firstName,lastName,dob,contactNumber,email,gender,maritalStatus,domain,designation,doctorAddress);
	//console.log(temp);
	})
	.catch(err => console.log(err));
	//mapping_MAC("");
	//const values = [contactNo,firstname,secondname,dob,gender,email,maritalStatus,occupation,insured,time];
	//doctorRegisteration(parameter);
});


app.get('/receptionist_registeration', (req,res)=>{
	res.render("receptionist_register");
});



// function set_nurse(staffId,firstName,lastName,dob,contactNumber,email,gender,maritalStatus,domain,designation,doctorAddress) {
//     return contractInstance.nusreRegisteration(staffId,firstName,lastName,dob,contactNumber,email,gender,maritalStatus,domain,designation,doctorAddress,{ from: doctorAddress, gas: 3000000 });
// }


//Doctor Registeration
app.post('/receptionist_registeration',(req,res)=>{

	const staffId = req.body.staffId;
	const contactNumber = req.body.phone;
	const firstName = req.body.first_name;
	const lastName = req.body.last_name;
	const dob = req.body.birthday;
	const gender = req.body.gender;
	const email = req.body.email;
	const maritalStatus = req.body.status;
	//const domain = req.body.domain;
	//const designation = req.body.designation;
	const password = req.body.password;
	const time = new Date().toLocaleTimeString();
	const receptionAddress = web3.eth.accounts[0];

	var hash = md5(password);
	console.log(password);
	console.log(hash);
	//const role = 1;
	console.log("inside it");
	console.log(receptionAddress);
	
	const dataArray = {staffId: staffId,firstName: firstName, lastName: lastName,password: hash,role: 3,registeration_time: time ,isBlocked: false ,isDeleted: false};
	
	var data = Staff(dataArray);
	data.save(dataArray)
	.then(result => {
	console.log(result);
	console.log("success");
	//insertion in blockchain
	//let temp = set_doctor(staffId,firstName,lastName,dob,contactNumber,email,gender,maritalStatus,domain,designation,doctorAddress);
	//console.log(temp);
	})
	.catch(err => console.log(err));
	//mapping_MAC("");
	//const values = [contactNo,firstname,secondname,dob,gender,email,maritalStatus,occupation,insured,time];
	//doctorRegisteration(parameter);
});


//treatment form
app.post('/treatment_form',(req,res)=>{
	// var date = Array();
	// var symptoms = Array();
	// var treatmentDescription = Array();
	var arraydoctorId = Array();

	//let detailsCount=req.body.detailsCount;
	let doctorCount=req.body.doctorCount;
	//const treatmentId = req.body.
	const treatmentName = req.body.treatment_name;
	const patientId = req.body.pat_id;
	
	// for (var i = 0; i < detailsCount; i++) {
	// 	date.push(req.body.date[i]);
	// 	symptoms.push(eq.body.symptoms[i]);   //pawan karega
	// 	treatmentDescription.push(req.body.description[i]);
	// }

	for (var i = 0; i < doctorCount; i++) {
		arraydoctorId.push(req.body.arraydoctorId[i]); //pawan add kar
	}

	console.log(arraydoctorId);
	//console.log(date);

	const dataArray = {treatmentId:"temp",patientId : req.body.pat_id,doctorId:{ arraydoctorId }};
	
	var data = Treatment(dataArray);  
	data.save(dataArray)
	.then(result => {
	console.log(result);
	console.log("success");
	//insertion in blockchain
	//let temp = set_doctor(staffId,firstName,lastName,dob,contactNumber,email,gender,maritalStatus,domain,designation,doctorAddress);
	//console.log(temp);
	})
	.catch(err => console.log(err));
	//mapping_MAC("");
	//const values = [contactNo,firstname,secondname,dob,gender,email,maritalStatus,occupation,insured,time];
	//doctorRegisteration(parameter);
});



//creates by jay test bakki hai
function getKeyfromblock(_treatmentId){
	return contractInstance.getSecretKey(_treatmentId,{ from: temp, gas: 3000000 });
}

//generate random key
function generateKey(){
var rand = require("random-key");
 
//rand.generate(); // => eg: wexO23UXGezfTKHc
 
var key=rand.generate(7); // => TShNQGc

// var crypto = require('crypto');
// var assert = require('assert');

// var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
// //var key = 'password';
// var text = 'I love kittens';

// var cipher = crypto.createCipher(algorithm, key);
// //console.log(cipher);  
// var encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
// console.log("hi");
// console.log(encrypted);  

// var decipher = crypto.createDecipher(algorithm, key);
// //console.log(decipher);  

// var decrypted = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
// console.log(decrypted);  

// assert.equal(decrypted, text);
 
return key;

}
//send key to block
//idar temp tera doctor ka address hai
// function sendKeyfromblock(_treatmentId, generateKey(){
// 	//ek hath se mongo db me daal 
// 	return contractInstance.setSecretKey(_treatmentId,generateKey(){ from: web3.eth.accounts[0], gas: 3000000 });
// }





//secret key
app.post('/view_treatments', function(req,res){

	
		Staff.findOne({treatmentId : treatmentId},function(err , details){   //alok session treatment id
		if(err){
			console.log(err);
		}
		else{
			console.log(details);
			console.log("found");
			var secretkey = getKey(treatmentId)
			//decrypt the entire JSON file
			//res.render(details.html)  pawan dekhle
			}
		});	
});






// app.post('/signup',(req,res)=>{
 		
//  		var ID = req.body.ID;
//  		var password = req.body.password;
// 		//var hash = bcrypt.hashSync(password,bcrypt.genSaltSync(10));
// 		const array = {patientId: ID, password: hash};
// 		var data = Patient(array);
// 		data.save(array)
// 		.then(result => {
// 		console.log(result);
// 		console.log("success");
// 	})
// 		.catch(err => console.log(err));
// })


app.get('/treatment', function(req,res){
	res.render("treatment_form");
});



app.get('/getSearch', function(req, res){
	// res.render("search");
	// console.log("this is also working");
	con.query("select * from patient", function(err, results){
		
		res.render("search", {results: results});

	});
});

app.post('/search', function(req,res){
	// console.log("this is working");
	// console.log(req.body.myCountry);
	// res.render("search");
	con.query("select * from patient where name = '"+req.body.myCountry+"'", function(err, results){
		// console.log(results);
		res.render("search", {results: results});

	});
// 	console.log(req.body.myCountry);
});



function getPatients(_dId){
	return contractInstance.getTreatmentArray(_dId,{ from: web3.eth.accounts[8], gas: 3000000 });
}


app.get('/getPatients', function(req,res){

	//get patient array from blokchain
	var patientList = getPatients(_dId)

});

function getTreatments(_pId) {

	    return contractInstance.getTreatmentArray(_pId,{ from: doctorAddress, gas: 3000000 });

}


app.get('/treatmentsDone',(req,res)=>{


	//Doctor ID from session
	var did=6
	var treatmentsDone=[];
	//data from blockchain
	const data = getTreatments(_pId)
	

	var arr =["1.3$123","2.5.6$123","1.6$123"]
	for (var i in arr) {
		//console.log(arr[i]);
	  	console.log("j");
	  	var temp=arr[i];
	  	console.log(temp);
	  	// for (var j in temp){
	  	// 	console.log(j);
	  	var res = temp.split("$");
	  	console.log(res);
	  	res.pop();
	  	console.log(res);
	  	for (var j in res) {
		  	tmp=res[j];
		  	console.log(tmp);
		  	doc_split=tmp.split(".");
		  	console.log(doc_split);
		  	for (k in doc_split){
		  		console.log(doc_split[k]);
		  		if (did==doc_split[k]){
		  			console.log("hai re");
		  			resu.push(temp)
		  			console.log(resu);
		  		}
		  		else{
		  			k++;
		  		}
		  		}
		  	}
	}

});





//under testing

app.get('/',(req,res)=>{
	console.log("sadua sigdy");
	// var temp = {
	// 			"employee":{ "name":"John", "age":30, "city":"New York" }
	// 			};
	// res.send(temp);
	//web3.eth.getAccounts(console.log);
	let temp = nishant();

	//console.log(temp[0].toNumber());
	console.log(temp);
	// for (code in temp) {
	// 	console.log(code);
	// }
});

function nishant() {
    return contractInstance.getTreatmentArray(100,{ from: web3.eth.accounts[8], gas: 3000000 });
}


//getting patient ids from blockchain
function getPatients(dId) {
    return contractInstance.getPatientArray(dId,{ from: doctorAddress, gas: 3000000 });
}


//To show all the patients treated by a Doctor
app.get('/patients',(req,res)=>{
	var temp = getPatients(dId);
	console.log(temp);
	return res.send(temp);
});







function patientRegisteration() {
    return contractInstance.patientRegisteration(parameter,parameter,{ from: web3.eth.accounts[0], gas: 3000000 });
}




function mapping_MAC() {
    return contractInstance.doctorRegisteration(IP,MAC,{ from: web3.eth.accounts[0], gas: 3000000 });
}


function doctorRegisteration() {
    return contractInstance.doctorRegisteration(parameter,parameter,{ from: web3.eth.accounts[0], gas: 3000000 });
}


var i=1;

function assignAddressForPatient() {
	return web3.eth.accounts[i++];	
}

var j=5;

function assignAddressForDoctor() {
	console.log(j);
	return web3.eth.accounts[j++];	
}







app.get('/test',(req,res)=>{
	let ip =req.connection.remoteAddress;
	macfromip.getMac(ip, function(err, data){
    if(err){
        console.log(err);
    }
    console.log(data);
});
	console.log(ip);

});

app.listen(8080);