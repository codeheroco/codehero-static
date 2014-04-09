---
layout: post
status: publish
published: true
title: Cómo monitorear servicios y aplicaciones usando mon(1)
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
date: 2014-01-27 23:00:28.000000000 -04:30
thumbnail: http://i.imgur.com/VuJGkJA.png
description: Aprende a mantener tus servicios y aplicaciones siempre activos. Y en caso de que estos fallen podrás enterarte de ello y realizar acciones automáticamente.
dificultad: Aprendiz
duracion: 20
github: https://github.com/codeheroco/mon
categories:
- Cómo lo hago
- mon
tags:
- how to
- como lo hago
- Email
- mon
- mon(1)
- monitor
- monitoreo
- servicios
- vps
- alerta
---
Si te has encontrado en esas incómodas situaciones de estar pendiente que tu aplicación no se haya caído sin que te hayas dado cuenta y tengas que levantarla nuevamente de manera manual, o que algún servicio de tu equipo cesó de funcionar y no te enteraste sino hasta que alguien más lo notó, no desesperes, veamos como mantener todo bajo control de manera fácil y rápida con **mon(1)**.
***
##¿Qué es mon(1)?
Es una herramienta de [código abierto](https://github.com/visionmedia/mon) que permite monitorear la culminación de una aplicación y/o servicio para tomar acción en cuanto suceda.

Esta herramienta nos permite volver a levantar una aplicación si esta falla y termina repentinamente, adicionalmente si esto ocurre podemos indicarle a *mon(1)* que ejecute un comando, programa o acción, las cuales suelen estar relacionadas (pero no limitadas) al envío de alertas a los administradores.

Algunas de las ventajas de *mon(1)* que resaltan frente a otras soluciones de monitoreo:

* **Simplicidad** - por ser tan sencillo de utilizar ( ya lo verás ;) ).
* **Flexibilidad** - al permitir ejecutar prácticamente cualquier tipo de acción en caso de que tu aplicación o servicio falle.
* **Memoria** - debido a que utiliza menos de 400KB de memoria por proceso.
***
##Instalación
Como de costumbre siempre tratamos de que el proceso de instalación sea el más sencillo posible.

###Mac OS X

Si estas en el sistema operativo de Apple y has leído anteriormente nuestros cursos sabrás que debemos hacerlo como [Homebrew](http://codehero.co/como-lo-hago-instalar-homebrew/):

```sh
$ brew update
$ brew install mon
```

###Otros *nix

El mantenedor del repositorio de mon(1) se ha encargado de ofrecernos una instalación de una sola línea para mantener la onda simple de esta solución:

```sh
$ (mkdir /tmp/mon && cd /tmp/mon && curl -L# https://github.com/visionmedia/mon/archive/master.tar.gz | tar zx --strip 1 && make install)
```
Finalmente verificamos la instalación:

```sh
$ mon --version
1.2.3
```
***
##Opciones
Como cualquier otro comando en el terminal, ejecutar el programa es tan sencillo al invocar su nombre y a continuación la aplicación o servicio que monitoreará:

```sh
$ mon <servicio>
```
> Debemos recalcar que la aplicación o servicio debe ser iniciado por *mon(1)* para que este pueda monitorearlo, no es posible atar un proceso de *mon(1)* a una aplicación o servicio ya en ejecución.


Pero la parte divertida reside en las opciones de *mon(1)*, demos un vistazo a algunas de las que ofrece:

###Dormir (`-s`)
En caso de que desees especificar el tiempo especifico en segundos que esperará *mon(1)* antes de volver a ejecutar la aplicación o servicio en caso de que esta falle. El valor por defecto es 1 segundo.

###ID de proceso (`-p`)
Puedes especificar un archivo de extensión `.pid` en el cual se almacenará el identificador del proceso de dicho servicio.

###Estado del proceso (`-S`)
Podemos verificar el estado de alguna aplicación o servicio, para ello debemos especificar el archivo sobre el cual escribimos el PID del proceso.

###Demonio (`-d`)
Esta opción te permite *demonizar* el proceso de *mon(1)* para que al iniciarlo puedas volver a terminal mientras que este se ejecuta en el fondo, de lo contrario quedarás esperando por la salida del proceso como si ejecutaras cualquier otro servicio de tu sistema.

###Bitácora (`-l`)
Normalmente los mensajes de salida del proceso de *mon(1)* son escritos en el terminal o en la interfaz de entrada de salida por defecto (*stdio*); sin embargo cuando el proceso es *demonizado* se escribirá en un archivo de bitácora cuando ocurra algún fallo o reinicio, de no especificar uno se escribirá por defecto a `mon.log`.

###Intentos (`-a`)
Aquí especificamos la cantidad de veces que *mon(1)* tratará de reiniciar el servicio o aplicación si este finaliza. De alcanzar este numero de intentos el proceso de *mon(1)* finaliza. El número de intentos por defecto es 10.

###Comando en reinicio (`-R`)
El comando o acción que se especifique se ejecutará cuando *mon(1)* detecte la finalización del servicio que monitorea y decida intentar levantarlo nuevamente. A esta acción se le pasa como parámetro el PID de la aplicación o servicio en cuestión.

###Comando en error  (`-E`)
El comando o acción que se especifique se ejecutará cuando *mon(1)*  detecte la finalización del servicio que monitorea y haya agotado sus intentos de reinicio por lo que finalizará. A esta acción se le pasa como parámetro el PID de la aplicación o servicio en cuestión.
***
##Demo
Es hora de ponernos en acción y ver como utilizar *mon(1)*.

> **Los recursos para este curso los podrás encontrar en el repositorio de GitHub en la parte superior de la entrada.**

{% include middle-post-ad.html %}

###Corrida breve

Primero probemos ejecutando una pequeña aplicación *echo*:

```sh
$ mon ./programa-echo.sh -a 2 -s 2 -R ./alerta-reinicio.sh -E ./alerta-error.sh
```
> Recuerda que para este caso los scripts deben tener permisos de ejecución, puedes hacerlo con `chmod +x script.sh`.

Si analizamos el comando veremos que le estamos indicando a *mon(1)* lo siguiente:

* El número de **intentos** de reinicio sea de 2.
* Se debe esperar 2 segundos antes de volver a reiniciar.
* En caso de reinicio se debe ejecutar el el script `alerta-reinicio.sh`.
* En caso de volver a fallar luego de agotarse los intentos de reinicio se debe ejecutar el script `alerta-error.sh`.

> Nos es obligatorio que las acciones sean scripts de bash, puede ser cualquier acción que pueda ser ejecutada desde el terminal.

Al ejecutar el comando antes descrito obtendremos un salida como esta:

```sh
mon : child 1525
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
```

Es posible que te estés preguntando ¿Qué esta sucediendo con el programa que causa que *mon(1)* lo trate de reiniciar?

Debido a que nuestro "programa" es un sencillo script que finaliza naturalmente, *mon(1)* al detectar una finalización trata de volverlo a levantar, ya que su objetivo es mantener corriendo el servicio. Por ello te podrás dar cuenta que este tipo de herramientas se enfocan a aplicaciones y servicios que corren indefinidamente.

###Corrida indefinida

Ahora probemos con algo un poco más acorde a lo que deseamos, iniciemos el servicio de [Nginx](http://codehero.co/como-instalar-nginx/) con mon(1):

```sh
$ mkdir mon-pids
$ mon -d nginx -p mon-pids/nginx.pid -R ./email-admin.sh
```

> Una vez más, recuerda que tu script debe tener permisos de ejecución.

En este caso estaremos *demonizando*  el proceso para que luego de ejecutar el comando volvamos al terminal y todo continue ejecutandose en el fondo. En caso de finalizar el proceso de Nginx se ejecutará el script de envío de correo al administrador para notificarle de lo ocurrido.

También es de gran ayuda que usemos la opción `-p` para escribir en un archivo el PID, ya que esto nos permitirá gestionar dicho proceso sin necesidad de saber el número de PID y hacer cosas como esta:

```sh
$ mon -S -p mon-pids/nginx.pid
1094 : alive : uptime 52 seconds
```

Bien, volviendo al tema, luego de iniciar nuestro proceso *demonizado* y volver al terminal probemos matar el proceso de nginx:

```sh
$ kill `cat mon-pids/nginx.pid`
```
Luego de ello nos debe llegar un correo alertándonos sobre el reinicio del servicio.

> Si el correo no te llega, es probable que tu ISP tenga bloqueado el envío de correos desde él mismo, es un caso común si lo estas probando en tu computador personal ya que el programa `mail` es solo un agente de usuario de correo, en este caso necesitarías usar otro agente de transporte de correo que no sea el de tu ISP como `postfix` pero en esta entrada no hablaremos de como configurarlo.

> Por ello hemos incluido un pequeño programa hecho en [node.js](http://codehero.co/series/node-y-express/) para que lo puedas probar, sigue las instrucciones en el README del directorio `rutina-email` en el repositorio para saber más.

***
##Conclusión
Hemos aprendido que mantener nuestros servicios y aplicaciones corriendo no tiene que volverse una tarea estresante y de estar siempre pendiente. Si ya tenías otra herramienta para este fin, es posible que sea más pesada y consuma mayor cantidad de recursos. Recuerda que cada proceso de *mon(1)* maneja un único servicio o aplicación, puedes levantar la cantidad que desees y esto nos ofrece la ventaja que si por alguna razón el proceso de *mon(1)* falla, solo fallará el servicio o aplicación que este monitorea.
