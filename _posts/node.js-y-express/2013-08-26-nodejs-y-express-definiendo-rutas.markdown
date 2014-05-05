---
layout: post
status: publish
published: true
title: Definiendo Rutas
author: Oscar González
author_login: oscar
author_email: gonzalezgreco@gmail.com
author_url: http://www.oscarvgg.com
wordpress_id: 2078
wordpress_url: http://codehero.co/?p=2078
date: 2013-08-26 00:01:50.000000000 -04:30
serie: Node.js y Express
dificultad: Novato
duracion: 20
github: https://github.com/codeheroco/nodejs-y-express-rutas
description: Para este tutorial vamos a escribir una aplicación desde cero y a definir sus rutas
categories:
- Cursos
- Node.js
tags:
- desde cero
- express
- rutas
- Node.js
---
<p>Bienvenidos a la segunda lección de <em>Node.js y Express</em>. En el capitulo anterior hablamos de como instalar node, express, y generamos y corrimos nuestra primera aplicación. Hoy vamos a empezar a agregar nuestro propio código.</p>

<hr />

<h2>Una aplicación desde cero</h2>

<p>Para este tutorial vamos a escribir una aplicación desde cero, ya que la que genera Express incluye cantidades de código que aún no podemos entender.</p>

<p>Vamos a crear un directorio llamado Ejemplo y vamos a crear un archivo nuevo llamado package.json. Lo puedes abrir en tu editor de texto favorito y agregamos:</p>

<pre>{
  "name": "Ejemplo",
  "version": "0.0.1",
  "dependencies": {
    "express": "3.3.5"
  }
}
</pre>

<p>El propósito general de este archivo es documentar un paquete de node. En nuestro caso se entiende por paquete la aplicación que estamos creando.</p>

<p>Este archivo es sumamente importante si estamos creando un paquete que estará disponible en npm (node package manager). Aquí se puede declarar quien desarrolló el paquete, la versión, las dependencias que tiene, entre otras cosas.</p>

<p>Por ahora, nosotros declaramos que nuestro proyecto se llama "Ejemplo", está en la versión 0.0.1 y su única dependencia es Express.</p>

<p>Ahora vamos a la consola y escribimos lo siguiente (debemos estar en el mismo directorio de la aplicación):</p>

<pre>$ npm install
</pre>

<p>Este comando leerá las dependencias del archivo package.json y las instalará en una carpeta llamada <code>node_modules</code> dentro del directorio del proyecto.</p>

<p>Ahora que ya tenemos los paquetes que necesitamos, podemos empezar a escribir nuestra aplicación. Creamos un nuevo archivo llamado <code>app.js</code> en el directorio del proyecto, este archivo será el que inicie el servidor. Empezamos, escribiendo las dependencias que necesitamos:</p>

<pre>var express = require('express');
var http = require('http');
</pre>

<ol>
<li>Express es el framework</li>
<li>http es un modulo de node js</li>
</ol>

<p>Ahora creamos nuestra aplicación:</p>

<pre>var app = express();
</pre>

<p>Le indicamos a express en que puerto vamos a estar escuchando:</p>

<p></pre> app.set('port', process.env.PORT || 3000); </pre></p>

<p>process.env.PORT es una variable de entorno, si no esta configurada para guardar el puerto en que debe correr la aplicación, entonces toma el 3000.</p>

<p>Por último creamos e iniciamos el servidor:</p>

<pre>http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
</pre>

<p>Ahora ya tenemos lo lo mínimo necesario para iniciar la aplicación.</p>

<hr />

<h2>Creando rutas</h2>

<p>Las rutas nos permiten direccionar peticiones a los controladores correctos. Vamos a empezar agregando el código de un controlador para una ruta:</p>

<pre>app.get('/', function(request, response) {

    response.send('¡Hola, Express!');

});
</pre>

<p>Si corremos nuestra app en la consola (parados en directorio de la aplicación) <code>node app.js</code> y vamos a "http://localhost:3000/" en nuestro explorador de preferencia, debemos ver el mensaje "¡Hola, Express!"</p>

<h3>Recibiendo parámetros</h3>

<p>Si queremos recibir algún parámetro en una ruta debemos especificar en el string el nombre del parámetro son ":" adelante:</p>

<pre>app.get('/users/:userName', function(request, response) {

    var name = request.params.userName;

    response.send('¡Hola, ' + name + '!');

});
</pre>

<p>Ahora si corremos la app y vamos a "http://localhost:3000/users/oscar" veremos que se despliega el mensaje "¡Hola, oscar!".</p>

<h3>Recibiendo POST</h3>

<p>También podemos recibir requests de tipo POST de la siguiente manera:</p>

<pre>app.post('/users', function(request, response) {

    var username = request.body.username;

    response.send('¡Hola, ' + username + '!');

});
</pre>

<p>Antes de correr este código debemos agregar <code>bodyParser</code> fuera del método, porque express no parsea el cuerpo del request por defecto:</p>

<pre>app.use(express.bodyParser());
</pre>

<p>Ahora podemos hacerle un post desde cualquier app que nos permita hacerlo. Yo utilizo una extensión de Chrome llamada Postman, desde ahí le podemos envíar lo siguiente a "http://localhost:3000/users":</p>

<pre>POST /users HTTP/1.1
Host: localhost:3000
Authorization: ApiKey appClient:xxxxxxxxxxxxxxxxxxxxxxxxxx
Cache-Control: no-cache

----WebKitFormBoundaryE19zNvXGzXaLvS5C
Content-Disposition: form-data; name="username"

oscar1234
----WebKitFormBoundaryE19zNvXGzXaLvS5C
</pre>

<p>Y deberá retornar:</p>

<pre>¡Hola, oscar1234!
</pre>

<p>De esta misma manera también podemos recibir requests PUT y DELETE utilizando app.put() y app.delete() respectivamente.</p>

<h3>Usando expresiones regulaes como ruta</h3>

<p>También podemos usar expresiones regulares como rutas, por ejemplo, podríamos usar "/\/users\/(\d*)\/?(edit)?/" como una ruta, especificando así que debe haber un dígito en el medio y que la paralabra "edit" es opcional.</p>

<pre>app.get(/\/personal\/(\d*)\/?(edit)?/, function (request, response) {

    var message = 'el perfil del empleado #' + request.params[0];

    if (request.params[1] === 'edit') {

        message = 'Editando ' + message;

    } else {

        message = 'Viendo ' + message;

    }

    response.send(message);

});
</pre>

<p>Si corremos la app y vamos a "http://localhost:3000/personal/15" veremos que se despliega el mensaje "Viendo el perfil del empleado #15", y si agregamos "/edit" al final veremos que el mensaje cambia a "Editando el perfil del empleado #15".</p>

<p>Luego de todos estos cambios tu archivo app.js debe lucir así:</p>

<pre>var express = require('express');
var http = require('http');

var app = express();


// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.bodyParser());


app.get('/', function(request, response) {

    response.send('¡Hola, Express!');

});


// app.get('/users/:userName', function(request, response) {

//  var name = request.params.userName;

//  response.send('¡Hola, ' + name + '!');

// });


app.post('/users', function(request, response) {

    var username = request.body.username;

    response.send('¡Hola, ' + username + '!');

});


app.get(/\/personal\/(\d*)\/?(edit)?/, function (request, response) {

    var message = 'el perfil del empleado #' + request.params[0];

    if (request.params[1] === 'edit') {

        message = 'Editando ' + message;

    } else {

        message = 'Viendo ' + message;

    }

    response.send(message);

});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
</pre>

<hr />

<h2>Conclusión</h2>

<p>En este capitulo aprendimos como crear una aplicación de Node y Express desde cero, y creamos distintos tipos de rutas.</p>

<p>Espero que hayas entendido todo, sin embargo siempre puede surgir alguna duda, en ese caso házmela saber en los comentarios aquí abajo.</p>

<p>¡Hasta la próxima!</p>
