---
layout: post
status: publish
published: true
title: Estructura de proyecto
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
wordpress_id: 2806
wordpress_url: http://codehero.co/?p=2806
date: 2013-12-05 00:39:30.000000000 -04:30
categories:
- Cursos
- Sinatra
tags:
- Cursos
- curso
- Sinatra
---
<p>La serie de Sinatra desde Cero, buscará otorgarte el conocimiento necesario para que puedas desarrollar tus propias aplicaciones Web haciendo uso de esta magnifica herramienta.</p>

<p>En este octavo capítulo empezaremos a estructurar una aplicación de manera modular un poco más compleja que lo realizado la semana anterior y haciendo funcionar dichos módulos como middleware en Sinatra.</p>

<blockquote>
  <p>Para comprender correctamente todo lo que hablaremos en esta serie, es conveniente tener un conocimiento básico sobre el lenguaje de Ruby. Podrás conseguir toda la información desees <a href="http://codehero.co/category/tutoriales/ruby/">aquí</a></p>
</blockquote>

<hr />

<h2>Estructura de proyecto</h2>

<p>Deben recordar que en múltiples ocasiones hemos dicho que Sinatra nos da la completa libertad de ensamblar las aplicaciones como nosotros queramos. Esto ciertamente es muy bueno (para algunos) pero a su misma vez muy confuso (para otros), ya que no hay una <em>"mejor forma"</em> de hacer las aplicaciones sino que todas son <em>buenas</em>. Es en este punto donde empezamos a leer por internet las mil y un distintas formas para ensamblar una aplicación web en Sinatra <em>"correctamente"</em>; pero la pregunta del millón es:</p>

<h3>¿Qué es lo que realmente necesitamos?</h3>

<p>Ciertamente, casi todos nosotros tendemos a complicar demasiado las cosas en un punto muy temprano del desarrollo cuando en realidad deberíamos fijar las metas a lograr para poder realizarlo de la manera más sencilla posible e ir ajustando en el proceso. Es aquí cuando surge una nueva interrogante:</p>

<h3>¿Por qué no realizamos la aplicación de manera convencional/clásica (sencilla)?</h3>

<p>La respuesta es simple, si de antemano conocemos que la aplicación final será bastante reducida en tamaño, tranquilamente podemos iniciar con este modelo de aplicación sin tener que pensarlo demasiado. Por el contrario, si conocemos que será de un tamaño final medio/grande, quizás, como recomendación, evaluar si es mejor ir a algo un poco más estructurado como Rails. La misión al realizar aplicaciones grandes siempre será poder reutilizar componentes para hacerla los más <a href="http://es.wikipedia.org/wiki/No_te_repitas">DRY</a> que podamos y esto nos obliga de cierto modo a que la aplicación sea modular donde los componentes o módulos de la aplicación sean middleware. Esto de cierta forma es lo que hicimos en el capítulo anterior cuando hablamos de Subclases.</p>

<p>Para continuar con el tema y reafirmar el conocimiento de la semana pasada pero agregándole cierta complejidad; hoy realizaremos una muy pequeña aplicación modular con estructura similar a la de Ruby on Rails (MVC) pero sin los modelos por ahora.</p>

<h4>Estructura</h4>

<pre>tree .
.
├── app
│   ├── controllers
│   │   ├── application_controller.rb
│   │   └── users_controller.rb
│   ├── helpers
│   │   └── application_helper.rb
│   └── views
│       ├── users.erb
│       ├── layout.erb
│       └── not_found.erb
└── config.ru
</pre>

<ul>
<li><p>En los <strong>controladores</strong> tenemos el <code>application_controller</code> que viene siendo nuestro controlador principal y de donde heredarán todos los demás controladores de la aplicación. El <code>users_controller</code> que contiene las rutas de la aplicación relacionadas con los usuarios.</p></li>
<li><p>Los <strong>helpers</strong> vienen siendo clases que contienen fragmentos de código reusables y asisten en funcionalidad a los controladores y vistas.</p></li>
<li><p>Las <strong>vistas</strong> son los archivos referentes a las distintas pantallas de presentación que ve el usuario y que pueda tener nuestra aplicación.</p></li>
<li><p><strong>config.ru</strong> nombre por convención del archivo utilizado por el servidor web de Ruby: Rack.</p></li>
</ul>

<p>Echemos un vistazo al contenido de dichos archivos.</p>

<pre># application_helper.rb

module ApplicationHelper
  def title(value = nil)
    @title = value if value
    @title ? "#{@title}" : "Título por defecto"
  end
end
</pre>

<p>El <code>application_helper</code>: es el "helper" principal de la aplicación, se encuentra dentro de un módulo y está encargado de establecer un título a las páginas html que se encuentran dentro de la carpeta de las vistas.</p>

<pre># application_controller.rb

class ApplicationController &lt; Sinatra::Base
  helpers ApplicationHelper

  # establece la carpeta de vistas a ../views.
  set :views, File.expand_path('../../views', __FILE__)

  # despliega las páginas 404
  not_found do
    title 'Not Found!'
    erb :not_found
  end
end
</pre>

<p>Por lo que podemos ver en el archivo <code>application_controller</code> al ser el controlador principal de Sinatra hereda de <code>Sinatra::Base</code> incluye el helper <code>ApplicationHelper</code> que se encuentra en la carpeta de helpers, establece la ruta de donde se encontrarán las vistas y contiene el manejo de errores para las páginas 404.</p>

<pre># users_controller.rb 

class UsersController &lt; ApplicationController
  get '/' do
    title "Usuarios"
    erb :users
  end

  get '/:number' do
    title "Usuario #{params[:number]}"
    erb :users
  end
end
</pre>

<p>Aquí podemos ver que <code>users_controller</code> es un controlador que hereda de <code>application_controller</code> y a su vez contiene dos rutas de tipo <code>get</code> donde les establece los títulos a dichas páginas y utiliza la vista <code>users</code>.</p>

<pre lang="ruby"># layout.erb

<html>
  <head>
    <title><%= title %></title>
  </head>
  <\body>
    <%= yield %>
  </body>
</html>
</pre>

<p>Este es el esqueleto HTML principal de la aplicación; es reusable por el resto de las vistas de la aplicación con la finalidad de no repetir siempre lo mismo. Cuando creamos otra vista se inyectará su contenido dentro de la etiqueta <code>&lt;%= yield %&gt;</code>. se pueden crear distintos tipos de esqueletos predefinidos pero cuando se deseen utilizar se le debe indicar a Sinatra manualmente cual es el que se debe usar <code>erb :users, :layout =&gt; :otro_layout</code></p>

<pre># users.erb

Página de usuarios!
</pre>

<p>Este archivo al igual que el <code>not_found.erb</code> solo contienen texto.</p>

<pre># config.ru

require 'sinatra/base'
Dir.glob('./app/{helpers,controllers}/*.rb').each { |file| require file }

map("/users") { run UsersController }
map("/")        { run ApplicationController }

</pre>

<p>Por último y para mi, el más importante del post es el archivo <code>config.ru</code>, ya que es aquí donde Sinatra genera nuestra aplicación. Primero un <code>require 'sinatra/base</code> para crear nuestra aplicación modular; segundo por medio del uso de <code>Dir.glob</code> se realiza un <code>require</code> de cada uno de los archivos que contenga extensión <code>.rb</code>, y por último se agregan los módulos cómo middleware, definiendo lo siguiente:</p>

<ul>
<li>Todas las rutas que se encuentran dentro del controlador <code>users_controller.rb</code> se verán precedidas por el slug <code>users</code>. </li>
<li>La ruta principal de la aplicación relacionada con <code>application_controller.rb</code> no está haciendo nada particular, únicamente nos desplegará la página 404 como ejemplo.</li>
</ul>

<p>Hagamos una prueba de nuestra pequeña aplicación.</p>

<pre>$ rackup -p 3000

$ curl --request GET localhost:3000
&lt;\html>
  &lt;\head>
    &lt;\title>Not Found!&lt;\/title>
  &lt;\/head>
  &lt;\body>
    La página no existe 404!
  &lt;\/body>
&lt;\/html>
</pre>

<p>Aquí podemos apreciar que al acceder por una ruta que no existe dentro de nuestra aplicación la misma nos arroja la vista <code>not_found.erb</code> que se encuentra definida en <code>application_controller</code>.</p>

<p>Ahora probemos las rutas de <code>/users</code>:</p>

<pre>$ curl --request GET localhost:3000/users
&lt;\html>
  &lt;\head>
    &lt;\title>Usuarios&lt;\/title>
  &lt;\/head>
  &lt;\body>
    Página de usuarios!
  &lt;\/body>
&lt;\/html>

$ curl --request GET localhost:3000/users/1
&lt;\html>
  &lt;\head>
    &lt;\title>Usuario 1&lt;\/title>
  &lt;\/head>
  &lt;\body>
    Página de usuarios!
  &lt;\/body>
&lt;\/html>
</pre>

<p>A diferencia de la anterior observamos que efectivamente ambas rutas de <code>users_controller.rb</code> están precedidas por el slug <code>users</code> aunque dichas rutas no estén escritas así dentro del controlador. La semana entrante veremos otras maneras existentes para agregar middleware y realizar el enrutamiento a nuestra aplicación en Siantra.</p>

<hr />

<h2>Conclusión</h2>

<p>En este octavo capítulo, hemos empezado a atar los cabos sueltos que tenemos de capítulos anteriores; aprendiendo a estructurar una aplicación en Sinatra de manera modular asemejando la estructura de una aplicación Rails y a su vez hemos puesto a prueba una primera parte de enrutamiento en base a middleware el cual expandiremos la próxima semana. Si te surge algún tipo de duda no te detengas y déjanos un comentario, que gustosamente lo responderemos.</p>

<p>¡Hasta el próximo capítulo!</p>
