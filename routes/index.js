var express = require('express');
var router = express.Router();
var db = require('../models');

/* GET gallery page */
router.get('/', function(req, res) {
  db.Foto.findAll().success(function(fotos) {
    res.render('index', {
      fotos: fotos
    })
  });
});

module.exports = router;
