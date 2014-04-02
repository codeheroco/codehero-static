---
layout: post
status: publish
published: true
title: Agregación - Parte I
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
date: 2014-02-03 23:30:01.000000000 -04:30
serie: MongoDB desde Cero
description: Estamos llegando al final de la serie, hemos pasado por una gama amplia de tópicos, desde lo más básico a los más avanzado, es hora de hablar de agregación.
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
- tubería
- etapas
---
Estamos llegando al final de la serie, hemos pasado por una gama amplia de tópicos, desde lo más básico a los más avanzado, tocando temas de desarrollo y de administración de la base de datos. Una funcionalidad muy interesante en MongoDB es aquella que nos permitirá transformar la data antes de sacarla de la base de datos, a esto se le llama el ***Aggregation Framework*** o simplemente **Agregación.**
***
## Propósito

El proceso de **agregación** se define como una serie de operaciones a las cuales se somete una colección para obtener un conjunto de resultados calculados, formateados y/o filtrados de manera diferente a como se encuentran en los documentos, en general con el objetivo de agrupar y/o calcular datos que residen en los documentos de acuerdo a una necesidad particular.

Para aquellos que les suene familiar el concepto probablemente hayan trabajado con el modelo de *MapReduce* en otras bases de datos, en efecto MongoDB también soporta esta modalidad; sin embargo haremos énfasis en la implementación particular de MongoDB.
***
## Tubería de agregación

Este concepto es la modalidad de implementación de agregación que es parte del núcleo de MongoDB a partir de la versión 2.2. Este se basa en someter a una colección a un conjunto de operaciones o etapas las cuales irán convirtiendo un conjunto de documentos pertenecientes a una colección hasta obtener un conjunto de documentos con el resultado computado deseado.

Se le llama tubería ya que cada etapa irá modificando, moldeando y calculando la estructura de los documentos para pasarlo a la etapa que le sigue. Ciertamente podemos repetir las etapas según sea necesario, no existe limitación al respecto; sin embargo si debemos tomar en cuenta las ventajas a nivel de rendimiento que puede ofrecer el orden de las etapas ya que los procesos de agregación son tareas que pueden llegar a consumir altos niveles de recursos si no sabemos bien lo que hacemos.
***
## Etapas
Ciertamente suena un poco ambiguo en teoría pero veamos en práctica como podemos manipular los documentos de una colección usando la modalidad de tubería de agregación.

```javascript
db.ordenes.aggregate([
    {
        $etapa1: {
            ...
        }
    },{
        $etapa2: {
            ...
        }
    },...
])
```

Si prestamos atención a la sintaxis notaremos que le estamos indicando a la colección `ordenes` que debe someterse a un un proceso de agregación (`aggregate`) el cual consiste de varias (notemos los corchetes) etapas, cada una de ellas está definida por un conjunto de opciones, campos y/o argumentos que veremos a continuación para cada tipo de etapa.

Para que nos sea más fácil entender como se comporta cada una de estas etapas, tomaremos como premisa que la colección `ordenes` luce algo así:

```javascript
{
    _id: 1,
    id_cliente: 10,
    monto: 200,
    modo_de_pago: 'efectivo',
    articulos: ['harina', 'aceite', 'papel de baño']
}
```

> Si deseas probar en vivo la funcionalidad puedes descargar el archivo de `ordenes.json` del repositorio de esta entrada e importarlo a tu base de datos para que puedas seguir en práctica lo que aquí veremos.

> Ciertamente una colección que almacene datos como órdenes debería tener más campos y estar mejor estructurada pero para nuestro ejemplo será suficiente para lograr demostrar como funciona la agregación.

### Filtrar (`$match`)
La opción de filtrar es bastante análoga a lo que ya hemos visto con los filtros convencionales en las búsquedas, simplemente filtrará los documentos según los valores que indiquemos.

Si quisiéramos obtener las órdenes que realizó el cliente de ID = 2 lo haríamos parecido a como estamos acostumbrados pero con la sintaxis de la tubería de agregación:

```javascript
> db.ordenes.aggregate([
    {
        $match: {
            id_cliente: 2
        }
    }
])

{
    "result" : [
        {
            "_id" : 3,
            "id_cliente" : 2,
            "monto" : 220,
            "modo_de_pago" : "efectivo",
            "articulos" : [
                "pasta",
                "ketchup",
                "papel de baño"
            ]
        },
        {
            "_id" : 8,
            "id_cliente" : 2,
            "monto" : 89,
            "modo_de_pago" : "efectivo",
            "articulos" : [
                "harina",
                "aceite",
                "papel de baño"
            ]
        }
    ],
    "ok" : 1
}
```

### Agrupar (`$group`)
La agrupación es quizás la etapa más utilizada en el proceso de agregación ya que es la que permite agrupar y realizar cálculos sobre los documentos. Esta suele ser la etapa más complicada de entender, así que trataremos de explicarla paso a paso.

Ya que esta etapa tomará los documentos originales de la colección y los convertirá en una serie de nuevos documentos, debemos especificar como estará compuesto este nuevo, es decir, los campos que contendrá.

Digamos que queremos agrupar las ordenes por `modo_de_pago` y queremos que los documentos finales tengan la cantidad de ordenes para cada modo de pago y la suma de sus correspondientes montos. Por lo tanto dichos documentos resultantes tendrán una estructura como esta:

```javascript
{
    _id: 'tarjeta',
    cantidad_de_ordenes : ...,
    monto_total: ...
}
```

> Es obligatorio especificar un campo `_id` para estos nuevos documentos ya que estos serán los valores a agrupar. Es posible tener agrupaciones múltiples como por ejemplo agrupar por `modo_de_pago` y por `id_cliente` lo cual permitiría sacar cálculos para cada tipo de pago para cada cliente ya que por cada cliente se obtendrían una cantidad de documentos igual a la cantidad de tipos de pago que este utilizó.

Bien, ahora te estarán surgiendo algunas preguntas.

**¿Cómo puedo hacer para tomar los valores de los campos?**

Ciertamente si analizamos los valores del campo `modo_de_pago` de la colección notaremos que existen 2 valores posibles, `tarjeta` y `efectivo`, pero debemos indicarle al proceso de agregación que tome dichos valores de los campos. Los valores de los campos se toman colocándole al mismo el símbolo prefijo `$`. Por lo tanto para agrupar por `modo_de_pago` como dijimos anteriormente usaríamos algo así:

```javascript
{
    _id: "$modo_de_pago"
    ...
}
```

**¿Y cómo hago para hacer los cálculos?**

Existen varios operadores para hacer cálculos en esta etapa:

* $addToSet
* $push
* $first
* $last
* $min
* $max
* $avg
* $sum

Si has seguido la serie verás que los nombres te parecen conocidos y su funcionamiento en el proceso de agregación es bastante similar.

Los 2 primeros, `$addToSet` y `$push` permitirán crear un arreglo de los valores correspondientes a los campos cuando estemos agrupando.

Con `$first` y `$last`, podrás tomar de dicho campo el primer o último valor encontrado. (Estas son utilizadas después de la etapa de ordenamiento ya que de lo contrario su resultado es impredecible).

Posteriormente `$min` y `$max`, podrás tomar el mínimo y máximo valor de dicho campo.

Y por último, los operadores `$avg` y `$sum` te permitirán sacar un promedio de los valores de dicho campo y sumar su cantidad o su ocurrencia para cada agrupación.


Ahora volviendo a nuestro ejemplo y retomando los pasos que hemos visto, queremos agrupar por `modo_de_pago` y obtener para cada uno el monto total y la cantidad de ordenes. Para ello haremos los siguiente:


```javascript
> db.ordenes.aggregate([
    {
        $group: {
            _id: "$modo_de_pago",
            cantidad_de_ordenes: { $sum : 1 },
            monto_total: { $sum : "$monto" }
        }
    }
])

{
    "result" : [
        {
            "_id" : "tarjeta",
            "cantidad_de_ordenes" : 11,
            "monto_total" : 5154
        },
        {
            "_id" : "efectivo",
            "cantidad_de_ordenes" : 9,
            "monto_total" : 2100
        }
    ],
    "ok" : 1
}
```

***
## Conclusión

Hemos empezado a ver uno de los temas más avanzados en MongoDB, este te permite manipular los documentos para realizar cálculos que son de gran utilidad bajo circunstancias particulares. Aun faltan algunas etapas y mostraremos también un ejemplo completo de todas las etapas trabajando juntas, no te lo pierdas la semana que viene.
