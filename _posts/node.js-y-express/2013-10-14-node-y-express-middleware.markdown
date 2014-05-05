---
layout: post
status: publish
published: true
title: Middleware
author: Oscar González
author_login: oscar
author_email: gonzalezgreco@gmail.com
author_url: http://www.oscarvgg.com
wordpress_id: 2391
wordpress_url: http://codehero.co/?p=2391
date: 2013-10-14 00:00:54.000000000 -04:30
serie: Node.js y Express
dificultad: Novato
duracion: 10
description: Middleware: En Node.js el Middleware es todo lo que ocurre desde que sale una solicitud en lado del cliente hasta que llega a nuestra lógica de la ruta en el servidor
categories:
- Cursos
- Node.js
tags: []
---
<p>En Node.js el middleware es todo lo que ocurre desde que sale una solicitud en lado del cliente hasta que llega a nuestra lógica de la ruta en el servidor. Hoy voy a estar profundizando en este tema para una mejor comprensión.</p>

<hr />

<h2>Configuración</h2>

<p>En todo framework de desarrollo siempre hay un poco de configuración que podemos hacer para trabajar. Cuando hemos usado <code>app.set</code> estamos configurando Node para algún fin.</p>

<p>Algunos comandos de configuración que podemos usar que hasta ahora no se han mencionado son los siguientes:</p>

<pre>// app.js

app.set('view cache', true);
</pre>

<p>Este comando habilita el cacheo de las vistas, esto no nos convendría en un habiente de desarrollo si en uno de producción.</p>

<p>Cuando estas variables de configuración solo aceptan valores "true" o "false" podemos hacer uso del método <code>enable</code> o <code>disable</code>.</p>

<pre>app.enable('view cache');
</pre>

<p>Y esto sería exactamente igual al bloque de código anterior.</p>

<p>Hasta ahora solo hemos utilizado propiedades que son propias de Express, pero también podemos usar <code>set</code> para asignar cualquier propiedad inventada por nosotros:</p>

<pre>app.set('color themes', true);
</pre>

<p>Esta propiedad que acabo de inventar podría ser para mostrar distintos colores en mi interfaz dependiendo de la fecha actual, por ejemplo.</p>

<hr />

<h2>Middleware</h2>

<p>El framework Express esta construido sobre Connect, otro framework desarrollado por <a href="www.senchalabs.org">Sencha Labs</a> que permite el uso de middleware en Node.js.</p>

<h3>bodyParser</h3>

<p>Cuando hemos usado <code>app.use(express.bodyParser());</code> estamos haciendo uso del middleware. Con esta linea de código decimos que antes de que llegue el mensaje enviado desde el cliente hasta nuestra ruta, sea analizado el contenido del body para poder ser utilizado.</p>

<h3>methodOverride</h3>

<p>Otro middleware que podemos utilizar es <code>app.use(express.methodOverride());</code>. Los browser como tal no pueden hacer requests de tipo PUT o DELETE, solo GET y POST. con 'express.methodOverride' hacemos posible el soporte de requests tipo PUT o DELETE agregando un campo de tipo 'hidden' a nuestro formulario para que pueda ser manejada por nuestras rutas de put o delete.</p>

<p>Por ejemplo:</p>

<p>Nuestro formulario debe tener un campo como este:</p>

<pre><code>// form.html

&lt;form action='/updateUser'&gt; ...
  &lt;input type="hidden" name="_method" value="put" /&gt;
&lt;/form&gt;
</code></pre>

<p>Para que pueda ser llamada la siguiente ruta en el servidor:</p>

<pre>app.put('/updateUser', function (req, res, next) {
  // Codigo aqui
});
</pre>

<h3>static</h3>

<p>También tenemos un middleware llamado <code>static</code>. Este permite el envío de archivos estáticos desde el servidor, como css, javascripts, imágenes, etc. Se invoca mendiante la siguiente linea de código: <code>app.use(express.static(__dirname + 'public'));</code>, si tuviéramos una carpeta dentro del proyecto llamada "public" entonces Node buscaría todos nuestros archivos estáticos ahí.</p>

<p>Esta propiedad debería ser llamada de última en nuestra lista de propiedades ("app.use") ya que podría sobreescribir alguna de nuestras rutas. Por ejemplo, si alguna de nuestras rutas se llama "public/archivo.css" y tenemos también un archivo en esa ruta entonces el archivo se descargaría automáticamente desde el servidor y nunca se ejecutaría el código de nuestra ruta, es por eso que debe ir al final, porque nosotros queremos que tenga prioridad la lógica de ruta.</p>

<h3>Otros middleware</h3>

<p>En el repositorio de github de Connect podemos encontrar los otros plugins de middleware que podemos utilizar. Aquí dejo la lista completa:</p>

<ul>
<li>basicAuth</li>
<li>bodyParser</li>
<li>compress</li>
<li>cookieParser</li>
<li>cookieSession</li>
<li>csrf</li>
<li>directory</li>
<li>errorHandler</li>
<li>favicon</li>
<li>json</li>
<li>limit</li>
<li>logger</li>
<li>methodOverride</li>
<li>multipart</li>
<li>urlencoded</li>
<li>query</li>
<li>responseTime</li>
<li>session</li>
<li>static</li>
<li>staticCache</li>
<li>subdomains</li>
<li>vhost</li>
</ul>

<p>No dudes en revisar la funcionalidad de cada uno, podrían ser muy útiles y ahorrar tiempo valioso.</p>

<hr />

<h2>Conclusión</h2>

<p>En este capitulo estuvimos hablando de los que es el middleware y como utilizarlo en Node.js y Express, espero que les haya sido útil esta información.</p>

<p>Como siempre cualquier duda que surja con gusto podré aclararla si la dejas en los comentarios (más abajo)</p>

<p>Saludos y hasta la próxima.</p>
