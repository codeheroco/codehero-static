---
layout: post
status: publish
published: true
title: Estructura del Proyecto
author: Ramses Velasquez
author_login: ramses
author_email: cotufa9@gmail.com
wordpress_id: 1885
wordpress_url: http://codehero.co/?p=1885
date: 2013-08-06 00:10:02.000000000 -04:30
categories:
- Cursos
- Laravel
tags:
- php
- laravel
- laravel 4
- mvc
---
<p>En el pasado tutorial creamos nuestro primer proyecto de <strong>Laravel 4</strong> y comprobamos que la instalación fuese correcta. En este nuevo capitulo vamos a revisar las carpetas que contienen nuestro código y daremos nuestros primeros pasos con este framework. Para esto crearemos una tabla con usuarios y mediante el uso del patrón MVC mostraremos en la pantalla del navegador la lista con los nombres.</p>

<hr />

<h2>Estructura</h2>

<p>Primero que nada vamos a ver la estructura de nuestro proyecto, para así entender que hay dentro de las principales carpetas.</p>

<ul>
<li><p>/app - Contiene los controladores, modelos, vistas y configuraciones de la aplicación. En esta carpeta escribiremos la mayoría del código para que nuestra aplicación funcione.</p></li>
<li><p>/public - Es la única carpeta a la que los usuarios de la aplicación pueden acceder. Todo las peticiones y solicitudes a la aplicación pasan por esta carpeta, ya que en ella se encuentra el <code>index.php</code>, este archivo es el que inicia todo el proceso de ejecución del framework. En este directorio también se alojan los archivos CSS, Javascript, imágenes y otros archivos que se quieran hacer públicos.</p></li>
<li><p>/vendor - En esta carpeta se alojan todas las librerías que conforman el framework y sus dependencias.</p></li>
<li><p>/lang - En esta carpeta se guardan archivos PHP que contienen Arrays con los textos de diferentes lenguajes, en caso que se desee que la aplicación se pueda traducir.</p></li>
<li><p>/app/config - Aquí se pueden se pueden encontrar todos los archivos de configuración de la aplicación. Base datos, cache, correos, sesiones o cualquier otra configuración general de la aplicación.</p></li>
<li><p>/app/controller - Contiene todos los archivos con las clases de los controladores que sirven para interactuar con los modelos, las vistas y manejar la lógica de la aplicación.</p></li>
<li><p>/app/model - Los modelos son clases que representan la información (datos) de la aplicación y las reglas para manipularlos. En la mayoría de los casos cada tabla de la base datos esta representada con un modelo. La lógica de negocio de la aplicación esta contendía en los modelos.</p></li>
<li><p>/app/views - Este directorio contiene las plantillas de HTML que usan los controladores para mostrar la información. Hay que tener en cuenta que en esta carpeta no van los Javascript, CSS o imágenes, ese tipo de archivos van alojados en la carpeta <code>/public</code>.</p></li>
</ul>

<hr />

<h2>Base datos</h2>

<p>Ahora que sabemos como esta estructurado el framework vamos a configurar nuestra base datos. Para esto vamos a crear una base datos con el nombre de <strong>codehero-laravel</strong> en MySQL. Luego que tengamos la base de datos creada tenemos que editar el archivo de configuración en Laravel para que se puede realizar la conexión. Abrimos el archivo <code>/app/config/database.php</code> y editamos los campos de la conexión MySQL.</p>

<pre>'connections' => array(
    'mysql' => array(
        'driver'    => 'mysql',
        'host'      => 'localhost',
        'database'  => 'codehero-laravel',// Nombre de la base de datos
        'username'  => 'root', // Usuario de la base de datos
        'password'  => '', // Clave del usuario
        'charset'   => 'utf8',
        'collation' => 'utf8_unicode_ci',
        'prefix'    => '',
    )
)
</pre>

<p>Luego crearemos la tabla usuarios con la siguiente estructura.</p>

<pre>--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
</pre>

<p>Ya que en este tutorial solo vamos a cubrir el método para mostrar la lista de usuarios, entonces tenemos que tenerlos creados en la base datos. Para este tutorial he insertado 4 usuarios.</p>

<p><a href="http://i.imgur.com/ETUYcHD.png"><img src="http://i.imgur.com/ETUYcHD.png" alt="laravel-4-2-datos-mysql" class="aligncenter size-full wp-image-1890" /></a></p>

<hr />

<h2>Modelo</h2>

<p>Para crear nuestro modelo de usuario debemos crear un archivo llamado <code>usuario.php</code> en la carpeta <code>/app/models</code> con el siguiente código.</p>

<pre><?php 
class Usuario extends Eloquent { //Todos los modelos deben extender la clase Eloquent
    protected $table = 'usuarios';
}
?>
</pre>

<p>En Laravel los modelos utilizan el <strong>Eloquent ORM</strong>, que proporciona una manera elegante y fácil de interactuar con la base de datos. Para esto cada tabla en la base datos debe tener su correspondiente modelo.</p>

<p>Los modelos utilizan convenciones para saber que modelo utiliza que tabla de la base datos, pero como esas convenciones están hechas para el idioma ingles es mejor decirle directamente que tabla debe usar en que modelo. Esto lo hacemos con la variables <strong>$table</strong>, en ella especificamos que el modelo Usuario utiliza la tabla de usuarios.</p>

<p>Laravel asume que todas las tablas tienen tres campos básicos <strong>'id'</strong> (clave primaria), <strong>'created_at'</strong>, <strong>'updated_at'</strong>. Los últimos dos son llenados automáticamente por el framework.</p>

<hr />

<h2>Vista</h2>

<p>La primera vista que vamos a crear será <code>lista.blade.php</code> en <code>/app/views/usuarios/</code>. Para esto primero vamos a crear la carpeta de usuario dentro de <code>/app/views</code>, luego dentro de usuario creamos el archivo <code>lista.blade.php</code> con el siguiente código.</p>

<pre><h1>
  Usuarios
</h1>
<ul>
  @foreach($usuarios as $usuario)
  <!-- Equivalente en Blade a <?php foreach ($usuarios as $usuario) ?> -->
    
     <li> {{ $usuario->nombre.' '.$usuario->apellido }} </li>
     <!-- Equivalente en Blade a <?php echo $usuario->nombre.' '.$usuario->apellido ?> -->
  @endforeach 
</ul>
</pre>

<p>Este archivo contiene el html que mostrara la lista de los usuarios. La extensión es <strong>blade.php</strong>, esto quiere decir que el archivo puede usar el sistema de plantillas <strong>Blade</strong> y las sentencias <strong>PHP</strong>.</p>

<p>Durante el curso de Laravel iremos aprendiendo todo los beneficios que nos aporta usar este sistema que nos proporciona el framework. También aprenderemos a separar el código HTML en diferentes archivos para no tener que repetirlo cuando tengamos un diseño complejo.</p>

<hr />

<h2>Controlador</h2>

<p>Para unir el modelo y la vista creamos el tercer componente de MVC, el controlador. Para esto en la carpeta de <code>/app/controllers</code> creamos el archivo <code>UsuariosController.php</code> con el siguiente código.</p>

<pre><?php 
class UsuariosController extends BaseController {

    /**
     * Mustra la lista con todos los usuarios
     */
    public function mostrarUsuarios()
    {
        $usuarios = Usuario::all(); 
        
        // Con el método all() le estamos pidiendo al modelo de Usuario
        // que busque todos los registros contenidos en esa tabla y los devuelva en un Array
        
        return View::make('usuarios.lista', array('usuarios' => $usuarios));
        
        // El método make de la clase View indica cual vista vamos a mostrar al usuario 
        //y también pasa como parámetro los datos que queramos pasar a la vista. 
        // En este caso le estamos pasando un array con todos los usuarios
    }

}
?>
</pre>

<p>Todos los controladores deben extender de <strong>BaseController</strong>. El nombre de la clase debe terminar en <strong>Controller</strong> y debe ser igual al nombre del archivo.</p>

<hr />

<h2>Ruta</h2>

<p>Por ultimo debemos crear una ruta, esta es la manera que el framework nos brinda para poder llegar hasta la acción y el controlador que queramos. Para crear la ruta abrimos el archivo <code>/app/routes.php</code> y agregamos al final la siguiente linea de código.</p>

<pre>Route::get('usuarios', array('uses' => 'UsuariosController@mostrarUsuarios'));
</pre>

<p>Este código lo que hace es declarar que cuando se haga una petición tipo <strong>GET</strong> o <strong>POST</strong> a la ruta descrita <strong>'usuarios'</strong>, entonces la petición pasara a ser atendida por el controlador <strong>UsuariosController</strong> con la acción <strong>mostrarUsuarios</strong>.</p>

<p>Todas las acciones que queramos que publicar para que el usuario puedan acceder debemos tenerlas declaradas con rutas, si no el usuario no podrá acceder a ellas.</p>

<hr />

<h2>Prueba</h2>

<p>Ahora vamos al navegador y entramos en la siguen url <code>localhost/codehero-laravel/public/usuarios</code> para probar lo que hemos hecho y comprobar que todo funciona correctamente.</p>

<p><a href="http://i.imgur.com/5FnCRKx.png"><img src="http://i.imgur.com/5FnCRKx.png" alt="Laravel 4 Resultado peticion GET" class="aligncenter size-full wp-image-1889" /></a></p>

<p>En la siguiente imagen podemos observar gráficamente el proceso que se llevo a acabo cuando hicimos la petición al servidor.</p>

<p><a href="http://i.imgur.com/gSBfr58.png"><img src="http://i.imgur.com/gSBfr58.png" alt="Diagrama ejecución Laravel 4" class="aligncenter size-full wp-image-1891" /></a></p>

<hr />

<h2>Conclusión</h2>

<p>En este capítulo aprendimos un poco más la estructura de un proyecto en Laravel 4, configuramos la base de datos e hicimos que funcionara nuestra primera acción de la aplicación utilizando el patrón MVC. En el siguiente capítulo crearemos las demás acciones con la tabla de usuarios utilizando el mismo patrón. Si tienen alguna duda estaré pendiente de contestar en la sección de comentarios.</p>
