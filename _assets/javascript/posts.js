$(function () {
  $('#show-post-list').click(function (event) {
    event.preventDefault();
    $('.post-ordered-list').toggle(500);
  });
});
