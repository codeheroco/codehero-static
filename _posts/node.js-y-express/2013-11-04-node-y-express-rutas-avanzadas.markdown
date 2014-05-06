---
layout: post
status: publish
published: true
title: Rutas Avanzadas
author: Oscar González
author_login: oscar
author_email: gonzalezgreco@gmail.com
author_url: http://www.oscarvgg.com
wordpress_id: 2533
wordpress_url: http://codehero.co/?p=2533
date: 2013-11-04 00:11:34.000000000 -04:30
serie: Node.js y Express
dificultad: Novato
duracion: 10
description: "Rutas avanzadas: En este capitulo de Node.js y Express veremos que hay muchas cosas más que podemos hacer con las rutas de las que ya hemos aprendido."
categories:
- Cursos
tags:
- desde cero
- next
- middleware
---
<p>Ya hemos dedicado un capítulo a las rutas con anterioridad, pero aún quedan algunos puntos por tocar en este tema porque hay muchas cosas más que podemos hacer. Hablemos de rutas avanzadas</p>

<hr />

<h2>Múltiples Parámetros por Segmento de URL</h2>

<p>Supongamos que tenemos un array de nombres de personas:</p>

<pre>var authors = ["Alberto", "Carlos", "Jonathan", "Oscar", "Ramses", "Ricardo"];
</pre>

<p>Pudiéramos pedir los autores que están comprendidos en un rango según su posición en el Array:</p>

<pre>app.get('/authors/:from-:to', function (request, response) {

    var from = parseInt(request.params.from, 10),
         to   = parseInt(request.params.to, 10);

    response.json(authors.slice(from, to + 1));

});
</pre>

<p>En este bloque de código obtuve dos parámetros que están en un mismo segmento de url y los convertí a entero. Luego retorné como json el rango requerido del array de autores.</p>

<hr />

<h2>Parámetros Pre-Condicionados</h2>

<p>Los parámetros pre-condicionados tienen que ver con el middleware. Mediante este método podemos obtener los parámetros antes de que lleguen a nuestros controladores de ruta para hacerle algún tipo de modificación.</p>

<p>Tomando la misma idea del ejemplo anterior creamos dos métodos de middleware, uno para cada parámetro.</p>

<pre>app.param('from', function (request, response, next, from) {

    request.from = parseInt(from, 10);
    next();

});
</pre>

<p>Con este método convertimos el parámetro "from" a entero antes de llegar al método de la ruta. "Next" viene siendo una función de middleware que debe ser llamada siempre al final, esta indica que se puede continuar al siguiente middleware de la lista que se configura al inicio de la aplicación.</p>

<p>Ahora continuamos con el método para el parámetro "to".</p>

<pre>app.param('to', function (request, response, next, to) {

    request.to = parseInt(to, 10);
    next();

});
</pre>

<p>Y ahora en la función de nuestra ruta solo tenemos que hacer lo siguiente:</p>

<pre>app.get('/authors/:from-:to', function (request, response) {

    response.json(authors.slice(request.from, request.to + 1));

});
</pre>

<p>Con esto logramos el mismo resultado que en el ejemplo anterior, solo que escribimos más código. Puede parecer absurdo en este momento, pero si tu aplicación necesitara recibir estos parámetros en múltiples rutas, ahorra tiempo que tener que repetir la conversión a entero en cada ruta. También podría ser útil si se necesitara de algún tipo de autenticación, o extraer información de una base de datos, etc.</p>

<hr />

<h2>Sobre escritura de rutas</h2>

<p>si vamos a la configuración de nuestra aplicación vemos que hay un montón de middleware:</p>

<pre>app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use( express.cookieParser() );
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
</pre>

<p>Tengo particular interés en que nos fijemos en la última línea del código:</p>

<pre>app.use(express.static(path.join(__dirname, 'public')));
</pre>

<p>Esta línea indica que los archivos que estén en la carpeta "/public" son estáticos. Esto quiere decir que si tenemos un archivo llamado "download.zip" en esa carpeta y vamos a la dirección "localhost:3000/download.zip" el archivo se descargará del servidor a nuestra carpeta de descargas.</p>

<p>Vamos a suponer que yo quiero contar el numero de veces que ha sigo descargado el archivo. Mediante una variable llamada "count", que no vamos a guardar en ninguna parte, solo en memoria (si se apaga el servidor se borra este valor), vamos a guardar la cantidad de veces que se descargó el archivo.</p>

<pre>var count = 0;

</pre>

<p>Creamos la variable en cualquier parte de app.js, antes de la ruta que vamos a crear:</p>

<pre>app.get('/download.zip', function (request, response, next) {

    count++;
    next();

});
</pre>

<p>En este caso pasamos la función next a la ruta porque no vamos a retornar con un "response", entonces llamamos a <code>next()</code> al final de la función para que continue la ejecución con el siguiente paso.</p>

<p>Ahora si quisiéramos saber cuantas veces se ha descargado el archivo, podemos crear una ruta para solicitar el valor de la variable <code>count</code>.</p>

<pre>app.get('/count', function (request, response) {

    request.send("" + count + " descargas");

});
</pre>

<p>Claro que si no queremos perder el valor de count cuando apaguemos el servidor, tenemos que guardarlo en una base de datos.</p>

<hr />

<h2>Sobrecarga de rutas</h2>

<p>Cuando hemos escrito el código que se encarga de manejar una ruta, siempre lo hemos hecho pasando una función. Resulta que se pueden pasar múltiples funciones que serán ejecutadas en el orden en que fueron pasadas a la ruta.</p>

<p>Tomando el array del primer ejemplo vamos a crear una función que retorne el autor de la posición solicitada:</p>

<pre>function userAtIndex (request, response, next) {
    request.author = authors[parseInt(request.params.authorId, 10)];
    next();
});
</pre>

<p>Es importante llamar a <code>next()</code> para que la aplicación continue la ejecución hacia la próxima función.</p>

<p>Ahora, en la ruta pasamos como parámetro a la función <code>userAtIndex</code>:</p>

<pre>app.get("/users/:authorId", userAtIndex, function (request, response) {
    response.json(request.author);
});
</pre>

<hr />

<h2>Conclusión</h2>

<p>En este tutorial hemos aprendido algunas técnicas avanzadas sobre el manejo de rutas en Node.js con Express.</p>

<p>Espero que haya servido de ayuda esta información. Ya sabes que puedes dejar tus dudas o comentarios en la sección correspondiente que está más abajo en esta página.</p>

<p>Ya será hasta un próximo tutorial de Node.js y Express.</p>

<p>Hasta pronto.</p>
