var usergrid = require('usergrid');

//Store extracted information in apigee baas
function storeTransactionData(transactionData){
	//make sure parameter exists
	//TO BE ADDED: check to ensure required fields are in the JSON object and no extra
	if (transactionData != null) {

		var dataClient = new usergrid.client({
			orgName:'ncranon',
			appName:'sandbox'
		});

		dataClient.createEntity(transactionData);
	}
}

module.exports = storeTransactionData;
