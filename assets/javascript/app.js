$(document).ready(function () {
    var favesArr = []
    var searchTerm = "Nintendo"
    var gifLimit = 20;
    var topicArr = ["Super Mario", "Squirtle", "Bowser", "Tetris", "Link", "Yoshi", "Super Smash Bros", "video games", "goomba", "Princess Peach"];

    function renderButtons() {
        //empty button div
        $("#button-div").empty();

        //adds a button for each topic in the original array
        topicArr.forEach(function (topic) {
            var a = $("<button>");

            a.addClass("topic btn btn-danger mr-1 ml-1");
            a.attr("data-topic", topic);
            a.text(topic);
            $("#button-div").append(a);
        });
    };
    renderButtons();

    function renderFaves() {
        $("#favoriteGifs").empty();

        
        var favorites = localStorage.getItem("favorites")
        console.log(favorites);

        favesArr = favorites.split(",")
        console.log(favesArr)

   

        for (var i = 0; i < favesArr.length; i++) {
            var faveURL = "https://api.giphy.com/v1/gifs/" + favesArr[i] + "?api_key=dc6zaTOxFJmzC&limit=10"

            $.ajax({
                url: faveURL,
                method: "GET"
            }).then(function (results) {

                var faveDiv = $("<div class='row mb-1 ml-1 faveDiv'>");
                var p = $("<p>");
                p.text("rating: " + results.data.rating);
                var topicImage = $("<img>");

                topicImage.addClass("gif");
                topicImage.attr("src", results.data.images.fixed_height_still.url);
                topicImage.attr("data-still", results.data.images.fixed_height_still.url);
                topicImage.attr("data-animate", results.data.images.fixed_height.url);
                topicImage.attr("data-state", "still");
                faveDiv.append(p);

                //a remove button is rendered
                var removeButton = $("<button>")
                removeButton.text("remove");
                removeButton.addClass("btn btn-danger removeButton m-2 p-1");
                removeButton.attr("data-gif", results.data.id);
                p.append(removeButton);

                faveDiv.prepend(topicImage)

                $("#favoriteGifs").prepend(faveDiv);

            });
        }
    }

    renderFaves();

    $("#add-topic").on("click", function (event) {
        event.preventDefault();

        //input from the text box, into the array and re-render buttons
        var newTopic = $("#topic-input").val().trim();
        topicArr.push(newTopic);
        renderButtons();
        $("#topic-input").val("");
        localStorage.setItem("buttons", topicArr);

    });

    function gifDisplay(response) {
        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {

            var topicDiv = $("<div class='m-1 gifDiv' >");
            var p = $("<p>");
            p.text("rating: " + results[i].rating);

            var topicImage = $("<img>");

            topicImage.addClass("gif");
            topicImage.attr("src", results[i].images.fixed_height_still.url);
            topicImage.attr("data-still", results[i].images.fixed_height_still.url);
            topicImage.attr("data-animate", results[i].images.fixed_height.url);
            topicImage.attr("data-state", "still");

            topicDiv.append(p);

            //a fave button is rendered
            var faveButton = $("<button>")
            faveButton.text("favorite");
            faveButton.addClass("btn btn-danger faveButton p-1 m-2");
            faveButton.attr("data-gif", results[i].id);
            p.append(faveButton);

            topicDiv.prepend(topicImage)
            $("#gifs-appear-here").prepend(topicDiv);
        }

    }

    //makes gifs appear from topic choosen
    $("#button-div").on("click", "button", function () {
        $("#gifs-appear-here").empty();
        gifLimit = 20;
        event.preventDefault();

        console.log("button clicked");
        var topic = $(this).attr("data-topic");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            topic + "&api_key=dc6zaTOxFJmzC&limit=10";

        searchTerm = topic;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            gifDisplay(response);
        });
    });

    //adds 10 new gifs
    $("#add-ten").on("click", function (event) {
        event.preventDefault();
        console.log("add 10 clicked" + $(this));

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            searchTerm + "&api_key=dc6zaTOxFJmzC&limit=" + gifLimit;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            $("#gifs-appear-here").empty();

            gifDisplay(response);
            gifLimit += 10;
        });

    });

    //animation of gifs
    $("#gifs-appear-here").on('click', '.gif', function () {

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


    //animation clicks of fave gifs
    $("#favoriteGifs").on('click', '.gif', function () {
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
    $("#gifs-appear-here").on("click", ".faveButton", function () {
        var gifID = $(this).attr("data-gif");

        favesArr.push(gifID);
        localStorage.setItem("favorites", favesArr);
        console.log(favesArr);
        renderFaves();
    });

    //function to remove a favorite gif
    $("#favoriteGifs").on("click", ".removeButton", function () {
        
        var gifID = $(this).attr("data-gif");
        console.log("clicked remove" + gifID)
    //    var removeIndex = favesArr.indexOf(gifID)
    //    favesArr.splice(removeIndex);

       var i = favesArr.indexOf(gifID);
        if(i != -1) {
                favesArr.splice(i, 1);
        }
        localStorage.setItem("favorites", favesArr);

       renderFaves()

    });
});


