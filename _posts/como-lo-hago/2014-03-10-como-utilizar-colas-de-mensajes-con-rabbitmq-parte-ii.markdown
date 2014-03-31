---
layout: post
status: publish
published: true
title: Cómo utilizar colas de mensajes con RabbitMQ - Parte II
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
wordpress_id: 3105
wordpress_url: http://codehero.co/?p=3105
date: 2014-03-10 20:30:32.000000000 -04:30
categories:
- Cómo lo hago
- RabbitMQ
tags:
- node
- admin
- rabbitmq
- colas
- mensajes
- consumidor
- publicador
- amqp
---
<p><a href="http://codehero.co/como-utilizar-colas-de-mensajes-con-rabbitmq-parte/">La semana pasada</a> comenzamos a ver los conceptos básicos de las colas de mensajes y las ventajas que nos podría traer al utilizar RabbitMQ como nuestra solución, esta vez nos adentraremos en el funcionamiento de RabbitMQ al colocarlo en acción y veremos un poco sobre su interfaz de administración.</p>

<hr />

<h2>Administración</h2>

<p>Esta herramienta nos permitirá realizar una gestión completa de la mayoría de los procesos que están involucrados en las colas de mensajes. Para ello debemos habilitar el <em>plugin</em> y luego iniciar el servicio de RabbitMQ:</p>

<h3>Debian</h3>

<pre>$ sudo rabbitmq-plugins enable rabbitmq_management
$ sudo service rabbitmq-server start
</pre>

<h3>Windows</h3>

<p>Nos dirigiremos al directorio de instalación de RabbitMQ y luego al subdirectorio <code>sbin</code> del mismo, algo asi:</p>

<pre>%PROGRAMFILES%\RabbitMQ Server\rabbitmq_server_2.7.1\sbin\
</pre>

<p>Y luego ejecutamos el siguiente comando:</p>

<pre>$ rabbitmq-plugins.bat enable rabbitmq_management
</pre>

<p>Debemos reinstalar el servicio de de RabbitMQ para que el plugin funcione por lo que haremos lo siguiente:</p>

<pre>$ rabbitmq-service.bat stop
$ rabbitmq-service.bat install
$ rabbitmq-service.bat start
</pre>

<h3>Mac OS X</h3>

<blockquote>
  <p>Si instalaste RabbitMQ con <a href="http://codehero.co/como-lo-hago-instalar-homebrew/">Homebrew</a> este plugin viene habilitado por defecto.</p>
</blockquote>

<p>Iniciemos el servicio de RabbitMQ:</p>

<pre>$ brew services start rabbitmq
</pre>

<hr />

<h2>Prueba de administración</h2>

<p>Finalmente probaremos que el servicio está ejecutandose ejecutando:</p>

<pre>$ rabbitmqctl status
</pre>

<p>Y obtendremos una salida de gran parte del estado y configuración del servidor de RabbitMQ como esta:</p>

<pre>[{pid,10062},
 {running_applications,
     [{rabbitmq_management_visualiser,"RabbitMQ Visualiser","3.2.3"},
      {rabbitmq_management,"RabbitMQ Management Console","3.2.3"},
      {rabbitmq_web_dispatch,"RabbitMQ Web Dispatcher","3.2.3"},
      {webmachine,"webmachine","1.10.3-rmq3.2.3-gite9359c7"},
      {mochiweb,"MochiMedia Web Server","2.7.0-rmq3.2.3-git680dba8"},
      {rabbitmq_mqtt,"RabbitMQ MQTT Adapter","3.2.3"},
      {rabbitmq_stomp,"Embedded Rabbit Stomp Adapter","3.2.3"},
      {rabbitmq_management_agent,"RabbitMQ Management Agent","3.2.3"},
      {rabbitmq_amqp1_0,"AMQP 1.0 support for RabbitMQ","3.2.3"},
      {rabbit,"RabbitMQ","3.2.3"},
      {os_mon,"CPO  CXC 138 46","2.2.13"},
      {inets,"INETS  CXC 138 49","5.9.6"},
      {mnesia,"MNESIA  CXC 138 12","4.10"},
      {amqp_client,"RabbitMQ AMQP Client","3.2.3"},
      {xmerl,"XML parser","1.3.4"},
      {sasl,"SASL  CXC 138 11","2.3.3"},
      {stdlib,"ERTS  CXC 138 10","1.19.3"},
      {kernel,"ERTS  CXC 138 10","2.16.3"}]},
 {os,{unix,darwin}},
 {erlang_version,
     "Erlang R16B02 (erts-5.10.3) [source] [smp:2:2] [async-threads:30] [hipe] [kernel-poll:true]\n"},
 {memory,
     [{total,24239512},
      {connection_procs,2888},
      {queue_procs,2888},
      {plugins,149124},
      {other_proc,9095428},
      {mnesia,32072},
      {mgmt_db,47388},
      {msg_index,12180},
      {other_ets,641380},
      {binary,13080},
      {code,10763298},
      {atom,531937},
      {other_system,2947849}]},
 {vm_memory_high_watermark,0.4},
 {vm_memory_limit,858993459},
 {disk_free_limit,50000000},
 {disk_free,57325109248},
 {file_descriptors,
     [{total_limit,156},{total_used,5},{sockets_limit,138},{sockets_used,3}]},
 {processes,[{limit,1048576},{used,209}]},
 {run_queue,0},
 {uptime,9}]
...done.
</pre>

<p>Probemos la interfaz gráfica ingresando a nuestro navegador y dirigiendonos a <code>http://localhost:15672/</code>, este es el puerto por defecto del submódulo de administración de RabbitMQ:</p>

<p><img src="http://i.imgur.com/yfYPIl1.png" alt="Rabbit Login" /></p>

<p>Se nos presentará una pantalla de inicio de sesión (seguridad ante todo). Por ser una instalación nueva, el usuario y clave por defecto es <code>guest</code> para ambos.</p>

<p>Dentro podremos ver muchos detalles acerca del estado de nuestro sistema de colas, entre ellos podremos apreciar datos importantes como las conexiones existentes, las colas definidas, los intercambiadores, consumidores de mensajes, gestión administrativa del servidor y mucho más.</p>

<p><img src="http://i.imgur.com/ZUBA22h.png" alt="Rabbit Home" /></p>

<p>No te preocupes si no entiendes mucho de lo que hay aquí, más adelante cuando nos pongamos en acción con algunos ejemplos podrás apreciarlo mejor.</p>

<hr />

<h2>Demo</h2>

<p>Bien, es hora de probar cómo funciona todo esto, que hemos visto.</p>

<p>Para nuestro ejemplo utilizaremos <a href="">node.js</a>, el novedoso framework de javascript, esto con la finalidad de motivarlos a introducirse en el uso de este lenguaje y por su facilidad de lectura y aprendizaje.</p>

<blockquote>
  <p>No te preocupes, RabbitMQ tiene librerías para <a href="http://www.rabbitmq.com/devtools.html">casi todos los lenguajes</a> para que puedas desarrollar en el lenguaje de tu preferencia.</p>
  
  <p>El código que verás aquí se encuentra en el repositorio de Github referenciado al comienzo de esta entrada. En él se encuentran las instrucciones para puedas correr tu mismo los programas y puedas ver en vivo lo que sucede.</p>
</blockquote>

<p>Veamos primero el código de nuestro <strong>publicador</strong> o cliente generador de mensajes:</p>

<pre>var amqp = require('amqp');
var helper = require('./amqp-hacks');

var conexion = amqp.createConnection({host: 'localhost'});

conexion.on('ready', function(){

    var mensaje = 'Hola CODEHERO ' + new Date();

    conexion.publish('sencilla', mensaje);

    helper.safeEndConnection(conexion);
});
</pre>

<p>Detallemos paso a paso lo que hace cada línea:</p>

<ul>
<li>Requerimos el módulo del protocolo AMQP que usaremos para comunicarnos con RabbitMQ.</li>
<li>Requerimos un <em>script</em> local que nos ayudará a finalizar correctamente la conexión.</li>
<li>Establecemos la conexión con nuestro servidor de RabbitMQ.</li>
<li>Cuando la conexión está establecida proseguimos con lo siguiente: 

<ul>
<li>Construimos el mensaje.</li>
<li>Enviamos el mensaje indicando la cola <code>sencilla</code> a la cual debemos enviarlo.</li>
<li>Finalizamos la conexión.</li>
</ul></li>
</ul>

<p>Bastante sencillo ¿no lo crees?</p>

<p>Observemos ahora el código de nuestro <strong>consumidor</strong> o servidor receptor:</p>

<pre>var amqp = require('amqp');

var conexion = amqp.createConnection({host: 'localhost'});

conexion.on('ready', function(){
    conexion.queue('sencilla', {autoDelete: false}, function(cola){
        cola.subscribe(function(mensaje){
            console.log('Mensaje recibido -> %s', mensaje.data.toString('utf-8'));
        });
    });
});
</pre>

<p>Nuevamente detallando cada línea:</p>

<ul>
<li>Requerimos el módulo del protocolo AMQP.</li>
<li>Establecemos la conexión con nuestro servidor de RabbitMQ.</li>
<li>Cuando la conexión está establecida proseguimos con lo siguiente: 

<ul>
<li>Instanciamos la cola <code>sencilla</code> indicando la opción para que esta no sea eliminada cuando no existan más mensajes en ella. 

<ul>
<li>Nos suscribimos a la cola (esto producirá que el programa se quede oyendo a la cola). 

<ul>
<li>Imprimimos el mensaje cada vez que la cola recibe y nos envía.</li>
</ul></li>
</ul></li>
</ul></li>
</ul>

<p>Podemos probar iniciando nuestro <strong>consumidor</strong> e ir enviado mensajes con nuestro <strong>publicador</strong> para observar en la salida como es el flujo de mensajes el cual terminaría siendo algo así:</p>

<pre>Mensaje recibido -> Hola CODEHERO. Sun Mar 09 2014 01:05:30 GMT-0430 (VET)
Mensaje recibido -> Hola CODEHERO. Sun Mar 09 2014 01:05:31 GMT-0430 (VET)
Mensaje recibido -> Hola CODEHERO. Sun Mar 09 2014 01:05:34 GMT-0430 (VET)
Mensaje recibido -> Hola CODEHERO. Sun Mar 09 2014 01:05:35 GMT-0430 (VET)
</pre>

<h3>Integridad</h3>

<p>Puedes probar detener el <strong>consumidor</strong> y seguir enviando mensajes. En efecto el mensaje ha sido enviado a la cola y este no se ha perdido, en cuanto vuelvas a iniciar tu <strong>consumidor</strong> verás los mensajes encolados fluir.</p>

<p>Antes de levantar nuevamente el <strong>consumidor</strong> puedes probar entrar a la página administrativa de RabbitMQ para observar aquellos mensajes que se encuentran esperando y el flujo de entrada de ellos al servidor:</p>

<p><img src="http://i.imgur.com/TuQNi8r.png" alt="Rabbit message flow" /></p>

<p>Además de poder echarles un vistazo desde esta misma interfaz ubicada en la parte inferior:</p>

<p><img src="http://i.imgur.com/PMgb10R.png" alt="Rabbit messages details" /></p>

<h3>Escalabilidad</h3>

<p>En caso que tengas un flujo de mensajes muy alto tan solo debes agregar más poder, levanta más consumidores y RabbitMQ se encargará de balancear la carga entre ellos siempre manteniendo un orden lógico en los mensajes y evitando que estos se pierdan o sean procesados más de una vez.</p>

<p>Para probar esto en la práctica, levanta varios <strong>consumidores</strong> y en lugar de utilizar el <strong>publicador</strong> que hemos probado hasta ahora, prueba el <strong>publicador agresivo</strong>. De esta manera podrás observar lo fácil que es escalar tu solución para soportar altos volumenes de peticiones.</p>

<hr />

<h2>Conclusión</h2>

<p>Esta semana pudimos arañar la superficie de posibilidades con RabbitMQ, observamos su naturaleza asíncrona y algunas de las ventajas que su funcionamiento nos ofrece.</p>

<p>El enfoque productivo más común es aquel que se basa en suscripciones a contenidos mejor conocido como el modelo Pub/Sub, este por medio de un intercambiador distribuirá el mensaje para ser consumido por múltiples consumidores, algo como los <em>feeds</em>.</p>

<p>Otro enfoque importante es aquel basado en un procedimiento que se compone de varias tareas pesadas las cuales suelen ser síncronas lo cual obliga al usuario a esperar a que una tarea termina para proseguir, aplicaciones comunes son la gestión de imagenes y programación de tareas de corrida prolongada.</p>
