---
layout: post
status: publish
published: true
title: Como Instalar y Utilizar Dokku
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
date: 2014-03-24 20:33:39.000000000 -04:30
thumbnail: http://i.imgur.com/HDWaNUg.png
description: Encapsular aplicaciones y el control de versiones son buena combinación al momento de optimizar y automatizar depliegues, por eso esta semana traemos Dokku.
dificultad: Intermedio
duracion: 20
github: https://github.com/codeheroco/prueba-dokku
categories:
- Cómo lo hago
- Dokku
tags:
- howto
- Git
- como lo hago
- node
- docker
- dokku
- heroku
- paas
---
A medida que la tecnología ha ido avanzando hemos logrado aprovechar las múltiples ventajas y facilidades que nos ofrece el encapsulamiento de las aplicaciones y a su vez aprovechar las bondades que conlleva el control de versiones para hacer despliegues sencillos y rápidos de las mismas. Por esta razón traemos **Dokku** esta semana a CODEHERO.
***
## Dokku - Heroku

Para lograr definir con mayor facilidad de lo que se trata Dokku debemos hablar primero de [Heroku](http://heroku.com).

Heroku, en esencia se puede encontrar en la categoría de los PaaS (plataforma como un servicio), es decir, el servicio que ofrecen es su plataforma o *hardware* como tal al igual que muchas soluciones existentes hoy en día para montar tus aplicaciones como AWS, Digital Ocean, Google Cloud Platform, entre otros.

Sin embargo, Heroku es mucho más que un VPS o un computador en la nube que puedes gestionar como cualquier otro, este se enfoca en ser una plataforma de aplicaciones, mientras otros servicios comunes te ofrecen instancias o computadores virtuales, Heroku maneja cada una de tus aplicaciones por separado de manera encapsulada.

### Ventajas

Despliegue de las aplicaciones mediante el control de versiones [Git](http://codehero.co/series/git-desde-cero/), cada aplicación es un repositorio, y cada *push* que hagas le indicará a Heroku que debe recompilar la aplicación con los nuevos cambios y volverla a servir.

Heroku sabe que tipo de aplicación es la que estas desarrollando y soporta la mayoría de los frameworks más modernos mediante lo que se denomina paquetes de construcción o *buildpacks*. ¡Así es! tu solo haz *push* y Heroku sabrá que tipo de aplicación es y como ejecutarla, todo sin instalar ningún software dependiente.

Y ni hablar de los [servicios conectados o *add-ons*](https://addons.heroku.com/) que ofrece para que puedas conectar directamente tu base de datos, sistemas de monitoreo, y mucho más directamente a tu aplicación.

***
## Dokku - Docker

Al observar a simple vista como es el funcionamiento de Heroku podrás notar que cada aplicación se encuentra encapsulada dentro de su propio ambiente, es aquí donde entra en juego la implementación de [Docker](http://codehero.co/como-instalar-y-usar-docker/).

Ya hablamos en dicha entrada de las ventajas y facilidades que Docker nos ofrece, ahora este enfoque combinado es el que vuelve todo más interesante.

***
## Entonces... ¿Qué es Dokku?

Así como su nombre lo dice, es un pequeño Heroku basado en Docker, este lo puedes montar en un VPS si lo deseas y tener tu propia implementación de Heroku para manejar tus aplicaciones.

Incluso algunos proveedores como Digital Ocean ofrecen una instancia (o *droplet*) ya con la imagen de Dokku para que no tengas que configurar nada. Aquí tomaremos el camino "largo" y lo instalaremos manualmente.

> **Para el momento de este escrito la última versión estable es la `v0.2.2` y es compatible con Ubuntu 12.04 x64bit. (Existen algunos problemas con 13.10 por el momento)**

***
## Instalación

> El proceso de instalación en esta entrada requiere de un VPS y un dominio propio, si quieres probarlo localmente visita [las instruciones en el repositorio.](https://github.com/codeheroco/prueba-dokku/blob/master/Instrucciones-Vagrant.md)

Primero nos dirigimos a nuestra instancia remota y debemos instalar una dependencias de python:

```sh
$ sudo apt-get install -y python-software-properties
```

Luego procedemos a instalar la última versión estable de Dokku:

```sh
$ wget -qO- https://raw.github.com/progrium/dokku/v0.2.2/bootstrap.sh | sudo DOKKU_TAG=v0.2.2 bash
```

Esto tomará aproximadamente 5 minutos. Dependiendo también de tu velocidad de internet claro está.

Ahora debemos acceder a nuestro gestor de DNS y crear un dominio y un subdominio tipo comodín que apunte a la dirección IP de la instancia donde se encuentra nuestro Dokku.

Suponiendo que la IP de nuestra instancia es 182.60.60.100 crearíamos los dominios algo así:

```
servidordokku.com ~> 182.60.60.100
*.servidordokku.com ~> 182.60.60.100
```

Verificamos si el archivo `/home/dokku/VHOST` existe y contiene dentro el *host* que definimos:

```sh
$ cat dokku/VHOST
servidordokku.com
```

> En caso de no existir el archivo, lo creamos y le escribimos manualmente el *host* .



Ahora desde nuestro computador de trabajo pasamos nuestras llaves SSH a la instancia asociadas al usuario:

```sh
$ cat ~/.ssh/id_rsa.pub | ssh servidordokku.com "sudo sshcommand acl-add dokku codehero"
```

Muy bien tenemos nuestro servidor Dokku preparado.

***

## Prueba

Clonemos el repositorio de esta entrada en nuestros computadores, es una sencilla aplicación hecha en Node.js:

```sh
$ git clone https://github.com/codeheroco/prueba-dokku.git
$ cd prueba-dokku
```

Como mencionamos anteriormente, el despliegue de las aplicaciones en Heroku, y por consiguiente en Dokku, se hace a través de git, para ello solo debemos agregar un remoto nuevo a nuestro repositorio, uno que se encuentre en nuestro `servidordokku`, probemos creando uno con el nombre `prueba-dokku`:

```sh
$ git remote add codehero dokku@servidordokku.com:prueba-dokku
```

Y ahora solo basta con empujar el proyecto a este nuevo repositorio:

```sh
$ git push codehero master

Counting objects: 12, done.
Delta compression using up to 2 threads.
Compressing objects: 100% (8/8), done.
Writing objects: 100% (12/12), 1.64 KiB | 0 bytes/s, done.
Total 12 (delta 0), reused 0 (delta 0)
-----> Building prueba-dokku ...
       Node.js app detected
-----> Requested node range:  0.10.x
-----> Resolved node version: 0.10.26
-----> Downloading and installing node
-----> Writing a custom .npmrc to circumvent npm bugs
-----> Installing dependencies
       npm http GET https://registry.npmjs.org/jade/1.3.0
       npm http GET https://registry.npmjs.org/express/3.5.0
       npm http 200 https://registry.npmjs.org/express/3.5.0
       npm http GET https://registry.npmjs.org/express/-/express-3.5.0.tgz
       npm http 200 https://registry.npmjs.org/express/-/express-3.5.0.tgz
       npm http 200 https://registry.npmjs.org/jade/1.3.0
       npm http GET https://registry.npmjs.org/jade/-/jade-1.3.0.tgz
       npm http 200 https://registry.npmjs.org/jade/-/jade-1.3.0.tgz

	...
	...
	...

-----> Caching node_modules directory for future builds
-----> Cleaning up node-gyp and npm artifacts
-----> Building runtime environment
-----> Discovering process types
       Procfile declares types -> web
-----> Releasing prueba-dokku ...
-----> Deploying prueba-dokku ...
-----> Cleaning up ...
=====> Application deployed:
       http://prueba-dokku.servidordokku.com

To dokku@servidordokku.com:prueba-dokku
 * [new branch]      master -> master
```

Podremos ver en la salida del terminal como Dokku detecta que tipo de aplicación es la que estamos empujando basándose en la estructura de los archivos y lo especificado en el `Procfile`. Actualmente Dokku soporta los [siguientes *buildpacks*](https://github.com/progrium/buildstep#supported-buildpacks).

> En el `Procfile` (o archivo de procesos) se especifica que tipo de proceso se debe ejecutar, como por ejemplo uno *web* o un *worker* (sin acceso web). Ademas se le indica el comando que debe ejecutar para correr las diferentes piezas de tu aplicación, en este caso por ser una aplicación de node.js basta con ejecutar el archivo principal con `node app.js`.

También podremos apreciar como Dokku se encarga de descargar las dependencias del proyecto (según se encuentran indicadas en el `package.json`), por lo que el proceso de despliegue de la aplicación es totalmente automatizado.  

Si abrimos nuestro navegador y nos dirigimos a `prueba-dokku.servidordokku.com` podremos notar nuestra aplicación ejecutandose.

![Dokku](http://i.imgur.com/juRmmth.png)

Por ello es que necesitamos el subdominio con comodín. Debido a que en nuestro servidor Dokku cada repositorio o aplicación se encuentra en un subdominio diferente con el nombre del mismo y todos deben apuntar a nuestro mismo servidor PaaS.

***
## Conclusión

Esta semana vimos como montar nuestro propio mini Heroku, ahora podemos desplegar nuestras aplicaciones de manera rápida, segura, fácil y encapsulada, siempre basándonos en grandes herramientas como Docker, Git y Heroku. Recuerda que Dokku se encuentra para el momento de este escrito en etapas de fuerte desarrollo por lo que muy probablemente vaya mejorando y extendiendo su funcionalidad a medida que pase el tiempo y los desarrolladores continúen colaborando con el proyecto.
