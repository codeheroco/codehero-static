---
layout: post
status: publish
published: true
title: Controlador
author: Carlos Picca
author_login: carlos
author_email: carlospicca@gmail.com
wordpress_id: 2839
wordpress_url: http://codehero.co/?p=2839
date: 2013-12-11 07:02:48.000000000 -04:30
serie: Ember.js desde Cero
dificultad: Aprendiz
duracion: 15
description: Curso en el cual aprenderemos Ember.js desde Cero. Estudiaremos como crear nuestro primer controlador en Ember.js
categories:
- Cursos
- Ember.js
tags:
- ember
- controlador
- objecto
- array
---
<p>Bienvenidos Ember.js desde Cero, curso en el cual aprendemos a programar sin conocimiento alguno. En el capítulo anterior, aprendimos a crear nuestro primer modelo. Si eres nuevo en este curso, te recomiendo que le eches un vistazo al capítulo anterior para que te pongas en contexto (<a href="http://codehero.co/ember-js-desde-cero-modelos/">Capítulo 8 - Modelos</a>)</p>

<p>Hoy, vamos a aprender a crear nuestro primer controlador en Ember.js.</p>

<div class="alert alert-info">
  <h4>
    ¡Alerta!
  </h4> Todos los ejemplos usados en el tutorial de son una continuación de los ejemplos del capitulo anterior.
</div>

<hr />

<h2>¿Cómo creo un controlador en Ember.js?</h2>

<p>Lo primero que necesitamos hacer para crear un controlador en Ember.js es definir que tipo de data vamos a extraer de nuestro modelo, ya que puede ser una colección de objetos como puede ser un solo objeto el que vamos a extraer. Veamos los dos tipos:</p>

<h3>Representar múltiples objetos</h3>

<p>Para representar múltiples objetos lo que tenemos que hacer es:</p>

<p>Primero crear el controlador asociado al modelo que queremos controlar en nuestro caso como estamos usando el ejemplo de capítulos anteriores vamos a crear el archivo <code>marcapaginas_controller.js</code> dentro de la carpeta <code>controllers</code> de nuestra app.</p>

<p>Una vez que hayamos creado el archivo agregamos el siguiente código:</p>

```javascript
 App.MarcapaginasController = Ember.ArrayController.extend();
 ```

<blockquote>
  <p>Observemos que lo que estamos haciendo es declarar dentro de nuestro app un controlador denominado <code>Marcapaginas</code>, el cual extiende de <code>Ember.ArrayController</code>, y nos va renderizar todos los objetos tipos marcapagina que tengamos disponibles dentro de nuestro modelo en una vista (No te preocupes, las vistas las vamos a ver mas adelante y así podrás entender los controladores en su totalidad).</p>

  <p>Cabe destacar que dentro del <code>extend()</code> podemos declara propiedades, métodos y aciones que nos ayuden a controlar nuestras vistas (Indagaremos mas adelante sobre los tipos de acciones que podemos usar en Ember.js).</p>
</blockquote>

<p>Lo siguiente que tenemos que hacer es declarar un recurso o resource dentro de nuestro archivo <code>router.js</code> el cual nos lleve a este controller. Veamos como hacerlo:</p>

<p>En el archivo <code>router.js</code> agregamos la siguiente linea:</p>

```javascript
this.resource(“marcapaginas”);
```

<blockquote>
  <p>Si no sabes como o manejar recursos te recomiendo que le eches un vistazo a <a href="http://codehero.co/ember-js-desde-cero-rutas-router/">Router</a>.</p>
</blockquote>

<p>Por último, debemos incluir la referencia de nuestro controlador en el archivo <code>index.html</code>.</p>

Agreguemos lo siguiente dentro de los `{% raw %} <head> {% endraw %}` tags:

```html
<script src=“js/app/controllers/marcapaginas_controller.js”></script>
```

<h3>Representar un solo objeto</h3>

<p>Para representar un solo objeto lo que tenemos que hacer es:</p>

<p>Primero crear el controlador asociado al modelo que queremos controlar en nuestro caso como estamos usando el ejemplo de capítulos anteriores vamos a crear el archivo <code>marcapagina_controller.js</code> dentro de la carpeta <code>controllers</code> de nuestra app.</p>

<p>Una vez que hayamos creado el archivo agregamos el siguiente código:</p>

```javascript
App.MarcapaginaController = Ember.ObjectController.extend();
```

<blockquote>
  <p>Observemos que lo que estamos haciendo es declarar dentro de nuestro app un controlador denominado <code>Marcapagina</code>, el cual extiende de <code>Ember.ObjectController</code>, y nos va renderizar el objeto de tipo marcapagina (No te preocupes, las vistas las vamos a ver mas adelante y así podrás entender los controladores en su totalidad).</p>

  <p>Cabe destacar que dentro del <code>extend()</code> podemos declara propiedades, métodos y aciones que nos ayuden a controlar nuestras vistas (Indagaremos mas adelante sobre los tipos de acciones que podemos usar en Ember.js).</p>
</blockquote>

<p>Lo siguiente que tenemos que hacer es declarar un recurso o resource dentro de nuestro archivo <code>router.js</code> el cual nos lleve a este controller. Veamos como hacerlo:</p>

<p>En el archivo <code>router.js</code> agregamos la siguiente linea:</p>

```javascript
this.resource(“marcapagina”, {path: “/marcapaginas/:marcapagina_id”});
```

<blockquote>
  <p>Observemos que hemos añadido la propiedad <code>path</code>, esta es usada para que cada vez que llamemos al recurso <strong>marcapagina</strong> nos redireccione a la url que nosotros queramos, en este caso necesitamos que <strong>“/marcapaginas/:marcapagina_id”</strong>. El porque de hacer esto, es para mantener lo mayor posible el estilo REST dentro de nuestra app.</p>

  <p>Si no sabes como o manejar recursos te recomiendo que le eches un vistazo a <a href="http://codehero.co/ember-js-desde-cero-rutas-router/">Router</a>.</p>
</blockquote>

<p>Por último, debemos incluir la referencia de nuestro controlador en el archivo <code>index.html</code>.</p>

Agreguemos lo siguiente dentro de los`{% raw %} <head> {% endraw %}` tags:

```html
<script src=“js/app/controllers/marcapagina_controller.js”></script>
```

<blockquote>
  <p>¡Hasta que nos veamos las vistas no vamos a poder probar la app en su totalidad por lo que los invito a esperar la salida de los siguientes tutoriales!</p>

  <p>El código de estos ejemplos estada disponible en el repositorio una vez terminado esta parte (controlador/vista/modelo/templates) de la series.</p>
</blockquote>

<hr />

<h2>Conclusión</h2>

<p>En esta lección, aprendimos a crear nuestro primer controlador en Ember.js. Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso.</p>

<p>¡Te espero la próxima semana!</p>
