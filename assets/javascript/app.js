$(document).ready(function () {

    var topicArr = ["Nintendo", "Mario", "Donkey Kong", "Luigi", "Pokemon", "Zelda", "Yoshi", "Super Smash Bros"];
    
    console.log(topicArr);

    function renderButtons() {
        //empty button div
        $("#button-div").empty();

        topicArr.forEach(function (topic) {
            var a = $("<button>");
            // Adds a class of movie to our button
            a.addClass("topic btn btn-danger mr-1 ml-1");
            // Added a data-attribute
            a.attr("data-topic", topic);
            // Provided the initial button text
            // a.attr("data-state", still)
            a.text(topic);
            // Added the button to the buttons-view div
            $("#button-div").append(a);

        });
    };
    renderButtons();


    $("#add-topic").on("click", function (event) {
        event.preventDefault();
        
        // This line of code will grab the input from the textbox
        var newTopic = $("#topic-input").val().trim();

        // The movie from the textbox is then added to our array
        topicArr.push(newTopic);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
        console.log(topicArr);
        console.log(newTopic);
        
        

      });

    //    $(document).on("click", ".movie", displayMovieInfo);

    $("#button-div").on("click", "button", function () {
        $("#gifs-appear-here").empty();
        event.preventDefault();

        console.log("button clicked");
        var topic = $(this).attr("data-topic");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            topic + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            console.log(response);

            var results = response.data;



            for (var i = 0; i < results.length; i++) {

                // Step 3: uncomment the for loop above and the closing curly bracket below.
                // Make a div with jQuery and store it in a variable named topicDiv.
                var topicDiv = $("<div class='m-1'>");
                // Make a paragraph tag with jQuery and store it in a variable named p.
                var p = $("<p>");
                // Set the inner text of the paragraph to the rating of the image in results[i].
                p.text("rating: " + results[i].rating);
                // Make an image tag with jQuery and store it in a variable named topicImage.
                var topicImage = $("<img>");
                // Set the image's src to results[i]'s fixed_height.url.


                topicImage.addClass("gif");
                topicImage.attr("src", results[i].images.fixed_height_still.url);
                topicImage.attr("data-still", results[i].images.fixed_height_still.url);
                topicImage.attr("data-animate", results[i].images.fixed_height.url);
                topicImage.attr("data-state", "still");
                // Append the p variable to the topicDiv variable.
                topicDiv.append(p);
                // Append the topicImage variable to the topicDiv variable.
                topicDiv.append(topicImage)
                // Prepend the topicDiv variable to the element with an id of gifs-appear-here.
                $("#gifs-appear-here").prepend(topicDiv);

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
