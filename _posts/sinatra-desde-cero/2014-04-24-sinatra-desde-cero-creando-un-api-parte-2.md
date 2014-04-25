---
layout: post
status: publish
title: Creando un API Parte 2
author: Alberto Grespan
author_login: albertogg
date: 2014-04-24
description: Catorceavo capítulo de la serie Sinatra desde Cero donde enseñamos como se hace un pequeño API para acortar URLs y explicamos más la estructura y archivos.
dificultad: Heroe
duracion: 30
github: https://github.com/albertogg/sinatra-url-shortener-api
serie: Sinatra desde Cero
categories:
- Cursos
- Sinatra desde Cero
tags:
- API
- ActiveRecord
- Lib
- Sinatra
- Ruby
- Estructura
---
La serie de Sinatra desde Cero, buscará otorgarte el conocimiento necesario para que puedas desarrollar tus propias aplicaciones Web haciendo uso de esta magnifica herramienta.

En este catorceavo capítulo nos adentraremos un poco más la etapa final de nuestra serie de Sinatra desde Cero, y profundizaremos más en el tema de nuestro API con la finalidad de unificar una gran parte lo que hemos visto a lo largo de esta serie y otras cosas que son importantes conocer.

> Para comprender correctamente todo lo que hablaremos en esta serie, es conveniente tener un conocimiento básico sobre el lenguaje de Ruby. Podrás conseguir toda la información desees [aquí][1]

La información para este artículo la sacamos de la recopilación de información del libro [Sinatra: Up and Running][4] y de la [Documentación oficial](http://www.sinatrarb.com/intro.html)

* * *

## Conociendo los archivos (continuación)

Retomando la sección de conociendo los archivos vamos a continuar con el corazón de nuestra aplicación.

### El archivo app.rb

```ruby
require 'rubygems'
require 'bundler'

Bundler.require
$: << File.expand_path('../', __FILE__)
$: << File.expand_path('../lib', __FILE__)

require 'dotenv'
Dotenv.load

require 'sinatra/base'
require 'sinatra/reloader' if development? # sinatra-contrib
require 'sinatra/activerecord'

require 'lib/core_ext/string'
require 'app/models/link'
require 'app/routes/base'
require 'app/routes/links'

module Shortened
  class App < Sinatra::Base
    register Sinatra::ActiveRecordExtension

    configure :development do
      register Sinatra::Reloader
    end

    configure do
      set :database, lambda {
        ENV['DATABASE_URL'] ||
          "sqlite3:///db/shortened_#{environment}.sqlite3"
      }
    end

    use Routes::Api::V1::Links
  end
end
```

Lo primero que observamos dentro del archivo `app.rb` es que existen una gran cantidad de `require` y entre los mismos vemos que existen dos líneas similares a esta `$: << File.expand_path('../', __FILE__)`. Ellas nos permiten incluir en nuestro proyecto todas librerías necesarias y además los directorios específicos como el root y el lib.

Luego comenzamos a ver que inclúimos `sinatra/base` para nuestra aplicación modular, `sinatra/reloader` con una condición puntual de inclusión y `sinatra/activerecord` para poder utilizar activerecord en nuestro proyecto. Por último vemos que están incluídos todos los archivos puntuales donde arrojaremos el código para esta aplicación.

Finalizados los `require` comenzamos a observar código familiar. Es el código que hemos utilizado para hacer aplicaciones modulares. El módulo `Shortened` y la clase `App` que hereda de `Sinatra::Base`. La siguiente línea es muy importante y debe ser llamada cuando antes `register Sinatra::ActiveRecordExtension`. Ella registra la extensión de ActiveRecord en toda nuestra aplicación, es por esto que queremos que sea de lo primero que se "registra". Luego vemos que hay 2 bloques de configuración. En el primer bloque colocaremos todas las acciones que queremos que se declaren únicamente en el ambiente de desarrollo ("development") en nuestro caso específico el reloader. En el segundo configuramos la base de datos. Para hacer el asunto más sencillo utilizamos una base de datos sqlite3 que dependiendo del ambiente en que nos encontremos se creará un archivo de extensión `.sqlite3` dentro del directorio `/db` que incluirá el ambiente en el nombre de dicho archivo de base de datos.

Por último usamos las rutas que se encuentran en el directorio `app/routes` que a su vez se encuentra dentro de varios módulos. Routes, API y V1.

Explicado todo lo que contiene el archivo `app.rb` vamos a pasar al directorio `db` para explicar como creamos este directorio y todo lo que contiene.

### Directorio /db

El directorio `db` al igual que en Ruby on Rails contiene todo lo relacionado a la base de datos. Como migraciones, seeds, schema y también, la base de datos sqlite3.

```sh
├── db
│   ├── migrate
│   │   ├── 20140331052044_create_links.rb
│   │   └── 20140403223637_remove_column_viewed_from_links_table.rb
│   ├── schema.rb
│   ├── seeds.rb
│   └── shortened_development.sqlite3
```

{% include middle-post-ad.html %}

Para crear el directorio `db` utilizamos el siguiente comando `bundle exec rake db:create_migration NAME=create_links`. Creamos una migración llamada `create_links` y la misma creó todo el directorio `db`, con exepción del archivo `seeds.rb` el cual fue creado manualmente.

> Deben recordar que para ver los comandos que existen relacionados con estas tareas Rake pueden hacer uso de `bundle exec rake -T`. Para mayor infomación pueden consultar la página de la librería. [sinatra-activerecord](https://github.com/janko-m/sinatra-activerecord)

Dentro de la migracíon creada agregamos los atributos y tipos de datos que queremos que tenga nuestro modelo:

```ruby
class CreateLinks < ActiveRecord::Migration
  def change
    create_table :links do |t|
      t.string  :uri
      t.string  :uri_hash
      t.integer :viewed

      t.timestamps
    end
  end
end
```

Luego pueden ver que creé otra migración, `bundle exec rake db:create_migration NAME=remove_column_viewed_from_links_table` en la cual me arrepentí de uno de los atributos que había colocado anteriormente y lo removí.

```ruby
class RemoveColumnViewedFromLinksTable < ActiveRecord::Migration
  def change
    remove_column :links, :viewed
  end
end
```

Algo importante de las migraciones es que rigen el estado del esquema de base de datos. En pocas palabras el esquema es la descripción de la estructura de nuestras tablas en base de datos. Después de las migraciones el esquema quedó de la siguiente manera:

```ruby
ActiveRecord::Schema.define(version: 20140403223637) do

  create_table "links", force: true do |t|
    t.string   "uri"
    t.string   "uri_hash"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
```

Luego para poder cargar y crear el esquema en nuestra base de datos sqlite utilizamos este comando `bundle exec rake db:setup`. el cual nos permite crear la base de datos si la misma no existe y agregar el esquema a la misma.

Por último fue creado el archivo `seeds.rb` manualmente:

```ruby
Link.create([{
  uri: 'http://albertogrespan.com',
},
{
  uri: 'http://codehero.co',
}])
```

Este archivo nos permite cargar información a la base de datos al momento de hacer `bundle exec rake db:setup`, en este caso agregará estos dos URIs como id 1 y 2 respectivamente. Por lo tanto si ustedes clonan el repositorio en el estado actúal y realizan el setup tendrán estos dos "seeds".

> Recuerden que si crean migraciones nuevas posteriores a esto deben ejecutar `bundle exec rake db:migrate` para que las mismas sean aplicadas en la base de datos.

Por último en este capítulo vamos a ver lo que hay dentro del directorio `/lib`

### Directorio /lib

```sh
└── lib
    └── core_ext
        └── string.rb
```

Dentro de `lib` tenemos otro directorio llamado `core_ext` y dentro de este tenemos el archivo `string.rb`. Se preguntarán por qué he agregado ese directorio `core_ext`, la respuesta es sencilla y es debido a que la funcionalidad que vamos a agregar en el archivo `string.rb` será para ampliar la capacidad funcional de la clase base String de Ruby.

```ruby
class String
  def is_number?
    true if Float(self) rescue false
  end
end
```

Dentro del archivo `string.rb` vemos que estamos utilizando la clase String y dentro hay un método llamado `is_number?` el cual devuelve true siempre que un string se pueda transformar en número, de lo contrario retorna false. Este método lo utilizaremos en la aplicación como tal y lo veremos cuando expliquemos lo que existe en el directorio `/app`, posiblemente en la siguiente entrada.

> Pueden probar dicha clase agregando el código directamente en IRB o PRY y pasandole strings de la siguiente manera `"9234".is_number?` para observar cómo reacciona.

* * *

## Conclusión

En este catorceavo capítulo de la serie, hemos visto y explicamos lo que contiene el corazón de nuestra aplicación y los directorios db y lib. Si te surge algún tipo de duda no te detengas y déjanos un comentario, que gustosamente lo responderemos.

¡Hasta el próximo capítulo!

 [1]: http://codehero.co/category/tutoriales/ruby/
 [2]: http://es.wikipedia.org/wiki/Hypertext_Transfer_Protocol
 [3]: http://codehero.com
 [4]: http://shop.oreilly.com/product/0636920019664.do?sortby=publicationDate
