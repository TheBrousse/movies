var SQLiteModule = require("SQLite");
var sqlLite = new SQLiteModule.SQLite();

var args = arguments[0] || {};

$.title.text = args.title;
$.year.text = args.year;
$.synopsis.text = args.critics_consensus;
$.thumbnail.image = args.posters.profile;
$.rating.text = args.ratings.critics_score;

var rows = [];

for (var i = 0; i < args.abridged_cast.length; i++) {
	var row = Ti.UI.createTableViewRow({ title: args.abridged_cast[i].name });

	rows.push(row);
}

$.tblCast.setData(rows);

$.favButton.addEventListener('click', function(e){
	sqlLite.addFavourite(args.id, args);
});
