---
layout: post
status: publish
published: true
title: Manipulando Contenido - parte 1
author: Oscar González
author_login: oscar
author_email: gonzalezgreco@gmail.com
author_url: http://www.oscarvgg.com
wordpress_id: 2910
wordpress_url: http://codehero.co/?p=2910
date: 2014-01-13 00:01:45.000000000 -04:30
serie: jQuery desde Cero
dificultad: Novato
duracion: 15
description: En el capítulo anterior estudiamos varias funciones para obtener contenido del documento, veamos ahora como podemos manipular el contenido obtenido.
categories:
- Cursos
- jQuery
tags:
- jquery
- contenido
- manipulacion
---
<p>En el capítulo anterior estudiamos varias funciones para obtener contenido del documento, veamos ahora como podemos manipular el contenido obtenido.</p>

<hr />

<h2>Introducción</h2>

<p>Cuando seleccionamos y filtramos contenido de una página web, lo hacemos normalmente porque queremos hacer algo con el. A veces queremos crear nuevo contenido y agregarlo dinámicamente a la página.</p>

<p>jQuery tiene funciones para crear, copiar, eliminar y moved contenido, incluso para envolver elementos dentro de otros. También provee soporte para trabajar con css.</p>

<hr />

<h2>Creando Contenido</h2>

<p>Podemos crear contenido HTML pasando como parámetro el código a la función <code>$()</code>.</p>

<p>Por ejemplo:</p>

```javascript
var p = $('<p>Nuevo Párrafo</p>');

// igualmente se puede
var htmlString = '<p>Nuevo Párrafo</p>';
var p = $(htmlString);

```

<p>Adicionalmente podemos usar los métodos html() y text() para obtener y asignar contenido:</p>

<ul>
<li><code>html()</code>: retorna el HTML contenido en el primer elemento seleccionado.</li>
<li><code>html(htmlString)</code>: le asigna el valor de la variable <code>htmlString</code> como contenido HTML a todos los elementos encontrados.</li>
<li><code>text()</code>: retorna el texto contenido en el primer elemento seleccionado.</li>
<li><code>text(htmlString)</code>: le asigna el valor de la variable <code>htmlString</code> como texto a todos los elementos encontrados.</li>
</ul>

<p>Si pasamos HTML la función <code>text()</code>, el código será escapado y mostrado como texto.</p>

<p>Por ejemplo, partiendo del siguiente HTML:</p>

```javascript
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Prueba jQuery</title>

  <script type="text/javascript" src="javascript/jquery-2.0.3.min.js"></script>

</head>
<body>
  <ul class="avengers">
    <li>Ironman</li>
    <li>Thor</li>
    <li>Captain America</li>
    <li>Hulk</li>
  </ul>
</body>
</html>
```

<p>Apliquemos el siguiente javascript:</p>

```javascript
<script type="text/javascript">

   $('document').ready(function() {

     $('.avengers').html('<li>Black Widow</li>');

   });

</script>
```

<p>Este código selecciona el elemento con la clase "avengers", y reemplaza su contenido HTML por <code><li>Black Widow</li></code>.</p>

<p>Podemos también crear un elementos primero y luego asignarlo:</p>

```javascript
<script type="text/javascript">

   $('document').ready(function() {

     var blackWidow = $('<li>Black Widow</li>');

     $('.avengers').html(blackWidow.html());

   });

</script>
```

<hr />

<h2>Manipulando Atributos</h2>

<p>jQuery permite la manipulación de atributos de uno o varios elementos HTML mediante las siguientes funciones:</p>

<ul>
<li><code>attr(nombre)</code>: Retorna el valor del atributo "nombre" del elemento seleccionado.</li>
<li><code>attr({nombre: valor})</code>: Asigna varios atributos del elemento seleccionado. Para asignar los atributos se usa la notación de objeto de javascript (JSON). </li>
<li><code>attr(nombre, valor)</code>: Asigna "valor" al atributo "nombre" del elemento seleccionado.</li>
<li><code>removeAttr(nombre)</code>: Elimina el atributo "nombre" del elemento seleccionado.</li>
</ul>

<p>Veamos un ejemplo partiendo del siguiente HTML:</p>

```javascript
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Prueba jQuery</title>

  <script type="text/javascript" src="javascript/jquery-2.0.3.min.js"></script>

</head>
<body>
  <h1>The Avengers</h1>

  <img src="http://upload.wikimedia.org/wikipedia/en/0/0f/Avs38.jpg"></img>

  </br>

  <a href="#">Ver en Wikipedia</a>

</body>
</html>
```

```javascript
<script type="text/javascript">

  $('document').ready(function() {

    $('a').attr('href', 'http://en.wikipedia.org/wiki/Avengers_(comics)');

  });

</script>
```

<p>Con esto asignamos una dirección al link en la página.</p>

```javascript
<script type="text/javascript">

  $('document').ready(function() {

    $('img').attr('alt', 'portada de los avengers');

  });

</script>
```

<p>Ahora aquí agregamos un <code>alt</code> a la imagen.</p>

```javascript
<script type="text/javascript">

  $('document').ready(function() {

    $('img').attr({
      src: 'http://upload.wikimedia.org/wikipedia/en/f/f9/TheAvengers2012Poster.jpg',
      alt: 'Poster de Avengers, la pelicula'
    });

    $('a').removeAttr('href');

  });

</script>
```

<p>Asignamos un nuevo <code>source</code> y <code>alt</code> a la imagen, y eliminamos el <code>href</code> del link.</p>

<hr />

<h2>Insertando Contenido</h2>

<p>Las siguientes funciones son las propuestas por jQuery para agregar contenido a los elementos seleccionados:</p>

<ul>
<li><code>append(contenido)</code>: agrega el contenido dentro del los elementos seleccionados.</li>
<li><code>appendTo(selector)</code>: agrega el contenido a otros elementos especificados.</li>
<li><code>prepend(contenido)</code>: agrega el contenido de primero dentro de los elementos seleccionados.</li>
<li><code>prependTo(selector)</code>: agrega el contenido de primero a otros elementos especificados.</li>
<li><code>after(contenido)</code>: agrega el contenido después del elemento seleccionado.</li>
<li><code>before(contenido)</code>: agrega el contenido antes del elemento seleccionado.</li>
<li><code>insertAfter(selector)</code>: agrega el contenido después de otros elementos elementos seleccionados.</li>
<li><code>insertBefore(contenido)</code>: agrega el contenido antes de otros elementos elementos seleccionados.</li>
</ul>

<p>Entonces, partiendo del siguiente HTML:</p>

```javascript
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Prueba jQuery</title>

  <script type="text/javascript" src="javascript/jquery-2.0.3.min.js"></script>

</head>
<body>
  <h1>The Avengers</h1>
  <ul class="avengers">
    <li>Ironman</li>
    <li>Thor</li>
    <li>Captain America</li>
    <li>Hulk</li>
  </ul>
</body>
</html>
```

<p>Ejecutemos algunos ejemplos:</p>

```javascript
<script type="text/javascript">

  $('document').ready(function() {

    $('.avengers').append('<li>Black Widow</li>');

  });

</script>
```

<p>Aquí agregamos un elemento al final la lista.</p>

```javascript
<script type="text/javascript">

  $('document').ready(function() {

    $('.avengers').prepend('<li>Black Widow</li>');

  });

</script>
```

<p>Se agrega al principio de la lista.</p>

```javascript
<script type="text/javascript">

  $('document').ready(function() {

    $('h1').appendTo('li:first');

  });

</script>
```

<p>Agregamos el titulo de lao página (h1) al primer elemento de la lista.</p>

<hr />

<h2>Conclusión</h2>

<p>Aún quedan un par de temas por tocar, como lo son envolver, reemplazar, remover elementos y manipular su CSS. Estos puntos los estaremos desarrollando en el próximo capítulo.</p>

<p>Saludos y hasta la próxima.</p>
