---
layout: post
status: publish
published: true
title: Validaciones Parte II
author: Ramses Velasquez
author_login: ramses
author_email: cotufa9@gmail.com
date: 2013-10-29 00:15:10.000000000 -04:30
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
- Validaciones
---
<p>En este nuevo capítulo de Laravel 4 continuaremos aprendiendo como validar los datos que recibe nuestra aplicación. Ya conocemos algunas reglas de validación y en esta ocasión agrandaremos esta lista. Por último vamos a ver como mostrar al usuario los errores de cada campo y el dato incorrecto en el formulario.</p>

<hr />

<h2>Lista de Reglas</h2>

<p>Revisemos una lista con las reglas mas útiles que nos proporciona Laravel:</p>

<ul>
<li><strong>after</strong> (Fecha) - <strong>before</strong> (Fecha) : Las reglas <strong>after</strong> y <strong>before</strong> sirven para validar que un campo tenga una fecha mayor o menor que una fecha establecida. </li>
</ul>

```php 
<?php
array(
 'campo' => 'before:12/12/13'
);
?>
```

<ul>
<li><p><strong>alpha_dash</strong> : Esta regla verifica que el dato a validar contenga solo caracteres alfabéticos, numéricos, guiones (-) o guiones bajos (_).</p></li>
<li><p><strong>between</strong> : Esta regla verifica que el campo a validar esta dentro de los rangos de dos valores que tiene como parámetros. Si es un campo numérico entonces verifica el valor. Si el campo a validar es un archivo o cadena de caracteres verifica el peso o la longitud respectivamente.</p></li>
</ul>

```php 
<?php
array(
 'campo' => 'between:5,7'
);
?>
```

<ul>
<li><p><strong>date</strong> : Esta regla verifica que el dato en el campo sea una fecha, esto se hace mediante el método <strong>strtotime()</strong>.</p></li>
<li><p><strong>date_format</strong> : Al igual que la regla <strong>date</strong>, <strong>date_format</strong> verifica que el campo contenga una fecha pero con un formato específico que esta establecido en el parámetro.</p></li>
</ul>

```php 
<?php
array(
 'campo' => 'date_format:d/m/y'
);
?>
```

<ul>
<li><p><strong>email</strong> : Esta regla verifica que el campo contenga una dirección de correo con formato valido.</p></li>
<li><p><strong>image</strong> : Esta regla verifica si un archivo tiene formato de imagen, los formatos que toma como validos son .bmp, .gif, .jpeg o .png.</p></li>
<li><p><strong>mimes</strong> : Esta regla verifica que el formato de un archivo sea alguno de los que se pasa como parámetro.</p></li>
</ul>

```php 
<?php
array(
 'campo' => 'mimes:pdf,doc,docx'
);
?>
```

<ul>
<li><p><strong>numeric</strong> : Esta regla verifica que el campo contenga un valor numerico.</p></li>
<li><p><strong>regex</strong> : Esta regla verifica que el campo cumpla con la expresión regular que se pasa como parámetro.</p></li>
</ul>

```php 
<?php
array(
 'campo' => 'regex:[a-z]'
);
?>
```

<ul>
<li><strong>same</strong> - <strong>different</strong> : Sirven para verificar que un campo es igual o diferente que otro campo que se pasa el nombre como parámetro. </li>
</ul>

```php 
<?php
array(
 'campo' => 'same:campo1'
);
?>
```

<ul>
<li><strong>size</strong> : Esta regla acepta un número como parámetro y verifica que el valor del campo sea igual. Si el campo es un número entonces hace la comparación matemática, si es una cadena de caracteres hace la comparación con la longitud y si es un archivo entonces hace la comparación con el tamaño. </li>
</ul>

```php 
<?php
array(
 'campo' => 'size:8'
);
?>
```

<ul>
<li><strong>exists</strong> : Esta regla verifica que el campo que el valor del campo que se esta validando exista en una tabla de la base de datos. La tabla a consultar se pasa como primer parámetro y el campo a consultar en la tabla se pasa como segundo parámetro. </li>
</ul>

```php 
<?php
array(
    'campo' => 'exists:tabla,campo_tabla'
);
?>
```

<ul>
<li><strong>unique</strong> : Esta regla verifica que el valor del campo que se esta validando no exista en la base de datos. La tabla a revisar se pasa como primer parámetro y el campo de la tabla se pasa como segundo parámetro. Si se desean hacer excepción con algún valor entonces se pasan como parámetros los ids después del nombre del campo. </li>
</ul>

```php 
<?php
array(
    'campo' => 'unique:tabla,campo_tabla'
);

array(
    'campo' => 'unique:tabla,campo_tabla,4,3,2,1'
);
?>
```

<hr />

<h2>Mostrar Datos Incorrectos</h2>

<p>El usuario de un sistema no es adivino, por lo tanto cuando se equivoca hay que decirle donde se equivoco y la razón. Cuando un usuario introduce un dato incorrecto en un formulario es bueno poder marcar los campos incorrectos y mostrarle los datos que ya tenia. Laravel hace muy fácil esta tarea y a continuación vamos a aprender como se hace.</p>

<p>Primero vamos a crear un formulario con algunos campos ( No vamos a crear modelo, ni base de datos. Solo vamos a ver como validar y mostrar errores).</p>

```html
{% raw %}
{{ Form::open(array('url' => 'validar')) }}
<h1>Formulario</h1>

<div>
  {{ Form::label('nombre', 'Nombre: ')}}<br />
  {{ Form::text('nombre', '')}}    
</div>

<div>
  {{ Form::label('usuario', 'Usuario: ')}}<br />
  {{ Form::text('usuario', '')}}    
</div>

<div>
  {{ Form::label('correo', 'Correo: ')}}<br />
  {{ Form::text('correo', '')}}    
</div>

<div>
  {{ Form::label('edad', 'Edad: ')}}<br />
  {{ Form::text('edad', '' )}}      
</div>

<div>
  {{ Form::label('sexo', 'Sexo: ')}}<br />
  {{ Form::text('sexo', '')}}      
</div>

<div>
  {{ Form::submit('Enviar')}}      
</div>

{{ Form::close()}}
{%endraw%}
```

<p>Ahora que tenemos el formulario necesitamos dos rutas. La primera para mostrar el formulario y la segunda para procesar la información que envía el formulario.</p>

<p>En esta parte vamos a aprender dos funciones nuevas <strong>withErrors()</strong> y <strong>withInput()</strong> que vienen con la clase <strong>RedirectResponse</strong>. La primera sirve para pasar por Session a la siguiente vista (que será la vista anterior con el formulario) los errores que ocurrieron a la hora de validar el formulario, a esta función hay que pasarle como parámetro el objeto que devuelve <strong>Validator</strong>. La segunda función devuelve a la vista los valores de los campos que se enviaron en el formulario, para así volverlos a mostrar al usuario. Para entender mejor estas funciones vamos a revisar los códigos.</p>

```php 
<?php
Route::get('/', function(){
    
    // esta ruta solo servirá para llamar a la vista que contiene el formulario 
    return View::make('validaciones.formulario');
});


Route::post('validar', function(){
    // en esta ruta vamos a validar los datos del formulario
    

    // arreglo con todas las reglas de validación que se van a aplicar a los datos
    $reglas =  array(
        'nombre'  => 'required', 
            // validamos que el nombre sea un campo obligatorio 
        'usuario' => array('required', 'min:8'), 
            // validamos que el usuario sea un campo obligatorio y de mínimo 8 caracteres
        'correo'  => array('required','email'),
            // validemos que el correo sea un campo obligatorio y con formato de email
        'edad'    => array('integer','min:10'),
            // validamos que la edad sea un entero y mínimo sea el numero 10
        'sexo'    => 'in:m,M,f,F'
            // validamos que el sexo sea alguno de los siguientes caracteres (m, M, f , F)
    );

    $validator = Validator::make(Input::all(), $reglas);
    
    // aplicamos las reglas con la clase Validator como aprendimos anteriormente
    if ( $validator->fails() ){

        // en caso de que la validación falle vamos a retornar al formulario 
        // pero vamos a enviar los errores que devolvió Validator
        // y también los datos que el usuario escribió 
        return Redirect::to('/')
                // Aquí se esta devolviendo a la vista los errores 
                ->withErrors($validator)
                // Aquí se esta devolviendo a la vista todos los datos del formulario
                ->withInput();
    }else{
        echo 'Datos Validos!';
        exit;
    }
}); 

?>
```

{% include middle-post-ad.html %}

<p>Ya hemos verificado si los campos son correctos o incorrectos. ¿Pero ahora como le mostramos al usuario en que se equivoco? Para esto vamos a volver a nuestro formulario y vamos a editarlo un poco. Vamos a agregar funciones que reciban si hay error en cada campo y si es así entonces mostramos el mensajes de error. También vamos a mostrar los datos antiguos para que el formulario quede igual a como estaba antes de que el usuario lo enviara al servidor.</p>

<p>Hay que tener en cuenta que cuando hacemos uso de la función <strong>withErrors()</strong> Laravel guarda los errores en una variable llamada <strong>$errors</strong> que se puede utilizar desde la vista.</p>

<p>Para utilizar los datos que hemos mandado con la función <strong>withInput()</strong> llamamos a la función <strong>old()</strong> de la clase Input. A esta función se le pasa el nombre del dato que se desea utilizar.</p>

<p>Estas variables y funciones se pueden utilizar sin ningún problema aunque el formulario no tenga datos antiguo que manejar.</p>

```html 
{% raw %}
{{ Form::open(array('url' => 'validar')) }}
<h1>Formulario</h1>

<div>
  {{ Form::label('nombre', 'Nombre: ')}}<br />
   <!-- Con Input::old('nombre') podemos obtener y establecer el valor que puso el usuario en nombre -->
   {{ Form::text('nombre', Input::old('nombre'))}}
    
  <!-- con $errors->has('nombre') podemos verificar si hubo error en el campo nombre -->
   @if( $errors->has('nombre') )
     
  <!-- Aquí se puede agregar algún html para dar estilo -->            
  
  <!-- con $erros->get('nombre') obtenemos todos los errores que tenga nombre --> 
     @foreach($errors->get('nombre') as $error )
        
  <!-- Aquí mostramos los errores de nombre --> 
        
  <br />* {{ $error }}
     @endforeach
   @endif
  
</div>

<div>
  {{ Form::label('usuario', 'Usuario: ')}}<br />
          {{ Form::text('usuario', Input::old('usuario'))}}
          @if( $errors->has('usuario') )
              @foreach($errors->get('usuario') as $error )
                  <br />* {{ $error }}
              @endforeach
          @endif     
</div>   

<div>
  {{ Form::label('correo', 'Correo: ')}}<br />
          {{ Form::text('correo', Input::old('correo'))}}
          @if( $errors->has('correo') )
              @foreach($errors->get('correo') as $error )
                  <br />* {{ $error }}
              @endforeach
          @endif 
</div>

<div>
  {{ Form::label('edad', 'Edad: ')}}<br />
          {{ Form::text('edad', Input::old('edad') )}}
          @if( $errors->has('edad') )
              @foreach($errors->get('edad') as $error )
                  <br />* {{ $error }}
              @endforeach
          @endif      
</div>

<div>
  {{ Form::label('sexo', 'Sexo (M o F): ')}}<br />
          {{ Form::text('sexo', Input::old('sexo'))}}
          @if( $errors->has('sexo') )
              @foreach($errors->get('sexo') as $error )
                  <br />* {{ $error }}
              @endforeach
          @endif     
</div>

<div>
  {{ Form::submit('Enviar')}}    
</div>

{{ Form::close()}}
{% esndraw %}
```

<p>Ahora queda de parte de cada quien cambiar los mensajes a español como lo explicamos en el capítulo anterior y ponerle el estilo con CSS que cada quien desee a los errores para que se vean mas presentables.</p>

<h2>Conclusión</h2>

<p>Hoy hemos aprendido un poco mas de como validar formularios con Laravel 4. Espero que queden claro todos los conceptos y funciones, ya que es muy sencillo realizar las validaciones cuando se entiende bien todo el proceso. Cualquier duda o comentario estaré atento a la sección de comentarios.</p>
