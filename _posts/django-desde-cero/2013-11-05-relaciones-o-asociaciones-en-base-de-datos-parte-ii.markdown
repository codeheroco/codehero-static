---
layout: post
status: publish
published: true
title: Relaciones o Asociaciones en Base de Datos (Parte II)
author: Carlos Picca
author_login: carlos
author_email: carlospicca@gmail.com
wordpress_id: 2551
wordpress_url: http://codehero.co/?p=2551
date: 2013-11-05 22:52:07.000000000 -04:30
categories:
- Cursos
- Django
tags:
- Django
- curso
- Base de datos
- Asociaciones
- relaciones
- platillas
---
<p>Bienvenidos una vez más a Django desde Cero, curso en el cual aprendemos a programar sin conocimiento alguno. En el capítulo anterior, te enseñe como crear asociaciones en las bases de datos con la ayuda de Django, como crear el formulario para rellenar dicha asociación, como definir el url que nos va ayudar a crear las asociaciones y finalmente como crear la vista la cual va a procesar la información que guardemos en dicho formulario. Si eres nuevo en este curso, te recomiendo que le eches un vistazo al capítulo anterior para que te pongas en contexto (<a href="http://codehero.co/django-desde-cero-relaciones-o-asociaciones-en-base-de-datos-parte-i/">Capítulo 8 - Relaciones o Asociaciones en Base de Datos (Parte I)</a>)</p>

<p>Hoy, vamos a ver como crear el template o la plantilla necesaria para crear el comentario, agregaremos un botón el cual nos va a permitir desde el artículo agregar los comentarios y por último, veremos como desplegar todos los comentarios disponible dentro de un artículo.</p>

<div class="alert alert-info">
  <h4>
    ¡Alerta!
  </h4> Todos los ejemplos usados en el tutorial de son una continuación de los ejemplos del capitulo anterior.
</div>

<hr />

<h2>¿Como crear la plantilla para mostrar una asociación o relación de base de datos en Django?</h2>

<p>Lo primero que tenemos que hacer es crear un formulario donde nuestros usuarios puedan generar los comentarios de cada <strong>articulo</strong>. Para realizar dicho formulario nos vamos a ayudar de las plantillas o templates de Django. Veamos como hacerlo:</p>

<p>Generemos el archivo <code>agregar_comentario.html</code> dentro de la carpeta de <code>templates</code> (la carpeta <em>templates</em> esta ubicada dentro de la app <strong>blog</strong> que creamos anteriormente) y agreguemos el siguiente código:</p>

<pre></pre>

<blockquote>
  <p>Observemos los siguiente:</p>

  <ul>
  <li>La plantilla va a contener un <strong>form</strong> sencillo en html.</li>
  <li>La acción del formulario debe ir hacia el url que creamos anteriormente para que la vista pueda aplicar la lógica que generamos en la <a href="http://codehero.co/django-desde-cero-relaciones-o-asociaciones-en-base-de-datos-parte-i/">parte I</a> </li>
  <li>Vamos a desplegar el formulario <strong>ComentarioForm</strong> con la ayuda de <code>form.as_ul</code>.</li>
  </ul>
</blockquote>

<p>Si no sabes como manejar los formularios dentro de Django te recomiendo que le eches un ojo a <a href="http://codehero.co/django-desde-cero-formularios-forms/">Formularios en Django</a>.</p>

<hr />

<h2>¿Como mostramos y agregamos los comentarios a un articulo?</h2>

<p>Sencillo, para mostrar los comentarios disponibles dentro de un articulo es necesario crear un bucle el cual muestre todos los comentarios disponibles dentro de la plantilla del articulo. Veamos como hacerlo:</p>

<p>Debemos agregar el siguiente código al archivo <code>agregar_comentario.html</code>:</p>

<pre><h2>
  Comentarios Disponibles
</h2>
{% raw %}
{% for c in articulo.comentario_set.all %}


<p>
  {{ c.nombre}}: {{c.cuerpo}}
</p>
{% endfor %}
{% raw %}
</pre>

<blockquote>
  <p>Observemos que con <code>{% raw %}{% for c in articulo.comentario_set.all %}{% endraw %}</code> estamos creando un bucle el cual va a recorrer todos los comentarios dentro del articulo. Con <code>{% raw %}<p>{{ c.nombre}}: {{c.cuerpo}}</p>{% endraw %}</code> imprimimos el nombre y el cuerpo del comentario.</p>
</blockquote>

<p>Para poder agregar los comentarios en un articulo es necesario crear un link que nos permita llegar desde la plantilla del <code>articulo.html</code> hasta la plantilla de <code>agregar_comentario.html</code>. Veamos como hacerlo:</p>

<p>Debemos agregar el siguiente código al archivo <code>agregar_comentario.html</code>:</p>

<pre><p>
  <a href="/articulos/agregar_comentario/{{ articulo.id }}">Agregar Comentario</a>
</p>
</pre>

<blockquote>
  <p>Observemos que en la dirección de la pagina que el navegador debe buscar le estamos pasando el id del <strong>articulo</strong> para que la vista sepa o reconozca de que articulo en particular estamos hablando. El id se lo pasamos con <code>{% raw %}{{ articulo.id }}{% endraw %}</code>.</p>
</blockquote>

<p>Si no sabes como manejar las vistas dentro de Django te recomiendo que le eches un ojo a <a href="http://codehero.co/django-desde-cero-formularios-forms/">Vistas en Django</a>.</p>

<hr />

<h2>Probemos</h2>

<p>Para probar encendamos el server y naveguemos hasta un articulo en particular dentro de nuestros site:</p>

<p><img src="http://i.imgur.com/OMTJaWR.png" alt="agregar-comentario-django" /></p>

<blockquote>
  <p>Podemos observar que no poseemos ningún comentario disponible y que aparece el link para agregar un comentario.</p>
</blockquote>

<p>Si queremos agregar un comentario hacemos click en <em>Agregar Comentario</em> y nos debe salir lo siguiente:</p>

<p><img src="http://i.imgur.com/USddVpl.png" alt="comentario-django" /></p>

<p>Una vez que hayamos guardado el comentario o vamos a poder observar disponible en el articulo:</p>

<p><img src="http://i.imgur.com/sAx7XHK.png" alt="articulo-comentario-django" /></p>

<p>Por último, puedes encontrar el código de toda la serie en el repositorio git que esta al principio del tutorial.</p>

<hr />

<h2>Conclusión</h2>

<p>En esta lección, aprendimos como crear el template o la plantilla necesaria para crear el comentario, agregaremos un botón el cual nos va a permitir desde el artículo agregar los comentarios y por último, veremos como desplegar todos los comentarios disponible dentro de un artículo. Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso.</p>

<p>Nos vemos en la próxima serie de Django, <strong>¡Django Avanzado!</strong></p>

<p><em>¡Hasta entonces...!</em></p>
