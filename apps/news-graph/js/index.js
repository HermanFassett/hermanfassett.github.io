// Followed http://bl.ocks.org/mbostock/4062045 for this
// Add variables
var news = [], links = [], nodes = {},
  width = 800,
  height = 700;

// Get hostname
function getHost(url) {
  var temp = document.createElement("a");
  temp.href = url;
  return temp.hostname;
}
function dataConvert(sub) {
  var story = {
    image: sub.image,
    url: sub.link,
    avatar: sub.author.picture,
    username: sub.author.username,
    rank: sub.rank,
    host: getHost(sub.link)
  };
  news.push(story);
  var link = {
    source: story.username,
    target: story.host,
    image: story.avatar,
    rank: story.rank
  };
  links.push(link);
}
function linkConvert(link) {
  link.source = nodes[link.source] || (nodes[link.source] = {
    name: link.source,
    image: link.image
  });
  link.target = nodes[link.target] || (nodes[link.target] = {
    name: link.target,
    rank: []
  });
}

// FCC hot camper news
d3.json("http://www.freecodecamp.com/news/hot", function(error, data) {
  if (error) console.error(error);

  // Get data sets
  data.forEach(dataConvert);
  // Set links
  links.forEach(linkConvert);
  // Get the upvotes
  links.forEach(function(link, i) {
    nodes[link.target.name].rank.push(link.rank);
  });

  // From colorbrewer2
  var color = d3.scale.quantize()
    .domain([1, 10])
    .range(["#543005", "#8c510a", "#bf812d", "#dfc27d", "#f6e8c3", "#f5f5f5", "#c7eae5", "#80cdc1", "#35978f", "#01665e", "#003c30"]);

  // Add forces
  var force = d3.layout.force()
    .nodes(d3.values(nodes))
    .links(links)
    .gravity(0.2)
    .charge(function(d) {
      return -((d.weight * 3) + 150);
    })
    .linkDistance(50)
    .on("tick", tick)
    .size([width, height])
    .start();

  // Insert svg
  var svg = d3.select("body").append("svg")
    .attr("class", "graph")
    .attr("width", width)
    .attr("height", height);

  // Add tooltip
  var tip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  // Create links
  var link = svg.selectAll(".link")
    .data(force.links())
    .enter().append("line")
    .style("stroke-width", 3)
    .style("stroke", "#543005");

  // Add nodes
  var node = svg.selectAll(".node")
    .data(force.nodes())
    .enter().append("g")
    .attr("class", "node")
    .call(force.drag)
    .on("mouseover", function(d) {
      tip.transition()
        .duration(200)
        .style("opacity", 1);
      tip.html(d.name)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 30) + "px");
    })
    .on("mouseout", function(d) {
      tip.transition()
        .duration(500)
        .style("opacity", 0);
    });
  // Get image and set as pattern
  node.append("pattern")
    .attr("id", "image")
    .attr('patternUnits', 'userSpaceOnUse')
    .attr("x", function(d) {
      return -((d.weight * 1.6) + 5);
    })
    .attr("y", function(d) {
      return -((d.weight * 1.6) + 5);
    })
    .attr("width", function(d) {
      return ((d.weight * 1.6) + 5) * 2;
    })
    .attr("height", function(d) {
      return ((d.weight * 1.6) + 5) * 2;
    })
    .append("image")
    .attr("xlink:href", function(d) {
      return d.image;
    })
    .attr("width", function(d) {
      return ((d.weight * 1.6) + 5) * 2;
    })
    .attr("height", function(d) {
      return ((d.weight * 1.6) + 5) * 2;
    });
  // Add circle and image or color
  node.append("circle")
    .attr("r", function(d) {
      return ((d.weight * 1.6) + 5);
    })
    .style("fill", function(d) {
      return d.rank ? color(d3.max(d.rank)) : "url(#image)"; // Image or color
    });

  // Tick function
  function tick() {
    link.attr("x1", function(d) {
      return d.source.x;
    })
      .attr("y1", function(d) {
      return d.source.y;
    })
      .attr("x2", function(d) {
      return d.target.x;
    })
      .attr("y2", function(d) {
      return d.target.y;
    });
    node.attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";
    });
  }
});
