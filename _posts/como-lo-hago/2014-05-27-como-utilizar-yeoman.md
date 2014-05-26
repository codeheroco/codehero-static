---
layout: post
status: publish
title: Cómo utilizar Yeoman
author: Jonathan Wiesel
author_login: jonathan
description: Automatizar el proceso de desarrollo de una aplicación web hoy en día es una necesidad vital, veamos como hacer con Yeoman.
dificultad: Aprendiz
duracion: 20
thumbnail: http://i.imgur.com/rgExTZU.png
categories:
- Cómo lo hago
- yeoman
tags:
- howto
- como lo hago
- yeoman
- scaffold
- esqueleto
- bower
- grunt
- generador
---
Cuando ya tienes cierto tiempo desarrollando el mismo tipo de aplicación es muy probable que te empieces a dar cuenta que al iniciar
con el desarrollo debes repetir una serie de pasos para cada uno de tus proyectos con el fin de construir el esqueleto o estructura de
tu aplicación. Si todavía lo haces a mano y programas para la web, es hora de introducirte al mundo de Yeoman.

***

## ¿Qué es Yeoman?

Como es de costumbre aquí en CODEHERO, tratamos dentro de lo posible llevarles herramientas de calidad en el ambito *open source*, y
Yeoman [no es la excepción](https://github.com/yeoman/yeoman). El propósito principal de esta herramienta es la agilización del proceso
del inicio del desarrollo, esto mediante la construcción de un esqueleto bastante completo para el tipo de aplicación web que estés haciendo,
este procedimiento también es conocido como *scaffolding*.

Yeoman de por sí es la combinación de 3 herramientas que en conjunto logran este cometido. Dos de ellas ya las hemos conocido antes:

* [Bower:](http://codehero.co/como-utilizar-bower-parte-i/) para el manejo de dependencias

* [Grunt:](http://codehero.co/como-utilizar-gruntjs/) para la previsualización, ejecución de pruebas y construcción de la aplicación.

Y por último:

* **Yo:** para construir el esqueleto de la aplicación dependiendo de su tipo.

Es por ello que podemos notar como grandes soluciones del mundo *open source* juegan juntas para facilitar el desarrollo y lograr software
mantenible y de calidad en el menor tiempo posible.

***

## Generadores

Claro, seguro te estabas preguntando:

> ¿Cómo sabe Yeoman qué tipo de aplicación debe construir?

Una pregunta tan importante ciertamente posee una respuesta muy sencilla y a la vez impresionante. Yeoman utiliza lo que se le denomina
generadores. Un generador es una rutina escrita para construir un esqueleto en particular.

Existen unos 20 [generadores oficiales](http://yeoman.io/official-generators.html) mantenidos por el equipo de Yeoman, entre ellos
el más utilizado suele ser el generador de aplicaciones basadas en Angular. O también la llamada `webapp` la cual construye un esqueleto
genérico para una aplicación web convencional.

Adicionalmente existen actualmente [más de 700 generadores mantenidos por la comunidad](http://yeoman.io/community-generators.html) teniendo
desde [Wordpress](http://wordpress.com/), [Jekyll](http://jekyllrb.com/), [MEAN](http://mean.io/) y mucho más.

Podrás ver que empezar desde cero ya no es necesario debido a que existen generadores para casi cualquier tipo de aplicación web que estés
desarrollando. En caso de que lo desees también puedes crear tu propio generador para que puedas partir de una base personalizada a tu gusto;
sin embargo esto no lo tocaremos en esta entrada.

***

## Instalación

Para utilizar Yeoman necesitaremos primero tener instalado:

* Node.js v0.10.x o mayor.
* npm v1.3.7 o mayor.

> Para mayor información sobre Node.js puedes [ver esta entrada.](http://codehero.co/nodejs-y-express-instalacion-e-iniciacion/)

Ahora solo debemos instalar el módulo principal de Yeoman globalmente:

```sh
$ npm install -g yo
```

> Si no tienes instalado Grunt y Bower, este proceso lo instalará automáticamente por ti.

Fácil ¿no?.

### Instalar generador

Antes de proceder a crear nuestro esqueleto debemos instalar un generador, para tratar de confundirnos lo menos posible tocando temas
que nunca hemos hablado, utilizaremos el generador genérico de aplicaciones web. Para lograrlo primero debemos ejecutar el comando `yo`:

```sh
$ yo
[?] What would you like to do? (Use arrow keys)
❯ Install a generator
  Find some help
  Get me out of here!
```

Si elegimos que queremos instalar un generador, se nos preguntará que especifiquemos una palabra clave para buscarlo en npm:

```sh
[?] What would you like to do? Install a generator
[?] Search NPM for generators: webapp
[?] Here's what I found. Install one?
  generator-sails
  generator-simplewebapp
  generator-ttwebapp
❯ generator-webapp
  generator-webapp-assemble
  generator-webapp-bfytw
  generator-webapp-fintan
(Move up and down to reveal more choices)
```

Esto instalará el generador de manera global.

En caso de que te sepas el nombre del generador de antemano también puedes instalarlo directamente:

```sh
$ npm install -g generator-webapp
```

***

## Armar esqueleto *(scaffold)*

Ahora que tenemos nuestro ambiente preparado ya podemos comenzar a armar nuestra aplicación.

```sh
$ mkdir aplicacion_web
$ cd aplicacion_web
aplicacion_web$ yo
[?] What would you like to do? (Use arrow keys)
❯ Run the Webapp generator (0.4.9)
  Update your generators
  Install a generator
  Find some help
  Get me out of here!
```

Podemos ver que ahora tenemos una nueva opción en nuestro *helper* de Yeoman.

> Esto es equivalente a ejecutar directamente `yo webapp`.

Si seguimos con el proceso veremos algo como esto:

```sh
[?] What would you like to do? Run the Webapp generator (0.4.9)

Make sure you're in the directory you want to scaffold into.
This generator can also be run with: yo webapp

     _-----_
    |       |
    |--(o)--|   .--------------------------.
   `---------´  |    Welcome to Yeoman,    |
    ( _´U`_ )   |   ladies and gentlemen!  |
    /___A___\   '__________________________'
     |  ~  |
   __'.___.'__
 ´   `  |° ´ Y `

Out of the box I include HTML5 Boilerplate, jQuery, and a Gruntfile.js to build your app.
[?] What more would you like? Bootstrap
   create Gruntfile.js
   create package.json
   create .gitignore
   create .gitattributes
   create bower.json
   create .jshintrc
   create .editorconfig
   create app/favicon.ico
   create app/404.html
   create app/robots.txt
   create app/.htaccess
   create app/styles/main.css
   create app/index.html
   create app/scripts/main.js


I'm all done. Running bower install & npm install for you to install the required dependencies. If this fails, try running the command yourself.


npm WARN package.json aplicacion-web@0.0.0 No description
npm WARN package.json aplicacion-web@0.0.0 No repository field.
npm WARN package.json aplicacion-web@0.0.0 No README data
npm http GET https://registry.npmjs.org/grunt-bower-install
npm http GET https://registry.npmjs.org/grunt-autoprefixer
npm http GET https://registry.npmjs.org/grunt-mocha
...
...
```

El generador nos hizo saber que ya incluía algunas cosas y nos preguntó si deseamos algo más de lo que ofrece, en nuestro caso escogimos
incluir Bootstrap.

Veremos que Yeoman luego procede a crear los archivos y la estructura que considera necesarios según el generador que utilizamos, luego
procede a descargar todas las dependencias de back-end y front-end para lo que ha construido. Vemos las dependencias que han sido instaladas
echando un vistazo al `package.json` y al `bower.json`:

```sh
$ cat package.json

{
  "name": "aplicacion-web",
  "version": "0.0.0",
  "dependencies": {},
  "devDependencies": {
    "grunt": "~0.4.1",
    "grunt-contrib-copy": "~0.5.0",
    "grunt-contrib-concat": "~0.3.0",
    "grunt-contrib-uglify": "~0.4.0",
    "grunt-contrib-jshint": "~0.9.2",
    "grunt-contrib-cssmin": "~0.9.0",
    "grunt-contrib-connect": "~0.7.1",
    "grunt-contrib-clean": "~0.5.0",
    "grunt-contrib-htmlmin": "~0.2.0",
    "grunt-bower-install": "~1.4.0",
    "grunt-contrib-imagemin": "~0.6.0",
    "grunt-contrib-watch": "~0.6.1",
    "grunt-rev": "~0.1.0",
    "grunt-autoprefixer": "~0.7.2",
    "grunt-usemin": "~2.1.0",
    "grunt-mocha": "~0.4.10",
    "grunt-newer": "~0.7.0",
    "grunt-svgmin": "~0.4.0",
    "grunt-concurrent": "~0.5.0",
    "load-grunt-tasks": "~0.4.0",
    "time-grunt": "~0.3.1",
    "jshint-stylish": "~0.1.5"
  },
  "engines": {
    "node": ">=0.10.0"
  }
}
```

```sh
$ cat bower.json

{
  "name": "aplicacion-web",
  "private": true,
  "dependencies": {
    "bootstrap": "~3.0.3",
    "jquery": "~1.11.0"
  },
  "devDependencies": {}
}
```

Debido a que este generador se basa en la creación del esqueleto del front-end podremos ver que no tenemos ninguna dependencia general
en nuestro `package.json`. Entre las dependencias de desarrollo veremos varias relacionadas con Grunt, est debido a que el generador a
creado varias rutinas para ayudarnos mientras estemos construyendo nuestra aplicación.

En cuanto a dependencias de front-end, encontraremos jQuery que el mismo generador nos advirtió que tendría, y Bootstrap que elegimos
incluir.

Veamos algo de la estructura que ha creado al generador:

```sh
aplicacion_web
├── Gruntfile.js
├── app
│   ├── 404.html
│   ├── favicon.ico
│   ├── images
│   ├── index.html
│   ├── robots.txt
│   ├── scripts
│   │   └── main.js
│   └── styles
│       └── main.css
├── bower.json
├── bower_components
│   ├── bootstrap
│   └── jquery
├── node_modules
│   ├── grunt
│   ├── grunt-autoprefixer
│   ├── grunt-bower-install
│   ├── grunt-concurrent
│   ├── grunt-contrib-clean
│   ├── grunt-contrib-concat
│   ├── grunt-contrib-connect
│   ├── grunt-contrib-copy
│   ├── grunt-contrib-cssmin
│   ├── grunt-contrib-htmlmin
│   ├── grunt-contrib-imagemin
│   ├── grunt-contrib-jshint
│   ├── grunt-contrib-uglify
│   ├── grunt-contrib-watch
│   ├── grunt-mocha
│   ├── grunt-newer
│   ├── grunt-rev
│   ├── grunt-svgmin
│   ├── grunt-usemin
│   ├── jshint-stylish
│   ├── load-grunt-tasks
│   └── time-grunt
├── package.json
└── test
    ├── bower.json
    ├── bower_components
    │   ├── chai
    │   └── mocha
    ├── index.html
    └── spec
        └── test.js
```

En el `Gruntfile.js` veremos varias rutinas ya generadas que nos permitirán ejecutar diferentes tareas útiles para tu flujo de trabajo.

En el directorio `test/` podremos notar que se creó el esqueleto de una *suite* de pruebas basadas en [Mocha](http://visionmedia.github.io/mocha/).

En los directorios `node_modules/` y `bower_components/` tenemos las dependencias de back-end y front-end respectivamente de nuestro proyecto.

Y finalmente en el directorio `app/` veremos los archivos principales de nuestra aplicación web, debido a que este generador es de una
aplicación web genérica notaremos que esta sección es muy simple.

> Algunos generadores poseen funcionalidades especiales que permiten crear partes de la aplicación por partes, es decir, con un simple
comando puedes crear un modelo, un controlador, etc. Para más información sobre esto puedes visitar [la sección de generadores del generador
oficial de Angular](https://github.com/yeoman/generator-angular#generators) mantenida por el equipo de Yeoman.

***

## Ejecución

Ahora que tenemos nuestro esqueleto probemos a ver como ha quedado.

Para ello podemos utilizar una rutina de Grunt que ha sido creada para nosotros:

```sh
$ grunt serve
```

Automáticamente seremos dirigidos a la página donde se encuentra servida nuestra nueva aplicación web.

![demo-yeoman](http://i.imgur.com/3QcSytC.png)

***

## Conclusión

Hemos visto lo fácil y útil que es utilizar una herramienta como Yeoman, puedes ver que en menos de 1 minuto puedes tener un esqueleto
sumamente completo para tu aplicación web. Recuerda que aquí hemos solo rasgado la superficie, ponte a experimentar con los generadores
que cumplan con tus necesidades y observa el avance que puedes obtener en poco tiempo.
