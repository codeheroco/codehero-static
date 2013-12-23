---
layout: post
status: publish
published: true
title: Auto-incremento y Búsquedas Avanzadas
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
wordpress_id: 2541
wordpress_url: http://codehero.co/?p=2541
date: 2013-11-05 00:05:16.000000000 -04:30
categories:
- Cursos
- MongoDB
tags:
- mongo
- mongodb
- autoincremento
- autoincrement
- busquedas avanzadas
- secuencias
- selectores
---
<p>La esencia de una base de datos es la capacidad de almacenar datos; sin embargo su propósito principal es obtener información específica basada en los parámetros que necesarios para un momento determinado, esto con la finalidad de no tener que recorrer manualmente todos los datos que poseemos para obtener lo que deseamos. Para ello, esta semana hablaremos de las búsquedas avanzadas y las secuencias auto-incrementadas.</p>

<hr />

<h2>Secuencias Auto-incrementadas</h2>

<p>Una de las necesidades con la cual nos hemos encontrado en algún punto al tener nuestro esquema de base de datos es la de poseer aquella estructura que permite asignar automáticamente el siguiente valor de la secuencia de un campo particular al insertar un nuevo registro. A esta funcionalidad se le conoce como secuencias auto-incrementadas, algunas bases de datos permiten establecer un campo con esta propiedad con tan solo definir una restricción o <em>constraint</em>; sin embargo el esquema de datos de MongoDB no adopta nativamente dicho aspecto pero permite su implementación siguiendo el patrón abajo descrito.</p>

<p>Para entender el comportamiento supongamos el caso que tenemos una colección de autores y deseamos establecer el campo <code>_id</code> como auto-incrementado.</p>

<p>Este patrón se basa en el uso de una colección y función auxiliar que permita llevar y obtener los valores siguientes de la secuencia incremental. Para esto primero crearemos una colección de contadores de la siguiente manera:</p>

<pre>> var usuariosAutoincrement = {
    _id:        'autoresid',
    secuencia:  0
}

> db.contadores.insert(usuariosAutoincrement)
</pre>

<blockquote>
  <p>Al especificar el campo <code>secuencia</code> como <code>0</code> indicará que la misma comenzará con este número.</p>
</blockquote>

<p>Ahora crearemos una función <strong>Javascript</strong> la cual se encargará de buscar el próximo número en la secuencia, veamos de que se trata:</p>

<pre>> function proximoEnSecuencia(nombre){
    var resultado = db.contadores.findAndModify({
        query:  { _id:  nombre },
        update: { $inc: { secuencia: 1 } },
        new:    true
    });
    
    return resultado.secuencia;
}
</pre>

<p>Bien, veamos en detalle que hace nuestra función:</p>

<ul>
<li>Sobre la colección <code>contadores</code> hacemos una búsqueda y actualización al mismo tiempo (<code>findAndModify</code>).</li>
<li>El parámetro <code>query</code> nos especifica qué documento de la colección <code>contadores</code> debemos buscar, es decir, aquel con el <code>_id</code> que se especifique como parámetro de la función. </li>
<li>El parámetro <code>update</code> indica que luego de haber encontrado el documento en cuestión se debe incrementar (<code>$inc</code>) el campo <code>secuencia</code> en <code>1</code>.</li>
<li>El parámetro <code>new</code> le indica al método <code>findAndModify</code> que debe arrojar como resultado el nuevo documento en lugar del original, es decir, aquel que ya ha sido actualizado con el incremento.</li>
<li>El resultado de este método <code>findAndModify</code> es asignado a una variable y debido a que el resultado es un documento, podemos finalmente retornar el campo <code>secuencia</code> de dicho documento, el cual será el próximo número en la secuencia.</li>
</ul>

<p>Ahora cuando queramos hacer uso de dicha función para que se encargue de asignar automáticamente el siguiente <code>_id</code> para nuestra colección de autores lo haremos de la siguiente manera:</p>

<pre>> var oscar = {
    _id:        proximoEnSecuencia('autoresid'),
    nombre:     'Oscar',
    edad:       25
};

> var alberto = {
    _id:        proximoEnSecuencia('autoresid'),
    nombre:     'Alberto',
    edad:       'veintiseis'
};

> var jonathan = {
    _id:        proximoEnSecuencia('autoresid'),
    nombre:     'Jonathan',
    apellido:   'Wiesel'
};

> db.autoresAutoIncrement.insert(oscar);
> db.autoresAutoIncrement.insert(alberto);
> db.autoresAutoIncrement.insert(jonathan);
</pre>

<p>Probemos que en efecto nuestra solución ha hecho su trabajo:</p>

<pre>> db.autoresAutoIncrement.find()
{ "_id" : 1, "nombre" : "Oscar", "edad" : 25 }
{ "_id" : 2, "nombre" : "Alberto", "edad" : "veintiseis" }
{ "_id" : 3, "nombre" : "Jonathan", "apellido": "Wiesel" }

> db.contadores.find()
{ "_id" : "autoresid", "secuencia" : 3 }
</pre>

<p>Notemos que nuestro autores han tomado su respectivo valor de la secuencia mientras que el documento de la secuencia como tal permanece actualizado con el último valor utilizado.</p>

<h2>Selectores de búsqueda</h2>

<p>Como mencionamos anteriormente el poder que ofrece una base de datos reside en la capacidad que esta tiene para poder ofrecer los datos que necesitamos en un momento especifico según las necesidades que se nos presenten en dicha situación. Ciertamente vimos como filtrar las búsquedas en nuestra <a href="http://codehero.co/mongodb-desde-cer-operaciones-basicas/">segunda entrada del curso</a>; sin embargo en esta entrada veremos algo un poco más avanzado.</p>

<p>Veamos <strong>algunas</strong> de las diferentes maneras de filtrar nuestras búsquedas haciendo uso de diferentes tipos de operadores o selectores de búsquedas. Adicionalmente notaremos que se enfoca a lo mismo que conocemos en SQL.</p>

<h3>Comparativos</h3>

<ul>
<li><code>$gt</code> - mayor a X valor.</li>
<li><code>$gte</code> - mayor o igual a X valor.</li>
<li><code>$lt</code> - menor a X valor.</li>
<li><code>$lte</code> - menor o igual a X valor.</li>
<li><code>$ne</code> - distinto a X valor.</li>
<li><code>$in</code> - entre los siguientes [ X, Y, ... ]</li>
<li><code>$nin</code> no está entre los siguientes [ X, Y, ... ]</li>
</ul>

<p>Los primeros 4 evidentemente están enfocados a valores numéricos y pueden ser utilizados de las siguiente manera:</p>

<pre>> db.autoresAutoIncrement.find({ _id : { $gt : 1 } })
{ "_id" : 2, "nombre" : "Alberto", "edad" : "veintiseis" }
{ "_id" : 3, "nombre" : "Jonathan", "apellido": "Wiesel" }
</pre>

<blockquote>
  <p>En SQL sería algo como <code>SELECT * FROM autoresAutoIncrement WHERE _id &gt; 1</code></p>
</blockquote>

<p>El operador <code>$ne</code> (distino de...) como podrás adivinar puede utilizarse para campos numéricos y no numéricos. Mientras que los últimos 2 operadores se enfocan en la comparación con arreglos de valores:</p>

<pre>> db.autoresAutoIncrement.find({ nombre : { $in : ['Alberto', 'Ricardo', 'Oscar'] } })
{ "_id" : 1, "nombre" : "Oscar", "edad" : 25 }
{ "_id" : 2, "nombre" : "Alberto", "edad" : "veintiseis" }
</pre>

<blockquote>
  <p>En SQL sería algo como <code>SELECT * FROM autoresAutoIncrement WHERE nombre in ('Alberto', 'Ricardo', 'Oscar')</code></p>
</blockquote>

<h3>Lógicos</h3>

<ul>
<li><code>$or</code></li>
<li><code>$and</code></li>
<li><code>$nor</code></li>
<li><code>$not</code></li>
</ul>

<p>Estos operadores lógicos nos permiten juntar múltiples condiciones y dependiendo del cumplimiento de alguna de ellas (<code>$or</code>), todas ellas (<code>$and</code>) o ninguna de ellas (<code>$nor</code>) obtendremos lo que deseamos, inclusive si lo que deseamos es completamente lo opuesto (<code>$not</code>) a lo que especificamos como condición de búsqueda.</p>

<pre>> db.autoresAutoIncrement.find({ $or : [{_id: 1}, {nombre: 'Jonathan'}] })
{ "_id" : 1, "nombre" : "Oscar", "edad" : 25 }
{ "_id" : 3, "nombre" : "Jonathan", "apellido": "Wiesel" }
</pre>

<blockquote>
  <p>En SQL sería algo como <code>SELECT * FROM autoresAutoIncrement WHERE _id = 1 OR nombre = 'Jonathan'</code></p>
</blockquote>

<p>En el caso del operador <code>$and</code>, si has prestado atención a lo largo de la serie te darás cuenta que MongoDB maneja implícitamente este tipo de operador, si no lo recuerdas puedes visitar el curso de <a href="http://codehero.co/mongodb-desde-cer-operaciones-basicas/">operaciones básicas</a> para refrescar la memoria.</p>

<p>Para el operador <code>$nor</code> seguiríamos la misma notación que el ejemplo anterior con la diferencia que obtendríamos como resultado aquellos registros que <strong>ni</strong> tengan el <code>_id = 1</code> <strong>ni</strong> el <code>nombre = Jonathan</code>. Por lo que obtendríamos a Alberto únicamente.</p>

<p>Finalmente el operador <code>$not</code> actúa sobre el operador que le siga y como podrás imaginar, devolverá el resultado contrario.</p>

<pre>> db.autoresAutoIncrement.find({ _id : { $not: { $gt: 2 }} })
{ "_id" : 1, "nombre" : "Oscar", "edad" : 25 }
{ "_id" : 2, "nombre" : "Alberto", "edad" : "veintiseis" }
</pre>

<p>Al principio pensarás:</p>

<blockquote>
  <p>¿Por qué usar este operador si pude haber utilizado el <code>$lte</code>?</p>
</blockquote>

<p>Una de las ventajas que quizás pasaste por alto es que suponiendo el caso donde dicho filtro se hace sobre otro campo distinto al de <code>_id</code> el cual no es obligatorio, usar el operador <code>$lte</code> obtendrá aquellos documentos con el campo mayor o igual al valor indicado; sin embargo al utilizar el operador <code>$not</code> también <strong>obtendremos aquellos documentos que ni siquiera poseen el campo</strong>.</p>

<h3>Elementales</h3>

<ul>
<li><code>$exists</code></li>
<li><code>$type</code></li>
</ul>

<p>Este tipo de operadores elementales permiten hacer comparaciones referentes a las propiedades del campo como tal.</p>

<p>En el caso de <code>$exist</code>, es un operador booleano que permita filtrar la búsqueda tomando en cuenta la existencia de un campo en particular:</p>

<pre>> db.autoresAutoIncrement.find({ apellido: { $exists: true }})
{ "_id" : 3, "nombre" : "Jonathan", "apellido" : "Wiesel" }
</pre>

<p>Notaremos que hemos filtrado la búsqueda para que arroje únicamente los documentos que poseen el campo <code>apellido</code>.</p>

<p>Para el caso de <code>$type</code> podemos filtrar por la propiedad de tipo de campo y como valor especificaremos el ordinal correspondiente a su tipo de dato BSON basado en lo siguiente:</p>

<ul>
<li>1 - Double</li>
<li>2 - String</li>
<li>3 - Objeto</li>
<li>4 - Arreglo</li>
<li>5 - Data binaria</li>
<li>6 - Indefinido (deprecado)</li>
<li>7 - Id de objeto</li>
<li>8 - Booleano</li>
<li>9 - Fecha</li>
<li>10 - Nulo</li>
<li>11 - Expresión regular</li>
<li>13 - Javascript</li>
<li>14 - Símbolo</li>
<li>15 - Javascript con alcance definido</li>
<li>16 - Entero de 32bit</li>
<li>17 - Estampilla de tiempo</li>
<li>18 - Entero de 64bit</li>
<li>127 - Llave máxima</li>
<li>255 - Llave mínima</li>
</ul>

<pre>> db.autoresAutoIncrement.find({ edad: { $type: 1 }})
{ "_id" : 1, "nombre" : "Oscar", "edad" : 25 }

> db.autoresAutoIncrement.find({ edad: { $type: 2 }})
{ "_id" : 2, "nombre" : "Alberto", "edad" : "veintiseis" }
</pre>

<blockquote>
  <p>Notemos que para el primer caso indicamos el tipo de campo <code>Double</code> en lugar de uno entero, esto se debe a que el único tipo de dato numérico nativo existente en Javascript es de tipo <code>Double</code> y al ser insertado por la consola de MongoDB se torna en este tipo de dato.</p>
</blockquote>

<hr />

<h2>Conclusión</h2>

<p>Hemos dado las herramientas para que puedas hacer los filtros que necesites para tu aplicación y finalmente lograr obtener la información específica necesaria para manejarla correctamente. Ten en cuenta que algunos ORM (modeladores de relaciones y objetos) utilizan una sintaxis parecida a la que vimos en esta entrada por lo que recordarla te podrá ayudar en el futuro para otras cosas. ¡Hasta la próxima!</p>
