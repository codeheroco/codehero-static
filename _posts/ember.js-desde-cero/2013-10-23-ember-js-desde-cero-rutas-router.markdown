---
layout: post
status: publish
published: true
title: Rutas (Router)
author: Carlos Picca
author_login: carlos
author_email: carlospicca@gmail.com
wordpress_id: 2438
wordpress_url: http://codehero.co/?p=2438
date: 2013-10-23 06:29:55.000000000 -04:30
serie: Ember.js desde Cero
dificultad: Aprendiz
duracion: 20
description: Curso en el cual aprenderemos Ember.js desde Cero. Estudiaremos todo lo relacionado con las rutas y router dentro de Ember.js (Simples y Anidadas).
categories:
- Cursos
- Ember.js
tags:
- rutas
- ember
- js
- route
- router
- nested routes
- rutas anidadas
- template
---
<p>Bienvenidos Ember.js desde Cero, curso en el cual aprendemos a programar sin conocimiento alguno. En el capítulo anterior, te enseñe todo lo relacionado con los observadores dentro de Ember.js. Si eres nuevo en este curso, te recomiendo que le eches un vistazo al capítulo anterior para que te pongas en contexto (<a href="http://codehero.co/ember-js-desde-cero-arquitectura/">Capítulo 5 - Arquitectura</a>)</p>

<p>Hoy, vamos a aprender todo lo relacionado con las rutas y router dentro de Ember.js.</p>

<div class="alert alert-info">
  <h4>
    ¡Alerta!
  </h4> Todos los ejemplos usados en el tutorial de son una continuación de los ejemplos del capitulo anterior.
</div>

<hr />

<h2>¿Cómo crear rutas en Ember.js?</h2>

<p>Lo primero que tenemos que hacer para crear rutas o routes en Ember.js es definirlas o mapearlas con la ayuda de <code>App.Router.map</code>. Veamos como hacerlos:</p>

<p>Agreguemos al archivo <code>index.html</code> las siguientes lineas:</p>

```javascript
App.Router.map(function() {
                this.route("nosotros");
                this.route("contacto");
            });
```

<blockquote>
  <p>Observemos lo siguiente:</p>

  <ul>
  <li>Dentro de <code>App.Router.map</code> definimos todas las rutas que nuestra app necesite. </li>
  <li>Para definir una ruta solo debemos utilizar la siguiente linea de comando <code>this.route(“nombre_de_la_ruta”)</code>. Lo único que tenemos que hacer es suplantar “nombre_de_la_ruta” con el nombre de la ruta que deseemos crear.</li>
  <li>Con <code>this.route("nosotros")</code> y <code>this.route("contacto")</code> creamos dos rutas una para la pagina de nosotros y otra para la pagina de contacto.</li>
  </ul>
</blockquote>

<p>Lo segundo que debemos hacer es crea los templates o plantilla que estas rutas van a renderizar (no te preocupes si no entiendes los templates o plantillas en este momento, los vamos a estar cubriendo en su totalidad en un próximo capitulo de la serie).</p>

<p>Para esto vamos a agregar al archivo <code>index.html</code> lo siguiente:</p>

```javascript
<script type="text/x-handlebars" data-template-name="nosotros">
        <h1>
  La pagina de nosotros!

</h1>
    </script>




<script type="text/x-handlebars" data-template-name="contacto">
        <h1>
  La pagina de contacto!

</h1>
    </script>
```

<blockquote>
  <p>Observemos que los templates que creamos son súper sencillos como el que creamos para renderizar la pagina del index. Contienen un titulo y los headers necesarios para poder probar las rutas en el explorador.</p>
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

            App.Router.map(function() {
                this.route("nosotros");
                this.route("contacto");
            });

            var cuentaGlobal = 0;

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

                ,modificarCuenta: Ember.observer(function() {
                    cuentaGlobal += 1;
                    console.log("El valor global de cuentaGlobal es " + cuentaGlobal);
                }, "nombre")

            });


            var marcapagina = Marcapagina.create({ nombre: "Codehero", url: "http://codehero.co"});

        </script>
	</head>
<body>
	<script type="text/x-handlebars" data-template-name="index">
		<h1>Bienvenido a Ember.js!</h1>
	</script>
    <script type="text/x-handlebars" data-template-name="nosotros">
        <h1>La pagina de nosotros!</h1>
    </script>
    <script type="text/x-handlebars" data-template-name="contacto">
        <h1>La pagina de contacto!</h1>
    </script>
</body>
</html>
```

<hr />

<h2>Probemos las rutas en el explorador</h2>

<p>Naveguemos hasta el archivo <code>index.html</code> en el explorador de tu preferencia. Si queremos probar la ruta de <strong>“nosotros”</strong> solo basta con navegar hasta <code>index.html#/nosotros</code> y debería aparecerte el template o la plantilla de nosotros:</p>

<p><img src="http://i.imgur.com/Wu7z6UB.png" alt="nosotros-ruta-router-ember-js" /></p>

<p>Ahora si navegamos hacia <code>index.html#/contacto</code> debería aparecerte lo siguiente:</p>

<p><img src="http://i.imgur.com/IfkMRIn.png" alt="contacto-ruta-router-ember-js" /></p>

<hr />

<h2>¿Cómo crear rutas anidadas en Ember.js?</h2>

<p>Para crear rutas anidadas debemos hacer los siguiente:</p>

<p>Cambiemos las rutas que definimos anteriormente con los siguiente:</p>

```javascript
App.Router.map(function() {
                this.resource("nosotros", function() {
                    this.route("equipo");
                });
                this.route("contacto");
            });
```

<blockquote>
  <p>Observemos lo siguiente:</p>

  <ul>
  <li>Para definir rutas anidadas dentro de Ember.js usamos <code>this.resource</code>.</li>
  <li>Para definir rutas sencillas dentro de Ember.js usamos <code>this.route</code>.</li>
  <li>En este caso estamos definiendo una ruta anidada hacia <strong>“nosotros”</strong> y dentro de esta definimos una ruta sencilla hacia <strong>"equipo”</strong>.</li>
  </ul>
</blockquote>

<p>Lo siguiente que tenemos que hacer es crear el template para la ruta <strong>”equipo”</strong>:</p>

```javascript
<script type="text/x-handlebars" data-template-name="nosotros/equipo">
        <h2>
  Unete al equipo!

</h2>
    </script>
```

<p>Para que el template o plantilla se muestre en el explorador debemos crear un <strong>outlet</strong> dentro del template de <strong>”nosotros”</strong> (no te preocupes si no entiendes que es un outlet, lo vamos a estar cubriendo en los próximos capítulos de la serie, por los momentos imagina que es un contenedor para el contenido de rutas anidadas). Para esto debemos modificar el template de de <strong>”nosotros”</strong> veamos como:</p>

```javascript
<script type="text/x-handlebars" data-template-name="nosotros">
        <h1>
  La pagina de nosotros!

</h1>
        {{outlet}}
    </script>
```

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

            App.Router.map(function() {
                this.resource("nosotros", function() {
                    this.route("equipo");
                });
                this.route("contacto");
            });

            var cuentaGlobal = 0;

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

                ,modificarCuenta: Ember.observer(function() {
                    cuentaGlobal += 1;
                    console.log("El valor global de cuentaGlobal es " + cuentaGlobal);
                }, "nombre")

            });


            var marcapagina = Marcapagina.create({ nombre: "Codehero", url: "http://codehero.co"});

        </script>
	</head>
<body>
	<script type="text/x-handlebars" data-template-name="index">
		<h1>Bienvenido a Ember.js!</h1>
	</script>
    <script type="text/x-handlebars" data-template-name="nosotros">
        <h1>La pagina de nosotros!</h1>
        {{outlet}}
    </script>
    <script type="text/x-handlebars" data-template-name="contacto">
        <h1>La pagina de contacto!</h1>
    </script>
    <script type="text/x-handlebars" data-template-name="nosotros/equipo">
        <h2>Unete al equipo!</h2>
    </script>
</body>
</html>
```

<hr />

<h2>Probemos las rutas anidadas en el explorador</h2>

<p>Naveguemos hasta el archivo <code>index.html</code> en el explorador de tu preferencia. Si queremos probar la ruta anidada de <strong>“equipo”</strong> solo basta con navegar hasta <code>index.html#/nosotros/equipo</code> y debería aparecerte lo siguiente:</p>

<p><img src="http://i.imgur.com/YFfDXZl.png" alt="equipo-ruta-anidada-router-ember-js" /></p>

<hr />

<h2>Conclusión</h2>

<p>En esta lección, vimos todo lo relacionado con las rutas y router dentro de Ember.js. Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso.</p>

<p>¡Te espero la próxima semana!</p>
