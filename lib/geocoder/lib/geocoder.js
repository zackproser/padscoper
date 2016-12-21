var Geocoder = function() {
	this.maximumRange;
	//init handles set up - like a construct 
	this.init(); 
}; 

/**
 * Performs set up routines like a __construct function
 * 
 * Useful for reading environment variables to determine configurable parameters, 
 * such as the maximum range in miles that property searches should return results for
 *
 * Providing application-level configuration options allows Operations Engineers to more easily 
 * manage the application without requiring developer support
 */
Geocoder.prototype.init = function() {
	//Read environment variables to set up configurable parameters
	this.maximumRange = process.env.maximumRange || 20;
}; 

/**
 * This method accepts two pairs of lat, long coordinates and returns the distance between the two coordinates in miles
 *
 * It is an implementation of the Haversine formula for giving great-circle distances 
 * between two points on a sphere from their latitudes and longitudes
 * 
 * @link https://en.wikipedia.org/wiki/Haversine_formula
 * 
 * @param  {Number} lat1 The first coordinate's latitude
 * @param  {Number} lon1 The first coordinate's longitude
 * @param  {Number} lat2 The second coordinate's latitude
 * @param  {Number} lon2 The second coordinate's longitude
 * 
 * @return {Number} distance The distance between the two supplied coordinates, represented in miles and rounded to two decimal places
 */
Geocoder.prototype.getDistanceBetweenTwoCoordsInMiles = function(lat1, lon1, lat2, lon2) {

    var 
        //Prevent headaches from javascript trying to do math on a string
        lat1 = (typeof lat1 === "string") ? parseFloat(lat1) : lat1, 
        lon1 = (typeof lon1 === "string") ? parseFloat(lon1) : lon1, 
        lat2 = (typeof lat2 === "string") ? parseFloat(lat2) : lat2, 
        lon2 = (typeof lon2 === "string") ? parseFloat(lon2) : lon2,
		radlat1 = Math.PI * lat1/180, 
        radlat2 = Math.PI * lat2/180,
   	    radlon1 = Math.PI * lon1/180,
    	radlon2 = Math.PI * lon2/180,
        theta = lon1-lon2,
        radtheta = Math.PI * theta/180,
        dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
    ;

    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    return dist.toFixed(2);
}

/**
 * Convenience method for determining if a pair of coordinates are within the application-level maximum range or not
 *
 * Useful for supplying as a callback to filter functions that operate on result sets retrieved from a database or service
 * 
 * @param  {Number} lat1 the first coordinate's latitude
 * @param  {Number} lon1 the first coordinate's longitude
 * @param  {Number} lat2 the second coordinate's latitude
 * @param  {Number} lon2 the second coordinate's longitude
 * 
 * @return {Boolean} determination true, if the coords are within range, and false if they are not 
 */
Geocoder.prototype.coordinatesAreWithinRange = function(lat1, lon1, lat2, lon2) {
	//If the supplied pair of coordinates are within the maximum range of each other, return true
	//Otherwise, return false
	return ( this.getDistanceBetweenTwoCoordsInMiles(lat1, lon1, lat2, lon2) <= this.maximumRange );
}

//Export the Geocoder module so it can be required properly
module.exports = Geocoder; 