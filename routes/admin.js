// routes/admin.js

var DB = require('../classes/db');

exports.dashboard = function(req, res) {
	if (req.query.ajax == 'true') {
		res.render('admin/dashboard');
	}
	else {
		res.render('admin/dashboard', { layout: 'adminLayout.handlebars' });
	}
};

exports.database = function(req, res) {
	if (req.query.ajax == 'true') {
		res.render('admin/database');
	}
	else {
		res.render('admin/database', { layout: 'adminLayout.handlebars' });
	}
};

exports.wineries = function(req, res) {
	DB.getWineries(function(wineries) {

		var layout = '';

		if (req.query.ajax != 'true') {
			layout = 'adminLayout.handlebars'
		}

		var data = {
			wineries: wineries.rows,
			layout: layout
		};

		res.render('admin/wineries', data);
	});
};

exports.settings = function(req, res) {
	if (req.query.ajax == 'true') {
		res.render('admin/settings');
	}
	else {
		res.render('admin/settings', { layout: 'adminLayout.handlebars' });
	}
};