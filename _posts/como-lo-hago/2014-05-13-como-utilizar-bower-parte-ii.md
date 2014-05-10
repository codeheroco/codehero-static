---
layout: post
status: publish
title: Cómo utilizar Bower - Parte II
author: Jonathan Wiesel
author_login: jonathan
description: Luego de ver inicialmente las ventajas y facilidades que nos ofrece Bower, es hora de profundizar un poco.
dificultad: Intermedio
duracion: 20
github: https://github.com/codeheroco/prueba-bower
thumbnail: http://i.imgur.com/4yuTURb.png
categories:
- Cómo lo hago
tags:
- como lo hago
- howto
- bower
- front-end
- json
- cache
- manejador
- paquetes
- node
- npm
- web
---
En la [entrada pasada](http://codehero.co/como-utilizar-bower-parte-i/) aprendimos la funcionalidad básica de Bower, aprendimos
sobre parte de la rutina de gestión de un desarrollador web usando esta herramienta; ciertamente la funcionalidad de Bower no llega
hasta ahí, por ello decidimos extendernos un poco a hablar de algunos otros comandos útiles cuando se utiliza esta herramienta además
de otros aspectos y truquillos que nos pueden facilitar aún más nuestro trabajo.
***

## Manifiesto

Este archivo denominado como el manifiesto de nuestro paquete, o mejor conocido como `bower.json`, contiene información vital
como nombre, versión, dependencias, etc. Podemos verlo como algo muy parecido al `package.json` de node.js.

> Para ver más sobre el `package.json` visita [esta entrada](http://codehero.co/node-js-y-express-package-json/).

Supongamos que acabamos de construir un paquete de front-end llamado `codehero`. Probemos crearle su `bower.json`, para ello solo bastará
ejecutar el siguiente comando, este nos preguntará los datos básicos necesarios para construir el archivo:

```sh
$ bower init

[?] name: codehero
[?] version: 0.0.0
[?] description: Librería que hace mágia
[?] main file: magic.js
[?] what types of modules does this package expose? globals
[?] keywords: codehero, magia, pixie-powder
[?] authors: Jonathan Wiesel <jonathan@codehero.co>
[?] license: MIT
[?] homepage: codehero.co
[?] set currently installed components as dependencies? Yes
[?] add commonly ignored files to ignore list? Yes
[?] would you like to mark this package as private which prevents it from being accidentally published to the registry? No

{
  name: 'codehero',
  version: '0.0.0',
  authors: [
    'Jonathan Wiesel <jonathan@codehero.co>'
  ],
  description: 'Librería que hace mágia',
  main: 'magic.js',
  moduleType: [
    'globals'
  ],
  keywords: [
    'codehero',
    'magia',
    'pixie-dust'
  ],
  license: 'MIT',
  homepage: 'codehero.co',
  ignore: [
    '**/.*',
    'node_modules',
    'bower_components',
    'test',
    'tests'
  ],
  dependencies: {
    jquery: '~2.1.1'
  }
}

[?] Looks good? Yes
```

Detallemos un poco las características no tan obvias de este archivo:

* `version`

Aunque parezca fácil y sin importancia la definición del número de versión, se debe guardar extremo cuidado cada vez que se actualiza
la aplicación e incrementar este número, ya que sin quererlo puedes romperles las aplicaciones a aquellos que usan tu librería si no
sigues el estándar de versionamieto semántico.

> Más información sobre versionamiento semántico [en la página oficial](http://semver.org/).

* `main`

En esta propiedad se especifican los archivos principales del paquete, esto con la intención de que Bower considere semánticamente
estos archivos como un componente al empaquetar.

* `moduleType`

Se especifica el tipo de paquete que estás desarrollando, tales como módulos de Node.js, ES6, YUI, AMD o globales.

* `ignore`

Los archivos y directorios que no quieres que se consideren para empaquetar.

* `dependencies`

Y evidentemente otros paquetes de lo cuales depende el tuyo.

* `private`

En caso que decidiéramos poner el paquete privado para nunca publicarlo en el registro de paquetes de Bower, esta propiedad existiría
con valor `true`.

* `devDependencies`

Al igual que las dependencias comunes, esta propiedad nos permite especificar algunas otras que solo nos son necesarias cuando estamos
desarrollando, tales como librerías de pruebas.

***

## Registrar paquetes

Suponiendo que tenemos nuestro paquete listo podríamos publicarlos al registro de Bower para hacerlo accesible a todos.

Teniendo ya nuestro `bower.json` solo basta tener nuestro paquete en un repositorio público de Git.

Se debe considerar que cada versión del paquete debe tener un **tag** o etiqueta en el repositorio con el numero de la versión, ya que
de esta manera es que Bower puede buscar las versiones.

> Si quieres ver más sobre etiquetas en Git visita [esta entrada](http://codehero.co/git-desde-cero-manejo-remoto-y-etiquetas/).

Finalmente bastaría con ejecutar:

```sh
$ bower register <nombre_del_paquete> <url_del_repositorio_git>
```

**No pruebes registrar un paquete si no lo deseas ya que por el momento no existe manera de eliminar un paquete del registro, la única
manera es [poniendose en contacto con los desarrolladores](https://github.com/bower/bower/issues/120)**

***

## Actualización de paquetes

En la entrada pasada vimos que como nuestra aplicación no tenía un archivo `bower.json`, actualizar los paquetes requería instalar
manualmente la última versión.

¡Probemos ahora la manera que debe ser!

Como la última vez instalamos la última versión de bootstrap de manera manual, probemos bajarla para ver como la actualizamos utilizando
este nuevo método:

```sh
$ bower install bootstrap#2.3.2
$ bower list
bower check-new     Checking for new versions of the project dependencies..
prueba-bower#0.0.1 /Volumes/Storage/jonathanwiesel/Git/prueba-bower
└─┬ bootstrap#2.3.2 (latest is 3.1.1)
  └── jquery#2.0.3 (latest is 2.1.1)
```

Ahora creemos nuestro `bower.json` para nuestra aplicación de la misma manera de antes. Notaremos que la sección de dependencias luce
algo así:

```json
dependencies: {
	bootstrap: '2.3.2'
}
```

Si queremos siempre utilizar una versión mínima pero permitir la actualización automática podemos modificar el valor de esta propiedad
indicándole que queremos cualquiera mayor o igual a esta:

```json
dependencies: {
	bootstrap: '>=2.3.2'
}
```

O incluso si quisiéramos nada más actualizar a aquellas versiones muy cercanas a esta, es decir, versiones ***patch*** que representan
el 3er digito podríamos poner:

```json
dependencies: {
	bootstrap: '~2.3.2'
}
```

Luego bastará ejecutar:

```sh
$ bower update

bower cached        git://github.com/twbs/bootstrap.git#3.1.1
bower validate      3.1.1 against git://github.com/twbs/bootstrap.git#>=2.3.2
bower cached        git://github.com/jquery/jquery.git#2.1.1
bower validate      2.1.1 against git://github.com/jquery/jquery.git#>= 1.9.0
bower install       bootstrap#3.1.1
bower install       jquery#2.1.1

bootstrap#3.1.1 bower_components/bootstrap
└── jquery#2.1.1

jquery#2.1.1 bower_components/jquery
```

Y veremos como nuestros paquetes han sido actualizados basándose en las reglas de versionamiento especificadas para cada dependencia en el
`bower.json`:

```sh
$ bower list
bower check-new     Checking for new versions of the project dependencies..
prueba-bower#0.0.1 /Volumes/Storage/jonathanwiesel/Git/prueba-bower
└─┬ bootstrap#3.1.1
  └── jquery#2.1.1
```

***

## Cache

Leyendo la salida de los comandos podrás notar que muchas veces dice algo de `cache`, esto significa que como estas versiones de estos
paquetes ya las hemos descargado antes, las mismas son almacenadas en el cache de Bower, esto con la intención de evitar descargar el
paquete si se necesita en el futuro, cosa que hemos hecho ya varias veces y todas estas no se han demorado nada.

Podemos ver el contenido del cache con el comando:

```sh
$ bower cache list

bootstrap=git://github.com/twbs/bootstrap.git#2.3.2
bootstrap=git://github.com/twbs/bootstrap.git#3.1.1
jquery=git://github.com/jquery/jquery.git#2.0.3
jquery=git://github.com/jquery/jquery.git#2.1.0
jquery=git://github.com/jquery/jquery.git#2.1.1
```

Si quisieramos limpiar este cache lo podríamos hacer con:

```sh
$ bower cache clean
```

***

## Configuración

Es posible configurar algunos aspectos de Bower. Para ello se debe crear un archivo llamado `.bowerrc` preferiblemente en el directorio
principal de tu usuario.

Este contendrá un JSON con las propiedades de configuración.

El más común suele ser:

* `directory`

Permite especificar el directorio donde se alojarán los paquetes instalados por Bower, hemos visto que por defecto los paquetes se instalan
en el directorio `bower_component`, supongamos que quisiéramos cambiar esto a un directorio llamado `paquetes`, en nuestro `.bowerrc` colocaríamos
lo siguiente:

```json
{
	"directory": "paquetes"
}
```

También puedes implementar tu registro propio de Bower, tan solo debes configurar los parámetros de `registry` en este archivo.

> Para más información sobre los parámetros de configuración visita la sección de configuración del [Bower spec](https://docs.google.com/document/d/1APq7oA9tNao1UYWyOm8dKqlRP2blVkROYLZ2fLIjtWc/edit#heading=h.4pzytc1f9j8k)

***

Ahora que conocemos Bower mucho mejor ya podemos ponernos a trabajar más cómodamente en nuestros proyectos web. Siempre este tipo de
herramientas nos facilitarán el trabajo siempre y cuando las utilicemos de la manera correcta.

¿Haces otras cosas con Bower o consideras que el flujo de trabajo debería ser distinto? Cuentanos lo que piensas en los comentarios.
