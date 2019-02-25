const http = require('http');
const express =require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const Web3 = require('web3');
const BigNumber = require('bignumber.js');
const session = require('express-session')
const port=process.env.PORT || 8080;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var macfromip = require('macfromip');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());





var Patient = require('./models/patient');
var Doctor = require('./models/doctor');

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
				"name": "_pId",
				"type": "uint256"
			},
			{
				"name": "_tId",
				"type": "uint256"
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
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tId",
				"type": "uint256"
			},
			{
				"name": "_h",
				"type": "string"
			}
		],
		"name": "testing",
		"outputs": [
			{
				"name": "",
				"type": "string"
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
			},
			{
				"name": "_age",
				"type": "uint256"
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
				"type": "uint256"
			}
		],
		"name": "getSecretKey",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tId",
				"type": "uint256"
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
				"name": "_age",
				"type": "uint256"
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
	}
]

const address = '0x316b3cb4c6065a41456be5b23f988c0835e86fc1';
const contract = web3.eth.contract(abiArray);

const contractInstance = contract.at(address);
web3.eth.defaultAccount = web3.eth.coinbase;

web3.eth.defaultAccount = "0xb19e8ef774a48b63d7c7fac314f4303d70c43bed";

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/',(req,res)=>{
	console.log("saduasigdy");
	// var temp = {
	// 			"employee":{ "name":"John", "age":30, "city":"New York" }
	// 			};
	// res.send(temp);
	//web3.eth.getAccounts(console.log);
	let temp = nishant();
	console.log(temp);

});

function nishant() {
    return contractInstance.getMAC(1,{ from: web3.eth.accounts[8], gas: 3000000 });
}

//To show all the patients treated by a Doctor
app.get('/patients',(req,res)=>{
	var temp = getPatients(dId);
	console.log(temp);
	return res.send(temp);
});

function getPatients(dId) {
    return contractInstance.getPatientArray(dId,{ from: web3.eth.accounts[8], gas: 3000000 });
}


//Patient registeration

app.post('/patient_registeration',(req,res)=>{
	const contactNumber = req.body.contactNo;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const dob = req.body.dob;
	const gender = req.body.gender;
	const address = req.body.email;
	const city = req.body.maritalStatus;
	const occupation = req.body.occupation;
	const insured = req.body.insured;
	const time = new Date().toLocaleTimeString();
	const values = [contactNo,firstname,secondname,dob,gender,email,maritalStatus,occupation,insured,time];
	const patientAddress = assignAddressForPatient();

	patientRegisteration(parameter);
});


function patientRegisteration() {
    return contractInstance.patientRegisteration(parameter,parameter,{ from: web3.eth.accounts[0], gas: 3000000 });
}

//Doctor Registeration
app.post('/doctor_registeration',(req,res)=>{
	const contactNumber = req.body.contactNo;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const dob = req.body.dob;
	const age = req.body.age;
	const gender = req.body.gender;
	const email = req.body.email;
	const maritalStatus = req.body.maritalStatus;
	const domain = req.body.domain;
	const designation = req.body.designation;
	const time = new Date().toLocaleTimeString();
	const values = [contactNo,firstname,secondname,dob,gender,email,maritalStatus,occupation,insured,time];
	const doctorAddress = assignAddressForDoctor();
	console.log("inside it");
	console.log(address);

	mapping_MAC("")


	doctorRegisteration(parameter);
});


function mapping_MAC() {
    return contractInstance.doctorRegisteration(IP,MAC,{ from: web3.eth.accounts[0], gas: 3000000 });
}


function doctorRegisteration() {
    return contractInstance.doctorRegisteration(parameter,parameter,{ from: web3.eth.accounts[0], gas: 3000000 });
}


const i=1;

function assignAddressForPatient() {
	return web3.eth.accounts[i++];	
}

const j=5;

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