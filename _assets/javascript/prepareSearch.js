$(document).ready(function() {
  var emptySearch = $('.results');
  $(emptySearch).parent().hide();
  $('.search-field').simpleJekyllSearch({
      searchResultsTitle: '<h4>Resultados de búsqueda</h4>',
      noResults: '<p>No se encontraron resultados</p>',
      limit: '20',
      template:   '<article class="col-xs-12 col-sm-12 col-md-12">
                     <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                       <img class="img-center-responsive" src="{thumb}" alt="Article Image">
                     </div>
                     <div class="col-xs-12 col-sm-8 col-md-8 col-lg-8">
                       <h1>
                         <a href="{url}">{title}</a>
                       </h1>
                       <p class="author">
                         Publicado por <a href="/author/{author_login}.html">{author}</a>,
                         El {date}
                       </p>
                     </div>
                  </article>'
  });

  $('.search-field').keyup(function() {
    var value = $(this).val();
    if(value.length == 0){
      $(emptySearch).parent().hide();
    }else{
      $(emptySearch).parent().show();
    }
  });
});
