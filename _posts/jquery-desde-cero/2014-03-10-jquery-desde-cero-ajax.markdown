---
layout: post
status: publish
published: true
title: AJAX
author: Oscar González
author_login: oscar
author_email: gonzalezgreco@gmail.com
author_url: http://www.oscarvgg.com
wordpress_id: 3108
wordpress_url: http://codehero.co/?p=3108
date: 2014-03-10 00:00:13.000000000 -04:30
dificultad: Aprendiz
duracion: 10
categories:
- Cursos
- jQuery
tags:
- asíncrono
---
<p>AJAX significa Asynchronous JavaScript and XML. Esta tecnología nos permite comunicarnos con un servicio web sin tener que recargar la página. A pesar de que su nombre lo dice, XML no es requerido para usar AJAX, de hecho, se utiliza JSON más seguido.</p>

<p>Con jQuery, hacer uso de AJAX es muy sencillo. Para demostrarlo, estaré utilizando la web API de Open Weather Map (http://openweathermap.org/), a la cual haré algunas solicitudes utilizando AJAX y jQuery.</p>

<p>Comencemos.</p>

<hr />

<h2>Obteniendo datos</h2>

<p>jQuery provee varias funciones para trabajar con AJAX. La más comúnmente usada <code>$.ajax()</code>. Pero ya hablare de algunas otras.</p>

<p><a class="jsbin-embed" href="http://jsbin.com/gekel/1/embed?html,output">jQuery Ajax</a><script src="http://static.jsbin.com/js/embed.js"></script></p>

<p>El presente ejemplo hace uso de jQuery AJAX para obtener un objeto json de la dirección "http://api.openweathermap.org/data/2.1/weather/city/caracas?type=json" con los datos del clima de la ciudad de Caracas. Revisemos los parámetros pasados a la función AJAX:</p>

<ul>
<li><strong>url</strong>: La dirección a donde enviar la solicitud.</li>
<li><strong>type</strong>: Tipo de request (solicitud). Ejemplo: GET, POST, PUT, DELETE, etc. En caso de utilizar POST o PUT, por ejemplo, se puede enviar un objeto en otro parámetro a la misma función llamado data. Ej: <code>data: {'clave': 'valor'},</code>.</li>
<li><strong>datatype</strong>: El tipo de respuesta que se espera, en este caso es json.</li>
</ul>

<p>En este ejemplo pasé a la función AJAX 2 funciones: success y error; Estas son llamadas cuando el request fue exitoso o falló respectivamente.</p>

<hr />

<h2>Atajos</h2>

<p>Adicionalmente a la función AJAX, jQuery provee otras funciones para usos más específicos y ahorrarnos escribir unas cuantas lineas de código.</p>

<h3>$.get()</h3>

<p><code>$.get()</code> realiza una llamada GET a una dirección especifica:</p>

<pre lang="javascript">$.get( "http://myURL.com/", function() {
    alert( "Funcionó" );
  })
  .done(function() {
    alert( "También sirve para saber que funcionó" );
  })
  .fail(function() {
    alert( "Ha ocurrido un error" );
  });
</pre>

<p>La función <code>$.get()</code> solo provee una función una función para saber que la operación fue exitosa. Esto es mas o menos equivalente a:</p>

<pre lang="javascript">$.ajax({
  url: "http://myURL.com/",
  type: 'GET',
  success: function() {
    alert( "Funcionó" );
  },
  error: function() {
    alert( "Ha ocurrido un error" );
  }
});
</pre>

<h3>$.getJSON()</h3>

<p>Esta es muy similar a la anterior, solo que es especifica para cuando se espera una respuesta tipo json.</p>

<p>En caso de esperar jsonp, se debe agregar 'callback=?' a la url:</p>

<pre lang="javascript">$.getJSON( "http://api.openweathermap.org/data/2.1/weather/city/caracas?callback=?", function() {
  alert( "Exito" );
});
</pre>

<pre lang="javascript">$.ajax({
  url: "http://api.openweathermap.org/data/2.1/weather/city/caracas",
  type: 'GET',
  dataType: 'jsonp',
  success: function() {
    alert( "Exito" );
  }
});
</pre>

<h3>$.getScript()</h3>

<p>Carga un un archivo Javascript de una dirección especifica.</p>

<pre lang="javascript">$.getScript( "http://myURL.com/ajax/myScript.js", function( data, textStatus, jqxhr ) {
  alert( "Exito" );
});
</pre>

<p>Es equivalente a:</p>

<pre lang="javascript">$.ajax({
  url: "http://myURL.com/ajax/myScript.js",
  dataType: "script",
  success: function( data, textStatus, jqxhr ) {
    alert( "Exito" );
  }
});
</pre>

<h3>$.post()</h3>

<p>Realiza una llamada POST a una dirección URL:</p>

<pre lang="javascript">$.post( "http://myURL.com/usuario", {'nombre': 'Oscar'}, function( data, textStatus, jqxhr ) {
  alert( "Exito" );
});
</pre>

<p>Esta función puede recibir como parámetro un objeto con los valores a enviar.</p>

<p>Es equivalente a:</p>

<pre lang="javascript">$.ajax({
  url: "http://myURL.com/usuario",
  type: "POST",
  success: function( data, textStatus, jqxhr ) {
    alert( "Exito" );
  }
});
</pre>

<h3>$.load()</h3>

<p>Carga una dirección url y coloca los datos retornados en los elementos seleccionados (Con un ejemplo se entenderá mejor...).</p>

<pre lang="javascript">$('body').load( "http://myURL.com/public/prueba.txt" );
</pre>

<p>El contenido del archivo "prueba.txt" sera agregado al body de la página web.</p>

<hr />

<h2>Eventos Globales</h2>

<p>Por último, jQuery ofrece una serie de funciones que responden a eventos de AJAX. Estas funciones no deben ser invocadas manualmente, se invocan automáticamente cuando se dispara su evento correspondiente.</p>

<h3>$.ajaxComplete()</h3>

<p>Es llamada cuando una función AJAX es completada</p>

<pre lang="javascript">$( document ).ajaxComplete(function() {
  alert('Ajax completado');
});
</pre>

<p>Si se necesita saber de que url viene:</p>

<pre lang="javascript">$( document ).ajaxComplete(function( event, xhr, settings ) {
  alert('Ajax completado desde ' + settings.url);
});
</pre>

<h3>$.ajaxError()</h3>

<p>Es llamada cuando una función AJAX es completada pero con errores</p>

<pre lang="javascript">$( document ).ajaxError(function() {
  alert('Ajax Error');
});
</pre>

<h3>$.ajaxSend()</h3>

<p>Se invoca cuando un AJAX es enviado</p>

<pre lang="javascript">$( document ).ajaxSend(function() {
  alert('Ajax enviado');
});
</pre>

<h3>$.ajaxStart()</h3>

<p>jQuery lleva un control de todas las llamadas AJAX que ejecutas. Si ninguna esta en curso esta función es invocada.</p>

<pre lang="javascript">$( document ).ajaxStart(function() {
  alert('Ajax Iniciando');
});
</pre>

<h3>$.ajaxStop()</h3>

<p>Esta se invoca cada vez que una función AJAX es completada y aún quedan otras en curso. Incluso es invocada cuando la última función AJAX es cancelada.</p>

<pre lang="javascript">$( document ).ajaxStop(function() {
  alert('Ajax Stop');
});
</pre>

<h3>$.ajaxSuccess()</h3>

<p>Este es invocado cuando una función AJAX termina exitosamente.</p>

<pre lang="javascript">$( document ).ajaxSuccess(function() {
  alert('Ajax Exitoso');
});
</pre>

<hr />

<h2>Conclusión</h2>

<p>Con esto completamos esta serie sobre jQuery.</p>

<p>Gracias por leer y seguiré atendiendo sus dudas por la sección de comentarios de más abajo.</p>

<p>Si esta información ha sido util, compártela en las redes sociales y ayudamos a llegar a otras personas que podrían necesitarnos.</p>

<p>Hasta pronto.</p>
