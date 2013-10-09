---
layout: post
status: publish
published: true
title: Cómo instalar y usar Tmux
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathanwiesel@gmail.com
author_url: http://jonathanwiesel.com/
wordpress_id: 1768
wordpress_url: http://codehero.co/?p=1768
date: 2013-07-30 00:00:47.000000000 -04:30
categories:
- Cómo lo hago
- tmux
tags:
- howto
- tmux
comments: []
---
<p>Para aquellos que gustan de usar el terminal para llevar a cabo las tareas en su día a día pero deben abrir varias ventanas y sesiones para lograr llevar a cabo simultáneos procedimientos, <strong>Tmux</strong> es quizás la herramienta que se estaban perdiendo, esta semana hablaremos sobre cómo puede ayudarte a trabajar en el terminal de una manera más cómoda y eficiente.</p>

<hr />

<h2>¿Qué es Tmux?</h2>

<p>Su nombre es el diminutivo de <em>terminal multiplexer</em> (multiplicador de terminal), y nos permite habilitar múltiples sesiones, ventanas y paneles para ser controladas mediante el mismo terminal. Es compatible con plataformas Linux, Mac OS X, FreeBSD, OpenBSD, NetBSD y Solaris.</p>

<p>La mejor manera de demostrar sus ventajas y funcionalidades es probandolo, así que procedamos a instalarlo.</p>

<hr />

<h2>¿Cómo lo instalo?</h2>

<p>En Mac OS X el proceso de instalación recomendado es mediante el uso de <a href="http://codehero.co/como-lo-hago-instalar-homebrew/">Homebrew</a>, con solo una línea ya estaremos listos para usar la herramienta:</p>

<pre>$ brew install tmux
</pre>

<p>En otros sistemas que soportan el comando <em>apt-get</em>, la instalación es igual de sencilla:</p>

<pre>$ apt-get install tmux
</pre>

<p>En su defecto también puedes dirigirte a la <a href="http://tmux.sourceforge.net/">página oficial de tmux</a>, descargar el <em>.tar.gz</em> y seguir el procedimiento de instalación manual.</p>

<hr />

<h2>¿Cómo lo uso?</h2>

<p>Para comenzar creemos una sesión nueva:</p>

<pre>$ tmux new -s primera_sesion
</pre>

<p><img src="http://cl.ly/image/3e10263a2j3t/Screen%20Shot%202013-07-27%20at%206.14.13%20PM.png" alt="" /></p>

<p>Esto iniciará una nueva sesión del terminal tmux con el nombre <em>primera_sesion</em>. Notemos que en la barra inferior del terminal podemos apreciar además del nombre de la sesión, lo siguiente: &#42;&#42;0:-&#42;&#42;*, esto se traduce en que tenemos una ventana en la sesión (ventana 0), como estamos en el directorio raíz del usuario la ruta es únicamente el guión (-), y el asterisco (*) nos indica que es la ventana activa</p>

<p>Debemos resaltar que el funcionamiento de tmux está enfocado a atajos de teclado, para ejecutar una funcionalidad debemos presionar Ctrl-b (accionador por defecto), luego los soltamos y presionamos la tecla de la acción que deseamos.</p>

<p>Por ahora creemos un nuevo panel en nuestra ventana, esto dividirá nuestra ventana horizontal o verticalmente para crear el otro panel, para hacerlo verticalmente presionemos <code>Ctrl-b %</code> y horizontalmente <code>Ctrl-b "</code>. Hagamos ambos para ver que pasa:</p>

<p><img src="http://cl.ly/image/3W1g3T2j2b2G/Screen%20Shot%202013-07-27%20at%206.31.34%20PM.png" alt="" /></p>

<p>Notemos que creamos 2 paneles adicionales, uno al dividir el original verticalmente en 2 y el otro al dividir el nuevo vertical derecho en 2 horizontales. Para poder ciclar entre los diferentes paneles podemos presionar <code>Ctrl-b o</code> o si queremos ir a alguno en particular podemos presionar <code>Ctrl-b q</code> lo cual nos dirá los números de cada panel y si rapidamente presionamos el número del que deseamos podremos ir a él.</p>

<blockquote>
  <p>Si estas trabajando en un ambiente que te permite hacer uso de un ratón, más adelante explicaremos como configurar tmux para que lo soporte y hacer que el cambio de paneles sea más sencillo.</p>
</blockquote>

<p>Digamos que no necesitamos estos 3 paneles ahora, así que desechemos este último presionando <code>Ctrl-b x</code>.</p>

<p>Ahora creemos una nueva ventana presionando <code>Ctrl-b c</code>:</p>

<p><img src="http://cl.ly/image/2O060A1W1D37/Screen%20Shot%202013-07-27%20at%206.39.58%20PM.png" alt="" /></p>

<p>Notemos que hemos creado una nueva ventana de terminal, podemos apreciar en la barra inferior que ahora tenemos la ventana 0 y la 1, el asterisco nos indica la ventana en la cual nos encontramos actualmente.</p>

<p>Para ciclar entre las diferentes ventanas podemos presionar <code>Ctrl-b n</code> para ir a la próxima ventana, <code>Ctrl-b p</code> para ir a la anterior o simplemente especificar la ventana que queremos, por ejemplo si quisiéramos ir a la ventana 0 presionaríamos <code>Ctrl-b 0</code>.</p>

<h3>Estado de sesión</h3>

<p>Una de las grandes ventajas de tmux es su habilidad de desatarnos de la sesión, todo lo que la sesión contiene se mantendrá intacto. Hagamos una prueba de esto.</p>

<p>Conectemonos a un servidor por SSH mediante Tmux:</p>

<p><img src="http://cl.ly/image/0i343Z2J1z0c/Screen%20Shot%202013-07-27%20at%206.52.35%20PM.png" alt="" /></p>

<p>Ahora presionemos <code>Ctrl-b d</code> para desatarnos de la sesión.</p>

<p>Notaremos que hemos vuelto a nuestro terminal común con el mensaje <strong>[detached]</strong>; sin embargo todo lo que dejamos corriendo en la sesión sigue ejecutandose, nuestra conexión SSH no está cerrada, volvamos a atar la sesión para comproblarlo:</p>

<pre>$ tmux list-sessions
primera_sesion: 2 windows (created Sat Jul 27 18:04:37 2013) [104x31]

$ tmux attach-session -t primera_sesion 
</pre>

<p>Esto reanudará nuestra sesión tal cual como la dejamos.</p>

<blockquote>
  <p>Debemos tener en cuenta que si el computador en el que estamos trabajando es apagado las sesiones se perderán.</p>
</blockquote>

<h3>Programación en pareja</h3>

<p>Otro de los usos más interesantes que se le da a Tmux es la programación remota en pareja.</p>

<p>Para esto se recomienda construir una sesión de usuario aparte de la que usamos convencionalmente en el computador ya que no queremos que alguien acceda a nuestra información. En este caso lo haremos con nuestro usuario normal para la demostración.</p>

<p>Debemos crear la sesión especificando el <em>socket</em> que usará, lo cual permitirá compartirla entre varios usuarios, para dar acceso a otros usuarios al <em>socket</em> debemos otorgarle los permisos necesarios:</p>

<pre>$ tmux -S /tmp/emparejado
$ chmod 755 /tmp/emparejado
</pre>

<p>Ahora en nuestro otro computador nos conectamos por SSH al equipo anfitrión y nos atamos a la sesión (recuerda que debes tener habilitado este tipo de acceso remoto en la configuración de tu computador anfitrión).</p>

<p><img src="http://cl.ly/image/1A09430q3r2i/Screen%20Shot%202013-07-28%20at%203.04.12%20PM.png" alt="" /></p>

<p>Ahora ambos equipos se encuentran conectados a la misma sesión de Tmux y lo que uno escriba se verá reflejado en el otro:</p>

<p><img src="http://cl.ly/image/071E2E1n0O0y/dual.png" alt="" /> Podemos notar una especie de puntos rellenando el fondo de la ventana más grande, esto se debe a que el terminal toma el tamaño de la ventana más pequeña (en este caso la del invitado) con el fin de que ambos puedan ver la misma información.</p>

<blockquote>
  <p>Si quieres adentrarte más en la programación en pareja por terminal, te recomendamos que le eches un vistazo a <a href="http://tmate.io/">Tmate</a> y <a href="https://github.com/zolrath/wemux">Wemux</a> basadas en Tmux, los cuales ofrecen varias ventajas relacionadas a este fin particular.</p>
</blockquote>

<hr />

<h2>Hoja de atajos</h2>

<p>Especifiquemos algunos de los atajos más comunes.</p>

<p><a href="http://cl.ly/image/2C240E081u1r/cheatsheet.png" target="_blank"><img src="http://cl.ly/image/2C240E081u1r/cheatsheet.png" alt="cheatsheet" /></a> Haz click en la imagen para verla en tamaño completo.</p>

<hr />

<h2>Configuración adicional</h2>

<p>Podemos personalizar la experiencia con Tmux mediante la creación de un archivo de configuración.</p>

<p>En él podemos especificar varios aspectos como:</p>

<ul>
<li>Aspecto de los componentes gráficos.</li>
<li>Remapear el accionador y otras funciones.</li>
<li>Activar el soporte de mouse.</li>
<li>Modificar parte del comportamiento.</li>
<li>Y mucho más...</li>
</ul>

<p>Este archivo de configuración debe llamarse <em>.tmux.conf</em> y debe estar almacenado en el directorio raíz de nuestro usuario. <a href="https://github.com/albertogg/dotfiles/blob/master/tmux/tmux.conf.symlink">Aquí</a> puede ver un buen ejemplo de la estructura de uno.</p>

<hr />

<h2>Conclusión</h2>

<p>Esta herramienta es de las mejores compañeras si realizas múltiples tareas en el terminal, aprendimos un poco sobre sus ventajas, funcionalidades y usos, solo queda que te pongas a experimentar por tu cuenta. Te invitamos que nos relates tu experiencia y otros usos que le has podido dar.</p>
