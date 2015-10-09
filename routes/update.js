// routes/update.js

var pg = require('pg');
var fs = require('fs');
var csv = require('csv');
var DB = require('../modules/db');
var nm = require('../modules/nm');

exports.merge = function(req, res) {

	var matches = [];
	var inserted = 0;

	DB.recreate(function(err, result) {
		if (err) throw err;

		nm.getWineries(function(wineries) {
			nm.getCompanies(function(companies) {
				
				wineries.forEach(function(winery, index){
					var wineryName = winery.properties.Name;
					var matched = false;
					
					// Attempting to match these two pieces of data together
					// by winery name and company name

					companies.forEach(function(company, index){
						if (!matched) {
							var operatingName = company[2];
							if (operatingName.length == 0) {
								operatingName = company[1];
							}
							var data = {
								permitNumber: company[0],
								ownerName: company[1],
								operatingName: operatingName,
								street: company[3],
								city: company[4],
								state: company[5],
								zip: company[6],
								zip4: company[7],
								county: company[8]
							};
							if (operatingName == wineryName) {
								// Match!
								// console.log(operatingName + ' = ' + wineryName);
								matches.push(data);

								// DB.addCompany(data, function(err, result) {
								// 	if (err) throw err;


								// });

								// var append = "INSERT INTO companies (permit_number, owner_name, operating_name, street, city, state, zip, zip4, county) VALUES ('" + data.permitNumber + "', '" + data.ownerName + "', '" + data.operatingName + "', '" + data.street + "', '" + data.city + "', '" + data.state + "', " + data.zip + ", " + data.zip4 + ", '" + data.county + "');\n";
								// console.log(append);
								// query += append;
								
								matched = true;
							}
						}
					});
				});

				console.log(matches.length);

				matches.forEach(function(data, index){
					DB.addCompany(data, function(err, result) {
						if (err) throw err;

						// Counts how many of the queries have been successful
						// and when all of them are inserted it renders the page.
						inserted++;
						console.log(inserted);
						if (inserted == matches.length) {
							res.render('admin/merge', { data: matches });
						}
					});
				});

				// Write to file so I can check the query if something goes wrong
				// fs.writeFile('companies.sql', query, function(err) {
					// if (err) throw err;

					// DB.connect(function(err, client) {
					// 	if (err) throw err;

					// 	client.query(query, function(err, result) {
					// 		if (err) throw err;

					// 		res.render('admin/merge', { data: matches });
					// 	});
					// });
				// });
			});
		});
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

	DB.recreate(function(err, result) {
		if (err) throw err;
		res.send(result);
	});

	// fs.readFile('import/recreate_tables.sql', 'utf-8', function(err, data) {
	// 	if (err) {
	// 		res.sendStatus(500);
	// 		throw err;
	// 	}

	// 	var sql = data.toString();

	// 	pg.connect(process.env.DATABASE_URL, function(err, client) {
	// 		if (err) {
	// 			throw err;
	// 			res.sendStatus(500);
	// 		}

	// 		// res.status(200).send(data);

	// 		client.query(sql, function(err, result) {
	// 			if (err) {
	// 				res.sendStatus(500);
	// 				throw err;
	// 			}

	// 			console.log(result.rows);

	// 			res.status(200).send(result);
	// 		});
	// 	});
	// });

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