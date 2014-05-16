---
layout: post
status: publish
published: true
title: Peticiones y Respuestas
author: Oscar González
author_login: oscar
author_email: gonzalezgreco@gmail.com
author_url: http://www.oscarvgg.com
wordpress_id: 2425
wordpress_url: http://codehero.co/?p=2425
date: 2013-10-21 01:58:47.000000000 -04:30
serie: Node.js y Express
dificultad: Novato
duracion: 10
description: En este capítulo voy a profundizar en las peticiones y respuestas mostrarte lo importantes o útiles que pueden ser para el desarrollo de nuestras apps.
categories:
- Cursos
- Node.js
tags: []
---
<p>A lo largo de esta serie hemos utilizado los parámetros "request" y "response" que recibimos en los métodos de los controladores para cada ruta. En este capítulo voy a profundizar en este tema para mostrarte varias capacidades que no te imaginabas que estos dos objetos tenían y lo importantes o útiles que pueden ser para el desarrollo de nuestras aplicaciones.</p>

<hr />

<h2>Request</h2>

<p>El objeto request contiene información sobre la petición que hace el cliente al servidor.</p>

<p>Hablemos de sus propiedades.</p>

<h3>Headers</h3>

<p>Si queremos saber información sobre la petición podemos obtener los headers utilizando el método "get":</p>

```javascript
app.get("/", function(request, response) {

    response.send(request.get('user-agent'));

});
```

<p>Si visitamos esta ruta obtendremos un mensaje similar al siguiente:</p>

```javascript
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36
```

<p>Si queremos una lista de los "content types" aceptados podemos invocar la propiedad accepted:</p>

```javascript
app.get("/", function(request, response) {

    response.send(request.accepted);

});
```

<p>Esto retornará una lista de los contenidos aceptados similar a la siguiente:</p>

```javascript
[
  {
    "value": "text/html",
    "quality": 1,
    "params": {},
    "originalIndex": 0,
    "type": "text",
    "subtype": "html"
  },
  {
    "value": "application/xhtml+xml",
    "quality": 1,
    "params": {},
    "originalIndex": 1,
    "type": "application",
    "subtype": "xhtml+xml"
  },
  {
    "value": "application/xml",
    "quality": 0.9,
    "params": {},
    "originalIndex": 2,
    "type": "application",
    "subtype": "xml"
  },
  {
    "value": "*/*",
    "quality": 0.8,
    "params": {},
    "originalIndex": 3,
    "type": "*",
    "subtype": "*"
  }
]
```

<p>También podemos verificar "character sets" utilizando acceptedCharsets:</p>

```javascript
app.get("/", function(request, response) {

    response.send(request.acceptedCharsets);

});
```

<p>Y esto retornara una lista con los character sets aceptados. También podemos preguntar por uno en especifico:</p>

```javascript
app.get("/", function(request, response) {

  response.send(request.acceptsCharset('utf-8') ? 'yes' : 'no');

});
```

<p>Y aquí le pongo <code>? 'yes' : 'no'</code> porque esta función retorna un valor booleano.</p>

<p>Podemos preguntar por el idioma aceptado en este request:</p>

```javascript
app.get("/", function(request, response) {

  response.send(request.acceptedLanguages);

});
```

<p>Esto retornará una lista de con los idiomas aceptados.</p>

<p>Igualmente que con los character sets, podemos pedir uno en especifico:</p>

```javascript
app.get("/a", function(request, response) {

  response.send(request.acceptsLanguage('es') ? 'yes' : 'no');

});
```

<h3>Parámetros</h3>

<p>Sobre los parámetros ya hablamos en el capitulo <a href="http://codehero.co/nodejs-y-express-definiendo-rutas/">"definiendo rutas"</a>. Por lo tanto aquí solo voy a agregar alunas cosas que no mencioné anteriormente.</p>

<p>Como bien sabemos podemos solicitar el parámetro enviado en el url de la siguiente manera:</p>

```javascript
app.get("/name/:name", function(request, response) {

  response.send("Hola, " + request.params.name);

});
```

<p>Lo nuevo que voy a introducir es la posibilidad de hacer un parámetro opcional. Esto se logra agregando un <code>?</code> al final del url:</p>

```javascript
app.get("/name/:name?", function(request, response) {

  response.send("Hola, " + request.params.name);

});
```

<p>También podemos agregar un valor por defecto al parámetro usando el método <code>param</code> en vez de la propiedad <code>params</code>:</p>

```javascript
app.get("/name/:name?", function(request, response) {

  response.send(request.param('name', 'valor default'));

});
```

<h3>Otras propiedades</h3>

<p>Estas fueron algunas de la propiedades más usadas del objeto request, hay muchas otras que no voy a explicar pero que puedes conseguir en la documentación del framework. Estas son:</p>

<ul>
<li>protocol</li>
<li>secure</li>
<li>ip</li>
<li>ips</li>
<li>auth</li>
<li>subdomains</li>
<li>path</li>
<li>host</li>
<li>fresh</li>
<li>stale</li>
<li>xhr</li>
</ul>

<hr />

<h2>Response</h2>

<p>También hay mucho que puede hacerse con el objeto response. Veamos.</p>

<h3>Códigos de estatus</h3>

<p>El método <code>send</code> lo hemos venido usando para enviar el body de nuestra respuesta, pero también podemos enviar un código de estatus con un mensaje custom:</p>

```javascript
app.get("/a", function(request, response) {

  response.send(403, 'prohibido el acceso :P');

});
```

<p>Si enviamos el código solo obtendremos el mensaje estándar para este código.</p>

<p>Para mayor información sobre códigos de estatus del protocolo http visita la siguiente página de <a href="http://es.wikipedia.org/wiki/Anexo:C%C3%B3digos_de_estado_HTTP">wikipedia</a>.</p>

<h3>Enviando json</h3>

<p>Para enviar json solo hay que usar el método <code>json</code>:</p>

```javascript
app.get("/", function(request, response) {

  response.json({ message: '¡hola!'});

});
```

<p>Aqui estamos enviando un objeto de javascript, el método <code>json</code> se encarga de hacerle "stringify" y mandarlo con "content type" = "application/json".</p>

<h3>Asignando el content type</h3>

<p>Normalmente el content type se asigna automaticamente, pero podemos asignarlo manualmente si queremos:</p>

```javascript
app.get("/", function(request, response) {

  response.type('image/png').send('esto es una imagen');

});
```

<h3>Formato</h3>

<p>El método <code>format</code> retorna el tipo de respuesta que el cliente pueda aceptar:</p>

```javascript
app.get("/", function(request, response) {

  response.format({
    html: function() { response.send('<h1> Hola </h1>'); },
    json: function() { response.json({ message: "Hola" }) },
    text: function() { response.send("hola") },
  });

});
```

<p>Si pedimos esta ruta en el browser vamos a obtener la respuesta "Hola" en un "H1", pero si vamos a la consola podemos obtener las otras respuestas:</p>

```javascript
$ curl localhost:3000 -H "accept: application/json"
{
  "message": "Hola"
}

$ curl localhost:3000 -H "accept: text/plain"
hola
```

<h3>redireccionando</h3>

<p>Redireccionar es tan simple como llamar al método:</p>

```javascript
app.get("/", function(request, response) {

  response.redirect('/name');

});
```

<h2>Otros métodos</h2>

<p>Nuevamente, no voy a hablar de todas las propiedades y métodos de este objeto, sin embargo les dejo aquí la lista de cuales existen para su investigación personal:</p>

<ul>
<li>sendfile</li>
<li>download</li>
<li>attachment</li>
<li>links</li>
<li>clearCookie</li>
<li>cookies</li>
</ul>

<hr />

<h2>Conclusión</h2>

<p>Con los conocimientos obtenidos hoy ya tenemos una base sólida sobre las peticiones y respuestas en Express.</p>

<p>Espero haber sido de ayuda. Como siempre, nunca esta de más decir que cualquier duda puede ser aclarada en la sección de comentarios más abajo.</p>

<p>Adiós.</p>
