function Data(){
	this.TIMEOUT = 5000;
	this.API_KEY = 'fuvfpegjuuqtrdj5wm6sg2x5';
	this.BASE_URL = 'http://api.rottentomatoes.com/api/public/v1.0/';
};

Data.prototype.makeHTTPRequest = function(url, callback){
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload: function(e) {
	         Ti.API.info("Received text: " + this.responseText);
	         callback(true, JSON.parse(this.responseText));
	     },
	     // function called when an error occurs, including a timeout
	     onerror: function(e) {
	         Ti.API.debug(e.error);
	         callback(false, null);
	     },
	     timeout: this.TIMEOUT  // in milliseconds
	 });
	 
	 client.open("GET", url); // Prepare the connection.
	 client.send();  // Send the request.
};

/*
 * builds the url and fetches the movie JSON from RottenTomatoes
 */
Data.prototype.fetchMovies = function(query, callback){
	var url = this.BASE_URL + 'movies.json?apikey=' + this.API_KEY + '&q=' + query;
	
	this.makeHTTPRequest(url, function(success, response){
		callback(success, response);
	});
};

//export the module
exports.Data = Data;