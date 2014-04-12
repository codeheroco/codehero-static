---
layout: post
status: publish
published: true
title: Auto-incremento y Búsquedas Avanzadas
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
date: 2013-11-05 00:05:16.000000000 -04:30
serie: MongoDB desde Cero
description: Esta semana hablaremos de como realizar búsquedas avanzadas y lograr reproducir lo que en muchas bases de datos relacionales conocemos como autoincrements.
dificultad: Aprendiz
duracion: 15
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
La esencia de una base de datos es la capacidad de almacenar datos; sin embargo su propósito principal es obtener información específica basada en los parámetros que necesarios para un momento determinado, esto con la finalidad de no tener que recorrer manualmente todos los datos que poseemos para obtener lo que deseamos. Para ello, esta semana hablaremos de las búsquedas avanzadas y las secuencias auto-incrementadas.
***
##Secuencias Auto-incrementadas
Una de las necesidades con la cual nos hemos encontrado en algún punto al tener nuestro esquema de base de datos es la de poseer aquella estructura que permite asignar automáticamente el siguiente valor de la secuencia de un campo particular al insertar un nuevo registro. A esta funcionalidad se le conoce como secuencias auto-incrementadas, algunas bases de datos permiten establecer un campo con esta propiedad con tan solo definir una restricción o *constraint*; sin embargo el esquema de datos de MongoDB no adopta nativamente dicho aspecto pero permite su implementación siguiendo el patrón abajo descrito.

Para entender el comportamiento supongamos el caso que tenemos una colección de autores y deseamos establecer el campo `_id` como auto-incrementado.

Este patrón se basa en el uso de una colección y función auxiliar que permita llevar y obtener los valores siguientes de la secuencia incremental. Para esto primero crearemos una colección de contadores de la siguiente manera:

```js
> var usuariosAutoincrement = {
  _id:    'autoresid',
  secuencia:  0
}

> db.contadores.insert(usuariosAutoincrement)
```

> Al especificar el campo `secuencia` como `0` indicará que la misma comenzará con este número.

Ahora crearemos una función **Javascript** la cual se encargará de buscar el próximo número en la secuencia, veamos de que se trata:

```js
> function proximoEnSecuencia(nombre){
  var resultado = db.contadores.findAndModify({
    query:  { _id:  nombre },
    update: { $inc: { secuencia: 1 } },
    new:  true
  });

  return resultado.secuencia;
}
```

Bien, veamos en detalle que hace nuestra función:

* Sobre la colección `contadores` hacemos una búsqueda y actualización al mismo tiempo (`findAndModify`).
* El parámetro `query` nos especifica qué documento de la colección `contadores` debemos buscar, es decir, aquel con el `_id` que se especifique como parámetro de la función.
* El parámetro `update` indica que luego de haber encontrado el documento en cuestión se debe incrementar (`$inc`) el campo `secuencia` en `1`.
* El parámetro `new` le indica al método `findAndModify` que debe arrojar como resultado el nuevo documento en lugar del original, es decir, aquel que ya ha sido actualizado con el incremento.
* El resultado de este método `findAndModify` es asignado a una variable y debido a que el resultado es un documento, podemos finalmente retornar el campo `secuencia` de dicho documento, el cual será el próximo número en la secuencia.

Ahora cuando queramos hacer uso de dicha función para que se encargue de asignar automáticamente el siguiente `_id` para nuestra colección de autores lo haremos de la siguiente manera:

```js
> var oscar = {
  _id:    proximoEnSecuencia('autoresid'),
  nombre:   'Oscar',
  edad:   25
};

> var alberto = {
  _id:    proximoEnSecuencia('autoresid'),
  nombre:   'Alberto',
  edad:   'veintiseis'
};

> var jonathan = {
  _id:    proximoEnSecuencia('autoresid'),
  nombre:   'Jonathan',
  apellido: 'Wiesel'
};

> db.autoresAutoIncrement.insert(oscar);
> db.autoresAutoIncrement.insert(alberto);
> db.autoresAutoIncrement.insert(jonathan);
```

Probemos que en efecto nuestra solución ha hecho su trabajo:

```js
> db.autoresAutoIncrement.find()
{ "_id" : 1, "nombre" : "Oscar", "edad" : 25 }
{ "_id" : 2, "nombre" : "Alberto", "edad" : "veintiseis" }
{ "_id" : 3, "nombre" : "Jonathan", "apellido": "Wiesel" }

> db.contadores.find()
{ "_id" : "autoresid", "secuencia" : 3 }
```

Notemos que nuestro autores han tomado su respectivo valor de la secuencia mientras que el documento de la secuencia como tal permanece actualizado con el último valor utilizado.

##Selectores de búsqueda
Como mencionamos anteriormente el poder que ofrece una base de datos reside en la capacidad que esta tiene para poder ofrecer los datos que necesitamos en un momento especifico según las necesidades que se nos presenten en dicha situación. Ciertamente vimos como filtrar las búsquedas en nuestra [segunda entrada del curso](http://codehero.co/mongodb-desde-cer-operaciones-basicas/); sin embargo en esta entrada veremos algo un poco más avanzado.

Veamos **algunas** de las diferentes maneras de filtrar nuestras búsquedas haciendo uso de diferentes tipos de operadores o selectores de búsquedas. Adicionalmente notaremos que se enfoca a lo mismo que conocemos en SQL.

###Comparativos

* `$gt` - mayor a X valor.
*  `$gte` - mayor o igual a X valor.
*  `$lt` - menor a X valor.
*  `$lte` - menor o igual a X valor.
*  `$ne` - distinto a X valor.
*  `$in` - entre los siguientes [ X, Y, ... ]
*  `$nin` no está entre los siguientes [ X, Y, ... ]

Los primeros 4 evidentemente están enfocados a valores numéricos y pueden ser utilizados de las siguiente manera:

```js
> db.autoresAutoIncrement.find({ _id : { $gt : 1 } })
{ "_id" : 2, "nombre" : "Alberto", "edad" : "veintiseis" }
{ "_id" : 3, "nombre" : "Jonathan", "apellido": "Wiesel" }
```

> En SQL sería algo como `SELECT * FROM autoresAutoIncrement WHERE _id > 1`

El operador `$ne` (distino de...) como podrás adivinar puede utilizarse para campos numéricos y no numéricos. Mientras que los últimos 2 operadores se enfocan en la comparación con arreglos de valores:

```js
> db.autoresAutoIncrement.find({ nombre : { $in : ['Alberto', 'Ricardo', 'Oscar'] } })
{ "_id" : 1, "nombre" : "Oscar", "edad" : 25 }
{ "_id" : 2, "nombre" : "Alberto", "edad" : "veintiseis" }
```

> En SQL sería algo como `SELECT * FROM autoresAutoIncrement WHERE nombre in ('Alberto', 'Ricardo', 'Oscar')`

{% include middle-post-ad.html %}

###Lógicos

* `$or`
* `$and`
* `$nor`
* `$not`

Estos operadores lógicos nos permiten juntar múltiples condiciones y dependiendo del cumplimiento de alguna de ellas (`$or`), todas ellas (`$and`) o ninguna de ellas (`$nor`) obtendremos lo que deseamos, inclusive si lo que deseamos es completamente lo opuesto (`$not`) a lo que especificamos como condición de búsqueda.

```js
> db.autoresAutoIncrement.find({ $or : [{_id: 1}, {nombre: 'Jonathan'}] })
{ "_id" : 1, "nombre" : "Oscar", "edad" : 25 }
{ "_id" : 3, "nombre" : "Jonathan", "apellido": "Wiesel" }
```

> En SQL sería algo como `SELECT * FROM autoresAutoIncrement WHERE _id = 1 OR nombre = 'Jonathan'`

En el caso del operador `$and`, si has prestado atención a lo largo de la serie te darás cuenta que MongoDB maneja implícitamente este tipo de operador, si no lo recuerdas puedes visitar el curso de [operaciones básicas](http://codehero.co/mongodb-desde-cer-operaciones-basicas/) para refrescar la memoria.

Para el operador `$nor` seguiríamos la misma notación que el ejemplo anterior con la diferencia que obtendríamos como resultado aquellos registros que **ni** tengan el `_id = 1` **ni** el `nombre = Jonathan`. Por lo que obtendríamos a Alberto únicamente.

Finalmente el operador `$not` actúa sobre el operador que le siga y como podrás imaginar, devolverá el resultado contrario.

```js
> db.autoresAutoIncrement.find({ _id : { $not: { $gt: 2 }} })
{ "_id" : 1, "nombre" : "Oscar", "edad" : 25 }
{ "_id" : 2, "nombre" : "Alberto", "edad" : "veintiseis" }
```

Al principio pensarás:
> ¿Por qué usar este operador si pude haber utilizado el `$lte`?

Una de las ventajas que quizás pasaste por alto es que suponiendo el caso donde dicho filtro se hace sobre otro campo distinto al de `_id` el cual no es obligatorio, usar el operador `$lte` obtendrá aquellos documentos con el campo mayor o igual al valor indicado; sin embargo al utilizar el operador `$not` también **obtendremos aquellos documentos que ni siquiera poseen el campo**.

###Elementales
* `$exists`
* `$type`

Este tipo de operadores elementales permiten hacer comparaciones referentes a las propiedades del campo como tal.

En el caso de `$exist`, es un operador booleano que permita filtrar la búsqueda tomando en cuenta la existencia de un campo en particular:

```js
> db.autoresAutoIncrement.find({ apellido: { $exists: true }})
{ "_id" : 3, "nombre" : "Jonathan", "apellido" : "Wiesel" }
```

Notaremos que hemos filtrado la búsqueda para que arroje únicamente los documentos que poseen el campo `apellido`.

Para el caso de `$type` podemos filtrar por la propiedad de tipo de campo y como valor especificaremos el ordinal correspondiente a su tipo de dato BSON basado en lo siguiente:

* 1 - Double
* 2 - String
* 3 - Objeto
* 4 - Arreglo
* 5 - Data binaria
* 6 - Indefinido (deprecado)
* 7 - Id de objeto
* 8 - Booleano
* 9 - Fecha
* 10 - Nulo
* 11 - Expresión regular
* 13 - Javascript
* 14 - Símbolo
* 15 - Javascript con alcance definido
* 16 - Entero de 32bit
* 17 - Estampilla de tiempo
* 18 - Entero de 64bit
* 127 - Llave máxima
* 255 - Llave mínima


```js
> db.autoresAutoIncrement.find({ edad: { $type: 1 }})
{ "_id" : 1, "nombre" : "Oscar", "edad" : 25 }

> db.autoresAutoIncrement.find({ edad: { $type: 2 }})
{ "_id" : 2, "nombre" : "Alberto", "edad" : "veintiseis" }
```

> Notemos que para el primer caso indicamos el tipo de campo `Double` en lugar de uno entero, esto se debe a que el único tipo de dato numérico nativo existente en Javascript es de tipo `Double` y al ser insertado por la consola de MongoDB se torna en este tipo de dato.

***
##Conclusión
Hemos dado las herramientas para que puedas hacer los filtros que necesites para tu aplicación y finalmente lograr obtener la información específica necesaria para manejarla correctamente. Ten en cuenta que algunos ORM (modeladores de relaciones y objetos) utilizan una sintaxis parecida a la que vimos en esta entrada por lo que recordarla te podrá ayudar en el futuro para otras cosas. ¡Hasta la próxima!
