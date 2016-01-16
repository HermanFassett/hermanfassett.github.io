// Most help from http://bl.ocks.org/tjdecke/5558084
var margin = {
      top: 5,
      right: 10,
      bottom: 100,
      left: 100
    },
    width = 1200 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom,
    LEGENDWIDTH = 35,
    months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."],
    colors = ["#2d004b", "#542788", "#8073ac", "#b2abd2", "#d8daeb", "#f7f7f7", "#fee0b6", "#fdb863", "#e08214", "#b35806", "#7f3b08"],
    axis = {
      yLabelX: -50,
      yLabelY: height / 2,
      xLabelX: width / 2,
      xLabelY: height + 45
    };

d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json", function(error, data) {
  // Get data
  var baseTemperature = data.baseTemperature,
      monthlyData = data.monthlyVariance,
      years = monthlyData.map(function(month) {
        return month.year;
      }),
      // Filter years
      years = years.filter(function(year, index) {
        return years.indexOf(year) === index;
      }),
      variance = monthlyData.map(function(month) {
        return month.variance;
      }),
      grid = { // Grid size
        width: width / years.length,
        height: height / months.length
      },
      min = { // Min values
        variance: d3.min(variance),
        year: d3.min(years)
      },
      max = { // Max values
        variance: d3.max(variance),
        year: d3.max(years)
      };
      min.date = new Date(min.year, 0);
      max.date = new Date(max.year, 0);
  // Set up color scale
  var colorScale = d3.scale.quantile()
    .domain([min.variance + baseTemperature, max.variance + baseTemperature])
    .range(colors);
  // Get chart and set values
  var svg = d3.select("#chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Load tip
  var tip = d3.tip().attr('class', 'd3-tip')

  // Month labels
  var monthLabels = svg.selectAll(".monthLabel")
    .data(months)
    .enter().append("text")
    .text(function(d) { return d;})
    .attr("x", 0)
    .attr("y", function(d, i) { return i * grid.height; })
    .style("text-anchor", "end")
    .attr("transform", "translate(-6," + grid.height / 1.5 + ")");
  // Set X scale
  var xScale = d3.time.scale()
    .domain([min.date, max.date])
    .range([0, width]);
  // X Axis
  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .ticks(d3.time.years, 10);

  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (height + 1) + ")")
    .call(xAxis);

  // Months text
  svg.append("g")
    .attr("transform", "translate(" + axis.yLabelX + ", " + axis.yLabelY + ')')
    .append('text')
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Months");

  // Years text
  svg.append("g")
    .attr("transform", "translate(" + axis.xLabelX + ", " + axis.xLabelY + ")")
    .append("text")
    .attr("text-anchor", "middle")
    .text("Years");

  // Add tooltip
  svg.call(tip);

  // Add cards
  var cards = svg.selectAll(".year")
    .data(monthlyData, function(d) { return (d.year + ':' + d.month)})
    .enter().append("rect")
      .attr("x", function(d) { return ((d.year - min.year) * grid.width)})
      .attr("y", function(d) { return ((d.month - 1) * grid.height)})
      .attr("width", grid.width)
      .attr("height", grid.height)
      .style("fill", colors[5]) // Start color
    .on("mouseover", function(d) {
      // Set tooltip html and show
      tip.html(
          d.year + " - " + months[d.month - 1] + "<br>" +
          (Math.floor((d.variance + baseTemperature) * 1000) / 1000) + " &deg;C<br>" +
          d.variance + " &deg;C"
      ).show();
    })
    .on("mouseout", function(d) {
      // Hide tooltip
      tip.hide();
    })
    .transition().duration(1000)
    .style("fill", function(d) { return colorScale(d.variance + baseTemperature)});

  // Create legend
  var legend = svg.selectAll(".legend")
    .data([0].concat(colorScale.quantiles()), function(d) {
      return d;
    })
    .enter().append("g")
    .attr("class", "legend");
  // Legend Rectangle
  legend.append("rect")
    .attr("x", function(d, i) {
      return LEGENDWIDTH * i;
    })
    .attr("y", height + 50)
    .attr("width", LEGENDWIDTH)
    .attr("height", grid.height / 2)
    .style("fill", function(d, i) { return colors[i]});
  // Legend Text
  legend.append("text")
    .text(function(d) { return (Math.floor(d * 10) / 10);})
    .attr("x", function(d, i) { return LEGENDWIDTH * i})
    .attr("y", height + (grid.height / 2 - 3) + 50);
});
