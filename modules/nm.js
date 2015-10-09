/*
*	GeoJSON Module
*/

var fs = require('fs');
var csv = require('csv');

exports.getWineries = function(cb) {
	fs.readFile('./public/data/geojson/Winery_public_qgis.json', 'utf-8', function(err, data) {
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

exports.getCompanies = function(cb) {
	fs.readFile('import/wine_producers_treasury.csv', 'utf-8', function (err, data) {
		if (err) throw err;

		csv.parse(data, function(err, output) {
			if (err) throw err;

			cb(output);

			// client.query('DELETE FROM companies *', function(err, result) {
			// 	if (err) throw err;
			// 	console.log('companies table cleared.');

			// 	output.splice(0, 2);  // First two rows are unnecessary data
			// 	output.pop();         // Last row is unnecessary as well

			// 	output.forEach(function(row, index){
			// 		client.query({
			// 			text: 'INSERT INTO companies (name) VALUES ($1)',
			// 			values: [
			// 			  row[1]
			// 			]
			// 		}, function (err, result) {
			// 			if (err) throw err;
			// 			console.log('row inserted');
			// 		})
			// 	});
			// });
		});
	});
};