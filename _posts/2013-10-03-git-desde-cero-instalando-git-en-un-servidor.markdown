---
layout: post
status: publish
published: true
title: Instalando git en un servidor
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
wordpress_id: 2341
wordpress_url: http://codehero.co/?p=2341
date: 2013-10-03 00:05:15.000000000 -04:30
categories:
- Cursos
- Git
tags:
- Cursos
- Git
- curso
comments: []
---
<p>Bienvenidos a un nuevo y último capítulo de <strong><em>Git desde cero</em></strong> en este <em>curso</em> hablaremos sobre como utilizar git dentro de nuestro servidor privado. Explicaremos los protocolos que existen para realizar esta tarea, crearemos y alojaremos un proyecto en el servidor privado utilizando el protocolo ssh.</p>

<hr />

<blockquote>
  <p>Para este curso asumimos que el lector tiene un entendimiento básico sobre el manejo del terminal en Sistemas Operativos *nix, que sabe y a generado unas <a href="https://help.github.com/articles/generating-ssh-keys">llaves de ssh</a> con anterioridad.</p>
</blockquote>

<hr />

<h2>Protocolos</h2>

<p>Cuando nos referimos a protocolos, hablamos de las reglas y normas que permiten que dos o más entidades se comuniquen entre ellas para transmitir información. Git trabaja con múltiples protocolos de comunicación. Si hacemos referencia a <a href="https://github.com">Github</a> ya se habrán dado cuenta que al querer clonar un repositorio existen dos (2) protocolos disponibles, HTTP y SSH. Vamos a explicar cuales son los "pro" y "contras" de ambos, pero para el ejemplo nos basaremos únicamente en ssh.</p>

<h3>SSH</h3>

<p>Posiblemente SSH sea el medio de transporte de comunicación más utilizado en git. La razón de esto es que en la mayoría de los servidores ya se encuentra instalado por defecto. Por otra parte SSH también es un protocolo de autenticación de red, lo que nos ayuda a filtrar los usuarios que tienen permiso de lectura y escritura en nuestro repositorio.</p>

<h4>Pro</h4>

<ul>
<li>Siempre se debe usar para autenticar escritura en un repositorio.</li>
<li>Fácil de instalar.</li>
<li>Se encuentra instalado en casi todos los sistemas *nix.</li>
<li>El acceso mediante el protocolo es seguro.</li>
<li>Efectivo a la hora de transferir data.</li>
</ul>

<h4>Contra</h4>

<ul>
<li>No permite acceso anónimo al repositorio.</li>
<li>Se debe tener acceso al servidor para poder utilizarlo.</li>
</ul>

<h3>HTTP/S</h3>

<p>Este protocolo es el protocolo del internet, y por ende es "muy fácil" de poner a trabajar en cualquier servidor. Para poder utilizar el protocolo con un repositorio es cuestión de crear una carpeta con el repositorio git dentro de una de las carpetas alto tipo <code>/var/www/htdocs/</code> conocidas por nuestro servidor web (nginx, lighttpd, apache, etc.), activar el <code>post-update</code> hook que viene dentro de la carpeta hooks y ya.</p>

<h4>Pro</h4>

<ul>
<li>Muy fácil de instalar.</li>
<li>Todo el mundo tiene acceso de descarga.</li>
<li>Emplea bajos recursos del servidor.</li>
<li>Se pueden tener repositorios de solo lectura.</li>
<li>Por lo general este protocolo siempre se encuentra habilitado detrás de los firewalls.</li>
</ul>

<h4>Contra</h4>

<ul>
<li>Más lento para clonar y descargar.</li>
<li>Se transfiere toda la data de repositorio y no los cambios únicamente.</li>
<li>Es un protocolo "bruto".</li>
</ul>

<hr />

<h2>¿Cómo se instala?</h2>

<p>Para realizar toda la instalación vamos a utilizar un Sistema Operativo Ubuntu 13.04 de 64 bits. Aparte debemos tener instalado el <a href="http://codehero.co/git-desde-cero-instalacion-configuracion-y-comandos-basicos/">paquete git-core</a> y además debemos tener creado o saber crear el par de <a href="https://help.github.com/articles/generating-ssh-keys">llaves de ssh</a>. De ser posible para facilitar un poco la cosa instalar <code>ssh-copy-id</code> en la máquina personal.</p>

<p>Lo primero es tener acceso al servidor. Una vez dentro de servidor vamos a crear un usuario llamado <code>git</code>. Luego copiar la llave ssh del usuario, crear un repositorio y por último subirle contenido al mismo.</p>

<pre>$ sudo adduser git</pre>

<p>Seguimos las preguntas e indicaciones para crear el usuario, luego nos cambiamos a ese usuario y creamos la carpeta <code>.ssh</code></p>

<pre>$ su git
$ cd
$ mkdir .ssh
</pre>

<p>Ahora existen dos maneras posibles de copiar las llaves del usuario hacia el servidor. Estando en nuestro computador y si tenemos <code>ssh-copy-id</code> empleamos el siguiente comando.</p>

<pre>$ ssh-copy-id git@192.168.1.2 # IP del servidor.</pre>

<p>Sino tenemos <code>ssh-copy-id</code> instalado debemos hacerlo "manual"</p>

<pre>$ cat .ssh/id_rsa.pub | ssh git@192.168.1.2 "cat >> ~/.ssh/authorized_keys" </pre>

<blockquote>
  <p>Les recuerdo nuevamente las llaves ssh deben estar creadas previamente.</p>
</blockquote>

<p>Ahora crearemos un repositorio <strong><em>vacío</em></strong> dentro de la carpeta <code>~/miproyecto</code> en el <code>$HOME</code> del usuario.</p>

<pre>$ mkdir ~/miproyecto
$ cd ~/miproyecto
$ mkdir miproyecto.git
$ cd miproyecto.git
$ git --bare init
</pre>

<blockquote>
  <p>La bandera <code>--bare</code> genera el repositorio pero completamente vacío.</p>
</blockquote>

<p>Ahora en la computadora del usuario o nuestra computadora vamos a subir un proyecto que tengamos a el servidor.</p>

<pre>$ cd miproyecto_local
$ git init
$ git add .
$ git commit -m 'initial commit'
$ git remote add origin git@192.168.1.2:/home/git/miproyecto.git
$ git push origin master
</pre>

<p>Listo, a partir de este momento otros "pueden" clonar y subir cambios al proyecto simplemente agregando su llave de ssh al servidor.</p>

<p>¿Fácil cierto? Ya sabemos que es sencillo, pero es un dolor de cabeza estar agregando las llaves ssh de todos los compañeros del proyecto uno a uno, para esto se crearon herramientas como <strong>Gitolite</strong> y <strong>Gitosis</strong>. Este par de herramientas son "scripts" que ayudan a manejar las llaves ssh dentro del archivo <code>authored_keys</code> y a su vez un control de acceso. Instalarlas no es tarea fácil es alto tedioso y por la "complejidad" no lo haremos en este curso, pero queremos que estén al tanto de que estas herramientas existen.</p>

<p>Si llegan a instalar acceso mediante HTTP/S para el repositorio también pueden utilizar un visualizador web del proyecto, es decir, una página web como si fuese Github que les permite ver <em>"commits", "tags", "branches"</em> y toda la información relevante del proyecto en una página web súper sencilla pero muy útil. La interfaz se llama <strong>GitWeb</strong>, para activarla necesitamos un servidor web (valga la redundancia), algo como <code>webrick</code> en ruby o cualquier otro servidor web sencillo. Se utiliza ejecutando el siguiente comando:</p>

<pre>$ git instaweb --httpd=webrick
$ git instaweb --httpd=webrick --stop # Para detener el daemon
</pre>

<p>Recuerden que para que la interfaz sea pública la debemos agregar a un VirtualHost en apache o a un Server Block en nginx.</p>

<p>La información de este artículo fue extraída de el libro <a href="http://git-scm.com/book/es/Git-en-un-servidor">Pro Git</a>.</p>

<hr />

<h2>Conclusión</h2>

<p>En este último capítulo y en conjunto con los capítulos anteriores hemos adquirido el conocimiento necesario para poder hospedar nuestro propio servidor de git con acceso SSH para nuestro pequeño grupo de trabajo. Te invitamos a revisar la documentación de Git para que extiendas tú conocimiento aún más. Si te surge algún tipo de duda no te detengas y déjanos un comentario, que gustosamente lo responderemos.</p>

<p>¡Esperamos que ésta serie sobre git les haya gustado bastante! Si requieren algún tema adicional que sea de su agrado y no se nombró durante los 16 capítulos de la serie pueden solicitarlo en los comentarios.</p>

<p>¡Saludos!</p>
