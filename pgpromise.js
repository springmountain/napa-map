// pg-promise test

var nm = require('./modules/nm');

var options = {
	connect: function(client) {
		var cp = client.connectionParameters;
		console.log("Connected to database '" + cp.database + "'");
	}
};

var pgp = require('pg-promise')(options);

// var cn = "postgres://wfcjrnefrcxlsd:jo6HwLfpc2z5pfEDYjt5ETXfd6@ec2-46-137-159-123.eu-west-1.compute.amazonaws.com:5432/ddmgd5v2j7sq3i?ssl=true";
var cn = {
	host: 'ec2-46-137-159-123.eu-west-1.compute.amazonaws.com',
	port: 5432,
	database: 'ddmgd5v2j7sq3i',
	user: 'wfcjrnefrcxlsd',
	password: 'jo6HwLfpc2z5pfEDYjt5ETXfd6',
	ssl: true
};


var db = pgp(cn);

nm.getWineries(function(wineries) {
	nm.getCompanies(function(companies) {

		companies.splice(0, 2);
		companies.pop();

		function factory(idx, t) {
			if (idx < companies.length) {
				// console.log(companies[idx][0]);
				return this.none(
					'insert into companies (permit_number, owner_name, operating_name, street, city, state, zip, zip4, county) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
					[
						companies[idx][0],
						companies[idx][1],
						companies[idx][2],
						companies[idx][3],
						companies[idx][4],
						companies[idx][5],
						companies[idx][6],
						companies[idx][7],
						companies[idx][8]
					]
				);
			}
		}

		db.tx(function(t) {
			// t = this;
			return this.sequence(factory);
		})
			.then(function(data) {
				console.log('all input!');
			}, function(reason) {
				console.log(reason);
			});

	});
});

// function factory(idx, t) {
// 	// t = this;

// 	if (idx < 2) {
		
// 	}

// }

// db.query("select * from companies")
//     .then(function (data) {
//         console.log(data); // print data;
//     }, function (reason) {
//         console.log(reason); // print error;
//     });

