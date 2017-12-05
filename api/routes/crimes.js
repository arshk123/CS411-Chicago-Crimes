var express = require('express');
var router = express.Router();
var pg = require('pg');
var secrets = require('../config/secrets');

module.exports = function(router) {
  /*        router.route('/crimes').get(function(req, res) {
  console.log("base api");
  res.status(200).send({
  message: 'ok',
  data : []
})
})
*/

router.route('/crimes').get(function(req,res) {
  var client = new pg.Client(secrets.db);
  client.connect();
  console.log(req.query);
  if(req.query.length < 1) {
    req.query = req.body
  }
  var our_query='SELECT * FROM crimes where '

  if(req.query['case_number']!=''){
    our_query+=`case_number=\'${req.query.case_number}\'`
  }
  if(req.query['description']!=''){
    if(our_query!='SELECT * FROM crimes where '){
      our_query += ' AND '
    }
    our_query+=`description LIKE \'\%${req.query.description}\%\'`
  }
  if(req.query['type']!=''){
    if(our_query!='SELECT * FROM crimes where '){
      our_query += ' AND '
    }
    our_query+=`LOWER(type)=\'${req.query.type}\'`
  }
  if(req.query['arrest_made']!=''){
    if(our_query!='SELECT * FROM crimes where '){
      our_query += ' AND '
    }
    our_query+=`arrest_made = ${req.query.arrest_made}`
  }
  if(req.query['district_id']!=null){
    if(our_query!='SELECT * FROM crimes where '){
      our_query += ' AND '
    }
    our_query+=`district_id=${req.query.district_id}`

  }
  if(req.query['fbi_code'] != '') {
    if(our_query != 'SELECT * FROM crimes where '){
      our_query += ' AND '
    }
    our_query += `fbi_code = \'${req.query.fbi_code}\'`
  }
  console.log(our_query);
  if(our_query === 'SELECT * FROM crimes where ') {
    res.status(200).send({
      message: 'ok',
      data: [{"data" : { "rows" : []}}]
    })
  }
  // Execute query
  client.query(our_query + ' LIMIT 25;', (err, response) => {
    client.end()
    if(!err) {
      console.log(response)
      res.status(200).send({
        message : 'ok',
        data: response
      })
    }
    else {
      res.status(500).send({
        message: err,
        data : []
      })
    }
  })
})

router.route('/crimes/:type').get(function(req, res) {
  console.log("here");
  type = req.params.type.toUpperCase();
  var client = new pg.Client(secrets.db);
  client.connect();
  console.log(`SELECT * FROM crimes WHERE type LIKE \'\%${type}\%\' LIMIT 25`)
  client.query(`SELECT * FROM crimes WHERE type LIKE \'\%${type}\%\' LIMIT 25`, (err, response) => {
    client.end()
    if(!err) {
      console.log(response)
      res.status(200).send({
        message : 'ok',
        data: response
      })
    }
    else {
      res.status(500).send({
        message: err,
        data : []
      })
    }
  })
})

router.route('/crimes').post(function(req, res) {
  /*
  *
  * INSERT into crimes(crime_id, case_number, description, time, type, fbi_code, arrest_made, district_id, police_id,latitude,longitude,ward,beat,block) values($1, $2, $3, $4, $5, $6, $7, $8, $9,$10,$11,$12,$13)
  * */
  var client = new pg.Client(secrets.db);
  client.connect();
  //console.log(req)
  req.query = req.body
  console.log(`INSERT into crimes(description, type, fbi_code, arrest_made) values( \'${req.query.description}\', \'${req.query.type}\', \'${req.query.fbi_code}\', ${req.query.arrest_made}`)
  client.query(`INSERT into crimes(description, type, fbi_code, arrest_made) values( \'${req.query.description}\', \'${req.query.type}\', \'${req.query.fbi_code}\', ${req.query.arrest_made})`, (err, response) => {
    client.end()
    if(!err) {
      res.status(200).send({
        message : 'ok',
        data: response
      })
    }
    else {
      console.log(err)
      res.status(500).send({
        message: err,
        data : []
      })
    }
  })
})

router.route('/crimes/:id').put(function(req, res) {
  //console.log("here");
  /*
  *   *
  *     * INSERT into crimes(crime_id, case_number, description, time, type, fbi_code, arrest_made, district_id, police_id,latitude,longitude,ward,beat,block) values($1, $2, $3, $4, $5, $6, $7, $8, $9,$10,$11,$12,$13)
  *       * */
  var client = new pg.Client(secrets.db);
  client.connect();
  //  		console.log(req)
  req.query = req.body
  id = req.params.id;
  console.log(`Update crimes Set arrest_made = ${req.query.arrest_made}, type = \'${req.query.type}\', description = \'${req.query.description}\', fbi_code = \'${req.query.fbi_code}\' where id = ${id}`)
  client.query(`Update crimes Set arrest_made = ${req.query.arrest_made}, type = \'${req.query.type}\', description = \'${req.query.description}\', fbi_code = \'${req.query.fbi_code}\' where id = ${id}`, (err, response) => {
    client.end()
    if(!err) {
      res.status(200).send({
        message : 'ok',
        data: response
      })
    }
    else {
      res.status(500).send({
        message: err,
        data : []
      })
    }

  })

})

router.route('/crimes/:id').delete(function(req, res) {
  id = req.params.id;
  var client = new pg.Client(secrets.db);
  client.connect();
  client.query(`DELETE FROM crimes WHERE crime_id=${id}`, (err, response) => {
    client.end()
    if(!err) {

      res.status(200).send({
        message : 'ok',
        data: response
      })
    }
    else {
      console.log(err)
      res.status(500).send({
        message: err,
        data : []
      })
    }
  })
})

return router
}
