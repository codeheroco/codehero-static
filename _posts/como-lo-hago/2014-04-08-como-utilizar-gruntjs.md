---
layout: post
status: publish
title: Cómo utilizar Grunt.js
author: Jonathan Wiesel
author_login: jonathan
date: 2014-04-08
description: Ejecutar tareas repetitivas no tiene que ser agobiante para el desarrollador, herramientas como Grunt.js hacen que la ejecución de ellas sea un paseo.
dificultad: Intermedio
duracion: 15
github: https://github.com/codeheroco/prueba-grunt
thumbnail: http://i.imgur.com/P53B38t.png
categories:
- Cómo lo hago
tags:
- como lo hago
- howto
- grunt
- gruntjs
- compilar
- ejecutor
- tareas
- pruebas
- minificar
- npm
---

Una vez dominamos un lenguaje y adoptamos una manera de trabajar en particular te darás cuenta que varias tareas que realizas pueden ser automatizadas para optimizar tu flujo de trabajo. Por ello esta semana aprenderemos a ejecutar tareas con Grunt.

***

## ¿Qué es Grunt?

Grunt (o grunt.js), es un corredor o ejecutor de tareas de [código abierto](https://github.com/gruntjs/grunt) para el lenguaje Javascript. Esta es digamos la definición formal de la herramienta, pero de seguro te suena un poco ambigua debido a una simple pregunta:

> **¿Qué tareas puede ejecutar Grunt?**

¡Esa es la pregunta correcta! La respuesta es quizás tan abierta como impresionante, Grunt puede ejecutar casi cualquier tarea que puedas definir de manera programada, incluso gran parte de las tareas comunes conforman ahora la comunidad de [plugins](http://gruntjs.com/plugins) de grunt, entre ellos podrás encontrar minificadores y compresores de código, convertidores de un lenguaje a otro (como SASS a CSS), ejecución de pruebas, validadores, rutinas de conexión a servidores, instalación de dependencias especiales, y mucho más.

Es una herramienta muy utilizada en el desarrollo de aplicaciones web, ya que existen muchas tareas predefinidas y repetitivas que un desarrollador debe llevar a cabo para lograr optimizar el software y convertirlo en una pieza de calidad que siga los estándares de la web con el menor esfuerzo posible.

Sin duda lo más común (o incluso lo menos esperado) ya está desarrollado por algún miembro de la comunidad; sin embargo si ninguno cumple con una necesidad particular que puedas tener siempre puedes desarrollar tu propia tarea y hasta la puedes publicar en [npm](http://npmjs.org/) para que los demás hagan uso de ella.

***

## Instalación

La dependencia principal de Grunt es Node.js, por ello debemos tenerlo instalado antes de comenzar.

> Puedes dirigirte a la [primera entrada de la serie de Node.js](http://codehero.co/nodejs-y-express-instalacion-e-iniciacion/) para esto.

Luego debemos instalar globalmente la interfaz de linea de comandos de Grunt:

```sh
$ npm install -g grunt-cli
```

Digamos que esto no instala el ejecutor de tareas como tal (ya que este se instala como un módulo más al incluirlo como una dependencia en el `package.json` de tu proyecto), sino una interfaz que permite ejecutar la versión correcta de Grunt dependiendo del proyecto en el que esté.

> Si quieres saber más sobre el `package.json` de Node.js te recomendamos leer [esta entrada.](http://codehero.co/node-js-y-express-package-json/)

Ahora te surgirá la pregunta:

**¿Cómo sabe Grunt qué debe hacer o cómo comportarse?**

La respuesta yace en un archivo de configuración especifico de Grunt que definirá las tareas particulares para el proyecto en cuestión, este archivo se denomina **Gruntfile.**

***

## Gruntfile

Este archivo escrito en Javascript (o CoffeeScript) le indica a Grunt qué tareas puede ejecutar sobre el proyecto y como ejecutarlas.

Inicialmente un Gruntfile tiene una estructura bastante sencilla:

```js
module.exports = function(grunt) {
	grunt.initConfig({
		propiedadExterna: ...,
		tarea: {
			options: {
				// opciones especificas de tarea que sobreescribirán las por defecto.
			},
			destino: {
				options: {
					// opciones especificas de destino que sobreescribirán las de la tarea.
				},
				propiedad1: ...,
				propiedad2: ...
			}
		}
	});

	grunt.loadNpmTasks('...');
   	grunt.registerTask('default', ['tarea']);
}
```

Viéndolo a gran escala notaremos primero un envoltorio de la configuración lo cual permitirá ejecutar lo que esté dentro cuando ejecutemos el comando `grunt`.

Luego adentrándonos en la configuración veremos atributos como propiedades externas que nos servirán para hacer referencia dentro de las tareas, lo verás con más claridad más adelante.

Veremos la definición de una tarea sobre la cual se puede definir una serie de propiedades de opciones que puedan ser necesaria de especificar según sea el caso.

Cada tarea puede poseer uno o más destinos, los cuales se definirán como las acciones a tomar o ejecutarse para cada tarea. Es posible ejecutar destinos individuales de cada tarea o todos ellos secuencialmente según se necesite. Debido a que muchas de las tareas que ejecuta Grunt suelen involucrar manejo de archivos, este suele ser bastante flexible con la manera en que sus tareas son definidas, esto lo veremos más adelante para no complicar esta sección.

En caso de que estemos utilizando un plugin debemos cargarlo con nuestra penúltima línea, este debe ser un módulo instalado por *npm* que contenga la `tarea`.

Finalmente registramos la tarea para el comando por defecto de *grunt*.

> Esto es el esqueleto de un Gruntfile, está construído de una manera muy general por lo que cuando lo veas más adelante con un caso particular podrás entenderlo mejor.

***

## Demo

Para demostrar el funcionamiento de Grunt tomaron un *script* de nuestra aplicación y lo minificaremos. Esta es quizás la tarea más común para desarrolladores web que quieren optimizar sus aplicaciones.

### Package.json

Primero crearemos un sencillo `package.json` con información como esta:

```js
  "name": "prueba-grunt",
  "version": "0.0.1",
  "description": "Pequeña prueba de Grunt.js",
  "author": "Jonathan Wiesel",
  "license": "MIT",
}
```

Como verás nada especial.

### Script

Ahora supondremos que tenemos nuestro script llamado `prueba-grunt.js`, descargalo [aquí](http://code.jquery.com/jquery-migrate-1.2.1.js).

> Cualquier parecido con jQuery es pura coincidencia ;).

{% include middle-post-ad.html %}

### Grunt y plugin

Ahora debemos instalar el módulo de Grunt y el *plugin* minificador de Javascript. Esto solo está a un `npm install` de distancia:

```sh
$ npm install grunt --save-dev
...
$ npm install grunt-contrib-uglify --save-dev
...
```

La opción que hemos utilizado `--save-dev` indica que el módulo debe ser agregado como una dependencia de desarrollo al `package.json`:

```js
{
  "name": "prueba-grunt",
  "version": "0.0.1",
  "description": "Pequeña prueba de Grunt.js",
  "author": "Jonathan Wiesel",
  "license": "MIT",
  "devDependencies": {
    "grunt": "^0.4.4",
    "grunt-contrib-uglify": "^0.4.0"
  }
}
```

Esto nos permitirá tan solo ejecutar `npm install` cuando queramos volver a instalar estas dependencias en otro ambiente.

### Gruntfile

Ahora procederemos a crear nuestro Gruntfile:

```js
module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			min: {
				src: '<%= pkg.name %>.js',
				dest: '<%= pkg.name %>.min.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['uglify']);
};
```

Si recordamos la estructura básica veremos reflejado lo aprendido.

* El envoltorio o *wrapping* de la configuración.
* Definición de la configuración de Grunt.
* Una propiedad externa (`pkg`).
* Una tarea (`uglify`).
* Un destino dentro de la tarea (`min`).
* Propiedades de ejecución de la acción.
* Cargar un plugin que tenga el código de la tarea.
* Registrar la tarea.

Ahora hablemos de las diferencias.

La propiedad externa `pkg` en este caso almacena el objeto compuesto por la configuración en el `package.json`, esto nos permite acceder a propiedades del mismo, como el autor, con tan solo llamarlo directamente con la notación de punto: `pkg.author`.

Las propiedades de ejecución del destino de minificación, [según la documentación del *plugin*](https://github.com/gruntjs/grunt-contrib-uglify), indican cual es la fuente y el destino del proceso.

Para efectos prácticos se podría utilizar la sintaxis estándar de este *plugin* que sería:

```js
...
min: {
	files: {
		'<%= pkg.name %>.min.js' : '<%= pkg.name %>.js'
	}
}
...
```

Sin embargo para efectos educativos optamos por la más tradicional.

Posteriormente, esos símbolos en las propiedades de ejecución (`<%= %>`), son parte del motor de plantillas de Grunt. Es decir, dentro de los símbolos podemos evaluar valores de variables tal como lo haríamos en otros motores de plantillas como Liquid o Mustache.

En nuestro caso el valor de `pkg.name` se evaluaría a `prueba-grunt`.

Finalmente cargamos las tareas del plugin de minifcación (uglify) y registramos nuestra tarea bajo la sección de tareas por defecto de Grunt.

### Ejecución

Bien, si revisamos nuestro proyecto deberíamos notar una estructura como esta:

```sh
prueba-grunt
├── Gruntfile.js
├── node_modules
│   ├── grunt
│   └── grunt-contrib-uglify
├── package.json
└── prueba-grunt.js
```

Ahora solo debemos ejecutar `grunt`:

```sh
$ grunt
Running "uglify:min" (uglify) task
File prueba-grunt.min.js created: 16.62 kB → 7.07 kB

Done, without errors.
```

Notaremos un nuevo archivo `prueba-grunt.min.js` el cual contiene la versión minificada de nuestro *script*.

> Si hubiésemos registrado nuestra tarea en otra sección diferente en lugar de la `'default'` necesitaríamos ejecutarla utilizando `grunt otra_seccion` esto nos permite modularizar las tareas según diferentes propósitos.

***

## Conclusión

No es sino hasta este momento final que has podido comprobar las grandes ventajas que puede ofrecerte Grunt, ciertamente es una herramienta que puede ayudarte a lo largo de tu flujo de trabajo como desarrollador en múltiples etapas, no te permitas trabajar de más cuando tienes las herramientas que te facilitan el trabajo y te permiten seguir estándares que pueden hacer de tus software una pieza de valor. Grandes compañías como Twitter y Adobe lo usan internamente. No dejes de comentarnos cuales *plugins* te parecen los más útiles o incluso los más ingeniosos.
