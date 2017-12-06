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
    //  console.log(req.query);
    //  console.log(req)
    //  console.log(req.body);
    if("username" in req.body) {
      req.query = req.body
    }
    if("email_verification" in req.query) {
      console.log("verifying");
      var client = new pg.Client(secrets.db);
      client.connect();
      console.log(`Select * FROM police WHERE username = \'${req.query.username}\' and password = \'${req.query.password}\' and email_verification = ${req.query.email_verification}`);
      client.query(`Select * FROM police WHERE username = \'${req.query.username}\' and password = \'${req.query.password}\' and email_verification = ${req.query.email_verification}`, (err, response) => {
        if(err || response.rows.length < 1) {
          console.log("error")
          res.status(401).send({
            message : "err unable to verify",
            data: []
          })
        }
        else {
          console.log("ok");
          // send ok
          client.query(`Update police set email_verification=null WHERE username=\'${req.query.username}\'`, (e,r)=>{
                console.log("removed");
});
          res.status(200).send({
            message: "Verification code validated",
            data : response.rows
          })
          // else send failed message with 200
        }
      })
    }
    else {
      //      console.log(req.query)
      var client = new pg.Client(secrets.db);
      client.connect()
      //console.log(`Select * FROM police WHERE username = \'${req.query.username}\'`)
      client.query(`Select * FROM police WHERE username = \'${req.query.username}\' and password = \'${req.query.password}\'`, (err, response) => {
        //      console.log(response)
        console.log(response.rows);
        console.log(response.rowCount);
        if(err || response.rowCount != 1) {
          res.status(401).send({
            message : err,
            data: []
          })
        }
        else {
          // check if user name and password match those in database
          // generate verification code and insert into db
          // send ok
          // console.log(`Update police Set email_verification = ${verification_code} where username = \'${id}\'`)
          let token = random_num_generator()
          var newClient = new pg.Client(secrets.db)
          newClient.connect();
          newClient.query(`Update police Set email_verification = ${token} where username = \'${req.query.username}\'`, (error, resp)=> {
            if(error) {
              res.status(401).send({
                message : error,
                data : ["inner query failed"]
              })
            }
            else {
              var mailOptions = {
                from: secrets.nodemailer.auth.user,
                to: response.rows[0]['email'],
                subject: 'Your authorization code for Chicago Crime Tracker',
                text:'Your authentication number is: '+ token
              };
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              })
              res.status(200).send({
                message: "Verification code sent",
                data : []
              })
      //        client.end()
            }
          })
        }
      })
    }
  })
  return router
}
                               
