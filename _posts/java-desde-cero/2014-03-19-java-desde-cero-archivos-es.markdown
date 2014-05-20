---
layout: post
status: publish
published: true
title: Archivos (E/S)
author: Carlos Picca
author_login: carlos
author_email: carlospicca@gmail.com
wordpress_id: 3125
wordpress_url: http://codehero.co/?p=3125
date: 2014-03-19 00:45:35.000000000 -04:30
serie: Java desde Cero
dificultad: Novato
duracion: 15
description: Curso en el cual aprenderemos Java desde Cero. Estudiaremos como escribir y leer (I/O) información de un archivo con la ayuda de Java.
categories:
- Cursos
- Java
tags:
- archivo
- java
- salida
- entrada
- I/O
---
<p>Bienvenidos Java desde Cero, curso en el cual aprendemos a programar sin conocimiento alguno. En el capítulo anterior, aprendimos todo lo relacionado al manejo de la clase String dentro de Java. Si eres nuevo en este curso, te recomiendo que le eches un vistazo al capítulo anterior para que te pongas en contexto (<a href="http://codehero.co/java-desde-cero-string/">Capítulo 9 - String</a>)</p>

<hr />

<p>Hoy vamos a ver como escribir y leer (I/O) información de un archivo con la ayuda de Java.</p>

<h2>Paquete java.io</h2>

<p>El paquete java.io contiene casi todas las clases que podamos necesitar para llevar a cabo la entrada y salida (I/O) en Java. En especial, vamos a hacer uso de los llamados streams para poder leer y escribir datos en los archivos.Un stream puede ser definido como una secuencia de datos. El InputStream se utiliza para leer datos de una fuente y el OutputStream se utiliza para escribir datos en un destino.</p>

<p>Primero, imaginemos que queremos leer un texto de un archivo.</p>

<hr />

<h2>¿Cómo leer un texto de un archivo?</h2>

<p>Echemos un ojo al siguiente código:</p>

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class ArchivoMuestra {

  public String leerTextoArchivo(String nombreArchivo) {
    String texto = "";
    FileReader archivo = null;
    String linea = "";
    try {
      archivo = new FileReader(nombreArchivo);
      BufferedReader lector = new BufferedReader(archivo);
      while ((linea = lector.readLine()) != null) {
        texto += linea + "\n";
      }
    } catch (FileNotFoundException e) {
      throw new RuntimeException(“Archivo no encontrado");
    } catch (IOException e) {
      throw new RuntimeException(“Ocurrio un error de entrada/salida“);
    } finally {
      if (archivo != null) {
        try {
          archivo.close();
        } catch (IOException e) {
          e.printStackTrace();
        }
      }
    }
    return texto;
  }
}
```

<p>Podemos observar que en el código declaramos una clase ejemplo llamada <strong>ArchivoMuestra</strong> y un método <strong>leerTextoArchivo</strong> el cual nos va ayudar a extraer el texto del archivo. El método se ayuda de la clase <strong>FileReader</strong> de Java para acceder a el archivo y de un buffer de lectura (<strong>BufferedReader</strong>) para poder extraer los datos del texto.</p>

<p>Simplemente lo que realiza a manera de flujo este método, es la apertura del archivo con ayuda del <code>archivo = new FileReader(nombreArchivo)</code>, segundo genera un buffer de lectura en el cual se va a ir cargando el texto extraído del archivo con ayuda del <code>BufferedReader lector</code>. Y por ultimo va a ir recorriendo con un <em>loop</em> el archivo linea por linea y al almacenando el contenido de dicha linea en el buffer <code>lector</code> para que una vez que se finalice la lectura y se cierre el archivo con <code>archivo.close()</code> sea retornado el valor del texto.</p>

<p>Ahora, imaginemos que queremos guardar un texto en un archivo.</p>

<hr />

<h2>¿Cómo guardar un texto en un archivo?</h2>

<p>Echemos un ojo al siguiente código:</p>

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class ArchivoMuestra {

public void escribirTextoArchivo(String nombreArchivo, String texto) {
    FileWriter salida = null;
    try {
      salida = new FileWriter(nombreArchivo);
      BufferedWriter escritor = new BufferedWriter(salida);
      escritor.write(texto);
    } catch (IOException e) {
      e.printStackTrace();
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

<p>Podemos observar que en el código declaramos una clase ejemplo llamada <strong>ArchivoMuestra</strong> y un método <strong>escribirTextoArchivo</strong> el cual nos va ayudar a guardar el texto del archivo. El método se ayuda de la clase ** FileWriter** de Java para acceder a el archivo y de un buffer de escritura (** BufferedWriter**) para poder guardar los datos del texto.</p>

<p>Simplemente lo que realiza a manera de flujo este método, es la apertura del archivo con ayuda del <code>salida = new FileWriter(nombreArchivo)</code>, segundo genera un buffer de salida en el cual se va a cargar el texto con ayuda del <code>BufferedWriter escritor</code>. Y por ultimo va a escribir los datos en el archivo con <code>escritor.write(texto)</code>, una vez que se finalice la escritura se cerrará el archivo con <code>salida.close()</code>.</p>

<p>Ahora veamos esta clase <strong>ArchivoMuestra</strong> en funcionamiento:</p>

<hr />

<h2>Probemos</h2>

<p>Para probar la clase que creamos anteriormente primero vamos a necesitar crear un archivo de prueba llamado <em><code>Prueba.txt</code></em> y que el mismo se encuentre en la carpeta de nuestro proyecto de prueba. Segundo vamos a tener que agregar el siguiente código en la clase principal de nuestro proyecto.</p>

<blockquote>
  <p>El archivo <code>Prueba.txt</code> puede contener el texto que quieras, en mi caso posee <code>Gracias por aprender con Codehero</code>.</p>
</blockquote>

```java
public class Main {
  public static void main(String[] args) {
    ArchivoMuestra archivo = new ArchivoMuestra();
    String entrada = archivo.leerTextoArchivo("Prueba.txt");
    System.out.println(entrada);
    archivo.escribirTextoArchivo("PruebaCopia.txt", entrada);
  }
}
```

<p>Observemos que este código lo único que va a ser es instanciar la clase <strong>ArchivoMuestra</strong> para poder hacer uso de los métodos de escritura y de lectura. A su vez, va a leer el texto contenido en el archivo <em><code>Prueba.txt</code></em>, lo va a imprimir en la consola y por ultimo va a crear un archivo llamado <em><code>PruebaCopia.txt</code></em> con el texto extraído del archivo anterior.</p>

<p>Si ejecutamos el proyecto deberíamos obtener:</p>

<h4>Por consola:</h4>

```java
Gracias por aprender con Codehero
```

<h4>En archivo</h4>

<p>Un archivo extra denominado <em><code>PruebaCopia.txt</code></em>.</p>

<hr />

<h2>Conclusión</h2>

<p>En esta lección, vimos como escribir y leer (I/O) información de un archivo con la ayuda de Java. Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso.</p>

<p>¡Te espero la próxima semana!</p>
