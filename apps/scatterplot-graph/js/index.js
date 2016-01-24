var margin = {top: 20, right: 150, bottom: 30, left: 100},
    width = 900 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var xValue = function(d) { return d.Seconds;},
    xScale = d3.scale.linear().range([width, 0]),
    xMap = function(d) { return xScale(xValue(d));},
    xLabel = function(d) { return xScale(xValue(d)) + 8;},
    xAxis = d3.svg.axis().scale(xScale).orient("bottom");

var yValue = function(d) { return d.Place;},
    yScale = d3.scale.linear().range([0, height]),
    yMap = function(d) { return yScale(yValue(d));},
    yLabel = function(d) { return yScale(yValue(d)) + 5;},
    yAxis = d3.svg.axis().scale(yScale).orient("left");

// add the graph canvas to the body of the webpage
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class", "main")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var tip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
// load data
d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json", function(error, data) {

  xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
  yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

  // x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Seconds");

  // y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Place");

  // draw dots
  svg.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 5)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .attr("cursor", "pointer")
      .attr("stroke", "black")
      .attr("fill", function(d) {
        return (d.Doping == "") ? "#333" : "#f44";
      })
      .text(function(d) {
        return d.Name;
      })
      .on("mouseover", function(d) {
        tip.transition()
          .duration(100)
          .style("opacity", 1);
        tip.html(d.Name + ": " + d.Nationality + "<br>" +
                 "Year: " + d.Year + ", Time: " + d.Time + "<br>" +
                 "Doping: " + (d.Doping == "" ? "N/A" : d.Doping))
          .style("left", (d3.event.pageX - parseInt(tip.style("width"))/2) + "px")
          .style("top", (d3.event.pageY - 125) + "px");
      })
      .on("mouseout", function(d) {
        tip.transition()
          .duration(500)
          .style("opacity", 0);
      });

  svg.selectAll(".text")
      .data(data)
      .enter().append("text")
      .text(function(d) {
        return d.Name;
      })
      .attr("x", xLabel)
      .attr("y", yLabel)
});
