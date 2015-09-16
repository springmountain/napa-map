var express = require('express');
var app = express();
var pg = require('pg');
var fs = require('fs');

// Command for starting this server when developing locally:
// DATABASE_URL='postgres://fegxpzgfqwblvy:fNq0zttbidW3D8mQXOletWV7f7@ec2-46-137-159-123.eu-west-1.compute.amazonaws.com:5432/ddmgd5v2j7sq3i?ssl=true' node index.js

var appPort = process.env.PORT || 3000;
var server;

pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres!');

  app.use(express.static('public'));

  server = app.listen(appPort, function() {
  	
  	var host = server.address().address;
  	var port = server.address().port;

  	console.log('Example app listening at http://%s:%s', host, port);

  	/*
  	*
  	*	This reads the GeoJSON files at startup and checks each entry
  	*	against the respective DB table, and if there are differences between
  	*	the two, it updates the DB to reflect the GeoJSON file.
  	*
  	*/

  	// WARNING: This should only be run once! If the AVA's are in the DB 
  	// don't uncomment this!
  	//
  	// Looks like we need to read the Ava GeoJSON file first because it contains
  	// a foreign key (the ava id)

  	// fs.readFile('public/data/geojson/ava_Napa_County_qgis.json', 'utf-8', function(err, data) {
  	// 	if (err) throw err;
  	// 	var avas = JSON.parse(data);
  	// 	avas.features.forEach(function(element, index){
  	// 		console.log(element.properties.AVA_Name);

  	// 		client.query({
  	// 			text: 'INSERT into avas (name) VALUES ($1);',
  	// 			values: [
  	// 				element.properties.AVA_Name
  	// 			]
  	// 		}, function(err, result) {
  	// 			if (err) throw err;
  	// 			console.log('row inserted');
  	// 		});

  	// 	});
  	// });

	

  	// client.query({
  	// 	text: 'INSERT into avas (name) VALUES ($1);',
  	// 	values: [
  	// 		'Test AVA'
  	// 	]
  	// }, function(err, result) {
  	// 	if (err) throw err;
  	// 	console.log('row inserted');
  	// 	console.log()
  	// });

  	// client.query({
  	// 	text: 'INSERT into wineries (id, name, est, logo, ava) VALUES ($1, $2, $3, NULL, $4);',
  	// 	values: [
  	// 		3141,
  	// 		"Test Winery",
  	// 		"05/02/15",
  	// 		5
  	// 	]
  	// }, function(err, result) {
  	// 	if (err) throw err;
  	// 	console.log('row inserted with id: %d', result.row[0].id);
  	// });

  	// fs.readFile('public/data/geojson/Winery_public_qgis.json', 'utf-8', function (err, data) {
  	// 	if (err) throw err;
  	// 	var wineries = JSON.parse(data);
  	// 	wineries.features.forEach(function(winery, index){
  	// 		// console.log(winery.properties.id);
  			
  	// 		client.query({
  	// 			text: 'SELECT * FROM wineries WHERE id = $1',
  	// 			values: [winery.properties.id]
  	// 		}, function(err, result) {
  	// 			if (err) throw err;
  	// 			// console.log('Row Count: %d', result.rows.length);
  	// 			if (result.rows.length == 0) {
  	// 				console.log('attempting insert of this data: %d, %s, %s, %s', winery.properties.id, winery.properties.Name, winery.properties.Estab_date, winery.properties.AVA);
  	// 				client.query({
  	// 					text: 'INSERT into wineries (id, name, est, logo, ava) VALUES ($1, $2, $3, NULL, $4);',
  	// 					values: [
  	// 						winery.properties.id,
  	// 						winery.properties.Name,
  	// 						winery.properties.Estab_date,
  	// 						winery.properties.AVA
  	// 					]
  	// 				}, function(err, result) {
  	// 					if (err) throw err;
  	// 					console.log('row inserted with id: %d', result.row[0].id);
  	// 				});
  	// 			}
  	// 		});
  	// 	});
  	// });

  });
});
