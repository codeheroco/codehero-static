---
layout: post
status: publish
published: true
title: Operadores básicos
author: Carlos Picca
author_login: carlos
author_email: carlospicca@gmail.com
wordpress_id: 3005
wordpress_url: http://codehero.co/?p=3005
date: 2014-02-12 11:22:21.000000000 -04:30
serie: Java desde Cero
dificultad: Novato
duracion: 15
description: Curso en el cual aprenderemos Java desde Cero. Estudiaremos el conjunto más importante de operadores para manipular variables en Java.
categories:
- Cursos
- Java
tags:
- operador
- logico
- aritmeticos
- relacionales
- asignacion
---
<p>Bienvenidos Java desde Cero, curso en el cual aprendemos a programar sin conocimiento alguno. En el capítulo anterior, aprendimos todo lo relacionado con las variables dentro del mundo de Java. Si eres nuevo en este curso, te recomiendo que le eches un vistazo al capítulo anterior para que te pongas en contexto (<a href="http://codehero.co/java-desde-cero-variables/">Capítulo 5 - Variables</a>)</p>

<hr />

<p>Java proporciona un conjunto de operadores para manipular variables. Hoy vamos a ver los operadores mas importantes:</p>

<ul>
<li>Operadores aritméticos.</li>
<li>Operadores relacionales.</li>
<li>Operadores lógicos.</li>
<li>Operadores de asignación.</li>
</ul>

<hr />

<h2>Operadores aritméticos</h2>

<p>Los operadores aritméticos se utilizan en expresiones matemáticas de la misma manera que se utilizan en el álgebra. En la siguiente tabla se muestran los operadores aritméticos:</p>

Operador | Descripción
------------ | -------------
+ | Adición - Suma los valores de los operadores
- | Resta - Resta el operando de la derecha del operador del lado izquierdo
* | Multiplicación - Multiplica los valores de ambos lados del operador
/ | División - Divide el operador del lado izquierdo por el operando de la derecha
% | Módulo - Divide el operando de la izquierda por el operador del lado derecho y devuelve el resto
++ | Incremento - Aumenta el valor del operando en 1
-- | Decremento - Disminuye el valor del operando por 1

<p>Veamos un ejemplo:</p>

```java
public class Curso {

  public static void main(String args[]) {
     int a = 10;
     int b = 20;
     int c = 25;
     int d = 25;
     System.out.println("a + b = " + (a + b) );
     System.out.println("a - b = " + (a - b) );
     System.out.println("a * b = " + (a * b) );
     System.out.println("b / a = " + (b / a) );
     System.out.println("b % a = " + (b % a) );
     System.out.println("c % a = " + (c % a) );
     System.out.println("a++   = " +  (a++) );
     System.out.println("b--   = " +  (a--) );
     // Mira la diferencia entre d++ and ++d
     System.out.println("d++   = " +  (d++) );
     System.out.println("++d   = " +  (++d) );
  }
}
```

<p>Se ejecutamos este codigo deberá producir:</p>

```java
a + b = 30
a - b = -10
a * b = 200
b / a = 2
b % a = 0
c % a = 5
a++   = 10
b--   = 11
d++   = 25
++d   = 27
```

<hr />

<h2>Operadores relacionales</h2>

<p>En Java existen las siguientes operadores relacionales:</p>

Operador | Descripción
------------ | -------------
== | Comprueba si los valores de dos operandos son iguales o no, si sí, entonces condición sea verdadera.
!= | Comprueba si los valores de dos operandos son iguales o no, si los valores no son iguales, entonces la condición se convierte en realidad.
> | Comprueba si el valor del operando de la izquierda es mayor que el valor del operando derecho, si sí, entonces condición sea verdadera.
< | Comprueba si el valor del operando de la izquierda es menor que el valor del operando derecho, si es así, entonces la condición sea verdadera.
>= | Comprueba si el valor del operando de la izquierda es mayor o igual que el valor del operando derecho, si sí, entonces condición sea verdadera.
<= | Comprueba si el valor del operando de la izquierda es menor o igual que el valor del operando derecho, si es así, entonces la condición sea verdadera.

<p>Veamos un ejemplo:</p>

```java
public class Curso {

  public static void main(String args[]) {
     int a = 10;
     int b = 20;
     System.out.println("a == b = " + (a == b) );
     System.out.println("a != b = " + (a != b) );
     System.out.println("a > b = " + (a > b) );
     System.out.println("a < b = " + (a < b) );
     System.out.println("b >= a = " + (b >= a) );
     System.out.println("b <= a = " + (b <= a) );
  }
}
```

<p>Se ejecutamos este codigo deberá producir:</p>

```java
a == b = false
a != b = true
a > b = false
a < b = true
b >= a = true
b <= a = false
```

<hr />

<h2>Operadores lógicos</h2>

<p>En la siguiente tabla se muestran los operadores lógicos:</p>

Operador | Descripción
------------ | -------------
&& | Llamado lógico AND. Si ambos operandos son distintos a cero, entonces la condición sea verdadera.
&#124;&#124; | Llamado operador lógico OR. Si alguno de los dos operados son no cero, entonces la condición sea verdadera.
! | LLamado operador lógico NOT. Utilizado para invertir el estado lógico de su operando. Si una condición es verdadera, entonces el operador NOT será falso.

<p>Veamos un ejemplo:</p>

```java
public class Curso {

  public static void main(String args[]) {
     boolean a = true;  
     boolean b = false;

     System.out.println("a && b = " + (a&&b));

     System.out.println("a || b = " + (a||b) );

     System.out.println("!(a && b) = " + !(a && b));
  }
}
```

<p>Se ejecutamos este codigo deberá producir:</p>

```java
a && b = false
a || b = true
!(a && b) = true
```

<hr />

<h2>Operadores de asignación</h2>

<p>En Java existen las siguientes operadores de asignación:</p>

Operador | Descripción
------------ | -------------
= | Operador de asignación simple. Asigna valores de operados del lado derecho al operando del lado izquierdo.
+= | Añadir y operador de asignación, Añade operando derecho al operando izquierdo y asigna el resultado al operando de la izquierda.
-= | Restar y operador de asignación, se resta el operando derecho del operando de la izquierda y asigna el resultado al operando de la izquierda.
*= | Multiplicar y operador de asignación, se multiplica el operando derecho al operando de la izquierda y asignar el resultado a la izquierda del operando.
/= | Divide y operador de aignación, se divide el operando izquierdo con el operando derecho y asigna el resultado a la izquierda del operando.
%= | Módulo y operado de asignación, se saca el módulo el operando izquierdo con el operando derecho y asignan el resultado al operando de la izquierda.

<p>Veamos un ejemplo:</p>

```java
public class Curso {

  public static void main(String args[]) {
     int a = 10;
     int b = 20;
     int c = 0;

     c = a + b;
     System.out.println("c = a + b = " + c );

     c += a;
     System.out.println("c += a  = " + c );

     c -= a;
     System.out.println("c -= a = " + c );

     c *= a;
     System.out.println("c *= a = " + c );

     a = 10;
     c = 15;
     c /= a ;
     System.out.println("c /= a = " + c );

     a = 10;
     c = 15;
     c %= a;
     System.out.println("c %= a  = " + c );
  }
}
```

<p>Se ejecutamos este codigo deberá producir:</p>

```java
c = a + b = 30
c += a  = 40
c -= a = 30
c *= a = 300
c /= a = 1
c %= a  = 5
```

<hr />

<h2>Conclusión</h2>

<p>En esta lección, vimos el conjunto más importante de operadores para manipular variables en Java. Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso.</p>

<p>¡Te espero la próxima semana!</p>
