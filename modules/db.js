/*
*	DB Module
*/

var fs = require('fs');
var pg = require('pg');

function connect(cb) {
	pg.connect(process.env.DATABASE_URL, cb);
}

exports.connect = connect;

function recreate(cb) {
	fs.readFile('import/recreate_tables.sql', 'utf-8', function(err, data) {
		if (err) {
			cb(err);
		}

		var sql = data.toString();

		connect(function(err, client) {
			if (err) {
				cb(err);
			}

			// res.status(200).send(data);

			client.query(sql, function(err, result) {
				// if (err) {
				// 	res.sendStatus(500);
				// 	throw err;
				// }

				console.log(result.rows);

				cb(err, result);

				// res.status(200).send(result);
			});
		});
	});
};

exports.recreate = recreate;

exports.addCompany = function(company, cb) {
	connect(function(err, client, done) {
		if (err) throw err;
		client.query({
			text: 'INSERT INTO companies (permit_number, owner_name, operating_name, street, city, state, zip, zip4, county) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
			values: [
				company.permitNumber,
				company.ownerName,
				company.operatingName,
				company.street,
				company.city,
				company.state,
				company.zip,
				company.zip4,
				company.county
			]
		}, function() {
			done();		// Release Client back to pool.
			cb();
		});
	});
};

exports.getWineries = function(cb) {
	connect(function(err, client) {
		if (err) throw err;
		client.query('SELECT * FROM wineries', function(err, res) {
			if (err) throw err;
			cb(res);
		});
	});
}

exports.getWinery = function(id, cb) {
	connect(function(err, client) {
		if (err) throw err;
		client.query('SELECT * FROM wineries where id = ' + id, function(err, res) {
			if (err) throw err;
			cb(res);
		});
	});
};

exports.prepare = function(string) {
	return string.replace("'", "\'");
}