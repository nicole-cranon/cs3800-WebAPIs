var u = require('underscore');

//Extract information from authorization and items purchased for storage in usergrid
//Requires the authorization object, the items purchased object, and the approved transaction authorization
//code
//Returns the extracted transaction data as a JSON object or null if nothing was passed in
function extract(auth_object, items_object, authCode){
  //make sure that all parameters are present
  //TO BE ADDED: check that all objects and fields required exist and no extra were passed
  if (auth_object != null && items_object != null && authCode != null) {
  	//authorization information

    var merchant = auth_object.merchant;
    // console.log('\nMerchant Info:\n', merchant);  // is a test

    var terminal = auth_object.terminal;
    // console.log('\nTerminal Info:\n', terminal);  // is a test

    var transaction = auth_object.transaction;
    // console.log('\nTransaction Info:\n', transaction); // is a test

    if (auth_object.address != null){
      var zip = auth_object.address.BillingZipcode;
      // console.log('\nZip Code:\n', zip);  // is a test
    }
    else {
      var zip = '';
    }

    var CardType = auth_object.card.CardType;

  	//items purchased information
  	var itemsAndTotal = u.extend({'ItemsPurchased': items_object},
  		{'NoItemsPurchased': items_object.length});

  	//combine authorization and items purchased information
    t_data = u.extend({type: 'transactions'},
  		merchant,									// Merchant Information
  		terminal,									// Terminal Information
  		transaction,							// Transaction Information
  		itemsAndTotal,						// Total Number of Items Purchased and Actual Items Information
  		{'Zip': zip},							// Buyer Zip Code
  		{'CardType': CardType},		// Buyer Card Type
  		{'AuthCode': authCode});	// Authorization Code of the Transaction

    console.log ('\nExtracted Data:\n', t_data, '\n'); // is a test
    return t_data; // contains non sensitive transaction data
  }
  return null;
}

module.exports = extract;
