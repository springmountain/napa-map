var express = require('express');
var basicAuth = require('basic-auth-connect');
var exphbs = require('express-handlebars');
var DB = require('./modules/db');
var fs = require('fs');
var csv = require('csv');

// Get routes
var map = require('./routes/map');
var wineries = require('./routes/wineries');
var admin = require('./routes/admin');
var update = require('./routes/update');

var app = express();

// Setup basic authentication.
var auth = basicAuth('springmountain', '4Wonka20');

app.engine('handlebars', exphbs({ defaultLayout: 'map' }));
app.set('view engine', 'handlebars');

// Command for starting this server when developing locally:
// DATABASE_URL='postgres://wfcjrnefrcxlsd:jo6HwLfpc2z5pfEDYjt5ETXfd6@ec2-46-137-159-123.eu-west-1.compute.amazonaws.com:5432/ddmgd5v2j7sq3i?ssl=true' nodemon app.js

var appPort = process.env.PORT || 3000;
var server;
var avas;

DB.connect(function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres!');

  app.use(express.static('public'));

  // GET routes

  app.get('/', map.view);
  app.get('/map', map.ajax);
  app.get('/wineries', wineries.all);
  app.get('/wineries/id/:id', wineries.getId);
  app.get('/wineries/geojson', wineries.geojson);
  app.get('/admin', auth, admin.dashboard);
  app.get('/admin/database', auth, admin.database);
  app.get('/admin/database/wineries', auth, admin.wineries);
  app.get('/admin/settings', auth, admin.settings);

  // PUT routes

  app.put('/update/treasury', update.treasury);
  app.put('/update/recreate', update.recreate);
  app.put('/update/merge', update.merge);

  // Update database with info from the treasury website
  // located here: http://www.ttb.gov/foia/xls/frl-wine-producers-and-blenders-ca-napa.htm
  // app.put('/update/treasury', function(req, res) {
  //   res.sendStatus(200);
  //   fs.readFile('import/wine_producers_treasury.csv', 'utf-8', function (err, data) {
  //     if (err) throw err;

  //     csv.parse(data, function(err, output) {
  //       if (err) throw err;

  //       client.query('DELETE FROM companies *', function(err, result) {
  //         if (err) throw err;
  //         console.log('companies table cleared.');

  //         output.splice(0, 2);  // First two rows are unnecessary data
  //         output.pop();         // Last row is unnecessary as well

  //         output.forEach(function(row, index){
  //           client.query({
  //             text: 'INSERT INTO companies (name) VALUES ($1)',
  //             values: [
  //               row[1]
  //             ]
  //           }, function (err, result) {
  //             if (err) throw err;
  //             console.log('row inserted');
  //           })
  //         });
  //       });
  //     });
  //   });
  // });

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
