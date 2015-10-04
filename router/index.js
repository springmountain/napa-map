// router/index.js

module.exports = function (app) {
	app.use('/wineries', require('./routes/wineries'));
};