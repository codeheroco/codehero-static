---
layout: post
status: publish
published: true
title: Enrutamiento (continuación)
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
wordpress_id: 2443
wordpress_url: http://codehero.co/?p=2443
date: 2013-10-24 00:12:27.000000000 -04:30
series:
  nombre: Sinatra desde Cero
  thumbnail: http://i.imgur.com/UXeX0sa.png
categories:
- Sinatra
tags:
- Cursos
- curso
- Sinatra
---
<p>La serie de Sinatra desde Cero, buscará otorgarte el conocimiento necesario para que puedas desarrollar tus propias aplicaciones Web haciendo uso de esta magnifica herramienta.</p>

<p>En este tercer capítulo te enseñaremos como pasar parámetros, query strings, wildcards, expresiones regulares, Halting y redireccionamiento en las rutas de nuestra aplicación; complementando el aprendizaje de la semana pasada a cerca de enrutamiento.</p>

<blockquote>
  <p>Para comprender correctamente todo lo que hablaremos en esta serie, es conveniente tener un conocimiento básico sobre el lenguaje de Ruby. Podrás conseguir toda la información desees <a href="http://codehero.co/category/tutoriales/ruby/">aquí</a></p>
</blockquote>

<hr />

<h2>Enrutamiento</h2>

<p>La semana pasada estuvimos hablando y realizando unas pequeñas pruebas de enrutamiento para aprender como funcionan los distintos verbos HTTP con los que trabaja Sinatra. Esta semana extenderemos el uso de los distintos verbos y agregaremos complejidad al mostrar casos reales en el manejo de rutas.</p>

<h3>Parámetros</h3>

<p>Cuando desarrollamos una aplicación web que necesita variar su comportamiento dependiendo de qué y quién la esté usando, empleamos el paso de parámetros, lo que nos permite poder interactuar directamente con la aplicación sin variar su código fuente.</p>

<p>¿Cómo se utiliza el paso de parámetros en Sinatra? Pues es relativamente sencillo, vamos a verlo para los 3 casos 'GET', 'POST', 'PUT'.</p>

```ruby
require 'sinatra'

get '/:nombre' do
  "Hola, #{params[:nombre]}"
end
```

<p>Hemos utilizado un parámetro llamado <code>nombre</code> que "almacena" cualquier palabra pero se está utilizando para recibir el nombre de una persona y luego imprime el mismo por pantalla.</p>

```sh
$ curl --request GET localhost:4567/alberto
Hola, alberto%
```

<p>De esta manera cualquier nombre que le pasemos a través de ese URL se verá reflejado al imprimir el "markup".</p>

<p>Si ahora nos encontráramos en una aplicación con un formulario de inicio de sesión y enviamos el nombre de usuario y contraseña por 'POST' se recibiría así:</p>

```ruby
require 'sinatra'

post '/login' do
  username = params[:username] # Nombre de usuario
  password = params[:password] # Contraseña
end
```

<p>Si quisiéramos modificar los datos de un usuario previamente creado en una base de datos haríamos lo siguiente con una petición de tipo 'PUT':</p>

```ruby
require 'sinatra'

put '/usuario/:id' do
  Usuario u = Usuario.find(params[:id])
￼￼  u.primer_nombre = params[:primer_nombre]
  u.segundo_nombre = params[:segundo_nombre]
  u.save
end
```

<p>Esto lo que realiza es buscar el usuario con el "id" en base de datos utilizando un ORM para esto y una vez que lo ha encontrado modifica sus datos con los que se encuentran en el formulario de "editar usuario" en la página.</p>

<h3>Query Strings</h3>

<p>¿Qué son "query strings"? posiblemente habrán visto en algún momento en un URL un parámetro con esta representación <code>?variable=hola</code>, los mismos pueden ser utilizados para pasar información muy particular como lo puede ser muchas veces el idioma de la página. Si te gustan mucho los URL limpios estoy muy seguro de que vas a obviar los "query strings" lo mayor posible.</p>

```ruby
require 'sinatra'

get '/:nombre' do
  "Hola, #{params[:nombre]} y #{params[:segundo]}"
end
```

```sh
$ curl --request GET localhost:4567/alberto?segundo=jonathan
Hola, alberto y jonathan%
```

<p>Cualquier nombre o palabra que escribamos en el "query string" <code>?segundo=</code> se mostrará en pantalla.</p>

<h3>Wild Cards (Comodines)</h3>

<p>Las rutas con "wild cards" se representan con el carácter ** (*) ** y quiere decir que son capaces de recibir cualquier tipo de parámetro que se desee. Para poder recibir un parámetro con "wild card" se debe utilizar <code>params[:splat]</code>.</p>

```ruby
require 'sinatra'

get '/*' do
  "Se recibió usando un wild card este parámetro: #{params[:splat]}"
end
```

<p>El resultado es el siguiente:</p>

```sh
$ curl --request GET localhost:4567/hola
Se recibió usando un wild card este parámetro: ["hola"]%
```

<h3>Expresiones regulares</h3>

<p>Podemos utilizar expresiones regulares para crear y adaptar rutas que den la misma respuesta a distintos casos. Por ejemplo: para agregar un usuario o un administrador se podría realizar captando la petición por una misma ruta para luego definir que tipo de usuario se desea agregar utilizando función interna dentro de la ruta que capturó la petición.</p>

```ruby
require 'sinatra'

get %r{/(c|h)ola} do
  "La ruta funciona para las dos palabras!"
end
```

<p>Si comprobamos la respuesta que obtenemos podemos observar que es exactamente la misma.</p>

```sh
$ curl --request GET localhost:4567/hola
La ruta funciona para las dos palabras!%

$ curl --request GET localhost:4567/cola
La ruta funciona para las dos palabras!%
```

<h3>Halting (Interrupción)</h3>

<p>Este tipo de ruta la utilizamos cuando queremos finalizar una operación ya sea porque se está tardando demasiado tiempo o simplemente ha ocurrido un problema grave del lado del servidor. Cabe destacar que lo que realiza este comportamiento es la función <code>halt</code> que nos proporciona Sinatra en el DSL. El mensaje <code>500</code> es simplemente uno de los códigos de error existenten que representan problemas del lado del servidor.</p>

```ruby
require 'sinatra'

get '/error' do
  'Este mensaje no se va a ver'
  halt 500
end
```

<p>Si observamos la salida con un <code>--verbose</code> para ver en detalle que ocurre, podremos apreciar que nos devuelve un "server error"</p>

```sh
$ curl --request GET --verbose localhost:4567/error
* About to connect() to localhost port 4567 (#0)
*   Trying 127.0.0.1...
* connected
* Connected to localhost (127.0.0.1) port 4567 (#0)
> GET /halt HTTP/1.1
> User-Agent: curl/7.24.0 (x86_64-apple-darwin12.0) libcurl/7.24.0 OpenSSL/0.9.8y zlib/1.2.5
> Host: localhost:4567
> Accept: */*
>
< HTTP/1.1 500 Internal Server Error
< Content-Type: text/html;charset=utf-8
< X-XSS-Protection: 1; mode=block
< X-Content-Type-Options: nosniff
< X-Frame-Options: SAMEORIGIN
< Content-Length: 0
<
* Connection #0 to host localhost left intact
* Closing connection #0
```

<h3>Pasando una petición</h3>

<p>Cuando hablamos sobre las rutas con expresiones regulares dijimos que al utilizarlas se podía responder a distintos comportamientos de le la misma en "funciones internas". El paso de peticiones es una manera de realizar esto de manera sencilla, observemos el ejemplo:</p>

```ruby
require 'sinatra'

before do
  content_type :txt
end

get %r{/(c|h)ola} do
  pass if request.path =~ /\/hola/
  "Estoy sirviendo la petición para /cola!"
end

get '/hola' do
  "servido desde /hola!"
end
```

<p>Veamos la los resultados:</p>

```sh
$ curl --request GET localhost:4567/cola
Estoy sirviendo la petición para /cola!%
$ curl --request GET localhost:4567/hola
servido desde /hola!%
```

<h3>Redireccionando</h3>

<p>Este tipo de ruta la utilizamos cuando queremos re-dirigir al usuario a un otra dirección ya sea dentro o fuera de nuestro dominio. A esta función le podemos pasar un código a la petición para notificar si el mismo es una re-dirección temporal o permanente.</p>

```ruby
require 'sinatra'

get '/redirect' do
  redirect 'http://www.google.com'
end

get '/redirect2' do
  redirect 'http://www.google.com', 301
end
```

<blockquote>
  <p>Todos los ejemplos utilizados en este curso fueron extraídos del libro <a href="http://shop.oreilly.com/product/0636920019664.do?sortby=publicationDate">Sinatra: Up and Running</a></p>
</blockquote>

<hr />

<h2>Conclusión</h2>

<p>En este tercer capítulo, terminamos de explicar los conceptos básicos a cerca de enrutamiento en Sinatra y como se utilizan. A partir de este momento pueden sacar provecho de estos tres capítulos para empezar a desarrollar una pequeña aplicación de pruebas. Si te surge algún tipo de duda no te detengas y déjanos un comentario, que gustosamente lo responderemos.</p>

<p>¡Hasta el próximo capítulo!</p>
