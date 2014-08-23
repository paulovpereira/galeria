$(document).ready(function () {
  $('#arquivo-foto').change(function () {
    var filename = $('#arquivo-foto').val().split('\\');
    $('#nome-arquivo').val(filename[filename.length - 1]);
  });
});