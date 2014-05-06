---
layout: post
status: publish
published: true
title: Introducción e Instalación
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
date: 2013-09-17 00:00:02.000000000 -04:30
serie: MongoDB desde Cero
description: MongoDB es una base de datos NoSQL enfocada a que los valores de las llaves (llamadas colecciones) son estructuras tipo JSON, es decir, objetos Javascript.
dificultad: Novato
duracion: 10
categories:
- Cursos
- MongoDB
tags:
- Base de datos
- mongo
- mongodb
- nosql
- instalar
- sql
---
Las bases de datos relacionales están pasando de moda, los desarrolladores optan cada vez más por opciones novedosas de NoSQL debido a sus altos niveles de rendimiento y fácil escalabilidad. Hace unas semanas hablamos de las bondades de [Redis](http://codehero.co/como-instalar-configurar-y-usar-redis/); sin embargo algunos andan temerosos por tener poco tiempo y prefieren una solución con un poco más de reputación, es por esto que esta semana hablaremos de las base de datos NoSQL más utilizada, MongoDB.

***
##¿Qué es MongoDB?
Es una base de datos NoSQL de código abierto, este tipo de soluciones se basan en el principio de almacenar los datos en una estructura tipo llave-valor; MongoDB por su lado se enfoca específicamente en que los valores de estas llaves (llamadas **colecciones**) son estructuras tipo JSON (llamados **documentos**), es decir objetos Javascript, lenguaje sobre el cual se basa esta solución de base de datos. Esto facilitará su manipulación a muchos que ya conozcan el lenguaje.

MongoDB posee varias estrategias de manejo de datos que la han posicionado donde se encuentra hoy en día, tales como sus procesos de división de datos en distintos equipos físicos o también conocido como ***clusterización***, también el caso similar de documentos muy grandes que superen el limite estipulado de 16MB se aplica una estrategia llamada GridFS que automáticamente divide el documento en pedazos y los almacena por separado, al recuperar el documento el *driver* se encarga de armar automáticamente el documento nuevamente.

La estructura de almacenamiento es tan flexible que uno de los hechos importantes que se comparten al introducir esta base de datos es que:

> Distintos documentos en la misma colección no deben tener obligatoriamente los mismos campos o estructura. Inclusive documentos con campos en común no tienen necesariamente que tener el mismo tipo de dato.

***
##¿Cómo lo instalo?
Bien, ya estamos ansiosos y desesperados, procedamos con la instalación.

###Mac OS X
Si haz leído varios de nuestros [Cómo Lo Hago](http://codehero.co/category/como-lo-hago/), sabrás que el método por excelencia para instalar en Mac OS X es… [Homebrew](http://codehero.co/como-lo-hago-instalar-homebrew/):

```sh
$ brew install mongodb
```

Para gestionar el servicio de MongoDB basta con ejecutar:

```sh
$ brew services [ start | stop | restart ] mongodb
```

###Sistemas basados en Debian

Primero debemos importar la llave pública GPG y crear el archivo de fuentes:

```sh
$ sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
...
$ echo 'deb http://downloads-distro.mongodb.org/repo/debian-sysvinit dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
...
```

Ahora actualizamos los repositorios e instalamos MongoDB:

```sh
$ sudo apt-get update
...
$ sudo apt-get install mongodb-10gen
...
```

> Si estas en una versión de 64 bits de tu sistema operativo Debian deberás indicar un parámetro de configuración indicado que deseas tomar la versión de 64 bits del binario de MongoDB.

> ```sh
> $ sudo apt-get install -o apt::architecture=amd64 mongodb-10gen
> ```


Para gestionar el servicio de MongoDB basta con ejecutar:

```sh
$ sudo service mongodb [ start | stop | restart | status ]
```

ó

```sh
$ sudo /etc/init.d/mongodb [ start | stop | restart ]
```

***

###Sistemas Fedora, CentOS y RedHat
Para estos sistemas de igual manera se recomienda instalar MongoDB usando un manejador de paquetes, en este caso YUM. Para esto debemos primero crear el archivo `/etc/yum.repos.d/10gen.repo` para configurar el repositorio.

Si tu sistema es de 32bit le agregaremos al archivo lo siguiente:

```
[10gen]
name=10gen Repository
baseurl=http://downloads-distro.mongodb.org/repo/redhat/os/i686
gpgcheck=0
enabled=1
```

ó si es de 64bit:

```
[10gen]
name=10gen Repository
baseurl=http://downloads-distro.mongodb.org/repo/redhat/os/x86_64
gpgcheck=0
enabled=1
```

Luego procedemos a instarlo ejecutando el comando:

```sh
$ yum install mongo-10gen mongo-10gen-server
```

Para gestionar el servicio de MongoDB basta con ejecutar:

```sh
$ sudo service mongod [ start | stop | restart | status ]
```

##Windows
Dirigete a la [página de oficial de MongoDB](http://www.mongodb.org/downloads) y descarga el comprimido según la arquitectura de tu sistema operativo.

A partir de la versión 2.2, MongoDB no es compatible con Windows XP.

> Si tienes Windows Server 2008 o 7, debes instalar [esta actualización](http://support.microsoft.com/kb/2731284) para evitar un problema conocido con archivos mapeados en memoria.

Luego lo descomprimiremos y, según las recomendaciones, creamos un directorio `mongodb` en el directorio raíz `C:` donde colocaremos el contenido del comprimido, luego crearemos en `C:` un directorio `data` y dentro de este un directorio `db`, aquí será donde MongoDB almacenará la información de las bases de datos.

Para hacer que MongoDB funcione como un servicio primero crea el directorio `log` dentro de `C:\mongodb\` y luego ejecutaremos el siguiente comando para crear el archivo de configuración asociado:

```sh
$ echo logpath=C:\mongodb\log\mongo.log > C:\mongodb\mongod.cfg
```

Luego instalemos el servicio:

```sh
$ C:\mongodb\bin\mongod.exe --config C:\mongodb\mongod.cfg --install
```

Ahora para gestionar el servicio de MongoDB basta con ejecutar:

```sh
$ net [ start | stop ] MongoDB
```

***



##¿Cómo lo configuro?
Buscaremos y editaremos el archivo de configuración.

###Mac OS X

```sh
/usr/local/etc/mongod.conf
```

###Sistemas Debian, Fedora, CentOS y RedHat

```sh
/etc/mongodb.conf
```

###Windows

```sh
C:\mongodb\mongod.cfg
```

Hablemos de algunas de las variables de mayor uso en este archivo.

* `port` especificación del puerto donde escucha la base de datos.
* `bind_ip` permite delimitar especificamente qué IPs pueden interactuar con la base de datos.
* `maxConns` cantidad máxima de conexiones que serán aceptados, el valor por defecto depende de la cantidad de descriptores de archivos que maneja el sistema operativo.
* `objcheck` habilitado por defecto, obliga a `mongod` a verificar cada petición para asegurar que la estructura de los documentos que insertan los clientes sea siempre válida. Cabe destacar que para documentos complejos esta opción puede afectar un poco el rendimiento.
* `fork` inhabilitado por defecto, permite ejecutar `mongod` como un *daemon*.
* `auth` inhabilitado por defecto, permite limitar el acceso remoto a la base de datos al implementar un mecanismo de autenticación.
* `dbpath` especifica el directorio donde la instancia de base de datos almacena toda su información.
* `directoryperdb` inhabilitado por defecto, ofrece la opción de que la información de cada base de datos presente en la instancia se almacene en carpetas separadas.
* `journal` al habilitarse permite que las operaciones realizadas sobre la data sean almacenadas en una bitácora para en caso de ocurrir una falla, el sistema sea capaz de reconstruir la información que haya podido perderse.
* `smallfiles` inhabilitado por defecto, ofrece la opción de que los archivos creados sean más pequeños y, por ende, más fáciles de entender, procesar y monitorear en varias ocasiones.
* `syncdelay` especifica el lapso en segundos que tardará la instancia en pasar la información en la bitácora a persistencia.

También se ofrecen varias opciones para el uso de SSL, configuración de replicación y clusterización lo cual no tocaremos aquí.
***

##Entrar a la consola
Bien ahora ya estamos listos para entrar a la base de datos y comenzar a jugar con ella. Para ello luego de tener el servicio de MongoDB corriendo, ejecutaremos el comando `mongo` y esto nos llevará a la consola interna de la instancia.

> Para ir a la consola de MongoDB en sistemas Windows, si seguiste las instrucciones en el curso anterior, luego de iniciar el servicio, ejecuta el archivo `C:\mongodb\bin\mongo.exe`

***
##Conclusión
Esta semana vimos solo un abreboca de lo que es capaz MongoDB, lo instalamos y vimos algunos detalles sobre su configuración, que la desesperación no te impida llegar a la semana que viene para aprender a utilizarlo. Hasta entonces.
