---
layout: post
status: publish
published: true
title: Clausuras (closures)
author: Oscar González
author_login: oscar
author_email: gonzalezgreco@gmail.com
author_url: http://www.oscarvgg.com
wordpress_id: 3121
wordpress_url: http://codehero.co/?p=3121
date: 2014-03-17 00:00:42.000000000 -04:30
dificultad: Heroe
duracion: 10
description: En este capítulo de la serie explicaré lo que son las clausuras en Javascript y como su uso puede mejorar la calidad del código que escribimos
categories:
- Cursos
- JavaScript
tags:
- desde cero
- heroe
- singleton
- fabrica
---
<p>En este capítulo de la serie explicaré lo que son las clausuras en Javascript y como su uso puede mejorar la calidad del código que escribimos.</p>

<hr />

<h2>Repaso de alcance o ambito</h2>

<p>En el capítulo anterior (funciones) se toco el tema del alcance. Veamos una vez más en que consistía esto.</p>

<p>El alcance de una variable en Javacript llega tan lejos como se extienda el contexto de una función, es decir, si declaro un variable dentro de una función solo será visible dentro de la misma, incluyendo todos los bloques que estén dentro de ella, esto quiere decir que serán visibles dentro de los condicionales (if), ciclos (for, while, do, etc) y otras funciones encerradas en el mismo ámbito.</p>

<pre lang="javascript">var free = "soy libre";

function myFunction() {

  var notFree = 'estoy encerrado';

  console.log(free); // => soy libre
}

console.log(notFree); // => ReferenceError: notFree is not defined

</pre>

<p>En este código, la variable <code>free</code> es accesible en la función <code>myFunction</code> porqué su alcance es todo lo largo del archivo. El alcance de la variable <code>notFree</code> es solo dentro de la función <code>myFunction</code>, por eso obtenemos un error al imprimirla fuera de dicha función. Este es el ejemplo más simple de una clausura.</p>

<hr />

<h2>El famoso caso "this"</h2>

<p>Ocurre mucho, incluso a programadores experimentados, usar <code>this</code> en ámbitos equivocados. Una ocurrencia común que se me viene a la mente es cuando se usa en jQuery.</p>

<p><a class="jsbin-embed" href="http://jsbin.com/gumuj/4/embed?html,js,console">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script></p>

<p>Dentro de cada ámbito <code>this</code> tiene un valor diferente. En la función "oneFunction" se refiere a un objeto de la función misma. Dentro de la función <code>otherFunction</code> el valor sigue siendo el mismo ya que que se refiere a una función del mismo objeto. Ahora cuando entra en la función de jQuery, se refiere al objeto seleccionado del DOM, es por esto que cuando invocamos <code>console.log(this.variable);</code> imprime <code>undefined</code>.</p>

<hr />

<h2>¿Cuándo usar clausuras?</h2>

<p>Normalmente hacemos uso de clausuras cuando queremos retornar un ámbito encerrado en un objeto.</p>

<p>Vemos unos ejemplos de usos comunes de clausuras.</p>

<h3>Fábricas</h3>

<p>Las fabricas son objetos cuya única función es crear otros objetos, esto con el fin de simplificar la tarea de generar nuevas instancias. Esta idea en conocida por ser unos de los patrones de diseño presentados por un grupo de programadores conocidos como "The Gang of Four" en su libro "Design Patterns: Elements of Reusable Object-Oriented Software"</p>

<pre lang="javascript">var user;

  function userFactory(name) {

    var introduce = function() {
      console.log('Mi nombre es ' + name);
    };

    // Closure created here.
    return (function() {
      return {
        name: name,
        introduce: introduce
      };
    }());
  }

  user = userFactory('Oscar');

  console.log(user.introduce()); // => Hola mi nombre es Oscar
</pre>

<h3>Singleton</h3>

<p>Singleton es un patrón de diseño que consiste en que solo exista una instancia del objeto en memoria, por lo tanto cada vez que se trate de acceder a dicho objeto, siempre se estará manejando la misma instancia.</p>

<p>Veamos el ejemplo propuesto por Addy Osmani es su libro "Learning JavaScript Design Patterns", esta disponible en <a href="http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/">su sitio web</a>, es totalmente gratuito.</p>

<p>El siguiente código puede encontrarse <a href="http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/#singletonpatternjavascrip">aquí</a></p>

<pre lang="javascript">var mySingleton = (function () {

  // Instance stores a reference to the Singleton
  var instance;

  function init() {

    // Singleton

    // Private methods and variables
    function privateMethod(){
        console.log( "I am private" );
    }

    var privateVariable = "Im also private";

    var privateRandomNumber = Math.random();

    return {

      // Public methods and variables
      publicMethod: function () {
        console.log( "The public can see me!" );
      },

      publicProperty: "I am also public",

      getRandomNumber: function() {
        return privateRandomNumber;
      }

    };

  };

  return {

    // Get the Singleton instance if one exists
    // or create one if it doesn't
    getInstance: function () {

      if ( !instance ) {
        instance = init();
      }

      return instance;
    }

  };

})();

</pre>

<hr />

<h2>Fin</h2>

<p>En este capítulo aprendiste como utilizar uno de los temas menos entendidos de Javascript. Puede parecer complejo o rebuscado al principio, pero con el tiempo, a medida que tu conocimiento del lenguaje avance, empezaras a utilizarlas sin darte cuenta.</p>

<p>Espero que este recurso haya sido de ayuda.</p>

<p>Por favor, contribuye al esparcimiento del conocimiento compartiendo este artículo en las redes sociales. Velo como una manera de retribuir a la comunidad lo que te ha dado.</p>

<p>Como siempre estoy a la orden a través de la sección de comentarios de más abajo para aclarar todas tus inquietudes.</p>

<p>Hasta la próxima.</p>
