---
layout: post
status: publish
published: true
title: Introducción
author: Oscar González
author_login: oscar
author_email: gonzalezgreco@gmail.com
author_url: http://www.oscarvgg.com
wordpress_id: 2456
wordpress_url: http://codehero.co/?p=2456
date: 2013-10-28 00:05:33.000000000 -04:30
categories:
- jQuery
tags:
- javascript
- jquery
- introduccion
---
<p>Bienvenido a jQuery desde cero. En esta serie voy a enseñarte como ésta librería reduce al cantidad de código para desarrollar páginas web modernas, flexibles y que funcionan automáticamente en todos los exploradores.</p>

<hr />

<h2>¿Qué es jQuery?</h2>

<p>jQuery es una librería gratuita y open source, que simplifica la creación de páginas web altamente interactivas. Funciona en todos los exploradores de internet modernos y abstrae características especificas de cada uno de estos, permitiéndonos enforcarnos en el diseño y resultado final, en lugar de tratar de desarrollar funciones complejas en exploradores individuales.</p>

<p>Especificamente jQuery facilita:</p>

<ul>
<li>La búsqueda y manipulación de contenido en una página HTML;</li>
<li>Trabajar con el modelo de eventos de los exploradores modernos;</li>
<li>Y añadir efectos y transiciones sofisticadas que vemos en páginas modernas, como animaciones disparadas por eventos.</li>
</ul>

<hr />

<h2>Descargando jQuery</h2>

<p>Vamos a la página principal de la libreria, jquery.com, y hacemos click sobre el boton que dice "Download jQuery".</p>

<p><a href="http://codehero.co/oc-content/uploads/2013/10/Screen-Shot-2013-10-27-at-6.29.47-PM.png"><img src="http://i.imgur.com/TLMvpXih.png" alt="pagina de jquery" class="aligncenter size-full wp-image-2463" /></a></p>

<p>Al momento de esta escritura, existen 2 versiones de la librería para la descarga, la 1.10.2 y la 2.0.3. Ambas contienen el mismo API, la diferencia es que la versión 2 elimina el soporte para Internet Explorer 6, 7 y 8. Tu decides cual usar, si crees que tus usuarios todavía usan buscadores viejos como estos opta por la 1, si no, por la 2.</p>

<p><a href="http://codehero.co/oc-content/uploads/2013/10/Screen-Shot-2013-10-27-at-8.31.22-PM.png"><img src="http://i.imgur.com/nRp7vu3.png" alt="pagina descarga version de jquery" class="aligncenter size-full wp-image-2464" /></a></p>

<p>Dependiendo de cual versión hayas escogido, ahora debes seleccionar si quieres la versión de producción o de desarrollo. La de desarrollo, normalmente, la utilizas mientras estas construyendo tu página web, luego cuando ya esta estas listo para subirla a tu servidor web, usas la de producción. La razón de esto es que la versión de producción esta comprimida, por lo que es más rápida de cargar por los usuarios cuando visitan tu página.</p>

<p>Yo voy a descargar la versión 2.0.3 de producción. Si haces click, te darás cuenta que obtendrás una cantidad abrumadora de código ilegible. Esto es porque los exploradores no reconocen la extensión .js como un archivo descargable. Para obtener la librería debes volver a la página del link, hacer click derecho sobre el mismo y seleccionar "Guardar como...". Yo voy guardarla en una carpeta llamada "tutorial_jquery_1/javascript". Si no le cambiamos el nombre se debería descargar como "jquery-2.0.3.min.js", el .min nos indica que es la versión "minificada", es decir, de producción.</p>

<p><a href="http://codehero.co/oc-content/uploads/2013/10/Screen-Shot-2013-10-27-at-6.46.58-PM.png"><img src="http://i.imgur.com/nRp7vu3.png" alt="Descargando jquery" class="aligncenter size-full wp-image-2465" /></a></p>

<p>Bien, ahora que ya descargamos jQuery podemos proseguir a programar.</p>

<hr />

<h2>Creando una página simple con jQuery</h2>

<p>Normalmente, usando javascript, cuando queremos ejecutar código que corre cuando la página ya ha cargado lo hacermos de la siguiente manera:</p>

<pre><code>function pageLoaded() {

    alert("¡La página acaba de cargar!");

}

window.onLoad = pageLoaded;
</code></pre>

<p>El problema de esto es que el evento "onLoad" solo se dispara cuando todo el contenido de la página se ha cargado, incluyendo imágenes. Es decir, si tienes imágenes muy pesadas el código va a tardar en ejecutarse. Podrías detectar cuando carga el DOM (el código HTML de la página, basicamente), pero la manera de acerlo es distinta entre browsers.</p>

<p>jQuery provee una manera de correr código cuando el DOM de una página ya fue descargado y esta listo para ser utilizado, éste es el evento document.ready, y así es como se escribe el manejador para este evento:</p>

<pre><code>$("document").ready(function () {

    alert("¡La página acaba de cargar!");

});
</code></pre>

<p>El símbolo "$" indica que este es una sentencia de jQuery, puede ser reemplazada por la palabra "jQuery" pero lo común es usar el símbolo de dólar ya que es lo más corto.</p>

<p>En este pequeño bloque de código lo que hago es invocar el objeto jQuery con el parámetro "document" y le paso una función anónima para ser ejecutada cuando se dispare el evento "ready".</p>

<p>Ahora veamos como se integra esto en una página web. Abrimos nuestro editor de texto favorito (yo recomiendo <a href="http://www.sublimetext.com/">Sublime Text</a>) y creamos un archivo que yo voy a llamar "index.html" y lo guardamos en la carpeta "tutorial_jquery_1". Escribamos el siguiente código en el documento:</p>

<p><a href="http://codehero.co/oc-content/uploads/2013/10/Screen-Shot-2013-10-27-at-8.29.04-PM.png"><img src="http://i.imgur.com/DsfeEmc.png" alt="codigo html5 basico" class="aligncenter size-full wp-image-2466" /></a></p>

<p>Ésta es una típica plantilla html5. ahora en el Head incluimos la libreria:</p>

<p><a href="http://codehero.co/oc-content/uploads/2013/10/Screen-Shot-2013-10-27-at-8.28.48-PM.png"><img src="http://i.imgur.com/6mSllAj.png" alt="Incluyendo jquery en la pagina" class="aligncenter size-full wp-image-2467" /></a></p>

<p>Ahora solo tenemos que agregar la función document.ready:</p>

<p><a href="http://codehero.co/oc-content/uploads/2013/10/Screen-Shot-2013-10-27-at-8.28.21-PM.png"><img src="http://i.imgur.com/fjys2GC.png" alt="document ready en una pagina con jquery" class="aligncenter size-full wp-image-2468" /></a></p>

<p>Si abrimos este archivo en nuestro explorador de preferencia veremos como nos lanza una alerta con el mensaje "¡La página acaba de cargar!".</p>

<hr />

<h2>Conclusión</h2>

<p>En este primer capitulo de la serie, hemos aprendido como escribir nuestra primera página web utilizando jQuery.</p>

<p>Cualquier duda o comentario házlo saber en la sección de comentarios más abajo, con mucho gusto responderé tus inquietudes.</p>

<p>En el próximo capítulo te mostraré como empezar a obtener contenido de la página.</p>

<p>Sigue en sintonía de los tutoriales que ofrece Codehero.</p>

<p>Hasta la próxima.</p>
