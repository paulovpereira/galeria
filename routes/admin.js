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

/* POST remover uma foto */
router.post('/remover/:id', function(req, res) {
  if(req.params.id) {
    //Recupera a foto a partir do paramêtro id
    db.Foto.find(req.params.id).success(function(foto) {
      var caminhoFoto = foto.caminho;
      //Delete no banco de dados
      foto.destroy().success(function() {
        //Remove o arquivo depois de remover o registro no banco
        fs.unlinkSync('./public/' + caminhoFoto);
        req.flash('success', 'Foto removida com sucesso.');
        res.redirect('/admin/');
      });
    });
  } else {
    res.send(400, 'Nenhum identificador de foto encontrado');
  }
});

/* GET Tela de adicionar uma nova foto */
router.get('/nova/', function(req, res) {
  res.render('criar', {
    editando : false
  });
});

/* POST Salvar uma nova foto */
router.post('/nova/save', function(req, res) {
  try {
    if(req.files && req.files.arquivo) {
      var relativePathImages = req.files.arquivo.path.split('public/')[1];
      db.Foto.create({
        caminho: relativePathImages,
        descricao: req.body.descricao || ''
      }).success(function() {
        req.flash('success', 'Foto salva com sucesso.');
        res.redirect('/admin/');
      }).error(function(error) {
        console.log(error);
        fs.unlinkSync(req.files.arquivo.path);
        throw error;
      });
    }
  } catch (err) {
    res.render('criar', {
      editando : false,
      erroArquivo: true
    });
  }
});

/* GET Tela de editar uma foto */
router.get('/editar/:id/', function(req, res) {
  if(req.params.id) {
    db.Foto.find(req.params.id).success(function(foto) {
      if(!foto) {
        req.flash('error', 'Foto não encontrada.');
        res.redirect('/admin/');
      }
      res.render('editar', {
        editando : true,
        foto: foto
      });
    });
  } else {
    res.send(400, 'Nenhum identificador de foto encontrado');
  }
});

/* POST Tela de editar uma foto */
router.post('/editar/:id/save', function(req, res) {
  var edicao = {descricao: req.body.descricao || ''},
      caminhoFotoOriginal;
  if(req.params.id) {
    db.Foto.find(req.params.id).success(function(foto) {
      if(!foto) {
        req.flash('error', 'Foto não encontrada.');
        res.redirect('/admin/');
      }
      caminhoFotoOriginal = './public/' + foto.caminho;
      if(req.files && req.files.arquivo) {
        edicao.caminho = req.files.arquivo.path.split('public/')[1];
      }
      foto.updateAttributes(edicao).success(function() {
        if(edicao.caminho) {
          fs.unlinkSync(caminhoFotoOriginal);
        }
        req.flash('success', 'Foto salva com sucesso.');
        res.redirect('/admin/');
      })
    });
  } else {
    res.send(400, 'Nenhum identificador de foto encontrado');
  }
});

module.exports = router;
