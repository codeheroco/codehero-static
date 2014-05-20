---
layout: post
status: publish
published: true
title: Bucles
author: Carlos Picca
author_login: carlos
author_email: carlospicca@gmail.com
wordpress_id: 3060
wordpress_url: http://codehero.co/?p=3060
date: 2014-02-26 01:31:15.000000000 -04:30
serie: Java desde Cero
dificultad: Novato
duracion: 15
description: Curso en el cual aprenderemos Java desde Cero. Estudiaremos que existen cuatro tipos de bucles (Loops) en Java. (while, for, do..while, for mejorado).
categories:
- Cursos
- Java
tags:
- while
- for
- java
- bucles
- do
- mejorado
---
<p>Bienvenidos Java desde Cero, curso en el cual aprendemos a programar sin conocimiento alguno. En el capítulo anterior, aprendimos que existen dos tipos de sentencias de decisiones en Java (If y Switch). Si eres nuevo en este curso, te recomiendo que le eches un vistazo al capítulo anterior para que te pongas en contexto (<a href="http://codehero.co/java-desde-cero-sentencias-if-y-switch/">Capítulo 7 - Sentencias If y Switch</a>)</p>

<hr />

<p>Hoy vamos a ver que existen cuatro tipos de bucles (Loop) en Java. Veamos cuales son:</p>

<ul>
<li>El bucle <strong>while</strong>.</li>
<li>El bucle <strong>do...while</strong>.</li>
<li>El bucle <strong>for</strong>.</li>
<li>El bucle <strong>for mejorado</strong>.</li>
</ul>

<hr />

<h2>El bucle while</h2>

<p>Un bucle while es una estructura de control que le permite repetir una tarea un número determinado de veces. Veamos su sintaxis:</p>

```java
while(expresion_booleana)
{
   //Bloque de código
}
```

<blockquote>
  <p>Cuando se ejecuta, si el resultado <code>expresion_booleana</code> es cierto, entonces se ejecutarán las acciones dentro del bucle. Esto continuará siempre y cuando el resultado de la expresión es verdadera. Cuando la expresión se prueba y el resultado es falso, el cuerpo del bucle se omitirá y la primera sentencia después del bucle while se ejecutará.</p>
</blockquote>

<p>Veamos un ejemplo:</p>

```java
public class Curso {

   public static void main(String args[]) {
      int x = 20;

      while( x < 30 ) {
         System.out.print(“valor de x : " + x );
         x++;
         System.out.print("\n");
      }
   }
}
```

<p>Si ejecutamos el código anterior debemos esperar el siguiente resultado:</p>

```java
valor de x : 20
valor de x : 21
valor de x : 22
valor de x : 23
valor de x : 24
valor de x : 25
valor de x : 26
valor de x : 27
valor de x : 28
valor de x : 29
```

<hr />

<h2>El bucle do...while</h2>

<p>Un bucle do...while es similar a un bucle while, excepto que este está garantizando ejecutar al menos una vez el bloque de código. Veamos su sintaxis:</p>

```java
do
{
   //Bloque de código
} while(expresion_booleana)
```

<blockquote>
  <p>Observe que la <code>expresion_booleana</code> aparece al final del bucle, por lo que las instrucciones del bucle ejecutar una vez antes de que el booleano es probado. Si la expresión booleana es verdadera, el flujo de control vuelve al <strong>do</strong>, y las instrucciones del bucle se vuelve a ejecutar. Este proceso se repite hasta que la expresión booleana es falsa.</p>
</blockquote>

<p>Veamos un ejemplo:</p>

```java
public class Curso {

   public static void main(String args[]){
      int x = 20;

      do{
         System.out.print("valor de x : " + x );
         x++;
         System.out.print("\n");
      }while( x < 30 );
   }
}
```

<p>Si ejecutamos el código anterior debemos esperar el siguiente resultado:</p>

```java
valor de x : 20
valor de x : 21
valor de x : 22
valor de x : 23
valor de x : 24
valor de x : 25
valor de x : 26
valor de x : 27
valor de x : 28
valor de x : 29
```

<hr />

<h2>El bucle for</h2>

<p>Un bucle for es una estructura de control de repetición que permite escribir de manera eficiente un bucle que es necesario ejecutar un número determinado de veces. Un bucle <strong>for</strong> es útil cuando se sabe cuántas veces una tarea se va a repetir. Veamos su sintaxis:</p>

```java
for(inicializacion; expresion_booleana; actualizacion)
{
   //Bloque de código
}
```

<p>Veamos un ejemplo:</p>

```java
public class Curso {

 public static void main(String args[]) {

      for(int x = 20; x < 30; x++) {
         System.out.print("valor de x : " + x );
         System.out.print("\n");
      }
   }
}
```

<p>Si ejecutamos el código anterior debemos esperar el siguiente resultado:</p>

```java
valor de x : 20
valor de x : 21
valor de x : 22
valor de x : 23
valor de x : 24
valor de x : 25
valor de x : 26
valor de x : 27
valor de x : 28
valor de x : 29
```

<blockquote>
  <p>La etapa de <strong>inicialización</strong> se ejecuta en primer lugar, y sólo una vez. Este paso le permite declarar e inicializar las variables de control del bucle.</p>

  <p>A continuación, se evalúa la <code>expresion_booleana</code>. Si bien es cierto, se ejecuta el cuerpo del bucle. Si es falsa, el cuerpo del bucle no se ejecuta y el flujo de control salta a la siguiente instrucción más allá del bucle for.</p>

  <p>Después de que el cuerpo del bucle se ejecuta para el flujo de control salta de nuevo a la instrucción de <strong>actualización</strong>. Esta declaración le permite actualizar las variables de control del bucle.</p>
</blockquote>

<hr />

<h2>El bucle for mejorado</h2>

<p>El bucle for mejorado se introdujo con la llegada de Java 5. Este se utiliza principalmente para el manejo de arrays. Veamos su sintaxis:</p>

```java
for(declaracion : expresion)
{
   //Bloque de código
}
```

<blockquote>
  <ul>
  <li><p><strong>Declaración</strong>: La variable de bloque recién declarado, que es de un tipo compatible con los elementos del array que está accediendo. La variable estará disponible dentro del bloque para y su valor sería el mismo que el elemento dentro del array.</p></li>
  <li><p><strong>Expresión</strong>: Esta se evalúa como el array que se tiene que recorrer. La expresión puede ser una variable de tipo array o una llamada al método que devuelve un array.</p></li>
  </ul>
</blockquote>

<p>Veamos un ejemplo:</p>

```java
public class Curso {

   public static void main(String args[]){

      String [] empleados = {"Carlos", "Oscar", "Jony", “Alberto”, “Ramses”};
      for(String nombre : empleados) {
         System.out.print(nombre);
         System.out.print(",");
      }
   }
}
```

<p>Si ejecutamos el código anterior debemos esperar el siguiente resultado:</p>

```java
Carlos,Oscar,Jony,Alberto,Ramses,
```

<blockquote>
  <p>Si por casualidad no sabes como compilar y probar los ejemplos de este curso con Java te recomiendo que le eches un vistazo a <a href="http://codehero.co/java-desde-cero-instalacion-configuracion/">Como compilar y ejecutar un código en Java</a></p>
</blockquote>

<hr />

<h2>Conclusión</h2>

<p>En esta lección, vimos que existen cuatro tipos de bucles (Loop) en Java. (while, for, do..while, for mejorado). Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso.</p>

<p>¡Te espero la próxima semana!</p>
