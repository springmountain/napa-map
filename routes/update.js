// routes/update.js

var pg = require('pg');
var fs = require('fs');
var csv = require('csv');
var geoJSON = require('../modules/geojson');

exports.merge = function(req, res) {
	// fs.readdir('./public/data/geojson', function(err, files) {
	// 	if (err) throw err;
	// 	// files = JSON.parse(files);
	// 	res.json(files);
	// });

	geoJSON.getWineries(function(wineries) {
		res.json(wineries);
	});

	// fs.readFile('./public/data/geojson/ava_Napa_County_qgis.json', 'utf-8', function(err, data) {
	// 	if (err) throw err;
	// 	var avas = JSON.parse(data);

	// 	res.json(avas);
	// 	// avas.features.forEach(function(element, index){
	// 	// 	console.log(element.properties.AVA_Name);

	// 	// 	client.query({
	// 	// 		text: 'INSERT into avas (name) VALUES ($1);',
	// 	// 		values: [
	// 	// 			element.properties.AVA_Name
	// 	// 		]
	// 	// 	}, function(err, result) {
	// 	// 		if (err) throw err;
	// 	// 		console.log('row inserted');
	// 	// 	});

	// 	// });
	// });
}

exports.recreate = function(req, res) {

	fs.readFile('import/wineries.sql', 'utf-8', function(err, data) {
		if (err) {
			res.sendStatus(500);
			throw err;
		}

		var sql = data.toString();

		pg.connect(process.env.DATABASE_URL, function(err, client) {
			if (err) {
				throw err;
				res.sendStatus(500);
			}

			// res.status(200).send(data);

			client.query(sql, function(err, result) {
				if (err) {
					res.sendStatus(500);
					throw err;
				}

				console.log(result.rows);

				res.status(200).send(result);
			});
		});
	});

};

exports.treasury = function(req, res) {

	// Update database with info from the treasury website
	// located here: http://www.ttb.gov/foia/xls/frl-wine-producers-and-blenders-ca-napa.htm

	pg.connect(process.env.DATABASE_URL, function(err, client) {
		if (err) {
			throw err;
			res.sendStatus(500);
		}

		client.query('DROP TABLE companies', function(err, result) {
			if (err) {
				throw err;
				res.sendStatus(500);
			}

			res.sendStatus(200);
			res.send(result);
		});

		// fs.readFile('import/wine_producers_treasury.csv', 'utf-8', function (err, data) {
		// 	if (err) throw err;

		// 	csv.parse(data, function(err, output) {
		// 		if (err) throw err;

		// 		client.query('DELETE FROM companies *', function(err, result) {
		// 			if (err) throw err;
		// 			console.log('companies table cleared.');

		// 			output.splice(0, 2);  // First two rows are unnecessary data
		// 			output.pop();         // Last row is unnecessary as well

		// 			output.forEach(function(row, index){
		// 				client.query({
		// 					text: 'INSERT INTO companies (name) VALUES ($1)',
		// 					values: [
		// 						row[1]
		// 					]
		// 				}, function (err, result) {
		// 					if (err) throw err;
		// 					console.log('row inserted');
		// 				});
		// 			});
		// 		});
		// 	});
		// });
	});
};