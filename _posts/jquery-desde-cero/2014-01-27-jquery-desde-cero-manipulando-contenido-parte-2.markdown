---
layout: post
status: publish
published: true
title: Manipulando Contenido - parte 2
author: Oscar González
author_login: oscar
author_email: gonzalezgreco@gmail.com
author_url: http://www.oscarvgg.com
wordpress_id: 2950
wordpress_url: http://codehero.co/?p=2950
date: 2014-01-27 01:31:58.000000000 -04:30
serie: jQuery desde Cero
dificultad: Novato
duracion: 10
description: Veamos ahora otro grupo de operaciones que nos permiten envolver, copiar y reemplazar contenido, además de algunas otras que involucran css.
categories:
- Cursos
- jQuery
tags:
- javascript
- contenido
- css
---
<p>Ya hemos visto como crear, obtener, y asignar contenido, manipular atributos, insertar contenido. Ahora veamos otro grupo de operaciones que nos permiten envolver, copiar y reemplazar contenido, además de algunas otras que involucran css.</p>

<hr />

<h2>Envolviendo contenido</h2>

<p>Envolver contenido significa introducir un elemento seleccionado, dentro de otro nuevo. Para eso contamos con las siguientes funciones:</p>

<ul>
<li><code>wrap(html)</code>: Envuelve cada elemento seleccionado con el html especificado.</li>
<li><code>wrap(elemento)</code>: Envuelve cada elemento seleccionado con el elemento especificado. </li>
<li><code>wrapAll(html)</code>: Envuelve el grupo de elementos seleccionados con el html especificado. </li>
<li><code>wrapAll(elemento)</code>: Envuelve el grupo de elementos seleccionados con el elemento especificado. </li>
<li><code>wrapInner(html)</code>: Envuelve los elementos hijos de cada elemento seleccionado con el html especificado. </li>
<li><code>wrapInner(elemento)</code>: Envuelve los elementos hijos de cada elemento seleccionado con el elemento especificado.</li>
</ul>

<p>Hagamos unas pruebas dado el siguiente html:</p>

<pre>
<!doctype html>
<html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>jQuery desde Cero</title>

      <script type="text/javascript" src="http://code.jquery.com/jquery-2.0.3.min.js"></script>

    </head>
    <body>

      <ul class="avengers">
        <li>Ironman</li>
        <li>Thor</li>
        <li>Captain America</li>
        <li>Hulk</li>
      </ul>

      <p>texto de prueba</p>
      <p>texto de prueba 2</p>
      <p>texto de prueba 3</p>
      <p>texto de prueba 4</p>

    </body>
</html>
</pre>

<p>En este ejemplo envolvemos todos los elementos "p" (párrafo) y los envolvemos en un "div" con borde de color rojo.</p>

<pre>
$('document').ready(function() {

  $('p').wrapAll('<div style="border:3px solid red"></div>');

});
</pre>

<p>También podemos seleccionar el elemento que tenga la clase de css "avengers" y envolverla con el mismo "div".</p>

<pre>
$('document').ready(function() {

  $('.avengers').wrap('<div style="border:3px solid red"></div>');

});
</pre>

<h2>Reemplazando contenido</h2>

<p>Con jQuery también podemos reemplazar contenido. Esto significa que podemos cambiar el contenido de un elemento por otro nuevo designado arbitrariamente. Para esto contamos con las siguiente funciones:</p>

<ul>
<li><code>replaceWith(contenido)</code>: Reemplaza el elemento seleccionado con el contenido de parámetro.</li>
<li><code>replaceAll(selector)</code>: Reemplaza todos los elementos seleccionados con los elementos buscados.</li>
</ul>

<p>Por ejemplo, Seleccionaré el primer "li" del "ul" de clase "avengers" y lo reemplazaré por otro:</p>

<pre>
$('document').ready(function() {

  $('.avengers li').first().replaceWith('<li>Ironman reemplazado por Oscar</li>');

});
</pre>

<p>Ahora voy a reemplazar los elementos seleccionados con los buscados.</p>

<pre>
$('document').ready(function() {

  $('<p>nadie</p>').replaceAll('.avengers li');

});
</pre>

<h2>Vaciando y removiendo elementos</h2>

<p>Con la función <code>empty</code> vaciamos y con la función <code>remove</code> removemos, muy revelador.</p>

<p>Eliminemos el primer "li" del "ul":</p>

<pre>
$('document').ready(function() {

  // debería desaparecer "ironman"
  $('.avengers li').first().remove();

});
</pre>

<p>Vaciemos el "ul" con la clase "avengers":</p>

<pre>
$('document').ready(function() {

  // debería eliminar todos los avengers de la lista
  $('.avengers').empty();

});
</pre>

<h2>Clonando elementos</h2>

<p>La función <code>clone</code> copia elementos y los retorna, de modo que se puede agregar otro elemento al DOM idéntico al orinal.</p>

<p>Clonemos a "ironman" en la lista con clase "avengers":</p>

<pre>
$('document').ready(function() {

  // debería haber 2 ironmans
  $('.avengers li').first().clone().prependTo(.avengers);

});
</pre>

<p>En este ejemplo encadené toda la sentencia. De modo que cloné y agregué en un solo paso.</p>

<h2>Trabajando con CSS</h2>

<p>Las funciones de css nos permiten agregar propiedades de estilo a los elementos seleccionados del DOM. Para ello contamos con las siguientes funciones:</p>

<ul>
<li><code>css('nombre')</code>: Retorna el valor de la propiedad css llamada "nombre" elemento seleccionado.</li>
<li><code>css(propiedades)</code>: Asigna un conjunto de propiedades css enviadas en un objeto de javascript.</li>
<li><code>css(propiedad, valor)</code>: Asigna "valor" la "propiedad" del elemento seleccionado.</li>
</ul>

<pre>
$('document').ready(function() {

  $('p').first().css({
    'border': '3px solid green',
    'background-color': 'blue'
  });

});
</pre>

<p>También tenemos funciones para gestionar clases de css:</p>

<ul>
<li><code>addClass('clase')</code>: Agrega la "clase" a cada elemento seleccionado.</li>
<li><code>hasClass('clase')</code>: Retorna <code>true</code> o <code>false</code> si tiene o no tiene la clase propuesta.</li>
<li><code>removeClass('class')</code>: Elimina la "clase".</li>
<li><code>toggleClass('clase')</code>: Agrega la "clase" si no esta presente en el elemento o la elimina en caso de estar presente.</li>
<li><code>toggleClass('clase')</code>: Agrega la "clase" si no esta presente en el elemento o la elimina en caso de estar presente.</li>
</ul>

<pre>
$('document').ready(function() {

  // debería quitarle la clase avengers al elemento "ul"
  $('ul').toggleClass('avengers');

});
</pre>

<h2>Conclusión</h2>

<p>En este tutorial hemos aprendido los puntos destacados que faltaban sobre la manipulación de contenido.</p>

<p>En próximos capítulos estaremos hablando sobre eventos, animaciones, efectos, etc.</p>

<p>Sigue aprendiendo más con Codehero y colabora con la expansión de la comunidad. Comparte este artículo si te parece si te parece útil, comenta si tienes dudas o quieres aportar algo.</p>

<p>Saludos y hasta la próxima.</p>
