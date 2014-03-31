---
layout: post
status: publish
published: true
title: Sesiones II
author: Ramses Velasquez
author_login: ramses
author_email: cotufa9@gmail.com
wordpress_id: 2989
wordpress_url: http://codehero.co/?p=2989
date: 2014-02-07 00:10:54.000000000 -04:30
categories:
- Cursos
- Laravel
tags:
- php
- laravel
---
<p>En este nuevo capítulo continuaremos hablando y aprendiendo de funciones que nos brinda Laravel a la hora de manejar usuarios que han iniciado sesión en nuestro sistema.</p>

<hr />

<h2>Auth::check</h2>

<p>Esta función estática de la clase Auth permite verificar si un usuario ha iniciado sesión. En caso de que un usuario este en la sesión entonces devolverá True, en caso contrario retornara False.</p>

<pre>
if (Auth::check()){
    // usuario con sesión iniciada
}else{
    // no hay usuario 
}

</pre>

<hr />

<h2>Hash::check</h2>

<p>Esta función estática de la clase Hash permite verificar una clave encriptada sin tener que hacer inicio de sesión. Si la clave es correcta se retornara True, en caso contrario False.</p>

<pre>
if (Hash::check('clave', $claveEncriptada)){
    // clave correcta
}else{
    // clave incorrecta
}
</pre>

<hr />

<h2>Auth::attemp con Condición</h2>

<p>En el pasado tutorial vimos el método attempt y que con el verificábamos el usuario y la clave de la persona que intentara ingresar. Ahora le podemos agregar una condición al arreglo en donde se encuentran el usuario y la clave. Laravel verifica que esta condición sea un campo en la base de datos y que su valor sea igual al valor que estamos pasando. Veamos un ejemplo para entenderlo mejor.</p>

<pre>
if (Auth::attempt(array('correo' => $correo, 'password' => $password, 'activo' => 1))){
    // El usuario y su clave están correctos, pero también esta activo. 
}else{
    // El usuario no pudo iniciar sesión. 
}
</pre>

<hr />

<h2>Auth::loginUsingId</h2>

<p>Esta función sirve para iniciar la sesión de algún usuario sin tener que validar contraseña y usuario. Se indica como parámetro el Id del usuario que se desea utilizar y Laravel crea su sesión.</p>

<pre>
Auth::loginUsingId(1);
</pre>

<hr />

<h2>Auth::once</h2>

<p>Esta función sirve para que el usuario inicie sesión en una sola petición. Es decir ingreso su clave y su usuario, se ejecute el código que se debe ejecutar con la información del usuario y se descarta la sesión. Si se desea hacer otra petición con el mismo usuario entonces debe volver a introducir sus datos.</p>

<pre>
if (Auth::once( array('correo' => $correo, 'password' => $password )  )){
    //Inicio sesión correctamente y valida por una sola petición 
}
</pre>

<hr />

<h2>Auth::validate</h2>

<p>Laravel nos presenta una función que sirve solo para validar que un usuario exista y que su clave sea valida. Con esta función no se inicia ninguna sesión, solo se verifica que las credenciales que se introdujeron sean correctas.</p>

<pre>
if (Auth::validate(array('correo' => $correo, 'password' => $password ))){
    // Los datos introducidos son validos
}
</pre>

<hr />

<h2>Auth::logout</h2>

<p>Ya hemos aprendido como iniciar sesión con las funciones que Laravel nos presenta, pero todavía no sabemos como salir de la sesión. Para esto existe la función estática <strong>logout</strong>, esta destruye la sesión y el usuario ya no podrá volver a entrar al menos que ingrese sus datos de nuevo.</p>

<pre>
Auth::logout();
</pre>

<hr />

<h2>Protección CSRF</h2>

<p>Los ataques <strong>Cross-site request forgery</strong> (falsificación de petición en sitios cruzado) constan de enviar peticiones indebidas a sitios web en donde el usuario esta registrado, sin que él lo sepa. Laravel 4 nos ayuda a proteger nuestro sitio web contra estos ataques y para esto utiliza el filtro <strong>csrf</strong>.</p>

<p>Cuando creamos un formulario se debe colocar un campo de tipo hidden con un Token que sera validado luego por el filtro <strong>csrf</strong> de Laravel para ver si la petición esta viniendo de el lugar correcto.</p>

<p>Entonces lo primero que se debe hacer es crear el token en el formulario. Si estamos utilizando la función <code>Form::open()</code> para crear nuestro formulario entonces Laravel ya nos esta creado el campo con el Token automáticamente. En caso de que no utilicemos esta función para crear nuestros formularios entonces debemos crear el Token manual. Veamos un ejemplo de como se debe crear:</p>

<pre>
<!-- Este input debe ir dentro de el formulario que vayamos a enviar-->
<!-- El nombre siempre debe ser _token -->
<!-- El valor de debe llenar con la función csrf_token(); -->

<input type="hidden" name="_token" value="<?php echo csrf_token(); ?>">
</pre>

<p>El segundo y ultimo paso de esta validación es colocar el filtro csrf en las rutas Post como un filtro before, para que Laravel verifique el Token antes de ejecutar cualquier operación.</p>

<pre>
Route::post('formulario', array('before' => 'csrf', function()
{
    return 'El token es valido';
}));
</pre>

<hr />

<h2>Conclusión</h2>

<p>Con este tutorial ya hemos revisado y aprendido las principales funciones que nos presenta Laravel para manejar sesiones de usuarios y poner seguridad a nuestra aplicación. Si seguimos las convenciones y utilizamos lo que Laravel nos brinda podemos observar que es muy fácil que hacer las cosas que necesitamos día a día en nuestros proyectos. Cualquier duda o comentarios estaré atento a la sección de comentarios.</p>
