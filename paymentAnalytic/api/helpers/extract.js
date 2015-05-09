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

    //reassign items message in case additional, undesired fields were provided
    var items_reassigned = [];
    var temp = {};
    for (var i = 0; i < items_object.length; i++){
      temp = {
        name : items_object[i].name,
        brandName : items_object[i].brandName,
        upc : items_object[i].upc,
        sku : items_object[i].sku,
        dateCreated : items_object[i].dateCreated,
        price : items_object[i].price,
        costPrice : items_object[i].costPrice,
        salePrice : items_object[i].salePrice,
        manufacturerId : items_object[i].manufacturerId,
        count : items_object[i].count
      };

      items_reassigned.push(temp);
      // console.log(items_reassigned[i]); //is a test
    }

  	//items purchased information
  	var itemsAndTotal = u.extend({'ItemsPurchased': items_reassigned},
  		{'NoItemsPurchased': items_reassigned.length});

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
