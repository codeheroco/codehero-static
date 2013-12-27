---
layout: post
status: publish
published: true
title: Replicación - Parte II
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
wordpress_id: 2852
wordpress_url: http://codehero.co/?p=2852
date: 2013-12-17 00:05:45.000000000 -04:30
serie: MongoDB desde Cero
thumbnail: http://i.imgur.com/XFFMeqB.png
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
<p>La semana pasada aprendimos la teoría de replicación en MongoDB mejor conocido como <strong>replica set</strong>. Ahora estamos listos para tomar esos conocimientos y llevarlos a la práctica.</p>

<hr />

<h2>Convertir a Replica Set</h2>

<p>Uno de los casos de uso comunes al implementar estrategias de replicación es la de primero trabajar con una instancia independiente y luego convertirla a <strong>replica set</strong>. Veamos lo que debemos hacer para llevar a cabo este sencillo proceso:</p>

<p>Primero debemos detener la instancia de <code>mongod</code>.</p>

<p>Luego debemos especificar el nombre del <strong>replica set</strong> que será formada, para ello podemos especificarlo en el archivo de configuración como:</p>

<pre>replSet = nombre_del_replica_set
</pre>

<p>O si lo prefieres puedes pasarlo como argumento al comando de ejecución de la instancia cuando no se ejecuta como un servicio:</p>

<pre>mongod --replSet nombre_del_replica_set
</pre>

<p>Posteriormente al levantar la instancia de <code>mongod</code>, entraremos al la consola de <code>mongo</code>:</p>

<pre>$ mongo
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
</pre>

<p>El comando <code>rs.status()</code> nos indica el estado actual del <strong>replica set</strong>, en este caso podemos observar que en efecto a la instancia le ha sido indicada que debe trabajar como un <strong>replica set</strong>; sin embargo esta no ha sido iniciada y por eso no tiene asignada ninguna configuración (accesible con el comando <code>rs.config()</code>).</p>

<p>Iniciemos el <strong>replica set</strong> ejecutando el comando <code>rs.initiate()</code>:</p>

<pre>> rs.initiate()
{
    "info2" : "no configuration explicitly specified -- making one",
    "me" : "Mordor.local:27017",
    "info" : "Config now saved locally.  Should come online in about a minute.",
    "ok" : 1
}
</pre>

<p>Para este caso <code>mongod</code> creará una configuración sencilla base para el <strong>replica set</strong>. Vemos lo que esta iniciación ha logrado:</p>

<pre>miRS:PRIMARY> rs.status()
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
</pre>

<p>Ahora la consola de <code>mongo</code> nos indica el miembro especifico sobre el cual estamos ejecutando los comandos, en este caso sobre el primario (<code>PRIMARY</code>) del <strong>replica set</strong> de nombre <code>miRS</code>.</p>

<p>Podemos notar también mucha información con respecto a los miembros del <strong>replica set</strong> como la estampilla de tiempo de la última operación realizada (optime), su estado funcional, su función dentro del <strong>replica set</strong>, entre otros.</p>

<hr />

<h2>Agregar miembros</h2>

<p>Ya hemos convertido una instancia independiente en un <strong>replica set</strong>; sin embargo no nos sirve de nada una solución de este tipo con un solo miembro, para demostrar esto utilizaré una instancia de Ubuntu con <a href="http://codehero.co/como-instalar-y-configurar-vagrant/">Vagrant</a>, pero si lo deseas también puedes utilizar otros equipos que tengas a la mano o incluso levantar otras instancias de <code>mongod</code> en tu mismo equipo utilizando archivos de configuración diferentes o puertos distintos.</p>

<p>Lo primero que debemos hacer es obviamente tener instalado MongoDB en nuestro equipo secundario.</p>

<p>Luego debemos asegurarnos de que el directorio de data de dicha instancia esté vacía ya que este miembro copiará toda la información del miembro primario.</p>

<blockquote>
  <p>También puedes copiar manualmente la información del miembro primario, esto reducirá el tiempo de preparación de este miembro secundario.</p>
</blockquote>

<p>Ahora en nuestro equipo secundario debemos indicarle el nombre del <strong>replica set</strong> de la misma manera que lo hicimos con la primaria, indicandolo en su archivo de configuración o al levantar manualmente la instancia. (en este caso utilizamos el nombre <code>miRS</code>)</p>

<pre>vagrant@precise32:~$  sudo nano /etc/mongodb.conf

# mongodb.conf
...
# in replica set configuration, specify the name of the replica set
replSet = miRS
</pre>

<p>Reiniciamos la instancia:</p>

<pre>vagrant@precise32:~$ sudo service mongodb restart
 * Restarting database mongodb                                                                 [ OK ]
vagrant@precise32:~$ mongo
MongoDB shell version: 2.4.8
...
> rs.status()
{
    "startupStatus" : 3,
    "info" : "run rs.initiate(...) if not yet done for the set",
    "ok" : 0,
    "errmsg" : "can't get local.system.replset config from self or any seed (EMPTYCONFIG)"
}
</pre>

<p>En este caso no ejecutaremos <code>rs.inititate()</code> ya que el <strong>replica set</strong> se encuentra iniciado por otro lado y este miembro será uno que agregaremos a este ya existente.</p>

<p>Tomemos nota del <em>host</em> donde se encuentra esta instancia de <code>mongod</code> para poder agregarla al <strong>replica set</strong>:</p>

<pre>vagrant@precise32:~$ ifconfig
eth1      Link encap:Ethernet  HWaddr **:**:**:**:**:**
          inet addr:192.168.33.10  Bcast:192.168.33.255  Mask:255.255.255.0
          ...
</pre>

<p>Ahora volveremos a nuestra instancia primaria para agregar el nuevo miembro al <strong>replica set</strong>:</p>

<pre>miRS:PRIMARY> rs.add('192.168.33.10:27017')
{ "ok" : 1 }
</pre>

<p>Y si esperamos un poco a que MongoDB haga su magia podremos notar algo como esto:</p>

<pre>miRS:PRIMARY> rs.status()
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
</pre>

<blockquote>
  <p>En mi caso tuve que colocar en el archivo <code>/etc/hosts</code> de mi equipo secundario la asociación del <em>host</em> <code>Mordor.local</code> a la IP de mi equipo principal <code>192.168.0.100</code>, ya que de lo contrario el nuevo miembro no podría resolver ese nombre a nivel de DNS para lograr conectarse con el miembro principal.</p>
</blockquote>

<h3>Agregar árbitro</h3>

<p>Si quisiéramos agregar un árbitro ejecutaríamos en lugar de <code>rs.add(..)</code>, el comando <code>rs.addArb(...)</code>. Recuerda que el directorio especificado para este miembro donde se almacenaría la data será únicamente utilizado para almacenar configuración, <strong>NO</strong> el conjunto de datos, ya que los árbitros no poseen una copia del conjunto de datos.</p>

<hr />

<h2>Configuración de miembros</h2>

<p>Como vimos la semana pasada existen varios tipos de miembros secundarios además de algunas consideraciones especiales que se pueden especificar para los miembros del <strong>replica set</strong>, si recordamos bien, delimitar estas funcionalidades se basan en una sencilla configuración del miembro para el fin especifico.</p>

<blockquote>
  <p>Estas configuraciones deben realizarse desde el miembro primario.</p>
</blockquote>

<p>Configurarlo es muy sencillo, hagamos uso de nuestros conocimientos de Javascript para esto. Veamos el último comando que ejecutamos:</p>

<pre>miRS:PRIMARY> rs.conf()
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
</pre>

<p>Es aquí donde debemos definir la configuración para cada miembro. Será tan fácil como asignarle dicho comando a una variable y empezaremos a manipular el objeto como lo haríamos normalmente en Javascript:</p>

<pre>config = rs.conf()
</pre>

<p>Pongamos como ejemplo la configuración de un <strong>miembro retrasado</strong> el cual sabemos ahora que es un miembro de <strong>prioridad 0</strong>, que debe ser además un <strong>miembro escondido</strong> y posee un tiempo de retraso determinado, hagamos esto con nuestro miembro secundario:</p>

<pre>config.members[1].priority = 0
config.members[1].hidden = true
config.members[1].slaveDelay = 3600
</pre>

<blockquote>
  <p>Si quisieramos podríamos definir también la cantidad de votos que puede tener este miembro para determinar su influencia en elecciones con el atributo <code>votes</code>.</p>
</blockquote>

<p>Y ahora solo reconfiguramos el <strong>replica set</strong> de la siguiente manera :</p>

<pre>rs.reconfig(config)
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
</pre>

<p>Muy bien ahora ya tenemos configurado un miembro retrasado en nuestro <strong>replica set</strong>.</p>

<p>También puedes configurar directo el miembro cuando lo estás agregando al <strong>replica set</strong> especificando los parámetros directamente de la siguiente manera:</p>

<pre>rs.add( { _id: 1, host: '192.168.33.10:27017',  priority: 0, hidden: true, slaveDelay: 3600 } )
</pre>

<hr />

<h2>Eliminación de miembros</h2>

<p>Supongamos el caso que deseamos eliminar uno de los miembros del <strong>replica set</strong>. Si dicho miembro es el primario debemos primero relevarlo de su cargo y dejar que un nuevo primario sea elegido.</p>

<p>Para esto ejecutaríamos el comando <code>rs.stepDown(&lt;cantidad_segundos&gt;)</code> en el miembro primario, esto lo forzará a ceder su papel como primario y evitará ser elegido en la siguiente elección durante la cantidad de segundos indicada.</p>

<p>Posteriormente podremos eliminar un miembro desde el primario de la siguiente manera:</p>

<pre>rs.remove('192.168.33.10:27017')
</pre>

<p>Si revisamos el estado y configuración del <strong>replica set</strong> luego de esto, podremos ver que en efecto esa instancia ya no forma parte de la misma.</p>

<pre>miRS:PRIMARY> rs.status()
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
</pre>

<p>De igual manera si accedemos a nuestro antiguo miembro podremos ver que se encuentra con estado <code>REMOVED</code>:</p>

<pre>miRS:REMOVED> rs.status()
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
</pre>

<hr />

<h2>Convertir miembro en independiente</h2>

<p>Para utilizar este antiguo miembro secundario como una instancia aislada nuevamente podemos volver a ejecutar el comando de inicio de la instacia sin el parámetro <code>--replSet</code> o eliminarlo del archivo de configuración (dependiendo de cómo hayas decidido iniciar la instancia de <code>mongod</code>).</p>

<p>Luego reiniciemos la instancia y borraremos los rastros del <strong>replica set</strong> al borrar la base de datos local donde se almacena la información de la misma:</p>

<pre>vagrant@precise32:~$ sudo nano /etc/mongodb.conf
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
> use local
switched to db local
> db.dropDatabase()
{ "dropped" : "local", "ok" : 1 }
</pre>

<hr />

<h2>Conclusión</h2>

<p>Ya sabemos como tener un cluster de replicación en MongoDB, esto nos permitirá tener una alta disponibilidad de los datos y aseguraremos la durabilidad de los mismos por el incremento de la redundancia. De igual manera estaremos protegidos en caso que sucedan situaciones catastróficas inesperadas. Incluso podrías configurar en el <em>driver</em> de MongoDB de tu aplicación cliente para que lea de los miembros secundarios en caso de que sea necesario. Más adelante llevaremos el concepto de <em>clusterización</em> mucho más lejos cuando hablemos de <strong>fragmentación</strong>. Hasta entonces.</p>
