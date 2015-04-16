function SQLite(){
	this.db = Ti.Database.open('moviesDB');
	this.executeCommand('CREATE TABLE IF NOT EXISTS favs(id VARCHAR(20,0) PRIMARY KEY, jsonData TEXT);');
};

SQLite.prototype.executeCommand = function(query){
	this.db.open();
	this.db.execute(query);
};

SQLite.prototype.getFavourites = function(){
	var records = this.db.execute("SELECT * FROM favs");
	var movies = [];
	while (records.isValidRow()){
		movies.push(JSON.parse(records.fieldByName('jsonData')));
		records.next();
	}
	
	records.close();
	
	return movies;
};

SQLite.prototype.deleteFavourite = function(id){
	this.executeCommand("DELETE FROM favs WHERE id = '" + id + "'");
};

SQLite.prototype.addFavourite = function(id, jsonData){
	var jsonString = JSON.stringify(jsonData);
	this.db.execute("INSERT OR REPLACE INTO favs (id, jsonData) VALUES (?, ?)", id, jsonString);
	alert('Favourite added');
	Ti.App.fireEvent('refreshFavourites');
};

exports.SQLite = SQLite;