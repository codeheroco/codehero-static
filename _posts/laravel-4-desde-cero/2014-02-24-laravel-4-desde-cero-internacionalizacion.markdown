---
layout: post
status: publish
published: true
title: Internacionalización
author: Ramses Velasquez
author_login: ramses
author_email: cotufa9@gmail.com
wordpress_id: 3057
wordpress_url: http://codehero.co/?p=3057
date: 2014-02-24 00:03:52.000000000 -04:30
categories:
- Cursos
- Laravel
tags:
- php
- laravel
---
<p>En este nuevo capítulo de Laravel veremos como este framework nos ayuda a crear sistemas en diferentes idiomas de manera sencilla. Hoy en día es importante que todos los grandes sistemas permitan ser utilizados con diferentes idiomas e intercambiar entre ellos fácilmente. Para poder lograr esto de la manera más escalable posible se deben tener todos los textos en archivos separados por cada idioma.</p>

<hr />

<h2>Archivos de Lenguajes</h2>

<p>Los archivos de texto deben ir en la carpeta <code>app/lang</code> y dentro de esta carpeta debe haber una carpeta por cada idioma. Veamos un ejemplo de como podría quedar nuestro directorio con archivos de texto para español e ingles.</p>

<pre>/app
    /lang
        /en
            textos.php
            mensajes.php
        /es
            textos.php
            mensajes.php
        /fr
            textos.php
            mensajes.php

</pre>

<p>Cada uno de estos archivos debe tener un arreglo con todos los textos que queramos tener en diferentes idiomas. Vamos a ver como serian estos arreglos.</p>

<pre><?php
    //app/lang/es/textos.php

return array(
    "bienvenido" => "Bienvenido a Codehero",
    "iniciar"    => "Iniciar Sesión",
    "cancelar"   => "Cancelar",
);
</pre>

<pre><?php
    //app/lang/en/textos.php
    
return array(
    "bienvenido" => "Welcome to Codehero",
    "iniciar"    => "Login",
    "cancelar"   => "Cancel",
);
</pre>

<p>Como podemos observar cada texto tiene una clave igual en cada archivo. De esta manera solo tenemos que llamar a las claves y dependiendo del idioma que este seleccionado Laravel buscara el texto apropiado.</p>

<hr />

<h2>Uso de los Textos</h2>

<p>Para utilizar estos textos Laravel tiene la función <strong>Lang::get()</strong>, la cual debemos llamar en donde queramos imprimir alguno de los strings que tenemos en los archivos de idiomas.</p>

<pre>// el parámetro debe ser el nombre del archivo 
// seguido con el nombre del texto
// y separado por un punto
echo Lang::get('textos.bienvenido');

// Si el sistema esta en español esto nos devolverá
// Bienvenidos a Codehero

// Si el sistema esta en ingles esto nos devolverá 
// Welcome to Codehero

</pre>

<p>El framework busca el texto automáticamente en el archivo del idioma que tengamos establecido y si no lo consigue imprimir el parámetro. En caso de que queramos pasar un idioma determinado sin que busque el que esta establecido podemos pasarlo como parámetro:</p>

<pre>// pasamos el idioma como tercer parámetro 
// el segundo parametro se explicara en breve 

echo Lang::get('textos.bienvenido', array(), 'en');

// De esta manera obtenemos el texto de ingles sin importar 
// cual sea el idioma establecido en el sistema
</pre>

<hr />

<h2>Cambiar el idioma</h2>

<p>Para cambiar el idioma se utiliza la función <strong>App::setLocale</strong> a la cual se le pasa como parámetro el idioma que se desee utilizar.</p>

<pre>App::setLocale('en');
</pre>

<hr />

<h2>Textos con Parámetros</h2>

<p>En ocasiones nos conseguiremos con textos a los que debemos completar con nombres o números que pueden cambiar de posición dependiendo del idioma y valor dependiendo del momento que se usen. Para eso Laravel permite pasarle parámetros a los textos siempre y cuando se hayan definido en el archivo de texto. Vemos como funciona esta característica:</p>

<pre>//imaginemos que ahora en nuestro archivo textos.php
// en la carpetas es tenemos el siguiente texto en bienvenido

'bienvenido' => 'Bienvenido a Codehero, :nombre',

</pre>

<p>Como podemos observar al final tenemos <strong>:nombre</strong>, esto funciona como una especie de variable, la cual definimos al momento de llamar al texto. Para hacer esto utilizamos el segundo parámetro de la función <strong>Lang::get</strong>, el cual vimos anteriormente que era un arreglo vacío. En este arreglo ponemos el nombre de la variable que queramos utilizar y el valor que la vayamos a dar.</p>

<pre>echo Lang::get('textos.bienvenido', array('nombre'=>'Pedro Perez') );

// Esto devolvera el siguiente texto
// Bienvenido a Codehero, Pedro Perez

</pre>

<hr />

<h2>Texto Plurales</h2>

<p>Cuando tenemos textos que van a cambiar dependiendo de una variable numérica es tedioso tener que poner varios <strong>if</strong> para verificar que texto se colocara. Para esto laravel nos presenta la función <strong>Lang::choice</strong>, la cual nos facilita esta tarea. Veamos como se utiliza esta función:</p>

<pre>//app/lang/es/texto.php
'frutas'=>'{0} No hay frutas|[1,19] Hay Algunas frutas|[20,Inf] Hay muchas frutas :count',

</pre>

<p>Como podemos observar en el texto tenemos unos rangos y textos para cada rango, separados por (<strong>|</strong>). Para establecer texto para un solo numero colocamos el numero entre llaves {}, para establecer rangos colocamos el principio y el fin entre corchetes. Si queremos imprimir el numero utilizamos <strong>:count</strong>.</p>

<pre>// En la función choice primero pasamos el nombre del texto 
// y luego el numero a evaluar
Lang::choice('textos.frutas', 10);

</pre>

<hr />

<h2>Conclusiones</h2>

<p>En este capitulo hemos aprendido a utilizar las funciones para internacionalizar nuestra aplicación. Si lo hacemos uso de estas funciones desde que empezamos nuestros proyectos sera muy fácil tener aplicaciones en varios idiomas. Cualquier duda o comentarios estaré atento a la sección de comentarios.</p>
