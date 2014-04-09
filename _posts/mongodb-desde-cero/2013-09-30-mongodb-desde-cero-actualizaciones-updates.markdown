---
layout: post
status: publish
published: true
title: Actualizaciones / Updates
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
date: 2013-09-30 00:02:36.000000000 -04:30
serie: MongoDB desde Cero
description: Las actualizaciones o updates las dejamos por separado para ser un poco más detallados y puedas dominar con mayor destreza la manipulación de los datos.
dificultad: Novato
duracion: 15
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
---
Como mencionamos en la entrada pasada, la parte de actualizaciones la dejamos por separado para tratar de ser un poco más detallados y extendernos en esta área para que puedas dominar con mayor destreza la manipulación de los datos.
***
##Estructura

Para modificar los documentos que ya se encuentran almacenados usaremos el comando `.update()` el cual tiene una estructura como esta:

```js
db.coleccion.update(
    filtro,
    cambio,
    {
        upsert: booleano,
        multi:  booleano
    }
);
```

Aclaremos un poco lo que nos indica la estructura.

`filtro` - debemos especificar como encontrar el registro que desemos modificar, sería el mismo tipo de filtro que usamos en las búsquedas o **finders**.

`cambio` - aquí especificamos los cambios que se deben hacer. Sin embargo ten en cuenta que hay 2 tipos de cambios que se pueden hacer:

* Cambiar el documento completo por otro que especifiquemos.
* Modificar nada más los campos especificados.

`upsert` (opcional, `false` por defecto) - este parametro nos permite especificar en su estado `true` que si el filtro no encuentra ningun resutlado entonces el cambio debe ser insertado como un nuevo registro.

`multi` (opcional, `false` por defecto) - en caso de que el filtro devuelva más de un resultado, si especificamos este parametro como `true`, el cambio se realizará a todos los resultados, de lo contrario solo se le hará al primero (al de menor Id).

***

##Actualización sobrescrita (overwrite)
Bien, probemos insertando nuevo autor, el cual modificaremos luego:

```js
> db.autores.insert({
    nombre      :   'Ricardo',
    apellido    :   'S'
});
```

Ahora probemos el primer caso, cambiar todo el documento, esto significa que en lugar de cambiar solo los campos que especifiquemos, el documento será sobreescrito con lo que indiquemos:

```js
> db.autores.update(
    {nombre: 'Ricardo'},
    {
        nombre: 'Ricardo',
        apellido: 'Sampayo',
        secciones: ['Ruby','Rails'],
        esAmigo: false
    }
);
```

Notemos que como primer parámetro indicamos el `filtro`, en este caso que el nombre sea `Ricardo`, luego indicamos el cambio que hariamos, como estamos probando el primer caso indicamos el documento completo que queremos que sustituya al actual. Si hacemos `db.autores.find({nombre:'Ricardo'});` podremos ver que en efecto el documento quedó como especificamos:

```js
{ "_id" : ObjectId("523c91f2299e6a9984280762"), "nombre" : "Ricardo", "apellido" : "Sampayo", "secciones" : [  "Ruby",  "Rails" ], "esAmigo" : false }
```

> Sobreescbirir el documento no cambiará su identificador único `_id`.

***
##Operadores de Modificación

Ahora probemos cambiar los campos que deseamos, para este caso haremos uso de lo que se denominan como operadores de modificación.

Hablemos un poco sobre algunos de estos operadores antes de verlos en acción:

* `$inc` - incrementa en una cantidad numerica especificada el valor del campo a en cuestión.
* `$rename` - renombrar campos del documento.
* `$set` - permite especificar los campos que van a ser modificados.
* `$unset` - eliminar campos del documento.

Referentes a arreglos:

* `$pop` - elimina el primer o último valor de un arreglo.
* `$pull` - elimina los valores de un arreglo que cumplan con el filtro indicado.
* `$pullAll` - elimina los valores especificados de un arreglo.
* `$push` - agrega un elemento a un arreglo.
* `$addToSet` - agrega elementos a un arreglo solo sí estos no existen ya.
* `$each` - para ser usado en conjunto con `$addToSet` o `$push` para indicar varios elementos a ser agregados al arreglo.


Hagamos una prueba sobre nuestro nuevo documento:

```js
> db.autores.update(
    { nombre: 'Ricardo' },
    {
        $set: { esAmigo: true , age : 25 }
    }
);
```

En este caso estamos usando el operador `$set` para 2 propositos a la vez:

* Actualizar el valor de un campo (cambiamos esAmigo de `false` a `true`).
* Creamos un campo nuevo (age) asignandole el valor `25`.

Supongamos que Ricardo cumplió años en estos días, así que para incrementar el valor de su edad lo podemos hacer así:

```js
> db.autores.update(
    { nombre: 'Ricardo' },
    {
        $inc: { age : 1 }
    }
);
```

> También podemos indicar números negativos para decrementar.

Aquí hablamos español, así que cambiemos ese campo `age` por lo que le corresponde:

```js
> db.autores.update(
    { nombre: 'Ricardo' },
    {
        $rename: { 'age' : 'edad' }
    }
);
```

Los que trabajamos en Codehero somos todos amigos así que no es necesario guardar el campo `esAmigo`:

```js
> db.autores.update(
    { nombre: 'Ricardo' },
    {
        $unset: { esAmigo : '' }
    }
);
```

> El valor que le "asignes" al campo a eliminar no tendrá ningun efecto, pero es necesario escribirlo por motivos de sintaxis.

{% include middle-post-ad.html %}

Pasemos ahora a la parte de modificación de arreglos, agreguemosle algunas secciones extra a nuestro autor:

```js
> db.autores.update(
    { nombre: 'Ricardo' },
    {
        $push: { secciones : 'jQuery' }
    }
);
```

> Si se quiere asegurar que el elemento no esté duplicado se usaría `$addToSet`

Esto agregará al final del arreglo de secciones el elemento `jQuery`.



Agreguemos algunas secciones más en un solo paso:

```js
> db.autores.update(
    { nombre: 'Ricardo' },
    {
        $push: { secciones : { $each : ['Haskell','Go','ActionScript'] } }
    }
);
```

Bueno en realidad Ricardo no maneja desde hace un tiempo ActionScript así que eliminemos ese ultimo elemento del arreglo:

```js
> db.autores.update(
    { nombre: 'Ricardo' },
    {
        $pop: { secciones : 1 }
    }
);
```

> Para eliminar el último elemento se coloca 1, para el primero -1.

Ricardo hace tiempo que no nos habla sobre jQuery asi que hasta que no se reivindique quitemoslo de sus secciones:

```js
> db.autores.update(
    { nombre: 'Ricardo' },
    {
        $pull: { secciones : 'jQuery' }
    }
);
```

Pensandolo bien, Ricardo nunca nos ha hablado de Haskell ni Go tampoco, eliminemoslos también:

```js
> db.autores.update(
    { nombre: 'Ricardo' },
    {
        $pullAll: { secciones : ['Haskell','Go'] }
    }
);
```

***

##Comando .save()
Otra manera para actualizar o insertar registros es mediante el uso del comando `.save()`. Este comando recibe como parámetro únicamente un documento.

Insertar un registro es tal cual como si hicieramos un `.insert()`:

```js
> db.autores.save({
    nombre:     'Ramses'
});
```

En cuanto al caso de actualización de registros te estarás preguntando:

> ¿Si solo recibe un documento, como sabe Mongo que documento debe actualizar?

En estos casos puedes hacer el equivalente a una actualización sobrescrita con tan solo indicar el `_id` del registro a actualizar como parte del nuevo documento.

```js
> db.autores.find({nombre: 'Ramses'});

{ "_id" : ObjectId("5246049e7bc1a417cc91ec8c"), "nombre" : "Ramses" }

> db.autores.save({
    _id:        ObjectId('5246049e7bc1a417cc91ec8c')
    nombre:     'Ramses',
    apellido:   'Velasquez',
    secciones:  ['Laravel', 'PHP']
});
```

> En esta caso particular, debido a que Mongo le asigno automáticamente ese ID autogenerado poco amigable, ese mismo es el que pusimos en nuestro documento para que Mongo sepa que debe actualizar ese registro, algunos recomiendan usar `_id` que no sean establecidos por Mongo sino por la librería del cliente para evitar trabajar con este tipo de identificadores poco amigables.

>
***
##Conclusión
Como has podido notar, MongoDB es muy poderoso y ofrece muchas ventajas en cuento a la modificación de sus registros. Claro, las búsquedas también se pueden tornar bastante interesantes según nuestras necesidades y eso lo veremos más adelante, a medida que vamos avanzando iremos tocando la mayoría de los temas que puedan servir de ayuda para que logres dominar al máximo esta solución NoSQL.
