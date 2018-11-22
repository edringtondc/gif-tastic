$(document).ready(function () {

    var animalArr = ["alligator", "monkey", "spider"];
    
    console.log(animalArr);

    function renderButtons() {
        //empty button div
        $("#button-div").empty();

        animalArr.forEach(function (animal) {
            var a = $("<button>");
            // Adds a class of movie to our button
            a.addClass("animal");
            // Added a data-attribute
            a.attr("data-animal", animal);
            // Provided the initial button text
            // a.attr("data-state", still)
            a.text(animal);
            // Added the button to the buttons-view div
            $("#button-div").append(a);

        });
    };
    renderButtons();


    $("#add-animal").on("click", function (event) {
        event.preventDefault();
        
        // This line of code will grab the input from the textbox
        var newAnimal = $("#animal-input").val().trim();

        // The movie from the textbox is then added to our array
        animalArr.push(newAnimal);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
        console.log(animalArr);
        console.log(newAnimal);
        
        

      });

    //    $(document).on("click", ".movie", displayMovieInfo);

    $("#button-div").on("click", "button", function () {
        $("#gifs-appear-here").empty();
        event.preventDefault();

        console.log("button clicked");
        var animal = $(this).attr("data-animal");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            console.log(response);

            var results = response.data;



            for (var i = 0; i < results.length; i++) {

                // Step 3: uncomment the for loop above and the closing curly bracket below.
                // Make a div with jQuery and store it in a variable named animalDiv.
                var animalDiv = $("<div>");
                // Make a paragraph tag with jQuery and store it in a variable named p.
                var p = $("<p>");
                // Set the inner text of the paragraph to the rating of the image in results[i].
                p.text("rating: " + results[i].rating);
                // Make an image tag with jQuery and store it in a variable named animalImage.
                var animalImage = $("<img>");
                // Set the image's src to results[i]'s fixed_height.url.


                animalImage.addClass("gif");
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                animalImage.attr("data-animate", results[i].images.fixed_height.url);
                animalImage.attr("data-state", "still");
                // Append the p variable to the animalDiv variable.
                animalDiv.append(p);
                // Append the animalImage variable to the animalDiv variable.
                animalDiv.append(animalImage)
                // Prepend the animalDiv variable to the element with an id of gifs-appear-here.
                $("#gifs-appear-here").prepend(animalDiv);

            }


        });
    });

    $("#gifs-appear-here").on('click', '.gif', function () {
        
        console.log("clicked");

        var state = $(this).attr("data-state");
        var animateURL = $(this).attr("data-animate");
        var stillURL = $(this).attr("data-still");

        if (state === "still") {
            $(this).attr("src", animateURL);
            $(this).attr("data-state", "animate");

        } else {
            $(this).attr("src", stillURL);
            $(this).attr("data-state", "still");
        }

    });

});
