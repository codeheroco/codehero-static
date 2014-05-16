---
layout: post
status: publish
published: true
title: String
author: Carlos Picca
author_login: carlos
author_email: carlospicca@gmail.com
wordpress_id: 3092
wordpress_url: http://codehero.co/?p=3092
date: 2014-03-05 00:25:37.000000000 -04:30
categories:
- Cursos
- Java
tags:
- string
- java
- printf
- length
- concat
---
<p>Bienvenidos Java desde Cero, curso en el cual aprendemos a programar sin conocimiento alguno. En el capítulo anterior, aprendimos que existen cuatro tipos de bucles (Loop) en Java (while, for, do..while, for mejorado). Si eres nuevo en este curso, te recomiendo que le eches un vistazo al capítulo anterior para que te pongas en contexto (<a href="http://codehero.co/java-desde-cero-bucles/">Capítulo 8 - Bucles</a>)</p>

<hr />

<p>Hoy vamos a ver todo lo relacionado al manejo de la clase String dentro de Java.</p>

<h2>¿Qué es un String?</h2>

<p>Los Strings son una secuencia de caracteres. En el lenguaje de programación Java, las cadenas de caracteres son objetos y la plataforma proporciona la clase <code>String</code> para crear y manipular dichas cadenas.</p>

<hr />

<h2>¿Cómo creamos un String?</h2>

<p>La forma más fácil para crear un <strong>String</strong> es la siguiente:</p>

<pre lang=‘java’>
String nombre = “¡Codehero!";
</pre>

<blockquote>
  <p>Cada vez que se encuentra con una cadena de caracteres en el código, el compilador crea un objeto <code>String</code> con su valor, en este caso, “¡Codehero!'.</p>
</blockquote>

<p>Al igual que con cualquier otro objeto en Java, podemos crear objetos <code>String</code> mediante la palabra clave <code>new</code> y un constructor de nuestra preferencia. La clase <code>String</code> tiene once constructores que nos pueden ayudar a proporcionar el valor inicial de la cadena de caracteres usando diferentes fuentes. Veamos un ejemplo del uso apropiado de uno de esos constructores. En el siguiente caso vamos a construir un <strong>String</strong> a partir de una array con caracteres.</p>

<pre lang=‘java’>
public class Ejemplo{

   public static void main(String args[]){
      char[] arrayCaracteres = { 'c', 'a', 'r', 'l', 'o', 's'};
      String nombre = new String(arrayCaracteres);  
      System.out.println(nombre);
   }
}
</pre>

<p>Si ejecutamos el código anterior deberíamos obtener lo siguiente:</p>

<pre>
carlos
</pre>

<blockquote>
  <p>La clase String es inmutable, por lo que una vez que se crea un objeto String no se puede cambiar. Si hay una necesidad de hacer una gran cantidad de modificaciones a las cadenas de caracteres, entonces debes usar las siguientes clases <strong>String Buffer</strong> y <strong>String Builder</strong>.</p>
  
  <p>No te preocupes si no manejas bien los constructores. Estos los vamos a estar explicando mas adelante en la serie.</p>
</blockquote>

<p>Ahora veamos los métodos mas usados del día a día dentro de la clase String en Java:</p>

<hr />

<h2>Length</h2>

<p>Length o longitud es uno de los métodos mas usados dentro de la clase String y sirve para conocer el número de caracteres que contiene un objeto String.</p>

<blockquote>
  <p>Los métodos son funciones usadas dentro del lenguaje de Java para obtener información sobre un objeto.</p>
</blockquote>

<p>Veamos un ejemplo de como usar este método:</p>

<pre lang=‘java’>
public class Ejemplo{

   public static void main(String args[]) {
      String frase = “Hola mundo”;
      int longitud = frase.length();
      System.out.println( “La longitud de la frase es: " + longitud );
   }
}
</pre>

<p>Si ejecutamos el código anterior deberíamos obtener lo siguiente:</p>

<pre>
La longitud de la frase es: 10
</pre>

<hr />

<h2>Concat</h2>

<p>La clase String incluye un método para la concatenación de dos cadenas de caracteres. Ese método se llama <code>concat()</code>. Veamos la sintaxis:</p>

<pre lang=‘java’>
cadena_caracteres_1.concat(cadena_caracteres_2);
</pre>

<p>Esto devolvería una nueva cadena de caracteres la cual tendría <code>cadena_caracteres_1</code> mas <code>cadena_caracteres_2</code>. Veamos un ejemplo:</p>

<pre lang=‘java’>
"Hola “.concat("Mundo");
</pre>

<p>Si ejecutamos el código anterior deberíamos obtener lo siguiente:</p>

<pre>
Hola Mundo
</pre>

<p>La manera mas común de usar este método es con el operador <code>+</code>. Veamos un ejemplo:</p>

<pre lang=‘java’>
public class Ejemplo {

   public static void main(String args[]) {
      String frase = “Bienvenido ";
      System.out.println(frase + “a Codehero”);
   }
}
</pre>

<p>Si ejecutamos el código anterior deberíamos obtener lo siguiente:</p>

<pre>
Bienvenido a Codehero
</pre>

<hr />

<h2>Printf()</h2>

<p>Printf es un método que nos ayuda a imprimir cadenas de caracteres. Veamos un ejemplo:</p>

<pre lang=‘java’>
public class Ejemplo {

   public static void main(String args[]) {
    
    float variableFloat = 12.2;
    int variableInt = 2;
    String variableString = “Frase”

    System.out.printf(“El valor de la variable tipo float es " +
                        "%f, el valor de la variable de tipo integer es " +
                         "%d, y el valor del string es " +
                         "%s", variableFloat, variableInt, variableString);
</pre>

<p>Si ejecutamos el código anterior deberíamos obtener lo siguiente:</p>

<pre>
El valor de la variable tipo float es 12.2, el valor de la variable de tipo integer es 2, y el valor del string es frase
</pre>

<blockquote>
  <p>Cabe destacar que:</p>
  
  <ul>
  <li><code>%f</code> es el contenedor para la variable <code>variableFloat</code> dentro del string, la <code>f</code> es por el tipo de variable que en este caso es porque usamos una tipo <code>float</code>. </li>
  <li><code>%d</code> es el contenedor para la variable <code>variableInt</code> dentro del string, la <code>d</code> es por el tipo de variable que en este caso es porque usamos una tipo <code>int</code>. </li>
  <li><code>%s</code> es el contenedor para la variable <code>variableString</code> dentro del string, la <code>s</code> es por el tipo de variable que en este caso es porque usamos una tipo <code>String</code>. </li>
  </ul>
  
  <p>Para consultar todos los formatos de string existentes en Java te invito a visitar <a href="http://docs.oracle.com/javase/tutorial/java/data/numberformat.html">Formatos de variables</a>.</p>
  
  <p>Para consultar todos los métodos y constructores dentro de la clase String de Java te recomiendo que le eches un vistazo a <a href="http://docs.oracle.com/javase/7/docs/api/java/lang/String.html">Clase String</a>.</p>
</blockquote>

<hr />

<h2>Conclusión</h2>

<p>En esta lección, vimos todo lo relacionado al manejo de la clase String dentro de Java. Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso.</p>

<p>¡Te espero la próxima semana!</p>
