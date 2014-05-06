---
layout: post
status: publish
published: true
title: ActionController Parte 1
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
date: 2013-12-19 00:10:26.000000000 -04:30
serie: Ruby on Rails desde Cero
dificultad: Aprendiz
duracion: 20
description: Nuevo capítulo de la serie Ruby on Rails desde Cero, donde aprendemos sobre ActionControllers, como generarlos y como se leen parámetros.
categories:
- Ruby on Rails
- Cursos
tags:
- Controlador
- ActionController
- Ruby on Rails
---
<p>Las series de cursos Ruby on Rails en CodeHero buscan otorgarte los conocimientos necesarios, para que puedas desarrollar tus propias aplicaciones Web. En el capítulo anterior aprendimos como hacer pruebas unitarias, porque las debemos usar, como se preparan y como se usan.</p>

<p>En este nuevo capítulo aprenderemos un poco más sobre la estructura de una aplicación en Rails y configurar nuestra base de datos.</p>

<hr />

<h2>¿Qué es ActionController?</h2>

<p>Action Controller como su nombre lo indica es la clase principal relacionada a los Controladores de nuestra aplicación, y componente fundamental en el patrón de arquitectura de software MVC. También es responsable de que las solicitudes hechas por el usuario tengan sentido cuando muestran la información.</p>

<p>Cuando hablamos que ActionController es la clase principal relacionada a los controladores queremos decir que los controladores que nosotros creamos van a heredar de ella y de esta manera nos facilitará el trabajo ya que esta clase tiene una implementación muy pero muy completa.</p>

<h3>Convención de nombre.</h3>

<p>Ya hemos visto ActiveModel y si recuerdan cuando creábamos un Modelo lo hacíamos utilizando nombres <em>singulares</em>. A diferencia de los modelos el Controlador aboga por una terminología plural, algo como: <code>UsuariosController</code>. Apegándonos a esta terminología estaremos seguros que vamos a poder utilizar las rutas generadas por defecto con los generadores.</p>

<hr />

<h2>Generando controladores</h2>

<p>Si no se recuerdan del capítulo de <a href="http://codehero.co/ruby-on-rails-desde-cero-estructura-del-proyecto/">estructura de proyecto</a> de como crear un controlador únicamente, haciendolo mediante scaffold o de manera manual. Aquí te lo recordaremos y ampliaremos un poco las diferentes maneras de lograrlo.</p>

<p>Para crear únicamente un controlador lo podemos realizar de la siguiente manera:</p>

```sh
$ rails g controller Publicacion index
      create  app/controllers/publicacion_controller.rb
       route  get "publicacion/index"
      invoke  erb
      create    app/views/publicacion
      create    app/views/publicacion/index.html.erb
      invoke  test_unit
      create    test/controllers/publicacion_controller_test.rb
      invoke  helper
      create    app/helpers/publicacion_helper.rb
      invoke    test_unit
      create      test/helpers/publicacion_helper_test.rb
      invoke  assets
      invoke    coffee
      create      app/assets/javascripts/publicacion.js.coffee
      invoke    scss
      create      app/assets/stylesheets/publicacion.css.scss
```

<p>Particularmente podemos crear el controlador <em>completo</em>, con vistas, "suite" de pruebas, "assets" y "helpers" cómo también podemos simplemente crear lo que deseemos, mediante el paso de parámetros.</p>

<p>Sin "suite" de pruebas:</p>

```sh
$ rails g controller Publicacions index --no-test-framework
```

<p>Sin vistas:</p>

```sh
$ rails g controller Publicacions index --no-template-engine
```

<p>Sin nada:</p>

```sh
$ rails g controller Publicacions index --no-template-engine --no-test-framework --no-assets --no-helper
```

<p>Si quieren observar cualquier otra opción particular simplemente utilicen el comando -h:</p>

```sh
$ rails g controller -h
```

<h3>Métodos y acciones</h3>

<p>Debemos recordar del capítulo de <a href="http://codehero.co/ruby-on-rails-desde-cero-vistas-dinamicas/">vistas dinámicas</a> que para acceder a las vistas de la publicación que creamos, tuvimos que utilizar el controlador <code>publicación</code> y tener tres (3) funciones que hacen juego con el nombre de las vistas. En pocas palabras cuando se realiza una petición a nuestra aplicación el enrutador decide a que método del controlador se le delegará dicha petición y ese método en teoría contiene unas acciones que se ejecutarán para regresarle al usuario una vista particular con la información que solicitó.</p>



<p>Cuando vemos como está conformado un Controlador apreciamos lo siguen:</p>

```ruby
class PublicacionsController < ApplicationController
  def index
    @publicacion = Publicacion.all
  end
end
```

<p>Existe una clase llamada <code>PublicacionsController</code> que hereda de la clase <code>ApplicationController</code> y dentro de esta se encuentra (en este caso) un método llamado <code>índex</code> que contiene una acción particular, dicha acción es ir a la base de datos y buscar todas las publicaciones, generando el objeto <code>@publicacion</code> que está disponible en la vista <code>index.html.erb</code>.</p>

<h3>Parámetros</h3>

<p>Los parámetros son la forma de comunicación entre el usuario y la aplicación. Esto se realiza mediante verbos HTTP, y existen dos tipos de parámetros: Los que pueden ser enviados por el URL en forma de query y el segundo que puede ser referido a los enviados por un POST donde la información puede venir de un formulario de datos.</p>

<p>Los parámetros en Rails se pueden leer de la siguiente manera:</p>

<p>Si queremos buscar por el estado actual un tipo de publicación y utilizando el siguiente parámetro en el URL: <code>/publicacions?estado=publica</code>, realizamos lo siguiente:</p>

```ruby
def index
  if params[:draft] == "privada"
    @publicacions = Publicacion.where("estado = 'privada'")
  else
    @publicacions = Publicacion.where("estado = 'publica'")
  end
end
```

<p>Por otro lado si estamos aceptando el contenido de un formulario de publicación generado por Rails, que viene del URL <code>/publicacions/new</code> y será procesado por el método <code>create</code> del controlador <code>PublicacionsController</code>, realizamos lo siguiente:</p>

```ruby
def new
  @publicacion = Publicacion.new
end

def create
  @Publicacion = Publicacion.new(params[:publicacion])
  if @Publicacion.save
    redirect_to @Publicacion
  else
    render "new"
  end
end
```

<p>Como Rails trabaja de manera <a href="http://es.wikipedia.org/wiki/Representational_State_Transfer">RESTful</a> hay muchos elementos que engranar a la hora de entender como funciona el formulario, ya que puede parecer muy mágica la implementación si no se conoce. El formulario tiene un valor interno en el elemento <code>input</code> del HTML llamado <code>name</code> que contiene una referencia al objeto <code>@publicacion</code> que fue inicializado cuando accedimos por la Ruta <code>/publicacions/new</code> que hace referencia al método <code>new</code> del Controlador Publicacions. Cuando apretamos el botón de enviar formulario se utiliza el método <code>create</code> que lee la información proveniente del objeto <code>@publicacion</code> para luego crearlo en la base de datos o si por algún motivo tiene problemas se reenvía al usuario de vuelta a la página <code>publicacions/new</code></p>

<hr />

<h2>Conclusión.</h2>

<p>En esta lección comenzamos a adentrarnos en los detalles de los controladores de Rails, más específicamente en como se generan, cuales son unas de las opciones que podemos asignarles, como están conformados y como leer cierto tipo de parámetros. El próximo capítulo seguiremos ampliando conocimiento dentro de los demás tipos y formatos de parámetros que podemos enviar y veremos nuevos aspectos de seguridad en cuanto a la prohibición de asignación masiva. Siéntanse libres en consultar cualquier duda a través de los comentarios.</p>

<p>¡Hasta el próximo capítulo!</p>
