---
layout: post
status: publish
published: true
title: Instalación & Hello World
author: Ramses Velasquez
author_login: ramses
author_email: cotufa9@gmail.com
wordpress_id: 1370
wordpress_url: http://codehero.co/?p=1370
date: 2013-07-11 00:00:41.000000000 -04:30
categories:
- Cursos
- PHP
tags:
- php
- desde cero
- instalacion
- configuracion
comments:
- id: 194
  author: PHP+MYSQL | Pearltrees
  author_email: ''
  author_url: http://www.pearltrees.com/walticogt/php-mysql/id6070472#pearl84277427&amp;show=reveal,6
  date: '2013-07-18 14:48:13 -0430'
  date_gmt: '2013-07-18 19:18:13 -0430'
  content: '[...] PHP desde Cero: Instalación &amp; Hello World [...]'
---
<p>Bienvenido a PHP desde Cero, en esta serie de tutoriales aprenderemos a utilizar el lenguaje con el cual la mayoría de los sitios web están desarrollados. En este primer capítulo aprenderemos que es <strong>PHP</strong>, instalaremos un servidor de prueba y crearemos nuestro típico "Hola Mundo!".</p>

<h2>¿ Qué es PHP ?</h2>

<p><strong>PHP</strong> (<em>Acrónimo de "PHP: Hypertext Preprocessor"</em>) es un lenguaje de programación interpretado (scripts) que corre del lado del servidor, el cual fue diseñado para el desarrollo de sitios web dinámicos.</p>

<h3>Características:</h3>

<ul>
<li>PHP esta publicado bajo la Licencia PHP, la cual lo convierte en software libre. </li>
<li>Los archivos PHP deben estar guardados con la extensión <strong>.php</strong>. </li>
<li>Puede ser desplegado en la mayoría de los servidores web, incluyendo Apache y IIS.</li>
<li>Tiene una extensa documentación y comunidades en donde se puede buscar ayuda. </li>
<li>La última versión publicada es la 5.5.0. </li>
<li>PHP es utilizado en millones de sitios, entre los más destacados se encuentran Wikipedia.org, Facebook.com y Wordpress.com.</li>
<li>Permite ser incrustado en HTML, lo cual facilita el desarrollo de sitios web dinámicos. </li>
<li>Permite aplicar técnicas de POO(<em>Programación Orientada a Objetos</em>).</li>
<li>Posee la capacidad para conectares a la mayoría de los motores de base de datos, manipular archivos, utilizar servidores de correos e interactuar con otros lenguajes. </li>
</ul>

<hr />

<h2>¿ Cómo Funciona ?</h2>

<p>Ahora que sabemos que es PHP y sus principales características vamos a aprender que sucede cada vez que solicitamos al navegador ver una página en php:</p>

<ul>
<li>1 - El cliente (un navegador web) hace una petición a un servidor web para ejecutar algún script de php, por ejemplo <code>mipagina.com/contactos.php</code>.</li>
<li>2 - El servidor web recibe la petición y al verificar que la extensión es "php" hace una solicitud al intérprete de PHP para que este ejecute el script necesario. </li>
<li>3 - El intérprete de PHP realiza la ejecución de todas las instrucciones o sentencias que se encuentran en el archivo solicitado y pasa la respuesta al servidor web.</li>
<li>4 - El servidor web envía al cliente la respuesta que devolvió el script de php.</li>
<li>5 - El cliente muestra la respuesta en el formato que sea requerido (HTML, XML, PDF, JPEG, etc). </li>
</ul>

<p><a href="http://codehero.co/oc-content/uploads/2013/07/codehero_php_2.png"><img src="http://codehero.co/oc-content/uploads/2013/07/codehero_php_2-300x217.png" alt="codehero_php_2" class="aligncenter size-medium wp-image-1372" /></a></p>

<hr />

<h2>¿ Cómo se Instala ?</h2>

<p>En lo personal recomiendo utilizar uno de los "combos instaladores" que traen Apache (servidor web), MySQL (manejador de base de datos), PHP y Perl. Estos instaladores llevan el nombre de AMPP(Apache, Mysql, PHP y Perl) y facilitan mucho el trabajo a la hora de tener un servidor de prueba como el que necesitamos.</p>

<p>Para esta serie de tutoriales recomiendo descargar el instalador <a href="http://www.apachefriends.org/es/xampp.html">XAMPP</a>, el cual es multiplataforma y trae todo lo que necesitamos.</p>

<p>Después que tengamos instalado y corriendo nuestro pequeño servidor local tenemos que probarlo, para hacer esto ingresamos <code>http://localhost</code> en nuestro navegador. Si todo esta instalado debidamente entonces debemos ver un mensaje diciendo que funciona.</p>

<p>Una vez comprobado el funcionamiento del servidor tenemos que buscar la carpeta <strong>htdocs</strong>, en esta guardaremos todos los scripts PHP que queramos probar. Todo lo que esté en esta carpeta es accesible desde el navegador web a través del servidor web.</p>

<hr />

<h2>Nuestro Primer Script PHP</h2>

<p>En este primer capítulo aprenderemos PHP puro,es decir sin nada de HTML. Primero abrimos nuestro editor de texto favorito y escribimos el siguiente código.</p>

<pre><?php
   //comentario
   echo "Hola Mundo!"; 
?>
</pre>

<p>Ahora lo vamos a guardar en la carpeta del servidor que hemos instalado(en nuestro caso htdocs), el archivo debe estar guardado con extensión <strong>.php</strong>, vamos a llamarlo <strong>codehero.php</strong>. Por último vamos a probar desde el navegador lo que hemos creado, para esto escribimos en la barra de direcciones <code>http://localhost/codehero.php</code>. Si todo ha salido bien deberíamos ver la pantalla del explorador en blanco con el mensaje <strong>"Hola Mundo!"</strong>. Listo ya hemos creado y probado nuestro primer script de PHP.</p>

<p><a href="http://codehero.co/oc-content/uploads/2013/07/codehero_php_1.png"><img src="http://codehero.co/oc-content/uploads/2013/07/codehero_php_1.png" alt="codehero_php_1" class="aligncenter size-full wp-image-1371" /></a></p>

<p>Ahora veamos poco a poco que significa todo esto:</p>

<ul>
<li><p>Cada vez que vayamos a utilizar código PHP debemos encerrar el mismo entre las etiquetas <strong><?php** para abrir y **?></strong> para cerrar, de esta manera el intérprete sabe donde hay instrucciones PHP.</p></li>
<li><p>La línea que empieza con <strong>//</strong> es un comentario, este tipo de líneas son omitidas por PHP al momento de la ejecución. Sirven para tener el código organizado y documentado.</p></li>
<li><p>La primera función que vamos a ver en PHP es <code>echo</code>, esta sirve para imprimir texto en la pantalla. El texto que se quiera imprimir se coloca a la derecha de la función, puede ser una variable o un texto constante entre comillas. En este caso el texto que imprimiremos será <strong>"Hola mundo!"</strong>.</p></li>
<li><p>Al igual que en otros lenguajes como C, Java o JavaScript, toda instrucción en PHP se debe terminar con un <strong>";"</strong>. En este caso solo tenemos una instrucción <code>echo "Hola Mundo!";</code>.</p></li>
</ul>

<p>Este es el ejemplo mas básico que podemos ver de PHP, pero nos sirve para verificar y entender el funcionamiento de este lenguaje.</p>

<p>Un archivo con código PHP se puede crear desde cualquier editor de texto, pero siempre es mas práctico tener un editor o IDE (Entorno de Desarrollo Integrado) especializado para que nos ayude con la sintaxis y los errores. Aquí les dejo una lista de mis tres editores favoritos, por supuesto son gratis:</p>

<ul>
<li><a href="https://netbeans.org/">Netbeans</a> (Multiplataforma) </li>
<li><a href="http://sublimetext.com">Sublime Text 2</a> (Multiplataforma)</li>
<li><a href="http://notepad-plus-plus.org">Notepad ++</a> (Windows) </li>
</ul>

<hr />

<h2>Ejemplo Más Útil</h2>

<p>Veamos un ejemplo de algo más útil que podemos hacer con PHP.</p>

<pre><?php
   $edad = 19;
   if( $edad >= 19){
      echo "Eres mayor de edad!";
   }else{
      echo "Eres menor de edad!";
   }
?> 
</pre>

<p>Te invito a que intentes deducir lo que realiza este código. Quizás no lo entiendas todo en este momento pero conforme avance el curso iremos explicando todo lo que ves en este ejemplo.</p>

<hr />

<h2>Conclusión</h2>

<p>En este primer contacto con PHP obtuvimos conocimientos teóricos necesarios para entrar al mundo de este lenguaje. Hemos aprendido sus principales características y que es la "magia" que sucedes cada vez que se hace una solicitud a un script de PHP. Por último instalamos nuestro servidor local y probamos nuestro primer script PHP, muy básico pero necesario a la hora de aprender cualquier nuevo lenguaje.</p>

<p>Si tienen alguna duda estaré feliz responder en los comentarios. Espero que continúen aprendiendo PHP con esta serie de tutoriales.</p>
