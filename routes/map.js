// routes/map.js

exports.view = function(req, res) {
	res.render('map', { layout: 'map.handlebars' });
};

exports.ajax = function(req, res) {
	res.render('map');
};