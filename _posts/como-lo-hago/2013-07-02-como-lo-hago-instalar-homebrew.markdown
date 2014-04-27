---
layout: post
status: publish
published: true
title: Cómo Instalar Homebrew
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
date: 2013-07-02 00:00:36.000000000 -04:30
thumbnail: http://i.imgur.com/4NCqc4B.png
description: La mejor manera de gestionar piezas de software es mediante el uso de manejadores de paquetes, veamos como hacerlo en Mac OS X con Homebrew.
dificultad: Novato
duracion: 5
categories:
- Cómo lo hago
- Homebrew
tags:
- como lo hago
- howto
- homebrew
- paquetes
- manejador
- mac
- os x
---
En este ***Cómo lo hago*** se explicará el proceso de instalación de Homebrew, requerimientos del sistema y además hablaremos brevemente sobre él.

* * *

## ¿Qué es Homebrew?.

Homebrew es un manejador de paquetes hecho en Ruby para la plataforma Mac OS X el cual permite una fácil gestión de software libre en tu computador. Para aquellos familiarizados con ambientes Linux, Homebrew funciona parecido al ***apt-get*** de las distribuciones basadas en Debian.

* * *

## ¿Por qué utilizar un manejador de paquetes en lugar de instalar manualmente?.

Utilizar un manejador de paquetes ofrece numerosas ventajas:

*   Permite actualizar facilmente versiones de paquetes completos.
*   Las dependencias se instalan automáticamente sin que el usuario deba hacerlo previamente.
*   Descarga, compila e instala en un solo paso.
*   Evita duplicidad de paquetes.
*   Eliminar paquetes es igual de facil que instalarlos.
*   Paquetes es más que aplicaciones, por ejemplo wget.
*   Los paquetes son instalados en su propio directorio y su enlace simbólico se almacenan en */usr/local*

* * *

## ¿Y por qué debo usar Homebrew, no hay alternativas?

Ciertamente Homebrew no es el único manejador de paquetes para OSX, también se encuentran [MacPorts][1] y [Fink][2]; sin embargo estos otros manejadores suelen instalar sus propias versiones de las herramientas, que ya posee el sistema operativo, lo cual produce una duplicación de librerías y archivos binarios. Además que Homebrew trata de ofrecer un nivel aceptable de compatibilidad con el sistema operativo al usar herramientas de Xcode para construir las dependecias.

* * *

## Bien, ¿Qué necesito?

La configuración recomendada para asegurar una máxima compatibilidad es:

*   Un computador Mac con CPU Intel.
*   OS X 10.6 (Snow Leopard) o mayor.
*   [Linea de comandos de Xcode][3].

*Nota: es posible instalar Homebrew en computadores PowerPC con OSX 10.4; sin embargo es un proceso que debe hacerse con cautela. Más detalles en la [rama experimental de GitHub.][4]*

* * *

## Perfecto. Quiero Homebrew ya! ¿Cómo lo instalo?

Debido a que Ruby se encuentra preinstalado en OSX, instalar Homebrew es tan fácil como abrir el terminal y ejecutar el siguiente comando:

```sh
$ ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
```

Esto buscará en el repositorio de Github la ultima versión de Homebrew y la instalará en tu sistema.

Es recomendable luego de instalar Homebrew, antes de realizar cualquier otra operación, ejecutar el comando:

```sh
$ brew doctor
```

Este proceso detectará si existe algún inconveniente que pueda causar problemas de compilación o compatibilidad más adelante. Por ejemplo, tener instalado Xcode pero no la Linea de Comandos de Xcode puede llevar a problemas de compilación, Homebrew lo sabe y lo puede advertir en su diagnostico con ***doctor***:

```sh
Warning: Experimental support for using Xcode without the "Command Line Tools".
You have only installed Xcode. If stuff is not building, try installing the
"Command Line Tools for Xcode" package provided by Apple.
```

Como dijimos antes, los enlaces simbólicos de los paquetes de Hombrew se almacenan en /usr/local/bin, lo que nos ofrece la ventaja de no necesitar invocar el comando ***sudo*** lo cual viene siendo uno de los lemas de la solución Hombrew ya que esto puede comprometer el sistema.

Es posible que un paquete ya se encuentre instalado en el computador y que nosotros hayamos decidido instalarlo por Homebrew, por ejemplo, Ruby. Podremos notar que tendremos 2 versiones de Ruby, una en ***/usr/bin*** y otra en ***/usr/local/bin*** (instalada por Homebrew).

{% include middle-post-ad.html %}

**¿Cómo saber cual de las 2 se está utilizando?**

Para determinar esto podemos hacer uso del siguiente comando:

```sh
$ echo $PATH
```

y podremos obtener una salida como esta:

```sh
/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin
```

En este caso, la salida nos indica que al ejecutar el comando ***ruby***, el sistema buscará el enlace simbólico de dicho comando en el orden previamente indicado, es decir, primero en ***/usr/bin***, luego en ***/bin*** y así sucesivamente hasta que exista la primera ocurrencia. Esto quiere decir que la versión de Ruby que estaría utilizando al ejecutar el comando sería la que trae el computador (alojada en **/usr/bin**) en lugar de la que instalamos por Homebrew.

Para evitar este tipo de inconvenientes, es recomendable editar ( o crear si no existe ) el archivo .bashrc ( .zshrc en caso de que usen la linea de comandos ZSH ) en el directorio principal del usuario, e indicar el orden deseado de búsqueda de comandos agregando algo parecido a esto:

```sh
export PATH=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
```

De esta manera el directorio en el que Homebrew guarda los enlaces simbólicos de los paquetes será el primero en ser buscado al ejecutar un comando.
* * *

## ¿Ahora qué?

Ahora solo queda empezar a experimentar con Homebrew. En Homebrew los nombres de los paquetes se les denomina fórmulas, puedes comenzar probando instalar formulas básicas como ***git***:

```sh
$ brew install git
```

¿Quieres saber si la fórmula que buscas está en Homebrew?:

```sh
$ brew search nombre_formula
```

Instalaste una fórmula que no te gusta y la quieres borrar:

```sh
$ brew remove nombre_formula
```

¿Quieres actualizar una fórmula?:

```sh
$ brew upgrade nombre_formula
```

¿Quieres actualizar Homebrew?:

```sh
$ brew update
```

* * *

## Conclusión

Mucho provecho se le puede sacar a esta herramienta, instalarla es solo el primer paso para tener un computador con un sistema interno sencillo de manejar, fácil de mantener, menos conflictivo y altamente expansible. Cualquier duda que tengas la puedes expresar en los comentarios y trataré de responderte lo mejor que pueda.

 [1]: http://www.macports.org/
 [2]: http://finkproject.org/
 [3]: http://itunes.apple.com/us/app/xcode/id497799835
 [4]: https://github.com/mistydemeo/tigerbrew
