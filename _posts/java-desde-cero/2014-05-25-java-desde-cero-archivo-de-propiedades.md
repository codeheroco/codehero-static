---
layout: post
status: publish
title: Archivo de propiedades
author: Carlos Picca
author_login: carlos
description: Curso en el cual aprenderemos Java desde Cero. Estudiaremos todo lo relacionado a la creación y uso de archivos de propiedades dentro del mundo de Java.
dificultad: Aprendiz
duracion: 20
serie: Java desde Cero
categories:
- Cursos
- Java desde Cero
tags:
- archivo
- java
- properties
- propiedades
---

Bienvenidos Java desde Cero, curso en el cual aprendemos a programar sin conocimiento alguno. En el capítulo anterior, aprendimos todo lo relacionado a la creación de excepciones propias dentro del mundo de Java. Si eres nuevo en este curso, te recomiendo que le eches un vistazo al capítulo anterior para que te pongas en contexto ([Capítulo 13 - Manejo de Excepciones – Parte II](http://codehero.co/manejo-de-excepciones-parte-ii/))

Hoy vamos a ver todo lo relacionado a la creación y uso de archivos de propiedades dentro del mundo de Java.

* * *
##¿Qué es un archivo properties?
Un archivo de propiedades Java es un documento en el cual podemos almacenar propiedades de configuración de nuestra aplicación.

* * *
##¿Como creamos un archivo properties?
Para crear el archivo properties lo único que necesitamos es crear un archivo con la extensión `.properties` en la carpeta de nuestro proyecto.

Dicho archivo debe contener lo siguiente:

```
nombre_propiedad=valor_propiedad
```

##¿Cómo obtener los valores de las propiedades en nuestra app?
Para obtener los valores que tenemos registrados en nuestro archivo para usarlo en nuestra aplicación debemos hacer lo siguiente:

* Cargar con ayuda de la clase `java.io.InputStream` el contenido del archivo properties.
* Hacer uso del método `getProperty(nombre_propiedad)` de la clase `java.util.Properties` para poder extraer el valor de dicha propiedad.

Veamos un ejemplo:

Primero que nada vamos a crear un archivo properties con las siguientes propiedades dentro de la carpeta de nuestra aplicación:

```java
basedatos=prueba
usuario=carlos
clave=123456
```

> El archivo lo vamos a denominar `configuracion.properties` es importante mantener la extensión `.properties`.

Una vez que tengamos el archivo creado hacemos lo siguiente:

```java
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class PruebaArchivoPropiedades {
  public static void main(String[] args) {

	Properties propiedades = new Properties();
	InputStream entrada = null;

	try {

		entrada = new FileInputStream("configuracion.properties");

		// cargamos el archivo de propiedades
		propiedades.load(entrada);

		// obtenemos las propiedades y las imprimimos
		System.out.println(propiedades.getProperty("basedatos"));
		System.out.println(propiedades.getProperty("usuario"));
		System.out.println(propiedades.getProperty("clave"));

	} catch (IOException ex) {
		ex.printStackTrace();
	} finally {
		if (entrada != null) {
			try {
				entrada.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

  }
}
```

Si ejecutamos el código anterior deberíamos obtener lo siguiente:

```
prueba
carlos
123456
```

* * *
##¿Cómo escribimos un archivo properties?
Para guardar los valores en propiedades y luego guardarlas un archivo de propiedades debemos hacer lo siguiente:

* Hacer uso del método `setProperty(nombre_propiedad, valor_propiedad)` de la clase `java.util.Properties` para poder asignar el valor a dicha propiedad.
* Guardar con ayuda de la clase `java.io.OutputStream` el contenido del archivo properties.

Veamos un ejemplo:

```java
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Properties;

public class PruebaArchivoPropiedades {
  public static void main(String[] args) {

	Properties propiedades = new Properties();
	OutputStream salida = null;

	try {
		salida = new FileOutputStream("configuracion.properties");

		// asignamos los valores a las propiedades
		propiedades.setProperty("basedatos", "codehero");
		propiedades.setProperty("usuario", "carlos");
		propiedades.setProperty("clave", "123456");

		// guardamos el archivo de propiedades en la carpeta de aplicación
		propiedades.store(salida, null);

	} catch (IOException io) {
		io.printStackTrace();
	} finally {
		if (salida != null) {
			try {
				salida.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

	}
  }
}
```

Si ejecutamos el código anterior deberíamos obtener lo siguiente en el archivo `configuracion.properties`:

```java
#Sat May 21 12:10:27 MYT 2014
basedatos=codehero
usuario=carlos
clave=123456
```

* * *
##Conclusión
En esta lección, vimos todo lo relacionado a la creación y uso de archivos de propiedades dentro del mundo de Java. Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso.

¡Te espero la próxima semana!
