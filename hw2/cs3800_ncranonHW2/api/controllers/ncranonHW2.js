/*
  modified by:  Nicole Cranon <nicole.cranon@ucdenver.edu>
  date:         February 21 2015
  assignment:   Homework 2
  description:  A simple server using node.js, accepts
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
  // the query of the request
  var qry = req.query
  // the headers of the request
  var heads = req.headers
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

  message = util.format('\nRequest Headers:\n', heads, '\n\nQuery:\n', qry)
  res.write(message)
  res.end()
}
