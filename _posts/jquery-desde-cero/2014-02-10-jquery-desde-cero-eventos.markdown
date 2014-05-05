---
layout: post
status: publish
published: true
title: Eventos
author: Oscar González
author_login: oscar
author_email: gonzalezgreco@gmail.com
author_url: http://www.oscarvgg.com
wordpress_id: 2992
wordpress_url: http://codehero.co/?p=2992
date: 2014-02-10 00:00:10.000000000 -04:30
dificultad: Novato
duracion: 10
categories:
- Cursos
- jQuery
tags:
- jsbin
- mouse
- click
- hover
- over
- leave
---
<p>jQuery provee mecanismos para trabajar con eventos de una manera simple, abstrayendo las diferencias entre exploradores de internet. Esto hace que sea fácil asignar eventos a asignar maneadores de eventos a uno o varios elementos usando selectores y filtros.</p>

<hr />

<h2>Enlazando eventos</h2>

<p>jQuery permite enlazar o desenlazar maneadores de eventos a elementos del DOM sin tener que preocuparse por la implementación de cada explorador web.</p>

<p>En la siguiente página de la <a href="http://api.jquery.com/category/events/event-handler-attachment/">documentación de jQuery</a> se puede apreciar los distintos métodos que existen para adjuntar un evento a un manejador. Funciones como <code>bind()</code>, <code>unbind()</code>, <code>delegate()</code>, <code>live()</code>, están "deprecadas", es decir, serán reemplazadas en futuras versiones de jQuery ya que se introdujeron funciones nuevas de reemplazo. Las funciones <code>on()</code> y <code>off()</code>, son las que deberían utilizarse en cambio. Veamos el siguiente ejemplo en un jsBin:</p>

<p><a class="jsbin-embed" href="http://jsbin.com/woqut/1/embed?html,css,js,output">jQuery desde Cero</a> <script src="http://static.jsbin.com/js/embed.js"></script></p>

<p>En este ejemplo vemos como enlazamos los eventos "mouseover" y "mouseleave" a una función que cambia los colores, para cuando el cursor se coloca sobre el elemento y cuando el cursor sale del mismo respectivamente.</p>

<p>Vamos a agregar otro manejador de eventos para que cuando se haga click se elimine el evento.</p>

<p><a class="jsbin-embed" href="http://jsbin.com/godav/1/embed?html,css,js,output">jQuery desde Cero</a><script src="http://static.jsbin.com/js/embed.js"></script></p>

<hr />

<h2>Utilizando el objeto "Evento" de jQuery</h2>

<p>Utilizar el objeto <code>Event</code> facilita el trabajo unificando la implementación de cada explorador de los datos contenidos en el evento.</p>

<p>Las propiedades que podemos encontrar encapsuladas en este objeto son las siguientes:</p>

<ul>
<li><code>type</code>: El tipo de evento (click, mouseover, mouseleave, etc.)</li>
<li><code>target</code>: El elemento que disparó el evento.</li>
<li><code>data</code>: datos pasados al manejador del evento.</li>
<li><code>pageX</code> <code>pageY</code>: las coordenadas del cursor relativas al documento cuando se disparó el evento.</li>
<li><code>result</code>: valor retornado del ultimo manejador.</li>
<li><code>timestamp</code>: la hora en milisegundos en que ocurrió el evento.</li>
<li><code>preventDefault()</code>: evita que el explorador ejecute la acción por defecto para el evento.</li>
<li><code>isDefaultPrevented()</code>: retorna <code>false</code> si <code>preventDefault()</code> fue invocado alguna vez, <code>false</code> de lo contrario.</li>
<li><code>stopPropagation()</code>: evita que el explorador propague el evento a los elementos padres del elemento.</li>
<li><code>isPropagationStopped()</code>: retorna <code>false</code> si <code>stopPropagation()</code> fue invocado alguna vez, <code>false</code> de lo contrario.</li>
</ul>

<p>Vamos el siguiente ejemplo:</p>

<p><a class="jsbin-embed" href="http://jsbin.com/mejij/1/embed?html,js,output">jQuery desde Cero</a> <script src="http://static.jsbin.com/js/embed.js"></script></p>

<p>En el presente ejemplo disparamos el evento "mousemove" y utilizamos el objeto "Event" recibido en el manejador para mostrar las coordenadas del cursor en un div.</p>

<hr />

<h2>Conclusión</h2>

<p>En el presente tutorial aprendimos como conectar eventos a funciones y a obtener información importante del objeto Event de jQuery.</p>

<p>Si te ha parecido util esta ayuda, por favor compártela. Así ayudarás a que podamos llegar a más personas que la necesiten tal y como tu la necesitaste.</p>

<p>Como siempre cualquier duda que tengas, no pienses dos veces antes dejarla en la sección de comentarios de más abajo.</p>

<p>Hasta la próxima.</p>
