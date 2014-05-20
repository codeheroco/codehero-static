---
layout: post
status: publish
published: true
title: Sitio de Administración
author: Carlos Picca
author_login: carlos
author_email: carlospicca@gmail.com
wordpress_id: 2169
wordpress_url: http://codehero.co/?p=2169
date: 2013-09-04 01:15:55.000000000 -04:30
serie: Django desde Cero
dificultad: Novato
duracion: 15
description: Curso en el cual aprenderemos Django desde Cero. En esta clase, estudiaremos como configurar, acceder y manejar el módulo de administrador de django.
categories:
- Cursos
- Django
tags:
- Django
- configuracion
- administrador
- sitio
- admin
---
<p>Bienvenidos una vez más a Django desde Cero, curso en el cual aprendemos a programar sin conocimiento alguno. En el capítulo anterior, te enseñe como crear páginas dinámicas con Django. Si eres nuevo en este curso, te recomiendo que le eches un vistazo al capítulo anterior para que te pongas en contexto (<a href="http://codehero.co/django-desde-cero-vistas-dinamicas/">Capítulo 3 - Vistas Dinámicas</a>)</p>

<p>Hoy, vamos a ver como configurar, acceder y manejar el módulo de administrador que viene pre-instalado con Django. Dicho módulo nos permite gestionar nuestro sitio sin necesidad de escribir más código (lo que tendríamos que hacer si estuviéramos creando un sitio desde cero).</p>

<div class="alert alert-info">
  <h4>
    ¡Alerta!
  </h4> Todos los ejemplos usados en el tutorial de son una continuación de los ejemplos del capitulo anterior.
</div>

<hr />

<h2>¿Cómo configurar el módulo de administrador?</h2>

<p>Muy sencillo. Lo primero que tenemos que hacer es ir al archivo <code>urls.py</code> dentro de la carpeta <strong>PrimerBlog</strong>, y descomentar las siguientes líneas:</p>

```python
from django.contrib import admin
admin.autodiscover()

...

url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
url(r'^admin/', include(admin.site.urls)),
```

<blockquote>
  <p>Al descomentar estas líneas estamos permitiendo el acceso al sitio de administrador cuando navegamos a la siguiente dirección <a href="http://127.0.0.1:8000/admin">http://127.0.0.1:8000/admin</a>.</p>
</blockquote>

<p>El archivo <code>urls.py</code> debería lucir así:</p>

```python
from django.conf.urls import patterns, include, url

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
)
```

<blockquote>
  <p>Al descomentar estas líneas estamos agregando las apps de administrador de Django a nuestro proyecto.</p>
</blockquote>

<p>Por último debemos sincronizar la base de datos para que sean creadas las tablas de las apps de administrador. Veamos como hacerlo:</p>

<p>Para sincronizar la base de datos hacemos uso de <code>syncdb</code>:</p>

```python
python2.7 manage.py syncdb
```

<p>Una vez que el proceso haya terminado encendemos el servidor:</p>

```python
python2.7 manage.py runserver
```

<p>Una vez que hayamos completado estos pasos ya deberíamos tener activo el módulo de administrador en nuestra aplicación.</p>

<hr />

<h2>¿Cómo acceder al módulo de administrador?</h2>

<p>Para acceder al módulo de administrador solo debemos navegar hacia la dirección base de nuestro proyecto y llamar al módulo admin. En nuestro caso, ya que estamos en modo de desarrollo, sería <code>http://127.0.0.1:8000/admin/</code>.</p>

<p>Nos debería aparecer en el explorador lo siguiente:</p>

<p><img src="http://i.imgur.com/ZtY8B7N.png" alt="login-sitio-administrador-django" /></p>

<p>Podemos observar que nos pide un usuario y una clave. Por defecto el usuario y la clave son los que usamos para configurar nuestro súper usuario dentro de la aplicación. Si no sabes como configuramos el súper usuario te recomiendo que le eches un vistazo a <a href="http://codehero.co/django-desde-cero-modelos-y-base-de-datos/">Django desde Cero: Modelos y Base de Datos</a></p>

<p>Una vez que accedemos debería mostrarnos lo siguiente:</p>

<p><img src="http://i.imgur.com/RF9lXfa.png" alt="index-sitio-administrador-django" /></p>

<hr />

<h2>¿Cómo agregamos contenido a nuestra aplicación?</h2>

<p>Como puedes observar el módulo de administrador viene por defecto con unos modelos que podemos usar para agregar contenido a nuestra app, estos son el modelo de <strong>Grupos</strong>, <strong>Usuarios</strong> y <strong>Sitios</strong>, pero que pasa si queremos añadir contenido a nuestro propio modelo como es el caso de los <strong>Articulos</strong>.</p>

<p>Es muy sencillo, lo que tenemos que hacer es lo siguiente:</p>

<p>Crear un archivo llamado <code>admin.py</code> dentro de la carpeta de la aplicación <strong>blog</strong> (<em>En nuestro caso la dirección seria <code>/PrimerBlog/blog</code></em>). Dentro del archivo agregamos las siguientes líneas de código:</p>

```python
from django.contrib import admin
from models import Articulo

admin.site.register(Articulo)
```

<blockquote>
  <p>Observemos lo siguiente <em>(línea por línea)</em>:</p>

  <ol>
  <li><p>Con <code>from django.contrib import admin</code> estamos importando el módulo de administrador.</p></li>
  <li><p>Con <code>from models import Articulo</code> estamos importando nuestro módulo <strong>Articulo</strong>, el cual maneja todos los artículos dentro de nuestro blog.</p></li>
  <li><p>Con <code>admin.site.register(Articulo)</code> le dejamos saber al módulo de administrador que vamos a registrar un nuevo modelo, en este caso el modelo de <strong>Articulo</strong>.</p></li>
  </ol>
</blockquote>

<p>Para que los cambios tomen efecto debemos reiniciar el servidor:</p>

<p>Lo apagamos:</p>

```python
CONTROL-C
```

<p>Lo volvemos a encender:</p>

```python
python2.7 manage.py runserver
```

<p>Ahora podemos observar que dentro del módulo de administrador podemos manejar nuestro propio modelo.</p>

<p><img src="http://i.imgur.com/paF3D05.png" alt="nuevo-modelo-sitio-administrador-django" /></p>

<hr />

<h2>¿Cómo manejamos nuestro propio modelo dentro del módulo del administrador?</h2>

<p>Con el módulo de administrador tenemos acceso a una interfaz muy poderosa a la hora de gestionar nuestros modelos pero en este tutorial solo voy a cubrir lo básico:</p>

<h3>Listar objetos disponibles</h3>

<p>En la página principal del administrador aparecen todos los modelos los cuales podemos gestionar. Como estamos viendo el ejemplo con nuestro propio modelo de <strong>Articulos</strong>, vamos a acceder a todos los objetos disponibles de ese tipo en la base de datos. Veamos como hacerlo:</p>

<p>Desde la página principal del <strong>admin</strong> haz click en el nombre del modelo, en este caso <strong>Articulos</strong>:</p>

<p><img src="http://i.imgur.com/66bigUA.png" alt="click-nuevo-modelo-sitio-administrador-django" /></p>

<p>Podemos observar que se despliegan una lista con todos lo <em>artículos disponibles</em> en la base de datos:</p>

<p><img src="http://i.imgur.com/YX1a4IW.png" alt="articulos-sitio-administrador-django" /> </p>

<h3>Modificar objetos disponibles</h3>

<p>Para modificar un objeto desde el módulo del administrador debemos hacer lo siguiente:</p>

<p>Navegamos a la lista de objetos disponibles y en ella hacemos click en uno de los objetos, el administrador nos debería llevar al detalle de ese objeto en particular.</p>

<p><img src="http://i.imgur.com/QffY0BR.png" alt="modificar-articulo-sitio-administrador-django" /></p>

<p>Un vez en que estemos en la vista detalle podemos modificar la información de ese <em>Artículo</em> en particular:</p>

<h3>Agregar un objeto</h3>

<p>Para agregar un objeto desde el módulo del administrador debemos hacer lo siguiente:</p>

<p>Navegamos a la lista de objetos disponibles y en ella hacemos click en el botón que dice <strong>Add Articulos</strong>:</p>

<p><img src="http://i.imgur.com/bz6E1Cv.png" alt="agregar-articulo-sitio-administrador-django" /></p>

<p>Rellenamos los campos necesario para generar un articulo:</p>

<p><img src="http://i.imgur.com/z2GMNqs.png" alt="campos-articulo-sitio-administrador-django" /></p>

<p>Por último, hacemos click en <strong>Save</strong> para poder guardar dicho artículo. Podemos observar que ahora ese artículo esta disponible en la base de datos:</p>

<p><img src="http://i.imgur.com/SV9lOxZ.png" alt="nuevo-articulos-sitio-administrador-django" /></p>

<blockquote>
  <p>Como puedes observar el módulo de administrador nos facilita mucho las cosas a la hora de gestionar el contenido de nuestro sitio web. Si quieres indagar más en el tema te invito que visites la <a href="https://docs.djangoproject.com/en/dev/ref/contrib/admin/">Documentación oficial del sitio administrador de Django</a></p>
</blockquote>

<hr />

<h2>Conclusión</h2>

<p>En esta lección, aprendimos como configurar, acceder y manejar el módulo de administrador que viene pre-instalado con Django. Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso.</p>

<p>¡Te espero la próxima semana!</p>
