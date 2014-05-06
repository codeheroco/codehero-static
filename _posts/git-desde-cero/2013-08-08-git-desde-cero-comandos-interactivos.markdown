---
layout: post
status: publish
published: true
title: Comandos interactivos.
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
date: 2013-08-08 00:10:44.000000000 -04:30
serie: Git desde Cero
dificultad: Avanzado
duracion: 30
github: https://github.com/codeheroco/tutorial-git
description: Capítulo 8 de Git desde Cero, serie en la cual aprenderemos Git desde Cero. Estudiaremos el uso de los comandos interactivos rebase y add.
categories:
- Cursos
- Git
tags:
- Git
- Rebase
- Add
- Interactivos
- Interactivo
---
<p>Bienvenidos a un nuevo capítulo de <strong><em>Git desde cero</em></strong> en este <em>curso</em> hablaremos sobre como agregar interactivamente archivos al escenario (staging) y continuaremos con <code>git rebase</code> tocando un punto importante sobre como modificar el historial de cambios. Los comandos a utilizar esta semana serán los siguientes:</p>

<ul>
<li>git rebase -i</li>
<li>git add -i</li>
</ul>

<hr />

<h2>Add -i</h2>

<p>Muchas veces cuando modificamos una gran cantidad de archivos y llega el punto de agregarlos al <em>stage</em> nos damos cuenta que no todos los archivos que modificamos guardan una relación y por consiguiente ese nuevo <em>commit</em> que vamos a realizar tendrá un título y un comentario que no refleja todos los cambios realizados o por otro lado refleja todos los cambios pero los mismos no guardan una relación entre sí. Tomando un ejemplo. En una aplicación MVC, pudimos haber modificado las vistas, el controlador y el modelo de los usuarios y haciendo esto nos dimos cuenta de unos detalles que pertenecían a las vistas relacionadas con las publicaciones del blog, estas no tienen nada que ver con los usuarios, pero de igual forma las corregimos. Cuando vayamos a realizar el <em>commit</em> la buena práctica nos indica que deberíamos realizar no uno sino dos (2) <em>commits</em> para representar estos dos cambios distintos, la cuestión es, que puede ser algo tedioso agregar uno a uno estos cambios. Es aquí que el comando <code>git add -i</code> nos facilita y nos provee una manera agradable para realizar nuestro cometido.</p>

<h3>¿Cómo funciona?</h3>

<p>Vamos interactivamente a agregar una serie de archivos tanto nuevos como viejos al escenario de git y posteriormente a consolidarlos para ver visualmente como funciona el comando.</p>

```sh
# Creamos un nuevo archivo
$ touch nuevo_archivo.md

# Con un editor de texto agregamos la siguiente línea.

$ nano nuevo_archivo.md
# Este nuevo archivo será utilizado para demostrar el "add interactivo".

# Luego modificamos el archivo hola_jonathan.md agregando
Nueva información para este archivo.

# Por último Archivo2_cambio_de_nombre.txt, agregando
Agregamos la quinta línea del archivo.

# Ahora interactivamente vamos a agregar todos estos archivos como dos commits distintos.

git add -i
           staged     unstaged path
  1:    unchanged        +2/-0 Archivo2_cambio_de_nombre.txt
  2:    unchanged        +2/-0 hola_jonathan.md

*** Commands ***
  1: status   2: update   3: revert   4: add untracked
  5: patch    6: diff     7: quit     8: help
What now> 4
```

<p>Lo que nos indica la pantalla en este momento es que tenemos 2 archivos que presentan cambios pero no se han agregado al stage. Queremos agregar el nuevo archivo creado al escenario y sumarle uno de los viejos para realizar posteriormente un commit.</p>

```sh
# Continuando
What now> 4
  1: nuevo_archivo.md
Add untracked>> 1
* 1: nuevo_archivo.md
Add untracked>> # Presionamos la tecla enter/return.
added one path

*** Commands ***
  1: status   2: update   3: revert   4: add untracked
  5: patch    6: diff     7: quit     8: help
What now> 1 # Revisamos el git status
           staged     unstaged path
  1:    unchanged        +2/-0 Archivo2_cambio_de_nombre.txt
  2:    unchanged        +2/-0 hola_jonathan.md
  3:        +1/-0      nothing nuevo_archivo.md

*** Commands ***
  1: status   2: update   3: revert   4: add untracked
  5: patch    6: diff     7: quit     8: help
What now> 2
```

<p>En este momento observamos que luego de agregar el nuevo archivo y de revisar el stage utilizando la opción 1, el <em>comando interactivo</em> ya nos dice que hemos agregado satisfactoriamente al stage el "nuevo_archivo.md" y presenta 1 línea de "cambio". Continuemos, agreguemos uno de los viejos archivos al stage.</p>

```sh
# Continuando
What now> 2
           staged     unstaged path
  1:    unchanged        +2/-0 Archivo2_cambio_de_nombre.txt
  2:    unchanged        +2/-0 hola_jonathan.md
Update>> 2 # Elegimos el segundo archivo.
           staged     unstaged path
  1:    unchanged        +2/-0 Archivo2_cambio_de_nombre.txt
* 2:    unchanged        +2/-0 hola_jonathan.md
Update>> # Presionamos la tecla enter/return.
updated one path

*** Commands ***
  1: status   2: update   3: revert   4: add untracked
  5: patch    6: diff     7: quit     8: help
What now> 1 # Revisamos el git status
           staged     unstaged path
  1:    unchanged        +2/-0 Archivo2_cambio_de_nombre.txt
  2:        +2/-0      nothing hola_jonathan.md
  3:        +1/-0      nothing nuevo_archivo.md

*** Commands ***
  1: status   2: update   3: revert   4: add untracked
  5: patch    6: diff     7: quit     8: help
What now> 6
```

<p>Vemos que en este momento existen nuestros 2 archivos en escenario. Ahora podemos realizar un <em>diff</em> sobre cualquiera de los archivos que ahí se encuentren. Este <em>diff</em> dentro del comando interactivo es un simil a utilizar el comando <code>git diff --cached</code> que utilizamos en los primeros cursos.</p>

```sh
# Continuando
What now> 6
           staged     unstaged path
  1:        +2/-0      nothing hola_jonathan.md
  2:        +1/-0      nothing nuevo_archivo.md
Review diff>> # elegimos cualquiera de los 2
*** Commands ***
  1: status   2: update   3: revert   4: add untracked
  5: patch    6: diff     7: quit     8: help
What now> 7 # Nos salimos.
```

<p>Hemos concluido y salido del <code>git add -i</code> y agregamos nuestros dos archivos para el <em>commit</em>, si queremos, podemos ejecutar el comando <code>git status</code> para comprobar que lo que hemos agregado mediante el comando <code>git add -i</code> funcionó como esperabamos.</p>

```sh
$ git status
# On branch master
# Changes to be committed:
#   (use "git reset HEAD <file>..." to unstage)
#
#   modified:   hola_jonathan.md
#   new file:   nuevo_archivo.md
#
# Changes not staged for commit:
#   (use "git add <file>..." to update what will be committed)
#   (use "git checkout -- <file>..." to discard changes in working directory)
#
#   modified:   Archivo2_cambio_de_nombre.txt
#
```

<p>Podemos observar que todo está listo para realizar el commit que queremos. El commit se realiza normalmente utilizando nuestro conocido comando <code>git commit</code>. Para este caso en particular haremos algo diferente para demostrar el comando <code>git rebase -i</code>. Guardaremos estos cambios en un <em>stash</em>, los llevaremos a una nueva rama y haremos el rebase interactivo.</p>



<p>Previo a realizar un <code>git stash</code> agregamos todos los archivos al escenario antes de cambiar de rama.</p>

```sh
$ git add .
$ git stash
Saved working directory and index state WIP on master: f2ead5d Referencia en readme.
HEAD is now at f2ead5d Referencia en readme.

# Creamos la nueva rama

$ git co -b rama-para-rebase-interactivo
Switched to a new branch 'rama-para-rebase-interactivo'

# Aplicamos los cambios del stash

$ % git stash pop
# On branch rama-para-rebase-interactivo
# Changes to be committed:
#   (use "git reset HEAD <file>..." to unstage)
#
#   new file:   nuevo_archivo.md
#
# Changes not staged for commit:
#   (use "git add <file>..." to update what will be committed)
#   (use "git checkout -- <file>..." to discard changes in working directory)
#
#   modified:   Archivo2_cambio_de_nombre.txt
#   modified:   hola_jonathan.md
#
Dropped refs/stash@{0} (eb15ce2cc60a1829f24442fb14b3e69eb0866580)
```

<p>En este momento sí realizaremos los respectivos <em>commits</em> como estaban planeados. Es decir, el archivo nuevo y no de los viejos.</p>

```sh
$ git add hola_jonathan.md
$ git commit -m "Commit planeado. archivo nuevo y viejo"
[rama-para-rebase-interactivo a735092] Commit planeado. archivo nuevo y viejo
 2 files changed, 3 insertions(+)
 create mode 100644 nuevo_archivo.md

# Hacemos el commit del archivo viejo que quedó solo.

$ git status
# On branch rama-para-rebase-interactivo
# Changes not staged for commit:
#   (use "git add <file>..." to update what will be committed)
#   (use "git checkout -- <file>..." to discard changes in working directory)
#
#   modified:   Archivo2_cambio_de_nombre.txt
#
no changes added to commit (use "git add" and/or "git commit -a")

$ git add Archivo2_cambio_de_nombre.txt
$ git commit -m "Archivo2 con cambios en la línea 5"
[rama-para-rebase-interactivo 38a72fd] Archivo2 con cambios en la línea 5
 1 file changed, 2 insertions(+)
```

<p>Ahora pasemos al rebase interactivo.</p>

<hr />

<h2>Rebase -i</h2>

<p>El comando <code>git rebase -i</code> nos permite realizar varias cosas, entre ellas modificar el historial de cambios. Es decir, podemos comprimir varios <em>commits</em> en uno solo, borrar <em>commits</em>, cambiarles el mensaje o simplemente modificar un <em>commit</em> completamente. El comando es bastante complejo pero es muy interesante. Recomendamos utilizarlo con cuidado. Cabe destacar que para utilizar este comando git abre un editor de texto por lo que se recomienda predefinir uno previamente.</p>

<p>En nuestro caso utilizaremos el popular Sublime Text 2 para esto. Con el siguiente comando podemos predefinir el editor en git. <code>git config --global core.editor "subl -w"</code> o si prefieren usar vim. <code>git config --global core.editor "vim"</code>.</p>

<p>Cuando utilicemos el comando <code>git rebase -i</code> tenemos que tener claro que en la pantalla del editor de texto aparecerán los commits ordenados desde el más viejo al más nuevo. El <em>rebase</em> interactivo nos presenta todas estas opciones.</p>

<h3>Pick</h3>

<p>Pick se utiliza para incluir un commit. Por defecto se le verá una lista de los commits existentes en el rebase, en el orden de más viejo (superior) a la más reciente (abajo). Reorganizar el orden de los commits durante el <em>rebase</em> cambiará el orden de los commits cuando concluya el mismo.</p>

<h3>Reword</h3>

<p>Esto es similar al Pick, pero el proceso de rebase se detendrá y le dará la oportunidad de cambiar el mensaje asociado al <em>commit</em>. El contenido de la confirmación no se modificará.</p>

<h3>Edit</h3>

<p>Ejecutará el Pick y luego pausará el rebase. Durante esta pausa puede modificar el commit, añadir o eliminar archivos dentro del mismo. También se pueden hacer otros commits y luego continuar el rebase, esto permite separar un commit grande en unos más pequeños.</p>

<h3>Squash</h3>

<p>Este comando le permite combinar dos o más commits en uno solo.</p>

<h3>fixup</h3>

<p>Esto es similar al squash, pero el mensaje asociado al commit se descartará y se utilizará el mensaje que tenia el commit con el commando "pick".</p>

<h3>Exec</h3>

<p>Esto le permite ejecutar comandos shell arbitrarios automáticamente contra un commit.</p>

<p>Una vez comprendido esto, hagamos nuestro <code>git rebase -i</code> con un <code>squash</code> de los 2 commits para tener un historial más "limpio".</p>

```sh
$ git rebase -i master

# Se abre el editor de texto y se nos presenta lo siguiente.

pick a735092 Commit planeado. archivo nuevo y viejo
pick 38a72fd Archivo2 con cambios en la línea 5

# Rebase f2ead5d..38a72fd onto f2ead5d
#
# Commands:
#  p, pick = use commit
#  r, reword = use commit, but edit the commit message
#  e, edit = use commit, but stop for amending
#  s, squash = use commit, but meld into previous commit
#  f, fixup = like "squash", but discard this commit's log message
#  x, exec = run command (the rest of the line) using shell
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out

# Realizaremos el siguiente cambio en la segunda línea únicamente, cambiamos pick por squash.

pick a735092 Commit planeado. archivo nuevo y viejo
squash 38a72fd Archivo2 con cambios en la línea 5

# Guardamos los cambios y cerramos el editor. Se abrirá nuevamente para que modifiquemos el mensaje del commit si nos provoca. Pero no haremos nada. El resultado es el siguiente.

[detached HEAD de13f1b] Commit planeado. archivo nuevo y viejo
 3 files changed, 5 insertions(+)
 create mode 100644 nuevo_archivo.md
Successfully rebased and updated refs/heads/rama-para-rebase-interactivo.
```

<p>Luego queda realizar el <em>merge</em> con la rama master y todo estará listo.</p>

```sh
$ git checkout master
$ git merge rama-para-rebase-interactivo
Updating f2ead5d..de13f1b
Fast-forward
 Archivo2_cambio_de_nombre.txt | 2 ++
 hola_jonathan.md              | 2 ++
 nuevo_archivo.md              | 1 +
 3 files changed, 5 insertions(+)
 create mode 100644 nuevo_archivo.md

# Borramos la rama recién unida.

$ git branch -d rama-para-rebase-interactivo
```

<p>En este punto si observamos nuestro <em>log</em> observamos que existe un solo <em>commit</em> que contiene todas las modificaciones antes descritas.</p>

<p>Debo recordarles nuevamente que no realicen un rebase sobre una rama que sea pública y menos todavía si hace un <em>squash</em> o un edit. Todo el mundo se los agradecerá.</p>

<hr />

<h2>Conclusión</h2>

<p>En este último capítulo y en conjunto con los cursos anteriores hemos adquirido el conocimiento necesario para utilizar ramas y modificar el historial de cambios y agregar archivos interactivamente. Si te surge algún tipo de duda no te detengas y déjanos un comentario, que gustosamente lo responderemos.</p>

<p>¡Hasta la entrante!</p>
