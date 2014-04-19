---
layout: post
status: publish
published: true
title: PHPUnit I
author: Ramses Velasquez
author_login: ramses
author_email: cotufa9@gmail.com
date: 2014-04-07 00:05:37.000000000 -04:30
serie: PHP desde Cero
description: Curso introductorio a PHPUnit. Instalación, configuración y primeras pruebas.
dificultad: novato
duracion: 20
categories:
- Cursos
- PHP
tags:
- php
- phpunit
---

En esta entrada de la serie de PHP haremos una introducción a PHPUnit. No tocare los beneficios ni el porque de probar un código, ya que hay muchos lugares en donde se puede adquirir información teórica sobre las pruebas unitarias. Pasaremos directo a crear un proyecto en el cual instalaremos PHPUnit para poder crear y correr nuestras primeras pruebas.

* * *

## Configuración de Proyecto

Lo primero que tenemos que hacer es instalar y configurar PHPUnit. Para esto vamos a crear una carpeta en nuestro servidor llamada TutorialPHPUnit en donde tendremos todo. Para instalar PHPUnit utilizaremos Composer, por lo tanto vamos a crear el archivo composer.json con el siguiente contenido.

```json{
"require-dev": {
        "phpunit/phpunit": "4.0.*@dev"
    }
}
```

Ahora desde nuestro terminal corremos el comando `composer update --dev` y dejemos que Composer haga su magia e instale PHPUnit en nuestro proyecto de prueba. Una vez que termine la instalación podemos probar que todo funciono correctamente corriendo el comando `vendor/bin/phpunit`.

Si todo se instalo bien entonces podemos pasar a configurar el proyecto con Composer, para esto vamos de nuevo al archivo composer.json. Vamos a indicarle que debe hacer autoload de los archivos de la carpeta CodeHeroPHPUnit, esta es una nueva carpeta que debemos crear y donde vamos a tener todo nuestro codigo.

```json{
"require": {
    },
    "require-dev": {
        "phpunit/phpunit": "4.0.*@dev"
    },
    "autoload": {
        "psr-0": {
            "CodeHeroPHPUnit": ""
        }
    }
}
```

Con el archivo modificado debemos volver a correr el comando `composer update`. Luego que este comando se termine de ejecutar vamos a pasar a realizar una pequeña configuración a PHPUnit, el cual sería el último paso antes de empezar a hacer pruebas a nuestro código.

En la carpeta principal del proyecto vamos a crear un archivo llamado phpunit.xml y vamos a colocar el siguiente contenido.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<phpunit colors="true">
    <testsuites>
        <testsuite name="Suite de pruebas unitarias">
            <directory>./CodeHeroPHPUnit/Test/</directory>
        </testsuite>
    </testsuites>
</phpunit>
```

Esta configuración le dice a PHPUnit que busque los códigos de prueba en la carpeta Test la cual vamos a crear a continuación. De esta manera no tenemos que colocar esta ruta cada vez que vayamos a correr nuestras pruebas. También establece que cuando se corran las pruebas se muestren los resultados de las aprobadas en verde y las falladas en rojo. Por último creamos la carpeta Test dentro de CodeHeroPHPUnit.

Si todo ha salido bien hasta ahora, debemos tener una estructura en nuestro proyecto similar a la siguiente.

```
composer.json
composer.phar
phpunit.xml
CodeHeroPHPUnit/
CodeHeroPHPUnit/Test/
vendor/
```

* * *

## Convenciones

PHPUnit tiene una serie de convenciones que nos facilitan el trabajo y no son nada complicadas de aplicar.

La primera convención que vamos a revisar trata de los nombres de los archivos, carpetas y clases. Si vamos a probar una serie de archivos que están en carpetas, nuestras pruebas deben estar ordenadas de la misma manera. El nombre de cada Clase de pruebas debe ser igual al nombre del archivo a probar, pero con la palabra Test al final. También los nombre de las clases deben ser igual al nombre del archivo, como cualquier otra clase, así que esta es muy sencilla. Veamos un ejemplo de como quedarían organizados algunos directorios con sus pruebas.

```
Aplicacion/Clase1.php
Aplicacion/Clase2.php
Aplicacion/Modelos/Modelo1.php
Aplicacion/Test/Clase1Test.php
Aplicacion/Test/Clase2Test.php
Aplicacion/Test/Modelos/Modelo1Test.php
```

La segunda convención trata de los nombres de las funciones. Lo primero que debemos tener en cuenta, es que los nombres de las funciones que probaran nuestro código deben empezar con **test** en minúscula y ser declaradas como públicas. Los nombres de estas funciones deben ser lo más descriptivos posibles y deben incluir el nombre de la función que se prueba.

Estos métodos de prueba no serán llamados por nosotros así que no nos preocupemos por colocar nombres cortos. Si utilizamos nombres descriptivos siempre sabremos que estamos probando en cada uno de ellos. Por ejemplo, si vamos a probar un método llamado **crearUsuario()** y queremos verificar la validación de la longitud de la clave entonces podemos llamar a la prueba **testCrearUsuarioConClaveCorta()**. Esto nos permite saber con exactitud que estamos probando en cada función y así tener una idea de que falló cuando fallen varias pruebas.

Por último, hay que tener presente que todas las clases en donde vayamos a crear funciones de prueba deben extender de la clase **PHPUnit_Framework_TestCase** o de alguna clase de extienda de esta.

{% include middle-post-ad.html %}

* * *

## Aserciones

Las aserciones son predicados que ponemos al final de las pruebas para comprobar si nuestro código esta correcto, es como la pregunta que tratamos de responder y si la respondemos correctamente entonces pasamos la prueba. Hay muchas aserciones, las cuales veremos en el siguiente capítulo, pero ahorita vemos este ejemplo.

```php
<?php
// respuesta que le pasaremos a la aserción
$variable = 'texto';
// pregunta o aserción que hace la prueba
// si $variable no es igual texto entonces la prueba no es correcta
// si $variable es igual a texto entonces la prueba paso
$this->assertEquals('texto', $variable);
?>
```

Con más práctica y ejemplos se irán entendiendo las aserciones. Veremos que existe una para cada tipo de pregunta que queramos hacer.

* * *

## Primeras Pruebas

Con todo lo que ya hemos aprendido creo que podemos crear pruebas y no perdernos en el intento. Nuestra primera prueba sera muy básica y sin sentido pero con ella veremos lo que necesita una prueba y como correrla.

Ahora vamos a crear el archivo PrimeraPruebaTest.php dentro de nuestra carpeta de Test con el siguiente contenido.

```php
<?php
namespace CodeHeroPHPUnit\Test;

// Podemos observar varias de las convenciones que dijimos anteriormente
// El nombre del archivo termina en Test
// El nombre de nuestra clase termina en Test y es igual al del archivo
// Extendemos de la clase PHPUnit_Framework_TestCase
// Nuestra función comienza con test
class MiPrimerTest extends \PHPUnit_Framework_TestCase
{
    // esta función no prueba ninguna otra función por lo tanto el nombre solo describe lo que hace
    // en este caso vamos a probar que True es igual a True
    public function testParaProbarQueTrueEsTrue(){
        $variableTrue = false;
        // primero vamos a ponerlo false para que la prueba falle

        // Probar que $variableTrue sea True de verdad
        $this->assertTrue($variableTrue);
    }
}
?>
```

Ya tenemos nuestra primera prueba creada, ahora solo tenemos que correrla para ver si pasa o falla. Para correr las pruebas volvemos a correr el comando `vendor/bin/phpunit` en nuestro terminal y esperamos que se ejecute. Si no seleccionamos ninguna clase en específico se van a correr todas las pruebas aunque en nuestro caso solo tenemos una.

Como hemos puesto que True es igual False la prueba va a fallar y debería mostrar una salida en la cual se indique que prueba falló.

<img src="http://i.imgur.com/TSH8Vhs.png" width="1158" height="516" class="alignnone" />

Ahora que ya sabemos como es una prueba que falla, vamos a arreglar nuestro código para que pase. Para esto vamos a cambiar el valor de la variable `$variableTrue = true;` y volvemos a correr la prueba. Ahora nuestra prueba si debería pasar y mostrar una salida como la siguiente.

<img src="http://i.imgur.com/k10RZKL.png?1" width="1104" height="388" class="alignnone" />

Como podemos observar PHPUnit nos dice cuantas pruebas se ejecutaron, cuantos asserts se evaluaron y cuantas y cuales pruebas fallaron.

* * *

## Conclusión

Hemos instalado, configurado y ejecutado nuestra primera prueba en PHPUnit. En los próximos capítulos aprenderemos más sobre esta herramienta para probar nuestro código. Veremos más tipos de asserts y creamos pruebas realmente útiles. Cualquier duda o comentario estaré atento a la sección de comentarios.
