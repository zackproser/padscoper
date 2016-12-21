var
	Database = require('../lib/database'), 
	RESTHelper = require('../lib/resthelper'),
	Geocoder = require('../lib/geocoder'), 
	malformedRequest = require('./mocks/badRequest.js'), 
	wellFormedRequest = require('./mocks/goodRequest.js')
;

//Test that database can be instantiated and return all properties
exports['getPropertiesFromDatabase'] = function(test) {
	database = new Database(); 
	var properties = database.getProperties(); 
	test.equal(properties.length, 10); 
	test.done();
}; 

//Test that malformed response gets a 400 response
exports['validationRejectstMalformedRequest'] = function(test) {
	var 
		restHelper = new RESTHelper(), 
		determination = restHelper.isValidRequest(malformedRequest)
	; 
	test.equal(determination, false);
	test.done(); 
}

//Test that well-formed response is correctly recognized as such
exports['validationRecognizesProperlyFormedRequest'] = function(test) {
	var
		restHelper = new RESTHelper(), 
		determination = restHelper.isValidRequest(wellFormedRequest) 
	; 
	test.equal(determination, true); 
	test.done();
}

//Test that geocoder correctly detects that two closeby coordinates are within range
exports['geocoderDetectsCoordinatesAreWithinRange'] = function(test) {
	var
		geocoder = new Geocoder(), 
		database = new Database(), 
		properties = database.getProperties(), 
		p1 = properties[0], 
		p2 = properties[1], 
		determination = geocoder.coordinatesAreWithinRange(p1.lat, p1.long, p2.lat, p2.long)
	; 
	test.equal(determination, true); 
	test.done();
}

//Test that geocoder correctly detects that San Francisco is not within range of the North Pole
exports['geocoderDetectsCoordinatesAreOutOfRange'] = function(test) {
	var
		geocoder = new Geocoder(), 
		database = new Database(), 
		properties = database.getProperties(), 
		p1 = properties[0], 
		//The North Pole
		p2 = { lat: 90, long: 0 }, 
		determination = geocoder.coordinatesAreWithinRange(p1.lat, p1.long, p2.lat, p2.long)
	;
	test.equal(determination, false);
	test.done();
}

//Test that geocoder correctly finds distance between two coordinates
exports['geocoderReturnsCorrectDistanceBetweenCoordinates'] = function(test) {
	var
		geocoder = new Geocoder(), 
		database = new Database(), 
		properties = database.getProperties(), 
		p1 = properties[0], 
		p2 = properties[1], 
		miles = geocoder.getDistanceBetweenTwoCoordsInMiles(p1.lat, p1.long, p2.lat, p2.long)
	; 
	test.equal(miles, 1.01); 
	test.done();
}