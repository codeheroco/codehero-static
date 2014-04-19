---
layout: post
status: publish
published: true
title: 'Eloquent ORM '
author: Ramses Velasquez
author_login: ramses
author_email: cotufa9@gmail.com
date: 2013-09-03 00:00:43.000000000 -04:30
serie: Laravel 4 desde Cero
description: Primeros pasos con el ORM Eloquent y sus principales funciones
dificultad: novato
duracion: 20
categories:
- Cursos
- Laravel
tags:
- Modelos
- php
- laravel
- laravel 4
- modelo
- eloquent orm
- orm
- eloquent
- base datos
- crud
---
<p>En el capítulo anterior de la serie de Laravel 4 vimos como crear y ver a un usuario, por lo tanto ya hemos utilizado lo más básico del ORM que trae este framework. En esta oportunidad profundizaremos un poco sobre <strong>Eloquent ORM</strong>, para esto vamos a conocer cuales son los métodos para realizar todas las operaciones CRUD sobre una tabla (modelo) y veremos los códigos de ejemplo para entender como funciona.</p>

<h2>¿Qué es Eloquent ORM?</h2>

<p>En español las siglas ORM significan "Mapeo Objeto-Relacional" y es una técnica de programación que el caso de Laravel se aplica con la clase llamada Eloquent. Ahora veamos que significa esto en castellano, cuando aplicamos esta técnica podemos accedes a los registros de la base datos como si fueran objetos de PHP y no tener que ejecutar código SQL. Esto es posible porque cada tabla de la base datos es manejada por una clase en nuestro proyecto (modelos). Esta técnica también permite crear las relaciones como propiedades de los objetos y así por relacionarlos de una manera mas sencilla cuando se quieran realizar operaciones sobre ellos. Por ultimo esto nos permite independizarnos de una base de datos en especifico porque al tratar con objetos y no con la base de datos directamente podemos cambiar el motor de base de datos en cualquier momento y nuestro código continuara funcionando sin ningún problema.</p>

<h2>CRUD</h2>

<p>Ahora que sabemos que es <strong>Eloquent ORM</strong> vamos a aprender a utilizarlo, para esto vamos a ver unos ejemplos que se ejecutaran utilizando una tabla de carros con los siguientes campos.</p>

<p><a href="http://i.imgur.com/XO9vacM.png"><img src="http://i.imgur.com/XO9vacM.png" alt="laravel 4 base datos" class="aligncenter size-full wp-image-2152" /></a></p>

<p>Para poder utilizar esta tabla de carros con Eloquent ORM debemos entonces crear un modelo en cual extienda de Eloquent. La creación del modelo y las variables que estamos creando ya se han visto en los capítulos anteriores, así que si algo no te resulta familiar en este punto te recomiendo que revises las entradas anteriores.</p>

```php 
<?php
Class Carro Extends Eloquent {
    
    protected $table = 'carros';
    
    protected $fillable = array('modelo', 'placa', 'ano');

}
?>
```

<p>Ahora que tenemos nuestro modelo vamos a repasar las acciones que se pueden realizar con el.</p>

<h3>Crear Registro</h3>

<p>Para crear un registro tenemos dos maneras. Una de ellas ya la vimos que es haciendo uso de la función estática <strong>create()</strong>, la cual recibe como parámetro un arreglo con los campos del objeto que se va a crear. Este método es común usarlo cuando estamos recibiendo la información desde un formulario.</p>

```php 
<?php
$input = array(
    'modelo' =>'Honda Civic',
    'placa' => 'HFU 88J',
    'ano' => 2010
    );

Carro::create($input);

// Equivalente a 
// INSERT INTO `carros`(`id`, `modelo`, `placa`, `ano`, `created_at`, `updated_at`) 
// VALUES (NULL, 'Honda Civic','HFU 88J',2010 , NOW(), NOW())
?>
```

<p>La segunda manera es crear un objeto Carro con la sentencia <strong>new</strong>, llenar las propiedades del objeto una por una y luego guardarlo con el método <strong>save()</strong>.</p>

```php 
<?php
$carro = new Carro;

$carro->modelo = 'Honda Civic';
$carro->placa = 'HFU 88J';
$carro->ano = 2010;

$carro->save();

// Equivalente a 
// INSERT INTO `carros`(`id`, `modelo`, `placa`, `ano`, `created_at`, `updated_at`) 
// VALUES (NULL, 'Honda Civic','HFU 88J',2010 , NOW(), NOW())
?>
```

<h3>Buscar Todos los Registros</h3>

<p>Cuando necesitemos traer todos los registros de un modelo podemos hacer uso de la función estática <strong>all()</strong>, esta nos devuelve un arreglo con todos las columnas de todas las filas que contenga la tabla que maneja el modelo.</p>

```php 
<?php
$carros = Carro::all( );

foreach( $carros as $carro){
    echo $carro->modelo;
}

// Equivalente a 
// SELECT * FROM `carros` WHERE 1
?>
```

<p>Esta función acepta como parámetro un arreglo con el nombre de los campos que queremos traer, esto en caso de que no queramos obtener todas las filas completas si no solo la 'placa' y el 'modelo' por ejemplo.</p>

```php 
<?php
$carros = Carro::all( array('modelo', 'placa' ));

foreach( $carros as $carro){
    echo $carro->modelo;
}

// Equivalente a 
// SELECT modelo, placa FROM `carros` WHERE 1
?>
```

{% include middle-post-ad.html %}

<h3>Buscar un Registro</h3>

<p>Cuando queramos buscar un registro en especifico con su id entones utilizamos la función estática <strong>find()</strong>, la cual recibe como parámetro el id del objeto que se desee recuperar. Esta función nos devuelve un objeto con todas las propiedades ( campos ) que tenga en la base de datos.</p>

```php 
<?php
$id = 1;

$carro = Carro::find( $id );

echo $carro->placa; 

//Equivalente a 
//SELECT * FROM `carros` WHERE id = 1
?>
```

<p>Al igual que la función <strong>all()</strong>, podemos pasar un arreglo como parámetro con los campos que queramos obtener de la base de datos.</p>

```php 
<?php
$id = 1;

$carro = Carro::find( $id, array('placa') );

echo $carro->placa; 

//Equivalente a 
//SELECT placa FROM `carros` WHERE id = 1
?>
```

<h3>Modificar Registro</h3>

<p>Cuando necesitemos modificar un registro debemos primero buscar el objeto que lo contenga con la función <strong>find()</strong>, modificar las propiedades con los nuevos valores y por últimos llamar al método <strong>save()</strong> del objeto.</p>

```php 
<?php
$id = 1;
$carro = Carro::find( $id );
$carro->placa = 'MDY 00J';

$carro->save();

//Equivalente a 
// SELECT * FROM `carros` WHERE id = 1
// UPDATE `carros` SET `placa`='MDY 00J', `updated_at`=NOW() WHERE id = 1

?>
```

<h3>Borrar Registro</h3>

<p>Así como tenemos dos maneras de crear los objetos y guardarlos en la base de datos, para borrarlos también tenemos dos maneras. La primera es utilizando la función <strong>delete()</strong> con el objeto que queremos borrar, de esta manera borramos un solo objeto a la vez.</p>

```php 
<?php
$id = 1;
$carro = Carro::find( $id );
$carro->delete();
//Equivalente a 
// SELECT * FROM `carros` WHERE id = 1
// DELETE FROM `carros` WHERE id = 1
?>
```

<p>La segunda forma de borrar registros es haciendo uso de la función estática <strong>destroy</strong>, esta recibe como parámetros un arreglo con los id de los objetos que se deseen borrar de las base de datos. Con esta función si es posible borrar varios registros a la vez.</p>

```php 
<?php
$arreglo = array(2, 3, 4, 7);   
Carro::destroy($arreglo);

// Equivalente a 
// DELETE FROM `carros` WHERE id = 2
// DELETE FROM `carros` WHERE id = 3
// DELETE FROM `carros` WHERE id = 4
// DELETE FROM `carros` WHERE id = 7
?>
```

<h2>Conclusion</h2>

<p>Hemos aprendido las funciones mas basicas que se pueden realiazr con un modelo. Esto nos sirve de base para lo que aprenderemos en los proximos tutoriales. En el proximo capítulo veremos como declarar y utilizar las relaciones de las tablas en la base de datos con Eloquent. Tambien veremos como hacer consultas mas especificas y no solo con un id. Cualquier duda estare atento a responderla en la sección de comentarios.</p>
