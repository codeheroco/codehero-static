---
layout: post
status: publish
published: true
title: Enviar emails (ActionMailer)
author: Ricardo Sampayo
author_login: ricardo
author_email: ricardo9588@gmail.com
author_url: http://www.ricardosampayo.com
date: 2013-11-01 00:21:08.000000000 -04:30
serie: Ruby on Rails desde Cero
github: https://github.com/codeheroco/ruby_on_rails_activerecord
description: Ruby on Rails desde cero. Nuevo Capitulo donde aprendemos a enviar correos electrónicos utilizando ActionMailer.
categories:
- Cursos
- Ruby on Rails
tags:
- Ruby on Rails
- ActionMailer
- Email
- Correo
- Gmail
---
<p>Las series de cursos Ruby on Rails en CodeHero buscan ofrecerte las herramientas básicas necesarias para que puedas desarrollar tus propias aplicaciones Web. En este nivel del curso ya deben tener suficiente información para empezar a desarrollar una aplicación web.</p>

<p>En este nuevo capítulo estaremos estudiando la clase ActionMailier, crearemos una aplicación que nos permita enviar correos electrónicos. Empezaremos con casos sencillos para ir aumentando su dificultad a medida que avanzamos.</p>

<hr />

<h2>Configuración del remitente</h2>

<p>Lo primero que debemos hacer, una vez tengamos nuestro proyecto en Rails creado, es configurar los datos del servidor de correo que estemos utilizando para enviar emails. Para este caso agregaremos la configuración al final del archivo <strong>development.rb</strong>, ubicado en la ruta dentro del proyecto <strong>/config/environments</strong> resultando algo como esto:</p>

<p><em>/config/environments/development.rb</em></p>

```ruby
config.action_mailer.delivery_method = :smtp
config.action_mailer.smtp_settings = {
  address:              'smtp.gmail.com',
  port:                 587,
  domain:               'gmail.com',
  user_name:            'ejemplo@gmail.com',
  password:             'secret',
  authentication:       'plain',
  enable_starttls_auto: true  }
```

<p>Esta configuración esta diseñada para enviar correos desde gmail como prueba para verificar que funcione. Recuerde agregar su <strong>domain</strong>, <strong>user_name</strong> y su <strong>password</strong> para que funcione el ejemplo.</p>

<hr />

<h2>Generando nuestra clase de correos (Mailer)</h2>

<p>Una vez configurado nuestro servidor de correos en el proyecto, procedemos a crear nuestra clase encargada de la gestión de los emails. Esta clase se comporta casi como una clase del controlador, donde preparamos todos los datos del correo e incluso agregamos vistas que serán manipuladas por nuestra clase(mailer) igual que los controladores. Estas vistas alojan el contenido del correo electrónico. Veamos como crear esta clase con una simple línea de comando.</p>

<p>Nos ubicamos con la consola o terminal en el directorio de nuestro proyecto y escribimos la siguiente línea:</p>

```sh
$ rails generate mailer ActionCorreo
```

<p>Este comando nos crea una lista de archivos y carpetas que vamos a utilizar para poder enviar correos. La lista de estos archivos la verán cuando ejecuten el comando y debería ser algo como esto:</p>

```sh
create  app/mailers/action_correo.rb
invoke  erb
create    app/views/action_correo
invoke  test_unit
create    test/mailers/action_correo_test.rb
```

<p>Como ven, nos crea dentro de nuestra aplicación una carpeta <strong>mailers</strong> y dentro de ella nuestro archivo Ruby (<strong>action_correo.rb</strong>) que se puede ver como un controlador para enviar correos. Este archivo debe contener algo parecido a este código:</p>

<p><em>app/mailers/action_correo.rb</em></p>

```ruby
class UserMailer < ActionMailer::Base
  default from: 'from@example.com'
end
```

<p>También vemos que el comando nos crea una carpeta dentro de las vista donde alojaremos los archivos con el contenido de los correos electrónicos (Esto lo veremos un poco más avanzado el tutorial).</p>

<h3>Correo electrónico simple</h3>

<p>Una vez creado nuestro Mailer, le vamos a agregar un método, el cual será el encargado de enviar nuestro primer correo electrónico desde Ruby on Rails. Este será un correo simple sin adjuntos, sólo texto html y un único destinatario. Primero, creamos un método dentro de nuestro Mailer de la siguiente manera:</p>

```ruby
def bienvenido_email(user)
  @user = user
  @url  = 'http://codeHero.co'
  mail(to: @user.email, subject: 'Aprende a programar con nuestros cursos gratis')
end
```

<p>Como ven, el método recibe una variable que en nuestro caso es un objeto usuario, luego definimos las variables que utilizaremos para armar el contenido del mensaje y por último ejecutamos la función de envío de correos, agregándoles el correo destinatario y el título de nuestro email.</p>

<p>Una vez creado el método agregamos un archivo a la carpeta de las vistas que se creo en el paso anterior, donde vamos a desarrollar el contenido del correo electrónico. Este archivo lo llamaremos igual que el método del Mailer <strong>bienvenido_email.html.erb</strong> (como se dieron cuenta, aplica la misma teoría que un controlador normal). La ruta y el contenido del correo electrónico es el siguiente.</p>

{% include middle-post-ad.html %}

<em>/views/action_correo/bienvenido_email.html.erb</em>

```html
<!DOCTYPE html>
<html>
  <head>
    <meta content='text/html; charset=UTF-8' http-equiv='Content-Type' />
  </head>
  <body>
    <h1>Bienvenido a CodeHero.co, <%= @user.nombre %></h1>
    <p>
      Tu correo ha sido enviado satisfactoriamente y su identificador es:
      <%= @user.identificador %>.<br/>
    </p>
    <p>
      Recuerda visitarnos en: <a href="<%= @url %>">CodeHero.co</a>
    </p>
    <p>Te recomiendo echarle un vistazo a la serie completa de Ruby on Rails desde cero, así como a las otras series de CodeHero, agradeciendo de antemano todas sus dudas y comentarios en la sección de comentarios.</p>
    <p>¡Hasta el próximo capítulo!</p>
  </body>
</html>
```

<p>¡Listo! Ya tenemos configurado nuestra clase para enviar un correo electrónico, sólo nos queda implementarlo en nuestro controlador normal del proyecto. Pudiera ser de la siguiente manera: Creando un método dentro de un controlador, que cree, envíe por correo electrónico y muestre en formato JSON el usuario</p>

```ruby
def enviarCorreo
  #Creamos el usuario
  @persona1 = Persona.create({ nombre: 'Ricardo Sampayo', email: 'me@ricardoSampayo.com',email_confirmation: 'me@ricardoSampayo.com"', identificador: "123456789", sexo: 'm', telefono: '123456789123' })

  # Llamamos al   ActionMailer que creamos
  ActionCorreo.bienvenido_email(@persona1).deliver

  # mostramos el usuario en formato JSON
  render json: @persona1
end
```

<p>Al ejecutar este método nos debe llegar un correo electrónico como este:</p>

<p><img src="http://i.imgur.com/8h43vK4.png?1" alt="correo" /></p>

<h3>Correo electrónico con archivo adjunto y múltiples usuarios</h3>

<p>También es bastante fácil enviar correos con archivos adjuntos en Ruby on Rails, lo único que debemos hacer es agregarle en el Mailer los archivos adjuntos de la siguiente forma:</p>

```ruby
attachments["codehero.png"] = File.read("#{Rails.root}/public/codehero.png")
```

<p>Como ven es bastante fácil añadir un adjunto, tan sólo hay que añadir una nueva llamada a <code>attachments</code>, poniendo como clave el nombre del adjunto y pasando el archivo correspondiente.</p>

<p>Por otro lado agregar múltiples destinatarios es igual de sencillo que todos los procedimientos que hemos visto en el framework, simplemente, los tenemos que agregar de la siguiente forma:</p>

```ruby
email_with_name = "#{@user.nombre} <#{@user.email}>"
email_with_name2 = "Ricardo < test@ricardosampayo.com>"
email_with_name3 = "Ricardo < test2@ricardosampayo.com>"
email_with_name4 = "Ricardo < test3@ricardosampayo.com>"

mail(to: [email_with_name, email_with_name3],
     bcc: email_with_name2,
     cc: email_with_name4,
     subject: 'Aprende a programar con nuestros cursos gratis')
```

<p>En el ejemplo, vemos como estamos enviando el correo directamente a dos usuarios, por otro lado, también agregamos dos usuarios más <strong>con copia</strong> y <strong>con copia oculta</strong> respectivamente.</p>

<hr />

<h2>Interceptar Correos</h2>

<p>Hay situaciones en las que se necesita interceptar un correo antes de ser enviado para hacerle algunos ajustes, como por ejemplo: cambiarle el asunto o agregarle algún nuevo destinatario. Afortunadamente, AcciónMailer proporciona una herramienta para interceptar cada correo electrónico. Veamos cómo hacemos esto:</p>

<p>Lo primero que debemos hacer es crear la clase interceptadora. Esta clase podría ir en el directorio /lib, y le pondremos el nombre development_mail_interceptor.rb.</p>

```ruby
class DevelopmentMailInterceptor
  def self.delivering_email(message)
    message.to = "test99@ricardosampayo.com"
  end
end
```

<p>El método de clase delivering_email recibe el mensaje de correo que está a punto de ser enviado y cambia la persona a la que iba dirigido el correo.</p>

<p>Antes de que el interceptor pueda hacer su trabajo, es necesario registrar el interceptor, esto se puede hacer en un archivo de inicialización en <strong>config/initializers/</strong> el cual llamaremos <strong>setup_mail.rb</strong></p>

```ruby
Mail.register_interceptor(DevelopmentMailInterceptor) if Rails.env.development?
```

<blockquote>
  <p>Esto invocará al método delivering_email en nuestro interceptador, si nuestra aplicación está en modo de desarrollo. Usted puede leer sobre la creación de entornos Rails para obtener más información sobre los <a href="http://guides.rubyonrails.org/configuring.html#creating-rails-environments">entornos personalizados</a>.</p>
</blockquote>

<hr />

<h2>Conclusión</h2>

<p>En esta lección hemos estudiado cómo se envían correos electrónicos desde nuestras aplicaciones en Ruby on Rails, como siempre demostrado en ejemplos, para agilizar su proceso de aprendizaje probándolo usted mismo.</p>

<p>Una vez más te recomiendo echarle un vistazo a la serie completa de <a href="http://codehero.co/series/ruby-on-rails-desde-cero/">Ruby on Rails desde cero</a>, así como a las otras series de CodeHero, agradeciendo de antemano todas sus dudas y comentarios en la sección de comentarios.</p>

<p>¡Hasta el próximo capítulo!</p>
