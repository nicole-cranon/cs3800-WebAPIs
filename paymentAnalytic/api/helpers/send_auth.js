var http = require('http');

var licenseID = 'edfc7005ad494db7b8b393a0a0734126$$#$$hUwn3mSIbC5slPDvM7O1G2AHGIMnrddH$$#$$2016-04-08$$#$$dev_key$$#$$SHA512withRSA$$#$$RSA$$#$$1$$#$$C7B770FA40115D1AF0383E0C4A8839B84419FAB88AF03C2EA3D6C327507034CD3AB0CE68A72F5633D2EBAAA3AFA8EC4405EC941A84A1413645E3025B75B3123E637BAD9296478C6ADE36B492C83A23D55CBEB4DF13C7F3BEB77AAA8802B74F1259BAF8CC662F9DB2FBF51E4DFA580C21AE4E07FBCBE6AE02E5512D156A5A310E1D55666131CCD3BC91FAAA7DA87E24C5A6BA379C1E4DFDB09B5D508EE3C25A5DE64138B938BE96802EB9F097F6D42075608C44ECBDD7A630E048623F71ECCAC12D806498E02C27C506AB57A95DEDD4AE635FDF1FC35BE1F6AF6CCDB216A37B4410F60F71FA8308707F9043A2AF452CFFE7C26CB151A955DE04B34C88AD93F188';

var header = {
	'Content-Type': 'application/json',
	'licenseid': licenseID
};

//Set options for the http request
var options = {
	hostname: 'apis.cert.vantiv.com',
	port: '80',
	path: '/v1/credit/authorization?sp=1',
	method: 'POST',
	headers: header
};

//Send an auth request followed by a capture request
//Requires an authObject containing the authorization data, and a callback function to
//extract the data from the transaction the callback named extractData expects the Authorization Code
//Returns an AuthCode if the transacton is approved
function send_auth(auth_object, extractData, response){
  var authCode;
	var req = http.request(options, function(res) {

		res.setEncoding('utf-8');

		res.on('data', function(data){
			//console.log("\nAuthorize Response:\n" + data)
			var j = JSON.parse(data);
			console.log ('\nAuthorize Response:\n', j);
			//If the response has an authorization code and reference number, then lets send a capture
			if(j.AuthorizeResponse != null && j.AuthorizeResponse.AuthorizationCode && j.AuthorizeResponse.ReferenceNumber){
				//call a capture
				authCode = j.AuthorizeResponse.AuthorizationCode;
				var refNum = j.AuthorizeResponse.ReferenceNumber;
				if (extractData != null)	// check that extract data was passed
        	extractData(authCode);
			}

			response.send(j);	// send authorization response to user
		});
	});

	req.on('error', function(e) {
	  console.log('\nProblem with request:\n' + e.message);
	});

	console.log ('\nAuthorize Request:\n', auth_object);
	req.end(JSON.stringify(auth_object));
}

module.exports = send_auth;
