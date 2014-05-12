---
layout: post
status: publish
published: true
title: Tipos de datos
author: Carlos Picca
author_login: carlos
author_email: carlospicca@gmail.com
wordpress_id: 2955
wordpress_url: http://codehero.co/?p=2955
date: 2014-01-29 10:02:08.000000000 -04:30
serie: Java desde Cero
dificultad: Novato
duracion: 10
description: Curso en el cual aprenderemos Java desde Cero. Estudiaremos todo lo relacionado a los tipos de datos usados en Java.
categories:
- Cursos
- Java
tags:
- referencia
- tipos
- datos
- primitivos
- int
- bool
- byte
- float
- short
- long
---
<p>Bienvenidos Java desde Cero, curso en el cual aprendemos a programar sin conocimiento alguno. En el capítulo anterior, aprendimos odo lo relacionado al manejo de objetos y clases dentro de Java. Si eres nuevo en este curso, te recomiendo que le eches un vistazo al capítulo anterior para que te pongas en contexto (<a href="http://codehero.co/java-desde-cero-clases-y-objectos/">Capítulo 3 - Clases y Objetos</a>)</p>

<p>Hoy, vamos a ver todo lo relacionado a los tipos de datos usados en Java.</p>

<hr />

<p>Las variables son posiciones de memoria reservadas para almacenar valores. Esto significa que cuando se crea una variable para reservar algo se crea un espacio en la memoria.</p>

<p>Existen dos tipos de datos disponibles en Java:</p>

<ul>
<li>Tipos de datos primitivos.</li>
<li>Tipos de datos de referencia.</li>
</ul>

<hr />

<h2>Tipos de datos primitivos</h2>

<p>Hay ocho tipos de datos primitivos soportados por Java. Los tipos de datos primitivos están predefinidos por el lenguaje y nombrados por una palabra clave. Veamos ahora en detalle acerca de los ocho tipos de datos primitivos.</p>

<h3>Byte</h3>

<ul>
<li><p>Tipo de datos Byte es un entero de 8 bits.</p></li>
<li><p>El valor mínimo es -128 (-2 ^ 7).</p></li>
<li><p>El valor máximo es 127 (inclusive) (2 ^ 7 -1).</p></li>
<li><p>El valor por defecto es 0.</p></li>
<li><p>Tipo de datos Byte se utiliza para ahorrar espacio en grandes conjuntos, sobre todo en el lugar de los números enteros, ya que un byte es cuatro veces más pequeño que un <strong>int</strong>.</p></li>
<li><p>Ejemplo: <code>byte a = 100</code>, <code>byte b = -50</code></p></li>
</ul>

<h3>Short</h3>

<ul>
<li><p>Tipo de datos Short es un entero de 16 bits.</p></li>
<li><p>El valor mínimo es -32,768 (-2 ^ 15).</p></li>
<li><p>El valor máximo es de 32.767 (inclusive) (2 ^ 15 -1).</p></li>
<li><p>Tipo de datos Short también se puede utilizar para ahorrar memoria como tipo de datos byte. Un tipo de dato <strong>short</strong> es 2 veces más pequeño que un <strong>int</strong>.</p></li>
<li><p>El valor por defecto es 0.</p></li>
<li><p>Ejemplo: <code>short s = 10000</code>, <code>short r = -20000</code></p></li>
</ul>

<h3>Int</h3>

<ul>
<li><p>Tipo de datos int es un entero de 32 bits.</p></li>
<li><p>El valor mínimo es -2147483648 (-2 ^ 31).</p></li>
<li><p>El valor máximo es 2147483647 (inclusive)(2 ^ 31 -1).</p></li>
<li><p>Int. se utiliza generalmente como el tipo de datos predeterminado para los valores enteros a menos que exista una preocupación acerca de la memoria.</p></li>
<li><p>El valor por defecto es 0.</p></li>
<li><p>Ejemplo: <code>int a = 100000</code>, <code>int b = -200000</code></p></li>
</ul>

<h3>Long</h3>

<ul>
<li><p>Tipo de datos Long es un entero de 64 bits.</p></li>
<li><p>El valor mínimo es -9223372036854775808 (-2 ^ 63).</p></li>
<li><p>El valor máximo es 9223372036854775807 (inclusive) (2 ^ 63 -1).</p></li>
<li><p>Este tipo se utiliza cuando se necesita una gama más amplia que int.</p></li>
<li><p>El valor por defecto es 0.</p></li>
<li><p>Ejemplo: <code>long a = 100000</code>, <code>int b =-200000</code></p></li>
</ul>

<h3>Float</h3>

<ul>
<li><p>El Float es un dato de coma flotante de precisión simple de 32 bits.</p></li>
<li><p>Float se utiliza principalmente para ahorrar memoria en grandes arrays de números.</p></li>
<li><p>El valor por defecto es 0,0 f.</p></li>
<li><p>Ejemplo: <code>float f1 = 234.5f</code></p></li>
</ul>

<h3>Double</h3>

<ul>
<li><p>El doble es un dato de coma flotante de doble precisión de 64 bits.</p></li>
<li><p>Este tipo de datos se utiliza generalmente como el tipo de datos predeterminado para valores decimales, en general, la opción por defecto.</p></li>
<li><p>El valor por defecto es 0.0 D.</p></li>
<li><p>Ejemplo: <code>doble d1 = 123,4</code></p></li>
</ul>

<h3>Boolean</h3>

<ul>
<li><p>Boolean representa un bit de información.</p></li>
<li><p>Sólo hay dos posibles valores: true y false.</p></li>
<li><p>Este tipo de datos se utiliza para indicadores simples que hacen un seguimiento de condiciones.</p></li>
<li><p>El valor predeterminado es falso.</p></li>
<li><p>Ejemplo: <code>boolean a = true</code></p></li>
</ul>

<h3>Char</h3>

<ul>
<li><p>Char es un carácter Unicode de 16 bits.</p></li>
<li><p>El valor mínimo es '\u0000' (o 0).</p></li>
<li><p>El valor máximo es '\uffff' (o 65.535 inclusive).</p></li>
<li><p>Tipo de datos char se utiliza para almacenar cualquier carácter.</p></li>
<li><p>Ejemplo: <code>char letra = 'A'</code></p></li>
</ul>

<hr />

<h2>Tipos de datos de referencia</h2>

<ul>
<li><p>Las variables de referencia se crean mediante constructores definidos de las clases. Se utilizan para acceder a los objetos. Estas variables se declaran de un tipo específico que no se puede cambiar.</p></li>
<li><p>Objetos de la Clase, y varios tipos de variables de array están bajo tipo de datos de referencia.</p></li>
<li><p>El valor predeterminado de cualquier variable de referencia es nulo.</p></li>
<li><p>Una variable de referencia se puede utilizar para referirse a cualquier objeto del tipo declarado o cualquier tipo compatible.</p></li>
<li><p>Ejemplo: <code>Carro unCarro = new Carro ("Ford");</code></p></li>
</ul>

<hr />

<h2>Conclusión</h2>

<p>En esta lección, vimos todo lo relacionado a los tipos de datos usados en Java. Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso.</p>

<p>¡Te espero la próxima semana!</p>
