var express = require('express');
var anal = express();
var app = require('../../app.js');
var getAnalytics = require('../helpers/getAnalytics')

//Handle GET of stored analytic information
anal.get('/', function(req, res){
  getAnalytics(res);  // gets all trnasactions' information
});

app.use('/analytics', anal)
