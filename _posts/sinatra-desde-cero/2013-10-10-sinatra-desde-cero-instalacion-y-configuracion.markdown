---
layout: post
status: publish
published: true
title: Instalación y configuración.
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
wordpress_id: 2364
wordpress_url: http://codehero.co/?p=2364
date: 2013-10-10 00:02:29.000000000 -04:30
series:
  nombre: Sinatra desde Cero
  thumbnail: http://i.imgur.com/UXeX0sa.png
categories:
- Cursos
- Sinatra
tags:
- Cursos
- curso
- Sinatra
---
<h1>Instalación y configuración.</h1>

<p>La serie de Sinatra desde Cero, buscará otorgarte el conocimiento necesario para que puedas desarrollar tus propias aplicaciones Web haciendo uso de esta magnifica herramienta.</p>

<p>En este primer capítulo te enseñaremos el proceso de instalación y explicaremos algunas de las características principales que posee esta herramienta.</p>

<p>Para comprender correctamente todo lo que hablaremos en esta serie, es conveniente tener un conocimiento básico sobre el lenguaje de Ruby. Podrás conseguir toda la información desees <a href="http://codehero.co/category/tutoriales/ruby/">aquí</a></p>

<hr />

<h2>Introducción a Sinatra.</h2>

<p>Sinatra es un DSL (<a href="http://es.wikipedia.org/wiki/Lenguaje_espec%C3%ADfico_del_dominio">Lenguaje específico del dominio</a>) para construir páginas Web, servicios Web o aplicaciones Web en Ruby. Sinatra está basado en el enfoque minimalista de desarrollo, es decir no existe una estructura ni una manera "correcta" de hacer las cosas, solo una "mejor práctica" de como realizarlo, ofreciendo al desarrollado una manera súper esencial para el manejo del protocolo HTTP.</p>

<p>Todo el DSL está escrito en menos de dos mil (2000) lineas de Ruby, es muy expresivo y simple de usar. Sinatra es altamente usado por los desarrolladores de Ruby para implementar un API o servicio Web. Las aplicaciones en Sinatra también pueden ser embebidas dentro de otras aplicaciones Web desarrolladas en Ruby si las mismas son empaquetadas como una gema, tal es el caso de <a href="https://github.com/resque/resque">Resque</a>.</p>

<h3>¿Por qué no se considera un framework?</h3>

<p>Sinatra no es un framework porque no tiene un <a href="http://es.wikipedia.org/wiki/Mapeo_objeto-relacional">ORM</a> (Mapeo objeto-relacional), instalas el de tú preferencia. No tiene archivos de configuración predeterminados ni estructura de proyecto, permitiendo libertad a la hora de la toma de decisiones sobre la estructura del proyecto en base a el tamaño y necesidades del mismo.</p>

<p>En el mundo de Python su homólogo es <a href="http://flask.pocoo.org/">Flask</a>, en Node.js es <a href="http://codehero.co/series/node-y-express/">Express</a> y prácticamente todos los lenguajes que existen tienen su DSL como Sinatra.</p>

<p>Si desean utilizar un framework en Ruby, pueden irse por el mítico <a href="http://codehero.co/series/ruby-on-rails-desde-cero/">Ruby on Rails</a> o con <a href="http://www.padrinorb.com/">Padrino</a> que lleva el "core" (corazón) de Sinatra a un patrón de arquitectura de software MVC.</p>

<hr />

<h2>Instalación</h2>

<p>A la mayoría de los nosotros nos gusta gastar un poco de tiempo en la creación de un espacio de trabajo, para garantizar un desarrollo mas eficiente sin tantas interrupciones, aunque este mismo proceso de creación de un espacio de trabajo puede llevarse muchísimas horas y nunca lo encontraremos perfecto. Siempre habrá algo más que agregar.</p>

<p>Para este curso demostraremos la instalación del habiente de desarrollo para los principales en Sistemas Operativos (Mac OSX, Linux y windows) ya que este proceso es diferente entre cada uno de ellos.</p>

<h3>Instalación en Windows</h3>

<p>Si eres un usuario Windows la instalación no es tan nativa como para los otros sistemas operativos. Particularmente recomendamos el instalador <a href="http://railsinstaller.org/en">RailsInstaller</a> que a aparte de instalar el lenguaje de Ruby y el framework de Rails (no es lo que vamos a usar) también instala otros atributos como: SQLite o Git (Esta solución funciona perfectamente para sistemas operativos Windows y Mac OSX. yo solo se las recomiendo si son usuarios Windows). Luego únicamente quedaría instalar la gema de Sinatra y Thin como servidor web. Esto lo puedes ver en la instalación de Mac OS X.</p>

<h3>Instalación en OS X</h3>

<p>Si eres usuario Mac OS X te recomendamos instalar Ruby de la siguiente manera, ya que así no tendremos conflicto con la versión que trae pre-instalada el sistema operativo y es algo "bastante" vieja y actualmente se encuentra descontentada. Lo primero que debemos hacer, es instalar <a href="https://github.com/sstephenson/rbenv">rbenv</a> un manejador de versiones para Ruby, utilizando preferiblemente <a href="http://brew.sh/index_es.html">Homebrew</a> que es un manejador de paquetes para mac, algo cómo <code>apt-get</code> o <code>yum</code> en linux.</p>

<blockquote>
  <p>Si en lo personal tienes preferencia con otro manejador de versiones de Ruby y conoces como instalarlo puedes proceder a hacerlo, o puedes revisar <a href="https://github.com/postmodern/chruby">chruby</a> y <a href="https://rvm.io/">rvm</a>.</p>
</blockquote>

```sh
$ brew install rbenv ruby-build rbenv-gem-rehash
```

<p>De esta manera tendremos instalado el manejador de versiones y el instalador de Ruby.</p>

```sh
$ rbenv install 2.0.0-p247
```

<p>Una vez instalada la versión de Ruby debemos reiniciar el Terminal. Cerrándolo y abriéndolo.</p>

<p>Luego debemos fijar la versión de Ruby que acabamos de instalar como la versión predeterminada. <code>rbenv global 2.0.0-p247</code> si todo funcionó correctamente al escribir <code>ruby -v</code> deberíamos observar como salida la versión que elegimos.</p>

<p>Una vez que ya tenemos la versión de Ruby 2.0 por defecto de nuestro equipo es hora de instalar la gema de Sinatra y del servidor Ruby necesario para correr la aplicación llamado "Thin".</p>

```sh
$ gem install sinatra thin
```

<p>Esto instalará todas las dependencias necesarias para ambas gemas.</p>

<h3>Instalación en Linux (Ubuntu).</h3>

<p>El proceso de instalación en Ubuntu es bastante parecido al de Mac OS X, solo que para este no utilizamos un gestor de paquetes, pero debemos tener instalado el paquete <code>git core</code> <a href="http://codehero.co/git-desde-cero-instalacion-configuracion-y-comandos-basicos/">aquí nos enseña como se instala</a>.</p>

<p>Instalaremos de igual manera rbenv y ruby-build, aunque un poco diferente.</p>

```sh
$ git clone git://github.com/sstephenson/rbenv.git ~/.rbenv
$ git clone https://github.com/sstephenson/ruby-build.git ~/.rbenv/plugins/ruby-build
```

<p>Una vez instalados debemos exportar la dirección particular donde se encuentra instalado para poder utilizar el comando <code>rbenv</code> desde cualquier ubicación.</p>

```sh
$ echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bash_profile
$ echo 'eval "$(rbenv init -)"' >> ~/.bash_profile
```

<p>Reiniciamos el Terminal y si todo funcionó correctamente al correr <code>$ type rbenv</code> debería indicarnos que es una función.</p>

<p>A partir de este paso instalamos ruby en su versión 2.0.0 parche 247 tal cual como en Mac OS X.</p>

```sh
$ rbenv install 2.0.0-p247
```

<p>Una vez instalada la versión de Ruby debemos reiniciar el Terminal. Cerrándolo y abriéndolo.</p>

<p>Luego debemos fijar la versión de Ruby que acabamos de instalar como la versión predeterminada. <code>rbenv global 2.0.0-p247</code> si todo funcionó correctamente al escribir <code>ruby -v</code> deberíamos observar como salida la versión que elegimos.</p>

<p>Una vez que ya tenemos la versión de Ruby 2.0 por defecto de nuestro equipo es hora de instalar la gema de Sinatra y del servidor Ruby necesario para correr la aplicación llamado "Thin".</p>

```sh
$ gem install sinatra thin
```

<p>Esto instalará todas las dependencias necesarias para ambas gemas.</p>

<hr />

<h2>Corriendo una aplicación en Sinatra.</h2>

<p>Ya tenemos todo instalado correctamente, es hora de hacer nuestro famoso "Hola, mundo!" en Sinatra para comprobar que todo se instaló correctamente y dar nuestros primeros pasos en esta magnifica herramienta.</p>

<p>Debemos crear un archivo llamado <code>server.rb</code> dentro de una carpeta de nuestra preferencia y escribir lo siguiente:</p>

```sh
$ cat server.rb
require 'sinatra'

get '/' do
  "Hola, mundo!"
end
```

<p>cuando hayan finalizado, para poder visualizar debemos correr el servidor de <code>thin</code> para observar el mensaje "Hola, mundo!" en nuestro navegador Web. Para esto utilizamos el siente comando:</p>

```ruby
$ ruby server.rb
== Sinatra/1.4.3 has taken the stage on 4567 for development with backup from Thin
```

<p>Si abrimos nuestro navegador en <a href="http://localhost:4567">localhost con el puerto 4567</a> observaremos nuestro "Hola, mundo!".</p>

<hr />

<h2>Conclusión</h2>

<p>En este capítulo, aprendimos los conceptos básicos a cerca de Sinatra, a como instalarlo e hicimos nuestra primera aplicación usándolo. Si te surge algún tipo de duda no te detengas y déjanos un comentario, que gustosamente lo responderemos.</p>

<p>¡Hasta el próximo capítulo!</p>
