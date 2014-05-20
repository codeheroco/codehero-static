---
layout: post
status: publish
published: true
title: Herencia
author: Carlos Picca
author_login: carlos
author_email: carlospicca@gmail.com
wordpress_id: 3152
wordpress_url: http://codehero.co/?p=3152
date: 2014-04-03 02:21:00.000000000 -04:30
serie: Java desde Cero
dificultad: Novato
duracion: 20
description: Curso en el cual aprenderemos Java desde Cero. Estudiaremos todo lo relacionado a la herencia dentro del mundo de Java.
categories:
- Cursos
- Java
tags:
- extends
- herencia
- implements
- java
---

Bienvenidos Java desde Cero, curso en el cual aprendemos a programar sin conocimiento alguno. En el capítulo anterior, aprendimos escribir y leer (I/O) información de un archivo con la ayuda de Java. Si eres nuevo en este curso, te recomiendo que le eches un vistazo al capítulo anterior para que te pongas en contexto ([Capítulo 10 - Archivos (E/S)](http://codehero.co/java-desde-cero-archivos-es/))

Hoy vamos a ver todo lo relacionado a la herencia dentro del mundo de Java.

* * *
##Herencia
La herencia puede ser definida como el proceso en el que un objeto adquiere las propiedades de otro. Con su uso la información del objeto se hace manejable en un orden jerárquico.

Cuando hablamos de herencia, las palabras claves más utilizadas serían **extends** y **implements**. Estas palabras podrían determinar si un objeto es de un tipo o de otro. Mediante el uso de estas palabras claves, podemos hacer que un objeto adquiere las propiedades de otro objeto.

* * *
##Relación ES-UN
ES-UN es una manera de decir: *Este objeto es un tipo de objeto*. Vamos a ver cómo la palabra clave **extends** se utiliza para conseguir la herencia.

```java
public class Carro {
	public String color;
	public String motor;

	public void setColor(String color) {
		this.color = color;
	}
}

public class Ford extends Carro {
	private int codigoRadio;
}

public class Toyota extends Carro{

	public void poseeECOManejo() {
		return true;
	}
}
```

Ahora, con base en el ejemplo anterior, en términos orientados a objetos, lo siguiente es cierto:

* Carro es la superclase de la clase Ford.

* Carro es la superclase de la clase de Toyota.

* Ford y Toyota son subclases de la clase Carro.

Ahora bien, si tenemos en cuenta la relación es-un, podemos decir:

* Ford ES-UN Carro

* Toyota ES-UN Carro

> Observemos que en la herencia, todas las subclases obtienen o heredan todos los métodos y propiedades del padre con excepción de las propiedades privadas de la superclase. En nuestro ejemplo seria lo siguiente: las subclases Ford y Toyota van a tener las propiedades `color` y `motor`, y a su vez heredan la función `setColor`.

> La herencia no limita a las subclases a tener sus propias propiedades y métodos. En nuestro ejemplo podemos observar que la subclase **Ford** posee una nueva propiedad llamada `codigoRadio` y a su vez la subclase **Toyota** posee su propio método `poseeECOManejo`.

Veamos un ejemplo:

```java
public static void main(String args[]){

      Carro c = new Carro();
      Ford f = new Ford();
      Toyota t = new Toyota();

      System.out.println(f instanceof Carro);
      System.out.println(t instanceof Carro);
   }
```

> Con `instanceof ` podemos asegurar que una clase es de un tipo de clase en especifico.

> Observemos que **Ford** y **Toyota** es en realidad un Carro con `f instanceof Carro` y `t instanceof Carro` respectivamente.

Si ejecutamos el código anterior, obtenemos:

```java
true
true
```

Puesto que tenemos una buena comprensión de la palabra clave **extends** echemos un vistazo a cómo se utiliza la palabra clave **implements** para obtener la relación es-un.

La palabra clave **implements** es utilizado por las clases por heredar de interfaces. Interfaces nunca pueden ser extendidas por las clases.

Veamos un ejemplo:

```java
public interface encendidoMotor {

	public void encender();
	public void apagar();
}

public class MotorCuatroCilindros implements encendidoMotor{

	@Override
	public void encender() {
		System.out.println(“Encendido a 4 pulsos”);
	}
}
public class MotorOchoCilindros implements encendidoMotor{

	@Override
	public void encender() {
		System.out.println(“Encendido a 18 pulsos”);
	}
}

```

> Observemos que cuando implementamos la interfaz `encendidoMotor` en la clase `MotorCuatroCilindros` estamos creando un esquema de métodos los cuales van a hacer implementados de manera diferente al comportamiento que por ejemplo pudiesen tener en la clase `MotorOchoCilindros`.

> Cabe destacar que la interfaces se utilizan para poseer el mismo esquema de métodos pero diferentes implementaciones de los mismos. Así podemos obtener diferentes comportamientos por clase por mas que posean las mismas guías de métodos.

* * *
##Conclusión
En esta lección, vimos todo lo relacionado a la herencia dentro del mundo de Java. Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso.

¡Te espero la próxima semana!
