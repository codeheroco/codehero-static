---
layout: post
status: publish
published: true
title: Funciones
author: Oscar González
author_login: oscar
author_email: gonzalezgreco@gmail.com
author_url: http://www.oscarvgg.com
date: 2014-03-03 00:03:46.000000000 -04:30
serie: Javascript Desmitificado
dificultad: Heroe
duracion: 10
description: En el capítulo anterior hablamos de objetos en Javascript. Casi todo es un objeto en este lenguaje, y las funciones no son la excepción.
categories:
- Cursos
- JavaScript
tags: []
---
<p>En el capítulo anterior hablamos de objetos en Javascript. Casi todo es un objeto en este lenguaje, y las funciones no son la excepción.</p>

<p>En programación usamos funciones todos los días, por lo tanto, con este tutorial no pretendo enseñarte para que sirven las mismas, sino mostrarte con un nivel de profundidad propio el enfoque que ofrece Javascript hacia este recurso del código, a manera de entender las areas oscuras que a veces nos hacen pasar horas debuggeando.</p>

<hr />

<h2>Bloques de funciones</h2>

<p>Las funciones en Javascript son bloques de código identificados por un nombre que se pueden invocar cuando sea necesario.</p>

<pre lang="javascript">// utilizando  ;! invocamos una función inmediatamente
;!function() {

  var lives = 10;

  // bloque de función
  this.takeDamage = function(value) {

    lives -= value;
  }

  // bloque condicional
  if (lives > 0) {

    takeDamage(4);

    speak();
  }

  // bloque de función
  function speak() {

    console.log('Hola, me quedan ' + lives + ' vidas');
  }

}();

</pre>

<hr />

<h2>Argumentos</h2>

<p>Las funciones pueden recibir variables complejas como son los objetos (Ej.: Array, Date), o tipos de datos primitivos (Ej.: Integer, String); a estas variables pasadas al cuerpo de una función, se les conoce como argumentos o parámetros.</p>

<h2>Paso por valor y referencia</h2>

<p>En Javascript al igual que en otros lenguajes de programación los argumentos de tipos complejos son pasados por referencia y los primitivos por valor.</p>

<p>Veamos un ejemplo de paso por valor.</p>

<pre lang="javascript">// variable numérica
var sheepCount = 10;

;!function(val) {

  val --;

}(sheepCount);

console.log(sheepCount); // => 10, no se modificó

</pre>

<p>Ahora veamos paso por referencia.</p>

<pre lang="javascript">// objeto a pasar a función
sheep = {
  count: 10
}

;!function(obj) {

    obj.count --;

}(sheep);

console.log(sheep.count); // => 9, si se modificó el objeto

</pre>

<h3>Pasando un numero indeterminado de argumentos</h3>

<p>Todas las funciones en Javascript tienen un objeto llamado <code>arguments</code>, éste actúa como un comodín para acceder a cualquier cantidad de argumentos suplidos a la función.</p>

<pre lang="javascript">// esta función no recibe explícitamente ningún argumento
var sum = function () {

  var length = arguments.length,
      total = 0;

  for (var i = 0; i &lt; length; i++) {

      // se suman todos los argumentos
      total += arguments[i];
  }

  return total;
};

console.log(sum(20, 30, 50)); // => 100

</pre>

<h3>Parámetros por defecto (Solo ECMAScript 6)</h3>

<p>En ECMAScript 6 las funciones van a poder recibir parámetros con valores por defecto como se muestra a continuación:</p>

<pre lang="javascript">var sum = function (a = 10, b = 2) {
    return a + b;
};

console.log(sum()); // => 12
console.log(sum(3, 2)); // => 5

</pre>

<hr />

<h2>Tipos de funciones</h2>

<p>En javascript todas las funciones son ejecutadas de la misma manera, lo que las diferencia es la forma en la que son evaluadas.</p>

<h3>Funciones por declaración</h3>

<p>A las funciones declaradas el interprete accede en el momento en que son leídas.</p>

<pre lang="javascript">console.log(sum(10, 20));

function sum(a, b) {
    return a + b;
};

</pre>

<h3>Funciones por expresión</h3>

<p>Las funciones por expresión son parte de una asignación, por lo tanto no pueden ser evaluadas hasta que el programa no haga la asignación.</p>

<pre lang="javascript">var sum = function (a, b) {
    return a + b;
};

console.log(sum(10, 20));

</pre>

<h3>Comparación</h3>

<p>A continuación pongo en contraste estos dos tipos de funciones:</p>

<pre lang="javascript">console.log(declaracion())); // => Soy función por declaración

function declaracion() {
    console.log("Soy función por declaración");
};

// -----------------------------

console.log(expresion())); // => "TypeError: Property 'expresion' of object [object Object] is not a function

var expresion = function expresion() {
    console.log("Soy función por expresión");
};

console.log(expresion())); // => Soy función por expresión

</pre>

<hr />

<h2>Alcance</h2>

<p>En javascript el alcance de una variable es el largo de una función. Esto puede sonar un poco confuso o incomprensible, tranquilo/a, como en repetidas veces, se entenderá mejor con un ejemplo</p>

<pre>var a = 100;

// las funciones tienen su propio alcance
;!function() {

  var a = "asdfg5447jmk212bfd";

  console.log(a); // => asdfg5447jmk212bfd
}();


console.log(a); //=> 100

// los bloques
if (a &lt; 50) {
  userId += 30;
}
else {
  a -= 20;
}

console.log(a); // => 80

</pre>

<hr />

<h2>Cierre</h2>

<p>Espero que esta información haya sido de ayuda.</p>

<p>Cualquier comentario o pregunta no dudes en dejarlo en la sección correspondiente más abajo.</p>

<p>Si consideras útil esta entrada, por favor compártela en las redes sociales para hacerla llegar a más personas.</p>

<p>Saludos y hasta la próxima.</p>
