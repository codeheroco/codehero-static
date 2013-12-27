---
layout: post
status: publish
published: true
title: Cómo instalar, configurar y usar Redis – Parte II
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
wordpress_id: 1996
wordpress_url: http://codehero.co/?p=1996
date: 2013-08-20 00:00:05.000000000 -04:30
thumbnail: http://i.imgur.com/lrn4QBG.png
categories:
- Cómo lo hago
- Redis
tags:
- redis
- configurar
- instalar
- comandos
- consejos
---
La semana pasada [estuvimos conociendo Redis](http://codehero.co/como-instalar-configurar-y-usar-redis/), vimos algunos detalles sobre las ventajas que ofrece, lo instalamos, aprendimos sobre su estructura y tipos de datos. Hoy continuaremos el tema y hablaremos de la configuración de la instancia y lo que esto implica, además conoceremos varios comandos básicos para que puedas empezar a sacarle provecho a tu nueva base de datos, también hablaremos de otros detalles que expanden las capacidades de Redis y algunos consejos a tomar en cuenta.

***
##Configuración

El archivo de configuración de Redis es bastante intuitivo y fácil de configurar, busquémoslo y veamos algunos detalles de su contenido.

###*nix

```sh
/etc/redis/6379.conf
```

>Si aceptamos las opciones por defecto al crear el servidor, el archivo de configuración tendrá el nombre del puerto por defecto `6379`.

###Mac OS X

```sh
/usr/local/etc/redis.conf
```

</br>
Veamos algunas de las cosas que podemos especificar en la configuración:

* Demonizar el servicio.
```
daemonize yes
```

* Cambiar el puerto donde escucha el servidor:
```
port 6379
```

* Que el servidor esté atado a una única dirección.
```
bind 127.0.0.1
```

Esto permitirá que sólo la dirección especificada pueda acceder a la base de datos.

* Frecuencia de salvado en persistencia

```
save 900  1
save 300  10
save 60   10000
```

La configuración por defecto establece 3 casos, pero puedes agregar los que consideres necesarios:

Guardar en persistencia cada 60 segundos si al menos 1000 llaves han sido cambiadas, cada 5 minutos si al menos 10 llaves han cambiado o cada 15 minutos si al menos una llave cambió.

> Recuerda que Redis mantiene la base de datos en memoria y es importante que tener respaldada su información en disco.

* Replicación

Establecer servidores Redis de replicación de datos es sumamente sencillo, tan solo debes establecer quién es la base datos maestra:

```
slaveof IP_del_maestro Puerto_del_maestro
```

Si el servidor maestro posee clave lo debemos especificar:

```
masterauth password
```

Una vez establecido este parámetro, la base de datos *esclava* se sincronizará automaticamente con la *maestra*.

Además puedes especificar el tiempo si los esclavos solo serán capaces de recibir llamadas de lectura:

```
slave-read-only yes
```

* Seguridad

Evidentemente es posible asignarle una clave de acceso a la base de datos:

```
requirepass mi_password
```

Adicionalmente, debido a que el comando nativo CONFIG permite cambiar la configuración de la instancia mientras funciona, podemos renombrar este comando para que cualquiera que trata de modificarlo con malas intenciones se le vea dificultada su tarea:

```
rename-command CONFIG b840fc02d524045429941cc15f59e41cb7be6c52
```

O inclusive podemos deshabilitar el comando asignándole una cadena vacía:

```
rename-command CONFIG ""
```

* Bitacora de persistencia

Redis posee una segunda estrategia de persistencia que consiste en guardar en un archivo, la bitácora o lista de todos los comandos y/o acciones que han sido ejecutadas, esto con el fin de que si la base de datos falla, al levantarse nuevamente la información puede ser reconstruida nuevamente siguiente dicha bitácora.

```
appendonly no
```
***
##Comandos Básicos

Veamos algunos de los comandos más utilizados al interactuar con Redis, para echar un vistazo a la lista completa puedes visitar [la página oficial](http://redis.io/commands).

* Cadenas de caracteres

```sh
> SET llavePrueba valor1
OK

> GET llavePrueba
"valor1"

> DEL llavePrueba
(integer) 1

> GET llavePrueba
(nil)
```

>Guarda una llave con el valor especificado y obtiene su valor, y finalmente elimina el par de llave-valor. La salida de `(integer) 1` luego de borrar indica que el comando fue ejecutado satisfactoriamente.

* Contadores y expiraciones

```sh
> SET llaveNumerica 1
OK

> INCR llaveNumerica
(integer) 2

> INCRBY llaveNumerica 5
(integer) 7
```

>Si el valor de una llave es numerico es posible incrementaro con `INCR` y `INCRBY`.


```sh
> EXPIRE llaveNumerica 10
(integer) 1

> TTL llaveNumerica
(integer) 6
…
> GET llaveNumerica
(nil)
```

>Podemos colocar un tiempo de vencimiento de la llave para que sea eliminada después del tiempo especificado, el comando `TTL` nos arroja el tiempo de vida que le queda a la llave (Time To Live), si la llave es *seteada* nuevamente, el tiempo de expiración será eliminado.

* Juegos

```sh
> SADD juegos ajedrez
(integer) 1

> SADD juegos ludo
(integer) 1

> SADD juegos monopolio
(integer) 1

> SMEMBERS juegos
1) "monopolio"
2) "ajedrez"
3) "ludo"

> SREM juegos ajedrez
(integer) 1

> SISMEMBER juegos ajedrez
(integer) 0
```

>Usando los juegos o *sets* podemos agregar distintos valores a una llave, luego verificar

* Juegos ordenados

```sh
> ZADD animales:tamaño 5 perro
(integer) 1

> ZADD animales:tamaño 1 raton
(integer) 1

> ZADD animales:tamaño 12 elefante
(integer) 1

> ZADD animales:tamaño .2 hormiga
(integer) 1

> ZRANK animales:tamaño raton
(integer) 1

> ZRANGE animales:tamaño 0 -1
1) "hormiga"
2) "raton"
3) "perro"
4) "elefante"

> ZRANGEBYSCORE animales:tamaño 0 15
1) "hormiga"
2) "0.20000000000000001"
3) "raton"
4) "1"
5) "perro"
6) "5"
7) "elefante"
8) "12"
```

> Los juegos ordenados siguen el principio de mantener el ordenes de sus elementos según su puntaje de menos a mayor, sin importar el orden en el que fueron introducidos.

>ZRANK nos permite determinar la posición que tiene cierto valor dentro de un juego ordenado según el puntaje que tiene.


>ZRANGE recibe como parámetros la llave, la posición de inicio del rango a buscar y la cantidad de elementos a tomar, en nuestro caso utilizamos que empiece en la posición 0 y al indicar que seleccione -1  elementos, tomará todos los elementos del juego.

* Listas

```sh
> RPUSH series:codehero python
(integer) 1

> RPUSH series:codehero ruby
(integer) 2

> LPUSH series:codehero git
(integer) 3

> LRANGE series:codehero 0 -1
1) "git"
2) "python"
3) "ruby"

> RPUSH series:codehero ios php
(integer) 5

> LRANGE series:codehero 0 -1
1) "git"
2) "python"
3) "ruby"
4) "ios"
4) "php"

> LPOP series:codehero
"git"

> RPOP series:codehero
"php"

> LRANGE series:codehero 0 -1
1) "python"
2) "ruby"
3) "ios"
```

>Usar listas es muy parecido a usar pilas y colas en programación, primero metimos a la llave `series:codehero` en forma de cola (o por la derecha) las series `pyhton` y `ruby`, luego en forma de pila (o por la izquierda) la serie `git`, esto resultaría en tener primero `git` luego `python` y por último `ruby`. Luego introducimos por la cola las series `ios` y `php` respectivamente, con el comando LPOP y RPOP podemos tomar y eliminar el primer y último elemento respectivamente, por lo que en nuestro caso quedarían los elementos centrales de la lista

>Para LRANGE aplica el mismo caso que ZRANGE.

* Hashes

```sh
> HMSET usuario:1 nombre Jonathan apellido Wiesel correo jonathanwiesel@gmail.com
OK

> HGETALL usuario:1
1) "nombre"
2) "Jonathan"
3) "apellido"
4) "Wiesel"
5) "correo"
6) "jonathanwiesel@gmail.com"

> HKEYS usuario:1
1) "nombre"
2) "apellido"
3) "correo"

> HVALS usuario:1
1) "Jonathan"
2) "Wiesel"
3) "jonathanwiesel@gmail.com"

> HGET usuario:1 correo
"jonathanwiesel@gmail.com"

> HSET usuario:1 password 1234
(integer) 1

> HDEL usuario:1 nombre
(integer) 1

> HGETALL usuario:1
1) "apellido"
2) "Wiesel"
3) "correo"
4) "jonathanwiesel@gmail.com"
5) "password"
6) "1234"
```

> Los *hashes* son de gran utilidad para definir estructuras tipo objetos, donde el identificador único sería la llave principal del *hash* (usuario:1), la definición de atributos serian las llaves dentro del *hash* (nombre, apellido, …) y los valores respectivos a los atributos serían los valores de cada llave del *hash* (Jonathan, Wiesel, …). Inclusive podemos añadir y borrar atributos dinámicamente según sea necesario, a diferencia de la estructura común de una tabla de base de datos que las columnas se encuentran predefinidas

***
##Transacciones

Una de las ventajas que nos ofrece Redis tal como otros sistemas de base de datos es la posibilidad de definir y ejecutar transacciones, es decir, un conjunto de operaciones definidas una por una que al ejecutar la transacción se ejecuten en el orden que fueron definidos en una única llamada. Aquí entran en juego los comandos `MULTI` y `EXEC`:

```sh
> MULTI
OK

> SET valor 1
QUEUED

> INCR valor
QUEUED

> INCRBY valor 4
QUEUED

> EXEC
1) OK
2) (integer) 2
3) (integer) 6
```

> El comando `MULTI` nos permite definir que los comandos que sigan serán parte de una transacción, por esto vemos que al ejecutar algún comando obtenemos como respuesta la palabra `QUEUED`(encolado).

```sh
> SET valor 1
OK

>MULTI
OK

> INCRBY valor 6
QUEUED

> DISCARD
OK

> GET valor
"1"
```

> Supongamos que estamos a la mitad de la definición de una transacción y nos hemos equivocado en algo, usando el comando `DISCARD` la transacción es abortada.

Es posible que estés pensando lo siguiente: ¿Y si a la mitad de la ejecución de una de mis transacciones ocurre alguna operación de otro cliente que modifica alguna de las llaves que voy a usar en mi transacción y altera el comportamiento de la misma?. No te preocupes, antes de definir la transacción puede utilizar el comando `WATCH` y especificar las llaves que no quieres que se modifiquen por otros durante la ejecución de tu transacción. Si en efecto otro cliente modifica una llave que esta bajo el comando `WATCH` mientras la transacción se está ejecutando, la transacción fallará.

***
##Redis Sentinel
A partir de la versión estable 2.4.16 se comenzó a implementar un sistema de manejo de instancias llamado **Redis Sentinel**, el cual permite monitorear si la instancia maestra y sus esclavas se están comportando de manera correcta, notifica al administrador de sistema o a otro sistema externo, comunicándose mediante un API, si algo malo está sucediendo con las instancias. Más impresionante aún, si el maestro se cae, Sentinel es capaz de elegir a un esclavo y promoverlo a maestro, si el viejo maestro vuelve a levantarse es asignado como esclavo del nuevo maestro.

>En el directorio donde se encuentra el archivo de configuración de tu servidor Redis debe estar también el de Sentinel.

***
##Información Adicional

Ya que estás hecho un héroe en Redis hablemos de algunos detalles de optimización y seguridad.

Siempre que consigas la oportunidad para **usar hashes**, ¡hazlo!. Redis almacena los *hashes* pequeños en memoria de manera muy eficiente y ocupando muy poco espacio, tal como vimos en nuestro ejemplo anteriormente, es más eficiente hacerlo de esa manera que asignarle una llave a cada valor del *hash* por separado.

Si tienes la oportunidad de elegir la arquitectura del computador donde estará alojado el servidor Redis, es preferible **usar instancias de 32bits**, ya que bajo esta arquitectura los punteros de memoria son más pequeños y por ende consumen menos recursos. Sin embargo hay que tomar en cuenta que en este caso la instancia estaría limitada a 4GB de memoria.

Si pretendes montar tu servidor Redis en instancias en la nube como Amazon Web Services, el uso instancias EC2 con **almacenamiento ESB no es recomendado** debido a su lento rendimiento para escribir en disco (procesos de persistencia de data), se recomienda tener almacenamiento efímero o local, e ir moviendo al volumen ESB periodicamente.

Usando librerías cliente comunes para comunicarse con Redis el concepto de **inyección NoSQL es imposible** bajo circunstancias normales debido al protocolo que se utiliza.
***
##Conclusión

En esta segunda parte de Redis aprendimos a configurar nuestro servidor, conocimos comandos y operaciones comunes para crear, manipular y eliminar data, y conocimos varias ventajas técnicas que nos ofrece esta solución NoSQL de almacenamiento de datos. Los invitamos que nos cuenten sus experiencias.
