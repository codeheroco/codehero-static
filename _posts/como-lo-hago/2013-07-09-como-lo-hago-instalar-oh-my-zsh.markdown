---
layout: post
status: publish
published: true
title: Cómo instalar oh-my-zsh
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
wordpress_id: 1282
wordpress_url: http://codehero.co/?p=1282
date: 2013-07-09 04:30:30.000000000 -04:30
thumbnail: http://i.imgur.com/QZ0cnJe.png
categories:
- Cómo lo hago
- oh-my-zsh
tags:
- oh-myz-zsh
- zsh
- terminal
---
<p>Esta semana, en ¿Cómo Lo Hago?, hablaremos de uno de los complementos que a muchos les convierte el manejo cotidiano del terminal en un paseo por el parque. el framework oh-my-zsh.</p>

<hr />

<h2>¿Qué es ZSH?</h2>

<p>Antes de hablar del plato principal debemos definir el contexto, ZSH es un terminal alternativo para sistemas operativos Unix que recopila funcionalidades de distintos terminales como Bash, ksh y tcsh.</p>

<p>Es quizás la línea de comandos más flexible y poderosa que hay, ofreciendo numerosas ventajas sobre todo en cuanto escritura de <em>scripts</em> e interpretación de comandos.</p>

<p>Algunas de las ventajas que ofrece ZSH:</p>

<ul>
<li>Terminación automática de comandos, directorios, opciones y argumentos.</li>
<li>Edición de comandos de múltiples líneas.</li>
<li>Edición de variables.</li>
<li>Pila buffer de comandos.</li>
<li>Mayor englobamiento de archivos.</li>
<li>Mejor manejo de arreglos y variables.</li>
<li>Corrección ortográfica.</li>
<li>Altamente personalizable.</li>
</ul>

<hr />

<h2>¿Y qué hay de oh-my-zsh?</h2>

<p>oh-my-zsh es un framework mantenido por la comunidad de código abierto que permite manejar fácilmente la configuración del terminal ZSH, es altamente personalizable y un gran complemento para usuarios que trabajan constantemente en el terminal ofreciéndoles un ambiente agradable a la vista, con muchas ayudas visuales, facilidad de ubicación y optimización de tareas gracias al la gama de funcionalidades que ofrece la librería de complementos.</p>

<hr />

<h2>¿Cómo lo instalo?</h2>

<p>Primero debes verificar que tengas instalado el terminal zsh. Para esto ejecuta el siguiente comando en el terminal:</p>

<pre>$ zsh --version
</pre>

<p>Si lo tienes instalado obtendrás una salida como esta:</p>

<pre>zsh 4.3.11 (i386-apple-darwin12.0)
</pre>

<p>De no tener ZSH instalado lo puedes instalar fácilmente de la siguiente manera:</p>

<h3>Mac OS X:</h3>

<p>El método recomendado de instalación de ZSH en Mac OS X en caso de que no venga ya instalado es por Homebrew (<a href="http://codehero.co/como-lo-hago-instalar-homebrew/">ingresa aquí si no sabes cómo instalar Homebrew</a>). Simplemente ejecuta el siguiente comando en el directorio raíz de tu usuario:</p>

<pre>$ brew install zsh
</pre>

<h3>Linux:</h3>

<p>Con un sencillo apt-get en el terminal:</p>

<pre>$ apt-get install zsh
</pre>

<p>Ya teniendo ZSH instalado en el computador, procedemos a instalar oh-my-zsh. Para esto tenemos 2 opciones, el método automático, y el método manual.</p>

<h3>Método automático</h3>

<p>Puede hacerlo ejecutando en el terminal el siguiente comando <em>curl</em>:</p>

<pre>$ curl -L https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh | sh
 </pre>

<p>O sino por medio de <em>wget</em> (común para usuario Linux):</p>

<pre>$ wget --no-check-certificate https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh
 </pre>

<p>Este proceso buscará en Github la versión de oh-my-zsh más reciente y la instalará en el sistema.</p>

<p>Reiniciemos el terminal y veamos si el terminal zsh ha sido establecido como el predeterminado usando el siguiente comando:</p>

<pre>$ echo $SHELL
</pre>

<p>De tener una salida como esta, podremos comprobar que efectivamente la instalación de oh-my-zsh configuró el terminal ZSH como predeterminado:</p>

<pre>/bin/zsh
</pre>

<p>De lo contrario utilizaremos el siguiente comando para manualmente definir el terminal ZSH como predeterminado:</p>

<pre>$ chsh -s /bin/zsh
</pre>

<h3>Método manual</h3>

<p>El método manual de instalación requiere que tengamos instalado Git (<a href="http://codehero.co/git-desde-cero-instalacion-configuracion-y-comandos-basicos/">ingresa aquí para saber más sobre Git y su instalación</a>). Clonaremos el repositorio de Github donde se encuentra alojado oh-my-zsh a nuestro sistema:</p>

<pre>$ git clone git://github.com/robbyrussell/oh-my-zsh.git ~/.oh-my-zsh
</pre>

<p>Posteriormente crearemos el archivo de configuración de ZSH copiando la plantilla que trae oh-my-zsh:</p>

<pre>$ cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc
</pre>

<p>Luego estableceremos el terminal ZSH como el predeterminado:</p>

<pre>$ chsh -s /bin/zsh
</pre>

<p>Por último reiniciamos el terminal y <em>voilà</em>.</p>

<hr />

<h2>Configuración</h2>

<p>Un nuevo archivo se encontrará en el directorio raíz de tu usuario llamado <strong><em>.zshrc</em></strong>. Este archivo de configuración contiene la magia que debemos invocar para disfrutar de oh-my-zsh.</p>

<p>Abramos dicho archivo en un editor de texto (o en el mismo terminal) y agreguemos/editemos algunos detalles clave:</p>

<h3>Variable ZSH</h3>

<pre>ZSH=$HOME/.oh-my-zsh
</pre>

<p>Se especifica la ruta donde debió instalarse oh-my-zsh, esto se configura por defecto así que no debe alterarse a menos que sea necesario.</p>

<h3>Variable ZSH_THEME</h3>

<pre>ZSH_THEME="nombre_de_tema"
</pre>

<p>Se especifica el tema visual a usar. Puedes acceder <a href="https://github.com/robbyrussell/oh-my-zsh/wiki/themes">aquí</a> para visualizar algunos de los temas que incluye oh-my-zsh. Para elegir el tuyo simplemente coloca el nombre del tema que deseas en esta variable. Inclusive puede crear tu tema propio y almacenarlo en el directorio <em>.oh-my-zsh/themes/</em></p>

<h3>Alias</h3>

<pre>alias gs="git status"
alias ga="git add"
...
</pre>

<p>Los alias son simplemente comandos personalizados que puedes definir para ejecutar otros comandos en el terminal, por ejemplo en nuestro archivo tenemos el comando <strong><em>gs</em></strong> que al ser invocado ejecutaría el comando <strong><em>git status</em></strong>. Puedes definir la cantidad de alias que desees.</p>

<h3>Variable PATH</h3>

<pre>export PATH=/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
</pre>

<p>Debemos prestar especial atención a esta variable si estamos utilizando herramientas como <a href="http://codehero.co/como-lo-hago-instalar-homebrew/">Homebrew</a>. Debido a que el orden en el que aparecen las distintas rutas en esta variable determina el orden en el que el sistema busca los enlaces simbólicos de los comandos a ejecutar.</p>

<h3>Variable plugins</h3>

<pre>plugins=(complemento1 complemento2 complemento3)
</pre>

<p>Aquí se especifican los complementos que se desean utilizar, estos ofrecen muchas ventajas de terminación automática que son de gran ayuda al usar comandos complejos con muchos argumentos. Puedes acceder <a href="https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins">aquí</a> para una lista de varios de los complementos disponibles en oh-my-zsh y su breve explicación.</p>

<p>Entre ellos se encuentran:</p>

<ul>
<li>git</li>
<li>brew</li>
<li>ruby</li>
<li>django</li>
<li>rails</li>
<li>y muchos más…</li>
</ul>

<hr />

<h2>¿Ahora qué?</h2>

<p>Puedes experimentar con algunos temas y complementos, probemos por ejemplo, el tema <strong><em>af-magic</em></strong>.</p>

<p>Naveguemos a un directorio que sea un repositorio de git para observar las ayudas visuales, por ejemplo, el directorio de oh-my-zsh (si, es un directorio de Git, si no te diste cuenta mira el primer paso del método manual de instalación):</p>

<p><img src="http://i.imgur.com/oS4Gnhv.png" alt="screenGit" /></p>

<p>Podemos notar que el tema nos muestra la rama de git en la que se encuentra actualmente el usuario. Adicionalmente el asterisco amarillo nos indica que hay cambios que no han sido registrados, probablemente al ponerme a jugar con los archivos internos de oh-my-zsh.</p>

<p>Por su parte, el complemento <strong><em>git</em></strong>, entre otras cosas, nos ofrece muchos alias que pueden ser de ayuda, <a href="http://jasonm23.github.io/oh-my-git-aliases.html">aquí puedes encontrar algunos.</a></p>

<p>¡Esto es sólo una pequeña muestra de lo que es posible!</p>

<hr />

<h2>Conclusión</h2>

<p>Experimentando con los temas y los complementos que ofrece oh-my-zsh podemos notar que el manejo del terminal se hace más sencillo, cómodo y agradable. Mientras más tiempo emplees bajo el terminal te darás cuenta que es una herramienta que te puede ayudar de muchas maneras, no dudes en probarla con los complementos que se puedan adaptar a las tareas que realizas a menudo. Hasta la próxima edición.</p>
