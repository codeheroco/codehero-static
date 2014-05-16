---
layout: post
status: publish
published: true
title: Cómo Instalar y Configurar Vagrant
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
date: 2013-07-16 00:00:02.000000000 -04:30
thumbnail: http://i.imgur.com/730GOjs.png
description: En este ¿Cómo lo hago?, daremos solución a los problemas de virtualización mediante el uso de una herramienta de construcción de ambientes, Vagrant.
dificultad: Aprendiz
duracion: 20
categories:
- Cómo lo hago
- Vagrant
tags:
- howto
- como lo hago
- vagrant
- virtual
- maquina virtual
- provision
- cajas
- ubuntu
- linux
---
Es posible que en múltiples ocasiones te hayas encontrado en necesidad de un ambiente virtual de desarrollo. Quizás muchas veces lo necesitaste para hacerte la vida más fácil y no lo sabías. En este ¿Cómo lo hago?, daremos solución a estos problemas mediante el uso de una herramienta de construcción de ambientes, Vagrant.

***

##¿Qué es Vagrant?

Es una herramienta de código abierto cuyo objetivo principal es la creación y configuración de ambientes virtuales de desarrollo de manera muy ligera, reproducible y portátil. Esto con el fin de ser desplegado múltiples veces sin dificultad en diferentes ambientes que harán de su hogar, de ahí su nombre de Vagrant (vagabundo). Estos ambientes pueden estar proveídos por populares servicios como VirtualBox, VMWare y AWS pero debe funcionar correctamente con cualquier otro proveedor.

El corazón de cada instancia de maquina virtual se denomina `Vagrantfile`, el cual es un archivo que describe la configuración de la maquina requerida, este archivo es a menudo sometido a control de versiones para permitir a los desarrolladores levantar el ambiente con un simple comando y comenzar manipular el proyecto.

Una de las grandes ventajas del uso de Vagrant es su integración con herramientas de suministro como ***Chef*** y ***Puppet*** las cuales se basan en la creación de *recetas*  o scripts que permiten alterar la configuración, instalar de software y mucho más durante el proceso de levantamiento del ambiente.
***

##¿Por qué lo necesito?

Repasemos un par de las situaciones comunes durante el desarrollo de un proyecto para ayudar a determinar las ventajas del uso de Vagrant.


**P:** ¿Cuantas veces nos ha pasado cuando estamos desarrollando en equipo que hay cosas que a algunos les funciona en su equipo y a otro no?

> Este enfoque permite que todos puedan estar trabajando bajo una copia exacta del mismo ambiente, con la misma configuración y las mismas dependencias. Las diferencias ya no son un excusa ni un problema.

**P:** ¿Necesitas probar tu código en una plataforma especifica para verificar su funcionamiento?

> Con Vagrant puedes crear ambientes desechables a la medida rápidamente.

**P:** ¿Ya te habías encontrado con estos problemas antes y decidiste hacer las maquinas virtuales manualmente en tu programa favorito de virtualización, pero personalizarla a tus necesidades específicas no fue  sencillo ni rápido?

> Usa algún suministrador o crea tus mismas rutinas que se encarguen de todo al levantar el ambiente.

***

##¿Cómo lo instalo?
Antes que nada debemos tener instalado algún software de virtualización como Virtualbox.

***Nota:*** *Vagrant viene de paquete con el proveedor de Virtualbox; sin embargo soporta muchas otros pero deben ser instalados aparte como si fueran plugins.*

Primero debemos ir a la [página oficial de descargas](http://downloads.vagrantup.com/), obtener el instalador según nuestro sistema operativo y seguir el proceso regular de instalación de software convencional. Esto agregará el comando `vagrant` al *PATH* de nuestro sistema lo cual nos permitirá ejecutarlo por el terminal.

***

##¿Cómo comienzo?

Lo primero que debemos hacer es crear un `Vagrantfile` el cual definirá la raíz del proyecto y describir el tipo de maquina, recursos y software necesarios para correr el proyecto.

###Crear el Vagrantfile

Iniciemos nuestro terminal y creemos un directorio en el cual estará alojado nuestro proyecto y definámoslo como un directorio para que Vagrant lo use:

```sh
$ mkdir vagrant_ejemplo
$ cd vagrant_ejemplo
$ vagrant init
```

Esto creará el Vagrantfile en nuestro nuevo directorio.

Si estas utilizando herramientas de control de versiones como [Git](http://codehero.co/git-desde-cero-instalacion-configuracion-y-comandos-basicos/) es recomendable que el `Vagrantfile` sea incluido en el control de versiones para de esta manera permitir a los demás desarrolladores aprovechar al máximo las ventajas que nos ofrece Vagrant.

De igual manera, si tienes algún proyecto ya existente que quieras adaptar a Vagrant puede navegar a su directorio raíz y ejecutar el comando:

```sh
$ vagrant init
```

###Obtener la caja

Se le llama caja o *Box* a la imagen base que son usadas para clonar las maquinas virtuales.
Nuestro siguiente paso será buscar y descargar la caja del sistema operativo que queremos utilizar para nuestro proyecto.

Para esto podemos [ingresar a este portal](http://www.vagrantbox.es/) para ver una lista de algunas de las cajas disponibles. En este caso elijamos una caja común de Ubuntu y descarguémosla:

```sh
$ vagrant box add mi_caja_ubuntu_precise_32 http://files.vagrantup.com/precise32.box
```

Esto descargará una caja Ubuntu Precise 32bit y la almacenará bajo el nombre especificado en un directorio manejado por Vagrant ubicado en *~/.vagrant.d/boxes*

Finalmente podemos listar las cajas instaladas en nuestro sistema:
```sh
$ vagrant box list

mi_caja_ubuntu_precise_32 (virtualbox)
```


###Usar la caja
Debemos decirle al `Vagrantfile` de nuestro proyecto que esta nueva caja es la que vamos a usar. para esto lo abrimos con el editor de preferencia y podremos notar mucho código de ejemplo comentado que nos servirá en un futuro para configurar con más detalle. Por el momento nos interesa cambiar una línea cerca del inicio del archivo que por defecto tiene lo siguiente:

```sh
config.vm.box = "base"
```

Lo cambiaremos para especificar el nombre de la caja que usaremos:

```sh
config.vm.box = "mi_caja_ubuntu_precise_32"
```



###Levantar el ambiente

Ya estamos listos para iniciar nuestra máquina virtual, solo debemos ejecutar el siguiente comando y la instancia será levantada en breves instantes:
```sh
$ vagrant up
```

Debido a que este tipo de implementación no ofrece interfaz gráfica, para acceder a la instancia como tal debemos entrar en ella vía SSH:

```sh
$ vagrant ssh
```

Podemos ver que ya tenemos una máquina virtual de Ubuntu levantada con un mínimo esfuerzo.

Si no queremos trabajar con el ambiente en un tiempo podemos suspenderlo con:
```sh
$ vagrant suspend
```

Lo cual nos permitirá levantarla en cuestión de pocos segundos cuando la queramos volver a usar por medio del comando
```sh
$ vagrant resume
```
Sin embargo debemos tener en cuenta que tener el ambiente bajo este modo consume espacio en disco debido a que el estado de la maquina virtual que suele almacenarse en RAM debe pasar a disco.

También podemos apagarlo tradicionalmente con el comando:

```sh
$ vagrant halt
```
Esto detendrá la máquina virtual completamente y requerirá levantarla como explicamos inicialmente.

Para determinar el estado actual del ambiente puedes ejecutar el siguiente comando en el directorio raíz del proyecto:
```sh
$ vagrant status
```
Esto nos informará el estado actual del ambiente.

Luego de que hayas jugado un poco con la máquina virtual cruda, si quieres desecharla y destruir cualquier rastro de la misma puedes hacerlo saliendo de la sesión SSH y ejecutando:

```sh
$ vagrant destroy
```

Ya la máquina virtual no existe.

***

##Configuración

Veamos algunos detalles básicos de configuración que nos serán de gran utilidad al trabajar con Vagrant.

###Carpetas sincronizadas
La carpeta del proyecto que contiene el `Vagrantfile` comparte los archivos entre el sistema anfitrión y el virtualizado, esto nos permite compartir archivos fácilmente entre los ambientes. Para identificar la carpeta compartida dentro del ambiente virtual volvamos a levantarlo:

```sh
$ vagrant up
…
$ vagrant ssh
…
ls /vagrant
```

Esto nos mostrará que efectivamente el directorio */vagrant* dentro del ambiente virtual posee el mismo `Vagrantfile` que se encuentra en nuestro sistema anfitrión. Cualquier archivo que coloquemos en este directorio será accesible desde cualquiera de los 2 extremos.

###Enrutamiento de puertos

Uno de los casos más comunes cuando tenemos una máquina virtual es la situación que estamos trabajando con proyectos enfocados a la web, y para acceder a las páginas no es lo más cómodo tener que meternos por terminal al ambiente virtual y llamarlas desde ahí, aquí entra en juego el enrutamiento de puertos, para esto localizaremos el `Vagrantfile` y le agregaremos una línea como esta:

```sh
config.vm.network :forwarded_port, host: 4567, guest: 80
```

Esto indicará que el puerto 4567 del sistema anfitrión será enrutado al puerto 80 del ambiente virtualizado. Luego iniciamos el ambiente nuevamente, o si este ya se encuentra corriendo lo podemos reiniciar con:
```sh
$ vagrant reload
```

Si en nuestro sistema anfitrión nos dirigimos al explorador de internet y colocamos:

```sh
http://127.0.0.1:4567
```

En realidad estaremos accediendo al puerto 80 de nuestro sistema virtualizado.

###Suministro

Quizás el aspecto con mayor beneficios del enfoque que usa Vagrant es el uso de herramientas de suministro, el cual consiste en correr una receta o una serie de scripts durante el proceso de levantamiento del ambiente virtual que permite instalar y configurar un sin fin piezas de software, esto con el fin de que el ambiente previamente configurado y con todas las herramientas necesarias una vez haya sido levantado.

> La semana entrante hablaremos de **Chef**, una herramienta de suministro que se integra muy bien con Vagrant y está basada en la creación de recetas.

Por ahora suministremos al ambiente virtual con un pequeño script que instale *Apache*.
Copiemos las siguiente líneas en un archivo y guardémoslo en el directorio raíz del proyecto como `instala_apache.sh`:

```sh
#!/usr/bin/env bash

apt-get update
apt-get install -y apache2
rm -rf /var/www
ln -fs /vagrant /var/www
```

Luego modifiquemos el `Vagrantfile` y agreguemos la siguiente línea a la configuración:

```sh
config.vm.provision :shell, :path => "instala_apache.sh"
```

Esto le indicará a Vagrant que debe usar la herramienta nativa `shell` para suministrar el ambiente virtual con el archivo `instala_apache.sh`.

Luego iniciamos el ambiente nuevamente, o si este ya se encuentra corriendo lo podemos reiniciar con:
```sh
$ vagrant reload
```

Y podremos notar en la salida del levantamiento del ambiente como se va instalando el paquete de *Apache* que indicamos:

![apacheInstallOutput](http://i.imgur.com/HqBIkdc.png)

Para verificar que efectivamente el servidor *Apache* ha sido levantado podemos navegar a la siguiente ruta mediante un explorador web que configuramos anteriormente:

```sh
http://127.0.0.1:4567
```

Y si todo ha salido bien veremos algo como esto:

![apacheAccess](http://i.imgur.com/lFeL1gZ.png)

***
##Conclusión

En este tutorial dimos los primeros pasos con Vagrant para instalar y configurar un ambiente virtual en tiempo record, como hemos podido observar, la magia del funcionamiento de la herramienta reside en la facilidad y automatización de configuración e instalación de software. Lo que vimos aquí es solo un abreboca de las posibilidades que existen, no te pierdas la próxima semana cuando hablemos de la herramienta **Chef** y sus recetas y ver de lo que es capaz la cooperación entre estas herramientas.

> **Actualización:** [¿Cómo lo hago? Instalar y configurar Chef](http://codehero.co/como-instalar-y-configurar-chef/), ya está al aire.
