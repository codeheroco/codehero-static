---
layout: post
status: publish
published: true
title: Modelado de Datos
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
wordpress_id: 2351
wordpress_url: http://codehero.co/?p=2351
date: 2013-10-07 00:05:09.000000000 -04:30
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
<h1>MongoDB desde Cero: Modelado de Datos</h1>

<hr />

<p>Una de las dificultades que encuentran aquellos que se adentran al mundo del NoSQL es al tratar de transformar su esquema de base de datos relacional para que funcione de la mejor manera segun el enfoque NoSQL orientado a documentos, como lo es MongoDB. Aquí aprenderemos sobre como realizar correctamente el modelado de datos para que puedas comenzar a pensar en migrar tus proyectos a este tipo de base de datos con la menor dificultad posible.</p>

<hr />

<h2>Tipos de Datos</h2>

<p>Al comienzo de la serie explicamos que los documentos de MongoDB son como objetos JSON, para ser especificos son de tipo BSON (JSON Binario), esta estrategia permite la serialización de documentos tipo JSON codificados binariamente. Veamos algunos de los tipos de datos que soporta:</p>

<ul>
<li><code>String</code> - Cadenas de caracteres.</li>
<li><code>Integer</code> - Números enteros.</li>
<li><code>Double</code> - Números con decimales.</li>
<li><code>Boolean</code> - Booleanos verdaderos o falsos.</li>
<li><code>Date</code> - Fechas.</li>
<li><code>Timestamp</code> - Estampillas de tiempo.</li>
<li><code>Null</code> - Valor nulo.</li>
<li><code>Array</code> - Arreglos de otros tipos de dato.</li>
<li><code>Object</code> - Otros documentos embebidos.</li>
<li><code>ObjectID</code> - Identificadores únicos creados por MongoDB al crear documentos sin especificar valores para el campo <code>_id</code>.</li>
<li><code>Data Binaria</code> - Punteros a archivos binarios.</li>
<li><code>Javascript</code> - código y funciones Javascript.</li>
</ul>

<hr />

<h2>Patrones de Modelado</h2>

<p>Existen 2 patrones principales que nos ayudarán a establecer la estructura que tendrán los documentos para lograr relacionar datos que en una base de datos relacional estarían en diferentes tablas.</p>

<h3>Embeber</h3>

<p>Este patrón se enfoca en incrustar documentos uno dentro de otro con la finalidad de hacerlo parte del mismo registro y que la relación sea directa.</p>

<blockquote>
  <p>Si tienes experiencia en bases de datos orientadas o objetos, este patrón seguiría el mismo principio para la implementación de un TDA (Tipo de Dato Abstracto).</p>
</blockquote>

<h3>Referenciar</h3>

<p>Este patrón busca imitar el comportamiento de las claves foráneas para relacionar datos que deben estar en colecciones diferentes.</p>

<blockquote>
  <p>Debes tomar en cuenta cuando estés en el proceso de modelado que si piensas hacer muchas actualizaciones sobre datos de colecciones relacionadas (en especial modificaciones atómicas), trata en lo posible de que aquellos datos que se vayan a modificar se encuentren en el mismo documento.</p>
</blockquote>

<hr />

<h2>Modelado de Relaciones</h2>

<p>Bien, ha llegado el momento de aprender a transformar las relaciones de las tablas en las bases de datos relacionales. Empecemos con lo más básico.</p>

<h3>Relaciones 1-1.</h3>

<p>Muchas opiniones concuerdan que las relaciones 1 a 1 deben ser finalmente normalizadas para formar una única tabla; sin embargo existen consideraciones especiales donde es mejor separar los datos en tablas diferentes. Supongamos el caso que tenemos una tabla <strong><em>persona</em></strong> y otra tabla <strong><em>documentos personales</em></strong>, donde una persona tiene un solo juego de documentos personales y que un juego de documentos personales solo puede pertenecer a una persona.</p>

<p><img src="http://i.imgur.com/6FPVYaN.png" alt="Relaciones 1-1" /></p>

<p>Si traducimos esto tal cual a lo que sabemos hasta ahora de MongoDB sería algo así:</p>

<pre>Persona = {
    nombre      :   'Jonathan',
    apellido    :   'Wiesel',
    genero      :   'M'
}

DocumentosPersonales = {
    pasaporte       :   'D123456V7',
    licencia        :   '34567651-2342',
    seguro_social   :   'V-543523452'
}

</pre>

<p>Para los casos de relaciones 1-a-1 se utiliza el patrón de <strong>embeber</strong> un documento en otro, por lo que el documento final quedaría así:</p>

<pre>Persona = {
    nombre      :   'Jonathan',
    apellido    :   'Wiesel',
    genero      :   'M',
    documentos  :   {
        pasaporte       :   'D123456V7',
        licencia        :   '34567651-2342',
        seguro_social   :   'V-543523452'
    }
}
</pre>

<h3>Relaciones 1-*</h3>

<p>Supongamos ahora el caso de una tabla <strong><em>persona</em></strong> y otra tabla <strong><em>dirección</em></strong>. Donde una persona puede poseer varias direcciones.</p>

<p><img src="http://i.imgur.com/HskW8Ft.png" alt="Relaciones 1-n" /></p>

<blockquote>
  <p>Por el momento no nos pondremos creativos al pensar que una dirección puede pertenecer a más de una persona.</p>
</blockquote>

<p>Traduciendolo tal cual a MongoDB tendríamos algo así:</p>

<pre>Persona = {
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
</pre>

<p>Ahora para transformar la relación tenemos 2 opciones.</p>

<p>Podemos embeber las direcciones en el documento de la persona al establecer un arreglo de direcciones embebidas:</p>

<pre>Persona = {
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
</pre>

<p>ó podemos dejarlo en documentos separados. Para esta segunda opción tenemos 2 enfoques.</p>

<p>Uno sería agregar un campo de referencia a <strong><em>dirección</em></strong> en <strong><em>persona</em></strong>:</p>

<pre>Direccion1 = {
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
</pre>

<p>y el otro sería agregar un campo de referencia a <strong><em>persona</em></strong> en <strong><em>dirección</em></strong>:</p>

<pre>Direccion1 = {
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
</pre>

<blockquote>
  <p>En lo posible trata de utilizar la opción de embeber si los arreglos no variarán mucho ya que al realizar la búsqueda de la persona obtienes de una vez las direcciones, mientras que al trabajar con referencias tu aplicación debe manejar una lógica múltiples búsquedas para resolver las referencias, lo que sería el equivalente a los <em>joins</em>.</p>
  
  <p>En caso de utilizar la segunda opción, ¿Cual de los 2 últimos enfoques utilizar?. En este caso debemos tomar en cuenta que tanto puede crecer la lista de direcciones, en caso que la tendencia sea a crecer mucho, para evitar arreglos mutantes y en constante crecimiento el <strong>segundo</strong> enfoque sería el más apropiado.</p>
</blockquote>

<h3>Relaciones &#42;-&#42;</h3>

<p>Finalmente nos ponemos creativos a decir que, en efecto, varias personas pueden pertenecer a la misma dirección.</p>

<p>Al aplicar normalización quedaría algo así:</p>

<p><img src="http://i.imgur.com/iMzNTxW.png" alt="Relaciones n-n nomralizadas" /></p>

<p>Para modelar este caso es muy similar al de relaciones uno a muchos con referencia por lo que colocaremos en ambos tipos de documento un arreglo de referencias al otro tipo. Agreguemos una persona adicional para demostrar mejor el punto:</p>

<pre>Direccion1 = {
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

</pre>

<p>Seguro debes estar esperando el caso más complejo de todos, aquellas ocasiones donde la tabla intermedia tiene campos adicionales.</p>

<p><img src="http://i.imgur.com/n3BbFV2.png" alt="Relaciones n-n campos adicionales" /></p>

<p>Tomando como base el ejemplo anterior, agregaremos el campo adicional usando el patrón para <strong>embeber</strong> de la siguiente manera:</p>

<pre>Direccion1 = {
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

</pre>

<blockquote>
  <p>De igual manera se pudiera embeber el campo <code>viveAqui</code> del lado de las direcciones, esto dependerá de como planeas manipular los datos.</p>
</blockquote>

<hr />

<h2>Conclusión</h2>

<p>En este curso hemos aprendido a modelar los datos que conforman una base de datos de MongoDB, con este nuevo conocimiento ya podemos evaluar la estructura de una base de datos relacional para determinar si en efecto podemos transformarla fácilmente a NoSQL orientado a documentos y lograr aprovechar sus numerosas ventajas y flexibilidad.</p>
