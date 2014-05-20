---
layout: post
status: publish
published: true
title: Sentencias If y Switch
author: Carlos Picca
author_login: carlos
author_email: carlospicca@gmail.com
wordpress_id: 3040
wordpress_url: http://codehero.co/?p=3040
date: 2014-02-19 12:24:09.000000000 -04:30
serie: Java desde Cero
dificultad: Novato
duracion: 15
description: Curso en el cual aprenderemos Java desde Cero. Estudiaremos que existen dos tipos de sentencias de decisiones en Java (If y Switch).
categories:
- Cursos
- Java
tags:
- java
- if
- switch
- else
- sentencia
- desicion
---
<p>Bienvenidos Java desde Cero, curso en el cual aprendemos a programar sin conocimiento alguno. En el capítulo anterior, aprendimos todo el conjunto más importante de operadores para manipular variables en Java. Si eres nuevo en este curso, te recomiendo que le eches un vistazo al capítulo anterior para que te pongas en contexto (<a href="http://codehero.co/java-desde-cero-operadores-basicos/">Capítulo 6 - Operadores básicos</a>)</p>

<hr />

<p>Hoy vamos a ver que existen dos tipos de sentencias de decisiones en Java. Veamos cuales son:</p>

<ul>
<li>La sentencia <strong>if</strong>.</li>
<li>La sentencia <strong>switch</strong>.</li>
</ul>

<hr />

<h2>La sentencia if</h2>

<p>Una sentencia if consiste en una expresión booleana seguida de una o más sentencias. Veamos la sintaxis:</p>

```java
if(expresion_Booleana)
{
   //Sentencias se ejecutan si la expresión booleana es verdadera
}
```

<blockquote>
  <p>Si la expresión booleana es verdadera, entonces el bloque de código dentro del if se ejecuta. Si no se ejecutará el primer grupo de código después del final de la instrucción if.</p>
</blockquote>

<p>Veamos un ejemplo:</p>

```java
public class Curso {

   public static void main(String args[]){
      int x = 15;

      if( x < 30 ){
         System.out.print(“Esto es una sentencia if");
      }
   }
}
```

<p>Si ejecutamos el código anterior obtendremos lo siguiente:</p>

```java
Esto es una sentencia if
```

<hr />

<h2>La sentencia if..else</h2>

<p>Una sentencia <strong>if</strong> puede ser seguido por una sentencia <strong>else</strong>, que se ejecuta cuando la expresión booleana es falsa.</p>

<p>Veamos la sintaxis:</p>

```java
if(expresion_Booleana)
    / / Se ejecuta cuando la expresión booleana es verdadera
} else {
    / / Se ejecuta cuando la expresión booleana es falsa
}
```

<p>Veamos un ejemplo:</p>

```java
public class Curso {

   public static void main(String args[]){
      int x = 40;

      if( x < 10 ){
         System.out.print("Esto es una sentencia if");
      }else{
         System.out.print("Esto es una sentencia else");
      }
   }
}
```

<p>Si ejecutamos el código anterior obtendremos lo siguiente:</p>

```java
Esto es una sentencia else
```

<hr />

<h2>La sentencia if...else if…else</h2>

<p>Una sentencia if puede ser seguido por un opcional else if ... else, que es muy útil para comprobar varias condiciones.</p>

<p>Veamos la sintaxis:</p>

```java
if(expresion_Booleana_1)
    / / Se ejecuta cuando la expresión booleana 1 es verdadera
} else if (expresion_Booleana_2) {
    / / Se ejecuta cuando la expresión booleana 2 es verdadera
} else if (expresion_Booleana_3) {
    / / Se ejecuta cuando la expresión booleana 3 es cierto
} else {
    / / Se ejecuta cuando ninguna condición anterior es verdadera.
}
```

<p>Veamos un ejemplo:</p>

```java
public class Curso {

   public static void main(String args[]){
      int x = 45;

      if( x == 15 ){
         System.out.print(“El valor de X es15");
      }else if( x == 30 ){
         System.out.print("El valor de X es 30");
      }else if( x == 45 ){
         System.out.print("El valor de X es 45");
      }else{
         System.out.print(“X no cumple ninguna de las condiciones anteriores");
      }
   }
}
```

<p>Si ejecutamos el código anterior obtendremos lo siguiente:</p>

```java
El valor de X es 45
```

<hr />

<h2>La sentencia anidada if...else</h2>

<p>También es posible usar una sentencia <strong>if</strong> o <strong>if…else</strong> dentro de otro <strong>if</strong> o <strong>if..else</strong>. Veamos la sintaxis:</p>

```java
if(expresion_Booleana_1)
    / / Se ejecuta cuando la expresión booleana 1 es verdadera
    if (expresion_Booleana_2) {
       / / Se ejecuta cuando la expresión booleana 2 es verdadera
    }
}
```

<p>Veamos un ejemplo:</p>

```java
public class Curso {

   public static void main(String args[]){
      int x = 40;
      int y = 5;

      if( x == 40 ){
         if( y == 5 ){
             System.out.print("X = 30 y Y = 5");
          }
       }
    }
}
```

<p>Si ejecutamos el código anterior obtendremos lo siguiente:</p>

```java
X = 40 y Y = 5
```

<hr />

<h2>La sentencia switch</h2>

<p>Una sentencia <strong>switch</strong> permite a una variable ser probada por una lista de condiciones. Cada condición se llama <strong>case</strong>.Veamos la sintaxis:</p>

```java
switch (expresion) {
     case valor1:
        / / Declaraciones
        break; / / opcional
     case valor2:
        / / Declaraciones
        break; / / opcional
     / / Usted puede tener cualquier número de sentencias case.
     default: / / Opcional
        / / Declaraciones que cumplirá si la variable no entra en ningún caso.
}
```

<p>Las siguientes reglas se aplican a una sentencia switch :</p>

<ul>
<li><p>La variable que se utiliza en una sentencia switch sólo puede ser un byte, short , int, o char.</p></li>
<li><p>Puedes tener cualquier número de sentencias case dentro de un switch. Cada caso es seguido del valor a ser comparado.</p></li>
<li><p>El valor de un caso debe ser el mismo tipo de datos que la variable en el switch.</p></li>
<li><p>Cuando la variable del switch es igual a un caso, las instrucciones que siguen a ese caso se ejecutará hasta que se alcanza una sentencia break.</p></li>
<li><p>Cuando se llega a una sentencia break, el caso termina, y el flujo de control pasa a la siguiente línea después de la sentencia switch.</p></li>
<li><p>No todos los casos tiene que contener un break.</p></li>
<li><p>Una sentencia switch puede tener un caso por defecto (opcional), que debe aparecer al final del switch. El caso por defecto se puede utilizar para realizar una tarea cuando ninguno de los casos es cierto.</p></li>
</ul>

<p>Veamos un ejemplo:</p>

```java
public class Curso {

   public static void main(String args[]){
      char departamento = 'B';

      switch(departamento)
      {
         case 'A' :
            System.out.println("Desarrollo");
            break;
         case 'B' :
    System.out.println(“Recursos Humanos");
            break;
         case 'C' :
            System.out.println("Finanzas");
            break;
         case 'D' :
            System.out.println("Mercadeo");
         default :
            System.out.println(“Departamento invalido");
      }
      System.out.println(“Código para el departamento es " + departamento);
   }
}
```

<p>Si ejecutamos el código anterior obtendremos lo siguiente:</p>

```java
Recursos Humanos
Código para el departamento es B
```

<blockquote>
  <p>Si por casualidad no sabes como compilar y probar los ejemplos de este curso con Java te recomiendo que le eches un vistazo a <a href="http://codehero.co/java-desde-cero-instalacion-configuracion/">Como compilar y ejecutar un código en Java</a></p>
</blockquote>

<hr />

<h2>Conclusión</h2>

<p>En esta lección, vimos que existen dos tipos de sentencias de decisiones en Java (If y Switch). Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso.</p>

<p>¡Te espero la próxima semana!</p>
