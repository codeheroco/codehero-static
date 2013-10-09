---
layout: post
status: publish
published: true
title: Submódulos.
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
wordpress_id: 2063
wordpress_url: http://codehero.co/?p=2063
date: 2013-08-22 00:02:33.000000000 -04:30
categories:
- Cursos
- Git
tags:
- Cursos
- Git
- curso
comments: []
---
<p>Bienvenidos a un nuevo capítulo de <strong><em>Git desde cero</em></strong> en este <em>curso</em> hablaremos sobre como agregar, actualizar y utilizar un submódulo en nuestros proyectos. Los comandos a utilizar esta semana serán los siguientes:</p>

<ul>
<li>git submodule * (varios comandos)</li>
</ul>

<hr />

<h2>Introducción a submódulos</h2>

<p>De manera frecuente vemos la necesidad de utilizar otro proyecto o "librería" dentro del proyecto en que se está trabajando. En algunos lenguajes de programación como Ruby o Python existen manejadores de librerías que facilitan esta tarea. Hay otros como Objective-c que no tienen (cocoa-pods existe pero a la fecha no es la herramienta por excelencia) y es por esta razón se torna engorrosa la tarea de instalar y actualizar librerías de terceros o de nosotros mismos en cualquier proyecto que estemos realizando.</p>

<p>Git viene a resolver el problema de instalación o reutilización de código con submódulos. Los submódulos no son más que proyectos git dentro de una subcarpeta que a su vez se encuentra dentro de otro proyecto git, el cual permite clonar un segundo repositorio dentro del repositorio padre el cual viene siento en el que se está trabajando y nos posibilita mantener los cambios separados. Esto puede parecer algo engorroso al principio pero vamos a probarlo para observar sus pro y sus contra.</p>

<hr />

<h2>Agregando un submódulo</h2>

<p>Para este curso, agregaremos otro de los proyectos de <a href="https://github.com/codeheroco">Codehero</a> como submódulo del curso de git. y haremos la demostración completa de como agregar, clonar, y los posibles problemas asociados a los submódulos.</p>

<p>Empecemos por agregar el submódulo, en este caso será el de <a href="https://github.com/codeheroco/chef">chef</a>. Lo primero que debemos hacer es ir y buscar el URL del repositorio en git.</p>

<pre>$ git submodule add https://github.com/codeheroco/chef.git chef-submodule
Cloning into 'chef-submodule'...
remote: Counting objects: 335, done.
remote: Compressing objects: 100% (190/190), done.
remote: Total 335 (delta 77), reused 332 (delta 77)
Receiving objects: 100% (335/335), 267.46 KiB | 72.00 KiB/s, done.
Resolving deltas: 100% (77/77), done.
Checking connectivity... done
</pre>

<p>Con el comando anterior hemos realizado lo siguiente. Creamos un submódulo llamado <strong>chef-submodule</strong> el cual viene siendo una carpeta más dentro de nuestro proyecto y descargamos todo el contenido del repositorio <a href="https://github.com/codeheroco/chef">chef</a> dentro de ella. Si ahora miramos el <code>git status</code> del repositorio principal observamos lo siguiente.</p>

<pre>$ git status
# On branch master
# Changes to be committed:
#   (use "git reset HEAD &lt;file>..." to unstage)
#
#   new file:   .gitmodules
#   new file:   chef-submodule
#
</pre>

<p>Se creó un archivo oculto llamado .gitmodules el cual tiene la información necesaria sobre él o los submódulos que queramos tener en nuestro proyecto.</p>

<pre>$ cat .gitmodules
[submodule "chef-submodule"]
    path = chef-submodule
    url = https://github.com/codeheroco/chef.git
</pre>

<p>Es importante que este archivo suba al control de versiones y <strong><em>no</em></strong> se agregue en ningún momento al archivo <em>.gitignore</em>.</p>

<p>Si ahora realizamos un <code>git diff --cached</code> sobre nuestro submódulo podemos ver que aunque <em>chef-submodule</em> es una subcarpeta con un repositorio interno independiente de nuestro proyecto, git identifica que se realizaron cambios dentro de la misma, lo que nos indica que se debe realizar un <code>git commit</code> para respaldar el nuevo estado del proyecto principal.</p>

<pre>$ git diff --cached chef-submodule
diff --git a/chef-submodule b/chef-submodule
new file mode 160000
index 0000000..57532b1
--- /dev/null
+++ b/chef-submodule
@@ -0,0 +1 @@
+Subproject commit 57532b1d0888246b38c94ba2c70861548257cd6f
(END)
</pre>

<p>Si observamos detenidamente el diff, vemos que el cambio que git detecta es simplemente un cambio en el <strong><em>HEAD</em></strong> del submódulo, es decir que el hash del último <em>commit</em> cambió.</p>

<p>Realicemos el commit del proyecto con el submódulo.</p>

<pre>$ git commit -m "Primer commit con un submódulo"
[master 2614422] Primer commit con un submódulo
 2 files changed, 4 insertions(+)
 create mode 100644 .gitmodules
 create mode 160000 chef-submodule
</pre>

<p>De manera efectiva hemos guardado nuestro proyecto en un repositorio git en conjunto con el submódulo.</p>

<hr />

<h2>Clonando un repositorio con un submódulo</h2>

<p>Si quisiéramos clonar el proyecto completo del tutorial-git ahora que tiene un submódulo, tendríamos que realizar los siguientes pasos:</p>

<ul>
<li>Clonar el repositorio principal.</li>
<li>Cambiar al directorio del repositorio</li>
<li>Inicializar el submódulo.</li>
<li>Actualizar el submódulo.</li>
</ul>

<p>Realicemos la demostración:</p>

<pre>$ git clone https://github.com/codeheroco/tutorial-git.git
Cloning into 'tutorial-git'...
remote: Counting objects: 49, done.
remote: Compressing objects: 100% (31/31), done.
remote: Total 49 (delta 18), reused 43 (delta 12)
Unpacking objects: 100% (49/49), done.
Checking connectivity... done

# Cambiamos de directorio

$ cd tutorial-git

# Inicializar el submódulo

$ git submodule init
Submodule 'chef-submodule' (https://github.com/codeheroco/chef.git) registered for path 'chef-submodule'

# Actualizamos el submódulo

$ git submodule update
Cloning into 'chef-submodule'...
remote: Counting objects: 335, done.
remote: Compressing objects: 100% (190/190), done.
remote: Total 335 (delta 77), reused 332 (delta 77)
Receiving objects: 100% (335/335), 267.46 KiB | 67.00 KiB/s, done.
Resolving deltas: 100% (77/77), done.
Checking connectivity... done
Submodule path 'chef-submodule': checked out '57532b1d0888246b38c94ba2c70861548257cd6f'
</pre>

<p>De la misma manera que actualizamos el submódulo aquí, para descargar la información que contiene dicho submódulo, se realiza cuando se requiere actualizar en caso de que alguien haya introducido alguna modificación. Ésta actualización viene siendo lo mismo que hacer <code>git pull --rebase</code> en el repositorio principal.</p>

<hr />

<h2>Posibles problemas introducidos con submódulos</h2>

<p>Uno de los principales errores que se cometen al utilizar submódulos es cuando uno de los desarrolladores introduce cambios locales en el código de alguno de los submódulos, realiza su <em>commit</em>, y lo confirma en el repositorio principal, hace <em>push</em> del repositorio principal pero no del submódulo. Entonces cuando alguien quiere realizar un <code>git submodule update</code> el <em>commit</em> que se encuentra en la cabecera no corresponde con el que dice la información del proyecto ocurriendo un error "incorregible" hasta que no se actualice el submódulo por la persona correcta.</p>

<pre>$ git submodule update
fatal: reference isn’t a tree: 57532b1d0888246b38c94ba2c70861548257cd6f
Unable to checkout '57532b1d0888246b38c94ba2c70861548257cd6f' in submodule path 'chef-submodule'
</pre>

<p>Por esta razón hay que tener cuidado cuando uno utiliza submódulos, por un pequeño olvido nos puede causar una tarde amarga.</p>

<hr />

<h2>Conclusión</h2>

<p>En este último capítulo y en conjunto con los cursos anteriores hemos adquirido el conocimiento necesario para utilizar submódulos dentro de nuestros proyectos, ya sea para reutilizar nuestro propio código o simplemente agregar una librería externa. Si quieren indagar un poco más sobre este tema que revisen el manual <code>git submodule -h</code> y busquen por internet. Si te surge algún tipo de duda no te detengas y déjanos un comentario, que gustosamente lo responderemos.</p>

<p>¡Hasta la semana entrante!</p>
