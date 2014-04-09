---
layout: post
status: publish
published: true
title: Cómo Instalar y usar Docker
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
date: 2013-09-10 00:00:53.000000000 -04:30
thumbnail: http://i.imgur.com/aFoOgeD.png
description: Docker nos permite crear contenedores o aplicaciones empacadas auto-suficientes y livianas que son capaces de funcionar en prácticamente cualquier ambiente
dificultad: Intermedio
duracion: 20
categories:
- Cómo lo hago
- Docker
tags:
- howto
- como lo hago
- vagrant
- docker
- contenedor
---
Es muy común que nos encontremos desarrollando una aplicación y llegue el momento que decidamos tomar todos sus archivos y migrarlos ya sea al ambiente de producción, de prueba o simplemente probar su comportamiento en diferentes plataformas y servicios. Para situaciones de este estilo existen herramientas que, entre otras cosas, nos facilitan el embalaje y despliegue de la aplicación, es aquí donde entra en juego Docker.

***
##¿Qué es Docker?
Esta herramienta nos permite crear lo que ellos denominan **contenedores**, lo cual son aplicaciones empaquetadas auto-suficientes, muy livianas que son capaces de funcionar en prácticamente cualquier ambiente, ya que tiene su propio sistema de archivos, librerías, terminal, etc.

> Actualmente Docker se encuentra bajo pesados procesos de desarrollo y cada actualización es vital, por lo que no se recomienda que sea utilizado en ambientes de producción hasta que alcance la versión 1.0.

***
##¿Cómo lo instalo?
El procedimiento de instalación por excelencia es bajo ambientes Ubuntu, por lo tanto será el que explicaremos aquí. En este caso particular ya que no poseo un computador con Linux, usaremos una instancia Ubuntu Precise 64bit de [Vagrant](http://codehero.co/como-instalar-y-configurar-vagrant/); sin embargo no seguiremos las instrucciones proporcionadas por la página de Docker para la instalación especifica por Vagrant para hacer el procedimiento lo más parecido a lo nativo en un ambiente Ubuntu.

> Al momento de este escrito, Docker no soporta sistemas x86.

Debido a que Docker funciona mejor con el kernel 3.8 veamos si nuestra instancia aplica para este propósito

```sh
$ uname -a
Linux precise64 3.2.0-23-generic...
```

Ya que esta versión de Ubuntu viene con la 3.2 debemos actualizarlo, así que inicialmente haremos:

```sh
$ sudo apt-get install linux-image-generic-lts-raring linux-headers-generic-lts-raring
```

Luego procedemos a reiniciar el sistema

```sh
$ sudo reboot
```

Probemos que en efecto el kernel fue actualizado:

```sh
$ uname -a
Linux precise64 3.8.0-30-generic...
```

Bien, ahora agreguemos el repositorio de Docker y sus llaves lista local de fuentes y llavero local:

```sh
$ sudo sh -c "curl https://get.docker.io/gpg | apt-key add -"
...
$ sudo sh -c "echo deb https://get.docker.io/ubuntu docker main > /etc/apt/sources.list.d/docker.list"
...
```

Volvemos a refrescar la lista de fuentes e instalamos el paquete de Docker:

```sh
$ sudo apt-get update
...
$ sudo apt-get install lxc-docker
...
```

Verifiquemos que fue instalado:

```sh
$ docker -v
Docker version 0.6.1, build 5105263
```

###Procedimiento Vagrant
Dije que no lo instalaríamos utilizando el procedimiento de [Vagrant](http://codehero.co/como-instalar-y-configurar-vagrant/), pero por si acaso si deseas hacerlo solo debes descargar los archivos fuente del repositorio de Docker:

```sh
$ git clone https://github.com/dotcloud/docker.git
```

Y luego tan solo levantar el ambiente, la configuración en el `Vagrantfile` se encargará de descargar todos los archivos necesarios como una *caja* Ubuntu Precise 64bit e instalar todas las dependencias necesarias para el correcto funcionamiento de Docker:

```sh
$ cd docker
$ vagrant up
...
```

Luego solo debemos entrar a la instancia y corroborar que en efecto Docker está instalado:

```sh
$ vagrant ssh
…
vagrant@precise64:~$ docker -v
Docker version 0.6.1, build 5105263
```
***

{% include middle-post-ad.html %}

##¿Cómo lo uso?
Antes que nada, se recomienda *demonizar* Docker, para esto solo debemos ejecutar:

```sh
$ sudo docker -d &
```

Igual que cuando utilizamos [Vagrant](http://codehero.co/como-instalar-y-configurar-vagrant/), debemos especificar la imagen base del sistema que utilizará el contenedor, para esto haremos:

```sh
$ docker pull base
```

Una vez teniendo la imagen base podemos empezar a trabajar sobre ella, probemos meternos a su terminal:

```sh
$ docker run -i -t base /bin/bash

2013/09/08 19:34:36 POST /v1.4/containers/create
2013/09/08 19:34:36 POST /v1.4/containers/78c9c995707b/start
2013/09/08 19:34:36 POST /v1.4/containers/78c9c995707b/resize?h=24&w=127
2013/09/08 19:34:36 POST /v1.4/containers/78c9c995707b/attach?logs=1&stderr=1&stdin=1&stdout=1&stream=1

root@78c9c995707b:/# ls -A
.dockerinit  bin  boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  selinux  srv  sys  tmp  usr  var
```

Como puedes notar estamos dentro del terminal del contenedor. Ya que el mismo posee su propio sistema operativo (Ubuntu en este caso), podemos instalar y ejecutar lo que consideremos pertinente para nuestro ambiente portátil. Probemos por ejemplo instalando [Nginx](http://codehero.co/como-instalar-nginx/):

```sh
root@78c9c995707b:/# apt-get update
…
root@78c9c995707b:/# apt-get install nginx
…
root@78c9c995707b:/# nginx -v
nginx version: nginx/1.2.1
```

Ya tenemos nuestro contenedor auto-suficiente de Nginx, ahora debemos crear una nueva imagen con los cambios que hemos hecho, para esto **abramos en otra ventana de terminal** y busquemos el ID del mismo:

```sh
$ docker ps

ID                  IMAGE               COMMAND             CREATED             STATUS              PORTS
9593993899c1        base:latest         /bin/bash           3 minutes ago       Up 3 minutes
```

Ahora con esto podemos crear la nueva imagen a partir de los cambios que realizamos sobre la imagen base:

```sh
$ docker commit 9593993899c1 jonathanwiesel/nginx
```

> Los estándares de Docker estipulan que los nombres de las imagenes deben seguir el formate [nombre_usuario]/[nombre_imagen].

> Todo cambio que hagas en la imagen y no le hagas commit se perderá en cuanto se cierre el contenedor.

Luego podemos verificar que en efecto nuestra nueva imagen de Nginx está presente:

```sh
$ docker images

REPOSITORY             TAG                 ID                  CREATED             SIZE
jonathanwiesel/nginx   latest              15310c23deb2        7 seconds ago       12.34 kB (virtual 180.1 MB)
base                   latest              b750fe79269d        5 months ago        24.65 kB (virtual 180.1 MB)
base                   ubuntu-12.10        b750fe79269d        5 months ago        24.65 kB (virtual 180.1 MB)
base                   ubuntu-quantal      b750fe79269d        5 months ago        24.65 kB (virtual 180.1 MB)
base                   ubuntu-quantl       b750fe79269d        5 months ago        24.65 kB (virtual 180.1 MB)
```

Bien, tenemos una imagen con Nginx instalado, probemos ahora la magia de Docker. Iniciemos el contenedor de la siguiente manera:

```sh
$ docker run -p 80 -i -t jonathanwiesel/nginx /bin/bash
```

> El argumento `-p 80` le indica a Docker que debe mapear el puerto especificado del contenedor, en nuestro caso el puerto 80 es el puerto por defecto sobre el cual se levanta Nginx.

Una vez dentro iniciemos el servicio de Nginx:

```sh
root@ca88a0273698:/# service nginx start
Starting nginx: nginx.
```

Ahora **en una nueva ventana** ejecutaremos:

```sh
$ docker ps
ID                  IMAGE                         COMMAND             CREATED             STATUS              PORTS
ca88a0273698        jonathanwiesel/nginx:latest   /bin/bash           2 minutes ago       Up 2 minutes        49159->80
```

Podemos apreciar que la última columna nos indica que el puerto 80 del contenedor está redireccionado al puerto local 49159, vayamos al explorador y veamos si Nginx está haciendo lo suyo:

![](http://i.imgur.com/Bxkca2o.png)

> Normalmente te dirigirías a la dirección `localhost`, sin embargo en nuestro caso como estamos corriendo Docker dentro de Vagrant, se le ha asignado la IP estática 192.168.33.10 a la instancia de Vagrant para acceder a ella como si fuera otro computador en la red local. Muy al estilo Inception ;)

Veamos que Nginx está corriendo dentro de su propio contenedor auto-suficiente y logramos acceder a él desde el exterior.

***
##Conclusión
Esta semana aprendimos un poco sobre Docker, aprendimos a instalarlo y cómo crear nuestros propios contenedores, recuerda que Docker está en constante desarrollo por lo que es muy probable que mejore significativamente cuando alcance su primera versión estable. Este método muchos desarrolladores lo han utilizado para migrar sus aplicaciones completas a sus VPS y también para garantizar completa compatibilidad antes de cualquier migración, te invitamos a experimentar con esta herramienta y nos cuentes tu experiencia.
