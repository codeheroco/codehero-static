---
layout: post
status: publish
published: true
title: Procesamiento Asíncrono
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
wordpress_id: 3142
wordpress_url: http://codehero.co/?p=3142
date: 2014-03-27 01:05:20.000000000 -04:30
serie: Ruby on Rails desde Cero
description: Capítulo 19 de la serie Rails desde cero. Hablamos un poco de procesamiento asíncrono utilizando la librería sucker_punch para enviar correos y otras cosas.
categories:
- Cursos
- Ruby on Rails
tags:
- Ruby
- Ruby on Rails
- asíncrono
- Background
---
Las series de cursos Ruby on Rails en CodeHero buscan otorgarte los conocimientos necesarios, para que puedas desarrollar tus propias aplicaciones Web. En el capítulo anterior aprendimos como se generan los controladores para la aplicación, que representan los métodos en nuestros controladores y cómo se leen parámetros ya sean en el URL o enviados por POST dentro de un formulario.

En este nuevo capítulo aprenderemos a como realizar ejecuciones de tareas asincronas ligeras tales como, enviar correos de bienvenida o modificar información en base de datos utilizando una librería llamada `sucker_punch`

* * *

## ¿Por qué necesitamos procesamiento asíncrono?

En todo momento de una aplicación queremos que el usuario esté lo más a gusto posible cuando se encuentre utilizando la aplicación. Es por esto que utilizamos "client side frameworks", Ajax, procesamiento asíncrono entre otras cosas... Todo para que la experiencia del usuario dentro de nuestra aplicación sea la mejor y más rápida posible.

### ¿En que partes de nuestra aplicación podríamos utilizar dicho procesamiento asíncrono?

El uso más común y frecuente es en el registro de usuario con funcionalidad de correo de bienvenida. Por lo general el proceso de envío de correos es bastante lento, desde que el usuario presiona el botón de "registrar" hasta que el servidor de correos devuelve una respuesta pueden pasar más 5 segundos, es por esta razón que la solución obvia es utilizar este tipo de tareas asíncronas. Otro posible ejemplo es un "contador" de visitas, sea a un post o página particular. Actualización de algún campo en base de datos, procesamiento de imágenes, entre otros.

El resúmen general el procesamiento asíncrono lo utilizamos cuando cierta funcionalidad dentro de una aplicación no requiera de la intervención del usuario, sea una tarea lenta o simplemente algo que queramos ejecutar en un horario específico.

En la versión 4.0 de Rails se pretendía que existiera la funcionalidad para manejo de procesamiento asíncrono, lamentablemente no pudo ser posible (no conozco el motivo) y se postergó hasta la versión 4.1 que está próxima a salir. En lo que sea oficial posiblemente tendremos un post para enseñar como funciona.

* * *

## ¿Por qué esta librería y no otra?

Elegí la librería [sucker_punch](https://github.com/brandonhilkert/sucker_punch) para esta entrada por lo simple que es, funciona sobre el mismo proceso de la aplicación, no necesita configuración alguna ni tampoco una base de datos "key/value" como [Redis](http://codehero.co/como-instalar-configurar-y-usar-redis/), todo esto quiere decir que podemos utilizar esta librería en Heroku sin coste adicional al que recibimos de la aplicación actualmente.

La otra posible opción (sencilla) era utilizar [delayed_job](https://github.com/collectiveidea/delayed_job) pero requiere algo más de configuración, otro proceso para funcionar y por esto no la elegí.

Cuando el procesamiento asíncrono es muy grande, **ejemplo:** encolar miles o millones de tareas diarías, monitoreo y control exahustivo de tareas realizadas, interfaz gráfica, recomiendo evaluar [sidekiq](https://github.com/mperham/sidekiq) o [resque](https://github.com/resque/resque).

Cómo mencioné anteriormente en este capítulo utilizaremos la librería `sucker_puch` para realizar dos simples tareas. Enviar un email de bienvenida y actualizar un contador que representa un campo en base de datos cada vez que alguien se meta en cierta página o post.

* * *

## Instalación

Para instalar esta libreria basta con agregar a el `Gemfile` de nuestra aplicación la siguiente línea:

```ruby
gem 'sucker_punch', '~> 1.0'
```

Luego hacemos `bundle install`. Cabe destacar que esta libreria no es dependiente de Rails, la podríamos utilizar en una aplicación Sinatra o Padrino.

* * *

## Empleando la librería

Dentro de nuestra aplicación Rails, debemos generar un Mailer si es que no tenemos y configurarlo como aprendimos en la entrada [Enviar Emails  (Action Mailer)](http://codehero.co/ruby-rails-desde-cero-enviar-emails-actionmailer/) a su vez utilizaremos el mismo mensaje dentro del correo.

```ruby
$ rails g mailer UserMailer
```

Luego debemos configurar todo como lo explica la entrada antes mencionada. Una vez que estemos seguros que es posible enviar correos agregamos `sucker_punch` a la formula.

Para esto vamos a crear un directorio llamad `jobs` dentro del directorio `app` donde alojaremos el código para nuestro procesamiento asíncrono.

```sh
$ mkdir app/jobs
```

Luego crearemos un archivo llamado `user_welcome_job.rb` dentro del directorio `app/jobs`

```sh
$ touch app/jobs/user_welcome_job.rb
```

Dentro de este archivo agregaremos lo siguiente:

```ruby
class UserWelcomeJob
  include SuckerPunch::Job

  def perform(user)
    UserMailer.welcome_email(user).deliver
  end
end
```

Podemos apreciar lo siguiente:
- `include SuckerPunch::Job` esta llamada incluye las funcionalidades de la librería y hace posible el procesamiento síncrono y asíncrono.
- método `perform` se utiliza obligatoriamente y es el encargado del procesamiento.

Luego para poder llamar a este proceso y poder enviar el email debemos hacer la llamada desde el controlador o modelo en la acción `create` de la siguiente manera.

```ruby
def create
  @user = User.new(params[:user])

  if @user.valid?
    UserWelcomeJob.new.async.perform(@user)
    flash[:success] = El correo ha sido enviado!
    redirect_to root_url
  else
    render :action => 'new'
  end
end
```

Rails automaticamente incluye cualquier archivo que tenga extensión `.rb` y se encuentre en el directorio `app` por lo tanto podemos llamar directamente a la clase `UserWelcomeJob` y crear una nueva tarea que se ejecutará asíncronamente al indicarle `async` y llamará al método `perform` pasando como parámetro un usuario. De igual manera podríamos ejecutar la tarea síncrona eliminando la llamada `async`, `UserWelcomeJob.new.perform(@user)`.

Para nuestro **segundo caso**: incrementar el contador de visitas a cierta página dentro de nuestra aplicación luego de 1 minuto. Por ejemplo: el perfil de un usuario.

> Suponemos existe un campo en base de datos llamado `profile_view` cuya finalidad es almacenar esta información.

Lo primero que debemos hacer crear un archivo de "jobs" nuevo:

```ruby
$ touch app/jobs/page_view_job.rb
```

En este archivo agregamos el siguiente código que nos permitirá actualizar la cantidad de visitas cada vez que ingrese alguien a una página.

```ruby
class PageViewJob
  include SuckerPunch::Job
  workers 4

  def perform(user_id)
    ActiveRecord::Base.connection_pool.with_connection do
      user = User.find(user_id)
      user.increment!(profile_view: 1)
    end
  end

  def later(sec, user_id)
    after(sec) { perform(user_id) }
  end
end
```

En esta tarea podemos apreciar nuevos detalles.

- `workers 4` indica la cantidad de procesos ligeros "simultaneos" que se podrán crear para cumplir cierta tarea, el valor predeterminado es 2.
- Cuando se modifica información con ActiveRecord debemos tener en cuenta el "pool" de conexiones a la base de datos. Para no agotar las conexiones utilizamos la siguiente línea de código `ActiveRecord::Base.connection_pool.with_connection` la cual permite que una vez finalizada la ejecución de dicha tarea la conexión retorne al "pool".
- método later se encarga de llamar al método `perform` luego de ciertos segundos, en nuestro caso 60segundos.

Dentro del controlador de usuarios en el método `show` agregamos el siguiente código.

```ruby
def show
  PageViewJob.new.async.later(60, params[:id])
end
```

De esta manera llamamos directamente al método `later` asíncronamente y el mismo se encargará de llamar al método `perfom` que se encargará de actualizar la información en base de datos.

* * *

## Conclusión.

En esta lección aprendimos a utilizar una de las tantas herramientas de manejo de procesos asíncronos. Elegí esta librería ya que es muy facil de instalar y con ligeras modificaciones en nuestra aplicación podemos mejorar el tiempo de respuesta de la misma. Siéntanse libres en consultar cualquier duda a través de los comentarios.

¡Hasta el próximo capítulo!
