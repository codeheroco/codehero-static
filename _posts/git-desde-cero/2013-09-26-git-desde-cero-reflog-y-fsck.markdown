---
layout: post
status: publish
published: true
title: Reflog y Fsck
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
wordpress_id: 2315
wordpress_url: http://codehero.co/?p=2315
date: 2013-09-26 00:02:52.000000000 -04:30
categories:
- Cursos
- Git
tags:
- Cursos
- Git
- curso
---
<p>Bienvenidos a un nuevo capítulo de <strong><em>Git desde cero</em></strong> en este <em>curso</em> hablaremos sobre como recuperar algún <em>"commit"</em> que pudo perderse o ser borrado sin querer cuando modificamos el historial o borramos una rama. Para esto utilizaremos <code>git reflog</code> y como alternativa extrema si por algún motivo no podemos recuperarlo utilizaremos <code>git fsck</code>.</p>

<hr />

<h2>¿Qué es reflog?</h2>

<p>Ya sabemos que git nos ayuda a hacer un seguimiento de todos las actualizaciones (<em>"commits"</em>) que realizamos. Este mecanismo para realizar el seguimiento de todas las actualizaciones se llama <strong>"reflog"</strong>. la información que recoge el <strong>"reflog"</strong> viene siendo la "misma" que la del <code>git log</code>, pero presentada de manera diferente ya que es almacenada dentro de la misma carpeta <code>.git/logs/</code>.</p>

<p>Como ya dijimos que <strong>"reflog"</strong> es el mecanismo para realizar seguimiento de todas las actualizaciones de nuestro proyecto, podemos afirmar en pocas palabras que nos permite visualizar <em>"commits" perdidos</em>. Puede ocurrir, que en algún momento, uno de los <em>"commits"</em> que hemos realizado se pierda, borremos una rama, o simplemente cuando reescribimos el historial de cambios borramos algo no deseado. El <strong>"reflog"</strong> tiene archivados todos y cada uno de los estados anteriores de una rama y nos permite revertir o ir a cualquier estado anterior del proyecto de ser necesario. Es muy importante tener claro lo que esta herramienta realiza, ya que seguramente la vamos a tener que utilizar en algún momento.</p>

<h3>¿Qué se escribe en el reflog?</h3>

<p>Cada vez que se acuatiza la cabeza <em>"HEAD"</em> del árbol en que nos encontremos se escribe en el "reflog". Es decir, cada vez que cambiamos de rama, realizamos un "pull", utilizamos un "merge", "rebase", o simplemente agregamos un nuevo "commit", git escribe dentro del "reflog".</p>

<h3>¿Cómo se usa?</h3>

<p>El "reflog" se utiliza por medio del comando <code>git reflog</code> tiene ciertas banderas como "expire" para expirar datos dentro del "reflog", pero por lo general solo utilizamos el comando normal.</p>

<pre>$ git reflog --relative-date
On branch master
926a59c HEAD@{7 days ago}: reset: moving to 926a59cc1c
47fede5 HEAD@{7 days ago}: commit: Prueba del hook
926a59c HEAD@{2 weeks ago}: reset: moving to 926a59c
2614422 HEAD@{2 weeks ago}: reset: moving to 2614422d18
926a59c HEAD@{2 weeks ago}: reset: moving to 926a59c
2614422 HEAD@{2 weeks ago}: reset: moving to 2614422d18
...
</pre>

<p>Mediante la bandera <code>--relative-date</code> apreciamos una fecha relativa de cuando se realizó el "commit" <code>{7 days ago}</code>, esto nos puede ayudar de cierta manera a orientarnos mejor.</p>

<p>Si necesitan recuperar algo particular a partir de este momento solo deben utilizar el comando <code>git checkout</code> y luego <code>git reset --hard HashDelCommit</code> para recuperar o ir a un estado particular.</p>

<p>Hagamos esta simple prueba, vamos a regresar al "commit" del capítulo 8 de número <code>de13f1b</code> lo vamos a buscar el por mensaje.</p>

<pre>$ git reflog --relative-date | grep -i planeado
de13f1b HEAD@{7 weeks ago}: rebase -i (squash): Commit planeado. archivo nuevo y viejo
a735092 HEAD@{7 weeks ago}: commit: Commit planeado. archivo nuevo y viejo
</pre>

<p>Luego vamos a crear una rama nueva para no afectar el estado actual de nuestra rama principal.</p>

<pre>$ git co -b prueba-reflog
Switched to a new branch 'prueba-reflog'
</pre>

<p>Y por último a ir a ese estado particular.</p>

<pre>$ git reset --hard de13f1b
HEAD is now at de13f1b Commit planeado. archivo nuevo y viejo
</pre>

<p>Este procedimiento es exactamente el mismo que se debe realizar cuando se pierde un "commit", y de querer podemos utilizar <code>git cherry-pick</code> para trasladar el "commit" a la rama que queramos.</p>

<h2>¿Qué es fsck?</h2>

<p><strong>"Fsck"</strong> es esa herramienta que viene a salvarnos la vida cuando creemos que todo está perdido. En sistemas operativos *nix el comando <strong>"fsck"</strong> es referido a "File System Check" y revisa las inconsistencias del "File System" para comprobar de que no se haya perdido o dañado nada con un apagón repentino o un "crash" de algún programa. En git el comando revisa la integridad de la base de datos interna de git y busca los objetos que no esten apuntados a otro objeto.</p>

<p>Cuando se pierde un "commit" y no tenemos el "reflog" ya sea porque los expiramos en alguna oportunidad o simplemente borramos la carpeta <code>.git/logs</code> el comando <code>git fsck</code> puede ayudarnos a identificar estos "commits" sueltos a los que nosotros nos referimos como perdidos.</p>

<h3>¿Cómo se usa?</h3>

<p>El "fsck" se utiliza por medio del comando <code>git fsck</code>. Una vez aplicado el comando comienza a revisar la base de datos de git. También podemos utilizar las siguientes banderas <code>--full</code> o <code>--unreachable</code>. "full" realiza una revisión de múltiples carpetas para encontrar todos los objetos posibles. Por otra parte "unreachable" refleja los objetos que existen pero no se pueden encontrar en ningún otro nodo de referencias. Cuando se encuentran aquí es porque probablemente nosotros borramos una rama o "tag" que los contenía.</p>

<p>Vamos a probar los dos comandos y observar las distintas salidas.</p>

<pre>$ git fsck --full
Checking object directories: 100% (256/256), done.
dangling blob 43882b2283b87566d08b5307ff3c5e8abd095b6f
dangling commit 4b7347b7514526606484599ee67d7b7abb601a14
dangling blob b4f0de027a1ccdc432ac652052e78e2f53caa1ff
dangling blob bead78cc772d5149ce300480d274d09cf5632368
dangling commit eb15ce2cc60a1829f24442fb14b3e69eb0866580
dangling commit f511b3332361558cff180717868ac208132bb2bf
</pre>

<p>Ahora aplicamos el <code>--unreachable</code></p>

<pre>$ git fsck --unreachable
Checking object directories: 100% (256/256), done.
unreachable commit 32018436db16348f4d84bb8b40aa394a195c6ded
unreachable blob 43882b2283b87566d08b5307ff3c5e8abd095b6f
unreachable commit 4b7347b7514526606484599ee67d7b7abb601a14
unreachable commit 81d47a325c1a73efe01fb67753ff2c32e0da44c0
unreachable commit a1248a18c03eedac7046bc140d058647aded02ab
unreachable blob b4f0de027a1ccdc432ac652052e78e2f53caa1ff
unreachable blob bead78cc772d5149ce300480d274d09cf5632368
unreachable commit eb15ce2cc60a1829f24442fb14b3e69eb0866580
unreachable commit f511b3332361558cff180717868ac208132bb2bf
</pre>

<p>Podemos apreciar que entre los dos existen objetos similares y todos tienen un "hash" por lo cual si aplicamos el mismo procedimiento utilizado con el "reflog" vamos a poder retornar dicho "commit" a el historial.</p>

<p>Debemos tener en cuenta que estos objetos que se reflejan no duran para siempre; es muy probable que en algún momento sean eliminados por git si el mismo comienza a correr su gc ("garbage colector") o corremos el comando <code>git gc</code>.</p>

<hr />

<h2>Conclusión</h2>

<p>En este último capítulo y en conjunto con los cursos anteriores hemos adquirido el conocimiento necesario para poder recuperar algún "commit" que hayamos podido borrar. Como sugerencia debes tener en cuenta que si esperas demasiado para recuperar un "commit" puede ser demasiado tarde si git ya corrió su recolector de basura, así que si identificas que algo no está bien corre los comandos "reflog" y "fsck" para asegurar de que todo está como debería estar. Te invitamos a revisar la documentación de ambas herramientas. Si te surge algún tipo de duda no te detengas y déjanos un comentario, que gustosamente lo responderemos.</p>

<p>¡Hasta la semana entrante!</p>
