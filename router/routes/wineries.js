// router/routes/wineries.js

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	client.query('SELECT * from wineries', function(err, result) {
      if (err) throw err;
      res.json(result.rows);
    });
});

router.get('/:id', function(req, res) {
  client.query('SELECT * from wineries where id = ' + req.params.id, function(err, result) {
    if (err) throw err;
    res.json(result.rows);
  });
});

module.exports = router;