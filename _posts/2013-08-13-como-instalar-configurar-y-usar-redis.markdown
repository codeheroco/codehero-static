---
layout: post
status: publish
published: true
title: Cómo instalar, configurar y usar Redis - Parte I
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathanwiesel@gmail.com
author_url: http://jonathanwiesel.com/
wordpress_id: 1969
wordpress_url: http://codehero.co/?p=1969
date: 2013-08-13 00:00:11.000000000 -04:30
categories:
- Cómo lo hago
- Redis
tags:
- howto
- instalacion
- redis
comments:
- id: 203
  author: Cómo instalar, configurar y usar Redis – Parte II | CODEHERO
  author_email: ''
  author_url: http://codehero.co/como-instalar-configurar-y-usar-redis-parte-ii/
  date: '2013-08-20 00:01:58 -0430'
  date_gmt: '2013-08-20 04:31:58 -0430'
  content: '[&#8230;] semana pasada estuvimos conociendo Redis, vimos algunos detalles
    sobre las ventajas que ofrece, lo instalamos, aprendimos sobre su [&#8230;]'
---
<p>Nos encontramos en una época donde la velocidad en términos tecnológicos es una obligación. Cada día los sistemas se vuelven más poderosos y más capaces, lo cual nos ha acostumbrado a querer resultados lo más pronto posible. Este enfoque también ha abarcado el tema del almacenamiento de datos, este proceso en altos niveles de concurrencia suele ser un poco lento, lo peor es que muchas veces necesitamos bases de datos que no necesariamente tienen que poseer tablas relacionadas sino más bien tablas aisladas y de igual manera terminamos usando un MySQL, esta semana hablaremos de una novedosa solución que ha estado tomando fuerza rápidamente, la base de datos Redis.</p>

<p><strong>Actualización:</strong> La segunda parte de este Cómo Lo Hago <a href="http://codehero.co/como-instalar-configurar-y-usar-redis-parte-ii/">ya se encuentra disponible.</a></p>

<hr />

<h2>¿Qué es Redis?</h2>

<p>Es una solución de código abierto de almacenamiento de datos NoSQL basado en una estructura de Llave-Valor (<em>key-value</em>). El concepto de este tipo de bases de datos se enfoca en aquellos casos donde una estructura relacional no es necesaria sino más bien un identificador asociado a un valor o un conjunto de valores. Su nombre es un acrónimo de <strong>S</strong>ervidor de <strong>DI</strong>ccionario <strong>RE</strong>moto, puedes encontrar el código fuente del proyecto en su <a href="https://github.com/antirez/redis">respositorio de Github</a>.</p>

<p>Redis es sumamente veloz, esto debido a su sencilla estructura ausente de lógica relacional y su punto más importante, <strong>la base de datos está cargada en memoria</strong>, por ello sus altos niveles de velocidad. No te preocupes, aunque la información está en memoria y en efecto se pedería al apagarse el computador, Redis posee 2 estrategias de persistencia para mantener los datos seguros, lo cual hablaremos en la parte de configuración.</p>

<blockquote>
  <p>Si piensas manejar grandes volúmenes de datos que podrían sobrepasar tus capacidades de memoria, debes pensar en utilizar una base de datos basada en disco para los datos que no vayan a ser manipulados con tanta frecuencia y utilizar Redis para aquellos de alto nivel de uso (como datos de sesión, tokens, cuentas, etc.)</p>
</blockquote>

<p>Es capaz de manejar altísimos niveles de concurrencia, por defecto esta establecido en 10000 pero puede ser fácilmente cambiado en la configuración. En este caso, la cantidad real de clientes que puede atender simultáneamente viene dada por la cantidad de descriptores de archivo que pueda manejar el sistema.</p>

<blockquote>
  <p>En Mac OS X se puede ver la cantidad de descriptores disponibles ejecutando el comando <code>launchctl limit</code>, en la variable maxfiles.</p>
  
  <p>En otros sistemas *nix puedes utilizar el comando <code>cat /proc/sys/fs/file-max</code>.</p>
  
  <p>Este valor es editable.</p>
</blockquote>

<p>Otra ventaja de Redis es su facilidad para implementar estrategias de replicación de datos, teniendo un servidor central de Redis o <em>maestro</em> al cual responden varios servidores secundarios o <em>esclavos</em>, esto ofrece un gran nivel de escalabilidad y permite establecer ambientes de alta disponibilidad con mínimo esfuerzo.</p>

<p>Redis también puede ser utilizado para desarrollar soluciones enfocadas al paradigma de mensajería de <a href="http://en.wikipedia.org/wiki/Publish/subscribe">publicaciones y suscripciones</a>, sin embargo no haremos énfasis en esto.</p>

<hr />

<h2>Tipos de datos</h2>

<p>Debido a la naturaleza Llave-Valor de la estructura de Redis, tenemos siempre una llave, el identificador único para cada registro en la base de datos, a una llave se le pueden asignar los siguientes tipos de dato:</p>

<ul>
<li>Cadenas de caracteres</li>
</ul>

<p>Esta es quizás la más fácil de entender, simplemente una llave posee un valor común y corriente tipo <em>string</em>:</p>

<pre>Representación:
llave => valor 
</pre>

<ul>
<li>Listas</li>
</ul>

<p>Este tipo de dato permite almacenar varias cadenas de caracteres ordenadas por orden de inserción en una llave, muy parecido al concepto de pilas y colas:</p>

<pre>Representación:
llave => valor1 
         valor2 
         … 
</pre>

<ul>
<li>Juegos o <em>Sets</em></li>
</ul>

<p>Permite asignar a una llave una serie de cadenas de caracteres que no posee ningún orden. Una característica importante de los <em>sets</em> es que no permite miembros duplicados, al tratar de insertar un valor duplicado en un juego, este último solo tendrá una copia del mismo.</p>

<p>Su representación gráfica podría ser parecida a la de las listas aunque sin tomar en cuenta el orden de inserción.</p>

<ul>
<li>Juegos ordenados o <em>Sorted sets</em></li>
</ul>

<p>Lo primero que pensarías que es es una lista que no permite duplicados, según lo que vimos anteriormente, pues no. Un juego ordenado, al igual que un juego convencional es una serie de cadenas de caracteres no duplicados que tienen asociado un puntaje, al cada miembro poseer un puntaje se determina el orden del juego del menor a mayor puntaje.</p>

<pre>Representación:
llave => 80 valor2 
         25 valor1
         10 valor3 
         … 
</pre>

<ul>
<li>Hashes</li>
</ul>

<p>Este tipo de dato es quizás uno de los más interesantes ya que suelen utilizarse para definir objetos o mapas. Un hash permite asignar a una llave una serie de atributos y valores, tal como lo haría un objeto común, veamos un ejemplo para apreciarlo mejor:</p>

<pre>Representación:
user:1000 => usuario        jonathanwiesel 
             email          jonathanwiesel@gmail.com
             nombre         Jonathan Wiesel
             … 
</pre>

<blockquote>
  <p>Podemos notar en la nomenclatura usada para definir la llave que tratamos de seguir un estándar como si estuviéramos usando una tabla de base de datos común, donde <em>user</em> sería la tabla y <em>1000</em> el id del usuario, el uso de este tipo de nomenclatura no es obligatorio pero es recomendado para representar una estructura lógica y ordenada que sea fácilmente legible para cualquiera que manipule la base de datos.</p>
</blockquote>

<hr />

<h2>Instalación</h2>

<h3>*nix</h3>

<p>Antes que nada debemos asegurarnos de tener instalado en nuestro sistema las herramientas de compilación tales como <code>build-essentials</code> (sistemas basados en Debian), <code>Development Tools</code> (sistemas basados en Fedora/Red Hat) o similares.</p>

<blockquote>
  <p>Si no lo tienes no podrás ejecutar el comando <code>make</code>, en sistemas basados en Debian puedes instalarlo de la siguiente manera:</p>
</blockquote>

<pre>
$ sudo apt-get update
$ sudo apt-get install build-essential
</pre>

<p>Además debemos tener la dependencia del Lenguaje de Herramientas de Comando o <em>tcl</em>.</p>

<blockquote>
  <p>Su instalación en sistemas basados en Debian sería:</p>
</blockquote>

<pre>$ sudo apt-get install tcl8.5
</pre>

<p>Ahora si, procedemos a descargar la ultima versión estable dirigiéndonos a la <a href="http://redis.io/download">página de descargas de redis</a> o simplemente lo hacemos vía <em>wget</em> de la siguiente manera:</p>

<pre>$ wget http://redis.googlecode.com/files/redis-2.6.14.tar.gz
</pre>

<blockquote>
  <p>Suponiendo que la última versión es la 2.6.14.</p>
</blockquote>

<p>Luego descomprimimos el <em>.tar.gz</em> y navegamos al nuevo directorio para compilar el código fuente y pruebas de velocidad y exactitud :</p>

<pre>$ tar xzf redis-2.6.14.tar.gz
$ cd redis-2.6.14
$ make
$ make test
</pre>

<p>Finalmente lo instalamos:</p>

<pre>$ sudo make install 
</pre>

<p>Una vez instalado podemos utilizar un <em>script</em> que viene por defecto para poner a funcionar tu servidor Redis:</p>

<pre>$ cd utils
$ sudo ./install_server.sh
</pre>

<p>Por ahora aceptemos la configuración predeterminada que nos pida el <em>script</em> ya que más adelante lo modificaremos manualmente según nuestras necesidades.</p>

<p>Una vez haya terminado el servidor se encontrará corriendo en el fondo.</p>

<h3>Mac OS X</h3>

<p>Como de costumbre, el método predilecto de instalación es usando <a href="http://codehero.co/como-lo-hago-instalar-homebrew/">Homebrew</a> ejecutando el comando:</p>

<pre>$ brew install redis
</pre>

<p>Si queremos iniciar el servidor Redis como un servicio debemos ejecutar el siguiente comando:</p>

<pre>$ brew services start redis
</pre>

<p>De lo contrario podemos ejecutar:</p>

<pre>$ redis-server /usr/local/etc/redis.conf  
</pre>

<p>Para ambos casos esto iniciará el servidor utilizando el archivo de configuración que trae Redis por defecto.</p>

<h3>Prueba</h3>

<p>Finalmente probemos que nuestro servidor Redis esté funcionando ejecutando el comando <code>redis-cli</code>, y veremos algo como esto:</p>

<pre>redis 127.0.0.1:6379> 
</pre>

<p>Esto nos indica que en efecto nos hemos conectado al servidor Redis, en este caso en la dirección de <em>localhost</em> escuchando en el puerto estándar <code>6379</code>. Aquí podremos ejecutar comandos propios de Redis, tal como si nos hubiésemos conectado por terminal a una base de datos MySQL.</p>

<hr />

<h2>Conclusión</h2>

<p>Esta semana aprendimos un poco sobre el poder de Redis, su estructura y cómo instalarlo, la próxima semana estaremos tocando la parte de configuración, comandos básicos y otros detalles interesantes para que le saques el máximo provecho a esta nueva solución de almacenamiento de datos.</p>

<p><strong>Actualización:</strong> La segunda parte de este Cómo Lo Hago <a href="http://codehero.co/como-instalar-configurar-y-usar-redis-parte-ii/">ya se encuentra disponible.</a></p>
