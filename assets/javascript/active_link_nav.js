$(document).ready(function () {
  $('a[href="' + this.location.pathname +'"]').parent("li").addClass('active');
  if ($('.post').length) {
    $('ul.menu > li:first').addClass('active');
  } else if ($('.wiki').length ){
    $('ul.menu > li').eq([1]).addClass('active');
  }
});
