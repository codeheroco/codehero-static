---
layout: post
status: publish
published: true
title: Colecciones Limitadas y Expiraciones
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
wordpress_id: 2615
wordpress_url: http://codehero.co/?p=2615
date: 2013-11-19 00:05:04.000000000 -04:30
serie: MongoDB desde Cero
thumbnail: http://i.imgur.com/XFFMeqB.png
categories:
- Cursos
- MongoDB
tags:
- mongo
- mongodb
- capped
- limitadas
- expire
- expiracion
- ttl
- tiempo de vida
- time to live
---
<p>Una base de datos puede crecer rápidamente para algunos casos de uso en los cuales se desea almacenar información histórica como eventos, bitácoras personalizadas, información de sesiones y otros. Más importante aun es que muchas veces dicha información solo nos es útil por un margen de tiempo determinado, luego terminan siendo desechos y a medida que pasa el tiempo pueden afectar el rendimiento. Por esta razón esta semana hablaremos de como mantener solo la información que necesitamos y aquella que es vieja, desecharla y que deje de ser parte de la base de datos.</p>

<hr />

<h2>Expiraciones o Tiempos de Vida (TTL)</h2>

<p>Esta funcionalidad nos permite establecer un tiempo de vigencia sobre los documentos de una colección. MongoDB maneja estos tiempos de vida mediante el uso de un índice especial con el mismo nombre (<em>TTL index</em>), uno de los hilos del proceso de <em>mongod</em> se encarga de realizar las búsquedas necesarias usando estos índices con el fin de determinar aquellos documentos que cumplan con la condición de vida preestablecida y los elimina automáticamente. Además veremos las 2 maneras de establecer el vencimiento de un documento.</p>

<blockquote>
  <p>El proceso de búsqueda y eliminación es ejecutado cada 60 segundo aproximadamente, por lo que es posible que <strong>un documento continúe siendo parte de la colección luego de su tiempo de vida preestablecido</strong>, adicionalmente se puede producir un retraso dependiendo de la carga de trabajo que tenga la instancia en dicho momento.</p>
</blockquote>

<p>Existen algunas consideraciones respecto a los índices TTL que debemos tomar en cuenta cuando vayamos a implementar este tipo de solución.</p>

<h3>Restricciones</h3>

<ul>
<li>Los índices TTL deben hacerse sobre campos que no posean otro índice.</li>
<li>El campo a indexar debe ser de tipo fecha o un arreglo de fechas.</li>
<li>En caso de tener un arreglo de fechas, el documento expirará cuando la menor fecha sea alcanzada.</li>
<li>El índice TTL no puede ser compuesto.</li>
</ul>

<h3>Expiración en cuenta regresiva</h3>

<p>Esta estrategia se basa en definir la duración en segundos que tendrán de vigencia los documentos de una colección especifica.</p>

<p>Para ello crearemos una colección con un par de documentos:</p>

<pre>> var fantasma1 = {
    fecha:      new Date(),
    mensaje:    'buuuu'
}

> var fantasma2 = {
    fecha:      new Date(),
    mensaje:    'no durare mucho tiempo'
}

> db.fantasmas.insert(fantasma1)
> db.fantasmas.insert(fantasma2)

> db.fantasmas.find()
{ "_id" : ObjectId("52891f4d9f5ebcdb2a850063"), "fecha" : ISODate("2013-11-17T19:55:46.097Z"), "mensaje" : "buuuu" }
{ "_id" : ObjectId("52891f4f9f5ebcdb2a850064"), "fecha" : ISODate("2013-11-17T19:55:50.721Z"), "mensaje" : "no durare mucho tiempo" }
</pre>

<blockquote>
  <p>El comando <code>new Date()</code> creará un objeto tipo fecha con la fecha y hora de este momento.</p>
</blockquote>

<p>Bien, ahora crearemos el índice TTL y especificaremos la duración de vigencia que deben tener los documentos.</p>

<pre>> db.fantasmas.ensureIndex({ fecha : 1 }, { expireAfterSeconds : 300 })
</pre>

<p>En este caso especificamos que aquellos documentos que tengan en su campo <code>fecha</code> un valor mayor a 300 segundos (5 minutos) de antigüedad deben ser eliminados.</p>

<p>Luego de que hayan pasado 5 minutos si volvemos a buscar los documentos de la colección estos ya no existirán. Ten en cuenta que si un documento no posee el campo <code>fecha</code> o si el campo no es de tipo <code>date</code> este simplemente no se vencerá.</p>

<h3>Expiración en hora especifica</h3>

<p>Esta segunda estrategia se basa en la definición especifica en cada documento de cuando este debe vencer, esto nos permitirá establecer un comportamiento dinámico para cada documento y que cada uno pueda tener más o menos vigencia que aquellos que comparten la misma colección.</p>

<p>Para demostrarlo crearemos un par de documentos con fechas diferentes, una con una fecha bastante próxima, digamos 5 minutos y otro para el año que viene, lo cual nos permitirá apreciar el comportamiento:</p>

<pre>> var fantasma3 = {
    fecha:      new Date('Nov 17, 2013. 16:00:00'),
    mensaje:    'solo un susto y me voy'
}

> var fantasma4 = {
    fecha:      new Date('Nov 17, 2014. 16:00:00'),
    mensaje:    'estare aqui un largo tiempo'
}

> db.otrosFantasmas.insert(fantasma3)
> db.otrosFantasmas.insert(fantasma4)

> db.otrosFantasmas.find()
{ "_id" : ObjectId("528927c79f5ebcdb2a85006a"), "fecha" : ISODate("2013-11-17T20:30:00Z"), "mensaje" : "solo un susto y me voy" }
{ "_id" : ObjectId("5289281f9f5ebcdb2a85006b"), "fecha" : ISODate("2014-11-17T20:30:00Z"), "mensaje" : "estare aqui un largo tiempo" }
</pre>

<blockquote>
  <p>Podemos notar que la hora que fue insertada no es la misma que la que indicamos, esto se debe a que la hora almacenada se encuentra en el horario GMT 0, como en Venezuela estamos en GMT-4:30 por ello se almacena la hora como a las 8:30pm en lugar de las 4:00pm</p>
</blockquote>

<p>Por último colocaremos el índice TTL pero en este caso colocaremos la "vigencia" como cero, esto le indicará a MongoDB que debe vencer los documentos según la fecha indicada en el campo <code>fecha</code> de cada uno:</p>

<pre>> db.otrosFantasmas.ensureIndex({ fecha : 1 }, { expireAfterSeconds : 0 })
</pre>

<p>Ahora si esperamos a que se cumple la hora que estipulamos y buscamos los documentos de nuestra colección veremos que el que se vencía próximamente ya no existe, y el del año que viene todavía lo sigue ahí:</p>

<pre>> db.otrosFantasmas.find()
{ "_id" : ObjectId("5289281f9f5ebcdb2a85006b"), "fecha" : ISODate("2014-11-17T20:30:00Z"), "mensaje" : "estare aqui un largo tiempo" }
</pre>

<hr />

<h2>Colecciones Limitadas</h2>

<p>Este tipo de colecciones cumple el propósito de almacenamiento circular de documentos, es decir, la colección al alcanzar un tamaño determinado se empieza a sobreescribir desde el inicio, muy similar a lo que sería un <em>buffer</em> circular.</p>

<p>Otra ventaja de las colecciones limitadas es su alto rendimiento de inserción ya que su información es almacenada (y devuelta al consultar) en el orden natural que fueron insertados.</p>

<p>Sin embargo estas características no vienen sin sacrificio alguno, hay ciertos aspectos a considerar.</p>

<h3>Restricciones</h3>

<ul>
<li>No se pueden eliminar documentos particulares.</li>
<li>Al actualizar documentos ya existentes, estos no pueden crecer su tamaño en disco.</li>
<li>TTL no es compatible con estas colecciones.</li>
</ul>

<p>Esto viene dado por el hecho de que al declarar una colección limitada, se reserva un espacio en disco para ella y los documentos que contendrá, a su vez, como los documentos se almacenarán de manera continua en disco, esto limita que no se puedan eliminar documentos ni incrementar su tamaño para que la estructura del espacio alocado no sea alterado.</p>

<h3>Creación</h3>

<p>Para crear una colección limitada lo haremos de una manera un poco diferente a como estamos acostumbrados, ya que debemos especificar la capacidad que tendrá:</p>

<pre>> db.createCollection( 'eventos', { capped: true, size: 1000000, max: 10000 } )
</pre>

<p>En este caso estamos creando una colección llamada <code>eventos</code> la cual especificamos que tiene que ser limitada (<code>capped</code>), también delimitamos el espacio en disco (en bytes) que deberá ser alocado, en este caso un poco menos de 1MB, <strong>opcionalmente</strong> podemos además especificar la cantidad máxima de documentos que podrá contener esta colección, para este caso 10000 documentos.</p>

<h3>Conversión</h3>

<p>Es posible convertir una colección normal a limitada sin necesidad de crearla desde cero, para esto debemos ejecutar el comando de conversión y especificar los límites:</p>

<pre>> db.otrosFantasmas.isCapped()
false

> db.runCommand({"convertToCapped": "otrosFantasmas", size: 1000000});
{ "ok" : 1 }

> db.otrosFantasmas.isCapped()
true
</pre>

<blockquote>
  <p>Hemos convertido una colección con índices TTL a limitada, por lo tanto si ejecutamos el comando <code>db.otrosFantasmas.getIndexes()</code> notaremos que ya el índice no existe.</p>
</blockquote>

<hr />

<h2>Conclusión</h2>

<p>Hemos visto como evitar que nuestra base de datos se llene con información que luego de un tiempo deja de ser relevante, esto es parte vital que impacta sobre el rendimiento de la misma ya que mientras más información existe, más tardarán las búsquedas en realizarse. Hasta la próxima semana.</p>
