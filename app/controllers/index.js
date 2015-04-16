var DataModule = require('Data');
var dataModule = new DataModule.Data();

var SQLiteModule = require("SQLite");
var sqlLite = new SQLiteModule.SQLite();

/*
 * fetch the movies matching "Les Bronzes"
 */
dataModule.fetchMovies('batman', function(success, response) {
	if (success) {

		Ti.API.info(response);

		var rows = [];
		var alternativeRow = false;

		for(var i = 0; i < response.movies.length; i++) {
			var row = Alloy.createController('MovieRow', {
				movie: response.movies[i],
			});

			rows.push(row.getView()); //id, title, runtime, ratings, posters, year, synopsis

			alternativeRow = (alternativeRow) ? false : true;

			row.wrapper.backgroundColor = alternativeRow ? '#50afe6' : 'white';
		}

		//set the array of rows to the table view
		$.tblMovies.setData(rows);

	}
	else {
		Ti.UI.createAlertDialog({
			title: 'Oh no!',
			message: 'Your request failed.'
		}).show();
	}
});

$.window1.titleControl= Ti.UI.createLabel({
 	color: '#fff',
	width: Ti.UI.SIZE,
	text: 'Latest Movies',
	font: {
		fontWeight: 'bold',
		fontSize: 16
	}
});

$.tblMovies.addEventListener('click', function(e) {
	var detailController = Alloy.createController('Detail', e.row._data);
	var detailWindow = detailController.getView();
	$.tabs.getActiveTab().open(detailWindow);
});

function fetchFavourites() {
	debugger;
	var movies = sqlLite.getFavourites();
	var alternativeRow = false;
	var rows = [];

	for(var i = 0; i <  movies.length; i++) {
		var row = Alloy.createController('MovieRow');

		row.Wrapper.setBackgroundColor(alternativeRow ? Alloy.Globals.lightColor2 : Alloy.Globals.lightColor);
		row.setTitle(movies[i].title);
		row.setSynopsis(movies[i].synopsis);
		row.setFavourite(true);
		rows.push(row.getView()); //id, title, runtime, ratings, posters, year, synopsis

		alternativeRow = (alternativeRow) ? false : true;
	}

	//set the array of rows to the table view
	$.tblFavourites.setData(rows);
}

Ti.App.addEventListener('refreshFavourites', function(e) {
	fetchFavourites();
});

$.tabs.open();