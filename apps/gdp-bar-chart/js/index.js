function InitChart() {
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var moneyFormat = d3.format("$,.2f"); // Set Money Format
  $.get("http://2am.ninja/json/gdp.json").success(function(body) {
    var data = body.data;
    var MARGINS = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 60
    },
    WIDTH = 1000 - MARGINS.left - MARGINS.right,
    HEIGHT = 500 - MARGINS.top - MARGINS.bottom;

    var barWidth = Math.ceil(WIDTH / data.length);

    var min = new Date(data[0][0]);
    var max = new Date(data[data.length - 1][0]);

    var xRange = d3.time.scale().domain([min, max]).range([0, WIDTH]);

    var yRange = d3.scale.linear().range([HEIGHT, 0])
      .domain([0, d3.max(data, function(d) {
        return d[1];
      })]);

    var xAxis = d3.svg.axis()
      .scale(xRange)
      .orient("bottom")
      .ticks(d3.time.years, 5);

    var yAxis = d3.svg.axis()
      .scale(yRange)
      .orient("left")
      .ticks(10, "");

    var viz = d3.select("#viz")
      .attr("width", WIDTH + MARGINS.left + MARGINS.right)
      .attr("height", HEIGHT + MARGINS.top + MARGINS.bottom)
      .append("g")
      .attr("transform", "translate(" + MARGINS.left + "," + MARGINS.top + ")");
    viz.append("svg:g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + HEIGHT+ ")")
      .call(xAxis);

    viz.append("svg:g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .style("text-anchor", "end")
      .attr("dy", "1em")
      .text("Gross Domestic Product, USA");

    var tip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    viz.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) {
        return xRange(new Date(d[0]));
      })
      .attr("y", function(d) {
        return yRange(d[1]);
      })
      .attr("height", function(d) {
        return HEIGHT - yRange(d[1]);
      })
      .attr("width", barWidth)
      .on("mouseover", function(d) {
        var rec = d3.select(this);
        rec.attr("class", "hover");
        var money = d[1];
        var recDate = new Date(d[0]);
        var year = recDate.getFullYear();
        var month = recDate.getMonth();
        tip.transition()
          .duration(100)
          .style("opacity", 1);
        tip.html(function() {
          return moneyFormat(money) + "<br>" + year + " - " + months[month];
          })
          .style("left", (d3.event.pageX - parseInt(tip.style("width"))/2) + "px")
          .style("top", (d3.event.pageY - 100) + "px");
      })
      .on("mouseleave", function() {
        var rec = d3.select(this);
        rec.attr("class", "leave");
        tip.transition()
          .duration(100)
          .style("opacity", 0);
    })

  });
}
InitChart();
