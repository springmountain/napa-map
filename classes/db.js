/*
*	DB Class
*/

var pg = require('pg');

function connect(cb) {
	pg.connect(process.env.DATABASE_URL, cb);
}

exports.connect = connect;

exports.getWineries = function(cb) {
	connect(function(err, client) {
		if (err) throw err;
		client.query('SELECT * FROM wineries', function(err, res) {
			if (err) throw err;
			cb(res);
		});
	});
}