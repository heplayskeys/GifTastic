// Global Variables
    var colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
    var favGIFs = [];
    var favCheck = [];
    var imgURLs = [];
    var userColor;
    var addMore = 0;
    var imgLimit = 10;

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
        $(".GIFclick").empty();
        $("#note").show();
        $("#add-more").show();
        addMore = 0;
        imgLimit = 10;

        var color = $(this).attr("data-color");
        var APIKey = "Lk6iVDZN01o2tWotu99YM9UMk6I4BAC2";
        var queryURL = "https://api.giphy.com/v1/gifs/search?limit=10&api_key=" + APIKey + "&q=" + color + "+funny";
            userColor = color;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

            console.log(response);

            var results = response.data;     

            for (var i = 0; i < results.length; i++) {

            var staticImgUrl = results[i].images.fixed_height_still.url;
            var animatedImgUrl = results[i].images.fixed_height.url;
            var GIFcontainer = $("<div>").addClass("GIFclick");
            var GIFimportDate = $("<h4>").html("Date Added: " + results[i].import_datetime.slice(0, 10));
            var GIFrating = $("<h3>").html("Rating: " + results[i].rating);
            var GIFtitle = $("<h2>").html(results[i].title.substr(0, results[i].title.indexOf("GIF"))).addClass("GIFtitle");
            var GIFimage = $("<img>").attr("src", staticImgUrl).addClass("static").attr("data-static", staticImgUrl).attr("data-animate", animatedImgUrl).attr("data-index", i);
            var newLine = $("<p>");
            // It seems there are access restrictions to downloading GIF images from GIPHY -- Perhaps I just can't figure out the correct link to use or syntax
            var GIFdownload = $("<a>").attr("href", animatedImgUrl).attr("download", "results[i].images.original.url.substr(8)").html("Download");
            var favoriteBTN = $("<img>").addClass("makeFav").attr("src", "assets/images/heart.png").attr("data-loc", i);
       
            newLine.append(GIFdownload).append(favoriteBTN);
            GIFcontainer.append(GIFtitle, GIFrating, GIFimportDate, newLine, GIFimage);

            $("#GIFview").append(GIFcontainer);
            }

                // Click GIF to Animate
                $(".container").on("click", ".static", function() {              
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).removeClass("static").addClass("animate");  
            });
                // Click to Stop
                $(".container").on("click", ".animate", function() {              
                $(this).attr("src", $(this).attr("data-static"));
                $(this).removeClass("animate").addClass("static");  
            });
            
            // Click Button to Stop All
            var stopButton = $("<button>");
            stopButton.text("Click to Stop All").addClass("stopButton");
            $("#stopBtn").html(stopButton);
            $(".container").on("click", ".stopButton", function() {
                $("img").removeClass("animate").addClass("static").attr("src", function() {
                    return $(this).attr("data-static");
                });
            });

            // Click to Add Favorite
            $(".makeFav").on("click", function() {
                
                var favIndex = $(this).attr("data-loc");
                var favUrl = results[favIndex].images.fixed_height_small.url;
                var origURL = results[favIndex].images.original.url;
    
                if ($.inArray(favUrl.substr(24), favCheck) === -1) {
    
                    $("#favorites").empty();
    
                    favGIFs.push(favUrl);
                    favCheck.push(favUrl.substr(24));
                    imgURLs.push(origURL);
    
                    for (var i = 0; i < favGIFs.length; i++) {
                        var favContainer = $("<div>").addClass("favGIF");
                        var favDownload = $("<a>").attr("href", imgURLs[i]).attr("download", imgURLs[i]).attr("target", "_blank");
                        var favGIFimage = $("<img>").attr("src", favGIFs[i]).attr("data-fav", i);
    
                        favDownload.append(favGIFimage);
                        favContainer.append(favDownload);
                        
                        $("#favorites").append(favContainer);

                        var clearButton = $("<button>");
                        clearButton.text("Click to Clear Favorites").addClass("clearButton");
                        $("#clearBtn").html(clearButton);
                    }
                }
            });

            // Click Button to Clear Favorites
            $(".container").on("click", ".clearButton", function() {
                $("#favorites").empty();
                $("#clearBtn").empty();
                favGIFs = [];
                favCheck = [];
                imgURLs = [];
            });
        });
    }

    function reset() {
        colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
        renderButtons();
    }

// *********************************

// Main Page Function
$(".container").on("click", ".color", displayGIFs);
$(".container").on("click", "#reset", reset);
$("#note").hide();
$("#add-more").hide();

renderButtons();

// Bonus
$("#add-more").on("click", function(event) {

        event.preventDefault();
        addMore += 10;
        imgLimit += 10;

        var APIKey = "Lk6iVDZN01o2tWotu99YM9UMk6I4BAC2";
        var queryURL = "https://api.giphy.com/v1/gifs/search?limit=" + imgLimit + "&api_key=" + APIKey + "&q=" + userColor + "+funny";
            

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

            var results = response.data;     

            for (var i = addMore; i < results.length; i++) {

                var staticImgUrl = results[i].images.fixed_height_still.url;
                var animatedImgUrl = results[i].images.fixed_height.url;
                var GIFcontainer = $("<div>").addClass("GIFclick");
                var GIFimportDate = $("<h4>").html("Date Added: " + results[i].import_datetime.slice(0, 10));
                var GIFrating = $("<h3>").html("Rating: " + results[i].rating);
                var GIFtitle = $("<h2>").html(results[i].title.substr(0, results[i].title.indexOf("GIF"))).addClass("GIFtitle");
                var GIFimage = $("<img>").attr("src", staticImgUrl).addClass("static").attr("data-static", staticImgUrl).attr("data-animate", animatedImgUrl).attr("data-index", i);
                var newLine = $("<p>");
                // It seems there are access restrictions to downloading GIF images from GIPHY -- Perhaps I just can't figure out the correct link to use or syntax
                var GIFdownload = $("<a>").attr("href", animatedImgUrl).attr("download", "results[i].images.original.url.substr(8)").html("Download");
                var favoriteBTN = $("<img>").addClass("makeFav").attr("src", "assets/images/heart.png").attr("data-loc", i);
           
                newLine.append(GIFdownload).append(favoriteBTN);
                GIFcontainer.append(GIFtitle, GIFrating, GIFimportDate, newLine, GIFimage);
    
                $("#GIFview").prepend(GIFcontainer);
            }

        // Click to Add Favorite
        $(".makeFav").on("click", function() {
                
            var favIndex = $(this).attr("data-loc");
            var favUrl = results[favIndex].images.fixed_height_small.url;
            var origURL = results[favIndex].images.original.url;

            if ($.inArray(favUrl.substr(24), favCheck) === -1) {

                $("#favorites").empty();

                favGIFs.push(favUrl);
                favCheck.push(favUrl.substr(24));
                imgURLs.push(origURL);

                for (var i = 0; i < favGIFs.length; i++) {
                    var favContainer = $("<div>").addClass("favGIF");
                    var favDownload = $("<a>").attr("href", imgURLs[i]).attr("download", imgURLs[i]).attr("target", "_blank");
                    var favGIFimage = $("<img>").attr("src", favGIFs[i]).attr("data-fav", i);

                    favDownload.append(favGIFimage);
                    favContainer.append(favDownload);
                    
                    $("#favorites").append(favContainer);

                    var clearButton = $("<button>");
                    clearButton.text("Click to Clear Favorites").addClass("clearButton");
                    $("#clearBtn").html(clearButton);
                }
            }
        });
    });
});