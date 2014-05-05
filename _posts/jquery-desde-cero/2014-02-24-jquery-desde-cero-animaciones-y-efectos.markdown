---
layout: post
status: publish
published: true
title: Animaciones y Efectos
author: Oscar González
author_login: oscar
author_email: gonzalezgreco@gmail.com
author_url: http://www.oscarvgg.com
wordpress_id: 3053
wordpress_url: http://codehero.co/?p=3053
date: 2014-02-24 00:10:09.000000000 -04:30
dificultad: Aprendiz
duracion: 10
categories:
- Cursos
- jQuery
tags:
- desvanecer
- aparecer
- deslizar
- animar
---
<p>En este capítulo de jQuery desde cero aprenderemos a utilizar jQuery Fx, un conjunto de funciones incluidas en la librería para aplicar animaciones y efectos en nuestras páginas y aplicaciones web.</p>

<hr />

<h2>Mostrar y ocultar elementos</h2>

<p>Para mostrar y ocultar elementos del DOM, contamos con las funciones show y hide respectivamente.</p>

<ul>
<li><code>show()</code>: sirve para mostrar los elementos seleccionados si se encuentran ocultos.</li>
<li><code>hide()</code>: sirve para ocultar los elementos seleccionados si son visibles.</li>
</ul>

<p>Estas dos funciones pueden tomar dos parámetros opcionales, "speed" y "callback", uno para especificar el tiempo que debe durar la animación, y el otro una función que se llama cuando termina dicha animación.</p>

<ul>
<li><code>show(speed, callback)</code></li>
<li><code>hide(speed, callback)</code></li>
</ul>

<p>Usando la función toggle podemos mostrar u ocultar un elementos dependiendo de su estado.</p>

<ul>
<li><code>toggle()</code>: Si esta oculto se muestra y si es visible se oculta</li>
<li><code>toggle(switch)</code>: Si switch es true entonces muetra todos los elementos seleccionados, si es falso los oculta, esto facilita colocar varios elementos en el mismo estado de visibilidad en caso de seleccionar varios en distintos estados.</li>
<li><code>toggle(speed, callback)</code>: muestra u oculta con velocidad y/o llamada de operación completada.</li>
</ul>

<p><a class="jsbin-embed" href="http://jsbin.com/godav/3/embed?html,js,output">jQuery desde Cero</a><script src="http://static.jsbin.com/js/embed.js"></script></p>

<hr />

<h2>Desvanecer y aparecer gradualmente elementos</h2>

<p>La función <code>fade()</code> es aquella destinada a desvanecer y aparecer objetos, por completo o hasta un punto de opacidad especifico.</p>

<ul>
<li><code>fadeIn(speed, callback)</code>: aparece gradualmente elementos con un tiempo de duración y una llamada de vuelta.</li>
<li><code>fadeOut(speed, callback)</code>: desaparece gradualmente elementos con un tiempo de duración y una llamada de vuelta.</li>
<li><code>fadeTo(speed, opacity, callback)</code>: aparece o desaparece gradualmente elementos con un tiempo de duración, opacidad (valor de 0 a 1.0) y una llamada de vuelta.</li>
</ul>

<p><a class="jsbin-embed" href="http://jsbin.com/tihar/1/embed?html,js,output">jQuery desde Cero</a><script src="http://static.jsbin.com/js/embed.js"></script></p>

<hr />

<h2>Deslizando elementos</h2>

<p>Deslizar es otra manera de aparecer y desaparecer elementos del DOM, solo que esta vez con un efecto de deslizamiento.</p>

<ul>
<li><code>slideDown(speed, callback)</code>: revela elementos con un tiempo de duración y una llamada de vuelta.</li>
<li><code>slideUp(speed, callback)</code>: oculta elementos con un tiempo de duración y una llamada de vuelta.</li>
<li><code>slideToggle(speed, callback)</code>: revela u oculta elementos con un tiempo de duración y una llamada de vuelta.</li>
</ul>

<p><a class="jsbin-embed" href="http://jsbin.com/comep/1/embed?html,js,output">jQuery desde Cero</a><script src="http://static.jsbin.com/js/embed.js"></script></p>

<hr />

<h2>Animaciones personalizadas</h2>

<p>Si ninguna de las animaciones anteriores se ajusta a tus necesidades, puedes crear tus propias animaciones. Tu imaginación es el límite, literalmente.</p>

<ul>
<li><code>animate(parámetros, duración, easing, callback)</code>: realiza una animación de los parámetros especificados. 

<ul>
<li>Parametros: propiedades de los elementos a animar ("with", "height", "padding", etc).</li>
<li>Duración: tiempo en mili-segundos que debe extenderse la animación</li>
<li>easing: tipo de función de easing (linear o swing).</li>
<li>callback: función a llamar cuando la animación termina.</li>
</ul></li>
<li><code>animate(parámetros, opciones)</code>: Crea una animación personalizada con las propiedades a animar y las opciones que es un objeto con algunas de las opciones de la función anterior como propiedades.</li>
<li><code>stop()</code>: detiene todas las animaciones que estén corriendo en los elementos especificados.</li>
</ul>

<p><a class="jsbin-embed" href="http://jsbin.com/comep/1/embed?html,js,output">jQuery desde Cero</a><script src="http://static.jsbin.com/js/embed.js"></script></p>
