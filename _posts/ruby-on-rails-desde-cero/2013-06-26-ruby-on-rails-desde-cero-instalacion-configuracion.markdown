---
layout: post
status: publish
published: true
title: Instalación & Configuración
author: Ricardo Sampayo
author_login: ricardo
author_email: ricardo9588@gmail.com
author_url: http://www.ricardosampayo.com
wordpress_id: 1153
wordpress_url: http://codehero.co/?p=1153
date: 2013-06-26 06:04:25.000000000 -04:30
categories:
- Cursos
- Ruby on Rails
tags:
- Ruby
- Cursos
- Ruby on Rails
- desde cero
- instalacion
- configuracion
---
<p>Las series de tutoriales <em>Ruby on Rails</em> en CodeHero buscan otorgarte los conocimientos necesarios, para que puedas desarrollar tus propias aplicaciones Web. En este primer capitulo te mostraremos el proceso de instalación y algunas características básicas del framework.</p>

<p>Para este serie de tutorales es necesario conocimiento básico sobre el lenguaje Ruby que podrán conseguir rápidamente en <a href="http://codehero.co/category/tutoriales/ruby/">CodeHero</a></p>

<h2>Introducción de Ruby on Rails.</h2>

<p>Es un framework de desarrollo web de código abierto, escrito en Ruby, siguiendo el paradigma de la arquitectura Modelo Vista Controlador (MVC), el cual permite un desarrollo mas eficiente, desacoplado y mantenible de las aplicaciones.</p>

<h2>Instalación Ruby on Rails</h2>

<p>La mayoría de los desarrolladores les gusta gastar un poco de tiempo la creación de su espacio de trabajo, para garantizar un desarrollo mas eficiente sin tantas interrupciones. Para este tutorial demostraremos la instalación del habiente de desarrollo para los principales sistemas operativos (Mac OSX, Linux y windows) ya que este proceso es diferente entre cada uno de ellos.</p>

<h3>Ruby on Rails en Windows</h3>

<p>Si eres un usuario Windows la instalación no es tan nativa como para los otros sistemas operativos. Particularmente recomiendo la instalación con ayuda de <a href="http://railsinstaller.org/">RailsInstaller</a> que a aparte de instalar el lenguaje agrega las funcionalidades del Framework y otros atributos como: SQLite o Git (Esta solución funciona perfectamente para sistemas operativos Windows y Mac OSX. yo solo se las recomiendo si son usuarios Windows).</p>

<h3>Ruby on Rails en Mac OS X</h3>

<p>Si eres usuario Mac OS X te recomiendo la instalación de Ruby utilizando un gestor de paquetes llamado <a href="http://mxcl.github.io/homebrew/">Homebrew</a>, para así tener una instalación correcta del Framework.</p>

<p>Lo primero que debemos hacer es instalar Ruby con el siguiente comando (Este paso esta explicado de mejor manera en la serie de tutorales <a href="http://codehero.co/category/tutoriales/ruby/">Ruby desde cero</a>):</p>

<pre>brew install ruby 
</pre>

<p>Luego de esto instalamos rbenv es un paquete que proporciona apoyo para instalación y manipulación de diferentes versiones de Ruby y las herramientas necesarias para configurar tu framework. Luego instalamos ruby-build para compilar diferentes versiones de Ruby. el comando para instalar estos paquetes es el siguiente:</p>

<pre>brew install rbenv ruby-build
</pre>

<p>Por último instalamos Rails, con el gestor de paquetes RubyGems utilizando el siguiente comando:</p>

<pre>gem install rails  
</pre>

<p>Con RubyGems también podemos listar y verificar las gemas y paquetes relacionados con el lenguaje (con este comando vemos que versión de railes instalamos):</p>

<pre>gem list
</pre>

<h3>Ruby on Rails en Ubuntu</h3>

<p>EL proceso de instalación en Ubuntu es bastante parecido al de Mac OS X, solo que para este no utilizamos un gestor de paquetes. Cabe destacar que para instalar Ruby en Ubunto debemos añadir a la instalación todas las dependencias que requiera el lenguaje. Primero instalamos rbenv con el siguiente comando:</p>

<pre>git clone git://github.com/sstephenson/rbenv.git ~/.rbenv
</pre>

<p>Luego agregamos la tuta del rbenv al PATH del sistema:</p>

<pre>echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> .bash_profile
echo 'eval "$(rbenv init -)"' >> .bash_profile
source ~/.bash_profile  
</pre>

<p>Una vez culminara la instalación del rbenv, instalamos ruby-build para así poder manejar varias versiones del lenguaje, con el siguiente comando:</p>

<pre>pushd /tmp
  git clone git://github.com/sstephenson/ruby-build.git
  cd ruby-build
  ./install.sh
popd
</pre>

<p>El siguiente paso es instalar la versión que queramos de Ruby, para este caso es (ruby 2.0.0p195):</p>

<pre>rbenv install 2.0.0p195
rbenv rehash
</pre>

<p>Por último al igual que para Mac OS X instalamos la version de Rails que necesitemos:</p>

<pre>gem install rails   
</pre>

<h2>Primeros paso con Ruby on Rails</h2>

<p>Lo primero que necesitamos hacer es crear un nuevo proyecto, para ello nos ubicamos en una carpeta donde queramos alojar el proyecto, y ejecutamos el siguiente comando:</p>

<pre>rails new codehero_web
</pre>

<p>Veremos como en la consola se agregan una gran cantidad de archivos que conforman la estructura del proyecto. y por ultimo arrancamos el servidor:</p>

<pre>rails s
</pre>

<p>Si no tenemos ningún error el servidor se levanto exitosamente y podremos ver nuestro proyecto funcionando desde el navegador en <a href="http://127.0.0.1:8000/">127.0.0.1:8000</a> (para detener el servidor solo presionamos <code>Ctrl + C</code>). donde veremos la siguiente vista:</p>

<p><img src="http://i.imgur.com/mSCF9rj.jpg?1" alt="FOTO" /></p>

<h2>Conclusión</h2>

<p>En esta lección, instalamos un Ruby on Rails desde cero, y creamos nuestro primer proyecto en railes. Siéntanse libres en consultar cualquier duda a través de los comentarios.</p>

<p>¡Hasta el próximo capítulo!</p>
