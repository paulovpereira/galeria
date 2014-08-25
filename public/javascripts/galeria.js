
$(document).ready(function () {
  var timeoutRunning = 0;
  var LARGURA_BOTOES_NAV = 200,
      larguraMaximoGaleria,
      fotoSelecionada = 0,
      numeroFotos;

  function recalcularTamanhos () {
    var galeria = $('.gallery-wrapper'),
        wrapperGaleria = $('.photos-wrapper-outer'),
        wrapperFotos = $('.photos-wrapper'),
        fotos = $('.photo-wrapper'),
        alturaMaximaGaleria = galeria.height();

    numeroFotos = fotos.length;
    larguraMaximoGaleria = galeria.width() - LARGURA_BOTOES_NAV;

    var larguraWrapperFotos = larguraMaximoGaleria * numeroFotos;
    wrapperFotos.css('width', larguraWrapperFotos);
    wrapperFotos.css('height', alturaMaximaGaleria);
    wrapperFotos.css('transition', '');
    navegarFotoSelecionada();
    wrapperFotos.css('transition', 'left 500ms ease-in');

    wrapperGaleria.css('width', larguraMaximoGaleria);
    wrapperGaleria.css('height', alturaMaximaGaleria);

    fotos.css('width', larguraMaximoGaleria);
    fotos.css('height', alturaMaximaGaleria);
    fotos.find('img').each(function () {
      var imagem = $(this),
          copiaImagem = new Image();
      copiaImagem.src = imagem.attr("src");
      copiaImagem.onload = function() {
        var proporcaoAltura =  alturaMaximaGaleria / this.height,
          proporcaoLargura = larguraMaximoGaleria / this.width,
          proporcaoFinal = Math.min(proporcaoAltura, proporcaoLargura);
        imagem.css('width', proporcaoFinal * this.width);
        imagem.css('height', proporcaoFinal * this.height);
      };
    });
  }

  function navegarFotoSelecionada() {
    var wrapperFotos = $('.photos-wrapper');
    wrapperFotos.css('left', -(fotoSelecionada * larguraMaximoGaleria));
  }

  function desabilitarNavEsquerda() {
    if(fotoSelecionada === 0) {
      $('#nav-esq').addClass('desabilitado');
    }
  }

  function desabilitarNavDireita() {
    if (fotoSelecionada === numeroFotos - 1) {
      $('#nav-dir').addClass('desabilitado');
    }
  }

  $(window).resize(function () {
    if (timeoutRunning) {
      clearTimeout(timeoutRunning);
    }
    timeoutRunning = setTimeout(recalcularTamanhos(), 400);
  });

  $('#nav-esq').click(function () {
    if(!$(this).hasClass('desabilitado')) {
      fotoSelecionada--;
      navegarFotoSelecionada();
      desabilitarNavEsquerda();
      $('#nav-dir').removeClass('desabilitado');
    }
  });

  $('#nav-dir').click(function () {
    if(!$(this).hasClass('desabilitado')) {
      fotoSelecionada++;
      navegarFotoSelecionada();
      desabilitarNavDireita();
      $('#nav-esq').removeClass('desabilitado');
    }
  });

  recalcularTamanhos();
  desabilitarNavEsquerda();
  desabilitarNavDireita();
});
