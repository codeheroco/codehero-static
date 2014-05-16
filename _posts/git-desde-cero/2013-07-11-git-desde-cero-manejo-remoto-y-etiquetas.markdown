---
layout: post
status: publish
published: true
title: Manejo remoto y etiquetas.
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
date: 2013-07-11 00:38:22.000000000 -04:30
serie: Git desde Cero
dificultad: Aprendiz
duracion: 20
github: https://github.com/codeheroco/tutorial-git
description: Capítulo 4 de Git desde Cero, serie en la cual aprenderemos Git desde Cero. Estudiaremos el manejo remoto y etiquetas de nuestros proyectos.
categories:
- Cursos
- Git
tags:
- Git
- desde cero
- remoto
- etiquetas
---
<p>Bienvenidos a un nuevo capítulo de <strong><em>Git desde cero</em></strong> en este <em>curso</em> hablaremos sobre como manejar un repositorio remoto de git y como crear tags (etiquetas) para enumerar versiones finales también llamados lanzamientos. Los comandos de esta semana serán los siguientes:</p>

<ul>
<li>git remote</li>
<li>git push</li>
<li>git fetch</li>
<li>git pull</li>
<li>git tag (multiples formatos)</li>
</ul>

<p><strong>nota:</strong> hemos creado un repositorio en <a href="https://github.com/codeheroco/tutorial-git">Github</a> con el curso para que te puedas descargar lo que realizamos en el curso y le eches un vistazo.</p>

<hr />

<h2>Remote (Remoto)</h2>

<p>¿Qué es un repositorio remoto? Un repositorio remoto no es más que una copia de los archivos, carpetas, fotos, etc. qué se encuentran bajo la supervisión de git, y están respaldados en un sitio externo a nuestro computador (Internet, o una red local domestica/oficina, etc.) Esto nos permite poder colaborar en un proyecto con otros usuarios de manera distribuida; cabe destacar que un repositorio remoto se pueden tener permisos de lectura y escritura o solo lectura.</p>

<p>Para nuestro propósito vamos a utilizar el repositorio alojado en <a href="https://github.com/codeheroco/tutorial-git">Github.com</a> para cumplir nuestra tarea.</p>

<p><strong>nota:</strong> debemos tomar en cuenta que al realizar una clonación se genera una carpeta con el nombre del proyecto y posiblemente unos archivos. Por lo que puede ser conveniente realizar un cambio de directorio a uno que se encuentre dentro del <em>HOME</em> del usuario para ahorrarnos inconvenientes.</p>

```sh
$ git clone https://github.com/codeheroco/tutorial-git.git
Cloning into 'tutorial-git'...
remote: Counting objects: 17, done.
remote: Compressing objects: 100% (12/12), done.
remote: Total 17 (delta 1), reused 16 (delta 0)
Unpacking objects: 100% (17/17), done.
Checking connectivity... done

# Cambiamos de directorio, al directorio creado.
$ cd tutorial-git
$ git remote
origin
```

<p>Cuando utilizamos el comando <em>git remote</em> podemos observar que nos retornó <em>origin</em>, y esto no es más que un seudónimo para la dirección <em>https://github.com/codeheroco/tutorial-git.git</em> que viene siendo nuestra dirección remota de donde efectuamos la clonación. Para observar si esto es cierto de manera detallada utilizamos el siguiente comando:</p>

```sh
$ git remote -v
origin  https://github.com/codeheroco/tutorial-git.git (fetch)
origin  https://github.com/codeheroco/tutorial-git.git (push)
```

<p>Si tuviésemos otro repositorio del mismo proyecto pero en un servidor de pruebas donde alojamos código que necesitamos ir probando, pudiésemos agregar otra dirección remota y enviarle los cambios sin afectar a <em>"origin"</em>.</p>

```sh
$ git remote add servidor-de-pruebas https://github.com/albertogg/tutorial-git.git
$ git remote -v
origin  https://github.com/codeheroco/tutorial-git.git (fetch)
origin  https://github.com/codeheroco/tutorial-git.git (push)
servidor-de-pruebas https://github.com/albertogg/tutorial-git.git (fetch)
servidor-de-pruebas https://github.com/albertogg/tutorial-git.git (push)
```

<p>Podemos observar que tenemos ambas direcciones y seudónimos para poder ir a buscar (fetch) y enviar (push) código.</p>

<hr />

<h2>Push</h2>

Una vez que hemos conectado el repositorio remoto con el local y tenemos cambios consolidados en nuestro computador (local) que deseamos compartir, utilizamos el comando *git push [seudónimo] [ramificación]* o en nuestro caso:

```sh
$ git push origin master
```



<hr />

<h2>Fetch</h2>

<p>El comando <em>git fetch</em> es utilizado para ir a buscar los archivos al servidor. Es decir, si estamos trabajando con varias personas en un mismo proyecto es muy probable que cuando nosotros estemos introduciendo un cambio o una funcionalidad, nuestros compañeros también estén haciendo lo mismo y a su vez enviando estos cambios a un servidor remoto. Utilizando el comando <em>fetch</em> obtenemos los cambios consolidados que se encuentren en el servidor remoto que hayan sido realizados por nuestros compañeros y los copiamos a nuestro computador. por ejemplo:</p>

```sh
$ git fetch origin

# Descargamos los cambios de origin
remote: Counting objects: 4, done.
remote: Compressing objects: 100% (2/2), done.
remote: Total 3 (delta 0), reused 3 (delta 0)
Unpacking objects: 100% (3/3), done.
From github.com:codeheroco/tutorial-git
   c250a0f..0022f43  master     -> origin/master
```

<p>De esta manera actualizamos nuestra información local con la información que se encuentre remota. Pero no será reflejada en el <em>git log</em> hasta que la unamos con nuestro árbol de trabajo (ramificación).</p>

<p><strong>nota:</strong> si utilizamos el comando <em>fetch</em> y no se encuentran cambios en el servidor el comando no retorna nada. Éste cambio fue introducido por nuestro amigo Jonathan (autor de los how to de codehero) en el mismo fue agregado un archivo más, únicamente para efectos de demostración.</p>

<hr />

<h2>Pull</h2>

<p>Éste comando es muy similar al anterior aunque realiza dos funciones simultáneas. <em>git pull</em> realiza un <em>fetch</em> más un <em>merge</em>. Del comando <em>merge</em> hablaremos más adelante, de esta manera se descarga los cambios que se encuentren en el repositorio remoto y los unifica con los cambios que tengamos en nuestro equipo.</p>

<p><strong>nota:</strong> utilizando este comando puede que ocurran conflictos. Explicaremos como resolverlos más adelante cuando hablemos del comando <em>merge</em>.</p>

<p>Para tener una idea de lo que realiza este comando basta con emplearlo.</p>

```sh
$ git pull

# Cómo previamente habíamos descargado los cambios utilizando
# fetch obtuvimos la siguiente salida.

First, rewinding head to replay your work on top of it...
Fast-forwarded master to 0022f43897359daf973985a140a087c849b2bb0f.

```

<p>Posterior a la ejecución hemos actualizado nuestro repositorio local haciendo una copia de los cambios en el repositorio remoto y los mismos se ven reflejados inmediatamente en el <em>git log</em>.</p>

<hr />

<h2>Tag</h2>

<p>El comando <em>git tag</em> es mayoritariamente utilizado para etiquetar versiones importantes dentro del desarrollo. En pocas palabras para marcar un hito/lanzamiento de un producto.</p>

<p>En el repositorio remoto de Codehero venimos utilizando <em>tags</em> desde el inicio; esperando a este capítulo para enseñaros. su funcionalidad.</p>

```sh
$ git tag

# mostramos los tags creados, sólo si existen.
Capitulo-1
Capitulo-2
Capitulo-3
```

<p>Para crear un tag basta con utilizar el siguiente comando:</p>

```sh
$ git tag "Capitulo-4"
```

<p>Sí queremos ver la información de este último tag podríamos emplear el siguiente comando:</p>

```sh
$ git show Capitulo-4

#obteniendo la siguen salida
commit 0022f43897359daf973985a140a087c849b2bb0f
Author: Jonathan Wiesel <jonathanwiesel@gmail.com>
Date:   Wed Jul 10 19:48:51 2013 -0430

    jonathan's file added

diff --git a/hola,_soy_jonathan.md b/hola,_soy_jonathan.md
new file mode 100644
index 0000000..876f92f
--- /dev/null
+++ b/hola,_soy_jonathan.md
@@ -0,0 +1,2 @@
+##Hola, soy Jonathan.
+##Estoy ayudando a Alberto
\ No newline at end of file
```

<p>Una vez que hayamos creado nuevos tags y queramos compartirlos con el repositorio remoto sólo debemos emplear el comando <em>pull</em> con la bandera <em>--tags</em> de la siguiente manera:</p>

```sh
$ git push origin master --tags
Total 0 (delta 0), reused 0 (delta 0)
To git@github.com:codeheroco/tutorial-git.git
 * [new tag]         Capitulo-4 -> Capitulo-4
```

<hr />

<h2>Conclusión</h2>

<p>Durante este capítulo y en conjunto con los cursos anteriores ahora hemos adquirido el conocimiento básico y fundamental para manejarnos remotamente con esta fabulosa herramienta. Si te surge algún tipo de duda no te detengas y déjanos un comentario, que gustosamente lo responderemos.</p>

<p>¡Hasta la próxima semana!</p>
