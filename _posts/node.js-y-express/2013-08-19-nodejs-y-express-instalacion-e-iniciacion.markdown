---
layout: post
status: publish
published: true
title: instalación e iniciación
author: Oscar González
author_login: oscar
author_email: gonzalezgreco@gmail.com
author_url: http://www.oscarvgg.com
wordpress_id: 2003
wordpress_url: http://codehero.co/?p=2003
date: 2013-08-19 01:38:11.000000000 -04:30
serie: Node.js y Express
dificultad: Novato
duracion: 10
description: En este tutorial vamos a aprender como instalar y correr nuestra primera aplicación haciendo uso de Node.js y el framework Express.
categories:
- Cursos
- Node.js
tags:
- desde cero
- node
- npm
- express
---
<p>Node.js, como lo definen sus creadores, es "(…) una plataforma basada en la Chrome JavaScript Runtime para crear aplicaciones web de manera fácil, rápida y escalable. Node.js utiliza un modelo de no-bloqueo orientado a eventos, que lo hace ligero y eficiente, ideal para aplicaciones de data intensiva en tiempo real que se ejecutan a través de dispositivos distribuidos".</p>

<p>"Express es un framework de aplicaciones web de Node.js mínimo y flexible, que proporciona un robusto conjunto de características para crear aplicaciones web de una o varias páginas, e híbridas". Si alguna vez has utilizado Sinatra en ruby, encontrarás que express es bastante parecido. Sin embargo, no creas que express es para hacer aplicaciones simples y pequeñas, hay muchas cosas que puedes hacer con él, y como es javacript es muy flexible, puedes moldearlo a tu estilo como quieras.</p>

<hr />

<h2>Instalando Node.js</h2>

<p>Instalar nodejs es extremadamente fácil. Solo hay que ir a http://nodejs.org/ y hacer click en el botón de instalar. El explorador descargará un instalador que debemos correr, seguir las instrucciones (siguiente, siguiente, siguiente) y listo.</p>

<p><a href="http://codehero.co/oc-content/uploads/2013/08/pagina-oficial-de-nodejs.png"><img src="http://i.imgur.com/F0URz5c.png" alt="pagina oficial de nodejs" class="aligncenter size-full wp-image-2004" /></a></p>

<p>Ahora si vamos al terminal (consola), podemos comprobar que tenemos node instalado.</p>

<pre>$ node --version
v0.10.16
</pre>

<p>Aquí podemos ver que yo tengo la versión 0.10.15 instalada.</p>

<hr />

<h2>NPM</h2>

<p>NPM signifier Node Package Manager, es bastante similar a las gemas de Ruby, con npm instalamos los módulos y paquetes de node que están disponibles en la web. Comprobemos nuestra instalación de NPM:</p>

<pre>$ npm ---version
1.3.8
</pre>

<p>Yo tengo instalada la versión 1.3.8.</p>

<hr />

<h2>Instalando Express</h2>

<p>Express es un módulo de node, así que lo instalamos con npm:</p>

<pre>$ sudo npm install -g express
</pre>

<p>-g para instalarlo globalmente (para todo el sistema).</p>

<p>Ahora comprobamos nuestra instalación:</p>

<pre>$ express --verion
3.3.5
</pre>

<p>Y vemos que tengo instalada la versión 3.3.5</p>

<hr />

<h2>Generando nuestra primera aplicación</h2>

<p>Primero vamos al directorio donde vamos a generar nuestra aplicación. Yo la voy a crear en el escritorio:</p>

<pre>$ cd /Users/{nombre de usuario}/Desktop
</pre>

<p>Y escribimos el siguiente comando en la consola para generar nuestra primera aplicación en express:</p>

<pre>$ express helloWorldExpress

   create : helloWorldExpress
   create : helloWorldExpress/package.json
   create : helloWorldExpress/app.js
   create : helloWorldExpress/public
   create : helloWorldExpress/public/images
   create : helloWorldExpress/public/javascripts
   create : helloWorldExpress/public/stylesheets
   create : helloWorldExpress/public/stylesheets/style.css
   create : helloWorldExpress/routes
   create : helloWorldExpress/routes/index.js
   create : helloWorldExpress/routes/user.js
   create : helloWorldExpress/views
   create : helloWorldExpress/views/layout.jade
   create : helloWorldExpress/views/index.jade

   install dependencies:
     $ cd helloWorldExpress && npm install

   run the app:
     $ node app
</pre>

<p>Y observamos como enseguida se generan un conjunto de archivos y carpetas.</p>

<p>Ahora que tenemos este directorio generado, nos situamos en su contenido e instalamos las dependencias del proyecto.</p>

<pre>$ cd helloWorldExpress/
$ npm install
</pre>

<p>Esto instalará las librerías (módulos) y las dependencias de estas, necesarias para correr nuestro proyecto.</p>

<p>Ahora si vamos al directorio generado (helloWorldExpress), vamos a encontrar una serie de archivos y directorios dentro.</p>

<pre>app.js
node_modules
package.json
public
routes
views
</pre>

<ol>
<li>Tenemos el archivo app.js, que es donde inicia toda nuestra aplicación. Ya hablaremos de este archivo a lo largo de esta serie.</li>
<li>El directorio node_modules fue creado cuando corrimos el comando <code>npm install</code>. Este contiene las dependencias de nuestro proyecto.</li>
<li>package.json contiene un registro de las dependencias y algunas estadísticas de nuestra aplicación.</li>
<li>Existen otros directorios como public, routes y views con los cuales deberías estar familiarizado si has hecho aplicaciones web con anterioridad, sin embargo estos no son necesarios para tener una app en express, son opcionales.</li>
</ol>

<p>Vamos a correr esta aplicación.</p>

<hr />

<h2>Corriendo la aplicación</h2>

<p>Vamos a la consola y escribimos:</p>

<pre>$ node app.js
Express server listening on port 3000
</pre>

<p>Y node arranca el servidor en el puerto 3000.</p>

<p>Si abrimos el explorador de nuestra preferencia en la pagina http://localhost:3000 vamos a recibir una página de bienvenida a express.</p>

<p><a href="http://codehero.co/oc-content/uploads/2013/08/primera-aplicación-web-en-express-y-nodejs.png"><img src="http://i.imgur.com/tMwMf0z.png" alt="primera aplicación web en express y nodejs" class="aligncenter size-full wp-image-2005" /></a></p>

<p>Si volvemos a la consola podemos apreciar como nos indica las rutas que fueron solicitadas para mostrar esta página.</p>

<pre>GET / 200 225ms - 170b
GET /stylesheets/style.css 200 6ms - 110b
</pre>

<hr />

<h2>Conclusión</h2>

<p>En este capitulo hemos aprendido como instalar Node.js y Express, y como correr nuestra primera aplicación web utilizando el framework.</p>

<p>Con esto marcamos el inicio de esta serie que te enseñará como programar una de las plataformas más veloces de la web.</p>

<p>Hasta la próxima.</p>
