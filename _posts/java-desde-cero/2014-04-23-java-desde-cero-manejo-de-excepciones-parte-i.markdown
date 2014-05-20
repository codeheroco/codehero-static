---
layout: post
status: publish
published: true
title: Manejo de Excepciones - Parte I
author: Carlos Picca
author_login: carlos
author_email: carlospicca@gmail.com
wordpress_id: 3194
wordpress_url: http://codehero.co/?p=3194
date: 2014-04-23 04:59:00.000000000 -04:30
serie: Java desde Cero
dificultad: Aprendiz
duracion: 20
description: Curso en el cual aprenderemos Java desde Cero. Estudiaremos todo lo relacionado al manejo de excepciones dentro del mundo de Java.
categories:
- Cursos
- Java
tags:
- catch
- excepciones
- finally
- manejo
- java
- try
---

Bienvenidos Java desde Cero, curso en el cual aprendemos a programar sin conocimiento alguno. En el capítulo anterior, aprendimos todo lo relacionado a la herencia dentro del mundo de Java. Si eres nuevo en este curso, te recomiendo que le eches un vistazo al capítulo anterior para que te pongas en contexto ([Capítulo 11 - Herencia](http://codehero.co/java-desde-cero-herencia/))

Hoy vamos a ver todo lo relacionado al manejo de excepciones dentro del mundo de Java.

* * *
##¿Que es una excepción?
Una excepción es un problema que surge durante la ejecución de un programa. Una excepción puede ocurrir por muchas razones diferentes, por ejemplo:

* Un usuario ha introducido datos no válidos.

* Un archivo que necesita ser abierto no se puede encontrar .

* Una conexión de red se ha perdido en el medio de las comunicaciones o la JVM se ha quedado sin memoria.

Algunas de estas excepciones son causados ​​por error del usuario, otros por error del programador, y otras por los recursos físicos que han fallado de alguna manera.

* * *
##Categorías
Para entender cómo funciona el manejo de excepciones en Java, es necesario comprender las tres categorías de excepciones:

* Las excepciones comprobadas: Una excepción comprobada es una excepción que suele ser un error del usuario o de un problema que no puede ser previsto por el programador. Por ejemplo, si un archivo se va a abrir, pero el archivo no se puede encontrar, se produce una excepción. Estas excepciones no pueden ser simplemente ignoradas en el momento de la compilación.

* Excepciones en tiempo de ejecución  A excepción de tiempo de ejecución es una excepción que se produce, que probablemente podría haberse evitado por el programador. A diferencia de excepciones revisadas, excepciones de tiempo de ejecución se ignoran en el momento de la compilación.

* Errores: Estos no son excepciones en absoluto, pero los problemas que surgen más allá del control del usuario o el programador. Los errores suelen ser ignorados en su código, ya que rara vez se puede hacer nada al respecto un error. Por ejemplo, si se produce un desbordamiento de pila, se producirá un error. También se tienen en cuenta en el momento de la compilación.

* * *
##¿Como atrapar las excepciones?
Para atrapar una excepción debemos hacer uso de un bloque try / catch, este se coloca alrededor del código que podría generar una excepción. El código dentro de un bloque try / catch se conoce como código protegido, y la sintaxis para utilizar try / catch tiene el siguiente aspecto:

```java
try
{
   //código protegido
}catch(ExceptionName e1)
{
   //bloque de acción
}
```

> Una declaración de capturas implica declarar el tipo de excepción que estamos tratando de atrapar. Si se produce una excepción en el código protegido, el bloque catch (o bloques) atrapa la excepción y es pasada como una variable al bloque.

Veamos un ejemplo:

La siguiente es un array que se declara con 2 elementos. A continuación, el código intenta acceder al tercer elemento del array el cual produce una excepción.

```java
import java.io.*;
public class Prueba{

   public static void main(String args[]){
      try{
         int a[] = new int[2];
         System.out.println(“El elemento tres es :" + a[3]);
      }catch(ArrayIndexOutOfBoundsException e){
         System.out.println(“La excepción es :" + e);
      }
  }
}
```

Si ejecutamos el código anterior obtenemos lo siguiente:

```java
La excepción es :java.lang.ArrayIndexOutOfBoundsException: 3
```

* * *
##¿Podemos atrapar diferentes Excepciones?
Un bloque try puede ser seguido por varios bloques catch. La sintaxis para varios bloques catch es la siguiente:

```java
try
{
   //código protegido
}catch(ExceptionType1 e1)
{
   ///bloque de acción
}catch(ExceptionType2 e2)
{
   ///bloque de acción
}catch(ExceptionType3 e3)
{
   ///bloque de acción
}
```

> Las declaraciones anteriores demuestran tres bloques catch, pero podemos tener cualquier número de ellos después de un solo intento. Si se produce una excepción en el código protegido, la excepción se genera en el primer bloque catch en la lista. Si el tipo de datos de la excepción lanzada coincide ExceptionType1, se queda atrapado allí. Si no, la excepción pasa a la segunda instrucción catch. Esto continúa hasta que la excepción tampoco se detecta o se cae a través de todas las capturas, en cuyo caso el método actual detiene la ejecución y la excepción es lanzada hacia abajo para el método anterior en la pila de llamadas.

* * *
##Ultimo catch
La palabra clave finally se utiliza para crear un bloque de código que sigue a un bloque try. Dicho bloque de código siempre se ejecuta, si ha ocurrido o no una excepción.

El uso de un bloque finally le permite ejecutar cualquier declaración de tipo de limpieza que desea ejecutar, pase lo que pase en el código protegido.

Un bloque finally aparece al final de los bloques catch y tiene la siguiente sintaxis:

```java
try
{
   //código protegido
}catch(ExceptionType1 e1)
{
   //bloque de acción
}catch(ExceptionType2 e2)
{
   //bloque de acción
}catch(ExceptionType3 e3)
{
   //bloque de acción
}finally
{
   //El ultimo bloque de código que siempre se ejecuta
}
```

Veamos un ejemplo:

```java
public class Prueba{

   public static void main(String args[]){
      int a[] = new int[2];
      try{
         System.out.println(“El elemento tres es :" + a[3]);
      }catch(ArrayIndexOutOfBoundsException e){
         System.out.println(“La excepción es  :" + e);
      }
      finally{
         a[0] = 6;
         System.out.println(“El primer elemento es : " +a[0]);
         System.out.println(“El bloque de finally fue ejecutado");
      }
   }
}
```

Si ejecutamos el código anterior obtenemos lo siguiente:

```java
La excepción es  :java.lang.ArrayIndexOutOfBoundsException: 3
El primer elemento es :6
El bloque de finally fue ejecutado
```

> Observemos lo siguiente:

> * Una cláusula catch no puede existir sin una sentencia try.

> * No es obligatorio tener cláusulas finally, cuando cada vez un bloque try / catch está presente.

> * El bloque try no puede estar presente sin que ninguna cláusula catch o una cláusula finally este presente.

> * Cualquier código no puede estar presente entre el try, catch y el finally.

* * *
##Conclusión
En esta lección, vimos todo lo relacionado al manejo de excepciones dentro del mundo de Java. Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso.

¡Te espero la próxima semana!
