---
layout: post
status: publish
published: true
title: Observadores
author: Carlos Picca
author_login: carlos
author_email: carlospicca@gmail.com
wordpress_id: 2308
wordpress_url: http://codehero.co/?p=2308
date: 2013-09-25 05:28:04.000000000 -04:30
serie: Ember.js desde Cero
dificultad: Novato
duracion: 20
description: Bienvenidos Ember.js desde Cero. Hoy, vamos a aprender todo lo relacionado con los observadores dentro de Ember.js.
categories:
- Cursos
- Ember.js
tags:
- ember
- emberjs
- observador
- observadores
- observer
---
<p>Bienvenidos Ember.js desde Cero, curso en el cual aprendemos a programar sin conocimiento alguno. En el capítulo anterior, te enseñe todo lo relacionado con las propiedades computadas dentro de Ember.js. Si eres nuevo en este curso, te recomiendo que le eches un vistazo al capítulo anterior para que te pongas en contexto (<a href="http://codehero.co/ember-js-desde-cero-propiedades-computadas-computed-properties/">Capítulo 3 - Propiedades Computadas (Computed Properties)</a>)</p>

<p>Hoy, vamos a aprender todo lo relacionado con los observadores dentro de Ember.js.</p>

<div class="alert alert-info">
  <h4>
    ¡Alerta!
  </h4> Todos los ejemplos usados en el tutorial de son una continuación de los ejemplos del capitulo anterior.
</div>

<hr />

<h2>¿Qué es un observador?</h2>

<p>Es una característica de Ember.js la cual nos permite disparar una función o método cada vez que una propiedad o atributo en particular cambie su valor.</p>

<hr />

<h2>¿Cómo crear un observador?</h2>

<p>Lo primero que tenemos que hacer cuando deseemos crear un observador es declarar la función que vamos a llamar cada vez que se dispare dicho observador. En nuestro caso vamos a usar el ejemplo que usamos en el <a href="http://codehero.co/ember-js-desde-cero-propiedades-computadas-computed-properties/">Capítulo 3 - Propiedades Computadas (Computed Properties)</a>.</p>

<p>Para declarar dicha función vamos a necesitar modificar la declaración de la clase <strong>Marcapagina</strong>. Veamos como:</p>

<p>En la declaración agregamos las siguientes lineas:</p>

```javascript
,modificarCuenta: function() {
   cuentaGlobal += 1;
   console.log("El valor global de cuentaGlobal es " + cuentaGlobal);
}
```

<blockquote>
  <p>Lo que hace esta función en particular, es sumarle 1 a una variable global llamada <code>cuentaGlobal</code> y luego loggearla en la consola con la siguiente instrucción <code>console.log("El valor global de cuentaGlobal es " + cuentaGlobal)</code>.</p>
</blockquote>

<p>Para que el método que acabamos de crear pueda funcionar es necesario crear <code>cuentaGlobal</code> como una variable local. Veamos como hacerlo:</p>

<p>Antes de la declaración de la clase <strong>Marcapagina</strong> agregamos la siguiente linea:</p>

```javascript
var cuentaGlobal = 0;
```

<blockquote>
  <p>Observemos que de esta manera es como se declaran las variables locales en Ember.js.</p>
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

                ,modificarCuenta: function() {
                    cuentaGlobal += 1;
                    console.log("El valor global de cuentaGlobal es " + cuentaGlobal);
                }

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

<p>Una vez que tengamos definido el método que queramos llamar cada vez que se dispare el observador pasamos a declarar el observador como tal. Podemos hacerlo de dos maneras diferentes:</p>

<hr />

<h2>Método 1 - Declararlo en el mismo método que se disparará</h2>

<p>Una forma de declara un observador es en el mismo método que se va a disparar. Veamos un ejemplo para entenderlo mejor:</p>

<p>Supongamos que queremos disparar <code>modificarCuenta</code> (el método que creamos anteriormente) cada vez que la propiedad <code>nombre</code> cambie. Para eso hacemos lo siguiente:</p>

<p>En la declaración del método agregamos:</p>

```javascript
.observes("nombre")
```

<p>El método debería lucir así:</p>

```javascript
,modificarCuenta: function() {
   cuentaGlobal += 1;
   console.log("El valor global de cuentaGlobal es " + cuentaGlobal);
}.observes("nombre")
```

<blockquote>
  <p>Observemos que con <code>observes("nombre")</code> avisamos a Ember.js que la propiedad <code>nombre</code> ahora posee un observador que disparará el método <code>modificarCuenta</code>.</p>
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

                ,modificarCuenta: function() {
                    cuentaGlobal += 1;
                    console.log("El valor global de cuentaGlobal es " + cuentaGlobal);
                }.observes("nombre")

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

<hr />

<h2>Método 2 - Declararlo con el uso de <strong>Ember.observer</strong></h2>

<p>Otra forma de declarar un observador en Ember.js es haciendo uso del <strong>Ember.observer</strong> que nos ofrece el framework. Veamos un ejemplo para entenderlo mejor:</p>

<p>Supongamos que queremos disparar <code>modificarCuenta</code> (el método que creamos anteriormente) cada vez que la propiedad <code>nombre</code> cambie. Para eso hacemos lo siguiente:</p>

<p>La declaración del método ahora debería lucir así:</p>

```javascript
,modificarCuenta: Ember.observer(function() {
   cuentaGlobal += 1;
   console.log("El valor global de cuentaGlobal es " + cuentaGlobal);
}, "nombre")
```

<blockquote>
  <p>Observemos que <strong>Ember.observer</strong> toma dos atributos el primero debe ser la función que queremos disparar y el segundo la variable que queremos observar.</p>
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
</body>
</html>
```

<hr />

<h2>Probemos en el explorador</h2>

<p>Una vez que declaremos nuestro observador es hora de probarlo en la consola del explorador. Para eso navegamos hasta el archivo <code>index.html</code>.</p>

<p>Empecemos por saber cuanto es el valor de la variable global <code>cuentaGlobal</code> que declaramos anteriormente:</p>

<p>Tipeamos:</p>

```javascript
cuentaGlobal
```

<p><img src="http://i.imgur.com/Bu0sSH8.png" alt="cuentaGlobal-observador-emberjs" /></p>

<blockquote>
  <p>Observemos que su valor es cero porque apenas la estamos inicializando.</p>
</blockquote>

<p>Ahora vamos a modificar la variable <code>nombre</code> para así probar el observador. Hagamos lo siguiente:</p>

```javascript
marcapagina.set("nombre", "prueba")
```

<p>Deberíamos obtener:</p>

<p><img src="http://i.imgur.com/0P8I78y.png" alt="set-observador-emberjs" /></p>

<blockquote>
  <p>Observemos que al utilizar el <em>log</em> en la función <code>modificarCuenta</code> nos informará el valor real de <code>cuentaGlobal</code>.</p>
</blockquote>

<p>Por no dejar, probemos otra vez cuanto es el valor de <code>cuentaGlobal</code>:</p>

<p><img src="http://i.imgur.com/D4xCGOX.png" alt="cuentaGlobal-II-observador-emberjs" /></p>

<p>Si quieres saber más información sobre <em>observadores</em> en <strong>Ember.js</strong> te invito a que visites <a href="http://emberjs.com/guides/object-model/observers/">Observadores</a></p>

<hr />

<h2>Conclusión</h2>

<p>En esta lección, vimos todo lo relacionado con los observadores dentro de Ember.js. Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso.</p>

<p>¡Te espero la próxima semana!</p>
