

var topicsArr = ["beer", "cats", "Harry Potter", "avocados", "Deadpool", "snowboarding", "hedgehogs", "football"];


// Function for displaying movie data
function renderButtons(array) {
    //empty button div
    $("#buttons-div").empty();

        topicsArr.forEach(function (topic) {
            var a = $("<button>");
            // Adds a class of movie to our button
            a.addClass("topic");
            // Added a data-attribute
            a.attr("data-topic", topic);
            // Provided the initial button text
            // a.attr("data-state", still)
            a.text(topic);
            // Added the button to the buttons-view div
            $("#buttons-div").append(a);


        });

}

// Calling the renderButtons function to display the initial list of topics
renderButtons();

// This function handles events where one button is clicked
$("#add-topic").on("click", function(event) {
  event.preventDefault();

  var newTopic = $("#topic-input").val();

  topicsArr.push(newTopic);
  renderButtons();

});

$(".gif").on("click", function() {
   
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


$("button").on("click", function() {

    console.log(this);
    // In this case, the "this" keyword refers to the button that was clicked
    var search = $(this).attr("data-topic");

    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      search + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing our AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After the data comes back from the API
      .then(function(response) {
          console.log(response)
        // Storing an array of results in the results variable
        var results = response.data;


        // Looping over every result item
        for (var i = 0; i < results.length; i++) {

          // Only taking action if the photo has an appropriate rating
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            // Creating a div for the gif
            var gifDiv = $("<div>");

            // Storing the result item's rating
            var rating = results[i].rating;

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + rating);

            // Creating an image tag
            var topicImage = $("<img>");

            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            topicImage.attr("src", results[i].images.fixed_height.url);

            // Appending the paragraph and personImage we created to the "gifDiv" div we created
            gifDiv.append(p);
            gifDiv.append(topicImage);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gifs-appear-here").prepend(gifDiv);
          }
        }
      });
  });

