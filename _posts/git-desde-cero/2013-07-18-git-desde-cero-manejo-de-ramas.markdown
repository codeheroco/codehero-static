---
layout: post
status: publish
published: true
title: Manejo de ramas
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
wordpress_id: 1487
wordpress_url: http://codehero.co/?p=1487
date: 2013-07-18 01:26:28.000000000 -04:30
serie: Git desde Cero
thumbnail: http://i.imgur.com/IzAdb3d.png
description: Capítulo 5 de Git desde Cero, serie en la cual aprenderemos Git desde Cero. Estudiaremos el manejo de ramas para nuestros proyectos.
categories:
- Cursos
- Git
tags:
- Git
- desde cero
- ramas
- branch
---
<p>Bienvenidos a un nuevo capítulo de <strong><em>Git desde cero</em></strong> en este <em>curso</em> hablaremos sobre como manejar las ramas en un proyecto y cuales son las mejores prácticas. Los comandos a utilizar esta semana serán los siguientes:</p>

<ul>
<li>git checkout -b</li>
<li>git branch -d</li>
<li>git merge</li>
<li>git branch (múltiples comandos.)</li>
</ul>

<p><strong>nota:</strong> hemos creado un repositorio en <a href="https://github.com/codeheroco/tutorial-git">Github</a> con el curso para que descargues lo que hemos realizamos durante éste curso y le eches un vistazo.</p>

<hr />

<h2>¿Qué es una rama?</h2>

<p>Sí recordamos el primer capítulo de <em>git desde cero</em> sabemos que cuando consolidamos cambios, creamos una fotografía del estado actual de la información que se encuentra en escenario, luego se descartaban los archivos que no tenían modificaciones y se reverenciaban al estado anterior. Al verificar el estado anterior se comprueba quién es o son padres directos de esta fotografía. Es decir, se busca cuales son los cambios que fueron consolidados antes que este y se les referencia como el padre directo. Siguiendo este modelo, lo primero que consolidamos en el proyecto no tiene padre, los cambios consolidados sobre la rama principal tienen un único padre, y los cambios que provienen de la unión de una o más ramas tienen múltiples padres.</p>

<p>Entonces, retomando ¿Qué es una rama? Una rama es una extensión del árbol o tronco principal. Como buena práctica dentro de las ramas del árbol es donde <strong><em>deberíamos</em></strong> introducir los cambios a nuestro proyecto y solo luego de comprobar que dichos cambios funcionan y tienen el comportamiento deseado los unimos con el árbol principal. Esto es porque queremos que el árbol se encuentre lo más limpio posible.</p>

<p>Para comprender esto es necesario realizar un ejemplo.</p>

<p><img src="http://i.imgur.com/S5Tk6r7.png" alt="Sin ramas" /></p>

<blockquote>
  <p>En la foto apreciamos que es un árbol en línea recta que no presenta ramificaciones. ></p>
</blockquote>

<p>Para poder explicar el curso realizaremos los siguientes pasos:</p>

<ul>
<li>Crearemos una rama, trabajaremos sobre ella y guardaremos los cambios.</li>
<li>Nos devolveremos a la rama principal y crearemos otra rama.</li>
<li>Trabajaremos sobre esta rama, luego guardaremos los cambios y la uniremos con la rama principal.</li>
<li>Iremos a la primera rama creada, realizaremos cambios y los guardaremos.</li>
<li>Trataremos de unir esta primera rama con la principal y resolveremos los conflictos creados.</li>
</ul>

<p>De esta manera se comprenderá el uso de todos los comandos de este curso.</p>

<hr />

<h2>Checkout -b</h2>

<p>El comando <em>checkout -b</em> es el comando corto para crear una nueva rama y cambiarnos a la misma.</p>

```sh
$ git checkout -b primera-rama
# hemos creado la nueva rama y nos cambiamos
Switched to a new branch 'primera-rama'
```

<p>Sobre esta nueva rama introduciremos un cambio sobre el archivo README.md</p>

```sh
$ nano README.md

# Agregamos el siguiente texto.
Este repositorio conserva absolutamente todo el historial del curso.
Se encuentra clasificado por capítulos almacenados en etiquetas (tags), para
poder observar estos cambios debes revisar el log.
```

<p>Guardamos el archivo y consolidamos los cambios.</p>

```sh
$ git add README.md
$ git commit -m "Agregar párrafo al README"
```

<p>Una vez consolidados los cambios nos movemos nuevamente al árbol principal y posteriormente creamos una nueva rama.</p>

```sh
$ git checkout master
$ git checkout -b segunda-rama

# observamos la salida

Switched to a new branch 'segunda-rama'
```

<p>En este momento si entramos al archivo README.md podremos observar que su estado es el mismo del árbol principal y no tiene la información del párrafo que agregamos en la <em>primera rama</em>. Vamos a agregar un pequeño cambio a este archivo y luego los consolidaremos.</p>

```sh
$ nano README.md

# Agregamos el siguiente texto
Para ir a un capítulo utilizamos:

    $ git tag -l
    $ git checkout Capitulo-X  # Donde X es el número del capítulo.

# Subimos los cambios al escenario y los consolidamos.

$ git add README.md
$ git commit -m "Agregar modificación al archivo README"
```

<p><img src="http://i.imgur.com/kO5iLhV.png" alt="Ramas" /></p>

<p>En este momento el árbol comienza a presentar una ramificación debido a que existen dos ramas en la cabeza del árbol. Donde solo una de ellas se encuentra de manera "lineal".</p>

<hr />

<h2>Merge</h2>

<p>El comando <em>merge</em> es empleado para realizar la unión de dos ramas. Se debe tener cuidado cuando se realiza el merge ya que es muy probable que ocurran conflictos al ejecutarlo. Los conflictos ocurren cuando se trata de realizar la unión (merge) de dos archivos. Éstos dos archivos vienen siendo el mismo pero en ramas diferentes y pueden presentar discrepancia cuando se comparan línea a línea; de esto ocurrir estamos presenciando un conflicto.</p>

<p>Realizaremos el merge de la segunda rama con el árbol principal. No existirá conflicto alguno. Para realizar la unión de dos ramas debemos estar ubicados en la rama a la que se le quieren agregar los cambios, en este caso "<em>master</em>" y luego aplicar la unión.</p>

```sh
$ git checkout master
$ git merge segunda-rama

# Podemos apreciar que la unión se realizó correctamente y sin conflictos.
Updating 0022f43..bc8fc31
Fast-forward
 README.md | 5 +++++
 1 file changed, 5 insertions(+)
```

<p><img src="http://i.imgur.com/yzDIy5H.png" alt="Union" /></p>

<hr />

<h2>Branch -d y -D</h2>

<p>Una vez que unimos la rama y hemos aplicado el cambio correctamente es buena práctica eliminar la rama donde trabajamos, es decir "<em>segunda-rama</em>" y la eliminamos con el siguiente comando:</p>

```sh
$ git branch -d segunda-rama
Deleted branch segunda-rama (was bc8fc31).
```

<blockquote>
  <p>Utilizando la bandera "<em>-d</em>" eliminamos la rama unicamente si esta se ha unido. de lo contrario nos arrojará un error. Si queremos desechar la rama completa sin importar la unión utilizamos "<em>-D</em>" como bandera. ></p>
</blockquote>

<hr />

<h2>Resolver conflictos</h2>

<p>Uniremos la "<em>primera-rama</em>" y la rama principal "<em>master</em>" luego de haber unido los cambios de la "<em>segunda-rama</em>". Cuando git realice la comparación línea a línea encontré discrepancias y nos indicará que han ocurrido conflictos. Hagamos la prueba:</p>

```sh
$ git checkout master
$ git merge primera-rama

# Ocurrió un conflicto
Auto-merging README.md
CONFLICT (content): Merge conflict in README.md
Automatic merge failed; fix conflicts and then commit the result.
```

<p>Para resolver este conflicto basta con abrir el archivo con problemas(en nuestro caso README.md) buscar <code><<<<< &gt;&gt;&gt;&gt;&gt;</code> este tipo de flechas y rayas <code>======</code> eliminarlas y ajustar el código o texto adecuadamente.</p>

<p><img src="http://i.imgur.com/9rKQoqx.png" alt="Conflicto" /></p>

<p>Acomodamos el texto como más nos guste.</p>

<p><img src="http://i.imgur.com/MD2ywk8.png" alt="Arreglo" /></p>

<p>Revisamos el "<em>status</em>" de los archivos y apreciamos lo siguiente:</p>

```sh
$ git status
# On branch master
# Your branch is ahead of 'origin/master' by 1 commit.
#   (use "git push" to publish your local commits)
#
# You have unmerged paths.
#   (fix conflicts and run "git commit")
#
# Unmerged paths:
#   (use "git add <file>..." to mark resolution)
#
#   both modified:      README.md
#
no changes added to commit (use "git add" and/or "git commit -a")
```

<p>Nos dice que tenemos que hacer un "commit" para consolidar el "merge" de la unión de las dos ramas. Por otro lado también nos indica que el archivo README se encuentra modificado en las dos ramas y fue por esta razón que ocurrió el conflicto.</p>

<p>Consolidamos los cambios.</p>

```sh
$ git add README.md
$ git commit -m "Unión de primera-rama con master"
```

<p><img src="http://i.imgur.com/Qh5RGm8.png" alt="final" /></p>

<p>Podemos apreciar que tenemos una rama que crece del árbol principal y posteriormente se vuelve a unir con el árbol, dejando un "lomo" sobre el mismo.</p>

<hr />

<h2>Branch</h2>

<p>El comando "<em>branch</em>" en git funciona para el manejo de ramas. Existen muchas variaciones de este comando; aquí enseñaremos las más utilizadas. Cómo lo son <em>git branch</em> encargada de listar todas las ramas, <em>git branch -v</em> encargada de mostrar los últimos comentarios de las consolidaciones que existieron en cada rama. <em>git branch --merge</em> enseña únicamente las ramas que fueron unidas y <em>git branch --no-merge</em> que muestra las ramas no unidas.</p>

```sh
$ git branch
* master
  primera-rama

$ git branch -v
* master       05fe98e [ahead 3] Unión de primera-rama con master
  primera-rama df0589c Agregar párrafo al README

$ git branch --merged
* master
  primera-rama
```

<p>Al apreciar las salidas arrojadas de dichos comandos observamos que son las ramas que conocemos y trabajos sobre este capítulo.</p>

<hr />

<h2>Conclusión</h2>

<p>En este último capítulo y en conjunto con los cursos anteriores hemos adquirido el conocimiento necesario para utilizar ramas en los proyectos que desarrollemos, éste es un atributo fundamental en el flujo de trabajo de git. Si te surge algún tipo de duda no te detengas y déjanos un comentario, que gustosamente lo responderemos.</p>

<p>¡Hasta la próxima semana!</p>
