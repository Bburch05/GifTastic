
var topics = ["Mecha","Dark Souls","Spyro","The Incredibles"]
var alertTimeOut

function displayGif() {

    var topic = $(this).attr("data-name");
    var offset = Math.floor(Math.random() * 50);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q='" + topic + "'&api_key=XXiv9Vg02nJ9OdVvA56jjcLTXgfeVsiJ&limit=10&offset=" + offset;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var result = response.data;
      $(".instructions").text("Click a Gif to animate it!")
     
      for (var j = 0; j < result.length; j++){
      var gifDiv = $("<div>").attr("class","gifDiv");
      
      var gifImg = $("<img>").attr("src",result[j].images.fixed_height_still.url).attr("class","gifIMG img-fluid");
      gifImg.attr("data-still",result[j].images.fixed_height_still.url).attr("data-animate",result[j].images.fixed_height.url).attr("data-state", "still");
      
      var gifTitle = $("<p class='title'>").text((result[j].title).toUpperCase());

      var gifRate = $("<p class='rating'>").text("Rated: " + (result[j].rating).toUpperCase());

      var download = $("<a href="+ result[j].images.original.url + " download><button class='btn' id='download'><i class='fa fa-download'></i></button></a>")
      gifRate.append(download);
      gifDiv.append(gifTitle,gifImg,gifRate);
      $(".gifHolder").prepend(gifDiv);
      
      }
    
    });

  }

  
  function renderButtons() {
    $(".buttonsDiv").empty();
    for (var i = 0; i < topics.length; i++) {
      var a = $("<button>");
      a.addClass("topic btn");
      a.attr("data-name", topics[i]);
      a.text(topics[i]);
      $(".buttonsDiv").append(a);
    }
  }

 
  $("#add-topic").on("click", function(event) {
    event.preventDefault();
    var topicIn = $("#topic-input").val().trim();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q='" + topicIn + "'&api_key=XXiv9Vg02nJ9OdVvA56jjcLTXgfeVsiJ&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var result = response.data;
      console.log(result.length);
      console.log(result);
        if (result.length === 0){
            var alert = $("#alert")
            alert.text("No Gifs Detected! Try a different topic.").css("opacity","1")
            alertTimeOut = setTimeout(function(){
               alert.animate({
                    opacity: 0
                  }, 2000);
                
            },2000)
        }

        else {
            topics.push(topicIn);
            renderButtons();
        }
    $("#topic-input").val("");

  });
});
  $(document).on("click", ".topic", displayGif);


  $(document).on("click", ".gifIMG", function(){
    var state = $(this).attr("data-state");
    var animatedURL = $(this).attr("data-animate");
    var stillURL = $(this).attr("data-still")
    
    if (state === 'still'){
  
      $(this).attr("src", animatedURL);
      $(this).attr("data-state", "animate");
    
    };
  
    if (state === "animate"){
      $(this).attr("src", stillURL);
      $(this).attr("data-state", "still");
    }
  });
  
  renderButtons();