---
layout: post
status: publish
published: true
title: Manejo de Excepciones - Parte II
author: Carlos Picca
author_login: carlos
author_email: carlospicca@gmail.com
wordpress_id: 3209
wordpress_url: http://codehero.co/?p=3209
date: 2014-05-06 11:26:00.000000000 -04:30
serie: Java desde Cero
dificultad: Aprendiz
duracion: 20
description: Curso en el cual aprenderemos Java desde Cero. Estudiaremos todo lo relacionado a la creación de excepciones propias dentro del mundo de Java.
categories:
- Cursos
- Java
tags:
- personalizada
- excepcion
- propia
- java
---

Bienvenidos Java desde Cero, curso en el cual aprendemos a programar sin conocimiento alguno. En el capítulo anterior, aprendimos todo lo relacionado al manejo de excepciones dentro del mundo de Java. Si eres nuevo en este curso, te recomiendo que le eches un vistazo al capítulo anterior para que te pongas en contexto ([Capítulo 12 - Manejo de Excepciones – Parte I](http://codehero.co/manejo-de-excepciones-parte/))

Hoy vamos a ver todo lo relacionado a la creación de excepciones propias dentro del mundo de Java.

* * *
##¿Cómo declarar nuestra excepción propia o personalizada?
Nosotros podemos crear nuestras propias excepciones en Java. Debe tener en cuenta los siguientes punto a la hora de escribir o declara una excepción:

* Todas las excepciones deben ser un hijo de Throwable.

* Si desea escribir una excepción comprobada que se aplica de forma automática por el *Handle* o el *Declare Rule*, es necesario extender la clase de excepción de *Exception*.

* Si se desea escribir una excepción de tiempo de ejecución o una *RuntimeException*, es necesario extender la excepción de *RuntimeException*.

Podemos definir nuestra propia clase de excepción de la siguiente manera:

```java
class ExcepcionPropia extends Exception{
}
```

> Observemos que para crear nuestra propia excepción debemos extender la clase de la clase Exception de Java. Estas son consideradas como excepciones comprobadas.

Veamos un ejemplo:

La siguiente clase **FondosInsuficientesExcepcion** es una excepción definida por el usuario que extiende de la clase Exception, por lo que es una excepción comprobada. Esta excepción comprueba que los fondos sean suficientes dentro de una cuenta.

```java
import java.io.*;

public class FondosInsuficientesExcepcion extends Exception
{
   private double cantidad;
   public FondosInsuficientesExcepcion(double cantidad)
   {
      this.cantidad = cantidad;
   }
   public double getCantidad()
   {
      return cantidad;
   }
}
```

Para demostrar el uso de nuestra excepción propia, vamos a crear la siguiente clase **CuentaCorriente** que contiene un método *retirar()*, dicha clase lanza una **FondosInsuficientesExcepcion** de no conseguir la cantidad necesaria.

```java
import java.io.*;

public class CuentaCorriente
{
   private double balance;
   private int numero;
   public CuentaCorriente(int numero)
   {
      this.numero = numero;
   }
   public void deposito(double cantidad)
   {
      balance += cantidad;
   }
   public void retiro(double cantidad) throws
                              FondosInsuficientesExcepcion
   {
      if(cantidad <= balance)
      {
         balance -= cantidad;
      }
      else
      {
         double resta = cantidad - balance;
         throw new FondosInsuficientesExcepcion(resta);
      }
   }
   public double getBalance()
   {
      return balance;
   }
   public int getNumero()
   {
      return numero;
   }
}
```


> Observemos que en la clase anterior lanzamos una excepción si la cantidad que queremos retirar es mayor a la cantidad que tenemos disponible en el balance. Para lanzar dicha excepción propia usamos la palabra clave **throw**.

El siguiente programa **Banco** demuestra la invocación de un *deposito()* y un *retirar()* de **CuentaCorriente**:


```java
public class Banco
{
   public static void main(String [] args)
   {
      CuentaCorriente c = new CuentaCorriente(973645);
      System.out.println("Deposito $500");
      c.deposito(500.00);
      try
      {
         System.out.println("\nRetiro $100");
         c.retiro(100.00);
         System.out.println("\nRetiro $600");
         c.retiro(600.00);
      }catch(FondosInsuficientesExcepcion e)
      {
         System.out.println(“No puede retirar, fondos insuficientes”);
         e.printStackTrace();
      }
    }
}
```

Si compilamos los archivos anteriores y ejecutamos **Banco**, esto debería producir lo siguiente:

```java
Deposito $500

Retiro $100

Retiro $600
No puede retirar, fondos insuficientes
FondosInsuficientesExcepcion
        at CuentaCorriente.retiro(CuentaCorriente:25)
        at Banco.main(Banco.java:13)
```


* * *
##Excepciones más comunes en Java
En Java, es posible definir dos categorías de excepciones y errores.

* Excepciones JVM: - Estas son excepciones/errores que están exclusivamente o lógicamente arrojados por la JVM. Ejemplos: NullPointerException, ArrayIndexOutOfBoundsException, ClassCastException, etc…

* Excepciones programáticas: - Estas excepciones se producen de forma explícita por la aplicación o los programadores. Ejemplos: IllegalArgumentException, IllegalStateException, etc…


* * *
##Conclusión
En esta lección, vimos todo lo relacionado a la creación de excepciones propias dentro del mundo de Java. Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso.

¡Te espero la próxima semana!
