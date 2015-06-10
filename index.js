var express = require('express');
var app = express();

app.use(express.static('public'));

var appPort = process.env.PORT || 3000;

var server = app.listen(appPort, function() {
	
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);

});