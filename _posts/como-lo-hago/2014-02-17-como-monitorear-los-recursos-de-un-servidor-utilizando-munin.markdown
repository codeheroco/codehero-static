---
layout: post
status: publish
published: true
title: Cómo monitorear los recursos de un servidor utilizando Munin
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
date: 2014-02-17 23:30:32.000000000 -04:30
thumbnail: http://i.imgur.com/VuJGkJA.png
description: Esta semana te traemos una solución para las ocasiones donde el estrés y la incertidumbre no serán parte del monitoreo de servidores, veamos más con Munin.
dificultad: Intermedio
duracion: 25
categories:
- Cómo lo hago
- munin
tags:
- como lo hago
- howto
- nginx
- monitor
- munin
- graficas
- plugins
---
Mantener el orden en un servidor puede convertirse en una tarea tediosa y angustiosa a medida que las aplicaciones que este contiene se vuelven más utilizadas y pesadas, al punto de tener una alta cantidad de procesos ejecutándose. La situación se torna complicada cuando un servidor que es sometido bajo muchas tareas empieza a fallar en algún lado, encontrar el error puede tomar horas o incluso días de dedicación. Esta semana te traemos una solución para estas ocasiones donde el estrés y la incertidumbre no serán parte de la rutina de análisis, veamos más con **Munin.**
***

## ¿Qué es Munin?

Esta herramienta de [código abierto](https://github.com/munin-monitoring/munin) permite monitorear los recursos de un servidor mediante un proceso residente en el mismo que va almacenando históricamente lo que sucede y construye múltiples gráficas indicando un gran número de estadísticas lo cual nos permite observar y analizar todo lo que ocurre dentro del servidor. Esto nos facilita la identificación (y prevención) de los problemas que pudiesen ocurrir como reinicios de algún proceso, desbordamientos de memoria de alguna aplicación, fallos en algún proceso de base de datos, entre otros.

Una de las ventajas de Munin, es su extensibilidad por medio de [*plugins*](https://github.com/munin-monitoring/contrib/tree/master/plugins), hay muchos creados por la comunidad para diferentes servicios o hardware específicos lo cual hará más eficiente el análisis debido a la recolección especializada de datos para cada caso.

Otra gran ventaja de Munin es su arquitectura basada en nodos, es decir, una instancia maestra puede recolectar información de varios servidores (que serán los nodos) para tener una recopilación de toda tu arquitectura de servidores de manera que no es necesario que tengas que revisar y analizar el estado de cada servidor por separado.

> En esta entrada nos enfocaremos en la recolección de información de una única instancia, la que resida en el servidor que deseamos analizar.

***

## Instalación

La información que nos proveerá Munin está diseñada para ser consultada mediante la exposición del servicio a la red. Por ello necesitaremos tener instalado un servidor web en nuestro equipo. En esta entrada haremos uso de [nginx](http://codehero.co/como-instalar-nginx/), pero si lo deseas puedes utilizar Apache, Lighttpd o el de tu preferencia.

La manera más sencilla de instalar Munin es utilizando los manejadores de paquetes del sistema operativo como YUM o apt-get. En esta entrada estaremos utilizando un ambiente de prueba Ubuntu 12.04.

> La última versión de Munin al momento de este escrito es 2.1.5. Sin embargo en Ubuntu 12.04 solo es posible instalar **nativamente** hasta la versión 1.4.6.

Tan solo debemos instalarlo del repositorio oficial:

```sh
$ sudo apt-get update
...
$ sudo apt-get install munin
...
```

Ahora editaremos el siguiente archivo `/etc/munin/munin.conf`, y veremos muchas opciones que nos permitirán configurar Munin a nuestro antojo. Por el momento nos enfocaremos en lo básico y necesario para que todo funcione. Veremos estos 5 parámetros comentados:

```sh
# dbdir   /var/lib/munin
# htmldir /var/cache/munin/www
# logdir  /var/log/munin
# rundir  /var/run/munin

# tmpldir /etc/munin/templates
```

Estos le indicarán a Munin lo siguiente:

* El directorio donde se almacenarán los datos del proceso de monitoreo.
* El directorio de acceso al servidor para visualizar la información recolectada.
* El directorio para almacenar las bitácoras del proceso.
* El directorio donde se encontrarán los archivos de ejecución.
* El directorio que almacena las plantillas visuales.

Debemos descomentarlos (quitándole los #), y al parámetro `htmldir` indiquemos el directorio que usaremos en nuestro servidor web para acceder a Munin:

```sh
dbdir   /var/lib/munin
htmldir /var/www/codehero/monitoreo
logdir  /var/log/munin
rundir  /var/run/munin

tmpldir /etc/munin/templates
```

Por último veremos también en la parte inferior del archivo la configuración del *host:*

```sh
[localhost.localdomain]
    address 127.0.0.1
    use_node_name yes
```

{% include middle-post-ad.html %}

Cambiemoslo a algo más a nuestro estilo:

```sh
[monitorCodehero]
    address 127.0.0.1
    use_node_name yes
```

Debemos asegurarnos que el directorio de acceso web que especificamos exista, de lo contrario lo crearemos:

```sh
$ cd /var/www
$ mkdir codehero
$ cd codehero
$ mkdir monitoreo
```

**IMPORTANTE: Le damos permiso a Munin para que pueda escribir en el directorio**:

```sh
$ sudo chown munin:munin -R /var/www/codehero/
```

Y reiniciaremos el servicio de Munin:

```sh
$ sudo service munin-node restart
```
***

## Configuración servidor web

Bien, ahora solo nos falta configurar nuestro servidor web para que podamos acceder a Munin.

En esta entrada como estamos utilizando [nginx](http://codehero.co/como-instalar-nginx/) abriremos el archivo de configuración (normalmente ubicado en `/etc/nginx/sites-available/default`) y lo dejaremos luciendo algo así:

```nginx
server {

    listen   80;
    root    /var/www;
    index   index.html index.htm;
    server_name localhost;

    location /codehero/monitoreo {
            auth_basic "Inicio de sesion de Administrador";
            auth_basic_user_file /var/www/.htpasswd;
    }
}
```

El `location` que especificamos nos permitirá restringir el acceso a dicha dirección para evitar que cualquiera pueda entrar en él. **No queremos que nadie ande ojeando data tan sensible como esta.**

Para esto último debemos definir el usuario en el archivo que indicamos:

```sh
$ htpasswd -c /var/www/.htpasswd usuarioMonitoreador
Adding password for usuarioMonitoreador.
New password: 1234
Re-type new password: 1234
```

***

## Prueba

Ahora solo debemos reiniciar nuestro servidor web y entrar a nuestra nueva dirección de Munin.

![munin-login](http://i.imgur.com/W1yFVPL.png)

Para entrar usaremos el usuario que definimos anteriormente.

![munin-menu](http://i.imgur.com/v78KFK2.png)

Tendremos un pequeño menu mostrándonos los nodos que este "maestro" monitorea, ya que estamos usando una sola instancia sirviéndose a sí mismo solo tendremos una.

> Si recibes un error de que no se puede encontrar nada es probable que no haya pasado suficiente tiempo para que Munin genere su primera salida, dale unos minutos.

Si accedemos al segundo enlace veremos varias gráficas indicándonos distintas métricas referente a variables como disco, tráfico, firewall, NFS (sistemas de archivos en red), procesos, memoria y más.

[![munin-graphs](http://i.imgur.com/AQxeuM2.png)](http://i.imgur.com/AQxeuM2.png)

> Es posible tener estadísticas de este tipo de servicios particulares con el uso de los *plugins.*

***

## Conclusión

Hemos aprendido como usar nuestro propio administrador de procesos supercargado, con capacidades extensibles y capaz de monitorear un *cluster* entero de servidores si lo deseamos. Lo que vimos en esta entrada es solo un vistazo de las posibilidades de esta herramienta. Siempre trataremos de ofrecerte las mejores herramientas para hacer de tu trabajo y/o aprendizaje una experiencia gratamente manejable.
