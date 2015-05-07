var express = require('express');
var pay = express();
var app = require('../../app.js');                  // main app
var bodyParser = require('body-parser');
var u = require('underscore');
var send_auth = require('../helpers/send_auth.js');	// sends an authorization request
var extract = require('../helpers/extract.js');			// extracts non-sensiteve data from the authorization request
var store = require('../helpers/store.js');					// stores the extracted non sensitive data for later use

var items_object = {};
var auth_object = {};
var transData = {};

app.use(bodyParser.json()); // for parsing application/json
app.use('/payment', pay)    // sub app for processing payment authorization


//Handle POST of payment and items purchased
pay.post('/', function(req, res){
  //Extract authorization information
  auth_object = req.body.authorization;
  //Extract items purchased information
  items_object = req.body.itemsPurchased;

  //Send authorization to Vantiv and store non sensitive information in apigee baas
  send_auth(auth_object, extractData, res);
});

app.use('/payment', pay)

//Used as callback to send auth. Extracts data from the authorization if it is approved
//Stores the extracted data for later access
function extractData(authCode){
  transData = extract(auth_object, items_object, authCode);
  store(transData);
}
