---
layout: post
status: publish
published: true
title: Filtros Parte II
author: Ramses Velasquez
author_login: ramses
author_email: cotufa9@gmail.com
wordpress_id: 2833
wordpress_url: http://codehero.co/?p=2833
date: 2013-12-10 00:03:12.000000000 -04:30
categories:
- Cursos
- Laravel
tags:
- php
- laravel
- filtros
---
<p>En este nuevo capítulo de Laravel 4 continuaremos con el estudio de los filtros, recordando que en el pasado aprendimos como crear filtros y como aplicarlos a una ruta. Ahora obtendremos conocimientos de como pasar parámetros a los filtros y como aplicar un filtro a varias rutas a la vez.</p>

<hr />

<h2>Parámetros de Filtros</h2>

<p>Así como cualquier función de PHP, los filtros de Laravel pueden recibir parámetros. Esto permite que sean más flexibles y se pueda evitar repetir código. Veamos un ejemplo.</p>

<pre>//app/filters.php

// Filtro Before
Route::filter('filtro_con_parametro_before',function($route,$request){
});

// Filtro After
Route::filter('filtro_con_parametro_after',function($route,$request,$response){
});

</pre>

<p>Primero que nada vamos a observar que Laravel por defecto pasa a los filtros unos parámetros básicos, dos de estos parámetros que observamos en el código ya los explicamos en el capítulo anterior cuando vimos los filtros globales y son <strong>$request</strong> y <strong>$response</strong>. Ahora como estos filtros no son globales Laravel envía un parámetro más al filtro que contiene la información de la ruta actual que se esta ejecutado, este parámetro es <strong>$route</strong>. Por lo tanto ya tenemos información muy importante que Laravel nos proporciona en los filtros.</p>

<p>¿Pero que sucede si queremos pasar algún parámetro con información nuestra? Pues Laravel también lo permite, en realidad podemos pasar todos los parámetros que queramos o necesitemos siempre y cuando primero tengamos los parámetros que Laravel define por defecto (<strong>route</strong>, <strong>request</strong> y dependiendo si es before o after el <strong>response</strong>). Veamos un ejemplo de como utilizar los parámetros definidos por nosotros.</p>

<pre>//app/filters.php

// Filtro Before
Route::filter('filtro_con_parametro_before',function($route,$request,$parametro){

    echo 'El parametro es: '.$parametro;

});

// Filtro After
Route::filter('filtro_con_parametro_after',function($route,$request,$response, $parametro){
});

</pre>

<p>Para pasar el parámetro al filtro debemos colocar dos puntos <strong>:</strong> justo después del nombre del filtro a utilizar y luego el valor del parámetro. Veamos un ejemplo:</p>

<pre>//app/routes.php

// en este caso vamos a pasar un parametro con valor 1
Route::get('/',
            array( 
                'before' => 'filtro_con_parametro_before:1', 
                function(){
                    echo 'Se llamo al filtro con parametro'; 
                }
            ));
</pre>

<p>Puede que sea necesario tener varios parámetros, para esto simplemente declaramos todos los que necesitemos en el filtro.</p>

<pre>Route::filter('filtro_con_parametro_before',function($route,$request,$parametro1, $parametro2, $parametro3){
});

</pre>

<p>En el caso que sean muchos parámetros entonces separamos los valores con una coma (<strong>,</strong>) al momento de llamar al filtro, siempre después de los dos puntos que van al final del nombre del filtro.</p>

<pre>Route::get('/',
            array( 
                'before' => 'filtro_con_parametro_before:1,2,3', 
                function(){
                    echo 'Se llamo al filtro con parametros'; 
                }
            ));

</pre>

<p>Los parámetros que recibe la función se pueden poner opcionales y así pasarlos cuando llamemos al filtro solo si estos son necesarios. Para que sean opciones el parámetro debe tener un valor por defecto asignado al momento de declarar la función. En caso de que no se pase algún parámetro a la función esta utilizara el valor que se le definió cuando se declaro.</p>

<pre>Route::filter('filtro_con_parametro_opcional',function($route,$request,$parametro_obligatorio, $parametro_opcional = 'valor'){
// en este caso podemos observar como declaramos 'valor' como valor por defecto del parámetro
// si el parámetro no es enviado a la función esta tomara el valor por defecto

});

</pre>

<hr />

<h2>Grupos de filtros</h2>

<p>En muchos casos vamos a tener la necesidad de aplicar un mismo filtro a muchas rutas, como por ejemplo un filtro para rutas de administrador. Para esto Laravel nos permite agrupar varias rutas bajo un mismo filtro o varios filtros. Es mucho mas eficaz y sencillo escribir una sola vez el nombre del filtro y agrupar las rutas que lo necesiten, que tener que repetir el nombre del filtro en todas las rutas individuales. Para lograr esto tenemos que crear un grupo de rutas para lo cual utilizamos la función <strong>group</strong> de la clase <strong>Route</strong>. Esta función recibe como parámetros los filtros que queremos aplicar a las rutas que componen el grupo y las rutas que tendrá el grupo.</p>

<pre>//routes.php

// El primer parámetro que recibe es un arreglo con los filtros que se neceisten 
// en caso de que sean varios filtros entonces se colocan con un arreglo

// El segundo parámetro es una función en la cual se declaran las rutas de la misma manera que se declaran si no estuvieran en un grupo

Route::group(array('before' => 'nombre_de_filtro'), function()
{
    Route::get('/', function()
    {
       // código de la ruta
    });

    Route::get('otra_ruta', array('uses' => 'OtroController@otroMetodo'));
});

</pre>

<p>Si se necesitan aplicar filtros específicos a las rutas que están dentro de el grupo se pueden aplicar siguiendo la misma sintaxis que las rutas que no están dentro de los grupos.</p>

<hr />

<h2>Patrones de Filtros</h2>

<p>Otra alternativa para aplicar un filtro a muchas rutas son los patrones de filtro. Estos funcionan asignando un filtro a todas las rutas que comienzan con una ruta definida en el patron. Para asignar un filtro a un patron utilizamos la función <strong>when()</strong> de la clase <strong>Route</strong>, en donde primero pasamos el patrón de filtro que queremos utilizar y luego el filtro que vamos a aplicar. Veamos un ejemplo para entender esto de mejor manera.</p>

<pre>//app/routes.php
Route::when('administrador/*','filtro_administrador');

// administrador/* es un patrón, este nos dice que el filtro se aplique a todas las rutas 
// que tengan administrador/ al principio, por ejemplo. 

// administrador/ver
// administrador/editar
// administrador/ver/12
</pre>

<hr />

<h2>Conclusión</h2>

<p>En este capítulo terminamos de conocer las opciones que nos brindan los filtros en Laravel 4. Ahora tenemos recursos para pasarle parámetros y agrupar diferentes rutas bajo un mismo filtro, de esta manera ninguna necesidad o por lo menos casi ninguna necesidad queda al aire con este gran framework. Cualquier duda o comentario estaré atento en la sección de comentarios.</p>
