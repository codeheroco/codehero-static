---
layout: post
status: publish
published: true
title: Sesiones y Cookies
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
date: 2013-11-21 01:21:34.000000000 -04:30
serie: Sinatra desde Cero
dificultad: Novato
duracion: 30
description: Sexto capítulo de la serie Sinatra desde Cero, donde hablamos sobre sesiones y cookies, componentes fundamentales de una aplicación web.
categories:
- Cursos
- Sinatra
tags:
- Sinatra
- Sesiones
- Cookies
- Usuarios
---
<p>La serie de Sinatra desde Cero, buscará otorgarte el conocimiento necesario para que puedas desarrollar tus propias aplicaciones Web haciendo uso de esta magnifica herramienta.</p>

<p>En este sexto capítulo te enseñaremos a como crear y destruir una de las partes vitales de una aplicación web, las sesiones. También aprenderemos a como persistir estas sesiones utilizando los famosos cookies.</p>

<blockquote>
  <p>Para comprender correctamente todo lo que hablaremos en esta serie, es conveniente tener un conocimiento básico sobre el lenguaje de Ruby. Podrás conseguir toda la información desees <a href="http://codehero.co/category/tutoriales/ruby/">aquí</a></p>
</blockquote>

<hr />

<h2>Sesiones</h2>

<p>¿Qué son sesiones? En una aplicación web muchas veces debemos o queremos conocer quien es la persona que está usando nuestra aplicación para poder servirle el contenido apropiado. Sabemos que el protocolo HTTP no tiene estado, por lo tanto de manera directa es imposible conocer si una misma persona está realizando más de una petición y por consiguiente no sabemos si le debemos servir algo particular.</p>

<p>La sesión es la manera que hace posible mantener el estado de un usuario mientras utiliza la aplicación y esto se logra guardando un cookie en el navegador del mismo.</p>

<p>¿Cómo funciona? En Sinatra por ser un Rack Application se emplea el uso de <code>rack.session</code>y se guarda el cookie generado del lado del cliente, en ese cookie se va persistiendo data relacionada con la actividad del usuario dentro de nuestra aplicación.</p>

<p>Vamos a observar un pequeño ejemplo de como funciona.</p>

<h3>Crear una sesión</h3>

<p>Para crear una sesión se realiza por medio de el bloque de configuración (<code>configure block</code>) una vez definido el mismo el objeto de la sesión se encuentra completamente listo para almacenar y recuperar información.</p>

<h4>bloque de configuración</h4>

<p>El bloque de configuración de Sinatra nos permite personalizar el funcionamiento de nuestra aplicación; el mismo puede ser usado basado en ambientes (desarrollo, pruebas, producción).</p>

```ruby
require 'sinatra'

configure do
  enable :sessions
end

before do
  content_type :txt
end

get '/set' do
  session[:foo] = Time.now
  "Estableciendo la sesión."
end

get '/fetch' do
  "El valor de la sesión es: #{session[:foo]}"
end
```

<p>Sinatra automáticamente crea una llave de seguridad para codificar y descodificar las sesiones de manera segura de todas maneras aunque Sinatra cree automáticamente las llaves de seguridad es mucho mejor que nosotros creemos y agreguemos esta llave de manera manual.</p>

<h3>Destruir sesión</h3>

<p>Destruir una sesión es más fácil que crearla, y solo basta con llamar a <code>session.clear</code> dentro de una de nuestras rutas.</p>

```ruby
require 'sinatra'

configure do
  enable :sessions
end

before do
  content_type :txt
end

get '/set' do
  session[:foo] = Time.now
  "Estableciendo la sesión."
end

get '/fetch' do
  "El valor de la sesión es: #{session[:foo]}"
end

get '/logout' do
  session.clear
  redirect '/fetch'
end
```

<p>De la misma manera como lo explicamos en el párrafo anterior dentro de la ruta <code>/logout</code> destruimos la sesión y posterior a esto redirecionamos al usuario hacia la ruta <code>/fetch</code> para comprobar que no existe un valor de la variable sesión.</p>

<h2>Cookies</h2>

<p>Indirectamente hemos explicado que son cookies y hemos dicho que van en el lado del cliente. Pero… ¿Qué son realmente los cookies? Los cookies son pequeños fragmentos de metadata que se almacenan del lado del usuario y esencialmente existen dos tipos de cookies <em>de sesión</em> y <em>persistentes</em> la diferencia entre ambos es sencilla. Los cookies de sesión expiran cuando el usuario cierra su navegador o destruye la sesión haciendo un logout de la misma. Los cookies persistentes simplemente tienen una fecha de caducidad.</p>

```ruby
require 'sinatra'

get '/' do
  response.set_cookie "foo", "bar"
  "Cookie establecido. Estas interesado en <a href='/read'>leer</a> su valor?"
end

get '/read' do
  "El valor del cookie es: #{request.cookies['foo']}."
end

get '/delete' do
  response.delete_cookie "foo"
  "El cookie ha sido eliminado."
end
```

<hr />

<h2>Conclusión</h2>

<p>En este sexto capítulo, hemos aprendido a utilizar de manera muy básica las sesiones y los cookies. Si te surge algún tipo de duda no te detengas y déjanos un comentario, que gustosamente lo responderemos.</p>

<p>¡Hasta el próximo capítulo!</p>
