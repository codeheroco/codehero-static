---
layout: post
status: publish
published: true
title: MySQL
author: Ramses Velasquez
author_login: ramses
author_email: cotufa9@gmail.com
date: 2013-10-22 00:10:49.000000000 -04:30
serie: PHP desde Cero
description: Tutorial para aprender como conectar un script php con una base de datos mysql
dificultad: novato
duracion: 20
categories:
- Cursos
- PHP
tags:
- php
- MySql
---
<p>En este nuevo capítulo de de la serie de PHP vamos a aprender como realizar una conexión con una base de datos <strong>MySQL</strong> y manipular datos. Esta es una parte muy importante de las aplicaciones, ya que sin una base de datos seria muy difícil guardar y manipular grandes cantidades de datos. PHP tiene la ventaja de que hace muy sencillo la realización de conexiones a una base de datos.</p>

<p>Para este capítulo voy a asumir conocimientos básicos de MySQL, como crear una base datos con algunas tablas y realizar las operaciones básicas.</p>

<p>Para ejecutar los códigos de este capitulo debemos tener una base de datos creada y crear una tabla llamada <strong>lenguajes</strong>. A continuación muestro al estructura de la tabla y algunos datos que he insertado de ejemplo.</p>

<p><a href="http://i.imgur.com/AwF6COs.png"><img src="http://i.imgur.com/AwF6COs.png" alt="tabla_lenguajes" class="aligncenter size-full wp-image-2430" /></a></p>

<p><a href="http://i.imgur.com/LFHvA05.png"><img src="http://i.imgur.com/LFHvA05.png" alt="datos_lenguajes" class="aligncenter size-full wp-image-2431" /></a></p>

<hr />

<h2>Conectar a una Base de Datos</h2>

<p>Lo primero que se debe hacer siempre que se quiera usar MySQL en PHP es conectarse a la base de datos, sin una conexión no hay manera de realizar una consulta o manipular los datos. Para realizar la conexión se crea un objeto que contenga la información de la base de datos con <strong>new mysqli()</strong>. Esta conexión sirve para todas las operaciones que se deseen realizar en el mismo script PHP.</p>

```php
<?php

$db = new mysqli('localhost', 'usuario', 'clave', 'nombre_base_datos');
// El primer parámetro es el host en donde se encuentra la base de datos
// El segundo parámetro es el usuario con el que se desea conectar
// El tercer parámetro es la clave del usuario
// El cuarto es la base de datos que se desea utilizar


// Por ultimo se debe revisar si la conexión se realizo sin ningún problema
// para esto se hace uso de la propiedad 'connect_errno' sobre el objeto
// de la conexión a la base de datos
if($db->connect_errno > 0){
    die('Imposible conectar [' . $db->connect_error . ']');
    // Si se consiguió algún error entonces se muestra cual fue
}else{
    echo 'Conectado';
    // Si no se consigue algún error entonces la conexión se realizo correctamente
}

?>
```


<hr />

<h2>Realizar una Consulta</h2>

<p>Con la conexión ya establecida pasamos a realizar una consulta que es lo mas importante. Hay varias maneras de realizar consultas, las cuales depende de si se van a pasar parámetros o no y de si se va a realizar la consulta muchas veces o no. Pero primero vamos a realizar una consulta simple para aprender la lógica y las funciones que se utilizan.</p>

<p>Ejecutar una consulta SQL en PHP se puede dividir en dos pasos, después que tengamos la conexión establecida claro.</p>

<p>El primer paso es ejecutar la consulta mediante la función <strong>query</strong>, esta devuelve un objeto con la información del resultado de la consulta en caso de haberse ejecutado correctamente. Si hubo algún error durante la ejecución de la consulta entonces se devuelve FALSE.</p>

```php
<?php

$db = new mysqli('localhost', 'usuario', 'clave', 'nombre_base_datos');
if($db->connect_errno > 0){
    die('Imposible conectar [' . $db->connect_error . ']');
}

$sql = "SELECT lenguaje FROM lenguajes";

if(!$resultado = $db->query($sql)){
    die('Ocurrio un error ejecutando el query [' . $db->error . ']');
}
?>
```


<p>El segundo paso es recorrer el resultado para obtener todas las filas que nos devolvió la consulta ejecutada, para esto se hace uso de la función <strong>fecth_assoc()</strong>. Esta función va haciendo una especie de vacío a la consulta y va pasando cada fila a la variable para poder obtener los datos. El ciclo while va a terminar cuando la consulta se haya vaciado completamente.</p>

```php
<?php

$db = new mysqli('localhost', 'usuario', 'clave', 'nombre_base_datos');
if($db->connect_errno > 0){
    die('Imposible conectar [' . $db->connect_error . ']');
}

$sql = "SELECT lenguaje FROM lenguajes";

if(!$resultado = $db->query($sql)){
    die('Ocurrio un error ejecutando el query [' . $db->error . ']');
}

while($fila = $resultado->fetch_assoc()){

    // $fila es un arreglo asociativo con todos los campos que se pusieron en el select

    echo $fila['lenguaje'] . '<br />';
}
?>
```


<p>Si queremos conocer el número de filas que devolvió la consulta tenemos que utilizar la propiedad <strong>num_rows</strong> del objeto resultante de la consulta a la base de datos, veamos un ejemplo.</p>

```php
<?php

$db = new mysqli('localhost', 'usuario', 'clave', 'nombre_base_datos');
if($db->connect_errno > 0){
    die('Imposible conectar [' . $db->connect_error . ']');
}

$sql = "SELECT lenguaje FROM lenguajes";

if(!$resultado = $db->query($sql)){
    die('Ocurrio un error ejecutando el query [' . $db->error . ']');
}

echo 'Cantidad de filas: ' . $resultado->num_rows;

?>
```




<p>Por último, siempre es una buena practica cerrar la conexión al final del script con la función <strong>close()</strong>.</p>

```php
<?php

$db = new mysqli('localhost', 'usuario', 'clave', 'nombre_base_datos');
if($db->connect_errno > 0){
    die('Imposible conectar [' . $db->connect_error . ']');
}

$sql = "SELECT lenguaje FROM lenguajes";

if(!$resultado = $db->query($sql)){
    die('Ocurrio un error ejecutando el query [' . $db->error . ']');
}

$db->close();

?>
```


<hr />

<h2>Insertar, Modificar y Eliminar</h2>

<p>Para insertar, modificar o eliminar se utiliza solo el paso uno del procedimiento anterior, el cual es llamar a la función <strong>query()</strong> con la sentencia SQL que se desee ejecutar.</p>

<p>Si se desea conocer cuantas filas fueron afectadas por la ejecución de la función <strong>query()</strong>, se hace uso del a propiedad <strong>afected_rows</strong> en el objeto de la conexión a la base de datos.</p>

<h3>Insertar</h3>

<p>Para insertar un registro se corre la sentencia SQL de <strong>INSERT</strong> con la función <strong>query()</strong>.</p>

```php
<?php

$sql = "INSERT INTO lenguajes (id, lenguaje, descripcion) VALUES(NULL, 'C++', 'Sin Descripcion')";

if(! $db->query($sql)){
     die('Ocurrio un error ejecutando el query [' . $db->error . ']');
}

echo 'Filas Insertadas: '.$db->affected_rows;
?>
```


<h3>Modificar</h3>

<p>Para modificar uno o varios registros se corre la sentencia SQL de <strong>UPDATE</strong> con la función <strong>query()</strong>.</p>

```php
<?php

$sql = "UPDATE lenguajes SET  descripcion =  'Lenguaje C++' WHERE  id =5;";
if(! $db->query($sql) ){
     die('Ocurrio un error ejecutando el query [' . $db->error . ']');
}

echo 'Filas Modificadas: '.$db->affected_rows;
?>
```


<h3>Eliminar</h3>

<p>Para eliminar uno o varios registros se corre la sentencia SQL de <strong>DELETE</strong> con la función <strong>query()</strong>.</p>

```php
<?php

$sql = "DELETE FROM lenguajes WHERE  id = 5;";
if(! $db->query($sql) ){
     die('Ocurrio un error ejecutando el query [' . $db->error . ']');
}

echo 'Filas Eliminadas: '.$db->affected_rows;
?>
```


<h2>Conclusión</h2>

<p>En este capítulo hemos aprendido a realizar la conexión de PHP con MySQL y realizar algunas sentencias básicas. En el próximo capitulo veremos como pasar parámetros y filtros a las consultas para que sean mas útiles. Cualquier duda o comentario estaré atento a la sección de comentarios.</p>
