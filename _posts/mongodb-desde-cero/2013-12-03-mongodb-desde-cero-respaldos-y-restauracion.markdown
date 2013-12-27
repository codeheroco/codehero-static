---
layout: post
status: publish
published: true
title: Respaldos y Restauración
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
wordpress_id: 2712
wordpress_url: http://codehero.co/?p=2712
date: 2013-12-03 00:06:37.000000000 -04:30
serie: MongoDB desde Cero
thumbnail: http://i.imgur.com/XFFMeqB.png
categories:
- Cursos
- MongoDB
tags:
- mongo
- mongodb
- respaldo
- dump
- restore
- restauracion
- volcado
- mongodump
- mongorestore
- migrar
- migracion
- copydatabase
- backup
---
<p>Como bien sabemos, parte importante del mantenimiento de una base de datos es la prevención al desastre por medio del respaldo de la información que esta contiene, de igual manera debemos estar preparados para saber como restaurar dicha información nuevamente. Veamos como llevar a cabo estas tareas.</p>

<hr />

<h2>Volcado (dump)</h2>

<p>MongoDB posee una herramienta muy útil que nos permite hacer un volcado de la información de la base de datos a un archivo de respaldo. Esta herramienta se llama <code>mongodump</code>, y se utiliza por medio de la consola o terminal de comandos.</p>

<p>Un uso muy básico sería simplemente ejecutar:</p>

<pre>$ mongodump
</pre>

<p>Esto se conecta a la instancia de Mongo que se encuentra ejecutandose en el mismo equipo, en el puerto por defecto 27017 y crea un archivo de respaldo de todas las bases de datos de la instancia (menos <code>local</code>) y lo almacena en un directorio <code>dump/</code> de la ruta de donde se ejecutó el comando.</p>

<p>Ciertamente podemos agregarle algunos parámetros a este comando para adaptarlo a nuestras necesidades:</p>

<ul>
<li><code>--out</code> - se especifica un directorio distinto al por defecto <code>dump/</code> para que se almacene el respaldo.</li>
<li><code>--port</code> - se especifica un puerto, en caso que no se utilice el por defecto <code>27017</code>.</li>
<li><code>--host</code> - se especifica la dirección donde reside la instancia, en caso que no se utilice el por defecto <code>localhost</code>.</li>
<li><code>--db</code> - se especifica una base de datos particular en lugar de tomar todas.</li>
<li><code>--collection</code> - usado en conjunto con <code>--db</code> se especifica una colección particular que se quiera extraer de dicha base de datos.</li>
<li><code>--dbpath</code> - se especifica el directorio que contiene los archivos de las bases de datos. Esto es sumamente útil en caso de que el proceso de <code>mongod</code> no esté ejecutandose ya que podemos acceder directamente a sus archivos.</li>
<li><code>--username</code> y <code>--password</code> - permite especificar credenciales de usuario en caso de que estas sean requeridas.</li>
</ul>

<p>Para nuestro ejemplo volquemos la información de la base de datos <code>codehero</code>:</p>

<pre>$ mongodump --db codehero

connected to: 127.0.0.1
Fri Nov 29 23:17:51.202     DATABASE: codehero   to     dump/codehero
Fri Nov 29 23:17:51.203     codehero.system.indexes to dump/codehero/system.indexes.bson
Fri Nov 29 23:17:51.204          6 objects
Fri Nov 29 23:17:51.204     codehero.autores to dump/codehero/autores.bson
Fri Nov 29 23:17:51.228          5 objects
Fri Nov 29 23:17:51.228     Metadata for codehero.autores to dump/codehero/autores.metadata.json
Fri Nov 29 23:17:51.229     codehero.system.users to dump/codehero/system.users.bson
Fri Nov 29 23:17:51.230          0 objects
Fri Nov 29 23:17:51.230     Metadata for codehero.system.users to dump/codehero/system.users.metadata.json
Fri Nov 29 23:17:51.230     codehero.fantasmas to dump/codehero/fantasmas.bson
Fri Nov 29 23:17:51.237          0 objects
Fri Nov 29 23:17:51.237     Metadata for codehero.fantasmas to dump/codehero/fantasmas.metadata.json
Fri Nov 29 23:17:51.245     codehero.otrosFantasmas to dump/codehero/otrosFantasmas.bson
Fri Nov 29 23:17:51.259          1 objects
Fri Nov 29 23:17:51.259     Metadata for codehero.otrosFantasmas to dump/codehero/otrosFantasmas.metadata.json

$ cd dump/codehero
~/dump/codehero $ ls

autores.bson                 fantasmas.metadata.json      system.indexes.bson
autores.metadata.json        otrosFantasmas.bson          system.users.bson
fantasmas.bson               otrosFantasmas.metadata.json system.users.metadata.json
</pre>

<blockquote>
  <p>Dicha base de datos debería estar presente y con algunas colecciones si le has seguido el paso a la serie.</p>
</blockquote>

<hr />

<h2>Restauración</h2>

<p>El proceso de restauración es bastante similar al de volcado, el comando para dicha acción es <code>mongorestore</code>.</p>

<p>Primero borremos nuestra base de datos <code>codehero</code> de la instancia local:</p>

<pre>$ mongo
> use codehero
switched to db codehero
> db.dropDatabase()
{ "dropped" : "codehero", "ok" : 1 }
> show dbs
admin   0.203125GB
codehero    (empty)
local   0.078125GB
test    0.203125GB
> exit
</pre>

<p>Notaremos que la base de datos se encuentra totalmente vacía.</p>

<p>Ahora probaremos restaurando el respaldo que hicimos anteriormente:</p>

<pre>$ mongorestore --db codehero dump/codehero

connected to: 127.0.0.1
Fri Nov 29 23:33:07.464     dump/codehero/autores.bson
Fri Nov 29 23:33:07.464     going into namespace [codehero.autores]
5 objects found
Fri Nov 29 23:33:07.465     Creating index: { key: { _id: 1 }, ns: "codehero.autores", name: "_id_" }
Fri Nov 29 23:33:07.919     dump/codehero/fantasmas.bson
Fri Nov 29 23:33:07.919     going into namespace [codehero.fantasmas]
Fri Nov 29 23:33:07.999     Created collection codehero.fantasmas with options: { "create" : "fantasmas", "flags" : 1 }
Fri Nov 29 23:33:07.999     file dump/codehero/fantasmas.bson empty, skipping
Fri Nov 29 23:33:07.999     Creating index: { key: { _id: 1 }, ns: "codehero.fantasmas", name: "_id_" }
Fri Nov 29 23:33:07.999     Creating index: { key: { fecha: 1 }, ns: "codehero.fantasmas", name: "fecha_1", expireAfterSeconds: 300 }
Fri Nov 29 23:33:08.002     dump/codehero/otrosFantasmas.bson
Fri Nov 29 23:33:08.002     going into namespace [codehero.otrosFantasmas]
Fri Nov 29 23:33:08.005     Created collection codehero.otrosFantasmas with options: { "create" : "otrosFantasmas", "capped" : true, "size" : 1000000 }
1 objects found
Fri Nov 29 23:33:08.007     Creating index: { key: { _id: 1 }, ns: "codehero.otrosFantasmas", name: "_id_" }
Fri Nov 29 23:33:08.008     dump/codehero/system.users.bson
Fri Nov 29 23:33:08.009     going into namespace [codehero.system.users]
Fri Nov 29 23:33:08.051     file dump/codehero/system.users.bson empty, skipping
Fri Nov 29 23:33:08.051     Creating index: { key: { _id: 1 }, ns: "codehero.system.users", name: "_id_" }
Fri Nov 29 23:33:08.053     Creating index: { key: { user: 1, userSource: 1 }, unique: true, ns: "codehero.system.users", name: "user_1_userSource_1" }
</pre>

<p>Ahora entremos nuevamente a la instancia para verificar la información:</p>

<pre>$ mongo
> show dbs
admin   0.203125GB
codehero    0.203125GB
local   0.078125GB
test    0.203125GB
> use codehero
switched to db codehero
> show collections
autores
fantasmas
otrosFantasmas
system.indexes
system.users
> db.autores.find()
{ "_id" : ObjectId("5232344a2ad290346881464a"), "nombre" : "Jonathan", "apellido" : "Wiesel", "secciones" : [  "Como lo hago",  "MongoDB" ] }
{ "_id" : ObjectId("523236022ad290346881464b"), "nombre" : "Oscar", "apellido" : "Gonzalez", "secciones" : [  "iOS",  "Objective C",  "NodeJS" ], "socialAdmin" : true }
{ "_id" : ObjectId("5232383a2ad290346881464c"), "nombre" : "Alberto", "apellido" : "Grespan", "secciones" : "Git", "genero" : "M" }
{ "_id" : ObjectId("5246049e7bc1a417cc91ec8c"), "nombre" : "Ramses", "apellido" : "Velazquez", "secciones" : [  "Laravel",  "PHP" ] }
</pre>

<p>Notaremos que la información efectivamente ha sido restaurada con éxito.</p>

<hr />

<h2>Migración</h2>

<p>Es posible que nos encontremos en la situación donde debamos migrar una base de datos de una instancia a otra, afortunadamente MongoDB hace este proceso sumamente sencillo.</p>

<p>Como instancia destino usaré una máquina virtual de <a href="http://codehero.co/como-instalar-y-configurar-vagrant/">Vagrant</a>, pero puedes probarlo con cualquier otro equipo con MongoDB que tengas a la mano.</p>

<blockquote>
  <p>Puedes volver a la <a href="http://codehero.co/mongodb-desde-cero-introduccion-e-instalacion/">primera entrada de la serie</a> si quieres instalar MongoDB en tu equipo destino.</p>
</blockquote>

<p>Primero debemos acceder a la instancia de Mongo del <strong>equipo destino</strong> y tan solo haremos lo siguiente:</p>

<pre>> db.copyDatabase('codehero','codeheroRemoto','192.168.0.100')
{ "ok" : 1 }

> show dbs
codeheroRemoto  0.0625GB
local   0.03125GB
> use codeheroRemoto
switched to db codeheroRemoto
> show collections
autores
fantasmas
otrosFantasmas
system.indexes
system.users
> db.autores.find()
{ "_id" : ObjectId("5232344a2ad290346881464a"), "nombre" : "Jonathan", "apellido" : "Wiesel", "secciones" : [  "Como lo hago",  "MongoDB" ] }
{ "_id" : ObjectId("523236022ad290346881464b"), "nombre" : "Oscar", "apellido" : "Gonzalez", "secciones" : [  "iOS",  "Objective C",  "NodeJS" ], "socialAdmin" : true }
{ "_id" : ObjectId("5232383a2ad290346881464c"), "nombre" : "Alberto", "apellido" : "Grespan", "secciones" : "Git", "genero" : "M" }
{ "_id" : ObjectId("5246049e7bc1a417cc91ec8c"), "nombre" : "Ramses", "apellido" : "Velazquez", "secciones" : [  "Laravel",  "PHP" ] }
</pre>

<blockquote>
  <p>Recuerda que si tienes la opción <code>bind_ip</code> asignada a una IP particular en tu archivo de configuración de la <strong>instancia de origen</strong> (generalmente <code>localhost</code>), solo esa IP podrá acceder a ella y efectivamente bloqueará las conexiones para copiar una base de datos a otra instancia.</p>
</blockquote>

<p>Notemos que el comando <code>copyDatabase</code> recibió como opciones:</p>

<ul>
<li>Base de datos origen. - <code>codehero</code></li>
<li>Base de datos destino. - <code>codeheroRemoto</code></li>
<li>Dirección de instancia de origen - <code>192.168.0.100</code>

<ul>
<li>Podriamos concatenarle el puerto de ser necesario - <code>192.168.0.100:27017</code></li>
</ul></li>
</ul>

<p>En caso que la base de datos tuviese restringido el acceso por autorización de usuario podríamos pasarle un par de opciones más con el <strong>nombre de usuario</strong> y <strong>clave</strong>.</p>

<hr />

<h2>Conlusión</h2>

<p>Hemos aprendido como manipular los respaldos de una base de datos de MongoDB y ya estamos en capacidad de migrar su información de manera sencilla. Debemos resaltar que estas son solo algunas a de las medidas de prevención a tomar, más adelante veremos algunas más avanzadas y como responder a una situación catastrófica.</p>
