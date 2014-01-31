---
layout: post
status: publish
published: true
title: Aplicaciones modulares
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
wordpress_id: 2705
wordpress_url: http://codehero.co/?p=2705
date: 2013-11-28 00:12:15.000000000 -04:30
serie: Sinatra desde Cero
thumbnail: http://i.imgur.com/UXeX0sa.png
description: Séptimo capítulo de la serie Sinatra desde Cero, donde hablaremos sobre aplicaciones modulares para construir aplicaciones más desacopladas y ordenadas.
categories:
- Cursos
- Sinatra
tags:
- Cursos
- curso
- Sinatra
---
<p>La serie de Sinatra desde Cero, buscará otorgarte el conocimiento necesario para que puedas desarrollar tus propias aplicaciones Web haciendo uso de esta magnifica herramienta.</p>

<p>En este séptimo capítulo te enseñaremos a plantear tus aplicaciones de manera diferente de como lo hemos venido haciendo hasta ahora y es utilizando subclases. las subclases nos ayudan a tener aplicaciones modulares más desacopladas y ordenadas.</p>

<blockquote>
  <p>Para comprender correctamente todo lo que hablaremos en esta serie, es conveniente tener un conocimiento básico sobre el lenguaje de Ruby. Podrás conseguir toda la información desees <a href="http://codehero.co/category/tutoriales/ruby/">aquí</a></p>
</blockquote>

<hr />

<h2>Aplicaciones modulares</h2>

<p>Hasta este punto de la Serie Sinatra desde Cero, hemos visto como se ensambla una aplicación en Sinatra utilizando el <strong><em>"top level DSL"</em></strong> <code>require "sinatra"</code>; esta manera funciona muy bien cuando las aplicaciones son de pequeño tamaño o su funcionalidad es muy puntual, pero cuando comienzan a crecer nos veremos en la obligación de tener una aplicación más modular haciendo uso del <em>Subclassing</em> de Sinatra permitiéndonos la separación de componentes.</p>

<p>Entre los pro y los contra de las aplicaciones modulares vs las <em>"clásicas"</em> podríamos mencionar que: las aplicaciones clásicas son más simples de construir y se conoce cual será su estructura de proyecto; pero por el contrario las aplicaciones modulares son algo más complicadas de construir pero más flexibles con su estructura del proyecto ya que se encuentran más desacoplados sus componentes, pero muchas veces provocan diferentes tendencias de como se debe armar un proyecto de gran magnitud diverjan y terminemos con una estructura similar o igual a la de un proyecto hecho en <a href="http://codehero.co/ruby-on-rails-desde-cero-estructura-del-proyecto/">Ruby on Rails</a>, cuando simplemente pudimos haber comenzado utilizando en ese <em>framework</em>.</p>

<p>En fin, realicemos una aplicación modular para observar y aprender como se hacen.</p>

<h3>Subclase de Sinatra</h3>

<p>Para utilizar Sinatra como una subclase debemos hacer lo siguiente:</p>

<p>Primero creamos un archivo que se llame <code>server.rb</code> con el siguiente código.</p>

```ruby
require 'sinatra/base'

class MyApp < Sinatra::Base
  get '/' do
    "Hola, Subclass"
  end
end
```

<p>Podemos observar que prácticamente es el mismo esqueleto de una aplicación clásica pero utiliza <code>sinatra/base</code> en vez de <code>sinatra</code> y nuestra aplicación se encuentra en una clase llamada <code>MyApp</code> que hereda de <code>Sinatra::Base</code> la cual contiene las rutas de nuestra aplicación.</p>

<p>Posterior a esto debemos crear otro archivo con el nombre <code>config.ru</code> con el siguiente código.</p>

```ruby
require "./server"
run MyApp
```

<p>Debemos recordar que el nombre de archivo <code>config.ru</code> es una convención de nombre utilizado por las aplicaciones que usan <a href="https://github.com/rack/rack">Rack</a> como base.</p>

<p>Como estamos utilizando las bondades de Rack debemos encender el servidor de la siguiente manera</p>

```sh
$ rackup -s puma -p 3000

# nos imprime
Puma 2.6.0 starting...
* Min threads: 0, max threads: 16
* Environment: development
* Listening on tcp://0.0.0.0:3000
```

<p>Podemos utilizar otro servidor que no sea <code>puma</code>, algo como <code>unicorn</code> o <code>webrick</code> si los tenemos instalados de la siguiente manera.</p>

```sh
$ rackup -s webrick -p 3000

# nos imprime
[2013-11-27 21:42:43] INFO  WEBrick 1.3.1
[2013-11-27 21:42:43] INFO  ruby 2.0.0 (2013-06-27) [x86_64-darwin12.4.1]
[2013-11-27 21:42:43] INFO  WEBrick::HTTPServer#start: pid=89169 port=3000
^C[2013-11-27 21:42:45] INFO  going to shutdown ...
[2013-11-27 21:42:45] INFO  WEBrick::HTTPServer#start done.
```

<p>Les recomiendo ver todas las posibilidades que nos entrega el comando <code>rackup</code> utilizando la bandera <code>-h</code>.</p>

<p>Ahora si vamos a internet o hacemos un cURL podemos observar que la pequeña aplicación hecha con un Subclass de Sinatra nos arroja la información correcta <code>Hola, Subclass</code> en la pantalla.</p>

```sh
$ curl --request GET localhost:3000/
Hola, Subclass%
```

<p>Ahora que sabemos sobre Subclases en Sinatra debemos tener presente que todas las Rutas de la aplicación se pueden heredar mediante Subclases, ya sean para manejo de errores, extensiones, middleware, etc…</p>

<p>Vamos a realizar una pequeña prueba para que vean como se puede heredar utilizando subclases de una clase propia que creemos.</p>

```ruby
class MyApp < Sinatra::Base
  get '/' do
    "Hola, Subclass"
  end
end

class SegundoApp < MyApp
  get '/hola' do
    "Hola desde nuestra segunda subclase."
  end
end
```

<p>Hemos creado dentro del mismo archivo una segunda clase llamada <code>SengundoApp</code> con una ruta llamada <code>/hola</code> que imprime un texto.</p>

<p>Los cambios que tuvimos que realizar en nuestro <code>config.ru</code> son los siguientes:</p>

```ruby
require 'sinatra/base'

require "./server"
run SegundoApp
```

<p>Podemos apreciar que no mucho cambió, decidí que la linea de <code>require "sinatra/base"</code> se encontraba mejor en este archivo para no tener que agregarlo a cada uno de los archivos que creemos, por último estamos haciendo <code>run SendundoApp</code> ya que es la última subclase y contiene todas las anteriores. Fueron cambios sencillos y fáciles de entender, vamos a probar en el terminal lo que nos mostraría por pantalla las rutas.</p>

```sh
$ curl --request GET localhost:3000/
Hola, Subclass%

$ curl --request GET localhost:3000/hola
Hola desde nuestra segunda subclase.%
```

<p>De manera muy sencilla hemos creado una aplicación que pudiese encontrarse en 2 archivos distintos y que contendría una ruta cada uno. La semana entrante veremos como crear una pequeña aplicación con estructura similar a la de Rails para el manejo de los controladores usando Subclases.</p>

<hr />

<h2>Conclusión</h2>

<p>En este séptimo capítulo, hemos aprendido a utilizar de manera muy básica Subclassing en Sinatra, para implementar nuestras aplicaciones con mayor libertad. Si te surge algún tipo de duda no te detengas y déjanos un comentario, que gustosamente lo responderemos.</p>

<p>¡Hasta el próximo capítulo!</p>
