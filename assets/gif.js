window.onload = function () {
    var heroes = ["Iron Man", "Captain America", "Hulk", "Thor", "Hawkeye", "Spiderman", "Batman", "Superman"];

    function displayHeroGif() {
        $(".hero").empty();
        console.log("ran");
        var hero = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=CTRq0FUWWKc1pTBNgiOydYtSufQSZXgZ&q=" + hero + "&limit=10&offset=0&rating=G&lang=en";

        // Creates AJAX call for the specific hero button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // Creates a div to hold the hero
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
                still.attr("src", stillURL)
                still.attr("data-still", stillURL);
                still.attr("data-animate", gifURL);
                still.attr("data-state", "still");

                // Appending the image
                heroDiv.append(still);

                // Puts the entire gif above the previous gifs
                $('#buttons-view').append(heroDiv);

            };
        })
    }
    //function to create new hero buttons
    function createButtons() {
        // Deleting the heroes prior to adding new heroes
        $("#buttons-view").empty();

        // Looping through heroes array
        for (var i = 0; i < heroes.length; i++) {

            // Then dynamicaly generating buttons for each hero in the array
            var a = $("<button>");
            // Adding a class of hero-btn to our button
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

    // This function handles events where the add hero button is clicked
    $("#add-hero").on("click", function (event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var hero = $("#hero-input").val().trim();

        // The hero from the textbox is then added to our array
        heroes.push(hero);

        // Calling renderButtons which handles the processing of our hero array
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

    // Adding click event listeners to all elements with .hero-btn class
    $(document).on("click", ".hero-btn", displayHeroGif);

    // Calling the createButtons function to display the intial buttons
    createButtons();
};