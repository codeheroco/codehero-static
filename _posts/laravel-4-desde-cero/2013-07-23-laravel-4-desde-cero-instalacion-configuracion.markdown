---
layout: post
status: publish
published: true
title: Instalación & Configuración
author: Ramses Velasquez
author_login: ramses
author_email: cotufa9@gmail.com
date: 2013-07-23 00:17:45.000000000 -04:30
serie: Laravel 4 desde Cero
description: Curso en el cual aprenderemos Laravel desde Cero. En este curso, estudiaremos las características y herramientas necesarias para usar Laravel 4.
dificultad: novato
duracion: 20
categories:
- Cursos
- Laravel
tags:
- php
- desde cero
- instalacion
- configuracion
- laravel
- composer
---
<p>Bienvenido a Laravel desde Cero, en este nuevo curso aprenderemos a desarrollar aplicaciones web con <a href="http://laravel.com/">Laravel</a> 4. En este primer capitulo revisaremos las principales características de este framework y todos los pasos necesarios para la creación de un proyecto. Para este curso se asumen conocimientos medios o avanzados en PHP.</p>

<hr />

<h2>¿Qué es Laravel?</h2>

<p>Laravel es un framework de código abierto para el desarrollo de aplicaciones web en PHP 5 que posee una sintaxis simple y elegante.</p>

<p>Características:</p>

<ul>
<li>Va por la versión 4 publicada en Mayo del 2013.</li>
<li>Creado en 2011 por <em>Taylor Otwell</em>.</li>
<li>Esta inspirado en <em>Ruby and Rail</em> y <em>Symfony</em>, de quien posee muchas dependencias. </li>
<li>Esta diseñado para desarrollar bajo el patrón MVC.</li>
<li>Posee un sistema de mapeo de datos relacional llamado <em>Eloquent ORM</em>.</li>
<li>Utiliza un sistema de procesamiento de plantillas llamado <em>Blade</em>, el cual hace uso de la cache para darle mayor velocidad.</li>
</ul>

<hr />

<h2>Instalación</h2>

<p>Para el desarrollo de este curso necesitaremos tener instalado en nuestra computadora un servidor local para probar nuestras aplicaciones. Personalmente recomiendo <a href="http://www.apachefriends.org/es/xampp.html">XAMPP</a>.</p>

<p>Desde la versión 4 de Laravel, la creación de un proyecto nuevo se maneja con <a href="http://getcomposer.org/">Composer</a>. Veamos entonces que es Composer y que necesitamos para usarlo.</p>

<p>Composer es un manejador de dependencias para PHP. Esto quiere decir que Composer va a descargar de sus repositorios todas las librerías y las dependencias con las versiones requeridas que el proyecto necesite y manejarlas en un solo lugar de manera ordenada. En otras palabras, Composer es como un recetario que se encarga de descargar todo lo que necesitamos para ejecutar un proyecto y nos libera de la tediosa tarea de descargar cada librería de manera separada.</p>

<h3>Instalación de Composer en *nix</h3>

<p>Instalar Composer es muy sencillo por linea de comandos. En mi caso lo estoy haciendo en el sistema operativo OS X, pero los pasos son los mismos para cualquier sistema operativo *nix.</p>

```sh
$ curl -sS https://getcomposer.org/installer | /Applications/XAMPP/xamppfiles/bin/php-5.4.16 
$ sudo mv composer.phar /usr/local/bin/composer
```

<p>El primer comando descarga el archivo <strong>composer.phar</strong> en nuestras computadoras (<strong>.phar</strong> es una extensión para aplicaciones PHP comprimidas), la ruta de PHP puede cambiar dependiendo de donde este instalado en la computadora (Lo importante es que la versión que se utilice sea mayor a 5.2). El segundo comando mueve el archivo descargado a la carpeta bin para que Composer pueda ser ejecutado globalmente.</p>

<p>Por último verificamos la instalación con el siguiente comando.</p>

```sh
$ composer
```

<p>Si la instalación ha terminado correctamente, entonces nos debe aparece una lista de los comandos y opciones que tiene Composer.</p>

<p><a href="http://i.imgur.com/OvO1TZ3.png"><img src="http://i.imgur.com/OvO1TZ3.png" alt="Composer Instalacion Exitosa Mac" class="aligncenter size-full wp-image-1616" /></a></p>

{% include middle-post-ad.html %}

<h3>Instalación de Composer en Windows</h3>

<p>En Windows la instalación se puede hacer mediante un instalador ejecutable que se descarga en la pagina de <a href="http://getcomposer.org/">Composer</a>. El instalador nos solicitará la ubicación de nuestro <strong>php.exe</strong>, la cual dependerá de donde hemos instalado XAMPP.</p>

<p><a href="http://i.imgur.com/4kvbihX.png"><img src="http://i.imgur.com/4kvbihX.png" alt="Composer instalacion Windos" class="aligncenter size-medium wp-image-1620" /></a></p>

<p>El instalador se encargara de modificar la variable <strong>PATH</strong> para que podamos hacer uso de Composer desde cualquier lugar en la consola. Para probar que la instalación se llevo acabo correctamente ejecutamos el siguiente comando y nos debería aparecer una lista con todos los posibles comando que acepta Composer.</p>

```sh
C:\>composer 
```

<p><a href="http://i.imgur.com/3xxeyrQ.png"><img src="http://i.imgur.com/3xxeyrQ.png" alt="Composer Instalacion Exitosa Windows" class="aligncenter size-full wp-image-1617" /></a></p>

<h3>Instalación de Laravel</h3>

<p>Una vez que tengamos Composer funcionando en nuestra computadora podemos descargar una copia de Laravel 4 para crear nuestro primer proyecto. Para esto simplemente abrimos nuestro terminal, vamos a la carpeta que utilice nuestro servidor( htdocs o www ) y ejecutamos el siguiente comando (Aplica para cualquier sistema operativo).</p>

```sh
$ composer create-project laravel/laravel codehero-laravel --prefer-dist
```

<blockquote>
  <p>Si se presenta algún error de permisos, ejecutar de nuevo pero con sudo.</p>
</blockquote>

<p>Este comando descarga una copia completa de la versión mas reciente de Laravel 4 desde los repositorios de Composer con todas las dependencias y librerías que el framework necesita. El proyecto se creara con el nombre que se le indique en el parámetro, en este caso lo llamamos <em>codehero-laravel</em>.</p>

<p><a href="http://i.imgur.com/pUJO6kK.png"><img src="http://i.imgur.com/pUJO6kK.png" alt="Laravel Instalacion Mac" class="aligncenter size-full wp-image-1618" /></a></p>

<p>Ya tenemos un proyecto de Laravel 4 creado, vamos a probarlo. Para esto debemos correr nuestro servidor Apache y entrar desde el navegador a <code>localhost/codehero-laravel/public</code>.</p>

<blockquote>
  <p>Si el navegador muestra un error de <strong>ErrorException file_put_contents()</strong>, significa que debemos darle permisos de escritura a la carpeta <code>/app/storage/</code>. Esto lo podemos hacer ejecutando el comando <code>sudo chmod -R 777 storage</code>.</p>
</blockquote>

<p><a href="http://i.imgur.com/rszalrV.png"><img src="http://i.imgur.com/rszalrV.png" alt="Laravel Instalacion exitosa" class="aligncenter size-full wp-image-1619" /></a></p>

<p>De ahora en adelante cada vez que queramos crear un nuevo proyecto en Laravel 4 para comenzar a desarrollar una aplicación diferente, solo tenemos que ejecutar el comando anterior y cambiar el nombre del proyecto. La instalación de Composer solo se lleva a cabo la primera vez.</p>

<hr />

<h2>Conclusión</h2>

<p>En esta lección hemos tenido nuestro primer contacto con <strong>Laravel</strong>. Aprendimos sus principales características y cuales son los requisitos básicos que se necesitan para crear un proyecto con este gran framework.</p>

<p>Si tienes alguna duda estaré pendiente de responder en la sección de comentarios. Anímate y sigue esta serie para que aprendes a manejar Laravel como un experto y así poder crear grandes aplicaciones.</p>
