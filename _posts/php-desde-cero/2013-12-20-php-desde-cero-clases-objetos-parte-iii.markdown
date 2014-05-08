---
layout: post
status: publish
published: true
title: Clases & Objetos Parte III
author: Ramses Velasquez
author_login: ramses
author_email: cotufa9@gmail.com
date: 2013-12-20 00:14:48.000000000 -04:30
serie: PHP desde Cero
description: Tutorial para obtener primeros conocimientos acerca de la herencia en PHP 5 y como aplicarla.
dificultad: novato
duracion: 20
categories:
- Cursos
- PHP
tags:
- clases
- php
- herencia
---
<p>En este capítulo continuaremos aprendiendo sobre las Clases y Objetos en PHP 5. En esta oportunidad veremos el principio de programación orientada a objetos llamado <strong>herencia</strong>, el cual permite que una clase obtenga las características (propiedades y métodos) de otra clase. Durante esta entrada veremos este concepto con teoría y algunos códigos de practica para poderlo entender de manera clara.</p>

<hr />

<h2>¿Que es la Herencia?</h2>

<p>La herencia no es mas que un principio de diseño en la programación orientada a objetos. Implementado la herencia podemos heredar ( o obtener ) todas las propiedades y métodos públicos y protegidos que tenga la clase de la cual estamos heredando. La clase que hereda las características de otra clase se llama clase hijo y la clase de la cual se esta heredando es la clase padre. La herencia en el mundo de la programación es igual que en el mundo real, los hijos heredan características de sus padres.</p>

<p>Por ejemplo, vamos a pensar que tenemos una clase "Vehículo". Esta clase tendría las características generales de cualquier vehículo, como podrían sera las propiedades matricula, año o color. También en esta clase estarían las acciones o métodos que todos los vehículos realizan como por ejemplo encendido() o moverse().</p>

<p>Pero ahora necesitamos ser un poco mas específicos y tenemos que crear no solo vehículos, si no algo más concreto como un carro o un camión o un autobús. Todos estos tienen características comunes que ya tenemos definidas en la clase Vehículo. Pero cada vehículo de estos que hemos nombrado tienen características propias de cada uno que no tienen porque compartir entre ellos. Por ejemplo los camiones tienen capacidad de carga o los autobuses numero de pasajeros. Así como también tienen métodos propios como cargar() o verificar_pasajeros() por decir algunos.</p>

<p>En este caso seria muy útil poder crear un objeto de la clase "Camión", pero esta clase a su vez hereda de la clase "Vehículo" y por lo tanto ya obtiene las características generales de un vehículo.</p>

<hr />

<h2>Sintaxis de Herencia en PHP 5</h2>

<p>Veamos ahora como es la sintaxis en PHP para definir la herencia en una clase. Hacer que una clase herede de otra en PHP es muy sencillo y se hace colocando la palabra reservada <strong>extends</strong> después del nombre de la clase que estamos creando y luego la clase de la cual queremos heredar. Veamos un ejemplo de esto:</p>



```php
<?php
class Vehiculo{

    public $matricula;
    private $color;
    protected $encendido;

    public function encender(){
        $this->encendido = true;
        echo 'Vehiculo encendido <br />';
    }

    public function apagar(){
        $this->encendido = false;
        echo 'Vehiculo apagado <br />';
    }
}

class Camion extends Vehiculo{

    private $carga;

    public function cargar($cantidad_a_cargar){
        $this->carga = $cantidad_a_cargar;
        echo 'Se ha cargado cantidad: '. $cantidad_a_cargar. ' <br />';
    }

    public function verificar_encendido(){
        if ($encendido == true){
            echo 'Camion encendido <br />';
        }else{
            echo 'Camion apagado <br />';
        }
    }
}

class Autobus extends Vehiculo{

    private $pasajeros;

    public function subir_pasajeros($cantidad_pasajeros){
        $this->pasajeros = $cantidad_pasajeros;
        echo 'Se han subido '.$cantidad_pasajeros.' pasajeros <br />';
    }

    public function verificar_encendido(){
        if ($encendido == true){
            echo 'Autobus encendido <br />';
        }else{
            echo 'Autobus apagado <br />';
        }
    }
}


$camion = new Camion();
$camion->encender();
// encender() es un metodo de la clase padre
// pero al ser un metodo publico es herado por la clase hijo
// en este caso Camion y por lo tanto puede ser llamado desde un
// objeto de Camion
$camion->cargar(10);
$camion->verificar_encendido();
$camion->matricula = 'MDU - 293';
// Lo mimsmo que ocurre con el metodo encender() se
// aplica para la propiedad de matricula y el metodo
// apagar. Son metodos y propiedades publicas
// por lo tanto el hijo las hereda sin ningun problema o limitacion
$camion->apagar();

$autobus = new Autobus();
$autobus->encender();
$autobus->subir_pasajeros(5);
$autobus->verificar_encendido();
$autobus->matricula = 'KDF - 923';
$autobus->apagar();

// Este codigo deberia imprimir la siguiente salida

/*
Vehiculo encendido
Se ha cargado cantidad: 10
Camion apagado
Vehi­culo apagado
Vehiculo encendido
Se han subido 5 pasajeros
Autobus apagado
Vehiculo apagado
*/

?>
```

<p>Podemos observar como hemos declarado tres clases Vehículo, Camión y Autobús. En este caso la clase Vehículo es la clase padre y las clases Camión y Autobús son las clases hijo que heredan de Vehículo. Por lo tanto al crear un objeto que sea Camión o Autobús también estamos agregando automáticamente todas las propiedades y métodos, siempre y cuando sean public o protected, de Vehículo a esos objeto.</p>

<p>Para poder probar la visibilidad de las propiedades hemos declarado en Vehículo una variable public, otra private y otra protected. Si intentamos acceder a la variable $color desde un objeto que sea Camión o Autobús obtendremos un error, ya que esa variable por ser private no es heredada por los hijos.</p>

<p>También podemos observar que las dos clases hijo tienen un método con el mismo nombre pero con una implementación diferentes y otros métodos diferentes esto es lo que hace a la herencia muy util. Al final los dos hijos con Vehículos pero tienen funciones diferentes para cada uno.</p>

<hr />

<h2>Conclusión</h2>

<p>En este capítulo hemos dados los primeros pasos con la herencia en PHP y aprendimos como hacer que una clase herede de otra. Esta técnica nos abre una gran variedad de posibilidades que iremos viendo durante el curso pero primero tenemos que tender claro lo más básico. En los siguientes capítulos veremos que ventajas nos proporciona la herencia a la hora de crear una código mantenible y ordenado. Cualquier comentario o dudas estaré atento a la sección de comentarios.</p>
