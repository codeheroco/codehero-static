---
layout: post
status: publish
published: true
title: Filtros Parte I
author: Ramses Velasquez
author_login: ramses
author_email: cotufa9@gmail.com
wordpress_id: 2708
wordpress_url: http://codehero.co/?p=2708
date: 2013-11-28 00:03:07.000000000 -04:30
categories:
- Cursos
- Laravel
tags:
- php
- laravel
- filtros
---
<p>En este nuevo capítulo de Laravel vamos a hablar de los filtros. Estos son reglas que se pueden aplicar antes y/o después de ejecutarse la acción de una ruta, normalmente encontraras los filtros que se aplican antes un poco más útiles que los que se aplican después. Usar estos filtros pueden cambiar el flujo de la aplicación si ciertas condiciones cumplen. Laravel permite utilizar filtros que ya vienen predefinidos o crear nuestros propios filtros.</p>

<hr />

<h2>Crear un Filtro</h2>

<p>Vamos a crear un filtro para entender mejor de que manera funcionan. Los filtros se pueden crean en cualquier parte del archivo <code>app/filters.php</code>, así que vamos a agregar el siguiente código.</p>

<pre>Route::filter('filtro_antes',function(){
    $numero = rand(1, 3 );
    echo 'Imprimiendo en el filtro antes '.$numero.' <br />';
    if ( $numero == 2){
        return 'Filtro retorna un texto, por lo tanto cambio el flujo';
    }
});

Route::filter('filtro_despues',function(){
    echo 'Imprimiendo en el filtro despues<br />';
});

</pre>

<p>Aquí tenemos nuestros primeros dos filtros, como podemos ver los filtros se declaran con la función <strong>filter()</strong> de la clase <strong>Route</strong>. Esta función recibe dos parámetros, el primero es el nombre del filtro y el segundo es la función que ejecutará el filtro cuando sea llamado. En este caso hemos llamado a los filtros filtro_antes y filtro_despues.</p>

<p>Cuando se ejecuta un filtro antes de que se ejecute la acción de la ruta pueden ocurrir dos cosas, que la función retorne alguna respuesta o que no retorne nada. Si la función retorna algún dato, entonces eso sera lo que se enviara al usuario como respuesta y la ejecución que debía hacer la ruta no se llevara acabo. En cambio, cuando la ejecución del filtro termina, pero sin retornar nada entonces se llevará acabo la ejecución de la acción de la ruta. En otras palabras, un filtro sirve para alterar el flujo de la aplicación o para ejecutar algún código pero permita que el flujo continue como estaba previsto.</p>

<hr />

<h2>Utilizar un Filtro</h2>

<p>Para que un filtro sea util debemos aplicarlo a una ruta y decirle si el filtro se debe aplicar antes o después de que la acción de la ruta sea ejecutada. Veamos un ejemplo de como se aplica un filtro a una ruta.</p>

<pre>// archivo routes.php

Route::get('/', 
            array(  
                    // momento_del_filtro => nombre_del_filtro
                    'before'=>'filtro_antes',
                    'after'=>'filtro_despues'
                    // acción que ejecuta la ruta
                    function(){
                        echo 'Pagina principal.'
                    }
                 )
          );
</pre>

<p>Como podemos observar para aplicar un filtro a una ruta solo debemos colocar un array asociativo en el que irán los filtros que se deseen aplicar y la acción a ejecutarse en la ruta.</p>

<p>En este caso vamos a aplicar el filtro <strong>filtro_antes</strong> que creamos anteriormente, en el cual se puede observar como se puede afectar el flujo de la aplicación. El filtro ejecuta un código y dependiendo de la condición que tiene, en este caso un numero aleatorio, puede ejecutar un <strong>return</strong>. En caso de que el número aleatorio sea 2 y se ejecute el return no se ejecutara la acción de la ruta. En caso contrario que el numero no sea 2, entonces el flujo de la aplicación continuara de manera normal. Para entender mejor esto probemos varias veces la misa ruta y veamos los diferentes resultados.</p>

<hr />

<h2>Utilizar Multiples Filtros</h2>

<p>Para aplicar diferentes filtros a una misma ruta solo se colocan los nombres de los filtros en un array asociativo luego del tipo de filtro (before o after) que se desee aplicar. Veamos un sencillo ejemplo de esto.</p>

<pre>Route::get('/', 
            array(  
                    'before'=>array('filtro_1', 'filtro_2', 'filtro_3'),
                    function(){
                        echo 'Pagina principal.'
                    }
                 )
          );

</pre>

<hr />

<h2>Filtros Globales</h2>

<p>Laravel también posee dos filtros globales que siempre se ejecutan sin importar que ruta sea solicitada, uno se ejecuta antes y el otro después de la ejecución de la ruta. Estos dos filtros también se encuentran en <code>app/filters.php</code> y ya vienen declarados por Laravel. Incluso el primero se ejecuta antes que todos los filtros <strong>before</strong> y el segundo después que todos los filtros <strong>after</strong>. Son útiles para llevar acciones que siempre sean necesarias ejecutar en todos los métodos de nuestra aplicación, como por ejemplo la actualización de un log de peticiones al servidor.</p>

<pre>App::before(function($request)
{
  /*
     Código que se ejecuta siempre antes de cualquier ruta y 
     cualquier filtro before

     Podemos observar que este filtro recibe un parámetro llamado $request
     Esta variable contiene toda la información que nos proporciona 
     el framework acerca de la solicitud que hizo el usuario, 
     como por ejemplo la ruta solicitada. 
   */
});
 
App::after(function($request, $response)
{

  /*
      Código que se ejecuta siempre después de cualquier ruta
      y cualquier filtro after
      
      Este filtro posee un segundo parámetro $response el cual contiene
      información con la respuesta que sera enviada al usuario. 
      
      Podemos utilizar la función var_dump para visualizar todos los 
      datos que contienen estas dos variables 
   */

});
</pre>

<hr />

<h2>Conclusión</h2>

<p>Hemos aprendido los aspectos básicos de que nos ofrecen los filtros en Laravel. Lo importante de este capítulo es tener claro cuando se ejecuta cada filtro y que consecuencia puede traer o que beneficios le pueden aportar al flujo de nuestra aplicación. En el siguiente capítulo explicaremos como hacer grupos de filtros y como pasar parámetros a los mismos. Recomiendo que prueben diferentes filtros after y before en diferentes situaciones para comprender totalmente el funcionamiento de los mismos. Cualquier duda estaré atento a la sección de comentarios.</p>
