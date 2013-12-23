---
layout: post
status: publish
published: true
title: Sintaxis básica
author: Carlos Picca
author_login: carlos
author_email: carlospicca@gmail.com
wordpress_id: 2870
wordpress_url: http://codehero.co/?p=2870
date: 2013-12-18 01:20:10.000000000 -04:30
categories:
- Cursos
- Java
tags:
- app
- java
- sintaxis
- basica
---
<p>Bienvenidos Java desde Cero, curso en el cual aprendemos a programar sin conocimiento alguno. En el capítulo anterior, aprendimos una introducción a Java, sus beneficios y vamos a crear nuestra primera app. Si eres nuevo en este curso, te recomiendo que le eches un vistazo al capítulo anterior para que te pongas en contexto (<a href="http://codehero.co/java-desde-cero-instalacion-configuracion/">Capítulo 1 - Instalación &amp; Configuración</a>)</p>

<p>Hoy, vamos a ver todo lo relacionado a la sintaxis básica que posee Java a la hora de desarrollar una aplicación.</p>

<hr />

<h2>Sintaxis básica</h2>

<p>Cuando desarrollamos un programa en Java es muy importante tener en cuenta los siguientes puntos:</p>

<ul>
<li><p><strong>Sensibilidad a mayúsculas</strong> - Java es sensible a mayúsculas, lo que significa que si poseemos un identificador llamado <em>Hola</em> y <em>hola</em> tendrían valores diferente.</p></li>
<li><p><strong>Nombres de las clases</strong> - Para todos los nombres de clases la primera letra debe estar en mayúsculas. Si quieres usar varias palabras para formar un nombre, la primera letra de cada palabra interior debe estar en mayúsculas.</p></li>
</ul>

<pre lang="java">class miPrimeraClase</pre>

<ul>
<li><strong>Nombres de los métodos</strong> - Todos los nombres de los métodos deben comenzar con una letra minúscula. Si se quieres usar varias palabras para formar el nombre de un método, la primera letra de cada palabra interior debe estar en mayúsculas .</li>
</ul>

<pre lang="java">public void miPrimerMetodo()</pre>

<ul>
<li><strong>Nombre de archivo del programa</strong> - El nombre del archivo de programa debe coincidir exactamente con el nombre de la clase.</li>
</ul>

<p>Al guardar un archivo, debemos guardarlo con el nombre de clase (Recuerda que Java distingue entre mayúsculas y minúsculas) y añadir '.java' al final del nombre (si el nombre del archivo y el nombre de clase no coinciden el programa no compilará).</p>

<p>Ejemplo: Supongamos que 'MiPrimerPrograma' es el nombre de la clase. Luego el archivo debe ser guardado como 'MiPrimerPrograma.java'</p>

<ul>
<li><strong>public static void main(String args[])</strong> - la ejecución de un programa en Java se inicia desde el método main( ), por lo cual es una parte obligatoria del desarrollo.</li>
</ul>

<hr />

<h2>Identificadores</h2>

<p>Todos los componentes en Java requieren nombres. Los nombres usados ​​para las clases, variables y métodos se denominan identificadores.</p>

<p>Existen varios puntos que debemos recordar acerca de los identificadores:</p>

<ul>
<li><p>Todos los identificadores deben comenzar con una letra (<em>A</em> a <em>Z</em> o de la <em>a</em> a <em>z</em>), el carácter de moneda ($) o un guión bajo (_).</p></li>
<li><p>Una palabra clave no se puede utilizar como un identificador .</p></li>
<li><p>Los identificadores distinguen entre mayúsculas y minúsculas.</p></li>
<li><p>Ejemplos de identificadores legales: edad, $salario, _valor, __1_valor.</p></li>
<li><p>Ejemplos de identificadores ilegales : 123abc , -salario.</p></li>
</ul>

<hr />

<h2>Modificadores</h2>

<p>Al igual que otros lenguajes de programación, en Java es posible modificar las clases, métodos, etc..., mediante el uso de modificadores. Existen dos categorías de modificadores:</p>

<ul>
<li><p><strong>De acceso:</strong> default, public , protected, private.</p></li>
<li><p><strong>De no acceso:</strong> final, abstract.</p></li>
</ul>

<blockquote>
  <p>Tranquilo si estas un poco perdido mas adelante vamos a ver estos puntos a mayor detalle.</p>
</blockquote>

<hr />

<h2>Variables</h2>

<p>En Java existen los siguientes tipos de variables:</p>

<ul>
<li>Variables locales.</li>
<li>Variables de clase (variables estáticas).</li>
<li>Variables de instancia (variables no estáticas).</li>
</ul>

<blockquote>
  <p>Tranquilo si estas un poco perdido mas adelante vamos a ver estos puntos a mayor detalle.</p>
</blockquote>

<hr />

<h2>Arrays</h2>

<p>Los arrays son objetos que almacenan múltiples variables del mismo tipo. Sin embargo, un array en sí es un objeto.</p>

<blockquote>
  <p>Tranquilo en los próximos capítulos veremos cómo declararlo, construirlo e inicializarlo.</p>
</blockquote>

<hr />

<h2>Enum</h2>

<p>Las enumeraciones se introdujeron en java 5.0. Estas restringen una variable a tener solo unos valores predefinidos. Con el uso de enumeraciones que es posible reducir el número de errores en el código.</p>

<p>Por ejemplo, si tenemos queremos hacer una aplicación en donde podamos ordenar tipos de jugos frescos, sería posible limitar el tamaño del jugo en pequeño, mediano y grande con la ayuda de los enum.</p>

<pre lang="java">
class Jugo {

   enum JugoTamano { PEQUENO, MEDIANO, GRANDE }
   JugoTamano tamano;
}

public class JugoPrueba {

   public static void main(String args[]){
      Jugo jugo = new Jugo();
      jugo.tamano = Jugo.JugoTamano.MEDIANO ;
      System.out.println("Tamaño del jugo: " + jugo.tamano);
   }
}
</pre>

<p>Si compilamos y ejecutamos el programa anterior debería devolvernos:</p>

<pre>
Tamaño del jugo: MEDIANO
</pre>

<blockquote>
  <p>Los enum se pueden declarar dentro o fuera de una clase.</p>
  
  <p>Tranquilo si estas un poco perdido mas adelante vamos a ver estos puntos a mayor detalle.</p>
</blockquote>

<hr />

<h2>Palabras clave</h2>

<p>La siguiente lista muestra las palabras reservadas de Java. Estas palabras reservadas no se pueden utilizar como constante o variable o cualquier otro nombre de identificador.</p>

<ul>
<li>abstract</li>
<li>assert</li>
<li>boolean</li>
<li>break</li>
<li>byte</li>
<li>case</li>
<li>catch</li>
<li>char</li>
<li>class</li>
<li>const</li>
<li>continue</li>
<li>default</li>
<li>do</li>
<li>double</li>
<li>else</li>
<li>enum</li>
<li>extends</li>
<li>final</li>
<li>finally</li>
<li>float</li>
<li>for</li>
<li>goto</li>
<li>if</li>
<li>implements</li>
<li>import</li>
<li>instanceof</li>
<li>int</li>
<li>interface</li>
<li>long</li>
<li>native</li>
<li>new</li>
<li>package</li>
<li>private</li>
<li>protected</li>
<li>public</li>
<li>return</li>
<li>short</li>
<li>static</li>
<li>strictfp</li>
<li>super</li>
<li>switch</li>
<li>synchronized</li>
<li>this</li>
<li>throw</li>
<li>throws</li>
<li>transient</li>
<li>try</li>
<li>void</li>
<li>volatile</li>
<li>while     </li>
</ul>

<hr />

<h2>Comentarios</h2>

<p>Java soporta una o varias líneas de comentarios. Es muy similar a los comentarios que podemos encontrar en C y C++. Todos los caracteres disponibles dentro de cualquier comentario son ignorados por el compilador.</p>

<pre lang="java">
public class MiPrimerPrograma{

   /* Este es mi primer programa
    * Esto va a imprimir "Hola Mundo"
    * Un ejemplo de un comentario multi-linea
    */

    public static void main(String []args){
       // Un ejemplo de un comentario de una linea
       /* Este también es un ejemplo de un comentario de una linea */
       System.out.println("Hola Mundo"); 
    }
} 
</pre>

<hr />

<h2>Herencia</h2>

<p>En Java, las clases pueden ser derivados de clases. Básicamente, si necesitamos crear una nueva clase y tenemos una clase que tiene una parte del código que necesitamos, entonces es posible derivar la nueva clase a partir del código ya existente.</p>

<p>Este concepto permite reutilizar los campos y métodos de la clase existente sin tener que volver a escribir el código de una nueva clase. En este escenario la clase existente se llama la superclase y la clase derivada se llama la subclase.</p>

<hr />

<h2>Interfaces</h2>

<p>En Java, una interfaz se puede definir como un contrato entre los objetos sobre la forma como se van a comunicar entre sí. Las interfaces juegan un papel fundamental cuando se trata de el concepto de herencia.</p>

<p>Una interfaz define los métodos que una clase derivada (subclase) debe utilizar. Pero la puesta en práctica de los métodos es totalmente de la subclase.</p>

<blockquote>
  <p>Tranquilo si estas un poco perdido mas adelante vamos a ver estos puntos a mayor detalle.</p>
</blockquote>

<hr />

<h2>Conclusión</h2>

<p>En esta lección, vimos todo lo relacionado a la sintaxis básica que posee Java a la hora de desarrollar una aplicación. Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso.</p>

<p>¡Te espero la próxima semana!</p>
