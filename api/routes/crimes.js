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
  console.log(req)
  var client = new pg.Client(secrets.db);
  console.log("here")
  client.connect();
  console.log("here");
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
    our_query+=`type=\'${req.query.type}\'`
  }
  if(req.query['arrest_made']!=undefined){
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
  if(our_query === 'SELECT * FROM crimes where ' || our_query === "SELECT * FROM crimes where case_number='undefined' AND description LIKE '%undefined%' AND type='undefined' AND fbi_code = 'undefined'") {
   // res.status(200).send({
    //  message: 'ok',
     // data: [{"data" : { "rows" : []}}]
   // })
   our_query = 'SELECT * FROM crimes ORDER BY time DESC'
   console.log('empty args')
  }
  // Execute query
  client.query(our_query + ' LIMIT 70;', (err, response) => {
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

router.route('/crimes/:id_details').get(function(req, res) {
  console.log("here");
  console.log(req.params);
  let id_details = req.params.id_details;
  var client = new pg.Client(secrets.db);
  client.connect();
  console.log(`SELECT crimes.id, crimes.crime_id, crimes.case_number, crimes.description, crimes.time, crimes.type, crimes.fbi_code, crimes.arrest_made, crimes.district_id, police.name AS police_name, crimes.latitude, crimes.longitude, crimes.ward, crimes.beat, crimes.block, crimes.crime_index, beat_minmax_values.minmax AS beat_minmax, district_minmax_values.minmax AS district_minmax FROM ((crimes LEFT JOIN police ON (crimes.police_id = police.police_id)) LEFT JOIN beat_minmax_values ON (crimes.beat = beat_minmax_values.beat)) LEFT JOIN district_minmax_values ON (crimes.district_id = district_minmax_values.district_id) WHERE id=${id_details};`)
  client.query(`SELECT crimes.id, crimes.crime_id, crimes.case_number, crimes.description, crimes.time, crimes.type, crimes.fbi_code, crimes.arrest_made, crimes.district_id, police.name AS police_name, crimes.latitude, crimes.longitude, crimes.ward, crimes.beat, crimes.block, crimes.crime_index, beat_minmax_values.minmax AS beat_minmax, district_minmax_values.minmax AS district_minmax FROM ((crimes LEFT JOIN police ON (crimes.police_id = police.police_id)) LEFT JOIN beat_minmax_values ON (crimes.beat = beat_minmax_values.beat)) LEFT JOIN district_minmax_values ON (crimes.district_id = district_minmax_values.district_id) WHERE id=${id_details};`, (err, response) => {
    client.end()
    if(!err) {
//      console.log(response.data)
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
  if("type" in req.body) {
    req.query = req.body
  }

  console.log(req.body);
  console.log("req.query")
  console.log(req.query);
  console.log("HIT INSERT ");
  console.log(req.query)
  var description = null
  var type = null
  var fbi_code=null
  var arrest_made=null
  var case_number=null
  var time=null
  var district_id=null
  var police_id=null
  var latitude= null
  var longitude=null
  var ward=null
  var beat=null
  var block=null
  var crime_index = null
  console.log(req.query['arrest_made'])
  if (req.query['description'] != undefined){
  	description = req.query.description 
  }
  if (req.query['type'] != undefined){
        type = req.query.type
  }
  if (req.query['fbi_code'] != undefined){
        fbi_code = req.query.fbi_code 
  }
  if (req.query['arrest_made'] != undefined){
        arrest_made = req.query.arrest_made
  }
  if (req.query['case_number'] != undefined){
        case_number = req.query.case_number
  }
  if (req.query['district_id']!= undefined){
        district_id = req.query.district_id
  }
  if (req.query['police_id']!= undefined){
        police_id = req.query.police_id 
  }
  if (req.query['latitude']!= undefined){
        latitude = req.query.latitude
  }
  if (req.query['longitude']!= undefined){
        longitude = req.query.longitude
  }
  if (req.query['ward'] != undefined){
        ward = req.query.ward
  }
  if (req.query['beat']!= undefined){
        beat = req.query.beat
  }
  if (req.query['block']!= undefined){
        block = req.query.block
  }
  if (req.query['crime_index']!= undefined){
        crime_index = req.query.crime_index
  }

  console.log(`INSERT into crimes(description, type, fbi_code, arrest_made, case_number, time, district_id, police_id, latitude, longitude, ward, beat, block, crime_index) values( \'${description}\', \'${type}\', \'${fbi_code}\', ${arrest_made}, \'${case_number}\', ${time}, ${district_id}, ${police_id}, ${latitude}, ${longitude}, ${ward}, ${beat}, ${block}, ${crime_index})`)
  client.query(`INSERT into crimes(description, type, fbi_code, arrest_made, case_number, time, district_id, police_id, latitude, longitude, ward, beat, block, crime_index) values( \'${description}\', \'${type}\', \'${fbi_code}\', ${arrest_made}, \'${case_number}\', ${time}, ${district_id}, ${police_id}, ${latitude}, ${longitude}, ${ward}, ${beat}, ${block}, ${crime_index})`,( err, response) => {
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
  if("arrest_made" in req.body) {
    req.query = req.body
  }
  id = req.query.id
  client.connect();
  console.log(req)
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
