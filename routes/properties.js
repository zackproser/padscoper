var 
	express = require('express'),
	router = express.Router(),
	path = require('path'),
	hbs = require('hbs'),
	//winston is a logger that supports multiple levels: info, notice, warning, error, etc
	winston = require('winston'),
	Database = require(path.join(__dirname, '/../lib/database')),
	Geocoder = require(path.join(__dirname, '../lib/geocoder')), 
	RESTHelper = require(path.join(__dirname, '../lib/resthelper'))
	//Instantiate the Database, Geocoder and RESTHelper modules
	database = new Database(), 
	geocoder = new Geocoder(), 
	restHelper = new RESTHelper()
; 

// GET properties list 
router.get('/', function(req, res) {
  var 
    //Look up all properties from the database
  	properties = database.getProperties(), 
  	//Use RESTHelper to formulate a uniform response
    response = restHelper.formResponse(properties)
  ;
  winston.info('Request received for properties list route');
  res.status(200);
  res.json(response);
});

//POST /properties/search
router.post('/search', function(req, res) {

	//Don't hit the database until we're sure we have a valid and properly-formed request
	if (restHelper.isValidRequest(req)) {

		winston.info('Received valid properties search request');

		var 
			reqLat = req.body.lat || null, 
			reqLong = req.body.long || null,
			//Read out all properties from the database
			properties = database.getProperties(); 
		;

		//Filter down the properties, using our Geocoder module to determine which properties 
		//are within the correct range given the request's lat and long parameters
		properties = properties.filter(function(property, index, array){
			//Use geocoder's determination about range as the boolean which will keep or discard each property
			return geocoder.coordinatesAreWithinRange(reqLat, reqLong, property.lat, property.long);
		}); 

		res.status(200); 
		if (properties.length > 0) {
			//If there's at least one property, we'll render the results template
			winston.info('Found ' + properties.length + ' properties for requested coordinates: ' + reqLat + ',' + reqLong);
			res.render('results', { properties : properties });
		} else {
			//Otherwise render the template that explains to the user that nothing was found
			winston.warn('No properties found for requested coordinates: ' + reqLat + ',' + reqLong);
			res.render('no-results');
		}

	} else {
		winston.error('/search route received malformed request:' + req); 
		res.status(400);
		//Use the REST Helper to generate a descriptive error response that can be returned to caller,
		//which will point out which properties were missing or of the wrong type
		res.json(restHelper.generateError(req))
	}
}); 

module.exports = router;
