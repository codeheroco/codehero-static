---
layout: post
status: publish
published: true
title: Estructura modular de proyectos
author: Oscar González
author_login: oscar
author_email: gonzalezgreco@gmail.com
author_url: http://www.oscarvgg.com
wordpress_id: 2854
wordpress_url: http://codehero.co/?p=2854
date: 2013-12-16 00:10:53.000000000 -04:30
serie: Node.js y Express
dificultad: Aprendiz
duracion: 30
github: https://github.com/codeheroco/express-proyecto-modular
description: En este capítulo te enseñaré como utilizar tus propios módulos para crear una estructura de proyecto mucho más fácil de mantener y extender.
categories:
- Node.js
tags:
- Módulos
- desde cero
- proyecto
- node
- express
---
<p>Supongamos que estás desarrollando una grandiosa aplicación en Node usando Express como framework MVC. Inicialmente tienes tres vistas, rutas y modelos. Luego son cinco. Después Diez. Hasta que se sale todo de control, encontrar ese el formulario de registro que hiciste cuando empezaste el desarrollo se hace casi imposible de encontrar en tu proyecto lasaña.</p>

<p>Supongamos ahora que quieres reutilizar el módulo de registro de usuarios en otro proyecto... Bueno, empiezas a buscar las rutas, vistas y modelos necesarios y empiezas a copiar y pegar código de un lado a otro. En otras palabras, a llevar parte de la lasaña a otra lasaña. Creo que nunca he visto dos lasañas formar una tercera y que se acoplen perfectamente.</p>

<p>Dile adiós a las clases de cocina, y aprende a desarrollar proyectos modulares en Node.js y Express con la siguiente estructura de proyecto inspirada en la propuesta por TJ Holowaychuk, el creador de express, en el siguiente video:</p>

<iframe class="video-center-responsive" src="//player.vimeo.com/video/56166857" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

<p><a href="http://vimeo.com/56166857">Modular web applications with Node.js and Express</a> from <a href="http://vimeo.com/user8021748">tjholowaychuk</a> on <a href="https://vimeo.com">Vimeo</a>.</p>

<p>Con este capítulo pretendo llevar un paso más adelante el tema tocado en el capítulo anterior (como crear tus propios módulos), modularizando las partes de la aplicación para hacerla más fácil de mantener y escalar.</p>

<hr />

<h2>Creando el proyecto</h2>

<p>Primero que nada creamos un proyecto de Express desde la consola:</p>

<pre>$ express mudular-test

   create : mudular-test
   create : mudular-test/package.json
   create : mudular-test/app.js
   create : mudular-test/public
   create : mudular-test/public/javascripts
   create : mudular-test/routes
   create : mudular-test/routes/index.js
   create : mudular-test/routes/user.js
   create : mudular-test/public/stylesheets
   create : mudular-test/public/stylesheets/style.css
   create : mudular-test/public/images
   create : mudular-test/views
   create : mudular-test/views/layout.jade
   create : mudular-test/views/index.jade

   install dependencies:
     $ cd mudular-test && npm install

   run the app:
     $ node app
</pre>

<p>Para esta estructura no vamos a necesitar la carpeta "routes", tampoco vamos a necesitar el archivo "index.jade" de la carpeta "views", <strong>los eliminamos a ambos</strong>.</p>

<hr />

<h2>Creando los controladores</h2>

<p>Cada carpeta interna de un proyecto de Node puede ser un módulo distinto como hablamos en el capítulo anterior.</p>

<p>Vamos a crear una carpeta llamada controllers y dentro creamos otra carpeta llamada home.</p>

<pre>/controller/home
</pre>

<p>Y dentro de 'home' creamos un archivo llamado index.js. Esto es lo que llamamos un "Controlador", aquí vamos a atender todas las rutas que consideremos que pertenecen al grupo home.</p>

<p>Ahora dentro del archivo <code>controllers/home/index.js</code> vamos a escribir el siguiente código:</p>

<pre lang="javascript">var express = require('express');           // 1
var app = module.exports = express();   // 2

app.get('/', function(request, response) {

// 3

});
</pre>

<ol>
<li>importamos Express</li>
<li>obtenemos una instancia del framework</li>
<li>atendemos como sea necesario esta ruta y respondemos.</li>
</ol>

<hr />

<h2>Creando vistas</h2>

<p>TJ Holowaychuk propone crear las vistas en el mismo directorio del controlador, por ejemplo:</p>

<pre>/controllers
    /home
        index.js
        home.jade
</pre>

<p>Yo soy fanático del orden, y creo que esto podría volverse un poco complicado si tenemos varias vistas para este módulo, por eso yo propongo colocarlas en una carpeta aparte:</p>

<pre>/controllers
    /home
        index.js
        /views
            home.jade
</pre>

<p>Entonces en el controlador home agregamos el siguiente código en el método de la ruta:</p>

<pre lang="javascript">app.get('/', function(request, response) {

  response.render('home', {
    title: 'Hola, desde el controlador de home'
  });

});
</pre>

<p>Ahora vamos a necesitar un asignar la siguiente propiedad para que el framework pueda encontrar las vistas:</p>

<pre lang="javascript">app.set('views', __dirname + '/views');
</pre>

<p>Entonces nuestro controlador debe lucir de la siguiente manera:</p>

<pre lang="javascript">var express = require('express');
var app = module.exports = express();

app.set('views', __dirname + '/views');

app.get('/', function(request, response) {

  response.render('home', {
    title: 'Hola, desde el controlador de home'
  });

});
</pre>

<p>Ahora necesitamos crear la vista home.jade:</p>

<pre lang="javascript">extends ../../../views/layout

block content
  h1= title
  p Welcome to #{title}
</pre>

<p>Guardamos en <code>/controllers/home/views/</code>.</p>

<hr />

<h2>Conectándolo todo</h2>

<p>Nos vamos a app.js y borramos los <code>app.get</code> que coloca Express por defecto cuando generamos el proyecto e importamos los módulos que hayamos creado, en este caso es solo el módulo "home".</p>

<p>Agregamos esto junto a la declaración de todos los módulos ya existentes:</p>

<pre lang="javascript">var home = require('./controllers/home');
</pre>

<p>Y más abajo, luego de toda la configuración declaramos asignamos los módulos para su uso:</p>

<pre lang="javascript">app.use(home);
</pre>

<p>Entonces ahora nuestro archivo <code>app.js</code> debe lucir similar al siguiente:</p>

<pre lang="javascript">//app.js

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// modulos
var home = require('./controllers/home');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// rutas
app.use(home);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

</pre>

<hr />

<h2>Conclusión</h2>

<p>En este capítulo Node.js y Express te enseñé como utilizar tus propios módulos para crear una estructura mucho más fácil de entender, mantener y extender.</p>

<p>Este es el último capitulo de esta serie, pero no el último sobre Node.js en este sitio, un hay más por venir en el futuro, este ha sido solo el comienzo.</p>

<p>Espero que esta serie de totorales sobre Node.js y Express haya sido de tu agrado y haya servido de ayuda para comprender esta excelente herramienta para el desarrollo web.</p>

<p>Si consideras que esta entrada es útil, por favor, ayuda a correr la voz y expandir el alcance de Codehero hasta aquellos que necesitan de nuestra ayuda compartiendo en las redes sociales.</p>

<p>Como siempre, las dudas o comentarios puedes dejarla en la sección correspondiente de más abajo.</p>

<p>Adiós.</p>
