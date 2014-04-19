---
layout: post
status: publish
published: true
title: Validaciones Parte I
author: Ramses Velasquez
author_login: ramses
author_email: cotufa9@gmail.com
date: 2013-10-15 00:00:04.000000000 -04:30
serie: Laravel 4 desde Cero
description: Tutorial para aprender las carateristicas y usos de la clase Validator en Laravel 4 que tiene como proposito crear validaciones de manera sencilla.
dificultad: novato
duracion: 20
categories:
- Cursos
- Laravel
tags:
- php
- laravel
- laravel 4
- Validaciones
- validator
---
<p>En este nuevo capítulo de Laravel 4 vamos a aprender como utilizar la librería <strong>Validator</strong>. Esta nos permite validar todos los datos que el usuario introduce en nuestra aplicación, de una manera muy sencilla. Siempre es importante validar los datos del lado del servidor, ya que el usuario puede anular las validaciones de Javascript y podría comprometer nuestra aplicación.</p>

<p><strong>Validator</strong> nos permite validar los datos definiendo ciertas reglas y retornar mensajes de error, veamos un primer ejemplo:</p>

```php
<?php
$datos = array('nombre' => 'Pedro');
$validaciones = array('nombre' => array('required', 'min:5'));

$validator = Validator::make($datos, $validaciones);

if ( $validator->fails() ){
    echo 'Datos Inválidos!';
}else{
    echo 'Datos Validos!';
}

?>
```

<p>Vamos a tratar de entender de que trata este ejemplo, en el que se valido que el dato <strong>nombre</strong> sea requerido y tenga mínimo 5 letras. Primero que nada tenemos dos arreglos, el primero es un arreglo con datos (que serian datos de un formulario) y el segundo tiene un arreglo con validaciones que van a ser aplicadas a los datos del primer arreglo. Cuando queramos aplicar las validaciones hacemos uso de la función estática <strong>make</strong> de la clase <strong>Validator</strong>, esta función toma como primer parámetro el arreglo con datos y como segundo el arreglo con validaciones. El método <strong>make</strong> devuelve un objeto que contiene toda la información que necesitamos para evaluar de los campos que no hayan pasado las validaciones. Por último utilizando la función <strong>fails</strong> que nos proporciona el objeto que tenemos, podemos saber si la validación fallo o no. En caso de que falle ya veremos como obtener información de interés.</p>

<hr />

<h2>Declarar Validaciones</h2>

<p>Ya sabemos que la clase <strong>Validator</strong> utiliza un arreglo de datos y otro de validaciones, veamos como se declaran las validaciones y como combinar varias.</p>

<p>Cuando tenemos que validar un campo, es una buena idea tener una lista de reglas que el campo debe tener para ser válido. De esta manera valida Laravel los datos, utiliza una lista (un arreglo) de validaciones (reglas) y las revisa todas para comprobar si un dato es válido o no.</p>

<p>La llave de cada posición del arreglo es el nombre del campo al cual se le desea aplicar una validación y el valor es la validación que se desea aplicar. El valor también puede ser un arreglo en caso de que se deseen aplicar varias validaciones a un mismo campo. Veamos un ejemplo de como declarar algunas reglas de validación:</p>

```php
<?php
$validacion_1 = array('nombre'=>'requiered');
//Una sola validación que se aplica al campo 'nombre' y verifica que no sea nulo

$validacion_2 = array('nombre'=>'min:5');
//Una sola validación que se aplica al campo 'nombre' y verifica que tenga mínimo 5 caracteres
//Con esto podemos ver que se pueden pasar 'parámetros' a las validaciones, en este caso un 5

$validacion_3 = array('nombre'=> array('required', 'min:5') );
//En este caso hay dos validaciones que aplican al campo 'nombre'

$validacion_4 = array(
                'nombre'=>array('required', 'min:5') ,
                'edad'=>'integer'
                );
// en este caso hay varias validaciones que se aplican a dos campos
// el primero es 'nombre' y se verifica que no sea nulo y mínimo 5 caracteres
// el segundo es 'edad' y se verifica que sea un numero entero

?>
```

<p>Esto nos da una idea de como se deben agrupar todas las validaciones dependiendo de los campos que manejemos, mas adelante conoceremos las reglas mas importantes que tiene Laravel.</p>

<p>Hay que tener en cuenta que todas las validaciones se revisan, si un campo llega a fallar en la primera validación igual Laravel verifica todas las demás. Esto sirve para poder saber en cuales falla y no solo en cual fallo primero.</p>

<p>Algunas de estas reglas son:</p>

<ul>
<li><strong>alpha</strong>: Esta regla verifica que el dato contenga puros caracteres alfabéticos. </li>
<li><strong>alpha_num</strong>: Esta regla verifica que el dato contenga solo caracteres alfabéticos o numéricos. </li>
<li><strong>in</strong>: Sirve para verificar que el campo contenga un valor que se encuentre dentro de una lista. <code>'nombre_campo' =>; 'in:rojo,verde,gris'</code></li>
<li><strong>min</strong>: Verifica que un número sea mayor que el valor que se establece, en caso de ser un String entonces se valida la cantidad de caracteres. <code>'nombre_campo' => 'min:5'</code></li>
</ul>

<hr />

{% include middle-post-ad.html %}

<h2>Mensajes de Validaciones</h2>

<p>Luego de que hemos aplicado las reglas que necesitemos a los campos que debamos verificar, es necesario que sepamos que campos no pasaron las reglas en caso de que tuvieran datos incorrectos. Para esto Laravel tiene mensajes predeterminados por cada regla de validación que se aplica y estos mensajes se guardan en el objeto que devuelve <strong>make</strong>. Veamos un ejemplo de esto y como se utilizan:</p>

```php
<?php
$datos = array('nombre' => 'Pedr', 'edad'=>'sin edad');
$validacion = array(
            'nombre'=>array('required', 'min:5'),
            'edad'=>'integer'
            );

$validator = Validator::make($datos , $validacion);

if ($validator->fails())
{
    $mensajes = $validator->messages();
    foreach ($mensajes->all() as $mensaje){
        echo $mensaje.'</br>';
    }
}else{
    echo 'Datos Correctos';
}
?>
```

<p>Lo primero que vamos a notar es que los mensajes están en ingles, lo cual vamos a cambiar a continuación, pero veamos que sucede en este código.</p>

<p>El código va a mostrar dos mensajes de error, el primero señalando que el campo nombre debe tener por lo menos 5 caracteres y el segundo que el campo edad debe ser un número entero.</p>

<p>También es posible mostrar solo los mensajes de un campo en específico y revisar si el campo tiene mensajes, en este caso vamos a ver un ejemplo con el campo edad:</p>

```php
<?php
if ($mensajes->has('edad')){
    foreach ($mensajes->get('edad') as $mensaje){
        echo $mensaje.'</br>';
    }
}
?>
```

<p>Ahora vamos a crear nuestros mensajes en español, primero vamos a cambiar el idioma general de la aplicación en la configuración del proyecto. Para esto tenemos que ir al archivo de configuración <strong>app.php</strong> que se encuentra en la carpeta <code>app/config/</code>. En este archivo debemos buscar la propiedad <code>'locale' =&gt; 'en'</code> y ponerla en español <code>'locale' =&gt; 'es'</code></p>

<p>De ahora en adelante nuestra aplicación buscara los mensajes y los textos en la carpeta de textos de español, pero estos textos no existen porque Laravel 4 esta todo en ingles, así que vamos a crear estos textos. Para esto vamos a la carpeta <code>app/lang</code> y creamos otra carpeta que se llame <strong>es</strong>. En otro tutorial nos enfocaremos en explicar bien esta parte de internacionalización, pero por ahora veremos lo básico para tener nuestros mensajes de validación en español.</p>

<p>Ahora que tenemos esta carpeta vamos a crear un archivo PHP llamado <strong>validation.php</strong>, este va a contener los textos de validaciones en español. Para tener una base de cuales son los mensajes que debemos crear o modificar vamos a copiar el contenido original que tiene el de ingles, para esto vamos al archivo <code>app/lang/en/validation.php</code> copiamos su contenido y lo pegamos en el archivo <code>app/lang/es/validation.php</code> que acabamos de crear.</p>

<p>Pasemos a modificar el archivo <strong>validation.php</strong> de español para que nuestros errores de validación sean entendibles. Como podemos observar tenemos un arreglo con muchos textos en donde las llave del arreglo son nombres de reglas de validación de Laravel. Veamos un ejemplo de como modificar algún mensaje:</p>

```php
<?php
"integer" => "The :attribute must be an integer."

//Si tenemos un campo 'edad' y le aplicamos la regla integer el mensajes seria
//The edad must be an integener
//Tenemos que tomar en cuenta que laravel sustituirá el campo por :attribute

//Ahora vamos a traducir el mensaje

"integer" => "El campo :attribute debe ser un número entero."

//Con este mensajes Laravel nos mostraría el siguiente texto
//El campo edad debe ser un número entero

?>
```

<p>¿Ahora es mucho mas amigable cierto? Pues todavía nos queda algo mas para modificar y que sea mas fáciles de entender nuestros mensajes. Muchas veces queremos mostrar el mensaje de error pero sin decir el campo como esta declarado, si no alguna otra palabra mas explicativa. Por ejemplo, nuestro campo se puede llamar <strong>correo</strong> en el formulario, pero queremos que el usuario lo vea como <strong>Correo Electrónico</strong>. Para esto tenemos el arreglo <strong>attributes</strong> en el archivo de <strong>validation.php</strong>, veamos como funciona:</p>

```php
<?php
'attributes' => array(
    'nombre'=>'Primer Nombre',
    'correo'=>'Correo Electrónico',
    'direccion_casa'=> 'Dirección de Casa'
)
?>
```

<p>Laravel siempre cambiara el atributo con el nombre que se le y así los mensajes serán mas explicativos y elegantes.</p>

<hr />

<h2>Conclusión</h2>

<p>En este tutorial hemos aprendido un poco sobre las validaciones en Laravel 4. Como podemos ver no es difícil validar los datos si sabemos los propósitos y opciones de cada regla. Siempre es una buena opción validar los datos de el lado del servidor para así proteger nuestro sistema de datos inválidos. En el próximo capítulo veremos mas reglas de validación, como mostrar al usuario el error con el dato incorrecto, como redireccionar para mostrar los errores y aprenderemos a crear validaciones propias. Cualquier duda o aclaratoria estaré atento a la sección de comentarios.</p>
