---
layout: post
status: publish
published: true
title: Manejo de ramas remotas.
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
wordpress_id: 1699
wordpress_url: http://codehero.co/?p=1699
date: 2013-07-25 00:20:22.000000000 -04:30
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
<p>Bienvenidos a un nuevo capítulo de <strong><em>Git desde cero</em></strong> en este <em>curso</em> hablaremos sobre como manejar las ramas remotas en un proyecto y cuales son las mejores prácticas. Los comandos a utilizar esta semana serán los siguientes:</p>

<ul>
<li>git push (múltiples comandos)</li>
<li>git checkout (nuevamente)</li>
</ul>

<hr />

<h2>¿Qué es una rama remota?</h2>

<p>Una rama remota es una referencia al estado de una rama local en un repositorio remoto. Estás ramas generalmente son utilizadas para respaldar funcionalidades en desarrollo (no concluidas) en el repositorio sin afectar el estado de la raíz del proyecto. Es decir, si comenzamos a trabajar en un cambio de apariencia para nuestro sitio web, pero no queremos exponerlo hasta que el mismo esté concluido y deseamos trabajar tanto en el ordenador de casa como en el de la oficina "deberíamos" crear una rama remota para lograr nuestro cometido.</p>

<p>Las ramas remotas tienen como convención de nombre el siguiente formato: <strong>(remoto)/(rama)</strong>, donde la rama principal en un repositorio remoto se llama <strong>origin/master</strong> y todas las subramas en el repositorio remoto tendrán el prefijo <strong>origin</strong> y del otro lado el nombre de la rama que queramos darle; en nuestro caso podría ser <strong>primera-rama</strong>. Cabe destacar que si nosotros no aplicamos el comando <code>git push origin master</code> cada vez que queramos respaldar cambios realizados localmente de nuestra rama principal el estado de la rama remota se quedará rezagado.</p>

<hr />

<h2>Push</h2>

<p>El comando <em>push</em> (empujar) es utilizado para compartir una rama sea la principal o una subrama del proyecto con el mundo. Quiero recordar que las ramas locales no se sincronizan automáticamente con las remotas, es un comportamiento que se debe realizar manualmente. Podemos ver este comportamiento como privacidad.</p>

<p>Ahora, vamos a comenzar una nueva rama e introducir unos cambios locales y compartirlos con el resto del mundo.</p>

```sh
$ git checkout -b arreglos-varios
Switched to a new branch 'arreglos-varios'

# una vez creada la rama vamos a crearla en el repositorio remoto.

$ git push origin arreglos-varios
Total 0 (delta 0), reused 0 (delta 0)
To git@github.com:codeheroco/tutorial-git.git
 * [new branch]      arreglos-varios -> arreglos-varios
```

<p>Vamos a introducir los siguientes cambios.</p>

```sh
$ mv hola,_soy_jonathan.md hola_jonathan.md # cambio de nombre

$ echo 'Estamos agregando unos ligeros cambios al archivo.' >> hola_jonathan.md

# los guardamos

$ git add . # agregamos al escenario todos los cambios.
$ git commit -m "Cambio de nombre"
```

<p><img src="http://i.imgur.com/3sJzdtN.png" alt="local-remota" /></p>

<p>Ahora haremos lo siguiente a partir de nuestra rama <em>arreglos-varios</em> crearemos una nueva rama llamada <em>duplicada-de-arreglos-varios</em> y introduciremos un cambio. Luego de esto empujaremos estos cambios al repositorio remoto desde esta misma rama.</p>

<p>Estando en la rama <em>arreglos-varios</em> ejecutamos el siguiente comando para crear una rama "duplicada" de la misma.</p>

```sh
$ git checkout -b duplicada-de-arreglos-varios
Switched to a new branch 'duplicada-de-arreglos-varios'
```

<p><img src="http://i.imgur.com/hV0oq98.png" alt="ramas-parejas" /></p>

<p>Introduciremos los siguientes cambios y posteriormente empujaremos hacia la rama <em>arreglos-varios</em>.</p>

```sh
$ echo 'Estamos introduciendo un cambio, para utilizarlo en la demostración.' >> hola_jonathan.md

# Consolidamos el cambio.

$ git add .
$ git commit -m "Cambio nuevo"
[duplicada-de-arreglos-varios c99705e] Cambio nuevo
 1 file changed, 2 insertions(+)

# Empujamos los cambios.

$ git push origin duplicada-de-arreglos-varios:arreglos-varios
Counting objects: 7, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (6/6), done.
Writing objects: 100% (6/6), 605 bytes | 0 bytes/s, done.
Total 6 (delta 3), reused 0 (delta 0)
To git@github.com:codeheroco/tutorial-git.git
   05fe98e..c99705e  duplicada-de-arreglos-varios -> arreglos-varios
```

<h3>¿Qué queremos lograr demostrando esto?</h3>

<p>Lo principal es que una rama local no tiene porqué tener el mismo nombre que una rama remota, esto puede ser confuso pero queremos decir que es algo factible. Lo segundo, podemos realizar seguimiento y colaboración sin importar nombres de ramas localmente, ejemplo: "un compañero nuestro está trabajando en una funcionalidad nueva, y nosotros queremos descargar esa funcionalidad en una rama que tenemos creada local con un nombre distinto podríamos hacerle seguimiento y colaborar con él". La tercera es que observando el caso anterior pudiésemos simplemente hacerle seguimiento a la rama remota sin tener una rama local en nuestro equipo.</p>

<h3>¿Cómo hacemos seguimiento de una rama remota?</h3>

<p>Generalmente cuando uno clona un repositorio remoto únicamente se comienza a seguir los cambios de <strong>master</strong> que viene siendo la rama o raíz principal del proyecto. para realizarle el seguimiento a una rama remota adicional se utiliza el siguiente comando.</p>

```sh
$ git checkout --track origin/arreglos-varios
```

<p>Una vez empleado el comando vamos a observar que tenemos en nuestros <code>git branch -r</code> una entrada adicional para *arreglos-varios`.</p>

<p>Si ahora quisiéramos colaborar en una rama remota haríamos lo siguiente: crear una nueva rama llamada <em>a-v</em> a partir de la información que se encuentra en el repositorio remoto en la rama <em>arreglos-varios</em>, aplicando el siguiente comando.</p>

```sh
$ git checkout -b a-v origin/arreglos-varios
Branch a-v set up to track remote branch arreglos-varios from origin.
Switched to a new branch 'a-v'
```

<p><img src="http://i.imgur.com/CWAYgQA.png" alt="nueva-rama" /></p>

<h3>¿Cómo eliminar una rama remota?</h3>

<p>Muchas veces hemos trabajado y respaldado una rama en el repositorio remoto para realizar una funcionalidad específica, pero dicha funcionalidad la hemos concluido y unido con <em>master</em> (nuestra rama principal), es aquí cuando nuestra rama secundaria que fue útil para el desarrollo de la funcionalidad pierde sentido y algo nos dice que no debería estar ahí, entonces decidimos borrarla utilizando el siguiente comando:</p>

```sh
$ git push origin :arreglos-varios
```

<p>Esto lo que realiza es decirle al servidor que deseche la rama <em>arreglos-varios</em>. El comando es prácticamente idéntico al que utilizamos para crear la rama remota, la única diferencia es que le pasamos el prefijo ":" antes del nombre de la rama. Este comando es algo confuso pero muy utilizado, por eso es importante que lo memoricen ya que lo estarán utilizando frecuentemente.</p>

<hr />

<h2>Conclusión</h2>

<p>En este último capítulo y en conjunto con los cursos anteriores hemos adquirido el conocimiento necesario para utilizar ramas remotas en los proyectos que desarrollemos, éste es un atributo fundamental en el flujo de trabajo de git. Si te surge algún tipo de duda no te detengas y déjanos un comentario, que gustosamente lo responderemos.</p>

<p>¡Hasta la próxima semana!</p>
