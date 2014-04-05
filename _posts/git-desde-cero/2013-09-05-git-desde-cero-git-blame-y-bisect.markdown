---
layout: post
status: publish
published: true
title: Blame y Bisect
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
wordpress_id: 2175
wordpress_url: http://codehero.co/?p=2175
date: 2013-09-05 00:02:01.000000000 -04:30
serie: Git desde Cero
thumbnail: http://i.imgur.com/IzAdb3d.png
description: Capítulo 12 de Git desde Cero, serie en la cual aprenderemos a utilizar git blame y git bisect para realizar "debugging" dentro de nuestros proyectos!
categories:
- Cursos
- Git
tags:
- Cursos
- Git
- curso
---
<p>Bienvenidos a un nuevo capítulo de <strong><em>Git desde cero</em></strong> en este <em>curso</em> hablaremos sobre como realizar "debugging" utilizando Git, con las herramientas <code>git bisect</code> y <code>git blame</code>. Los comandos a utilizar esta semana serán los siguientes:</p>

<ul>
<li>git blame * (varios comandos)</li>
<li>git bisect * (varios comandos)</li>
</ul>

<hr />

<h2>¿Realizar "debugging" en git?</h2>

<p>Muchas veces en nuestros proyectos y de manera involuntaria, introducimos errores en el código fuente. Existen herramientas que nos ayudan a resolver, a cubrir y darnos cuenta de los defectos que hemos introducido de forma "inmediata" sobre todo cuando se programa de manera orientada a pruebas, mayormente conocida como TDD (Test Driven Development). Con todo y estas "ayudas" para asegurarnos de que nuestras funciones realizan lo que queremos; muchas veces entre una versión y otra el comportamiento de una función cambia ligeramente y nuestra unidad de pruebas no lo detecta. Cómo confiamos plenamente en ella realizamos un <em>"commit"</em> de nuestro código y lo subimos al repositorio remoto. Seguimos programando y subimos otros más. De repente nuestros usuarios comienzan a levantar "tickets" a cerca de un error recurrente; cuando revisamos el código fuente para detectar porqué se produce este error, no detectamos a simple vista que es lo que sucede. En este punto recurrimos a el control de versiones para ir a versiones anteriores y ver que hemos cambiado en estos últimos <em>"commits"</em>. Canalizamos la falla a un archivo, y utilizamos nuestras herramientas <code>git blame</code> y <code>git bisect</code> las cuales nos ayudarán a detectar, cuando se introdujo el error y que lo motiva.</p>

<hr />

<h2>¿Qué realiza el git blame?</h2>

<p>El comando <code>git blame</code> nos permite observar toda la información de manera detallada a cerca de un <em>"commit"</em>. Entre la información que nos brinda el comando está: Quién escribió cada linea en el archivo, cuando lo hizo y a que <em>"commit"</em> pertenece. La palabra <em>"blame"</em> en idioma Inglés es referente a "quien echarle la culpa" o "quien es el culpable" según sea su contexto. Por este motivo llaman a este comando de esta forma.</p>

<p>Vamos a verlo en acción.</p>

```sh
$ git blame app.js
c4c4f2a2 (Jonathan Wiesel              2013-09-02 22:38:34 -0430  6) var dotenv = require('dotenv')();
c4c4f2a2 (Jonathan Wiesel              2013-09-02 22:38:34 -0430  7) dotenv.load();
c4c4f2a2 (Jonathan Wiesel              2013-09-02 22:38:34 -0430  8)
ae36bb76 (Oscar Vicente González Greco 2013-08-25 14:05:52 -0430  9) var express = require('express')
ae36bb76 (Oscar Vicente González Greco 2013-08-25 14:05:52 -0430 10) ,   http    = require('http')
ae36bb76 (Oscar Vicente González Greco 2013-08-25 14:05:52 -0430 11) ,   path    = require('path')
c4c4f2a2 (Jonathan Wiesel              2013-09-02 22:38:34 -0430 12) ,  db  = require('./dbConfig')
98b032f9 (Oscar Vicente González Greco 2013-08-29 18:14:19 -0430 13) ,  auth = require('./passportConfig')
98b032f9 (Oscar Vicente González Greco 2013-08-29 18:14:19 -0430 14) ,  flash = require("connect-flash");
ae36bb76 (Oscar Vicente González Greco 2013-08-25 14:05:52 -0430 15)
```

<p>Podemos apreciar que lo primero que nos muestra es el <em>"hash"</em> corto, único del <em>"commit"</em>, luego encontramos el nombre de usuario que realizó, la fecha, y la respectiva línea de código.</p>

{% include middle-post-ad.html %}

<p>También podemos filtra el número de <em>"commits"</em> que queremos observar. Por ejemplo: si sabemos que nuestro problema comenzó a ocurrir a partir de un <em>"commit"</em> específico y se refleja hasta "X" <em>"commit"</em> más adelante filtramos estos resultados para encontrar que se modificó en estos <em>"commit"</em>.</p>

```sh
$ git blame ae36..c4c4 -- app.js
```

<p>Si queremos cambiar el nombre de la persona por su email, realizamos lo siguiente.</p>

```sh
$ git blame -e app.js
```

<p>En general y con la ayuda este comando podemos encontrar quién fue el culpable de introducir un error particular en uno de nuestros proyectos.</p>

<hr />

<h2>¿Qué realiza el git bisect?</h2>

<p>Este comando nos ayuda a verificar que fue lo que sucedió con nuestro código entre varios <em>"commits"</em>, es decir. Le notificamos a Git que versión está buena o no produce el error y que versión da el error o se comporta de manera extraña. De aquí en adelante git busca un <em>"commit"</em> intermedio a estos dos que le dimos anteriormente y realiza una especie de <em>"checkout"</em> el cual nos permite estar en la versión de código del <em>"commit"</em> intermedio, es aquí cuando realizamos nuestras pruebas, si todo marcha acode a lo deseado, le notificamos a git que éste <em>"commit"</em> se encuentra bien y proseguimos, luego git vuelve a buscar otro <em>"commit"</em> intermedio a este nuevo que nosotros confirmamos como "correcto" y el <em>"commit"</em> final de nuestra búsqueda. Realizamos el mismo procedimiento hasta dar con el error. Vamos a demostrarlo.</p>

```sh
$ git log
* c811a8b - Jonathan Wiesel, 3 days ago : cambiado tamaño de username en model user
* 489c942 - Jonathan Wiesel, 3 days ago : ignorado archivo de intelliJ
* 98b032f - Oscar Vicente González Greco, 5 days ago : se agrego soporte para sesiones con passport.js
* 288dce7 - Oscar Vicente González Greco, 9 days ago : se eliminaron los DS_store ;
* 2b0356f - Oscar Vicente González Greco, 9 days ago : re arregló gitignore
* ae36bb7 - Oscar Vicente González Greco, 9 days ago : Se eliminó intellij. se agregó orm. se reorganizó estructura del proyecto a una más mantenible.
* e2d314d - Oscar Vicente González Greco, 2 weeks ago : commit inicial / se hizo un CRUD de usurio
```

<p>Vamos a elegir el <em>"commit"</em> e2d314d cómo bueno y c4c4f2a cómo el malo.</p>

```sh
$ git bisect start
$ git bisect good e2d314d
$ git bisect bad c4c4f2a
Bisecting: 3 revisions left to test after this (roughly 2 steps)
[98b032f929230bcda22367f90223b270a3199800] se agrego soporte para sesiones con passport.js
```

<p>En este punto corremos nuestra suite de pruebas o las pruebas necesarias.</p>

```sh
$ git bisect good
Bisecting: 1 revision left to test after this (roughly 1 step)
[c811a8b18de58a2aed18b70df6019b03672ef637] cambiado tamaño de username en model user
```

<p>Corremos nuevamente la suite de pruebas o las pruebas necesarias.</p>

```sh
$ git bisect good
Bisecting: 0 revisions left to test after this (roughly 0 steps)
[b53c0dd8432aa928cded2efe2f49f2a3a81adcff] agregado modelo vehicle y userVehicle, agregado listar todos los vehículos del sistema
```

<p>Corremos nuevamente la suite de pruebas o las pruebas necesarias. Encontramos el error, marcamos como malo.</p>

```sh
$ git bisect bad
b53c0dd8432aa928cded2efe2f49f2a3a81adcff is the first bad commit
commit b53c0dd8432aa928cded2efe2f49f2a3a81adcff
Author: Jonathan W
Date:   Sat Aug 31 17:38:23 2013 -0430

    agregado modelo vehicle y userVehicle,
    agregado listar todos los vehículos del sistema

:100644 100644 983255ad9dd82962c0e577a89ee9fdc2ae77060d 260904ad4a32820ce4103e57e4558d06b2111f40 M  app.js
:040000 040000 03f3fa7be92462c3c4cbc52d1e023516540fe62f 4bddcd8a960bc0f6944e2c078b9e11d2f58085fd M  controllers
:100644 100644 6d17e5f8f000caf50ae4e13d93f6c1b0317a6711 49278121379ba65eb8db4652625bd4be34c802ce M  dbConfig.js
:040000 040000 5b87e3f615ac423234361bb062eaa2afd0011c3a ebba61f808c3d7894bcf02faf31d85c49e227e3b M  models
```

<p>Reseteamos el estado del bisect</p>

```sh
$ git bisect reset
Previous HEAD position was b53c0dd... agregado modelo vehicle y userVehicle, agregado listar todos los vehiculos del sistema
Switched to branch 'master'
```

<p>De Aquí en adelante nos toca realizar un <em>"checkout"</em> de la versión que queremos corregir, o parcharla directamente sobre lo que venimos trabajando.</p>

<hr />

<h2>Conclusión</h2>

<p>En este último capítulo y en conjunto con los cursos anteriores hemos adquirido el conocimiento necesario para poder debugear con ayuda de git, utilizando las herramientas que nos ofrece. Dichas herramientas ciertamente nos pueden salvar de graves problemas, de igual forma te invitamos a revisar la documentación de ambas herramientas. Si te surge algún tipo de duda no te detengas y déjanos un comentario, que gustosamente lo responderemos.</p>

<p>¡Hasta la semana entrante!</p>
