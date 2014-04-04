---
layout: post
status: publish
published: true
title: Vistas Dinámicas
author: Ricardo Sampayo
author_login: ricardo
author_email: ricardo9588@gmail.com
author_url: http://www.ricardosampayo.com
date: 2013-07-26 00:01:30.000000000 -04:30
serie: Ruby on Rails desde Cero
github: https://github.com/codeheroco/ruby_on_rails_variables_objetos
description: Curso en el cual aprenderemos Ruby on Rails desde Cero. En esta clase, estudiaremos como crear vistas dinámicas extrayendo entradas de la base de datos
categories:
- Cursos
- Ruby on Rails
tags:
- Ruby on Rails
- vistas
- Views
---
<h1>Ruby on Rails desde Cero: Vistas Dinámicas</h1>

<p>Las series de cursos Ruby on Rails en CodeHero buscan otorgarte los conocimientos necesarios, para que puedas desarrollar tus propias aplicaciones Web. En el capítulo anterior aprendimos más sobre las estructura del proyecto y a configurar una base de datos MySQL con Rails. En este nuevo capítulo de la serie veremos como realizar vistas dinámicas enfatizando en las que tienen interacción con la base de datos.</p>

<div class="alert alert-info">
  <h4>
    ¡Alerta!
  </h4> Todos los ejemplos usados en el curso son una continuación de los ejemplos del capítulo anterior.
</div>

<hr />

<h2>Vistas Dinámicas desde cero.</h2>

<p>Lo primero que aprenderemos es a crear una entidad de base de datos para almacenar las publicaciones de nuestra aplicación. Para hacer esto construimos un modelo igual que en el capítulo anterior de la siguiente manera:</p>

```sh
$ rails generate model Publicacion titulo:string contenido:text
```

<p>Una vez creado el modelo por consola podemos utilizar el comando 'rake' para construir la estructura de datos que tenemos en nuestro proyecto al manejador de base de datos que estemos utilizando. El comando es el siguente:</p>

```sh
$ bundle exec rake db:migrate
```

<p>De esta manera hemos creado una entidad publicación la cual tendrá la interacción directa con la base de datos. Pero aún no sabemos como conectar esta información con nuestras vistas a través de los controladores.</p>

<h3>Controladores</h3>

<p>Como ya vimos en el capítulo anterior crearemos un controlador llamado 'Publicacion' que servirá de puente entre las vistas y los modelos de la siguiente forma:</p>

```sh
$ rails generate controller publicacion
```

<p>Lo primero que vamos a hacer es configurar nuestro controlador para que nos sirva de enlace entre el modelo, la base de datos y nuestras vistas dinámicas. Empezaremos creando métodos dentro del controlador que acabamos de crear de la siguiente forma:</p>

<p>Nos posicionamos dentro del archivo 'publicacion_controller.rb' ubicado dentro del directorio 'app/controller/' y agregamos los métodos 'index', 'new' y 'create', los cuales listan las publicaciones, prepararan el formulario y guardan la información del mismo respectivamente:</p>

```ruby
def new
  @publicacion = Publicacion.new
end

def index
  @publicaciones = Publicacion.all
end

def create
  @publicacion = Publicacion.new(params[:publicacion].permit(:titulo, :contenido))
  @publicacion.save
  redirect_to publicacion_path    # esta ruta se explica a continuación
end
```

<p>Vean como no hace falta enviar las variables a las vistas (como hacen otros lenguajes), simplemente con declararlas e inicializarlas en el controlador es suficiente.</p>

<h3>Rutas</h3>

<p>Una vez que sepamos los métodos a utilizar debemos manipular el archivo de las rutas, para hacerle saber las direcciones que vamos a estar usando. El archivo de rutas se encuentra en el directorio: '/config/routes.rb'. agregaremos las dos rutas necesarias para usar estos métodos del controlador:</p>

```ruby
get 'publicacion' => 'publicacion#index'
get 'publicacion/new' => 'publicacion#new'
post 'publicacion/create' => 'publicacion#create'
```

<p>En este tipo de definición de rutas tenemos que el primer término (get y post) es el protocolo en que se van a recibir los datos, el segundo componente (<a href="http://localhost:3000/publicacion/new">publicacion/new</a> y <a href="http://localhost:3000/publicacion/create">publicacion/create</a>) son las url y el tercer componte (publicacion#new y publicacion#create) es el controlador seguido del método (<strong>controlador#metodo</strong>) al que esta asociado el url. Esto se puede ver mejor referenciado en el siguiente cuadro:</p>

<p><img src="http://i.imgur.com/ZmgmJon.jpg?1" alt="foto" /></p>

<h3>Vistas</h3>

<p>Una vez desarrollado los métodos del controlador y las rutas procedemos a crear nuestras vistas finales.</p>

<p>Para esto debemos ubicarnos en el directorio de las vistas del controlador: 'app/views/publicacion/' y creamos los siguientes archivos:</p>

<p>La primera vista la llamaremos '_form.html.erb' y este contendrá el formulario:</p>
{% include middle-post-ad.html %}


```html
<%= form_for :publicacion, url: publicacion_create_path do |f| %>
  <p>
    <%= f.label :titulo %><br>
    <%= f.text_field :titulo %>
  </p>

  <p>
    <%= f.label :contenido %><br>
    <%= f.text_area :contenido %>
  </p>

  <p>
    <%= f.submit %>
  </p>
<% end %>
```

<p>En esta vista encontramos detalles importantes como por ejemplo la dirección a donde se enviará la información del formulario, en este caso colocamos 'publicacion_create_path'. Por otro lado vemos como el formulario tiene los campos de la publicación (titulo y contenido).</p>

<p>Luego crearemos una vista llamada 'new.html.erb' que contiene el formulario de la siguiente forma:</p>

```html
<h1>Nueva publicación</h1>
<%= render 'form' %>
```

Por último la vista principal que lista todas las publicaciones creadas: `index.html.erb`

```html
<table>
  <thead>
    <tr>
      <th>titulo</th>
      <th>contenido</th>
    </tr>
  </thead>

  <tbody>
    <% @publicaciones.each do |publicacion| %>
      <tr>
        <td><%= publicacion.titulo %></td>
        <td><%= publicacion.contenido %></td>
      </tr>
    <% end %>
  </tbody>
</table>

<%= link_to 'Nueva publicación', publicacion_new_path %>
```

<p>El resultado de estos controladores con sus respectivas vistas es un simple listado de publicaciones en <a href="http://localhost:3000/publicacion">http://localhost:3000/publicacion</a>:</p>

<p><img src="http://i.imgur.com/y0S2rrn.jpg?1" alt="foto" /></p>

<p>Y un formulario para insertar nuevas publicaciones <a href="http://localhost:3000/publicacion/new">http://localhost:3000/publicacion/new</a>:</p>

<p><img src="http://i.imgur.com/HvIrB2x.jpg?1" alt="foto" /></p>

<p>Este proceso para crear un vínculo con la base de datos y manipular los datos puede ser pesado, aún cuando Rails mapea automáticamente los objetos con la base de datos. Rails nos facilita aún mas esto si se trata de vista sencillas ya que cuenta con una herramienta de Scaffolding.</p>

<hr />

<h2>Vistas Dinámicas usando Scaffold</h2>

<p>Es una técnica bastante útil especialmente para desarrolladores principiantes, este comando te proporciona una sencilla interfaz a los datos de base de datos, es decir, Scaffold crea todo lo que hicimos anteriormente y muchas cosa más. Entre los beneficios que nos da este comando son los siguientes:</p>

<ul>
<li>Genera el modelo.</li>
<li>Genera las rutas automáticamente.</li>
<li>Se apega a los estándares de Rails.</li>
<li>Genera vistas y controlador del (CRUD):

<ul>
<li>Creación.</li>
<li>Modificación.</li>
<li>Eliminación.</li>
<li>Detalle del Objeto.</li>
<li>Listado de objetos.</li>
</ul></li>
</ul>

<p>Todo esto se genera con la siguiente linea de comando:</p>

```sh
$ rails generate scaffold post titulo:string contenido:text
```

<p>Con esta línea estamos creando un objeto "post" con dos atributos ('titulo' y 'contenido') al igual que cuando creamos "publicacion" esta linea de comando genera lo siguiente:</p>

```sh
invoke  active_record
   create    db/migrate/20130725032950_create_posts.rb
   create    app/models/post.rb
   invoke    test_unit
   create      test/models/post_test.rb
   create      test/fixtures/posts.yml
   invoke  resource_route
    route    resources :posts
   invoke  scaffold_controller
   create    app/controllers/posts_controller.rb
   invoke    erb
   create      app/views/posts
   create      app/views/posts/index.html.erb
   create      app/views/posts/edit.html.erb
   create      app/views/posts/show.html.erb
   create      app/views/posts/new.html.erb
   create      app/views/posts/_form.html.erb
   invoke    test_unit
   create      test/controllers/posts_controller_test.rb
   invoke    helper
   create      app/helpers/posts_helper.rb
   invoke      test_unit
   create        test/helpers/posts_helper_test.rb
   invoke    jbuilder
   create      app/views/posts/index.json.jbuilder
   create      app/views/posts/show.json.jbuilder
   invoke  assets
   invoke    coffee
   create      app/assets/javascripts/posts.js.coffee
   invoke    scss
   create      app/assets/stylesheets/posts.css.scss
   invoke  scss
identical    app/assets/stylesheets/scaffolds.css.scss
```

<p>El comando para revertir y destruir un scaffold es igual de simple:</p>

```sh
$ rails destroy scaffold post
```

<p>Si ejecutaron la línea de comando para generar el Scaffold y ejecutaron el comando para migrar los objetos a la base de datos antes mencionado ('rake db:migrare'), podrán ver como el framework por arte de magia les crea todo el CRUD (crear, leer, modificar y eliminar según sus siglas en ingles) incluso con validaciones y mensajes de error. Si ejecutaron la línea de comando creándolo con el nombre 'post' pueden revisar la magia en <a href="http://localhost:3000/posts">http://localhost:3000/posts</a></p>

<hr />

<h2>Conclusión</h2>

<p>En esta lección conocimos las formas de cómo interactúa el framworks con la base de datos, pasando por las tres capas (modelo - vista - controlador).</p>

<p>Aprendimos a generar esta interacción desde cero generando nosotros mismos nuestros modelos, controladores y vistas (aunque es más tedioso es mi recomendación para crear modelos complejos) y conocimos las ventajas de utilizar Scaffold como herramienta para facilitar esta interacción.</p>

<p>No dude en hacernos saber sus dudas y comentarios en la sección de comentarios y además espero que te unas a nuestra comunidad y revises nuestros otros cursos.</p>

<p>¡Hasta el próximo capítulo!</p>
