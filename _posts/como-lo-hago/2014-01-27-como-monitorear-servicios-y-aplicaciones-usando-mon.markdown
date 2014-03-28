---
layout: post
status: publish
published: true
title: Cómo monitorear servicios y aplicaciones usando mon(1)
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
wordpress_id: 2945
wordpress_url: http://codehero.co/?p=2945
date: 2014-01-27 23:00:28.000000000 -04:30
categories:
- Cómo lo hago
- mon
tags:
- Email
- mon
- mon(1)
- monitor
- monitoreo
- servicios
- vps
- alerta
---
<p>Si te has encontrado en esas incómodas situaciones de estar pendiente que tu aplicación no se haya caído sin que te hayas dado cuenta y tengas que levantarla nuevamente de manera manual, o que algún servicio de tu equipo cesó de funcionar y no te enteraste sino hasta que alguien más lo notó, no desesperes, veamos como mantener todo bajo control de manera fácil y rápida con <strong>mon(1)</strong>.</p>

<hr />

<h2>¿Qué es mon(1)?</h2>

<p>Es una herramienta de <a href="https://github.com/visionmedia/mon">código abierto</a> que permite monitorear la culminación de una aplicación y/o servicio para tomar acción en cuanto suceda.</p>

<p>Esta herramienta nos permite volver a levantar una aplicación si esta falla y termina repentinamente, adicionalmente si esto ocurre podemos indicarle a <em>mon(1)</em> que ejecute un comando, programa o acción, las cuales suelen estar relacionadas (pero no limitadas) al envío de alertas a los administradores.</p>

<p>Algunas de las ventajas de <em>mon(1)</em> que resaltan frente a otras soluciones de monitoreo:</p>

<ul>
<li><strong>Simplicidad</strong> - por ser tan sencillo de utilizar ( ya lo verás ).</li>
<li><strong>Flexibilidad</strong> - al permitir ejecutar prácticamente cualquier tipo de acción en caso de que tu aplicación o servicio falle.</li>
<li><strong>Memoria</strong> - debido a que utiliza menos de 400KB de memoria por proceso.</li>
</ul>

<hr />

<h2>Instalación</h2>

<p>Como de costumbre siempre tratamos de que el proceso de instalación sea el más sencillo posible.</p>

<h3>Mac OS X</h3>

<p>Si estas en el sistema operativo de Apple y has leído anteriormente nuestros cursos sabrás que debemos hacerlo como <a href="http://codehero.co/como-lo-hago-instalar-homebrew/">Homebrew</a>:</p>

<pre>$ brew update
$ brew install mon
</pre>

<h3>Otros *nix</h3>

<p>El mantenedor del repositorio de mon(1) se ha encargado de ofrecernos una instalación de una sola línea para mantener la onda simple de esta solución:</p>

<pre>$ (mkdir /tmp/mon && cd /tmp/mon && curl -L# https://github.com/visionmedia/mon/archive/master.tar.gz | tar zx --strip 1 && make install)
</pre>

<p>Finalmente verificamos la instalación:</p>

<pre>$ mon --version
1.2.3
</pre>

<hr />

<h2>Opciones</h2>

<p>Como cualquier otro comando en el terminal, ejecutar el programa es tan sencillo al invocar su nombre y a continuación la aplicación o servicio que monitoreará:</p>

<pre>$ mon servicio
</pre>

<blockquote>
  <p>Debemos recalcar que la aplicación o servicio debe ser iniciado por <em>mon(1)</em> para que este pueda monitorearlo, no es posible atar un proceso de <em>mon(1)</em> a una aplicación o servicio ya en ejecución.</p>
</blockquote>

<p>Pero la parte divertida reside en las opciones de <em>mon(1)</em>, demos un vistazo a algunas de las que ofrece:</p>

<h3>Dormir (<code>-s</code>)</h3>

<p>En caso de que desees especificar el tiempo especifico en segundos que esperará <em>mon(1)</em> antes de volver a ejecutar la aplicación o servicio en caso de que esta falle. El valor por defecto es 1 segundo.</p>

<h3>ID de proceso (<code>-p</code>)</h3>

<p>Puedes especificar un archivo de extensión <code>.pid</code> en el cual se almacenará el identificador del proceso de dicho servicio.</p>

<h3>Estado del proceso (<code>-S</code>)</h3>

<p>Podemos verificar el estado de alguna aplicación o servicio, para ello debemos especificar el archivo sobre el cual escribimos el PID del proceso.</p>

<h3>Demonio (<code>-d</code>)</h3>

<p>Esta opción te permite <em>demonizar</em> el proceso de <em>mon(1)</em> para que al iniciarlo puedas volver a terminal mientras que este se ejecuta en el fondo, de lo contrario quedarás esperando por la salida del proceso como si ejecutaras cualquier otro servicio de tu sistema.</p>

<h3>Bitácora (<code>-l</code>)</h3>

<p>Normalmente los mensajes de salida del proceso de <em>mon(1)</em> son escritos en el terminal o en la interfaz de entrada de salida por defecto (<em>stdio</em>); sin embargo cuando el proceso es <em>demonizado</em> se escribirá en un archivo de bitácora cuando ocurra algún fallo o reinicio, de no especificar uno se escribirá por defecto a <code>mon.log</code>.</p>

<h3>Intentos (<code>-a</code>)</h3>

<p>Aquí especificamos la cantidad de veces que <em>mon(1)</em> tratará de reiniciar el servicio o aplicación si este finaliza. De alcanzar este numero de intentos el proceso de <em>mon(1)</em> finaliza. El número de intentos por defecto es 10.</p>

<h3>Comando en reinicio (<code>-R</code>)</h3>

<p>El comando o acción que se especifique se ejecutará cuando <em>mon(1)</em> detecte la finalización del servicio que monitorea y decida intentar levantarlo nuevamente. A esta acción se le pasa como parámetro el PID de la aplicación o servicio en cuestión.</p>

<h3>Comando en error (<code>-E</code>)</h3>

<p>El comando o acción que se especifique se ejecutará cuando <em>mon(1)</em> detecte la finalización del servicio que monitorea y haya agotado sus intentos de reinicio por lo que finalizará. A esta acción se le pasa como parámetro el PID de la aplicación o servicio en cuestión.</p>

<hr />

<h2>Demo</h2>

<p>Es hora de ponernos en acción y ver como utilizar <em>mon(1)</em>.</p>

<blockquote>
  <p><strong>Los recursos para este curso los podrás encontrar en el repositorio de GitHub en la parte superior de la entrada.</strong></p>
</blockquote>

<h3>Corrida breve</h3>

<p>Primero probemos ejecutando una pequeña aplicación <em>echo</em>:</p>

<pre>$ mon ./programa-echo.sh -a 2 -s 2 -R ./alerta-reinicio.sh -E ./alerta-error.sh
</pre>

<blockquote>
  <p>Recuerda que para este caso los scripts deben tener permisos de ejecución, puedes hacerlo con <code>chmod +x script.sh</code>.</p>
</blockquote>

<p>Si analizamos el comando veremos que le estamos indicando a <em>mon(1)</em> lo siguiente:</p>

<ul>
<li>El número de <strong>intentos</strong> de reinicio sea de 2.</li>
<li>Se debe esperar 2 segundos antes de volver a reiniciar.</li>
<li>En caso de reinicio se debe ejecutar el el script <code>alerta-reinicio.sh</code>.</li>
<li>En caso de volver a fallar luego de agotarse los intentos de reinicio se debe ejecutar el script <code>alerta-error.sh</code>.</li>
</ul>

<blockquote>
  <p>Nos es obligatorio que las acciones sean scripts de bash, puede ser cualquier acción que pueda ser ejecutada desde el terminal.</p>
</blockquote>

<p>Al ejecutar el comando antes descrito obtendremos un salida como esta:</p>

<pre>mon : child 1525
mon : sh -c "./programa-echo.sh"
Esto es el programa echo.
Este programa ejecutará una serie de acciones
y luego finalizará
...
sin pánico
...
mon : on restart `./alerta-reinicio.sh 1525`
Se ha reiniciado el proceso 1525
correspondiente al programa-echo
...
mon : last restart less than one second ago
mon : 2 attempts remaining
mon : child 1533
mon : sh -c "./programa-echo.sh"
Esto es el programa echo.
Este programa ejecutará una serie de acciones
y luego finalizará
...
sin pánico
...
mon : on restart `./alerta-reinicio.sh 1533`
Se ha reiniciado el proceso 1533
correspondiente al programa-echo
...
mon : last restart 12 seconds ago
mon : 1 attempts remaining
mon : 2 restarts within 12 seconds, bailing
mon : on error `./alerta-error.sh 1533`
Ha finalizado el proceso 1533
correspondiente al programa-echo
el programa ya no volverá a iniciar
...
mon : bye :)
</pre>

<p>Es posible que te estés preguntando ¿Qué esta sucediendo con el programa que causa que <em>mon(1)</em> lo trate de reiniciar?</p>

<p>Debido a que nuestro "programa" es un sencillo script que finaliza naturalmente, <em>mon(1)</em> al detectar una finalización trata de volverlo a levantar, ya que su objetivo es mantener corriendo el servicio. Por ello te podrás dar cuenta que este tipo de herramientas se enfocan a aplicaciones y servicios que corren indefinidamente.</p>

<h3>Corrida indefinida</h3>

<p>Ahora probemos con algo un poco más acorde a lo que deseamos, iniciemos el servicio de <a href="http://codehero.co/como-instalar-nginx/">Nginx</a> con mon(1):</p>

<pre>$ mkdir mon-pids
$ mon -d nginx -p mon-pids/nginx.pid -R ./email-admin.sh
</pre>

<blockquote>
  <p>Una vez más, recuerda que tu script debe tener permisos de ejecución.</p>
</blockquote>

<p>En este caso estaremos <em>demonizando</em> el proceso para que luego de ejecutar el comando volvamos al terminal y todo continue ejecutandose en el fondo. En caso de finalizar el proceso de Nginx se ejecutará el script de envío de correo al administrador para notificarle de lo ocurrido.</p>

<p>También es de gran ayuda que usemos la opción <code>-p</code> para escribir en un archivo el PID, ya que esto nos permitirá gestionar dicho proceso sin necesidad de saber el número de PID y hacer cosas como esta:</p>

<pre>$ mon -S -p mon-pids/nginx.pid
1094 : alive : uptime 52 seconds
</pre>

<p>Bien, volviendo al tema, luego de iniciar nuestro proceso <em>demonizado</em> y volver al terminal probemos matar el proceso de nginx:</p>

<pre>$ kill `cat mon-pids/nginx.pid`
</pre>

<p>Luego de ello nos debe llegar un correo alertándonos sobre el reinicio del servicio.</p>

<blockquote>
  <p>Si el correo no te llega, es probable que tu ISP tenga bloqueado el envío de correos desde él mismo, es un caso común si lo estas probando en tu computador personal ya que el programa <code>mail</code> es solo un agente de usuario de correo, en este caso necesitarías usar otro agente de transporte de correo que no sea el de tu ISP como <code>postfix</code> pero en esta entrada no hablaremos de como configurarlo.</p>
  
  <p>Por ello hemos incluido un pequeño programa hecho en <a href="http://codehero.co/series/node-y-express/">node.js</a> para que lo puedas probar, sigue las instrucciones en el README del directorio <code>rutina-email</code> en el repositorio para saber más.</p>
</blockquote>

<hr />

<h2>Conclusión</h2>

<p>Hemos aprendido que mantener nuestros servicios y aplicaciones corriendo no tiene que volverse una tarea estresante y de estar siempre pendiente. Si ya tenías otra herramienta para este fin, es posible que sea más pesada y consuma mayor cantidad de recursos. Recuerda que cada proceso de <em>mon(1)</em> maneja un único servicio o aplicación, puedes levantar la cantidad que desees y esto nos ofrece la ventaja que si por alguna razón el proceso de <em>mon(1)</em> falla, solo fallará el servicio o aplicación que este monitorea.</p>
