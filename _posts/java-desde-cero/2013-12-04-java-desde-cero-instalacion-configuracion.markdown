---
layout: post
status: publish
published: true
title: Instalación & Configuración
author: Carlos Picca
author_login: carlos
author_email: carlospicca@gmail.com
wordpress_id: 2801
wordpress_url: http://codehero.co/?p=2801
date: 2013-12-04 04:33:06.000000000 -04:30
serie: Java desde Cero
dificultad: Novato
duracion: 15
description: Curso en el cual aprenderemos Java desde Cero. Estudiaremos todo lo relacionado con la instalación y configuración que necesitamos para desarrollar una app.
categories:
- Cursos
- Java
tags:
- instalacion
- configuracion
- java
- javac
---
<p>Bienvenidos Java desde Cero, curso en el cual aprendemos a programar sin conocimiento alguno.</p>

<p>Hoy, vamos a ver una introducción a Java, sus beneficios y vamos a crear nuestra primera app.</p>

<hr />

<h2>¿Qué es Java?</h2>

<p>El lenguaje de programación Java fue originalmente desarrollado por James Gosling de Sun Microsystems (la cual fue adquirida por la compañía Oracle) y publicado en 1995 como un componente fundamental de la plataforma Java de Sun Microsystems. Su sintaxis deriva mucho de C y C++, pero tiene menos facilidades de bajo nivel que cualquiera de ellos. Las aplicaciones de Java son generalmente compiladas a bytecode (clase Java) que puede ejecutarse en cualquier máquina virtual Java (JVM) sin importar la arquitectura de la computadora subyacente. Es un lenguaje de programación de propósito general, concurrente, orientado a objetos y basado en clases que fue diseñado específicamente para tener tan pocas dependencias de implementación como fuera posible. Su intención es permitir que los desarrolladores de aplicaciones escriban el programa una vez y lo ejecuten en cualquier dispositivo (conocido en inglés como WORA, o "write once, run anywhere"), lo que quiere decir que el código que es ejecutado en una plataforma no tiene que ser recompilado para correr en otra.</p>

<h2>Tipos de Java</h2>

<p>Podemos encontrar tres tipos de ediciones de Java:</p>

<ul>
<li><strong>Java SE o Standard Edition:</strong> es una colección de APIs del lenguaje de programación Java útiles para muchos programas de la Plataforma Java.</li>
<li><strong>Java EE o Enterprise Edition:</strong> es una plataforma de programación para desarrollar y ejecutar software de aplicaciones en el lenguaje de programación Java que permite utilizar arquitecturas de N capas distribuidas y se apoya ampliamente en componentes de software modulares ejecutándose sobre un servidor de aplicaciones.</li>
<li><strong>Java ME o Micro Edition:</strong> es una especificación de un subconjunto de la plataforma Java orientada a proveer una colección certificada de APIs de desarrollo de software para dispositivos con recursos restringidos. Está orientado a productos de consumo como PDAs, teléfonos móviles o electrodomésticos.</li>
</ul>

<p>El curso se va a enfocar en Java SE.</p>

<h2>Pros de usar Java</h2>

<ul>
<li>Es orientado a objetos.</li>
<li>Es simple de usar como lenguaje de programación.</li>
<li>Es portable, corre en cualquier plataforma, independientemente de cual sea.</li>
<li>Es seguro.</li>
<li>Es robusto, ya que enfatiza los errores en el proceso de compilación.</li>
<li>Es multi-hilo, es decir, ejecuta varios procesos a la vez en un solo programa.</li>
<li>Posee un alto desempeño y capacidad..</li>
<li>Esta diseñado para ser usado como sistemas distribuidos.</li>
<li>Es dinámico, ya que esta diseñado para adaptarse a cualquier ambiente de desarrollo. </li>
</ul>

<h2>Herramientas para su desarrollo</h2>

<p>Puedes usar cualquier editor de texto que sea de tu agrado pero te recomiendo el uso de IDEs muy poderosos como lo son:</p>

<ul>
<li><a href="http://www.eclipse.org/">Eclipse</a>.</li>
<li><a href="https://netbeans.org/">Netbeans</a>.</li>
<li><a href="http://www.bluej.org/">BlueJ</a>.</li>
<li><a href="http://www.jcreator.com/">JCreator</a>.</li>
<li><a href="http://www.jetbrains.com/idea/">IntelliJ</a>.</li>
</ul>

<p>A mi en particular me gusta netbeans y es el que voy a estar usando en el curso.</p>

<h2>¿Cómo instalar Java en nuestras maquinas?</h2>

<p>Lo primero que tenemos que hacer es descargar gratis el Java SE Development Kit (JDK) de la pagina de <a href="http://www.oracle.com/technetwork/java/javase/downloads/java-archive-downloads-javase7-521261.html#jdk-7u40-oth-JPR">Descargas de Oracle</a>. En esta vas a tener que descargar la ultima versión del JDK disponible para tu sistema operativo. En el tiempo de este tutorial es la versión <em>7u40</em>.</p>

<p>Una vez que hayas descargado el JDK, deberás ejecutarlo y el instalador es muy lineal y sencillo de usar. No existen muchas configuraciones necesarias en este punto.</p>

<h2>Ajustes de instalación</h2>

<p>Una vez que hayas instalado Java en tu maquina es necesario hacer unos ajustes a las variable de ambiente disponible en el sistema, todo va a depender de que sistema operativo poseas:</p>

<h4>Windows 2000/XP:</h4>

<p>Asumiendo que instalaste Java en el directorio c:\Program Files\java\jdk debes hacer lo siguiente:</p>

<ul>
<li><p>Click derecho en “Equipo” o “Mi Computador” y seleccionar “Propiedades”.</p></li>
<li><p>Click en “Variables de ambiente” o “Environment variables” bajo la pestaña de “Avanzados”.</p></li>
<li><p>Ahora, altera la variable “Path” para que contenga la dirección de Java, es decir, si actualmente esta seteado para ‘C:\WINDOWS\SYSTEM32', deberás cambiarlo por ‘C:\WINDOWS\SYSTEM32;c:\Program Files\java\jdk\bin'.</p></li>
</ul>

<h4>Linux, UNIX, Solaris, FreeBSD:</h4>

<p>Tu variable de ambiente PATH debe estar asignada hacia donde los binarios de Java fueron instalados.</p>

<p>Ejemplo, si tu estas usando bash como tu shell, deberás agregar la siguiente linea al final de tu archivo <code>.bashrc</code>: ‘export PATH=/path/to/java:$PATH’.</p>

<h2>Hello Word | Hola Mundo</h2>

<p>Ya que tenemos instalado Java en nuestras maquinas es hora de que desarrollemos nuestro primer programa y nada mas fácil que realizar un “Hola Mundo” para probar la instalación.</p>

<p>La manera mas fácil para hacerlo es haciendo uso de un editor de texto de tu preferencia (para este ejemplo tan sencillo no es necesario usar un IDE. No te preocupes que mas adelante si lo vamos a estar utilizando).</p>

<p>Con el editor de texto vamos a crear un archivo el cual denominaremos <code>HolaMundo.java</code>.</p>

<p>Una vez que lo hayamos creado agregamos el siguiente código:</p>

```java
public class HolaMundo {

   /* This is my first java program.  
    * This will print 'Hello World' as the output
    */

    public static void main(String []args) {
       System.out.println(“Hola Mundo"); // imprime Hola Mundo
    }
}
```

<blockquote>
  <p>No te preocupes si no entiendes muy bien como funciona en los próximos capítulos cubriremos todos los aspectos del lenguaje.</p>
</blockquote>

<h2>¿Cómo compilar?</h2>

<p>Para compilar el código que acabamos de hacer es necesario:</p>

<ul>
<li>Abrir la consola o el terminal.</li>
<li>Navegar hasta el directorio donde creamos <code>HolaMundo.java</code>.</li>
<li>Tipeamos lo siguiente para compilar:</li>
</ul>

```java
javac HolaMundo.java
```

<h2>¿Cómo ejecutar?</h2>

<p>Para probar el <code>HolaMundo.java</code> que creamos anteriormente vamos a necesitar hacer uso de la consola o terminal.</p>

<p>Abre una consola y tipea:</p>

```java
java HolaMundo
```

<p>Debería aparecerte <strong>”Hola Mundo”</strong> en la pantalla.</p>

<hr />

<h2>Conclusión</h2>

<p>En esta lección, vimos una introducción a Java, sus beneficios y creamos nuestra primera app. Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso.</p>

<p>¡Te espero la próxima semana!</p>
