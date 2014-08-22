var express = require('express');
var router = express.Router();
var db = require('../models');

/* GET listagem das fotos */
router.get('/', function(req, res) {
  db.Foto.findAll().success(function(fotos) {
    res.render('listar', {
      fotos: fotos
    })
  });
});

/* GET Tela de adicionar uma nova foto */
router.get('/nova', function(req, res) {
  res.render('criar-editar', {
    editando : false
  });
});

module.exports = router;
