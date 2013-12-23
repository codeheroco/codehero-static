---
layout: post
status: publish
published: true
title: Modelos
author: Carlos Picca
author_login: carlos
author_email: carlospicca@gmail.com
wordpress_id: 2661
wordpress_url: http://codehero.co/?p=2661
date: 2013-11-22 03:17:12.000000000 -04:30
categories:
- Cursos
- Ember.js
tags:
- Modelos
- modelo
- fixture
- adapter
- data
- store
---
<p>Bienvenidos Ember.js desde Cero, curso en el cual aprendemos a programar sin conocimiento alguno. En el capítulo anterior, aprendimos a generar nuestra estructura de proyecto. Si eres nuevo en este curso, te recomiendo que le eches un vistazo al capítulo anterior para que te pongas en contexto (<a href="http://codehero.co/ember-js-desde-cero-estructura-del-proyecto/">Capítulo 7 - Estructura del proyecto</a>)</p>

<p>Hoy, vamos a aprender a crear nuestro primer modelo en Ember.js</p>

<hr />

<p>¿Cómo creo un modelo en Ember.js?
Lo primero que necesitamos hacer para crear un modelo en Ember.js es generar una variable de tipo <strong>Store</strong> la cual va a almacenar toda nuestra data o información de manera persistente durante la aplicación. Para esto vamos a necesitar descargar una librería la cual nos va a permitir poseer data persistente. Vemos como hacerlo:</p>

<p>Naveguemos a <a href="http://emberjs.com/builds/#/canary/latest">Ember Data</a> y descarguemos la ultima version del archivo <code>ember-data.js</code>. Una vez que lo hayamos descargado debemos moverlo a la carpeta <code>libs</code> dentro de nuestra aplicación y asociarlo en el archivo <code>index.html</code> de la app agregando la siguiente linea:</p>

<pre>
  <script src="js/libs/ember-data.js"></script>
</pre>

<p>Luego debemos definir el store dentro del archivo <code>app.js</code> de nuestra aplicación. Veamos como hacerlo:</p>

<p>Agregamos el siguiente código:</p>

<pre>
App.Store = DS.Store.extend({
    revision: 11,
    adapter: "DS.FixtureAdapter"
});
</pre>

<blockquote>
  <p>Observemos lo siguiente:</p>
  
  <ul>
  <li>Con <code>App.Store = DS.Store.extend</code> generamos la variable <strong>store</strong> con la que la app va estar trabajando. Esta extiende de <em>Ember Data</em>.</li>
  <li>Debemos estar pendiente de la versión que queremos usar en mis caso y para el tiempo de este tutorial es la <code>revision: 11</code>.</li>
  <li>Por último debemos especificar el tipo de adaptador que nuestra app va usar en nuestro caso vamos a usar <code>DS.FixtureAdapter</code>, el cual nos permite generar data o información a través de arrays dentro de nuestro modelo. También exige otro adaptador denominado <code>DS.RESTAdapter</code> el cual vamos a usar cuando nuestra app pase a producción. Este posee un comportamiento al estilo <strong>REST</strong> (Este punto lo veremos mas adelante cuando creemos una app desde cero).</li>
  </ul>
</blockquote>

<p>El archivo <code>app.js</code> debería lucir así:</p>

<pre>
window.App = Ember.Application.create();

App.Store = DS.Store.extend({
    revision: 11,
    adapter: "DS.FixtureAdapter"
});
</pre>

<p>Una vez que ya hemos creado nuestra variable <strong>store</strong> es hora de generar nuestro modelo. En mi opinión cada modelo de Ember.js debería ser manejado por un archivo diferente, es por esto que si seguimos el ejemplo que veníamos usando hasta el tutorial anterior debemos crear un modelo denominado <strong>marcapagina</strong>.</p>

<p>El archivo del modelo debe estar denominado con el nombre del modelo, es por eso que en nuestro caso vamos a crear <code>marcapagina.js</code> dentro de la carpeta <code>/models</code> de nuestra aplicación. Si nos sabes como estructurar un proyecto en Ember.js te recomiendo visitar <a href="http://codehero.co/ember-js-desde-cero-estructura-del-proyecto/">Estructura de proyecto</a>.</p>

<p>Una vez que hayamos creado nuestro archivo debemos definir el modelo como tal para eso vamos a agregar el siguiente código:</p>

<pre>
App.Marcapagina = DS.Model.extend({
    nombre: DS.attr('string'),
    url: DS.attr('string')
});
</pre>

<blockquote>
  <p>Observemos que con <code>App.Marcapagina = DS.Model.extend</code> creamos una variable <strong>Marcapagina</strong> dentro de nuestra app la cual va a ser un modelo ya que extiende de <code>DS.Model</code>.</p>
  
  <p>Aparte, le agregamos dos atributos el primero un <strong>nombre</strong> el cual va a ser de tipo <em>string</em> (<code>nombre: DS.attr('string')</code>) y el segundo <strong>url</strong> que va ser de tipo <em>string</em> (<code>url: DS.attr('string')</code>).</p>
  
  <p>Es importante destacar que Ember.js te permite tener 4 tipos de datos para atributos: string o cadena de caracteres, date o fecha, number o numero y boolean o booleano.</p>
</blockquote>

<p>Con esto hemos creado nuestro primer modelo en Ember.js pero para que el modelo funcione o posee información debemos proveerle alguna. En nuestro caso como esto una app de prueba y estamos usando el adaptador del store en modo fijo debemos proveerle un arras para que nuestro modelo se nutra del mismo. Vemos como:</p>

<p>En el mismo archivo vamos a agregar lo siguiente:</p>

<pre>
App.Marcapagina.FIXTURES = [
    {
        id: 1,
        nombre: "Codehero",
        url: "http://codehero.co"
    },
    {
        id: 2,
        nombre: "Twitter de Carlos Picca",
        url: "https://twitter.com/CarlosPicca"
    }
];
</pre>

<blockquote>
  <p>Observemos que debemos decir que modelo vamos a llenar con <code>App.Marcapagina.FIXTURES</code>.
  Por ultimo necesitamos identificar que atributo posee que información en cada ítem del arreglo, es decir, por ejemplo: el <code>id</code> del primer ítem es el <code>1</code>.</p>
</blockquote>

<p>El archivo <code>marcapagina.js</code> debería lucir así:</p>

<pre>
App.Marcapagina = DS.Model.extend({
    nombre: DS.attr('string'),
    url: DS.attr('string')
});

App.Marcapagina.FIXTURES = [
    {
        id: 1,
        nombre: "Codehero",
        url: "http://codehero.co"
    },
    {
        id: 2,
        nombre: "Twitter de Carlos Picca",
        url: "https://twitter.com/CarlosPicca"
    }
];
</pre>

<blockquote>
  <p>Hasta que nos veamos los controladores y las vistas no vamos a poder probar la app en su totalidad (visualmente) por lo que los invito a esperar la salida de los siguientes tutoriales!</p>
</blockquote>

<hr />

<h2>Conclusión</h2>

<p>En esta lección, aprendimos a crear nuestro primer modelo en Ember.js Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso.</p>

<p>¡Te espero la próxima semana!</p>
