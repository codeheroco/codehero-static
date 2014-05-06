---
layout: post
status: publish
published: true
title: Cómo Instalar oh-my-zsh
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
date: 2013-07-09 04:30:30.000000000 -04:30
thumbnail: http://i.imgur.com/Xks5pPE.png
description: Hablaremos de uno de los complementos que a muchos les convierte el manejo cotidiano del terminal en un paseo por el parque. el framework oh-my-zsh.
dificultad: Novato
duracion: 10
categories:
- Cómo lo hago
- oh-my-zsh
tags:
- howto
- como lo hago
- oh-my-zsh
- zsh
- terminal
- consola
- shell
- bash
- sh
---
Esta semana, en ¿Cómo Lo Hago?, hablaremos de uno de los complementos que a muchos les convierte el manejo cotidiano del terminal en un paseo por el parque. el framework oh-my-zsh.

***

##¿Qué es ZSH?

Antes de hablar del plato principal debemos definir el contexto, ZSH es un terminal alternativo para sistemas operativos Unix que recopila funcionalidades de distintos terminales como Bash, ksh y tcsh.

Es quizás la línea de comandos más flexible y poderosa que hay, ofreciendo numerosas ventajas sobre todo en cuanto escritura de *scripts* e interpretación de comandos.

Algunas de las ventajas que ofrece ZSH:

*   Terminación automática de comandos, directorios, opciones y argumentos.
*   Edición de comandos de múltiples líneas.
*   Edición de variables.
*   Pila buffer de comandos.
*   Mayor englobamiento de archivos.
*   Mejor manejo de arreglos y variables.
*   Corrección ortográfica.
*   Altamente personalizable.

***

##¿Y qué hay de oh-my-zsh?

oh-my-zsh es un framework mantenido por la comunidad de código abierto que permite manejar fácilmente la configuración del terminal ZSH, es altamente personalizable y un gran complemento para usuarios que trabajan constantemente en el terminal ofreciéndoles un ambiente agradable a la vista, con muchas ayudas visuales, facilidad de ubicación y optimización de tareas gracias al la gama de funcionalidades que ofrece la librería de complementos.
***

##¿Cómo lo instalo?

Primero debes verificar que tengas instalado el terminal zsh. Para esto ejecuta el siguiente comando en el terminal:
```sh
$ zsh --version
```

Si lo tienes instalado obtendrás una salida como esta:
```sh
zsh 4.3.11 (i386-apple-darwin12.0)
```

De no tener ZSH instalado lo puedes instalar fácilmente de la siguiente manera:

###Mac OS X:
El método recomendado de instalación de ZSH en Mac OS X en caso de que no venga ya instalado es por Homebrew ([ingresa aquí si no sabes cómo instalar Homebrew](http://codehero.co/como-lo-hago-instalar-homebrew/)). Simplemente ejecuta el siguiente comando en el directorio raíz de tu usuario:
```sh
$ brew install zsh
```

###Linux:
Con un sencillo apt-get en el terminal:
```sh
$ apt-get install zsh
```

Ya teniendo ZSH instalado en el computador, procedemos a instalar oh-my-zsh.
Para esto tenemos 2 opciones, el método automático, y el método manual.

###Método automático
 Puede hacerlo ejecutando en el terminal el siguiente comando *curl*:
```sh
 $ curl -L https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh | sh
```

 O sino por medio de *wget* (común para usuario Linux):
```sh
 $ wget --no-check-certificate https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh
```

Este proceso buscará en Github la versión de oh-my-zsh más reciente y la instalará en el sistema.

Reiniciemos el terminal y veamos si el terminal zsh ha sido establecido como el predeterminado usando el siguiente comando:
```sh
$ echo $SHELL
```

De tener una salida como esta, podremos comprobar que efectivamente la instalación de oh-my-zsh configuró el terminal ZSH como predeterminado:
```sh
/bin/zsh
```

De lo contrario utilizaremos el siguiente comando para manualmente definir el terminal ZSH como predeterminado:
```sh
$ chsh -s /bin/zsh
```



###Método manual
El método manual de instalación requiere que tengamos instalado Git ([ingresa aquí para saber más sobre Git y su instalación](http://codehero.co/git-desde-cero-instalacion-configuracion-y-comandos-basicos/)). Clonaremos el repositorio de Github donde se encuentra alojado oh-my-zsh a nuestro sistema:
```sh
$ git clone git://github.com/robbyrussell/oh-my-zsh.git ~/.oh-my-zsh
```

Posteriormente crearemos el archivo de configuración de ZSH copiando la plantilla que trae oh-my-zsh:
```sh
$ cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc
```

Luego estableceremos el terminal ZSH como el predeterminado:
```sh
$ chsh -s /bin/zsh
```

Por último reiniciamos el terminal y *voilà*.
***
##Configuración

Un nuevo archivo se encontrará en el directorio raíz de tu usuario llamado ***.zshrc***. Este archivo de configuración contiene la magia que debemos invocar para disfrutar de oh-my-zsh.

Abramos dicho archivo en un editor de texto (o en el mismo terminal) y agreguemos/editemos algunos detalles clave:

###Variable ZSH
```sh
ZSH=$HOME/.oh-my-zsh
```
Se especifica la ruta donde debió instalarse oh-my-zsh, esto se configura por defecto así que no debe alterarse a menos que sea necesario.

###Variable ZSH_THEME
```sh
ZSH_THEME="nombre_de_tema"
```
Se especifica el tema visual a usar. Puedes acceder [aquí](https://github.com/robbyrussell/oh-my-zsh/wiki/themes) para visualizar algunos de los temas que incluye oh-my-zsh. Para elegir el tuyo simplemente coloca el nombre del tema que deseas en esta variable. Inclusive puede crear tu tema propio y almacenarlo en el directorio *.oh-my-zsh/themes/*

###Alias
```sh
alias gs="git status"
alias ga="git add"
...
```
Los alias son simplemente comandos personalizados que puedes definir para ejecutar otros comandos en el terminal, por ejemplo en nuestro archivo tenemos el comando ***gs*** que al ser invocado ejecutaría el comando ***git status***. Puedes definir la cantidad de alias que desees.

###Variable PATH
```sh
export PATH=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
```

Debemos prestar especial atención a esta variable si estamos utilizando herramientas como [Homebrew](http://codehero.co/como-lo-hago-instalar-homebrew/). Debido a que el orden en el que aparecen las distintas rutas en esta variable determina el orden en el que el sistema busca los enlaces simbólicos de los comandos a ejecutar.

###Variable plugins
```sh
plugins=(complemento1 complemento2 complemento3)
```
Aquí se especifican los complementos que se desean utilizar, estos ofrecen muchas ventajas de terminación automática que son de gran ayuda al usar comandos complejos con muchos argumentos. Puedes acceder [aquí](https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins) para una lista de varios de los complementos disponibles en oh-my-zsh y su breve explicación.

Entre ellos se encuentran:

* git
* brew
* ruby
* django
* rails
* y muchos más…
***
##¿Ahora qué?
Puedes experimentar con algunos temas y complementos, probemos por ejemplo, el tema ***af-magic***.

Naveguemos a un directorio que sea un repositorio de git para observar las ayudas visuales, por ejemplo, el directorio de oh-my-zsh (si, es un directorio de Git, si no te diste cuenta mira el primer paso del método manual de instalación):

![screenGit](http://i.imgur.com/oS4Gnhv.png)

Podemos notar que el tema nos muestra la rama de git en la que se encuentra actualmente el usuario. Adicionalmente el asterisco amarillo nos indica que hay cambios que no han sido registrados, probablemente al ponerme a jugar con los archivos internos de oh-my-zsh ;).

Por su parte, el complemento ***git***, entre otras cosas, nos ofrece muchos alias que pueden ser de ayuda, [aquí puedes encontrar algunos.](http://jasonm23.github.io/oh-my-git-aliases.html)

¡Esto es sólo una pequeña muestra de lo que es posible!
***
##Conclusión
Experimentando con los temas y los complementos que ofrece oh-my-zsh podemos notar que el manejo del terminal se hace más sencillo, cómodo y agradable. Mientras más tiempo emplees bajo el terminal te darás cuenta que es una herramienta que te puede ayudar de muchas maneras, no dudes en probarla con los complementos que se puedan adaptar a las tareas que realizas a menudo. Hasta la próxima edición.
