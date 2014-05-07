---
layout: post
status: publish
published: true
title: Aplicación con MongoDB Parte I
author: Oscar González
author_login: oscar
author_email: gonzalezgreco@gmail.com
author_url: http://www.oscarvgg.com
wordpress_id: 2925
wordpress_url: http://codehero.co/?p=2925
date: 2014-01-20 00:01:09.000000000 -04:30
serie: Node.js y Express
dificultad: Heroe
duracion: 10
description: En el siguiente tutorial voy unir varios temas que tocamos durante la serie para desarrollar una simple aplicación de Express que conecta con MongoDB
categories:
- Cursos
- Node.js
tags:
- desde cero
- mongoose
---
<p>En el siguiente tutorial voy a enseñar como unir varios temas que tocamos durante la serie para desarrollar una simple aplicación de Express que conecta con MongoDB.</p>

<blockquote>
  <p>Para entender este tutorial es más que suficiente tener conocimientos superficiales sobre MongoDB. Además también asume que tienes instalada la base de datos en tu sistema y sabes como correrla (y que tiene que estar corriendo cuando hagas <code>node app.js</code>, porque si no va a dar un error horrible). Si no tienes conocimientos sobre esta tecnología, o quieres profundizar más en el tema, mi colega <a href="http://codehero.co/author/jonathan/">Jonathan Wiesel</a> ha armado una serie bastante completa llamada <a href="http://codehero.co/series/mongodb-desde-cero/">MongoDB desde Cero</a> que puedes revisar.</p>
</blockquote>

<hr />

<h2>Creando el Proyecto</h2>

<p>Para este proyecto vamos a utilizar la estructura modular que aprendimos en el tutorial <a href="http://codehero.co/estructura-modular-de-proyectos/">Estructura modular de proyectos</a>. Para esto vamos a clonar el proyecto del repositorio de este tutroial:</p>

```javascript
// No olvides hacer cd del directorio donde queremos colocar el proyecto. Luego haces el clone...
$ git clone https://github.com/codeheroco/express-proyecto-modular.git
```

<p>Si quieres puedes cambiar el nombre del proyecto al que quieras. Yo se lo voy a cambiar a express-mongo:</p>

```javascript
$ mv express-proyecto-modular express-mongo
```

<hr />

<h2>Instalando dependencias</h2>

<p>Primero tenemos que acceder al directorio de nuestro proyecto:</p>

```javascript
$ cd express-mongo
```

<p>Y ahora instalamos las dependencias:</p>

```javascript
$ npm install
```

<p>Esto instalará Express y Jade en el proyecto.</p>

<p>Para trabajar con MongoDB vamos a utilizar la librería Mongoose. Ésta es un ORM que nos permitirá asociar los registros de la base de datos a objetos dentro de nuestra aplicación.</p>

```javascript
$ npm install --save mongoose
```

<p>El parámetro <code>--save</code> permite agregar instantaneamente la dependencia al archivo <strong>package.json</strong>.</p>

<hr />

<h2>Definiendo los Modelos</h2>

<p>En el directorio del proyecto vamos a crear un submódulo llamado <strong>models</strong>, aquí vamos a definir los objetos de nuestra app y su conexión con la base de datos.</p>

<blockquote>
  <p>MongoDB es una base de datos "schema-less" o que no utiliza esquema, sin embargo aquí vamos definir uno para hacer un mapa que convierta el resultado de búsqueda de la base datos a los objetos de la aplicación</p>
</blockquote>

<p>En la consola escribimos:</p>

```javascript
// recuerda estar siempre apuntando al directorio de la aplicación
$ mkdir models
```

<p>Ya tenemos el directorio ahora creemos un modelo (User.js).</p>

```javascript
// models/User.js

module.exports = function(mongoose) {

  var Schema = mongoose.Schema;

  // Objeto modelo de Mongoose
  var UserSchema = new Schema({

    // Propiedad nombre
    name : String, // tipo de dato cadena de caracteres

    // Propiedad fecha de nacimiento
    birthdate : Date, // tipo de dato fecha

    isAdmin : Boolean // tipo de dato buleano

  });

  // metodo para calcular la edad a partir de la fecha de nacimiento
  UserSchema.methods.age = function() {

    return ~~((Date.now() - this.birthdate) / (31557600000));

  }

  return mongoose.model('User', UserSchema);
}
```

<p>Esto es un modelo de Mongoose.</p>

<hr />

<h2>Conexión con la base de datos</h2>

<p>Dentro de la misma carpeta models vamos a crear un archivo llamado index.js. Este se encargará de conectar con la base de datos y cargar todos los modelos.</p>

```javascript
// models/index.js
if (!global.hasOwnProperty('db')) {

  var mongoose = require('mongoose');

  var dbName = 'expressTest'

  // the application is executed on the local machine ...
  mongoose.connect('mongodb://localhost/' + dbName);


  global.db = {

    mongoose: mongoose,

    //models
    User:           require('./User')(mongoose),

    // agregar más modelos aquí en caso de haberlos
  };

}

module.exports = global.db;
```

<p>El objeto <code>global</code>, se encuentra disponible globalmente, como su nombre lo dice. A este objeto se le pueden agregar propiedades como lo hemos hecho en este ejemplo, le agregamos una llamada <code>db</code>, ésta se encargará de llevar una instancia del objeto Mongoose y los modelos de nuestra app.</p>

<p>Para esto funcione tenemos que correr este código cuando inicie nuestra app. Abrimos el archivo <strong>app.js</strong> y en cualquier parte agregamos <code>require('./models');</code>.</p>

<hr />

<h2>CRUD</h2>

<p>Hagamos ahora algunas operaciones sobre el modelo <code>User</code> en los controladores.</p>

<p>En este caso haremos un módulo con un formulario para crear a nuestro usuario.</p>

<p>En el directorio <strong>controllers</strong> creamos un directorio nuevo llamado <strong>users</strong>. Dentro creamos un directorio para las vistas y un archivo llamado índex.js para que sea nuestro controlador.</p>

<h3>Creando usuarios</h3>

<p>En <strong>controllers/users/index.js</strong> agregamos nuestro codigo usual de todos los controladores:</p>

```javascript
// controllers/user/index.js

var express = require('express');
var app = module.exports = express();

app.set('views', __dirname + '/views');
```

<p>Luego procedemos a crear una ruta que muestre un formulario para crear un usuario:</p>

```javascript
app.get('/user/new', function(request, response) {

  response.render('new');

});
```

<p>Ahora tenemos que hacer esa vista. En el directorio <em>views</em> del mismo módulo, creamos un archivo llamado <strong>new.jade</strong></p>

```javascript
// controllers/user/views/index.js

h1 Nuevo Usuario

form(method="POST", action="/user")

  p Nombre:
    input(type="text" name="name")

  p Fecha de nacimiento:
    input(type="date" name="birthdate")

  p ¿Es administrador?:
    input(type="check" name="isAdmin")

  p
    button(type="submit") Enviar
```

<p>Antes de poder probar que se muestre la página tenemos que cargar el módulo en el archivo <strong>app.js</strong>.</p>

<p>En la sección de módulos agregamos: <code>var user = require('./controllers/user');</code> y en la sección de rutas agregamos: <code>app.use(user);</code>.</p>

<p>Ahora en la consola corremos mongo y luego nuestra app:</p>

```javascript
$ mongod &
```

<p>Y luego:</p>

```javascript
$ node app.js
```

<p>Ahora si navegamos a <code>localhost:3000/user/new</code> en un explorador, veremos nuestra página:</p>

<p><img src="http://i.imgur.com/ZEiKkzs.png?1" alt="Pagina de usuario - Tutorial de node.js, express y mongoDB" /></p>

<p>Para poder realmente crear un usuario debemos ahora agregar otra ruta a nuestro controlador de usuarios:</p>

```javascript
app.post('/user', function(request, response) {

  var u = req.body;

  // podemos acceder a DB sin hacer
  // require porque es global
  var newUser = new db.User({
    name: u.name,
    birthdate: u.birthdate,
    isAdmin: u.isAdmin === 'on' ? true : false
  });

  // también podía hacer `new db.User(u)`
  // porque los campos del formulario
  // tienen el mismo nombre del las
  // propiedades del modelo. Para
  // efectos demostrativos aquí cree
  // un objeto con las mismas propiedades
  // y les asigné los valores que vienen
  // del formulario.

  newUser.save(function(error, user) {

    if (error) response.json(error);

    response.redirect('/user');

  }

});
```

<p>Si llenamos el formulario y hacemos click en enviar, nuestra ruta se encargará de insertar el usurio</p>

<p><img src="http://i.imgur.com/UuwbxfM.png?1" alt="Formulario de usuario lleno - Tutorial de node.js, express y mongoDB" /></p>

<p>Para verificar si se insertó, podemos averiguarlo revisando la consola de mongo:</p>

```javascript
$ mongo

> use expressTest
> db.users.find().pretty();
{
    "name" : "Oscar",
    "birthdate" : ISODate("1988-02-08T00:00:00Z"),
    "isAdmin" : true,
    "_id" : ObjectId("52dc6e7b1c85c043100fb37a"),
    "__v" : 0
}
```

<hr />

<h2>Continuará</h2>

<p>Vamos a dejarlo hasta aquí por ahora. En el próximos tutorial vamos a crear la ruta <code>/user</code> para que <code>response.redirect('/user');</code> tenga a donde llevarnos. Hasta ahora solo hemos completado la "C" de CRUD, en la próxima entrada de la serie también te mostraré como hacer el "retreave", "update" y "delete".</p>

<p>Hasta la próxima.</p>
