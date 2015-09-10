var express = require('express');
var app = express();
var pg = require('pg');

// Command for starting this server when developing locally:
// DATABASE_URL='postgres://fegxpzgfqwblvy:fNq0zttbidW3D8mQXOletWV7f7@ec2-46-137-159-123.eu-west-1.compute.amazonaws.com:5432/ddmgd5v2j7sq3i?ssl=true' node index.js

console.log(process.env.DATABASE_URL);

pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT table_schema,table_name FROM information_schema.tables;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});

app.use(express.static('public'));

var appPort = process.env.PORT || 3000;

var server = app.listen(appPort, function() {
	
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);

});