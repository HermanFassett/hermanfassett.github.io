$(document).ready(function() {
  $("#search-box").keypress(function(e) {
    if (e.which === 13)
      load($("#search-box").val());
  });
  function load(input) {
    $("#results").html("");
    var url = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + input + "&format=json&callback=?";
    $.getJSON(url, function(data) {
      var search = data.query.search;
      for (var i = 0; i < search.length; i++) {
        var result = "<a href='https://en.wikipedia.org/wiki/" + search[i].title + "'>" +
                      "<div class='result'>" +
                      "<h1>" + search[i].title + "</h1>" +
                      search[i].snippet + "..." +
                      "</div></a>";
        $("#results").append(result);
      }
    });
  }
});
