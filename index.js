var express = require('express');
var app = express();
var pg = require('pg');
var fs = require('fs');

// Command for starting this server when developing locally:
// DATABASE_URL='postgres://fegxpzgfqwblvy:fNq0zttbidW3D8mQXOletWV7f7@ec2-46-137-159-123.eu-west-1.compute.amazonaws.com:5432/ddmgd5v2j7sq3i?ssl=true' nodemon index.js

var appPort = process.env.PORT || 3000;
var server;
var avas;

pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres!');

  app.use(express.static('public'));

  server = app.listen(appPort, function() {
  	
  	var host = server.address().address;
  	var port = server.address().port;

  	console.log('Example app listening at http://%s:%s', host, port);


    


    // SERIOUSLY, LEAVE THE STUFF BELOW THIS ALONE UNLESS YOU KNOW WHAT YOU'RE DOING.

    /*
    *
    * The code below is for importing wineries from the geoJSON file
    * into the postgres db. Doesn't need to be run again unless updating
    * the data.
    *
    */

    // client.query('SELECT * FROM avas', function(err, result) {
    //   if (err) throw err;
    //   if (result.rows.length > 0) {
    //     avasLoaded(result.rows);
    //   }
    // });

    // function avasLoaded(avas) {

    //   // console.log(avas);

    //   fs.readFile('public/data/geojson/Winery_public_qgis.json', 'utf-8', function (err, data) {
    //     if (err) throw err;

    //     var wineries = JSON.parse(data);
    //     var wineryIds = [];

    //     console.log('%d wineries found', wineries.features.length);

    //     wineries.features.forEach(function(winery, index) {

    //       var avaId = null;

    //       avas.forEach(function(ava, index){
    //         if (avaId === null) {
    //           if (ava.name == winery.properties.AVA) {
    //             // console.log('%s == %s', ava.name, winery.properties.AVA);
    //             avaId = ava.id;
    //           }
    //         }
    //       });

    //       if (avaId === null) {
    //         // console.log('no match found for %s', winery.properties.AVA);
    //       }
          
    //       client.query('SELECT * FROM wineries WHERE id = ' + winery.properties.id, function(err, result) {
    //         if (result.rowCount == 0) {
    //           console.log('%s not found, inserting data', winery.properties.Name);
    //           // console.log(winery);
    //           client.query({
    //             text: 'INSERT into wineries (id, name, est, ava) VALUES ($1, $2, $3, $4)',
    //             values: [winery.properties.id, winery.properties.Name, winery.properties.Estab_date, avaId]
    //           }, function(err, result) {
    //             if (err) throw err;
    //             console.log('row inserted ' + index);
    //           });
    //         }
    //       });
    //     });
    //   });
    // }


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
  });
});
