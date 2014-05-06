---
layout: post
status: publish
published: true
title: Arreglos
author: Ramses Velasquez
author_login: ramses
author_email: cotufa9@gmail.com
date: 2013-09-10 00:00:20.000000000 -04:30
serie: PHP desde Cero
description: Revisión de los tipos de arreglos, como manipular los datos y sus principales funciones
dificultad: novato
duracion: 20
categories:
- Cursos
- PHP
tags:
- funciones
- php
- arreglos
- numericos
- asociativos
---
<p>En este nuevo capitulo de PHP desde Cero estudiaremos los <strong>arreglos</strong>, un tipo de variable que nos permite juntar o agrupar diferentes elementos y manejarlos como si fueran una sola variable. En otros términos un arreglo de una lista de variables.</p>

<p>Una vez que que un arreglo sea creado, se pueden agregar, editar eliminar sus elementos. Los elementos de un arreglo pueden ser de cualquier tipo y se pueden mezclar, es decir no todos los elementos de un arreglo deben ser del mismo tipo. Los elementos en un arreglo se acceden usando una llave, para esto existen dos tipos de llaves y por lo tanto dos tipos de arreglos en PHP, los numéricos y los asociativos.</p>

<p>Los arreglos numéricos son a los que se acceden con números a los datos que guardan, el primer dato tendría como numero el 0, el segundo el 1 y así sucesivamente. Los arreglos asociativos poseen un nombre sobre cada dato y con ese nombre es que se accede al dato especifico.</p>

<hr />

<h2>Crear un Arreglo</h2>

<p>Para crear un arreglo se hace uso de la función <strong>array()</strong>. Esta puede tomar de cero a varios parámetros y retorna un arreglo el cual es asignado a una variable con el operado de igualación <strong>=</strong>. Si la función recibe parámetros, entonces el arreglo será creado con estos valores. Los arreglos en PHP cambian su tamaño dinámicamente dependiendo la cantidad de datos que tengan, por lo tanto no es necesario establecer un tamaño al momento de su creación como en otros lenguaje.</p>

```php
<?php
$arreglo1 = array();
// creación de arreglo vacío
$arreglo2 = array('php', 'python', 'ruby', 'java');
// creación de arreglo con parámetros.
// Los parámetros serán los primeros datos del arreglo.
?>
```

<hr />

<h2>Accediendo a un Elemento del Arreglo</h2>

<p>Para acceder a un elemento de un arreglo de tipo numérico se debe especificar el indice del elemento deseado. Para esto se colocar el nombre del arreglo seguido del indice del elemento dentro de unos corchetes <strong>[]</strong>. Recordemos que el primer elemento siempre es el 0.</p>

```php
<?php
$arreglo = array('php', 'python', 'ruby', 'java');
echo $arreglo[1];
// Esto devolverá el valor python, el cual ase encuentra en la posición 1
?>
```

<hr />

<h2>Creando un Arreglo Asociativo</h2>

<p>Como vimos anteriormente un arreglo asociativo asigna nombres a cada posición o dato del arreglo. Esto provee una manera mas humana y amigable de acceder a los elementos del arreglo. Igual que la manera anterior para crear un arreglo utilizamos la función <strong>array()</strong>, pero esta vez los datos que le pasaremos tendrán la forma de <code>$llave => $valor</code>. La llave sera el nombre con el cual tendremos acceso al dato deseado. Vamos a crear un arreglo con la información básica de una persona.</p>

```php
<?php
$persona = array('nombre'=>'Juan', 'apellido'=>'valdez', 'direccion'=>'calle 1', 'nacionalidad'=>'venezuela');
?>
```

<hr />

<h2>Accediendo a un Elemento del Arreglo Asociativo</h2>

<p>Ahora que tenemos un arreglo asociativo creado veamos como utilizarlo. Para acceder a cualquier valor del arreglo debemos hacerlo con el nombre de la llave, por lo tanto ponemos el nombre de la variable y entre corchetes el nombre de la llave. Veamos un ejemplo con el arreglo anterior.</p>

```php
<?php
$persona = array('nombre'=>'Juan', 'apellido'=>'valdez', 'direccion'=>'calle 1', 'nacionalidad'=>'venezuela');
echo $persona['apellido'];
// esto nos devolverá el valor de valdez
?>
```

<hr />

<h2>Creando un Arreglo Multidimensional</h2>

<p>Un arreglo multidimensional no es mas que un arreglo cuyos valores son otros arreglos. Un arreglo multidimensional puede ser como una tabla, en donde cada valor del arreglo padre son las filas y cada arreglo interno son las columnas de cada fila. Veamos un ejemplo de una lista de libros con diferentes datos de cada libro:</p>

```php
<?php
$libros = array();
$libros[0] = array('titulo'=>'Aprendiendo PHP', 'autor'=>'Ramses Velasquez');
$libros[1] = array('titulo'=>'Aprendiendo a desarrollar', 'autor'=>'CodeHero');
?>
```

<hr />

<h2>Accediendo a Elementos de un Arreglo Multidimensional</h2>

<p>Sigamos con la analogía anterior de nuestra lista de libros con filas y columnas, para poder accedes a un dato de esta tabla primero debemos especificar que libro queremos (la fila) y luego que dato del libro queremos (la columna). Por lo tanto cada vez que queramos acceder a un dato primero colocamos la fila dentro de corchetes y luego la columna dentro de corchetes. Veamos un ejemplo con los datos anteriores:</p>

```php
<?php
$libros = array();
$libros[0] = array('titulo'=>'Aprendiendo PHP', 'autor'=>'Ramses Velasquez');
$libros[1] = array('titulo'=>'Aprendiendo a desarrollar', 'autor'=>'CodeHero');
echo $libros[1]['autor'];
// esto devolver el valor CodeHero, ya que especificamos la fila numero 1 y la columna autor
?>
```

<hr />

<h2>Editando, Agregando y Borrando Elementos de un Arreglo</h2>

<p>Un elemento de un arreglo puede ser editado con el operador de asignación y especificando la posición en el arreglo, por ejemplo vamos a editar el segundo elemento de un arreglo:</p>

```php
<?php
$figuras = array('cuadrado', 'triángulo', 'circulo');
$figuras[1] = 'rectángulo';
?>
```

<p>Para agregar un elemento al final de un arreglo podemos utilizar la función <strong>array_push()</strong>. Esta función recibe dos parámetros, el primero es el arreglo en donde se va a insertar y el segundo es el nuevo elemento.</p>

```php
<?php
$figuras = array('cuadrado', 'triángulo', 'circulo');
array_push($figuras, 'pentagon');
// ahora el arreglo es  ('cuadrado', 'triángulo', 'circulo', 'pentágono')
?>
```

<p>Para insertar al principio del arreglo utilizamos la función <strong>array_unshift()</strong>, esta también recibe dos parámetros. El primero es el arreglo en donde se va a insertar y el segundo es el nuevo elemento.</p>

```php
<?php
$figuras = array('cuadrado', 'triángulo', 'circulo');
array_unshift($figuras ,'pentagono');
// ahora el arreglo es  ( 'pentágono', 'cuadrado', 'triángulo', 'circulo')
?>
```

<p>También podemos eliminar el primero y el ultimo de los valores del arreglo con las funciones <strong>array_pop()</strong> para el ultimo y <strong>array_shift()</strong> para el primero. Estas funciones solo reciben como parámetro el arreglo a modificar.</p>

```php
<?php
$posiciones = array('Primera', 'Segunda', 'Tercera', 'Ultima');
array_pop($posiciones);
// el arreglo queda así array('Primera', 'Segunda', 'Tercera')
array_shift($posiciones);
// el arreglo queda así array('Segunda', 'Tercera')
?>
```

<hr />



<h2>Recorrer Arreglos</h2>

<p>Muchas veces necesitaremos recorrer todos los elementos de un arreglo para leer los valores o editarlos. Para hacer esto existen varias maneras pero la mejor y mas sencilla es utilizar el bucle <strong>foreach()</strong>. Este bucle funciona como un <strong>while</strong> o un <strong>for</strong> pero es especial para los arreglo y pasa por cada elemento del arreglo. Hay dos maneras de utilizar este bucle: La primera manera es asignar el valor actual del arreglo a una variable que se puede acceder solo dentro del bucle, la sintaxis es la siguiente <code>foreach( $arreglo as $elemento)</code>. Veamos un ejemplo de esto:</p>

```php
<?php
$colores = array('rojo', 'verde', 'azul');

foreach( $colores as $color){
    echo 'Color actual '. $color ;
}
// Esto imprimirá lo siguiente
// Color actual rojo
// Color actual verde
// Color actual azul
?>
```

<p>La segunda forma es para los arreglos asociativos y permite obtener en una variable el valor actual y en otra variable la clave de ese valor con la siguiente sintaxis <code>foreach ($arreglo as $llave => $elemento)</code>. Veamos un ejemplo de esto:</p>

```php
<?php
$persona = array('nombre'=>'Juan', 'apellido'=>'valdez', 'direccion'=>'calle 1', 'nacionalidad'=>'venezuela');
foreach( $persona as $llave => $elemento){
    echo 'Llave - '. $llave;
    echo 'Elemento - '. $elemento;
}
// Esto imprimira lo siguiente
// Llave - nombre
// Elemento - Juan
// Llave - apellido
// Elemento - valdez
// Llave - direccion
// Elemento - calle 1
// Llave - nacionalidad
// Elemento - venezuela
?>
```

<hr />

<h2>Otras Funciones para Arreglos</h2>

<p>A continuación veremos una lista de algunas funciones que son muy útiles a la hora de trabaje con arreglos en PHP.</p>

<ul>
<li><strong>sort()</strong>: Sirve para ordenar un arreglo no asociativo, recibe dos parámetros. El primero es el arreglo que se va a modificar y el segundo es el tipo de algoritmo que se el va aplicar ( SORT_NUMERIC, SORT_STRING, SORT_REGULAR, estos son los mas utilizados).</li>
<li><strong>ksort()</strong>: Es lo mismo que <strong>sort</strong> pero funciona para ordenar arreglos asociativos por la clave. </li>
<li><strong>asort()</strong>: Es lo mismo que <strong>sort</strong> pero funciona para ordenar arreglos asociativos por el valor. </li>
<li><strong>print_r()</strong>: Imprime todos los elementos del arreglo que recibe como parámetro. </li>
<li><strong>in_array()</strong>: Busca un valor(primer parámetro) en un arreglo (segundo parametro) y devuelve True si lo consigue o False si no.</li>
<li><strong>array_keys()</strong>: Recibe como parametro un arreglo asociativo y retorna un arreglo solo con las llaves. </li>
<li><strong>array_search()</strong>: Busca un valor (primer parametro) en un arreglo (segundo parámetro) y devuelve la posición si lo consigue. </li>
</ul>

<h2>Conclusión</h2>

<p>Los arreglos en PHP son la manera mas poderosa y flexible de guardar listas de datos. En este capítulo hemos visto los aspectos mas importantes de los arreglos y sus principales funciones. Sin los arreglos seria muy difícil manejar grandes cantidades de datos así que es un tipo de dato que tenemos que tener muy claro a la hora de programar en PHP.</p>
