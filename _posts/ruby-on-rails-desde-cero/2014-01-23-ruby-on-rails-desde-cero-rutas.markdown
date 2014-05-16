---
layout: post
status: publish
published: true
title: Rutas
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
date: 2014-01-23 00:10:40.000000000 -04:30
serie: Ruby on Rails desde Cero
description: Capítulo número 14 de la serie de Ruby on Rails desde Cero, donde hablamos sobre Rutas y enrutamiento, haciendo uso de resources anidados y namespaces.
dificultad: Aprendiz
duracion: 35
categories:
- Ruby on Rails
- Cursos
tags:
- Ruby
- Ruby on Rails
- rutas
- Routes
- Nested
---
Las series de cursos Ruby on Rails en CodeHero buscan otorgarte los conocimientos necesarios, para que puedas desarrollar tus propias aplicaciones Web. En el capítulo anterior aprendimos como se generan los controladores para la aplicación, que representan los métodos en nuestros controladores y cómo se leen parámetros ya sean en el URL o enviados por POST dentro de un formulario.

En este nuevo capítulo aprenderemos como funciona el enrutador de Rails para crear rutas simples, anidadas, namespaces y a utilizar los helpers para acceder a las rutas mediante código.

* * *

## ¿Qué son las Rutas y donde se encuentran?

Las rutas representan la relación que existe entre de funciones (mostrar, agregar, eliminar, etc.) dentro de nuestra aplicación y un verbo HTTP (GET, POST, PUT, etc.). en palabras más sencillas un URL ejecuta una función dentro de la aplicación cuando se realiza una petición HTTP. En Rails las rutas se encuentran representadas en un archivo llamado `routes.rb` éste archivo contiene toda la información antes descrita.

### ¿Cómo funcionan?

Cuando el usuario accede a un [URL](http://en.wikipedia.org/wiki/Uniform_resource_locator) esta petición llega al enrutador (archivo `routes.rb`) y posteriormente este despacha la petición al controlador adecuado usando el verbo HTTP correspondiente para ejecutar la acción requerida. La acción es una función dentro del controlador.

* * *

## ¿Cómo podemos ver las rutas que tenemos actualmente?

Cuando desarrollamos una aplicación y tenemos múltiples rutas podemos hacer uso de la tarea *routes* dentro del `Rakefile` que contiene Rails. Para ejecutar esta tarea se utiliza el siguiente comando: `rake routes` que nos imprime el siguiente contenido:

```sh
$ bundle exec rake routes
                Prefix Verb   URI Pattern                            Controller#Action
          publicacions GET    /publicacions(.:format)                publicacions#index
                       POST   /publicacions(.:format)                publicacions#create
       new_publicacion GET    /publicacions/new(.:format)            publicacions#new
      edit_publicacion GET    /publicacions/:id/edit(.:format)       publicacions#edit
           publicacion GET    /publicacions/:id(.:format)            publicacions#show
                       PATCH  /publicacions/:id(.:format)            publicacions#update
                       PUT    /publicacions/:id(.:format)            publicacions#update
                       DELETE /publicacions/:id(.:format)            publicacions#destroy
          usuarios_new GET    /usuarios/new(.:format)                usuarios#new
        usuarios_index GET    /usuarios/index(.:format)              usuarios#index
                 login GET    /login(.:format)                       session#create
            admin_root GET    /admin(.:format)                       admin/base#index
           admin_users GET    /admin/users(.:format)                 admin/users#index
                       POST   /admin/users(.:format)                 admin/users#create
        new_admin_user GET    /admin/users/new(.:format)             admin/users#new
       edit_admin_user GET    /admin/users/:id/edit(.:format)        admin/users#edit
            admin_user GET    /admin/users/:id(.:format)             admin/users#show
                       PATCH  /admin/users/:id(.:format)             admin/users#update
                       PUT    /admin/users/:id(.:format)             admin/users#update
                       DELETE /admin/users/:id(.:format)             admin/users#destroy
    admin_publicacions GET    /admin/publicacions(.:format)          admin/publicacions#index
                       POST   /admin/publicacions(.:format)          admin/publicacions#create
 new_admin_publicacion GET    /admin/publicacions/new(.:format)      admin/publicacions#new
edit_admin_publicacion GET    /admin/publicacions/:id/edit(.:format) admin/publicacions#edit
     admin_publicacion GET    /admin/publicacions/:id(.:format)      admin/publicacions#show
                       PATCH  /admin/publicacions/:id(.:format)      admin/publicacions#update
                       PUT    /admin/publicacions/:id(.:format)      admin/publicacions#update
                       DELETE /admin/publicacions/:id(.:format)      admin/publicacions#destroy
                  root GET    /                                      publicacions#index
```

* * *

## Recursos de rutas.

En esta sección haremos una breve descripción de los elementos más comunes encontrados dentro del archivo `routes.rb` e incluiremos un ejemplo de cada elemento.

### root

El elemento *"root"* dentro del archivo `routes.rb` es el que representa la ruta base para la aplicación o también puede representar la ruta base para un *namespace*.

La manera de declarar este elemento dentro del archivo es la siguiente:

```ruby
Codeheroapp::Application.routes.draw do
  root 'publicacions#index'
end
```

Aquí estamos utilizando una ruta existente en nuestra aplicación e indicando que la función *index* dentro del controlador *publicacions* será la página principal de dicha aplicación es decir `/`.

Podemos ver como está representada esta ruta cuando ejecutamos la tarea routes del Rakefile.

```sh
$ bundle exec rake routes
    Prefix Verb   URI Pattern         Controller#Action
    root   GET      /                 publicacions#index
```

### rutas individuales.

Para declarar una ruta individual debemos tener presente lo siguiente:

  - Primero debemos saber que verbo HTTP vamos a utilizar (get, put, post, delete o patch).
  - Segundo, elegir la ruta que deseemos.
  - Tercero, que controlador y que método queremos accionar con esta ruta.
  - Cuarto, Decidir si le vamos a colocar un alias a la ruta o no.

Si quisiéramos crear una ruta a una función mostrar, dentro del controlador de productos, y que la misma mostrara un (1) solo producto bajo el nombre *"produ"* haríamos lo siguiente:

```ruby
Codeheroapp::Application.routes.draw do
  get '/productos/:id', to: 'productos#mostrar', as: 'produ'
end
```

En este ejemplo utilizamos el verbo HTTP, get; elegimos la ruta `productos/:id` como la ruta a utilizar, le indicamos a que método y que controlador dirigirse, y agregamos el alias `produ`.

Así se ve esta ruta cuando corremos `rake routes`:

```ruby
Prefix Verb   URI Pattern                      Controller#Action
produ GET    /productos/:id(.:format)               productos#mostrar
```

Si ahora quisiéramos crear un producto:

```ruby
Codeheroapp::Application.routes.draw do
  get '/productos/:id', to: 'productos#mostrar', as: 'produ'
  post '/productos', to: 'productos#create'
end
```



### resource

Un resource o recurso es una colección predefinida de todas las posibles funciones que por defecto que posee un controlador en Ruby, es decir, cuando utilizamos un *scaffold* para crear un controlador, modelo y vistas relacionadas a un recurso tal como *"usuario"*; este creará dentro del controlador todas las funciones conocidas como CRUD, y el resource combina y genera todas las rutas necesarias para poder acceder a dichos recursos.

Un resource se ve de la siguiente manera en el archivo `routes.rb`:

```ruby
Codeheroapp::Application.routes.draw do
  resources :publicacions
end
```

Así se ve cuando utilizamos el comando `rake routes`:

```sh

                Prefix Verb   URI Pattern                                           Controller#Action
          publicacions GET    /publicacions(.:format)                publicacions#index
                       POST   /publicacions(.:format)                publicacions#create
       new_publicacion GET    /publicacions/new(.:format)            publicacions#new
      edit_publicacion GET    /publicacions/:id/edit(.:format)       publicacions#edit
           publicacion GET    /publicacions/:id(.:format)            publicacions#show
                       PATCH  /publicacions/:id(.:format)            publicacions#update
                       PUT    /publicacions/:id(.:format)            publicacions#update
                       DELETE /publicacions/:id(.:format)            publicacions#destroy
```

Puede apreciar que se están empleando todos los métodos existentes dentro del controlador *PublicacionsController*.

#### nested resource

Un *nested resource* o recurso anidado no es más que un conjunto de recursos que dependen uno del otro. Por lo general se utilizan cuando se emplea una tabla de uno a muchos, de tal manera que podemos decir que: un usuario tiene muchas publicaciones.

Realicemos un recurso anidado:

```ruby
resources :users do
  resources :publicacions
end
```

Las rutas se ven de la siguiente manera:

```ruby

                     Prefix Verb   URI Pattern                                           Controller#Action
          user_publicacions GET    /users/:user_id/publicacions(.:format)                publicacions#index
                            POST   /users/:user_id/publicacions(.:format)                publicacions#create
       new_user_publicacion GET    /users/:user_id/publicacions/new(.:format)            publicacions#new
      edit_user_publicacion GET    /users/:user_id/publicacions/:id/edit(.:format)       publicacions#edit
           user_publicacion GET    /users/:user_id/publicacions/:id(.:format)            publicacions#show
                            PATCH  /users/:user_id/publicacions/:id(.:format)            publicacions#update
                            PUT    /users/:user_id/publicacions/:id(.:format)            publicacions#update
                            DELETE /users/:user_id/publicacions/:id(.:format)            publicacions#destroy
```

Debemos tener presente que se pueden anidar múltiples recursos pero esto aumenta la complejidad de las cosas y puede llegar a ser sumamente complicado trabajar con múltiples recursos anidados.

### namespace

Los namespaces o nombres de dominio y son mayormente utilizados para generar rutas como la de administración; con esto nos referimos a que se puede agregar un *slug* `/admin/` a una ruta.

Para que un namespace funcione debemos crear una carpeta con el nombre del namespace dentro de la carpeta de controladores y agregar los resources que queramos que tenga dicho namespace.

```ruby
namespace :admin do
  root 'base#index'

  resources :users do
    resources :publicacions
  end
end
```

Al utilizar el comando `rake routes` obtenemos el siguiente resultado:

```ruby

                     Prefix Verb   URI Pattern                                           Controller#Action
                 admin_root GET    /admin(.:format)                                      admin/base#index
    admin_user_publicacions GET    /admin/users/:user_id/publicacions(.:format)          admin/publicacions#index
                            POST   /admin/users/:user_id/publicacions(.:format)          admin/publicacions#create
 new_admin_user_publicacion GET    /admin/users/:user_id/publicacions/new(.:format)      admin/publicacions#new
edit_admin_user_publicacion GET    /admin/users/:user_id/publicacions/:id/edit(.:format) admin/publicacions#edit
     admin_user_publicacion GET    /admin/users/:user_id/publicacions/:id(.:format)      admin/publicacions#show
                            PATCH  /admin/users/:user_id/publicacions/:id(.:format)      admin/publicacions#update
                            PUT    /admin/users/:user_id/publicacions/:id(.:format)      admin/publicacions#update
                            DELETE /admin/users/:user_id/publicacions/:id(.:format)      admin/publicacions#destroy
```

### Path and URL Helpers

Una vez que hayamos creado todos estos recursos, rutas individuas o namespaces, tenemos unas funciones que se generan automáticamente que nos permiten conocer las rutas de manera dinámica. Si vamos al ejemplo anterior podemos ver que todas las listas de rutas que aquí vemos presentan una columna llamada *"Prefix"* la cual nos indica como debemos llamar a la ruta en nuestro código para hacer uso de la misma.

por ejemplo si quisiéramos acceder a la ruta principal del panel administrativo haríamos lo siguiente, abramos el *Rails console* utilizando el comando `rails c` y escribamos lo siguiente:

```ruby
> app.admin_root_path
=> "/admin"
```

Si ahora quisiéramos verificar la ruta a un elemento en la base de datos de publicación con `id: 1`:

```ruby
> app.publicacion_path(id: 1)
=> "/publicacions/1"
```

Lo que debemos destacar de esto es que para poder utilizar cualquier ruta dentro de nuestra aplicación solo debemos utilizar el comando `rake routes` para descubrir el *"Prefix"* de la ruta y luego anexar la palabra *"path"* al final de la misma.

* * *

## Conclusión.

En esta lección aprendimos a utilizar el controlador de Rails para crear rutas simples utilizando los verbos HTTP. Resources para crear las rutas de un CRUD completo, también a como crear rutas anidadas para tablas de uno (1) a muchos, a como utilizar namespaces para hacer secciones administrativas y como utilizar los helpers que nos provee rails para poder acceder a las rutas mediante código. El próximo capítulo volveremos con la última parte de Controladores. Siéntanse libres en consultar cualquier duda a través de los comentarios.

¡Hasta el próximo capítulo!
