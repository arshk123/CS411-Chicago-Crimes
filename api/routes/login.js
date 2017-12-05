// login.js
var express = require('express');
var router = express.Router();
var pg = require('pg');
var secrets = require('../config/secrets');

var nodemailer = require('nodemailer');
console.log(`Update police Set email_verification = ${verification_code} where username = \'${id}\'`)

function random_num_generator(){
  return (Math.floor(Math.random()*90000) + 10000).toString();
};

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'cs411tester@gmail.com',
    pass: 'JuulInside'
  }
});

var mailOptions = {
  from: 'cs411tester@gmail.com',
  to: 'kaustubhvongole@gmail.com',
  subject: 'Your authorization code',
  text:'Your authentication number is: '+ random_num_generator()//random_num_generator()
};

console.log(random_num_generator())
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

module.exports = function(router) {
  router.route('/login').post(function(req,res) {
    var client = new pg.Client(secrets);
    client.query(`Select * FROM police WHERE username = ${req.query.username}`, (err, response) => {
      if(err) {
        res.status(500).send({
          message : "err",
          data: []
        })
      }
      else {
        // check if user name and password match those in database
        // generate verification code and insert into db
        // send ok
        res.status(200).send({
          message: "Verification code sent",
          data : []
        })
        // else send failed message with 200
      }
    }, ()=> {
      client.end()
    })
  })

  // verify code here
  router.route('/login/verify').post(function(req,res) {
    var client = new pg.Client(secrets);
    client.query(`Update crimes Set arrest_made = ${req.query.arrest_made}, type = \'${req.query.type}\', description = \'${req.query.description}\', fbi_code = \'${req.query.fbi_code}\' where id = ${id}`, (err, response) => {
      if(err) {
        res.status(500).send({
          message : "err",
          data: []
        })
      }
      else {
        // check if verification code matches that in the columns
        // send ok
        res.status(200).send({
          message: "Verification code sent",
          data : []
        })
        // else send failed message with 200
      }
    }, ()=> {
      client.end()
    })
  })

  return router
}
