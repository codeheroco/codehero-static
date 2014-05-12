---
layout: post
status: publish
published: true
title: Urls Avanzadas
author: Carlos Picca
author_login: carlos
author_email: carlospicca@gmail.com
wordpress_id: 2338
wordpress_url: http://codehero.co/?p=2338
date: 2013-10-02 06:27:03.000000000 -04:30
serie: Django desde Cero
dificultad: Novato
duracion: 20
description: Curso en el cual aprenderemos Django desde Cero. En esta clase, estudiaremos como crear urls avanzadas las cuales nos servirán para manejar información.
categories:
- Cursos
- Django
tags:
- Django
- url
- urls
- avanzadas
---
<p>Bienvenidos una vez más a Django desde Cero, curso en el cual aprendemos a programar sin conocimiento alguno. En el capítulo anterior, te enseñe como crear forms o formularios con la ayuda de la librería que trae pre-instalada Django. Si eres nuevo en este curso, te recomiendo que le eches un vistazo al capítulo anterior para que te pongas en contexto (<a href="http://codehero.co/django-desde-cero-formularios-forms/">Capítulo 5 - Formularios (Forms)</a>)</p>

<p>Hoy, vamos a ver como crear urls avanzadas las cuales nos servirán para manejar información a través de nuestras apps.</p>

<div class="alert alert-info">
  <h4>
    ¡Alerta!
  </h4> Todos los ejemplos usados en el tutorial de son una continuación de los ejemplos del capitulo anterior.
</div>

<hr />

<h2>¿Porque usar urls avanzadas?</h2>

<p>Las url avanzadas nos permiten mantener un mayor control de las direcciones que pueden o no usar nuestras aplicaciones.</p>

<hr />

<h2>¿Cómo definimos urls avanzadas dentro de nuestras apps?</h2>

<p>Lo primero que tenemos que hacer es definir un archivo llamado <code>urls.py</code> dentro de nuestra app, en nuestro caso <strong>blog</strong>.</p>

<p>Una vez que creemos ese archivo debemos agregarle lo siguiente:</p>

```python
from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    url(r'^todos/$', 'blog.views.articulos'),
    url(r'^obtener/(?P&lt;articulo_id>\d+)/$', 'blog.views.articulo'),
)
```

<blockquote>
  <p>Observemos que prácticamente estamos recreando el archivo <code>urls.py</code> general de nuestro sitio web, pero ahora lo vamos a adaptar para que solo maneje lo que tiene que ver con nuestra app <strong>blog</strong>, para que así si tenemos muchas aplicaciones no nos confundamos a la hora de generar el contenido.</p>

  <p>Como se puede ver hemos definido dos direcciones la primera <code>url(r'^todos/$', 'blog.views.articulos')</code> la cual nos va a llevar a la vista donde despleguemos todos los artículos y la segunda <code>url(r'^obtener/(?P&lt;articulo_id&gt;\d+)/$', 'blog.views.articulo')</code> donde mostramos un solo articulo dependiendo del id que le pasemos en el <em>url</em>. Con <code>(?P&lt;articulo_id&gt;\d+)</code> estamos permitiendo a Django obtener el id del articulo que esta escrito en la dirección como tal.</p>

  <p>Cabe destacar que puedes generar direcciones con el nombre que tu desees y redireccionarlas a la vista que tu prefieras. Todo depende de lo que tu sitio web necesite.</p>
</blockquote>

<p>Lo segundo que tenemos que hacer es decirle al archivo general <code>urls.py</code> que viene con nuestro site que hemos generado un archivo <code>urls.py</code> solo para el manejo de artículos. Veamos como hacerlo:</p>

<p>En el archivo <code>urls.py</code> de nuestro sitio, en nuestro caso <strong>PrimerBlog</strong> agregamos lo siguiente:</p>

```python
(r'^articulos/', include('blog.urls')),
```

<p>Al archivo debería lucir así:</p>

```python
from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',

    (r'^articulos/', include('blog.urls')),
    # Examples:
    # url(r'^$', 'PrimerBlog.views.home', name='home'),
    # url(r'^PrimerBlog/', include('PrimerBlog.foo.urls')),
    url(r'^$', 'blog.views.home', name='home'),

    # Uncomment the admin/doc line below to enable admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),

    url(r'^crear/', 'blog.views.crear', name='crear'),
)
```

<blockquote>
  <p>Observemos que lo que estamos haciendo acá es mapear todo el contenido que venga por <code>articulos/</code> dentro de la url hacia el archivo <code>urls.py</code> que creamos anteriormente el cual maneja <strong>obtener</strong> y <strong>todos</strong>.</p>
</blockquote>

<p>Lo tercero y último que tenemos que hacer es crear las vistas que nos permitan manejar estas direcciones que creamos anteriormente. Para esto nos vamos al archivo <code>views.py</code> dentro de nuestra app <strong>blog</strong> y agregamos el siguiente código:</p>

```python
def articulos(request):
  return render_to_response('index.html', {'articulos' : Articulo.objects.all() })

def articulo(request, articulo_id=1):
  return render_to_response('articulo.html', {'articulo' : Articulo.objects.get(id=articulo_id) })
```

<blockquote>
  <p>Observemos que creamos una vista llamada <code>articulos</code> la cual va a obtener todos los artículos disponibles en la base de datos y desplegarla en el template <code>index.html</code> una vez que accedamos a la dirección <strong>todos</strong> que creamos anteriormente, y segundo creamos una vista denominada<code>articulo</code> la cual va a obtener solo el artículo con el id que le pasemos en <code>articulo_id</code> una vez accedamos a la dirección <strong>obtener/</strong>.</p>
</blockquote>

<p>El archivo <code>views.py</code> debería lucir así:</p>

```python
from django.shortcuts import render_to_response
from blog.models import Articulo
from forms import ArticuloForm
from django.http import HttpResponseRedirect
from django.core.context_processors import csrf


def home(request):
   entradas = Articulo.objects.all()[:10]
   return render_to_response('index.html', {'articulos' : entradas})

def crear(request):
    if request.POST:
        form = ArticuloForm(request.POST)
        if form.is_valid():
            form.save()

            return HttpResponseRedirect('/')
    else:
        form = ArticuloForm()

    args = {}
    args.update(csrf(request))

    args['form'] = form

    return render_to_response('crear_articulo.html', args)

def articulos(request):
  return render_to_response('index.html', {'articulos' : Articulo.objects.all() })

def articulo(request, articulo_id=1):
  return render_to_response('articulo.html', {'articulo' : Articulo.objects.get(id=articulo_id) })
```

<hr />

<h2>Probemos</h2>

<p>La manera para probar si nuestras urls son correctas es navegando hacia esas direcciones.</p>

<p>Si navegamos hacia http://127.0.0.1:8000/articulos/todos/ deberíamos obtener:</p>

<p><img src="http://i.imgur.com/CasPE61.png" alt="todos-django-urls-avanzadas" /></p>

<p>Si navegamos hacia http://127.0.0.1:8000/articulos/obtener/2 deberíamos obtener el articulo con el id 2:</p>

<p><img src="http://i.imgur.com/RU9puPo.png" alt="obtener-django-urls-avanzadas" /></p>

<hr />

<h2>Conclusión</h2>

<p>En esta lección, aprendimos como crear urls avanzandas las cuales nos servirán para manejar información a través de nuestras apps. Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso.</p>

<p>¡Te espero la próxima semana!</p>
