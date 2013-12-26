---
layout: post
status: publish
published: true
title: Vistas
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
wordpress_id: 2498
wordpress_url: http://codehero.co/?p=2498
date: 2013-10-31 02:53:03.000000000 -04:30
categories:
- Sinatra
tags:
- Cursos
- curso
- Sinatra
---
<p>La serie de Sinatra desde Cero, buscará otorgarte el conocimiento necesario para que puedas desarrollar tus propias aplicaciones Web haciendo uso de esta magnifica herramienta.</p>

<p>En este cuarto capítulo te enseñaremos a como utilizar las vistas en Sinatra. Cuando nos referimos a vistas pueden ser: simples archivos estáticos con representación de un "markup" HTML, vistas con código en linea dentro del archivo principal del proyecto o archivos específicos de vistas donde se pueden utilizar diferentes tipos de lenguajes para representar el "markup". Además aprenderemos a pasarle información de manera dinámica a las vistas.</p>

<blockquote>
  <p>Para comprender correctamente todo lo que hablaremos en esta serie, es conveniente tener un conocimiento básico sobre el lenguaje de Ruby. Podrás conseguir toda la información desees <a href="http://codehero.co/category/tutoriales/ruby/">aquí</a></p>
</blockquote>

<hr />

<h2>Vistas como archivos estáticos.</h2>

<p>Las vistas como archivos estáticos, no permiten que se les pase ningún tipo de información proveniente de un controlador, por esto su nombre contiene la palabra estáticas. En pocas palabras es una representación HTML de una información. Normalmente estas vistas son utilizadas para la creación de secciones dentro de las páginas web; algo como: "Acerca de", "Nosotros", "La empresa", entre otras… Esta información cambia muy poco en el tiempo y por esa razón se utilizan archivos estáticos para crearlas.</p>

<p>Podemos ver con este pequeño ejemplo como se utilizan:</p>

<p>Primero debemos crear el servidor y agregar la ruta y el verbo adecuado para servir nuestra vista estática.</p>

<pre>require 'sinatra'

get '/nosotros.html' do
  "cargando pagina estatica."
end
</pre>

<p>Segundo debemos crear una carpeta que se llame <code>public</code> en la raíz del proyecto, para posteriormente agregar la vista estática.</p>

<p><img src="http://i.imgur.com/5qH2CG9.png" alt="foto" /></p>

<p>Si utilizamos la herramienta <code>tree</code> para ver la estructura del proyecto podemos observar:</p>

<pre>.
├── public
│   └── nosotros.html
└── server.rb

1 directory, 2 files
</pre>

<p>Por lo que pueden observar es bastante sencillo crear y utilizar vistas estáticas. Por otro lado ¿qué ocurre cuando no se encuentra el archivo <code>nosotros.html</code>? Pues simplemente veremos en pantalla el mensaje <code>"cargando pagina estatica."</code> que escribimos en la ruta.</p>

<hr />

<h2>Vistas en línea.</h2>

<p>Las vistas en linea o lineales es un tipo de vista que podría o no encontrarse en un archivo externo pero por lo general cuando se decide utilizar este tipo de vistas se coloca todo el código que la comprende en el mismo archivo principal donde se encuentran las rutas. Si llegáramos a realizar una aplicación muy pequeña, 1 o 2 vistas puede que se nos haga más sencillo hacer esto, aunque personalmente prefiero que los archivos estén bien ordenados y delegar las funciones de la aplicación correctamente. Mi recomendación es no utilizar este tipo de vistas.</p>

<p>Independientemente de mi opinión estas vistas existen y las podemos utilizar de la siguiente manera:</p>

<pre>require 'sinatra'

get '/index' do
  erb :index
end
</pre>

<p><img src="http://i.imgur.com/Iu6BOXg.png" alt="enlinea" /></p>

<p>Lo primero que debemos observar es que la ruta tiene un tipo de "template" llamado <code>erb</code>. Lo segundo es que el nombre de la vista es de tipo "symbol" (<code>:índex</code>). Lo tercero es que se está delimitando el código de la ruta y la vista con <code>__END__</code> y la cuarta anotación es que la vista se llama con <code>@@index</code>.</p>

<hr />

<h2>Vistas externas</h2>

<p>Las vistas externas son el tipo de vistas que acostumbramos a usar en la mayoría de nuestros proyectos; ya sea para separaras bien el código y mantenerlo ordenado o porque es un estándar de un framework. Estas vistas al igual que en las vistas en línea usan un tipo de lenguaje de "template" sea <code>erb</code>, <code>haml</code>, <code>builder</code>, <code>liquid</code>, <code>markdown</code>, etc… para trabajar con parámetros e información que reciben desde los controladores. Sinatra busca las vistas externas en una carpeta llamada <code>views</code> que se debe encontrar en la raíz del proyecto.</p>

<p>Hagamos una pequeña prueba:</p>

<pre>require 'sinatra'

get '/contacto' do
  erb :contacto
end
</pre>

<p>En la carpeta <code>views</code> debemos crear un archivo llamado contacto y agregar un "markup" en HTML. se debe tener presente que el archivo aunque tenga "markup" HTML debe tener extensión <code>.erb</code> ya que le estamos diciendo a Sinatra que ese es el "markup" que utilizaremos.</p>

<p><img src="http://i.imgur.com/2p61uNt.png" alt="externa" /></p>

<p>La estructura del proyecto es la siguiente:</p>

<pre>.
├── public
│   └── nosotros.html
├── server.rb
└── views
    └── contacto.erb
</pre>

<p>La ubicación de la carpeta de las vistas puede ser modificada si no es del agrado de ustedes de la siguiente manera <code>set :views, File.dirname(__FILE__) + '/su_directorio_de_preferencia'</code></p>

<p>Si llegaran a crear subcarpetas dentro de <code>views</code> como podría ser <code>views/usuarios</code> deben especificar la ruta a la vista que quieren utilizar.</p>

<pre>get '/:usuarios/' do
  erb '/usuarios/index'.to_sym
end
</pre>

<h3>Paso de parámetros a las vistas</h3>

<p>El paso de parámetros a las vistas es algo sumamente normal en una aplicación ya que son estos los que convierten una vista "estática" en dinámica. En Sinatra es relativamente sencillo realizar un paso de parámetros. Supongamos que estamos buscando en una base de datos el nombre de un usuario y lo queremos mostrar en una vista.</p>

<pre>require 'sinatra'

get '/usuario' do
  @nombre = "alberto"
  erb :usuario
end
</pre>

<p>Podemos observar que la variable <code>nombre</code> contiene una @. Este carácter permite que el contenido de la variable se encuentre visible en las vistas. Luego de la misma manera que hicimos anteriormente agregamos la vista.</p>

<p><img src="http://i.imgur.com/w2EXuo3.png" alt="parametro" /></p>

<p>Aquí la única diferencia notable con respecto de la vista de contacto es que utilizamos unos caracteres especiales asociados a <code>.erb</code> para poder hacer visible el contenido de la variable. De esta manera al acceder a la ruta <code>/usuario</code> en nuestro navegador podremos ver que despliega el contenido esperado.</p>

<hr />

<h2>Conclusión</h2>

<p>En este cuarto capítulo, hemos aprendido cuales son los tipos y como funcionan las vistas en Sinatra, es muy importante que revisen detalles a cerca de el lenguaje de templating <code>.erb</code> ya que les ayudará a entender varios detalles que veremos más adelante. Si te surge algún tipo de duda no te detengas y déjanos un comentario, que gustosamente lo responderemos.</p>

<p>¡Hasta el próximo capítulo!</p>
