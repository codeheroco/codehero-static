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
<p>La necesidad de tener la misma información en distintos lugares viene siendo una que cada vez va tomando más fuerza, esto debido a que nuestro espacio de trabajo es variable y queremos tener nuestras herramientas siempre con nosotros o inclusive como medidas de respaldo, por ello esta semana hablaremos de una de las herramientas que hacen esto posible, se trata nada más y nada menos que de <strong>rsync</strong>.</p>

<hr />

<h2>¿Qué es rsync?</h2>

<p>Es una herramienta de código abierto de transferencia de archivos y directorios entre una ubicación y otra. Sus ventajas se basan principalmente en la compresión de la información a enviar, permite que la transferencia se realice mediante un canal SSH y que transfiere solo los archivos y trozos de archivos que han sido modificados en lugar de transferir el archivo completo nuevamente, algo parecido a lo que sucede al transferir las diferencias en un archivo bajo el control de versiones <a href="http://codehero.co/git-desde-cero-instalacion-configuracion-y-comandos-basicos/">Git.</a></p>

<p>Entre los diferentes usos que se le dan a rsync se encuentran los siguientes:</p>

<ul>
<li>Respaldos automatizados a discos o servidores remotos.</li>
<li>Sincronización de archivos y directorios remotos.</li>
<li>Transferencia común de archivos.</li>
</ul>

<hr />

<h2>¿Cómo lo instalo?</h2>

<p>Es probable que tu computador ya posea esta herramienta, para verificarlo podemos ejecutar el siguiente comando:</p>

<pre>$ rsync --version
rsync  version 2.6.9  protocol version 29
....
$ which rsync
/usr/bin/rsync
</pre>

<p>Para el momento de este escrito, la ultima versión de rsync es la 3.1.0, por lo tanto si prefieres utilizar la más actualizada en lugar de la que trae por defecto tu computador veamos como puedes instalarlo o actualizarlo:</p>

<h3>Mac OS X</h3>

<p>Instalaremos con <a href="http://codehero.co/como-lo-hago-instalar-homebrew/">Homebrew</a> como de costumbre:</p>

<pre>$ brew update
$ brew install rsync
</pre>

<p>Reiniciemos el terminal y veamos que ahora estamos utilizando la última versión</p>

<pre>$ exec $SHELL -l
$ rsync --version
rsync  version 3.1.0  protocol version 31
...
$ which rsync
/usr/local/bin/rsync
</pre>

<h3>Otros *nix</h3>

<p>Para este tipo de sistemas siempre podemos utilizar el manejador de paquetes por defecto:</p>

<p>Para el Advanced Packaging Tool (<code>apt-get</code>)</p>

<pre>$ apt-get update
$ apt-get upgrade
</pre>

<p>ó</p>

<pre>$ apt-get install rsync
</pre>

<p>Para el Yellowdog Updater, Modified (<code>yum</code>)</p>

<pre>$ yum update
$ yum upgrade
</pre>

<p>ó</p>

<pre>$ yum install rsync
</pre>

<hr />

<h2>Transferencia dentro del mismo equipo</h2>

<p>Para demostrar inicialmente el funcionamiento de <strong>rsync</strong> veamos como transferir el contenido de un directorio a otro dentro de nuestro equipo.</p>

<p>Creemos un par de directorios y en uno de ellos meteremos unos archivos de prueba:</p>

<pre>$ mkdir origen
$ mkdir destino
$ cd origen
~/origen $ touch prueba{1..9}
~/origen $ ls
prueba1 prueba2 prueba3 prueba4 prueba5 prueba6 prueba7 prueba8 prueba9
</pre>

<p>Luego le diremos a <strong>rsync</strong> que pase todos los archivos del directorio <code>origen</code> al directorio <code>destino</code>:</p>

<pre>~/origen $ cd
$ rsync -a origen/ destino
</pre>

<blockquote>
  <p>La opción <code>-a</code> indica que debe tomarse recursivamente el contenido del directorio, además se mantendrán los enlaces simbólicos, archivos especiales, permisos, dueños de archivos y tiempos de modificación. Suele ser la opción más común de transferencia.</p>
</blockquote>

<p>Verifiquemos que en efecto se hayan transferido todos los archivos del directorio <code>origen</code> al <code>destino</code>:</p>

<pre>$ cd destino
~/destino $ ls
prueba1 prueba2 prueba3 prueba4 prueba5 prueba6 prueba7 prueba8 prueba9
</pre>

<p>Quizás en este momento te estés preguntando que pudimos haber utilizado el comando común de copiar (<code>cp</code>) para realizar esto. Veamos una de las ventajas de <strong>rsync</strong>.</p>

<p>Agreguemos al directorio <code>destino</code> un último archivo y ejecutemos lo siguiente:</p>

<pre>~/destino $ touch prueba10
~/destino $ cd
$ rsync -anv destino/ origen

sending incremental file list
./
prueba10

sent 158 bytes  received 22 bytes  360.00 bytes/sec
total size is 0  speedup is 0.00 (DRY RUN)
</pre>

<p>Notemos que hemos agregado un par de opciones más.</p>

<p>La opción <code>-v</code> permite ver una salida del proceso de transferencia, es por ello que vemos algunos datos de la misma esta vez.</p>

<p>La opción <code>-n</code> muestra el plan de transferencia sin realizarla en realidad (por ello el nombre <code>DRY RUN</code> en la salida), esto nos permite ver que acciones se realizarán en dicha transferencia. Esto nos permite apreciar que solo el archivo <code>prueba10</code> es el que se transferirá (porque es la única diferencia entre ambos directorios) y también el tamaño de data que se encuentra involucrada en la transferencia.</p>

<p>Si ejecutamos el comando sin la opción <code>-n</code> el archivo será transferido.</p>

<hr />

<h2>Transferencia entre equipos remotos</h2>

<p>Para transferencias remotas se recomienda que dentro de lo posible utilices el método de transferencia por SSH que explicaremos aquí, esto debido a que el canal de comunicación se encuentra cifrado y aporta un nivel de seguridad muy importante.</p>

<h3>Creación de llaves SSH</h3>

<p>Una de las molestias más grandes del procedimiento de transferencia por SSH puede ser la necesidad de colocar la clave de acceso del destino cada vez que ejecutemos el comando <code>rsync</code>. Para evitarlo crearemos unas llaves SSH en nuestro equipo origen.</p>

<pre>$ ssh-keygen -t rsa
</pre>

<p>Y sigue el procedimiento de creación de las llaves.</p>

<p>En mi caso utilizaré como equipo destino una maquina virtual de <a href="http://codehero.co/como-instalar-y-configurar-vagrant/">Vagrant</a> configurada en una dirección estática, pero puedes seguir el procedimiento con cualquier otro segundo equipo que tengas a la mano.</p>

<p>Copiaremos nuestras llaves SSH publicas al equipo destino de la siguiente manera:</p>

<pre>$ ssh-copy-id vagrant@192.168.33.10
</pre>

<p>Suponiendo que <code>vagrant</code> es el usuario del equipo destino y <code>198.168.33.10</code> la dirección del <em>host</em> de destino.</p>

<blockquote>
  <p>Si estás en OS X y no tienes <code>ssh-copy-id</code> puedes instalarlo por <a href="http://codehero.co/como-lo-hago-instalar-homebrew/">Homebrew</a> o sino puedes utilizar el equivalente:</p>

  <p><code>$ cat ~/.ssh/id_rsa.pub | ssh vagrant@192.168.33.10 "cat &gt;&gt; ~/.ssh/authorized_keys"</code></p>

  <p>Suponiendo que tomaste las opciones por defecto al crear las llaves SSH.</p>
</blockquote>

<p>Luego de esto nos pedirá la clave del equipo remoto para poder copiar las llaves.</p>

<pre>vagrant@192.168.33.10's password:
</pre>

<p>Al finalizar este proceso no necesitaremos volver a introducir la clave para ingresar a este equipo por SSH, tratemos para verificarlo:</p>

<pre>$ ssh vagrant@192.168.33.10
Welcome to Ubuntu 12.04.3 LTS (GNU/Linux 3.2.0-23-generic-pae i686)
Documentation:  https://help.ubuntu.com/
Welcome to your Vagrant-built virtual machine.
Last login: Sun Nov 24 02:41:21 2013 from 192.168.33.1
vagrant@precise32:~$
</pre>

<h3>Transferencia remota</h3>

<p>Bien, ahora que tenemos nuestras llaves SSH para el equipo destino, podemos aplicar lo que aprendimos en la transferencia local de igual manera, solo que para indicar el destino debemos especificar el usuario y host donde se encuentra:</p>

<pre>$ rsync -azP origen/ vagrant@192.168.33.10:destino_remoto
</pre>

<p>Notaremos unas opciones nuevas que hemos implementado.</p>

<p>La opción <code>-z</code> indica que los archivos deben ser comprimidos antes de ser enviados, esto permite que viaje menos información por la red y por ende será más rápido; sin embargo el proceso de compresión puede poner tu equipo bajo fuerte trabajo de procesamiento dependiendo del tamaño de los archivos.</p>

<p>La opción <code>-P</code> nos ofrece 2 cosas. Nos mostrará una barra de progreso de la transferencia y además nos permitirá reanudar transferencias que hayan sido interrumpidas anteriormente.</p>

<p>Verifiquemos que en efecto nuestra transferencia ha sido existosa:</p>

<pre>$ ssh vagrant@192.168.33.10
...
vagrant@precise32:~$ ls
destino_remoto

vagrant@precise32:~$ cd destino_remoto/
vagrant@precise32:~/destino_remoto$ ls
prueba1  prueba10  prueba2  prueba3  prueba4  prueba5  prueba6  prueba7  prueba8  prueba9
</pre>

<h2>Conclusión</h2>

<p>Hemos aprendido como transferir y sincronizar archivos y directorios entre los puntos de una red o equipo. Esto es solo el comienzo ya que las posibilidades de implementación de esta solución son muy variadas, como mantener al día tus librerías de iTunes en diferentes lugares por ejemplo. También puedes crear tareas programadas o <em>cron jobs</em> que ejecuten el comando de <strong>rsync</strong> periódicamente para que el proceso de sincronización sea automatizado o incluso puedes utilizar herramientas como <a href="https://github.com/rvoicilas/inotify-tools/wiki">inotify</a> (para Linux) o <a href="https://github.com/alandipert/fswatch">fswatch</a> (para Mac OS X) los cuales te permiten ejecutar un <em>script</em> cuando cambie un archivo dentro de un directorio, tu <em>script</em> puede ser tan sencillo como ejecutar el comando <strong>rsync</strong> cada vez que un archivo cambie, esto te dará sincronización automatizada al instante.</p>
