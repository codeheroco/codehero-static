---
layout: post
status: publish
published: true
title: Fragmentación - Parte II
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
date: 2014-01-20 22:55:20.000000000 -04:30
serie: MongoDB desde Cero
description: La entrada pasada vimos la parte teórica de la fragmentación en MongoDB, esta semana pondremos en práctica lo aprendido y armaremos nuestro propio cluster.
dificultad: Avanzado
duracion: 20
categories:
- Cursos
- MongoDB
tags:
- mongo
- mongodb
- shard
- sharding
- fragmentacion
- mongos
- llave
- cluster
---
La semana pasada comenzamos a hablar sobre la fragmentación de datos en MongoDB, vimos cómo nos ayuda a escalar nuestra solución de almacenamiento y sus diferentes ventajas. Además conocimos gran parte de la materia teórica que esto implica. De seguro estás ansioso por poner todo ello en práctica, por eso está semana nos ponemos en acción para aplicar lo aprendido y armaremos nuestro propio *cluster* de fragmentación.

***
##Creando un *cluster* de fragmentación...

Es hora de ponernos a trabajar para crear nuestro primer *cluster* de fragmentación, por razones de facilidad educativa crearemos todo el *cluster* en el mismo equipo, para ello solo deberemos crear cada instancia en un puerto distinto.

###Servidores de configuración

Comencemos creando nuestros servidores de configuración que según vimos deben ser 3:

```sh
$ mkdir configServer1
$ mkdir configServer2
$ mkdir configServer3

$ mongod --configsvr --dbpath configServer1 --port 27019 --fork
$ mongod --configsvr --dbpath configServer2 --port 27020 --fork
$ mongod --configsvr --dbpath configServer3 --port 27021 --fork
```

> La opción `--fork` ejecutará en el fondo a la instancia para que el comando regrese al terminal en lugar de quedarse escuchando al servidor.

Para crear nuestro *router* debemos pasarle como parámetro los *hostnames* de cada servidor de configuración, para ello entraremos a cualquiera de los que acabamos de crear y tomaremos nota de él:

```sh
$ mongo --port 27019
...
configsvr> hostname()
Mordor.local
```

> Ya que todas las instancias se encuentran en el mismo equipo, los *hostnames* son todos iguales y lo único que cambia son los puertos.

###Routers

Bien, ahora crearemos nuestro enrutador. Estos a diferencia de todos los otros tipos de componentes, son instancias `mongos` en lugar de `mongod`. Le debemos pasar una cadena de caracteres con las direcciones de los servidores de configuración:

```sh
$ mongos --configdb Mordor.local:27019,Mordor.local:27020,Mordor.local:27021 --port 27030 --fork --logpath routerLog
```

En ambientes de producción se recomienda que se tengan múltiples instancias enrutadoras, esto evitará que se forme un cuello de botella a nivel de acceso de las aplicaciones. Un buen número para tomar como referencia es uno por fragmento, y distribuidos de manera acorde.

###Fragmentos

Ahora debemos crear nuestras instancias fragmentos, en ambientes productivos se recomienda ampliamente que cada fragmento sea un **replica set** pero para no hacer esta entrada tan larga y posiblemente confusa utilizaremos una única instancia por fragmento:

```sh
$ mkdir shard1
$ mkdir shard2
$ mkdir shard3

$ mongod --shardsvr --dbpath shard1 --port 27040 --fork
$ mongod --shardsvr --dbpath shard2 --port 27041 --fork
$ mongod --shardsvr --dbpath shard3 --port 27042 --fork
```

Deberíamos a estas alturas tener corriendo 7 procesos de MongoDB, siendo 3 servidores de configuración, 1 *router* y 3 instancias fragmentos:

```sh
$ ps -ax | grep mongo | grep -v grep
 1844 ??         0:00.65 /usr/local/Cellar/mongodb/2.4.8/mongod --configsvr --dbpath configServer1 --port 27019 --fork --config /usr/local/etc/mongod.conf
 1887 ??         0:00.62 /usr/local/Cellar/mongodb/2.4.8/mongod --configsvr --dbpath configServer2 --port 27020 --fork --config /usr/local/etc/mongod.conf
 1928 ??         0:00.59 /usr/local/Cellar/mongodb/2.4.8/mongod --configsvr --dbpath configServer3 --port 27021 --fork --config /usr/local/etc/mongod.conf
 1944 ??         0:00.14 mongos --configdb Mordor.local:27019,Mordor.local:27020,Mordor.local:27021 --port 27030 --fork --logpath routerLog
 2002 ??         0:00.14 /usr/local/Cellar/mongodb/2.4.8/mongod --shardsvr --dbpath shard1 --port 27040 --fork --config /usr/local/etc/mongod.conf
 2043 ??         0:00.12 /usr/local/Cellar/mongodb/2.4.8/mongod --shardsvr --dbpath shard2 --port 27041 --fork --config /usr/local/etc/mongod.conf
 2084 ??         0:00.12 /usr/local/Cellar/mongodb/2.4.8/mongod --shardsvr --dbpath shard3 --port 27042 --fork --config /usr/local/etc/mongod.conf
```

Bien, ahora agreguemos los fragmentos al *cluster*, para ello debemos ingresar a la instancia *router* y agregarlos de la siguiente manera:

```sh
$ mongo --port 27030
...
mongos> sh.addShard("Mordor.local:27040")
{ "shardAdded" : "shard0000", "ok" : 1 }
mongos> sh.addShard("Mordor.local:27041")
{ "shardAdded" : "shard0001", "ok" : 1 }
mongos> sh.addShard("Mordor.local:27042")
{ "shardAdded" : "shard0002", "ok" : 1 }
mongos> sh.status()
--- Sharding Status ---
  sharding version: {
    "_id" : 1,
    "version" : 3,
    "minCompatibleVersion" : 3,
    "currentVersion" : 4,
    "clusterId" : ObjectId("52dc95a944281854002ed8e7")
}
  shards:
    {  "_id" : "shard0000",  "host" : "Mordor.local:27040" }
    {  "_id" : "shard0001",  "host" : "Mordor.local:27041" }
    {  "_id" : "shard0002",  "host" : "Mordor.local:27042" }
  databases:
    {  "_id" : "admin",  "partitioned" : false,  "primary" : "config" }
```



###Habilitar fragmentación

Perfecto tenemos nuestro *cluster* armado, solo nos falta activar la fragmentación, para ello en la misma instancia *router* la habilitaremos para la base de datos `codehero` y fragmentaremos la colección `pruebaFragmentacion` por su campo `_id` de manera *hasheada* lo cual nos permitirá cumplir con las reglas de elección de llaves de fragmentación como vimos en la entrada pasada:

```sh
mongos> use codehero
switched to db codehero
mongos> sh.enableSharding("codehero")
{ "ok" : 1 }
mongos> db.pruebaFragmentacion.ensureIndex({ _id : "hashed" })
mongos> sh.shardCollection("codehero.pruebaFragmentacion", { "_id": "hashed" } )
{ "collectionsharded" : "codehero.pruebaFragmentacion", "ok" : 1 }
```

###Demo

Muy bien ya tenemos nuestra colección fragmentada, ahora crearemos un montón de documentos para ver como se distribuyen entre los fragmentos:

```sh
mongos> for(var i=0; i < 100001; i++) db.pruebaFragmentacion.insert({})
```

Finalmente veamos como se encuentran distribuidos estos documentos en las colecciones:

```sh
mongos> db.pruebaFragmentacion.getShardDistribution()

Shard shard0000 at Mordor.local:27040
 data : 687KiB docs : 29350 chunks : 1
 estimated data per chunk : 687KiB
 estimated docs per chunk : 29350

Shard shard0001 at Mordor.local:27041
 data : 980KiB docs : 41839 chunks : 1
 estimated data per chunk : 980KiB
 estimated docs per chunk : 41839

Shard shard0002 at Mordor.local:27042
 data : 675KiB docs : 28812 chunks : 1
 estimated data per chunk : 675KiB
 estimated docs per chunk : 28812

Totals
 data : 2.28MiB docs : 100001 chunks : 3
 Shard shard0000 contains 29.34% data, 29.34% docs in cluster, avg obj size on shard : 24B
 Shard shard0001 contains 41.83% data, 41.83% docs in cluster, avg obj size on shard : 24B
 Shard shard0002 contains 28.81% data, 28.81% docs in cluster, avg obj size on shard : 24B
```

Veremos que la información se ha distribuido bastante bien entre los distintos fragmentos y que los datos no han sido todos asignados a uno solo, lo cual nos indica que hemos escogido correctamente nuestra llave de fragmentación y hemos logrado obtener el escalamiento de base de datos horizontal que estamos buscando.

También podemos ver varios aspectos del *cluster* al ejecutar el comando `sh.status()`:

```sh
mongos> sh.status()
--- Sharding Status ---
  sharding version: {
    "_id" : 1,
    "version" : 3,
    "minCompatibleVersion" : 3,
    "currentVersion" : 4,
    "clusterId" : ObjectId("52d2f649c3d6590b6ddbb99b")
}
  shards:
    {  "_id" : "shard0000",  "host" : "Mordor.local:27040" }
    {  "_id" : "shard0001",  "host" : "Mordor.local:27041" }
    {  "_id" : "shard0002",  "host" : "Mordor.local:27042" }
  databases:
    {  "_id" : "admin",  "partitioned" : false,  "primary" : "config" }
    {  "_id" : "codehero",  "partitioned" : true,  "primary" : "shard0000" }
        codehero.pruebaFragmentacion
            shard key: { "_id" : "hashed" }
            chunks:
                shard0001   1
                shard0002   1
                shard0000   1
            { "_id" : { "$minKey" : 1 } } -->> { "_id" : NumberLong("-1492793005875893056") } on : shard0001 Timestamp(2, 0)
            { "_id" : NumberLong("-1492793005875893056") } -->> { "_id" : NumberLong("3847987569150422320") } on : shard0002 Timestamp(3, 0)
            { "_id" : NumberLong("3847987569150422320") } -->> { "_id" : { "$maxKey" : 1 } } on : shard0000 Timestamp(3, 1)

```
Notarás en la parte inferior los rangos que ha tomado cada fragmento sobre la llave de fragmentación `_id` *hasheada* para distribuir los documentos.

De igual manera podremos notar que exiten 3 *chunks* o trozos, de los cuales existe uno en cada fragmento. Un *chunk* está delimitado por un rango definido por MongoDB sobre la llave de fragmentación, en este caso cada fragmento posee un único *chunk*, si este llegara a pasar los 64MB (o lo que se haya especificado en configuraciones avanzadas) se realizará automaticamente una operación de **separación** o ***splitting*** la cual dividirá el trozo en 2 para lograr mantener un alto nivel de rendimiento. Es posible también que si un fragmento comienza a tener varios *chunks* en comparación con sus hermanos, se ejecute una operación de ***migración*** de *chunks*, este moverá *chunks* en los extremos de su rango a otro fragmento.

> Es posible que si pruebas con menor cantidad de documentos no notes que la información se separe en los diferentes fragmentos ni *chunks*, esto se debe a que la información es todavía muy pequeña para que MongoDB considere separarla, ya que como puedes ver hemos insertado 100.000 documentos y estos solo ocupan un tamaño de 2.28MB debido a la ausencia de complejidad en su estructura.

***
##Conclusión

Hemos recorrido un largo camino, hemos llegado a uno de los temas más avanzados de MongoDB, cuando nos encontramos hablando de este tipo de temas en porque nos interesa que una gran infraestructura de base de datos sea lo más escalable y mantenible posible, ciertamente es un tema enfocado más a los DBAs que a los desarrolladores pero es importante para ambos conocer las implicaciones de estas situaciones ya que la cooperación de ambos ayudará a determinar un rendimiento óptimo, especialmente al determinar aspectos críticos como la llave de fragmentación.
