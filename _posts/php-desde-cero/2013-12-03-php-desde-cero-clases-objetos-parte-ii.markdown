---
layout: post
status: publish
published: true
title: Clases & Objetos Parte II
author: Ramses Velasquez
author_login: ramses
author_email: cotufa9@gmail.com
wordpress_id: 2792
wordpress_url: http://codehero.co/?p=2792
date: 2013-12-03 00:07:56.000000000 -04:30
categories:
- Cursos
- PHP
tags:
- clases
- php
- opp
---
<p>En el anterior capítulo de PHP desde Cero aprendimos como declarar clases y crear objetos. En esta nueva entrada obtendremos más conocimientos sobre el manejo de POO en PHP 5. Primero aprenderemos a utilizar el método llamado constructor y luego aprenderemos sobre la propiedad de visibilidad que tienen las funciones y variables de una clase.</p>

<hr />

<h2>Constructor</h2>

<p>El constructor es un método que podemos definir en nuestras clases, el cual es llamado automáticamente al momento que se ejecuta <code>$objeto = new Clase();</code>. Para crear el constructor en PHP 5 declaramos la función con el nombre <strong>__construct</strong>. Este método sirve para hacer alguna configuración necesaria a las variables del objeto al momento de su creación, si el método no esta definido entonces el objeto se crear tal cual como esta en la clase sin ninguna modificación. Veamos un ejemplo de como se declara y para que puede servir.</p>

<pre>class calculadoraEuro{

    public $dolar_euro;
    
    // el constructor tiene que ser un metodo publico 
    public function __construct(){
        $this->dolar_euro = 0.74;
        echo 'El valor del euro es: '. $this->dolar_euro;
    }
    
    public function dolaresEuros( $dolares){
        return $dolares.' dolares son '. ($dolares * $this->dolar_euro) .' euros';  
    }
}

$calculadora = new calculadoraEuro();
echo $calculadora->dolaresEuros(5);
</pre>

<p>Como podemos ver tenemos una calculadora en la cual podemos transformar el valor de dólares a euros. En el constructor estamos estableciendo el valor del euro, esto es muy útil cuando tenemos un valor que nunca va a cambiar. ¿Pero que pasa si el precio del euro con respecto al dólar cambia? para esto los constructores también pueden recibir parámetros igual que cualquier otra función y estos será definidos al momento de crear el objeto. Veamos un ejemplo:</p>

<pre>class calculadoraEuro{

    public $dolar_euro;
    
    // el constructor tiene que ser un metodo publico 
    public function __construct( $valor_dolar){
        $this->dolar_euro = $valor_dolar;
        echo 'El valor del euro es: '. $this->dolar_euro;
    }
    
    public function dolaresEuros( $dolares){
        return $dolares.' dolares son '. ($dolares * $this->dolar_euro) .' euros';  
    }
}

$calculadora = new calculadoraEuro( 0.74 );
echo $calculadora->dolaresEuros(5);
</pre>

<p>Como podemos observar en este ejemplo hemos pasado el valor del dólar al constructor como o parámetro más.</p>

<hr />

<h2>Visibilidad</h2>

<p>La visibilidad es una propiedad que tienen los métodos y las propiedades de una clase en PHP, la cual determina quien y en donde se puede hacer uso de una variable o invocar una función. Esta propiedad se define anteponiendo las palabras <strong>public</strong>, <strong>private</strong> o <strong>protected</strong> a la declaración de la función o de la variable.</p>

<p>En una descripción rápida de cada uno podemos decir que los miembros de clases que estén declarados como public pueden ser accedidos por todos y desde cualquier lado. Los que estén declarados como private pueden ser accedidos solo desde la misma clase y por ultimo los que estén definidos como protected pueden ser accedidos desde la misma clase y las clases que hereden (La herencia la veremos en los siguientes capítulos). Ahora veamos un ejemplo de cada una.</p>

<h3>Public</h3>

<p>La visibilidad public es la menos restrictiva que tiene PHP. Si no defines la visibilidad de una función o una variable entonces será publica por default. Los métodos o propiedades de una clase que sean públicos pueden ser accedidos desde cualquier parte por el objeto de la clase. Vamos un ejemplo:</p>

<pre>class prueba{

    public $abc = 'Variable publica';
    public function xyz(){
        echo 'Funcion publica';
    }
}

$objA = new prueba();
echo $objA->abc;//variable accesible desde todos lados
$objA->xyz();//metodo accesible desde todos lados

</pre>

<h3>Private</h3>

<p>Los métodos o propiedades que se declaren privados solo podrán ser accedidos desde adentro de la misma clase. No se puede acceder a estos desde afuera utilizando un objeto de la clase. Este tipo de visibilidad se utiliza cuando quieres proteger alguna función o variable para que no sea afectada desde afuera de la clase. Veamos un ejemplo:</p>

<pre>Class prueba {

    public $abc = 'variable publica';
    private $xyz = 'variable privada';

    public function pubDo($a){
        echo $a;
    }
    
    private function privDo($b){
        echo $b;
    }

    public function pubPrivDo(){
        $this->xyz = 'utilizando la variable privada desde adentro de la clase ';
        $this->privDo('llamando a la función privada desde adentro de la clase');
    }
}

$objT = new prueba();

//Esto funciona bien porque la variable es publica
$objT->abc = 'cambiando variable publica';

//Esta linea dara error porque la variables es privada 
// y por lo tanto no se puede acceder a ella desde un objeto
$objT->xyz = 'cambiando variable privada';

// esta función se ejecutara sin ningún problema ya que es publica
$objT->pubDo("prueba");

// esta función no se podrá ejecutar ya que es privada 
$objT->privDo(1);

// esta función se podrá ejecutar
// aunque en su interior llama a dos funciones privada. 
// Esto ocurre ya que las funciones privadas se están llamando 
// desde adentro de la clase y desde afuera se llama a la publica. 
$objT->pubPrivDo();
</pre>

<h3>Protected</h3>

<p>Este tipo de visibilidad es útil solo cuando se aplica la herencia a una clase. Esto se discutirá con más detalle en otro capítulo pero veamos un ejemplo para tener una idea. Los funciones y variables que se declaren como protegidas serán visibles solo dentro de la propia clase y por las clases que las hereden, por lo tanto no se podrán acceder desde un objeto.</p>

<pre>class pruebaPadre
{
    protected function funcionProtegida(){
        echo 'llamando al a funcion protegida del padre';
    }

}

class pruebaHijo extends pruebaPadre{

    public function funcionPublica ()){
        $this->funcionProtected(); 
    }
}

$objPadre = new pruebaPadre();

// este llamado a la funcion dara error, 
// ya que esta funcion protegia solo se puede llamar
// desde adentro de la clase
$objPadre->funcionProtegida();

$objHijo = new pruebaHijo();

// esta funcion publica llama a la funcion protegida de 
// la clase padre y no dara error porque el llamado 
// a la funcion protegia se hace desde adentro de la clase
$objHijo->funcionPublica();

</pre>

<p>Podemos observar que el método de la clase pruebaPadre no es accesible desde un objeto pero si desde adentro de la clase pruebaHijo, ya que esta hereda las propiedades de pruebaPadre.</p>

<hr />

<h2>Conclusión</h2>

<p>Hemos aprendido a utilizar el método constructor y como nos pueden ser útil a la hora de configurar un objeto en su inicialización. También aprendimos cuales son los tipos de visibilidad que pueden tener una variable o una función en una clase y por lo tanto quienes pueden hacer uso de ellas. En los próximos capítulos seguiremos aplicando estos conceptos así que deben estar muy claros. Cualquier duda o comentario estaré atento a la sección de comentarios.</p>
