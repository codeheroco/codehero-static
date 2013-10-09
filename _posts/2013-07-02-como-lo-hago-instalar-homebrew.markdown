---
layout: post
status: publish
published: true
title: Cómo Instalar Homebrew
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathanwiesel@gmail.com
author_url: http://jonathanwiesel.com/
wordpress_id: 1123
wordpress_url: http://codehero.co/?p=1123
date: 2013-07-02 00:00:36.000000000 -04:30
categories:
- Cómo lo hago
- Homebrew
tags:
- como lo hago
- howto
- homebrew
comments:
- id: 186
  author: Cómo instalar oh-my-zsh | CODEHERO
  author_email: ''
  author_url: http://codehero.co/como-lo-hago-instalar-oh-my-zsh/
  date: '2013-07-09 04:54:08 -0430'
  date_gmt: '2013-07-09 09:24:08 -0430'
  content: '[...] de instalación de ZSH en Mac OS X en caso de que no venga ya instalado
    es por Homebrew (ingresa aquí si no sabes cómo instalar Homebrew). Simplemente
    ejecuta el siguiente comando en el directorio raíz de tu [...]'
- id: 198
  author: Cómo instalar y usar Tmux | CODEHERO
  author_email: ''
  author_url: http://codehero.co/como-instalar-y-usar-tmux/
  date: '2013-07-30 00:01:43 -0430'
  date_gmt: '2013-07-30 04:31:43 -0430'
  content: '[...] Mac OS X el proceso de instalación recomendado es mediante el uso
    de Homebrew, con solo una línea ya estaremos listos para usar la [...]'
---
<p>En este <strong><em>Cómo lo hago</em></strong> se explicará el proceso de instalación de Homebrew, requerimientos del sistema y además hablaremos brevemente sobre él.</p>

<hr />

<h2>¿Qué es Homebrew?.</h2>

<p>Homebrew es un manejador de paquetes hecho en Ruby para la plataforma Mac OS X el cual permite una fácil gestión de software libre en tu computador. Para aquellos familiarizados con ambientes Linux, Homebrew funciona parecido al <strong><em>apt-get</em></strong> de las distribuciones basadas en Debian.</p>

<hr />

<h2>¿Por qué utilizar un manejador de paquetes en lugar de instalar manualmente?</h2>

<p>Utilizar un manejador de paquetes ofrece numerosas ventajas:</p>

<ul>
<li>Permite actualizar facilmente versiones de paquetes completos.</li>
<li>Las dependencias se instalan automáticamente sin que el usuario deba hacerlo previamente.</li>
<li>Descarga, compila e instala en un solo paso.</li>
<li>Evita duplicidad de paquetes.</li>
<li>Eliminar paquetes es igual de fácil que instalarlos.</li>
<li>Paquetes es más que aplicaciones, por ejemplo wget.</li>
<li>Los paquetes son instalados en su propio directorio y su enlace simbólico se almacenan en <em>/usr/local</em></li>
</ul>

<hr />

<h2>¿Y por qué debo usar Homebrew, no hay alternativas?</h2>

<p>Ciertamente Homebrew no es el único manejador de paquetes para OSX, también se encuentran <a href="http://www.macports.org/">MacPorts</a> y <a href="http://finkproject.org/">Fink</a>; sin embargo estos otros manejadores suelen instalar sus propias versiones de las herramientas, que ya posee el sistema operativo, lo cual produce una duplicación de librerías y archivos binarios. Además que Homebrew trata de ofrecer un nivel aceptable de compatibilidad con el sistema operativo al usar herramientas de Xcode para construir las dependecias.</p>

<hr />

<h2>Bien, ¿Qué necesito?</h2>

<p>La configuración recomendada para asegurar una máxima compatibilidad es:</p>

<ul>
<li>Un computador Mac con CPU Intel.</li>
<li>OS X 10.6 (Snow Leopard) o mayor. </li>
<li><a href="http://itunes.apple.com/us/app/xcode/id497799835">Linea de comandos de Xcode</a>.</li>
</ul>

<p><em>Nota: es posible instalar Homebrew en computadores PowerPC con OSX 10.4; sin embargo es un proceso que debe hacerse con cautela. Más detalles en la <a href="https://github.com/mistydemeo/tigerbrew">rama experimental de GitHub.</a></em></p>

<hr />

<h2>Perfecto. ¡Quiero Homebrew ya! ¿Cómo lo instalo?</h2>

<p>Debido a que Ruby se encuentra preinstalado en OSX, instalar Homebrew es tan fácil como abrir el terminal y ejecutar el siguiente comando:</p>

<pre>$ ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"
</pre>

<p>Esto buscará en el repositorio de Github la ultima versión de Homebrew y la instalará en tu sistema.</p>

<p>Es recomendable luego de instalar Homebrew, antes de realizar cualquier otra operación, ejecutar el comando:</p>

<pre>$ brew doctor
</pre>

<p>Este proceso detectará si existe algún inconveniente que pueda causar problemas de compilación o compatibilidad más adelante. Por ejemplo, tener instalado Xcode pero no la Linea de Comandos de Xcode puede llevar a problemas de compilación, Homebrew lo sabe y lo puede advertir en su diagnostico con <strong><em>doctor</em></strong>:</p>

<pre>Warning: Experimental support for using Xcode without the "Command Line Tools".
You have only installed Xcode. If stuff is not building, try installing the
"Command Line Tools for Xcode" package provided by Apple.
</pre>

<p>Como dijimos antes, los enlaces simbólicos de los paquetes de Hombrew se almacenan en /usr/local/bin, lo que nos ofrece la ventaja de no necesitar invocar el comando <strong><em>sudo</em></strong>, lo cual viene siendo uno de los lemas de la solución Homebrew, ya que esto puede comprometer el sistema.</p>

<p>Es posible que un paquete ya se encuentre instalado en el computador y que nosotros hayamos decidido instalarlo por Homebrew, por ejemplo, Ruby. Podremos notar que tendremos 2 versiones de Ruby, una en <strong><em>/usr/bin</em></strong> y otra en <strong><em>/usr/local/bin</em></strong> (instalada por Homebrew).</p>

<p><strong>¿Cómo saber cual de las 2 se está utilizando?</strong></p>

<p>Para determinar esto podemos hacer uso del siguiente comando:</p>

<pre>$ echo $PATH
</pre>

<p>y podremos obtener una salida como esta:</p>

<pre>/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin
</pre>

<p>En este caso, la salida nos indica que al ejecutar el comando <strong><em>ruby</em></strong>, el sistema buscará el enlace simbólico de dicho comando en el orden previamente indicado, es decir, primero en <strong><em>/usr/bin</em></strong>, luego en <strong><em>/bin</em></strong> y así sucesivamente hasta que exista la primera ocurrencia. Esto quiere decir que la versión de Ruby que estaría utilizando al ejecutar el comando sería la que trae el computador (alojada en <strong>/usr/bin</strong>) en lugar de la que instalamos por Homebrew.</p>

<p>Para evitar este tipo de inconvenientes, es recomendable editar ( o crear si no existe ) el archivo .bashrc ( .zshrc en caso de que usen la linea de comandos ZSH ) en el directorio principal del usuario, e indicar el orden deseado de búsqueda de comandos agregando algo parecido a esto:</p>

<pre>export PATH=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
</pre>

<p>De esta manera el directorio en el que Homebrew guarda los enlaces simbólicos de los paquetes será el primero en ser buscado al ejecutar un comando.</p>

<hr />

<h2>¿Ahora qué?</h2>

<p>Ahora solo queda empezar a experimentar con Homebrew. En Homebrew los nombres de los paquetes se les denomina fórmulas, puedes comenzar probando instalar fórmulas básicas como <strong><em>git</em></strong>:</p>

<pre>$ brew install git
</pre>

<p>¿Quieres saber si la fórmula que buscas está en Homebrew?:</p>

<pre>$ brew search nombre_formula
</pre>

<p>Instalaste una fórmula que no te gusta y la quieres borrar:</p>

<pre>$ brew remove nombre_formula
</pre>

<p>¿Quieres actualizar una fórmula?:</p>

<pre>$ brew upgrade nombre_formula
</pre>

<p>¿Quieres actualizar Homebrew?:</p>

<pre>$ brew update
</pre>

<hr />

<h2>Conclusión</h2>

<p>Mucho provecho se le puede sacar a esta herramienta, instalarla es solo el primer paso para tener un computador con un sistema interno sencillo de manejar, fácil de mantener, menos conflictivo y altamente expansible. Cualquier duda que tengas la puedes expresar en los comentarios y trataré de responderte lo mejor que pueda.</p>
