---
layout: post
status: publish
published: true
title: Instalación & Configuración
author: Ricardo Sampayo
author_login: ricardo
author_email: ricardo9588@gmail.com
author_url: http://www.ricardosampayo.com
wordpress_id: 812
wordpress_url: http://www.polarux.com/?p=812
date: 2013-06-03 03:22:50.000000000 -04:30
categories:
- Cursos
- Ruby
tags:
- Ruby
- desde cero
- instalacion
- configuracion
---
<p>Las series de tutoriales <strong>Ruby</strong> en CodeHero buscan otorgarte los conocimientos necesarios, para que puedas desarrollar tus propias aplicaciones. En este primer capitulo te mostraremos el proceso de instalación y algunas características básicas del lenguaje para introducirte en en este nuevo mundo.</p>

<p>A pesar de que estaríamos hablando de Ruby 1.8.7 en la plataforma Mac, estos comandos son apropiados para los usuarios de Linux / Windows también.</p>

<h2>Introducción de Ruby como lenguaje.</h2>

<p>Ruby es un lenguaje de programación completamente orientado a objetos, interpretado (Scripts) y de código abierto enfocado en la simplicidad y productividad que se logra gracias a su sintaxis fácil y natural. Fue creado en 1993 por un japonés llamado <strong>Yukihiro Matsumoto</strong>.</p>

<h6>Características.</h6>

<ul>
<li>Completamente orientado a objetos (Todo es un Objeto).</li>
<li>lenguaje de script del lado del servidor similar a Python y Perl.</li>
<li>Sintaxis limpia y fácil que permite adaptarse rápido al lenguaje.</li>
<li>Innecesarias declaración de variables.</li>
<li>Gestión de memoria Automatica.</li>
</ul>

<hr />

<h2>Instalación.</h2>

<p>En este caso la instalación de Ruby la demostraremos para los principales sistemas operativos (Mac OSX, Linux y windows) ya que este proceso es diferente entre cada uno de ellos.</p>

<h3>Ruby en Mac OS.</h3>

<p>Ruby ya viene integrado al sistema operativo se puede verificar abriendo el terminal.app y colocando la siguiente linea de comando: <strong>ruby -v</strong> o <strong>ruby --version</strong>:</p>

<pre>>> ruby -v  
>> ruby 2.0.0p195 (2013-05-14 revision 40734) [x86_64-darwin12.3.0] 
</pre>

<p>Por otro lado si por alguna razón no dispones de Ruby en el sistema operativo los puedes descargar <a href="http://www.ruby-lang.org/en/downloads/">ruby-lang.org</a> o utilizar un gestor de paquetes para Mac OS X como lo es <a href="http://mxcl.github.io/homebrew/">Homebrew</a>, con el siguiente comando (Requiere instalación previa de Homebrew):</p>

<pre>>> brew install ruby
</pre>

<p>Luego de instalado por Homebrew agregamos la ruta de primero al $PATH de la siguiente forma:</p>

<pre>>> export PATH=/usr/local/bin:$PATH 
</pre>

<p>Para versiones anteriores a Leopard le recomendamos revisar las versiones de Ruby disponibles para su sistema operativo.</p>

<h3>Ruby en Linux.</h3>

<p>AL igual que para la instalación de Ruby en Mac OS se verifica la versión del lenguaje de la misma manera y dependiendo de la distribución de Linux que poseas se instala de diferentes maneras. Por ejemplo Debian, GNU/Linux o Ubuntu se utiliza el gestor de paquetes APT de la siguiente manera:</p>

<pre>>> sudo apt-get install ruby1.9.1
</pre>

<p>En otros sistemas operativos se puede buscar en el repositorio de paquetes para el administrador de tu distribución Linux.</p>

<h3>Ruby en Windows.</h3>

<p>Si eres un usuario Windows la instalación no es tan nativa como para los otros sistemas operativos. Particularmente recomiendo la instalación con ayuda de <a href="http://rubyinstaller.org/">RubyInstaller</a>{:rel=nofollow} este te da todas las herramientas para configurar el entorno de desarrollo completo en Windows</p>

<p>Si la razón por la que quieres instalar Ruby es para utilizar el Framwork Rails, podrían utilizar <a href="http://railsinstaller.org/">RailsInstaller</a> que a aparte de instalar el lenguaje agrega las funcionalidades del Framwork y otros atributos como: SQLite o Git (Esta solución funciona para sistemas operativos Windows y Mac OSX. yo la recomiendo solo para usuarios Windows).</p>

<h3>Primeros pasos en Ruby.</h3>

<p>Listo ya tenemos Ruby instalado en nuestro sistema operativo, vamos ha realizar unos ejemplos sencillos para adentrarnos en el mundo del lenguaje.</p>

<p>En nuestro primer ejemplo vamos a hacer un programa simple que imprima una cadena de caracteres sencilla. Para imprimir esta cadena vamos a utilizar la función <em>puts</em> y escribimos la cadena entre comillas.</p>

<pre>>> ruby -e "puts 'Bienvenido a CodeHero'"
Bienvenido a CodeHero
</pre>

<p>En el segundo ejemplo vamos a crear un archivo plano con ayuda de un editor de texto, lo vamos a llamar pruebaCodeHero.rb (la extensión para los archivos en Ruby es .rb) y lo guardamos, pero antes agregamos unos comandos al archivo:</p>

<pre>puts "Bienvenidos a CodeHero"
# Una simple suma
puts 2 + 3
# Multiplicación
puts 3 * 6
# Elevar al cuadrado
puts 3 ** 2
# Imprime una cadena al revez 'oreHedoc'
puts "codeHero".reverse
# Imprime todo en mayúscula
puts "codeHero".upcase
</pre>

<p>Desde el terminal ejecutamos el archivo de la siguiente forma. "<em>ruby pruebaCodeHero.rb</em>" y ya empezamos a ver algunos detalles en el lenguaje, como por ejemplo los comentarios que llevan un # al principio de la linea, no se usa ningún indicativo de que se termino el comando simplemente un salto de linea (enter) y vemos algunas funciones del objeto <em>String</em> (reverse y upcase)</p>

<pre>>> ruby pruebaCodeHero.rb 
Bienvenidos a CodeHero
5
18
9
oreHedoc
CODEHERO
</pre>

<p>Para el ultimo ejemplo vamos a utilizar la consola de Ruby interactiva, este es un espacio para probar código Ruby directo con el interprete. Para sistemas operativos Mac OSX y Linux se llama <strong>irb (Interactive Ruby Shell)</strong> y para Windows <strong>fxri</strong>. se activa con el nombre de irm y una vez dentro ejecutamos comando Ruby de la siguiente manera:</p>

<pre>>> irb                              
2.0.0p195 :001 > 2 + 3
=> 5 
2.0.0p195 :002 > puts "CodeHero"
CodeHero
=> nil 
2.0.0p195 :003 > 45 / 9
=> 5 
2.0.0p195 :004 > puts "CoDeHeRo".downcase
codehero
=> nil 
2.0.0p195 :005 > puts "codehero".capitalize
Codehero
=> nil 
2.0.0p195 :006 > 2 ** 3
=> 8 
2.0.0p195 :007 > quit
>>
</pre>

<hr />

<h2>Documentación.</h2>

<p>Para el proceso de entrenamiento es muy importante tener claro donde encontrar la documentación del lenguaje, en el caso de <strong>Ruby</strong> la documentación esta en <a href="http://ruby-doc.org/core-2.0/">ruby-doc.org</a> en esa pagina podemos navegar fácilmente entre toda la información relacionada a las clases y métodos de cada uno de los objetos propios del lenguaje.</p>

<p>Otra opción es utilizando el comando <strong><em>ri</em></strong> (Ruby Information) desde el terminal del sistema operativo, al igual que la pagina se encuentra toda la información de cada uno de los objetos. Por ejemplo la información del Objeto <em>String</em>:</p>

<pre>>> ri String
</pre>

<p>retorna entre otras cosa la información general del String de la siguiente manera:</p>

<pre>---------------------------------
= Includes:
Comparable (from ruby site)

(from ruby site)
---------------------------------


Rake extension methods for String.



A String object holds and manipulates an arbitrary sequence of bytes,
typically representing characters. String objects may be created using
String::new or as literals.

Because of aliasing issues, users of strings should be aware of the methods
that modify the contents of a String object.  Typically, methods with names
ending in ``!'' modify their receiver, while those without a ``!'' return a
new String.  However, there are exceptions, such as String#[]=.
---------------------------------
</pre>

<hr />

<h2>Conclusión.</h2>

<p>En este primer capítulo aunque bastante sencillo hemos adquirido nuevas habilidades de Ruby. En esta primera etapa conocimos un poco las características del lenguaje, instalamos, probamos con lineas de comandos bastante sencillos y ubicamos la documentación del sistema.</p>
