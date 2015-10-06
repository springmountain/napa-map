// routes/admin.js

exports.page = function(req, res) {
	res.render('admin', { layout: 'adminLayout.handlebars' });
};