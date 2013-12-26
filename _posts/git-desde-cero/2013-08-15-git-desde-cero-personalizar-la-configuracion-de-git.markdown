---
layout: post
status: publish
published: true
title: Personalizar la configuración de Git.
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
wordpress_id: 1986
wordpress_url: http://codehero.co/?p=1986
date: 2013-08-15 00:01:20.000000000 -04:30
categories:
- Cursos
- Git
tags:
- Cursos
- Git
- curso
---
<p>Bienvenidos a un nuevo capítulo de <strong><em>Git desde cero</em></strong> en este <em>curso</em> hablaremos sobre como personalizar la configuración de git. Pondremos colores en nuestro terminal que funcionan para representar cambios, colores en el log, alias de comandos, entre otros detalles. Por ser un <em>curso</em> un poco distinto no nos enfocaremos en comandos particulares sino más bien en el archivo .gitconfig que se encuentra en el <strong>$HOME</strong> del usuario.</p>

<hr />

<h2>Configuración de <em>git push</em></h2>

<p>Posterior a la versión 1.7.11 de git, se introdujeron cambios en la manera como git realiza <em>push</em> y requiere que se escoja una opción por defecto. En este momento existen cinco (5) maneras diferentes para trabajar con el comando <em>push</em> que son: <em>"nothing"</em>, <em>"current"</em>, <em>"upstream"</em>, <em>"matching"</em> y <em>"simple"</em>.</p>

<ul>
<li><strong>Nothing:</strong> Utilizando esta opción por defecto el comando <code>git push</code> no subirá nada.</li>
<li><strong>Current:</strong> Utilizando <em>current</em> por defecto se subirán los cambios a una rama remota que tenga el mismo nombre que la rama local. Es decir: si, estamos trabajando sobre una rama llamada <em>hola-mundo</em> y hacemos <code>git push</code> de los cambios que tengamos locales, se subirán a una rama en el repositorio remoto con el mismo nombre, sino existe, creará la rama.</li>
<li><strong>Upstream:</strong> Referencia la rama remota con la local. Estas no tienen porqué tener el mismo nombre para subir los cambios.</li>
<li><strong>Simple:</strong> Funciona de la misma manera que <em>upstream</em> pero se niega completamente a subir la información si la rama que está en el repositorio remoto no existe o no se llama igual que la local.</li>
<li><strong>Matching:</strong> Absolutamente todas las ramas deben tener el mismo nombre en los dos extremos, es decir, tanto local como remoto. Si se crea una rama local se creará remota también.</li>
</ul>

<p><strong><em>nota:</em></strong> Como preferencia personal globalmente utilizo <em>Current</em> ya que se adapta más a mi manera de trabajar. En todo caso, sería adecuado que vayan probando cual les funciona mejor ya que todas las opciones son interesantes.</p>

<h3>¿Cómo coloco una opción de estas por defecto?</h3>

<p>Es bastante, se podría colocar una global o una local (para un proyecto específico) de la siguiente manera.</p>

<pre>$ git config --global push.default current
# De manera local en un proyecto específico.
$ git config --local push.default upstream
</pre>

<p>Todas configuraciones globales se escriben en un archivo en el <em>"$HOME"</em> del usuario que tiene siempre el mismo nombre y se llama <strong>.gitconfig</strong> es "oculto".</p>

<p>Por otro lado las configuraciones locales de proyecto se escriben en la carpeta <strong>.git</strong> dentro de un archivo que se llama <strong>config</strong>, este archivo es el mismo que contiene las referencias a las ramas remotas y configuraciones del proyecto, etc.</p>

<hr />

<h2>Configuración de <em>git pull</em></h2>

<p>Normalmente cuando utilizamos <code>git pull</code> sobre una rama, ésta realiza dos funciones <code>git fetch</code> y <code>git merge</code> ésta última puede ocasionar conflictos que debemos solucionar y posteriormente unirlos a mano con otro <em>merge</em> agregando información que no aporta nada al historial del proyecto. Por esta razón es recomendable, que de requerir realizar un <em>pull</em> se emplee el comando <em>rebase</em> en vez del <em>merge</em> de manera directa. Para realizar esto debemos cambiar la configuración por defecto de git o utilizar <code>git pull --rebase</code> cada vez que se quieran descargar "actualizaciones" del servidor remoto. Como manera más practica cambiemos la configuración por defecto</p>

<pre>$ git config --global --bool pull.rebase true
</pre>

<p>De requerir volver a un simple <em>merge</em> por una ocasión específica se puede emplear el comando <code>git pull --no-rebase</code>y listo.</p>

<hr />

<h2>Configurando alias a comandos.</h2>

<p>De la misma manera que los sistemas operativos *nix tienen una utilidad llamada <strong>alias</strong> para colocar un nombre alternativo a archivos, comandos, direcciones, etc.. Git también lo incorpora, pero de manera específica para sus comandos.</p>

<h3>¿Para qué podemos utilizar los alias?</h3>

<p>Si se están preguntando en que caso particular se puede utilizar esta utilidad, mi respuesta directa sería, en aquellos comandos que utilizan frecuentemente o que realmente son complicados de escribir cuando se necesitan. Como ejemplo crearemos alias a tres (3) comandos altamente utilizados.</p>

<ul>
<li><code>git status</code></li>
<li><code>git checkout</code></li>
<li><code>git log --pretty=format:'%h - %an, %ar - %s' --graph</code></li>
</ul>

<p>Para el <strong>status</strong> utilizaremos la abreviación <strong>st</strong>, para <strong>checkout</strong> como <strong>co</strong> y el <strong>log</strong> como <strong>lg</strong>.</p>

<pre>$ git config --global alias.st status

$ git config --global alias.co checkout

$ git config --global alias.lg "log --pretty=format:'%h - %an, %ar : %s' --graph"
</pre>

<p>Ahora si reiniciamos el Terminal con <code>bash -l</code>, <code>exec $SHELL -l</code> o simplemente cerrando y abriendo uno. los tendremos funcionando.</p>

<p>Como había dicho más arriba si realizamos una lectura del archivo <strong><em>.gitconfig</em></strong> podremos ver como está estructurado el mismo.</p>

<pre>$ cat ~/.gitconfig
[alias]
    co = checkout
    st = status
    lg = log --pretty=format:'%h - %an, %ar : %s' --graph
[core]
    editor = subl -w
[user]
    name = albertogg
    email = example@gmail.com
[push]
    default = current
[pull]
    rebase = true
</pre>

<p>De manera muy sencilla se puede entender para que funciona cada etiqueta del archivo.</p>

<hr />

<h2>Configurando colores en el terminal.</h2>

<p>Si tienen un terminal con ZSH con <a href="http://codehero.co/como-lo-hago-instalar-oh-my-zsh/">oh-my-zsh</a> o su alternativa en <a href="https://github.com/revans/bash-it">Bash</a> seguramente te gustan los colores, la personalización del terminal y estoy seguro que vas a poder observar colores por defecto cuando empleemos las opciones que te vamos a enseñar!</p>

<h3>¿Cómo le pongo colores a un status o a un log?</h3>

<p>Existen dos maneras claves, si lo que quieres ver son un par de colores y no te importa mucho, puedes dejar las opciones por defecto que te mostraremos a continuación, pero si quieres que el terminal vomite un arcoiris cuando escribas <em>status</em> o <em>log</em> te llevará un poco más de tiempo pero es igualmente sencillo.</p>

<p>Primero para utilizar los colores que git nos proporciona por defecto debemos incluir esta opción <code>git config --global color.ui true</code>. Luego de manera específica agregar que comandos queremos "colorear".</p>

<pre>$ git config --global color.ui true
$ git config --global color.status auto
$ git config --global color.log auto.
</pre>

<p>A partir de este momento cuando empleemos estos comandos se representarán las modificaciones en el <em>status</em> con colores rojo y verde. Por otro lado el log tendrá algo de amarillo en los títulos.</p>

<p>De los colores que nos ofrece git como el "estandar" u opción por defecto también los podemos personalizarlos de la siguiente manera:</p>

<pre>$ git config color.status.changed green
$ git config color.status.untracked cyan
</pre>

<p>Esto cambiará el color de los archivos modificados a verde y de los archivos que git no sigue en cyan.</p>

<p>Si queremos representar todo el texto con un color diferente en cualquier sección, podríamos crear un alias en conjunto con los colores, algo como:</p>

<pre>$ git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)&lt;%an>%Creset' --abbrev-commit
</pre>

<p>Ten en cuenta que git es altamente personalizable y más cuando mezclamos nuestros conocimientos con un poco de ayuda del internet.</p>

<hr />

<h2>Conclusión</h2>

<p>En este último capítulo y en conjunto con los cursos anteriores hemos adquirido el conocimiento necesario para configurar y personalizar git a la medida vale la pena si quieren indagar un poco más sobre este tema que revisen el manual <code>git config -h</code> y busquen por internet. Si te surge algún tipo de duda no te detengas y déjanos un comentario, que gustosamente lo responderemos.</p>

<p>¡Hasta la semana entrante!</p>
