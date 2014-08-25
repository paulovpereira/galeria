
$(document).ready(function () {
  var timeoutRunning = 0;
  var LARGURA_BOTOES_NAV = 200,
      ALTURA_CONTADOR_FOTOS = 30,
      larguraMaximoGaleria,
      fotoSelecionada = 0,
      numeroFotos;

  function calculaAspectoIdeal(alturaMax, alturaImagem, larguraMax, larguraImagem) {
    return Math.min(alturaMax / alturaImagem, larguraMax / larguraImagem);
  }

  function recalcularTamanhos () {
    var galeria = $('.gallery-wrapper'),
        wrapperGaleria = $('.photos-wrapper-outer'),
        wrapperFotos = $('.photos-wrapper'),
        fotos = $('.photo-wrapper'),
        alturaMaximaGaleria = galeria.height(),
        alturaMaximaFotos = alturaMaximaGaleria - ALTURA_CONTADOR_FOTOS;

    numeroFotos = fotos.length;
    $('#numero-fotos').html(numeroFotos);
    larguraMaximoGaleria = galeria.width() - LARGURA_BOTOES_NAV;

    wrapperGaleria.css('width', larguraMaximoGaleria);
    wrapperGaleria.css('height', alturaMaximaGaleria);

    var larguraWrapperFotos = larguraMaximoGaleria * numeroFotos;
    wrapperFotos.css('width', larguraWrapperFotos);
    wrapperFotos.css('height', alturaMaximaFotos);
    navegarFotoSelecionada();

    fotos.css('width', larguraMaximoGaleria);
    fotos.css('height', alturaMaximaFotos);
    fotos.find('img').each(function redimensionarImg() {
      var imagem = $(this),
        copiaImagem = new Image();
      copiaImagem.src = imagem.attr("src");
      copiaImagem.onload = function() {
        var proporcaoFinal = calculaAspectoIdeal(alturaMaximaFotos, this.height,
          larguraMaximoGaleria, this.width);
        imagem.css('max-height', this.height);
        imagem.css('max-width', this.width);
        imagem.css('width', proporcaoFinal * this.width);
        imagem.css('height', proporcaoFinal * this.height);
      };
    });
  }

  function navegarFotoSelecionada() {
    var wrapperFotos = $('.photos-wrapper');
    wrapperFotos.css('left', -(fotoSelecionada * larguraMaximoGaleria));
    $('#foto-atual').html(fotoSelecionada + 1);
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
    timeoutRunning = setTimeout(recalcularTamanhos, 100);
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
