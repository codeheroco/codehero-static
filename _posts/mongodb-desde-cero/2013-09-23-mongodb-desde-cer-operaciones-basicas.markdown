---
layout: post
status: publish
published: true
title: Operaciones Básicas
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
date: 2013-09-23 00:00:27.000000000 -04:30
serie: MongoDB desde Cero
description: Seguramente querrás poner tus habilidades en práctica, comencemos con algunas operaciones básicas para aprender como manipular los datos en MongoDB.
dificultad: Novato
duracion: 10
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
---
Luego que hemos instalado MongoDB en la entrada pasada, seguramente querrás comenzar a realizar inserciones y *queries* para probar las ventajas de esta solución y poner tus habilidades en práctica, comencemos con algunas operaciones básicas para saber como manipular los datos en MongoDB.
***

<!--Primero creemos una base de datos para nuestro ejemplo, para ello solo debemos ejecutar el comando `use codehero`, esto cambiará de base de datos a la que hemos especificado, como una base de datos con este nombre no existe simplemente la creará apenas insertemos algún registro.

Como hablamos al inicio del curso, MongoDB está basado en Javascript, por lo que la manera en que se usa en consola es como si estuviéramos ejecutando comandos Javascript. Por lo tanto las operaciones que se llevan a cabo son tan solo funciones sobre el objeto `db`, el objeto principal de la base de datos. -->

##Creación de registros -  `.insert()`
Las operaciones son como funciones de Javascript, así que llamaremos al objeto base de datos `db` y crearemos una nueva propiedad o lo que se asemejaría al concepto de tabla con el nombre de `autores` y le asociaremos su valor correspondiente (un objeto autor), es decir, una **colección** con un **documento** asociado:

```js
> db.autores.insert({
  nombre    : 'Jonathan',
  apellido  : 'Wiesel',
  secciones : ['Como lo hago' , 'MongoDB']
});
```

> Los **documentos** se definen como los objetos Javascript, u objetos JSON.

Inclusive es posible declarar el documento como un objeto, almacenarlo en una variable y posteriormente insertarlo de la siguiente manera:

```js
> var autorDelPost = {
  nombre    : 'Jonathan',
  apellido  : 'Wiesel',
  secciones : ['Como lo hago' , 'MongoDB']
};

> db.autores.insert(autorDelPost);
```


Ahora si ejecutamos el comando `show collections` podremos ver que se encuentra nuestra nueva colección de autores:

```
autores
...
```

Agreguemos un par de autores más:

```js
> db.autores.insert({
  nombre    : 'Oscar',
  apellido  : 'Gonzalez',
  secciones : ['iOS' , 'Objective C' , 'NodeJS' ],
  socialAdmin : true
});
> db.autores.insert({
  nombre    : 'Alberto',
  apellido  : 'Grespan',
  secciones : 'Git',
  genero    : "M"
});
```

Veamos que insertamos nuevos documentos en la colección de autores que tienen otra estructura, en MongoDB esto es completamente posible y es una de sus ventajas.

***
##Búsqueda de registros - `.find()`

Hagamos un *query* o una busqueda de todos registros en la colección de autores.

```js
> db.autores.find();

{ "_id" : ObjectId("5232344a2ad290346881464a"), "nombre" : "Jonathan", "apellido" : "Wiesel", "secciones" : [  "Como lo hago",  "Noticias" ] }
{ "_id" : ObjectId("523236022ad290346881464b"), "nombre" : "Oscar", "apellido" : "Gonzalez", "secciones" : [  "iOS",  "Objective C",  "NodeJS" ], "socialAdmin" : true }
{ "_id" : ObjectId("5232383a2ad290346881464c"), "nombre" : "Alberto", "apellido" : "Grespan", "secciones" : "Git", "genero" : "M" }
```

Notemos que la búsqueda nos arroja los objetos resultantes, en este caso los documentos de los 3 autores que insertamos acompañados del identificador único que crea MongoDB, este campo `_id` se toma además como indice por defecto.

> Si lo deseas puedes manualmente especificar el valor del campo `_id` cuando estas insertando los registros con el comando `db.coleccion.insert()`; sin embargo ten en cuenta que debes asegurar que este valor sea único, de lo contrario los registros con dicho campo duplicado resultarán en error por clave primaria duplicada.

> Una búsqueda como la anterior sería similar en SQL a:

> `SELECT * FROM autores`

###Filtros
Digamos que ahora queremos hacer la búsqueda pero filtrada por los algún parámetro. Para esto sólo debemos pasar el filtro deseado a la función `find()`, busquemos a los administradores sociales para probar:

```js
> db.autores.find({ socialAdmin: true });

{ "_id" : ObjectId("523236022ad290346881464b"), "nombre" : "Oscar", "apellido" : "Gonzalez", "secciones" : [  "iOS",  "Objective C",  "NodeJS" ], "socialAdmin" : true }
```


> En SQL sería similar a:

> `SELECT * FROM autores WHERE socialAdmin = true`

Probemos ahora filtrar por varias condiciones, primero probemos con filtros donde TODOS se deben cumplir:

```js
> db.autores.find({ genero: 'M', secciones: 'Git' });

{ "_id" : ObjectId("5232383a2ad290346881464c"), "nombre" : "Alberto", "apellido" : "Grespan", "secciones" : "Git", "genero" : "M" }
```

> Es importante destacar que si el documento resultante hubiese tenido en la propiedad `secciones` un arreglo en lugar de una cadena de caracteres, si dicho arreglo tuviese el valor `Git` también cumple la condición.

> En SQL sería similar a:

> `SELECT * FROM autores WHERE genero = 'M' AND secciones = 'Git'`

Veamos ahora un ejemplo un poco más avanzado de filtros con condiciones donde queremos que solo ALGUNA de ellas se cumpla:

```js
> db.autores.find({
  $or: [
    {socialAdmin : true},
    {genero: 'M'}
  ]
 });

{ "_id" : ObjectId("523236022ad290346881464b"), "nombre" : "Oscar", "apellido" : "Gonzalez", "secciones" : [  "iOS",  "Objective C",  "NodeJS" ], "socialAdmin" : true }
{ "_id" : ObjectId("5232383a2ad290346881464c"), "nombre" : "Alberto", "apellido" : "Grespan", "secciones" : "Git", "genero" : "M" }
```

En este caso estamos filtrando por aquellos autores que son administradores sociales ó aquellos que tengan el campo género con el carácter M.

> En SQL sería similar a:

> `SELECT * FROM autores WHERE socialAdmin = true OR genero = 'M'`



###Limitar y Ordenar
Si quisiéramos limitar los resultados a un número máximo especificado de registros es tan fácil como agregar `.limit(#)` al final del comando `.find()`:

```js
> db.autores.find().limit(1)

{ "_id" : ObjectId("5232344a2ad290346881464a"), "nombre" : "Jonathan", "apellido" : "Wiesel",  "secciones" : [  "Como lo hago",  "MongoDB" ] }
```

> En SQL sería similar a:

> `SELECT * FROM autores LIMIT 1`

La misma modalidad sigue la funcionalidad de ordenar los registros por un campo en particular, el cual servirá de argumento a la función `.sort()`:

```js
> db.autores.find().sort({apellido : 1})

{ "_id" : ObjectId("523236022ad290346881464b"), "nombre" : "Oscar", "apellido" : "Gonzalez", "secciones" : [  "iOS",  "Objective C",  "NodeJS" ], "socialAdmin" : true }
{ "_id" : ObjectId("5232383a2ad290346881464c"), "nombre" : "Alberto", "apellido" : "Grespan", "secciones" : "Git", "genero" : "M" }
{ "_id" : ObjectId("5232344a2ad290346881464a"), "nombre" : "Jonathan", "apellido" : "Wiesel", "secciones" : [  "Como lo hago",  "MongoDB" ] }
```

> El número 1 que acompaña al argumento de ordenamiento es el tipo de orden, `1` para descendiente y `-1`  para ascendente

> En SQL sería similar a:

> `SELECT * FROM autores ORDER BY apellido DESC`

También podemos combinar ambas funciones tan solo llamando una después de otra:

```js
> db.autores.find().sort({apellido : 1}).limit(1)

{ "_id" : ObjectId("523236022ad290346881464b"), "nombre" : "Oscar", "apellido" : "Gonzalez", "secciones" : [  "iOS",  "Objective C",  "NodeJS" ], "socialAdmin" : true }
```

###Otros filtros
Existen varios operadores más para filtrar las búsquedas; eso lo dejaremos para más adelante para no sobrecargarte de información tan rápido, pero no te preocupes que no lo pasaremos por alto.

***
## Eliminación de registros - `.remove()` y `.drop()`

Si entendiste como buscar registros pues eliminarlos es igual de fácil. Para esto existen 4 posibilidades:

* Eliminar los documentos de una colección que cumplan alguna condición.
* Eliminar todos los documentos de una colección.
* Eliminar la colección completa.

Probemos eliminandome a mí de la colección de autores:

```js
> db.autores.remove({ nombre: 'Jonathan' });
```

> En SQL sería similar a:

> `DELETE FROM autores WHERE nombre = 'Jonathan'`

¿Fácil no?. Eliminemos ahora a los demás autores:

```js
> db.autores.remove();
```

> En SQL sería similar a:

> `DELETE FROM autores`

Ahora que la colección ha quedado vacía deshagamonos de ella:

```js
> db.autores.drop();
```

> En SQL sería similar a:

> `DROP TABLE autores`

***
##Conclusión
Seguramente te estarás preguntando: ¿Y qué pasó con los `update`?. La modificación de registros involucra  múltiples maneras para que puedas manipular la información a tu gusto, por ello lo dejaremos para la próxima entrada, no desesperes. Estos son los primeros pasos a tomar para que comiences a usar MongoDB, todavía queda un largo camino por delante ya que hay mucho que aprender sobre esta magnifica solución de base de datos.
