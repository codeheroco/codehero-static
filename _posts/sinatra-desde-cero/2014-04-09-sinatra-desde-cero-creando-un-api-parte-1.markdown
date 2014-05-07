---
layout: post
status: publish
published: true
title: Creando un API Parte I
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
date: 2014-04-09 23:06:08.000000000 -04:30
serie: Sinatra desde Cero
dificultad: Avanzado
duracion: 30
github: https://github.com/albertogg/sinatra-url-shortener-api
description: Treceavo capítulo de la serie Sinatra desde Cero donde enseñamos como se hace un pequeño API para acortar URLs y usamos ActiveRecord para su almacenamiento.
categories:
- Cursos
- Sinatra
tags:
- Sinatra
- API
- curl
- Estructura
- Archivos
- Rack
---
La serie de Sinatra desde Cero, buscará otorgarte el conocimiento necesario para que puedas desarrollar tus propias aplicaciones Web haciendo uso de esta magnifica herramienta.

En este treceavo capítulo comenzaremos la etapa final de nuestra serie de Sinatra desde Cero y realizaremos un API con la finalidad de demostrar y unificar una gran parte lo que hemos visto a lo largo de esta serie y otras cosas que son importantes conocer.

> Para comprender correctamente todo lo que hablaremos en esta serie, es conveniente tener un conocimiento básico sobre el lenguaje de Ruby. Podrás conseguir toda la información desees [aquí][1]

La información para este artículo la sacamos de la recopilación de información del libro [Sinatra: Up and Running][4] y de la [Documentación oficial](http://www.sinatrarb.com/intro.html)

* * *

## ¿Qué queremos lograr?

En estos últimos capítulos de la serie Sinatra desde Cero, queremos que aprendas como se puede utilizar Sinatra para hacer un pequeño API que en este caso servirá para acortar URLs con un dominio personalizado. También queremos enseñarte a utilizar Sinatra con ActiveRecord que nos facilitará el acceso a datos y por último a estructurar un proyecto así sea pequeño de una manera modular sencilla para que puedas reutilizar componentes.

La funcionalidad que queremos alcanzar es la siguiente:

```sh
$ curl -i -X POST -H "Accept: application/json" -d '{"links": [{"uri": "http://codehero.co"}, {"uri": "http://something.com"}]}' "http://localhost:3000/"
HTTP/1.1 201 Created
Content-Type: application/json;charset=utf-8
Location: http://localhost:3000/?ids=5,6
Content-Length: 169
X-Content-Type-Options: nosniff
Server: WEBrick/1.3.1 (Ruby/2.0.0/2014-02-24)
Date: Sat, 05 Apr 2014 04:38:50 GMT
Connection: Keep-Alive

{"links":[{"id":5,"uri":"http://codehero.co","href":"http://localhost:3000/66bjj"},{"id":6,"uri":"http://something.com","href":"http://localhost:3000/l4gt7"}]}
```

Si enviamos un arreglo JSON de "links" sea uno (1), dos (2) o N que nos devuelva otro objeto JSON los dichos links reducidos dentro de un dominio personal (ver clave: "href"), además que podamos realizar peticiones de tipo GET para uno o más links podamos obtener respuestas:

```sh
$ curl --request GET -i http://localhost:3000/?ids=1,5
HTTP/1.1 200 OK
Content-Type: application/json;charset=utf-8
Content-Length: 174
X-Content-Type-Options: nosniff
Server: WEBrick/1.3.1 (Ruby/2.0.0/2014-02-24)
Date: Sat, 05 Apr 2014 04:40:59 GMT
Connection: Keep-Alive

{"links":[{"id":1,"uri":"http://albertogrespan.com","href":"http://localhost:3000/inerr"},{"id":5,"uri":"http://codehero.co","href":"http://localhost:3000/66bjj"}]}
```

De igual manera cuando alguien envíe una petición GET para uno de los URLs generados podamos devolver la respuesta en otro JSON con la dirección "original":

```sh
$ curl --request GET -i http://localhost:3000/66bjj
HTTP/1.1 200 OK
Content-Type: application/json;charset=utf-8
Content-Length: 40
X-Content-Type-Options: nosniff
Server: WEBrick/1.3.1 (Ruby/2.0.0/2014-02-24)
Date: Sat, 05 Apr 2014 04:30:38 GMT
Connection: Keep-Alive

{"links":[{"id":5,"uri":"http://codehero.co"}]}
```

Estas no son las únicas peticiones pero es lo esencial que queremos demostrar!

### ¿Por qué ActiveRecord?

Bueno, he escogido este ORM porque existe una gran cantidad de información en internet sobre como utilizarlo y sobre posibles soluciones a problemas además es utilizado por Rails y nosotros en nuestra serie de [Ruby on Rails desde Cero](http://codehero.co/series/ruby-on-rails-desde-cero/) tenemos múltiples capítulos explicando gran parte de su funcionalidad cosa que beneficia a los lectores a entender lo que realizarémos en estos últimos capítulos.

## ¿Estructura del proyecto?

Para este proyecto utilizaremos la siguiente estructura:

```sh
$ tree .
.
├── Gemfile
├── Gemfile.lock
├── Procfile
├── README.md
├── Rakefile
├── app
│   ├── models
│   │   └── link.rb
│   └── routes
│       ├── base.rb
│       └── links.rb
├── app.rb
├── config.ru
├── db
│   ├── migrate
│   │   ├── 20140331052044_create_links.rb
│   │   └── 20140403223637_remove_column_viewed_from_links_table.rb
│   ├── schema.rb
│   ├── seeds.rb
│   └── shortened_development.sqlite3
└── lib
    └── core_ext
        └── string.rb

7 directories, 16 files
```

Aquí podemos observar lo siguiente:

- Aplicación principal `app.rb` encargada de la configuración y es el punto de partida de la aplicación.
- El `config.ru` que nos convierte la aplicación en un Rack Application y nos facilita el uso del comando `rackup` para correr la aplicación.
- El directorio `lib` contiene una librerías personalizadas para nuestra aplicación. En nuestro caso solo tenemos una librería.
- El directorio `db` contiene las migraciónes, el esquema y los seeds referentes a la base de datos.
- Directorio `app` contiene las rutas y modelos de nuestra aplicación, en teoría aquí se encuentra toda la lógica de nuestra aplicación.
- Archivo `Rakefile` nos permite ejecutar instrucciones como en un archivo `make` pero con sintaxis Ruby. En nuestro caso particular estas tareas están relacionadas con la base de datos.
- Archivo `Gemfile` y `Procfile`. El primero reúne todas las "gemas", librerías o dependencias externas de nuestro proyecto y el segundo es el archivo que contiene el comando para arrancar la aplicación, cabe destacar que para usar el `Procfile` es necesario tener instaladas las "gemas" existentes en el `Gemfile`.

## Gems Utilizados

Para poder conocer un poco más sobre el proyecto debemos revisar que "gemas" estamos utilizando y explicaré para que utilizamos cada una de ellas.



```sh
$ cat Gemfile
source 'https://rubygems.org'

ruby '2.0.0'

gem 'sinatra', '~> 1.4'
gem 'sinatra-contrib', '~> 1.4'
gem 'foreman', '~> 0.63'
gem 'activerecord', '~> 4.0'
gem 'sinatra-activerecord', '~> 1.6'
gem 'sqlite3'
gem 'rake'
gem 'json'
```

Por lo que podemos observar la versión de Ruby requerida para poder correr este proyecto es la `2.0.0` sin importar el número de parche, cualquier versión por arriba o por debajo será rechazada. Luego tenemos la lista de gems:

- `sinatra`: Creo que no debo explicar porque utilizamos esta.
- `sinatra-contrib`: Nos proporciona un conjunto de extensiones comunes y ciertamente bastante utilizadas para Sinatra, nosotros utilizamos particularmente `sintra/reloader` para no tener que reiniciar el serviddor manualemnte con cada cambio que hagamos.
- `foreman`: Nos permite utilizar el archivo `Procfile` para arrancar el servidor y el archivo `.env` con variables de ambiente del proyecto.
- `activerecord`: manejo de base de datos y mapeo de objetos.
- `sinatra-activerecord`: Librería importante que nos facilita la conexión con activerecord en Sinatra y nos proporcionas las tareas de base de datos que utilizamos dentro del `Rakefile`.
- `sqlite3`: Driver para poder conectarnos con SQLite.
- `rake`: Dependencia necesaria para poder utilizar el archivo `Rakefile` con tareas para poder ejecutar tareas con la base de datos.
- `json`: Pieza fundamental de nuestro API ya que todo es manejado en objetos JSON, así que sin ella no funcionaría nada.

## Conociendo los primeros archivos

Comencemos a ver que contienen unos de los archivos del proyecto. Esta semana explicaremos lo que se encuentra dentro del `Procfile`, `.env`, `Rakefile` y `config.ru`.

Observemos primero el `Procfile`:

```sh
$ cat Procfile
web: bundle exec rackup -p 3000 -E $RACK_ENV
```

Dentro de este archivo encontramos que existe un proceso que se llama `web` que corre el comando `bundle exec rackup` en el puerto `3000`, además lee y espefíca una variable de ambiente llamada `$RACK_ENV`.

Luego tenemos el segundo archivo llamado `.env` un archivo oculto que es utilizado para almacenar variables de ambiente y no tener que exportar (`export`) cualquier cantidad de variables en nuestro ordenador.

El mismo contiene lo siguiente:

```sh
$ cat .env
RACK_ENV=development
```

Declaramos la variable `RACK_ENV` y especificamos que será ambiente de desarrollo (`development`).

Luego en nuestra lista llegamos a el archivo `Rakefile`:

```sh
$ cat Rakefile
require 'sinatra/activerecord/rake'
require './app'
```

El mismo contiene 2 líneas haciendo `require` de un archivo dentro de la gema o librería `sinatra-activerecord` y sobre nuesra aplicación `app.rb`. Esto permite que al escribir `bundle exec rake -T` podamos ver un montón de tareas disponibles relacionadas a la base de datos de la misma manera que las tenemos en Rails.

Por últmo tenemos el archivo `config.ru`:

```sh
$ cat config.ru
require './app'

run Shortened::App
```

El cual nos permite declarar nuestra aplicación tipo Rack Application tal cual como lo habiamos visto en capítulos anteriores.

* * *

## Conclusión

En este treceavo capítulo de la serie, hemos visto y llegamos a definir lo que haremos para la conclusión de la serie de Sinatra desde Cero. Particularmente en este observamos que vamos a hacer, cuál es la estructura de nuestro proyecto y empezamos a contemplar los primeros archivos que componen dicho proyecto. Si te surge algún tipo de duda no te detengas y déjanos un comentario, que gustosamente lo responderemos.

¡Hasta el próximo capítulo!

 [1]: http://codehero.co/category/tutoriales/ruby/
 [2]: http://es.wikipedia.org/wiki/Hypertext_Transfer_Protocol
 [3]: http://codehero.com
 [4]: http://shop.oreilly.com/product/0636920019664.do?sortby=publicationDate
