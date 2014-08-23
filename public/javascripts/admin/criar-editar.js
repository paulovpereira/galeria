$(document).ready(function () {
  $('#arquivo-foto').change(function () {
    var filename = $('#arquivo-foto').val().split('\\');
    $('#nome-arquivo').val(filename[filename.length - 1]);
  });

  $('#form-foto').form({
    arquivo: {
      identifier: 'arquivo',
      rules: [
        {
          type: 'empty',
          prompt: 'Por favor, escolha uma foto antes de salvar.'
        }
      ]
    }
  }, {
    inline: true
  });
});