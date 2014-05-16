---
layout: post
status: publish
published: true
title: Coerción parte 1
author: Oscar González
author_login: oscar
author_email: gonzalezgreco@gmail.com
author_url: http://www.oscarvgg.com
date: 2014-03-31 00:00:00.000000000 -04:30
serie: JavaScript Desmitificado
dificultad: Heroe
duracion: 10
description: Hoy les voy a hablar de uno de los temas más profundos y menos comentados de Javascript, la coerción.
categories:
- Cursos
- JavaScript
tags:
- desde cero

---
<p>Hoy les voy a hablar de uno de los temas más profundos y menos comentados de Javascript, la coerción.</p>
<p>Según el diccionario de la Real Academia Española, la coerción es la "presión ejercida sobre alguien para forzar su voluntad o su conducta", también se entiende por "represión, inhibición, restricción". En el caso de Javascript se explica como la acción de forzar a los objetos de un tipo a actuar como si fueran de otro. Esto no debe ser confundido con conversión de tipos, que es la conversión explícita de un tipo de dato en otro.</p>
<p>Lo más singular es que Javascript aplica coerción frente a nuestras narices sin nosotros darnos cuenta. Veamos algunos casos comunes, en los que esto ocurre:</p>
<hr />
<h2>Coerción a String</h2>
<p>Para concatenar strings usamos el operador unitario (+, -, *, /), incluso lo usamos para concatenar strings con variables numéricas o números explícitos para formar mensajes más complejos.</p>
```javascript
console.log('Tengo ' + 10 + ' elefantes'); // => Tengo 10 elefantes
```

<p>En este caso Javascript forza al 10 a actuar como un string. Esto suena muy simple dicho de esta manera, el funcionamiento interno es el siguiente: Javascript llama a la función <code>toString()</code>. Esta función es parte de todos los objetos en Javascript ya que es heredada de Object. Si <code>toString()</code> no es capaz de retornar una representación primitiva (en este caso string), difiere la llamada a la función <code>valueOf()</code>, también heredada de Object. Si esta tampoco es capaz de retornar una representación primitiva, entonces lanza una "TypeError Exception".</p>
<hr />
<h2>Coerción a Numero</h2>
<p>Seguimos con más aplicaciones mágicas del operador unario. El trabajo de este operador es convertir a numero el operando que le sigue.</p>
```javascript
console.log(+'50'); // => 50
console.log(3 * '10'); // => 30
console.log(5 - '10'); // => -5
```

<p>Y al igual que la conversión de string se basa en la interacción con los métodos toString() o valueOf(), sin embargo en este caso los llama al revés, primero a <code>valueOf</code> y luego a <code>toString()</code>.</p>
<hr />
<h2>Coerción de acuerdo al contexto</h2>
<p>Algunos objetos en javascript pueden ser forzados a trabajar con operadores unarios.</p>
<p>Utilizando los métodos <code>valueOf()</code> y <code>toString()</code> el objeto siendo forzado retorna un valor que tenga sentido según sea su aplicación.</p>
<p>El ejemplo más famoso es el del objeto <code>Date</code>.</p>
```javascript
console.log(+new Date()); // => 1396200768041
console.log(20 + +new Date()); // => 1396200768061
```

<p>Este caso puede ser util para realizar operaciones, sin embargo hay ocasiones en las que es más util una representación en string.</p>
```javascript
console.log('La fecha de hoy es: ' + new Date()); // => 'La fecha de hoy es: Sun Mar 30 2014 13:09:26 GMT-0430 (VET)'
```

<p>Entonces, los objetos forzados tienen la capacidad de retornar un valor según el contexto en el que se encuentren. En este caso, un valor numérico cuando utiliza en operaciones numéricas, y una representación en string para concatenación con strings.</p>
<hr />
<h2>Coercion de objetos propios</h2>
<p>Tal cual como se forza el objeto Date, se debería poder hacer con los objetos creados por uno mismo. Resulta no ser tan fácil.</p>
```javascript
var Song = function (name, duration) {
  this.name = name;
  this.duration = duration;
};

var mySong = new Song('R U Mine', 202);


console.log(+mySong); // => NaN
console.log("Duración: " + dollar); // => Duración: [object Object]

// Ninguna de las dos representaciones es util.
// Sobreescribamos toString() y valueOf()

Song.prototype.toString = function () {
  return this.name;
};

Song.prototype.valueOf = function () {
  return this.duration;
};

console.log(+mySong); // => 202
console.log(mySong + ''); // => 202
console.log([mySong] + ''); // 'R U Mine'
```

<p>¿Por qué <code>mySong + ''</code> retorna el resultado de <code>typeOf()</code> en lugar del resultado de <code>toString()</code>?.</p>
<p>Javascript tiene problemas para poder determinar el valor por defecto de un objeto, necesita un indicio para poder decantar por un tipo, si no, asume que necesitas un numero. Es por eso que colocándolo entre corchetes (indicio) lo forza a string.</p>
<hr />
<h2>Comparación de tipos con coerción</h2>
<p>El operador igual (=) también puede forzar los objetos a tipos primitivos mediante la prueba de equidad.</p>
<p>El presente ejemplo es extraído del libro "Expert Javascript" de Mark Daggett.</p>
```javascript
console.log([1] == 1); // => true

console.log([1] == "1"); // => true

console.log([{
    toString: function () {
        return 1;
}
}] == "1"); // => true

console.log([1] === 1); // => false

console.log([1] === "1"); // => false

console.log([{
  toString: function () {
    return 1;
  }
}] === "1"); // => false
```

<hr />
<h2>Cierre</h2>
<p>En la próxima parte veremos otros tipos más complejos de coercion, por ahora me despido con lo que tenemos hasta aquí.</p>
<p>Hasta la próxima.</p>
