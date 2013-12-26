---
layout: post
status: publish
published: true
title: Rebase y Stash.
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
wordpress_id: 1830
wordpress_url: http://codehero.co/?p=1830
date: 2013-08-01 00:09:09.000000000 -04:30
series:
  nombre: Git desde Cero
  thumbnail: http://i.imgur.com/IzAdb3d.png
categories:
- Cursos
- Git
tags:
- Cursos
- Git
- curso
---
<p>Bienvenidos a un nuevo capítulo de <strong><em>Git desde cero</em></strong> en este <em>curso</em> hablaremos de otra forma para realizar la unión de ramas llamada <strong>"rebase"</strong>, de como almacenar cambios sin tener que consolidarlos y cuales son las mejores prácticas a la hora de utilizar estas herramientas. Los comandos a utilizar esta semana serán los siguientes:</p>

<ul>
<li>git rebase.</li>
<li>git stash (múltiples comandos).</li>
</ul>

<hr />

<h2>¿Qué es git rebase ?</h2>

<p>Si recordamos en capítulos anteriores, específicamente en el capítulo 5 hablamos sobre la herramienta <strong><em>merge</em></strong>, dicha herramienta es utilizada para unión de ramas. En Git existen dos estrategias "principales" para realizar la unión de ramas, la primera es la conocida <strong><em>merge</em></strong> y la segunda es <strong><em>rebase</em></strong>. Esta herramienta al igual que todas tiene sus pro y sus contra, pero en general una vez que aprendamos su flujo de trabajo se darán cuenta que posiblemente la mejor manera de realizar la unión de ramas en git.</p>

<h3>¿Qué hace rebase de especial?</h3>

<p>Cuando nosotros utilizamos esta herramienta para unir ramas, git sencillamente reproduce los cambios que consolidamos uno a uno en nuestra rama de trabajo y los lleva a la rama a donde queremos unirlos, es decir, genera una especie archivos virtuales que vienen siendo nuevas consolidaciones en la rama a la que se le unirán los cambios y los ubica uno detrás del otro en el mismo orden que se realizaron. Utilizando la estrategia de <em>"rebase"</em> al unir ramas, nos puede ayudar a evitar conflictos, siempre y cuando se realice con <em>commits</em> que no se hayan hecho públicos, es decir, que no se encuentren en un servidor remoto. Si dichos cambios se encontraran abiertos al público y existiera gente trabajando sobre ellos y a nosotros se nos ocurre aplicar un rebase, puede que los compañeros que están compartiendo el repositorio nos lleguen a odiar, ya que estamos modificando todos los <em>commits</em> y posiblemente el conflicto posterior al rebase sea más difícil de reparar de lo que piensan. Por lo tanto como regla de <strong>oro</strong> jamas utilicen <em>"rebase"</em> posterior a la realización de un <em>"git push"</em> o sobre <em>"commits"</em> que ya se encuentren en el repositorio remoto.</p>

<p>Pongámonos en marcha y probemos como funciona el rebase!</p>

```sh
$ git checkout master

# Creamos una nueva rama llamada readme-branch
$ git checkout -b readme-branch

# Con un editor de texto editamos y escribimos lo siguiente.
$ nano README.md

# pegamos el siguiente texto

# Repositorio git para el curso Git desde cero

Este repositorio conserva absolutamente todo el historial del curso.
Se encuentra clasificado por capítulos almacenados en etiquetas (tags), para
poder observar estos cambios debes revisar el log.

Para bajar el repositorio completo con todos los capítulos de la serie Git
desde Cero, debes clonar el mismo en tú equipo con el siguiente comando:

    $ git clone https://github.com/codeheroco/tutorial-git.git

Luego para ir a un capítulo en específico utilizamos el comando:

    $ git tag -l # listamos los capítulos
    $ git checkout Capitulo-X  # Donde X es el número del capítulo.

De esta manera estamos cambiando al final del capítulo con toda la "solución"
o texto del mismo.
```

<p>Consolidamos los cambios realizados y posteriormente realizamos el rebase de la rama readme-branch a la rama master de la siguiente manera:</p>

```sh
$ git status
$ git add README.md
$ git commit -m "Mejor archivo README"

# aplicamos el rebase.

$ git rebase master
Current branch readme-branch is up to date.

# para que los "commits" virtuales se consoliden en master tenemos que
# unirlos con el merge.

$ git checkout master
Switched to branch 'master'

$ git merge readme-branch
Updating c99705e..48eb2db # en este punto esta consolidando en master.
Fast-forward
 README.md | 13 +++++++++++--
 1 file changed, 11 insertions(+), 2 deletions(-)
```

<p>Pudiésemos también aplicar el rebase a una rama sin necesidad de estar ubicados en ella como por ejemplo, estando parados sobre una nueva rama llamada a-v creada a partir de master. Vamos a rebasar la rama readme-branch a master. hagamos la prueba!</p>

```sh
$ git chechout -b a-v
$ git rebase master readme-branch
Switched to branch 'readme-branch' # git nos cambia a la rama readme-branch
Current branch readme-branch is up to date. # Actualiza virtualmente master

# cambiamos de rama
$ git co master
Switched to branch 'master'

$ git merge readme-branch
Updating c99705e..48eb2db
Fast-forward
 README.md | 13 +++++++++++--
 1 file changed, 11 insertions(+), 2 deletions(-)
```

<p>Listo ya hemos realizado un merge utilizando primero <em>rebase</em>. Recuerden que como buena práctica debemos o deberíamos eliminar las ramas que han sido unidas y por último sino quieren que sus compañeros los odien <strong>no vayan a realizar un rebase de una rama pública!</strong>.</p>

```sh
$ git branch -d readme-branch
Deleted branch readme-branch (was 48eb2db).
```

<hr />

<h2>Stash</h2>

<p>Muchas veces nos encontramos trabajando en una funcionalidad y nos llama un compañero de trabajo pidiendo ayuda o diciéndonos que debemos modificar algo inmediatamente y que abandonemos lo que hacemos por un momento. Cuando esto ocurre sabemos que si nos cambiamos de rama los archivos modificados se vienen a la nueva rama y no queremos eso; por otra parte sería una locura realizar un <em>"commit"</em> incompleto o con código defectuoso ya que esto nos puede traer problemas futuros, es aquí cuando entra en juego nuestro comando "<strong><em>git stash</em></strong>".</p>

<p>¿Qué realiza git stash?</p>

<p>Simplemente almacena todos nuestras modificaciones y restaura nuestra rama al estado original para que cuando nos cambiemos de rama no nos llevemos los cambios incompletos, posteriormente podemos reaplicar estas modificaciones incompletas o borrar las mismas.</p>

<p>¿Cómo lo utilizamos?</p>

<p>Pues muy sencillo, vamos a agregar unos cambios a una nueva rama llamada <em>rama-stash</em>. Para probar como funciona, haremos <em>stash</em> de unos cambios y luego los volveremos a aplicar.</p>

```sh
$ git checkout -b rama-stash
Switched to a new branch 'rama-stash'

$ nano README.md

# Agregamos al final del archivo el siguiente párrafo y guardamos.

Recuerden que para la explicación completa de este curso se pueden dirigir a
[codehero.co](http://codehero.co) o directamente a [codehero.co/series/git-desde-cero](http://codehero.co/series/git-desde-cero/)

# Si llegamos a mirar el status podemos apreciar los cambios

$ git status
# On branch rama-stash
# Changes not staged for commit:
#   (use "git add <file>..." to update what will be committed)
#   (use "git checkout -- <file>..." to discard changes in working directory)
#
#    modified:   README.md
#
no changes added to commit (use "git add" and/or "git commit -a")
```

<p>Ahora guardaremos los cambios y posteriormente los volveremos a aplicar.</p>

```sh
$ git stash
Saved working directory and index state WIP on rama-stash: 48eb2db Mejor archivo README
HEAD is now at 48eb2db Mejor archivo README

# Miramos el status y vemos que se encuentra limpio

$ git status
# On branch rama-stash
nothing to commit, working directory clean

# Podemos ver los cambios que se encuentran guardados en stash

$ git stash list
Saved working directory and index state WIP on rama-stash: 48eb2db Mejor archivo README
stash@{0}: WIP on rama-stash: 48eb2db Mejor archivo README
```

<p>Ahora nos toca escoger si queremos reaplicar los cambios o simplemente borrarlos, cualquiera de las dos opciones es posible en este momento.</p>

```sh
# Para aplicar los cambios
$ git stash pop
# On branch rama-stash
# Changes not staged for commit:
#   (use "git add <file>..." to update what will be committed)
#   (use "git checkout -- <file>..." to discard changes in working directory)
#
#    modified:   README.md
#
no changes added to commit (use "git add" and/or "git commit -a")
Dropped refs/stash@{0} (f511b3332361558cff180717868ac208132bb2bf)

# para borrarlos
$ git stash drop
```

<p>Si existiera más de un stash disponible, se tiene que decir explícitamente si queremos reaplicar los cambios o borrarlos de la siguiente manera:</p>

```sh
$ git stash pop stash@{0} # Para reaplicar
$ git stash drop stash@{0} # Para borrarlos
```

<p>El comando stash es uno de los más utilizados cuando requerimos cambiarnos de rama para "arreglar" otro problema o simplemente requerimos un cambio de rama para realizar una prueba. Mi consejo es que siempre que puedan aplicarlo lo hagan y por favor no realicen commits con código con errores.</p>

<hr />

<h2>Conclusión</h2>

<p>En este último capítulo y en conjunto con los cursos anteriores hemos adquirido el conocimiento para realizar la unión de ramas de una mejor manera y de como guardar cambios sin realizar un commit en los proyectos que desarrollemos, estos atributos son fundamentales en el flujo de trabajo de git. Profundizaremos un poco más sobre <em>rebase</em> en capítulos posteriores. Si te surge algún tipo de duda no te detengas y déjanos un comentario, que gustosamente lo responderemos.</p>

<p>¡Hasta la próxima semana!</p>
