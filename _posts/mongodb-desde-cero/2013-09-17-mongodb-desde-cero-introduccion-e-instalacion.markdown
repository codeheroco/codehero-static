---
layout: post
status: publish
published: true
title: Introducción e Instalación
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
wordpress_id: 2255
wordpress_url: http://codehero.co/?p=2255
date: 2013-09-17 00:00:02.000000000 -04:30
serie: MongoDB desde Cero
thumbnail: http://i.imgur.com/XFFMeqB.png
categories:
- Cursos
- MongoDB
tags:
- como lo hago
- howto
- Base de datos
- mongo
- mongodb
- nosql
---
<p>Las bases de datos relacionales están pasando de moda, los desarrolladores optan cada vez más por opciones novedosas de NoSQL debido a sus altos niveles de rendimiento y fácil escalabilidad. Hace unas semanas hablamos de las bondades de <a href="http://codehero.co/como-instalar-configurar-y-usar-redis/">Redis</a>; sin embargo algunos andan temerosos por tener poco tiempo y prefieren una solución con un poco más de reputación, es por esto que esta semana hablaremos de las base de datos NoSQL más utilizada, MongoDB.</p>

<hr />

<h2>¿Qué es MongoDB?</h2>

<p>Es una base de datos NoSQL de código abierto, este tipo de soluciones se basan en el principio de almacenar los datos en una estructura tipo llave-valor; MongoDB por su lado se enfoca específicamente en que los valores de estas llaves (llamadas <strong>colecciones</strong>) son estructuras tipo JSON (llamados <strong>documentos</strong>), es decir objetos Javascript, lenguaje sobre el cual se basa esta solución de base de datos. Esto facilitará su manipulación a muchos que ya conozcan el lenguaje.</p>

<p>MongoDB posee varias estrategias de manejo de datos que la han posicionado donde se encuentra hoy en día, tales como sus procesos de división de datos en distintos equipos físicos o también conocido como <strong><em>clusterización</em></strong>, también el caso similar de documentos muy grandes que superen el limite estipulado de 16MB se aplica una estrategia llamada GridFS que automáticamente divide el documento en pedazos y los almacena por separado, al recuperar el documento el <em>driver</em> se encarga de armar automáticamente el documento nuevamente.</p>

<p>La estructura de almacenamiento es tan flexible que uno de los hechos importantes que se comparten al introducir esta base de datos es que:</p>

<blockquote>
  <p>Distintos documentos en la misma colección no deben tener obligatoriamente los mismos campos o estructura. Inclusive documentos con campos en común no tienen necesariamente que tener el mismo tipo de dato.</p>
</blockquote>

<hr />

<h2>¿Cómo lo instalo?</h2>

<p>Bien, ya estamos ansiosos y desesperados, procedamos con la instalación.</p>

<h3>Mac OS X</h3>

<p>Si haz leído varios de nuestros <a href="http://codehero.co/category/como-lo-hago/">Cómo Lo Hago</a>, sabrás que el método por excelencia para instalar en Mac OS X es… <a href="http://codehero.co/como-lo-hago-instalar-homebrew/">Homebrew</a>:</p>

<pre>$ brew install mongodb
</pre>

<p>Para gestionar el servicio de MongoDB basta con ejecutar:</p>

<pre>$ brew services [ start | stop | restart ] mongodb
</pre>

<h3>Sistemas basados en Debian</h3>

<p>Primero debemos importar la llave pública GPG y crear el archivo de fuentes:</p>

<pre>$ sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
...
$ echo 'deb http://downloads-distro.mongodb.org/repo/debian-sysvinit dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
...
</pre>

<p>Ahora actualizamos los repositorios e instalamos MongoDB:</p>

<pre>$ sudo apt-get update
...
$ sudo apt-get install mongodb-10gen
...
</pre>

<p>Para gestionar el servicio de MongoDB basta con ejecutar:</p>

<pre>$ sudo service mongodb [ start | stop | restart | status ]
</pre>

<p>ó</p>

<pre>$ sudo /etc/init.d/mongodb [ start | stop | restart ]
</pre>

<h3>Sistemas Fedora, CentOS y RedHat</h3>

<p>Para estos sistemas de igual manera se recomienda instalar MongoDB usando un manejador de paquetes, en este caso YUM. Para esto debemos primero crear el archivo <code>/etc/yum.repos.d/10gen.repo</code> para configurar el repositorio.</p>

<p>Si tu sistema es de 32bit le agregaremos al archivo lo siguiente:</p>

<pre>[10gen]
name=10gen Repository
baseurl=http://downloads-distro.mongodb.org/repo/redhat/os/i686
gpgcheck=0
enabled=1
</pre>

<p>ó si es de 64bit:</p>

<pre>[10gen]
name=10gen Repository
baseurl=http://downloads-distro.mongodb.org/repo/redhat/os/x86_64
gpgcheck=0
enabled=1
</pre>

<p>Luego procedemos a instarlo ejecutando el comando:</p>

<pre>$ yum install mongo-10gen mongo-10gen-server
</pre>

<p>Para gestionar el servicio de MongoDB basta con ejecutar:</p>

<pre>$ sudo service mongod [ start | stop | restart | status ]
</pre>

<h2>Windows</h2>

<p>Dirigete a la <a href="http://www.mongodb.org/downloads">página de oficial de MongoDB</a> y descarga el comprimido según la arquitectura de tu sistema operativo.</p>

<p>A partir de la versión 2.2, MongoDB no es compatible con Windows XP.</p>

<blockquote>
  <p>Si tienes Windows Server 2008 o 7, debes instalar <a href="http://support.microsoft.com/kb/2731284">esta actualización</a> para evitar un problema conocido con archivos mapeados en memoria.</p>
</blockquote>

<p>Luego lo descomprimiremos y, según las recomendaciones, creamos un directorio <code>mongodb</code> en el directorio raíz <code>C:</code> donde colocaremos el contenido del comprimido, luego crearemos en <code>C:</code> un directorio <code>data</code> y dentro de este un directorio <code>db</code>, aquí será donde MongoDB almacenará la información de las bases de datos.</p>

<p>Para hacer que MongoDB funcione como un servicio primero crea el directorio <code>log</code> dentro de <code>C:\mongodb\</code> y luego ejecutaremos el siguiente comando para crear el archivo de configuración asociado:</p>

<pre>$ echo logpath=C:\mongodb\log\mongo.log > C:\mongodb\mongod.cfg
</pre>

<p>Luego instalemos el servicio:</p>

<pre>$ C:\mongodb\bin\mongod.exe --config C:\mongodb\mongod.cfg --install
</pre>

<p>Ahora para gestionar el servicio de MongoDB basta con ejecutar:</p>

<pre>$ net [ start | stop ] MongoDB
</pre>

<hr />

<h2>¿Cómo lo configuro?</h2>

<p>Buscaremos y editaremos el archivo de configuración.</p>

<h3>Mac OS X</h3>

<pre>/usr/local/etc/mongod.conf
</pre>

<h3>Sistemas Debian, Fedora, CentOS y RedHat</h3>

<pre>/etc/mongodb.conf
</pre>

<h3>Windows</h3>

<pre>C:\mongodb\mongod.cfg
</pre>

<p>Hablemos de algunas de las variables de mayor uso en este archivo.</p>

<ul>
<li><code>port</code> especificación del puerto donde escucha la base de datos.</li>
<li><code>bind_ip</code> permite delimitar especificamente qué IPs pueden interactuar con la base de datos.</li>
<li><code>maxConns</code> cantidad máxima de conexiones que serán aceptados, el valor por defecto depende de la cantidad de descriptores de archivos que maneja el sistema operativo.</li>
<li><code>objcheck</code> habilitado por defecto, obliga a <code>mongod</code> a verificar cada petición para asegurar que la estructura de los documentos que insertan los clientes sea siempre válida. Cabe destacar que para documentos complejos esta opción puede afectar un poco el rendimiento.</li>
<li><code>fork</code> inhabilitado por defecto, permite ejecutar <code>mongod</code> como un <em>daemon</em>.</li>
<li><code>auth</code> inhabilitado por defecto, permite limitar el acceso remoto a la base de datos al implementar un mecanismo de autenticación. </li>
<li><code>dbpath</code> especifica el directorio donde la instancia de base de datos almacena toda su información.</li>
<li><code>directoryperdb</code> inhabilitado por defecto, ofrece la opción de que la información de cada base de datos presente en la instancia se almacene en carpetas separadas.</li>
<li><code>journal</code> al habilitarse permite que las operaciones realizadas sobre la data sean almacenadas en una bitácora para en caso de ocurrir una falla, el sistema sea capaz de reconstruir la información que haya podido perderse.</li>
<li><code>smallfiles</code> inhabilitado por defecto, ofrece la opción de que los archivos creados sean más pequeños y, por ende, más fáciles de entender, procesar y monitorear en varias ocasiones.</li>
<li><code>syncdelay</code> especifica el lapso en segundos que tardará la instancia en pasar la información en la bitácora a persistencia.</li>
</ul>

<p>También se ofrecen varias opciones para el uso de SSL, configuración de replicación y clusterización lo cual tocaremos a medida que avance el curso.</p>

<hr />

<h2>Entrar a la consola</h2>

<p>Bien ahora ya estamos listos para entrar a la base de datos y comenzar a jugar con ella. Para ello luego de tener el servicio de MongoDB corriendo, ejecutaremos el comando <code>mongo</code> y esto nos llevará a la consola interna de la instancia.</p>

<blockquote>
  <p>Para ir a la consola de MongoDB en sistemas Windows, si seguiste las instrucciones en el curso anterior, luego de iniciar el servicio, ejecuta el archivo <code>C:\mongodb\bin\mongo.exe</code></p>
</blockquote>

<hr />

<h2>Conclusión</h2>

<p>Esta semana vimos solo un abreboca de lo que es capaz MongoDB, lo instalamos y vimos algunos detalles sobre su configuración, que la desesperación no te impida llegar a la semana que viene para aprender a utilizarlo. Hasta entonces.</p>
