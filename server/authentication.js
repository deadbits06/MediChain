const mysql = require('mysql');
const db='maxhealthcare';
const crypto= require('crypto');
const session = require('express-session');

function login(req,res){
const con = mysql.createConnection({
  host:"localhost",
  user: "root",
  password: "rahul",
  database:db
});
con.connect(function(err) {
  if (err) throw err;
  console.log("connected");
  var userName= req.body.user;
  var password= crypto.createHash('md5').update(""+req.body.pass).digest("hex");
  con.query("select *from auth_details where userName = '"+userName+"' and password = '"+password+"'", function (err, result, fields){
    if (err) throw err;
    console.log(result);
    con.end();
    if(result.length==1){
    req.session.user=userName;
    if(req.session.user)
      console.log('session is set');

    res.send("1");
  }
  	else{
  	res.send("Invalid Credentials");
  	}


 });
 });


}


function logout(req,res){
  if(req.session.user)
  {
    req.session.user=null;
    res.send("Logged out");
  } 
  else
  {
    res.send("You are not logged in");
  }
}


module.exports={ login ,logout};