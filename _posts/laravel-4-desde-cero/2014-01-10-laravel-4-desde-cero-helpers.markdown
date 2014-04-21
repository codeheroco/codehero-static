---
layout: post
status: publish
published: true
title: Helpers
author: Ramses Velasquez
author_login: ramses
author_email: cotufa9@gmail.com
date: 2014-01-10 00:03:59.000000000 -04:30
serie: Laravel 4 desde Cero
description: Tutorial para conocer las funciones de helpers que Laravel 4 posee
dificultad: novato
duracion: 20
categories:
- Cursos
- Laravel
tags:
- php
- laravel
- helpers
---
<p>En este nuevo capítulo de nuestra serie de Laravel 4 vamos a conocer una serie de funciones que este frameworks nos proporciona y que muchas veces son muy útiles. Estas funciones son llamadas <strong>Helpers</strong> nos ayudan a realizar tareas básicas y las podemos llamar o utilizar en cualquier parte de nuestro código.</p>

<h2>Funciones</h2>

<p>A continuación veremos la lista de los principales helpers que Laravel 4 nos brinda.</p>

<h3>array_add</h3>

<p>Esta función nos permite agregar en un arreglo un par clave/valor.</p>

```php 
<?php
// arreglo inicial
$arreglo = array('nombre' => 'Ramses'); 

// primer parámetro es el arreglo incial
// segundo parámetro la clave que vamos a agregar
// tercer parámetro es el valor que vamos a agregar
$arreglo = array_add($arreglo, 'apellido', 'Velasquez'); 
var_dump($arreglo);

// obtenemos un arreglo como el siguiente
// array(2) { ["nombre"]=> string(6) "Ramses" ["apellido"]=> string(9) "Velasquez" }

?>
```

<h3>array_except</h3>

<p>Nos permite eliminar de un arreglo todos los elementos que tengan las claves que pasemos como parámetro.</p>

```php 
<?php
// arreglo inicial 
$arreglo = array('llaves'=>'va a ser borrada', 
                     'primero'=>'no se borrar', 
                     'segundo'=>'no se borra tampoco', 
                     'borrar'=>'se borra');

// arreglo con claves que desean ser borradas
$borrar  = array('llaves', 'borrar');

// el primer parámetro es el arreglo inicial
// segundo parámetro claves que desean ser borradas del arreglo
$arreglo = array_except($arreglo, $borrar);

var_dump($arreglo);

// obtenemos el siguiente arreglo
//array(2) { ["primero"]=> string(12) "no se borrar" ["segundo"]=> string(19) "no se borra tampoco" }

?>
```

<h3>paths</h3>

<p>Estas funciones dan las rutas completas a directorios que son de importancia en el framework.</p>

```php 
<?php// app_path() devuelve la ruta del directorio /app de la aplicación 
var_dump(app_path());

// base_path() devuelve la ruta en donde esta nuestro proyecto completo
var_dump(base_path());

// public_path() devuelve la ruta de la carpeta en donde tenemos nuestros archivos públicos
var_dump(public_path());

// storage_path() devuelve la ruta completa a la carpeta de storage
var_dump(storage_path());
    
// resultado 
//string(55) "/Applications/MAMP/htdocs/CodeHero/codehero-laravel/app" 
//string(51) "/Applications/MAMP/htdocs/CodeHero/codehero-laravel" 
//string(58) "/Applications/MAMP/htdocs/CodeHero/codehero-laravel/public" 
//string(63) "/Applications/MAMP/htdocs/CodeHero/codehero-laravel/app/storage"

?>
```

<h3>camel_case</h3>

<p>Convierte un string con guion bajo (_) en un texto en formato camelCase.</p>

```php
 <?php
 $camel = camel_case('texto_para_convertir');
var_dump($camel);

// resultado 
// string(18) "textoParaConvertir"
?>
```

<h3>snake_case</h3>

<p>Convierte un string en formato camelCase a formato con guiones bajos (_).</p>

```php 
<?php
$snake = snake_case('textoParaCambiar');
var_dump($snake);

//resultado
//string(18) "texto_para_cambiar"
?>
```

<h3>e</h3>

<p>Aplica la función htmlentities() al string pasado como parámetro.</p>

```php 
<?php
$texto = e('hola');
echo $texto;

// resultado
// hola

// el explorador mostrará la etiqueta html como texto y no como html 
?>
```

{% include middle-post-ad.html %}

<h3>ends_with</h3>

<p>Determina si un texto culmina con un string determinado y devuelve un valor True o False.</p>

```php
 <?php
 // primer parámetro es el texto a evaluar
// segundo parámetro es el texto que se verificará si esta al final del primero
$valor = ends_with('texto a evaluar', 'evaluar');
var_dump($valor);

// resultado
// True

?>
```

<h3>starts_with</h3>

<p>Determina si un texto comienza con un string determinado y devuelve un valor True o False.</p>

```php 
<?php
// primer parámetro es el texto a evaluar
// segundo parámetro es el texto que se verificará si esta al principio del primero 
$valor = starts_with('texto para verificar', 'texto pa');
var_dump($valor);

//resultado
//True
?>
```

<h3>str_contains</h3>

<p>Verifica si un texto esta contenido en otro y devuelve True o False.</p>

```php 
<?php
//primer parámetro es el texto en donde se va a buscar
//segundo parámetro es el texto a buscar en el primero
$valor = str_contains('texto en donde se busca', 'donde');
var_dump($valor);

//resultado 
//True

?>
```

<h3>str_is</h3>

<p>Determina si un patrón de texto se encuentra en un string. Los asteriscos (*) funcionan como comodín a la hora de crear un patrón.</p>

```php 
<?php
// primer parámetro es el patrón que se quiere buscar
// segundo parámetro es el texto en donde se va a buscar el patrón

$valor = str_is('patron', 'cadena de texto donde se busca el patron');
var_dump($valor);

//resultado 
// False
// En este caso el resultado va a ser False porque str_is esta buscando exactamente la palabra patron sin más nada

$valor = str_is('*patron', 'cadena de texto donde se busca el patron');
var_dump($valor);

//resultado
// True
// Con la ayuda del comodín estamos diciendo que buscamos patron pero antes puede tener cualquier cosa

$valor = str_is('*texto*se*patron', 'cadena de texto donde se busca el patron');
var_dump($valor);

//resultado
// True
// También podemos buscar varias cosas con la ayuda de los comodines

?>
```

<h3>str_random</h3>

<p>Crea una cadena de caracteres con letras y números aleatorios, recibe como único parámetro el número de caracteres que debe tener la cadena generada.</p>

```php 
<?php
$cadena = str_random(20);
var_dump($cadena);

// resultado
// cadena de 20 caracteres aleatorios 

?>
```

<h2>dd</h2>

<p>Imprime en pantalla utilizando <strong>var_dump()</strong> el contendio de la variable que se le indique y termina la ejecución del script.</p>

```php 
<?php
$variable1 = 'un texto';
$variable2 = array('llave'=>'valor');

dd($variable1);
// resultado 
// string(4) "hola"

dd($variable2);
// resultado 
// array(1) { ["llave"]=> string(5) "valor" }

// al final tiene el mismo efecto que ejecutar var_dump(), pero tiene el plus de finalizar la ejecución del código. 
?>
```

<h2>Conclusión</h2>

<p>Como hemos podido observar Laravel nos brinda muchas funciones que nos pueden ser útiles a la hora de programar y ahorrarnos algunas líneas de código o tener que buscar alguna lógica para solventar alguna operación sencilla. Cualquier duda o comentario estaré atento a la sección de comentarios.</p>
