---
layout: post
status: publish
title: "Homebrew: Cask y Brewfiles"
author: Jonathan Wiesel
author_login: jonathan
description: El poder de Homebrew se extiende más allá del manejo por terminal de nuestras aplicaciones de línea de comandos, aprende más en esta nueva entrada.
dificultad: Aprendiz
duracion: 15
thumbnail: http://i.imgur.com/4NCqc4B.png
categories:
- Cómo lo hago
- Homebrew
tags:
- como lo hago
- howto
- homebrew
- cask
- brewfile
- provision
- automation
---
En el pasado hemos visto [cómo utilizar Homebrew](http://codehero.co/como-lo-hago-instalar-homebrew/) como nuestro manejador de paquetes
en Mac OS X; sin embargo el poder de Homebrew llega aún más alla de lo que vimos previamente, es por ello que esta semana traemos una nueva
entrada con más poder de Homebrew.

***

## Qué es Cask

Como bien hemos visto anteriormente, Homebrew nos permite instalar y gestionar paquetes en nuestro computador de la misma manera que
otros manejadores de paquetes lo hacen en otros sistemas operativos *NIX. Ahora, si has venido utilizándolo por un tiempo, seguramente
te habrás dado cuenta que un tipo de aplicación en particular no es posible instalarla con Homebrew, las más convencionales aplicaciones
en Mac OS X, las definidas como un ejecutable con el sufijo `.app`.  

Entra en juego Homebrew Cask, este paquete de Homebrew permite gestionar la mayoría de
este tipo de aplicaciones de la misma manera que lo hacemos con el resto de nuestros otros paquetes de Homebrew. Olvídate de ir a
buscar el `.dmg` por ahí, abrirlo y arrastrar el ejecutable a tu directorio de aplicaciones.

También se pueden instalar otro tipo de paquetes con Cask tales como *plugins* de QuickLook, fuentes tipográficas, protectores de pantalla
e incluso *widgets* para el *Dashboard*.

***

## Instalar Cask

Como mencionamos anteriormente, Cask es un paquete o fórmula de Homebrew; sin embargo esta no se encuentra en los repositorios convencionales
de Homebrew, por ello debemos primero agregarlo para poder encontrar nuestro paquete de Cask:

```sh
$ brew tap caskroom/cask
```

Ahora si podremos instalar nuestro paquete de Cask:

```sh
$ brew install brew-cask
```

***

## Usar Cask

El uso de esta nueva funcionalidad de Homebrew es bastante similar a la convencional, tan solo debemos incluir el comando `cask` después
del comando `brew`, la mayoría de los comandos de Homebrew adaptarán su comportamiento para realizar las mismas acciones pero con Cask.

Veamos por ejemplo como buscaríamos una aplicación que nos interesa, supongamos que deseamos instalar Google Chrome:

```sh
$ brew cask search chrome
==> Partial matches
chrome-remote-desktop-host    chromecast		    google-chrome

$ brew cask info google-chrome
google-chrome: latest
https://www.google.com/chrome/
Not installed
https://github.com/caskroom/homebrew-cask/commits/master/Casks/google-chrome.rb
==> Contents
  Google Chrome.app (link)

$ brew cask install google-chrome
==> Downloading https://dl.google.com/chrome/mac/stable/GGRO/googlechrome.dmg
######################################################################## 100.0%
==> Symlinking App 'Google Chrome.app' to '/Volumes/Storage/jonathanwiesel/Applications/Google Chrome.app'
google-chrome installed to '/opt/homebrew-cask/Caskroom/google-chrome/latest' (228 files, 151M)

$ brew cask cleanup
==> Removing dead symlinks
==> Removing cached downloads
/Library/Caches/Homebrew/google-chrome-latest.dmg

$ brew cask list
google-chrome

$ brew cask uninstall google-chrome
==> Removing App symlink: '/Volumes/Storage/jonathanwiesel/Applications/Google Chrome.app'
```

Lo ves, prácticamente lo mismo que conocemos de Homebrew pero con muchas más posibilidades.

***

## Configurar Cask

Es posible que los directorios donde se alojan tus aplicaciones no sea el por defecto que Cask los trata de instalar, por ello al comando
`brew cask` se le pueden pasar opciones para ello como por ejemplo:

```sh
$ brew cask install --appdir="/Applications" google-chrome
```

Esto sin duda puede ser tedioso de escribir cada vez que quieras instalar algo con Cask por lo que puedes agregar estar variables
de ambiente a tu `.bash_profile`, `.bashrc`, `.zshrc` o el que aplique para que sean siempre tomados en cuenta:

```
export HOMEBREW_CASK_OPTS="--appdir=/Applications"
```

> Existen varias opciones para los diferentes tipos de aplicaciones que Cask puede instalar, para más información visita el [Wiki
de uso de Homebrew Cask](https://github.com/caskroom/homebrew-cask/blob/master/USAGE.md#options).

***

## Brewfiles

Si has llegado al punto que deseas automatizar el proceso de instalación de varios paquetes de Homebrew, pues los `Brewfiles` son para ti.

El concepto e implementación son sumamente sencillos, tan solo debemos colocar en un archivo los comandos de Homebrew que deseas ejecutar,
**siempre obviando** el comando `brew`.

> Esta práctica es muy útil cuando quieres lograr el aprovisionamiento un equipo nuevo o de trabajo con todos tus implementos de trabajo.

Veamos un pequeño ejemplo de la estructura de un `Brewfile`:

```
update

install nginx
install mongodb

cleanup
```

Al ejecutar este archivo Homebrew realizará lo siguiente:

* Actualizarse a sí mismo y la definición de las formulas que existen.
* Instalar Nginx.
* Instalar MongoDB.
* Eliminar versiones antíguasq ue pudieran existir de los paquetes.

Incluso puedes incluir lo que aprendimos de Cask:

```
...
tap caskroom/cask
install brew-cask

cask install google-chrome
```

> Recuerda que puedes incluir otros comandos de Homebrew, no solo los de instalación

Ahora, ¿como ejecutamos este archivo?

Pues muy fácil, si tu archivo se tiene el nombre de `Brewfile`, tan solo debes ejecutar el siguiente comando en el directorio donde se
encuentra:

```sh
$ brew bundle
```

> Sí, como un `bundle install`. El `Brewfile` es como el `Gemfile` de tu ambiente de trabajo.

En caso de que tenga otro nombre o esté en otro directorio tan solo se le debe especificar:

```sh
$ brew bundle /Volumes/Storage/jonathanwiesel/Dektop/miBrewfile
```

***

## Conclusión

Esta semana hemos visto que Homebrew es mucho más poderoso de lo que inicialmente habíamos planteado, lo que aprendimos hoy nos permite
tener un control mucho más completo de lo que reside en nuestro computador y cómo manejarlo.

Si conoces otros secretos o datos interesantes de Homembrew no dudes en comentarlos para el beneficio de todos los lectores.
