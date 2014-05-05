---
layout: post
status: publish
published: true
title: Cookies y Sesiones
author: Oscar González
author_login: oscar
author_email: gonzalezgreco@gmail.com
author_url: http://www.oscarvgg.com
wordpress_id: 2630
wordpress_url: http://codehero.co/?p=2630
date: 2013-11-18 00:00:01.000000000 -04:30
serie: Node.js y Express
dificultad: Novato
duracion: 10
description: En este capitulo hablaré de como hacer uso de cookies y sesiones con Node.js y Express
categories:
- Cursos
- Node.js
tags:
- desde cero
---
<p>En este capitulo hablaré de como Express maneja cookies y sesiones. Vamos a empezar con los cookies.</p>

<hr />

<h2>Cookies</h2>

<p>Para hacer uso de la cookies tenemos que hacer uso del <code>cookieParser</code> en app.js.</p>

<pre>app.use(express.cookieParser());
</pre>

<p>Ahora, necesitamos crear un cookie. Esto lo hacemos a través de <code>res.cookie</code> donde "res" es nuestro objeto response que viene como parámetro en una ruta. Lo único que tenemos que especificar es el nombre del cookie y el valor: <code>res.cookie('name', 'oscar')</code></p>

<p>Esto retorna el mismo objeto <code>response</code> por lo que podemos encadenarle otros llamados. Veamos un ejemplo en una ruta:</p>

<pre>app.get('/name/:name', function(req, res) {

  res
  .cookie('name', req.params.name)
  .send('<p>
  Vea el valor del cookie <a href="/name">aquí</a>

</p>');

});
</pre>

<p>El método <code>cookie</code> de <code>response</code> también puede recibir otro parámetro con unas opciones, como la fecha de expiración de una cookie por ejemplo:</p>

<pre>res.cookie('name', 'oscar', { expires: new Date(Date.now() + 900000) } );
</pre>

<p>En el caso de esta demostración no es necesario asignar ninguno de estos valores. Para mayor información puedes chequear la <a href="http://expressjs.com/api.html">documentación de Express</a>.</p>

<p>Si navegamos ahora a <code>localhost:3000/name/oscar</code> veremos el mensaje "Vea el valor del cookie aquí" en el explorador. Para asegurarnos que se haya asignado el valor debemos abrir nuestra consola de javascript y escribir:</p>

<pre>> document.cookie
 "name=oscar"
</pre>

<p>Ahora, si hacemos click en el link que colocamos en el mensaje que enviamos, obtendremos que la página no existe. vamos a crearla.</p>

<p>Para esto creamos la ruta:</p>

<pre>app.get('/name', function (req, res) {
  res.send(req.cookies.name);
});
</pre>

<p>Como el valor de la ruta queda asignado, ahora siempre podremos obtenerlo en el objeto <code>request</code>.</p>

<p>Si vamos a <code>localhost:3000/name</code> veremos el valor de nuestra cookie "name".</p>

<p>Ahora si quisiéramos crear una ruta para borrar el valor del cookie "name", podemos llamar al método <code>res.clearCookie('name')</code>;</p>

<hr />

<h2>Sesiones</h2>

<p>Pasemos ahora a hablar de las sesiones.</p>

<p>Lo primero que tenemos que saber es que las sesiones solo las podemos obtener a través del objeto <code>request</code>.</p>

<p>Antes de empezar a trabajar con sesiones tenemos agregar la siguiente linea a nuestra sección de código de configuración:</p>

<pre>app.use(express.session({ secret: 'esto es secreto'}));
</pre>

<p>Este método recibe como parámetro una opción llamada "secret", esto no tiene que ser ningún valor en especifico, es solo para crear un hash con esta cadena de caracteres.</p>

<p>Entonces ahora tenemos que hacer unos cambios en nuestras rutas para trabajar con sesiones:</p>

<pre>app.get('/name/:name', function(req, res) {

  req.session.name = req.params.name;

  res
  .send('<p>
  Vea el valor de esta sesión <a href="/name">aquí</a>

</p>');

});


app.get('/name', function (req, res) {
  res.send(req.session.name);
});
</pre>

<p>Esto pareciera ser más sencillo que usar cookies, y lo es, pero en realidad es incluso mejor, porque los valores quedan guardados en javascript y pueden ser más que un simple string como lo hacíamos con las cookies, con sesiones podríamos guardar objetos si quisiéramos. Un ejemplo que se me viene a la mente es el del carrito de compras; el usuario agrega artículos a un carrito de compras y aunque deje la página, cuando vuelva a acceder, podemos recuperar los artículos desde la sesión.</p>

<p>Entonces ahora podemos probar nuestra pequeña aplicación, accedemos a <code>localhost:3000/name/pepe</code> y luego a <code>localhost:3000/name</code> y deberíamos obtener el mismo comportamiento que con las cookies.</p>

<hr />

<h2>Conclusión</h2>

<p>Estos son los pasos básicos para trabajar con cookies y sesiones en Node.js con Express. Como puedes ver es muy simple y muy util para cuando hacemos aplicaciones más grandes.</p>

<p>Cualquier duda o comentario, como siempre, no dejes de agregarlo en la sección de comentarios más abajo.</p>

<p>Hasta la próxima.</p>
