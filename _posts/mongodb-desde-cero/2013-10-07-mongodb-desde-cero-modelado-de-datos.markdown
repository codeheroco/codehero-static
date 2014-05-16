---
layout: post
status: publish
published: true
title: Modelado de Datos
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
date: 2013-10-07 00:05:09.000000000 -04:30
serie: MongoDB desde Cero
description: Aprenderemos como realizar el modelado de datos para lograr transformar un esquema de bases de datos relacionales al enfoque NoSQL de MongoDB.
dificultad: Aprendiz
duracion: 15
categories:
- Cursos
- MongoDB
tags:
- mongodb
- nosql
- relaciones
- modelado
- tipos de datos
- patrones
---
Una de las dificultades que encuentran aquellos que se adentran al mundo del NoSQL es al tratar de transformar su esquema de base de datos relacional para que funcione de la mejor manera segun el enfoque NoSQL orientado a documentos, como lo es MongoDB. Aquí aprenderemos sobre como realizar correctamente el modelado de datos para que puedas comenzar a pensar en migrar tus proyectos a este tipo de base de datos con la menor dificultad posible.

* * *

## Tipos de Datos

Al comienzo de la serie explicamos que los documentos de MongoDB son como objetos JSON, para ser especificos son de tipo BSON (JSON Binario), esta estrategia permite la serialización de documentos tipo JSON codificados binariamente. Veamos algunos de los tipos de datos que soporta:

*   `String` - Cadenas de caracteres.
*   `Integer` - Números enteros.
*   `Double` - Números con decimales.
*   `Boolean` - Booleanos verdaderos o falsos.
*   `Date` - Fechas.
*   `Timestamp` - Estampillas de tiempo.
*   `Null` - Valor nulo.
*   `Array` - Arreglos de otros tipos de dato.
*   `Object` - Otros documentos embebidos.
*   `ObjectID` - Identificadores únicos creados por MongoDB al crear documentos sin especificar valores para el campo `_id`.
*   `Data Binaria` - Punteros a archivos binarios.
*   `Javascript` - código y funciones Javascript.

* * *

## Patrones de Modelado

Existen 2 patrones principales que nos ayudarán a establecer la estructura que tendrán los documentos para lograr relacionar datos que en una base de datos relacional estarían en diferentes tablas.

### Embeber

Este patrón se enfoca en incrustar documentos uno dentro de otro con la finalidad de hacerlo parte del mismo registro y que la relación sea directa.

> Si tienes experiencia en bases de datos orientadas o objetos, este patrón seguiría el mismo principio para la implementación de un TDA (Tipo de Dato Abstracto).

### Referenciar

Este patrón busca imitar el comportamiento de las claves foráneas para relacionar datos que deben estar en colecciones diferentes.

> Debes tomar en cuenta cuando estés en el proceso de modelado que si piensas hacer muchas actualizaciones sobre datos de colecciones relacionadas (en especial modificaciones atómicas), trata en lo posible de que aquellos datos que se vayan a modificar se encuentren en el mismo documento.

* * *

## Modelado de Relaciones

Bien, ha llegado el momento de aprender a transformar las relaciones de las tablas en las bases de datos relacionales. Empecemos con lo más básico.

### Relaciones 1-1.

Muchas opiniones concuerdan que las relaciones 1 a 1 deben ser finalmente normalizadas para formar una única tabla; sin embargo existen consideraciones especiales donde es mejor separar los datos en tablas diferentes. Supongamos el caso que tenemos una tabla ***persona*** y otra tabla ***documentos personales***, donde una persona tiene un solo juego de documentos personales y que un juego de documentos personales solo puede pertenecer a una persona.

![Relaciones 1-1][1]

Si traducimos esto tal cual a lo que sabemos hasta ahora de MongoDB sería algo así:

```js
Persona = {
    nombre      :   'Jonathan',
    apellido    :   'Wiesel',
    genero      :   'M'
}

DocumentosPersonales = {
    pasaporte       :   'D123456V7',
    licencia        :   '34567651-2342',
    seguro_social   :   'V-543523452'
}

```

Para los casos de relaciones 1-a-1 se utiliza el patrón de **embeber** un documento en otro, por lo que el documento final quedaría así:

```js
Persona = {
    nombre      :   'Jonathan',
    apellido    :   'Wiesel',
    genero      :   'M',
    documentos  :   {
        pasaporte       :   'D123456V7',
        licencia        :   '34567651-2342',
        seguro_social   :   'V-543523452'
    }
}
```

### Relaciones 1-*

Supongamos ahora el caso de una tabla ***persona*** y otra tabla ***dirección***. Donde una persona puede poseer varias direcciones.

![Relaciones 1-n][2]

> Por el momento no nos pondremos creativos al pensar que una dirección puede pertenecer a más de una persona.

Traduciendolo tal cual a MongoDB tendríamos algo así:

```js
Persona = {
    nombre      :   'Jonathan',
    apellido    :   'Wiesel',
    genero      :   'M'
}

Direccion1 = {
    pais            :   'Venezuela',
    estado          :   'Distrito Capital'
    ciudad          :   'Caracas'
    urbanizacion    :   'La Florida',
    avenida         :   ...,
    edificio        :   ...,
    piso            :   ...,
    apartamento     :   ...
}

Direccion2 = {
    pais            :   'Estados Unidos',
    estado          :   'Florida'
    ciudad          :   'Miami'
    urbanizacion    :   'Aventura',
    avenida         :   ...,
    edificio        :   ...,
    piso            :   ...,
    apartamento     :   ...
}
```

Ahora para transformar la relación tenemos 2 opciones.

Podemos embeber las direcciones en el documento de la persona al establecer un arreglo de direcciones embebidas:

```js
Persona = {
    nombre      :   'Jonathan',
    apellido    :   'Wiesel',
    genero      :   'M',
    direcciones :   [{
        pais            :   'Venezuela',
        estado          :   'Distrito capital'
        ciudad          :   'Caracas',
        urbanizacion    :   'La Florida',
        avenida         :   ...,
        edificio        :   ...,
        piso            :   ...,
        apartamento     :   ...
    },{
        pais            :   'Estados Unidos',
        estado          :   'Florida'
        ciudad          :   'Miami'
        urbanizacion    :   'Aventura',
        avenida         :   ...,
        edificio        :   ...,
        piso            :   ...,
        apartamento     :   ...
    }]
}
```

ó podemos dejarlo en documentos separados. Para esta segunda opción tenemos 2 enfoques.

Uno sería agregar un campo de referencia a ***dirección*** en ***persona***:

```js
Direccion1 = {
    _id             :   1,
    pais            :   'Venezuela',
    estado          :   'Distrito Capital',
    ciudad          :   'Caracas'
    urbanizacion    :   'La Florida',
    avenida         :   ...,
    edificio        :   ...,
    piso            :   ...,
    apartamento     :   ...
}

Direccion2 = {
    _id             :   2,
    pais            :   'Estados Unidos',
    estado          :   'Florida',
    ciudad          :   'Miami'
    urbanizacion    :   'Aventura',
    avenida         :   ...,
    edificio        :   ...,
    piso            :   ...,
    apartamento     :   ...
}

Persona = {
    nombre      :   'Jonathan',
    apellido    :   'Wiesel',
    genero      :   'M',
    direcciones :   [1,2]
}
```

y el otro sería agregar un campo de referencia a ***persona*** en ***dirección***:

```js
Direccion1 = {
    _id             :   1,
    pais            :   'Venezuela',
    estado          :   'Distrito Capital',
    ciudad          :   'Caracas'
    urbanizacion    :   'La Florida',
    avenida         :   ...,
    edificio        :   ...,
    piso            :   ...,
    apartamento     :   ...,
    persona_id      :   1
}

Direccion2 = {
    _id             :   2,
    pais            :   'Estados Unidos',
    estado          :   'Florida',
    ciudad          :   'Miami'
    urbanizacion    :   'Aventura',
    avenida         :   ...,
    edificio        :   ...,
    piso            :   ...,
    apartamento     :   ...,
    persona_id      :   1
}

Persona = {
    _id         :   1
    nombre      :   'Jonathan',
    apellido    :   'Wiesel',
    genero      :   'M'
}
```

> En lo posible trata de utilizar la opción de embeber si los arreglos no variarán mucho ya que al realizar la búsqueda de la persona obtienes de una vez las direcciones, mientras que al trabajar con referencias tu aplicación debe manejar una lógica múltiples búsquedas para resolver las referencias, lo que sería el equivalente a los *joins*.

> En caso de utilizar la segunda opción, ¿Cual de los 2 últimos enfoques utilizar?. En este caso debemos tomar en cuenta que tanto puede crecer la lista de direcciones, en caso que la tendencia sea a crecer mucho, para evitar arreglos mutantes y en constante crecimiento el **segundo** enfoque sería el más apropiado.



### Relaciones \*-\*

Finalmente nos ponemos creativos a decir que, en efecto, varias personas pueden pertenecer a la misma dirección.

Al aplicar normalización quedaría algo así:

![Relaciones n-n nomralizadas][3]

Para modelar este caso es muy similar al de relaciones uno a muchos con referencia por lo que colocaremos en ambos tipos de documento un arreglo de referencias al otro tipo. Agreguemos una persona adicional para demostrar mejor el punto:

```js
Direccion1 = {
    _id             :   1,
    pais            :   'Venezuela',
    estado          :   'Distrito Capital',
    ciudad          :   'Caracas'
    urbanizacion    :   'La Florida',
    avenida         :   ...,
    edificio        :   ...,
    piso            :   ...,
    apartamento     :   ...,
    personas        :   [1000]
}

Direccion2 = {
    _id             :   2,
    pais            :   'Estados Unidos',
    estado          :   'Florida',
    ciudad          :   'Miami'
    urbanizacion    :   'Aventura',
    avenida         :   ...,
    edificio        :   ...,
    piso            :   ...,
    apartamento     :   ...,
    personas        :   [1000,1001]
}

Persona1 = {
    _id         :   1000,
    nombre      :   'Jonathan',
    apellido    :   'Wiesel',
    genero      :   'M',
    direcciones :   [1,2]
}

Persona2 = {
    _id         :   1001,
    nombre      :   'Carlos',
    apellido    :   'Cerqueira',
    genero      :   'M',
    direcciones :   [2]
}

```

Seguro debes estar esperando el caso más complejo de todos, aquellas ocasiones donde la tabla intermedia tiene campos adicionales.

![Relaciones n-n campos adicionales][4]

Tomando como base el ejemplo anterior, agregaremos el campo adicional usando el patrón para **embeber** de la siguiente manera:

```js
Direccion1 = {
    _id             :   1,
    pais            :   'Venezuela',
    estado          :   'Distrito Capital',
    ciudad          :   'Caracas'
    urbanizacion    :   'La Florida',
    avenida         :   ...,
    edificio        :   ...,
    piso            :   ...,
    apartamento     :   ...,
    personas        :   [1000]
}

Direccion2 = {
    _id             :   2,
    pais            :   'Estados Unidos',
    estado          :   'Florida',
    ciudad          :   'Miami'
    urbanizacion    :   'Aventura',
    avenida         :   ...,
    edificio        :   ...,
    piso            :   ...,
    apartamento     :   ...,
    personas        :   [1000,1001]
}

Persona1 = {
    _id         :   1000,
    nombre      :   'Jonathan',
    apellido    :   'Wiesel',
    genero      :   'M',
    direcciones :   [{
            direccion_id    :   1,
            viveAqui        :   true
        },{
            direccion_id    :   2,
            viveAqui        :   false
        }]
}

Persona2 = {
    _id         :   1001,
    nombre      :   'Carlos',
    apellido    :   'Cerqueira',
    genero      :   'M',
    direcciones :   [{
            direccion_id    :   2,
            viveAqui        :   true
        }]
}

```

> De igual manera se pudiera embeber el campo `viveAqui` del lado de las direcciones, esto dependerá de como planeas manipular los datos.

* * *

## Conclusión

En este curso hemos aprendido a modelar los datos que conforman una base de datos de MongoDB, con este nuevo conocimiento ya podemos evaluar la estructura de una base de datos relacional para determinar si en efecto podemos transformarla fácilmente a NoSQL orientado a documentos y lograr aprovechar sus numerosas ventajas y flexibilidad.

 [1]: http://i.imgur.com/6FPVYaN.png
 [2]: http://i.imgur.com/HskW8Ft.png
 [3]: http://i.imgur.com/iMzNTxW.png
 [4]: http://i.imgur.com/n3BbFV2.png
