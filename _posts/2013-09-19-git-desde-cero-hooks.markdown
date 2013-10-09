---
layout: post
status: publish
published: true
title: Git hooks.
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
wordpress_id: 2275
wordpress_url: http://codehero.co/?p=2275
date: 2013-09-19 00:02:03.000000000 -04:30
categories:
- Cursos
- Git
tags:
- Cursos
- Git
- curso
comments: []
---
<p>Bienvenidos a un nuevo capítulo de <strong><em>Git desde cero</em></strong> en este <em>curso</em> hablaremos sobre algunos de los <em>"hooks"</em> (ganchos) más populares que tiene git.</p>

<hr />

<h2>¿Qué son git hooks?</h2>

<p>Como se habrán dado cuenta a lo largo de toda esta serie, git tiene una innumerable cantidad de funciones. Los <em>"hooks"</em> o ganchos son otras de estas tantas funciones extremadamente útiles pero poco utilizadas por muchos de nosotros. Los <em>"hooks"</em> son un conjunto de acciones que se ejecutan antes o después de un comando particular de git, es decir, si estamos utilizando un "pre-commit hook" se ejecutará una acción antes de realizar el "commit", si dicha acción realizada antes del "commit" tiene una respuesta negativa podemos cancelar el "commit", arrojar un error y viceversa. Podemos decir que los <em>"hooks"</em> son una capa extra que nos ayudan a no pasar por alto ciertos detalles.</p>

<hr />

<h2>Tipos de hooks</h2>

<p>Existen una gran cantidad de "hooks" disponibles para aplicar, haremos un pequeño resumen de cada uno:</p>

<ul>
<li><strong>applypatch-msg:</strong> ayuda a formatear un mensaje para cumplir un estándar deseado del proyecto (si existe). También puede ser utilizado para rechazar un "commit" después de inspeccionar el mensaje. Si se encuentra activado el "hook" <em>commit-msg</em>, <em>applypatch-msg</em> lo invoca.</li>
<li><strong>pre-applypatch:</strong> es usado para inspeccionar la rama donde se está trabajando y no permite un "commit" si el mismo no pasa unas pruebas. Si se encuentra activado <em>pre-commit</em> "hook" lo invoca.</li>
<li><strong>post-applypatch:</strong> es usado principalmente para notificaciones (escribe un mensaje que se desee por la consola).</li>
<li><strong>pre-commit:</strong> es invocado por <code>git commit</code>, la utilidad por defecto de este "hook" es atrapar espacios en blanco al final de cada línea y abortar el "commit" si esto llega a ocurrir. Pero se puede agregar cualquier cantidad de pruebas a este "hook" para asegurar que nuestros "commits" se encuentran como queremos que estén. Se puede ignorar este "hook" utilizando la bandera <code>--no-verfy</code> al final del "commit".</li>
<li><strong>prepare-commit-msg:</strong> el propósito de este "hook" es preparar el comentario con un formato por defecto que uno desee que tenga (si existe). Un ejemplo de un comportamiento similar de este "hook" es cuando generamos un <strong><em>merge</em></strong> de una rama y git nos genera de manera automática un comentario referente al merge.</li>
<li><strong>commit-msg:</strong> funciona de la misma manera que <strong>applypatch-msg</strong>. Podemos ignorarlo haciendo uso de la bandera <code>--no-verfy</code>.</li>
<li><strong>post-commit:</strong> funciona de la misma manera que <strong>post-applypatch</strong> (imprime un mensaje de notificación) pero actúa una vez que se realizó el "commit".</li>
<li><strong>pre-rebase:</strong> éste gancho es activado por el comando <code>git rebase</code> y puede ser usado para prevenir que una rama sea rebasada.</li>
<li><strong>post-checkout:</strong> éste gancho se activa cuando se utiliza <code>git checkout</code> y puede ser usado para mostrar las diferencias entre las diferentes ramas o setear alguna metadata necesaria.</li>
<li><strong>post-merge:</strong> es invocado por el comando <code>git merge</code> y puede ser usado para salvar o restablecer cualquier metadata asociada con una rama de trabajo.</li>
<li><strong>pre-receive:</strong> este gancho es invocado por <code>git-receive-pack</code> en el repositorio remoto, y ocurre cuando se realiza un <code>git push</code>. Es el encargado de actualizar las referencias de los objetos y el estado del update (actualización).</li>
<li><strong>update:</strong> de la misma manera que el <strong>pre-receive</strong> se invoca con <code>git-receive-pack</code> y ocurre con el comando <code>git-push</code>. Este gancho actualiza las referencias del repositorio remoto y puede ser utilizado para prevenir un <code>git push -f</code> (forzado).</li>
<li><strong>post-receive:</strong> es ejecutado por <code>git-receive-pack</code> y ocurre cuando utilizamos el comando <code>git push</code>. A diferencia de los otro dos <em>update</em> y <em>pre-receive</em> actúa del lado del servidor. Se puede utilizar este gancho para enviar emails después de realizar el "commit" o verificar cualquier información de relevancia.</li>
<li><strong>post-rewrite:</strong> es invocado por los comandos que reescriben commits tales como <code>git commit --amend</code> o <code>git rebase</code>. </li>
</ul>

<p>Esta información fue tomada de <a href="https://www.kernel.org/pub/software/scm/git/docs/githooks.html">kernel.org</a>.</p>

<hr />

<h2>¿Cómo se usan los hooks?</h2>

<p>Para poder utilizar algún "hook" debemos crearlos manualmente. La mayoría de los "hooks" son scripts de "shell", aunque podemos utilizar otros lenguajes de "scripting" si queremos. Absolutamente todos los "hooks" que necesitemos o creemos deben estar en la carpeta <code>.git/hooks/</code> dentro del repositorio de git de nuestro interés. Por defecto todos los proyectos de git se crean con "hooks" pero hay que renombrarlos correctamente para que funcionen.</p>

<p>Hagamos una pequeña demostración de como se usan:</p>

<p>Entremos primero en la carpeta para observar cuales son los ganchos que por defecto que vienen con la creación del repositorio git.</p>

<pre>$ cd .git/hooks
$ ls -la
total 40
drwxr-xr-x 11 albertogg  374 Sep 18 14:27 .
drwxr-xr-x 15 albertogg  510 Sep 18 14:27 ..
-rwxr-xr-x  1 albertogg  452 Jun 26 23:08 applypatch-msg.sample
-rwxr-xr-x  1 albertogg  896 Jun 26 23:08 commit-msg.sample
-rwxr-xr-x  1 albertogg  189 Jun 26 23:08 post-update.sample
-rwxr-xr-x  1 albertogg  398 Jun 26 23:08 pre-applypatch.sample
-rwxr-xr-x  1 albertogg  640 Sep 18 14:27 pre-commit
-rw-r--r--  1 albertogg 1348 Jun 26 23:08 pre-push.sample
-rwxr-xr-x  1 albertogg 4951 Jun 26 23:08 pre-rebase.sample
-rwxr-xr-x  1 albertogg 1239 Jun 26 23:08 prepare-commit-msg.sample
-rwxr-xr-x  1 albertogg 3611 Jun 26 23:08 update.sample
</pre>

<p>Vamos a utilizar en este caso el "pre-commit hook". Debemos renombrar los archivos y quitarles la terminación ".sample" para que git los reconozca normalmente.</p>

<pre>$ mv pre-commit.sample pre-commit</pre>

<p>Ahora voy a agregar unos espacios en blanco a cualquier línea dentro de uno de los archivos del repositorio y luego a intentar realizar un "commit" para que observen lo que sucede.</p>

<pre>$ nano Archivo2_cambio_de_nombre.txt # agrego unos espacios en blanco al final de la segunda línea.

# intento realizar un "commit" y esto es lo que ocurre.

$ git commit -am "Prueba de hook"
Archivo2_cambio_de_nombre.txt:2: trailing whitespace.
+Agregando una segunda linea
</pre>

<p>Se canceló el "commit" ya que no pasó la prueba que realiza el "pre-commit hook". A partir de este momento debemos corregir y volver a realizar el "commit" para observar si hemos solventado todos los problemas existentes, de ser así se realizará el "commit" normalmente y sin espacios en blanco.</p>

<hr />

<h2>¿Quién utiliza git hooks?</h2>

<p>Si han llegado a utilizar servicios como <a href="https://www.heroku.com/">heroku.com</a> muy seguramente se habrán dado cuenta que cada vez que uno realiza un <code>git push</code> hacia el repositorio git de heroku, el mismo utiliza varios "hooks" para detectar que tipo de proyecto es (lenguaje, framework, estructura de carpetas) y de esa manera buscar el <a href="https://devcenter.heroku.com/articles/buildpacks">buildpack</a> adecuado para nuestro proyecto y así descargarse las librerías adecuadas y construir el proyecto en el servidor. Si alguna vez han subido un proyecto que heroku no reconoce también se habrán dado cuenta que el "hook" no permite la actualización y subida de las referencias del proyecto al servidor, cancelando el push.</p>

<hr />

<h2>Conclusión</h2>

<p>En este último capítulo y en conjunto con los cursos anteriores hemos adquirido el conocimiento necesario para poder entender que son estos "hooks" y para que nos pueden ayudar en un proyecto. Capaz cuando leas el contenido de este curso no pienses que necesitas "hooks", pero en un proyecto donde trabajan muchas personas es muy probaba que podamos prevenir comportamientos no deseados si los usamos. Si te surge algún tipo de duda no te detengas y déjanos un comentario, que gustosamente lo responderemos.</p>

<p>¡Hasta la semana entrante!</p>
