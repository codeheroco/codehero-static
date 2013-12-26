---
layout: post
status: publish
published: true
title: ActiveModel
author: Ricardo Sampayo
author_login: ricardo
author_email: ricardo9588@gmail.com
author_url: http://www.ricardosampayo.com
wordpress_id: 2347
wordpress_url: http://codehero.co/?p=2347
date: 2013-10-04 00:01:34.000000000 -04:30
series:
  nombre: Ruby on Rails desde Cero
  thumbnail: http://i.imgur.com/ZPAm5Mn.png?1
categories:
- Cursos
- Ruby on Rails
tags:
- Cursos
- Ruby on Rails
- Validaciones
- Serialización
- ActiveModel
---
<p>Las series de cursos Ruby on Rails en CodeHero buscan otorgarte los conocimientos necesarios, para que puedas desarrollar tus propias aplicaciones Web. En capítulos anteriores hemos aprendido muchas de las ventajas del framework, desde la instalación y la puesta en marcha de nuestras aplicaciones, hasta el capítulo anterior: ActiveRecord, herramienta que nos proporciona Rails para la administración y funcionamiento de los modelos con acceso directo a la base de datos.</p>

<p>En este nuevo capítulo vamos a conocer otra de las característica del framework como lo es <strong>ActiveModel</strong>, una herramienta que nos permite tener modelos con muchas de las funcionalidad de ActiveRecord pero sin acceso a la base de datos.</p>

<hr />

<h2>¿Qué es ActiveModel?</h2>

<p>Es una serie de módulos que se pueden utilizar para implementar funcionalidades comunes extraídas de ActiveRecord e implementarlas en modelos comunes sin que tenga interacción directa con la base de datos. Algunos de los módulos que incluye ActiveModel son los siguientes:</p>

<ul>
<li><a href="http://api.rubyonrails.org/classes/ActiveModel/AttributeMethods.html">ActiveModel::AttributeMethods</a></li>
<li><a href="http://api.rubyonrails.org/classes/ActiveModel/Callbacks.html">ActiveModel::Callbacks</a></li>
<li><a href="http://api.rubyonrails.org/classes/ActiveModel/Conversion.html">ActiveModel::Conversion</a></li>
<li><a href="http://api.rubyonrails.org/classes/ActiveModel/Dirty.html">ActiveModel::Dirty</a></li>
<li><a href="http://api.rubyonrails.org/classes/ActiveModel/Lint.html">ActiveModel::Lint</a></li>
<li><a href="http://api.rubyonrails.org/classes/ActiveModel/Model.html">ActiveModel::Model</a></li>
<li><a href="http://api.rubyonrails.org/classes/ActiveModel/Naming.html">ActiveModel::Naming</a></li>
<li><a href="http://api.rubyonrails.org/classes/ActiveModel/SecurePassword.html">ActiveModel::SecurePassword</a></li>
<li><a href="http://api.rubyonrails.org/classes/ActiveModel/Serialization.html">ActiveModel::Serialization</a></li>
<li><a href="http://api.rubyonrails.org/classes/ActiveModel/Serializers.html">ActiveModel::Serializers</a></li>
<li><a href="http://api.rubyonrails.org/classes/ActiveModel/Translation.html">ActiveModel::Translation</a></li>
<li><a href="http://api.rubyonrails.org/classes/ActiveModel/Validations.html">ActiveModel::Validations</a></li>
</ul>

<p>La sintaxis para desarrollar una clase con estas características es exactamente igual que una clase normal, solo que a esta se le incluyen los módulos de ActiveModel que vayamos a utilizar. Un ejemplo de esto es el siguiente:</p>

```ruby
class Message
  include ActiveModel::Validations

  attr_accessor :nombre, :email, :contenido

  validates_presence_of :nombre, :email, :contenido

  def initialize (nombre, email,contenido)
   @nombre, @email, @contenido = nombre, email, contenido
  end
end
```

<p>Como ven en el ejemplo es una clase normal pero en ésta incluimos <code>ActiveModel::Validations</code> para utilizar el módulo de validaciones de ActiveRecord que estudiamos en el <a href="http://codehero.co/activerecord-validaciones/">capítulo anterior</a>.</p>

<hr />

<h2>Modelo con ActiveModel (Validations)</h2>

<p>Para este curso realizaremos un ejemplo sencillo que consiste en un simple formulario en el que agregaremos un asunto, correo y contenido, el cual vamos a validar de igual forma que en el capítulo anterior (Haciendo usos de los módulos de ActiveModel), pero estos datos no serán guardados en base de datos. Probablemente se estén preguntando cual es la utilidad de agregar un formulario sin que los datos se dirijan a un destino, pues entre otras cosas, pudiéramos enviar el mensaje por correo electrónico desde nuestro servidor o incluso enviar los datos por medio de un servicio web (Web Service) a otra aplicación que lo procese.</p>

<p>Empezaremos creando nuestro modelo:</p>

```ruby
class Message
  #incluimos los módulos que vamos a utilizar
  include ActiveModel::Validations  #necesario para agregar las condiciones de validacion
  include ActiveModel::Conversion # contiene entre otras cosas el metodo to_key que usamos en el formulario

  #declaramos las variables del modelo
  attr_accessor :name, :email, :content

  #Agregamos las condicones a vailidar
  validates_presence_of :name, :email, :content
  validates_format_of :email, :with => /^[-a-z0-9_+\.]+\@([-a-z0-9]+\.)+[a-z0-9]{2,4}$/i
  validates_length_of :content, :maximum => 500

  # El constructor que recibe un hash con los valores del formulario
  # y nos crea nuestro objeto mensaje
  def initialize(attributes = {})
    attributes.each do |name, value|
      send("#{name}=", value)
    end
  end

  # Metodo que debemos agregar a nuestro modelo
  # ya que no se van a guardar los datos en la base de datos
  def persisted?
    false
  end
end
```

<p>Una vez creado nuestro modelo ActiveModel simplemente creamos el controlador y las vistas necesarias. Como ya dijimos en capítulos anteriores podemos crear el controlador de una forma rápida con el terminal y la siguiente línea de comando:</p>

```sh
$ rails g controller mensajes
```

<p>Agregamos en el archivo de rutas la siguiente linea, para que Rails reconozca las rutas para el controlador:</p>

```ruby
resources :mensajes
```

<p>Creamos nuestro controlador:</p>

```ruby
class MensajesController < ApplicationController
  def index
    @mensaje = Mensaje.new
  end

  def create
    @mensaje = Mensaje.new(params[:mensaje])
    if @mensaje.valid?
      # TODO send message here
      flash[:notice] = "Se envío el mensaje con éxito"
      redirect_to root_url
    else
      render :action => 'index'
    end
  end
end
```

<p>Vemos algunas diferencias mínimas con respecto a otro modelos que ya hemos creado antes con acceso a base de datos, por ejemplo: cambiamos el método <code>save</code>(@mensaje.save) por el método <code>valid?</code>(@mensaje.valid?) porque obviamente ya no estamos guardando en base de datos, de resto se maneja bastante parecido que con ActiveRecord.</p>

<p>Por último creamos nuestra vista de igual manera que en el capítulo anterior, agregando los bloques que detectan los errores del modelo:</p>

```html
<%= form_for @mensaje do |f| %>
  <% if @mensaje.errors.any? %>
    <div id="error_explanation">
      <h2><%= pluralize(@mensaje.errors.count, "error") %> antes de guardar:</h2>
      <ul>
      <% @mensaje.errors.full_messages.each do |msg| %>
        <li><%= msg %></li>
      <% end %>
      </ul>
    </div>
  <% end %>

  <p>
    <%= f.label :nombre %><br />
    <%= f.text_field :nombre %>
  </p>
  <p>
    <%= f.label :email %><br />
    <%= f.text_field :email %>
  </p>
  <p>
    <%= f.label :contenido, "Mensaje" %><br />
    <%= f.text_area :contenido %>
  </p>
  <p><%= f.submit "Enviar" %></p>
<% end %>
```

<p>Para finalmente tener un resultado parecido al siguiente, Cabe destacar que el diseño y los mensajes pudieran ser modificados para mejorar la presentación de la pagina.</p>

<p><img src="http://i.imgur.com/3whUVqG.png?1" alt="codigoVista" /></p>

<hr />

<h2>ActiveModel (Serialization)</h2>

<p>Para finalizar con el curso de hoy veremos como funciona el módulo para serializar un objetos con ActiveModel. En Rails es bastante sencillo convertir un objeto a <strong>JSON</strong> o <strong>XML</strong> solo necesitamos incluir en nuestra clase el módulo para serializar objetos:</p>

```ruby
include ActiveModel::Serializers::JSON
include ActiveModel::Serializers::Xml
```

<p>Luego declaramos un método donde creamos un Hash con los atributos del objeto de la siguiente forma (tomando como ejemplo el objeto del ejercicio anterior)</p>

```ruby
def attributes
  {'nombre' => nil,"email" =>nil, "contenido"=>nil}
end
```

<p>Listo ahora en el controlador solo decidimos como queremos mostrar el resultado.</p>

```ruby
#formato XML
render :xml => @mensaje.to_xml

#formato JSON
render :json => @mensaje.to_json
```

<p>y obtendremos algo como esto dependiendo del formato que lo necesitemos (El ejemplo lo muestra en formato JSON):</p>

```ruby
{
  "nombre":"Ricardo Sampayo",
  "email":"me@RicardoSampayo.com",
  "contenido":"Mensaje"
}
```

<hr />

<h2>Conclusión</h2>

<p>En esta lección hemos visto un poco de una característica bien importante del framework como lo es ActiveModel, conocimos su sintaxis y una pequeña implementación que espero haya servido para reforzar sus destrezas en Rails y haya aumentado su curiosidad a probarlo.</p>

<p>Una vez más te recomiendo echarle un vistazo a la serie completa de Ruby desde cero, así como a las otras series de CodeHero, agradeciendo de antemano todas sus dudas y comentarios en la sección de comentarios.</p>

<p>¡Hasta el próximo capítulo!</p>
