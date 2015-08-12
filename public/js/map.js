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

  map = new ol.Map({
    interactions: ol.interaction.defaults().extend([
      new ol.interaction.Select({
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
      })
    ]),
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
};

