---
layout: post
status: publish
published: true
title: Cómo Instalar y Usar rsync
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
wordpress_id: 2663
wordpress_url: http://codehero.co/?p=2663
date: 2013-11-26 00:05:15.000000000 -04:30
thumbnail: http://i.imgur.com/R2H9UgY.png
categories:
- Cómo lo hago
- rsync
tags:
- como lo hago
- rsync
- how to
- sincronizacion
- transferencia
- ssh
- inotify
- fswatch
---
La necesidad de tener la misma información en distintos lugares viene siendo una que cada vez va tomando más fuerza, esto debido a que nuestro espacio de trabajo es variable y queremos tener nuestras herramientas siempre con nosotros o inclusive como medidas de respaldo, por ello esta semana hablaremos de una de las herramientas que hacen esto posible, se trata nada más y nada menos que de **rsync**.
***
##¿Qué es rsync?
Es una herramienta de código abierto de transferencia de archivos y directorios entre una ubicación y otra. Sus ventajas se basan principalmente en la compresión de la información a enviar, permite que la transferencia se realice mediante un canal SSH y que transfiere solo los archivos y trozos de archivos que han sido modificados en lugar de transferir el archivo completo nuevamente, algo parecido a lo que sucede al transferir las diferencias en un archivo bajo el control de versiones [Git.](http://codehero.co/git-desde-cero-instalacion-configuracion-y-comandos-basicos/)

Entre los diferentes usos que se le dan a rsync se encuentran los siguientes:

* Respaldos automatizados a discos o servidores remotos.
* Sincronización de archivos y directorios remotos.
* Transferencia común de archivos.
***
##¿Cómo lo instalo?

Es probable que tu computador ya posea esta herramienta, para verificarlo podemos ejecutar el siguiente comando:

```sh
$ rsync --version
rsync  version 2.6.9  protocol version 29
....
$ which rsync
/usr/bin/rsync
```

Para el momento de este escrito, la ultima versión de rsync es la 3.1.0, por lo tanto si prefieres utilizar la más actualizada en lugar de la que trae por defecto tu computador veamos como puedes instalarlo o actualizarlo:

###Mac OS X

Instalaremos con [Homebrew](http://codehero.co/como-lo-hago-instalar-homebrew/) como de costumbre:

```sh
$ brew update
$ brew install rsync
```

Reiniciemos el terminal y veamos que ahora estamos utilizando la última versión

```sh
$ exec $SHELL -l
$ rsync --version
rsync  version 3.1.0  protocol version 31
...
$ which rsync
/usr/local/bin/rsync
```

###Otros *nix
Para este tipo de sistemas siempre podemos utilizar el manejador de paquetes por defecto:

Para el Advanced Packaging Tool (`apt-get`)

```sh
$ apt-get update
$ apt-get upgrade
```

ó

```sh
$ apt-get install rsync
```

Para el Yellowdog Updater, Modified (`yum`)

```sh
$ yum update
$ yum upgrade
```

ó

```sh
$ yum install rsync
```

***
##Transferencia dentro del mismo equipo
Para demostrar inicialmente el funcionamiento de **rsync** veamos como transferir el contenido de un directorio a otro dentro de nuestro equipo.

Creemos un par de directorios y en uno de ellos meteremos unos archivos de prueba:

```sh
$ mkdir origen
$ mkdir destino
$ cd origen
~/origen $ touch prueba{1..9}
~/origen $ ls
prueba1 prueba2 prueba3 prueba4 prueba5 prueba6 prueba7 prueba8 prueba9
```

Luego le diremos a **rsync** que pase todos los archivos del directorio `origen` al directorio `destino`:

```sh
~/origen $ cd
$ rsync -a origen/ destino
```

> La opción `-a` indica que debe tomarse recursivamente el contenido del directorio, además se mantendrán los enlaces simbólicos, archivos especiales, permisos, dueños de archivos y tiempos de modificación. Suele ser la opción más común de transferencia.

Verifiquemos que en efecto se hayan transferido todos los archivos del directorio `origen` al `destino`:

```sh
$ cd destino
~/destino $ ls
prueba1 prueba2 prueba3 prueba4 prueba5 prueba6 prueba7 prueba8 prueba9
```

Quizás en este momento te estés preguntando que pudimos haber utilizado el comando común de copiar (`cp`) para realizar esto. Veamos una de las ventajas de **rsync**.

Agreguemos al directorio `destino` un último archivo y ejecutemos lo siguiente:

```sh
~/destino $ touch prueba10
~/destino $ cd
$ rsync -anv destino/ origen

sending incremental file list
./
prueba10

sent 158 bytes  received 22 bytes  360.00 bytes/sec
total size is 0  speedup is 0.00 (DRY RUN)
```

Notemos que hemos agregado un par de opciones más.

La opción `-v` permite ver una salida del proceso de transferencia, es por ello que vemos algunos datos de la misma esta vez.

La opción `-n` muestra el plan de transferencia sin realizarla en realidad (por ello el nombre `DRY RUN` en la salida), esto nos permite ver que acciones se realizarán en dicha transferencia. Esto nos permite apreciar que solo el archivo `prueba10` es el que se transferirá (porque es la única diferencia entre ambos directorios) y también el tamaño de data que se encuentra involucrada en la transferencia.

Si ejecutamos el comando sin la opción `-n` el archivo será transferido.

***
##Transferencia entre equipos remotos
Para transferencias remotas se recomienda que dentro de lo posible utilices el método de transferencia por SSH que explicaremos aquí, esto debido a que el canal de comunicación se encuentra cifrado y aporta un nivel de seguridad muy importante.

###Creación de llaves SSH

Una de las molestias más grandes del procedimiento de transferencia por SSH puede ser la necesidad de colocar la clave de acceso del destino cada vez que ejecutemos el comando `rsync`. Para evitarlo crearemos unas llaves SSH en nuestro equipo origen.

```sh
$ ssh-keygen -t rsa
```

Y sigue el procedimiento de creación de las llaves.

En mi caso utilizaré como equipo destino una maquina virtual de [Vagrant](http://codehero.co/como-instalar-y-configurar-vagrant/) configurada en una dirección estática, pero puedes seguir el procedimiento con cualquier otro segundo equipo que tengas a la mano.

Copiaremos nuestras llaves SSH publicas al equipo destino de la siguiente manera:

```sh
$ ssh-copy-id vagrant@192.168.33.10
```

Suponiendo que `vagrant` es el usuario del equipo destino y `198.168.33.10` la dirección del *host* de destino.

> Si estás en OS X y no tienes `ssh-copy-id` puedes instalarlo por [Homebrew](http://codehero.co/como-lo-hago-instalar-homebrew/) o sino puedes utilizar el equivalente:

> ```sh
> $ cat ~/.ssh/id_rsa.pub | ssh vagrant@192.168.33.10 "cat >> ~/.ssh/authorized_keys"
> ```

> Suponiendo que tomaste las opciones por defecto al crear las llaves SSH.

 Luego de esto nos pedirá la clave del equipo remoto para poder copiar las llaves.

```sh
vagrant@192.168.33.10's password:
```

Al finalizar este proceso no necesitaremos volver a introducir la clave para ingresar a este equipo por SSH, tratemos para verificarlo:

```sh
$ ssh vagrant@192.168.33.10
Welcome to Ubuntu 12.04.3 LTS (GNU/Linux 3.2.0-23-generic-pae i686)
Documentation:  https://help.ubuntu.com/
Welcome to your Vagrant-built virtual machine.
Last login: Sun Nov 24 02:41:21 2013 from 192.168.33.1
vagrant@precise32:~$
```

###Transferencia remota

Bien, ahora que tenemos nuestras llaves SSH para el equipo destino, podemos aplicar lo que aprendimos en la transferencia local de igual manera, solo que para indicar el destino debemos especificar el usuario y host donde se encuentra:

```sh
$ rsync -azP origen/ vagrant@192.168.33.10:destino_remoto
```

Notaremos unas opciones nuevas que hemos implementado.

La opción `-z` indica que los archivos deben ser comprimidos antes de ser enviados, esto permite que viaje menos información por la red y por ende será más rápido; sin embargo el proceso de compresión puede poner tu equipo bajo fuerte trabajo de procesamiento dependiendo del tamaño de los archivos.

La opción `-P` nos ofrece 2 cosas. Nos mostrará una barra de progreso de la transferencia y además nos permitirá reanudar transferencias que hayan sido interrumpidas anteriormente.

Verifiquemos que en efecto nuestra transferencia ha sido existosa:

```sh
$ ssh vagrant@192.168.33.10
...
vagrant@precise32:~$ ls
destino_remoto

vagrant@precise32:~$ cd destino_remoto/
vagrant@precise32:~/destino_remoto$ ls
prueba1  prueba10  prueba2  prueba3  prueba4  prueba5  prueba6  prueba7  prueba8  prueba9
```

##Conclusión
Hemos aprendido como transferir y sincronizar archivos y directorios entre los puntos de una red o equipo. Esto es solo el comienzo ya que las posibilidades de implementación de esta solución son muy variadas, como mantener al día tus librerías de iTunes en diferentes lugares por ejemplo. También puedes crear tareas programadas o *cron jobs* que ejecuten el comando de **rsync** periódicamente para que el proceso de sincronización sea automatizado o incluso puedes utilizar herramientas como [inotify](https://github.com/rvoicilas/inotify-tools/wiki) (para Linux) o [fswatch](https://github.com/alandipert/fswatch) (para Mac OS X) los cuales te permiten ejecutar un *script* cuando cambie un archivo dentro de un directorio, tu *script* puede ser tan sencillo como ejecutar el comando **rsync** cada vez que un archivo cambie, esto te dará sincronización automatizada al instante.

