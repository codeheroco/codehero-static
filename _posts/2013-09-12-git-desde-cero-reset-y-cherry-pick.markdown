---
layout: post
status: publish
published: true
title: Reset y Cherry-pick.
author: Alberto Grespan
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
date: 2013-09-12 00:02:25.000000000 -04:30
author_page: /author/albertogg.html
series:
  nombre: Git desde Cero
  thumbnail: none
categories:
- Cursos
- Git
tags:
- Cursos
- Git
- curso
---
<p>Bienvenidos a un nuevo capítulo de <strong><em>Git desde cero</em></strong> en este <em>curso</em> hablaremos sobre como regresar los cambios a un determinado <em>"commit"</em> utilizando <code>git reset</code> y como de como pasar un <em>"commit"</em> específico de una rama a otra utilizando <code>git cherry-pick</code>. Los comandos a utilizar esta semana serán los siguientes:</p>

<ul>
<li>git reset * (varios comandos)</li>
<li>git cherry-pick * (varios comandos)</li>
</ul>

<hr />

<h2>¿Cómo regresar el código fuente a un estado puntual?</h2>

<p>En git existen varias maneras para regresar a un estado pasado del proyecto. En este curso hablaremos de tres maneras, "hard", "soft" y "mixed". Si se utiliza "soft" (<code>git reset --soft</code>) para retornar a un punto en específico del proyecto, el mismo lo logra sin disolver el estado actual del proyecto, esto porque no restablece el indice ni la rama de trabajo. Cuando aplicamos este comando todos los archivos pertenecientes a <em>"commits"</em> posteriores a el quedan en <em>"stage"</em> listos para cualquier otra operación que se desee realizar. De forma similar actúa el comando "mixed" (<code>git reset --mixed</code>), la única diferencia con el comando "soft" es que el los cambios no se quedan en <em>"stage"</em>. Este es el comando por defecto que usa git cuando no se le asigna una bandera (mixed, soft, hard, etc). De ser necesario retornar completamente a un estado pasado, ignorando todos los <em>"commits"</em> que se encuentren por encima (más nuevos) que este, se utiliza <code>git reset --hard</code>, Este comando particular ignora completamente todos los cambios que hemos realizado ya que restablece el indice y la rama de trabajo al punto donde se encontraban.</p>

<p>Estos tres métodos antes descritos podemos decir que son los "más" populares, ya que a la hora de haber realizado algo realmente errado utilizamos el <code>reset --hard</code> para retornar al estado anterior descartando todo, y cuando realizamos un mal <em>"commit"</em> ya sea porque el mensaje no nos gustó o agregamos muchos archivos en un solo <em>"commit"</em> empleamos <code>reset --soft</code> o <code>reset --mixed</code>.</p>

<p>Hagamos una prueba para observar lo que describimos anteriormente.</p>

<pre>$ git lg -6
* 926a59c - albertogg, 31 minutes ago : Archivo de prueba para cherry-pick
*   08bddd4 - albertogg, 2 weeks ago : Merge commit '4f34bfe8efc8f797bac71dfcd736cb7fa14efc42' as 'node_express_subtree'
|\
| * 4f34bfe - albertogg, 2 weeks ago : Squashed 'node_express_subtree/' content from commit 0f81501
* 2614422 - albertogg, 3 weeks ago : Primer commit con un submódulo
* de13f1b - albertogg, 5 weeks ago : Commit planeado. archivo nuevo y viejo
* f2ead5d - albertogg, 6 weeks ago : Referencia en readme.
</pre>

<p>Nos vamos a devolver hasta el "commit" con el hash "2614422" empleando los tres métodos. Comenzando por el "soft".</p>

<pre>$ git reset --soft 2614422d18
$ git status
# On branch master
# Your branch is behind 'origin/master' by 2 commits, and can be fast-forwarded.
#   (use "git pull" to update your local branch)
#
# Changes to be committed:
#   (use "git reset HEAD &lt;file>..." to unstage)
#
#   new file:   cherry-test.md
#   new file:   node_express_subtree/.gitignore
#   new file:   node_express_subtree/app.js
#   new file:   node_express_subtree/package.json
</pre>

<p>Podemos observar que toda la información que se encontraba en los "commits" de hash "4f34bfe", "08bddd4" y "926a59c" ahora están en el stage nuevamente. Si llegáramos a realizar otro "commit" en este punto cambiaremos el árbol de nuestro proyecto. Ahora probemos con "mixed".</p>

<pre>$ git reset --mixed 2614422d18
$ git status
# On branch master
# Your branch is behind 'origin/master' by 2 commits, and can be fast-forwarded.
#   (use "git pull" to update your local branch)
#
# Untracked files:
#   (use "git add &lt;file>..." to include in what will be committed)
#
#   cherry-test.md
#   node_express_subtree/
nothing added to commit but untracked files present (use "git add" to track)
</pre>

<p>Utilizando este comando apreciamos que todo lo que se encotraba en los "commits" de hash "4f34bfe", "08bddd4" y "926a59c" no se descartó pero se encuentra en archivos modificados, pero sin estar en el "stage". Por último encontramos "hard".</p>

<pre>$ git reset --hard 2614422d18
HEAD is now at 2614422 Primer commit con un submódulo
$ git status
# On branch master
# Your branch is behind 'origin/master' by 2 commits, and can be fast-forwarded.
#   (use "git pull" to update your local branch)
#
nothing to commit, working directory clean
</pre>

<p>Aquí podemos observar que tal como lo explicamos anteriormente, se descartan todos los cambios que se encuentran por encima del "commit" que reseteamos.</p>

<hr />

<h2>¿Cómo escoger un "commit" particular de una rama?</h2>

<p>Muchas veces cuando estamos trabajando bajo el esquema de ramas, arreglamos un "bug" y seguimos trabajando en una rama que no es la principal (master). Luego queremos que éste arreglo pase a producción (master), pero no podemos unir toda la rama ya que en este momento no nos interesa todo lo que allí se encuentra. Es aquí cuando <code>git cherry-pick</code> entra en acción para extraer únicamente el <em>"commit"</em> que nosotros queremos. Hagamos una prueba del comando:</p>

<pre>$ git co -b prueba-pick
</pre>

<p>Creamos una rama a partir de "master".</p>

<pre>$ touch cherry-test.md
$ cat cherry-test.md
# Titulo 1

Archivo de prueba.
</pre>

<p>Creamos un archivo y le agregamos contenido.</p>

<pre>$ git add .
$ git commit -m "Archivo de prueba para cherry-pick"
[prueba-pick 65161e1] Archivo de prueba para cherry-pick
 1 file changed, 3 insertions(+)
 create mode 100644 cherry-test.md
</pre>

<p>Agregamos al "stash" y realizamos el "commit".</p>

<pre>$ git co master
Switched to branch 'master'
</pre>

<p>Cambiamos de nuevo a la rama principal (master).</p>

<pre>$ git cherry-pick 65161e1
[master 926a59c] Archivo de prueba para cherry-pick
 1 file changed, 3 insertions(+)
 create mode 100644 cherry-test.md
</pre>

<p>En este momento utilizando el hash corto "65161e1" que nos arrojo el commit sobre la rama "prueba-pick", le decimos al commando cherry-pick que nos extraiga dicho "commit" y lo agregue a la rama principal. Ahora, podemos comprobar que se encuentra agregado revisando el log.</p>

<pre>$ git lg -4 
* 926a59c - albertogg, 16 minutes ago : Archivo de prueba para cherry-pick
*   08bddd4 - albertogg, 2 weeks ago : Merge commit '4f34bfe8efc8f797bac71dfcd736cb7fa14efc42' as 'node_express_subtree'
|\
| * 4f34bfe - albertogg, 2 weeks ago : Squashed 'node_express_subtree/' content from commit 0f81501
* 2614422 - albertogg, 3 weeks ago : Primer commit con un submódulo
</pre>

<p>De ésta misma manera se puede aplicar el procedimiento para extraer cualquier "commit" particular hacia cualquier rama que se desee. Lo importante es estar ubicado en la rama a la que se le aplicará el "commit" a la hora de ejecutar el <code>git cherry-pick hash</code>.</p>

<hr />

<h2>Conclusión</h2>

<p>En este último capítulo y en conjunto con los cursos anteriores hemos adquirido el conocimiento necesario para poder restablecer el proyecto a estados anteriores, ya sea descartando cambios parcial o completamente. También aprendimos a copiar un "commit" particular de una rama a otra sin necesidad de unir las dos ramas. Ciertamente estas herramientas nos pueden llegar salvar de graves problemas, eso si, como consejo, JAMAS utilicen un "reset" sobre cambios que ya se encuentren respaldados en un repositorio remoto. Te invitamos a revisar la documentación de ambas herramientas. Si te surge algún tipo de duda no te detengas y déjanos un comentario, que gustosamente lo responderemos.</p>

<p>¡Hasta la semana entrante!</p>
