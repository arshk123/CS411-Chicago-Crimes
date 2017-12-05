// login.js
var express = require('express');
var router = express.Router();
var pg = require('pg');
var secrets = require('../config/secrets');
var nodemailer = require('nodemailer');

function random_num_generator(){
  return (Math.floor(Math.random()*90000) + 10000).toString();
};

var transporter = nodemailer.createTransport({
  service: secrets.nodemailer.service,
  auth: secrets.nodemailer.auth
});

// console.log(random_num_generator())

module.exports = function(router) {
  router.route('/login').post(function(req,res) {
    var client = new pg.Client(secrets.db);
    client.query(`Select * FROM police WHERE username = ${req.query.username}`, (err, response) => {
      if(err) {
        res.status(500).send({
          message : "err",
          data: []
        })
      }
      else {
        console.log(response)
        // check if user name and password match those in database
        // generate verification code and insert into db
        // send ok
        // console.log(`Update police Set email_verification = ${verification_code} where username = \'${id}\'`)
        let token = random_num_generator()
        var newClient = new pg.Client(secrets.db)
        newClient.query(`Update police Set email_verification = ${token} where username = \'${req.query.username}\'`, (err, response)=> {
            if(err) {
              res.status(500).send({
                message : err,
                data : ["inner query failed"]
              })
              else {
                var mailOptions = {
                  from: secrets.nodemailer.auth.user,
                  to: 'kaustubhvongole@gmail.com',
                  subject: 'Your authorization code for Chicago Crime Tracker',
                  text:'Your authentication number is: '+ random_num_generator()
                };
                transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                    console.log(error);
                  } else {
                    console.log('Email sent: ' + info.response);
                  }
                }, ()=> {
                  res.status(200).send({
                    message: "Verification code sent",
                    data : []
                  })
                })
              }
            }
        })
        // else send failed message with 200
      }
    })
  })

  // verify code here
  router.route('/login/verify').post(function(req,res) {
    var client = new pg.Client(secrets.db);
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
