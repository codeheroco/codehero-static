---
layout: post
status: publish
published: true
title: Vistas Dinámicas
author: Carlos Picca
author_login: carlos
author_email: carlospicca@gmail.com
wordpress_id: 1508
wordpress_url: http://codehero.co/?p=1508
date: 2013-07-19 08:06:17.000000000 -04:30
categories:
- Cursos
- Django
tags:
- Django
- vistas
- HTML
- dinamica
- render_to_response
- desde cero
---
<p>Bienvenidos una vez más a Django desde Cero, curso en el cual aprendemos a programar sin conocimiento alguno. En el capítulo anterior, te enseñe como crear modelos de base de datos y como hacer que Django sincronice y generé las tablas por nosotros. Si eres nuevo en este curso, te recomiendo que le eches un vistazo al capítulo anterior para que te pongas en contexto (<a href="http://codehero.co/django-desde-cero-modelos-y-base-de-datos/">Capítulo 2</a>)</p>

<p>Hoy, vamos a ver las diferentes formas de crear paginas dinámicas con la ayuda de Django.</p>

<div class="alert alert-info">
  <h4>
    ¡Alerta!
  </h4> Todos los ejemplos usados en el tutorial de son una continuación de los ejemplos del capitulo anterior.
</div>

<hr />

<h2>Vistas</h2>

<p>Una vista en Django, es una simple función en Python que toma un Web Request y retorna un respuesta web (Response). Ese response puede ser un HTML, un error 404, un documento XML, una imagen, etc.</p>

<p>Para crear nuestra primera vista en Django es necesario cumplir con tres requisitos:</p>

<h3>1. Definición de la vista</h3>

<p>Lo primero que tenemos que hacer es modificar el archivo <code>views.py</code> dentro de nuestro proyecto y definir una función que va a actuar como nuestra vista. Veamos como:</p>

<pre>from django.shortcuts import render_to_response
  
def home(request):
    return render_to_response('index.html')
</pre>

<p>Revisemos el código, primero nos encontramos con lo siguiente ‘from django.shortcuts import render_to_response’, lo que estamos haciendo es pidiendo a Django que importe un método denominado <strong>render_to_response</strong> para así facilitarnos la vida a la hora de retornar un web response. Segundo, definimos una función <code>def home(request):</code>, la cual va a actuar como nuestra vista principal. Si detallamos las instrucciones de esta función, podemos percatarnos que lo único que realiza es devolver o retornar un archivo o plantilla (template) denominado <code>index.html</code>.</p>

<h3>2. Generar una plantilla (Template)</h3>

<p>En el paso anterior definimos una función la cual va a retornar el HTML que nosotros le indiquemos. En nuestro caso debemos retornar un archivo o plantilla denominada <code>index.html</code>. Veamos como hacerlo:</p>

<p>Lo primero que tenemos que hacer es cumplir con el estándar de Django para manejar los templates, para eso es necesario crear dentro de nuestro directorio de la app una carpeta denominada <code>templates</code>.</p>

<p><img src="http://i.imgur.com/JaPRdN5.png" alt="Django Vistas Dinámicas Carpeta Template" /></p>

<p>Segundo, creamos un archivo <code>index.html</code> dentro de la carpeta <code>templates</code> con el siguiente contenido HTML:</p>

```html
{% raw %}
  <h1>
    Primer Blog
  </h1>
  <h2>
    Titulo
  </h2>

  <h3>
    Publicado el día por el autor
  </h3>
  <p>
    Contenido
  </p>
{% endraw %}
</div>
```

<blockquote>
  <p>Observemos que el archivo solo va a contener un HTML básico para poder probar que de verdad Django esta retornando el contenido correcto.</p>
</blockquote>

<p>Por último, tenemos que informarle a nuestro proyecto en donde buscar esos templates o plantillas, es por eso que vamos a modificar el archivo <code>settings.py</code>.</p>

<p>Ya que nuestras plantillas están en:</p>

<p><img src="http://i.imgur.com/hxQId6g.png" alt="Vistas Dinámicas Carpeta Index" /></p>

<p>Vamos a tener que modificar la linea 105 del archivo con lo siguiente:</p>

<pre>TEMPLATE_DIRS = (
    "../blog/templates",
    # Put strings here, like "/home/html/django_templates" or "C:/www/django/templates".
    # Always use forward slashes, even on Windows.
    # Don't forget to use absolute paths, not relative paths.
)
</pre>

<h3>3. Conectar los urls con las vistas</h3>

<p>Para que nuestra vistas funcionen correctamente debemos conectar las urls del explorador con las vistas que queremos mostrar, es por eso que en Django los mapeos son muy importantes ya que nos permiten tener el control absoluto sobre como queremos que nuestra app se comporte. Veamos como hacerlo:</p>

<p>Agregamos la siguiente línea en el archivo <code>urls.py</code>:</p>

<pre>url(r'^$', 'blog.views.home', name='home')
</pre>

<p>Si revisamos el código, lo único que agregamos fue <code>url(r'^$', 'blog.views.home', name='home')</code>, cuya función es hacer que todas las peticiones hacia la página principal de nuestro sitio, por ejemplo http://codehero.co/, se redirija al método <strong>home</strong> dentro de la app <code>blog</code> y vista <code>views.home</code>.</p>

<blockquote>
  <p>En el caso de tener múltiples vistas lo único que necesitaríamos hacer es redireccionar esas urls al método deseado, por ejemplo <code>FirstBlog.blog.views.crearArticulo</code>. Te recomiendo la documentación sobre <a href="https://docs.djangoproject.com/en/dev/topics/http/views/">vistas de Django</a></p>
</blockquote>

<p>Ahora llego el momento de probar nuestro proyecto!, para probarlo solo tenemos que correr el servidor y para eso debemos ejecutar en el terminal el siguiente comando:</p>

<pre>python manage.py runserver
</pre>

<p>Si navegamos a la dirección http://127.0.0.1:8000 y nos retorna lo siguiente, entonces hemos configurado con éxito nuestra primera vista!</p>

<p><img src="http://i.imgur.com/O6M2njY.png" alt="Vistas Dinámicas Pagina basica" /></p>

<hr />

<h2>¿Cómo creamos un sitio dinámico?</h2>

<p>La base de utilizar utilizar Django es que nos permite crear sitios dinámicos con facilidad. Veamos como crear nuestra primera vista dinámica:</p>

<div class="alert alert-info">
  Vemos primero el funcionamiento y organización que hay que darle a los archivos para que nuestro proyecto funcione como un sitio dinámico.
</div>

<p>Primero modifiquemos el archivo <code>index.html</code> dentro de <code>../blog/templates</code> con:</p>

<pre><div class="container">
{% raw %}
  <h1>
    Primer Blog
  </h1>
  <h2>
    {{ titulo }}
  </h2>
  <h3>
    Publicado el {{ dia }} por {{ autor }}
  </h3>
  <p>
    {{ contenido }}
  </p>
{% endraw %}
</div>
</pre>

<p>La manera de pasarle contenido dinámico a una plantilla o template es creando en el mismo template lo que se denomina contenedores de información. Esos contenedores van a estar entre ** {{ nombre_del_contendor }}** y van a tener un nombre clave.</p>

<p>Segundo, modificamos el archivo <code>views.py</code> para poder decirle a la función <strong>home</strong> que ahora aparte de retornar ese HTML del <code>index.html</code> va a pasarle un contenido dinámico en este caso, solo por prueba, se lo vamos a colocar nosotros (más adelante veremos la manera de como automatizar esos contenidos). Veamos como:</p>

<blockquote>
  <p>Los contenedores funcionan como un diccionario, es decir, que por cada palabra clave existe un valor asociado a ella.</p>
</blockquote>

<pre>from django.shortcuts import render_to_response
  
def home(request):
    contenido = {
        'titulo' : 'Mi primer gran articulo',
        'autor' : 'Carlos Picca',
        'dia' : '19 de Julio de 2013',
        'contenido' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam cursus tempus dui, ut vulputate nisl eleifend eget. Aenean justo felis, dapibus quis vulputate at, porta et dolor. Praesent enim libero, malesuada nec vestibulum vitae, fermentum nec ligula. Etiam eget convallis turpis. Donec non sem justo.',
    }
    return render_to_response('index.html', contenido)
</pre>

<p>Observemos, que lo que hicimos fue crear un diccionario que contiene los contenedores que queremos que cambien en nuestro HTML y luego se lo pasamos como variable al template o plantilla.</p>

<p>Ahora guardemos el archivo y refresquemos el explorador. Si te aparece lo siguiente ya creamos nuestra primera vista dinámica!.</p>

<p><img src="http://i.imgur.com/OpJAjnx.png" alt="Vistas Dinámicas template" /></p>

<hr />

<h2>¿Cómo creamos un sitio dinámico con contenido extraído de una base de datos?</h2>

<p>El paso final de esta tutoría es saber como extraer entradas de la base de datos y así crear un sitio completamente dinámico. Veamos como crearlo siguiendo el ejemplo del capítulo anterior en el cual creamos un modelo que soporta artículos. (<a href="http://codehero.co/django-desde-cero-modelos-y-base-de-datos/">Capítulo anterior</a>).</p>

<p>Lo primero que tenemos que hacer es modificar nuestro archivo <code>settings.py</code> para hacerle saber a Django que vamos a estar utilizando nuestra app <strong>blog</strong>. Debemos agregar a ** INSTALLED_APPS** el nombre de nuestra app <code>‘blog’,</code>. Veamos como:</p>

<pre>INSTALLED_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Uncomment the next line to enable the admin:
    # 'django.contrib.admin',
    # Uncomment the next line to enable admin documentation:
    # 'django.contrib.admindocs',
    'blog',
)
</pre>

<p>Lo segundo es modificar la función <strong>home</strong> en nuestro archivo <code>views.py</code> para que podamos obtener todas las entradas de la base de datos y así desplegarlos en el HTML. Veamos como:</p>

<pre>from django.shortcuts import render_to_response
 
from blog.models import Articulos
 
def home(request):
    entradas = Articulos.objects.all()[:10]
    return render_to_response('index.html', {'articulos' : entradas})
</pre>

<blockquote>
  <p>Revisemos el código, observemos que agregamos <code>from blog.models import Articulos</code> lo cual nos permite hacer uso del modelo que creamos en el capítulo anterior. Además, agregamos <code>entradas = Articulos.objects.all()[:10]</code> dentro de la definición del <strong>home</strong> para poder extraer las primeras 10 entradas de artículos de la base de datos. Por último, modificamos <code>render_to_response('index.html', {'articulos' : entradas})</code> para que cuando cree en el response sea agregado todas las entradas de la base de datos.</p>
</blockquote>

<p>Por último, vamos a modificar el template o plantilla <code>index.html</code> para que no solo despliegue un entrada de la base de datos sino que si poseemos múltiples datos pueda mostrarlos todos. Vemos como:</p>

<pre><div class="container">
{% raw %}
  <h1>
    Mi primer blog
  </h1>
  <hr />
  {% for articulo in articulos %}
  <div class="art">
    <h2>
      {{ articulo.titulo }}

    </h2>
    <h3>
      Publicado el {{ articulo.fecha }} por {{ articulo.autor }}
    </h3>
    <p>
      {{ articulo.texto }}
    </p>
  </div>
  <hr />
  {% endfor %}
{% endraw %}
</div>
</pre>

<blockquote>
  <p>Observemos que dado a que <code>articulos</code> es un diccionario debemos extraer los valores existentes dentro de él, es por eso que utilizamos el siguiente comando <code>{% raw %}{% for articulo in articulos %}{% endraw %}</code>. Además, ya que cada diccionario posee unas variables claves o contenedores la manera de acceder a ellas es la siguiente <code>nombre_variable.nombre_contenedor</code> en nuestro caso <code>articulo.titulo</code>.</p>
</blockquote>

<p>Si corremos el servidor nuevamente y obtenemos el siguiente resultado es que creamos exitosamente un sitio dinamo en Django!.</p>

<p><img src="http://i.imgur.com/NB02Mq4.png" alt="Vistas Dinámicas template Avanzado" /></p>

<blockquote>
  <p>Observemos, que aparecen varios articulos reflejados ya que mi base de datos posee varias entradas de articulos, cabe destacar que ese HTML solo desplegará cuantas entradas tengas.</p>
</blockquote>

<hr />

<h2>Conclusión</h2>

<p>En esta lección, aprendimos como crear paginas dinámicas con Django Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso. Te espero la próxima semana!</p>
