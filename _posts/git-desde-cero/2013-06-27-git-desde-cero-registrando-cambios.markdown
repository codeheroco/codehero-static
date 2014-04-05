---
layout: post
status: publish
published: true
title: Registrando cambios.
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
wordpress_url: http://codehero.co/?p=1192
date: 2013-06-27 06:30:01.000000000 -04:30
serie: Git desde Cero
dificultad: Novato
duracion: 30
github: https://github.com/codeheroco/tutorial-git
description: Capítulo 2 de Git desde Cero, serie en la cual aprenderemos Git desde Cero. Estudiaremos como instalar, configurar y utilizar Git para nuestros proyectos.
categories:
- Cursos
- Git
tags:
- Git
- desde cero
- registro
- cambios
---
<h1>Git desde cero: Registrando cambios.</h1>

<p>Bienvenidos a un nuevo capítulo de <strong><em>Git desde cero</em></strong> en este tutorial hablaremos sobre los siguientes comandos:</p>

<ul>
<li>git clone</li>
<li>git status</li>
<li>git diff</li>
<li>git rm</li>
<li>git mv</li>
</ul>

<p><strong>nota:</strong> hemos creado un repositorio en <a href="https://github.com/codeheroco/tutorial-git">Github</a> con el tutorial para que te puedas descargar lo que realizamos y le eches un vistazo.</p>

<hr />

<h2>Clone</h2>

<p>El comando <em>git clone</em> lo utilizaremos para literalmente realizar una copia de seguridad de lo que se encuentra en el servidor remoto. Como se explicó en el capítulo pasado cualquiera puede copiar un repositorio completo y hospedarlo en su computador por si ocurre algún imprevisto con el servidor remoto, si se desea contribuir o distribuir un proyecto como es nuestro caso para esta serie de totorales.</p>

<p>¿Cómo realizamos una "clonación" de un repositorio? Pues es bastante sencillo. Primero nos dirigimos al directorio donde queremos que se descargue la copia de seguridad (Lo creamos sino existe) y luego utilizando el siguiente comando:</p>

```sh
$ cd ~/CodeHero/tutorial-git
$ git clone https://github.com/codeheroco/tutorial-git.git # Clonación del repositorio.
```

<p>Posterior a la ejecución del comando podemos observar que se nos descargaron los archivos en nuestro directorio utilizando el comando <a href="http://es.wikipedia.org/wiki/Ls">ls</a> para listar directorios .</p>

<hr />

<h2>Status</h2>

<p>El comando <em>git status</em> nos identifica si existe un archivo modificado o no en nuestro repositorio. Esto es importante ya que si hacemos memoria del capítulo anterior hay que ubicar los archivos en el escenario antes de consolidarlos en la base de datos.</p>

<p>Cuando el repositorio no presenta modificaciones y corremos el comando, obtenemos la siguen salida:</p>

```sh
$ git status
On branch master
nothing to commit, working directory clean
```

<p>Pero si ahora agregamos un nuevo archivo y le copiamos texto podemos ver que la salida es bastante diferente:</p>

```sh
$ touch Archivo2.txt
$ echo 'Texto para el segundo archivo' >> Archivo2.txt
$ git status
 On branch master
 Untracked files:  #<-- Nos está indicando que tenemos archivos nuevos.
   (use "git add <file>..." to include in what will be committed)
    Archivo2.txt #<-- El archivo nuevo del que git no conoce.
nothing added to commit but untracked files present (use "git add" to track)
```

<p>Si observamos con detenimiento nos pide que utilicemos el mismo comando de <strong><em>git add</em></strong> que aprendimos en el primer capítulo para comenzar a seguir los cambios de este archivo. Vamos a realizarlo!</p>

```sh
$ git status
 On branch master
 Changes to be committed:
   (use "git reset HEAD <file>..." to unstage)
    new file:   Archivo2.txt #<-- Archivo nuevo
```

<p>Ahora podemos apreciar que Git ha subido al escenario al <em>Archivo2.txt</em> y lo conoce como archivo nuevo.</p>

<p><strong>nota:</strong> Antes de consolidar los cambios en el <em>Archivo2.txt</em> vamos a comenzar a ver el siguiente comando.</p>

<hr />

<h2>Diff</h2>

<p>El comando <em>git diff</em> nos identifica todos los cambios de un archivo con respecto a su versión anterior, o mejor dicho nos identifica los cambios de un archivo entre diferentes versiones. Es aquí donde podemos apreciar los cambios realizados que vamos a consolidar en esta nueva versión.</p>

{% include middle-post-ad.html %}

<p>Ahora realizando la continuación de lo que venimos realizando utilicemos el siguiente comando:</p>

```sh
$ git diff --cached # comando utilizado para archivos en el escenario.
diff --git a/Archivo2.txt b/Archivo2.txt
new file mode 100644
index 0000000..aeaed15
--- /dev/null
+++ b/Archivo2.txt # Archivo con más líneas.
@@ -0,0 +1 @@
+Texto para el segundo archivo # líneas nuevas
```

<p>Al utilizar el comando observamos que una vez que tenemos el <em>Archivo2.txt</em> en escenario podemos revisar sus diferencias con respecto a una versión anterior (en este caso no existe) pero de igual manera nos indica que al archivo se le agregaron líneas nuevas y nos dice cuales fueron.</p>

<p>Ahora si consolidamos el archivo y lo modificamos podemos apreciar como la salida es algo distinta:</p>

```sh
$ git commit -m "Agregar Archivo2"
[master 9322f84] Agregar Archivo2
 1 file changed, 1 insertion(+)
 create mode 100644 Archivo2.txt
```

<p>Si ahora modificamos de nuevo el <em>Archivo2.txt</em> y utilizamos <em>git diff</em> nuevamente veamos lo que sucede:</p>

```sh
$ echo 'Cambiando la primera linea' > Archivo2.txt
$ echo 'Agregando una segunda linea' >> Archivo2.txt
$ git diff
diff --git a/Archivo2.txt b/Archivo2.txt #diferencia entre versiones
index aeaed15..4564504 100644
--- a/Archivo2.txt # Versión anterior con menos líneas
+++ b/Archivo2.txt # Versión actual con más lianas
@@ -1 +1,2 @@
-Texto para el segundo archivo # Eliminamos ésta línea
+Cambiando la primera linea # Agregamos estas dos
+Agregando una segunda linea
```

<p>Los signos + y - nos indican los cambios realizados sobre el archivo y funciona únicamente como indicativos visuales. Aún así vemos lo útil y fundamental que es éste comando para conocer los nuevos cambios realizados.</p>

<p>Ahora vamos a subir estos nuevos cambios al escenario y posteriormente consolidarlos en la base de datos.</p>

```sh
$ git add Archivo2.txt
$ git commit -m "Modificaciones sobre el Archivo2"
[master 2e37d7f] Modificaciones sobre el Archivo2
 1 file changed, 2 insertions(+), 1 deletion(-) # resumen de cambios
```

<p>Aquí también apreciamos un pequeño resumen de los cambios ocurridos. Un archivo cambió, tuvo 2 líneas insertadas y una borrada.</p>

<hr />

<h2>Rm</h2>

<p>El comando <em>git rm</em> es un comando particular, a mi juicio poco utilizado pero importante conocer sobre él. Al igual que el comando <a href="http://es.wikipedia.org/wiki/Rm">Rm</a> de Unix sirve para borrar un archivo pero en este caso sirve para agregar al escenario el archivo que vayamos a borrar. Veamos el siguiente ejemplo:</p>

```sh
$ rm Archivo1.txt # borramos el archivo.
$ git status
# On branch master
# Changes not staged for commit: # NO se encuentra en escenario
#   (use "git add/rm <file>..." to update what will be committed)
#   (use "git checkout -- <file>..." to discard changes in working directory)
#
#   deleted:    Archivo1.txt # Archivo eliminado pero no en escenario
#
no changes added to commit (use "git add" and/or "git commit -a")
```

<p>Podemos observar que al utilizar el comando <em>rm</em> de Unix (en mi caso) hemos borrado satisfactoriamente el <em>Archivo1.txt</em> pero esto aún no se encuentra en escenario.</p>

```sh
$ git rm Archivo1.txt
$ git status
# On branch master
# Changes to be committed: # En escenario
#   (use "git reset HEAD <file>..." to unstage)
#
#   deleted:    Archivo1.txt
#
```

<p>Ahora utilizamos el comando <em>git rm</em> automáticamente confirmamos que realmente queremos eliminar dicho archivo. lo último que nos resta es consolidar los cambios.</p>

```sh
$ git commit -m "Eliminar el Archivo1"
[master 0f8a083] Eliminar el Archivo1
 1 file changed, 1 deletion(-)
 delete mode 100644 Archivo1.txt
```

<hr />

<h2>Mv</h2>

<p>El comando <em>git mv</em> funciona de la misma manera que el comando <em>git rm</em>, confirma cualquier cambio de nombre o movimiento de un archivo. En esta oportunidad vamos a simplificar un paso no utilizando el comando <em>mv</em> del sistema operativo sino directamente iremos por el comando de Git.</p>

```sh
$ git mv Archivo2.txt Archivo2_cambio_de_nombre.txt # Cambio de nombre
$ git status
# On branch master
# Changes to be committed:
#   (use "git reset HEAD <file>..." to unstage)
#
#   renamed:    Archivo2.txt -> Archivo2_cambio_de_nombre.txt
#
$ git commit -m "Cambio de nombre del archivo 2" # Consolidar en BD
[master 5a13514] Cambio de nombre del archivo 2
 1 file changed, 0 insertions(+), 0 deletions(-)
 rename Archivo2.txt => Archivo2_cambio_de_nombre.txt (100%) # resumen
```

<p>Este comando realiza el cambio de nombre a nivel de sistema operativo y a su vez confirma los cambios subiendo el archivo al escenario. Para consolidarlos posteriormente.</p>
