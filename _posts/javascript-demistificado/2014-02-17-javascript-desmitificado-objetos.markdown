---
layout: post
status: publish
published: true
title: Objetos
author: Oscar González
author_login: oscar
author_email: gonzalezgreco@gmail.com
author_url: http://www.oscarvgg.com
date: 2014-02-17 00:31:43.000000000 -04:30
serie: Javascript Desmitificado
dificultad: Aprendiz
duracion: 30
description: El enfoque orientado a objetos de JavaScript es un poco diferente al que podemos ver en otros lenguajes. Hay objetos, pero no clases. veamos a profundo.
categories:
- Cursos
- JavaScript
tags:
- Objetos
- clases
- desde cero
- metodos
- herencia
---
<p>Creo que no tengo que empezar esta serie definiedo JavaScript, porque en realidad cualquier persona interesada en el mundo del software "sabe" o programa javascript. Y hago mal uso gramatical de las comillas para decir "sabe", porque este lenguaje es tan usado mundialmente que cualquier persona puede agregar en su curriculum que programa JavaScript. Lo cierto es que es muy fácil creer que Javascript es solo para manipular documentos HTML, yo lo creía, hasta que decidí tomármelo en serio.</p>

<p>Antes de empezar veamos un poco de background.</p>

<hr />

<h2>Historia</h2>

<p>Javascript apareció por primera vez al público como parte del explorador Netscape Navigator 2.0 en 1996. Y luego, al año siguiente, fue estandarizado por ECMA International llamándolo ECMAScript.</p>

<p>Lo que conocemos como JavaScript hoy en día es una implementación de la especificación de lenguaje ECMAScript, de la cual cambien derivan lenguajes como ActionScript,  JScript, TypeScript, etc.</p>

<p>La especificación de ECMAScript cambia con el tiempo, introduciendo soluciones a viejos problemas y soporte para nuevas tecnologías.</p>

<p>Javascript es un lenguaje de scripting y a la vez orientado a objetos, que aunque su nombre incluye "Java" no tiene nada o poco que ver con el lenguaje Java, de hecho, inicialmente iba a llamarse LifeScript, pero tras los acuerdos entre Sun Microsystems y Netscape decidieron llamarlo JavaScript para mercadearlo como un complemento de scripting del lenguaje Java.</p>

<p>A pesar de que inicialmente fue pensado como un lenguaje de scripting para exploradores hoy podemos ver JavaScript del lado del servidor con Node.js</p>

<p>Entonces, como todo el mundo "sabe" JavaScript no voy a empezar esta serie explicando cosas básicas como crear variables, operaciones, condicionales o ciclos. Vamos directo a lo que nos interesa.</p>

<hr />

<h2>Objetos</h2>

<p>El enfoque orientado a objetos de JavaScript es un poco diferente al que podemos ver en otros lenguajes que implementan el paradigma.</p>

<p>Existen tres maneras de hacer una instancia de un objeto en javascript:</p>

<ul>
<li>La forma literal: <code>var x = {};</code>. Con esto creamos un objeto vacío.</li>
<li>Utilizando el operador new: <code>var x = new Object();</code>.</li>
<li>Utilizando la función create: <code>baz = Object.create(null);</code>.</li>
</ul>

<p>A continuación explico las diferencias de crear objetos con estas tres formas diferentes.</p>

<h3>Objetos literales</h3>

<p>La forma literal es permite describir objetos de manera clara y compacta. Puedes describir objetos entre llaves con propiedades separadas por comas. Esta forma no es invocada explícitamente, es solo un atajo para usar el método <code>Object.create()</code>.</p>

<pre lang="javascript">
var card = {
    name: 'Oscar'
};
var card2 = Object.create(Object.prototype, {
    bar: {
        name: 'Oscar'
} });

console.log(card.bar); // -> Oscar

console.log(card2.bar); // -> Oscar
</pre>

<p>Por ser tan simple la forma literal es que el constructor del objeto no puede ser redefinido, de modo que no se puede definir un objeto cuyo prototipo sea diferente al por defecto. Ya explicaré lo que es el prototipo más adelante.</p>

<h3>Objetos con operador new</h3>

<p>El operador <code>new</code> crea una instancia de un objeto. Este acepta un constructor y una serie de argumentos opcionales.</p>

<pre lang="javascript">
var Person = function (name) {
    this.name = name || '';
};

var sinNombre = new Person();
var oscar = new Person('Oscar');
</pre>

<p>Veamos lo que hace intrínsecamente este operador (new):</p>

<ol>
<li>Se crea el objeto nuevo.</li>
<li>Se conecta el constructor del nuevo objeto a la función Person.</li>
<li>Se conecta el prototipo del objeto Object con Person.prototype.</li>
<li>Se asigna cualquier argumento pasado a la función al objeto creado.</li>
</ol>

<p>Este enfoque le da al lenguaje un estilo de "clases" que confunde a mucha gente, porque realmente no existen las clases en Javascript como las conocemos en otros lenguajes como Java, C#, Objective-C. En Javascript hay solo objetos que pueden ser extendidos.</p>

<h3>Objetos con Object.create()</h3>

<p>Esta forma fue introducida en ECMAScript 5. Basicamente hace lo mismo que la forma con el operador <code>new</code>, solo que esta tiene sintaxis más consistente con el resto del lenguaje, ademas de facilitar la herencia por prototipo.</p>

<pre lang="javascript">
var Person = {
  introduce: function(age) {
        console.log( 'Hola, mi nombre es ' + this.name + ' y tengo ' + age + ' años de edad');
   }
};

var oscar = Object.create(Person, {
    'name': {
      value: 'Oscar'
    }
});


oscar.introduce(26);
</pre>

<blockquote>
  <p>realmente no existen las clases en Javascript como las conocemos en otros lenguajes (...) hay solo objetos que pueden ser extendidos</p>
</blockquote>

<h3>Extendiendo objetos</h3>

<p>JavaScript es un lenguaje muy flexible. Permite agregar funciones y propiedades a objetos de manera dinámica sin mucho esfuerzo.</p>

<pre>
var Person = function (name) {

  this.name = name || '';

  this.introduce = function() {
    return 'Hola, mi nombre es ' + this.name;
  };
};

// Creando una nueva persona
var oscar = new Person('Oscar');

// Agregando atributo nuevo
oscar.lastname = 'González';

// Agregando una función nueva
oscar.introduceFull = function () {
  return this.introduce() + ' ' + this.lastname;
};

console.log(oscar.introduceFull()); // -> "Hola, mi nombre es Oscar González"
</pre>

<p>Esta es una manera de expresar herencia de objetos. Un tanto extraño porque estamos acostumbrados a herencia de clases.</p>

<h3>Prototipos</h3>

<p>Los prototipos permiten conectar entre si a los objetos. JavaScript usa una cadena de prototipos, de manera que, cuando intentas hacer una referencia una propiedad, se viaja a través de la cadena hasta alcanzar la en la conexión correcta. Se puede acceder al prototipo de un objeto de la siguiente manera:</p>

<ul>
<li>Person.prototype define el prototipo para un objeto instanciado con el operador <code>new</code></li>
<li>Object.getPrototypeOf(oscar) retorna el prototipo de un objeto</li>
</ul>

<pre lang="javascript">
var Person = function (name) {

  this.name = name || '';
};

var oscar = new Person('Oscar');
var pepe = new Person('Pepe');

// Definiendo una función por el prototipo afecta todas las instancias de un objeto
Person.prototype.introduce = function() {
  return 'Hola, mi nombre es ' + this.name;
};

console.log(oscar.introduce());
console.log(pepe.introduce());

// Definir una función con el mismo nombre solo afecta al objeto localmente
oscar.introduce = function() {
  return 'Hola, mi nombre alreves es ' + this.name.split("").reverse().join("");
};

console.log(oscar.introduce());
console.log(pepe.introduce());

// no afecta porque las propiedades locales tienen preferencia
Person.prototype.name = 'Jose';

console.log(oscar.introduce());
console.log(pepe.introduce());
</pre>

<h3>Propiedades y métodos privados</h3>

<p>En ejemplos anteriores hemos visto como se crean propiedades y métodos públicos. Veamos ahora los privados.</p>

<pre>
var Person = function (name) {

  // propiedad pública
  this.name = name || '';

  // propiedad privada
  var lastname = 'González';

  // propiedad privada
  var myName = this.name;

  // método privado
  var fullName = function () {
    return myName + ' ' + lastname;
  }

  // método público
  this.introduce = function() {
    return 'Hola, mi nombre es ' + fullName();
  };

};

var oscar = new Person('Oscar');

console.log(oscar.name); // -> "Oscar"
console.log(oscar.introduce());// -> "Hola, mi nombre es Oscar González"
console.log(oscar.lastname); // -> undefined
console.log(oscar.fullName()); // Error: -> "Object [object Object] has no method 'fullName'"
</pre>

<hr />

<h2>Conclusión</h2>

<p>En este tutorial he presentado los fundamentos de los objetos en JavaScript. Por supuesto que todavía se puede decir mucho más sobre el tema, pero pasaríamos días hablando. Con esto es mas que suficiente para estar, como dicen, "up and running" con el paradigma POO en JavaScript.</p>

<p>Dudas o comentarios pueden ser dejados en la sección correspondiente más abajo.</p>

<p>Si te ha gustado esta publicación, ayudamos compartiéndola en tus redes sociales favoritas.</p>

<p>Saludos.</p>
