$(document).ready(function() {
  // These are the buttons that are already on the page when it loads
  var startingButtons = ["work", "mondays", "road rage", "angry"];

  // this will make sure the starting buttons get put on the page
  for (var i = 0; i < startingButtons.length; i++) {
    addButton(startingButtons[i]);
  }

  $(".clear-button").on("click", function(event) {
    event.preventDefault();

    $("#search-input").val("");
  });

  // when I click on a gif button the gif pictures show up
  $(document).on("click", ".gif-btn", function() {
    var gifs = $(this).attr("data-name");
    var limit = $("#amount-of-gifs").val();
    var rating = $("#rating").val();
    gifInfoCheck(gifs, limit, rating);
  });
  // when I click on a still picture it will start animating
  $(document).on("click", ".gif-image", function() {
    var state = $(this).attr("data-status");
    // if the picture is in a still state, it will change to animate when I click on it
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-status", "animate");
    }
    // if the picture is in a moving state it will turn back to a still state when I click on it
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-status", "still");
    }
  });
  // This makes sure that when I hit submit the new button will be made for it
  $("#submit-button").on("click", function(event) {
    event.preventDefault();
    var gif = $("#search-input")
      .val()
      .trim();

    // only adds one button
    addButton(gif);
  });
  // this is the gif you receive when the page starts
  gifInfoCheck("much obliged", 1, "G");

  function gifInfoCheck(gifs, limit, rating) {
    // this is the link to the giphy page which takes in the name you put in the search field and the amount of gifs you want
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?api_key=H4VkapwDwbT1cD1pjS1euqsBNXLVCz0P&q=" +
      gifs +
      "&limit=" +
      limit +
      "&offset=0&rating=" +
      rating +
      "&lang=en";

    $.ajax({
      url: queryURL,
      method: "get"
    }).then(function(response) {
      // this is what we get back as a response from the Giphy page
      var gifArray = response.data;

      // we create an element to put the gifs on
      var gifDiv = $("<div class='gif text-center col-md-12'>");

      // Here we a container to hold the gifs
      var gifPictures;

      // This will give us the gifs we are looking for
      for (let i = 0; i < gifArray.length; i++) {
        // We create an element that will hold the rating of the Gif
        gifRating = $("<h3>");
        gifRating.text("Rating: " + gifArray[i].rating.toUpperCase());
        gifRating.addClass("mt-3 mb-2");

        // We create an element the images of the gif, still and moving
        gifPictures = $("<img>");

        gifPictures.attr("src", gifArray[i].images.fixed_height_still.url);
        gifPictures.attr(
          "data-still",
          gifArray[i].images.fixed_height_still.url
        );
        gifPictures.attr("data-animate", gifArray[i].images.fixed_height.url);
        gifPictures.attr("data-status", "still");

        // I add a class so I can change the layout of the pictures
        gifPictures.addClass("gif-image");

        // I append the entire image to the dynamically created element at the top
        gifDiv.append(gifRating, gifPictures);
      }
      // here we append the gifs to the showcase
      $("#gif-showcase").prepend(gifDiv);
    });
  }
  function addButton(gif) {
    // We dynamically create a button that will hold the name of whatever we type in the search field
    var gifButton = $("<button>");

    gifButton.addClass(" gif-btn");

    gifButton.attr("data-name", gif);

    gifButton.text(gif);

    // we put the button on the document
    $("#add-gifs").append(gifButton);
  }
});
