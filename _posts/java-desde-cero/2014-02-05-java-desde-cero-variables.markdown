---
layout: post
status: publish
published: true
title: Variables
author: Carlos Picca
author_login: carlos
author_email: carlospicca@gmail.com
wordpress_id: 2977
wordpress_url: http://codehero.co/?p=2977
date: 2014-02-05 00:05:40.000000000 -04:30
serie: Java desde Cero
dificultad: Novato
duracion: 10
description: Curso en el cual aprenderemos Java desde Cero. Estudiaremos todo lo relacionado con las variables dentro del mundo de Java.
categories:
- Cursos
- Java
tags:
- variables
- estaticas
- instancia
- locales
---
<p>Bienvenidos Java desde Cero, curso en el cual aprendemos a programar sin conocimiento alguno. En el capítulo anterior, aprendimos todo lo relacionado a los tipos de datos usados en Java. Si eres nuevo en este curso, te recomiendo que le eches un vistazo al capítulo anterior para que te pongas en contexto (<a href="http://codehero.co/java-desde-cero-tipos-de-datos/">Capítulo 4 - Tipos de datos</a>)</p>

<p>Hoy, vamos a ver todo lo relacionado con las variables dentro del mundo de Java.</p>

<hr />

<p>En Java, todas las variables deben ser declaradas antes de que puedan ser utilizados. La forma básica de una declaración de variable es la siguiente:</p>

```java
type identificador [ = valor][, identificador [= valor] ...] ;
```

<blockquote>
  <ul>
  <li>type, va a ser el tipo de dato que queremos declarar.</li>
  <li>identificador, es el nombre que le queremos dar a la variable.</li>
  <li>valor, es la cantida o frase que le quieras asignar a la variable que estamos declarando.</li>
  </ul>
</blockquote>

<p>Veamos unos ejemplos de como declarar variables en Java:</p>

```java
int a, b, c;         // declaramos tres variables de tipos int a, b, c.
int d = 3, e, f = 5; // declaramos dos variables de tipos int d y f, pero esta vez la instanciamos. A 'd' le asignamos 3 y a 'f' le asignamos 5.
double pi = 3.14159; // declaramos un double denominado pi.
char x = 'x';        // la variable x posee un caracter 'x'.
```

<hr />

<h2>Variables Locales</h2>

<ul>
<li><p>Las variables locales se declaran en los métodos, constructores, o bloques.</p></li>
<li><p>Se crean cuando se introduce el método, constructor o bloque y la variable serán destruidos una vez que sale el método, constructor o bloque.</p></li>
<li><p>Son visibles sólo dentro del método declarado, constructor o bloque.</p></li>
<li><p>Se implementan a nivel de pila interna.</p></li>
</ul>

<p>Veamos un ejemplo:</p>

```java
public class Curso{

   public void kilometrajeCarro(){
      int kilometraje = 0;
      kilometraje = kilometraje + 7;
      System.out.println("El kilometraje del carro es: " + kilometraje);
   }

   public static void main(String args[]){
      Curso curso = new Curso();
      curso.kilometrajeCarro();
   }
}
```

<blockquote>
  <ul>
  <li>Aquí, el kilometraje es una variable local. Esta definida dentro <code>kilometrajeCarro()</code> y su ámbito se limita sólo a este método.</li>
  <li>Si no iniializamos la variable kilometraje al ejecutar el codigo este nos daria un error.</li>
  </ul>
</blockquote>

<p>Si ejecutamos ese codigo deberia aparecernos lo siguiente:</p>

```java
El kilometraje del carro es: 7
```

<hr />

<h2>Variables de instancia</h2>

<ul>
<li><p>Las variables de instancia se declaran en una clase, pero fuera de un método, constructor o cualquier bloque.</p></li>
<li><p>Se crean cuando se crea un objeto con el uso de la palabra <code>new</code> y se destruye cuando se destruye el objeto.</p></li>
<li><p>Tienen valores que pueden ser referenciados por más de un método, constructor o bloque.</p></li>
<li><p>Los modificadores de acceso se pueden dar para variables de instancia.</p></li>
<li><p>Poseen valores por defecto. Para los números el valor por defecto es 0 , por Booleans es falso y por referencias de objeto es nulo. Los valores pueden ser asignados en la declaración o en el constructor.</p></li>
<li><p>Se puede acceder directamente mediante una llamada al nombre de la variable dentro de la clase. Sin embargo dentro de los métodos estáticos debe ser llamado con el nombre completo. <code>Objeto.NombreVariable</code>.</p></li>
</ul>

```java
import java.io.*;

public class Persona{
   // la variable de instancia nombre puede ser vista por todos los hijos de la clase
   public String nombre;

   // peso es una variable solo visible por la clase Persona
   private double peso;

   // La variable nombre es asignada en el constructor
   public Persona (String nombre){
      this.nombre = nombre;
   }

   // Este metodo asigna un peso a la varible peso
   public void setPeso(double peso){
      this.peso = peso;
   }

   // Este metodo imprime los datos de la persona
   public void imprimirPersona(){
      System.out.println("Nombre  : " + this.nombre );
      System.out.println("Peso :" + this.peso);
   }

   public static void main(String args[]){
      Persona alguien = new Persona("Carlos");
      alguien.setPeso(80);
      alguien.imprimirPersona();
   }
}
```

<p>Si ejecutamos ese codigo deberia aparecernos lo siguiente:</p>

```java
Nombre  : Carlos
Peso :80.0
```

<hr />

<h2>Variables de estáticas</h2>

<ul>
<li><p>Las variables de clase se declaran con la palabra clave static en una clase, pero fuera de un método, constructor o un bloque.</p></li>
<li><p>Sólo habría una copia de cada variable por clase, independientemente del número de objetos se crean de la misma.</p></li>
<li><p>Las variables estáticas se usan muy poco aparte de ser declarado como constantes.</p></li>
<li><p>Se almacenan en la memoria estática.</p></li>
<li><p>Se crean cuando se inicia el programa y se destruyen cuando el programa se detiene.</p></li>
<li><p>La visibilidad es similar a las variables de instancia. Sin embargo, las variables estáticas se declaran normamente <em>public</em>, para que esten disponibles para los usuarios de la clase.</p></li>
<li><p>Las variables estáticas se puede acceder llamando con el nombre de la clase. <code>NombreClase.NombreVariable</code>.</p></li>
</ul>

```java
import java.io.*;

public class Empleado{
   // salario  es una variable estatica privada de la clase empleado
   private static double salario;

   // DEPARTAMENTO es una constante
   public static final String DEPARTAMENTO = "Desarrollo";

   public static void main(String args[]){
      salario = 2000;
      System.out.println(DEPARTAMENTO + " posee un salario promedio de: " + salary);
   }
}
```

<p>Si ejecutamos ese codigo deberia aparecernos lo siguiente:</p>

```java
Desarrollo posee un salario promedio de: 2000
```

<hr />

<h2>Conclusión</h2>

<p>En esta lección, vimos todo lo relacionado con las variables dentro del mundo de Java. Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso.</p>

<p>¡Te espero la próxima semana!</p>
