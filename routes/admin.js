// routes/admin.js

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