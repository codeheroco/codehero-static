---
layout: post
status: publish
published: true
title: Formularios (Forms)
author: Carlos Picca
author_login: carlos
author_email: carlospicca@gmail.com
wordpress_id: 2266
wordpress_url: http://codehero.co/?p=2266
date: 2013-09-18 02:19:14.000000000 -04:30
categories:
- Cursos
- Django
tags:
- Django
- formularios
- form
- forms
- csrf
comments:
- id: 210
  author: Urls Avanzadas | CODEHERO
  author_email: ''
  author_url: http://codehero.co/django-desde-cero-urls-avanzadas/
  date: '2013-10-02 06:27:08 -0430'
  date_gmt: '2013-10-02 10:57:08 -0430'
  content: '[&#8230;] Formularios (Forms) [&#8230;]'
---
<p>Bienvenidos una vez más a Django desde Cero, curso en el cual aprendemos a programar sin conocimiento alguno. En el capítulo anterior, te enseñe como como configurar, acceder y manejar el módulo de administrador que viene pre-instalado con Django. Si eres nuevo en este curso, te recomiendo que le eches un vistazo al capítulo anterior para que te pongas en contexto (<a href="http://codehero.co/django-desde-cero-sitio-de-administracion/">Capítulo 4 - Sitio de Administración </a>)</p>

<p>Hoy, vamos a ver como crear forms o formularios con la ayuda de la librería que trae pre-instalada Django.</p>

<div class="alert alert-info">
  <h4>
    ¡Alerta!
  </h4> Todos los ejemplos usados en el tutorial de son una continuación de los ejemplos del capitulo anterior.
</div>

<hr />

<h2>¿Qué es un form o formulario?</h2>

<p>Una colección de campos que sabe cómo validarse a sí mismo y mostrarse como HTML.</p>

<h3>Beneficios de usar la librería pre-instalada de Django</h3>

<ul>
<li>Mostrar un formulario HTML con los campos de formulario generados automáticamente.</li>
<li>Comprobar los datos presentados en contra de un conjunto de reglas de validación.</li>
<li>Volver a mostrar un formulario en el caso de errores de validación.</li>
<li>Convertir datos del formulario a los tipos de datos de Python pertinentes.</li>
</ul>

<p>La mejor forma de aprender a usar las forms o formularios dentro del framework es a través de un ejemplo, en nuestro caso vamos a seguir usando el ejemplo del capítulo anterior. Si no lo has leído te recomiendo que lo visites <a href="http://codehero.co/django-desde-cero-sitio-de-administracion/">Capítulo 4 - Sitio de Administración</a>.</p>

<p>Para crear un form en Django vamos a necesitar hacer lo siguiente.</p>

<hr />

<h2>Generar nuestro archivo forms.py</h2>

<p>Django nos provee una manera sencilla y eficiente para la creación de forms o formularios dentro de nuestro sitio web. Lo primero que necesitamos hacer es crear el archivo <code>forms.py</code> dentro de nuestra aplicación. En nuestro caso va a ser dentro de la app <code>blog</code>.</p>

<p>Dentro de este archivo vamos a declarar todos los forms o formularios que va a usar nuestro aplicativo. Empezamos por agregar las siguientes dependencias:</p>

<pre>from django import forms
from models import Articulo
</pre>

<blockquote>
  <p>Observemos que para que las forms o formularios funcionen necesitamos importar todas la funcionalidades del modulo <strong>forms</strong> propio de Django. Por otro lado, necesitamos importar el modulo <strong>Articulo</strong> de nuestros modelos para que así Django pueda saber que meta-data usar a la hora de renderizar el form en nuestro sitio web.</p>
</blockquote>

<p>Lo siguiente es crear un clase que contenga y maneje el form que queremos hacer. Veamos como:</p>

<pre>class ArticuloForm(forms.ModelForm):

   class Meta:
      model = Articulo
</pre>

<blockquote>
  <p>Dos cosas que debemos observar, la primera, todos los forms o formularios que queramos crear debemos extenderlos de la clase <code>forms.ModelForm</code>, y segundo, debemos crear una clase <code>Meta</code> dentro de nuestro form para que así Django realice el link entre los datos que contiene el modelo <strong>Artículo</strong> y los campos html del form.</p>
</blockquote>

<p>El archivo <code>forms.py</code> debería lucir así:</p>

<pre>from django import forms
from models import Articulo

class ArticuloForm(forms.ModelForm):

   class Meta:
      model = Articulo
</pre>

<hr />

<h2>Agregar un url</h2>

<p>Para que el usuario pueda llegar a la vista del form que creamos anteriormente debemos especificar una nueva ruta dentro del archivo <code>urls.py</code>. Veamos como hacerlo:</p>

<p>En el archivo <code>urls.py</code> agregamos la siguiente linea:</p>

<pre>url(r'^crear/', 'blog.views.crear', name='crear'),
</pre>

<blockquote>
  <p>Observemos que nuestra nueva ruta la denominamos <strong>crear</strong> pero puedes darle el nombre que tu necesites.</p>
</blockquote>

<p>El archivo <code>urls.py</code> debería lucir así:</p>

<pre>from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
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
</pre>

<p>Si necesitas ayuda para entender como funcionan las rutas dentro de Django, te recomiendo el siguiente capitulo del curso <a href="http://codehero.co/django-desde-cero-vistas-dinamicas/">Capítulo 3 - Vistas Dinámicas</a></p>

<hr />

<h2>Definimos la vista</h2>

<p>No basta con definir el form y la ruta, también necesitamos decirle a Django que va a realizar con los datos que obtenga de ese form. Es en este punto donde vienen las definiciones de las vistas a ayudarnos. Veamos como definir nuestra vista:</p>

<p>Lo primero que tenemos que hacer es ir al archivo <code>views.py</code> dentro de nutra app <strong>blog</strong>. Una vez ahí vamos a agregar las siguientes dependencias:</p>

<pre>from forms import ArticuloForm
from django.http import HttpResponseRedirect
from django.core.context_processors import csrf
</pre>

<blockquote>
  <p>Observemos que necesitamos importar la clase <code>ArticuloForm</code> que creamos anteriormente para así poder manejarla desde acá, y aparte importamos <code>HttpResponseRedirect</code> para poder redirigir a la vista de todos los <strong>artículos</strong> una ves que el proceso haya concluido.</p>
</blockquote>

<p>Debemos definir la vista como tal. Veamos como:</p>

<pre>def crear(request):
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
</pre>

<blockquote>
  <p>Básicamente lo que hace este método es validar que el request sea de tipo <code>request.POST</code>, de serlo, se valida la información del form con el método <code>form.is_valid()</code> y de esta información estar correcta se procede a guardarla en la base de datos con <code>form.save()</code>.</p>
  
  <p>Si por el contrario el request no fuese de tipo <strong>POST</strong> se procede a renderizar el template <code>crear_articulo.html</code> con el form que creamos anteriormente <code>form = ArticuloForm()</code></p>
</blockquote>

<p>El archivo <code>views.py</code> debería lucir así:</p>

<pre>from django.shortcuts import render_to_response
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
</pre>

<p>Si quieres saber más sobre el funcionamiento de templates o plantillas dentro de Django te recomiendo que le eches un vistazo al <a href="http://codehero.co/django-desde-cero-vistas-dinamicas/">Capítulo 3 - Vistas Dinámicas</a></p>

<hr />

<h2>Generar la plantilla</h2>

<p>El último paso para crear un form con Django es generar la plantilla o template que va a renderizar el form que declaramos anteriormente. Veamos como hacerlo:</p>

<p>Debemos crear el archivo <code>crear_articulo.html</code> dentro de la carpeta <strong>templates</strong> en la app <strong>blog</strong> y agregarle el siguiente código:</p>

<pre> <form action="/crear/" method="post">{% raw %}{% csrf_token %}{% endraw %}
<ul>
{{ form.as_ul }}
</ul>

<input type="submit" name="submit" value="Crear Articulo">
</form> 
</pre>

<blockquote>
  <p>Observemos que dentro de esta plantilla es donde renderizamos el form que creamos anteriormente con el método <code>form.as_ul</code>, a su vez es donde especificamos la dirección de la ruta que Django tiene que buscar para poder procesar el form, en nuestro caso <code>/crear/</code>.</p>
</blockquote>

<hr />

<h2>Probemos</h2>

<p>Si cumplimos todos los pasos anterior no debería existir ningún problema al probar nuestro form. Veamos que debemos hacer:</p>

<p>Primero que nada es encender el servidor:</p>

<pre>$ python manage.py runserver
</pre>

<p>Una vez que encienda navegamos hacia la ruta que creamos <code>http://127.0.0.1:8000/crear</code>:</p>

<p><img src="http://codehero.co/oc-content/uploads/2013/09/form-django.png" alt="form-django" /></p>

<p>Ahora cargamos unos datos de prueba:</p>

<p><img src="http://codehero.co/oc-content/uploads/2013/09/llenado-form-django.png" alt="llenado-form-django" /></p>

<p>Si clickeamos <strong>Crear Articulo</strong> deberíamos observar el nuevo <em>articulo</em>:</p>

<p><img src="http://codehero.co/oc-content/uploads/2013/09/todos-articulos-django.png" alt="todos-articulos-django" /></p>

<p>Si quieres saber más información acerca de los forms o formularios en Django, te recomiendo que visites <a href="https://docs.djangoproject.com/en/dev/topics/forms/">Formularios Django</a></p>

<hr />

<h2>Conclusión</h2>

<p>En esta lección, aprendimos como crear forms o formularios con la ayuda de la librería que trae pre-instalada Django. Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso.</p>

<p>¡Te espero la próxima semana!</p>
