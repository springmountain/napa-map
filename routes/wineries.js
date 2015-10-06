// routes/wineries.js

var pg = require('pg');

exports.all = function(req, res) {
	pg.connect(process.env.DATABASE_URL, function(err, client) {
		if (err) throw err;
		client.query('SELECT * from wineries', function(err, result) {
	      if (err) throw err;
	      res.json(result.rows);
	    });
	});
};

exports.getId = function(req, res) {
	pg.connect(process.env.DATABASE_URL, function(err, client) {
		if (err) throw err;
		client.query('SELECT * from wineries where id = ' + req.params.id, function(err, result) {
			if (err) throw err;
			res.json(result.rows);
		});
	});	
};