var worldurl = "https://raw.githubusercontent.com/mbostock/topojson/master/examples/world-50m.json",
    meteorurl = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json",
    width = 960,
    height = 480;

var projection = d3.geo.equirectangular()
    .scale(153)
    .translate([width / 2, height / 2])
    .precision(.1);

var path = d3.geo.path()
    .projection(projection);

var graticule = d3.geo.graticule();

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

// Add tooltip
var tip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

svg.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);

d3.json(worldurl, function(error, world) {
  if (error) throw error;

  svg.insert("path", ".graticule")
      .datum(topojson.feature(world, world.objects.land))
      .attr("class", "land")
      .attr("d", path);

  svg.insert("path", ".graticule")
      .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
      .attr("class", "boundary")
      .attr("d", path);
  d3.json(meteorurl, function(meteors) {
    var strikes = meteors.features;
    strikes.sort(function(a,b) {
      return b.properties.mass - a.properties.mass
    });
    svg.selectAll(".pin")
      .data(strikes)
      .enter().append("circle", ".pin")
      .style("stroke", "red")
      .style("stroke-width", 2)
      .style("fill", "rgba(0,0,0,0.3)")
      .attr("r", function(d) {
        var mass = Math.floor(+d.properties.mass / 30000);
        var left = mass - 40;
        return (left <= 0 ? (mass || 0) + 3 : 40 + Math.round(left/60));
      })
      .attr("cursor", "pointer")
      .attr("transform", function(d) {
        return "translate(" + projection([
          d.properties.reclong,
          d.properties.reclat
        ]) + ")";
      })
      .on("mouseover", function(d) {
        tip.transition()
          .duration(100)
          .style("opacity", 1);
        tip.html("<b>Name:</b> " + d.properties.name + "</br>" +
                 "<b>Mass:</b> " + d.properties.mass + "</br>" +
                 "<b>Date:</b> " + new Date(d.properties.year).toUTCString() + "</br>" +
                 "<b>Lat/Lon:</b> " + d.properties.reclat + "/" +d.properties.reclong)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 30) + "px");
      })
      .on("mouseout", function(d) {
        tip.transition()
          .duration(500)
          .style("opacity", 0);
      });
  });
});

d3.select(self.frameElement).style("height", height + "px");
