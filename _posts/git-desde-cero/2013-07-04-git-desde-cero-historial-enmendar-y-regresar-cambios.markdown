---
layout: post
status: publish
published: true
title: Historial, enmendar y regresar cambios.
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
date: 2013-07-04 01:12:52.000000000 -04:30
serie: Git desde Cero
dificultad: Novato
duracion: 20
github: https://github.com/codeheroco/tutorial-git
description: Capítulo 3 de Git desde Cero, serie en la cual aprenderemos Git desde Cero. Estudiaremos el historial, enmendar y a regresar cambios en nuestros proyectos.
categories:
- Cursos
- Git
tags:
- Git
- desde cero
- cambios
- historial
- enmendar
- regresar
---
<p>Bienvenidos a un nuevo capítulo de <strong><em>Git desde cero</em></strong> en este <em>curso</em> hablaremos sobre el historial de los cambios en git, como enmendarlos y como regresar una modificación a su estado anterior utilizando estos comandos:</p>

<ul>
<li>git log (multiples vistas)</li>
<li>git commit --amend</li>
<li>git reset</li>
<li>git checkout</li>
</ul>

<p><strong>nota:</strong> hemos creado un repositorio en <a href="https://github.com/codeheroco/tutorial-git">Github</a> con el tutorial para que te puedas descargar lo que realizamos en el curso y le eches un vistazo.</p>

<hr />

<h2>Log</h2>

<p>Una vez que hemos consolidado varios archivos, el comando <em>git log</em> es utilizado para ver el historial de cambios de nuestro repositorio. Esto incluye información sobre el autor de los cambios, el mensaje breve utilizado, la fecha en que se realizó y el número de serial (hash) de la información consolidada. En este caso utilizaremos los comandos más utilizados en Codehero para observar los cambios en el historial dentro de nuestros proyectos.</p>

<p>Basándonos en lo aprendido en el curso número 2 <a href="codehero.co/git-desde-cero-registrando-cambios/">Git desde cero: Registrando Cambios</a> vamos a realizar una clonación de nuestro repositorio (si es que no lo hemos hecho antes).</p>

```sh
$ cd ~/CodeHero/ # Creamos la carpeta sino existe (mkdir).
$ git clone https://github.com/codeheroco/tutorial-git.git # Clonación del repositorio.
```

<p>Una vez que nos haya concluido la clonación del repositorio <a href="https://github.com/codeheroco/tutorial-git">remoto</a> procederemos a utilizar el comando <em>git log</em> para observar el historial de cambios.</p>

```sh
$ git log

# observamos la siguiente salida

commit 5a135147bbf82384a57f5c264ab2788251fdeaca
Author: albertogg <albertogrespan@gmail.com>
Date:   Thu Jun 27 00:38:00 2013 -0430

    Cambio de nombre del archivo 2

commit 0f8a083e6d8103a380d9f0bf3b9f9e27232525fe
Author: albertogg <albertogrespan@gmail.com>
Date:   Thu Jun 27 00:31:02 2013 -0430

    Eliminar el Archivo1

commit 2e37d7ffccea8b53cf4095f7adc2701a13d1d39c
Author: albertogg <albertogrespan@gmail.com>
Date:   Thu Jun 27 00:13:52 2013 -0430

    Modificaciones sobre el Archivo2

commit 9322f84de544f059a014cdd9d2a196917a290ef6
Author: albertogg <albertogrespan@gmail.com>
Date:   Thu Jun 27 00:02:49 2013 -0430

    Agregar Archivo2

commit 1b80a9119abaf37e68d6beb1919fdb109e16da29
Author: albertogg <albertogrespan@gmail.com>
Date:   Wed Jun 26 23:09:55 2013 -0430

    Commit Inicial
```

<p>Si hacemos memoria o nos vamos a los dos (2) cursos anteriores podemos observar que ésta fue la información consolidada en su desarrollo.</p>

<p>Esta es una manera algo complicada de apreciar ciertos cambios y no nos enseña los cambios que realizamos sobre los archivos. De necesitar ver un nivel de detalle mayor se puede utilizar el siguiente comando, el cual es un resumén de lo ocurrido en ese cambio:</p>

```sh
$ git log --stat

# observamos la salida (se encuentra reducida a lo último que se consolido)

commit 5a135147bbf82384a57f5c264ab2788251fdeaca
Author: albertogg <albertogrespan@gmail.com>
Date:   Thu Jun 27 00:38:00 2013 -0430

    Cambio de nombre del archivo 2

 Archivo2.txt                  | 2 --
 Archivo2_cambio_de_nombre.txt | 2 ++
 2 files changed, 2 insertions(+), 2 deletions(-)
```

<p>De requerir ver un nivel de detalle todavía mayor como por ejemplo: mostrar las líneas donde ocurrieron los cambios (diferencias) utilizamos el siguiente comando:</p>

<p><strong>nota:</strong> la bandera <em>-1</em> se utiliza para observar únicamente lo último que fue consolidado.</p>

```sh
$ git log -p -1

commit 5a135147bbf82384a57f5c264ab2788251fdeaca
Author: albertogg <albertogrespan@gmail.com>
Date:   Thu Jun 27 00:38:00 2013 -0430

    Cambio de nombre del archivo 2

diff --git a/Archivo2.txt b/Archivo2.txt
deleted file mode 100644
index 4564504..0000000
--- a/Archivo2.txt
+++ /dev/null
@@ -1,2 +0,0 @@
-Cambiando la primera línea # Se eliminaron estas líneas.
-Agregando una segunda línea
diff --git a/Archivo2_cambio_de_nombre.txt b/Archivo2_cambio_de_nombre.txt
new file mode 100644
index 0000000..4564504
--- /dev/null
+++ b/Archivo2_cambio_de_nombre.txt
@@ -0,0 +1,2 @@
+Cambiando la primera línea # Se agregaron estas líneas.
+Agregando una segunda línea
```

<p>Podemos ver que al hacer cambio de nombre del archivo los cambios se marcan como si se hubiese eliminado el primer archivo y se creó otro, etiquetando la información sobre el <em>Archivo2.txt</em> como eliminada o borrada y la del <em>Archivo2_cambio_de_nombre.txt</em> como agregada, siendo esta la misma.</p>

<p>Por último si lo que queremos es visualizar en el historial de modificaciones en forma gráfica para observar el orden en el que se han almacenado los cambios podemos utilizar un método que abrevia de manera cuantiosa el historial.</p>



```sh
$ git log --pretty=format:"%h - %an - %ar - %s" --graph

* 5a13514 - albertogg - 7 days ago - Cambio de nombre del archivo 2
* 0f8a083 - albertogg - 7 days ago - Eliminar el Archivo1
* 2e37d7f - albertogg - 7 days ago - Modificaciones sobre el Archivo2
* 9322f84 - albertogg - 7 days ago - Agregar Archivo2
* 1b80a91 - albertogg - 7 days ago - Commit Inicial
```

<p>Describiendo la siguiente salida apreciamos lo siguiente los * asteriscos son la representación gráfica de cada cambio almacenado (commit), luego tenemos el número de serial (hash) resumido, el autor, el tiempo cuando se realizó y el título del mensaje "breve".</p>

<p><strong>nota:</strong> se puede utilizar "<strong>git log --graph</strong>" para observar mejor el gráfico en este caso. También se pueden mezclar las banderas que utilizamos, es decir podríamos utilizar "<strong>git log --pretty=format:"%h - %an - %ar - %s" --graph -2</strong>" para ver únicamente los últimos 2 del historial. Quedará departe del lector jugar y averiguar aun más banderas o parámetros a utilizar.</p>

<hr />

<h2>Commit --amend</h2>

<p>Frecuentemente cuando trabajamos y consolidamos los cambios olvidamos agregar al escenario algún archivo o simplemente lo modificamos tarde y lo queremos agregar a la información consolidada anteriormente. Es aquí cuando entra este comando en acción.</p>

<p>Vamos a realizar una serie de cambios, los consolidaremos y agregaremos otro cambio posteriormente.</p>

```sh
$ touch README.md
$ echo '# Repositorio git para el curso Git desde cero' >> README.md
$ git status # omitimos la salida
$ git add README.md
$ git commit -m "Agregar archivo README.md"

# Ahora modificaremos otro archivo y lo agregaremos.

$ echo 'Agregamos la tercera linea' >> Archivo2_cambio_de_nombre.txt
$ git add Archivo2_cambio_de_nombre.txt

# En este punto tenemos dos opciones 1) Dejar el mismo mensaje 2) Cambiarlo

$ git commit --amend --no-edit # Dejamos el mismo mensaje
$ git commit --amend -m "Nuevo mensaje para el cambio"
```

<p><strong>nota:</strong> Es sumamente importante que si los cambios fueron consolidados y enviados al servidor remoto <em>NO</em> se utilice este comando; ya que se modifica el número de serial único de los cambios hechos y vamos a tener un conflicto difícil de resolver.</p>

<hr />

<h2>Reset</h2>

<p>¿Qué sucede si agregamos al escenario un archivo que ya no queremos consolidarlo en ese instante? La lógica induce a que lo bajemos del escenario y eso es precisamente lo que hace <em>git reset</em>.</p>

<p>Si escribimos <em>git status</em> este comando nos recordará del comando <em>reset</em> en todo momento. Hagamos la prueba modifiquemos nuestro archivo README.</p>

```sh
$ echo 'Un curso exclusivo de codehero basado en el libro Pro Git' >> README.md
$ git add README.md
$ git status
# On branch master
# Your branch is ahead of 'origin/master' by 1 commit.
#   (use "git push" to publish your local commits)
#
# Changes to be committed:
#   (use "git reset HEAD <file>..." to unstage) # Para bajar del escenario
#
#   modified:   README.md
#

# vamos a bajarlo del escenario, porque no queremos este cambio aún.

$ git reset HEAD README.md
Unstaged changes after reset:
M   README.md
```

<p>La salida del comando anterior nos indica lo siguiente: el archivo se encuentra fuera del escenario y presenta modificaciones.</p>

<hr />

<h2>Checkout</h2>

<p>¿Qué pasara si ahora nos arrepintiéramos de esa última modificación y la quisiéramos eliminar? Pues es muy fácil utilizando <em>git checkout</em> lo devolveremos a su ultimo estado solo basta con emplear el siguiente comando:</p>

```sh
$ git checkout -- README.md

# si ahora revisamos el status veremos que no existe modificación alguna.

$ git status
# On branch master
# Your branch is ahead of 'origin/master' by 1 commit.
#   (use "git push" to publish your local commits)
#
nothing to commit, working directory clean
```

<p><strong>nota:</strong> el comando <em>status</em> también nos recuerda como descartar los cambios en todo momento. El comando <em>checkout</em> no es utilizado únicamente para esto.</p>

<hr />

<h2>Conclusión</h2>

<p>Durante este capítulo y en conjunto con los cursos anteriores hemos adquirido el conocimiento básico y fundamental para utilizar esta fabulosa herramienta. Si te surge algún tipo de duda no te detengas y déjanos un comentario, que gustosamente lo responderemos.</p>

<p>¡Hasta la próxima semana!</p>
