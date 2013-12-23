---
layout: post
status: publish
published: true
title: Include & Require
author: Ramses Velasquez
author_login: ramses
author_email: cotufa9@gmail.com
wordpress_id: 2538
wordpress_url: http://codehero.co/?p=2538
date: 2013-11-05 00:07:28.000000000 -04:30
categories:
- Cursos
- PHP
tags:
- php
- include
- require
---
<p>Si has seguido la serie de PHP desde cero, entonces ya tienes los conocimientos para crear un sitio con PHP. Pero todavía no hemos visto algo muy importante a la hora de crear grandes códigos y tiene que ver con la siguiente pregunta. ¿Como haríamos para crear un sitio web que contenga 100 páginas con conexión a una base de datos? Sería algo tedioso tener que repetir un código como la conexión a la base de datos o la cabecera del sitio web 100 veces. Para esto tenemos las funciones <strong>require</strong> y <strong>include</strong> de PHP.</p>

<p>Hasta ahora los scripts que hemos escrito son de pocas líneas de código, pero a medida que un proyecto va creciendo y tenga mas funciones, también será mucho mayor la cantidad de líneas por cada archivo. Por lo tanto, tener todo el código para una página en un solo archivo crea varios problemas que nombramos a continuación:</p>

<ul>
<li>Complica el mantenimiento o modificación. </li>
<li>Dificultades para poder reutilizar el código. </li>
<li>Dificultades para utilizar códigos de terceros. </li>
</ul>

<p>Para evitar todos estos problemas, debemos separar el código de una página en varios archivos PHP y utilizar las funciones que PHP nos brinda para incluir los códigos que sean necesarios.</p>

<hr />

<h2>Include y Require en PHP como Solución</h2>

<p>Los lenguajes de programación permiten escribir códigos en diferentes archivos y luego importarlos o llamarlos en el archivo que sea necesario. Para esto PHP tiene las dos funciones que ya mencionamos, include y require. Veamos un ejemplo general de como funciona esto:</p>

<pre>$db = new mysqli('localhost', 'usuario', 'clave', 'nombre_base_datos');
if($db->connect_errno > 0){
    die('Imposible conectar [' . $db->connect_error . ']');
}

$sql = "SELECT lenguaje FROM lenguajes";

if(!$resultado = $db->query($sql)){
    die('Ocurrio un error ejecutando el query [' . $db->error . ']');
}

while($fila = $resultado->fetch_assoc()){
    echo $fila['lenguaje'] . '<br />';
}

</pre>

<p>Este código no tiene ningún problema. Pero si tenemos muchas páginas con consultas de base de datos, entonces vamos a repetir la parte de la conexión muchas veces y eso es poco eficiente. también un caso muy malo seria que cambiara la clave o el usuario de la base de datos, lo cual nos obligaría a cambiar ese texto en todos los archivos. Veamos como seria una manera mas eficiente de lograr lo anterior.</p>

<pre>// archivo conexión.php

$db = new mysqli('localhost', 'usuario', 'clave', 'nombre_base_datos');
if($db->connect_errno > 0){
    die('Imposible conectar [' . $db->connect_error . ']');
}

</pre>

<pre>// archivo index.php

require 'conexión.php';
// esta función simplemente toma el contenido de conexion.php y lo coloca en esta posición
// al final el interprete de php usara el código completo 
// pero para nosotros esta separado y organizado 

$sql = "SELECT lenguaje FROM lenguajes";

if(!$resultado = $db->query($sql)){
    die('Ocurrio un error ejecutando el query [' . $db->error . ']');
}

while($fila = $resultado->fetch_assoc()){
    echo $fila['lenguaje'] . '<br />';
}


</pre>

<p>Podemos observar como tenemos un archivo que solo contiene las líneas de código necesarias para establecer la conexión a la base de datos y luego ese archivo es invocado o incluido en el código que necesitamos utilizar la base de datos. Ahora solo tenemos repetir la línea que incluye la conexión en donde sea necesario y cualquier cambio que se deba hacer al código de la conexión se hace en un solo archivo.</p>

<hr />

<h2>Include o Require</h2>

<p>Anteriormente dijimos que hay dos funciones <strong>include</strong> y <strong>requiere</strong>, las cuales tienen propósitos diferentes.</p>

<h3>Include</h3>

<p>Cuando utilizamos <strong>include</strong>, PHP intenta cargar el archivo solicitado, pero si no lo logra encontrar entonces muestra un error de tipo <strong>warning</strong>. Esto significa que algo salió mal durante el código pero la ejecución del mismo continua.</p>

<p>Esta función se puede utilizar cuando se necesita cargar un archivo que no sea del todo necesario durante la ejecución de un script, como por ejemplo un <strong>HTML</strong>(quizás la cabecera, pie de página o menú lateral). Si el archivo no se logra cargar entonces la página no tiene porque dejar de mostrarse.</p>

<h3>Require</h3>

<p>Cuando utilizamos <strong>require</strong>, PHP intenta cargar el archivo solicitado, pero si no lo logra cargar entonces muestra un error de tipo <strong>fatal error</strong>. Esto significa que el script no puede continuar y se detiene su ejecución.</p>

<p>Esta función de debe utilizar cuando el archivo que se solicita es necesario para la ejecución del script, en este caso podríamos hablar de la conexión a la base de datos. Si el archivo de conexión no es cargado entonces el programa se debe detener.</p>

<hr />

<h2>Include_once y Require_once</h2>

<p>Las funciones <strong>include</strong> y <strong>require</strong> van a agregar el código que tenga el archivo siempre que sea llamado. Es decir, si colocamos cuatro veces en el script <code>include 'pie_de_página.php';</code> entonces la página tendrá cuatro pies de página, algo que tiene poca lógica.</p>

<p>Para que esto no ocurra tenemos las funciones <strong>require_once</strong> e <strong>include_once</strong>, las cuales funcionan igual a las anteriores pero si se vuelve a llamar al mismo archivo dentro de un mismo script esta llamada es ignorada. Esto quiere decir que solo se hace efectiva la carga del archivo solicitado la primera vez que se ejecute la función en el script.</p>

<p>Es muy útil para cuando tengamos la necesidad de cargar un archivo con funciones o algún código que solo debamos cargar una sola vez y no quisiéramos que por error se vuelva a cargar.</p>

<hr />

<h2>Conclusión</h2>

<p>En este capítulo hemos aprendido 4 funciones que nos ayudar a mantener nuestro código ordenado y separado para que sea mas fácil hacer cambios y reutilizar pedazos del mismo. La utilización de cualquiera de las 4 funciones viene dada por la necesidad que tenga el script, ya que cada una tiene un propósito especifico. Cualquier duda o comentario estaré atento a la sección de comentarios.</p>
