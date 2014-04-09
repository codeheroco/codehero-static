---
layout: post
status: publish
published: true
title: Índices. Parte I
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
date: 2013-10-15 00:05:22.000000000 -04:30
serie: MongoDB desde Cero
description: Es común olvidarnos de implementar índices; sin embargo son estos los que ayudan en el rendimiento. Hablemos sobre ellos y cómo implementarlos en MongoDB.
dificultad: Aprendiz
duracion: 15
categories:
- Cursos
- MongoDB
tags:
- mongo
- mongodb
- indices
- index
- rendimiento
---
Cuando estamos construyendo nuestro esquema de bases de datos es común olvidarnos de implementar índices y solemos continuar con la siguiente tarea; sin embargo son estos los que ayudan significativamente en el rendimiento de la base de datos, especialmente cuando el volumen de datos va incrementando. En esta entrada hablaremos sobre ellos y cómo implementarlos en MongoDB.
***
##¿Qué es un índice?
Un índice en bases de datos es una estructura de datos que toma los valores de campos particulares de una tabla (los ID por defecto) y se almacena en un espacio de rápido acceso, esto con la intención de que al hacer un *query* cuyo campo de filtrado este indexado, el registro es localizado a partir del indice y la velocidad de respuesta del proceso sea mucho más rápido, tal cómo el índice de un libro.

En el caso particular de MongoDB, al no buscar por un campo indexado el proceso de *mongod* debe recorrer todo el documento de los registros de una colección para hacer realizar la búsqueda, este proceso es ineficiente y requiere un alto numero de recursos para manipular todo el volumen de información.

Una mala práctica que utilizan algunos es indexar la mayor cantidad de campos que puedan lo cual termina casi duplicando en volumen la base de datos y el proceso que busca en los índices se torna igual de lento que buscar normalmente ya que los índices son almacenados en memoria y al agotarse el espacio reservado, el almacenamiento de índices empieza a escribirse en disco, el cual es de acceso mucho mas lento. Es por esto que debemos resaltar y aconsejar que **sólo debes crear índices sobre campos que vayan a ser consultados con alta frecuencia.**
***
##Tipos de índice
Hablemos un poco sobre los diferentes tipos de índice que podemos implementar en MongoDB:

* **Índice _id** - el identificador principal de un registro es el índice por defecto, si no especificas uno al crear un documento el proceso de *mongod* le asignará uno automaticamente de tipo ObjectID.
* **Índice sencillo** - definidos sobre un único campo de un documento.
* **Índice compuesto** - definidos sobre varios campos de un documento, será tomado como un índice único por parte de MongoDB.
* **Índice mutillave** - utilizado en casos de que el campo a indexar pertenezca a subdocumentos dentro de un arreglo del documento padre.
* **Índice geoespacial** - utilizado para indexar campos que sean coordenadas de tipo GeoJSON.
* **Índice texto** - al momento de escritura se encuentra fase *beta* y se utiliza para buscar contenidos de cadenas de caracteres en los documentos.
* **Índice tipo hash** - utilizado en la estrategia de llaves de fragmento *hasheadas* que se lleva a cabo en los procesos de fragmentación de datos.

> En este curso no tocaremos los últimas 3.

***
##Propiedades
Existen un par de propiedades interesantes de los índices que puedes aprovechar:

* **Unicidad** - esta propiedad permite establecer el índice como campo único, es decir, al declarar un índice como `unique` sobre un campo particular evitará que existan documentos diferentes con el mismo valor para dicho campo ya que al tratar de insertar un documento bajo estas circunstancias resultará en un error de llave duplicada. Esto resulta muy útil para campos que sirven de identificadores externos que suelen necesitar indexación.

> Si tratas de insertar un documento que no tenga valor en este campo, automáticamente se le asignará el valor `null` al valor del indice para este registro. Si tratas nuevamente de hacer lo mismo ocurrirá un error de llave duplicada ya que el índice de valor `null` para dicho campo ya existe.

* **Dispersión** - esta propiedad permite establecer el filtrado de los resultados basado en el campo indexado. Lo entenderás mejor cuando lo apliquemos más adelante.
***

##Preparación
Bien, ahora que sabemos la teoría es hora de poner manos a la obra. Tomemos una situación de ejemplo para manejar el caso.

La semana pasada jugamos unas 15 rondas de poker, creamos una colección **puntuaciones** y anotamos las siguientes puntuaciones finales:

```js
{
    nombre:     'Ricardo',
    ganadas:    3,
    perdidas:   3,
    retiradas:  9,
    dinero:     15,
    mejores:    ['1 trío', '2 pares'],
    comentarios:[
        {
            hora:   '22:10:10',
            texto:  'Hoy será mi día de suerte'
        },{
            hora:   '23:50:32',
            texto:  'Quizás otro día'
        }
    ]
}

{
    nombre:     'Ramses',
    ganadas:    8,
    perdidas:   4,
    retiradas:  3,
    dinero:     120,
    mejores:    ['Escalera real', 'Full house'],
    comentarios:[
        {
            hora:   '22:12:56',
            texto:  'Los humillaré a todos'
        },{
            hora:   '23:55:59',
            texto:  'Gracias por darme su dinero'
        }
    ]
}

{
    nombre:     'Oscar',
    ganadas:    4,
    perdidas:   6,
    retiradas:  5,
    dinero:     30,
    mejores:    ['Full house', '1 trío'],
    comentarios:[
        {
            hora:   '22:09:12',
            texto:  '¿En realidad vamos a jugar nada mas para mostrar un ejemplo de Mongo?'
        },{
            hora:   '23:59:59',
            texto:  'ZZZZZZzzzzzzz'
        }
    ]
}
```

> Ya sabes como se [insertan](http://codehero.co/mongodb-desde-cer-operaciones-basicas/) estos documentos así que no hay excusa ;).

{% include middle-post-ad.html %}

##Obtener índices
Como mencionamos anteriormente el campo `_id` es el índice por defecto que crea MongoDB. Podemos comprobarlo de la siguiente manera:

```js
> db.puntuaciones.getIndexes()

[
    {
        "v" : 1,
        "key" : {
            "_id" : 1
        },
        "ns" : "codehero.puntuaciones",
        "name" : "_id_"
    }
]
```

Por el momento podremos notar un solo documento en el arreglo que especifica lo siguiente:

* `v` - indica la versión del índice (versiones de MongoDB previas a la 2.0 mostrarán el valor `0`).
* `key` - muestra las llaves atadas al indice, en este caso es el campo `_id` y el número `1` nos indica el ordenamiento ascendente del campo.
* `ns` - especifica el contexto del *namespace* para el índice.
* `name` - es el nombre otorgado al índice el cual suele estar compuesto de las llaves o campos que lo componen junto con el orden de los mismos. (para este caso el número de ordenamiento no está presente debido a que se usa el por defecto).
***
##Creación de índices
Ahora creemos nuestros propios índices.

###Simples
Para este caso digamos que solo nos interesa el dinero con el que terminamos al final, para ello solo debemos hacer lo siguiente:

```js
> db.puntuaciones.ensureIndex({ dinero : 1 })
```

Esto creará un índice simple ordenado ascendentemente y le permitirá al proceso de *mongod*  realizar operaciones a través de él cuando se le involucre como filtro. Por ejemplo veamos quién termino con más de 50 en dinero:

```js
> db.puntuaciones.find({dinero : { $gt : 50 }})

{ "_id" : ObjectId("525a31aa4582c960d118b1de"), "nombre" : "Ramses", "ganadas" : 8, "perdidas" : 4, "retiradas" : 3, "dinero" : 120, "mejores" : [  "Escalera real",  "Full house" ], "comentarios" : [     {   "hora" : "22:12:56",    "texto" : "Los humillaré a todos" },    {   "hora" : "23:55:59",    "texto" : "Gracias por darme su dinero" } ] }
```

> Esta búsqueda es realizada utilizando el índice que acabamos de crear. ¿Cómo saber si una operación está utilizando un índice? Tranquilo, en la segunda parte lo podrás averiguar.

###Compuestos

Digamos ahora que queremos enfocarnos en la búsqueda en conjunto de los parámetros de partidas perdidas y retiradas para analizar un poco la situación. Para esto creemos un índice compuesto con ambos campos:

```js
> db.puntuaciones.ensureIndex({ perdidas : 1, retiradas: 1 })
```

En el caso de los índices compuestos el orden en que los coloques es muy importante.

Para el ejemplo que planteamos el orden de cada campo nos indica que MongoDB podrá utilizar el indice para soportar *queries* que incluyan el campo **perdidas** y aquellos que incluyan ambos campos (**perdidas** y **retiradas**); sin embargo aquellas búsquedas que solo incluyan el campo **retiradas** no podrán utilizar este índice.

```js
> db.puntuaciones.find({perdidas: {$gt:3}})
{ "_id" : ObjectId("525a31aa4582c960d118b1de"), "nombre" : "Ramses", "ganadas" : 8, "perdidas" : 4, "retiradas" : 3, "dinero" : 120, "mejores" : [  "Escalera real",  "Full house" ], "comentarios" : [     {   "hora" : "22:12:56",    "texto" : "Los humillaré a todos" },    {   "hora" : "23:55:59",    "texto" : "Gracias por darme su dinero" } ] }
{ "_id" : ObjectId("525a31ae4582c960d118b1df"), "nombre" : "Oscar", "ganadas" : 4, "perdidas" : 6, "retiradas" : 5, "dinero" : 30, "mejores" : [  "Full house",  "1 trío" ], "comentarios" : [  {   "hora" : "22:09:12",    "texto" : "¿En realidad vamos a jugar nada mas para mostrar un ejemplo de Mongo?" },    {   "hora" : "23:59:59",    "texto" : "ZZZZZZzzzzzzz" } ] }

> db.puntuaciones.find({perdidas: {$gt:3}, retiradas:{$gt: 3}})
{ "_id" : ObjectId("525a31ae4582c960d118b1df"), "nombre" : "Oscar", "ganadas" : 4, "perdidas" : 6, "retiradas" : 5, "dinero" : 30, "mejores" : [  "Full house",  "1 trío" ], "comentarios" : [  {   "hora" : "22:09:12",    "texto" : "¿En realidad vamos a jugar nada mas para mostrar un ejemplo de Mongo?" },    {   "hora" : "23:59:59",    "texto" : "ZZZZZZzzzzzzz" } ] }
```

> Suponiendo el caso que hubiesemos incluido el campo **ganadas** en el índice, específicamente en la posición entre **perdidas** y **retiradas**, una búsqueda que incluya los campos **perdidas** y **retiradas** sin duda continua siendo posible pero será más ineficiente que como lo definimos previamente.

***
##Conclusión
El tema de los índices es uno de gran importancia si quieres ajustar el rendimiento de tu esquema de datos, en esta entrada aprendimos sobre ellos y comenzamos a raspar la superficie sobre su implementación en MongoDB. No te preocupes, en la siguiente entrada retomaremos donde nos quedamos y te seguiremos introduciendo a sus bondades. Solo es una semana, no desesperes.
