$(document).ready(function () {
    var favesArr = [];

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
        $("#topic-input").val("");
        

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
                var topicDiv = $("<div class='m-1' >");
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


                //a fave button is rendered
                var faveButton  = $("<button>")
                faveButton.text("favorite");
                faveButton.addClass("btn btn-danger faveButton m-2");
                faveButton.attr("data-gif", results[i].id);
                p.append(faveButton);

                // Append the topicImage variable to the topicDiv variable.
                topicDiv.append(topicImage)
               
                // Prepend the topicDiv variable to the element with an id of gifs-appear-here.
                $("#gifs-appear-here").prepend(topicDiv);

            }


        });
    });

    $("#add-ten").on("click", function (event) {
        event.preventDefault();
        console.log("add 10 clicked" + $(this));

        
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            topic + "&api_key=dc6zaTOxFJmzC&limit=10";
        
      
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            console.log(response);

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

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


                //a fave button is rendered
                var faveButton  = $("<button>")
                faveButton.text("favorite");
                // topicDiv.append(faveButton);

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
    //add to fave section
    $("#gifs-appear-here").on("click", ".faveButton", function() {
        
        var gifID = $(this).attr("data-gif");
        
        $("#favoriteGifs").empty();

        
        favesArr.push(gifID);
        console.log(favesArr);

        for (var i = 0; i < favesArr.length; i++) {
            var faveURL =  "http://api.giphy.com/v1/gifs/" + favesArr[i] + "?api_key=dc6zaTOxFJmzC&limit=10"
       

        $.ajax({
            url: faveURL,
            method: "GET"
        }).then(function (results) {
            console.log(results.data.id);
            
         
            
           
                // Step 3: uncomment the for loop above and the closing curly bracket below.
                // Make a div with jQuery and store it in a variable named topicDiv.
                var faveDiv = $("<div>");
                // Make a paragraph tag with jQuery and store it in a variable named p.
                var p = $("<p>");
                // Set the inner text of the paragraph to the rating of the image in results[i].
                p.text("rating: " + results.data.rating);
               

                // Make an image tag with jQuery and store it in a variable named topicImage.
                var topicImage = $("<img>");
                // Set the image's src to results[i]'s fixed_height.url.


                topicImage.addClass("gif");
                topicImage.attr("src", results.data.images.fixed_height_still.url);
                topicImage.attr("data-still", results.data.images.fixed_height_still.url);
                topicImage.attr("data-animate", results.data.images.fixed_height.url);
                topicImage.attr("data-state", "still");
                // Append the p variable to the topicDiv variable.
                faveDiv.append(p);


                //a fave button is rendered
                var  removeButton  = $("<button>")
                removeButton.text("remove");
                removeButton.addClass("btn btn-danger faveButton m-2");
                removeButton.attr("data-gif", results.data.id);
                p.append(removeButton);

                // Append the topicImage variable to the topicDiv variable.
                faveDiv.append(topicImage)
               
                // Prepend the topicDiv variable to the element with an id of gifs-appear-here.
                $("#favoriteGifs").prepend(faveDiv);

            
            });

    

    }
});

});
