---
layout: post
status: publish
published: true
title: Índices. Parte II
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
date: 2013-10-22 00:05:56.000000000 -04:30
serie: MongoDB desde Cero
description: Seguiremos hablando sobre la importancia de los índices y su implementación en MongoDB, para continuar aprendiendo y cubrir las posibilidades de uso.
dificultad: Aprendiz
duracion: 15
categories:
- Cursos
- MongoDB
tags:
- mongodb
- indices
- index
- unique
- sparse
- explain
- hint
---
En la entrada pasada comenzamos a hablar sobre la importancia de los índices en una base de datos e iniciamos el proceso de implementación de algunos de ellos en MongoDB, esta semana seguiremos aprendiendo sobre ellos para cubrir las posibilidades del uso de los mismos. **Recuerda retomar el ejemplo del juego de poker de la entrada pasada.**
***
##Índices multillave
Habíamos mencionado que los índices multillave se basan en utilización de arreglos. Tenemos 2 enfoques y para ello utilizaremos los arreglos que creamos en nuestro jugadores estrella, los campos **mejores** (indicando sus mejores combinaciones de cartas en la noche) y **comentarios** que fueron algunos de los captados en la noche del encuentro.

###Arreglos básicos
Veamos el primer caso con los arreglos sencillos del campo **mejores**:

```js
> db.puntuaciones.ensureIndex({ mejores : 1 });
```

Este índice creará varias llaves de índice, una para cada valor del arreglo, algo **parecido** a esto:

```
Full house      => [Ramses, Oscar]
1 trio          => [Ricardo, Oscar]
Escalera real   => [Ramses]
```

Por lo que es posible utilizar estos valores en las búsquedas al buscar por el campo **mejores** utilizando el índice:

```js
> db.puntuaciones.find({ mejores:'Full house' })

{ "_id" : ObjectId("525a31aa4582c960d118b1de"), "nombre" : "Ramses", "ganadas" : 8, "perdidas" : 4, "retiradas" : 3, "dinero" : 120, "mejores" : [  "Escalera real",  "Full house" ], "comentarios" : [     {   "hora" : "22:12:56",    "texto" : "Los humillaré a todos" },    {   "hora" : "23:55:59",    "texto" : "Gracias por darme su dinero" } ] }
{ "_id" : ObjectId("525a31ae4582c960d118b1df"), "nombre" : "Oscar", "ganadas" : 4, "perdidas" : 6, "retiradas" : 5, "dinero" : 30, "mejores" : [  "Full house",  "1 trío" ], "comentarios" : [  {   "hora" : "22:09:12",    "texto" : "¿En realidad vamos a jugar nada mas para mostrar un ejemplo de Mongo?" },    {   "hora" : "23:59:59",    "texto" : "ZZZZZZzzzzzzz" } ] }
```

###Arreglos con documentos anidados
En este caso se toma el campo del documento interno para hacerlo índice, digamos que nos interesan los comentarios que expresaron nuestros jugadores durante la noche:

```js
> db.puntuaciones.ensureIndex({ 'comentarios.texto' : 1 });>
```

Con la notación de punto podemos especificar el campo interno del arreglo del documento padre para que nos sirva de índice. Lo podríamos utilizar en un *query* como este:

```js
> db.puntuaciones.find({'comentarios.texto' : 'Los humillaré a todos'})

{ "_id" : ObjectId("525a31aa4582c960d118b1de"), "nombre" : "Ramses", "ganadas" : 8, "perdidas" : 4, "retiradas" : 3, "dinero" : 120, "mejores" : [  "Escalera real",  "Full house" ], "comentarios" : [     {   "hora" : "22:12:56",    "texto" : "Los humillaré a todos" },    {   "hora" : "23:55:59",    "texto" : "Gracias por darme su dinero" } ] }
```

***
##Uso de propiedades

###Propiedad de unicidad
Cómo mencionamos anteriormente, esta propiedad nos permite asegurar que el valor de este campo sea unico. En nuestro caso crearemos un índice para los nombres de nuestro jugadores y además nos aseguraremos que ningún otro pueda llamarse igual:

```js
> db.puntuaciones.ensureIndex({ nombre : 1 }, { unique : true })
```

Ahora si tratamos de introducir un nuevo jugador con un nombre que ya exista obtendremos un error de índice duplicado:

```js
> var otroRicardo = {
    nombre :    'Ricardo'
}

> db.puntuaciones.insert(otroRicardo)

E11000 duplicate key error index: test.puntuaciones.$nombre_1  dup key: { : "Ricardo" }
```

###Propiedad de dispersión
Esta propiedad particular de los índices nos permite filtrar los resultados buscados por el campo indexado dejando por fuera aquellos registros que no poseen el campo.

Para esto insertemos un nuevo jugador que (entre otras cosas que no nos interesan para el ejemplo) no posea el campo *ganadas*:

```js
> var carlos = {
    nombre  :   'Carlos'
}

> db.puntuaciones.insert(carlos)
```

Ahora crearemos el índice de dispersón sobre el campo *ganadas*:

```js
> db.puntuaciones.ensureIndex({ ganadas : 1 }, { sparse : true })
```

Probemos ahora como los resultados son filtrados:

```js
> db.puntuaciones.find().sort({ ganadas : 1 })

{ "_id" : ObjectId("525a31a74582c960d118b1dd"), "nombre" : "Ricardo", "ganadas" : 3, "perdidas" : 3, "retiradas" : 9, "dinero" : 15, "mejores" : [  "1 trío",  "2 pares" ], "comentarios" : [   {   "hora" : "22:10:10",    "texto" : "Hoy será mi día de suerte" },    {   "hora" : "23:50:32",    "texto" : "Quizás otro día" } ] }
{ "_id" : ObjectId("525a31ae4582c960d118b1df"), "nombre" : "Oscar", "ganadas" : 4, "perdidas" : 6, "retiradas" : 5, "dinero" : 30, "mejores" : [  "Full house",  "1 trío" ], "comentarios" : [  {   "hora" : "22:09:12",    "texto" : "¿En realidad vamos a jugar nada mas para mostrar un ejemplo de Mongo?" },    {   "hora" : "23:59:59",    "texto" : "ZZZZZZzzzzzzz" } ] }
{ "_id" : ObjectId("525a31aa4582c960d118b1de"), "nombre" : "Ramses", "ganadas" : 8, "perdidas" : 4, "retiradas" : 3, "dinero" : 120, "mejores" : [  "Escalera real",  "Full house" ], "comentarios" : [     { "hora" : "22:12:56",  "texto" : "Los humillaré a todos" },    {   "hora" : "23:55:59",    "texto" : "Gracias por darme su dinero" } ] }
```

Podemos notar que Carlos no se encuentra entre los resultados, esto se debe a que al colocar el índice con la propiedad de dispersión sobre el campo  *ganadas* (el cual es parte del filtro de la búsqueda al utilizarlo para ordenar) esto evita que aquellos registros que no posean el campo sean excluidos de los resultados.

> Si el indice para este campo no tuviese la propiedad de dispersión, en los resultados de la búsqueda Carlos estuviese de primero, según el patrón de ordenamiento ascendente indicado.

***
##Construcción en el fondo
Uno de los factores a considerar en la creación de índices es que mientras estos son construidos la base de datos que los contiene se bloquea para lectura y escritura. Es posible que al tener un volumen elevado de datos, el proceso de construcción de índices tome un tiempo, lo cual llevaría a una interrupción en el servicio que usa este medio de almacenamiento. Para estos casos existe la opción de **construcción de índices en el fondo** (o background construction). Esto evita que la base de datos se bloquee al crear un índice en particular:

```js
> db.puntuaciones.ensureIndex({ campo_que_desees_indexar : 1 }, { background : true })
```

Ten en cuenta que el proceso de creación de índices en el fondo es más lento que la creación normal. Inclusive si los índices utilizan más espacio que la memoria disponible, el proceso se torna considerablemente más lento.

##Reconstrucción de índices
Estar jugando con los índices a medida que vamos introduciendo data nueva causará que algunos registros no estén indexados, por lo que necesitaremos reconstruirlos, con MongoBD este proceso es muy sencillo, tan solo debemos ejecutar el método de *reindexación* sobre la colección deseada:

```js
> db.puntuaciones.reIndex()
```

***
##Medición de uso
Durante este par de entradas quizás te habrás estado preguntando: ¿Cómo saber si en realidad las búsquedas están utilizando los índices en lugar del procedimiento normal?.

Para eso tenemos un par métodos de gran utilidad.

###`explain()`
Este método pretende explicarnos brevemente su plan de ejecución para una operación en particular, hagamos la prueba con una búsqueda sencilla para ver de qué se trata:

```js
> db.puntuaciones.find().explain()
{
    "cursor" : "BasicCursor",
    "isMultiKey" : false,
    "n" : 4,
    "nscannedObjects" : 4,
    "nscanned" : 4,
    "nscannedObjectsAllPlans" : 4,
    "nscannedAllPlans" : 4,
    "scanAndOrder" : false,
    "indexOnly" : false,
    "nYields" : 0,
    "nChunkSkips" : 0,
    "millis" : 0,
    "indexBounds" : {

    },
    "server" : "Mordor.local:27017"
}
```

Aquí podemos notar un plan de ejecución común donde podemos apreciar varias estadísticas sobre lo que la operación hará, entre ellas la cantidad de objetos que serán escaneados, la duración del proceso, y varios detalles sobre la utilización de índices, en este caso ningún índice es utilizado, probemos con la búsqueda del primer índice que creamos en la entrada pasada:

```js
> db.puntuaciones.find({dinero : { $gt : 50 }}).explain()

    "cursor" : "BtreeCursor dinero_1",
    "isMultiKey" : false,
    "n" : 1,
    "nscannedObjects" : 1,
    "nscanned" : 1,
    "nscannedObjectsAllPlans" : 1,
    "nscannedAllPlans" : 1,
    "scanAndOrder" : false,
    "indexOnly" : false,
    "nYields" : 0,
    "nChunkSkips" : 0,
    "millis" : 0,
    "indexBounds" : {
        "dinero" : [
            [
                50,
                1.7976931348623157e+308
            ]
        ]
    },
    "server" : "Mordor.local:27017"
}
```

Notaremos que en este caso las estadísticas son algo diferentes, el cursor es diferente debido a que ahora posee una estructura de tipo BTREE para recorrer los nodos de índices. El número de objetos escaneadas en menor y además nos especifica el campo del índice y sus límites.

###`hint()`
Este método nos permite indicarle a una búsqueda qué índice debe utilizar. Probemos con una búsqueda sencilla que obliguemos a utilizar el índice de dinero:

```js
> db.puntuaciones.find().hint({ ganadas : 1 })

{ "_id" : ObjectId("525a31a74582c960d118b1dd"), "nombre" : "Ricardo", "ganadas" : 3, "perdidas" : 3, "retiradas" : 9, "dinero" : 15, "mejores" : [  "1 trío",  "2 pares" ], "comentarios" : [   {   "hora" : "22:10:10",    "texto" : "Hoy será mi día de suerte" },    {   "hora" : "23:50:32",    "texto" : "Quizás otro día" } ] }
{ "_id" : ObjectId("525a31ae4582c960d118b1df"), "nombre" : "Oscar", "ganadas" : 4, "perdidas" : 6, "retiradas" : 5, "dinero" : 30, "mejores" : [  "Full house",  "1 trío" ], "comentarios" : [  {   "hora" : "22:09:12",    "texto" : "¿En realidad vamos a jugar nada mas para mostrar un ejemplo de Mongo?" },    {   "hora" : "23:59:59",    "texto" : "ZZZZZZzzzzzzz" } ] }
{ "_id" : ObjectId("525a31aa4582c960d118b1de"), "nombre" : "Ramses", "ganadas" : 8, "perdidas" : 4, "retiradas" : 3, "dinero" : 120, "mejores" : [  "Escalera real",  "Full house" ], "comentarios" : [     { "hora" : "22:12:56",  "texto" : "Los humillaré a todos" },    {   "hora" : "23:55:59",    "texto" : "Gracias por darme su dinero" } ] }
```

Inclusive podemos utilizar este método en conjunto con anterior para ver su plan de ejecución:

```js
> db.puntuaciones.find().hint({ ganadas : 1 }).explain()

{
    "cursor" : "BtreeCursor ganadas_1",
    "isMultiKey" : false,
    "n" : 3,
    "nscannedObjects" : 3,
    "nscanned" : 3,
    "nscannedObjectsAllPlans" : 3,
    "nscannedAllPlans" : 3,
    "scanAndOrder" : false,
    "indexOnly" : false,
    "nYields" : 0,
    "nChunkSkips" : 0,
    "millis" : 0,
    "indexBounds" : {
        "ganadas" : [
            [
                {
                    "$minElement" : 1
                },
                {
                    "$maxElement" : 1
                }
            ]
        ]
    },
    "server" : "Mordor.local:27017"
}
```

También es posible forzar el desuso de índices indicando el operador `$natural`:

```js
> db.puntuaciones.find({dinero : { $gt : 50 }}).hint({ $natural : 1 }).explain()

{
    "cursor" : "BasicCursor",
    "isMultiKey" : false,
    "n" : 1,
    "nscannedObjects" : 4,
    "nscanned" : 4,
    "nscannedObjectsAllPlans" : 4,
    "nscannedAllPlans" : 4,
    "scanAndOrder" : false,
    "indexOnly" : false,
    "nYields" : 0,
    "nChunkSkips" : 0,
    "millis" : 0,
    "indexBounds" : {

    },
    "server" : "Mordor.local:27017"
}
```

***
##Eliminación de índices
Si consideramos que un índice ya no es necesario podemos eliminarlo manualmente de la siguiente manera:

```js
> db.puntuaciones.dropIndex({ campo_que_deseo_eliminar_el_indice : 1 })
```

Incluso podemos eliminar todos los índices de la colección a excepción del `_id` por defecto de la siguiente manera:

```js
> db.puntuaciones.dropIndexes()
```
***

##Conclusión
El uso de índices ayudan mucho en el rendimiento de una base de datos si son utilizados de la manera correcta, ahora con estos conocimientos puedes llevar un poco más allá tus estrategias de manipulación de datos para hacer tus aplicaciones dependientes de bases de datos MongoDB más rápidas y mejor organizadas.
