---
layout: post
status: publish
published: true
title: Archivos
author: Ramses Velasquez
author_login: ramses
author_email: cotufa9@gmail.com
wordpress_id: 3013
wordpress_url: http://codehero.co/?p=3013
date: 2014-02-14 01:04:16.000000000 -04:30
categories:
- Cursos
- PHP
tags:
- php
---
<p>En este nuevo capítulo de PHP vamos a aprender como crear, abrir, leer y escribir en archivos planos de texto. Revisaremos los tipos de lectura y escritura que existen y las principales funciones que PHP nos brinda para llevar acabo estas tareas.</p>

<hr />

<h2>Abrir un Archivo</h2>

<p>La primera función que vamos a estudiar sera <strong>fopen( $ruta, $tipo_apertura )</strong>, con esta se pueden abrir y crear archivos para su lectura. Esta función recibe como parámetros la ruta del archivo que se desea abrir y el tipo de apertura que se va a realizar, estos tipos los comentaremos más adelante. La función retorna un identificador del archivo con el cual después podemos leerlo o escribir en el.</p>

<p>Veamos ahora los principales tipos de apertura que tiene PHP:</p>

<ul>
<li><strong>'r'</strong>: Abre el archivo sólo para lectura. Se comienza a leer al principio del archivo. </li>
<li><strong>'r+'</strong>: Abre el archivo para lectura y escritura. Se comienza a leer al principio del archivo. </li>
<li><strong>'w'</strong>: Abre el archivo sólo para escritura. Borra todo y se escribe desde el principio. Si el fichero no existe entonces lo intenta crear. </li>
<li><strong>'w+'</strong>: Abre el archivo para lectura y escritura. Se comienza a leer desde el principio y borra todo si se escribe algo. Si el fichero no existe entonces lo intenta crear. </li>
<li><strong>'a'</strong>: Abre el archivo sólo para escritura. El escribe al final del archivo y si no existe entonces se crea. </li>
<li><strong>'a+'</strong>: Abre el archivo para lectura y escritura. Se comienza a escribir al final del archivo y si no existe se crea. </li>
</ul>

<p>Ahora vamos a observar un ejemplo para entender como se utiliza la función <strong>fopen()</strong>.</p>

<pre>$identificador = fopen('archivo.txt', 'r');
// se abre el archivo solo para lectura y se comienza a leer desde el principio
// esto se establece con el tipo de apertura r

</pre>

<hr />

<h2>Cerrar un Archivo</h2>

<p>Luego de abrir y manipular el contenido del archivo, lo cual veremos más adelante, se debe cerrar el archivo. Esto se logra con la función <strong>fclose()</strong> y se pasa como parámetro el identificador del archivo. Veamos el ejemplo de esto:</p>

<pre>$identificador = fopen('archivo.txt', 'r');

// se lleva acabo la manipulación y edición del archivo

// por último se cierra
fclose($identificador);

</pre>

<hr />

<h2>Leer un Archivo</h2>

<p>Ahora que sabemos como abrir y cerrar un archivo vamos a pasar a leerlo. Para leer archivos con PHP existen varias funciones pero en esta ocasión vamos a ver <strong>fgets()</strong> y <strong>fgetc()</strong>. La primera sirve para leer linea por linea y la segunda sirve para leer caracteres por carácter el archivo. En las dos funciones se pasa como parámetro el identificador del archivo y se recibe como respuesta la linea o el carácter leído. Para leer un archivo también necesitamos hacer uno de la función <strong>feof()</strong>, la cual sirve para verificar si hemos llegado al final del archivo o no y recibe como parámetro el identificador del archivo. Cuando hemos llegado al final del archivo no debemos seguir leyendo con las funciones <strong>fgets</strong> o <strong>fgetc</strong>. Veamos un ejemplo de como se implementan estas funciones:</p>

<p>Hay que recordar que debemos colocar en <strong>fopen()</strong> un modo que permita leer el archivo, como por ejemplo 'r'.</p>

<pre>// abrimos el archivo
$identificador = fopen("archivo.txt", "r");

// dentro de un while vamos preguntando si hemos llegado al final del archivo
// en caso de que no haber llegado al final entonces se lee otra linea
// si se llego al final entonces no se lee nada y se cierra el archivo

while( !feof($identificador) ){

  $linea = fgets($identificador). "<br />";
  echo $linea;

}

fclose($identificador);


</pre>

<pre>// abrimos el archivo
$identificador = fopen("archivo.txt", "r");

// dentro de un while vamos preguntando si hemos llegado al final del archivo
// en caso de que no haber llegado al final entonces se lee otro carácter
// si se llego al final entonces no se lee nada y se cierra el archivo

while( !feof($identificador) ){

  $caracter = fgetc($identificador). "<br />";
  echo $caracter;

}

fclose($identificador);


</pre>

<hr />

<h2>Escribir un Archivo</h2>

<p>Por últimos vamos a ver como podemos escribir información en un archivo, para esto hacemos uso de la función <strong>fwrite()</strong>. Esta función recibe como parámetros el identificador del archivo en el cual deseamos escribir y el texto o contenido a escribir. Como respuesta devuelve el número de bytes escritos o False si se produjo un error al escribir. Veamos un ejemplo:</p>

<pre>$identificador = fopen('archivo.txt', 'a');

// write escribe de manera continua en el archivo y no hace brinco de linea por si solo
fwrite($identificador, 'Primeras palabras ');

// para ejecutar un brinco de linea se puede usar la constante PHP_EOL(php_end_of_line)
fwrite($identificador, 'Segundas palabras'.PHP_EOL);

fwrite($identificador, 'Nueva linea');

fclose($identificador);

</pre>

<hr />

<h2>Conclusión</h2>

<p>Hemos aprendido las funciones básicas para el manejo de archivos, prueba utilizando los diferentes modos de apertura de los archivos y así quedara claro para que sirve cada uno. Cualquier duda o comentario estaré atengo a la sección de comentarios.</p>
