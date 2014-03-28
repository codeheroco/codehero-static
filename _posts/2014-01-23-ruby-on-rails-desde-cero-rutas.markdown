---
layout: post
status: publish
published: true
title: Rutas
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
wordpress_id: 2936
wordpress_url: http://codehero.co/?p=2936
date: 2014-01-23 00:10:40.000000000 -04:30
categories:
- Ruby on Rails
tags:
- Ruby
- Cursos
- Ruby on Rails
- curso
- rutas
---
<p>Las series de cursos Ruby on Rails en CodeHero buscan otorgarte los conocimientos necesarios, para que puedas desarrollar tus propias aplicaciones Web. En el capítulo anterior aprendimos como se generan los controladores para la aplicación, que representan los métodos en nuestros controladores y cómo se leen parámetros ya sean en el URL o enviados por POST dentro de un formulario.</p>

<p>En este nuevo capítulo aprenderemos como funciona el enrutador de Rails para crear rutas simples, anidadas, namespaces y a utilizar los helpers para acceder a las rutas mediante código.</p>

<hr />

<h2>¿Qué son las Rutas y donde se encuentran?</h2>

<p>Las rutas representan la relación que existe entre de funciones (mostrar, agregar, eliminar, etc.) dentro de nuestra aplicación y un verbo HTTP (GET, POST, PUT, etc.). en palabras más sencillas un URL ejecuta una función dentro de la aplicación cuando se realiza una petición HTTP. En Rails las rutas se encuentran representadas en un archivo llamado <code>routes.rb</code> éste archivo contiene toda la información antes descrita.</p>

<h3>¿Cómo funcionan?</h3>

<p>Cuando el usuario accede a un <a href="http://en.wikipedia.org/wiki/Uniform_resource_locator">URL</a> esta petición llega al enrutador (archivo <code>routes.rb</code>) y posteriormente este despacha la petición al controlador adecuado usando el verbo HTTP correspondiente para ejecutar la acción requerida. La acción es una función dentro del controlador.</p>

<hr />

<h2>¿Cómo podemos ver las rutas que tenemos actualmente?</h2>

<p>Cuando desarrollamos una aplicación y tenemos múltiples rutas podemos hacer uso de la tarea <em>routes</em> dentro del <code>Rakefile</code> que contiene Rails. Para ejecutar esta tarea se utiliza el siguiente comando: <code>rake routes</code> que nos imprime el siguiente contenido:</p>

<pre>$ bundle exec rake routes
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
</pre>

<hr />

<h2>Recursos de rutas.</h2>

<p>En esta sección haremos una breve descripción de los elementos más comunes encontrados dentro del archivo <code>routes.rb</code> e incluiremos un ejemplo de cada elemento.</p>

<h3>root</h3>

<p>El elemento <em>"root"</em> dentro del archivo <code>routes.rb</code> es el que representa la ruta base para la aplicación o también puede representar la ruta base para un <em>namespace</em>.</p>

<p>La manera de declarar este elemento dentro del archivo es la siguiente:</p>

<pre>Codeheroapp::Application.routes.draw do
  root 'publicacions#index'
end
</pre>

<p>Aquí estamos utilizando una ruta existente en nuestra aplicación e indicando que la función <em>index</em> dentro del controlador <em>publicacions</em> será la página principal de dicha aplicación es decir <code>/</code>.</p>

<p>Podemos ver como está representada esta ruta cuando ejecutamos la tarea routes del Rakefile.</p>

<pre>$ bundle exec rake routes
    Prefix Verb   URI Pattern         Controller#Action
    root   GET      /                 publicacions#index
</pre>

<h3>rutas individuales.</h3>

<p>Para declarar una ruta individual debemos tener presente lo siguiente:</p>

<ul>
<li>Primero debemos saber que verbo HTTP vamos a utilizar (get, put, post, delete o patch).</li>
<li>Segundo, elegir la ruta que deseemos.</li>
<li>Tercero, que controlador y que método queremos accionar con esta ruta.</li>
<li>Cuarto, Decidir si le vamos a colocar un alias a la ruta o no.</li>
</ul>

<p>Si quisiéramos crear una ruta a una función mostrar, dentro del controlador de productos, y que la misma mostrara un (1) solo producto bajo el nombre <em>"produ"</em> haríamos lo siguiente:</p>

<pre>Codeheroapp::Application.routes.draw do
  get '/productos/:id', to: 'productos#mostrar', as: 'produ'
end
</pre>

<p>En este ejemplo utilizamos el verbo HTTP, get; elegimos la ruta <code>productos/:id</code> como la ruta a utilizar, le indicamos a que método y que controlador dirigirse, y agregamos el alias <code>produ</code>.</p>

<p>Así se ve esta ruta cuando corremos <code>rake routes</code>:</p>

<pre>Prefix Verb   URI Pattern                      Controller#Action
produ GET    /productos/:id(.:format)               productos#mostrar
</pre>

<p>Si ahora quisiéramos crear un producto:</p>

<pre>Codeheroapp::Application.routes.draw do
  get '/productos/:id', to: 'productos#mostrar', as: 'produ'
  post '/productos', to: 'productos#create'
end
</pre>

<h3>resource</h3>

<p>Un resource o recurso es una colección predefinida de todas las posibles funciones que por defecto que posee un controlador en Ruby, es decir, cuando utilizamos un <em>scaffold</em> para crear un controlador, modelo y vistas relacionadas a un recurso tal como <em>"usuario"</em>; este creará dentro del controlador todas las funciones conocidas como CRUD, y el resource combina y genera todas las rutas necesarias para poder acceder a dichos recursos.</p>

<p>Un resource se ve de la siguiente manera en el archivo <code>routes.rb</code>:</p>

<pre>Codeheroapp::Application.routes.draw do
  resources :publicacions
end
</pre>

<p>Así se ve cuando utilizamos el comando <code>rake routes</code>:</p>

<pre>Prefix Verb   URI Pattern                                           Controller#Action
          publicacions GET    /publicacions(.:format)                publicacions#index
                       POST   /publicacions(.:format)                publicacions#create
       new_publicacion GET    /publicacions/new(.:format)            publicacions#new
      edit_publicacion GET    /publicacions/:id/edit(.:format)       publicacions#edit
           publicacion GET    /publicacions/:id(.:format)            publicacions#show
                       PATCH  /publicacions/:id(.:format)            publicacions#update
                       PUT    /publicacions/:id(.:format)            publicacions#update
                       DELETE /publicacions/:id(.:format)            publicacions#destroy
</pre>

<p>Puede apreciar que se están empleando todos los métodos existentes dentro del controlador <em>PublicacionsController</em>.</p>

<h4>nested resource</h4>

<p>Un <em>nested resource</em> o recurso anidado no es más que un conjunto de recursos que dependen uno del otro. Por lo general se utilizan cuando se emplea una tabla de uno a muchos, de tal manera que podemos decir que: un usuario tiene muchas publicaciones.</p>

<p>Realicemos un recurso anidado:</p>

<pre>resources :users do
  resources :publicacions
end
</pre>

<p>Las rutas se ven de la siguiente manera:</p>

<pre>Prefix Verb   URI Pattern                                           Controller#Action
          user_publicacions GET    /users/:user_id/publicacions(.:format)                publicacions#index
                            POST   /users/:user_id/publicacions(.:format)                publicacions#create
       new_user_publicacion GET    /users/:user_id/publicacions/new(.:format)            publicacions#new
      edit_user_publicacion GET    /users/:user_id/publicacions/:id/edit(.:format)       publicacions#edit
           user_publicacion GET    /users/:user_id/publicacions/:id(.:format)            publicacions#show
                            PATCH  /users/:user_id/publicacions/:id(.:format)            publicacions#update
                            PUT    /users/:user_id/publicacions/:id(.:format)            publicacions#update
                            DELETE /users/:user_id/publicacions/:id(.:format)            publicacions#destroy
</pre>

<p>Debemos tener presente que se pueden anidar múltiples recursos pero esto aumenta la complejidad de las cosas y puede llegar a ser sumamente complicado trabajar con múltiples recursos anidados.</p>

<h3>namespace</h3>

<p>Los namespaces o nombres de dominio y son mayormente utilizados para generar rutas como la de administración; con esto nos referimos a que se puede agregar un <em>slug</em> <code>/admin/</code> a una ruta.</p>

<p>Para que un namespace funcione debemos crear una carpeta con el nombre del namespace dentro de la carpeta de controladores y agregar los resources que queramos que tenga dicho namespace.</p>

<pre>namespace :admin do
  root 'base#index'

  resources :users do
    resources :publicacions
  end
end
</pre>

<p>Al utilizar el comando <code>rake routes</code> obtenemos el siguiente resultado:</p>

<pre>Prefix Verb   URI Pattern                                           Controller#Action
                 admin_root GET    /admin(.:format)                                      admin/base#index
    admin_user_publicacions GET    /admin/users/:user_id/publicacions(.:format)          admin/publicacions#index
                            POST   /admin/users/:user_id/publicacions(.:format)          admin/publicacions#create
 new_admin_user_publicacion GET    /admin/users/:user_id/publicacions/new(.:format)      admin/publicacions#new
edit_admin_user_publicacion GET    /admin/users/:user_id/publicacions/:id/edit(.:format) admin/publicacions#edit
     admin_user_publicacion GET    /admin/users/:user_id/publicacions/:id(.:format)      admin/publicacions#show
                            PATCH  /admin/users/:user_id/publicacions/:id(.:format)      admin/publicacions#update
                            PUT    /admin/users/:user_id/publicacions/:id(.:format)      admin/publicacions#update
                            DELETE /admin/users/:user_id/publicacions/:id(.:format)      admin/publicacions#destroy
</pre>

<h3>Path and URL Helpers</h3>

<p>Una vez que hayamos creado todos estos recursos, rutas individuas o namespaces, tenemos unas funciones que se generan automáticamente que nos permiten conocer las rutas de manera dinámica. Si vamos al ejemplo anterior podemos ver que todas las listas de rutas que aquí vemos presentan una columna llamada <em>"Prefix"</em> la cual nos indica como debemos llamar a la ruta en nuestro código para hacer uso de la misma.</p>

<p>por ejemplo si quisiéramos acceder a la ruta principal del panel administrativo haríamos lo siguiente, abramos el <em>Rails console</em> utilizando el comando <code>rails c</code> y escribamos lo siguiente:</p>

<pre>> app.admin_root_path
=> "/admin"
</pre>

<p>Si ahora quisiéramos verificar la ruta a un elemento en la base de datos de publicación con <code>id: 1</code>:</p>

<pre>> app.publicacion_path(id: 1)
=> "/publicacions/1"
</pre>

<p>Lo que debemos destacar de esto es que para poder utilizar cualquier ruta dentro de nuestra aplicación solo debemos utilizar el comando <code>rake routes</code> para descubrir el <em>"Prefix"</em> de la ruta y luego anexar la palabra <em>"path"</em> al final de la misma.</p>

<hr />

<h2>Conclusión.</h2>

<p>En esta lección aprendimos a utilizar el controlador de Rails para crear rutas simples utilizando los verbos HTTP. Resources para crear las rutas de un CRUD completo, también a como crear rutas anidadas para tablas de uno (1) a muchos, a como utilizar namespaces para hacer secciones administrativas y como utilizar los helpers que nos provee rails para poder acceder a las rutas mediante código. El próximo capítulo volveremos con la última parte de Controladores. Siéntanse libres en consultar cualquier duda a través de los comentarios.</p>

<p>¡Hasta el próximo capítulo!</p>
