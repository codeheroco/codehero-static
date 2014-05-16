---
layout: post
status: publish
title: Creando un API Parte 3
author: Alberto Grespan
author_login: albertogg
description: Quinceavo capítulo de la serie Sinatra desde Cero donde enseñamos como se hace un pequeño API para acortar URLs y explicamos más la estructura y archivos.
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
- Sinatra
- Ruby
- Rails
---
La serie de Sinatra desde Cero, buscará otorgarte el conocimiento necesario para que puedas desarrollar tus propias aplicaciones Web haciendo uso de esta magnifica herramienta.

En este quinceavo capítulo culminaremos la etapa final de nuestra serie, Sinatra desde Cero. Hablaremos de los controladores y modelos de nuestro API que conforman la lógica de nuestra aplicación y terminaremos de unificar gran parte de los conocimientos que hemos visto a lo largo de esta serie, además de otros que guardan relación con Rails.

> Para comprender correctamente todo lo que hablaremos en esta serie, es conveniente tener un conocimiento básico sobre el lenguaje de Ruby. Podrás conseguir toda la información desees [aquí][1]

La información para este artículo la sacamos de la recopilación de información del libro [Sinatra: Up and Running][4] y de la [Documentación oficial](http://www.sinatrarb.com/intro.html)

* * *

## Adentrandonos en la lógica del API

En los capítulos pasados estuvimos recorriendo todos los aspectos de nuestra aplicación (API) que tienen que ver con la estructura, Librerías utilizadas, esquema de base de datos, migraciones, etc... En este nuevo episodio vamos a recorrer lo que existe en el directorio `/app`.

```bash
$ tree app
app
├── models
│   └── link.rb
└── routes
    ├── base.rb
    └── links.rb

2 directories, 3 files
```

### Controladores

Vamos a comenzar con el directorio `app/routes` y el archivo `base.rb`.

El directorio `app/routes` lo consideramos como el directorio de los controladores. El archivo `base.rb` es el controlador principal de nuestra aplicación, el resto de los controladores heredarán de él, por consiguiente contendrán todos los métodos que el mismo posea.

```ruby
class Base < Sinatra::Application
  configure do
    set :root, File.expand_path('../../../', __FILE__)

    disable :method_override
    disable :protection
    disable :static
  end

  before do
    $host_port = request.host_with_port
  end
end
```

Podemos observar que este archivo `base.rb` contiene una clase llamada `Base` que hereda de `Sinatra::Application` a su vez por este ser una sub-clase de `Sinatra::Base` entonces heredamos el manejo settings, enrutamiento, manejo de errores etc... automaticamente.

Luego podemos observar que existe un bloque de configuración donde decimos donde queda la ruta principal de nuestro proyecto y desabilitamos ciertas opciones sobre las que pueden leer a detalle en [Built-in Settings](http://www.sinatrarb.com/configuration.html). Por último un bloque `before` que almacena el host y el puerto de servidor cuando se realiza una petición. Esto lo utilizaremos para almacenar desde nuestro modelo la dirección interna de nuestra aplicación donde podremos localizar nuestro url corto.

Ahora vamos a ver el archivo `links.rb` dentro de `app/routes`, el otro controlador.

```ruby
module Routes
  module Api
    module V1
      class Links < Base
        before do
          content_type :json
        end

        get '/' do
          { links: Link.by_ids(params[:ids])}.to_json(except: [:created_at,
                                                               :uri_hash,
                                                               :updated_at],
                                                     methods: [:href])
        end

        get '/:search' do
          { links: Link.search_by(params[:search])}.to_json(except: [:uri_hash],
                                                               methods: [:href])
        end

        post '/' do
          request.body.rewind
          json_req = JSON.parse(request.body.read)
          links = json_req['links'].map { |new_link| Link.create_new_link(new_link) }

          saved_links = Link.save_received_request(links)
          if saved_links.has_key?(:error)
            status 422
            saved_links.to_json
          else
            status 201
            headers "Location" => Link.return_header_location(saved_links)
            saved_links.to_json(except: [:created_at,:uri_hash, :updated_at],
                               methods: [:href])
          end
        end
      end
    end
  end
end
```

En este archivo lo primero que vemos es que todo su contenido se encuentra dentro de 3 módulos, `Routes`, `Api`, `v1`. Fue realizado de la siguiente manera para permitirnos versionar nuestro API por si en un futuro quisiéramos modificarlo drásticamente y además tener la posibilidad de correr de forma simultanea una o más versiones del API con URLs no muy diferentes.

Luego nuestra clase `Links` hereda de `Base` (el controlador principal) y volvemos a tener un bloque `before` pero en este caso para restringir que el tipo de contenido de nuestras peticiones a JSON.

A partir de aquí tenemos 3 posibles rutas:

- **get '/'**: ruta encargada de responder a un URL con un query de ids que posiblemente han sido creados con anterioridad en nuestra aplicación. Recibe `http://localhost:3000/?ids=1,5` o `http://localhost:3000/` y responde con un objeto JSON con la siguiente estructura `{"links":[{"id":1,"uri":"http://...","href":"..."},{ "id": 5,...}]}` en este caso esta sería la respuesta de la primera petición.
- **get '/:search'** ruta diseñada para responder a los URL cortos, es decir, recibe `http://localhost:3000/ynt70` y retorna un objeto JSON con la siguiente estructura `{"links":[{"uri":"http://codehero.co"}]}`
- **post '/'**: encargada de recibir un objeto de tipo JSON `'{"links": [{"uri": "http://..."}, {"uri": "http://..."}]}'` en un arreglo con uno o muchos URLs. Además este método se encarga de llamar a la función de guardado de la data y de retornar una respuesta haya ocurrido un error o no. El estado 422 se refiere a que ocurrió un error en el intento de guardado porqué una validación no se cumplió. Por otra parte el 201 retorna los encabezados de la petición esperados y además retorna la información referente al objeto almacenado.

De esta manera y con estas 3 rutas estamos abarcando poco pero de manera concreta para poder explicar como se realizan las rutas de nuestro API.

Ahora pasaremos a ver el modelo empleado con Sinatra-ActiveRecord.

### Modelos

Ahora vamos con la última parte de nuestra aplicación (API), referente a los modelos, bueno, en este caso es sólo uno.

Ahora estamos ubicados en el directorio `app/models` en el archivo `link.rb`.

```ruby
class Link < ActiveRecord::Base
  before_create :set_uri_hash

  validates :uri, presence: true

  def self.search_by(params)
    if params.is_number?
      select(:id, :uri, :uri_hash).where(id: params)
    else
      select(:id, :uri, :uri_hash).where(uri_hash: params)
    end
  end

  def self.by_ids(params)
    if params.present?
      where(id: params.split(','))
    else
      all
    end
  end

  def self.create_new_link(params)
    link = Link.new
    link.uri = params['uri']
    link
  end

  def href
    "http://#{$host_port}/#{uri_hash}"
  end

  def set_uri_hash
    self.uri_hash = rand(36**5).to_s(36)
  end

  def self.return_header_location(params)
    ids = params[:links].map(&:id).join(',')
    if ids.length > 2
      "/?ids=#{ids}"
    else
      "/#{ids}"
    end
  end

  def self.save_received_request(links)
    transaction do
      begin
        { links: links.each(&:save!) }
      rescue ActiveRecord::RecordInvalid => invalid
        { error: invalid.record.errors }
      end
    end
  end
end
```

Lo primero que encontramos en este archivo es una clase que hereda de `ActiveRecord::Base` esto nos permite tener el acceso a datos. Luego encontramos un *"famoso" callback* relacionado a un método llamado `set_uri_hash`. Por ser un *callback* de tipo `before_create` es ejecutado justo antes de realizar el create de un objeto en DB. El método antes mencionado se encarga de crear un "hash" de cinco caracteres base 36, es decir, se escogen cinco caracteres aleatorios que se encuentren entre los números de 0..9 o las letras de la a..z y se asignan a el campo en DB `uri_hash`.

Lo próximo que encontramos es una validación sobre el campo `uri` el cual necesita estar presente a la hora de crear un nuevo elemento.

A partir de aquí encontramos varios *class methods* utilizados para manupular la data en nuestro API:

- **search_by**: Este método es el utilizado en la ruta `get '/:search'` y es el que hace posible realizar el select sobre un `id`, `uri` y `uri_hash` donde el valor del `id` o `uri_hash` sea igual al suministrado por el usuario en su consulta.
- **by_ids**: Este método se encarga de analizar si la petición suministrada por el usuario mediante la ruta `get '/'` contiene un parámetro y devuelve una respuesta en base a eso.
- **create_new_link**: Este método es el utilizado previo a la creación de un nuevo link en base de datos, es una manera de no tener que utilizar *strong parameters* para canalizar un posible mass assignment de parámetros. Crea un objeto para un nuevo link y le agrega al campo `uri` lo que viene dentro del parametro `uri`, para luego retornar el objeto link.
- **return_header_location**: Este método se encarga de retornar el header de *location* correcto dependiendo de la cantidad de elementos que se crearon simultaneamente. Si se envían dos o más elementos y los mismos se crean satisfactoriamente podremos visualizar el *header Location* de la siguiente manera:

```bash
HTTP/1.1 201 Created
Content-Type: application/json;charset=utf-8
Location: http://localhost:3000/?ids=5,6
```
- **save_received_request**: Finalmente hemos llegado al método encargado de almacenar en base de datos todos los links enviados desde la ruta `posts '/'`. Probablemente siempre se envíen varios links para ser almacenados de manera simultanea. Es aquí donde es necesaria una operación transaccional para poder estar seguros de que si uno de estos falla toda la operación de guardado se devuelva (*rollback*) y así poderle retornar un mensaje de error al usuario.

En general es bastante sencillo toda la funcionalidad de nuestro API, cabe destacar que utilicé varias de las prácticas que menciona [http://jsonapi.org/](http://jsonapi.org/) para la realización de la lógica del nuestro API.

* * *

## Conclusión

En este quinceavo y último capítulo de la serie he terminado de explicar el funcionamiento de nuestro API, con sus controladores y modelos. Si te surge algún tipo de duda no te detengas y déjanos un comentario, que gustosamente lo responderemos.

¡Hasta el próximo capítulo!

 [1]: http://codehero.co/category/tutoriales/ruby/
 [2]: http://es.wikipedia.org/wiki/Hypertext_Transfer_Protocol
 [3]: http://codehero.com
 [4]: http://shop.oreilly.com/product/0636920019664.do?sortby=publicationDate
