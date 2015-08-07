// Declare variables I want to be accessible from the console.
var svg;

window.onload = function() {
  // var width = 2400;
  // var height = 3200;

  var width = window.innerWidth;
  var height = window.innerHeight;

  var projection = d3.geo.mercator();
  var path = d3.geo.path()
    .projection(projection);

  var zoom = d3.behavior.zoom()
    // .scaleExtent([ 0.05, 3 ])
    .on("zoom", zoomed);

  svg = d3.select("#vis")
    .append("svg")
      .attr("class", "map")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", "500 0 " + width*2 + " " + height*2)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .call(zoom);
  
  var container = svg.append("g")
    .attr("id", "zoomGroup")

    d3.json("data/geojson/ava_Napa_County_qgis.json", function(error, land) {

      if (error) return console.error(error);

      var avas = container.selectAll(".ava").data(land.features).enter();

      avas.append("path")
        .attr("class", function(d) { return "ava"; })
        .attr("title", function(d) { return d.properties.AVA_Name; })
        .attr("id", function(d) { return d.properties.AVA_Name.replace(/\s/g, ''); })
        .attr("d", path);

      d3.json("data/geojson/Winery_locations_qgis.json", function(error, wineries) {

        if (error) return console.error(error);

        container.selectAll(".winery")
            .data(wineries.features)
          .enter().append("circle")
            .attr("class", function(d) { return "winery"; })
            //.attr("d", d3.geo.path());
            .attr("cx", function (d) { return projection(d.geometry.coordinates)[0]; })
            .attr("cy", function (d) { return projection(d.geometry.coordinates)[1]; })
            .attr("r", "0.005");

      });

      avas.append("text")
        .attr("x", function(d) {
          var parentBBox = d3.select( "#" + d.properties.AVA_Name.replace(/\s/g, '') ).node().getBBox();
          console.log( d );

          return parentBBox.x + parentBBox.width/2;
        })
        .attr("y", function(d) {
          var parentBBox = d3.select( "#" + d.properties.AVA_Name.replace(/\s/g, '') ).node().getBBox();

          return parentBBox.y + parentBBox.height/2;
        })
        .attr("font-size", 0.015)
        .text(function(d) { return d.properties.AVA_Name; });

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