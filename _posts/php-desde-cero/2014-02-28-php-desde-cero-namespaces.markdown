---
layout: post
status: publish
published: true
title: Namespaces
author: Ramses Velasquez
author_login: ramses
author_email: cotufa9@gmail.com
date: 2014-02-28 00:05:37.000000000 -04:30
serie: PHP desde Cero
description: Introducción a la utilización de los namespaces en PHP
dificultad: novato
duracion: 20
categories:
- Cursos
- PHP
tags:
- php
---


<p>En este nuevo capítulo de la Serie de PHP desde Cero conoceremos los famosos <strong>Namespace</strong>. Pero antes de explicarlo en PHP, veamos un ejemplo de la vida real para tener una idea de clara de que trata todo esto.</p>

<p>Imaginemos que trabajamos en una compañía pequeña y hay un empleado de nombre Juan. Cada vez que decimos Juan todos entienden a quien nos referimos, pero de un día para otro la compañía crece en personal y ahora hay dos empleados de nombre Juan. Esto nos crea un problema para hacer referencia a alguno de los dos y aquí es donde entran en juego los apellidos. Uno es Juan Vargas y el otro Juan Perez, lo cual nos permite diferenciarlos sin ningún problema. Esto es lo mismo que sucede con los <strong>namespaces</strong> en PHP.</p>

<p>Si tenemos un proyecto grande y tenemos varias clases que hemos importado o han hecho diferentes personas puede haber una colisión de nombres, pero esto se resuelve con esta característica de PHP. Anteriormente, y en realidad todavía muchas personas lo resuelve de esta manera, se usaban nombres largos para identificar las clases de manera inequívoca y así evitar las colisiones. Digo anteriormente porque los namespaces se implementaron en PHP desde la version 5.3.</p>

<hr />

<h2>Introducción a los Namespaces</h2>

<p>Ahora vamos a ver como funcionan y como se aplican los namespaces en PHP. Primero que nada vamos a ver un ejemplo en donde haya colisión de nombre de clases:</p>

```php
<?php
class Usuario {
    var $nombre;
}

class Usuario{
    var $correo;
    var $clave;
}

?>
```


<p>Como podemos ver tenemos dos clases Usuario que tiene funcionalidades diferentes(imaginemos que tienen muchos métodos y propiedades), pero al llamarse de la misma manera va a dar error cuando las llamemos porque PHP no sabe cual queremos instanciar. Ahora vamos a ver las mismas clases pero con unos namespace y como se pueden llamar en el mismo código sin crear colisiones.</p>

```php
<?php
namespace usuarioPersona;

class Usuario {
    var $nombre;
}

namespace usuarioSistema;

class Usuario{
    var $correo;
    var $clave;
}

$persona = new \usuarioPersona\Usuario();

$usu_sistema = new \usuarioSistema\Usuario();
?>
```


<p>Utilizando los namespace se puede ver claramente cuando llamamos a cada una de las clases Usuario.</p>

<hr />

<h2>Sintaxis</h2>

<p>Los namespaces se puede declarar, importar y utilizar de varias maneras, las cuales vamos a ver a continuación.</p>

<p>Por defecto todas las clases, funciones y variables están definidas en el entorno global, como ha sido siempre en PHP.</p>

```php
<?php
//para declarar un namespace se utiliza la palabra reservada namespace
//antes del nombre que se le quiera otorgar
//y debe ir al principio del archivo del script
namespace nombreDelNamespace;

// a partir de aquí se escribe todo el código
// que se quiera incluir en este entorno
?>
```


<p>También se pueden definir subnamespaces para poder tener nuestro código bien organizado y estructurado. Para separar los namespaces se utiliza la barra invertida ( \ ), veamos algunos subnamespaces validos.</p>

```
Proyecto\BD\MySQL
Proyecto\BD\Mongo
Proyecto\PDF\FilePDF
Proyecto\Librerias\LibreriaGraficas
```


<hr />



<h2>Usar Namespaces</h2>

<p>Ya que sabemos como declarar los namespace ahora tenemos que aprender como llamar clases, funciones o variables que estén en ellos. Vamos a crear una clase y definirla dentro un namespace:</p>

```php
<?php
//carro.php

// la clase Carro y CONSTANTE estarán en el namespace Codehero\Cursos
namespace Codehero\Cursos;

const CONSTANTE = 'Constante de Ejemplo';  

class Carro{

    static function rodar(){
        // código de la función rodar
    }
}

?>
```


<p>Ahora vamos a importar el archivo de carro.php y utilizar la clase Carro y la constante.</p>

```php
<?php
require_once('carro.php');  

// Como no hay un namespace definido en este archivo
// tenemos que llamar a la constante y la función todo
// el namespace completo (ruta absoluta).
// Siempre que utilicemos un namespace directamente
// hay que empezar con un \ slash invertido
$carro = \Codehero\Cursos\Carro::rodar();
$constante = \Codehero\Cursos\CONSTANTE;

?>
```


<p>Claro esta que cuando tenemos muchas funciones que debemos llamar de varios namespaces es muy tedioso escribir todas las rutas completas. Para esto existe la opción de importar namespaces con la sentencia <strong>use</strong>. Se pueden importar todos los que sean necesarios, veamos un ejemplo de como importarlos:</p>

```php
<?php
require_once('carro.php');  
use Codehero\Cursos;

// Ya no es necesario utilizar toda la ruta porque PHP intenta buscar
// en los namespaces que se esten usando, en este caso el global y el
// Codehero\Cursos.
$carro = Carro::rodar();
$constante = CONSTANTE;

?>
```


<hr />

<h2>Conclusión</h2>

<p>En este capítulo hemos tenido nuestro primer contacto con los namespaces, todavía falta mucho que aprender sobre los mismos y se cubrirá en el siguiente capítulo viendo ejemplos reales con un mini proyecto. Hoy en día muchos frameworks hacen uso de los namespaces y es muy importante saberlos usar cuando tengamos proyectos grandes y complejos. Cualquier comentario o duda estaré atento a la sección de comentarios.</p>
