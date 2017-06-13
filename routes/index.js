var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/my_database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '我的网站' });
});

module.exports = router;
