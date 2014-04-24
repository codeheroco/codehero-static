---
layout: post
status: publish
title: Cómo utilizar Bower - Parte I
author: Jonathan Wiesel
author_login: jonathan
date: 2014-04-22
description: En el día a día del desarrollo web es común la necesidad de buscar y descargar librerías para nuestro front-end, por ello esta semana aprenderemos Bower.
dificultad: Aprendiz
duracion: 15
github: https://github.com/codeheroco/prueba-bower
thumbnail: http://i.imgur.com/4yuTURb.png
categories:
- Cómo lo hago
tags:
- como lo hago
- howto
- bootstrap
- bower
- front-end
- jade
- jquery
- manejador
- paquetes
- node
- npm
- web
---
En el día a día del desarrollo web es común encontrarse con la necesidad de buscar y descargar librerías para lograr que nuestro *front-end* sea capaz de realizar todo lo que a nuestra imaginación se le antoje; sin embargo, esa tarea de ir a Google y buscar la página del paquete, descargar la versión correcta e importarla a nuestro proyecto para poder usarlo es completamente retrógrada, por ello esta semana aprenderemos a usar Bower.
***
## ¿Qué es Bower?

Si tan solo buscamos cualquier definición encontraremos que Bower se lo considera como un manejador de paquetes para la web, es decir, cualquier librería de código abierto que puedas necesitar para el desarrollo de tu *front-end* lo podrás gestionar con Bower.

Es probable que es este concepto te parezca familiar si has leído sobre [npm](http://codehero.co/nodejs-y-express-instalacion-e-iniciacion/) antes, podríamos decir que el concepto y funcionamiento es bastante similar.

### Entonces ¿cual es la diferencia con npm?

Aunque algunos utilizan npm para el manejo de sus paquetes y librería en el *front-end* esta práctica no es completamente acertada debido a que npm está enfocado principalmente a la gestión de módulos.

Bower está enfocado y optimizado para el *front-end* por lo que el manejo del árbol de dependencias es plano, en lugar de anidado como npm, esto evita problemas de versionamiento de las librerías además de una cantidad innecesaria de dependencias por versión.
***
## Instalación

Debido a que Bower depende directamente de npm, y por consiguiente de Node.js, deberemos instalar estos primero, ya se de manera [manual](http://codehero.co/nodejs-y-express-instalacion-e-iniciacion/), o por [Homebrew](http://codehero.co/como-lo-hago-instalar-homebrew/).

Posteriormente solo debemos instalar Bower de manera global:

```sh
$ npm install -g bower
```

Fácil ¿no?.
***
## Preparación

Tomando como base la sencilla aplicación en el repositorio de esta entrada, veremos que es tan sólo un pequeño servidor con una página de `Hola Mundo`:

```jade
doctype html
html
	head
		title= titulo
	body
		.jumbotron
			p #{texto}
```

Lo cual en HTML sería algo como esto:

```html
<!DOCTYPE html>
<html>
	<head>
		<title>titulo</title>
	</head>
	<body>
		<div class="jumbotron">
			<p>texto</p>
		</div>
	</body>
</html>
```

> Si quieres saber más de Jade visita [esta entrada](http://codehero.co/node-y-express-jade-js/).

Vemos que tenemos la clase `jumbotron` de Twitter Bootstrap que por el momento no hace ningún efecto porque no tenemos nada de esta librería.

![Hola Mundo](http://i.imgur.com/AJYr5Ep.png)

> Para ejecutar la aplicación debemos ejecutar `npm install` y `node app.js` en el directorio del proyecto.

Veamos como solucionarlo con Bower.
***

## Buscar paquetes

Sabemos que queremos Twitter Bootstrap pero debemos encontrar el nombre del paquete, para ello ejecutaremos en el terminal:

```sh
$ bower search bootstrap
Search results:

    bootstrap git://github.com/twbs/bootstrap.git
    angular-bootstrap git://github.com/angular-ui/bootstrap-bower.git
    sass-bootstrap git://github.com/jlong/sass-bootstrap.git
    bootstrap-sass git://github.com/jlong/sass-twitter-bootstrap
    bootstrap-datepicker git://github.com/eternicode/bootstrap-datepicker.git
    bootstrap-select git://github.com/silviomoreto/bootstrap-select.git
    bootstrap-timepicker git://github.com/jdewit/bootstrap-timepicker
    angular-ui-bootstrap git://github.com/angular-ui/bootstrap.git
    angular-ui-bootstrap-bower git://github.com/angular-ui/bootstrap-bower
    bootstrap.css git://github.com/bowerjs/bootstrap.git
    ...
```

Veremos varios paquetes que contienen la palabra Bootstrap, esto se debe a la gran popularidad de esta librería. Si la haz utilizado antes podrás identificarlo por su repositorio de Github y sabrás que el paquete que estamos buscando es el primero de la lista.
***

## Información de paquetes

Veamos un poco de información sobre él:

```sh
$ bower info bootstrap
bower bootstrap#*           not-cached git://github.com/twbs/bootstrap.git#*
bower bootstrap#*              resolve git://github.com/twbs/bootstrap.git#*
bower bootstrap#*             download https://github.com/twbs/bootstrap/archive/v3.1.1.tar.gz
bower bootstrap#*              extract archive.tar.gz
bower bootstrap#*             resolved git://github.com/twbs/bootstrap.git#3.1.1

{
  name: 'bootstrap',
  version: '3.1.1',
  main: [
    './dist/css/bootstrap.css',
    './dist/js/bootstrap.js',
    './dist/fonts/glyphicons-halflings-regular.eot',
    './dist/fonts/glyphicons-halflings-regular.svg',
    './dist/fonts/glyphicons-halflings-regular.ttf',
    './dist/fonts/glyphicons-halflings-regular.woff'
  ],
  ignore: [
    '**/.*',
    '_config.yml',
    'CNAME',
    'composer.json',
    'CONTRIBUTING.md',
    'docs',
    'js/tests'
  ],
  dependencies: {
    jquery: '>= 1.9.0'
  },
  homepage: 'https://github.com/twbs/bootstrap'
}

Available versions:
  - 3.1.1
  - 3.1.0
  - 3.0.3
  - 3.0.2
  - 3.0.1
  - 3.0.0
  - 3.0.0-rc1
  - 3.0.0-rc.2
  - 2.3.2
  - 2.3.1
  - 2.3.0
  - 2.2.2
  - 2.2.1
  - 2.2.0
  - 2.1.1
  - 2.1.0
  - 2.0.4
  - 2.0.3
  - 2.0.2
  - 2.0.1
  - 2.0.0
  - 1.4.0
  - 1.3.0
  - 1.2.0
  - 1.1.1
  - 1.1.0
  - 1.0.0
```

Podremos ver varios datos importantes de esta librería como:

* Datos del repositorio y fuente de descarga.
* Archivos principales que incluye.
* Dependencias.
* Versiones disponibles.


{% include middle-post-ad.html %}

***

## Instalación de paquetes

Digamos que queremos instalar Bootstrap pero no estamos listos para la versión 3:

```sh
$ bower install bootstrap#2.3.2
...
...
bower bootstrap#2.3.2          install bootstrap#2.3.2
bower jquery#>=1.8.0 <2.1.0    install jquery#2.0.3

bootstrap#2.3.2 bower_components/bootstrap
└── jquery#2.0.3

jquery#2.0.3 bower_components/jquery
```

> Si quisiéramos instalar la última versión obviaríamos el `#2.3.2`

Notaremos que aparte de instalar Bootstrap, Bower ha instalado también jQuery, pero te preguntarás:

### ¿Por qué la versión 2.0.3?

Si vemos las dependencias de esa versión de Bootstrap:

```sh
$ bower info bootstrap#2.3.2
...
dependencies: {
    jquery: '>=1.8.0 <2.1.0'
  },
...
```

Veremos que Bower instaló la versión mas reciente de jQuery que cumple con las exigencias de esa versión en particular.
***

## Listar paquetes instalados

Echemos un vistazo a los paquetes que tenemos ahora:

```sh
$ bower list
bower check-new     Checking for new versions of the project dependencies..
prueba-bower /Volumes/Storage/jonathanwiesel/Git/prueba-bower
└─┬ bootstrap#2.3.2 extraneous (latest is 3.1.1)
  └── jquery#2.0.3 (latest is 2.1.1-rc1)
```

Podemos notar un árbol de dependencias convencional pero si vemos el contenido del directorio `bower_component` veremos algo así:

```sh
bower_components
├── bootstrap
│   ├── docs
│   ├── img
│   ├── js
│   └── less
└── jquery
    ├── build
    ├── speed
    ├── src
    └── test
```

Podrás notar que, como mencionamos inicialmente, el árbol físico de dependencias es plano, es decir, jQuery no está contenido dentro de Bootstrap lo cual tendería a traer complicaciones si existiera otra librería que también dependiera de jQuery.

***

## Actualizar paquetes (sin `bower.json`)

Jmmmm, ¿saben qué?. Me siento confiado para Bootstrap 3, mejor vamos a lanzarnos con todo de una vez:

```sh
$ bower update
```

**¿Qué paso, no se actualizaron mi paquetes?**

Debido a que aun no tenemos un `bower.json` que indique algún parámetro de versionamiento, Bower simplemente nos ignora. Esto lo veremos más adelante.

Para este caso deberemos instalar directamente la última versión de esta manera:

```sh
$ bower install bootstrap

bower bootstrap#*               cached git://github.com/twbs/bootstrap.git#3.1.1
bower bootstrap#*             validate 3.1.1 against git://github.com/twbs/bootstrap.git#*
bower jquery#>= 1.9.0           cached git://github.com/jquery/jquery.git#2.1.0
bower jquery#>= 1.9.0         validate 2.1.0 against git://github.com/jquery/jquery.git#>= 1.9.0

Unable to find a suitable version for bootstrap, please choose one:
    1) bootstrap#2.3.2 which resolved to 2.3.2
    2) bootstrap#~3.1.1 which resolved to 3.1.1

Prefix the choice with ! to persist it to bower.json

[?] Answer: 2
bower bootstrap#~3.1.1         install bootstrap#3.1.1

bootstrap#3.1.1 bower_components/bootstrap
└── jquery#2.0.3
```

Veremos que sólo la versión de Bootstrap se ha actualizado ya que la versión de jQuery que teníamos sigue cumpliendo con las exigencias de dependencias que debe ser mayor o igual a las 1.9.0, esto para evitar una incompatibilidad por actualizar dependencias sin control.
***

## Demo

Ahora que tenemos nuestra librería de Bootstrap, solo debemos agregar las etiquetas necesarias a la página para importar Bootstrap, su dependencia jQuery y la hoja de estilo de Bootstrap:

```jade
doctype html
html
	head
		title= titulo
		link(rel='stylesheet', href='/bootstrap/dist/css/bootstrap.min.css')
		script(src='/bootstrap/dist/js/bootstrap.min.js')
		script(src='/jquery/jquery.min.js')
	body
		.jumbotron
			p #{texto}
```

> La línea `app.use(express.static(__dirname + '/bower_components'));` que tenemos en nuestro `app.js` establece que el directorio `/bower_components` es de recursos estáticos y por ello podemos acceder a su contenido directamente en nuestras vistas.

Y veremos nuestra página ahora con el estilo de Twitter Bootstrap 3:

![Hola Mundo con Bootstrap](http://i.imgur.com/Pac97H7.png)

***
## Conclusión

Hemos visto solo algunas cosas básicas que son posibles con Bower, en la segunda parte veremos un poco más de funcionalidad y algunos aspectos más avanzados para que puedas manejar de manera óptima tus recursos para el *front-end*. Por el momento has podido ver lo sencilla y útil que es la gestión con esta herramienta, nos vemos en la próxima.
