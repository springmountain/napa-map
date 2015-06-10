window.onload = function() {
  // var width = 2400;
  // var height = 3200;

  var width = window.innerWidth;
  var height = window.innerHeight;

  var zoom = d3.behavior.zoom()
    .scaleExtent([ 0.1, 3 ])
    .on("zoom", zoomed);

  var svg = d3.select("#vis")
    .append("svg")
      .attr("class", "map")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", "500 0 " + width*2 + " " + height*2)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .call(zoom);
  
  var container = svg.append("g")
    .attr("id", "zoomGroup")

    d3.json("data/topojson/out.json", function(error, land) {

      if (error) return console.error(error);

      container.selectAll(".county")
          .data(topojson.feature(land, land.objects.ava_Napa_County).features)
        .enter().append("path")
          .attr("class", function(d) { return "county" })
          .attr("d", d3.geo.path().projection(null));

      console.log(container.node().getBBox());

      var groupBoundingBox = container.node().getBBox();

      svg.attr("viewBox",
        groupBoundingBox.x + " "
        + groupBoundingBox.y + " "
        + groupBoundingBox.width + " "
        + groupBoundingBox.height
      );
    });

    function zoomed() {
      container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    }
};