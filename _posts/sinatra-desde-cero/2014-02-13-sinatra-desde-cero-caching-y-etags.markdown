---
layout: post
status: publish
published: true
title: Caching y Etags
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
wordpress_id: 3008
wordpress_url: http://codehero.co/?p=3008
date: 2014-02-13 00:46:11.000000000 -04:30
categories:
- Cursos
- Sinatra
tags:
- Cursos
- Sinatra desde Cero
- Caching
- Etags
---
<p>La serie de Sinatra desde Cero, buscará otorgarte el conocimiento necesario para que puedas desarrollar tus propias aplicaciones Web haciendo uso de esta magnifica herramienta.</p>

<p>En este onceavo capítulo veremos como se realiza <em>caching</em> en nuestras aplicaciones y para que funcionan los Etags.</p>

<blockquote>
  <p>Para comprender correctamente todo lo que hablaremos en esta serie, es conveniente tener un conocimiento básico sobre el lenguaje de Ruby. Podrás conseguir toda la información desees <a href="http://codehero.co/category/tutoriales/ruby/">aquí</a></p>
</blockquote>

<p>La información para este artículo la sacamos de la recopilación de información del libro <a href="http://shop.oreilly.com/product/0636920019664.do?sortby=publicationDate">Sinatra: Up and Running</a> y de la <a href="http://www.sinatrarb.com/intro.html">Documentación oficial</a></p>

<hr />

<h2>Caching</h2>

<h3>¿Qué es Caching?</h3>

<p>Cuando hablamos de <em>Caching</em> en una aplicación web asumimos que se refiere al control que nos otorgan ciertos parámetros del encabezado HTTP que permite acelerar el tiempo de acceso a una data previamente enviada, reducir el ancho de banda consumido y disminuir la carga en el servidor. Existen múltiples etiquetas o parámetros dentro del encabezado HTTP que nos permiten realizar distintas estrategias de <em>caching</em> y es por esta razón que podemos decir que el caching en una aplicación web es un tema bastante complejo que contiene múltiples vertientes y formas de realizarlo en distintos niveles.</p>

<h3>Tipos de control de Caché:</h3>

<p>Estos son los mecanismos básicos para el control de caché:</p>

<ul>
<li><p><em>Validación:</em> que puede usarse para comprobar si una respuesta cacheada sigue siendo buena tras caducar. Por ejemplo, si la respuesta tiene una cabecera <code>Last-Modified</code>, un caché puede hacer una petición condicional usando la cabecera If-Modified-Since para saber si la página cambió.</p></li>
<li><p><em>Frescura:</em> que permite que una respuesta sea usada sin comprobar de nuevo el servidor origen, y puede ser controlada tanto por el servidor como el cliente. Por ejemplo, la cabecera de respuesta Expires facilita una fecha en la que el documento caduca, y la directiva <code>Cache-Control: max-age</code> informa al caché del número de segundos durante los que la respuesta será válida.</p></li>
<li><p><em>Invalidación:</em> que normalmente es un efecto secundario de otra petición que pasa por la caché. Por ejemplo, si la URL asociada con una respuesta cacheada es solicitada posteriormente mediante una petición POST, PUT o DELETE, la respuesta cacheada quedará invalidada.</p></li>
</ul>

<p>Esta información es un extracto de <a href="http://es.wikipedia.org/wiki/Cach%C3%A9_web">Caché Web</a>, Wikipedia.</p>

<h3>Como se usa el <em>Caching</em> en Sinatra</h3>

<p>Para agregar la variable <code>Cache-Control</code> antes mencionada a la cabecera se puede hacer de dos maneras; una completamente manual y otra por medio del helper <code>expires</code> de Sinatra. Realicemos la prueba de ambas para que observen como se hacen:</p>

<h4>Control de caché de tipo Frescura</h4>

<p>Para agregar el encabezado <code>Cache-Control</code> manualmente, creemos el siguiente archivo:</p>

<pre>require 'sinatra'

before do
  content_type :txt
end

get '/' do
  headers "Cache-Control" => "public, must-revalidate, max-age=3600",
          "Expires" => Time.at(Time.now.to_i + (60 * 60)).to_s
  "This page rendered at #{Time.now}."
end
</pre>

<p>Cómo siempre debemos tener Sinatra instalado y agregarlo al archivo por medio de un require. Si observamos la ruta <code>'/'</code> podemos apreciar que estamos explícitamente indicándole a Sinatra que agregue un encabezado a la petición llamado <code>Cache-Control</code> que tiene un tiempo de vida <code>max-age</code> de una hora y se debe revalidar en lo que se sirva el archivo y presente el caché expirado. Luego estamos confirmando la fecha en la que debe expirar.</p>

<p>Vamos a hacer la petición mediante un <code>cURL</code> ampliada con <code>-v</code> verbose para ver que está ocurriendo:</p>

<pre>$ curl -v localhost:4567
* Adding handle: conn: 0x7f9909803a00
* Adding handle: send: 0
* Adding handle: recv: 0
* Curl_addHandleToPipeline: length: 1
* - Conn 0 (0x7f9909803a00) send_pipe: 1, recv_pipe: 0
* About to connect() to localhost port 4567 (#0)
*   Trying 127.0.0.1...
* Connected to localhost (127.0.0.1) port 4567 (#0)
> GET / HTTP/1.1
> User-Agent: curl/7.30.0
> Host: localhost:4567
> Accept: */*
>
< HTTP/1.1 200 OK
< Content-Type: text/plain;charset=utf-8
< Cache-Control: public, must-revalidate, max-age=3600
< Expires: 2014-02-12 22:15:42 -0430
< Content-Length: 48
< X-Content-Type-Options: nosniff
* Server WEBrick/1.3.1 (Ruby/2.0.0/2013-11-22) is not blacklisted
< Server: WEBrick/1.3.1 (Ruby/2.0.0/2013-11-22)
< Date: Thu, 13 Feb 2014 01:45:42 GMT
< Connection: Keep-Alive
<
* Connection #0 to host localhost left intact
Página cargada a las 2014-02-12 21:15:42 -0430.
</pre>

<p>Podemos ver que la petición arrojó un código 200 OK y a su vez vemos todo el encabezado de dicha petición. Apreciamos lo siguiente:</p>

<ul>
<li>Cache-Control: public, must-revalidate, max-age=3600</li>
<li>Expires: 2014-02-12 22:15:42 -0430</li>
</ul>

<p>El encabezado de dicha petición contiene todo lo que agregamos manualmente, la etiqueta <code>Cache-Control</code> y la Fecha de expiración de la información que ahí presentamos.</p>

<h4>Control de caché de tipo Frescura con <code>expires</code></h4>

<p>Para agregar el encabezado mediante el helper <code>expires</code> realizamos lo siguiente:</p>

<pre>require 'sinatra'

before do
  content_type :txt
end

get '/2' do
  expires 3600, :public, :must_revalidate
  "Página cargada a las: #{Time.now}."
end
</pre>

<p>Utilizando la etiqueta <code>expires</code> realizamos exactamente lo mismo que hicimos manualmente pero por medio del helper; es decir él agregará las etiquetas de <code>Cache-Control</code> y <code>Expires</code> al encabezado de la petición.</p>

<p>Hagamos la prueba utilizando <code>cURL</code> nuevamente:</p>

<pre>$ curl -i localhost:4567/2
< HTTP/1.1 200 OK
< Content-Type: text/plain;charset=utf-8
< Cache-Control: public, must-revalidate, max-age=3600
< Expires: Thu, 13 Feb 2014 02:48:08 GMT
< Content-Length: 49
< X-Content-Type-Options: nosniff
* Server WEBrick/1.3.1 (Ruby/2.0.0/2013-11-22) is not blacklisted
< Server: WEBrick/1.3.1 (Ruby/2.0.0/2013-11-22)
< Date: Thu, 13 Feb 2014 01:48:08 GMT
< Connection: Keep-Alive
<
* Connection #0 to host localhost left intact
Página cargada a las: 2014-02-12 21:18:08 -0430.
</pre>

<p>Volvemos a apreciar que la petición responde con un código 200 OK y la misma contiene las etiquetas antes descritas y funciona correctamente.</p>

<h4>Control de caché de tipo Validación</h4>

<p>Para agregar el encabezado <code>Last-Modified</code> podemos realizarlo de la siguiente manera:</p>

<pre>require 'sinatra'

before do
  content_type :txt
end

get '/hola' do
  @article = '2014-02-12 21:56:25 -0430'
  last_modified @article
end
</pre>

<p>Muy sencillo, al igual que <code>Expires</code>, <code>last_modified</code> es un helper el cual acepta como parámetro un identificador de tiempo, tal como un campo <code>updated_at</code> de tipo <code>Date</code> en la base de datos. Por no tener base de datos estamos simulando un objeto @article que representa una fecha y agregando esa información al campo <code>Last-Modified</code> para validar el momento de última modificación.</p>

<p>Si ahora probamos con la herramienta <code>cURL</code> podremos observar que se agregó dicho campo al encabezado.</p>

<pre>$ curl -i localhost:4567/hola
HTTP/1.1 200 OK
Content-Type: text/plain;charset=utf-8
Last-Modified: Thu, 13 Feb 2014 02:26:25 GMT
Content-Length: 0
X-Content-Type-Options: nosniff
Server: WEBrick/1.3.1 (Ruby/2.0.0/2013-11-22)
Date: Thu, 13 Feb 2014 02:43:55 GMT
Connection: Keep-Alive
</pre>

<p>Podemos apreciar que la etiqueta se encuentra en el encabezado y se recibió un código 200 OK. Un detalle importante no mencionado anteriormente es que si la información que se presenta ya la tiene el usuario en caché el servidor responderá con un código 304 Not modified volviendo a cargar el contenido que se encontraba en caché.</p>

<hr />

<h2>Etags</h2>

<h3>¿Qué son Etags?</h3>

<p>Los Etags como su nombre lo indica son Etiquetas de Entidad y son utilizadas como otra forma de validar la Frescura del recurso. Por lo general son huellas que pueden ser un sha1, md5, etc..) que representan la integridad de la data, es decir si cambiamos 1 bit, esta huella o <em>fingerprint</em> se modificará indicándole al navegador que el recurso cambió.</p>

<p>Vamos a agregar el Etag a nuestro encabezado:</p>

<pre>require 'sinatra'
require 'digest/sha1'

before do
  content_type :txt
  @article = '2014-02-12 21:56:25 -0430'
  @article_etag = Digest::SHA1.hexdigest @article.to_s
end

get '/etag' do
  etag @article_etag
  "Valor del Etag: #{@article_etag}."
end
</pre>

<p>Podemos apreciar que se requiere la librería <code>digest/sha1</code> para poder realizar le el checksum al objeto @article para generar el objeto @article_etag. Luego solo debemos agregar la etiqueta <code>etag</code> y pasarle el objeto <code>@article_etag</code> a la misma.</p>

<p>Si hacemos la petición del URL <code>/etag</code> apreciamos lo siguiente:</p>

<pre>curl -i localhost:4567/etag
HTTP/1.1 200 OK
Content-Type: text/plain;charset=utf-8
Etag: "617f6a40761c57030dabf997bd912abf5c61729f"
Content-Length: 57
X-Content-Type-Options: nosniff
Server: WEBrick/1.3.1 (Ruby/2.0.0/2013-11-22)
Date: Thu, 13 Feb 2014 04:37:54 GMT
Connection: Keep-Alive

Valor del Etag: 617f6a40761c57030dabf997bd912abf5c61729f.%
</pre>

<p>Se generó correctamente dicha etiqueta y es un número que nos permitirá detallar si algo fue modificado en el objeto, sea lo que sea.</p>

<hr />

<h2>Conclusión</h2>

<p>En este onceavo capítulo de la serie, hemos visto como realizar <em>caching</em> de lo que enviamos desde el servidor hacia el navegador del usuario. Vimos que podemos utilizar varias técnicas para realizarlo y además aprendimos sobre Etags, todo con la finalidad de comprobar la validez y frescura de las peticiones que enviamos para ahorrarnos ancho de banda, aumentar la velocidad de respuesta y minimizar la carga en el servidor. Si te surge algún tipo de duda no te detengas y déjanos un comentario, que gustosamente lo responderemos.</p>

<p>¡Hasta el próximo capítulo!</p>
