---
layout: post
status: publish
published: true
title: Aplicación con MongoDB Parte II
author: Oscar González
author_login: oscar
author_email: gonzalezgreco@gmail.com
author_url: http://www.oscarvgg.com
wordpress_id: 2970
wordpress_url: http://codehero.co/?p=2970
date: 2014-02-03 00:01:09.000000000 -04:30
serie: Node.js y Express
dificultad: Heroe
duracion: 20
github: https://github.com/codeheroco/express-proyecto-modular/tree/parte2
description: "En el presente tutorial voy a mostrar como desarrollar las funciones que faltan del CRUD: 'retreave/read', 'update' y 'delete/destroy'."
categories:
- Cursos
- Node.js
tags:
- desde cero
- node
- express
- mongo
---
<p>En el capítulo anterior comenzamos a desarrollar una aplicación web utilizando MongoDB como base de datos. Aprendimos a crear modelos con mongoose y empezamos a hacer funciones para crear usuarios.</p>

<p>En el presente tutorial voy a mostrar como desarrollar las funciones que faltan del CRUD: "retreave/read", "update" y "delete/destroy".</p>

<h2>CRUD (continuación)</h2>

<p>Empecemos esta parte con el read/retreave.</p>

<h3>Obteniendo la lista de usuarios (read/retreave)</h3>

<p>Abrimos <strong>controllers/user/index.js</strong> y agregamos un control adore para la ruta "get /user", este se encargará de encontrar todos los usuarios que existan en la base de datos y mostrarlos en una vista:</p>

<pre lang="javascript">app.get('/user', function(request, response) {

  db
  .User
  .find()
  .exec(function (error, users) {

    if (error) return res.json(error);

    return response.render('index', {
      users: users
    });

  });

});
</pre>

<p>Ahora procedemos a crear la vista. En el directorio <strong>views</strong> del mismo módulo. Agregamos index.jade. aquí vamos a desplegar una lista de usuarios:</p>

<pre>h1 Usuarios

ol
  each user, i in users
    li
      span #{user.name}

</pre>

<p>Luego de esto reinicidamos el servidor en la consola y navegamos a "localhost:3000/user" y veremos nuestra lista de ususarios.</p>

<h3>Actualizando usuarios (update)</h3>

<p>Agreguemos un controlador para editar los datos del usuario. El procedimiento consiste en crear dos controladores, uno para mostrar un formulario de edición de usuario y otro para recibir los cambios y guardarlos en la base de datos.</p>

<p>Creemos primero el controlador para mostrar el formulario:</p>

<pre lang="javascript">app.get('/user/edit/:id', function(request, response) {

  var userId = request.params.id;

  db
  .User
  .findById(userId, function (error, user) {

    if (error) return response.json(error);

    response.render('edit', user);

  });

});
</pre>

<p>Ahora el controlador para guardar en base de datos:</p>

<pre lang="javascript">app.put('/user/:id', function(request, response) {

  var user = request.body,
      userId = request.params.id;

  delete user.id;
  delete user._id;

  db
  .User
  .findByIdAndUpdate(userId, user, function (error, users) {

    if (error) return response.json(error);

    response.redirect('/user');

  });

});
</pre>

<p>Eliminamos el id del objeto "user" que llegó al controlador ya que este no debería poder ser modificado.</p>

<p>Ahora creamos la vista en el directorio <strong>views</strong></p>

<pre>h1 Editar Usuario

form(method="POST", action="/user/" + _id)

  p Nombre:
    input(type="text" name="name", value=name)

  p Fecha de nacimiento:
    input(type="date" name="birthdate", value=birthdate)

  p ¿Es administrador?:
    input(type="checkbox" name="isAdmin", checked=isAdmin)

  input(type="hidden" name="_method" value="put")

  p
    button(type="submit") Enviar
</pre>

<p>En este formulario agregamos los valores en los campos para ser editados, estos valores vienen directo desde el controlador.</p>

<p>También podrás notar que agregamos un campo oculto <code>input(type="hidden" name="_method" value="put")</code>. Como los formularios solo soportan los métodos GET y POST, tenemos que emplear este truco para poder usar PUT o DELETE dependiendo del caso.</p>

<p>La experiencia de usuario es uno de los propósitos más importantes del desarrollo de software. Dicho esto, la mejor manera de seleccionar un usuario para editar sus datos es agregar un link al lado de cada uno en la lista que creamos anteriormente para que nos direcciones a la vista de editar. La lista debe lucir ahora de la siguiente manera:</p>

<pre>h1 Usuarios

ol
  each user, i in users
    li #{user.name} -
      a(href="/user/edit/"+user.id)  editar
</pre>

<h3>Eliminando usuarios (Delete/Destroy)</h3>

<p>Este es probablemente el más sencillo de todos. Igual que el "editar", la mejor opción es agregar un link a cada usuario en la lista que permita direccionarnos a una ruta que elimine el usuario. La lista ahora cambia de la siguiente manera:</p>

<pre>h1 Usuarios

ol
  each user, i in users
    li #{user.name} |
      a(href="/user/edit/"+user.id)  editar
      |  -
      a(href="/user/delete/"+user.id)  eliminar
</pre>

<p>Para terminar agregamos el controlador para eliminar:</p>

<pre lang="javascript">app.get('/user/delete/:id', function(request, response) {

  var userId = request.params.id;

  db
  .User
  .findByIdAndRemove(userId, function (error, users) {

    if (error) return response.json(error);

    response.redirect('/user');

  });

});
</pre>

<h2>Conclusión</h2>

<p>Con este tutorial cerramos esta serie, pero no te preocupes, no será el ultimo tutorial que ofrezca Codehero sobre node.js.</p>

<p>Ahora que ya tienes los conocimientos básicos para desarrollar usando esta poderosa herramienta, quiero ver tus propias apps. Escríbenos en los comentarios y haznos saber de ti.</p>

<p>Gracias por leer. Hasta la próxima.</p>
