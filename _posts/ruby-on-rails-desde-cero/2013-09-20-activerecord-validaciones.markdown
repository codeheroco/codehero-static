---
layout: post
status: publish
published: true
title: ActiveRecord Validaciones
author: Ricardo Sampayo
author_login: ricardo
author_email: ricardo9588@gmail.com
author_url: http://www.ricardosampayo.com
date: 2013-09-20 00:01:04.000000000 -04:30
serie: Ruby on Rails desde Cero
dificultad: Aprendiz
duracion: 20
github: https://github.com/codeheroco/ruby_on_rails_activerecord
description: Ruby On Rails desde Cero curso CodeHero donde mostramos el lenguaje sin previo conocimiento, este capítulo veremos ActiveRecord validaciones.
categories:
- Cursos
- Ruby on Rails
tags:
- Ruby on Rails
- ActiveRecord
- Validaciones
---
<p>Las series de cursos Ruby on Rails en CodeHero buscan otorgarte los conocimientos necesarios, para que puedas desarrollar tus propias aplicaciones Web. En el capítulo anterior estudiamos a detalle muchas de las funcionalidades que nos da ActiveRecord para manejar nuestra base de datos de forma eficiente en Rails, pero aún nos quedan las validaciones que éste nos ofrece.</p>

<p>En este nuevo capítulo estudiaremos las validaciones que nos ofrece Rails con ActiveRecord, tema importante que nos ayuda garantizar los datos que almacenamos en la base de datos de forma más segura.</p>

<hr />

<h2>¿Por qué utilizar validaciones?</h2>

<p>Las validaciones se utilizan para garantizar que los datos que se están guardando en la base de datos sean los correctos con el formato que nosotros establezcamos desde un principio. Por ejemplo, puede ser importante para una aplicación guardar el correo electrónico de forma correcta, aunque con estos métodos no validamos que el correo le pertenezca a nuestro usuario, podemos por medio de un formulario exigir el campo obligatoriamente y que además éste cumpla con el formato de un correo electrónico.</p>

<p>Como probablemente ya sepan hay otras maneras de validar la información de los objetos que se almacenan en la base de datos, como lo son las validaciones del lado del cliente (<strong>JavaScript</strong>: Útiles pero poco fiables), validaciones a nivel de controlador (por lo general se vuelven difíciles de manejar, probar y mantener) o las validaciones nativas en base de datos (Se establece una fuerte dependencia del manejador de base de datos, haciendo difícil el mantenimiento y la adaptabilidad de nuestras aplicaciones)</p>

<hr />

<h2>Validaciones</h2>

<p>Entrando de una vez en materia para nuestro curso desarrollaremos todo el ejemplo para ver la magia de los validadores de ActiveRecord.</p>

<h3>Preparación de nuestro modelo</h3>

<p>Lo primero que debemos hacer para que Rails reconozca nuestras validaciones, es adaptar nuestros modelos indicándoles a cada uno de los atributos el tipo de validación que necesita. Algunos de los tipos de validadores que nos ofrece Rails son:</p>

<h4>Confirmación <code>confirmation</code></h4>

<p>Validación que utilizamos cuando queremos que el usuario confirme la información que nos este suministrando.</p>

<h4>Formato <code>format</code></h4>

<p>Este tipo de validación verifica que la información del usuario concuerde con una expresión regular que se especifica con la función <code>:with</code></p>

<h4>Tamaño o longitud <code>length</code></h4>

<p>Este tipo de asistente juega con la longitud de los datos suministrados por el usuario, para que se verifique según nuestras necesidades.</p>

{% include middle-post-ad.html %}

<h4>Valor nulo o vacío <code>presence</code></h4>

<p>Este asistente de validación nos verifica si el atributo del modelo puede ser nulo.</p>

<h4>Numérico <code>numericality</code></h4>

<p>Este asistente verifica que el atributo sólo sea numérico</p>

<h4>Único <code>uniqueness</code></h4>

<p>Este último asistente que estudiaremos, por el momento, nos verifica justo antes de guardar en la base de datos que nuestro objeto no este repetido, es decir, que sea único.</p>

<p>Ahora, luego de haber descrito muy brevemente algunos de los validadores que nos ofrece Rails veamos un ejemplo donde usaremos algunos de estos atributos.</p>

```ruby
class Persona < ActiveRecord::Base
  # Confirmamos el email y validamos que no sean vacios con presence
  # mostramos el mensaje de error con message
  validates :email , presence: true , confirmation: true
  validates :email_confirmation, presence: { message: " es requerido"}

  # Validamos en una expresion regular nuestro email
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, format: { :with => VALID_EMAIL_REGEX , message: "El formato del correo es invalido" }

  # Validamos que el identificador tenga entre 8 a 12 caracteres
  validates :identificador, length: { in: 8..12 , message: "debe tener entre 8 y 12 caracteres"}

  # Validamos que el identificador solo sea numerico
  validates :identificador, numericality: { only_integer: true }

  # Validamos que el email sea unico
  validates :email, uniqueness: {case_sensitive: false ,message: "ya esta registrado"}
end
```

<p>Como seguramente hemos visto en el ejemplo, una serie de opciones que le dan forma a las validaciones, como el mensaje: que nos da el error que queremos mostrar cuando no se cumpla la condición.</p>

<h3>Preparación del controlador y vista</h3>

<p>Una vez creado el modelo creamos nuestros controladores para generar, recibir y procesar la información ingresada por el usuario. El controlador que realizaremos para este ejemplo sólo consta de dos métodos: <strong>index</strong> que carga la lista de personas ya almacenadas y nos mostrará un formulario para cargar la información y <strong>create</strong> simplemente recibe la información del formulario y la procesa. Veamos esto en código.</p>

```ruby
def index
  # Crea una persona nueva para cargarla con informacion
  @nuevo_usuario = Persona.new
   # Carga todas las personas de base de datos
  @usuarios    = Persona.all
end

def create
  # Recibe y crea una persona con los datos del formulario
  @nuevo_usuario = Persona.new(params[:nuevo_usuario].permit(:nombre, :email,:identificador, :telefono,:sexo,:email_confirmation))
  @usuarios    = Persona.all

  # intenta guardar en base de datos
  if @nuevo_usuario.save
    #si tiene exito nos lleva al index
    redirect_to validation_path
  else
    # si no carga nuevamente la vista con los errores a corregir
     render action: 'index'
  end
end
```

<p>Por último creamos nuestro formulario donde cargaremos la información.</p>

```html
<%=  form_for :nuevo_usuario, url: validation_create_path  do |f| %>
  <% if @nuevo_usuario.errors.any? %>
    <div id="error_explanation">
      <h2><%= pluralize(@nuevo_usuario.errors.count, "error") %> error antes de guardar:</h2>

      <ul>
      <% @nuevo_usuario.errors.full_messages.each do |msg| %>
        <li><%= msg %></li>
      <% end %>
      </ul>
    </div>
  <% end %>

  <div class="field">
    <%= f.label :nombre %><br>
    <%= f.text_field :nombre %>
  </div>
  <div class="field">
    <%= f.label :email %><br>
    <%= f.text_field :email %>
  </div>
    <div class="field">
    <%= f.label :email_confirmation %><br>
    <%= f.text_field :email_confirmation %>
  </div>
    <div class="field">
    <%= f.label :identificador %><br>
    <%= f.text_field :identificador %>
  </div>
  <div class="field">
    <%= f.label :sexo %><br>
    <%= f.text_field :sexo %>
  </div>
  <div class="field">
    <%= f.label :telefono %><br>
    <%= f.text_field :telefono %>
  </div>
  <div class="actions">
    <%= f.submit %>
  </div>
<% end %>
```

<p>Como ven en la imagen se puede dividir en dos partes: la parte superior consta del manejo de errores, es donde se obtiene el objeto, se verifica si contiene errores y los muestra en una lista; y por último la parte inferior es nuestro formulario.</p>

<p>Veamos cómo nos muestra Ruby on Rails los errores en el formulario que acabamos de crear (obviamente se pueden editar los estilos para mostrar una mejor presentación).</p>

<p><img src="http://i.imgur.com/k71Qi9L.png?1" alt="codigo" /></p>

<hr />

<h2>Conclusión</h2>

<p>En esta lección aprendimos cómo crear un formulario y validarlo en el servidor antes de almacenarlo en nuestra base de datos. También vimos algunos de los tipos de validadores que ActiveRecord nos provee y estudiamos la importancia de este tema.</p>

<p>Una vez más te recomiendo echarle un vistazo a la serie completa de <a href="http://codehero.co/category/cursos/rails/">Ruby desde cero</a>, así como a las otras <a href="http://codehero.co/series/">series de CodeHero</a>, agradeciendo de antemano todas sus dudas y comentarios en la sección de comentarios.</p>

<p>¡Hasta el próximo capítulo!</p>
