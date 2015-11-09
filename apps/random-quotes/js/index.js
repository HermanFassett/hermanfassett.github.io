$("document").ready(function() {
  random();
});
$("#btn-new").click(function() {
  random();
});
var random = function() {
  $.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function(data) {
    $("#quote").text(data.quoteText);
    if (data.quoteAuthor != "") {
      $("#author").text(data.quoteAuthor);
      $("#author").show();
    } else $("#author").hide();
    tweetUpdate(data.quoteText, data.quoteAuthor);
  });
}
var tweetUpdate = function(quote, author) {
  if (author != "")
    author = " - " + author;
  $("#tweet-content").empty();
 twttr.widgets.createHashtagButton(window.location.href,
    document.getElementById("tweet-content"), {
      text: ("\"" + quote + "\"" + author).substr(0, 126),
      size: "large"
    }
  );
}
