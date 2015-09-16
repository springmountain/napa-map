var fs = require('fs');

fs.readFile('public/data/geojson/Winery_public_qgis.json', 'utf-8', function(err, data) {
	if (err) throw err;

	var wineries = JSON.parse(data);

	var nProperties = Object.size(wineries.features[0].properties);
	var n = 1;
	var ch;
	for (var p in wineries.features[0].properties) {

		if (n < nProperties) {
			ch = p + ', ';
		}
		else {
			ch = p + "\n";
		}

		fs.appendFileSync('wineries.csv', ch, 'utf8');
		n++;
	}

	wineries.features.forEach(function(winery, index){

		n = 1;

		for (var p in winery.properties) {
			if (winery.properties.hasOwnProperty(p)) {
				if (n < nProperties) {
					ch = winery.properties[p] + ', ';
				}
				else {
					ch = winery.properties[p] + "\n";
				}

				fs.appendFileSync('wineries.csv', ch, 'utf8');
				n++;
			}
		}
	});
});

Object.size = function(obj) {
	var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++;
	}
	return size;
}