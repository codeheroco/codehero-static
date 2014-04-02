---
layout: post
status: publish
published: true
title: Replicación - Parte II
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
date: 2013-12-17 00:05:45.000000000 -04:30
serie: MongoDB desde Cero
description: La semana pasada aprendimos la teoría de replicación en MongoDB. Ahora estamos listos para tomar esos conocimientos y llevarlos a la práctica.
dificultad: Avanzado
duracion: 15
categories:
- Cursos
- MongoDB
tags:
- mongo
- mongodb
- replicacion
- replica set
- árbitro
- rs
- initiate
- status
- conf
- miembros
- práctica
---
La semana pasada aprendimos la teoría de replicación en MongoDB mejor conocido como **replica set**. Ahora estamos listos para tomar esos conocimientos y llevarlos a la práctica.
***
##Convertir a Replica Set
Uno de los casos de uso comunes al implementar estrategias de replicación es la de primero trabajar con una instancia independiente y luego convertirla a **replica set**. Veamos lo que debemos hacer para llevar a cabo este sencillo proceso:

Primero debemos detener la instancia de `mongod`.

Luego debemos especificar el nombre del **replica set** que será formada, para ello podemos especificarlo en el archivo de configuración como:

```
replSet = <nombre_del_replica_set>
```

O si lo prefieres puedes pasarlo como argumento al comando de ejecución de la instancia cuando no se ejecuta como un servicio:

```sh
$ mongod --replSet <nombre_del_replica_set>
```

Posteriormente al levantar la instancia de `mongod`, entraremos al la consola de `mongo`:

```sh
$ mongo
```
```js
...
> rs.status()
{
    "startupStatus" : 3,
    "info" : "run rs.initiate(...) if not yet done for the set",
    "ok" : 0,
    "errmsg" : "can't get local.system.replset config from self or any seed (EMPTYCONFIG)"
}
> rs.conf()
null
```

El comando `rs.status()` nos indica el estado actual del **replica set**, en este caso podemos observar que en efecto a la instancia le ha sido indicada que debe trabajar como un **replica set**; sin embargo esta no ha sido iniciada y por eso no tiene asignada ninguna configuración (accesible con el comando `rs.config()`).

Iniciemos el **replica set** ejecutando el comando `rs.initiate()`:

```js
> rs.initiate()
{
    "info2" : "no configuration explicitly specified -- making one",
    "me" : "Mordor.local:27017",
    "info" : "Config now saved locally.  Should come online in about a minute.",
    "ok" : 1
}
```

Para este caso `mongod` creará una configuración sencilla base para el **replica set**. Vemos lo que esta iniciación ha logrado:

```js
miRS:PRIMARY> rs.status()
{
    "set" : "miRS",
    "date" : ISODate("2013-12-15T15:43:27Z"),
    "myState" : 1,
    "members" : [
        {
            "_id" : 0,
            "name" : "Mordor.local:27017",
            "health" : 1,
            "state" : 1,
            "stateStr" : "PRIMARY",
            "uptime" : 401,
            "optime" : Timestamp(1387122082, 1),
            "optimeDate" : ISODate("2013-12-15T15:41:22Z"),
            "self" : true
        }
    ],
    "ok" : 1
}
miRS:PRIMARY> rs.conf()
{
    "_id" : "miRS",
    "version" : 1,
    "members" : [
        {
            "_id" : 0,
            "host" : "Mordor.local:27017"
        }
    ]
}
```


Ahora la consola de `mongo` nos indica el miembro especifico sobre el cual estamos ejecutando los comandos, en este caso sobre el primario (`PRIMARY`) del **replica set** de nombre `miRS`.

Podemos notar también mucha información con respecto a los miembros del **replica set** como la estampilla de tiempo de la última operación realizada (optime), su estado funcional, su función dentro del **replica set**, entre otros.
***
##Agregar miembros
Ya hemos convertido una instancia independiente en un **replica set**; sin embargo no nos sirve de nada una solución de este tipo con un solo miembro, para demostrar esto utilizaré una instancia de Ubuntu con [Vagrant](http://codehero.co/como-instalar-y-configurar-vagrant/), pero si lo deseas también puedes utilizar otros equipos que tengas a la mano o incluso levantar otras instancias de `mongod` en tu mismo equipo utilizando archivos de configuración diferentes o puertos distintos.

Lo primero que debemos hacer es obviamente tener instalado MongoDB en nuestro equipo secundario.

Luego debemos asegurarnos de que el directorio de data de dicha instancia esté vacía ya que este miembro copiará toda la información del miembro primario.

> También puedes copiar manualmente la información del miembro primario, esto reducirá el tiempo de preparación de este miembro secundario.

Ahora en nuestro equipo secundario debemos indicarle el nombre del **replica set** de la misma manera que lo hicimos con la primaria, indicandolo en su archivo de configuración o al levantar manualmente la instancia. (en este caso utilizamos el nombre `miRS`)

```sh
vagrant@precise32:~$  sudo nano /etc/mongodb.conf

# mongodb.conf
...
# in replica set configuration, specify the name of the replica set
replSet = miRS
```

Reiniciamos la instancia:

```sh
vagrant@precise32:~$ sudo service mongodb restart
 * Restarting database mongodb                                                                 [ OK ]
vagrant@precise32:~$ mongo
MongoDB shell version: 2.4.8
...
```
```js
> rs.status()
{
    "startupStatus" : 3,
    "info" : "run rs.initiate(...) if not yet done for the set",
    "ok" : 0,
    "errmsg" : "can't get local.system.replset config from self or any seed (EMPTYCONFIG)"
}
```

En este caso no ejecutaremos `rs.inititate()` ya que el **replica set** se encuentra iniciado por otro lado y este miembro será uno que agregaremos a este ya existente.

Tomemos nota del *host* donde se encuentra esta instancia de `mongod` para poder agregarla al **replica set**:

```sh
vagrant@precise32:~$ ifconfig
eth1      Link encap:Ethernet  HWaddr **:**:**:**:**:**
          inet addr:192.168.33.10  Bcast:192.168.33.255  Mask:255.255.255.0
          ...
```


Ahora volveremos a nuestra instancia primaria para agregar el nuevo miembro al **replica set**:

```js
miRS:PRIMARY> rs.add('192.168.33.10:27017')
{ "ok" : 1 }
```

Y si esperamos un poco a que MongoDB haga su magia podremos notar algo como esto:

```js
miRS:PRIMARY> rs.status()
{
    "set" : "miRS",
    "date" : ISODate("2013-12-15T17:40:32Z"),
    "myState" : 1,
    "members" : [
        {
            "_id" : 0,
            "name" : "Mordor.local:27017",
            "health" : 1,
            "state" : 1,
            "stateStr" : "PRIMARY",
            "uptime" : 2010,
            "optime" : Timestamp(1387129181, 1),
            "optimeDate" : ISODate("2013-12-15T17:39:41Z"),
            "self" : true
        },
        {
            "_id" : 1,
            "name" : "192.168.33.10:27017",
            "health" : 1,
            "state" : 2,
            "stateStr" : "SECONDARY",
            "uptime" : 51,
            "optime" : Timestamp(1387129181, 1),
            "optimeDate" : ISODate("2013-12-15T17:39:41Z"),
            "lastHeartbeat" : ISODate("2013-12-15T17:40:31Z"),
            "lastHeartbeatRecv" : ISODate("2013-12-15T17:40:30Z"),
            "pingMs" : 1,
            "lastHeartbeatMessage" : "syncing to: Mordor.local:27017",
            "syncingTo" : "Mordor.local:27017"
        }
    ],
    "ok" : 1
}
miRS:PRIMARY> rs.conf()
{
    "_id" : "miRS",
    "version" : 2,
    "members" : [
        {
            "_id" : 0,
            "host" : "Mordor.local:27017"
        },
        {
            "_id" : 1,
            "host" : "192.168.33.10:27017"
        }
    ]
}
```

> En mi caso tuve que colocar en el archivo `/etc/hosts` de mi equipo secundario la asociación del *host* `Mordor.local` a la IP de mi equipo principal `192.168.0.100`, ya que de lo contrario el nuevo miembro no podría resolver ese nombre a nivel de DNS para lograr conectarse con el miembro principal.

###Agregar árbitro
Si quisiéramos agregar un árbitro ejecutaríamos en lugar de `rs.add(..)`, el comando `rs.addArb(...)`. Recuerda que el directorio especificado para este miembro donde se almacenaría la data será únicamente utilizado para almacenar configuración, **NO** el conjunto de datos, ya que los árbitros no poseen una copia del conjunto de datos.

***
##Configuración de miembros
Como vimos la semana pasada existen varios tipos de miembros secundarios además de algunas consideraciones especiales que se pueden especificar para los miembros del **replica set**, si recordamos bien, delimitar estas funcionalidades se basan en una sencilla configuración del miembro para el fin especifico.

> Estas configuraciones deben realizarse desde el miembro primario.

Configurarlo es muy sencillo, hagamos uso de nuestros conocimientos de Javascript para esto. Veamos el último comando que ejecutamos:

```js
miRS:PRIMARY> rs.conf()
    {
        "_id" : "miRS",
        "version" : 2,
        "members" : [
            {
                "_id" : 0,
                "host" : "Mordor.local:27017"
            },
            {
                "_id" : 1,
                "host" : "192.168.33.10:27017"
            }
        ]
    }
```

Es aquí donde debemos definir la configuración para cada miembro. Será tan fácil como asignarle dicho comando a una variable y empezaremos a manipular el objeto como lo haríamos normalmente en Javascript:

```js
config = rs.conf()
```

Pongamos como ejemplo la configuración de un **miembro retrasado** el cual sabemos ahora que es un miembro de **prioridad 0**, que  debe ser además un **miembro escondido** y posee un tiempo de retraso determinado, hagamos esto con nuestro miembro secundario:

```js
config.members[1].priority = 0
config.members[1].hidden = true
config.members[1].slaveDelay = 3600
```

> Si quisieramos podríamos definir también la cantidad de votos que puede tener este miembro para determinar su influencia en elecciones con el atributo `votes`.

Y ahora solo reconfiguramos el **replica set** de la siguiente manera :

```js
rs.reconfig(config)
...
miRS:PRIMARY> rs.conf()
{
    "_id" : "miRS",
    "version" : 5,
    "members" : [
        {
            "_id" : 0,
            "host" : "Mordor.local:27017"
        },
        {
            "_id" : 1,
            "host" : "192.168.33.10:27017",
            "priority" : 0,
            "slaveDelay" : 3600,
            "hidden" : true
        }
    ]
}
```

Muy bien ahora ya tenemos configurado un miembro retrasado en nuestro **replica set**.

También puedes configurar directo el miembro cuando lo estás agregando al **replica set** especificando los parámetros directamente de la siguiente manera:

```js
rs.add( { _id: 1, host: '192.168.33.10:27017',  priority: 0, hidden: true, slaveDelay: 3600 } )
```

***
##Eliminación de miembros
Supongamos el caso que deseamos eliminar uno de los miembros del **replica set**. Si dicho miembro es el primario debemos primero relevarlo de su cargo y dejar que un nuevo primario sea elegido.

Para esto ejecutaríamos el comando `rs.stepDown(<cantidad_segundos>)` en el miembro primario, esto lo forzará a ceder su papel como primario y evitará ser elegido en la siguiente elección durante la cantidad de segundos indicada.

Posteriormente podremos eliminar un miembro desde el primario de la siguiente manera:

```js
rs.remove('192.168.33.10:27017')
```

Si revisamos el estado y configuración del **replica set** luego de esto, podremos ver que en efecto esa instancia ya no forma parte de la misma.

```js
miRS:PRIMARY> rs.status()
{
    "set" : "miRS",
    "date" : ISODate("2013-12-15T19:57:23Z"),
    "myState" : 1,
    "members" : [
        {
            "_id" : 0,
            "name" : "Mordor.local:27017",
            "health" : 1,
            "state" : 1,
            "stateStr" : "PRIMARY",
            "uptime" : 10221,
            "optime" : Timestamp(1387137431, 1),
            "optimeDate" : ISODate("2013-12-15T19:57:11Z"),
            "self" : true
        }
    ],
    "ok" : 1
}

miRS:PRIMARY> rs.conf()
{
    "_id" : "miRS",
    "version" : 6,
    "members" : [
        {
            "_id" : 0,
            "host" : "Mordor.local:27017"
        }
    ]
}
```

De igual manera si accedemos a nuestro antiguo miembro podremos ver que se encuentra con estado `REMOVED`:

```js
miRS:REMOVED> rs.status()
{
    "set" : "miRS",
    "date" : ISODate("2013-12-15T20:07:29Z"),
    "myState" : 10,
    "members" : [
        {
            "_id" : 1,
            "name" : "192.168.33.10:27017",
            "health" : 1,
            "state" : 10,
            "stateStr" : "REMOVED",
            "uptime" : 8811,
            "optime" : Timestamp(1387130876, 1),
            "optimeDate" : ISODate("2013-12-15T18:07:56Z"),
            "self" : true
        }
    ],
    "ok" : 1
}
```

***
##Convertir miembro en independiente

Para utilizar este antiguo miembro secundario como una instancia aislada nuevamente podemos volver a ejecutar el comando de inicio de la instacia sin el parámetro `--replSet` o eliminarlo del archivo de configuración (dependiendo de cómo hayas decidido iniciar la instancia de `mongod`).

Luego reiniciemos la instancia y borraremos los rastros del **replica set** al borrar la base de datos local donde se almacena la información de la misma:

```sh
vagrant@precise32:~$ sudo nano /etc/mongodb.conf
...
# mongodb.conf
...
# in replica set configuration, specify the name of the replica set
# replSet = miRS #eliminamos o comentamos esta linea
...

vagrant@precise32:~$ sudo service mongodb restart
 * Restarting database mongodb                                                                [ OK ]
vagrant@precise32:~$ mongo
...
```
```js
> use local
switched to db local
> db.dropDatabase()
{ "dropped" : "local", "ok" : 1 }
```

***
##Conclusión
Ya sabemos como tener un cluster de replicación en MongoDB, esto nos permitirá tener una alta disponibilidad de los datos y aseguraremos la durabilidad de los mismos por el incremento de la redundancia. De igual manera estaremos protegidos en caso que sucedan situaciones catastróficas inesperadas. Incluso podrías configurar en el *driver* de MongoDB de tu aplicación cliente para que lea de los miembros secundarios en caso de que sea necesario. Más adelante llevaremos el concepto de *clusterización*  mucho más lejos cuando hablemos de **fragmentación**. Hasta entonces.
