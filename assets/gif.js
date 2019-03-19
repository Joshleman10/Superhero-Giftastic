window.onload = function () {
    var heroes = ["Iron Man", "Captain America", "Hulk", "Thor", "Hawkeye", "Spiderman", "Batman", "Superman"];

    function displayHeroGif() {
        $(".hero").empty();
        console.log("ran");
        var hero = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=CTRq0FUWWKc1pTBNgiOydYtSufQSZXgZ&q=" + hero + "&limit=10&offset=0&rating=G&lang=en";

        // Creates AJAX call for the specific movie button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // Creates a div to hold the movie
            var heroDiv = $('<div class="hero">');

            var arrLength = response.data;

            for (var i = 0; i < arrLength.length; i++) {

                // Storing the rating data
                var rating = arrLength[i].rating;

                // Creating an element to have the rating displayed
                var pOne = $("<p>").text("Rating: " + rating);

                // Displaying the rating
                heroDiv.append(pOne);

                // Retrieving the URL for the gif
                var gifURL = arrLength[i].images.original.url;

                var stillURL = arrLength[i].images.original_still.url;

                // Creating an element to hold the image
                var still = $("<img id='still'>");
                still.attr ("src", stillURL)
                still.attr("data-still", stillURL);
                still.attr("data-animate", gifURL);
                still.attr("data-state", "still");
                
                // Appending the image
                heroDiv.append(still);

                // Puts the entire Movie above the previous movies.
                $('#buttons-view').append(heroDiv);

            };
        })
    }

    // displayMovieInfo function re-renders the HTML to display the appropriate content
    function createButtons() {
        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < heroes.length; i++) {

            // Then dynamicaly generating buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of movie-btn to our button
            a.addClass("hero-btn");
            a.attr("data-state", "still")
            // Adding a data-attribute
            a.attr("data-name", heroes[i]);
            // Providing the initial button text
            a.text(heroes[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);

        }
    }

    // This function handles events where the add movie button is clicked
    $("#add-hero").on("click", function (event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var hero = $("#hero-input").val().trim();

        // The movie from the textbox is then added to our array
        heroes.push(hero);

        // Calling renderButtons which handles the processing of our movie array
        createButtons();
    });

        $(document).on("click", "#still", function () {

            var state = $(this).attr("data-state");
            console.log(this);

            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));                
                $(this).attr("data-state", "animate");
            }
            else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            };
        })

    // Adding click event listeners to all elements with a class of "movie"
    $(document).on("click", ".hero-btn", displayHeroGif);

    // Calling the renderButtons function to display the intial buttons
    createButtons();
};