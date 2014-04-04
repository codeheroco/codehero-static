---
layout: post
status: publish
published: true
title: Internacionalización
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
date: 2014-02-27 01:41:42.000000000 -04:30
serie: Ruby on Rails desde Cero
description: Capítulo número 16 de la serie Ruby on Rails desde Cero, donde hablamos sobre como internacionalizar la aplicación para que funcione en múltiples idiomas.
dificultad: Intermedio
duracion: 30
categories:
- Cursos
- Ruby on Rails
tags:
- Ruby
- Ruby on Rails
- Internacionalización
---
Las series de cursos Ruby on Rails en CodeHero buscan otorgarte los conocimientos necesarios, para que puedas desarrollar tus propias aplicaciones Web. En el capítulo anterior aprendimos como se generan los controladores para la aplicación, que representan los métodos en nuestros controladores y cómo se leen parámetros ya sean en el URL o enviados por POST dentro de un formulario.

En este nuevo capítulo aprenderemos de manera sencilla como internacionalizar nuestras aplicaciones para que funcionen en múltiples idiomas.

* * *

## Archivos de Lenguaje

Dentro de todos los proyectos Rails existen archivos y configuraciones que permiten hacer uso de la librería `i18n` (Internationalization) de Ruby que está contenida dentro de la librería `activesupport` una de las tantas dependencias de Rails que permite entre tantas cosas realizar aplicaciones en múltiples idiomas. Para poder hacer uso de las propiedades de las librerías antes descritas, debemos hacer uso de unos archivos particulares que se encuentran en una carpeta llamada `locales` y agregar información a unos archivos con extensión `.rb` o `.yml`.

### ¿Donde se encuentra esta carpeta?

Nuestra carpeta y archivos para realizar las traducciones se encuentran en la dentro de la carpeta `config` ubicada en la raíz del proyecto y en la subcarpeta `locales`.

```sh
.
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
```

Todos los archivos que agreguemos en esa carpeta que tengan extensiones `.rb` o `.yml` funcionarán automáticamente.

### ¿Qué contiene el archivo en.yml?

Este archivo contiene una serie de instrucciones que nos enseña a través de ejemplos como lograr que nuestras traducciones funcionen correctamente utilizando los *helpers* de Rails.

```yaml
# Files in the config/locales directory are used for internationalization
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
```

Sencillo, ¿cierto?, Ahora cambiemos el idioma por defecto de Rails.

### ¿Cómo cambiar el idioma por defecto?

El idioma por defecto de casi todo lo que existe es el Inglés ya que podríamos decir que es el idioma universal. Para cambiar el idioma por defecto a español debemos realizar lo siguiente:

Ir a la carpeta `config` y abrir el archivo `application.rb`.

```ruby
require File.expand_path('../boot', __FILE__)

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
```

Debemos borrar el carácter `#` de comentario la última línea del archivo y debemos cambiar el término `:de` por `:es` y reiniciar el servidor de Rails si estaba corriendo. Es decir volver a ejecutar `rails s`.

Luego de esto podemos copiar el archivo `en.yml` de la carpeta `config/locales` y cambiarle el nombre a `es.yml`, siempre dejando el archivo en inglés.

```sh
$ cp config/locales/en.yml config/locales/es.yml
```

Esto nos permitirá tener una base de trabajo para realizar las traducciones en inglés y en español.

Algo que debemos recordar es que si queremos tener los archivos de idiomas en otra carpeta que no sea la antes descrita, debemos indicarle a Rails cual será esta carpeta y la extensión de los archivos que maneja. Para realizar esto debemos borrar el carácter de comentario `#` y modificar la penultima línea del mismo archivo application.rb.

```ruby
# The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
```

Ahora para lograr que estos archivos entren en funcionamiento debemos agregarlos a las rutas.

### ¿Cómo agregar el idioma a las rutas?

Para agregar el idioma primero, debemos crear un scaffold para tener una ruta o podemos utilizar un proyecto que tengamos. Para esta prueba vamos a crear un scaffold de ventas:

```sh
$ rails g scaffold Sales precio:string nombre:string
```

Luego corremos las migraciones `bundle exec rake db:migrate` una vez que tengamos todo en orden procedemos a agregar al controlador principal de nuestra aplicación `application_controller.rb` las siguientes líneas:

{% include middle-post-ad.html %}

```ruby
before_action :set_locale

def set_locale
  I18n.locale = params[:locale] || I18n.default_locale
end

def default_url_options(options={})
  { locale: I18n.locale }
end
```

¿Que hacen estas líneas que agregamos?

La primera línea permite entregar antes de cualquier acción que solicitemos a la aplicación asignar o a leer el parámetro `locale` que viene en el url; esto se hace a través del método `set_locale`. Las líneas restantes representados en el método `default_url_options` son las que agregan de manera centralizada el parámetro `en` o `es` a nuestro url.

Una vez que tenemos la base para agregar el idioma al URL debemos elegir como queremos estilar nuestro dicho URL:

- Queremos que tenga `localhost:3000/sales?locale=es`
- Queremos que sea más limpio, algo cómo `localhost:300/es/sales`

Si nos importa la legibilidad del URL aplicamos la segunda opción, y esto lo logramos de la siguiente manera:

En el archico `config/routes.rb` vamos a buscar nuestra ruta `resources: sales` y le vamos a agregar lo siguiente.

```ruby
scope "(:locale)", locale: /es|en/ do
  resources :sales
end
```

Esto nos permitirá tener el `locale` `/es/` opcional en nuestro URL, si no lo agregamos la ruta funcionará normalmente pero agarrará el el idioma por defecto que es castellano. De igual manera funcionará la ruta si agregamos `/es/` o cambiará el idioma si agregamos `/en/`.

Cómo últimas etapas debemos agregar contenido a nuestros archivos de locales.  

### Lazy Lookup vs Full path

Vamos a agregar el contenido a los archivos `en.yml` y `es.yml`.

En nuestro archivo `es.yml`:

```yaml
es:
  sales:
    index:
      title: "Listado de Ventas"
```

En nuestro archivo `en.yml`:

```yaml
en:
  sales:
    index:
      title: "Listing of Sales"
```

Lo que estamos diciendo aquí; por una cuestión de orden y a su vez para que funcione el Lazy Lookup es:

En la capeta de las vistas `app/views/` vas a buscar una carpeta llamada `sales` y luego el archivo `index` dentro de ese archivo hay un título (`title`) y va a llevar el siguiente contenido `"Listing of Sales"` o `"Listado de Ventas"` dependiendo del idioma.

Si ahora vamos a la vista antes descrita y agregamos en la primera línea lo siguiente:

```html
<%= t '.title' %>
```

Luego podremos observar que al ir al siguiente URL `http://localhost:3000/es/sales` o `http://localhost:3000/en/sales` el título cambia de idioma.

Lo que estamos realizado con el código en la vista es utilizar el helper `t` que indica que debe ir a buscar en los archivos de locale la traducción con nombre `title` que corresponda al archivo `views/sales/index.erb.html`.

Eso que acabamos de hacer es Lazy Lookup ya que no estamos especificando la ruta completa a la traducción que estamos solicitando y por esta razón es tan importante tener estos archivos muy ordenados.

Si quisiéramos poner la traducción con la ruta completa o full path, también pusiésemos realizándolo de la siguiente manera:

```html
<%= t 'sales.index.title' %>
```

En caso de querer tener un orden personalizado las rutas completas funcionarían perfectamente.

* * *

## Conclusión.

En esta lección aprendimos a utilizar una de las propiedades de `activesupport` en particular para el uso de i18n o internacionalización de nuestras aplicaciones. En el próximo capítulo estaremos hablando un poco más de las funcionalidad de la librería `activesupport` de Rails. Siéntanse libres en consultar cualquier duda a través de los comentarios.

¡Hasta el próximo capítulo!
