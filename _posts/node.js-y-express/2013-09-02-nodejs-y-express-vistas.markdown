---
layout: post
status: publish
published: true
title: Vistas
author: Oscar González
author_login: oscar
author_email: gonzalezgreco@gmail.com
author_url: http://www.oscarvgg.com
wordpress_id: 2144
wordpress_url: http://codehero.co/?p=2144
date: 2013-09-02 00:02:53.000000000 -04:30
serie: Node.js y Express
dificultad: Novato
duracion: 30
github: https://github.com/codeheroco/node-y-express-vistas
description: En el capitulo de hoy estaremos hablando de como hacer vistas en node.js y express utilizando Jade.js
categories:
- Cursos
- Node.js
tags:
- vistas
- desde cero
- express
- Node.js
---
<p>En el capitulo anterior de <em>Node.js y Express</em> estuvimos hablando de como construir una aplicación de express desde cero. Hoy continuaremos este curso hablando de las vistas.</p>

<hr />

<h2>Desarrollando una vista</h2>

<p>Vamos a abrir el directorio de nuestro proyecto que veníamos desarrollando desde el capítulo anterior y creamos un directorio llamado <strong>"views"</strong>.</p>

<p>Ahora en tu editor de texto favorito creamos un archivo dentro del nuevo directorio llamado <em>"index.jade"</em>.</p>

<h3>¿Qué es Jade.js?</h3>

<p>Jade es un templating language (lenguaje de plantilla) desarrollado por la misma gente responsable de Express, por lo que deberían funcionar muy bien juntos.</p>

<p>Si has usado Haml en Rails, o sinatra, o similar, entonces veras que Jade es bastante parecido.</p>

<p>Jade es simple y facil de aprender.</p>

<p>Entonces para crear nuestra primera vista abrimos el archivo <em>"index.jade"</em> y empezamos a escribir:</p>

```javascript
// index.js

h1 ¡Hola, Express!
```


<p>Esto simplemente genera una etiqueta h1 con el el texto "¡Hola, Express!". Por ahora vamos a dejar esta vista así y vayamos al archivo <em>"app.js"</em> para configurar la app para soportar estas vistas.</p>

<hr />

<h2>Soportando vistas</h2>

<p>Abrimos <em>"app.js"</em> y buscamos el código donde esta la configuración de la aplicación:</p>

```javascript
// app.js

app.set('port', process.env.PORT || 3000);
app.use(express.bodyParser());
```


<p>Por razones estéticas voy a agregar el código de configuración para soporte de vistas debajo de <code>app.set('port', process.env.PORT || 3000);</code>.</p>

```javascript
// app.js

app.set('port', process.env.PORT || 3000);

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.bodyParser());
```


<p>Con esto decimos que nuestras vistas están en el mismo directorio del archivo actual + <em>"/views"</em> y que el motor de vistas es Jade.</p>

<p>Ahora vamos a la primera ruta que definimos en el capítulo anterior, "/":</p>

```javascript
// app.js

app.get('/', function(request, response) {

    response.send('¡Hola, Express!');

});
```


<p>Y la vamos a modificar para que en lugar de enviar un mensaje, envíe una vista:</p>

```javascript
// app.js

app.get('/', function(request, response) {

    response.render('index');

});
```


<p>Solo hay que cambiar send por render y el nombre de la vista.</p>

<p>Si bien este código teóricamente hablando, funciona, al correrlo nos vamos a encontrar con un error, y es porque no hemos instalado en nuestro proyecto el modulo de Jade.</p>

<p>Abrimos nuestro archivo package.json y agregamos jade a las dependencias:</p>

```javascript
// package.json

{
  "name": "application-name",
  "version": "0.0.1",
  "dependencies": {
    "express": "3.3.5",
    "jade": "0.35.0"
  }
}
```


<p>Se agregó Jade, versión 0.35.0.</p>

<p>Ahora en la consola instalamos el paquete:</p>

```javascript
$ cd { directorio del proyecto }
$ npm install
```


<p>Y ya podemos correr el proyecto:</p>

```javascript
node app.js
```


<p>Ahora si vamos al <code>http;//localhost:3000/</code> veremos el mensaje "¡Hola, Express!" en una etiqueta h1.</p>

<hr />

<h2>Pasando parámetros a las vistas</h2>

<p>Realmente el poder de las vistas reside en pasarle parámetros desde el controlador. Busquemos el código de la ruta "/":</p>

```javascript
app.js

app.get('/', function(request, response) {

    response.render('index');

});
```


<p>Para pasar parámetros, solo tenemos que enviar un objeto en el response:</p>

```javascript
// app.js

app.get('/', function(request, response) {

    response
    .render('index', {

        title: '¡Hola, Express!',
        username: 'oscar'

    });

});
```


<p>Vamos ahora a la vista a menejar estos parámetros:</p>

```javascript
h1= title

span Tu nombre usuario es: #{username}
```


<p>Al la etiqueta h1 le asignamos el contenido de title y luego en un "span" escribimos un mensaje más el contenido el parámetro username.</p>

<hr />

<h2>Utilizando bloques</h2>

<p>Otra de las cosas que podemos hacer con jade es utilizar bloques. Un bloque es la extensión de un layout. Veamos como funciona.</p>

<p>Vamos al directorio de las vistas, <em>"./views"</em>, y creamos un archivo llamado <em>"layout.jade"</em>:</p>

```javascript
// layout.jade

doctype 5
html
  head
    title= title
  body
    #content
      block content
```


<ol>
<li>El title de la página viene dado por la ruta como un parámetro, igual que como hicimos en la vista index.js</li>
<li>En el body tenemos un div de id=content</li>
<li>Y dentro del div tenemos un bloque llamado contenido</li>
</ol>

<p>Como podemos observar, en Jade la indentación determina que cosa va dentro de que.</p>

<p>Ahora, vamos a index.js y modificamos esta vista para se el bloque que extiende el layout.</p>

```javascript
// index.jade

extends layout

block content
    h1= title

    span Tu nombre usuario es: #{username}
```


<ol>
<li>Se extiende layout</li>
<li>El contenido del bloque content es ésta vista</li>
</ol>

<p>Corramos nuestro proyecto y observemos en el código que la vista como tenemos header, body, un div con id content, y dentro el contenido de la vista índex.</p>

<hr />

<h2>Conclusión</h2>

<p>En este capítulo aprendimos a utilizar las vistas en Node.js</p>

<ol>
<li>Aprendimos como incluir el directorio de las vistas;</li>
<li>Crear una vista;</li>
<li>Retornar una vista en el response de una ruta;</li>
<li>Pasar parámetros a una vista;</li>
<li>Utilizar bloques.</li>
</ol>

<p>Cualquier duda házmela saber en los comentarios.</p>

<p>Hasta la próxima.</p>
