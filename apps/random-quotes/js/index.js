/* Document on load function */
$("document").ready(function() {
  random(); // On document load, load a quote
});

/* Random Quote Button Click event */
$("#btn-new").click(function() {
  random(); // On button click, load a quote
});

 /* Load a Random Quote */
var random = function() {
  // Quote Api Url
  var url = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";
  // Get JSON data
  $.getJSON(url, function(data) {
    $("#quote").text(data.quoteText); // Set quote text
    if (data.quoteAuthor != "") {
      $("#author").text(data.quoteAuthor); // If quote has an author, set author text
      $("#author").show(); // Make sure author element is showing
    }
    else $("#author").hide(); // If quote has no author, hide author element
    tweetUpdate(data.quoteText, data.quoteAuthor); // Update Tweet Content
  });
}

/* Set Tweet Content */
var tweetUpdate = function(quote, author) {
  $("#tweet-content").empty(); //Empty the tweet-content
  // Create new twitter hashtag button with quote and author content
  twttr.widgets.createHashtagButton(window.location.href, document.getElementById("tweet-content"), {
      text: ("\"" + quote + "\"" + author).substr(0, 126),
      size: "large"
    }
  );
}
