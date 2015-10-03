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

      if (typeof wineryData.AVA != 'undefined') {
        // Query napa maps api
        var napaMapsReqeust = new XMLHttpRequest();
        napaMapsReqeust.addEventListener('load', function() {
          var wineryInfo = JSON.parse(this.responseText);
          console.log(wineryInfo);
        });
        napaMapsReqeust.open('GET', '/wineries/' + wineryData.id);
        napaMapsReqeust.send();

        // Query google's custom search to get images/stuff.
        var wineryRequest = new XMLHttpRequest();
        wineryRequest.addEventListener('load', googleHandler);
        wineryRequest.open('GET', 'https://www.googleapis.com/customsearch/v1?key=AIzaSyCtH-7DOIQP9xEndlnJiICZr-8p7PxsgHw&cx=008567402695360145736:-ogjat11zvw&searchType=image&q=' + encodeURIComponent(wineryData.Name));
        //wineryRequest.send();

        // Display the popup at the position the user clicked.
        popup.setPosition(e.mapBrowserEvent.coordinate);

        // Animation classes
        // -----------------
        // This timeout is required because Openlayers makes the state change
        // using the "display" property, which cannot be animated using css
        // animations. I know it's hacky, but right now it's the best solution.
        setTimeout(function() {
          popup.getElement().classList.add('open');
        }, 5);
        

        // Fill the popup with the winery data.
        var popupHTML = '<h3>' + toTitleCase(wineryData.Name) + '</h3>';
        popupHTML += '<h4>' + wineryData.AVA + '</h4>';
        popupHTML += '<h5>Est: ' + wineryData.Estab_date + '</h5>';
        popupHTML += '<div class="winery-edit"><a href="javascript:void(0)" id="winery-edit">Edit</a></div>';
        popupHTML += '<div id="winery-edit-form" class="hidden winery-edit-form">' +
            '<form method="post">' +
              '<label for="companyList">Company</label>' +
              '<select>' +
                '<option>Constellation Brands</option>' +
                '<option>Other Company</option>' +
              '</select>' +
              '<button type="submit">Update</button>'
            '</form>' +
          '</div>';

        popup.getElement().innerHTML = popupHTML;

        var wineryEdit = document.getElementById('winery-edit');
        
        wineryEdit.addEventListener('click', function() {
          var wineryEditForm = document.getElementById('winery-edit-form');
          if (wineryEditForm.classList.contains('hidden')) {
            this.innerHTML = 'Close';
            wineryEditForm.classList.remove('hidden');
          }
          else {
            this.innerHTML = 'Edit';
            wineryEditForm.classList.add('hidden');
          }
        });
      }
      else {
        // Hide popup if something is not selected during the interaction.
        popup.getElement().classList.remove('open');

        // This timeout waits for the .open class removal animation to
        // complete before .setPosition() can change the popup's 
        // display property, which messes up the animation.
        setTimeout(function() {
          popup.setPosition();
        }, 500);
      }
    }
    else {
      // Hide popup if something is not selected during the interaction.
      popup.getElement().classList.remove('open');

      // This timeout waits for the .open class removal animation to
      // complete before .setPosition() can change the popup's 
      // display property, which messes up the animation.
      setTimeout(function() {
        popup.setPosition();
      }, 500);
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

        var thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail';

        var image = document.createElement('img');
        image.src = element.link;

        thumbnail.appendChild(image);
        thumbnailContainer.appendChild(thumbnail);

      });

      popup.getElement().appendChild(thumbnailContainer);
    }
  }
};