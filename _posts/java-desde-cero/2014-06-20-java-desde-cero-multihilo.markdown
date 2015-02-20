---
layout: post
status: publish
title: Multihilo
author: Carlos Picca
author_login: carlos
description: Curso en el cual aprenderemos Java desde Cero. Estudiaremos todo lo relacionado a la creación y uso de archivos de propiedades dentro del mundo de Java.
dificultad: Aprendiz
duracion: 25
serie: Java desde Cero
categories:
- Cursos
- Java desde Cero
tags:
- hilo
- java
- multihilo
- procesos
---
Bienvenidos Java desde Cero, curso en el cual aprendemos a programar sin conocimiento alguno. En el capítulo anterior, aprendimos todo lo relacionado a la creación y envío de correos electrónicos dentro del mundo de Java. Si eres nuevo en este curso, te recomiendo que le eches un vistazo al capítulo anterior para que te pongas en contexto ([Capítulo 15 - Correos Electrónicos][1])

Hoy vamos a ver todo lo relacionado a la creación y uso de hilos dentro del mundo de Java.

* * *

## ¿Qué es una aplicación multihilo?

Java es un lenguaje de programación multihilo. Un programa de multiproceso contiene dos o más partes que se pueden ejecutar al mismo tiempo y cada parte puede manejar diferentes tareas al mismo tiempo, haciendo un uso óptimo de los recursos disponibles, especialmente cuando el equipo tiene varias CPU.

Por definición la multitarea es cuando varios procesos comparten recursos comunes de procesamiento, tales como CPU. Multithreading extiende la idea de la multitarea en aplicaciones donde se puede subdividir operaciones específicas dentro de una sola aplicación en hilos individuales.

Cada uno de los hilos se pueden ejecutar en paralelo. El sistema operativo divide el tiempo de procesamiento, no sólo entre las diferentes aplicaciones, sino también entre cada hilo dentro de una aplicación.

* * *

## ¿Cómo creamos una aplicación multihilo en Java? - Modo 1

Si la clase está destinado a ser ejecutado como un hilo, entonces pedemos lograr esto mediante la implementación de interface **Runnable**. Para crear un hilo debemos seguir los siguientes pasos:

#### Primer paso

Como primer paso, es necesario implementar el método `run()` proporcionado por la interface **Runnable**. Este método proporciona una puerta de entrada para el hilo y en el cual pondremos la lógica de negocio.

```java
public void run( )
```

#### Segundo paso

El segundo paso tendremos que instanciar **Thread** usando el siguiente constructor:

```java
Thread(Runnable threadObj, String threadName);
```

> Observemos que `threadObj` es una instancia de la interface Runnable y `threadName` es el nombre que recibe el nuevo hilo.

#### Tercer paso

Una vez creado el objeto **Thread**, lo podemos iniciar llamando al método `start()`, que ejecuta una llamada al método `run()`. Veamos como:

```java
void start( );
```

Veamos un ejemplo:

```java
class Multihilo implements Runnable {
  private Thread hilo;
  private String nombreHilo;

  Multihilo(String nombre){
    nombreHilo = nombre;
    System.out.println("Creando " + nombreHilo);
  }

  public void run() {
    System.out.println("Ejecutando " + nombreHilo );
    try {
      for(int i = 4; i > 0; i--) {
        System.out.println("Hilo: " + nombreHilo + ", " + i);
        // vamos a dormir el hilo unos 50s
        Thread.sleep(50);
      }
    } catch (InterruptedException e) {
      System.out.println("Hilo " + nombreHilo + " interrumpido.");
    }

    System.out.println("Hilo " + nombreHilo + " termino.");
  }

  public void start () {
    System.out.println("Iniciando " + nombreHilo );
    if (hilo == null) {
      hilo = new Thread (this, nombreHilo);
      hilo.start ();
    }
  }
}

public class PruebaHilo {

  public static void main(String args[]) {
    Multihilo hilo1 = new Multihilo( "Hilo-1");
    hilo1.start();
    Multihilo hilo2 = new Multihilo( "Hilo-2");
    hilo2.start();
  }
}
```

> Observemos que en el ejemplo anterior implementamos la interfaz Runnable. Ademas, creamos dos hilos y los iniciamos.

Si ejecutamos el código anterior deberíamos obtener lo siguiente:

```
Creando Hilo-1
Iniciando Hilo-1
Creando Hilo-2
Iniciando Hilo-2
Ejecutando Hilo-1
Thread: Thread-1, 4
Ejecutando Hilo-2
Hilo: Hilo-2, 4
Hilo: Hilo-1, 3
Hilo: Hilo-2, 3
Hilo: Hilo-1, 2
Hilo: Hilo-2, 2
Hilo: Hilo-1, 1
Hilo: Hilo-2, 1
Hilo Hilo-1 termino.
Hilo Hilo-2 termino.
```

* * *

## ¿Cómo creamos una aplicación multihilo en Java? - Modo 2

La segunda forma de crear un hilo es crear una nueva clase que extiende la clase **Thread** utilizando los siguientes dos sencillos pasos. Este enfoque proporciona una mayor flexibilidad en el manejo de múltiples subprocesos creados usando los métodos disponibles en la clase **Thread**.

#### Primer paso

Tendremos que reemplazar el método `run()` que está disponible en la clase **Thread**. Este método proporciona una puerta de entrada para el hilo y en el cual pondremos la lógica de negocio.

```java
public void run( )
```

#### Segundo paso

Una vez creado el objeto **Thread**, lo podemos iniciar llamando al método `start()`, el cual ejecuta una llamada al método `run()`.

```java
void start( );
```


Veamos un ejemplo:

```java
class Multihilo extends Thread {
  private Thread hilo;
  private String nombreHilo;

  Multihilo(String nombre){
    nombreHilo = nombre;
    System.out.println("Creando " + nombreHilo);
  }

  public void run() {
    System.out.println("Ejecutando " + nombreHilo );
    try {
      for(int i = 4; i > 0; i--) {
        System.out.println("Hilo: " + nombreHilo + ", " + i);
        // vamos a dormir el hilo unos 50s
        Thread.sleep(50);
      }
    } catch (InterruptedException e) {
      System.out.println("Hilo " + nombreHilo + " interrumpido.");
    }
    System.out.println("Hilo " + nombreHilo + " termino.");
  }

  public void start () {
    System.out.println("Iniciando " + nombreHilo );
    if (hilo == null) {
      hilo = new Thread (this, nombreHilo);
      hilo.start ();
    }
  }
}

public class PruebaHilo {
  public static void main(String args[]) {
    Multihilo hilo1 = new Multihilo( "Hilo-1");
    hilo1.start();
    Multihilo hilo2 = new Multihilo( "Hilo-2");
    hilo2.start();
  }
}
```

> Observemos que en el ejemplo anterior extendemos de la clase Thread. Ademas, creamos dos hilos y los iniciamos.

Si ejecutamos el código anterior deberíamos obtener lo siguiente:

```
Creando Hilo-1
Iniciando Hilo-1
Creando Hilo-2
Iniciando Hilo-2
Ejecutando Hilo-1
Thread: Thread-1, 4
Ejecutando Hilo-2
Hilo: Hilo-2, 4
Hilo: Hilo-1, 3
Hilo: Hilo-2, 3
Hilo: Hilo-1, 2
Hilo: Hilo-2, 2
Hilo: Hilo-1, 1
Hilo: Hilo-2, 1
Hilo Hilo-1 termino.
Hilo Hilo-2 termino.
```

* * *

## Conclusión

En esta lección, vimos todo lo relacionado a la creación y uso de hilos dentro del mundo de Java. Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso.

 [1]: http://codehero.co/java-desde-cero-correos-electronicos/
