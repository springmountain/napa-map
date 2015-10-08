/*
*	GeoJSON Module
*/

var fs = require('fs');

exports.getWineries = function(cb) {
	fs.readFile('./public/data/geojson/ava_Napa_County_qgis.json', 'utf-8', function(err, data) {
		if (err) throw err;
		var avas = JSON.parse(data);

		cb(avas.features);
		// avas.features.forEach(function(element, index){
		// 	console.log(element.properties.AVA_Name);

		// 	client.query({
		// 		text: 'INSERT into avas (name) VALUES ($1);',
		// 		values: [
		// 			element.properties.AVA_Name
		// 		]
		// 	}, function(err, result) {
		// 		if (err) throw err;
		// 		console.log('row inserted');
		// 	});

		// });
	});
};