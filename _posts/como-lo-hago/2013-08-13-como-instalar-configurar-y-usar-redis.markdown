---
layout: post
status: publish
published: true
title: Cómo instalar, configurar y usar Redis - Parte I
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
wordpress_id: 1969
wordpress_url: http://codehero.co/?p=1969
date: 2013-08-13 00:00:11.000000000 -04:30
thumbnail: http://i.imgur.com/lrn4QBG.png
categories:
- Cómo lo hago
- Redis
tags:
- howto
- instalacion
- redis
---
Nos encontramos en una época donde la velocidad en términos tecnológicos es una obligación. Cada día los sistemas se vuelven más poderosos y más capaces, lo cual nos ha acostumbrado a querer resultados lo más pronto posible. Este enfoque también ha abarcado el tema del almacenamiento de datos, este proceso en altos niveles de concurrencia suele ser un poco lento, lo peor es que muchas veces necesitamos bases de datos que no necesariamente tienen que poseer tablas relacionadas sino más bien tablas aisladas y de igual manera terminamos usando un MySQL, esta semana hablaremos de una novedosa solución que se está tomando fuerza rápidamente, la base de datos Redis.

***
##¿Qué es Redis?
Es una solución de código abierto de almacenamiento de datos NoSQL basado en una estructura de Llave-Valor (*key-value*). El concepto de este tipo de bases de datos se enfoca en aquellos casos donde una estructura relacional no es necesaria sino más bien un identificador asociado a un valor o un conjunto de valores. Su nombre es un acrónimo de **S**ervidor de **DI**ccionario **RE**moto, puedes encontrar el código fuente del proyecto en su [respositorio de Github](https://github.com/antirez/redis).

Redis es sumamente veloz, esto debido a su sencilla estructura ausente de lógica relacional y su punto más importante, **la base de datos está cargada en memoria**, por ello sus altos niveles de velocidad. No te preocupes, incluso cuando la información está en memoria y en efecto se pedería al apagarse el computador, Redis posee 2 estrategias de persistencia para mantener los datos seguros de los cuales hablaremos en la parte de configuración.

> Si piensas manejar grandes volúmenes de datos que podrían sobrepasar tus capacidades de memoria, debes pensar en utilizar una base de datos basada en disco para los datos que no vayan a ser manipulados con tanta frecuencia y utilizar Redis para aquellos de alto nivel de uso (como datos de sesión, tokens, cuentas, etc.)

Es capaz de manejar altísimos niveles de concurrencia, por defecto esta establecido en 10000 pero puede ser fácilmente cambiado en la configuración. En este caso, la cantidad real de clientes que puede atender simultáneamente viene dada por la cantidad de descriptores de archivo que pueda manejar el sistema.

> En Mac OS X se puede ver la cantidad de descriptores disponibles ejecutando el comando `launchctl limit`, en la variable maxfiles.

> En otros sistemas *nix puedes utilizar el comando `cat /proc/sys/fs/file-max`.

>Este valor es editable.


Otra ventaja de Redis es su facilidad para implementar estrategias de replicación de datos, teniendo un servidor central de Redis o *maestro* al cual responden varios servidores secundarios o *esclavos*, esto ofrece un gran nivel de escalabilidad y permite establecer ambientes de alta disponibilidad con mínimo esfuerzo.

Redis también puede ser utilizado para desarrollar soluciones enfocadas al paradigma de mensajería de [publicaciones y suscripciones](http://en.wikipedia.org/wiki/Publish/subscribe), sin embargo no haremos énfasis en esto.

***
##Tipos de datos

Debido a la naturaleza Llave-Valor de la estructura de Redis, tenemos siempre una llave, el identificador único para cada registro en la base de datos, a una llave se le pueden asignar los siguientes tipos de dato:

* Cadenas de caracteres

Esta es quizás la más fácil de entender, simplemente una llave posee un valor común y corriente tipo *string*:

```
Representación:
llave => valor
```

* Listas

Este tipo de dato permite almacenar varias cadenas de caracteres ordenadas por orden de inserción en una llave, muy parecido al concepto de pilas y colas:

```
Representación:
llave =>  valor1
          valor2
          …
```

* Juegos o *Sets*

Permite asignar a una llave una serie de cadenas de caracteres que no posee ningún orden. Una característica importante de los *sets* es que no permite miembros duplicados, al tratar de insertar un valor duplicado en un juego, este último solo tendrá una copia del mismo.

Su representación gráfica podría ser parecida a la de las listas aunque sin tomar en cuenta el orden de inserción.

* Juegos ordenados o *Sorted sets*

Lo primero que pensarías que es es una lista que no permite duplicados, según lo que vimos anteriormente, pues no. Un juego ordenado, al igual que un juego convencional es una serie de cadenas de caracteres no duplicados que tienen asociado un puntaje, al cada miembro poseer un puntaje se determina el orden del juego del menor a mayor puntaje.

```
Representación:
llave =>  80 valor2
          25 valor1
          10 valor3
          …
```

* Hashes

Este tipo de dato es quizás uno de los más interesantes ya que suelen utilizarse para definir objetos o mapas. Un hash permite asignar a una llave una serie de atributos y valores, tal como lo haría un objeto común, veamos un ejemplo para apreciarlo mejor:

```
Representación:
user:1000 =>  usuario    jonathanwiesel
              email      jonathanwiesel@gmail.com
              nombre     Jonathan Wiesel
              …
```

>Podemos notar en la nomenclatura usada para definir la llave que tratamos de seguir un estándar como si estuviéramos usando una tabla de base de datos común, donde *user* sería la tabla y *1000* el id del usuario, el uso de este tipo de nomenclatura no es obligatorio pero es recomendado para representar una estructura lógica y ordenada que sea fácilmente legible para cualquiera que manipule la base de datos.

***
##Instalación

###*nix

Antes que nada debemos asegurarnos de tener instalado en nuestro sistema las herramientas de compilación tales como `build-essentials` (sistemas basados en Debian), `Development Tools` (sistemas basados en Fedora/Red Hat) o similares.

> Si no lo tienes no podrás ejecutar el comando `make`, en sistemas basados en Debian puedes instalarlo de la siguiente manera:

>```sh
$ sudo apt-get update
$ sudo apt-get install build-essential
>```

Además debemos tener la dependencia del Lenguaje de Herramientas de Comando o *tcl*.

>Su instalación en sistemas basados en Debian sería:
>```sh
$ sudo apt-get install tcl8.5
>```

Ahora si, procedemos a descargar la ultima versión estable dirigiéndonos a la [página de descargas de redis](http://redis.io/download) o simplemente lo hacemos vía *wget* de la siguiente manera:

```sh
$ wget http://redis.googlecode.com/files/redis-2.6.14.tar.gz
```

> Suponiendo que la última versión es la 2.6.14.

Luego descomprimimos el *.tar.gz*  y navegamos al nuevo directorio para compilar el código fuente y pruebas de velocidad y exactitud :

```sh
$ tar xzf redis-2.6.14.tar.gz
$ cd redis-2.6.14
$ make
$ make test
```

Finalmente lo instalamos:

```sh
$ sudo make install
```

Una vez instalado podemos utilizar un *script* que viene por defecto para poner a funcionar tu servidor Redis:

```sh
$ cd utils
$ sudo ./install_server.sh
```

Por ahora aceptemos la configuración predeterminada que nos pida el *script* ya que más adelante lo modificaremos manualmente según nuestras necesidades.

Una vez haya terminado el servidor se encontrará corriendo en el fondo.

###Mac OS X
Como de costumbre, el método predilecto de instalación es usando [Homebrew](http://codehero.co/como-lo-hago-instalar-homebrew/) ejecutando el comando:

```sh
$ brew install redis
```

Si queremos iniciar el servidor Redis como un servicio debemos ejecutar el siguiente comando:
```sh
$ brew services start redis
```

De lo contrario podemos ejecutar:
```sh
$ redis-server /usr/local/etc/redis.conf
```

Para ambos casos esto iniciará el servidor utilizando el archivo de configuración que trae Redis por defecto.

###Prueba

Finalmente probemos que nuestro servidor Redis esté funcionando ejecutando el comando `redis-cli`, y veremos algo como esto:

```sh
redis 127.0.0.1:6379>
```

Esto nos indica que en efecto nos hemos conectado al servidor Redis, en este caso en la dirección de *localhost* escuchando en el puerto estándar `6379`. Aquí podremos ejecutar comandos propios de Redis, tal como si nos hubiésemos conectado por terminal a una base de datos MySQL.

***

##Conclusión

Esta semana aprendimos un poco sobre el poder de Redis, su estructura y cómo instalarlo, la próxima semana estaremos tocando la parte de configuración, comandos básicos y otros detalles interesantes para que le saques el máximo provecho a esta nueva solución de almacenamiento de datos.

> **Actualización:** La segunda parte de este Cómo Lo Hago [ya se encuentra disponible.](http://codehero.co/como-instalar-configurar-y-usar-redis-parte-ii/)
