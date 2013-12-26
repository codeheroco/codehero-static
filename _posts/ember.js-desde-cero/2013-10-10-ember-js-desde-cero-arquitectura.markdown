---
layout: post
status: publish
published: true
title: Arquitectura
author: Carlos Picca
author_login: carlos
author_email: carlospicca@gmail.com
wordpress_id: 2370
wordpress_url: http://codehero.co/?p=2370
date: 2013-10-10 05:46:04.000000000 -04:30
categories:
- Cursos
- Ember.js
tags:
- mvc
- arquitectura
- marcapagina
- client-side
- server-side
---
<p>Bienvenidos Ember.js desde Cero, curso en el cual aprendemos a programar sin conocimiento alguno. En el capítulo anterior, te enseñe todo lo relacionado con las propiedades computadas dentro de Ember.js. Si eres nuevo en este curso, te recomiendo que le eches un vistazo al capítulo anterior para que te pongas en contexto (<a href="http://codehero.co/ember-js-desde-cero-observadores/">Capítulo 4 - Observadores)</a>)</p>

<p>Hoy, vamos a aprender todo lo relacionado con la arquitectura que necesitamos saber para desarrollar una aplicación en Ember.js.</p>

<div class="alert alert-info">
  <h4>
    ¡Alerta!
  </h4> Todos los ejemplos usados en el tutorial de son una continuación de los ejemplos del capitulo anterior.
</div>

<hr />

<h2>Arquitectura MVC Standard</h2>

<p>Ember.js tiene una manera muy particular de manejar su data dentro de la arquitectura por eso es muy importante que le echemos un vistazo antes de entrar a programar una app completa dentro del framework.</p>

<p>Antes de ver como esta estructurado exactamente la arquitectura en Ember.js es bueno que veamos como funcionan las aplicaciones normalmente en MVC. Veamos el siguiente diagrama:</p>

<p><img src="http://i.imgur.com/a17cxGj.png" alt="emberjs-cliente-side" /></p>

<blockquote>
  <p>Observemos que este tipo de aplicación corre en el servidor y no en el cliente.</p>
</blockquote>

<h3>¿Cómo funciona?</h3>

<p>El explorador envía un request hacia el servidor, el servidor al contener nuestra aplicación procesa ese request a través de un router, el cual determina el correcto comportamiento de es data enviada. Una vez que el router determina que controlador debe levantar para procesar el request, instancia ese controlador, y a su vez ese controlador renderiza una vista o plantilla que es retornada al explorador. El procesamiento de la data del request es generada por los modelos, los cuales están comunicación directa con los controladores.</p>

<p>En pocas palabras, una vez que el explorador realiza un request, el router lo entrega al controlador adecuando, este procesa la información a través del modelo y luego renderiza un vista para el explorador.</p>

<hr />

<h2>Arquitectura Ember.js</h2>

<p>Ember.js no trabaja de esa manera. Veamos el siguiente diagrama:</p>

<p><img src="http://i.imgur.com/Iu1FZVM.png" alt="emberjs-server-side" /></p>

<blockquote>
  <p>Observemos que este tipo de aplicación corre en el cliente y no en el servidor.</p>
</blockquote>

<p>Para comenzar toda la aplicación de Ember.js corre en el explorador, todos los modelos, vistas y controladores son almacenados en el explorador. Todo inicia desde el router el cual mapea la correcta dirección que va a tomar la aplicación al indicarle que controlador va usar. El controlador instancia una vista y a su vez, la vista renderiza un template o plantilla. Hasta ahora todo parece igual a la arquitectura que observamos anteriormente, pero eso esta apunto de cambiar, porque los modelos dentro de Ember.js son manejados de manera diferente.</p>

<p>Ya que esta es una aplicación del lado del cliente es un poco delicado guardar información en el explorador como tal, es por eso que Ember.js introduce un mecanismo para manejar la persistencia de la data dentro de la app, ese mecanismo se denomina “Store”. Simplemente el store es una variable que almacena información en forma de modelos. Volvamos al diagrama, en ember es el router el que debe saber si la app necesita o no obtener información del store, suponiendo que se necesita, este accede al store, una vez que el store obtenga la data se la pasa al modelo, el modelo procesa la información, este a su vez le pide al controlador (a través de un proxy interno) que levante la vista necesaria y la vista renderiza esa información en un template o plantilla.</p>

<blockquote>
  <p>En Ember.js uno puede tener múltiples controladores para una sola vista, a diferencia de una app del lado del servidor. Te darás cuenta mas adelante cuando veamos como manejar y crear correctamente controladores en Ember.js.</p>
</blockquote>

<hr />

<h2>Veamos un ejemplo de request en Ember.js</h2>

<p>Siguiendo el ejemplo que veníamos desarrollando en el capitulo anterior LINK. Veamos el siguiente diagrama:</p>

<p><img src="http://i.imgur.com/McQMR6C.png" alt="emberjs-request" /></p>

<p>Supongamos que hacemos el siguiente request en el explorador <code>/marcapaginas</code>, este nos debería devolver todos los marca paginas disponibles en la app. El funcionamiento en sí de la app debería ser, acceder al router de los marca libros para que este defina un controlador (en nuestro caso <strong>Controlador Marcapaginas</strong>), a su vez si se necesita procesar información este acceda al “Modelo Marcapaginas” para que al final, la vista renderiza el template asociado a <strong>Marcapaginas</strong> con la información obtenida anteriormente.</p>

<blockquote>
  <p>No te preocupes si no entendiste en la totalidad como funciona la arquitectura de Ember.js ya que esta la vamos a estar revisando en los siguientes capítulos cuando te explique los controladores, routers, vistas, modelos y store.</p>
</blockquote>

<hr />

<h2>Conclusión</h2>

<p>En esta lección, vimos todo lo relacionado con la arquitectura que necesitamos saber para desarrollar una aplicación en Ember.js. Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso.</p>

<p>¡Te espero la próxima semana!</p>
