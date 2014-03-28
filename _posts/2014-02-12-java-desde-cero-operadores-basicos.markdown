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

<p><img src="http://i.imgur.com/mq98l96.png" alt="aritmeticos" /></p>

<p>Veamos un ejemplo:</p>

<pre lang='java'>
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
</pre>

<p>Se ejecutamos este codigo deberá producir:</p>

<pre>
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
</pre>

<hr />

<h2>Operadores relacionales</h2>

<p>En Java existen las siguientes operadores relacionales:</p>

<p><img src="http://i.imgur.com/RrfSePS.png" alt="relacionales" /></p>

<p>Veamos un ejemplo:</p>

<pre lang='java'>
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
</pre>

<p>Se ejecutamos este codigo deberá producir:</p>

<pre>
a == b = false
a != b = true
a > b = false
a < b = true
b >= a = true
b <= a = false
</pre>

<hr />

<h2>Operadores lógicos</h2>

<p>En la siguiente tabla se muestran los operadores lógicos:</p>

<p><img src="http://i.imgur.com/iC44VCq.png" alt="logicos" /></p>

<p>Veamos un ejemplo:</p>

<pre lang='java'>
public class Curso {

  public static void main(String args[]) {
     boolean a = true;  
     boolean b = false; 

     System.out.println("a && b = " + (a&&b));

     System.out.println("a || b = " + (a||b) );

     System.out.println("!(a && b) = " + !(a && b));
  }
} 
</pre>

<p>Se ejecutamos este codigo deberá producir:</p>

<pre>
a && b = false
a || b = true
!(a && b) = true
</pre>

<hr />

<h2>Operadores de asignación</h2>

<p>En Java existen las siguientes operadores de asignación:</p>

<p><img src="http://i.imgur.com/mDuf4qU.png" alt="asignacion" /></p>

<p>Veamos un ejemplo:</p>

<pre lang='java'>
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
</pre>

<p>Se ejecutamos este codigo deberá producir:</p>

<pre>
c = a + b = 30
c += a  = 40
c -= a = 30
c *= a = 300
c /= a = 1
c %= a  = 5
</pre>

<hr />

<h2>Conclusión</h2>

<p>En esta lección, vimos el conjunto más importante de operadores para manipular variables en Java. Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso.</p>

<p>¡Te espero la próxima semana!</p>
