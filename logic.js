// Global Variables
    var colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

// *********************************

// Functions
    function renderButtons() {

        $("#buttons-view").empty();
        $("#color-input").val("");

        for (var i = 0; i < colors.length; i++) {

            var a = $("<button>");
                a.addClass("color");
                a.attr("data-color", colors[i]);
                a.text(colors[i]);
            
            $("#buttons-view").append(a);
        }
    }

    $("#add-color").on("click", function(event) {
        
        event.preventDefault();

        var color = $("#color-input").val().trim();

        if (color !== "" && colors.indexOf(color) === -1) {
            colors.push(color);
            renderButtons();
        }
        else {
            alert("Invalid entry. Please try again.");
            $("#color-input").val("");
        }
    });

    function displayGIFs() {

        $("#GIFview").empty();

        var color = $(this).attr("data-color");
        var APIKey = "Lk6iVDZN01o2tWotu99YM9UMk6I4BAC2";
        var queryURL = "https://api.giphy.com/v1/gifs/search?limit=10&api_key=" + APIKey + "&q=" + color + "+funny";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);

            var animated = [];
            var static = [];

            for (var i = 0; i < response.data.length; i++) {
            var GIFcontainer = $("<div>").addClass("GIFclick");
            var GIFrating = $("<h3>").html("Rating: " + response.data[i].rating);
            var GIFstaticIMG = $("<img>").attr("src", response.data[i].images.fixed_height_still.url).addClass("static").attr("data-index", i);
            
            GIFcontainer.append(GIFrating, GIFstaticIMG);

            $("#GIFview").append(GIFcontainer);

            animated.push(response.data[i].images.fixed_height.url);
            static.push(response.data[i].images.fixed_height_still.url);
            }

            console.log(animated);
            console.log(static);

                $(document).on("click", ".static", function() {
                $(this).removeClass("static").addClass("animate");                
            var indexVal = $(this).attr("data-index");
                $(this).attr("src", animated[indexVal]).css("filter", "grayscale(0%)");
                console.log(this);
            });

                $(document).on("click", ".animate", function() {
                $(this).removeClass("animate").addClass("static");                
            var indexVal = $(this).attr("data-index");
                $(this).attr("src", static[indexVal]).css("filter", "grayscale(100%)");
                console.log(this);
            });
            
        });
    }

// *********************************

// Main Page Function
$(document).on("click", ".color", displayGIFs);


renderButtons();