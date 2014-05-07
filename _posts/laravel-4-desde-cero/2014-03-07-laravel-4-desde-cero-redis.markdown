---
layout: post
status: publish
published: true
title: Redis
author: Ramses Velasquez
author_login: ramses
author_email: cotufa9@gmail.com
date: 2014-03-07 00:01:23.000000000 -04:30
serie: Laravel 4 desde Cero
description: Tutorial para conectar Laravel 4 con una base de datos Redis
dificultad: novato
duracion: 20
categories:
- Cursos
- Laravel
tags:
- php
- laravel
- redis
---
<p>En este nuevo capítulo de Laravel 4 desde cero hablaremos sobre como realizar una conexión y ejecutar comandos en una instancia de Redis. Para saber más acerca de esta base de datos de clave/valor y como realizar su instalación y configuración invito a leer el siguiente tutorial <a href="http://codehero.co/como-instalar-configurar-y-usar-redis/">Cómo instalar, configurar y usar Redis – Parte I</a>. Laravel viene con soporte para Redis y hace que la configuración y conexión para realizar operaciones se lleve acabo de una manera muy sencilla.</p>

<h2>Configuración</h2>

<p>Una vez que tengamos instalada y corriendo nuestra instancia de Redis vamos a configurar nuestra conexión en Laravel. Para esto vamos al archivo <code>app/config/database.php</code> en donde conseguiremos algo como lo siguiente.</p>

```php
<?php
'redis' => array(
        'cluster' => false,
        'default' => array(
            'host'     => '127.0.0.1',
            'port'     => 6379,
            'database' => 0,
        ),

    ),
?>
```

<p>Si hemos seguido el tutorial de Redis y no hemos cambiado la configuración por defecto, estos datos ya deberían servirnos para realizar nuestra conexión. Quizás el parámetro cluster aparezca como True, pero lo cambiamos a false porque no nos interesa tratar a nuestra base de datos como cluster o hacer replicación en estos momentos.</p>

<p>Si hemos realizado correctamente la instalación y el levantamiento de la instancia de Redis, más la configuración de Laravel entonces ya podemos utilizar las funciones de Laravel para acceder a la base de datos. Hagamos una primera prueba muy sencilla para corroborar que todo funciona como debería.</p>


```php
<?php
// routes.php

Route::get('/', function(){

    // creamos un clave sitio con valor Codehero en la base de datos
    Redis::set('sitio', 'Codehero');

    // buscamos el valor de la clave sitio en la base de datos
    $valor = Redis::get('sitio');

    // imprimimos en pantalla el valor devuelto con la clave sitio 
    dd($valor);

});
?>
```

<p>Si todo esta como debería, entonces debemos estar viendo en nuestras pantallas de nuestros exploradores la palabras Codehero.</p>

<h2>Ejecutar Comandos</h2>

<p>Veamos cuales son las dos maneras que tenemos para ejecutar comandos en Redis y para esto vamos a utilizar el ejemplo anterior(insertar una clave/valor y después recuperarla).</p>


```php
<?php
// La primera manera es obteniendo una instancia de la conexión
$redis = Redis::connection();

// luego con esta instancia ejecutamos métodos de Redis
$redis->set('sitio', 'Codehero');
$valor = $redis->get('sitio');
dd($valor);

?>
```


```php
<?php
// La segunda manera es haciendo uso de los métodos de manera estática
// sin tener que obtener una instancia de la conexión 
Redis::set('sitio', 'Codehero');
$valor = Redis::get('sitio');

dd($valor);
?>
```



<h2>Comandos básicos</h2>

<p>Ahora que sabemos como ejecutar los comandos, vamos a ver cuales son los principales que Laravel nos brinda.</p>

<h3>SET</h3>

<p>Esta función nos sirve para insertar una clave y un valor en la base de datos y nos devuelve un boolean confirmando si logro guardar la información.</p>


```php
<?php
$boolean = Redis::set('clave', 'valor');
?>
```

<h3>MSET</h3>

<p>Con esta función podemos insertar varios valores en un solo comando, recibe como parámetro un arreglo con los valores y las claves.</p>


```php
<?php
$boolean = Redis::mset(array('clave1'=>'valor1', 'clave2'=>'valor2'));
?>
```

<h3>GET</h3>

<p>Esta función nos sirve para obtener un valor pasando como parámetro su clave.</p>


```php
<?php
$valor = Redis::get('clave');
?>
```

<h3>MGET</h3>

<p>Con esta función podemos obtener varios valores en una misma llamada, como parámetro se envía un arreglo con todas las claves a buscar. La función retorna un arreglo con todas los valores obtenidos en las posiciones de las claves solicitadas, en caso de no conseguir un valor coloca NULL.</p>


```php
<?php
Redis::mget(array('clave1', 'clave2', 'clave3');

// respuesta 
// array(3) { [0]=> string(4) "valor1" [1]=> string(5) "valor2" [2]=> NULL }
?>
```

<h3>DEL</h3>

<p>Esta función sirve para borrar una o varias claves simultáneamente, como respuesta se obtiene el número de valores que se borraron.</p>


```php
<?php
$borrados = Redis::del('clave');

$barrados = Redis::del(array('clave1', 'clave2', 'clave3'));
?>
```

<h2>Conclusión</h2>

<p>Con lo aprendido en este capítulo podemos dar nuestro primeros pasos para utilizar una base de datos Redis en nuestros proyectos de Laravel. Para mas información sobre las funciones que se pueden utilizar recomiendo revisar la documentación de la librería que usa Laravel <a href="https://github.com/nrk/predis">Predis</a>. Cualquier duda o comentario estaré atento a la sección de comentarios.</p>
