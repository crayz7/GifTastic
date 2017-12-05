var cars = ['Ferrari', 'Lamborghini', 'Porsche'];

function displayCar() {
	var car = $(this).attr('data-car');
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=7bsNNIZiWKU3Us2rsEjyjertitN6YJ6q&q=" + car + "&limit=10&offset=0&rating=G&lang=en";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		console.log(response.data);
		var results = response.data;
		
		for (var i = 0; i < results.length; i++) {
			var gifDiv = $("<div class='item'>");

			var rating = results[i].rating;

			var p = $("<p>").text("Rating: " + rating);

			var carImage = $('<img>');
			carImage.attr({'src':results[i].images.fixed_height_still.url, 'data-still':results[i].images.fixed_height_still.url, 'data-animate':results[i].images.fixed_height.url, 'data-state':"still", 'class':'gif'});

			gifDiv.prepend(p);
            gifDiv.prepend(carImage);

            $('#gifResults').prepend(gifDiv);

    }
  });
};

function renderButtons() {
	 // Deletes the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#car-buttons").empty();
        // Loops through the array of movies
        for (var i = 0; i < cars.length; i++) {

          // Then dynamicaly generates buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adds a class of movie to our button
          a.addClass("cars");
          // Added a data-attribute
          a.attr("data-car", cars[i]);
          // Provided the initial button text
          a.text(cars[i]);
          // Added the button to the buttons-view div
          $("#car-buttons").append(a);
      	}
}

  $(document).on("click", '.gif', function() {
	var state = $(this).attr("data-state");
	if (state == 'still') {
          $(this).attr('src', $(this).attr('data-animate'));
          $(this).attr('data-state', 'animate')
        }

        if (state == 'animate') {
          $(this).attr('src', $(this).attr('data-still'));
          $(this).attr('data-state', 'still')
        }
});

$(document).on("click", ".cars", displayCar);
renderButtons();