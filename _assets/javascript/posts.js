$(function () {
  $('#show-post-list').click(function (event) {
    $(this).text($(this).text() == 'Mostrar todos' ? 'Ocultar' : 'Mostrar todos');
    event.preventDefault();
    $('.post-ordered-list').toggle(500);
  });

  // Add the tables in posts some sugar
  var postTables = $('.post table');
  postTables.wrap('<div class="table-responsive">');
  postTables.addClass('table table-bordered table-striped');
});
