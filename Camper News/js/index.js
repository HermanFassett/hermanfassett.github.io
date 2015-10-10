var MIN = 0;
var MAX = 20;
$(document).ready(function(){
  load();
  $("#load").click(function() {
    MIN += 20;
    MAX += 20;
    load();
  });
});
function load() {
  $.getJSON("http://www.freecodecamp.com/news/hot", function(data) {
    if (MIN < 100) {
      for (var i = MIN; i < MAX; i++) {
        var link = data[i].link, picture = data[i].author.picture;
        var headline = data[i].headline;
        var author = data[i].author.username;
        var likes = data[i].upVotes.length;
        insert(link, picture, headline, author, likes);
      }
    }
  });
  function insert(link, img, headline, author, likes) {
    headline = headline.substr(0, 20) + "...";
    var elem =
    "<div class='news-box'>" +
      "<div class='likes'>+" + likes + "</div>" +
      "<a href='" + link + "'><img src='" + img +"'></a>" +
      "<div class='news-info'>" +
        "<a class='title' href='" + link + "'><p>" + headline + "</p></a>" +
        "<a class='author' href='http://freecodecamp.com/" + author + "'>by " + author + "</a>" +
      "</div" +
    "</div>";
    $("#main").append(elem + " ");
  }
}
