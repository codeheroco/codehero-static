---
layout: post
status: publish
title: Línea de Comandos Parte 2
author: Alberto Grespan
author_login: albertogg
description: Capítulo número 21 de la serie de Rails desde Cero donde ampliamos un poco más sobre el comando de línea de comandos rake y mostramos tareas.
dificultad: Aprendiz
duracion: 35
serie: Ruby on Rails desde Cero
categories:
- Cursos
- Ruby on Rails desde Cero
tags:
- comandos
- cli
- rake
- linea de comandos
---

Las series de cursos Ruby on Rails en CodeHero buscan otorgarte los conocimientos necesarios, para que puedas desarrollar tus propias aplicaciones Web. En el capítulo anterior aprendimos como se generan los controladores para la aplicación, que representan los métodos en nuestros controladores y cómo se leen parámetros ya sean en el URL o enviados por POST dentro de un formulario.

En este nuevo capítulo aprenderemos un poco más sobre el comando rake y algunos sub-comandos del mismo.

## Comando Rake

A lo largo de la serie hemos venido utilizando varios comandos de Rake, aquí ampliaremos un poco más las posibilidades que existen con este comando. Daremos tips de los comandos más utilizados y posiblmes argumentos.

### Rake tasks

El comando `rake -T` o `rake --tasks` sirve para listar todas los posibles tareas (tasks) dentro de cualquier proyecto que contenga un `Rakefile` en Ruby. Rails contiene muchísimas tareas y podemos agregar aún más tareas de ser necesario directamente en la carpeta `lib/tasks` creando un archivo con extensión `.rake`.

```bash
$ bin/rake --tasks
rake about                              # List versions of all Rails frameworks and the environment
rake assets:clean[keep]                 # Remove old compiled assets
rake assets:clobber                     # Remove compiled assets
rake assets:environment                 # Load asset compile environment
rake assets:precompile                  # Compile all the assets named in config.assets.precompile
rake cache_digests:dependencies         # Lookup first-level dependencies for TEMPLATE (like messages/show or comme...
rake cache_digests:nested_dependencies  # Lookup nested dependencies for TEMPLATE (like messages/show or comments/_...
rake db:create                          # Creates the database from DATABASE_URL or config/database.yml for the cur...
rake db:drop                            # Drops the database from DATABASE_URL or config/database.yml for the curre...
rake db:fixtures:load                   # Load fixtures into the current environment's database
rake db:migrate                         # Migrate the database (options: VERSION=x, VERBOSE=false, SCOPE=blog)
rake db:migrate:status                  # Display status of migrations
rake db:rollback                        # Rolls the schema back to the previous version (specify steps w/ STEP=n)
rake db:schema:cache:clear              # Clear a db/schema_cache.dump file
rake db:schema:cache:dump               # Create a db/schema_cache.dump file
rake db:schema:dump                     # Create a db/schema.rb file that is portable against any DB supported by AR
rake db:schema:load                     # Load a schema.rb file into the database
rake db:seed                            # Load the seed data from db/seeds.rb
rake db:setup                           # Create the database, load the schema, and initialize with the seed data (...
rake db:structure:dump                  # Dump the database structure to db/structure.sql
rake db:version                         # Retrieves the current schema version number
rake doc:app                            # Generate docs for the app -- also available doc:rails, doc:guides (option...
rake log:clear                          # Truncates all *.log files in log/ to zero bytes (specify which logs with ...
rake middleware                         # Prints out your Rack middleware stack
rake notes                              # Enumerate all annotations (use notes:optimize, :fixme, :todo for focus)
rake notes:custom                       # Enumerate a custom annotation, specify with ANNOTATION=CUSTOM
rake rails:template                     # Applies the template supplied by LOCATION=(/path/to/template) or URL
rake rails:update                       # Update configs and some other initially generated files (or use just upda...
rake routes                             # Print out all defined routes in match order, with names
rake secret                             # Generate a cryptographically secure secret key (this is typically used to...
rake spec                               # Run all specs in spec directory (excluding plugin specs)
rake spec:controllers                   # Run the code examples in spec/controllers
rake spec:helpers                       # Run the code examples in spec/helpers
rake spec:models                        # Run the code examples in spec/models
rake spec:requests                      # Run the code examples in spec/requests
rake spec:routing                       # Run the code examples in spec/routing
rake spec:views                         # Run the code examples in spec/views
rake stats                              # Report code statistics (KLOCs, etc) from the application
rake time:zones:all                     # Displays all time zones, also available: time:zones:us, time:zones:local ...
rake tmp:clear                          # Clear session, cache, and socket files from tmp/ (narrow w/ tmp:sessions:...
rake tmp:create                         # Creates tmp directories for sessions, cache, sockets, and pids
```

Lo que ven es la lista de tareas que viene con un proyecto Rails por defecto. Probablemente hemos utilizado muy pocas, más que todo las que tienen que ver con base de datos `db:create`, `db:migrate`. No vamos a revisar absolutamente todas las tareas (tasks) pero si vamos a utilizar unas no muy populares pero ciertamente importantes.

### Rake db:setup

Muchas veces esta tarea se confunde o traspapela con el uso de tres comandos particulares como lo son `rake db:create`, `rake db:migrate` y `rake db:seed`. La diferencia de realizar estos comandos en vez de `rake db:setup` es que este último particularmente se usa en la instalación de la aplicación y no durante el desarrollo, además no corre directamente las migraciones si no que carga todo el esquema de la base de datos del archivo `schema.rb` y eso acelera el proceso instalación de la aplicación y nos ahorra un dolor de cabeza si por mala suerte hay un problema con las migraciones.

```bash
$ bin/rake db:setup
-- enable_extension("plpgsql")
   -> 0.0268s
-- create_table("artists", {:force=>true})
   -> 0.0095s
-- create_table("users", {:force=>true})
   -> 0.0065s
-- initialize_schema_migrations_table()
   -> 0.0247s
```

Podemos ver que el basado en el estado de las tablas existentes del `schema.rb`

```ruby
ActiveRecord::Schema.define(version: 20140623224052) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "artists", force: true do |t|
    t.string   "name"
    t.string   "last_name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "name"
    t.string   "last_name"
    t.string   "email"
    t.datetime "created_at"
    t.datetime "updated_at"
  end
end
```

Un detalle importante es que para poder correr este comando debe existir dicho archivo `schema.rb` el cual se crea la primera vez que realizamos una migración. Por otra parte es importante que este archivo se encuentre dentro del control de versiones.

### Rake routes

Esta tarea presumo que puede ser una de las más utilizadas por todo el mundo, ya que nos permite ver cada una de las rutas de nuestra aplicación incluyendo todos los verbos existentes para cada ruta, métodos que hacen posibles llamarla `new_user` dentro de nuestra aplicación (solo hace falta agregar `_path` o `_url`) y además el controlador/método asociado a dicha ruta.

```bash
$ bin/rake routes
     Prefix Verb   URI Pattern                 Controller#Action
    artists GET    /artists(.:format)          artists#index
            POST   /artists(.:format)          artists#create
 new_artist GET    /artists/new(.:format)      artists#new
edit_artist GET    /artists/:id/edit(.:format) artists#edit
     artist GET    /artists/:id(.:format)      artists#show
            PATCH  /artists/:id(.:format)      artists#update
            PUT    /artists/:id(.:format)      artists#update
            DELETE /artists/:id(.:format)      artists#destroy
      users GET    /users(.:format)            users#index
            POST   /users(.:format)            users#create
   new_user GET    /users/new(.:format)        users#new
  edit_user GET    /users/:id/edit(.:format)   users#edit
       user GET    /users/:id(.:format)        users#show
            PATCH  /users/:id(.:format)        users#update
            PUT    /users/:id(.:format)        users#update
            DELETE /users/:id(.:format)        users#destroy
```

Cabe destacar que el (.:format) es el formato en el que se presentará la respuesta al usuario, `.json`, `.xml` siempre y cuando tengamos el código necesario para esto. Esta información es la generada por dos "scaffold" uno de Usuarios y otro de Artistas.

### Rake assets

Creo que deben estar pensando "ughh, asset pipeline", pero la verdad es que dentro de todo es algo bueno. Que podemos decir de esta tarea... se encarga de compilar y agregar un finger print a los assets de nuestra aplicación para servirlos particularmente en producción. Algo que particularmente siempre se me olvida es compilar los assets para producción cuando quiero hacer pruebas locales de manera de comprobar si todo funciona correctamente. Para esto podemos añadir al comando `rake assets:precompile RAILS_ENV=production` la variable de entorno `RAILS_ENV`. Es algo para tener en cuenta siempre al probar local.

```bash
$ bin/rake assets:precompile
I, [2014-06-25T22:30:06.009855 #9358]  INFO -- : Writing /Users/albertogg/Documents/test_app/public/assets/application-a1b5d290fcbfabc7b4df22caecd286f0.js
I, [2014-06-25T22:30:06.058282 #9358]  INFO -- : Writing /Users/albertogg/Documents/test_app/public/assets/application-26c6913f61ed63095f6848110d6b1236.css
```

Como pueden observar se crearon en la carpeta `public/assets` dos archivos uno de css y otro de js. Ambos archivos tienen un número, ese número es el "finger print" que mencioné anteriormente. Es un número único que cambiará únicamente si agregamos código en algún archivo css o js. También les debo mencionar que dichos dos archivos contienen todo el código css y js concatenado y minificado.

Si queremos borrar todos los assets que hayamos compilado:

```bash
$ bin/rake assets:clobber
I, [2014-06-25T22:36:05.987562 #9645]  INFO -- : Removed /Users/albertogg/Documents/test_app/public/assets
rm -rf /Users/albertogg/Documents/test_app/tmp/cache/assets
```

Si queremos borrar todos los anteriores y dejar los últimos

```bash
$ bin/rake assets:clean RAILS_ENV=production
```

### Rake time:zones:all

Muchas veces nos vemos en la tarea de fijar un Time Zone a nuestra aplicación pero no sabemos cual es y recurrimos a Google. Rails tiene esta tarea que nos ayuda a buscar el Time Zone que queremos.

```bash
$ bin/rake time:zones:all

* UTC -11:00 *
American Samoa
International Date Line West
Midway Island

* UTC -10:00 *
Hawaii

* UTC -09:00 *
Alaska

* UTC -08:00 *
Pacific Time (US & Canada)
Tijuana

* UTC -07:00 *
Arizona
Chihuahua
Mazatlan
Mountain Time (US & Canada)

* UTC -06:00 *
Central America
Central Time (US & Canada)
Guadalajara
Mexico City
Monterrey
Saskatchewan
....
```

Aquí podrémos ver la zona horaria de la ciudad que queremos y aplicarla en la aplicación.

### Rake notes

Imagino que esta tarea prácticamente nadie la utiliza pero a mi particularmente me ha funcionado siempre bastante bien. Si realizas anotaciones de una manera particular en el código de la aplicación podrás posteriormente revisar dichas anotaciones al correr la tarea. Se pueden hacer múltiples anotaciones de la siguiente manera:

En cualquier archivo, sea controlador o modelo (no lo he probado en vistas) podemos agregar anotaciones con los siguientes prefijos: OPTIMIZE, FIXME, TODO.

```ruby
class User < ActiveRecord::Base
  # TODO: Add some shit in this model
end

class Artist < ActiveRecord::Base

  # FIXME: This is a bad bad implementation

  # FUCK: shitty code
end
```

Luego correr el comando:

```bash
$ bin/rake notes
app/models/artist.rb:
  * [3] [FIXME] This is a bad bad implementation

app/models/user.rb:
  * [2] [TODO] Add some shit in this model
```

Apreciamos que se listan correctamente las anotaciones. Muchas veces esto es mejor a tener un ToDo list externo. Podemos ver que lista perfectamente el archivo que contiene la anoación, la línea en la que se encuentra la anotación entre corchetes, que tipo de anotación es y el comentario.

De igual manera podemos agregar prefijos particulares que no sean los antes mencionados. en este caso agregué FUCK, no se porqué, pero bueno. Para listar este basta con utilizaar el siguiente comando:

```bash
$ bin/rake notes:custom ANNOTATION=FUCK
app/models/artist.rb:
  * [5] shitty code
```

### Rake stats

La tarea stats es ciertamente una de las más interesantes, ya que despliega netamente estadísticas acerca las líneas de código contenidas nuestra aplicación. Contabiliza por: Controladores, Modelos, Librerías, Helpers, tests, etc... Además de sumar y darnos una relación entre la cantidad de código de tests y código de funcionalidades.

```bash
$ bin/rake stats
+----------------------+-------+-------+---------+---------+-----+-------+
| Name                 | Lines |   LOC | Classes | Methods | M/C | LOC/M |
+----------------------+-------+-------+---------+---------+-----+-------+
| Controllers          |   153 |   103 |       3 |      18 |   6 |     3 |
| Helpers              |     6 |     6 |       0 |       0 |   0 |     0 |
| Models               |     9 |     4 |       2 |       0 |   0 |     0 |
| Mailers              |     0 |     0 |       0 |       0 |   0 |     0 |
| Javascripts          |    20 |     0 |       0 |       0 |   0 |     0 |
| Libraries            |     0 |     0 |       0 |       0 |   0 |     0 |
| Controller specs     |   318 |   226 |       0 |       0 |   0 |     0 |
| Helper specs         |    30 |     8 |       0 |       0 |   0 |     0 |
| Model specs          |    10 |     8 |       0 |       0 |   0 |     0 |
| Request specs        |    20 |    18 |       0 |       0 |   0 |     0 |
| Routing specs        |    70 |    52 |       0 |       0 |   0 |     0 |
| View specs           |   251 |   207 |       0 |       0 |   0 |     0 |
+----------------------+-------+-------+---------+---------+-----+-------+
| Total                |   887 |   632 |       5 |      18 |   3 |    33 |
+----------------------+-------+-------+---------+---------+-----+-------+
  Code LOC: 113     Test LOC: 519     Code to Test Ratio: 1:4.6
```

Ciertamente es algo muy interesante y muchas veces omitimos estos detalles por no conocer que existen. Muchas personas se jactan de que su relación entre líneas de código y líneas de código en tests es muy alto pero probablemente ustedes no sabían que ellos lo miden utilizando este comando. Ahora ustedes también pueden!

## Conclusión

Con este curso quiero que hagan `rake --tasks` y se pongan a probar todas las tareas (tasks) que no abarcamos, además de las que os mencioné, les aseguro que encontrarán detalles ciertamente interesantes que les ayudaran muchísimo. Para el siguiente episodio muy posiblemente estaremos tocando templates. Siéntanse libres en consultar cualquier duda a través de los comentarios.

¡Hasta el próximo capítulo!
