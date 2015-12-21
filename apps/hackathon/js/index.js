/* Document on load function */
$("document").ready(function() {
  $("#get").click(function() {getData()});
  function getData() {
    var base_url = "https://query.yahooapis.com/v1/public/yql";
    var symbol = $("#symbol").val();
    var startDate = "2012-09-13", endDate = "2012-09-19";
    var data = "select * from yahoo.finance.historicaldata where symbol in ('" + symbol + "')" +
      " and startDate = '" + startDate +"' and endDate = '" + endDate + "'";
    var format = "&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
    $.getJSON(base_url, "q=" + data + format).done(function(data) {
      if (data.query.results === null) {
        $("#result").text("Invalid date range for " + symbol);
      }
      else {
        data.query.results.quote.forEach(function(day) {
          $("body").append("<p>" + day.Date + " - High: " + day.High + " Low: " + day.Low + " Open: " + day.Open +"</p>");
        });
        $("#result").text("Data for " + symbol);
      }
    }).fail(function (jqxhr, status, error) {
      var err = textStatus + ", " + error;
      $("#result").text('Request failed: ' + err);
    });
  }
});
