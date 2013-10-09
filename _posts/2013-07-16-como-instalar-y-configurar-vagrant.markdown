---
layout: post
status: publish
published: true
title: Cómo Instalar y Configurar Vagrant
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathanwiesel@gmail.com
author_url: http://jonathanwiesel.com/
wordpress_id: 1428
wordpress_url: http://codehero.co/?p=1428
date: 2013-07-16 00:00:02.000000000 -04:30
categories:
- Cómo lo hago
- Vagrant
tags:
- vagrant
- virtual
comments:
- id: 196
  author: Cómo Instalar y Configurar Chef | CODEHERO
  author_email: ''
  author_url: http://codehero.co/como-instalar-y-configurar-chef/
  date: '2013-07-23 00:51:10 -0430'
  date_gmt: '2013-07-23 05:21:10 -0430'
  content: '[...] La semana pasada hablamos de Vagrant, una herramienta muy útil que
    cumple el propósito de facilitar el proceso de construcción de ambientes virtuales
    de manera automatizada; sin embargo la instalación de software y su configuración
    en los ambientes es quizás una de las tareas más importantes de este proceso,
    es por ello que esta semana hablaremos de una de las más utilizadas herramientas
    de automatización y suministro, Chef. [...]'
---
<p>Es posible que en múltiples ocasiones te hayas encontrado en necesidad de un ambiente virtual de desarrollo. Quizás muchas veces lo necesitaste para hacerte la vida más fácil y no lo sabías. En este ¿Cómo lo hago?, daremos solución a estos problemas mediante el uso de una herramienta de construcción de ambientes, Vagrant.</p>

<hr />

<h2>¿Qué es Vagrant?</h2>

<p>Es una herramienta de código abierto cuyo objetivo principal es la creación y configuración de ambientes virtuales de desarrollo de manera muy ligera, reproducible y portátil. Esto con el fin de ser desplegado múltiples veces sin dificultad en diferentes ambientes que harán de su hogar, de ahí su nombre de Vagrant (vagabundo). Estos ambientes pueden estar proveídos por populares servicios como VirtualBox, VMWare y AWS pero debe funcionar correctamente con cualquier otro proveedor.</p>

<p>El corazón de cada instancia de maquina virtual se denomina <code>Vagrantfile</code>, el cual es un archivo que describe la configuración de la maquina requerida, este archivo es a menudo sometido a control de versiones para permitir a los desarrolladores levantar el ambiente con un simple comando y comenzar manipular el proyecto.</p>

<p>Una de las grandes ventajas del uso de Vagrant es su integración con herramientas de suministro como <a href="http://codehero.co/como-instalar-y-configurar-chef/"><strong><em>Chef</em></strong></a> y <strong><em>Puppet</em></strong> las cuales se basan en la creación de <em>recetas</em> o scripts que permiten alterar la configuración, instalar de software y mucho más durante el proceso de levantamiento del ambiente.</p>

<hr />

<h2>¿Por qué lo necesito?</h2>

<p>Repasemos un par de las situaciones comunes durante el desarrollo de un proyecto para ayudar a determinar las ventajas del uso de Vagrant.</p>

<p><strong>P:</strong> ¿Cuantas veces nos ha pasado cuando estamos desarrollando en equipo que hay cosas que a algunos les funciona en su equipo y a otro no?</p>

<blockquote>
  <p>Este enfoque permite que todos puedan estar trabajando bajo una copia exacta del mismo ambiente, con la misma configuración y las mismas dependencias. Las diferencias ya no son un excusa ni un problema.</p>
</blockquote>

<p><strong>P:</strong> ¿Necesitas probar tu código en una plataforma especifica para verificar su funcionamiento?</p>

<blockquote>
  <p>Con Vagrant puedes crear ambientes desechables a la medida rápidamente.</p>
</blockquote>

<p><strong>P:</strong> ¿Ya te habías encontrado con estos problemas antes y decidiste hacer las maquinas virtuales manualmente en tu programa favorito de virtualización, pero personalizarla a tus necesidades específicas no fue sencillo ni rápido?</p>

<blockquote>
  <p>Usa algún suministrador o crea tus mismas rutinas que se encarguen de todo al levantar el ambiente.</p>
</blockquote>

<hr />

<h2>¿Cómo lo instalo?</h2>

<p>Antes que nada debemos tener instalado algún software de virtualización como Virtualbox.</p>

<p><strong><em>Nota:</em></strong> <em>Vagrant viene de paquete con el proveedor de Virtualbox; sin embargo soporta muchas otros pero deben ser instalados aparte como si fueran plugins.</em></p>

<p>Primero debemos ir a la <a href="http://downloads.vagrantup.com/">página oficial de descargas</a>, obtener el instalador según nuestro sistema operativo y seguir el proceso regular de instalación de software convencional. Esto agregará el comando <code>vagrant</code> al <em>PATH</em> de nuestro sistema lo cual nos permitirá ejecutarlo por el terminal.</p>

<hr />

<h2>¿Cómo comienzo?</h2>

<p>Lo primero que debemos hacer es crear un <code>Vagrantfile</code> el cual definirá la raíz del proyecto y describir el tipo de maquina, recursos y software necesarios para correr el proyecto.</p>

<h3>Crear el Vagrantfile</h3>

<p>Iniciemos nuestro terminal y creemos un directorio en el cual estará alojado nuestro proyecto y definámoslo como un directorio para que Vagrant lo use:</p>

<pre>$ mkdir vagrant_ejemplo
$ cd vagrant_ejemplo
$ vagrant init
</pre>

<p>Esto creará el Vagrantfile en nuestro nuevo directorio.</p>

<p>Si estas utilizando herramientas de control de versiones como <a href="http://codehero.co/git-desde-cero-instalacion-configuracion-y-comandos-basicos/">Git</a> es recomendable que el <code>Vagrantfile</code> sea incluido en el control de versiones para de esta manera permitir a los demás desarrolladores aprovechar al máximo las ventajas que nos ofrece Vagrant.</p>

<p>De igual manera, si tienes algún proyecto ya existente que quieras adaptar a Vagrant puede navegar a su directorio raíz y ejecutar el comando:</p>

<pre>$ vagrant init
</pre>

<h3>Obtener la caja</h3>

<p>Se le llama caja o <em>Box</em> a la imagen base que son usadas para clonar las maquinas virtuales. Nuestro siguiente paso será buscar y descargar la caja del sistema operativo que queremos utilizar para nuestro proyecto.</p>

<p>Para esto podemos <a href="http://www.vagrantbox.es/">ingresar a este portal</a> para ver una lista de algunas de las cajas disponibles. En este caso elijamos una caja común de Ubuntu y descarguémosla:</p>

<pre>$ vagrant box add mi_caja_ubuntu_precise_32 http://files.vagrantup.com/precise32.box
</pre>

<p>Esto descargará una caja Ubuntu Precise 32bit y la almacenará bajo el nombre especificado en un directorio manejado por Vagrant ubicado en <em>~/.vagrant.d/boxes</em></p>

<p>Finalmente podemos listar las cajas instaladas en nuestro sistema:</p>

<pre>$ vagrant box list

mi_caja_ubuntu_precise_32 (virtualbox)
</pre>

<h3>Usar la caja</h3>

<p>Debemos decirle al <code>Vagrantfile</code> de nuestro proyecto que esta nueva caja es la que vamos a usar. para esto lo abrimos con el editor de preferencia y podremos notar mucho código de ejemplo comentado que nos servirá en un futuro para configurar con más detalle. Por el momento nos interesa cambiar una línea cerca del inicio del archivo que por defecto tiene lo siguiente:</p>

<pre>config.vm.box = "base"
</pre>

<p>Lo cambiaremos para especificar el nombre de la caja que usaremos:</p>

<pre>config.vm.box = "mi_caja_ubuntu_precise_32"
</pre>

<h3>Levantar el ambiente</h3>

<p>Ya estamos listos para iniciar nuestra máquina virtual, solo debemos ejecutar el siguiente comando y la instancia será levantada en breves instantes:</p>

<pre>$ vagrant up
</pre>

<p>Debido a que este tipo de implementación no ofrece interfaz gráfica, para acceder a la instancia como tal debemos entrar en ella vía SSH:</p>

<pre>$ vagrant ssh
</pre>

<p>Podemos ver que ya tenemos una máquina virtual de Ubuntu levantada con un mínimo esfuerzo.</p>

<p>Si no queremos trabajar con el ambiente en un tiempo podemos suspenderlo con:</p>

<pre>$ vagrant suspend
</pre>

<p>Lo cual nos permitirá levantarla en cuestión de pocos segundos cuando la queramos volver a usar por medio del comando</p>

<pre>$ vagrant resume
</pre>

<p>Sin embargo debemos tener en cuenta que tener el ambiente bajo este modo consume espacio en disco debido a que el estado de la maquina virtual que suele almacenarse en RAM debe pasar a disco.</p>

<p>También podemos apagarlo tradicionalmente con el comando:</p>

<pre>$ vagrant halt
</pre>

<p>Esto detendrá la máquina virtual completamente y requerirá levantarla como explicamos inicialmente.</p>

<p>Para determinar el estado actual del ambiente puedes ejecutar el siguiente comando en el directorio raíz del proyecto:</p>

<pre>$ vagrant status
</pre>

<p>Esto nos informará el estado actual del ambiente.</p>

<p>Luego de que hayas jugado un poco con la máquina virtual cruda, si quieres desecharla y destruir cualquier rastro de la misma puedes hacerlo saliendo de la sesión SSH y ejecutando:</p>

<pre>$ vagrant destroy
</pre>

<p>Ya la máquina virtual no existe.</p>

<hr />

<h2>Configuración</h2>

<p>Veamos algunos detalles básicos de configuración que nos serán de gran utilidad al trabajar con Vagrant.</p>

<h3>Carpetas sincronizadas</h3>

<p>La carpeta del proyecto que contiene el <code>Vagrantfile</code> comparte los archivos entre el sistema anfitrión y el virtualizado, esto nos permite compartir archivos fácilmente entre los ambientes. Para identificar la carpeta compartida dentro del ambiente virtual volvamos a levantarlo:</p>

<pre>$ vagrant up
…
$ vagrant ssh
…
ls /vagrant
</pre>

<p>Esto nos mostrará que efectivamente el directorio <em>/vagrant</em> dentro del ambiente virtual posee el mismo <code>Vagrantfile</code> que se encuentra en nuestro sistema anfitrión. Cualquier archivo que coloquemos en este directorio será accesible desde cualquiera de los 2 extremos.</p>

<h3>Enrutamiento de puertos</h3>

<p>Uno de los casos más comunes cuando tenemos una máquina virtual es la situación que estamos trabajando con proyectos enfocados a la web, y para acceder a las páginas no es lo más cómodo tener que meternos por terminal al ambiente virtual y llamarlas desde ahí, aquí entra en juego el enrutamiento de puertos, para esto localizaremos el <code>Vagrantfile</code> y le agregaremos una línea como esta:</p>

<pre>config.vm.network :forwarded_port, host: 4567, guest: 80
</pre>

<p>Esto indicará que el puerto 4567 del sistema anfitrión será enrutado al puerto 80 del ambiente virtualizado. Luego iniciamos el ambiente nuevamente, o si este ya se encuentra corriendo lo podemos reiniciar con:</p>

<pre>$ vagrant reload
</pre>

<p>Si en nuestro sistema anfitrión nos dirigimos al explorador de internet y colocamos:</p>

<pre>http://127.0.0.1:4567
</pre>

<p>En realidad estaremos accediendo al puerto 80 de nuestro sistema virtualizado.</p>

<h3>Suministro</h3>

<p>Quizás el aspecto con mayor beneficios del enfoque que usa Vagrant es el uso de herramientas de suministro, el cual consiste en correr una receta o una serie de scripts durante el proceso de levantamiento del ambiente virtual que permite instalar y configurar un sin fin piezas de software, esto con el fin de que el ambiente previamente configurado y con todas las herramientas necesarias una vez haya sido levantado.</p>

<blockquote>
  <p>La semana entrante hablaremos de <strong>Chef</strong>, una herramienta de suministro que se integra muy bien con Vagrant y está basada en la creación de recetas.</p>
  
  <p><strong>Actualización:</strong> <a href="http://codehero.co/como-instalar-y-configurar-chef/">¿Cómo lo hago? Instalar y configurar Chef</a>, ya está al aire.</p>
</blockquote>

<p>Por ahora suministremos al ambiente virtual con un pequeño script que instale <em>Apache</em>. Copiemos las siguiente líneas en un archivo y guardémoslo en el directorio raíz del proyecto como <code>instala_apache.sh</code>:</p>

<pre>#!/usr/bin/env bash

apt-get update
apt-get install -y apache2
rm -rf /var/www
ln -fs /vagrant /var/www
</pre>

<p>Luego modifiquemos el <code>Vagrantfile</code> y agreguemos la siguiente línea a la configuración:</p>

<pre>config.vm.provision :shell, :path => "instala_apache.sh"
</pre>

<p>Esto le indicará a Vagrant que debe usar la herramienta nativa <code>shell</code> para suministrar el ambiente virtual con el archivo <code>instala_apache.sh</code>.</p>

<p>Luego iniciamos el ambiente nuevamente, o si este ya se encuentra corriendo lo podemos reiniciar con:</p>

<pre>$ vagrant reload
</pre>

<p>Y podremos notar en la salida del levantamiento del ambiente como se va instalando el paquete de <em>Apache</em> que indicamos:</p>

<p><img src="http://cl.ly/image/1w3o3r47202E/Screen%20Shot%202013-07-15%20at%203.23.18%20PM.png" alt="apacheInstallOutput" /></p>

<p>Para verificar que efectivamente el servidor <em>Apache</em> ha sido levantado podemos navegar a la siguiente ruta mediante un explorador web que configuramos anteriormente:</p>

<pre>http://127.0.0.1:4567
</pre>

<p>Y si todo ha salido bien veremos algo como esto:</p>

<p><img src="http://cl.ly/image/2O2O2Q1V0H0E/Screen%20Shot%202013-07-15%20at%203.25.37%20PM.png" alt="apacheAccess" /></p>

<hr />

<h2>Conclusión</h2>

<p>En este tutorial dimos los primeros pasos con Vagrant para instalar y configurar un ambiente virtual en tiempo record, como hemos podido observar, la magia del funcionamiento de la herramienta reside en la facilidad y automatización de configuración e instalación de software. Lo que vimos aquí es solo un abreboca de las posibilidades que existen, no te pierdas la próxima semana cuando hablemos de la herramienta <strong>Chef</strong> y sus recetas y ver de lo que es capaz la cooperación entre estas herramientas.</p>

<blockquote>
  <p><strong>Actualización:</strong> <a href="http://codehero.co/como-instalar-y-configurar-chef/">¿Cómo lo hago? Instalar y configurar Chef</a>, ya está al aire.</p>
</blockquote>
