---
layout: post
title: Concurrencia
status: published
author: Oscar González
author_login: oscar
author_email: gonzalezgreco@gmail.com
author_url: http://www.oscarvgg.com
date: 2014-05-05 00:00:00.000000000 -04:30
serie: JavaScript Desmitificado
dificultad: Heroe
duracion: 10
description: Javascript corre sobre un solo hilo (es single-threaded), no existe concurrencia real. Veamos como podemos emularla.
categories:
- Cursos
- JavaScript
tags:
- callbacks
- hilos
- promesas
- promises
type: post

---
<p>Continuemos hablando de Javascript. En capítulos anteriores tocamos temas confusos en este lenguaje como la nosión de objetos, funciones y clausuras. Luego pasamos a materia más complicada, como lo es la coerción. Ahora sigamos por esa linea hablando de como manejar la concurrencia.</p>
<p>Javascript es un lenguaje fantástico debido a que es muy simple y facil de aprender. Sin embargo, estas mismas fortalezas han sido motivo de crítica para algunos, quienes las ven como debilidades.</p>
<p>Entre estas debilidades se encuentra que es "Single-threaded", lo que significa que puede correr sobre un solo hilo. Brendan Eich, el creador del lenguaje, declaró que no es una incapacidad por estar hecho para correr sobre exploradores, ya que Netscape incluía hilos en 1995, él simplemente no lo consideró correcto. Por lo tanto, no existe verdadera concurrencia en Javascript.</p>
<p>No obstante, a lo largo de los años la comunidad que apoya al lenguaje ha desarrollado varias alternativas para aprovechar al máximo ese unico hilo y emular la concurrencia. Algunas de ellas serán desarrolladas a lo largo de este artículo, pero no sin antes entender el ciclo de eventos de Javascript.</p>
<hr />
<h2>Ciclo de eventos (Event Loop)</h2>
<p>Javascript corre programas escuchando continuamente por mensajes por procesar (entiéndase por mensajes, llamadas a funciones). Quien escucha estos mensajes es un ciclo conocido como Event Loop o ciclo de eventos. El unico hilo de Javascript se traduce en que solo existe un ciclo de eventos por proceso en tiempo de ejecución.</p>
<p>Una vez que el ciclo de eventos recibe un mensaje para ser procesado, este lo ejecuta por completo hasta el final, de modo que hasta que no termine la ejecución dicho mensaje, el ciclo no procesa el siguiente, resultando en un bloqueo temporal.</p>
<p>Sin embargo, Javascript no da la sensación de bloqueo ya que una vez terminado el procesamiento del mensaje actual puede procesar mensajes recibidos por eventos de entrada de usuario (teclado, mouse, etc.) y luego continuar con otros mensajes. Es por esto que cuando usamos AJAX (por ejemplo) nuestra aplicación no se bloquea mientras esperamos el mensaje de respuesta.</p>
<p>Pasemos ahora a las alternativas que nos permiten emular concurrencia en Javascript.</p>
<hr />
<h2>Callbacks</h2>
<p>Cuando una función no puede retornar un valor de inmediato, se puede confiar en los callback. Los callbacks vienen a ser funciones pasadas como argumento a otras funciones para ejecutarse cuando la actual termine su tarea de larga duración.</p>
<p>Un ejemplo de una tarea de larga duración es ejecutar un query de base de datos y retornar los resultados.</p>
```javascript
bd.runQuery('SELECT * FROM user', function(error, rows, fields) {

  if (error) throw error;

  console.log('The solution is: ', rows[0].solution);
});
```

<p>Mientras la función <code>runQuery</code> manda a ejecutar una búsqueda en base de datos, javascript puede ir atendiendo otras llamadas. Cuando los resultados son obtenidos, el ciclo de eventos llama a la función del callback evitando así bloquear la aplicación.</p>
<p>El problema de los callbacks, es que se pueden anidar infinitamente, haciendo el código muy difícil de leer y mantener.</p>
```javascript
connection.query('CREATE DATABASE IF NOT EXISTS test', function (err) {
  if (err) throw err;

  connection.query('USE test', function (err) {

    if (err) throw err;

    connection.query('CREATE TABLE IF NOT EXISTS user('
      + 'id INT NOT NULL AUTO_INCREMENT,'
      + 'PRIMARY KEY(id)'
      +  ')', function (err) {

        if (err) throw err;

        connection.query('CREATE TABLE IF NOT EXISTS product('
          + 'id INT NOT NULL AUTO_INCREMENT,'
          + 'PRIMARY KEY(id)'
          +  ')', function (err) {

            if (err) throw err;

            connection.query('CREATE TABLE IF NOT EXISTS category('
              + 'id INT NOT NULL AUTO_INCREMENT,'
              + 'PRIMARY KEY(id)'
              +  ')', function (err) {

                if (err) throw err;

            });
        });
    });
  });
});
```

<p>Algunos programadores llaman a esta estructura "la piramide de la muerte" o "el infierno de los callback", debido a que el texto se extiende hacia la derecha más rápido que hacia abajo. Además promueve la propagación de errores y dificulta el manejo de excepciones.</p>
<hr />
<h2>Promesas (promises)</h2>
<p>Las promesas atacan el problema de la concurrencia de una manera más fácil de leer. Retornan un valor de inmediato en lugar de pasar el estado de ejecución como un argumento a otra función. Estas son básicamente un objeto que representa el valor futuro o excepción de una función que no ha sido retornada.</p>
<p>Por ejemplo, la función del primer ejemplo de callbacks se vería así usando promises:</p>
```javascript
var getAllUsers = bd.runQuery('SELECT * FROM user'),
    users = null;

getAllUsers.then(function (result) {

    if (result.ok) {
    users = result;
  }
},
function (error) {

  // manejar el error;
});
```

<p>Todas las promesas deben tener un metodo <code>then</code> que debe aceptar dos argumentos: el primero para el caso en que todo salga bien, y otro para el caso en que ocurra algún error. <code>promise.then(onFulfilled, onRejected)</code></p>
<p>Para más información sobre promesas, puedes revisar las siguientes direcciones:</p>
<ul>
<li><strong>La especificación de las promesas A+:</strong> <a href="http://promises-aplus.github.io/promises-spec/">http://promises-aplus.github.io/promises-spec/</a></li>
<li><strong>La libreria Q:</strong> <a href="https://github.com/kriskowal/q">https://github.com/kriskowal/q</a></li>
</ul>
<hr />
<h2>Conclusiones</h2>
<p>A pesar de que Javascript no cuenta con soporte para multiples hilos, existen soluciones que permiten obtener resultados muy aproximados a los que se pueden obtener con multi-threading.</p>
<p>Por favor ayuda a esparcir el conocimiento compartiendo este artículo en las redes sociales.</p>
<p>Si tienes dudas, comentarios, descubriste un error, o simplemente quieres agregar algo; házmelo saber en la sección correspondiente más abajo.</p>
<p>Hasta la próxima.</p>
