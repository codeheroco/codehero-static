---
layout: post
status: publish
published: true
title: Streaming y Attachments
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
date: 2014-02-20 01:06:08.000000000 -04:30
serie: Sinatra desde Cero
dificultad: Avanzado
duracion: 30
description: Doceavo capítulo de la serie Sinatra desde Cero, donde hablamos sobre streaming para hacer una aplicación tipo chat y también sobre archivos adjuntos
categories:
- Cursos
- Sinatra
tags:
- Sinatra
- Streaming
- Attachments
---
<p>La serie de Sinatra desde Cero, buscará otorgarte el conocimiento necesario para que puedas desarrollar tus propias aplicaciones Web haciendo uso de esta magnifica herramienta.</p>

<p>En este doceavo capítulo veremos como se realiza streaming dentro de una pequeña aplicación Sinatra y como se utiliza el método attachments para subir archivos.</p>

<blockquote>
  <p>Para comprender correctamente todo lo que hablaremos en esta serie, es conveniente tener un conocimiento básico sobre el lenguaje de Ruby. Podrás conseguir toda la información desees <a href="http://codehero.co/category/tutoriales/ruby/">aquí</a></p>
</blockquote>

<p>La información para este artículo la sacamos de la recopilación de información del libro <a href="http://shop.oreilly.com/product/0636920019664.do?sortby=publicationDate">Sinatra: Up and Running</a> y de la <a href="http://www.sinatrarb.com/intro.html">Documentación oficial</a></p>

<hr />

<h2>¿Qué es Streaming?</h2>

<p>El streaming (también denominado lectura en continuo, difusión en flujo, lectura en tránsito, difusión en continuo, descarga continua o mediaflujo) es la distribución de multimedia a través de una red de computadoras de manera que el usuario consume el producto al mismo tiempo que se descarga. La palabra streaming se refiere a: una corriente continua (sin interrupción). Este tipo de tecnología funciona mediante un búfer de datos que va almacenando lo que se va descargando en la estación del usuario para luego mostrarle el material descargado. Esto se contrapone al mecanismo de descarga de archivos, que requiere que el usuario descargue por completo los archivos para poder acceder a su contenido.</p>

<p>El término se aplica habitualmente a la difusión de audio o vídeo. El streaming requiere una conexión por lo menos de igual ancho de banda que la tasa de transmisión del servicio. El streaming de vídeo se popularizó a fines de la década de 2000, cuando el ancho de banda se hizo lo suficientemente barato para gran parte de la población.</p>

<p>Este párrafo es fuente de <a href="http://es.wikipedia.org/wiki/Streaming">wikipedia</a></p>

<h3>¿Cómo funciona en Sinatra?</h3>

<p>En Sinatra tenemos dos maneras posibles de hacer streaming, una es dejar la conexión abierta por el tiempo que sea necesario en el cual uno o varios usuarios esten conectados y la segunda es por un tiempo finito mientras dure una "conexión o función".</p>

<p>Basandonos en los ejemplos de la <a href="http://www.sinatrarb.com/intro.html">documentación oficial</a> podemos ver como funcionan ambos método de streaming.</p>

<h3>Dejando una conexión abierta</h3>

<p>Para realizar nuestro pequeño demo tipo "chat" debemos instalar la siguiente gema manualmente <code>gem install thin</code>.</p>

<p>Una vez que tengamos instalada la gema debemos crear un archivo llamado <code>cap12.rb</code> y utilizamos el siguiente código:</p>

```ruby
require 'sinatra'
set server: 'thin', connections: []

before do
  content_type :txt
end

get '/chat' do
  stream(:keep_open) do |out|
    settings.connections << out
    out.callback { settings.connections.delete(out) }
  end
end

get '/enviar/:mensaje' do
  settings.connections.each do |out|
    out << "#{Time.now} -> #{params[:mensaje]}" << "\n"
  end

  "Enviado #{params[:mensaje]} el mensaje."
end
```

<p>Vamos a explicar un poco cómo funciona, lo primero es agregar Sinatra y luego establecer que el servidor de nuestra aplicación sea <code>thin</code> y crear un arreglo de conexiones vacías.</p>

<p>Luego debemos crear dos rutas para nuestra aplicación, la primera se llama <code>/chat</code> y funciona como elemento central a donde llegan todos los mensajes. La segunda ruta es referente a la ruta encargada de enviar los mensajes <code>/enviar/:mensaje</code>.</p>

<p>Dentro de la ruta <code>/chat</code> encontramos un método que se llama <code>stream</code> y que tiene como parámetro <code>:keep_open</code> que se encarga de mantener la conexión abierta en todo momento hasta que el usuario se salga de dicha ruta. Dentro del <code>stream</code> vemos que hay una conexión que recibe las salidas o impresiones que realizamos y a su vez tenemos el método que cierra la conexión hacia el usuario cuando el mismo se sale de la ventana.</p>

{% include middle-post-ad.html %}

<p>Por otra parte en la ruta <code>/enviar/:mensaje</code> vemos que hay el método que guarda relación con las conexiones y se le asigna a <code>out</code> los mensajes que vamos enviando y este los pasa hacia el "chat".</p>

<p>Para probar la aplicación podemos realizar lo siguiente:</p>

```sh
$ ruby cap12.rb
```

<p>Luego abrimos 2 terminales, en 1 vamos a escribir lo siguiente:</p>

```sh
$ curl http://localhost:4567/chat
```

<p>y en el otro vamos a mandar los mensajes:</p>

```sh
$ curl http://localhost:4567/enviar/hola
```

<p>Luego revisamos el terminal del <code>/chat</code> y veremos que está el mensaje que agregamos mediante la ruta. Si desean escribir más pueden hacerlo.</p>

<h3>Streaming finito</h3>

<p>A diferencia de la conexión abierta este se encarga de enviar los datos necesarios y luego finalizar la conexión. Dentro del mismo archivo <code>cap12.rb</code> u otro si desean debemos agregar el siguiente código:</p>

```ruby
require 'sinatra'
set server: 'thin'

before do
  content_type :txt
end

get '/' do
  stream do |out|
    out << "Hola!\n"
    sleep 2
    out << "¿Cómo estas? \n"
    sleep 2
    out << "¿Todo bien? \n"
  end
end
```

<p>Aquí estamos de igual manera utilizando el método <code>stream</code> para escribir en el bloque con variable <code>out</code> todos los mensajes que necesitamos enviar, cuando se terminen cerramos el <code>stream</code>.</p>

<p>De estas dos maneras que se enseñaron de manera muy sencilla se puede establecer una conexión que envíe información desde el servidor y el usuario o cliente se quede esperando los mensajes. Si desean ampliar un poco y ver un chat un poco más completo pero muy sencillo que tiene interfaz pueden ver el código <a href="https://gist.github.com/rkh/1476463">aquí</a>.</p>

<hr />

<h2>Archivos adjuntos</h2>

<p>Un archivo adjunto, archivo anexo, adjunto de correo o, en inglés, attachment es un archivo que se envía junto a un mensaje de correo electrónico. Pueden ser enviados no codificados o codificados de diferentes maneras: base64, binhex, UUEncode, quoted-printable. En MIME, el formato de correo electrónico estándar, los mensajes y sus adjuntos son mandados con el tipo multipart message, habitualmente usando base64 para adjuntos que no son texto.</p>

<p>Este párrafo es fuente de <a href="http://es.wikipedia.org/wiki/Archivo_adjunto">wikipedia</a></p>

<h3>¿Cómo funciona en Sinatra?</h3>

<p>Enviar archivos adjuntos en Sinatra es relativamente sencillo esto porque existe un método dentro del DSL que se encarga prácticamente de todo. Al usar el método le decimos a la aplicación que debe subir el archivo al servidor en vez de regresar una respuesta normal.</p>

<p>Para subir un archivo adjunto de una manera sencilla podemos realizarlo de la siguiente manera:</p>

<p>Podemos seguir utilizando el archivo <code>cap12.rb</code> o crear uno nuevo:</p>

```ruby
require 'sinatra'
set server: 'thin'

before do
  content_type :txt
end

get '/adjunto' do
  attachment 'archivo.txt'
  "Almacena el archivo!"
end
```

<p>Aquí observamos que existe una nueva ruta <code>/adjunto</code> que contiene un método llamado <code>attachment</code>; este método puede recibir un archivo o no, pero aquí lo estamos utilizando con un archivo llamado <code>archivo.txt</code>.</p>

<p>Si ahora hacemos la petición via <code>cURL</code> vamos a observar que el encabezado del la petición tiene una variable que se llama <code>Content-Disposition</code> que indica a que la petición tiene un archivo adjunto y cual es el nombre del archivo, hagamos la prueba:</p>

```sh
$ curl -v http://localhost:4567/adjunto

< HTTP/1.1 200 OK
< Content-Type: text/plain;charset=utf-8
< Content-Disposition: attachment; filename="archivo.txt"
< Content-Length: 20
< X-Content-Type-Options: nosniff
< Connection: keep-alive
* Server thin 1.6.1 codename Death Proof is not blacklisted
< Server: thin 1.6.1 codename Death Proof
<
* Connection #0 to host localhost left intact
Almacena el archivo!%
```

<p>Como lo expliqué anteriormente apreciamos la variable que a su vez contiene el nombre del archivo llamado <code>archivo.txt</code>.</p>

<hr />

<h2>Conclusión</h2>

<p>En este doceavo capítulo de la serie, hemos visto como realizar <em>streaming</em> en el servidor para hacer una especie de chat muy sencillo desde la línea de comandos, además vimos como se adjuntan archivos utilizando las funciones que proporciona Sinatra para esto. Si te surge algún tipo de duda no te detengas y déjanos un comentario, que gustosamente lo responderemos.</p>

<p>¡Hasta el próximo capítulo!</p>
