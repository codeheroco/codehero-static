---
layout: post
status: publish
title: Feature Branch Workflow
author: Alberto Grespan
author_login: albertogg
description: Capítulo especial de la serie Git desde Cero, aprenderemos a utilizar el llamado Feature Branch Workflow.
dificultad: Heroe
duracion: 20
serie: Git desde Cero
categories:
- Cursos
- Git desde Cero
tags:
- git
- workflow
- branch
- feature
---

Bienvenidos a este capítulo ***Especial*** de **Git desde cero** en el que hablaremos de un tema particular que ciertamente me parece muy conveniente discutir. **Feature Branch Workflow** es uno de los tantos "Workflows" que existen en Git pero probablemente sea el más popular ya que es el utilizado en dentro de GitHub, inclusive es posible que conozcan este "Workflow" como el *GitHub flow*.

* * *

## ¿En qué consiste este workflow?

Este workflow ayuda a no tener tantos conflictos como en el "[workflow centralizado](https://www.atlassian.com/git/workflows#!workflow-centralized)" al momento de realizar tareas de pull y push ya que está basado en crear ramas que parten de master llamadas feature branch o topic branch donde las mismas no interrumpen el trabajo de los demás. Dichas ramas tienen un único propósito, es decir, son creadas para agregar una funcionalidad específica, corregir un error (bug), borrar funcionalidad deprecada etc... Siempre serán utilizadas para algo puntual. Una vez que se culmine lo que se está realizando en el "feature branch" dicha funcionalidad debe ser unida a master nuevamente y así ir repitiendo el ciclo durante el desarrollo. Además de lo antes mencionado, cuando todo nace y muere en master debemos asumir que dicha rama debe estar "libre" de errores de compilación o ejecucución (obviamente siempre habrá algún bug) y debe en todo momento `master` debe poder ser desplegable en producción sin preocupaciones.

* * *

## Creando una rama

Este punto particular ya lo hemos tocado anteriormente. Lo que haremos aquí será explicar un poco la nomenclatura de nombres que le ponemos a las ramas. Es importante que el nombre sea muy explicíto así nuestro grupo de trabajo podrá saber en todo momento en qué estamos trabajando.

Debemos crear los "feature branches" siempre a partir de master y los nombres de dichos branches deben ser algo como: `fix-issue-123`, `fix-login-bug`, `add-more-admin-funcionalities`, `add-two-factor-auth`. Los nombres siempre deben ser lo más explicito y significativos posibles.

```bash
$ git checkout master
$ git checkout -b add-two-factor-auth
Switched to a new branch 'add-two-factor-auth'
```

Ahora podemos comenzar a agregar "commits" a nuestra nueva rama.

* * *

## Agregando cambios

En este punto comenzamos a agregar cambios a nuestra rama. El contenido de dichos cambios debe estar relacionados única y exclusivamente a `add-two-factor-auth`. Los cambios que agregaremos son: eliminar, editar, o agregar información a archivos los cuales iremos persistiendo en unidades pequeñas y congruentes. De esta manera un **commit con un título de 50 caracteres o menos** bastará para conocer que puede estar contenido en los cambios realizados. Basados en esto, hemos ido agregando commits a nuestra rama y los hemos ido subiendo a una rama con el mismo nombre pero en el repositorio remoto.

En este punto nuestra rama local está adelante de la remota por 4 commits y es probable que nos hayamos dado cuenta que podemos mejorar un poco nuestro historial de cambios, ordenandolo mejor o simplemente unir (squashing) ciertos cambios en un sólo mensaje.

> Es importante saber que modificar el historial en cualquier momento es peligroso, ya que si estamos trabajando con varias personas podemos ocasionar graves problemas y por lo tanto si este es el punto es preferible no utilizar los siguientes cambios si no se está seguro de lo que se hace.

```bash
$ git rebase -i @{u}
```

Esto nos abrirá nuestro editor predeterminado y podremos ajustar los mensajes de commit, hacer el squashing o simplemente borrar un cambio del que nos arrepentimos. Cuando hayamos culminado el proceso guardamos, cerramos el editor y subimos los cambios.

Les recuerdo que esto solo lo debemos realizar si consideramos que es necesario ajustar el historial.

Luego compartimos dichos cambios con el equipo.

* * *

## Abrir un Pull Request

Esta es una de las etapas más importantes antes de introducir nuestras modificaciones a master. Se preguntarán ¿Por qué? Sencillo, al abrir un pull request compartiremos el historial de cambios públicamente con las demás personas del equipo de trabajo. Ellos tendrán la oportunidad abiertamente de indagar sobre las modificaciones que hemos realizado, agregar ellos mismos algún cambio o simplemente pedir que corrijamos ciertos detalles. Esta etapa también es conocida como etapa de discusión o "Code Review".

Para bajar cualquier actualización desde el repositorio remoto a su máquina deben utilizar el siguiente comando:

```bash
$ git pull --rebase
```

Si algún miembro del equipo de trabajo desea probar nuestra rama en su máquina puede realizar dos cosas:

- Probar directamente sobre origin en un "detached HEAD"
- Crear un branch local a partir de los cambios que se encuentran en origin

Primera opción:

```bash
$ git checkout origin/add-two-factor-auth
```

Segunda opción:

```bash
$ git checkout -b add-two-factor-auth origin/add-two-factor-auth
```

Algo que debo aclarar es que podemos crear un "pull request" en cualquier momento del desarrollo, no tiene que ser cuando consideremos que hemos terminado. A veces abrir un pull request temprano puede salvarnos de tener que hacer más cambios de los previstos, simplemente al mostrar un screenshot pidiendo ayuda a un compañero.

Una vez que todos estén de acuerdo y se de la funcionalidad por concluída pasamos a la última fase.

* * *

## Unir y puesta en producción

Hemos verificado que las pruebas pasan, la nueva funcionalidad está como la queremos, ahora procederemos a unir los cambios a master. Para esto debemos debemos pasarnos primero a la `master` y luego unir nuestra rama `add-two-factor-auth`.

```bash
$ git checkout master
$ git merge --no-ff add-two-factor-auth
$ git push
$ git branch -d add-two-factor-auth
$ git push origin :add-two-factor-auth
```

Unimos la rama utilizando el comando `git merge --no-ff <feature branch>` porque queremos explicitamente generar un nuevo commit que referencie el la unión de nuestro feature branch `add-two-factor-auth` a `master`. Además de esto se hará notar en nuestro "log" cuales fueron los commits que se hicieron en dicha rama.

```bash
$ git log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr)%C(bold blue)<%an>%Creset' --abbrev-commit

*   1166260 - (HEAD, origin/master, master) Merge pull request #82 from albertogg/fix-inline-code-mobile (2 days ago)<Alberto Grespan>
|\
| * a975c6e - Agregar wrapping de codigo inline. Fixes #81 (2 days ago)<Jonathan Wiesel>
|/
*   7f61657 - :cactus: Merge branch 'fix-serie-detalle' (3 days ago)<Jonathan Wiesel>
|\
| * 0a91c25 - Eliminar post_cat del front-matter de las series (3 days ago)<Alberto Grespan>
| * 222f3e4 - Cambiar el post_cat por series_header (3 days ago)<Alberto Grespan>
| * ef73f19 - Cambiar la lógica para mostrar el detalle de serie (3 days ago)<Alberto Grespan>
* | 79ed01e - Agregar how-to de Yeoman (3 days ago)<Jonathan Wiesel>
|/
* 4f99989 - Se agrego el post java properties (3 days ago)<carlospicca>
* ad3e6a8 - Arreglar el post de javascript que estaba roto (4 days ago)<Alberto Grespan>
```

Luego se procede a subir los cambios a master, borrar la rama local y por último borrar la rama remota. En este punto si tenemos hooks con alguna herramienta de Continuos Integration como [Travis CI](https://travis-ci.org/) correrá la suite de pruebas y luego mediante otro hook se realizará el deploy en producción.

* * *

## Conclusión

Una ventaja muy grande de trabajar con este workflow es que al ser bastante participativo la mayoía de los miembros del equipo de trabajo conocerán con bastante detalle todo el código fuente del proyecto. Hay personas que pueden ver como tediosa la tarea de estar creando, uniendo y eliminando cientos de ramas a lo largo del desarrollo de un proyecto pero la realidad es que todo gira entorno a `master` es decir, al final de cuentas mantenemos sólo una rama. Por último si les gusta el Open Source y GitHub esta es la manera para poder contribuir y dejar una huella en este mundo.
