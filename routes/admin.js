var express = require('express');
var router = express.Router();
var db = require('../models');
var fs = require('fs');

/* GET listagem das fotos */
router.get('/', function(req, res) {
  db.Foto.findAll().success(function(fotos) {
    res.render('listar', { fotos: fotos })
  });
});

function removerArquivoDisco(caminho) {
  try {
    fs.unlinkSync(caminho);
  } catch (err) {
    console.log(err);
  }
}

/* POST remover uma foto */
router.post('/remover/:id', function(req, res) {
  if(req.params.id) {
    //Recupera a foto a partir do paramêtro id
    db.Foto.find(req.params.id).success(function(foto) {
      if(!foto) {
        req.flash('error', 'Foto não encontrada.');
        res.redirect('/admin/');
        return;
      }
      var caminhoFoto = foto.caminho;
      //Delete no banco de dados
      foto.destroy().success(function() {
        //Remove o arquivo depois de remover o registro no banco
        removerArquivoDisco('./public/' + caminhoFoto);
        req.flash('success', 'Foto removida com sucesso.');
        res.redirect('/admin/');
      });
    });
  } else {
    res.status(400).send('Nenhum identificador de foto encontrado');
  }
});

/* GET Tela de adicionar uma nova foto */
router.get('/nova/', function(req, res) {
  res.render('criar');
});

/* POST Salvar uma nova foto */
router.post('/nova/save', function(req, res) {
  if(req.files && req.files.arquivo) {
    var caminhoRelativoImagem = req.files.arquivo.path.split('public/')[1];
    db.Foto.create({
      caminho: caminhoRelativoImagem,
      descricao: req.body.descricao || ''
    }).success(function() {
      req.flash('success', 'Foto salva com sucesso.');
      res.redirect('/admin/');
    }).error(function(error) {
      console.log(error);
      removerArquivoDisco(req.files.arquivo.path);
      res.status(500).send(error);
    });
  } else {
    res.status(400).send('Nenhum arquivo de foto encontrado');
  }
});

/* GET Tela de editar uma foto */
router.get('/editar/:id/', function(req, res) {
  if(req.params.id) {
    db.Foto.find(req.params.id).success(function(foto) {
      if(!foto) {
        req.flash('error', 'Foto não encontrada.');
        res.redirect('/admin/');
        return;
      }
      res.render('editar', { foto: foto });
    });
  } else {
    res.status(400).send('Nenhum identificador de foto encontrado');
  }
});

/* POST Salvar edição de uma foto */
router.post('/editar/:id/save', function(req, res) {
  var edicao = {descricao: req.body.descricao || ''},
      caminhoFotoOriginal;
  if(req.params.id) {
    db.Foto.find(req.params.id).success(function(foto) {
      if(!foto) {
        req.flash('error', 'Foto não encontrada.');
        res.redirect('/admin/');
        return;
      }
      caminhoFotoOriginal = './public/' + foto.caminho;
      //Atualiza o caminho da foto somente se foi realizado um novo upload de arquivo
      if(req.files && req.files.arquivo) {
        edicao.caminho = req.files.arquivo.path.split('public/')[1];
      }
      foto.updateAttributes(edicao).success(function() {
        //Caso tenha sido escolhido outro arquivo, remove o anterior
        if(edicao.caminho) {
          removerArquivoDisco(caminhoFotoOriginal);
        }
        req.flash('success', 'Foto salva com sucesso.');
        res.redirect('/admin/');
      })
    });
  } else {
    res.status(400).send('Nenhum identificador de foto encontrado');
  }
});

module.exports = router;
