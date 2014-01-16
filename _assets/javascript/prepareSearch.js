$(document).ready(function() {
    $('.search-field').simpleJekyllSearch({
        searchResultsTitle: '<h4>Resultados de búsqueda</h4>',
        noResults: '<p>No se encontraron resultados</p>',
        limit: '20',
        template:   '<article class="col-xs-12 col-sm-12 col-md-12">
                        <div class="remove-column-padding col-xs-12 col-lg-1 visible-xs visible-lg">
                        <span class="date">
                          {date}
                        </span>
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-5 col-lg-4">
                        <img class="img-center-responsive" src="{thumb}" alt="Article Image">
                      </div>
                      <div class="col-xs-12 col-sm-6 col-md-7 col-lg-7">
                        <span class="date visible-sm visible-md">
                          {date}
                        </span>
                        <h1>
                            <a href="{url}">{title}</a>
                        </h1>
                        <p class="author">
                            Publicado por <a href="/author/{author_login}.html">{author}</a>
                        </p>
                      </div>
                    </article>'
    });
});
