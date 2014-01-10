$(function () {
  $('#show-post-list').click(function (event) {
    $(this).text($(this).text() == 'Mostrar todos' ? 'Ocultar' : 'Mostrar todos');
    event.preventDefault();
    $('.post-ordered-list').toggle(500);
  });
});
