---
layout: post
status: publish
published: true
title: Sesiones
author: Ramses Velasquez
author_login: ramses
author_email: cotufa9@gmail.com
date: 2014-01-24 00:00:39.000000000 -04:30
serie: Laravel 4 desde Cero
description: Tutorial para la creación de un registro e inicio de sesión con Laravel 4
dificultad: novato
duracion: 20
categories:
- Cursos
- Laravel
tags:
- php
- laravel
---
<p>En este nuevo capítulo de Laravel vamos a crear un sistema de Login para usuarios registrados. Hoy en día casi todo sistema web necesitan que el usuario ingrese utilizando un usuario o correo y una contraseña y Laravel nos ayuda en esta tarea. Con este framework verificar a un usuario es muy sencillo, para comprobar esto vamos a crear un registro de usuarios y un formulario para ingresar al sistema.</p>

<p>Lo primero que debemos hacer es crear en nuestra base de datos una tabla llamada usuarios con la siguiente estructura. Para mantenerlo sencillo solo registraremos nombre, correo y clave del usuario.</p>

```sql
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
```

<p>Con nuestra tabla creada en la base de datos vamos a pasar a crear la vista que estaremos usando para este tutorial, para esto creamos el archivo <code>login.blade.php</code> en la carpeta de <strong>views</strong>.</p>

```html
{% raw %}
<h2>Ingresar</h2>

@if (Session::has('mensaje_login'))
<span>{{ Session::get('mensaje_login') }}</span>
@endif

{{ Form::open(array('url' => 'login')) }}

    {{ Form::label('correo', 'Correo'); }}
    {{ Form::text('correo'); }}
    {{ Form::label('password', 'Clave'); }}
    {{ Form::password('password'); }}
    {{ Form::submit('Ingresar'); }}

{{ Form::close() }}

<h2>Registro</h2>
@if (Session::has('mensaje_registro'))
<span>{{ Session::get('mensaje_registro') }}</span>
@endif

{{ Form::open(array('url' => 'registro')) }}

    {{ Form::label('nombre', 'Nombre'); }}
    {{ Form::text('nombre'); }}
    {{ Form::label('correo', 'Correo'); }}
    {{ Form::text('correo'); }}
    {{ Form::label('password', 'Clave'); }}
    {{ Form::password('password'); }}
    {{ Form::submit('Registrar'); }}

{{ Form::close() }}
{% endraw %}

```

<p>Como podemos observar en la misma vista tenemos el formulario de login y el formulario de registro, de esta manera nos ahorramos un poco de trabajo para este tutorial.</p>

<p>Ahora vamos a crear el modelo para los usuarios que se registraran en el sistema y le colocamos el nombre <strong>Usuarios.php</strong>. En esta ocasión vamos a implementar una interfaz en el modelo, para que Laravel lo pueda usar para inicio de sesión. La interfaz a implementar sera UserInterface y a continuación podemos observar el código final del modelo.</p>

```php
<?php
// se debe indicar en donde esta la interfaz a implementar
use Illuminate\Auth\UserInterface;

Class Usuarios extends Eloquent implements UserInterface{

    protected $table = 'usuarios';
    protected $fillable = array('nombre', 'correo', 'password');

    // este metodo se debe implementar por la interfaz
    public function getAuthIdentifier()
    {
        return $this->getKey();
    }

    //este metodo se debe implementar por la interfaz
    // y sirve para obtener la clave al momento de validar el inicio de sesión
    public function getAuthPassword()
    {
        return $this->password;
    }

}
?>
```



<p>Con <strong>Usuarios.php</strong> creado y el código del mismo listo, vamos a pasar a decirle a Laravel que los usuarios y claves están en este modelo. Para esto debemos entrar al archivo de configuración <code>app/config/auth.php</code> y revisar dos parámetros. El primero sera <code>'driver'=>'eloquent'</code>, lo mas seguro es que ya este así y esto le dice a Laravel que vamos a utilizar un modelo para guardar los usuarios que harán login. El segundo parámetro sera <code>'model'=>'Usuarios'</code>, este le indica a Laravel que el modelo a utilizar es <strong>Usuarios</strong>.</p>

<p>El último paso que falta es crear las rutas y lógica que controlara todo lo que hemos hecho hasta ahora. Pero primero tenemos que entender que para un sistema con login tenga sentido deben haber rutas para las cuales se necesite haber iniciado sesión y otras que no. Esto en Laravel se hace de manera sencilla con los filtros y ya el framework tiene uno llamado <strong>auth</strong>. Este filtro se puede encontrar en el archivo <code>app/filers.php</code>. No es necesario ningún cambio pero siempre es bueno saber donde esta y para que sirve.</p>

<p>Ahora que tenemos esto claro podemos crear las rutas con la lógica de nuestro ejemplo de login. Para esto vamos a crear la siguientes rutas:</p>

```php
<?php
// esta sera la ruta principal de nuestra aplicación
// aquí va a estar el formulario para registrase y para inicio de sesión
// esta ruta debe ser publica y por lo tanto no debe llegar el filtro auth
Route::get('login', function(){
    return View::make('login');
});

// esta ruta sera para crear al usuario
Route::post('registro', function(){

    $input = Input::all();

    // al momento de crear el usuario la clave debe ser encriptada
    // para utilizamos la función estática make de la clase Hash
    // esta función encripta el texto para que sea almacenado de manera segura
    $input['password'] = Hash::make($input['password']);

    Usuarios::create($input);

    return Redirect::to('login')->with('mensaje_registro', 'Usuario Registrado');
});

// esta ruta servirá para iniciar la sesión por medio del correo y la clave
// para esto utilizamos la función estática attemp de la clase Auth
// esta función recibe como parámetro un arreglo con el correo y la clave
Route::post('login', function(){

    // la función attempt se encarga automáticamente se hacer la encriptación de la clave para ser comparada con la que esta en la base de datos.
    if (Auth::attempt( array('correo' => Input::get('correo'), 'password' => Input::get('password') ), true )){
        return Redirect::to('inicio');
    }else{
        return Redirect::to('login')->with('mensaje_login', 'Ingreso invalido');
    }

});

// Por ultimo crearemos un grupo con el filtro auth.
// Para todas estas rutas el usuario debe haber iniciado sesión.
// En caso de que se intente entrar y el usuario haya iniciado session
// entonces sera redirigido a la ruta login
Route::group(array('before' => 'auth'), function()
{

    Route::get('inicio', function(){
        echo 'Bienvenido ';

        // Con la función Auth::user() podemos obtener cualquier dato del usuario
        // que este en la sesión, en este caso usamos su correo y su id
        // Esta función esta disponible en cualquier parte del código
        // siempre y cuando haya un usuario con sesión iniciada
        echo 'Bienvenido '. Auth::user()->correo . ', su Id es: '.Auth::user()->id ;
    });
});

?>
```

<p>Ahora podemos probar nuestro código entrando a la ruta <strong>login</strong> y registrar usuarios para que luego inicien sesión.</p>

<hr />

<h2>Conclusión</h2>

<p>Como podemos ver Laravel nos permite un manejo sencillo de las sesiones, que son una parte muy importante en nuestros proyectos y teniendo en cuenta la seguridad de las claves. En nuestro próximo capítulo aprenderemos más funciones que nos brinda Laravel para el manejo de sesiones. Cualquier duda o comentario estaré atento a la sección de comentarios.</p>
