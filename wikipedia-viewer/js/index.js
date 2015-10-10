$(document).ready(function() {
  function load(search) {
    var url = "https://en.wikipedia.org/w/api.php?action=query&titles=" + search + "&prop=revisions&rvprop=content&format=json";
    $.getJSON(url, function(data) {
      console.log(data.pages);
    });
  }
  load("fassett");
});
