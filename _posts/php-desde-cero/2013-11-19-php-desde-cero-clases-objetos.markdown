---
layout: post
status: publish
published: true
title: Clases & Objetos
author: Ramses Velasquez
author_login: ramses
author_email: cotufa9@gmail.com
date: 2013-11-19 00:03:02.000000000 -04:30
serie: PHP desde Cero
description: Tutorial para iniciar en el aprendizaje de los fundamentos de la Programacion Orientada a Objetos en PHP
dificultad: novato
duracion: 20
categories:
- Cursos
- PHP
tags:
- Objetos
- clases
- php
---
<p>En los próximos capítulos de PHP desde Cero vamos a hablar sobre Programación Orientada a Objetos (OOP por sus siglas en ingles). A partir de PHP 5, el manejo de objetos se ha mejorado en rendimiento y en características, ya que ahora se tiene un modelo de objetos completo. Para aprender PHP con OOP vamos a ir poco a poco viendo la teoría con algunos ejemplos.</p>

<hr />

<h2>Básicos de OOP en PHP</h2>

<p>Programación orientada a objetos no es mas que una técnica para diseñar tu aplicación. OOP se puede aplicar a una aplicación de web, aplicación de escritorio en windows, una aplicación móvil, etc. Al final es un concepto para diseñar, en el que todo girara en torno a objetos y clases, así que vamos a ver que es un objeto y una clase.</p>

<hr />

<h2>¿Que es un Objeto?</h2>

<p>Cualquier cosa es un objeto, si miramos a nuestro alrededor podemos encontrar muchos objetos. La computadora, el carro, la casa todo es un objeto. Cada objeto tiene dos cosas, sus propiedades y sus comportamientos. Por ejemplo, un carro tiene propiedades(color, modelo, tamaño) y comportamientos (Rueda hacia adelante y hacia atrás, toca una corneta o bocina). De esta manera podemos relacionar todo con la OOP.</p>

<p>En el mundo real cada objeto tiene diferentes comportamientos y propiedades. Por ejemplo, podemos tener varios objetos televisores, pero cada uno tendrá un tamaño, marca y funciones diferentes, aunque al final todos se prenden y apagan. Esto quiere decir a veces los objetos comparten funciones y a eso se le llama herencia, lo cual veremos mas adelante con detalle.</p>

<p>Los objetos en programación son muy parecidos a los de la vida real. Todo objeto en programación puede tener propiedades (atributos) y comportamientos (que en el caso de la programación serian las funciones y en OOP se le llama métodos).</p>

<hr />

<h2>¿Que es una Clase?</h2>

<p>Las clases son como las definiciones de los objetos o en términos de arquitectura son como los planos. Por ejemplo una clase seria <strong>Carro</strong> y el objeto seria un carro Toyota Corolla.</p>

<p>Una clase representa todas las propiedades (atributos) y comportamientos( métodos ) de un objeto. Por ejemplo en la clase Carro se establece que un objeto carro va a tener color, marca, numero de puertas y el objeto de Carro va decir que el carro tiene color gris, marca Jeep y 2 puertas. Para referirnos al objeto de una clase usamos el termino instancia. En este caso el objeto Jeep es una instancia de la clase Carro.</p>

<hr />

<h2>Ventajas de Programación Orientada a Objetos</h2>

<p>Veamos una lista de las principales ventajas de usar las técnicas de OOP.</p>

<ul>
<li><p>Reusabilidad del código: Si utilizas la OOP en tu código podrás tenerlo mas separado y por lo tanto los Clases podrán ser usadas en otros proyectos. Por ejemplo, si tienes una clase de calculadora en un proyecto y la quieres utilizar en otro proyecto solo debes copiar el código de esa clase.</p></li>
<li><p>Fácil de mantener: Las aplicaciones que sean desarrolladas con las técnicas de OOP son más fáciles de mantener. Volvamos al ejemplo de la calculadora, supongamos que debemos cambiar el comportamiento de algún método de la calculadora. Para esto no vamos a tener que ir a todos los lugares que se usa la calculador si no solamente al lugar en donde esta definida la clase de la calculadora.</p></li>
<li><p>Abstracción: Esto significa esconder las cosas, de esta manera abstraemos la lógica de un método de su implementación. Utilizando OOP solo nos interesa que hace el método que vamos a usar pero no necesitamos saber como lo hace. Si tenemos una clase que crea archivos PDF y vamos a implementarla solo necesitamos saber que métodos usar, pero no como funcionan ellos internamente porque de eso se encargo el creador de la clase.</p></li>
<li><p>Modularidad: Si crear varias clases para resolver un problema o crear un sistema entonces lo estas haciendo modular y permite realizar cambios de manera más fácil sin afectar todo el sistema.</p></li>
</ul>

<p>Todos estos conceptos se verán mas claros cuando empecemos a ver códigos en este y en los siguientes capítulos.</p>

<hr />

<h2>Implementando OOP en PHP</h2>

<p>Ya que sabemos algo de teoría vamos a ver algo de código para terminar de entender todo lo que hemos visto hasta ahora. Vamos a aplicar OOP en PHP declarando una clase y luego creando un objeto.</p>

<p>Lo primero que necesitamos es una clase, sin estas no existirían los objetos. Para declarar una clase utilizamos la palabra reservada <strong>class</strong> seguido por el nombre de la clase y dentro de paréntesis todas sus propiedades y métodos.</p>

```php
<?php

class Carro {

    var $color;
    var $numero_puertas;
    var $marca;
    var $gasolina;

    function llenarTanque($gasolina_nueva){
        $this->gasolina = $this->gasolina + $gasolina_nueva;
    }

    function acelerar(){
        $this->gasolina = $this->gasolina - 1;
        return 'Gasolina restante: '.$this->gasolina;
    }
}

?>
```

{% include middle-post-ad.html %}

<p>Ahora que tenemos la clase declarada, podemos crear uno o varios objetos de esta. La acción de crear un objeto es instanciar. Para aprender como hacer esto utilizaremos la clase que creamos de Carro. Crear un objeto en PHP es muy sencillo y se hace utilizando la palabra reservada <strong>new</strong>. Los objetos se deben guardar en variables, por lo tanto para crear un objeto escribiríamos la siguiente linea <code>$carro = new Carro();</code>. Ahora veamos como se hace en un código completo.</p>

```php
<?php

class Carro {

    var $color;
    var $numero_puertas;
    var $marca;
    var $gasolina = 0;

    function llenarTanque($gasolina_nueva){
        $this->gasolina = $this->gasolina + $gasolina_nueva;
    }

    function acelerar(){
        if ($this->gasolina > 0){
            $this->gasolina = $this->gasolina - 1;
            return 'Gasolina restante: '.$this->gasolina;
        }
    }
}

$carro = new Carro(); // Instanciamos la clase Carro
$carro->color = 'Rojo'; // Llenamos algunas de las propiedades
$carro->marca = 'Honda';
$carro->numero_puertas = 4;
$carro->llenarTanque(10); // utilizamos los metodos
$carro->acelerar();
$carro->acelerar();
$carro->acelerar();

?>
```



<p>Como podemos observar para hacer uso de las propiedades o métodos de un objeto lo hacemos con <strong>-></strong> indicando que propiedad o método deseamos ejecutar.</p>

<h1>Conclusión</h1>

<p>En este capítulo hemos dado los primeros pasos con la Programación Orientada a Objetos. Hicimos algo muy sencillo pero que puede darnos la idea de que es una clase y un objeto y como utilizarlos. En los siguientes capítulos estaremos aprendiendo más acerca de esta técnica aplicada en PHP.</p>
