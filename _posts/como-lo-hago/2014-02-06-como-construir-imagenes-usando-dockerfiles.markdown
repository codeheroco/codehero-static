---
layout: post
status: publish
published: true
title: Cómo construir imágenes usando Dockerfiles
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
date: 2014-02-06 01:21:50.000000000 -04:30
thumbnail: http://i.imgur.com/lWvUxzn.png
description: Docker utiliza un archivo llamado Dockerfile en conjunto con su DSL para automatizar el proceso de crear contenedores, nosotros te explicamos como hacerlo!
dificultad: Aprendiz
duracion: 30
categories:
- Cómo lo hago
- Docker
tags:
- howto
- como lo hago
- nginx
- docker
- Dockerfile
---
En una entrada anterior vimos como se instalaba y se utilizada *Docker* para crear ambientes tanto de desarrollo como producción que funcionaran como embalaje para desplegar la aplicación. En esta veremos como se automatiza el proceso de creación de imágenes utilizando un conjunto de instrucciones que nos presta *Docker* en una especie de [DSL](http://es.wikipedia.org/wiki/Lenguaje_espec%C3%ADfico_del_dominio) para facilitarnos la vida.

> Si no leíste la [entrada anterior](http://codehero.co/como-instalar-y-usar-Docker/) te recomendamos hacerlo ya que entenderás mucho mejor lo que ocurrirá aquí y te servirá de guía si aún no lo has instalado.

* * *

##¿Qué necesitamos para automatizar una imagen?

Para automatizar el proceso de creación de imágenes necesitamos pocas cosas:

- Tener Docker instalado.
- Crear un Dockerfile.
- Conocer un poco el DSL.
- Saber que tarea repetitiva queremos automatizar.
- Construir el contenedor.
- Ser felices.

* * *

## ¿Qué es un *Dockerfile* y cómo se crea?

Un *Dockerfile* no es más que un archivo que reconoce Docker y que contiene una serie de instrucciones para automatizar el proceso de creación de un contenedor. En pocas palabras en este archivo vamos a agregar todo lo que necesitemos en nuestro contenedor para que cada vez que queramos correr el *script* de construcción obtengamos un contenedor completamente fresco y actualizado.

### ¿Cómo creo un *Dockerfile*?

Para crear este archivo debemos hacerlo de manera manual, utilizando el comando `touch` en un directorio de vuestra preferencia.

```sh
$ touch Dockerfile
```

Este comando se encuentra en todos los Sistemas Operativos basados en Unix, si quieren utilizarlo en Windows pueden hacer uso de esta librería [unxutils](http://unxutils.sourceforge.net/) o sencillamente crearlo de otra manera.

* * *

## ¿Cómo construyo el contenedor?

Una vez que hayamos creado el *Dockerfile* vamos a poder hacer uso del comando `build` que proporciona Docker. Este comando se encarga de correr una a una las líneas que se encuentran dentro del archivo y al finalizar si todo salió correctamente tendremos un contenedor listo para usar.

### Comando build

El comando `build` lo podemos utilizamos de la siguiente manera:

```sh
$ docker build -t nombre/nombre-de-contenedor .
```

Con este comando estamos utilizando el Dockerfile que se encuentra en la carpeta o directorio donde estamos parados, y creando una imagen que se llama nombre/nombre-de-contenedor. El parámetro `-t` dentro del comando `build` se utiliza para marcar o nombrar un contenedor y de esta manera poder ubicarlo fácilmente.

> El *nombre* es referente a el nombre de la persona que crea el contenedor o nombre del proyecto que lo utilizará. El *nombre-del-contenedor* será el identificador personal de ese contenedor. El conjunto de nombre/nombre-de-contenedor son utilizados para especificar el nombre del REPOSITORIO tanto en Docker como en su [indice](https://index.docker.io/).

* * *

## Conociendo el DSL de docker

En está entrada construiremos un contenedor de nginx basado en Ubuntu y su versión LTS 12.04 que nos funcione para servir cualquier página web. En la [entrada anterior](http://codehero.co/como-instalar-y-usar-Docker/) hicimos algo similar aquí automatizaremos el proceso y haremos algo un poco más complejo.

Comencemos agregando las siguientes líneas al *Dockerfile*:

### FROM Y MAINTAINER

```sh
FROM ubuntu:12.04
MAINTAINER Alberto Grespan "alberto@codehero.co"
```

Aquí le estamos indicando a Docker que cuando vaya a crear nuestro contenedor realice lo siguiente:

- Busca en tú índice de imágenes una que se llama `ubuntu:12.04` y utilízala como base de nuestro contenedor. Es decir que nuestro contenedor se basará en la estructura de carpetas, archivos y paquetes que conoce y tiene esta versión de Ubuntu.
- El creador y mantenedor de la imagen se llama *Alberto Grespan* y su correo es *alberto@codehero.co*

Estos son aspectos importantes que debemos conocer, ya que son la base que rige el resto de los comandos que utilizaremos.

### RUN y ENV

El comando `RUN` ejecuta directamente comandos dentro de el contenedor, y luego persiste los cambios en el contenedor una vez persistidos los cambios continua al siguiente paso (línea) que se encuentre en el *Dockerfile*.

El comando `ENV` como se pueden imaginar establece variables de ambiente de nuestro contenedor y funciona de la misma manera que un `export` en Linux o Unix. Algo **muy importamte** con respecto a esto, es que las variables de ambiente se pasan a todas las instrucciones de `RUN` que se ejecuten posteriores a su declaración.

```sh
RUN apt-get update -y

RUN apt-get install -y language-pack-en
ENV LANGUAGE en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LC_ALL en_US.UTF-8

RUN locale-gen en_US.UTF-8
RUN dpkg-reconfigure locales
```

No quiero entrar mucho en detalles de Sistema Operativo pero, estamos actualizando la paquetería conocida por Ubuntu y luego instalando un paquete de lenguajes en inglés, estoy instalando el de inglés porque casi todo necesita estar en `en_US.UTF-8` lamentablemente, y la codificación es un tema bastante complejo.

{% include middle-post-ad.html %}

Una vez que la actualización de paquetes e instalación culminan estoy estableciendo las variables de ambientes del contenedor referentes al lenguaje del mismo y configurando el contenedor para que las utilice por defecto.

> Si vas a hacer un contenedor de Ruby te recomiendo utilices esta serie de comandos antes descritos para ahorrarte una pesadilla.

```sh
RUN apt-get install -y python-software-properties vim

RUN add-apt-repository "deb http://archive.ubuntu.com/ubuntu $(lsb_release -sc) universe"
RUN add-apt-repository ppa:nginx/stable

RUN apt-get update -y
RUN apt-get update -y --fix-missing

RUN apt-get -y install nginx
```

En este fragmento le estamos diciendo a Ubuntu que se aprenda un nuevo URL a un repositorio oficial de nginx el cual nos permitirá instalar la última versión estable de nginx que a la fecha es la `1.4.4`. Una vez aprendido el repositorio instalaremos dicha versión.

### ADD, EXPOSE y CMD

El comando `ADD` es utilizado para copiar archivos hacia el contenedor, por lo tanto utiliza dos argumentos que son la fuente y el destino, si la fuente es un URL Docker se encarga de bajar el archivo de Internet y copiarlo al destino descrito.

Por otro lado el comando `EXPOSE` lo utilizamos para asociar puertos, permitiéndonos exponer un contenedor con el mundo (la computadora anfitrión).

El comando `CMD` es de cierta manera muy similar al comando `RUN` con la ligera diferencia que no se ejecuta el comando descrito cuando se corre el comando `build` sino cuando instanciamos (ponemos a funcionar) el contenedor.

```sh
RUN mv /etc/nginx/nginx.conf /etc/nginx/nginx.conf.old
ADD https://gist.github.com/albertogg/8837962/raw/5f49760b953cfafe5cdcab5c2a1350bd7f3b244b/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx"]
```

Que sucede en esta última etapa de nuestro contenedor, pues estamos cambiando el nombre de la configuración que trae nginx por defecto a `/etc/nginx/nginx.conf.old` ya que no deberíamos borrar nada *nunca* y mediante el comando `ADD` estamos descargando una configuración personalizada que he hecho para vosotros. Podemos decir que la única particularidad que tiene es que nginx no corre daemonizado sino que corre en foreground para mantener nuestro contenedor activo.

Utilizando el comando `EXPOSE` estamos indicando que nuestro contenedor debe exponer el puerto 80 a la máquina anfitrión y por último en lo que arranquemos el contenedor se ejecutará el `CMD` y el mismo debe debe correr el comando `nginx` para comenzar a servir nuestra página.

### ENTRYPOINT, VOLUME y WORKDIR

El comando `VOLUME` permite al contenedor crear un punto de montura mediante un nombre, es decir si escribimos `VOLUME ["/var/www"]` estaremos creando un punto de montura en el directorio especificado y esto permite compartir dicho punto de montura con otros contenedores o con la máquina anfitrión.

El comando `WORKDIR` es bastante sencillo, el mismo nos permite especificarle a Docker en que directorio va a ejecutar un `CMD`. Puede ser algo cómo `WORKDIR /var/www`

El comando `ENTRYPOINT` se utiliza generalmente en conjunto con el comando `CMD` y este especifica un comando a ejecutar, se utiliza principalmente cuando estamos repitiendo mucho el uso de un comando particular. Un ejemplo:

```sh
CMD "Hola mundo!"
ENTRYPOINT ["/bin/echo"]
```

Esto ejecutará el `CMD` cuando el contenedor arranque e imprimirá el mensaje `Hola mundo!`. Cabe destacar que el comando `ENTRYPOINT` solo se puede declarar una vez.

* * *

## ¿Cómo correr el contenedor creado?

Una vez que hayamos terminado de agregar al *Dockerfile* todo lo que hemos visto en esta entrada y hayamos utilizado el comando `build` y todo haya salido como se espera deberíamos ver algo así cuando ejecutemos el siguiente comando:

```sh
vagrant@packer-virtualbox:~$ sudo docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             VIRTUAL SIZE
codehero/nginx      latest              01ede6f2dbd6        1 days ago         590.1 MB
ubuntu              12.04               8dbd9e392a96        10 months ago       128 MB
```

El ver que nuestra imagen se encuentra creada nos dice que todo ha salido correctamente y podemos lanzar el contenedor a ruedo. Para realizar esto empleamos el siguiente comando:

```sh
$ NGINX=$(sudo docker run -d -p 80:80 codehero/nginx)
```

Aquí estamos creando una variable de ambiente llamada `NGINX` que ejecuta el contenedor en *background* `-d` y está indicándole a la máquina anfitrión que su puerto `-p` 80 va a estar atado al puerto 80 del contenedor, por consiguiente todo lo que sirvamos desde nuestro contenedor mediante nginx será visto en la máquina anfitrión directamente sin especificar ningún puerto.

Si prueban colocar la dirección IP de su máquina virtual en su navegador de internet podrán apreciar la famosa página que contiene el mensaje **Welcome to nginx!**.

* * *

## Conclusión

Esta semana pudimos adentrarnos un poco más en esta increíble herramienta llamada Docker. Aprendimos como automatizar el proceso de crear un contenedor mediante su DSL. Puedo dar fe que teniendo bajo la manga el conocimiento de la automatización a la hora de crear contenedores te puede ayudar a olvidarte de los famosos ambientes de producción y desarrollo ya que muy fácilmente puedes emular la máquina de producción o simplemente desplegar tu aplicación en la máquina de producción con el mismo contenedor que utilizaste en el desarrollo, salvando días de angustia. Te invitamos a experimentar un poco más con Docker y que nos dejes cualquier comentario que desees referente a él!
