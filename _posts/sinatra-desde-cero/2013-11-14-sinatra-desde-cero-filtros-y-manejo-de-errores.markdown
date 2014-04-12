---
layout: post
status: publish
published: true
title: Filtros y manejo de errores
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
date: 2013-11-14 02:08:31.000000000 -04:30
serie: Sinatra desde Cero
dificultad: Novato
duracion: 30
description: Quinto capítulo de la serie Sinatra desde Cero donde aprendemos a utilizar los filtros before y after como también a manejar errores como el 404 y el 500.
categories:
- Cursos
- Sinatra
tags:
- Sinatra
- Filtros
- Errores
---
<p>La serie de Sinatra desde Cero, buscará otorgarte el conocimiento necesario para que puedas desarrollar tus propias aplicaciones Web haciendo uso de esta magnifica herramienta.</p>

<p>En este quinto capítulo te enseñaremos a como modificar la información proveniente de una petición la cuál llamaremos <em>filtros</em> y también te enseñaremos a manejar los errores internos de la aplicación.</p>

<blockquote>
  <p>Para comprender correctamente todo lo que hablaremos en esta serie, es conveniente tener un conocimiento básico sobre el lenguaje de Ruby. Podrás conseguir toda la información desees <a href="http://codehero.co/category/tutoriales/ruby/">aquí</a></p>
</blockquote>

<hr />

<h2>Filtros</h2>

<p>En Sinatra existen dos tipos de filtros con los que se puede interactuar los dos se utilizan de la misma forma y su función es utilizada para modificar una petición recibida ya sea antes de ser procesada o posterior al procesamiento. Los filtros tienen la capacidad de realizar un tender de una vista, realizar una petición, responder con objetos, entre otros...</p>

<h3>Filtros antes del procesamiento</h3>

<p>Estos filtros son llamados en inglés <strong>"Before filter"</strong> y son aplicados justo cuando se recibe una petición, es decir: si quisiéramos realizar una comprobación de un usuario para ver si el mismo está en sesión en nuestra aplicación se puede realizar un método que compruebe esto y no permita al usuario realizar la petición que intentaba de no estarlo. Este tipo de filtros es sumamente útil para realizar este tipo de validaciones de seguridad y de comprobación de rol de usuarios.</p>

<p>En el siguiente ejemplo se creará un <strong>"Before filter"</strong> el cual le dará un valor a una variable que será mostrada en pantalla.</p>

{% include middle-post-ad.html %}

```ruby
require 'sinatra'

before do
  @before_value = 'Hola, Mundo!'
end

get '/' do
  "El valor de la variable será: #{@before_value}"
end
```

<p>Al ingresar al URL se aprecia el mensaje completo <code>El valor de la variable será: Hola, Mundo!</code> indicando que el filtro funcionó.</p>

<h3>Filtros posterior al procesamiento</h3>

<p>De la misma manera que los <strong>"Before filters"</strong> tenemos los <strong>"After filter"</strong>, llamados en español <em>posteriores al procesamiento</em>. Este filtro a diferencia del <strong>"Before filter"</strong> no puede interrumpir una petición de procesamiento ya que los mismos se ejecutan posterior a la misma. Hay que tener cuidado de como utilizamos este filtro ya que si lo estamos empleando para ejecutar una operación costosa en tiempo este tiempo se añadirá al tiempo total de la petición y puede que afecte al usuario.</p>

<p>Para el ejemplo de <strong>"After filter"</strong> utilizaremos el mismo código anterior pero agregaremos el filtro y observaremos la salida que se muestra en el terminal.</p>

```ruby
require 'sinatra'

before do
  @before_value = 'Hola, Mundo!'
end

get '/' do
  "El valor de la variable será: #{@before_value}"
end

after do
  puts "Llamando al After filter."
end
```

<p>Podemos observar que por cada una de las peticiones realizadas al servidor se ejecuta el "after filter".</p>

```sh
ruby server.rb
Puma 2.6.0 starting...
* Min threads: 0, max threads: 16
* Environment: development
* Listening on tcp://localhost:4567
== Sinatra/1.4.3 has taken the stage on 4567 for development with backup from Puma
After filter called to perform some task.
::1 - - [13/Nov/2013 23:59:43] "GET / HTTP/1.1" 200 32 0.0040
Llamando al After filter.
::1 - - [13/Nov/2013 23:59:43] "GET /favicon.ico HTTP/1.1" 404 448 0.0010
```

<h2>Manejo de Errores</h2>

<p>El manejo de errores es algo muy común en el desarrollo de software; no importa lo que hagamos las aplicaciones siempre tendrán errores y es por esto que de una u otra manera debemos ser capaces de manejar los errores que se produzcan en nuestra aplicación, ya sean por culpa de un usuario o por un fallo en nuestros servidores. Por suerte, para el manejo de errores en aplicaciones web tenemos un estándar al cual apegarnos; el mismo nos indica que código de error debemos servir. Por ejemplo: los códigos para indicar respuestas exitosas de una petición se encuentran entre las 200-299 pero para dar errores de servidor se encuentran entre 500-599.</p>

<p>En Sinatra existen dos envoltorios para los errores más comunes que son el error 404 <em>(Not Found)</em> y el 500 <em>(Internal Server Error)</em>. Estos envoltorios <em>"wrappers"</em> funcionan de la misma manera que los filtros.</p>

<h3>Not found</h3>

<p>El manejo de errores de tipo <em>404 Not Found</em> se activa cuando la petición a una ruta de la aplicación no se encontró y por esta razón salta esta operación. Debemos tener siempre encuenta el orden en el que se encuentren las rutas. En sinatra el error <em>404</em> está definido por el bloque <code>not_found</code>.</p>

```ruby
require 'sinatra'

before do
  content_type :txt
end

not_found do
  "Whoops! You requested a route that wasn't available."
end

get '/' do
  "El valor de la variable será"
end
```

<p>La respuesta obtenida siempre será por el <code>not_found</code> y con un mensaje similar a este del lado del servidor <code>::1 - - [14/Nov/2013 01:21:36] "GET /asd HTTP/1.1" 404 52 0.0027</code></p>

<p>El cliente verá el mensaje que tiene el bloque <code>not_found</code>:</p>

```sh
curl --request GET http://localhost:4567/asd
Whoops! You requested a route that wasn't available.
```

<h3>Internal Server Error</h3>

<p>El error <em>500 Internal Server Error</em> es la representación de cualquier error que pueda ocurrir cuando estamos procesando una petición en el servidor. En Sinatra está definida por el bloque <code>error</code>.</p>

<p>Para el bloque <code>error</code> basta con agregarlo a las rutas</p>

```ruby
require 'sinatra'

before do
  content_type :txt
end

configure do
  set :show_exceptions, false
end

error do
  "Y U NO WORK?"
end
```

<hr />

<h2>Conclusión</h2>

<p>En este quinto capítulo, hemos aprendido a utilizar de manera muy básica los filtros para realizar verificaciones en las peticiones; como también a manejar los errores más comunes utilizando los envoltorios que nos proporciona Sinatra para esta tarea. Si te surge algún tipo de duda no te detengas y déjanos un comentario, que gustosamente lo responderemos.</p>

<p>¡Hasta el próximo capítulo!</p>
