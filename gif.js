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
			carImage.attr('src', results[i].images.fixed_height.url);

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

$("#add-car").on("click", function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var car = $("#car-input").val().trim();

        // The movie from the textbox is then added to our array
        cars.push(car);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

$(document).on("click", ".cars", displayCar);
renderButtons();

