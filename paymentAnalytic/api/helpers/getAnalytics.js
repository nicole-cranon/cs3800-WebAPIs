var usergrid = require('usergrid');

var dataClient = new usergrid.client({
  orgName:'ncranon',
  appName:'sandbox'
});

var options = {
  type:"transaction",
  client:dataClient
};

//Get all transactions' data
function all (res) {
  var collection = new usergrid.collection(options);

  collection.fetch(function (error, result) {
		if (error) {
			console.log("Error obtaining results.");
		} else {
			res.send(result);
		}
  });
}

module.exports = all;
