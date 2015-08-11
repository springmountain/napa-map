// Declare variables I want to be accessible from the console.
var svg, container, map, markers;

window.onload = function() {

  map = new OpenLayers.Map("vis");
  var mapnik = new OpenLayers.Layer.OSM();
  map.addLayer(mapnik);

  var lonlat = new OpenLayers.LonLat(-122.3472, 38.4001).transform(
    new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
    new OpenLayers.Projection("EPSG:900913") // to Spherical Mercator
  );

  var zoom = 11;

  markers = new OpenLayers.Layer.Markers( "Markers" );
  map.addLayer(markers);


  map.setCenter(lonlat, zoom);

  parseJSON();

};

function parseJSON(){
  queue()
    .defer(d3.json, "data/geojson/ava_Napa_County_qgis.json")
    .defer(d3.json, "data/geojson/Winery_public_qgis.json")
    .await(drawMap);
}

function drawMap(err, avas, wineries) {
  //results is an array of each of your csv results
  console.log(avas);
  console.log(wineries);

  var width = window.innerWidth;
  var height = window.innerHeight;

  var projection = d3.geo.mercator();
  var path = d3.geo.path()
    .projection(projection);

  // var zoom = d3.behavior.zoom()
  //   //.scaleExtent([ 0.05, 3 ])
  //   .on("zoom", zoomed);

  // svg = d3.select("#vis")
  //   .append("svg")
  //     .attr("class", "map")
  //     .attr("width", width)
  //     .attr("height", height)
  //     .attr("viewBox", "500 0 " + width*2 + " " + height*2)
  //     .attr("preserveAspectRatio", "xMidYMid meet")
  //     .call(zoom);
  
  // container = svg.append("g")
  //   .attr("id", "zoomGroup")

  /*
  *   Draw ava boundary lines
  */

  // container.selectAll(".ava").data(avas.features).enter()
  //   .append("path")
  //   .attr("class", function(d) { return "ava"; })
  //   .attr("title", function(d) { return d.properties.AVA_Name; })
  //   .attr("id", function(d) { return d.properties.AVA_Name.replace(/\s/g, ''); })
  //   .attr("d", path);

  /*
  *   Set viewbox of svg so that we can actually see the map.
  */

  // var groupBoundingBox = container.node().getBBox();
  // console.log( groupBoundingBox );

  // svg.attr("viewBox",
  //   groupBoundingBox.x + " "
  //   + groupBoundingBox.y + " "
  //   + groupBoundingBox.width + " "
  //   + groupBoundingBox.height
  // );

  /*
  *   Draw Ava Labels
  */

  // container.selectAll(".ava-label").data(avas.features).enter()
  //   .append("text")
  //   .attr("x", function(d) {
  //     var parentBBox = d3.select( "#" + d.properties.AVA_Name.replace(/\s/g, '') ).node().getBBox();
  //     //console.log( d );

  //     return parentBBox.x + parentBBox.width/2;
  //   })
  //   .attr("y", function(d) {
  //     var parentBBox = d3.select( "#" + d.properties.AVA_Name.replace(/\s/g, '') ).node().getBBox();

  //     return parentBBox.y + parentBBox.height/2;
  //   })
  //   .attr("font-size", 0.015)
  //   .text(function(d) { return d.properties.AVA_Name; });

  /*
  *   Draw winery locations
  */

  wineries.features.forEach(function(element, index){
    //console.log(element.geometry.coordinates);

    var lonlat = new OpenLayers.LonLat( element.geometry.coordinates[0], element.geometry.coordinates[1] ).transform(
      new OpenLayers.Projection("EPSG:4326"),
      new OpenLayers.Projection("EPSG:900913") );

    var winery = new OpenLayers.Marker( lonlat );
    winery.name = element.properties.Name;
    winery.events.register('mousedown', winery, function(e) {
      console.log(winery.name);
    });

    markers.addMarker( winery );
  });

  // container.selectAll(".winery").data(wineries.features).enter()
  //   .append("circle")
  //   .attr("class", function(d) { return "winery"; })
  //   .attr("title", function(d) { return d.properties.Name; })
  //   .attr("cx", function (d) { return projection(d.geometry.coordinates)[0]; })
  //   .attr("cy", function (d) { return projection(d.geometry.coordinates)[1]; })
  //   .attr("r", "0.005");

}

function zoomed() {
  container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}