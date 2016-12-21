var RESTHelper = function() {
	this.init(); 
}; 

/**
 * Performs set up routines like a __construct function
 */
RESTHelper.prototype.init = function() {

}

/**
 * Validates that a request has the required parameters and that it is well-formed
 *
 * Useful for running as a sanity check against incoming requests before peforming
 * resource-intensive operations like DB lookups or service requests
 * 
 * @param  {Object} request An Express request
 * 
 * @return {Boolean} determination True, if the request is well-formed and valid, and false if it is not 
 */
RESTHelper.prototype.isValidRequest = function(request) {
	var determination = false; 
	if (typeof request.body.lat != "undefined" && typeof request.body.long != "undefined") {
		if (this.isNumeric(request.body.lat) && this.isNumeric(request.body.long)) {
			determination = true;
		}
	}
	return determination;
}

/**
 * Ensure an input is a valid number to be operated upon (regardless of its data type)
 * 
 * @param  {Mixed}  input  The input to check 
 * 
 * @return {Boolean} determination Whether or not the input is numeric, regardless of its type
 */
RESTHelper.prototype.isNumeric = function(input) {
	return (!isNaN(parseFloat(input)) && isFinite(input)); 
}

/**
 * Formulates a response object, making it easier to return uniform API responses
 *
 * Providing meta-data such as status codes and messages and counts makes it easier for 
 * consumers to script against this API.
 * 
 * @param  {Array} collection - an array of objects, likely returned by the database or a service
 * 
 * @return {Object} response - a full response object including helpful metadata    
 */
RESTHelper.prototype.formResponse = function(collection) {
	//Default skeleton response object 
	//TODO: load this from a template
	var response = {
		status: {
			code: 200, 
			message: "OK"
		}, 
		collection: {
			count: 0, 
			properties: []
		}
	}; 
	if(typeof collection != "undefined") {

		if (Array.isArray(collection) && collection.length > 0) {
			//We have items for the response, so we'll update the response accordingly
			response.collection.count = collection.length; 
			response.collection.properties = collection;
		}
	}

	return response; 
}

/**
 * This method generates a sensible human-legible error message by examining an inbound request
 * and flagging missing properties that must be included and properly formulated
 * 
 * @param  {Object} request An Express request
 * @return {Object} response A response object that is ready to be returned to the caller via res.json
 */
RESTHelper.prototype.generateError = function(request) {
	var 
		errorMessage = '',
		requiredProperties = [{ name: 'lat', type: 'Number'}, { name: 'long', type: 'Number'}], 
		self = this
	;

	//Error response skeleton 
	//TODO: load this from a template
	var response = {
		status: {
			code: 400, 
			message: "Bad Request", 
			detail: ""
		}
	}; 

	//Check the request for all required properties
	requiredProperties.forEach(function(property){
		//Required properties: 
		//1. must be present 
		//2. must be named correctly
		//3. must be numeric (even if they are sent as strings)
		if (typeof request.body[property.name] === "undefined" || !self.isNumeric(request.body[property.name]) ) {
			errorMessage += "You must supply a parameter named " + property.name + ' - which must be numeric';
		}; 
	});
	//Update the response with a detailed error message
	response.status.detail = errorMessage; 
	return response;
}; 

//Export the RESTHelper module so it can be required properly
module.exports = RESTHelper; 