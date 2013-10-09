---
layout: post
status: publish
published: true
title: Modelos y Base de Datos
author: Carlos Picca
author_login: carlos
author_email: carlospicca@gmail.com
wordpress_id: 1315
wordpress_url: http://codehero.co/?p=1315
date: 2013-07-05 03:49:30.000000000 -04:30
categories:
- Cursos
- Django
tags:
- Django
- curso
- Modelos
- Base de datos
- db
- blog
- desde cero
comments:
- id: 195
  author: 'Django desde Cero: Vistas Dinámicas | CODEHERO'
  author_email: ''
  author_url: http://codehero.co/django-desde-cero-vistas-dinamicas/
  date: '2013-07-19 08:06:22 -0430'
  date_gmt: '2013-07-19 12:36:22 -0430'
  content: '[...] Bienvenidos una vez más a Django desde Cero, curso en el cual aprendemos
    a programar sin conocimiento alguno. En el capítulo anterior, te enseñe como crear
    modelos de base de datos y como hacer que Django sincronice y generé las tablas
    por nosotros. Si eres nuevo en este curso, te recomiendo que le eches un vistazo
    al capítulo anterior para que te pongas en contexto (Capítulo 2) [...]'
---
<p>Bienvenidos una vez más a Django desde Cero, curso en el cual aprendemos a programar sin conocimiento alguno. En el capítulo anterior, te enseñe como instalar y configurar Django en un ambiente virtual. Si eres nuevo en este curso, te recomiendo que le eches un vistazo al capítulo anterior para que te pongas en contexto (<a href="http://codehero.co/django-desde-cero-instalacion-y-herramientas/">Capítulo 1</a>)</p>

<p>Hoy, vamos a construir nuestro primer proyecto, un blog!, ya que es una excelente manera de aprender a crear sitios dinámicos con Django.</p>

<hr />

<h2>Construyendo nuestro primer proyecto</h2>

<p>Lo primero que necesitamos hacer es decirle a nuestro <code>django-admin.py</code> que nos cree un proyecto en Django. Veamos como:</p>

<pre>django-admin.py startproject PrimerBlog
</pre>

<p>Observemos que el único parámetro que necesitamos pasarle es el nombre del proyecto, en este caso <code>PrimerBlog</code>. Ese comando creará una serie de archivos que nos ayudarán a manejar nuestro sitio. Veamos los más importantes:</p>

<ul>
<li><strong>manage.py</strong> - no es parte de tu sitio dinámico sino un script que te permitirá ejecutar comandos desde la consola para gestionar el sitio. Ejemplo, sincronizar la base de datos.</li>
<li><strong>settings.py</strong> - contiene todas las variables de configuración que tu sitio va a necesitar. Django no usa XML en su configuración es puro Python.</li>
<li><strong>urls.py</strong> - es el archivo que maneja el mapa de las urls de tu sitio. Ejemplo, <strong>tusitio.com/nosotros</strong> se dirija a la vista de <strong>nosotros</strong> dentro del proyecto.</li>
</ul>

<hr />

<h2>Apps</h2>

<p>Ninguno de esos archivos hacen un sitio dinámico funcional. Por eso, es que necesitamos crear aplicaciones dentro del proyecto. Esas aplicaciones son las que nos van permitir crear la funcionalidad de nuestro blog, pero antes que veamos la manera de como crear una app, necesitamos entender los principios de diseño de Django.</p>

<p>Primero, Django es un <strong>MTV framework</strong>, en inglés Model Template View o en español Modelo Vista Plantilla. Posee un enfoque parecido a MVC, o en español Modelo Vista Controlador, pero en general son muy parecidos.</p>

<blockquote>
  <p>MVC es una arquitectura que provee una manera eficiente de como estructurar nuestros proyectos. Separa el código que es usado para procesar datos del código que maneja la interfaz de usuario.</p>
</blockquote>

<p>Segundo, Django posee una filosofía <strong>“No repitas lo que ya hiciste”</strong>, lo que significa que no debemos escribir código que realice una tarea más de una vez. Por ejemplo, en el blog que vamos a construir, si escribimos un método que seleccione un artículo de la lista de los artículos más leídos, y la implementamos en varias páginas de nuestro blog, no tendríamos que escribirla cada vez que la necesitamos porque ya estaría disponible para nosotros.</p>

<p><strong>¿Qué tiene que ver esto con apps dentro de Django?</strong>, Que esas apps funcionan con la misma filosofía. Cada proyecto que queramos crear puede hacer uso de esas apps, es decir, si la funcionalidad que mencionábamos antes estaba dentro de una app y queremos hacer uso de ella en otro proyecto diferente, lo único que tuviéramos que hacer es importar esa app al nuevo proyecto y voilà!, no tendríamos que escribirla de nuevo.</p>

<p>Veamos como creamos una app en la que podamos empezar a escribir las funcionalidades que va a contener nuestro blog:</p>

<pre>python2.7 mangage.py startapp blog
</pre>

<p>Como podemos observar, se ha creado una carpeta con el nombre de <strong>blog</strong> en la cual vamos a generar la funcionalidades del blog. Lo primero que necesitamos es entender como registrar y obtener la información con la cual nuestro sitio se va a nutrir, para eso es necesario echarle un ojo a los modelos.</p>

<hr />

<h2>Modelos</h2>

<p>Para poder generar un flujo de datos dentro de nuestra app, lo primero que necesitamos saber es que archivo es el que nos va a permitir acceder a nuestra base de datos. Dicho archivo es <code>models.py</code>.</p>

<blockquote>
  <p>Si alguna vez trabajaste con PHP, sabrás que para generar la base de datos, teníamos que hacer una serie de actividades tediosas, como crear un script con las estructuras, luego ejecutarlo en motor de la base de datos y así sucesivamente. En Django, es mucho más fácil!</p>
</blockquote>

<p>Lo único que tenemos que hacer es definir nuestra estructura de datos dentro de dicho archivo y Django se encargará de generar las estructuras por nosotros. Veamos como:</p>

<p>Dentro de <code>models.py</code>:</p>

<pre>from django.db import models
 
class Articulos(models.Model):
    autor = models.CharField(max_length = 30)
    titulo = models.CharField(max_length = 100)
    texto = models.TextField()
    fecha = models.DateTimeField()
</pre>

<p>Revisemos el código para saber que significa cada instrucción. Lo primero que encontramos es <code>from django.db import models</code>, lo que hace es importar desde las librerías de Django la clase modelo para que así podamos heredar de ella nuestras estructuras de datos. Segundo, <code>class Articulos(models.Model):</code>, genera una clase la cual va actuar como una tabla de base de datos dentro del proyecto. Tercero, tenemos que especificar que atributos son los que queremos guardar, en este caso, tenemos <strong>autor</strong> el cual va a ser un varchar de 30 caracteres, titulo un varchar de 100 caracteres, texto va a ser un campo de texto y fecha va a ser un campo tipo datetime dentro del la base de datos.</p>

<p>Ahora necesitamos que Django sincronice dichos modelos con la base de datos, pero antes que hagamos eso, debemos especificar en nuestro proyecto cual es la base de datos que vamos a usar. Para eso debemos modificar el archivo <code>settings.py</code>. Veamos como:</p>

<blockquote>
  <p>La base de datos que vamos a estar usando en nuestro proyecto va a ser <strong>MySQL</strong>, pero Django soporta varios tipos como por ejemplo <strong>Postgres</strong>, <strong>SqlLite3</strong> y <strong>Oracle</strong>.</p>
</blockquote>

<pre>DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql', # Add 'postgresql_psycopg2', 'postgresql', 'mysql', 'sqlite3' or 'oracle'.
        'NAME': 'primer_blog',                      # Or path to database file if using sqlite3.
        'USER': 'root',                      # Not used with sqlite3.
        'PASSWORD': 'root',                  # Not used with sqlite3.
        'HOST': '127.0.0.1',                      # Set to empty string for localhost. Not used with sqlite3.
        'PORT': '8889',                      # Set to empty string for default. Not used with sqlite3.
    }
}
</pre>

<p>Podemos observar que el engine o motor de base de datos que estoy usando es <code>django.db.backends.mysql</code> ya que como mencioné anteriormente vamos a usar <strong>MySql</strong>. El nombre de la base de datos va a ser <code>primer_blog</code>, el usuario y la clave de la base de datos va a ser <code>root</code>, respectivamente. El host es la dirección en donde esta ubicada la BD, en este caso, <code>127.0.0.1</code> y el puerto va a ser <code>8889</code>. Cabe destacar que esta configuración se adapta a mis credenciales para acceder a la base de datos que tengo configurada en mi máquina, las tuyas deberían coincidir con tu propia configuración.</p>

<p>Una vez que terminemos de modificar el archivo <code>settings.py</code>, debemos instalar el conector <strong>MySQLdb</strong>, el cual permitirá que Django (Python) se comunique con MySql sin ningún problema. Veamos como hacerlo:</p>

<pre>pip install MySQL-python
</pre>

<p>Lo último que nos queda por hacer, es sincronizar dicha base de datos para que Django generé las tablas por nosotros. Veamos como hacerlo:</p>

<pre>python2.7 manage.py syncdb
</pre>

<blockquote>
  <p>Cada vez que cambies tus modelos, deberás correr este comando para modificar la base de datos. Como es primera vez que ejecutas este comando, Django te preguntará si quieres crear un super-usuario, solo tipea <code>yes</code> y se configurará todo por ti.</p>
</blockquote>

<p>Una vez que la sincronización se ejecute, tendremos creada la base de datos que vamos a usar y la conexión entre nuestro proyecto en Django y MySql.</p>

<hr />

<h2>Conclusión</h2>

<p>En esta lección, aprendimos como crear un proyecto con Django, como crear modelos de base de datos y como hacer que sincronice y generé las tablas por nosotros. En el próximo capítulo, veremos como crear las vistas con los datos que tenemos guardados en la base de datos. Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso. Te espero la próxima semana!</p>
