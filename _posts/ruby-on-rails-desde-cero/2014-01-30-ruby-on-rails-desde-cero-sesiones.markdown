---
layout: post
status: publish
published: true
title: Sesiones
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
wordpress_id: 2959
wordpress_url: http://codehero.co/?p=2959
date: 2014-01-30 00:10:00.000000000 -04:30
serie: Ruby on Rails desde Cero
description: Capítulo numero 15 de la serie Ruby on Rails desde Cero, donde aprenderemos sobre sesiones, como crearlas y destruirlas para guardar el estado de un usuario
categories:
- Cursos
- Ruby on Rails
tags:
- Cursos
- Ruby on Rails
- Sesiones
---
Las series de cursos Ruby on Rails en CodeHero buscan otorgarte los conocimientos necesarios, para que puedas desarrollar tus propias aplicaciones Web. En el capítulo anterior aprendimos como se generan los controladores para la aplicación, que representan los métodos en nuestros controladores y cómo se leen parámetros ya sean en el URL o enviados por POST dentro de un formulario.

En este nuevo capítulo aprenderemos como funcionan las sesiones dentro de Rails y así poder preservar el estado de conexión de un usuario que se encuentre utilizando nuestra aplicación.

* * *

## ¿Qué son sesiones?

Las sesiones en una aplicación web se refieren a la asociación entre distintas peticiones HTTP realizadas por un usuario. Dicha asociación es realizada mediante el almacenamiento de un identificador único que a su vez es almacenado en el servidor y permite ser consultado entre peticiones. Debemos recordar que el protocolo HTTP no conserva un estado, cosa que imposibilita asociar diferentes peticiones HTTP y es por esta razón que surgen las sesiones.

Las sesiones dentro de Rails se encuentran dentro de la gema `actionpack`. Esta gema se instala automáticamente cuando instalamos Rails, pero si la quisiéramos instalar independientemente en un proyecto Sinatra basta con agregarla al `Gemfile` o ejecutar el comando `gem install actionpack`. Cabe destacar que las sesiones en Rails se utilizan en el controlador y vistas.

* * *

## Utilizando Sesiones en Rails

Para esta pequeña introducción a las sesiones de Rails vamos a crear una tabla usuarios en base de datos la cual tendrá los siguientes campos:

- email: con un tipo de dato `string`.
- password: con un tipo de dato `string`.
- remember_session: con un tipo de dato `string`.

Vamos a crear el modelo llamado `Users` con los campos antes descritos.

```sh
$ rails g model User email:string password:string remember_session:string
```

Una vez que tengamos esto debemos realizar la migración para que nuestra tabla sea creada en base de datos.

> Debemos tener en cuenta que este proyecto es completamente nuevo y utiliza cualquier tipo de base de datos que deseen (SQLite, MariaDB o Postgres) por lo general y si no modificaron el databases.yml trabajaremos sobre SQLite.

```sh
$ rake db:create
$ rake db:migrate
```

Agregamos un usuario a base de datos mediante el `rails console` para no tener que crear un formulario de crear usuario ya que queremos evitar el scaffolding en este curso.

```sh
@user = User.create(email: "alberto@codehero.com", password: "hola")
```

Luego y posterior a tener el modelo con la tabla de base de datos debemos crear un controlador para manejar las sesiones de nuestra aplicación, puede tener el nombre que deseen. Por convención lo crearemos con el nombre `Sessions` en ingles, y crearemos únicamente los métodos necesarios `(new, create, destroy)`

```sh
$ rails g controller Sessions new create destroy
```

Posterior a lo que hemos realizado debemos crear las rutas para que el usuario pueda acceder a dichas funciones de la aplicación.

```ruby
  resources :sessions, only: [:new, :create, :destroy]
  get '/signin',  to: 'sessions#new'
  get '/signout', to: 'sessions#destroy'
```

Creamos un recurso llamado `:sesions` que tiene únicamente los métodos `new`, `create`, `destroy`. y además un par de rutas particulares de tipo **get** para utilizar los métodos `new` y `destroy` que se encuentran bajo el nombre de `/signin` para iniciar sesión y `signout` para destruir la sesión.

Agregamos a el archivo `app/views/sessions/new.html.erb` el siguiente formulario.

```ruby
<%= form_for(:session, url: sessions_path) do |f| %>

  <%= f.label :email %>
  <%= f.text_field :email %>

  <%= f.label :password %>
  <%= f.password_field :password %>

  <%= f.label "Remember me" %>
  <%= f.check_box :remember_session %>

  <%= f.submit "Iniciar sesión" %>
<% end %>
```

El formulario contiene todos los atributos existentes en nuestra base de datos en conjunto con sus etiquetas (labels).

Dentro del controlador de sesiones que creamos previamente y se encuentran vacíos, les agregaremos a los métodos `create` y `destroy` el siguiente contenido:

```ruby
class SessionsController < ApplicationController
  def new
  end

  def create
    if user = User.find_by(params[:username], params[:password])
      session[:current_user_id] = user.id
      redirect_to root_url
    else
      render 'new'
    end
  end

  def destroy
    # Remove the user id from the session
    @_current_user = session[:current_user_id] = nil
    redirect_to root_url
  end
end
```

Esto quiere decir que cuando el usuario se encuentre en el formulario de `app/views/sessions/new.html.erb` y presione el botón de `submit` para enviar la petición, la misma llegará a el controlador de `SessionsController` específicamente el método `create` el cual creará una sesión con el identificador que se encuentre base de datos para ese usuario y lo redireccionara a la pantalla principal de la aplicación indicando que el mismo se encuentra en sesión, de lo contrario recargará la página con el formulario. Luego encontramos el método `destroy` que se encarga de cerrar la sesión del usuario acceda al URL `/signout` asignandole el valor `nil` a la sesión existente para ese usuario.

Dentro del controlador principal de nuestra aplicación `ApplicationController` crearemos un método privado llamado `current_user`.

```ruby
class ApplicationController < ActionController::Base

  private

  def current_user
    @_current_user ||= session[:current_user_id] &&
      User.find_by(id: session[:current_user_id])
  end
end
```

El método `current_user` es empleado para guardar el usuario que se encuentra en sesión y mediante este método podemos realizar consultas para impedir que un usuario modifique los datos personales de otro, almacenar en base de datos la persona que está realizando operaciones dentro de la aplicación, agregar items al carro de compra del usuario, etc...

De esta manera y con estos simples pasos hemos creado una sesión de usuario para el manejo del estado de conexiones dentro de nuestra aplicación, a esto se le pueden agregar otras funciones más que pueden ser activadas mediante filtros/acciones tales como conocer si el usuario que está realizando una petición se encuentra en sesión o no para permitirle realizar ciertas acciones.

* * *

## Conclusión.

En esta lección aprendimos a utilizar el controlador de Rails para crear y destruir sesiones de usuario. Creamos un modelo de usuario, un controlador de sesiones y las rutas necesarias para poder acceder a las funciones dentro de nuestro controlador de sesiones. Todo esto con la finalidad de preservar el estado/acciones que realice el usuario dentro de nuestra aplicación. El próximo capítulo hablaremos sobre cookies y flashes para alertar al usuario. Siéntanse libres en consultar cualquier duda a través de los comentarios.

¡Hasta el próximo capítulo!
