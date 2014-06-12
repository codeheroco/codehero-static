---
layout: post
status: publish
title: Línea de Comandos Parte 1
author: Alberto Grespan
author_login: albertogg
description: Capítulo número 20 de la serie de Rails desde Cero donde ampliamos un poco más sobre el comando rails y sus sub-comandos.
dificultad: Aprendiz
duracion: 20
serie: Ruby on Rails desde Cero
categories:
- Cursos
- Ruby on Rails desde Cero
tags:
- comandos
- cli
- rails
- linea de comandos
---

Las series de cursos Ruby on Rails en CodeHero buscan otorgarte los conocimientos necesarios, para que puedas desarrollar tus propias aplicaciones Web. En el capítulo anterior aprendimos como se generan los controladores para la aplicación, que representan los métodos en nuestros controladores y cómo se leen parámetros ya sean en el URL o enviados por POST dentro de un formulario.

En este nuevo capítulo aprenderemos un poco más sobre el comando rails y su gran cantidad de sub-comandos y argumentos.

## Comando Rails

A lo largo de la serie hemos venido utilizando varios comandos de Rails y Rake, aquí ampliaremos un poco más las posibilidades que existen con estos comandos en una serie de capítulos en los que daremos tips de los comandos más utilizados y sus argumentos.

### Rails new

El comando Rails new como ya deben saber lo utilizamos para crear la estructura de nuestra aplicación (una aplicación nueva). Algo que no todos utilizan o consideran necesario es el paso de argumentos que pueden "facilitarnos" varias tareas al iniciar una nueva aplicación tales como:

```bash
$ rails new --database=postgresql -T
```

Este comando si lo vemos por segmentos `--database=postgresql` nos crea un proyecto nuevo con el archivo `database.yml` específico para una base de datos Postgres, installa la gema `pg` (driver) para poderse conectar a dicha base de datos. La bandera `-T` o `--skip-test-unit` la utilizamos si no vamos a realizar ningún tipo de pruebas (tests) dentro de nuestra aplicación o cuando no queremos utilizar la suite de pruebas que incorpora Rails por defecto por que vamos a utilizar RSpec.

Debo recordar que son muchas las opciones de drivers de conexiones de base de datos: mysql, oracle, postgresql, sqlite3 (por defecto), frontbase, ibm_db, sqlserver, jdbcmysql, jdbcsqlite3, jdbcpostgresql, jdbc.

### Rails server

El comando `rails server` que hemos utilizado a lo largo del curso también tiene varios argumentos o parámetros que es posible que no conozcan tales como, daemon, config, port, environment, debugger y pid.

Si empleamos algúnos estos paramétros juntos obtenemos algo como:

```bash
$ rails server -p 3000 -e production -d
```

Aquí el rails utilizará el servidor que tenga instalado, puede ser WEBrick, Puma u otro, escuchará por el puerto 3000, este es el puerto por defecto. También arrancará `-e` en el ambiente de producción así que utilizará la base de datos para ese ambiente y no hay "code reloading" es decir que para que la aplicación tome los cambios de código debemos reiniciar el servidor de Rails. Por último corremos el servidor en modo daemon, para que nos retorne el "prompt" (corre el servidor en background).

Si queremos utilizar el debugger (creo que es algo que la mayoría de las personas usa poco) debemos tener instalada la gema `debugger`. Para esto basta con quitar el comentario de la última línea del Gemfile para luego agregar utilizar `-u` o `--debugger` con el comando `rails server`.

### Rails console

La consola de Rails nos deja interactuar con nuestra aplicación desde una línea de comandos, es decir, es la consola interactiva IRB con nuestro proyecto precargado. Algo muy interesante al usar la consola es que podemos probar "Queries", métodos y toda lo relacionado con nuestra aplicación sin tener que ir a la página web. Cuando utilizamos la consola para hacer un "query" interactuamos directamente con la base de datos y podemos modificar su información si no somos cuidadosos.

```bash
$ rails console -e production --sandbox
```

Cuando llamamos la consola de esta manera estamos diciendo que vamos a utilizar la base de datos de producción y además al utilizar el argumento `--sandbox` nos permite modificar e interactuar en con la base de datos sin tener miedo de cambiar valores de manera definitiva, ya que al salirnos de la consola automaticamente se realiza un "rollback" de los cambios que realizamos.

### Rails generate y destroy

Los generadores de Rails utiliza "templates" para crear archivos y copiar contenido de las librerías o gemas a la aplicación. Gracias a los generadores no tenemos que crear los archivos manúalmente.

Remitiéndonos al caso anterior si queremos instalar RSpec dentro de nuestro proyecto deberíamos utilizar la librería `rspec-rails`, esta librería trae internamente generadores los cuales luego nos permitirán importar ciertos archivos necesarios.

```bash
$ rails generate rspec:install
      create  .rspec
      create  spec
      create  spec/spec_helper.rb
      create  spec/rails_helper.rb
```

En este caso particular no existe manera de destruir lo que acabamos de importar desde la librería. pero si nos vamos a un generador particular de Rails tal como el de un controlador o simplemente un scaffold podemos observar lo siguiente:

```bash
$ rails generate scaffold User name:string last_name:string email:string --stylesheet-engine=sass --javascript-engine=js -p
      invoke  active_record
      create    db/migrate/20140612020902_create_users.rb
      create    app/models/user.rb
      invoke    rspec
      create      spec/models/user_spec.rb
      invoke  resource_route
       route    resources :users
      invoke  scaffold_controller
      create    app/controllers/users_controller.rb
      invoke    haml
      create      app/views/users
      create      app/views/users/index.html.haml
      create      app/views/users/edit.html.haml
      create      app/views/users/show.html.haml
      create      app/views/users/new.html.haml
      create      app/views/users/_form.html.haml
      invoke    rspec
      create      spec/controllers/users_controller_spec.rb
      create      spec/views/users/edit.html.haml_spec.rb
      create      spec/views/users/index.html.haml_spec.rb
      create      spec/views/users/new.html.haml_spec.rb
      create      spec/views/users/show.html.haml_spec.rb
      create      spec/routing/users_routing_spec.rb
      invoke      rspec
      create        spec/requests/users_spec.rb
      invoke    helper
      create      app/helpers/users_helper.rb
      invoke      rspec
      create        spec/helpers/users_helper_spec.rb
      invoke    jbuilder
      create      app/views/users
      create      app/views/users/index.json.jbuilder
      create      app/views/users/show.json.jbuilder
      invoke  assets
      invoke    js
      create      app/assets/javascripts/users.js
      invoke    sass
      create      app/assets/stylesheets/users.css.sass
      invoke  sass
      create    app/assets/stylesheets/scaffolds.css.sass
```

Con este comando podemos ver que la consola imprimió todo lo que creó con el scaffold, a su vez incluye las modificaciones que le agregamos. En este caso como a mi particularmente no me gusta coffeescript y prefiero JavaScript normal agregué el argumento `--javascript-engine=js` el cual cambia el funcionamiento predeterminado de Rails que es generar los archivos para `.coffeescript`. También para efectos de la demostración en vez de usar `.scss` vamos a usar `.sass` en nuestras hojas de estilo con el argumento `--stylesheet-engine=sass`. Lo interesante del comando anterior es que nunca se ejecutó realmente ya que la el argumento `-p` (`--pretend`) que emula el escenario de lo que hará el comando pero no lo ejecuta realmente, esto puede ser muy útil para probar y no dañar nada.

De la misma manera funciona para destruir lo que "acabamos" de generar.

```bash
$ rails destroy scaffold User name:string last_name:string email:string --stylesheet-engine=sass --javascript-engine=js -p
      invoke  active_record
      remove    db/migrate/20140612020928_create_users.rb
      remove    app/models/user.rb
      invoke    rspec
      remove      spec/models/user_spec.rb
      invoke  resource_route
       route    resources :users
      invoke  scaffold_controller
      remove    app/controllers/users_controller.rb
      invoke    haml
      remove      app/views/users
      remove      app/views/users/index.html.haml
      remove      app/views/users/edit.html.haml
      remove      app/views/users/show.html.haml
      remove      app/views/users/new.html.haml
      remove      app/views/users/_form.html.haml
      invoke    rspec
      remove      spec/controllers/users_controller_spec.rb
      remove      spec/views/users/edit.html.haml_spec.rb
      remove      spec/views/users/index.html.haml_spec.rb
      remove      spec/views/users/new.html.haml_spec.rb
      remove      spec/views/users/show.html.haml_spec.rb
      remove      spec/routing/users_routing_spec.rb
      invoke      rspec
      remove        spec/requests/users_spec.rb
      invoke    helper
      remove      app/helpers/users_helper.rb
      invoke      rspec
      remove        spec/helpers/users_helper_spec.rb
      invoke    jbuilder
      remove      app/views/users
      remove      app/views/users/index.json.jbuilder
      remove      app/views/users/show.json.jbuilder
      invoke  assets
      invoke    js
      remove      app/assets/javascripts/users.js
      invoke    sass
      remove      app/assets/stylesheets/users.css.sass
      invoke  sass
```

Si se fijaron con atención en el output de ambos comandos, una vez que incluímos RSpec a la combinación de nuestro proyecto cada vez que utilicemos un generador tipo "scaffold" se crearán los templates para realizar los "tests" con RSpec inmediatamente y no los templates de los tests originales. Para mi, estos son los detalles formidables de rails y de las librerías como `rspec-rails` que incluyen el "autogenerador". Lo mismo ocurre si utilizan `haml-rails` y otras muchas gemas.

Adicional a esto que acabamos de mostrar pueden agregar sus propios "defauls" al archivo `config/application.rb` para que no tengan que estar escribiendo los argumentos con el comando todo el tiempo.

```ruby
config.generators do |g|
  g.template_engine :haml
  g.javascript_engine :js
end¬

config.sass.preferred_syntax = :sass
```

## Conclusión

Con esto quiero que miren y hagan `--help` para ver todos los argumentos de varios comandos, es decir, para el generate del scaffold pueden hacer `rails generate scaffold --help` y ver todos sus argumentos, de igual manera ocurre en el resto de los comandos. En el siguiente capítulo que será continiación de este veremos el comando `rake` con las múltiples tareas que incluye Rails. Siéntanse libres en consultar cualquier duda a través de los comentarios.

¡Hasta el próximo capítulo!
