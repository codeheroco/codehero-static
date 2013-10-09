---
layout: post
status: publish
published: true
title: Operaciones Básicas
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathanwiesel@gmail.com
author_url: http://jonathanwiesel.com/
wordpress_id: 2286
wordpress_url: http://codehero.co/?p=2286
date: 2013-09-23 00:00:27.000000000 -04:30
categories:
- Cursos
- MongoDB
tags:
- mongodb
- find
- query
- remove
- delete
- drop
- busqueda
- insert
comments: []
---
<p>Luego que hemos instalado MongoDB en la entrada pasada, seguramente querrás comenzar a realizar inserciones y <em>queries</em> para probar las ventajas de esta solución y poner tus habilidades en práctica, comencemos con algunas operaciones básicas para saber como manipular los datos en MongoDB.</p>

<hr />

<!--Primero creemos una base de datos para nuestro ejemplo, para ello solo debemos ejecutar el comando `use codehero`, esto cambiará de base de datos a la que hemos especificado, como una base de datos con este nombre no existe simplemente la creará apenas insertemos algún registro. 

Como hablamos al inicio del curso, MongoDB está basado en Javascript, por lo que la manera en que se usa en consola es como si estuviéramos ejecutando comandos Javascript. Por lo tanto las operaciones que se llevan a cabo son tan solo funciones sobre el objeto `db`, el objeto principal de la base de datos. -->

<h2>Creación de registros - <code>.insert()</code></h2>

<p>Las operaciones son como funciones de Javascript, así que llamaremos al objeto base de datos <code>db</code> y crearemos una nueva propiedad o lo que se asemejaría al concepto de tabla con el nombre de <code>autores</code> y le asociaremos su valor correspondiente (un objeto autor), es decir, una <strong>colección</strong> con un <strong>documento</strong> asociado:</p>

<pre>> db.autores.insert({ 
    nombre      :   'Jonathan',
    apellido    :   'Wiesel',
    secciones   :   ['Como lo hago' , 'MongoDB']
});
</pre>

<blockquote>
  <p>Los <strong>documentos</strong> se definen como los objetos Javascript, u objetos JSON.</p>
</blockquote>

<p>Inclusive es posible declarar el documento como un objeto, almacenarlo en una variable y posteriormente insertarlo de la siguiente manera:</p>

<pre>> var autorDelPost = { 
    nombre      : 'Jonathan',
    apellido    : 'Wiesel',
    secciones   : ['Como lo hago' , 'MongoDB']
};

> db.autores.insert(autorDelPost);
</pre>

<p>Ahora si ejecutamos el comando <code>show collections</code> podremos ver que se encuentra nuestra nueva colección de autores:</p>

<pre>autores
...
</pre>

<p>Agreguemos un par de autores más:</p>

<pre>> db.autores.insert({ 
    nombre      :   'Oscar',
    apellido    :   'Gonzalez',
    secciones   :   ['iOS' , 'Objective C' , 'NodeJS' ],
    socialAdmin :   true
});
> db.autores.insert({ 
    nombre      :   'Alberto',
    apellido    :   'Grespan',
    secciones   :   'Git',
    genero      :   "M"
});
</pre>

<p>Veamos que insertamos nuevos documentos en la colección de autores que tienen otra estructura, en MongoDB esto es completamente posible y es una de sus ventajas.</p>

<hr />

<h2>Búsqueda de registros - <code>.find()</code></h2>

<p>Hagamos un <em>query</em> o una busqueda de todos registros en la colección de autores.</p>

<pre>> db.autores.find();

{ "_id" : ObjectId("5232344a2ad290346881464a"), "nombre" : "Jonathan", "apellido" : "Wiesel", "secciones" : [  "Como lo hago",  "Noticias" ] }
{ "_id" : ObjectId("523236022ad290346881464b"), "nombre" : "Oscar", "apellido" : "Gonzalez", "secciones" : [  "iOS",  "Objective C",  "NodeJS" ], "socialAdmin" : true }
{ "_id" : ObjectId("5232383a2ad290346881464c"), "nombre" : "Alberto", "apellido" : "Grespan", "secciones" : "Git", "genero" : "M" }
</pre>

<p>Notemos que la búsqueda nos arroja los objetos resultantes, en este caso los documentos de los 3 autores que insertamos acompañados del identificador único que crea MongoDB, este campo <code>_id</code> se toma además como indice por defecto.</p>

<blockquote>
  <p>Si lo deseas puedes manualmente especificar el valor del campo <code>_id</code> cuando estas insertando los registros con el comando <code>db.coleccion.insert()</code>; sin embargo ten en cuenta que debes asegurar que este valor sea único, de lo contrario los registros con dicho campo duplicado resultarán en error por clave primaria duplicada.</p>
  
  <p>Una búsqueda como la anterior sería similar en SQL a:</p>
  
  <p><code>SELECT * FROM autores</code></p>
</blockquote>

<h3>Filtros</h3>

<p>Digamos que ahora queremos hacer la búsqueda pero filtrada por los algún parámetro. Para esto sólo debemos pasar el filtro deseado a la función <code>find()</code>, busquemos a los administradores sociales para probar:</p>

<pre>> db.autores.find({ socialAdmin: true });

{ "_id" : ObjectId("523236022ad290346881464b"), "nombre" : "Oscar", "apellido" : "Gonzalez", "secciones" : [  "iOS",  "Objective C",  "NodeJS" ], "socialAdmin" : true }
</pre>

<blockquote>
  <p>En SQL sería similar a:</p>
  
  <p><code>SELECT * FROM autores WHERE socialAdmin = true</code></p>
</blockquote>

<p>Probemos ahora filtrar por varias condiciones, primero probemos con filtros donde TODOS se deben cumplir:</p>

<pre>> db.autores.find({ genero: 'M', secciones: 'Git' });

{ "_id" : ObjectId("5232383a2ad290346881464c"), "nombre" : "Alberto", "apellido" : "Grespan", "secciones" : "Git", "genero" : "M" }
</pre>

<blockquote>
  <p>Es importante destacar que si el documento resultante hubiese tenido en la propiedad <code>secciones</code> un arreglo en lugar de una cadena de caracteres, si dicho arreglo tuviese el valor <code>Git</code> también cumple la condición.</p>
  
  <p>En SQL sería similar a:</p>
  
  <p><code>SELECT * FROM autores WHERE genero = 'M' AND secciones = 'Git'</code></p>
</blockquote>

<p>Veamos ahora un ejemplo un poco más avanzado de filtros con condiciones donde queremos que solo ALGUNA de ellas se cumpla:</p>

<pre>> db.autores.find({ 
    $or: [
        {socialAdmin : true},
        {genero: 'M'}
    ]
 });

{ "_id" : ObjectId("523236022ad290346881464b"), "nombre" : "Oscar", "apellido" : "Gonzalez", "secciones" : [  "iOS",  "Objective C",  "NodeJS" ], "socialAdmin" : true }
{ "_id" : ObjectId("5232383a2ad290346881464c"), "nombre" : "Alberto", "apellido" : "Grespan", "secciones" : "Git", "genero" : "M" }
</pre>

<p>En este caso estamos filtrando por aquellos autores que son administradores sociales ó aquellos que tengan el campo género con el carácter M.</p>

<blockquote>
  <p>En SQL sería similar a:</p>
  
  <p><code>SELECT * FROM autores WHERE socialAdmin = true OR genero = 'M'</code></p>
</blockquote>

<h3>Limitar y Ordenar</h3>

<p>Si quisiéramos limitar los resultados a un número máximo especificado de registros es tan fácil como agregar <code>.limit(#)</code> al final del comando <code>.find()</code>:</p>

<pre>> db.autores.find().limit(1)

{ "_id" : ObjectId("5232344a2ad290346881464a"), "nombre" : "Jonathan", "apellido" : "Wiesel",  "secciones" : [  "Como lo hago",  "MongoDB" ] }
</pre>

<blockquote>
  <p>En SQL sería similar a:</p>
  
  <p><code>SELECT * FROM autores LIMIT 1</code></p>
</blockquote>

<p>La misma modalidad sigue la funcionalidad de ordenar los registros por un campo en particular, el cual servirá de argumento a la función <code>.sort()</code>:</p>

<pre>> db.autores.find().sort({apellido : 1})

{ "_id" : ObjectId("523236022ad290346881464b"), "nombre" : "Oscar", "apellido" : "Gonzalez", "secciones" : [  "iOS",  "Objective C",  "NodeJS" ], "socialAdmin" : true }
{ "_id" : ObjectId("5232383a2ad290346881464c"), "nombre" : "Alberto", "apellido" : "Grespan", "secciones" : "Git", "genero" : "M" }
{ "_id" : ObjectId("5232344a2ad290346881464a"), "nombre" : "Jonathan", "apellido" : "Wiesel", "secciones" : [  "Como lo hago",  "MongoDB" ] }
</pre>

<blockquote>
  <p>El número 1 que acompaña al argumento de ordenamiento es el tipo de orden, <code>1</code> para descendiente y <code>-1</code> para ascendente</p>
  
  <p>En SQL sería similar a:</p>
  
  <p><code>SELECT * FROM autores ORDER BY apellido DESC</code></p>
</blockquote>

<p>También podemos combinar ambas funciones tan solo llamando una después de otra:</p>

<pre>> db.autores.find().sort({apellido : 1}).limit(1)

{ "_id" : ObjectId("523236022ad290346881464b"), "nombre" : "Oscar", "apellido" : "Gonzalez", "secciones" : [  "iOS",  "Objective C",  "NodeJS" ], "socialAdmin" : true }
</pre>

<h3>Otros filtros</h3>

<p>Existen varios operadores más para filtrar las búsquedas; eso lo dejaremos para más adelante para no sobrecargarte de información tan rápido, pero no te preocupes que no lo pasaremos por alto.</p>

<hr />

<h2>Eliminación de registros - <code>.remove()</code> y <code>.drop()</code></h2>

<p>Si entendiste como buscar registros pues eliminarlos es igual de fácil. Para esto existen 4 posibilidades:</p>

<ul>
<li>Eliminar los documentos de una colección que cumplan alguna condición.</li>
<li>Eliminar todos los documentos de una colección.</li>
<li>Eliminar la colección completa.</li>
</ul>

<p>Probemos eliminandome a mí de la colección de autores:</p>

<pre>> db.autores.remove({ nombre: 'Jonathan' });
</pre>

<blockquote>
  <p>En SQL sería similar a:</p>
  
  <p><code>DELETE FROM autores WHERE nombre = 'Jonathan'</code></p>
</blockquote>

<p>¿Fácil no?. Eliminemos ahora a los demás autores:</p>

<pre>> db.autores.remove();
</pre>

<blockquote>
  <p>En SQL sería similar a:</p>
  
  <p><code>DELETE FROM autores</code></p>
</blockquote>

<p>Ahora que la colección ha quedado vacía deshagamonos de ella:</p>

<pre>> db.autores.drop();
</pre>

<blockquote>
  <p>En SQL sería similar a:</p>
  
  <p><code>DROP TABLE autores</code></p>
</blockquote>

<hr />

<h2>Conclusión</h2>

<p>Seguramente te estarás preguntando: ¿Y qué pasó con los <code>update</code>?. La modificación de registros involucra múltiples maneras para que puedas manipular la información a tu gusto, por ello lo dejaremos para la próxima entrada, no desesperes. Estos son los primeros pasos a tomar para que comiences a usar MongoDB, todavía queda un largo camino por delante ya que hay mucho que aprender sobre esta magnifica solución de base de datos.</p>
