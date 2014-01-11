---
layout: post
status: publish
published: true
title: Selectores y Filtros Básicos
author: Oscar González
author_login: oscar
author_email: gonzalezgreco@gmail.com
author_url: http://www.oscarvgg.com
wordpress_id: 2571
wordpress_url: http://codehero.co/?p=2571
date: 2013-11-11 00:51:54.000000000 -04:30
categories:
- Cursos
- jQuery
tags:
- selectores
- filtros
---
<p>En este capítulo de jQuery desde cero voy a hablarles de los Selectores y los filtros.</p>

<hr />

<h2>Selectores</h2>

<p>Los selectores nos permiten obtener contenido del documento para poder manipularlo. Digamos que es la parte query de jQuery.</p>

<p>Al ser utilizados, los selectores retornan un array de objetos que coinciden con los criterios especificados. Este array no es un conjunto de objetos del DOM, más bien son objetos de Query con un gran número de funciones y propiedades predefinidas para realizar operaciones con los mismos.</p>

<h3>Simples</h3>

<p>Los selectores básicos están basados en la sintaxis de CSS y funcionan más o menos de la misma manera.</p>

<p>Algunos selectores básicos son:</p>

<p><a href="http://codehero.co/oc-content/uploads/2013/11/Screen-Shot-2013-11-11-at-12.38.25-AM.png"><img src="http://i.imgur.com/srKOjlt.png" alt="jquery desde cero - selectores basicos" class="aligncenter size-full wp-image-2574" /></a></p>

<p>Veamos unos ejemplos dada la siguiente página:</p>

<p><a href="http://codehero.co/oc-content/uploads/2013/11/Screen-Shot-2013-11-11-at-12.36.27-AM.png"><img src="http://i.imgur.com/YKemU4F.png" alt="jquery desde cero - html" class="aligncenter size-full wp-image-2573" /></a></p>

<p>Podemos obtener:</p>

<pre><code>// Obtener todas las etiquetas "p"
$('p');

// Obtener la etiqueta con id "list-1"
$('$list-1');

// Obtener todas las etiquetas con clase "b" que están dentro de un ul
$('ul .b');
</code></pre>

<h3>Compuestos</h3>

<p>Estos selectores permiten obtener objetos por jerarquía y combinación. Estos son:</p>

<p><a href="http://codehero.co/oc-content/uploads/2013/11/Screen-Shot-2013-11-11-at-12.35.58-AM.png"><img src="http://i.imgur.com/hAJ4BUw.png" alt="jquery desde cero - selectores avanzados" class="aligncenter size-full wp-image-2575" /></a></p>

<p>Utilizando el mismo HTML del ejemplo anterior, probemos algunos de estos selectores:</p>

<pre><code>// obtener todos los elementos "p" y todos los "li" que tengan la clase "b"
$('p, li.b');

// Obtener el elemento "p" que viene después de "ul"
$('ul + p');

// Obtener el elemento "p" que viene después de "ul"
$('ul + p');

// Obtener los hermanos del elemento "p" que viene después de "ul"
$('ul ~ p');
</code></pre>

<hr />

<h2>Filtros Básicos</h2>

<p>Los filtros mantienen la simplicidad de la sintaxis y se utilizan para proveer un mayor control sobre como los elementos son seleccionados en el documento.</p>

<p>Los filtros en jQuery vienen en 6 catagorias distintas: Básicos, Contenido, visibilidad, atributo, hijo, formulario. En este capítulo solo hablaremos de los básicos: estos permiten refinar un selector incluyendo elementos que cumplen con ciertas condiciones.</p>

<p><a href="http://codehero.co/oc-content/uploads/2013/11/Screen-Shot-2013-11-11-at-12.35.36-AM.png"><img src="http://i.imgur.com/zTuUnn1.png" alt="jquery desde cero - filtros basicos" class="aligncenter size-full wp-image-2576" /></a></p>

<p>Volviendo a utilizar el html que venimos trabajando desde el comienzo del capítulo, tenemos:</p>

<pre><code>// Obtener el primer elemento "p"
$("p:first");

// Obtener el último elemento p
$("p:last");

// Obtener los elementos "p" pares
$("p:even");

// Obtener los elementos "p" impares
$("p:odd")

//obtener el primer elementos que tenga la clase "a" aplicada
$(".a:first")

// obtener los elementos pares que tengan la clase "b" aplicada
$(".b:even")

// obtener todos los elementos que están después del indice 1
$("p:gt(1)")

// Obtener los elementos "p" menos el que esta en la posición 2
$("p:not(p:eq(2))")
</code></pre>

<hr />

<h2>Conclusión</h2>

<p>Eso es todo encanto a selectores y filtros básicos. Ahora es solo cuestión de jugar con ellos y combinarlos en todas las maneras que sea necesario.</p>

<p>No olvides dejar tus dudas y comentarios en la sección de más abajo.</p>

<p>Hasta la próxima.</p>
