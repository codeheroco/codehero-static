---
layout: post
status: publish
published: true
title: Internacionalización
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
wordpress_id: 3068
wordpress_url: http://codehero.co/?p=3068
date: 2014-02-27 01:41:42.000000000 -04:30
categories:
- Cursos
- Ruby on Rails
tags:
- Ruby
- Ruby on Rails
- Internacionalización
---
<p>Las series de cursos Ruby on Rails en CodeHero buscan otorgarte los conocimientos necesarios, para que puedas desarrollar tus propias aplicaciones Web. En el capítulo anterior aprendimos como se generan los controladores para la aplicación, que representan los métodos en nuestros controladores y cómo se leen parámetros ya sean en el URL o enviados por POST dentro de un formulario.</p>

<p>En este nuevo capítulo aprenderemos de manera sencilla como internacionalizar nuestras aplicaciones para que funcionen en múltiples idiomas.</p>

<hr />

<h2>Archivos de Lenguaje</h2>

<p>Dentro de todos los proyectos Rails existen archivos y configuraciones que permiten hacer uso de la librería <code>i18n</code> (Internationalization) de Ruby que está contenida dentro de la librería <code>activesupport</code> una de las tantas dependencias de Rails que permite entre tantas cosas realizar aplicaciones en múltiples idiomas. Para poder hacer uso de las propiedades de las librerías antes descritas, debemos hacer uso de unos archivos particulares que se encuentran en una carpeta llamada <code>locales</code> y agregar información a unos archivos con extensión <code>.rb</code> o <code>.yml</code>.</p>

<h3>¿Donde se encuentra esta carpeta?</h3>

<p>Nuestra carpeta y archivos para realizar las traducciones se encuentran en la dentro de la carpeta <code>config</code> ubicada en la raíz del proyecto y en la subcarpeta <code>locales</code>.</p>

<pre lang="html">.
├── app
│   ├── bundle
│   ├── rails
│   └── rake
├── config
│   ├── application.rb
│   ├── boot.rb
│   ├── database.yml
│   ├── environment.rb
│   ├── environments
│   │   ├── development.rb
│   │   ├── production.rb
│   │   └── test.rb
│   ├── initializers
│   │   ├── backtrace_silencers.rb
│   │   ├── filter_parameter_logging.rb
│   │   ├── inflections.rb
│   │   ├── mime_types.rb
│   │   ├── secret_token.rb
│   │   ├── session_store.rb
│   │   └── wrap_parameters.rb
│   ├── locales                # aquí está nuestra carpeta.
│   │   └── en.yml             # archivo de traducciones en inglés.
│   └── routes.rb
├── config.ru
├── db
</pre>

<p>Todos los archivos que agreguemos en esa carpeta que tengan extensiones <code>.rb</code> o <code>.yml</code> funcionarán automáticamente.</p>

<h3>¿Qué contiene el archivo en.yml?</h3>

<p>Este archivo contiene una serie de instrucciones que nos enseña a través de ejemplos como lograr que nuestras traducciones funcionen correctamente utilizando los <em>helpers</em> de Rails.</p>

<pre lang="html"># Files in the config/locales directory are used for internationalization
# and are automatically loaded by Rails. If you want to use locales other
# than English, add the necessary files in this directory.
#
# To use the locales, use `I18n.t`:
#
#     I18n.t 'hello'
#
# In views, this is aliased to just `t`:
#
#     <%= t('hello') %>
#
# To use a different locale, set it with `I18n.locale`:
#
#     I18n.locale = :es
#
# This would use the information in config/locales/es.yml.
#
# To learn more, please read the Rails Internationalization guide
# available at http://guides.rubyonrails.org/i18n.html.

en:
  hello: "Hello world"
</pre>

<p>Sencillo, ¿cierto?, Ahora cambiemos el idioma por defecto de Rails.</p>

<h3>¿Cómo cambiar el idioma por defecto?</h3>

<p>El idioma por defecto de casi todo lo que existe es el Inglés ya que podríamos decir que es el idioma universal. Para cambiar el idioma por defecto a español debemos realizar lo siguiente:</p>

<p>Ir a la carpeta <code>config</code> y abrir el archivo <code>application.rb</code>.</p>

<pre lang="ruby">require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(:default, Rails.env)

module Lolapp
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    config.i18n.default_locale = :es
  end
end
</pre>

<p>Debemos borrar el carácter <code>#</code> de comentario la última línea del archivo y debemos cambiar el término <code>:de</code> por <code>:es</code> y reiniciar el servidor de Rails si estaba corriendo. Es decir volver a ejecutar <code>rails s</code>.</p>

<p>Luego de esto podemos copiar el archivo <code>en.yml</code> de la carpeta <code>config/locales</code> y cambiarle el nombre a <code>es.yml</code>, siempre dejando el archivo en inglés.</p>

<pre lang="sh">$ cp config/locales/en.yml config/locales/es.yml
</pre>

<p>Esto nos permitirá tener una base de trabajo para realizar las traducciones en inglés y en español.</p>

<p>Algo que debemos recordar es que si queremos tener los archivos de idiomas en otra carpeta que no sea la antes descrita, debemos indicarle a Rails cual será esta carpeta y la extensión de los archivos que maneja. Para realizar esto debemos borrar el carácter de comentario <code>#</code> y modificar la penultima línea del mismo archivo application.rb.</p>

<pre lang="ruby"># The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
</pre>

<p>Ahora para lograr que estos archivos entren en funcionamiento debemos agregarlos a las rutas.</p>

<h3>¿Cómo agregar el idioma a las rutas?</h3>

<p>Para agregar el idioma primero, debemos crear un scaffold para tener una ruta o podemos utilizar un proyecto que tengamos. Para esta prueba vamos a crear un scaffold de ventas:</p>

<pre lang="sh">$ rails g scaffold Sales precio:string nombre:string
</pre>

<p>Luego corremos las migraciones <code>bundle exec rake db:migrate</code> una vez que tengamos todo en orden procedemos a agregar al controlador principal de nuestra aplicación <code>application_controller.rb</code> las siguientes líneas:</p>

<pre lang="ruby">before_action :set_locale

def set_locale
  I18n.locale = params[:locale] || I18n.default_locale
end

def default_url_options(options={})
  { locale: I18n.locale }
end
</pre>

<p>¿Que hacen estas líneas que agregamos?</p>

<p>La primera línea permite entregar antes de cualquier acción que solicitemos a la aplicación asignar o a leer el parámetro <code>locale</code> que viene en el url; esto se hace a través del método <code>set_locale</code>. Las líneas restantes representados en el método <code>default_url_options</code> son las que agregan de manera centralizada el parámetro <code>en</code> o <code>es</code> a nuestro url.</p>

<p>Una vez que tenemos la base para agregar el idioma al URL debemos elegir como queremos estilar nuestro dicho URL:</p>

<ul>
<li>Queremos que tenga <code>localhost:3000/sales?locale=es</code></li>
<li>Queremos que sea más limpio, algo cómo <code>localhost:300/es/sales</code></li>
</ul>

<p>Si nos importa la legibilidad del URL aplicamos la segunda opción, y esto lo logramos de la siguiente manera:</p>

<p>En el archico <code>config/routes.rb</code> vamos a buscar nuestra ruta <code>resources: sales</code> y le vamos a agregar lo siguiente.</p>

<pre lang="ruby">scope "(:locale)", locale: /es|en/ do
  resources :sales
end
</pre>

<p>Esto nos permitirá tener el <code>locale</code> <code>/es/</code> opcional en nuestro URL, si no lo agregamos la ruta funcionará normalmente pero agarrará el el idioma por defecto que es castellano. De igual manera funcionará la ruta si agregamos <code>/es/</code> o cambiará el idioma si agregamos <code>/en/</code>.</p>

<p>Cómo últimas etapas debemos agregar contenido a nuestros archivos de locales.</p>

<h3>Lazy Lookup vs Full path</h3>

<p>Vamos a agregar el contenido a los archivos <code>en.yml</code> y <code>es.yml</code>.</p>

<p>En nuestro archivo <code>es.yml</code>:</p>

<pre lang="yml">es:
  sales:
    index:
      title: "Listado de Ventas"
</pre>

<p>En nuestro archivo <code>en.yml</code>:</p>

<pre lang="yml">en:
  sales:
    index:
      title: "Listing of Sales"
</pre>

<p>Lo que estamos diciendo aquí; por una cuestión de orden y a su vez para que funcione el Lazy Lookup es:</p>

<p>En la capeta de las vistas <code>app/views/</code> vas a buscar una carpeta llamada <code>sales</code> y luego el archivo <code>index</code> dentro de ese archivo hay un título (<code>title</code>) y va a llevar el siguiente contenido <code>"Listing of Sales"</code> o <code>"Listado de Ventas"</code> dependiendo del idioma.</p>

<p>Si ahora vamos a la vista antes descrita y agregamos en la primera línea lo siguiente:</p>

<pre lang="html"><%= t '.title' %>
</pre>

<p>Luego podremos observar que al ir al siguiente URL <code>http://localhost:3000/es/sales</code> o <code>http://localhost:3000/en/sales</code> el título cambia de idioma.</p>

<p>Lo que estamos realizado con el código en la vista es utilizar el helper <code>t</code> que indica que debe ir a buscar en los archivos de locale la traducción con nombre <code>title</code> que corresponda al archivo <code>views/sales/index.erb.html</code>.</p>

<p>Eso que acabamos de hacer es Lazy Lookup ya que no estamos especificando la ruta completa a la traducción que estamos solicitando y por esta razón es tan importante tener estos archivos muy ordenados.</p>

<p>Si quisiéramos poner la traducción con la ruta completa o full path, también pusiésemos realizándolo de la siguiente manera:</p>

<pre lang="ruby"><%= t 'sales.index.title' %>
</pre>

<p>En caso de querer tener un orden personalizado las rutas completas funcionarían perfectamente.</p>

<hr />

<h2>Conclusión.</h2>

<p>En esta lección aprendimos a utilizar una de las propiedades de <code>activesupport</code> en particular para el uso de i18n o internacionalización de nuestras aplicaciones. En el próximo capítulo estaremos hablando un poco más de las funcionalidad de la librería <code>activesupport</code> de Rails. Siéntanse libres en consultar cualquier duda a través de los comentarios.</p>

<p>¡Hasta el próximo capítulo!</p>
