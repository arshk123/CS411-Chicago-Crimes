var express = require('express');
var pg = require("pg");
var app = express();
var router = express.Router()
var bodyParser = require('body-parser');
var secrets = require('./config/secrets');
var path = require('path');



//import routes (MP3)
//setup routes (MP3)

var route = require('./routes/index.js');
var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
};

app.use(allowCrossDomain);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(`${__dirname}/client/public`));

app.use(bodyParser.json());

require('./routes')(app, router);
/*
app.get('*', function (req, res) {
	res.sendFile(path.resolve(__dirname, 'client/public/index.html'));
})
*/
console.log("listening on port 8280");
app.listen(8280, "0.0.0.0");



