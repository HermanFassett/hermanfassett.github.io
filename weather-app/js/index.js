const APPID = "dj0yJmk9QzJjTXdWc2l1TmhBJmQ9WVdrOVRHMDFaM2RPTjJNbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0zMA--"
var deg = "f";
var lat, lon, loc, wind, temp, desc, city, units;
var sunset = 0, sunrise = 0;
$(document).ready(function() {
  // Get location
  if (navigator.geolocation)
	   navigator.geolocation.getCurrentPosition(getLocation, getIP);
  else getIP();
});
function setLocation() {
  $("#address").text(loc);
  $("#latlon").text("Lat: " + lat + ", Lon: " + lon);
  getWeather();
}
function getLocation(location) {
  lat = location.coords.latitude, lon = location.coords.longitude;
  $.getJSON("http://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lon + "&sensor=true", function(data) {
    loc = data.results[0].formatted_address;
    city = data.results[0].address_components[2].long_name;
    //city = data.results.address_components.formatted_address;
  }).done(function() {
    setLocation();
  });
}

function getIP() {
  $.getJSON("http://ipinfo.io", function(response) {
    var location = response.loc.split(",");
    lat = location[0], lon = location[1], city = response.city;
    loc = response.city + ", " + response.region + ", " + response.country;
  }).done(function() {
    setLocation();
  });
}
function getWeather(geoid) {
  var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D'"+ city +"')&format=json&diagnostics=true&callback=";
  $.getJSON(url, function(data) {
    data = data.query.results.channel;
    sunrise = data.astronomy.sunrise, sunset = data.astronomy.sunset;
    wind = data.wind.speed;
    temp = data.item.condition.temp;
    desc = data.item.forecast[0].text;
    units = data.units;
  }).done(function() {
    $("#weather").text(temp + units.temperature + ", " + desc);
    $("#wind").text("Wind " + wind + units.speed);
    // Determine   graphics
    rise = sunrise.split(":")[0];
    if (sunrise.charAt(sunrise.length - 2) === "p")
      rise = parseInt(rise) + 12;
    set = sunset.split(":")[0];
    if (sunset.charAt(sunset.length - 2) === "p")
      set = parseInt(set) + 12;
    var now = new Date();
    // Day or Night
    if (now.getHours() < rise && now.getHours() > set) {
      $("#orb").removeClass("sun").addClass("moon");
      $("body").css("background-color", "#382B45");
    }
    // If cloudy
    if (!desc.toLowerCase().includes("cloud"))
      $("#cloud").hide();
    if (!desc.toLowerCase().includes("shower") && !desc.toLowerCase().includes("rain"))
      $("#rain").hide();
  });
}
