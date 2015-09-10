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
      center: ol.proj.transform( [-122.3472, 38.4001], 'EPSG:4326', 'EPSG:900913'), //[-122.3472, 38.4001],
      zoom: 11
    })
  });

  var popup = new ol.Overlay({
    element: document.getElementById('winery-info')
  });

  map.addOverlay(popup);

  winerySelect.on('select', function(e) {

    if (e.selected.length > 0) {  // If a winery is selected during the interaction.

      // Get winery data for displaying in the popup.
      var wineryData = e.selected[0].getProperties();

      // Query google's custom search to get images/stuff.
      var wineryRequest = new XMLHttpRequest();
      wineryRequest.addEventListener('load', googleHandler);
      wineryRequest.open('GET', 'https://www.googleapis.com/customsearch/v1?key=AIzaSyCtH-7DOIQP9xEndlnJiICZr-8p7PxsgHw&cx=008567402695360145736:-ogjat11zvw&searchType=image&q=' + encodeURIComponent(wineryData.Name));
      wineryRequest.send();

      // Display the popup at the position the user clicked.
      popup.setPosition(e.mapBrowserEvent.coordinate);

      // Fill the popup with the winery data.
      var popupHTML = '<h3>' + toTitleCase(wineryData.Name) + '</h3>';
      popupHTML += '<h4>' + wineryData.AVA + '</h4>';
      popupHTML += '<h5>Est: ' + wineryData.Estab_date + '</h5>';

      popup.getElement().innerHTML = popupHTML;
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

  function googleHandler() {
    var response = JSON.parse(this.responseText);
    console.log(response);

    if (response.items.length > 0) {

      var thumbnailContainer = document.createElement('div');
      thumbnailContainer.className = 'thumbnail-container';

      response.items.forEach(function(element, index){

        var image = document.createElement('img');

        image.src = element.link;
        image.className = 'thumbnail';

        thumbnailContainer.appendChild(image);

        // popup.getElement().innerHTML += '<img class="thumbnail" src="' + element.link + '">';
    

      });

      popup.getElement().appendChild(thumbnailContainer);
    }
  }
};