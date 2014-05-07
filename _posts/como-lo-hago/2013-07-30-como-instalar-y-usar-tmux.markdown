---
layout: post
status: publish
published: true
title: Cómo instalar y usar Tmux
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
date: 2013-07-30 00:00:47.000000000 -04:30
thumbnail: http://i.imgur.com/Xks5pPE.png
description: Para aquellos que gustan de usar el terminal pero deben abrir varias ventanas y sesiones, Tmux es la herramienta que se estaban perdiendo.
dificultad: Novato
duracion: 10
categories:
- Cómo lo hago
- tmux
tags:
- howto
- como lo hago
- tmux
- terminal
- consola
- multiplexor
---
Para aquellos que gustan de usar el terminal para llevar a cabo las tareas en su día a día pero deben abrir varias ventanas y sesiones para lograr llevar a cabo simultáneos procedimientos, **Tmux** es quizás la herramienta que se estaban perdiendo, esta semana hablaremos sobre cómo puede ayudarte a trabajar en el terminal de una manera más cómoda y eficiente.

***

##¿Qué es Tmux?

Su nombre es el diminutivo de *terminal multiplexer*  (multiplicador de terminal), y nos permite habilitar múltiples sesiones, ventanas y paneles para ser controladas mediante el mismo terminal. Es compatible con plataformas Linux, Mac OS X, FreeBSD, OpenBSD, NetBSD y Solaris.

La mejor manera de demostrar sus ventajas y funcionalidades es probandolo, así que procedamos a instalarlo.

***

##¿Cómo lo instalo?

En Mac OS X el proceso de instalación recomendado es mediante el uso de [Homebrew](http://codehero.co/como-lo-hago-instalar-homebrew/), con solo una línea ya estaremos listos para usar la herramienta:

```sh
$ brew install tmux
```

En otros sistemas que soportan el comando *apt-get*, la instalación es igual de sencilla:

```sh
$ apt-get install tmux
```

En su defecto también puedes dirigirte a la [página oficial de tmux](http://tmux.sourceforge.net/), descargar el *.tar.gz* y seguir el procedimiento de instalación manual.

***
##¿Cómo lo uso?

Para comenzar creemos una sesión nueva:

```sh
$ tmux new -s primera_sesion
```

![](http://i.imgur.com/0WiOA4W.png)

Esto iniciará una nueva sesión del terminal tmux con el nombre *primera_sesion*. Notemos que en la barra inferior del terminal podemos apreciar además del nombre de la sesión, lo siguiente: **0:-\***, esto se traduce en que tenemos una ventana en la sesión (ventana 0), como estamos en el directorio raíz del usuario la ruta es únicamente el guión (-), y el asterisco (*) nos indica que es la ventana activa

Debemos resaltar que el funcionamiento de tmux está enfocado a atajos de teclado, para ejecutar una funcionalidad debemos presionar Ctrl-b (accionador por defecto), luego los soltamos y presionamos la tecla de la acción que deseamos.

Por ahora creemos un nuevo panel en nuestra ventana, esto dividirá nuestra ventana horizontal o verticalmente para crear el otro panel, para hacerlo verticalmente presionemos `Ctrl-b %` y horizontalmente `Ctrl-b "`. Hagamos ambos para ver que pasa:

![](http://i.imgur.com/lS8Ixei.png)

Notemos que creamos 2 paneles adicionales, uno al dividir el original verticalmente en 2 y el otro al dividir el nuevo vertical derecho en 2 horizontales. Para poder ciclar entre los diferentes paneles podemos presionar `Ctrl-b o` o si queremos ir a alguno en particular podemos presionar `Ctrl-b q` lo cual nos dirá los números de cada panel y si rapidamente presionamos el número del que deseamos podremos ir a él.

> Si estas trabajando en un ambiente que te permite hacer uso de un ratón, más adelante explicaremos como configurar tmux para que lo soporte y hacer que el cambio de paneles sea más sencillo.

Digamos que no necesitamos estos 3 paneles ahora, así que desechemos este último presionando `Ctrl-b x`.

Ahora creemos una nueva ventana presionando `Ctrl-b c`:

![](http://i.imgur.com/tSpomk9.png)

Notemos que hemos creado una nueva ventana de terminal, podemos apreciar en la barra inferior que ahora tenemos la ventana 0 y la 1, el asterisco nos indica la ventana en la cual nos encontramos actualmente.

Para ciclar entre las diferentes ventanas podemos presionar `Ctrl-b n` para ir a la próxima ventana, `Ctrl-b p` para ir a la anterior o simplemente especificar la ventana que queremos, por ejemplo si quisiéramos ir a la ventana 0 presionaríamos `Ctrl-b 0`.

###Estado de sesión

Una de las grandes ventajas de tmux es su habilidad de desatarnos de la sesión, todo lo que la sesión contiene se mantendrá intacto. Hagamos una prueba de esto.

Conectemonos a un servidor por SSH mediante Tmux:

![](http://i.imgur.com/7AqBKBm.png)

Ahora presionemos `Ctrl-b d` para desatarnos de la sesión.

Notaremos que hemos vuelto a nuestro terminal común con el mensaje **[detached]**; sin embargo todo lo que dejamos corriendo en la sesión sigue ejecutandose, nuestra conexión SSH no está cerrada, volvamos a atar la sesión para comproblarlo:

```sh
$ tmux list-sessions
primera_sesion: 2 windows (created Sat Jul 27 18:04:37 2013) [104x31]

$ tmux attach-session -t primera_sesion
```

Esto reanudará nuestra sesión tal cual como la dejamos.

>Debemos tener en cuenta que si el computador en el que estamos trabajando es apagado las sesiones se perderán.



###Programación en pareja

Otro de los usos más interesantes que se le da a Tmux es la programación remota en pareja.

Para esto se recomienda construir una sesión de usuario aparte de la que usamos convencionalmente en el computador ya que no queremos que alguien acceda a nuestra información. En este caso lo haremos con nuestro usuario normal para la demostración.

Debemos crear la sesión especificando el *socket* que usará, lo cual permitirá compartirla entre varios usuarios, para dar acceso a otros usuarios al *socket* debemos otorgarle los permisos necesarios:

```sh
$ tmux -S /tmp/emparejado
$ chmod 755 /tmp/emparejado
```

Ahora en nuestro otro computador nos conectamos por SSH al equipo anfitrión y nos atamos a la sesión (recuerda que debes tener habilitado este tipo de acceso remoto en la configuración de tu computador anfitrión).

![](http://i.imgur.com/ZCqXRf1.png)

Ahora ambos equipos se encuentran conectados a la misma sesión de Tmux y lo que uno escriba se verá reflejado en el otro:

![](http://i.imgur.com/Oo9ubmT.png)
Podemos notar una especie de puntos rellenando el fondo de la ventana más grande, esto se debe a que el terminal toma el tamaño de la ventana más pequeña (en este caso la del invitado) con el fin de que ambos puedan ver la misma información.

> Si quieres adentrarte más en la programación en pareja por terminal, te recomendamos que le eches un vistazo a [Tmate](http://tmate.io/) y [Wemux](https://github.com/zolrath/wemux) basadas en Tmux, los cuales ofrecen varias ventajas relacionadas a este fin particular.

***
##Hoja de atajos

Especifiquemos algunos de los atajos más comunes.

Acción | Atajo
------------ | -------------
Crear nueva ventana | `Ctrl-b c`
Eliminar ventana actual | `Ctrl-b &`
Mover a ventana siguiente | `Ctrl-b n`
Mover a ventana anterior | `Ctrl-b p`
Mover a ventana especifica | `Ctrl-b <num ventana>`
Mover a ultima ventana seleccionada | `Ctrl-b l`
Mostar ventanas (al seleccionar una se irá a ella) | `Ctrl-b w`
Dividir panel verticalmente | `Ctrl-b %`
Dividir panel horizontalmente | `Ctrl-b "`
Ciclar entre paneles | `Ctrl-b o`
Mostar paneles (al seleccionar uno rapidamente, se irá a él) | `Ctrl-b q`
Mover panel actual a la derecha | `Ctrl-b }`
Mover panel actual a la izquierda | `Ctrl-b {`
Eliminar panel actual | `Ctrl-b x`
Eliminar todos los paneles excepto el actual | `Ctrl-b !`
Mostrar la hora | `Ctrl-b t`
Desatar de la sesión | `Ctrl-b d`
Mostar sesiones (al seleccionar una se irá a ella) | `Ctrl-b s`
Renombrar sesión | `Ctrl-b $`
Escribir en consola de comandos (comandos avanzados) | `Ctrl-b :`
Mostar atajos | `Ctrl-b ?`

***
##Configuración adicional

Podemos personalizar la experiencia con Tmux mediante la creación de un archivo de configuración.

En él podemos especificar varios aspectos como:

* Aspecto de los componentes gráficos.
* Remapear el accionador y otras funciones.
* Activar el soporte de mouse.
* Modificar parte del comportamiento.
* Y mucho más...

Este archivo de configuración debe llamarse *.tmux.conf* y debe estar almacenado en el directorio raíz de nuestro usuario. [Aquí](https://github.com/albertogg/dotfiles/blob/master/tmux/tmux.conf.symlink) puede ver un buen ejemplo de la estructura de uno.

***
##Conclusión

Esta herramienta es de las mejores compañeras si realizas múltiples tareas en el terminal, aprendimos un poco sobre sus ventajas, funcionalidades y usos, solo queda que te pongas a experimentar por tu cuenta. Te invitamos que nos relates tu experiencia y otros usos que le has podido dar.
