var express = require('express');
var router = express.Router();
var db = require('../models');
var fs = require('fs');

/* GET listagem das fotos */
router.get('/', function(req, res) {
  db.Foto.findAll().success(function(fotos) {
    res.render('listar', {
      fotos: fotos
    })
  });
});

/* GET Tela de adicionar uma nova foto */
router.get('/nova/', function(req, res) {
  res.render('criar-editar', {
    editando : false
  });
});

function moverArquivoFoto(foto) {
  // get the temporary location of the file
  var tmp_path = foto.path;
  // set where the file should actually exists - in this case it is in the "images" directory
  var target_path = './public/images/fotos/' + foto.name;
  // move the file from the temporary location to the intended location
  fs.rename(tmp_path, target_path, function(err) {
    if (err) throw err;
    // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
    fs.unlink(tmp_path);
  });
}

/* POST Salvar uma nova foto */
router.post('/nova/save', function(req, res) {
  try {
    if(req.files && req.files.arquivo) {
      var relativePathImages = req.files.arquivo.path.split('public/')[1];
      db.Foto.create({
        caminho: relativePathImages,
        descricao: req.body.descricao || ''
      }).success(function() {
        res.redirect('/admin/');
      }).error(function(error) {
        console.log(error);
        fs.unlinkSync(req.files.arquivo.path);
        throw error;
      });
    }
  } catch (err) {
    console.log(err);
    res.render('criar-editar', {
      editando : false,
      erroArquivo: true
    });
  }

});

module.exports = router;
