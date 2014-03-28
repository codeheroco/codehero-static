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
categories:
- Cursos
- Ruby on Rails
tags:
- Ruby
- Ruby on Rails
- asíncrono
- Background
---
<p>Las series de cursos Ruby on Rails en CodeHero buscan otorgarte los conocimientos necesarios, para que puedas desarrollar tus propias aplicaciones Web. En el capítulo anterior aprendimos como se generan los controladores para la aplicación, que representan los métodos en nuestros controladores y cómo se leen parámetros ya sean en el URL o enviados por POST dentro de un formulario.</p>

<p>En este nuevo capítulo aprenderemos a como realizar ejecuciones de tareas asincronas ligeras tales como, enviar correos de bienvenida o modificar información en base de datos utilizando una librería llamada <code>sucker_punch</code></p>

<hr />

<h2>¿Por qué necesitamos procesamiento asíncrono?</h2>

<p>En todo momento de una aplicación queremos que el usuario esté lo más a gusto posible cuando se encuentre utilizando la aplicación. Es por esto que utilizamos "client side frameworks", Ajax, procesamiento asíncrono entre otras cosas... Todo para que la experiencia del usuario dentro de nuestra aplicación sea la mejor y más rápida posible.</p>

<h3>¿En que partes de nuestra aplicación podríamos utilizar dicho procesamiento asíncrono?</h3>

<p>El uso más común y frecuente es en el registro de usuario con funcionalidad de correo de bienvenida. Por lo general el proceso de envío de correos es bastante lento, desde que el usuario presiona el botón de "registrar" hasta que el servidor de correos devuelve una respuesta pueden pasar más 5 segundos, es por esta razón que la solución obvia es utilizar este tipo de tareas asíncronas. Otro posible ejemplo es un "contador" de visitas, sea a un post o página particular. Actualización de algún campo en base de datos, procesamiento de imágenes, entre otros.</p>

<p>El resúmen general el procesamiento asíncrono lo utilizamos cuando cierta funcionalidad dentro de una aplicación no requiera de la intervención del usuario, sea una tarea lenta o simplemente algo que queramos ejecutar en un horario específico.</p>

<p>En la versión 4.0 de Rails se pretendía que existiera la funcionalidad para manejo de procesamiento asíncrono, lamentablemente no pudo ser posible (no conozco el motivo) y se postergó hasta la versión 4.1 que está próxima a salir. En lo que sea oficial posiblemente tendremos un post para enseñar como funciona.</p>

<hr />

<h2>¿Por qué esta librería y no otra?</h2>

<p>Elegí la librería <a href="https://github.com/brandonhilkert/sucker_punch">sucker_punch</a> para esta entrada por lo simple que es, funciona sobre el mismo proceso de la aplicación, no necesita configuración alguna ni tampoco una base de datos "key/value" como <a href="http://codehero.co/como-instalar-configurar-y-usar-redis/">Redis</a>, todo esto quiere decir que podemos utilizar esta librería en Heroku sin coste adicional al que recibimos de la aplicación actualmente.</p>

<p>La otra posible opción (sencilla) era utilizar <a href="https://github.com/collectiveidea/delayed_job">delayed_job</a> pero requiere algo más de configuración, otro proceso para funcionar y por esto no la elegí.</p>

<p>Cuando el procesamiento asíncrono es muy grande, <strong>ejemplo:</strong> encolar miles o millones de tareas diarías, monitoreo y control exahustivo de tareas realizadas, interfaz gráfica, recomiendo evaluar <a href="https://github.com/mperham/sidekiq">sidekiq</a> o <a href="https://github.com/resque/resque">resque</a>.</p>

<p>Cómo mencioné anteriormente en este capítulo utilizaremos la librería <code>sucker_puch</code> para realizar dos simples tareas. Enviar un email de bienvenida y actualizar un contador que representa un campo en base de datos cada vez que alguien se meta en cierta página o post.</p>

<hr />

<h2>Instalación</h2>

<p>Para instalar esta libreria basta con agregar a el <code>Gemfile</code> de nuestra aplicación la siguiente línea:</p>

<pre lang="ruby">gem 'sucker_punch', '~> 1.0'
</pre>

<p>Luego hacemos <code>bundle install</code>. Cabe destacar que esta libreria no es dependiente de Rails, la podríamos utilizar en una aplicación Sinatra o Padrino.</p>

<hr />

<h2>Empleando la librería</h2>

<p>Dentro de nuestra aplicación Rails, debemos generar un Mailer si es que no tenemos y configurarlo como aprendimos en la entrada <a href="http://codehero.co/ruby-rails-desde-cero-enviar-emails-actionmailer/">Enviar Emails (Action Mailer)</a> a su vez utilizaremos el mismo mensaje dentro del correo.</p>

<pre lang="ruby">$ rails g mailer UserMailer
</pre>

<p>Luego debemos configurar todo como lo explica la entrada antes mencionada. Una vez que estemos seguros que es posible enviar correos agregamos <code>sucker_punch</code> a la formula.</p>

<p>Para esto vamos a crear un directorio llamad <code>jobs</code> dentro del directorio <code>app</code> donde alojaremos el código para nuestro procesamiento asíncrono.</p>

<pre lang="sh">$ mkdir app/jobs
</pre>

<p>Luego crearemos un archivo llamado <code>user_welcome_job.rb</code> dentro del directorio <code>app/jobs</code></p>

<pre lang="sh">$ touch app/jobs/user_welcome_job.rb
</pre>

<p>Dentro de este archivo agregaremos lo siguiente:</p>

<pre lang="ruby">class UserWelcomeJob
  include SuckerPunch::Job

  def perform(user)
    UserMailer.welcome_email(user).deliver
  end
end
</pre>

<p>Podemos apreciar lo siguiente: - <code>include SuckerPunch::Job</code> esta llamada incluye las funcionalidades de la librería y hace posible el procesamiento síncrono y asíncrono. - método <code>perform</code> se utiliza obligatoriamente y es el encargado del procesamiento.</p>

<p>Luego para poder llamar a este proceso y poder enviar el email debemos hacer la llamada desde el controlador o modelo en la acción <code>create</code> de la siguiente manera.</p>

<pre lang="ruby">def create
  @user = User.new(params[:user])

  if @user.valid?
    UserWelcomeJob.new.async.perform(@user)
    flash[:success] = El correo ha sido enviado!
    redirect_to root_url
  else
    render :action => 'new'
  end
end
</pre>

<p>Rails automaticamente incluye cualquier archivo que tenga extensión <code>.rb</code> y se encuentre en el directorio <code>app</code> por lo tanto podemos llamar directamente a la clase <code>UserWelcomeJob</code> y crear una nueva tarea que se ejecutará asíncronamente al indicarle <code>async</code> y llamará al método <code>perform</code> pasando como parámetro un usuario. De igual manera podríamos ejecutar la tarea síncrona eliminando la llamada <code>async</code>, <code>UserWelcomeJob.new.perform(@user)</code>.</p>

<p>Para nuestro <strong>segundo caso</strong>: incrementar el contador de visitas a cierta página dentro de nuestra aplicación luego de 1 minuto. Por ejemplo: el perfil de un usuario.</p>

<blockquote>
  <p>Suponemos existe un campo en base de datos llamado <code>profile_view</code> cuya finalidad es almacenar esta información.</p>
</blockquote>

<p>Lo primero que debemos hacer crear un archivo de "jobs" nuevo:</p>

<pre lang="ruby">$ touch app/jobs/page_view_job.rb
</pre>

<p>En este archivo agregamos el siguiente código que nos permitirá actualizar la cantidad de visitas cada vez que ingrese alguien a una página.</p>

<pre lang="ruby">class PageViewJob
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
</pre>

<p>En esta tarea podemos apreciar nuevos detalles.</p>

<ul>
<li><code>workers 4</code> indica la cantidad de procesos ligeros "simultaneos" que se podrán crear para cumplir cierta tarea, el valor predeterminado es 2.</li>
<li>Cuando se modifica información con ActiveRecord debemos tener en cuenta el "pool" de conexiones a la base de datos. Para no agotar las conexiones utilizamos la siguiente línea de código <code>ActiveRecord::Base.connection_pool.with_connection</code> la cual permite que una vez finalizada la ejecución de dicha tarea la conexión retorne al "pool".</li>
<li>método later se encarga de llamar al método <code>perform</code> luego de ciertos segundos, en nuestro caso 60segundos.</li>
</ul>

<p>Dentro del controlador de usuarios en el método <code>show</code> agregamos el siguiente código.</p>

<pre lang="ruby">def show
  PageViewJob.new.async.later(60, params[:id])
end
</pre>

<p>De esta manera llamamos directamente al método <code>later</code> asíncronamente y el mismo se encargará de llamar al método <code>perfom</code> que se encargará de actualizar la información en base de datos.</p>

<hr />

<h2>Conclusión.</h2>

<p>En esta lección aprendimos a utilizar una de las tantas herramientas de manejo de procesos asíncronos. Elegí esta librería ya que es muy facil de instalar y con ligeras modificaciones en nuestra aplicación podemos mejorar el tiempo de respuesta de la misma. Siéntanse libres en consultar cualquier duda a través de los comentarios.</p>

<p>¡Hasta el próximo capítulo!</p>
