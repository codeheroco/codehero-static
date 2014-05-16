---
layout: post
status: publish
published: true
title: Rutas & Blade
author: Ramses Velasquez
author_login: ramses
author_email: cotufa9@gmail.com
date: 2013-08-20 00:00:47.000000000 -04:30
serie: Laravel 4 desde Cero
description: Tutorial para el aprendizaje de las rutas en Laravel 4 y la utilizacion de la libreria de plantillas Blade
dificultad: novato
duracion: 20
categories:
- Cursos
- Laravel
tags:
- php
- vistas
- laravel
- laravel 4
- rutas
- routes
- views
- blade
---
<p>En el pasado capitulo de esta serie estudiamos la estructura de un proyecto de Laravel 4 y creamos una lista de usuarios. En este capitulo continuaremos con esa lista de usuarios, pero esta vez crearemos un formulario para crear un nuevo usuario y un enlace en la lista para ver la información detalla de cada uno. Con esto obtendremos mas conocimientos sobre las rutas y las vistas, utilizando Blade, en Laravel 4.</p>

<hr />

<h2>Controlador</h2>

<p>Para comenzar crearemos los métodos necesarios en el controlador de <strong>UsuariosController.php</strong>. En este caso necesitamos tres métodos nuevos, los cuales servirán para mostrar el formulario, crear un nuevo usuario y mostrar a un usuario. Con esto el controlador debe quedar de la siguiente manera:</p>

```php
<?php

class UsuariosController extends BaseController {

    /**
     * Muestra la lista con todos los usuarios
     */
    public function mostrarUsuarios()
    {
        $usuarios = Usuario::all();
        return View::make('usuarios.lista', array('usuarios' => $usuarios));
    }

    /**
     * Muestra formulario para crear Usuario
     */
    public function nuevoUsuario()
    {
        return View::make('usuarios.crear');
    }

    /**
     * Crear el usuario nuevo
     */
    public function crearUsuario()
    {
        Usuario::create(Input::all());
    // el método create nos permite crear un nuevo usuario en la base de datos, este método es proporcionado por Laravel
    // create recibe como parámetro un arreglo con datos de un modelo y los inserta automáticamente en la base de datos
    // en este caso el arreglo es la información que viene desde un formulario y la obtenemos con el metido Input::all()

        return Redirect::to('usuarios');
    // el método redirect nos devuelve a la ruta de mostrar la lista de los usuarios

    }

    /**
     * Ver usuario con id
     */
    public function verUsuario($id)
    {
    // en este método podemos observar como se recibe un parámetro llamado id
    // este es el id del usuario que se desea buscar y se debe declarar en la ruta como un parámetro

        $usuario = Usuario::find($id);
        // para buscar al usuario utilizamos el metido find que nos proporciona Laravel
        // este método devuelve un objete con toda la información que contiene un usuario

    return View::make('usuarios.ver', array('usuario' => $usuario));
    }

}
?>
```

<p>Cuando utilizamos el método <strong>create</strong> estamos haciendo asignación en masa y por medidas de seguridad Laravel nos pide que le especifiquemos cuales son los campos en cada modelo que se puede asignar o insertar de esa manera. Es se hace colocando un arreglo con los campos que se necesiten en la variable <strong>$fillable</strong> en los modelos que queramos utilizar.</p>

<p>En nuestro caso estamos haciendo uso del modelo de Usuario, por lo tanto debemos abrir el archivo de ese modelo y después de la variable <strong>$table</strong> colocar el siguiente código <code>protected $fillable = array('nombre', 'apellido');</code>. Con esto ya vamos a poder crear un usuario con su nombre y apellido haciendo uso del método <strong>create</strong>.</p>

<hr />

<h2>Rutas</h2>

<p>Ya con el controlador listo con todas las acciones que necesitamos vamos a pasar a crear las rutas para acceder a esas acciones, para esto nuestro archivo <strong>routes.php</strong> debe quedar de la siguiente manera:</p>

```php
<?php
Route::get('/', function()
{
    return Redirect::to('usuarios');
});

Route::get('usuarios', array('uses' => 'UsuariosController@mostrarUsuarios'));

Route::get('usuarios/nuevo', array('uses' => 'UsuariosController@nuevoUsuario'));

Route::post('usuarios/crear', array('uses' => 'UsuariosController@crearUsuario'));
// esta ruta es a la cual apunta el formulario donde se introduce la información del usuario
// como podemos observar es para recibir peticiones POST

Route::get('usuarios/{id}', array('uses'=>'UsuariosController@verUsuario'));
// esta ruta contiene un parámetro llamado {id}, que sirve para indicar el id del usuario que deseamos buscar
// este parámetro es pasado al controlador, podemos colocar todos los parámetros que necesitemos
// solo hay que tomar en cuenta que los parámetros van entre llaves {}
// si el parámetro es opcional se colocar un signo de interrogación {parámetro?}

?>
```

<hr />

<h2>Vistas</h2>

<p>En esta oportunidad aprenderemos como crear un archivo de plantilla en Laravel, para esto haremos uso de las funciones que nos proporciona Blade.</p>

<h3>Vista Master</h3>

<p>Primero crearemos la carpeta <strong>layouts</strong> dentro de la carpeta <strong>views</strong>, luego dentro de esta crearemos nuestro <strong>master.blade.php</strong> con el siguiente código.</p>

```html
{% raw %}

<html>
    <body>
        @section('sidebar')
            Codehero Laravel 4 Gestión de Usuarios -
        @show

        <div class="container">
            @yield('content')
        </div>

    </body>
</html>

{% endraw %}
```


Como podemos observar esto es la estructura básica HTML de una página web que contiene las etiquetas `{% raw %}<html>{% endraw %}`, `{% raw %}<body>{% endraw %}` y `{% raw %}<div>{% endraw %}`. También podemos observar que hay unas funciones de Blade **@section**,**@show**, **@yield**, estas son las que nos van a ayudar a crear las plantillas mediante herencia y creación se secciones para no tener que repetir código HTML en cada vista que tengamos.

<p>En este archivo es donde debemos crear la estructura básica de nuestra sitio. Por ejemplo, menú, barras laterales, cabecera, pie de página, incluir los archivos javascript o css que siempre se van a usar. Es decir todo lo que siempre vamos a querer mostrar y que no queremos repetir en cada vista que vamos a crear, esto nos deja un gran camino libre a la hora de crear cada vista, ya que solo nos tenemos que concentrar en la parte que cambia.</p>

<p>En este ejemplo podemos ver dos secciones, la primera es <strong>@section('sidebar') @show</strong>, este tipo de sección sirve para poder completarla con mas código del que ya tiene. Es decir, al momento que creemos la vista vamos a poder llamar a esta sección, la cual ya posee algo de contenido (el cual esta dentro de @section y @show) y ponerle mas contenido si así lo deseamos. Esto se vera mejor cuando veamos una de las vistas.</p>

<p>La otra sección es <strong>@yield('content')</strong>, podemos notar que esta solo es una sola linea, por lo tanto no tiene contenido previo. Cada vez que llamemos a esta sección desde la vista todo el contenido se incluirá en donde esta este declarada.</p>

<p>Podemos pensar en estas secciones como en una especie de variable que podemos llenar desde nuestras vistas con mas HTML.</p>




<h3>Vista listar</h3>

<p>Ahora vamos a nuestra vista <strong>listar.blade.php</strong> y vamos a modificarla un poco para quede de esta manera:</p>

```html
{% raw %}
@extends('layouts.master')

@section('sidebar')
     @parent
     Lista de usuarios
@stop

@section('content')
        <h1>Usuarios</h1>
        {{ HTML::link('usuarios/nuevo', 'Crear Usuario'); }}

<ul>
  @foreach($usuarios as $usuario)
        <li>{{ HTML::link( 'usuarios/'.$usuario->id , $usuario->nombre.' '.$usuario->apellido ) }}</li>
    @endforeach
</ul>
@stop

{% endraw %}
```

<p>Ahora podemos ver una función llamada <strong>@extends()</strong>, esta sirve para llamar a nuestra plantilla general llamada <strong>master.blade.php</strong>, como podemos ver no es necesario colocar las extensiones de los archivos ya que Blade buscara solo los archivos con extensión blade.php. Solo es necesario colocar las carpetas separándolas con punto(<strong>.</strong>).</p>

<p>Una vez que hayamos extendido de otro archivo Blade debemos completar las secciones (o variables, como mejor lo entiendan) que estén creadas en el archivo padre. Nuestro <strong>master.blade.php</strong> tiene dos secciones que debemos completar { @section('sidebar') y @yield('content') }. Anteriormente vimos que estos son dos tipos de secciones diferentes, ahora vamos a ver como les podemos incluir contenido a cada una.</p>

<p>Podemos observar que para las dos tipos de secciones la manera de completarlas es la misma. Abrimos la sección con el nombre que corresponda, escribimos el código que queramos incluir y cerramos con <strong>@stop</strong>. Pero si hay una diferencia entre las dos, la función <strong>@parent</strong>. Recordemos que la sección (sidebar) en nuestro archivo <strong>master</strong> tenia ya un contenido adentro, por lo tanto se nos da la opción de heredarlo o no. Esto lo hacemos escribiendo la función <strong>@parent</strong> dentro de la sección. Como podemos ver, todo el código que esta dentro de las dos secciones en esta vista será incluido en donde están las secciones en la vista master.</p>

<p>Lo ultimo que tenemos que tomar en cuenta en esta vista es la función estática <strong>link</strong>, la cual viene de la clase <strong>HTML</strong> de Laravel. Esta función nos permite crear un link <code><a href=""></a></code> de manera mas sencilla. El primer parámetro es la ruta, el segundo parámetro es el texto que va a contener y se le puede pasar un tercer parámetro con propiedades de html o css.</p>

<h3>Vista crear</h3>

<p>Para crear el usuario necesitamos un formulario el cual vamos a colocar en la vista <strong>crear.blade.php</strong>, esta vista la vamos a crear en nuestra carpeta <strong>views/usuarios/</strong> y escribiremos el siguiente código.</p>

```html
{% raw %}
@extends('layouts.master')

@section('sidebar')
     @parent
     Formulario de usuario
@stop

@section('content')
        {{ HTML::link('usuarios', 'volver'); }}
        <h1>Crear Usuario</h1>
        {{ Form::open(array('url' => 'usuarios/crear')) }}
            {{Form::label('nombre', 'Nombre')}}
            {{Form::text('nombre', '')}}
            {{Form::label('apellido', 'Apellido')}}
            {{Form::text('apellido', '')}}
            {{Form::submit('Guardar')}}
        {{ Form::close() }}
@stop
{% endraw %}
```

<p>En esta vista podemos notar que se hace uso de una clase <strong>Form</strong>, la cual nos ayuda a crear los elementos necesarios para utilizar en un formulario. Veamos que realiza cada función:</p>

- **Form::text**: Esta función crea una etiqueta `{% raw %}<input>{% endraw %}` de tipo **text**, el primer parámetro es el nombre de la etiqueta( propiedad name), el segundo parámetro es el valor que tiene el input(propiedad value), que en este caso es vacío. Por ultimo se le puede pasar un tercer parámetro con propiedades HTML o CSS.
- **Form::label**: Con esta función se crear una etiqueta `{% raw %}<label>{% endraw %}`, el primer parámetro es el nombre del campo al cual pertenece la etiqueta, el segundo es el texto que contiene y un posible tercer parámetro seria para propiedades de HTML o CSS.
- **Form::submit**: Para enviar el formulario es necesario crear un `{% raw %}<input>{% endraw %}` de tipo **submit**, solo recibe dos parámetros, el valor y el segundo opcional son las opciones HTML y CSS.
- **Form::close**: Por ultimo es necesario cerrar la etiqueta `{% raw %}<form>{% endraw %}`, esto se hace con esta función.

<h3>Vista Ver</h3>

<p>La ultima vista que vamos a crear será para ver la información se un usuario. En este caso será el nombre, apellido y la fecha en la que se creo. Para esto vamos a crear la vista <strong>ver.blade.php</strong> en <strong>views/usuarios/</strong> con el siguiente código.</p>

```html
{% raw %}
@extends('layouts.master')

@section('sidebar')
     @parent
     Información de usuario
@stop

@section('content')
    {{ HTML::link('usuarios', 'Volver'); }}
    <h1>Usuario {{$usuario->id}}</h1>
    {{ $usuario->nombre .' '.$usuario->apellido }}
    <br />
    {{ $usuario->created_at}}
@stop

{% endraw %}
```

<hr />

<h2>Crear y Ver Usuarios</h2>

<p>Ya hemos creado todo el código necesario, ahora solo nos queda probarlo creando usuario y viendo su información. Si abrimos el código fuente de las paginas que probamos podemos ver de una manera mas detallada como funciona las secciones de Blade y así terminar de entender su lógica.</p>

<hr />

<h2>Conclusión</h2>

<p>En esta oportunidad hemos aprendido un poco mas de las rutas y la librería Blade en Laravel 4. Recomiendo que experimentemos con las secciones y tratemos de ponerle algo de estilo al diseño de nuestro pequeño proyecto. Cualquier duda estaré atento de responderla en la sección de comentarios.</p>
