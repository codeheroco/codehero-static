---
layout: post
status: publish
published: true
title: Rack y Rutas
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
date: 2013-12-12 01:19:13.000000000 -04:30
serie: Sinatra desde Cero
dificultad: Intermedio
duracion: 25
description: Noveno capítulo de la serie Sinatra desde Cero, donde hablamos sobre Rack como primera opción para realizar nuestro enrutamiento, middleware y routers.
categories:
- Cursos
- Sinatra
tags:
- Sinatra
- Rack
- Rutas
---
<p>La serie de Sinatra desde Cero, buscará otorgarte el conocimiento necesario para que puedas desarrollar tus propias aplicaciones Web haciendo uso de esta magnifica herramienta.</p>

<p>En este noveno capítulo veremos las propiedades que nos entrega Rack a la hora de realizar enrutamiento dentro de nuestras aplicaciones en Sinatra. Ya sea utilizando middleware como <em>map</em> o un enrutador como rack-mount.</p>

<blockquote>
  <p>Para comprender correctamente todo lo que hablaremos en esta serie, es conveniente tener un conocimiento básico sobre el lenguaje de Ruby. Podrás conseguir toda la información desees <a href="http://codehero.co/category/tutoriales/ruby/">aquí</a></p>
</blockquote>

<hr />

<h2>Introducción</h2>

<p>La semana pasada vimos una ligera introducción a middleware cuando construíamos un esqueleto de aplicación con estructura similar y muy sencilla a un proyecto de Ruby on Rails. El middleware en este caso lo utilizamos en el archivo <code>config.ru</code> y lo hicimos para poder indicarle a nuestra aplicación en qué orden y con que nombre es que debe buscar y comparar la solicitud realizada por el usuario dentro de nuestra aplicación; en pocas palabras lo utilizamos para el enrutamiento.</p>

<hr />

<h2>Rack</h2>

<p>Ya hemos hablado bastante sobre Rack, y conocemos que Sinatra es un DSL construido en Ruby que va directamente sobre Rack. Para construir aplicaciones modulares y flexibles debemos estar muy claros que tenemos a nuestra disposición el uso de Rack directamente; el cual nos permite realizar enrutamiento y mil cosas más en nuestra aplicación. En este capítulo estaremos enfocados en enrutamiento con middleware y routers utilizando: El encabezado X-Cascade con Rack::Cascade, Middleware con Rack::URLMap o como un Router utilizando Rack::Mount.</p>

<p>A continuación veremos como funciona cada una de estas herramientas.</p>

<blockquote>
  <p>Deben tomar en cuenta que estamos utilizando la aplicación realizada la semana pasada y por consiguiente no todas las rutas van a funcionar cuando utilicemos Rack::Cascade y Rack::Mount ya que estas dos maneras de enrutamiento tienen control sobre a quien le desean entregar la solicitud y estas rutas no fueron diseñadas para que funcionaran correctamente con todos los métodos.</p>
</blockquote>

<h3>Rack::Cascade</h3>

<p>Rack cascade es un tipo de middleware que realiza lo siguiente: Se le entrega un lista de aplicaciones Rack y cada una de estas se prueba de manera consecutiva, la primera de estas aplicaciones en devolver una respuesta que no sea un código 404 será la que se retorne. A simple vista parece muy normal y realmente es así. Una de las diferencias de usar Rack cascase en vez de middleware como <em>map</em> es que si llegáramos a tener una ruta que devuelve un código 404 y otra ruta que no pero ambas tienen los mismos <em>"slugs"</em> (URL) se devolverá la respuesta que queremos ya que se obvia la ruta con el código 404, cosa que no pasa cuando se usa <em>map</em>.</p>

<p>Cómo funciona Rack::Cascade:</p>

```ruby
# config.ru
run Rack::Cascade.new [ProductsController, UsersController, ApplicationController]
```

<p>Muy sencillo creamos un cascade y le entregamos todas nuestras aplicaciones en el orden que deseamos, él se encargará del resto.</p>

{% include middle-post-ad.html %}

<h3>Rack::URLMap</h3>

<p>Rack URLMap aunque no lo sepan lo hemos estado utilizando con el método <em>map</em> que funciona para definir rutas. El método <em>map</em> es un envoltorio a Rack::URLMap y simplifica un poco la sintaxis de este. En el fondo al utilizar <em>map</em> o <em>Rack::URLMap</em> cada ruta o endpoint es como una pila de middleware separada y nos permite configurar y correr muchas aplicaciones bajo el mismo Rack pero cada una de ellas con su URL personal y con su propio middleware interno.</p>

<p>Como Sinatra en sí es un router, nosotros únicamente debemos definir un endpoint o ruta principal en la pila de middleware, luego cada aplicación individual se encarga de sus rutas internas lo cual nos permite tener una aplicación muy modular.</p>

<p>Basados en el código de la semana pasada haremos el cambio únicamente en el <code>config.ru</code> y luego agregaremos una nueva ruta.</p>

```ruby
# config.ru
run Rack::URLMap.new({
  "/users" => UsersController,
  "/" => ApplicationController
})
```

<p>Luego para agregar cualquier ruta solo basta con agregar un <em>"slug"</em> como "/products" y conocer el nombre de su controlador.</p>

```ruby
run Rack::URLMap.new({
  "/users" => UsersController,
  "/products" => ProductsController,
  "/" => ApplicationController
})
```

<p>Si hacen la prueba utilizando su navegador web o utilizando <code>curl</code> de la misma manera que la semana pasada se darán cuenta que funciona igual.</p>

<h3>Rack::Mount</h3>

<p>Rack Mount es un router. Los rotures reciben la solicitud y deciden a quien se la van a entregar, esto puede aumentar la flexibilidad con la que escribimos las rutas de nuestra aplicación pero a su vez la complejidad de las mismas. Por otra parte Rack::Mount no viene integrada directamente en rack, sino más bien es una gema aparte que debe ser instalada <code>gen isntall rack-mount</code>.</p>

```ruby
# config.ru
Routes = Rack::Mount::RouteSet.new do |set|
  set.add_route UsersController, { :request_method => 'GET', :path_info => %r{^/users$} }
  set.add_route ProductsController,{ :request_method => 'GET', :path_info => %r{^/products$} }
  set.add_route ApplicationController, { :request_method => 'GET', :path_info => %r{^/$} }
end

run Routes
```

<p>Según tengo entendido Rack mount no fue diseñada para uso directo si no más bien para uso de otras librerías, por consiguiente creo que no es algo muy popular.</p>

<h4>Rack::Mount utilizando Sinatra</h4>

<p>Utilizando únicamente Sinatra también podemos implementar un Rack Router de la siguiente manera.</p>

```ruby
# routes.rb
class Routes < ApplicationController
  get('/users') { UsersController.call(env) }
  get('/products') { ProductsController.call(env) }
end
```

<p>Se debe crear un archivo para manejo de rutas de la manera descrita para luego invocar <code>use Routes</code> bien sea desde el config.ru o desde la aplicación sinatra.</p>

<p>Las diferencias entre un middleware y un router tales como Cascade o Mount son difíciles de percibir pero principalmente middleware se encuentra atado a una sola ruta (endpoint) específico y un router no. Podemos decir que el router conoce todas las rutas y él decide cual usar basándose en el criterio de la solicitud.</p>

<hr />

<h2>Conclusión</h2>

<p>En este noveno capítulo, hemos visto como funcionan las distintas posibilidades que nos entrega Rack a la hora de decidir por un enrutamiento. A mi parecer la manera más útil para realizarlo es mediante <em>map</em> o <em>Rack::URLMap</em> ya que es probable que sea la manera más común y sencilla de utilizar cuando decidimos desarrollar de forma modular una aplicación. Si te surge algún tipo de duda no te detengas y déjanos un comentario, que gustosamente lo responderemos.</p>

<p>¡Hasta el próximo capítulo!</p>
