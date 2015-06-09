window.onload = function() {
  // var width = this.innerWidth;
  // var height = this.innerHeight;

  var width = 2400;
  var height = 3200;

  var zoom = d3.behavior.zoom()
    .scaleExtent([ 0.1, 3 ])
    .on("zoom", zoomed);

  var svg = d3.select("#vis")
    .append("svg")
      .attr("class", "map")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", "1000 0 1010 1800")
      .attr("preserveAspectRatio", "xMidYMid meet")
      .call(zoom);
  
  var container = svg.append("g")
    .attr("id", "zoomGroup")

    d3.json("data/topojson/out.json", function(error, land) {

      if (error) return console.error(error);

      console.log(topojson.feature(land, land.objects.ava_Napa_County).features);

      container.selectAll(".county")
          .data(topojson.feature(land, land.objects.ava_Napa_County).features)
        .enter().append("path")
          .attr("class", function(d) { return "county" })
          .attr("d", d3.geo.path().projection(null));
    });

    function zoomed() {
      console.log('zoomay');
      container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
      // document.querySelector(".county").style.transform = "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")";
    }

    // this.addEventListener('mousewheel', function(e) {
    //   e.preventDefault();

    //   var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    //   var scaleMin = 0.02;
    //   var scaleMax = 1.5;
    //   var scrollMod = 150;

    //   if ( ( delta < 0 && game.level.scale.x > scaleMin ) || ( delta > 0 && game.level.scale.x < scaleMax ) ) {
    //     game.level.scale.x += delta / scrollMod;
    //     game.level.scale.y += delta / scrollMod;
    //   }

    //   map.style.transform()
    // });

    // map.style.transform = "scale(1.2, 1.2)";
};