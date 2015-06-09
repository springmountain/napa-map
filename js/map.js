window.onload = function() {
  var width = this.innerWidth;
  var height = this.innerHeight;

  var svg = d3.select("#vis")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

    d3.json("data/topojson/out.json", function(error, land) {

    if (error) return console.error(error);

    svg.append("path")
      .datum(topojson.feature(land, land.objects.ava_Napa_County))
      .attr("d", d3.geo.path().projection(null));
  });
};