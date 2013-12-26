---
layout: post
status: publish
published: true
title: Enrutamiento
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
wordpress_id: 2409
wordpress_url: http://codehero.co/?p=2409
date: 2013-10-17 00:11:44.000000000 -04:30
categories:
- Cursos
tags:
- Cursos
- curso
- Sinatra
---
<p>La serie de Sinatra desde Cero, buscará otorgarte el conocimiento necesario para que puedas desarrollar tus propias aplicaciones Web haciendo uso de esta magnifica herramienta.</p>

<p>En este segundo capítulo te enseñaremos como realizar el enrutamiento para servir peticiones HTTP y los distintos verbos (HTTP) necesarios para realizar esta tarea efectivamente.</p>

<blockquote>
  <p>Para comprender correctamente todo lo que hablaremos en esta serie, es conveniente tener un conocimiento básico sobre el lenguaje de Ruby. Podrás conseguir toda la información desees <a href="http://codehero.co/category/tutoriales/ruby/">aquí</a></p>
</blockquote>

<hr />

<h2>Enrutamiento</h2>

<p>La habilidad principal de Sinatra es poder manejar y responder a una o más rutas. ¿Qué son estas rutas? Las rutas son la manera fundamental de comunicación e interacción de una aplicación web. Para poder entender esto se requiere un conocimiento básico de el protocolo <a href="http://es.wikipedia.org/wiki/Hypertext_Transfer_Protocol">HTTP</a>.</p>

<p>Nosotros te explicaremos de manera sencilla los verbos de este protocolo que utiliza Sinatra por defecto.</p>

<h3>Get</h3>

<p>Pide al servidor una representación del recurso específico. Por ejemplo cuando vamos a nuestro navegador de internet y escribimos <a href="http://codehero.com">codehero.com</a> el navegador va a generar una petición "GET" con la cual el servidor de Codehero responde enviando el contenido (markup) de la página. Por seguridad no debería ser usado para la transmisión de información de carácter privado (claves, información personal) ya que será visible a través del URL.</p>

<h3>Post</h3>

<p>El POST es usado para enviar los datos de un recurso específico al servidor para que el mismo sea procesado. Los datos a diferencia del GET se incluirán en el cuerpo de la petición y no como parámetros del URL. El resultado de una petición de tipo POST puede generar la creación de un nuevo recurso o actualización de los recursos existentes o ambas cosas.</p>

<h3>Put</h3>

<p>Sube, carga o realiza una actualización en la representación de un recurso especificado (pude ser un archivo), ya que este verbo es el camino más eficiente para subir archivos a un servidor, esto es porque en POST utiliza un mensaje multi-parte y el mensaje es descodificado por el servidor. En contraste, el método PUT te permite escribir un archivo en una conexión socket establecida con el servidor. La desventaja del método PUT es que los servidores de hosting compartido no lo tienen habilitado.</p>

<h3>Delete</h3>

<p>Se utiliza para borrar el recurso especificado.</p>

<h3>Patch</h3>

<p>PATCH es usado para actualizar una porción de un recurso. A diferencia de PUT o POST se actualizan únicamente ciertos aspectos del mismo y nunca el recurso completo. Por ejemplo cuando tenemos un usuario en base de datos y solo queremos cambiar su primer nombre.</p>

<h3>Options</h3>

<p>Devuelve los métodos HTTP que el servidor soporta para un URL específico. Esto puede ser utilizado para comprobar la funcionalidad de un servidor web mediante petición en lugar de un recurso específico.</p>

<blockquote>
  <p>Si quieres agregar más verbos puedes instalar la gema de <code>sinatra-contrib</code> que extiende las funcionalidad de Sinatra en varios aspectos.</p>
</blockquote>

<p>Cierta información fue citada de <a href="http://es.wikipedia.org/wiki/Hypertext_Transfer_Protocol">wikipedia</a> y del libro <a href="http://shop.oreilly.com/product/0636920019664.do?sortby=publicationDate">Sinatra: Up and Running</a>.</p>

<h2>¿Cómo se definen las rutas?</h2>

<p>Si se recuerdan del capítulo anterior, en la última parte hicimos una pequeña aplicación que respondía a una petición de tipo GET y escribía "Hola, mundo!". Ahora vamos a mostrar como responde Sinatra a los diferentes verbos HTTP.</p>

<pre>require 'sinatra'

get '/' do
  "Hola, mundo!"
end

post '/' do
  "Hola, mundo! desde un POST"
end

put '/' do
  "Hola, mundo! desde un PUT"
end

delete '/' do
  "Hola, mundo! desde un DELETE"
end

patch '/' do
  "Hola, mundo! desde un PATCH"
end

options '/' do
  "Hola, mundo! desde un OPTIONS"
end
</pre>

<p>Si probamos la petición GET y POST utilizando el comando <code>cURL</code> podemos ver como responden las diferentes rutas de nuestra pequeña aplicación.</p>

<pre>$ curl -X POST localhost:4567
Hola, mundo! desde un POST%                                                                                                 
$ curl -X GET localhost:4567
Hola, mundo!%
</pre>

<p>De la misma manera funcionan el resto de los recursos cuando le pasamos el tipo de verbo que queremos usar!</p>

<h3>¿Qué pasa si existen varias rutas con funciones similares?</h3>

<p>Debemos recordar que mientras menos código repetido tengamos en nuestra aplicación mejor es para todos. Por eso es que el concepto de DRY (no te repitas) aplica también para las rutas.</p>

<p>Si tenemos 2 rutas que hacen exactamente lo mismo o algo muy parecido podemos realizar lo siguiente:</p>

<p>En el archivo <code>server.rb</code></p>

<pre>require 'sinatra'

['/uno', '/dos'].each do |route|
  get route do
    "Hola desde #{route} via GET"
  end

  post route do
    "Triggered #{route} via POST"
  end
end
</pre>

<p>si probamos con cURL</p>

<pre>% curl --request POST localhost:4567/uno
Triggered /uno via POST%                                                                                                
% curl --request POST localhost:4567/dos
Triggered /dos via POST%                                                                                                
% curl --request GET localhost:4567/uno
Hola desde /uno via GET%                                                                                                
% curl --request GET localhost:4567/dos
Hola desde /dos via GET%
</pre>

<p>Por lo que podemos observar si dos URL son relativamente similares podemos realizar algo similar. Esto es muy útil para realizar los famosos CRUD ya que necesitamos varias peticiones similares que respondan tanto a GET como a POSTS.</p>

<hr />

<h2>Conclusión</h2>

<p>En este segundo capítulo, aprendimos los conceptos básicos a cerca de Enrutamiento en Sinatra. Cuales son los verbos existentes, como se usan y que hacemos cuando queremos tener nuestra aplicación sin código repetido. Si te surge algún tipo de duda no te detengas y déjanos un comentario, que gustosamente lo responderemos.</p>

<p>¡Hasta el próximo capítulo!</p>
