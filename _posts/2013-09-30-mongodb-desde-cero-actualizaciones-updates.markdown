---
layout: post
status: publish
published: true
title: Actualizaciones / Updates
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathanwiesel@gmail.com
author_url: http://jonathanwiesel.com/
wordpress_id: 2325
wordpress_url: http://codehero.co/?p=2325
date: 2013-09-30 00:02:36.000000000 -04:30
categories:
- Cursos
- MongoDB
tags:
- mongo
- mongodb
- update
- actualizacion
- modificacion
- save
comments: []
---
<p>Como mencionamos en la entrada pasada, la parte de actualizaciones o updates la dejamos por separado para tratar de ser un poco más detallados y extendernos en esta área para que puedas dominar con mayor destreza la manipulación de los datos.</p>

<hr />

<h2>Estructura</h2>

<p>Para modificar los documentos que ya se encuentran almacenados usaremos el comando <code>.update()</code> el cual tiene una estructura como esta:</p>

<pre>db.coleccion.update(
    filtro,
    cambio,
    {
        upsert: booleano,
        multi:  booleano
    }
);
</pre>

<p>Aclaremos un poco lo que nos indica la estructura.</p>

<p><code>filtro</code> - debemos especificar como encontrar el registro que desemos modificar, sería el mismo tipo de filtro que usamos en las búsquedas o <strong>finders</strong>.</p>

<p><code>cambio</code> - aquí especificamos los cambios que se deben hacer. Sin embargo ten en cuenta que hay 2 tipos de cambios que se pueden hacer:</p>

<ul>
<li>Cambiar el documento completo por otro que especifiquemos.</li>
<li>Modificar nada más los campos especificados.</li>
</ul>

<p><code>upsert</code> (opcional, <code>false</code> por defecto) - este parametro nos permite especificar en su estado <code>true</code> que si el filtro no encuentra ningun resutlado entonces el cambio debe ser insertado como un nuevo registro.</p>

<p><code>multi</code> (opcional, <code>false</code> por defecto) - en caso de que el filtro devuelva más de un resultado, si especificamos este parametro como <code>true</code>, el cambio se realizará a todos los resultados, de lo contrario solo se le hará al primero (al de menor Id).</p>

<hr />

<h2>Actualización sobrescrita (overwrite)</h2>

<p>Bien, probemos insertando nuevo autor, el cual modificaremos luego:</p>

<pre>> db.autores.insert({
    nombre      :   'Ricardo',
    apellido    :   'S'
});
</pre>

<p>Ahora probemos el primer caso, cambiar todo el documento, esto significa que en lugar de cambiar solo los campos que especifiquemos, el documento será sobreescrito con lo que indiquemos:</p>

<pre>> db.autores.update(
    {nombre: 'Ricardo'},
    {   
        nombre: 'Ricardo', 
        apellido: 'Sampayo', 
        secciones: ['Ruby','Rails'], 
        esAmigo: false
    }
);
</pre>

<p>Notemos que como primer parámetro indicamos el <code>filtro</code>, en este caso que el nombre sea <code>Ricardo</code>, luego indicamos el cambio que hariamos, como estamos probando el primer caso indicamos el documento completo que queremos que sustituya al actual. Si hacemos <code>db.autores.find({nombre:'Ricardo'});</code> podremos ver que en efecto el documento quedó como especificamos:</p>

<pre>{ "_id" : ObjectId("523c91f2299e6a9984280762"), "nombre" : "Ricardo", "apellido" : "Sampayo", "secciones" : [  "Ruby",  "Rails" ], "esAmigo" : false }
</pre>

<blockquote>
  <p>Sobreescbirir el documento no cambiará su identificador único <code>_id</code>.</p>
</blockquote>

<hr />

<h2>Operadores de Modificación</h2>

<p>Ahora probemos cambiar los campos que deseamos, para este caso haremos uso de lo que se denominan como operadores de modificación.</p>

<p>Hablemos un poco sobre algunos de estos operadores antes de verlos en acción:</p>

<ul>
<li><code>$inc</code> - incrementa en una cantidad numerica especificada el valor del campo a en cuestión.</li>
<li><code>$rename</code> - renombrar campos del documento.</li>
<li><code>$set</code> - permite especificar los campos que van a ser modificados. </li>
<li><code>$unset</code> - eliminar campos del documento.</li>
</ul>

<p>Referentes a arreglos:</p>

<ul>
<li><code>$pop</code> - elimina el primer o último valor de un arreglo.</li>
<li><code>$pull</code> - elimina los valores de un arreglo que cumplan con el filtro indicado.</li>
<li><code>$pullAll</code> - elimina los valores especificados de un arreglo.</li>
<li><code>$push</code> - agrega un elemento a un arreglo.</li>
<li><code>$addToSet</code> - agrega elementos a un arreglo solo sí estos no existen ya.</li>
<li><code>$each</code> - para ser usado en conjunto con <code>$addToSet</code> o <code>$push</code> para indicar varios elementos a ser agregados al arreglo.</li>
</ul>

<p>Hagamos una prueba sobre nuestro nuevo documento:</p>

<pre>> db.autores.update(
    { nombre: 'Ricardo' },
    { 
        $set: { esAmigo: true , age : 25 }
    }
);
</pre>

<p>En este caso estamos usando el operador <code>$set</code> para 2 propositos a la vez:</p>

<ul>
<li>Actualizar el valor de un campo (cambiamos esAmigo de <code>false</code> a <code>true</code>).</li>
<li>Creamos un campo nuevo (age) asignandole el valor <code>25</code>.</li>
</ul>

<p>Supongamos que Ricardo cumplió años en estos días, así que para incrementar el valor de su edad lo podemos hacer así:</p>

<pre>> db.autores.update(
    { nombre: 'Ricardo' },
    { 
        $inc: { age : 1 }
    }
);
</pre>

<blockquote>
  <p>También podemos indicar números negativos para decrementar.</p>
</blockquote>

<p>Aquí hablamos español, así que cambiemos ese campo <code>age</code> por lo que le corresponde:</p>

<pre>> db.autores.update(
    { nombre: 'Ricardo' },
    { 
        $rename: { 'age' : 'edad' }
    }
);
</pre>

<p>Los que trabajamos en Codehero somos todos amigos así que no es necesario guardar el campo <code>esAmigo</code>:</p>

<pre>> db.autores.update(
    { nombre: 'Ricardo' },
    { 
        $unset: { esAmigo : '' }
    }
);
</pre>

<blockquote>
  <p>El valor que le "asignes" al campo a eliminar no tendrá ningun efecto, pero es necesario escribirlo por motivos de sintaxis.</p>
</blockquote>

<p>Pasemos ahora a la parte de modificación de arreglos, agreguemosle algunas secciones extra a nuestro autor:</p>

<pre>> db.autores.update(
    { nombre: 'Ricardo' },
    { 
        $push: { secciones : 'jQuery' }
    }
);
</pre>

<blockquote>
  <p>Si se quiere asegurar que el elemento no esté duplicado se usaría <code>$addToSet</code></p>
</blockquote>

<p>Esto agregará al final del arreglo de secciones el elemento <code>jQuery</code>.</p>

<p>Agreguemos algunas secciones más en un solo paso:</p>

<pre>> db.autores.update(
    { nombre: 'Ricardo' },
    { 
        $push: { secciones : { $each : ['Haskell','Go','ActionScript'] } }
    }
);
</pre>

<p>Bueno en realidad Ricardo no maneja desde hace un tiempo ActionScript así que eliminemos ese ultimo elemento del arreglo:</p>

<pre>> db.autores.update(
    { nombre: 'Ricardo' },
    { 
        $pop: { secciones : 1 }
    }
);
</pre>

<blockquote>
  <p>Para eliminar el último elemento se coloca 1, para el primero -1.</p>
</blockquote>

<p>Ricardo hace tiempo que no nos habla sobre jQuery asi que hasta que no se reivindique quitemoslo de sus secciones:</p>

<pre>> db.autores.update(
    { nombre: 'Ricardo' },
    { 
        $pull: { secciones : 'jQuery' }
    }
);
</pre>

<p>Pensandolo bien, Ricardo nunca nos ha hablado de Haskell ni Go tampoco, eliminemoslos también:</p>

<pre>> db.autores.update(
    { nombre: 'Ricardo' },
    { 
        $pullAll: { secciones : ['Haskell','Go'] }
    }
);
</pre>

<hr />

<h2>Comando .save()</h2>

<p>Otra manera para actualizar o insertar registros es mediante el uso del comando <code>.save()</code>. Este comando recibe como parámetro únicamente un documento.</p>

<p>Insertar un registro es tal cual como si hicieramos un <code>.insert()</code>:</p>

<pre>> db.autores.save({
    nombre:     'Ramses'
});
</pre>

<p>En cuanto al caso de actualización de registros te estarás preguntando:</p>

<blockquote>
  <p>¿Si solo recibe un documento, como sabe Mongo que documento debe actualizar?</p>
</blockquote>

<p>En estos casos puedes hacer el equivalente a una actualización sobrescrita con tan solo indicar el <code>_id</code> del registro a actualizar como parte del nuevo documento.</p>

<pre>> db.autores.find({nombre: 'Ramses'});

{ "_id" : ObjectId("5246049e7bc1a417cc91ec8c"), "nombre" : "Ramses" }

> db.autores.save({
    _id:        ObjectId('5246049e7bc1a417cc91ec8c')
    nombre:     'Ramses',
    apellido:   'Velasquez',
    secciones:  ['Laravel', 'PHP'] 
});
</pre>

<blockquote>
  <p>En esta caso particular, debido a que Mongo le asigno automáticamente ese ID autogenerado poco amigable, ese mismo es el que pusimos en nuestro documento para que Mongo sepa que debe actualizar ese registro, algunos recomiendan usar <code>_id</code> que no sean establecidos por Mongo sino por la librería del cliente para evitar trabajar con este tipo de identificadores poco amigables.</p>
</blockquote>

<hr />

<h2>Conclusión</h2>

<p>Como has podido notar, MongoDB es muy poderoso y ofrece muchas ventajas en cuento a la modificación de sus registros. Claro, las búsquedas también se pueden tornar bastante interesantes según nuestras necesidades y eso lo veremos más adelante, a medida que vamos avanzando iremos tocando la mayoría de los temas que puedan servir de ayuda para que logres dominar al máximo esta solución NoSQL.</p>
