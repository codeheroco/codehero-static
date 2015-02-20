---
layout: post
status: publish
title: Correos Electrónicos
author: Carlos Picca
author_login: carlos
description: Curso en el cual aprenderemos Java desde Cero. Estudiaremos todo lo relacionado a la creación y uso de archivos de propiedades dentro del mundo de Java.
dificultad: Aprendiz
duracion: 30
serie: Java desde Cero
categories:
- Cursos
- Java desde Cero
tags:
- correo
- java
- email
- electronicos
---
Bienvenidos Java desde Cero, curso en el cual aprendemos a programar sin conocimiento alguno. En el capítulo anterior, aprendimos todo lo relacionado a la creación y uso de archivos de propiedades dentro del mundo de Java. Si eres nuevo en este curso, te recomiendo que le eches un vistazo al capítulo anterior para que te pongas en contexto ([Capítulo 14 - Archivo de propiedades][1])

Hoy vamos a ver todo lo relacionado a la creación y envío de correos electrónicos dentro del mundo de Java.

* * *

## ¿Cómo enviar un correo electrónico sencillo?

Veamos un ejemplo para enviar un email simple desde nuestra maquina usando Java.

> Debemos asegurarnos que nuestro localhost está conectado a Internet y con capacidad suficiente para enviar un correo electrónico.

```java
import java.util.*;
import javax.mail.*;
import javax.mail.internet.*;
import javax.activation.*;

public class EnvioCorreo {

  public static void main(String [] args) {
    // La dirección de envío (to)
    String para = "carlosp@codehero.co";

    // La dirección de la cuenta de envío (from)
    String de = "cpicca@codehero.co";

    // El servidor (host). En este caso usamos localhost
    String host = "localhost";

    // Obtenemos las propiedades del sistema
    Properties propiedades = System.getProperties();

    // Configuramos el servidor de correo
    propiedades.setProperty("mail.smtp.host", host);

    // Obtenemos la sesión por defecto
    Session sesion = Session.getDefaultInstance(propiedades);

    try{
      // Creamos un objeto mensaje tipo MimeMessage por defecto.
      MimeMessage mensaje = new MimeMessage(sesion);

      // Asignamos el “de o from” al header del correo.
      mensaje.setFrom(new InternetAddress(de));

      // Asignamos el “para o to” al header del correo.
      mensaje.addRecipient(Message.RecipientType.TO, new InternetAddress(para));

      // Asignamos el asunto
      mensaje.setSubject("Primer correo sencillo");

      // Asignamos el mensaje como tal
      mensaje.setText("El mensaje de nuestro primer correo");

      // Enviamos el correo
      Transport.send(mensaje);
      System.out.println("Mensaje enviado");
    } catch (MessagingException e) {
      e.printStackTrace();
    }
  }
}
```

Si ejecutamos el código anterior:

```sh
$ java EnvioCorreo
Mensaje enviado
```

* * *

## ¿Cómo enviamos un correo electrónico con contenido HTML?

Veamos un ejemplo para enviar un correo electrónico HTML desde nuestra máquina.

> Debemos asegurarnos que nuestro localhost está conectado a Internet y con capacidad suficiente para enviar un correo electrónico.

Este ejemplo es muy similar al anterior, excepto que aquí estamos utilizando setContent (método) para establecer el contenido cuyo su segundo argumento va a ser **”text/html”** para especificar que el contenido HTML se incluye en el mensaje.

```java
import java.util.*;
import javax.mail.*;
import javax.mail.internet.*;
import javax.activation.*;

public class EnvioCorreo {

  public static void main(String [] args) {

    // La dirección de envío (to)
    String para = "carlosp@codehero.co";

    // La dirección de la cuenta de envío (from)
    String de = "cpicca@codehero.co";

    // El servidor (host). En este caso usamos localhost
    String host = "localhost";

    // Obtenemos las propiedades del sistema
    Properties propiedades = System.getProperties();

    // Configuramos el servidor de correo
    propiedades.setProperty("mail.smtp.host", host);

    // Obtenemos la sesión por defecto
    Session sesion = Session.getDefaultInstance(propiedades);

    try{
      // Creamos un objeto mensaje tipo MimeMessage por defecto.
      MimeMessage mensaje = new MimeMessage(sesion);

      // Asignamos el “de o from” al header del correo.
      mensaje.setFrom(new InternetAddress(de));

      // Asignamos el “para o to” al header del correo.
      mensaje.addRecipient(Message.RecipientType.TO, new InternetAddress(para));

      // Asignamos el asunto
      mensaje.setSubject("Primer correo HTML");

      // Asignamos el contenido HTML, tan grande como nosotros queramos
      mensaje.setContent("<h1>El mensaje de nuestro primer correo HTML</h1>","text/html" );

      // Enviamos el correo
      Transport.send(mensaje);
      System.out.println("Mensaje enviado");
    } catch (MessagingException e) {
      e.printStackTrace();
    }
  }
}
```

Si ejecutamos el código anterior:

```sh
$ java EnvioCorreo
Mensaje enviado
```

* * *

## ¿Cómo enviamos un correo electrónico con archivos adjuntos?

Veamos un ejemplo para enviar un correo electrónico con archivo adjunto desde nuestra máquina.

> Debemos asegurarnos que nuestro localhost está conectado a Internet y con capacidad suficiente para enviar un correo electrónico.

```java
import java.util.*;
import javax.mail.*;
import javax.mail.internet.*;
import javax.activation.*;

public class EnvioCorreo {

  public static void main(String [] args) {

    // La dirección de envío (to)
    String para = "carlosp@codehero.co";

    // La dirección de la cuenta de envío (from)
    String de = "cpicca@codehero.co";

    // El servidor (host). En este caso usamos localhost
    String host = "localhost";

    // Obtenemos las propiedades del sistema
    Properties propiedades = System.getProperties();

    // Configuramos el servidor de correo
    propiedades.setProperty("mail.smtp.host", host);

    // Obtenemos la sesión por defecto
    Session sesion = Session.getDefaultInstance(propiedades);

    try{
      // Creamos un objeto mensaje tipo MimeMessage por defecto.
      MimeMessage mensaje = new MimeMessage(sesion);

      // Asignamos el “de o from” al header del correo.
      mensaje.setFrom(new InternetAddress(de));

      // Asignamos el “para o to” al header del correo.
      mensaje.addRecipient(Message.RecipientType.TO, new InternetAddress(para));

      // Asignamos el asunto
      mensaje.setSubject("Primer correo con archivos adjuntos");

      // Creamos un cuerpo del correo con ayuda de la clase BodyPart
      BodyPart cuerpoMensaje = new MimeBodyPart();

      // Asignamos el texto del correo
      cuerpoMensaje.setText("Este el texto del correo");

      // Creamos un multipart al correo
      Multipart multiparte = new MimeMultipart();

      // Agregamos el texto al cuerpo del correo multiparte
      multiparte.addBodyPart(cuerpoMensaje);

      // Ahora el proceso para adjuntar el archivo
      cuerpoMensaje = new MimeBodyPart();
      String nombreArchivo = "consulta.pdf";
      DataSource fuente = new FileDataSource(nombreArchivo);
      cuerpoMensaje.setDataHandler(new DataHandler(fuente));
      cuerpoMensaje.setFileName(nombreArchivo);
      multipart.addBodyPart(cuerpoMensaje);

      // Asignamos al mensaje todas las partes que creamos anteriormente
      mensaje.setContent(multiparte);

      // Enviamos el correo
      Transport.send(mensaje);
      System.out.println("Mensaje enviado");
    } catch (MessagingException e) {
      e.printStackTrace();
    }
  }
}
```

Si ejecutamos el código anterior:

```sh
$ java EnvioCorreo Mensaje enviado
```

* * *

## Problemas comunes que nos podemos encontrar a la hora de generar el envío de correo

Los principales son:

#### Autenticación del usuario

Si necesitamos presentar una identificación de usuario y una contraseña para el servidor de correo electrónico para fines de autenticación entonces debemos agregar a las propiedades de configuración las siguientes:

```java
propiedades.setProperty("mail.user", "usuario"); propiedades.setProperty("mail.password", "clave");
```

#### Múltiple direcciones de envío de correo

Si necesitamos enviar un correo electrónico a varios destinatarios debemos utilizar el siguiente método en vez de `addRecipient`, el cual utilizamos en los ejemplos anteriores.

```java
void addRecipients(Message.RecipientType tipo, Address[] direcciones) throws MessagingException
```

> Observemos lo siguiente:
>
> *   **tipo** - Esto se establece en TO, CC o BCC. Aquí CC representa Con Copia y BCC representa Con Copia Oculta (CCO). Ejemplo: `Message.RecipientType.TO`
>
> *   **direcciones** - Esta es el array de correos electrónicos.

* * *

## Conclusión

En esta lección, vimos todo lo relacionado a la creación y envío de correos electrónicos dentro del mundo de Java. Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso.

¡Te espero la próxima semana!

 [1]: http://codehero.co/java-desde-cero-archivo-de-propiedades/
