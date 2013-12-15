$(function() {
  $(window).scroll(function(event){
    event.preventDefault();
    if ($(this).scrollTop() > 180) {
      $('.scrollTo-top').fadeIn();
    } else {
      $('.scrollTo-top').fadeOut();
    }
  });

  $('.scrollTo-top').click(function(event){
    $('html, body').animate({scrollTop : 0 }, 600);
    event.preventDefault();
  });
});
