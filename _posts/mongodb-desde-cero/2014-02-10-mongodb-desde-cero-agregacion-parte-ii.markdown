---
layout: post
status: publish
published: true
title: Agregación - Parte II
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
date: 2014-02-10 23:30:38.000000000 -04:30
serie: MongoDB desde Cero
description: La semana pasada comenzamos a hablar del Aggregation Framework, seguiremos viendo el resto de las etapas y veremos como utilizarlas juntas en un ejercicio
dificultad: Heroe
duracion: 25
github: https://github.com/codeheroco/mongodb-agregacion
categories:
- Cursos
- MongoDB
tags:
- framework
- mongo
- mongodb
- agregacion
- aggregation
- avanzado
- proyectar
- desenvolver
- ordenar
- limitar
- saltar
- project
- unwind
- sort
- limit
- skip
---
La semana pasada comenzamos a hablar del ***Aggregation Framework,*** iniciamos viendo en qué consiste, las ventajas que ofrece y algunas de las etapas que componen la **tubería de agregación**, esta semana seguiremos viendo el resto de las etapas y veremos como utilizarlas juntas en un ejercicio.
***
## Etapas (continuación)
Recuerda que puedes acceder al repositorio de esta entrada para obtener algunos datos de prueba en el archivo `ordenes.json` que te ayudarán a practicar y probar en vivo lo que haremos aquí.

### Proyectar (`$project`)
La etapa de proyección nos permite especificar qué campos estarán en el documento resultante de esta etapa, a su vez también podemos renombrar el campo de ser necesario:

```javascript
> db.ordenes.aggregate([
	{
        $project : {
            monto: 1,
            cliente: "$id_cliente"
        }
	}
])

{
    "result" : [
        {
            "_id" : 1,
            "monto" : 200,
            "cliente" : 10
        },
        {
            "_id" : 2,
            "monto" : 180,
            "cliente" : 10
        },...
    ],
    "ok" : 1
}
```

Al asignarle al nombre de un campo el valor booleano 1 estaremos indicandole al proceso de agregación que queremos incluir este campo en el documento resultante. En cuanto al campo `id_cliente` podremos ver que lo que hicimos fue renombrarlo a `cliente`, esto puede ser muy util para trabajar de manera más facil los documentos en etapas siguientes de la tubería.

Probablemente te estarás preguntando: ¿Por qué el campo `_id` está presente si no especifiqué que lo deseaba como resultado?.

El campo `_id` por defecto es incluido a menos que se especifique lo contrario mediante una exclusión explícita `_id : 0`

### Desenvolver (`$unwind`)
La etapa de desenvolvimiento permite tomar un campo de los documentos que sea de tipo arreglo y generar un documento para cada valor del mismo. Esta etapa suele combinarse con la de agrupación cuando la finalidad es realizar algún calculo que involucre a los valores de un campo tipo arreglo.

```javascript
> db.ordenes.aggregate([
    {
        $unwind : "$articulos"
    }
])

{
    "result" : [
        {
            "_id" : 1,
            "id_cliente" : 10,
            "monto" : 200,
            "modo_de_pago" : "efectivo",
            "articulos" : "harina"
        },
        {
            "_id" : 1,
            "id_cliente" : 10,
            "monto" : 200,
            "modo_de_pago" : "efectivo",
            "articulos" : "arroz"
        },
        {
            "_id" : 1,
            "id_cliente" : 10,
            "monto" : 200,
            "modo_de_pago" : "efectivo",
            "articulos" : "ketchup"
        },...
    ],
    "ok" : 1
}
```

Como mencionamos, el arreglo resultante de documentos contiene un documeto para cada valor del arreglo. Veamos cómo es inicialmente ese primer documento como referencia:

```javascript
> db.ordenes.find({ _id : 1 }).pretty()
{
    "_id" : 1,
    "id_cliente" : 10,
    "monto" : 200,
    "modo_de_pago" : "efectivo",
    "articulos" : [
        "harina",
        "arroz",
        "ketchup"
    ]
}
```

### Ordenar, limitar y saltar (`$sort`, `$limit`, `$skip`)
Estas etapas son quizás las más intuitivas debido a la facilidad de uso y la similitud de su funcionalidad a lo que hemos aprendido desde el inicio.

```javascript
> db.ordenes.aggregate([
    {
        $sort: { monto: -1, _id: 1 }
    }
])
```

La etapa de ordenamiento recibirá como parámetro un documento indicando con qué campos se debe ordenar y en que sentido, siendo 1 ascendente y -1 descendente. En este caso se ordenará primero descendentemente por `monto` y de haber 2 montos iguales se ordenarán los involucrados de manera ascendente por su campo `_id`. Veamos su comportamiento en la sección inferior de resultados:

```javascript
    ...{
            "_id" : 10,
            "id_cliente" : 1,
            "monto" : 202,
            "modo_de_pago" : "efectivo",
            "articulos" : [
                "harina",
                "aceite",
                "papel de baño"
            ]
        },
        {
            "_id" : 1,
            "id_cliente" : 10,
            "monto" : 200,
            "modo_de_pago" : "efectivo",
            "articulos" : [
                "harina",
                "arroz",
                "ketchup"
            ]
        },
        {
            "_id" : 4,
            "id_cliente" : 10,
            "monto" : 200,
            "modo_de_pago" : "efectivo",
            "articulos" : [
                "carne",
                "aceite",
                "galletas"
            ]
        },
        {
            "_id" : 15,
            "id_cliente" : 7,
            "monto" : 183,
            "modo_de_pago" : "efectivo",
            "articulos" : [
                "pasta",
                "aceite",
                "papel de baño"
            ]
        },...
```

De igual manera podemos lograr algo como lo que conocemos desde antes con la limitación y salto de registros; **sin embargo debemos tomar en cuenta que saltar y/o limitar una serie de documentos que no hemos ordenamos primero tendrá resultados impredecibles.**

```javascript
> db.ordenes.aggregate([
    {
        $sort: { monto: -1, _id: 1 }
    },
    {
        $skip: 7
    },
    {
        $limit: 2
    }
])

{
    "result" : [
        {
            "_id" : 9,
            "id_cliente" : 10,
            "monto" : 311,
            "modo_de_pago" : "tarjeta",
            "articulos" : [
                "harina",
                "ketchup",
                "pollo"
            ]
        },
        {
            "_id" : 6,
            "id_cliente" : 3,
            "monto" : 302,
            "modo_de_pago" : "tarjeta",
            "articulos" : [
                "harina",
                "pasta",
                "papel de baño"
            ]
        }
    ],
    "ok" : 1
}
```

***
## Ejercicio completo

Bien, ahora que conocemos como funciona cada una de las etapas podemos proceder a construir nuestra tubería de agregación con todas las etapas a ver si entendimos correctamente de qué se trata. Veamos primero el comando y luego explicaremos paso a paso lo que sucede.

```javascript
> db.ordenes.aggregate([
    {
        $match: {
            monto : { $gt: 200 }
        }
    },
    {
        $unwind : "$articulos"
    },
    {
        $group: {
            _id: "$articulos",
            monto_promedio: { $avg: "$monto" },
            cantidad_ordenes: { $sum: 1 },
            compradores: { $addToSet: "$id_cliente" }
        }
    },
    {
        $sort: { monto_promedio: -1, cantidad_ordenes: -1}
    },
    {
        $skip: 3
    },
    {
        $limit: 2
    }
])
```

Antes de adelantarte a la respuesta tratemos de analizar lo que hemos hecho:

### Filtrar
En la primera etapa de la tubería obtuvimos las ordenes que tuviesen un monto mayor a 200.

### Desenvolver
Luego desenvolvimos el arreglo de articulos para poder hacer cálculos con ellos.

### Agrupar
Posteriormente agrupamos los documentos por articulo
Sacamos un promedio de su monto.
Contamos cuantas ordenes existían para dicho artículo.
Y qué clientes habián comprado dichos articulos.

### Ordenar
Luego de agrupar procedimos a ordenar nuestro conjunto de documentos por monto promedio y por cantidad de ordenes de manera descendiente.

### Saltar y Limitar
Finalmente saltamos los 3 primeros documentos y limitamos el resto del resultado a solo 2 documentos.

### Desgloce
Ciertamente no fue necesario el uso de la etapa de proyección, esto es común especialmente cuando utilizamos agrupaciones ya que esta última se suele encargar de realizar las tareas que se podrían realizar al proyectar.

Ahora que conocemos lo que hicimos paso a paso podemos llegar a la conclusión de cual podría haber sido el enunciado de un ejercicio como este:

> Encuentre el 4to y 5to artículo de mayor monto (tomando en cuenta que el monto varía segun el momento de la compra), indicando los compradores involucrados y cantidad de ordenes realizadas.

```javascript
{
    "result" : [
        {
            "_id" : "carne",
            "monto_promedio" : 555.6666666666666,
            "cantidad_ordenes" : 3,
            "compradores" : [
                3,
                10
            ]
        },
        {
            "_id" : "galletas",
            "monto_promedio" : 542,
            "cantidad_ordenes" : 1,
            "compradores" : [
                3
            ]
        }
    ],
    "ok" : 1
}
```
***
## Conclusión

Con lo que hemos visto en los últimos capítulos de la serie podemos realizar tareas avanzadas de cálculos de datos del lado de la base de datos, esto evitará que tu aplicación tenga que realizar varias búsquedas e implementar la lógica para calculo mediante múltiples ciclos y validaciones. Recuerda que las operaciones de agregación pueden realizarse de manera más rápida si haces uso de los [índices](http://codehero.co/mongodb-desde-cero-indices-parte-i/), no dudes en comentarnos tus dificultades en este tema ya que suele tornarse un tanto complejo.
