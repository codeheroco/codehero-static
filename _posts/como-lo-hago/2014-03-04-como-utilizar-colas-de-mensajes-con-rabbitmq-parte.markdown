---
layout: post
status: publish
published: true
title: Como utilizar colas de mensajes con RabbitMQ - Parte I
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
wordpress_id: 3084
wordpress_url: http://codehero.co/?p=3084
date: 2014-03-04 00:05:32.000000000 -04:30
categories:
- Cómo lo hago
- RabbitMQ
tags:
- rabbitmq
- colas
- mensajes
- message queue
- mq
- ironmq
- sqs
---
<p>El mundo de las colas de mensajes es uno que probablemente muchos desarrolladores no han oído jamas, es una perspectiva distinta a lo que solemos estar acostumbrados en el intercambio de peticiones a traves de la red. Esta semana comenzaremos a iniciarte en este espacio enfocándonos específicamente en el uso de la herramienta de encolamiento de mensajes RabbitMQ.</p>

<hr />

<h2>¿Qué son las colas de mensajes?</h2>

<p>Es posible que alguna vez te hayas conseguido con el nombre <em>message queue</em> o su acrónimo <em>MQ</em> navegando por la red, si volvemos a los conceptos básicos de la programación de pilas y colas sabremos que es un concepto bastante sencillo donde los emisores producen mensajes y para que estos lleguen a su destinatario deben ser entregados a un intercambiador que los colocará en la cola del respectivo destinatario, finalmente el destinatario puede ir progresivamente desencolando y procesando los mensajes o dejar que el intercambiador se los haga llegar, esto por medio de diferentes tipos de rutas.</p>

<p>Por lo tanto podemos ver el concepto de las colas de mensajes como un intermediario entre los emisores y los destinatarios, o si lo orientamos a un escenario más real, entre clientes y servidores o publicadores y consumidores.</p>

<hr />

<h2>Ventajas</h2>

<p>Desde luego estarás esperando que te demos argumentos que te hagan considerar implementar este enfoque de intercambio, veamos algunas:</p>

<ul>
<li><p><strong>Redundancia</strong> - Si tu aplicación falla mientras está procesando alguna petición no te debes preocupar de que esta se pierda para siempre ya que esta estrategia le permite a la cola persistir el mensaje hasta que el mismo sea procesado por completo.</p></li>
<li><p><strong>Naturaleza asíncrona</strong> - Dependiendo de la manera en que funcione tu sistema puedes necesitar que los mensajes se vayan acumulando para procesarlos en lotes, la cola irá manteniendo tus mensajes para cuando decidas (o programes) su procesamiento.</p></li>
<li><p><strong>Garantía de entrega y ordenamiento</strong> - Se garantiza que el orden en el que llegan los mensajes será el orden en el que sean procesados, de igual manera un emisor y/o consumidor puede estar seguro de que este ha sido recibido y se procesará una única vez mediante la implementación de intercambio de banderas de reconocimiento.</p></li>
<li><p><strong>Disponibilidad</strong> - Si parte de tu arquitectura falla, los mensajes no se perderán ya que estos seguirán en la cola hasta que se les indique lo contrario, al mismo tiempo la cola podrá seguir recibiendo mensajes para el procesamiento posterior a la recuperación del sistema.</p></li>
<li><p><strong>Elasticidad</strong> - En situaciones donde tu sistema pudiera llegar al tope de su capacidad de recepción de peticiones y volverse incapaz de responder por un anormal flujo de mensajes, el hecho de tener una cola o <em>buffer</em> de peticiones permitirá balancear, filtrar y normalizar el flujo, lo cual evitará que tu sistema sea inundado de peticiones que no pueda responder causando perdida de los mismos o incluso el colapso del sistema.</p></li>
<li><p><strong>Desacoplamiento</strong> - El hecho de tener una capa intermedia de comunicación entre procesos nos da la flexibilidad en la definición de arquitectura de cada uno de ellos de manera separada, mientras cada uno se mantenga alineado a los mismos requerimientos de interfaz que representa la cola de mensajes no abran mayores problemas de compatibilidad ni mucho que cambiar de lado y lado.</p></li>
<li><p><strong>Escalabilidad</strong> - Por la misma ventaja de desacoplamiento podemos escalar fácilmente nuestro sistema, solo debemos agregar más unidades de procesamiento y el sistema de colas se encargará de balancear la carga entre ellos.</p></li>
</ul>

<hr />

<h2>RabbitMQ</h2>

<p>Luego de conocer un poco sobre lo que son las colas de mensajes podemos introducir la solución que utilizaremos aquí, RabbitMQ. Este programa nos ofrece las ventajas antes mencionadas de las colas de mensajes además de ofrece también otras características que lo hacen más flexible aún:</p>

<ul>
<li>Soporta múltiples protocolos, muchas soluciones solo manejan uno solo como AMQP.</li>
<li>Dispone de librerías en casi todos los lenguajes de programación.</li>
<li>Rastreo de mal comportamiento en las colas.</li>
<li><em>Clusterización</em> de varios servidores de colas para evitar que el sistema de encolamiento falle.</li>
<li>Múltiples tipos de enrutamiento, incluso puedes crear tu propia ruta.</li>
<li>Soporta <em>plugins</em> para extender su comportamiento.</li>
<li>Amigable interfaz gráfica.</li>
</ul>

<p>Existen algunas alternativas a RabbitMQ muy interesantes en el ámbito <em>cloud</em> o <em>SaaS</em> (software como servicio) como IronMQ y Amazon SQS; sin embargo aquí en CODEHERO siempre promovemos el uso de herramientas de código abierto y por ello optamos por RabbitMQ, la solución que consideramos más robusta de manejo de colas de mensajes.</p>

<hr />

<h2>Instalación</h2>

<p>Para no dejarte sin nada práctico de RabbitMQ esta semana, veamos como instalarlo, así aquellos que deseen adelantarse a la aventura de la semana que viene lo podrán esperar con ansias.</p>

<h3>Mac OS X</h3>

<p>Como siempre utilizaremos <a href="http://codehero.co/como-lo-hago-instalar-homebrew/">Homebrew.</a></p>

<pre>$ brew install rabbitmq
</pre>

<p>Los scripts de RabbitMQ se encuentran en <code>/usr/local/sbin</code> por lo tanto asegurate de tenerlos en tu variable de entorno <code>PATH</code>. Esto lo puedes realizar al agregar una linea como esta a tu archivo <code>.bashrc</code> o <code>.zshrc</code> según sea el caso:</p>

<pre>export PATH=$PATH:/usr/local/sbin
</pre>

<h3>Debian</h3>

<p>Agregamos el repositorio de RabbitMQ</p>

<pre>$ sudo su
$ echo "deb http://www.rabbitmq.com/debian/ testing main" >> /etc/apt/sources.list
</pre>

<p>Agregamos la llave pública de RabbitMQ a nuestra lista de llaves de confianza</p>

<pre>$ wget http://www.rabbitmq.com/rabbitmq-signing-key-public.asc
$ sudo apt-key add rabbitmq-signing-key-public.asc
</pre>

<p>Y finalmente actualizamos e instalamos</p>

<pre>$ sudo apt-get update
...
$ sudo apt-get install rabbitmq-server
</pre>

<h3>Windows</h3>

<p><a href="http://www.rabbitmq.com/install-windows.html">Dirigete a la página oficial de RabbitMQ</a>, descarga y ejecuta el binario del lenguaje Erlang (dependencia de RabbitMQ). Luego descarga y ejecuta el instalar para Windows de RabbitMQ.</p>

<hr />

<h2>Conclusión</h2>

<p>Hemos dado el primer paso para conocer lo que las colas de mensajes se traen entre manos, ciertamente todo parece muy ambiguo en este momento pero no te preocupes, en la siguiente entrada podrás ver en un ambiente práctico con mayor facilidad de qué se trata todo esto, mientras tanto ya conocemos un poco la teoría y nos vamos preparando para la mejor parte.</p>
