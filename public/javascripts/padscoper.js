var 
	searchInput = $('#search-input'),
	searchButton = $('#search-button'), 
	searchError = $('#search-error'), 
	searchResultsPanel = $('#search-results'), 
	geocoder //This will hold the instantiated Google Maps API Geocoder service once the API has been successfully loaded
; 
//Wire up event handlers for users clicking the search button, 
$(searchButton).on('click', handleSearch);
//or pressing enter while the search input has focus
$(document).keypress(function(e) {
	if(e.which == 13 && $(searchInput).is(":focus")) {
		e.preventDefault();
		handleSearch();
	}
}); 
//Handle hiding the error alert once a user starts typing again
$(searchInput).focus(function(){
	if (!$(searchError).hasClass('hidden')) {
		hideError();
	}
}); 

/**
 * See the bottom of index.hbs, where the Google Maps Javascript API is loaded with 
 * the application's API Key. 
 *
 * Per Google Maps API documentation, this call to load the API should be invoked with a callback function
 *
 * This callback function instantiates a new Google Maps API Geocoder service 
 * and stores a reference to it for use by other functions
 *
 * @link: https://developers.google.com/maps/documentation/javascript/examples/geocoding-simple
 */
function googleAPIReady() {
	//Instantiate Google Geocoder service so that other functions can use it
	geocoder = new google.maps.Geocoder(); 
}

/**
 * Gathers address input from the search input and hands it off to the Google Geocoder service
 *
 * If a valid address was supplied and Geocoding succeeds, the coordinates object is 
 * next properly formatted and passed to the ajax search handling function executeSearch  
 */
function geocodeAddress() {
	var address = $(searchInput).val();
	geocoder.geocode({'address' : address}, function(results, status) {
		if (status === 'OK' && typeof results[0].geometry.location !== "undefined") {
			var geocodedAddress = results[0].geometry.location.toJSON();
			//Fix name of longitude property so it's named 'long', as expected by backend
			if (geocodedAddress.hasOwnProperty('lng')) {
				//We'll rename Google's provided 'lng' property to 'long'
				geocodedAddress.long = geocodedAddress.lng; 
				delete geocodedAddress.lng;
			}
			//Pass the coordinates object to the ajax search handler
			executeSearch(geocodedAddress);
		} else {
			displayError();
		}
	}); 
}

/**
 * Search entry point
 */
function handleSearch() {
	hideError();
	//Perform a sanity check on the user's supplied input 
	//before handing it to the Geocoder
	if (validInput()) {
		geocodeAddress();
	} else {
		//Alert the user that they must provide a valid 
		//string address in order to search
		displayError(); 
	}
}

/**
 * Validates that the user input is at least 
 * a string and long than 20 characters
 *
 * @return Boolean - True, if the user's input looks reasonable and false if it does not
 */
function validInput() {
	return (typeof $(searchInput).val() === "string" && $(searchInput).val().length > 20) ? true : false;
}

/**
 * Ajax search handler function 
 * 
 * @param  {Object} coordinatesObject 
 * @return {Response} rendered HTML that can be displayed to the user. This will contain
 * a table with uniformly formatted search results, if there were properties within range, 
 * or a suitable error message explaining that no properties were found within range of the searched address 
 */
function executeSearch(coordinatesObject) {
	$.ajax({
		url: '/properties/search',
		method: 'POST', 
		data: coordinatesObject, 
		success: function(data) {
			//If the response has a 200 status code, 
			//we can be confident the server is returning HTML to render
			//so we set the results panel div's contents to the response
			$(searchResultsPanel).html(data);			 
		}, 
		error: function(error) {
			//TODO: add proper error handling
			console.log('error', error);
		}
	}); 
}

/**
 * Un-hide the by default hidden error alert
 *
 * This panel notifies the user that they must supply 
 * a valid, full address in order to perform searches
 */
function displayError() {
	$(searchError).removeClass('hidden');
}

/**
 * Re-hide the by default hidden error alert 
 * 
 * This function should be called as part of any kind of high-level
 * UI reset code path, to prevent issues with an outdated error alert hanging around
 */
function hideError() {
	//e.preventDefault();
	$(searchError).addClass('hidden');
}