var express = require('express');
var router = express.Router();
var pg = require('pg');
var secrets = require('../config/secrets');

module.exports = function(router) {
        router.route('/crimes').get(function(req, res) {
		console.log("base api");
                res.status(200).send({
                        message: 'ok',
                        data : []
                })
        })
/*
	router.route('/crimes/:id').get(function(req, res) {
                res.status(200).send({
                	message: 'ok',
                	data : []
                })
	})
*/
	router.route('/crimes/:type').get(function(req, res) {
		console.log("here");
		type = req.params.type.toUpperCase();
		var client = new pg.Client(secrets);
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
                var client = new pg.Client(secrets);
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
  		var client = new pg.Client(secrets);
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
                var client = new pg.Client(secrets);
                client.connect();
                client.query(`DELETE FROM crimes WHERE id=${id}`, (err, response) => {
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
