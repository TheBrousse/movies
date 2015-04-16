var movie = arguments[0].movie;

$.title.text = movie.title;
$.thumbnail.image = movie.posters.thumbnail;

if (movie.synopsis === '') {
	$.synopsis.text = 'There is no synopsis available for this movie.';
} else {
	$.synopsis.text = movie.synopsis; 
}

$.getView()._data = movie;