---
layout: post
status: publish
published: true
title: Clases & Objetos Parte IV
author: Ramses Velasquez
author_login: ramses
author_email: cotufa9@gmail.com
wordpress_id: 2922
wordpress_url: http://codehero.co/?p=2922
date: 2014-01-17 12:04:30.000000000 -04:30
categories:
- Cursos
- PHP
tags:
- php
- POO
---
<p>En este capítulo de PHP vamos a conocer que son y como implementar las clases <strong>abstractas</strong> y las <strong>interfaces</strong>. Veremos algunos ejemplo para tratar de diferenciar las dos y así aprender a sacarle  provecho a estas herramientas que nos brinda la programación orientada a objetos.</p>

<hr />

<h2>¿Qué es una Clase Abstracta?</h2>

<p>Las clases abstractas son clases con capacidades especiales, ya que sus propiedades y métodos pueden ser implementados o no. Esto dependerá de la necesidad que tengan a la hora de programar esta clase. Las clases abstractas sirven para ser heredades y no pueden ser instanciadas directamente. Solo se puede heredar una clase Abstracta a la vez, como cualquier otra clase, y son una descripción de que debe tener y como debe funcionar la clase hijo para que sea util y funcional. Para entender mejor esto veamos unos ejemplo</p>

<pre>
class Fruta {
    private $color;

    public function comer() {
        //Comer la fruta
    }
}

class Naranja extends Fruta {
    public function comer() {
        // código para comer la naranja
    }
}

class Patilla extends Fruta {
    public function comer() {
        // código para comer la patilla
    }
}

$naranja = new Naranja();
$naranja->comer();

$fruta = new Fruta();
$fruta->comer();

</pre>

<p>Vamos a analizar el ejemplo anterior, primero creamos una Naranja que extiende de Fruta y la comemos. Al crear la Naranja le estamos dando mas sentido a la clase de Fruta. En las ultimas lineas estamos creando una Fruta y la comemos también ¿pero a que sabe una Fruta? En este punto estamos haciendo algo que no tienen sentido y aquí es donde entran las clases y métodos abstractos. Veamos este ejemplo de nuevo pero Fruta sera una clase abstracta.</p>

<pre>

// podemos observar que nuestra clase ahora es abstracta, por lo tanto podrá tener métodos y propiedades abstractos y no podrá ser instanciada directamente

// Para declarar una clase abstracta debemos utilizar la palabra reservada abstract antes de la declaración de la clase
absctract class Fruta {
    private $color;
    
    // nuestro método comer ahora es abstracto y debe ser implementado por la clase que herede Fruta
    // Para declarar un método abstracto debemos utilizar la palabra reservada abstract antes de la declaración normal del método y en vez de utilizar llaves para colocar el código utilizamos un punto y coma (;) ya que no vamos a tener código en la función. 
    abstract public function comer();
}

// para extender una clase abstracta usamos la misma nomenclatura que para extender una clase normal. 

class Naranja extends Fruta {
    public function comer() {
        // código para comer la naranja
    }
}

class Patilla extends Fruta {
    public function comer() {
        // código para comer la patilla
    }
}

$naranja = new Naranja();
$naranja->comer();

// Ahora estas dos lineas de código darán error y que no podemos instanciar una clase Fruta
$fruta = new Fruta();
$fruta->comer();

</pre>

<p>Podemos ver como ahora tiene un poco mas de sentido el concepto de Fruta. Es una clase que solo puede ser extendida ya que una Fruta como tal no significa nada. Haciéndola una clase abstracta estamos obligados a extenderla y no instanciarla directamente.</p>

<hr />

<h2>¿Qué es una Interfaz?</h2>

<p>Una interfaz es estructuralmente como una clase abstracta. Tiene un nombre, una serie de funciones sin implementación, pero al final no puede tener ningún tipo de lógica ni implementación (recordemos que en las clases abstractas puedes tener algunas funciones con implementación y otras no), es decir solo deben estar los nombres de los métodos o propiedades. Solo es un esqueleto para que quien los herede tenga como una guía de que métodos debe tener como mínimo en la clase que implementa la interfaz y así esta pueda funcionar dentro de el programa o sistema donde se usa.</p>

<p>Esto quiere decir que varias clases que son muy diferentes entre si, pueden funcionar y ejecutarse en el mismo fragmento de código solo por tener la misma interfaz implementada. Esto se debe a que tendrán los métodos mínimos que la interfaz les proporciona. Hay que tener en cuenta que una clase puede implementar todas las interfaces que sean necesarias.  Veamos un ejemplo de interfaces para entender toda esta información.</p>

<pre>

// para declarar una interfaz se utiliza la palabra reservada interface en vez de la palabra class
interface Interaccion {
    
    // los métodos de la interface se declaran como en una clase normal pero sin implementación
    public function encender();
    public function apagar();
}

interface Direccion {
    public function girarDerecha();
    public function girarIzquierda();
}

// para hacer uso de una interfaz se deben declarar después de el nombre de la clase y anteponiendo la palabra implements. 
// si se tienen varias interfaces entonces se separan con coma (,)
class Televisor implements Interaccion {
    
    public function encender() {
        // este metodo es heredado desde la interfaz
    }

    public function apagar() {
        // este metodo es heredado desde la interfaz
    }
}

class Carro implements Interaccion, Direccion {
    
    public function encender() {
        // este metodo es heredado desde la interfaz Interaccion
    }

    public function apagar() {
        // este metodo es heredado desde la interfaz Interaccion
    }
    
    public function girarDerecha(){
        // este método es heredado desde la interfaz Direccion
    }
    public function girarIzquierda(){
        // este método es heredado desde la interfaz Direccion
    }
}

</pre>

<hr />

<h2>Conclusión</h2>

<p>Hemos aprendido un poco más de la programación orientada a objetos en PHP y con esto tenemos más herramientas para enfrentar los problemas que se nos presenten a la hora de desarrollar grandes sistemas. Cualquier duda o comentario estaré atento a la sección de comentarios.</p>
