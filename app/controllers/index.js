var DataModule = require('Data');
var dataModule = new DataModule.Data();

/*
 * Fetch Movies
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

			row.wrapper.backgroundColor = alternativeRow ? '#e9e9e9' : 'white';
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

$.tblMovies.addEventListener('click', function(e) {
	var detailController = Alloy.createController('Detail', e.row._data);
	var detailWindow = detailController.getView();
	$.tabs.getActiveTab().open(detailWindow);
});

Ti.App.addEventListener('refreshFavourites', function(e) {
	fetchFavourites();
});

$.tabs.open();