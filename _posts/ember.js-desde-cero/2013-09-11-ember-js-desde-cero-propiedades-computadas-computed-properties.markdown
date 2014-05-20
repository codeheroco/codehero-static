---
layout: post
status: publish
published: true
title: Propiedades Computadas (Computed Properties)
author: Carlos Picca
author_login: carlos
author_email: carlospicca@gmail.com
wordpress_id: 2218
wordpress_url: http://codehero.co/?p=2218
date: 2013-09-11 00:53:57.000000000 -04:30
serie: Ember.js desde Cero
dificultad: Aprendiz
duracion: 15
description: Bienvenidos Ember.js desde Cero. Hoy, vamos a aprender todo lo relacionado con las propiedades computadas dentro de Ember.js.
categories:
- Cursos
- Ember.js
tags:
- atributos
- ember.js
- propiedades
- computadas
- calculadas
- emberjs
- dinamicas
---
<p>Bienvenidos Ember.js desde Cero, curso en el cual aprendemos a programar sin conocimiento alguno. En el capítulo anterior, te enseñe todo lo relacionado con las clases y los objetos dentro de Ember.js. Si eres nuevo en este curso, te recomiendo que le eches un vistazo al capítulo anterior para que te pongas en contexto (<a href="http://codehero.co/ember-js-desde-cero-clases-y-objetos/">Capítulo 2 - Clases y Objetos</a>)</p>

<p>Hoy, vamos a aprender todo lo relacionado con las propiedades computadas dentro de Ember.js.</p>

<hr />

<h2>¿Qué es una propiedad computada?</h2>

<p>En pocas palabras, las propiedades computadas permiten declarar funciones como propiedades. Es súper útil para crear nuevos valores dado una o más propiedades normales de una clase.</p>

<hr />

<h2>¿Cómo usarlas?</h2>

<p>Sencillo, lo que tenemos que hacer es lo siguiente:</p>

<p>Primero debemos crear un método dentro de la declaración de la clase el cual posea las siguientes características:</p>

<ol>
<li>Debe retornar un valor que genere nuevo contenido.</li>
<li>Debe estar seguido de la palabra clave <code>property</code>.</li>
<li>La palabra clave <code>property</code> debe incluir entre paréntesis los atributos de los cuales esa propiedad va a depender.</li>
</ol>

<p>Siguiendo el ejemplo anterior, veamos como crear una propiedad computada que genere un <code>link</code> de un <code>marcapagina</code>. Estamos usando el ejemplo del capitulo anterior por lo que te recomiendo que le definición un vistazo LINK</p>

<p>Antes que nada debemos agregamos la siguiente definición dentro de la clase <code>Marcapagina</code>:</p>

```javascript
,link: function() {
  return this.convertir_en_link();
}.property("nombre", "url")
```

<blockquote>
  <p>Observemos que una vez que declaramos una propiedad dentro de una clase, esta va a estar disponible para todas sus instancias.</p>
</blockquote>

<p>El archivo <code>index.html</code> debería lucir así:</p>

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Aprendamos Ember.js en Codehero!</title>
		<script src="jquery.min.js"></script>
		<script src="handlebars.js"></script>
		<script src="ember.js"></script>
		<script>
			window.App = Ember.Application.create();

            var Marcapagina = Ember.Object.extend({

                convertir_en_link: function() {
                    return "<a href='" + this.get("url") + "'>"
                            + this.get("nombre")
                            + "</a>";
                }
                ,link: function() {
                	return this.convertir_en_link();
                }.property("nombre", "url")

            });


            var marcapagina = Marcapagina.create({ nombre: "Codehero", url: "http://codehero.co"});

        </script>
	</head>
<body>
	<script type="text/x-handlebars" data-template-name="index">
		<h1>Bienvenido a Ember.js!</h1>
	</script>
</body>
</html>
```

<p>Ahora probemos esta nueva propiedad que hemos creado, para eso debemos abrir el explorador de nuestra preferencia y navegar hasta el archivo <code>index.html</code>.</p>

<p>Una vez que haya cargado la pagina iniciamos la consola y tipeamos lo siguiente:</p>

```javascript
marcapagina.get("link")
```

<p>Obtendríamos lo siguiente:</p>

<p><img src="http://i.imgur.com/Qg0d5iM.png" alt="link-emberjs-propiedades-computadas" /></p>

<blockquote>
  <p>Observemos que nos devuelve la propiedad computada con los valores adecuados al <strong>nombre</strong> y <strong>url</strong> de la instancia <code>marcapagina</code>.</p>

  <p>Recuerda que para obtener el valor de una propiedad en Ember.js debemos usar el método <strong>get()</strong>.</p>
</blockquote>

<hr />

<h2>Diferencia entre propiedad y propiedad computada</h2>

<p>La diferencia es que una <strong>propiedad</strong> es un atributo que va a poseer una instancia de una clase y no necesita depender de otros para ser procesado. Y una <strong>propiedad computada</strong> es un método que devuelve un nuevo conjunto de información generada con la ayuda de los atributos de la clase.</p>

<p>Para hacerlo mas sencillo, veamos un ejemplo:</p>

<p>Si queremos acceder al <strong>nombre</strong> de la instancia <code>marcapagina</code>, lo único que tuviéramos que hacer es lo siguiente:</p>

<p>Tipear en la consola del explorador:</p>

```javascript
marcapagina.nombre
```

<p>Obtendríamos lo siguiente:</p>

<p><img src="http://i.imgur.com/clj2BBJ.png" alt="nombre-emberjs-propiedades-computadas" /></p>

<blockquote>
  <p>Observemos que podemos acceder directamente a esa propiedad ya que es un atributo propio de la instancia <code>marcapagina</code>, el cual es un objeto de la clase <code>Marcapagina</code>.</p>
</blockquote>

<p>Ahora si queremos acceder a la propiedad <strong>link</strong> de la instancia <code>marcapagina</code> no vamos a poder hacerlo como la obtuvimos anteriormente. Veamos porque:</p>

<p>Si tipeamos en la consola del explorador:</p>

```javascript
marcapagina.link
```

<p>Obtendríamos lo siguiente:</p>

<p><img src="http://i.imgur.com/y5HcM9V.png" alt="simple-link-emberjs-propiedades-computadas" /></p>

<blockquote>
  <p>Observemos que nos retorna <code>undefined</code> porque esa propiedad necesita ser computada y para que esta sea procesada necesitamos acceder a ella a través del método <strong>get()</strong> que proveen todas las clases dentro de Ember.js.</p>
</blockquote>

<hr />

<h2>Actualizaciones Dinámicas</h2>

<p>No te preocupes si todavía estas confundido tratando de entender el comportamiento de una propiedad computada. La manera mas fácil de comprenderlo es echándole un vistazo a la parte dinámica de este tipo de propiedades.</p>

<h3>¿Qué quiere decir esto?</h3>

<p>Las propiedades calculadas, por defecto, observan los cambios realizados en las propiedades de las cuales dependen y se actualizan dinámicamente cuando se les llama. Veamos como ejecutar un cambio dinámico:</p>

<p>Primero verifiquemos que nos devuelve la propiedad <code>link</code> cuando accedemos a ella. En el explorador tipea lo siguiente:</p>

```javascript
marcapagina.get("link")
```

<p>Deberíamos obtener lo siguiente:</p>

<p><img src="http://i.imgur.com/F1v4Wre.png" alt="link-II-emberjs-propiedades-computadas" /></p>

<p>Ahora cambiemos el <code>nombre</code> de la instancia <code>marcapagina</code> por <strong>Carlos</strong>. Para eso solo basta con tipear lo siguiente:</p>

```javascript
marcapagina.set("nombre", "Carlos")
```

<p>Obtendríamos:</p>

<p><img src="http://i.imgur.com/eYSPslX.png" alt="set-emberjs-propiedades-computadas" /></p>

<blockquote>
  <p>Observemos que para guardar un nuevo valor de un atributo debemos usar el método <strong>set()</strong> que trae por defecto Ember.js.</p>
</blockquote>

<p>Ahora si volvemos a consultar la propiedad <code>link</code>:</p>

```javascript
marcapagina.get("link")
```

<p>Obtendríamos:</p>

<p><img src="http://i.imgur.com/db7S7lc.png" alt="verificar-emberjs-propiedades-computadas" /></p>

<blockquote>
  <p>Como podemos observar ahora el link ha cambiado su nombre de <em>Codehero</em> a <em>Carlos</em>.</p>
</blockquote>

<hr />

<h2>Propiedades computadas anidadas</h2>

<p>Por último vamos a ver como podemos anidar propiedades computadas. Ember.js nos permite usar propiedades computadas dentro de una nueva declaración de una propiedad computada. Observemos el siguiente ejemplo:</p>

<p>Supongamos que ahora queremos realizar una propiedad que nos permita imprimir el <strong>detalle</strong> de un <strong>marcapagina</strong> en particular. Como particularidad uno de los campos que debemos mostrar en el detalle es el link completo del <strong>marcapagina</strong>. Veamos como hacerlo:</p>

<p>Lo primero que tenemos que hacer es agregar a la definición de la clase <code>Marcapagina</code> la siguiente propiedad computada:</p>

```javascript
,detalle: function() {
  return 'Link: ' + this.get('link') + '; Nombre: ' + this.get('nombre') + '; Url: ' + this.get('url');
}.property('link', 'nombre', 'url')
```

<blockquote>
  <p>Observemos que <code>this.get('link')</code> realiza un llamado a la propiedad computada <code>link</code>, para así poder mostrar el link en html completo.</p>
</blockquote>

<p>El archivo <code>index.html</code> debería lucir así:</p>

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Aprendamos Ember.js en Codehero!</title>
		<script src="jquery.min.js"></script>
		<script src="handlebars.js"></script>
		<script src="ember.js"></script>
		<script>
			window.App = Ember.Application.create();

            var Marcapagina = Ember.Object.extend({

                convertir_en_link: function() {
                    return "<a href='" + this.get("url") + "'>"
                            + this.get("nombre")
                            + "</a>";
                }
                ,link: function() {
                	return this.convertir_en_link();
                }.property("nombre", "url")

                ,detalle: function() {
    				return 'Link: ' + this.get('link') + '; Nombre: ' + this.get('nombre') + '; Url: ' + this.get('url');
 				}.property('link', 'nombre', 'url')

            });


            var marcapagina = Marcapagina.create({ nombre: "Codehero", url: "http://codehero.co"});

        </script>
	</head>
<body>
	<script type="text/x-handlebars" data-template-name="index">
		<h1>Bienvenido a Ember.js!</h1>
	</script>
</body>
</html>
```

<p>Si lo probamos en el explorador y tipeamos lo siguiente:</p>

```javascript
marcapagina.get("detalle")
```

<p>Obtendríamos:</p>

<p><img src="http://i.imgur.com/6ezvOr2.png" alt="detalle-emberjs-propiedades-computadas" /></p>

<blockquote>
  <p>Como pueden observar hemos creado una propiedad computada anida ya que la propiedad <code>detalle</code> usa a la propiedad <code>link</code>.</p>
</blockquote>

<p>Si quieres echarle un vistazo a la documentación oficial de propiedades computadas te invito a que visites <a href="http://emberjs.com/guides/object-model/computed-properties/">Ember.js propiedades computadas</a>.</p>

<p>No te preocupes si quedaste confundido con las propiedades computadas, cuando veamos como usar los <em>templates</em> o <em>plantillas</em> dentro de <strong>Ember.js</strong> verás que nos facilitaran mucho la programación de las vistas.</p>

<hr />

<h2>Conclusión</h2>

<p>En esta lección, vimos todo lo relacionado con las propiedades computadas dentro de Ember.js. Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso.</p>

<p>¡Te espero la próxima semana!</p>
