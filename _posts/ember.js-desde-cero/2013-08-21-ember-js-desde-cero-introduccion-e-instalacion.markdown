---
layout: post
status: publish
published: true
title: Introducción e Instalación
author: Carlos Picca
author_login: carlos
author_email: carlospicca@gmail.com
wordpress_id: 2059
wordpress_url: http://codehero.co/?p=2059
date: 2013-08-21 01:35:52.000000000 -04:30
serie: Ember.js desde Cero
dificultad: Aprendiz
duracion: 15
description: Bienvenidos Ember.js desde Cero. Hoy, vamos a ver una introducción a Ember.js, sus beneficios y vamos a crear nuestra primera app con el framework.
categories:
- Cursos
- Ember.js
tags:
- ember
- js
- javascript
- instalcion
- framework
- app
- handlebars
- jquery
---
<p>Bienvenidos Ember.js desde Cero, curso en el cual aprendemos a programar sin conocimiento alguno. Hoy, vamos a ver una introducción a Ember.js, sus beneficios y vamos a crear nuestra primera app con el framework.</p>

<hr />

<h2>¿Qué es Ember.js?</h2>

<p>Ember.js es un framework JavaScript para crear aplicaciones web del lado del cliente (código abierto). Esta basado en la arquitectura modelo-vista-controlador (MVC).</p>

<p>Esta catalogado como unos de los principales framework a en el mundo de JavaScript ya que permite a los desarrolladores crear aplicaciones de una sola pagina (single-page) escalables.</p>

<h2>¿Porqué deberíamos usar Ember.js?</h2>

<p>Voy a decirte algunas características que te van a ayudar a entender porque usar Ember.js es una de las mejores decisiones que puedes tomar a la hora de desarrollar una app en JavaScript:</p>

<ul>
<li><p><strong>Convención sobre configuración</strong> - Ember.js trata de estandarizar el desarrollo de aplicaciones del lado del cliente, para eso utiliza reglas muy estrictas para crear un potente y sencillo desarrollo de nuestras aplicaciones. Para cumplir este objetivo posee una serie de clases y procedimientos los cuales nos ayudan a renderizar nuestras aplicaciones y controlar nuestra data.</p></li>
<li><p><strong>Enlace de datos</strong> - Ember.js esta muy unido a Handlebars.js, el cual es una librería que nos permite definir templates o plantillas semánticas con las cuales podemos representar data en nuestras vistas de manera sencilla. La principal características es la automatización de cambios, es decir, cuando un objeto JavaScript que tengamos enlazado cambia, automáticamente se actualiza DOM de la app y viceversa, cuando el DOM cambia se actualiza automáticamente el objeto de JavaScript. </p></li>
<li><p><strong>Mayor enfoque en la creación</strong> - Ember.js te permite enfocarte en el desarrollo de tu aplicación ya que él es el que se encarga de la parte técnica.</p></li>
</ul>

<p>Todo estas proezas que hace que Ember.js nos permita hacer una aplicación tan espectacular vienen con un costo asociado. Debo advertirte que no es tan fácil de aprender. Seamos un poco más claros, es fácil de desarrollar pero el problema viene cuando debemos entender los conceptos sobre como Ember.js nos obliga a trabajar.</p>

<p><strong>¡Pero no se desalienten que acá estamos para ayudarlos!</strong></p>

<hr />

<h2>¿Cómo usar Ember.js?</h2>

<p>Empecemos por saber como configurar una aplicación para que funcione con Ember.js, lo primero que necesitamos saber es que dependencias debemos descargar para que nuestra app funcione correctamente.</p>

<h3>jQuery</h3>

<p>La primera dependencia es <strong>jQuery</strong>. Para descargarla debemos dirigirnos a <a href="http://jquery.com/download/">Descargas jQuery</a>.</p>

<p>Descargarnos la última versión en mi caso la <strong>1.10.2</strong>:</p>

<p><img src="http://i.imgur.com/ABW0Oor.png" alt="jquery" /></p>

<blockquote>
  <p>Es importante que descargues la versión comprimida. Para mayor información sobre <a href="http://jquery.com/">jQuery</a>.</p>
</blockquote>

<h3>Handlebars</h3>

<p>La segunda dependencia es <strong>Handlebars</strong>. Para descargarla debemos dirigirnos a <a href="http://handlebarsjs.com/">Descargas Handlebars</a>.</p>

<p>Descargarnos la última versión en mi caso la <strong>1.0.0</strong>:</p>

<p><img src="http://i.imgur.com/eflvYuN.png" alt="handlebars.js" /></p>

<blockquote>
  <p>Para mayor información sobre <a href="http://handlebarsjs.com/">Handlebars</a>.</p>
</blockquote>

<h3>Ember.js </h3>

<p>La tercera dependencia es <strong>Ember.js</strong>. Para descargarla debemos dirigirnos a <a href="http://emberjs.com/">Ember.js</a>.</p>

<p>Descargarnos la última versión en mi caso la <strong>1.0.0</strong>:</p>

<p><img src="http://i.imgur.com/4P4u4dk.png" alt="ember.js" /></p>

<blockquote>
  <p>Es importante que la versión sea la de desarrollo porque es la que nos permite saber cuales son los errores de la app en caso de que exista alguno.</p>
</blockquote>

<p>Ok, una vez que hemos descargado todas las dependencias es hora de crear nuestra primera app en Ember.js.</p>

<p>Lo primero que vamos a hacer es crear un archivo <code>index.html</code> (puedes crearlo en cualquier lado dentro de tu sistema).</p>

<p>Agreguemos el siguiente código:</p>

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Aprendamos Ember.js en Codehero!</title>
	</head>
<body>

</body>
</html>
```

<p>Ahora a este código debemos agregarle las dependencias que descargamos anteriormente. Veamos cómo:</p>

```javascript
<script src="jquery.min.js"></script>
<script src="handlebars.js"></script>
<script src="ember.js"></script>
```

<blockquote>
  <p>Es importante que los archivos de las dependencias estén en el mismo nivel de la app para no tener ningún tipo de problema al ejecutar este código. En el caso que las dependencias se encuentren en otra dirección solo basta con colocar la dirección donde se encuentran más el nombre del archivo.</p>
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
	</head>
<body>

</body>
</html>
```

<p>Probemos el archivo <code>index.html</code> en el explorador solo para comprobar que no exista ningún error con las dependencias (Hasta los momentos no hemos configurado nuestra app con el framework).</p>

<p><img src="http://i.imgur.com/nqlOc9a.png" alt="primera-app-emberjs" /></p>

<p>Si cargamos el archivo veremos que no nos aparece nada, y eso está bien!, pero vayamos más allá y revisemos las dependencias dentro del explorador. Para hacer esto debemos abrir el <strong>inspector de desarrollo</strong>, en mi caso, estoy usando Chrome para Mac, por lo que presionando <code>option + command + I</code> debería abrirlo. En la pestaña <strong>Resources</strong> deberían estar todos los scripts de dependencias.</p>

<p><img src="http://i.imgur.com/5XI8Y80.png" alt="dependencias-primera-app-emberjs" /></p>

<p>Lo siguiente es inicializar nuestra aplicación con Ember.js</p>

<blockquote>
  <p>El standard en este caso sería inicializar esta app en otro archivo, pero por lo sencillo de este ejemplo no vale la pena generar más archivos.</p>
</blockquote>

<p>Con esa nueva línea hemos creado nuestra aplicación:</p>

```javascript
<script>
    window.App = Ember.Application.create();
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
		</script>
	</head>
<body>

</body>
</html>
```

<p>Probemos la app un vez más en el explorador, tranquilos si no aparece nada, acuérdense que todavía no hemos creado ninguna plantilla la cual queramos renderizar.</p>

<p>Si de verdad queremos estar seguros de qué la app este siendo inicializada hagamos lo siguiente, en el <strong>inspector</strong>, vayamos a la pestaña que dice <em>Console</em> y escribamos <code>App</code>:</p>

<p><img src="http://i.imgur.com/3LMpDbS.png" alt="console-primera-app-emberjs" /></p>

<blockquote>
  <p>Si le aparece una serie de características y métodos en la variable <strong>class</strong> entonces quiere decir que hemos inicializado de manera correcta nuestra aplicación en Ember.js</p>
</blockquote>

<hr />

<h2>Plantillas</h2>

<p>Para mostrar información en la aplicación usamos lo que se denomina como templates o plantillas. Veamos cómo crear una:</p>

<p>Agreguemos al archivo <code>index.html</code> el siguiente código entre los tags <em>body</em>:</p>

```javascript
<script type="text/x-handlebars" data-template-name="index">
    <h1>
  Bienvenido a Ember.js!



</h1>
</script>
```

<blockquote>
  <p>Observemos que el <strong>type</strong> del script es <code>text/x-handlebars</code> ya que este tag permitirá a Ember.js determinar que este es una plantilla y que debe ser tratada como tal. Aparte, debemos asignarle un nombre a la plantilla <em>(data-template-name)</em>, en este caso vamos a usar <code>index</code>. </p>

  <p>Cabe destacar que Ember.js busca de manera automática los nombre de las plantilla, y el primero que trata de encontrar es el index.</p>
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
		</script>
	</head>
<body>
	<script type="text/x-handlebars" data-template-name="index">
		<h1>Bienvenido a Ember.js!</h1>
	</script>
</body>
</html>
```

<p>Si corremos en el explorador el archivo debemos observamos los siguiente:</p>

<p><img src="http://i.imgur.com/p152lAY.png" alt="plantilla-primera-app-emberjs" /></p>

<p>Felicitaciones has creado tu primera app con Ember.js!</p>

<hr />

<h2>Conclusión</h2>

<p>En esta lección, vimos una introducción a Ember.js, sus beneficios y creamos nuestra primera app con el framework. Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso.</p>

<p>¡Te espero la próxima semana!</p>
