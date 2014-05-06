---
layout: post
status: publish
published: true
title: Estructura del proyecto.
author: Ricardo Sampayo
author_login: ricardo
author_email: ricardo9588@gmail.com
author_url: http://www.ricardosampayo.com
date: 2013-07-10 00:01:25.000000000 -04:30
serie: Ruby on Rails desde Cero
dificultad: Novato
duracion: 20
description: Curso Ruby on Rails desde cero Estructura de proyecto y configuración de la base de datos en MySQL.
categories:
- Cursos
- Ruby on Rails
tags:
- Ruby
- Ruby on Rails
- desde cero
- estructura
- proyecto
---
<p>Las series de cursos Ruby on Rails en CodeHero buscan otorgarte los conocimientos necesarios, para que puedas desarrollar tus propias aplicaciones Web. En el capítulo anterior aprendimos cómo instalar y construir nuestra primera aplicación en Ruby on Rails.</p>

<p>En este nuevo capítulo aprenderemos un poco más sobre la estructura de una aplicación en Rails y configurar nuestra base de datos.</p>

<hr />

<h2>Estructura del proyecto.</h2>

<p>Como observamos en el capítulo anterior crear un proyecto en Rails es bastante fácil, basta con una línea de comando en el terminal y éste crea toda la estructura para empezar a desarrollar nuestra aplicación web.</p>

<p>Esta estructura consta de una serie de carpetas y archivos que nos hacen trabajar de forma ordenada y eficiente. La estructura es la siguiente:</p>

```sh
tree -L 2
.
├── Gemfile
├── Gemfile.lock
├── README.md
├── README.rdoc
├── Rakefile
├── app
│   ├── assets
│   ├── controllers
│   ├── helpers
│   ├── mailers
│   ├── models
│   ├── serializers
│   └── views
├── bin
│   ├── bundle
│   ├── rails
│   └── rake
├── config
│   ├── application.rb
│   ├── boot.rb
│   ├── database.yml
│   ├── environment.rb
│   ├── environments
│   ├── initializers
│   ├── locales
│   └── routes.rb
├── config.ru
├── db
│   ├── migrate
│   ├── schema.rb
│   └── seeds.rb
├── lib
│   ├── assets
│   └── tasks
├── log
│   └── development.log
├── public
│   ├── 404.html
│   ├── 422.html
│   ├── 500.html
│   ├── codehero.png
│   ├── favicon.ico
│   └── robots.txt
├── test
│   ├── controllers
│   ├── fixtures
│   ├── helpers
│   ├── integration
│   ├── mailers
│   ├── models
│   └── test_helper.rb
└── vendor
    └── assets

29 directories, 24 files
```

<p>Esta estructura la iremos conociendo más a detalle a lo largo del curso, pero me gustaría destacar algunos archivos importantes:</p>

<ul>
<li><strong>Gemlife</strong>: Este archivo guardan las gemas requeridas para la aplicación. Ejemplo: gem 'sqlite3'</li>
<li><strong>Rakefile</strong>: Estas son las tareas relacionadas con el comando <em>rake</em>.</li>
<li><strong>routes.rb</strong>: En este archivo se configuran las rotas del sistema.</li>
<li><strong>database.yml</strong>: se guarda los datos de acceso a base de datos. Rails te permite configurar tres ambientes de base de datos diferentes: el de desarrollador, el de pruebas y finalmente el de producción.</li>
</ul>

<h2>Base de datos.</h2>

Como todo en Ruby on Rails la configuración de la base de datos es bastante simple sólo tenemos que adaptar el archivo `database.yml` para que este se conecte al manejador de base de datos que estemos usando.

<blockquote>
  <p>La base de datos que vamos a estar usando en nuestro proyecto va a ser <strong>MySQL</strong>, pero Rails soporta varios tipos como por ejemplo <strong>Postgres</strong>, <strong>SqlLite3</strong>, <strong>MongoDB</strong>, entre otras.</p>
</blockquote>

<p>Lo primero que debemos hacer para configurar una base de datos MySQL es instalar MySQL con la siguiente línea de comando.</p>

```sh
$ brew install mysql
```

<p>Luego agregamos la siguiente línea en el archivo Gemlife para comunicarle al framework que vamos a utilizar MySQL.</p>

```sh
$ gem 'mysql2'
```

<p>Corremos el siguiente comando en el terminal, ubicados en el directorio de la aplicación, para que Rails revise las gemas necesarias, y si no las tienen en el sistema las instale automáticamente.</p>

```sh
$ bundle install
```

Por último creamos las bases de datos a utilizar y modificamos el archivo `database.yml` de la siguiente manera:

```yaml
development:
  adapter: mysql2
  encoding: utf8
  database: codehero_development
  username: root
  password: root
  host: 127.0.0.1
  port: 3306

test:
  adapter: mysql2
  encoding: utf8
  database: codehero_test
  username: root
  password: root
  host: 127.0.0.1
  port: 3306

production:
  adapter: mysql2
  encoding: utf8
  database: codehero_production
  username: root
  password: root
  host: 127.0.0.1
  port: 3306
```

<p>Rails es capaz de manejar las tres base de datos dependiendo del ambiente de trabajo al que se este haciendo referencia (desarrollado, pruebas y producción).</p>

<hr />

<h2>Controladores</h2>

<p>Los Controladores en Rails tienen como propósito mantener separada la lógica de negocios de la aplicación (modelos) de las vistas. Los controladores son los que reciben peticiones, las procesan y muestran la información en un formato legible para los usuarios en las vistas.</p>



<p>En Rails crear un Controlador es bastante fácil, lo podemos hacer con una simple línea de comando que crea los archivos dentro de la estructura antes mencionada. Para demostrarlo crearemos un controlador sencillo, con la siguiente línea de comando en el directorio de la aplicación:</p>

```sh
$ rails generate controller bienvenida index
```

<p>Con esta línea estamos pidiendo al framework crear un controlador llamado 'bienvenida' y el método <em>índex</em> de éste. Cabe destacar que luego pueden incluirse los métodos que se necesiten agregándolos directamente al archivo del controlador y creando vistas a mano sin necesidad de utilizar una línea de comando. A continuación pueden ver el resultado de la línea de comando:</p>

```sh
create  app/controllers/bienvenida_controller.rb
       route  get "bienvenida/index"
      invoke  erb
      create    app/views/bienvenida
      create    app/views/bienvenida/index.html.erb
      invoke  test_unit
      create    test/controllers/bienvenida_controller_test.rb
      invoke  helper
      create    app/helpers/bienvenida_helper.rb
      invoke    test_unit
      create      test/helpers/bienvenida_helper_test.rb
      invoke  assets
      invoke    coffee
      create      app/assets/javascripts/bienvenida.js.coffee
      invoke    scss
      create      app/assets/stylesheets/bienvenida.css.scss
```

Lo más importante de todo lo que crea esta línea de comando en el terminal es sin duda el archivo `app/controllers/bienvenida_controller.rb` que es el controlador en sí y las vistas asociadas a éste, en este caso es una sola `app/views/bienvenida/index.html.erb`. Si todo les funcionó correctamente pueden revisar su obra en [http://127.0.0.1:3000/bienvenida/index](http://localhost:3000/bienvenida/index)

```sh
$ curl --request GET http://localhost:3000/bienvenida/index

<!DOCTYPE html>
<html>
<head>
  <title>CodeheroWeb</title>
  <meta content="authenticity_token" name="csrf-param" />
  <meta content="mRVyOtFnRfq4nFPFJHD+GzVw/Z/nWnno6BI2yEZNzgQ=" name="csrf-token" />
</head>
<body>
  <h1>Bienvenida#index</h1>
  <p>Find me in app/views/bienvenida/index.html.erb</p>
</body>
</html>
```

<hr />

<h2>Modelos</h2>

<p>Los modelos en Rails al igual que en los otros framework MVC son aquellos en donde se mantiene toda la lógica de negocios de nuestra aplicación web. Los modelos desarrollan la información importante de la aplicación móvil, como los accesos a datos (Railes dispone de un O/R-Mapper que mapa la la base de datos con la aplicación web permitiendo su fácil gestión), validaciones o clases y métodos de importancia para el sistema.</p>

<blockquote>
  <p>Los modelos de Rails utilizan un nombre singular, y sus correspondientes tablas de la base utilizan un nombre plural.</p>
</blockquote>

<p>Para crear un modelo en Rails al igual que los controladores, el framework nos proporciona una línea de comando que nos hace fácil el trabajo, siempre podemos elegir hacerlo manualmente. La línea de comando es la siguiente:</p>

```sh
$ rails generate model usuario nombre:string apellido:string fecha_nacimiento:datetime
```

<p>El resultado al ejecutar esta línea de comando es el siguiente:</p>

```sh
invoke  active_record
      create    db/migrate/20130707222645_create_usuarios.rb
      create    app/models/usuario.rb
      invoke    test_unit
      create      test/models/usuario_test.rb
      create      test/fixtures/usuarios.yml
```

<p>Al ejecutar la línea de comando le estamos pidiendo a Rails que genere el modelo necesario para manejar una tabla en base de datos llamada '<em>usuario</em>' con tres campos (nombre, apellido y fecha_nacimiento). Estos atributos se agregan automáticamente a la tabla de usuario en la base de datos y se asigna al modelo correspondiente.</p>

Como pueden observar se crea un archivo dentro del directorio `db/migrate/`, en capítulos posteriores hablaremos más de la base de datos pero a grandes rasgos este archivo es la declaración de la tabla de donde se basa Rails para mapearla.

<hr />

<h2>Conclusión.</h2>

<p>En esta lección conocimos un poco más la estructura de un proyecto en Rails, modificamos el archivo de configuración para acceder a una base de datos MySQL, creamos nuestro primer controlador. El próximo capítulo estará dedicado por completo a la interacción del modelo-vista-controlador con la base de datos. Siéntanse libres en consultar cualquier duda a través de los comentarios.</p>

<p>¡Hasta el próximo capítulo!</p>
