$(document).ready(function() {
  function addButton(bText) {
    $(".buttonsArea").append(
      '<button type = "button" class="btn btn-primary gifButton" id = "' +
        bText +
        '" style="margin-right:10px;margin-top:10px;">' +
        bText +
        "</button>"
    );
  }
  $(".searchButton").on("click", function(event) {
    var searchItem = $(".gifLook").val();
    var api_key = "1Yffi3NL57iw4D54am7BIU777rSCtxBf";
    var limit = 10;

    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      searchItem +
      "&api_key=" +
      api_key +
      "&limit=" +
      String(limit);
    if (searchItem.match(/(^[a-z\s]*$)|(^[\d]*$)/i)) {

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        for (var i = 0; i < limit; i++) {
          var imgElement = $("<img>");
          var divElement = $("<div>");
          imgElement.attr("data-status", "still");
          imgElement.attr("data-still", response.data[i].images.fixed_height_still.url);
          imgElement.attr("data-animate", response.data[i].images.fixed_height.url);
          imgElement.attr("src", response.data[i].images.fixed_height_still.url);
          imgElement.attr("class", "gifImg");
          divElement.append(imgElement);
          divElement.prepend("Rating: " + response.data[i].rating);
          divElement.attr("style", "display:flex;flex-direction:column;");
          $(".gifArea").prepend(divElement);
        }
        console.log(response);
      });
      addButton(searchItem);
      $(".gifLook").val("");
    }
    event.preventDefault();

    
  });

  $(".buttonsArea").on("click", function(event) {
    var searchItem = event.target.id;
    var api_key = "1Yffi3NL57iw4D54am7BIU777rSCtxBf";
    var limit = 10;

    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      searchItem +
      "&api_key=" +
      api_key +
      "&limit=" +
      String(limit);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      for (var i = 0; i < limit; i++) {
        var imgElement = $("<img>");
          var divElement = $("<div>");
          imgElement.attr("data-status", "still");
          imgElement.attr("data-still", response.data[i].images.fixed_height_still.url);
          imgElement.attr("data-animate", response.data[i].images.fixed_height.url);
          imgElement.attr("src", response.data[i].images.fixed_height_still.url);
          imgElement.attr("class", "gifImg");
          divElement.append(imgElement);
          divElement.prepend("Rating: " + response.data[i].rating);
          divElement.attr("style", "display:flex;flex-direction:column;");
          $(".gifArea").prepend(divElement);
      }
    });
    event.preventDefault();
  });

  $(".gifArea").on("click", function(event){
    console.log(event);
    if(event.target.className == "gifImg"){
        if($(event.target).attr("data-status")=="still"){
            $(event.target).attr("data-status", "animate");
            $(event.target).attr("src",$(event.target).attr("data-animate"));
        }
        else
        {
            $(event.target).attr("data-status", "still");
            $(event.target).attr("src",$(event.target).attr("data-still"));
        }
        
    }
})
});
