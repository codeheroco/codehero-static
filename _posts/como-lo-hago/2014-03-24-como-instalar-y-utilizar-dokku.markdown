---
layout: post
status: publish
published: true
title: Como Instalar y Utilizar Dokku
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
wordpress_id: 3131
wordpress_url: http://codehero.co/?p=3131
date: 2014-03-24 20:33:39.000000000 -04:30
categories:
- Cómo lo hago
- Dokku
tags:
- Git
- como lo hago
- node
- docker
- dokku
- heroku
- paas
---
<p>A medida que la tecnología ha ido avanzando hemos logrado aprovechar las múltiples ventajas y facilidades que nos ofrece el encapsulamiento de las aplicaciones y a su vez aprovechar las bondades que conlleva el control de versiones para hacer despliegues sencillos y rápidos de las mismas. Por esta razón traemos <strong>Dokku</strong> esta semana a CODEHERO.</p>

<hr />

<h2>Dokku - Heroku</h2>

<p>Para lograr definir con mayor facilidad de lo que se trata Dokku debemos hablar primero de <a href="http://heroku.com">Heroku</a>.</p>

<p>Heroku, en esencia se puede encontrar en la categoría de los PaaS (plataforma como un servicio), es decir, el servicio que ofrecen es su plataforma o <em>hardware</em> como tal al igual que muchas soluciones existentes hoy en día para montar tus aplicaciones como AWS, Digital Ocean, Google Cloud Platform, entre otros.</p>

<p>Sin embargo, Heroku es mucho más que un VPS o un computador en la nube que puedes gestionar como cualquier otro, este se enfoca en ser una plataforma de aplicaciones, mientras otros servicios comunes te ofrecen instancias o computadores virtuales, Heroku maneja cada una de tus aplicaciones por separado de manera encapsulada.</p>

<h3>Ventajas</h3>

<p>Despliegue de las aplicaciones mediante el control de versiones <a href="http://codehero.co/series/git-desde-cero/">Git</a>, cada aplicación es un repositorio, y cada <em>push</em> que hagas le indicará a Heroku que debe recompilar la aplicación con los nuevos cambios y volverla a servir.</p>

<p>Heroku sabe que tipo de aplicación es la que estas desarrollando y soporta la mayoría de los frameworks más modernos mediante lo que se denomina paquetes de construcción o <em>buildpacks</em>. ¡Así es! tu solo haz <em>push</em> y Heroku sabrá que tipo de aplicación es y como ejecutarla, todo sin instalar ningún software dependiente.</p>

<p>Y ni hablar de los <a href="https://addons.heroku.com/">servicios conectados o <em>add-ons</em></a> que ofrece para que puedas conectar directamente tu base de datos, sistemas de monitoreo, y mucho más directamente a tu aplicación.</p>

<hr />

<h2>Dokku - Docker</h2>

<p>Al observar a simple vista como es el funcionamiento de Heroku podrás notar que cada aplicación se encuentra encapsulada dentro de su propio ambiente, es aquí donde entra en juego la implementación de <a href="http://codehero.co/como-instalar-y-usar-docker/">Docker</a>.</p>

<p>Ya hablamos en dicha entrada de las ventajas y facilidades que Docker nos ofrece, ahora este enfoque combinado es el que vuelve todo más interesante.</p>

<hr />

<h2>Entonces... ¿Qué es Dokku?</h2>

<p>Así como su nombre lo dice, es un pequeño Heroku basado en Docker, este lo puedes montar en un VPS si lo deseas y tener tu propia implementación de Heroku para manejar tus aplicaciones.</p>

<p>Incluso algunos proveedores como Digital Ocean ofrecen una instancia (o <em>droplet</em>) ya con la imagen de Dokku para que no tengas que configurar nada. Aquí tomaremos el camino "largo" y lo instalaremos manualmente.</p>

<blockquote>
  <p><strong>Para el momento de este escrito la última versión estable es la <code>v0.2.2</code> y es compatible con Ubuntu 12.04 x64bit. (Existen algunos problemas con 13.10 por el momento)</strong></p>
</blockquote>

<hr />

<h2>Instalación</h2>

<blockquote>
  <p>El proceso de instalación en esta entrada requiere de un VPS y un dominio propio, si quieres probarlo localmente visita <a href="https://github.com/codeheroco/prueba-dokku/blob/master/Instrucciones-Vagrant.md">las instruciones en el repositorio.</a></p>
</blockquote>

<p>Primero nos dirigimos a nuestra instancia remota y debemos instalar una dependencias de python:</p>

<pre>$ sudo apt-get install -y python-software-properties
</pre>

<p>Luego procedemos a instalar la última versión estable de Dokku:</p>

<pre>$ wget -qO- https://raw.github.com/progrium/dokku/v0.2.2/bootstrap.sh | sudo DOKKU_TAG=v0.2.2 bash
</pre>

<p>Esto tomará aproximadamente 5 minutos. Dependiendo también de tu velocidad de internet claro está.</p>

<p>Ahora debemos acceder a nuestro gestor de DNS y crear un dominio y un subdominio tipo comodín que apunte a la dirección IP de la instancia donde se encuentra nuestro Dokku.</p>

<p>Suponiendo que la IP de nuestra instancia es 182.60.60.100 crearíamos los dominios algo así:</p>

<pre>servidordokku.com ~> 182.60.60.100 
*.servidordokku.com ~> 182.60.60.100
</pre>

<p>Verificamos si el archivo <code>/home/dokku/VHOST</code> existe y contiene dentro el <em>host</em> que definimos:</p>

<pre>$ cat dokku/VHOST
servidordokku.com
</pre>

<blockquote>
  <p>En caso de no existir el archivo, lo creamos y le escribimos manualmente el <em>host</em> .</p>
</blockquote>

<p>Ahora desde nuestro computador de trabajo pasamos nuestras llaves SSH a la instancia asociadas al usuario:</p>

<pre>$ cat ~/.ssh/id_rsa.pub | ssh servidordokku.com "sudo sshcommand acl-add dokku codehero"
</pre>

<p>Muy bien tenemos nuestro servidor Dokku preparado.</p>

<hr />

<h2>Prueba</h2>

<p>Clonemos el repositorio de esta entrada en nuestros computadores, es una sencilla aplicación hecha en Node.js:</p>

<pre>$ git clone https://github.com/codeheroco/prueba-dokku.git
$ cd prueba-dokku
</pre>

<p>Como mencionamos anteriormente, el despliegue de las aplicaciones en Heroku, y por consiguiente en Dokku, se hace a través de git, para ello solo debemos agregar un remoto nuevo a nuestro repositorio, uno que se encuentre en nuestro <code>servidordokku</code>, probemos creando uno con el nombre <code>prueba-dokku</code>:</p>

<pre>$ git remote add codehero dokku@servidordokku.com:prueba-dokku
</pre>

<p>Y ahora solo basta con empujar el proyecto a este nuevo repositorio:</p>

<pre>$ git push codehero master

Counting objects: 12, done.
Delta compression using up to 2 threads.
Compressing objects: 100% (8/8), done.
Writing objects: 100% (12/12), 1.64 KiB | 0 bytes/s, done.
Total 12 (delta 0), reused 0 (delta 0)
-----> Building prueba-dokku ...
       Node.js app detected
-----> Requested node range:  0.10.x
-----> Resolved node version: 0.10.26
-----> Downloading and installing node
-----> Writing a custom .npmrc to circumvent npm bugs
-----> Installing dependencies
       npm http GET https://registry.npmjs.org/jade/1.3.0
       npm http GET https://registry.npmjs.org/express/3.5.0
       npm http 200 https://registry.npmjs.org/express/3.5.0
       npm http GET https://registry.npmjs.org/express/-/express-3.5.0.tgz
       npm http 200 https://registry.npmjs.org/express/-/express-3.5.0.tgz
       npm http 200 https://registry.npmjs.org/jade/1.3.0
       npm http GET https://registry.npmjs.org/jade/-/jade-1.3.0.tgz
       npm http 200 https://registry.npmjs.org/jade/-/jade-1.3.0.tgz

    ...
    ...
    ...

-----> Caching node_modules directory for future builds
-----> Cleaning up node-gyp and npm artifacts
-----> Building runtime environment
-----> Discovering process types
       Procfile declares types -> web
-----> Releasing prueba-dokku ...
-----> Deploying prueba-dokku ...
-----> Cleaning up ...
=====> Application deployed:
       http://prueba-dokku.servidordokku.com

To dokku@servidordokku.com:prueba-dokku
 * [new branch]      master -> master
</pre>

<p>Podremos ver en la salida del terminal como Dokku detecta que tipo de aplicación es la que estamos empujando basándose en la estructura de los archivos y lo especificado en el <code>Procfile</code>. Actualmente Dokku soporta los <a href="https://github.com/progrium/buildstep#supported-buildpacks">siguientes <em>buildpacks</em></a>.</p>

<blockquote>
  <p>En el <code>Procfile</code> (o archivo de procesos) se especifica que tipo de proceso se debe ejecutar, como por ejemplo uno <em>web</em> o un <em>worker</em> (sin acceso web). Ademas se le indica el comando que debe ejecutar para correr las diferentes piezas de tu aplicación, en este caso por ser una aplicación de node.js basta con ejecutar el archivo principal con <code>node app.js</code>.</p>
</blockquote>

<p>También podremos apreciar como Dokku se encarga de descargar las dependencias del proyecto (según se encuentran indicadas en el <code>package.json</code>), por lo que el proceso de despliegue de la aplicación es totalmente automatizado.</p>

<p>Si abrimos nuestro navegador y nos dirigimos a <code>prueba-dokku.servidordokku.com</code> podremos notar nuestra aplicación ejecutandose.</p>

<p><img src="http://i.imgur.com/juRmmth.png" alt="Dokku" /></p>

<p>Por ello es que necesitamos el subdominio con comodín. Debido a que en nuestro servidor Dokku cada repositorio o aplicación se encuentra en un subdominio diferente con el nombre del mismo y todos deben apuntar a nuestro mismo servidor PaaS.</p>

<hr />

<h2>Conclusión</h2>

<p>Esta semana vimos como montar nuestro propio mini Heroku, ahora podemos desplegar nuestras aplicaciones de manera rápida, segura, fácil y encapsulada, siempre basándonos en grandes herramientas como Docker, Git y Heroku. Recuerda que Dokku se encuentra para el momento de este escrito en etapas de fuerte desarrollo por lo que muy probablemente vaya mejorando y extendiendo su funcionalidad a medida que pase el tiempo y los desarrolladores continúen colaborando con el proyecto.</p>
