const APPID = "dj0yJmk9QzJjTXdWc2l1TmhBJmQ9WVdrOVRHMDFaM2RPTjJNbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0zMA--"
var deg = "f";
var lat, lon, loc, wind, temp, desc;
var sunset = 0, sunrise = 0;
$(document).ready(function() {
  // Get location
  if (navigator.geolocation)
	   navigator.geolocation.getCurrentPosition(getLocation, getIP);
  else getIP();
  // Determine graphics
  var now = new Date();
  if (now.getHours() < sunset || now.getHours() > sunrise) {
    $("#orb").removeClass("sun").addClass("moon");
    $("body").css("background-color", "#382B45");
  }
});
function setLocation() {
  $("#loc").text(loc + ", Lat: " + lat + ", Lon: " + lon);
  getWeather();
}
function getLocation(location) {
  lat = location.coords.latitude, lon = location.coords.longitude;
  $.getJSON("http://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lon + "&sensor=true", function(data) {
    loc = data.results.formatted_address;
  }).done(function() {
    setLocation();
  });
}

function getIP() {
  $.getJSON("http://ipinfo.io", function(response) {
    var loc = response.loc.split(",");
    lat = loc[0], lon = loc[1], loc = response.city;
  }).done(function() {
    setLocation();
  });
}
function getWeather(geoid) {
  var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D'"+ loc +"')&format=json&diagnostics=true&callback=";
  $.getJSON(url, function(data) {
    data = data.query.results.channel;
    sunrise = data.astronomy.sunrise, sunset = data.astronomy.sunset;
    wind = data.wind.speed;
    temp = data.item.condition.temp;
    desc = data.item.condition.text;
  }).done(function() {
    $("#weather").text(temp + deg + ", " + desc + " - Wind: " + wind);
  });
}
