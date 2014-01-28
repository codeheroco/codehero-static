---
layout: post
status: publish
published: true
title: Utilizando Git Subtree.
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
wordpress_id: 2126
wordpress_url: http://codehero.co/?p=2126
date: 2013-08-29 00:03:34.000000000 -04:30
serie: Git desde Cero
thumbnail: http://i.imgur.com/IzAdb3d.png
description: Capítulo 11 de Git desde Cero, serie en la cual aprenderemos a utilizar subtree (subárboles) dentro de nuestros proyectos, para reutilizar código!
categories:
- Cursos
- Git
tags:
- Cursos
- Git
- curso
---
<p>Bienvenidos a un nuevo capítulo de <strong><em>Git desde cero</em></strong> en este <em>curso</em> hablaremos sobre como agregar, actualizar y utilizar una alternativa a los submódulos de git, llamada <strong><em>subtree</em></strong> en nuestros proyectos. Los comandos a utilizar esta semana serán los siguientes:</p>

<ul>
<li>git subtree (múltiples comandos)</li>
<li>git remote add *</li>
<li>git fetch</li>
</ul>

<hr />

<h2>¿Por qué utilizar subtree y no submódulos?</h2>

<p>Si recuerdan la semana pasada cuando aprendimos <em>submódulos</em> observamos que pueden existir ciertos problemitas o complejidades cuando se emplea el esquema de <em>submódulos</em> para el manejo de subprojectos. Existen varias razones por las cuales uno podría preferir utilizar <em>subtree</em> (subárbol) por encima de un <em>submódulo</em>, entre las más destacadas se encuentran:</p>

<ul>
<li>Manejo del <em>subtree</em> utiliza prácticamente los mismos comandos básicos que aprendimos en las primeras lecciones.</li>
<li>Cuando clonamos un proyecto con un <em>subtree</em> no debemos aplicar más comandos adicionales.</li>
<li>Los <em>subtrees</em> no agregan "metadata" adicional al proyecto (.gitmodule).</li>
<li>Subtree es soportado por versiones viejas de git antes de la <code>1.5.2</code>.</li>
</ul>

<p>De las razones que probablemente no nos agraden tanto, se encuentran las siguientes:</p>

<ul>
<li>Contribuir cambios desde el <em>subtree</em> al proyecto original es un poco más complicado de lo normal.</li>
<li>Tener la capacidad para no mezclar código entre el proyecto principal y el <em>subtree</em> queda de parte de nosotros.</li>
</ul>

<hr />

<h2>¿Cómo se usa un subtree?</h2>

<p>El comando o utilidad de <em>subtree</em> viene por defecto incluido en git desde la versión <code>1.7.11</code> de Mayo del 2012. Les recomiendo que de encontrarse en una versión más vieja que la antes mencionada actualicen para que disfruten de esta poderosa herramienta.</p>

<p>Existen dos formas básicas para utilizar subárbol, una "rápida" y otra "organizada". La diferencia entre las dos es la longitud del comando que debemos memorizar. <strong>Comencemos por la rápida.</strong></p>

<blockquote>
  <p>Para esta prueba vamos a utilizar el repositorio de <a href="https://github.com/codeheroco/nodejs-y-express-rutas">node y express rutas</a> de <a href="http://codehero.co">codehero.co</a>.</p>
</blockquote>

<h3>¿Cómo agregar el subárbol al proyecto?</h3>

```sh
$ git subtree add --prefix node_express_subtree https://github.com/codeheroco/nodejs-y-express-rutas master --squash
git fetch https://github.com/codeheroco/nodejs-y-express-rutas master
From https://github.com/codeheroco/nodejs-y-express-rutas
 * branch            master     -> FETCH_HEAD
Added dir 'node_express_subtree'
```

<p>Con este comando hemos creado una capeta llamada <em>node_express_subtree</em> donde estamos guardando la información del repositorio <a href="https://github.com/codeheroco/nodejs-y-express-rutas">node y express rutas</a> que se encuentra en la rama <code>master</code> y además solo estamos almacenando localmente el último <em>commit</em> en nuestro ordenador al usar la bandera <code>--squash</code>.</p>

<p>Si observamos el <em>log</em>, podemos apreciar lo que se describió en el párrafo anterior.</p>

```sh
$ git log --pretty=format:'%h - %an, %ar : %s' --graph
*   08bddd4 - albertogg, 59 minutes ago : Merge commit '4f34bfe8efc8f797bac71dfcd736cb7fa14efc42' as 'node_express_subtree'
|\
| * 4f34bfe - albertogg, 59 minutes ago : Squashed 'node_express_subtree/' content from commit 0f81501
* 2614422 - albertogg, 7 days ago : Primer commit con un submódulo
```

<h4>¿Qué pasa si semanas después, se han introducido múltiples cambios al proyecto que nosotros tenemos como subproyecto y queremos actualizarlo?</h4>

<p>Pues la respuesta es bastante sencilla. Al igual que cuando utilizamos <code>pull</code> para actualizar nuestro proyecto principal hacemos esto pero agregando el subcomando <code>subtree</code>, de la siguiente manera:</p>

```sh
$ git subtree pull --prefix node_express_subtree https://github.com/codeheroco/nodejs-y-express-rutas master --squash
From https://github.com/codeheroco/nodejs-y-express-rutas
 * branch            master     -> FETCH_HEAD
Subtree is already at commit 0f815018df127cd663ecc8b89500d5f40f40b9b4.
```

<p>Como el proyecto <a href="https://github.com/codeheroco/nodejs-y-express-rutas">node y express rutas</a> no presenta modificaciones el comando nos dice que se encuentra en el <em>commit</em> 0f815018df127cd663ecc8b89500d5f40f40b9b4, es decir en la última versión.</p>

<p><strong>La manera más organizada</strong> de utilizar sería agregando en primera mano la ruta remota al proyecto con un "alias" para no tener que recordar el "URL" del mismo. El trabajo posterior a esto es prácticamente lo mismo que se realizó en la manera rápida con ligeras modificaciones.</p>

```sh
$ git remote add -f node_express_subtree https://github.com/codeheroco/nodejs-y-express-rutas
Updating node_express_subtree
From https://github.com/codeheroco/nodejs-y-express-rutas
 * [new branch]      master     -> node_express_subtree/master
```

<p>Si revisamos las ramas remotas que tenemos asociadas al proyecto observamos que <code>node_express_subtree</code> está identificada dentro de la lista.</p>

```sh
$ git remote -v
node_express_subtree    https://github.com/codeheroco/nodejs-y-express-rutas (fetch)
node_express_subtree    https://github.com/codeheroco/nodejs-y-express-rutas (push)
origin  git@github.com:codeheroco/tutorial-git.git (fetch)
origin  git@github.com:codeheroco/tutorial-git.git (push)
```

<p>Ahora agregamos el subárbol al proyecto.</p>

```sh
$ git subtree add --prefix node_express_subtree node_express_subtree master --squash
```

<p>Para actualizar el subárbol</p>

```sh
$ git fetch node_express_subtree
$ git subtree pull --prefix node_express_subtree node_express_subtree  master --squash
From https://github.com/codeheroco/nodejs-y-express-rutas
 * branch            master     -> FETCH_HEAD
Subtree is already at commit 0f815018df127cd663ecc8b89500d5f40f40b9b4.
```

<h3>¿Cómo contribuir cambios desde el subtree?</h3>

<p>Debemos tener una rama de <code>upstream</code> que debería ser un "fork" del proyecto original al que queremos contribuir en nuestra cuenta o carpeta personal de github (esto únicamente si dicho proyecto se encuentra en github) y agregar su dirección remota.</p>

```sh
$ git remote add albertogg-node-express https://github.com/albertogg/nodejs-y-express-rutas
```

<p>Una vez que tengamos esta dirección remota disponible queda hacer un push a nuestro proyecto y posteriormente hacer un pull-request al proyecto principal.</p>

```sh
$ git subtree push --prefix=node_express_subtree albertogg-node-express master
```

<p>Sé que puede parecer algo confuso, pero realmente es lo que hemos estado trabajado a lo largo de todos estos cursos, únicamente se está agregando el subcomando de <code>git subtree</code> antes del resto de las acciones principales de git.</p>

<hr />

<h2>Conclusión</h2>

<p>En este último capítulo y en conjunto con los cursos anteriores hemos adquirido el conocimiento necesario para utilizar subárboles dentro de nuestros proyectos, ya sea para reutilizar nuestro propio código o simplemente agregar una librería externa. Si te surge algún tipo de duda no te detengas y déjanos un comentario, que gustosamente lo responderemos.</p>

<p>¡Hasta la semana entrante!</p>
