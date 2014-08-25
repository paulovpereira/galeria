var express = require('express');
var router = express.Router();
var db = require('../models');

/* GET Tela com a galeria de fotos */
router.get('/', function(req, res) {
  db.Foto.findAll().success(function(fotos) {
    res.render('index', { fotos: fotos })
  });
});

module.exports = router;
