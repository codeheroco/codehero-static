---
layout: post
status: publish
published: true
title: Acceso a datos con DataMapper
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
wordpress_id: 2902
wordpress_url: http://codehero.co/?p=2902
date: 2014-01-09 00:10:25.000000000 -04:30
serie: Sinatra desde Cero
description: Décimo capítulo de la serie Sinatra desde Cero donde aprendemos a instalar y utilizar de manera muy básica DataMapper para el acceso a base de datos.
categories:
- Cursos
- Sinatra
tags:
- Cursos
- curso
- Sinatra
- DataMapper
---
<p>La serie de Sinatra desde Cero, buscará otorgarte el conocimiento necesario para que puedas desarrollar tus propias aplicaciones Web haciendo uso de esta magnifica herramienta.</p>

<p>En este décimo capítulo veremos como se instala y realiza el acceso a datos utilizando DataMapper como <a href="http://es.wikipedia.org/wiki/Mapeo_objeto-relacional">ORM</a>.</p>

<blockquote>
  <p>Para comprender correctamente todo lo que hablaremos en esta serie, es conveniente tener un conocimiento básico sobre el lenguaje de Ruby. Podrás conseguir toda la información desees <a href="http://codehero.co/category/tutoriales/ruby/">aquí</a></p>
</blockquote>

<hr />

<h2>Acceso a Datos.</h2>

<p>Cuando realizamos aplicaciones web, el acceso a datos (base de datos) es algo necesario para crear una aplicación dinámica. En Sinatra podemos realizar el acceso a datos de muchas maneras pero nosotros explicaremos como se realiza utilizando DataMapper y SQLite para la serie Sinatra desde Cero.</p>

<hr />

<h2>¿Qué es DataMapper?</h2>

<p>DataMapper es una gema que nos provee un API para definir modelos, asociaciones, crear tablas, migraciones, y realizar consultas a la base de datos entre otras cosas. Esta gema no está incluida en Sinatra ni es obligatoria para realizar lo antes descrito, pudiésemos perfectamente utilizar <a href="http://codehero.co/activerecord-parte-1/">ActiveRecord</a> que viene incluida por defecto en el framework de <a href="http://codehero.co/series/ruby-on-rails-desde-cero/">Ruby on Rails</a> en nuestros proyectos de Sinatra, o la gema <a href="https://github.com/jeremyevans/sequel">Sequel</a> para realizar la misma tarea.</p>

<h3>¿Como se instala?</h3>

<p>Para instalar DataMapper tenemos dos opciones:</p>

<ul>
<li>La primera es incluirla en el <em>Gemfile</em>:</li>
</ul>

```ruby
gem 'data_mapper'
```

<p>Y luego correr el comando <code>bundle install</code>.</p>

<ul>
<li>La segunda es instalarla manualmente por la linea de comando:</li>
</ul>

```sh
$ gem install data_mapper
```

<p>Una vez que tengamos instalada la gema debemos instalar la librería de comunicación (adapters) con la base de datos de nuestra preferencia. Pueden ser Mysql, SQLite o Postgres. Nosotros utilizaremos SQLite en este curso, por lo que las instrucciones serán para este. El resto de las librerías de comunicación se pueden ver <a href="http://datamapper.org/getting-started.html">aquí</a>.</p>

<p>Primero debemos instalar SQLite en nuestro equipo.</p>

<p>Para <strong><em>Ubuntu</em></strong> o <strong><em>Debian</em></strong></p>

```sh
$ sudo apt-get install libsqlite3-dev
```

<p>Para <strong><em>OS X</em></strong> mediante <em><a href="http://codehero.co/como-lo-hago-instalar-homebrew/">Hombrew</a></em>.</p>

```sh
$ brew install sqlite
```

<p>Luego de que la tenemos instalada debemos instalar la librería de comunicación entre DataMapper y SQLite:</p>

```sh
$ gem install dm-sqlite-adapter
```

<p>O realizamos lo propio mediante el <em>Gemfile</em>.</p>

<p>Una vez que hayamos completado dichas tareas podremos comenzar a usar DataMapper.</p>

<hr />

<h2>¿Cómo se usa?</h2>

<p>Primero debemos definir la ruta a nuestra base de datos ya sea por una variable de ambiente o en nuestra aplicación directamente. Para este curso vamos a utilizar la consola interactiva de Ruby <code>irb</code>, pero puedes copiar todo esto dentro de un archivo <code>.rb</code> donde funcionará de la misma manera; Luego vamos a realizar un <code>require</code> de DataMapper y definir una base de datos SQLite en memoria.</p>

<p>Abrimos la consola interactiva de Ruby:</p>

```sh
$ irb
```

<blockquote>
  <p>Todos los comandos a partir de este momento se ejecutan dentro de <code>irb</code>.</p>
</blockquote>

```ruby
require 'data_mapper'
DataMapper.setup(:default, 'sqlite::memory:')
```

<p>En este momento podemos efectivamente crear cualquier modelo de base de datos y comenzar a trabajar en el.</p>

<p>Nosotros crearemos un modelo <em>Usuario</em> con los siguientes atributos, <em>id, email, nombre, fecha_de_creacion</em>. Para esto debemos definir una clase que contiene los campos de la base de datos como propiedades en conjunto con su tipo de dato.</p>

```ruby
class User
  include DataMapper::Resource

  property :id, Serial
  property :email, String
  property :nombre, String
  property :created_at, DateTime
end
```

<p>Una vez que tengamos nuestro modelo listo debemos llamar <code>DataMapper.finalize</code> esta llamada nos permite decirle a nuestra aplicación que hemos establecido correctamente la base de datos y ya puede acceder a ella. Esta llamada al API debe realizarse justo antes de empezar a acceder a la data cuando en teoría hemos establecido un modelo de datos "final" o "definitivo". Es a decisión del programador elegir el momento correcto para realizar la llamada a este método.</p>

<p>Luego debemos realizar las famosas sentencias para crear las tablas en la base de datos y DataMapper nos entrega el siguiente comando: <code>DataMapper.auto_migrate!</code> que se encarga de crear la base de datos o realizarle un drop si la misma ya existe y es en este punto cuando la base de datos está creada y lista para ser usada por nosotros.</p>

<p>Vamos a crear 2 usuarios para demostrar que agrega correctamente y luego vamos a realizar un par de <em>queries</em> en la misma.</p>

<p>Vamos a crear un usuario usando el método <em>create</em> y el segundo usuario con el método <em>new</em> y <em>save</em> que vienen siendo lo mismo que el <em>create</em> pero en dos pasos.</p>

```ruby
@user = User.create(email: "alberto@codehero.co", nombre: "alberto", created_at: Time.now)
@user2 = User.new(email: "jonathan@codehero.co", nombre: "jonathan", created_at: Time.now)
@user2.save
```

<p>Ahora pueden probar que los elementos realmente están creados haciendo el siguiente <em>query</em> que retorna todos los usuarios en base de datos:</p>

```ruby
@users = User.all
```

Debería retornar lo siguiente:

```ruby
[#<User @id=1 @email="alberto@codehero.co" @nombre="alberto" @created_at=#<DateTime: 2014-01-08T23:07:39-04:30 ((2456667j,13059s,0n),-16200s,2299161j)>>, #<User @id=2 @email="jonathan@codehero.co" @nombre="jonathan" @created_at=#<DateTime: 2014-01-08T23:07:46-04:30 ((2456667j,13066s,0n),-16200s,2299161j)>>]
```

Si ahora quisiéramos buscar el usuario con `id = 2` debemos realizar el siguiente *query*:

```ruby
@u = User.get(2)
```

Debería retornar:

```ruby
<User @id=2 @email="jonathan@codehero.co" @nombre="jonathan" @created_at=#<DateTime: 2014-01-08T23:12:37-04:30 ((2456667j,13357s,0n),-16200s,2299161j)>>
```

<p>Cómo pueden observar por lo que hemos realizado hasta los momentos, DataMapper es bastante sencillo de utilizar y muy práctico para casi cualquier tarea.</p>

<p>Por último existe una opción de DataMapper que nos permite actualizar nuestro modelo de base de datos automáticamente. Esto nos permite agregar nuevo campo o columna a nuestra base de datos sin modificar las actuales <code>DataMapper.auto_upgrade!</code>.</p>

<hr />

<h2>Conclusión</h2>

<p>En este décimo capítulo, hemos visto de manera muy básica y usando SQLite como se usa la gema DataMapper para crear un modelo, agregarle información y posteriormente consultarla. Aún no hemos visto como unir esto con Sinatra, pero lo haremos en los próximos capítulos. Si te surge algún tipo de duda no te detengas y déjanos un comentario, que gustosamente lo responderemos.</p>

<p>¡Hasta el próximo capítulo!</p>
