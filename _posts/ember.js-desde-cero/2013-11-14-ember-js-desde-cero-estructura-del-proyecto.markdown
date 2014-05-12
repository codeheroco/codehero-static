---
layout: post
status: publish
published: true
title: Estructura del proyecto
author: Carlos Picca
author_login: carlos
author_email: carlospicca@gmail.com
wordpress_id: 2603
wordpress_url: http://codehero.co/?p=2603
date: 2013-11-14 02:17:50.000000000 -04:30
serie: Ember.js desde Cero
dificultad: Aprendiz
duracion: 10
description: Curso en el cual aprenderemos Ember.js desde Cero. Estudiaremos como generar nuestra estructura de proyecto.
categories:
- Cursos
- Ember.js
tags:
- estructura
- proyecto
- ember
- ember.js
---
<p>Bienvenidos Ember.js desde Cero, curso en el cual aprendemos a programar sin conocimiento alguno. En el capítulo anterior, te enseñe todo lo relacionado con las rutas y router dentro de Ember.js. Si eres nuevo en este curso, te recomiendo que le eches un vistazo al capítulo anterior para que te pongas en contexto (<a href="http://codehero.co/ember-js-desde-cero-rutas-router/">Capítulo 6 - Rutas (Router)</a>)</p>

<p>Hoy, vamos a aprender a generar nuestra estructura de proyecto.</p>

<hr />

<p>¿Cómo estructurar un proyecto en Ember.js? En realidad en Ember.js no existe un estándar sobre como organizar o estructurar nuestros proyectos. Uno puede generar los modelos, vistas, templates, controladores y rutas en el mismo archivo, en nuestro caso en el archivo <code>app.js</code> con el cual hemos venido trabajando a lo largo del curso. Yo prefiero mantener un poco las cosas mas organizadas por lo que estructuro mis proyecto muy parecido a lo que encontramos en un proyecto de Ruby on Rails. Si quieres conocer sobre Rails te invito a que le eches un vistazo a la <a href="http://codehero.co/series/ruby-on-rails-desde-cero/">Rails desde Cero</a>.</p>

<p>Veamos primero la organización necesaria que debería tener nuestro proyecto, para así entender que hay dentro de las principales carpetas.</p>

<ul>
<li><p><strong>/css</strong> – Contiene los archivos <em>CSS</em> que nuestra aplicación necesita para mostrar el look deseado por nosotros. En esta carpeta no la tocaremos mucho ya que todo depende del los css que quieras aplicar en tu app.</p></li>
<li><p><strong>/js</strong> – Contiene todos los archivos de javascript que nuestra app va a necesitar para poder funcionar y en los cuales vamos a desarrollar el comportamiento de la misma.</p></li>
<li><p><strong>/app</strong> – Contiene los controladores, modelos, vistas y configuraciones de la aplicación. En esta carpeta escribiremos la mayoría del código para que nuestra aplicación funcione.</p></li>
<li><p><strong>/app/controllers</strong> – Contiene todos los archivos con las clases de los controladores que sirven para interactuar con los modelos, las vistas y manejar el comportamiento de la aplicación.</p></li>
<li><p><strong>/app/models</strong> – Los modelos son clases que representan la información (datos) de la aplicación y las reglas para manipularlos.</p></li>
<li><p><strong>/app/views</strong> – Este directorio contiene los archivos que poseen el comportamiento de renderización de todos los templates de la aplicación.</p></li>
<li><p><strong>/app/app.js</strong> – En este archivo van a estar todos las configuraciones necesarias para que nuestro site funcione correctamente.</p></li>
<li><p><strong>/app/router.js</strong> – En este archivo van a estar definidas todas las rutas que nuestra app va a necesitar.</p></li>
<li><p><strong>/libs</strong> – En esta carpeta se alojan todas las librerías que conforman el framework y sus dependencias.</p></li>
<li><p><strong>index.html</strong> – En este archivo van a estar todos los templates necesarios para poder crear el <em>”workflow”</em> de la aplicación.</p></li>
</ul>

<hr />

<p>¿Por donde empezamos? Muy fácil, lo que debemos hacer es lo siguiente:</p>

<p>Navegamos a <a href="http://emberjs.com/">Sitio de Ember.js</a> y descargamos el <em>paquete de inicio o starter kit</em>.</p>

<p><img src="http://i.imgur.com/6Eb3x3X.png" alt="site-ember-js" /></p>

<p>Una vez descargado, creamos las carpetas necesarias con ayuda de nuestro sistema operativo o vía consola para obtener una estructura de proyecto idéntica a la antes propuesta.</p>

<p>Al final deberíamos obtener la siguiente estructura de proyecto:</p>

<p><img src="http://i.imgur.com/CWttYXW.png" alt="estructura-ember-js" /></p>

<hr />

<h2>Conclusión</h2>

<p>En esta lección, aprendimos a generar nuestra estructura de proyecto. Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso.</p>

<p>¡Te espero la próxima semana!</p>
