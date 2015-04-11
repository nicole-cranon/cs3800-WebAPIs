'use strict';


var util = require('util');


module.exports = {
  hello: hello
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function hello(req,res) {
//  gitRequest();
  res.send(gitRequest());
}

function gitRequest( ) {
     var GitHubApi = require('github');

     var github = new GitHubApi({
       // required
       version: "3.0.0"
     });
     var gitFollow = github.user.getFollowingFromUser({
        user: "mikedeboer"
      },  function(err, res) {
        //console.log(JSON.stringify(res));
        console.log("\nUser Followers: \n", util.format(res));
    });
}
