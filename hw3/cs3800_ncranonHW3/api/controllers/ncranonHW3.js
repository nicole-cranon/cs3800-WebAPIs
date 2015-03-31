/*
  modified by:  Nicole Cranon <nicole.cranon@ucdenver.edu>
  date:         March 29 2015
  assignment:   Homework 3
*/

'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 http://www.w3schools.com/js/js_strict.asp
*/

/*
  Necessary modules.
 */
var util = require('util');
var querystring = require ('querystring');
var git = require('octonode');

/*
  The reqQuery function will map to qryStr in the Swagger document.
 */
module.exports = {
  qryStr: reqQuery
};

/*
  Returns the headers and query of the HTTP request. Will note if they are missing.
 */
function reqQuery(req, res) {
/*
  client.get('/users/pksunkara', {}, function (err, status, body, headers) {
    console.log(body); //json object
  });
*/

  // the query of the request
  var qry = req.query
  // the headers of the request
  var heads = util.format(JSON.stringify(req.headers))
  var message

  // action taken if headers are not sent
  if (Object.keys(req.headers).length === 0) {
    heads = 'No headers were sent.'
  }

  // action taken if query string is missing
  if (Object.keys(req.query).length === 0) {
    qry = 'Empty query field.'
  }
  else
  {
    // print out the requests query name and value
    qry = util.format ('{ QUERY NAME: \'VALUE\' } ->', req.query)
  }

  message = util.format('\nResponse Headers:\n', heads, '\n\nQuery:\n', qry, '\n\n')
  res.write(message);

  res.write(util.format('GitHub Response:\n'));
  var client = git.client();
  var gitInfo = client.get('/users/ncranonn/repos', {}, function (err, status, body, headers) {
    console.log(body);
  });
  res.json(gitInfo);
  res.end();
}
