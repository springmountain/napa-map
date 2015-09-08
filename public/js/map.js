// Declare variables I want to be accessible from the console.
var svg, container, map, markers;

window.onload = function() {

  var osmLayer = new ol.layer.Tile({
    source: new ol.source.OSM()
  });

  var avaLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      url: 'data/geojson/ava_Napa_County_qgis.json',
      format: new ol.format.GeoJSON()
    })
  });

  var wineryLayer = new ol.layer.Vector({
    title: 'Wineries',
    source: new ol.source.Vector({
      url: 'data/geojson/Winery_public_qgis.json',
      format: new ol.format.GeoJSON()
    })
  });

  var winerySelect = new ol.interaction.Select({
    style: new ol.style.Style({
      image: new ol.style.Circle({
        radius: 5,
        fill: new ol.style.Fill({
          color: '#FF0000'
        }),
        stroke: new ol.style.Stroke({
          color: '#000000'
        })
      })
    })
  });

  map = new ol.Map({
    interactions: ol.interaction.defaults().extend([ winerySelect ]),
    layers: [
      osmLayer,
      avaLayer,
      wineryLayer
    ],
    target: 'vis',
    view: new ol.View({
      //projection: 'EPSG:4326',
      center: ol.proj.transform( [-122.3472, 38.4001], 'EPSG:4326', 'EPSG:900913'), //[-122.3472, 38.4001],
      zoom: 11
    })
  });

  var popup = new ol.Overlay({
    element: document.getElementById('winery-info')
  });

  // popup.setPosition(coordinate);
  map.addOverlay(popup);

  winerySelect.on('select', function(e) {

    //console.log(e);

    if (e.selected.length > 0) {
      // If a winery is selected during the interaction.
      popup.setPosition(e.mapBrowserEvent.coordinate);

      // Get winery data for displaying in the popup.
      var wineryData = e.selected[0].getProperties();

      console.log(wineryData);

      // Fill the popup with the winery data.
      popup.getElement().innerHTML = toTitleCase(wineryData.Name);
    }
    else {
      // Hide popup if something is not selected during the interaction.
      popup.setPosition();
    }
  });

  // handle capitalizing the first letter of each word in a string.
  function toTitleCase(str) {
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
};