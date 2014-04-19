---
layout: post
status: publish
published: true
title: Colas de Tareas
serie: Laravel 4 desde Cero
author: Ramses Velasquez
author_login: ramses
author_email: cotufa9@gmail.com
date: 2014-03-21 00:38:55.000000000 -04:30
dificultad: novato
description: Tutorial para obtener conocimiento sobre como encolar tareas con Laravel 4 y Redis
duracion: 15
categories:
- Cursos
- Laravel
tags:
- php
- laravel
- redis
---
<p>En esta nueva entrada de Laravel 4 vamos a aprender a realizar colas de tareas con Redis. Esto nos ayuda a ejecutar tareas pesadas sin que el flujo de nuestro programa se vea afectado, ya que las tarea que encolemos se ejecutan cuando sea su turno en la cola. Pensemos en un ejemplo sencillo para tener esta idea un poco más clara.</p>

<p>Imaginemos que tenemos un código que sirve para registrar un usuario y enviar un correo de bienvenida, pero el servidor de correos que utilizamos esta lento y por lo tanto cuando el usuario hace submit a su registro la respuesta tarda. Una solución obvia es buscar otro servidor de correos, aunque también podemos insertar la tarea de mandar el correo en una cola que nuestro servidor siempre estará revisando para ir buscando cosas pendientes. De esta manera nuestro código solo registra al usuario, inserta la tarea de enviar el correo en una cola y luego devuelve la respuesta al usuario para hacer la experiencia del mismo más fluida. En resumen el proceso es que nuestro código va a ir llenando una lista de tareas y Laravel por otro lado las ira ejecutando.</p>

<p>Aquí es donde entra Redis, porque en el es donde Laravel guardara la lista de tareas que se irán ejecutando a medida que la cola se vaya vaciando. Cabe destacar que Laravel soporta diferentes formas de hacer las colas, pero ya que en nuestro pasado tutorial hicimos la conexión con Redis hoy la vamos a aprovechar. Debemos tomar en cuenta que el soporte para colas de tareas con Redis se agrego en Laravel 4.1, por lo tanto si estas utilizando una versión anterior no funcionara.</p>

<hr />

<h2>Configuración</h2>

<p>La configuración para empezar a encolar tareas es muy sencilla, primero que nada debemos tener configurado Redis y para esto puedes leer <a href="http://codehero.co/laravel-4-desde-cero-redis/">Laravel 4 desde Cero: Redis</a>. Luego debemos ir al archivo de configuración de las colas de tareas <code>app/config/queue.php</code>, buscamos el parámetro <strong>default</strong> y lo editamos para que utilice Redis como el almacén de tareas <code>'default' =&gt; 'redis',</code>.</p>

<hr />

<h2>Encolar Tareas</h2>

<p>Encolar las taras en muy sencillo y es una cosa de una sola linea. Hay diferentes parámetros que se pueden enviar al ahora de encolar una tarea, pero primero vamos a ver lo mas sencillo. Para realizar esta operación utilizamos el método <strong>Queue::push()</strong>. Veamos un ejemplo de como utilizarlo:</p>

```php

<?php
// Código que se ejecuto antes de encolar la tarea

// El primer parámetro es el nombre de la clase o modelo que ejecutara la tarea
// El segundo parámetro es un array con datos que se le van a pasar al método que ejecute la tarea
Queue::push('Correos', array('titulo'=>'Titulo para el correo', 'contenido'=>'contenido del correo'));

// Código que se ejecuta después de encolar la tarea, pero como se esta insertando en una cola entonces no se pierde tiempo comparado con el envío de un correo
?>

```

<p>Si necesitamos ejecutar una tarea pero con un tiempo de retraso podemos utilizar el método <strong>Queue::later()</strong>.</p>

```php

<?php
// El primero parámetro es el número de segundos que se retrasara la ejecución de la tarea en la cola 
// El segundo parámetro es la clase que ejecuta la tarea
// El tercer parámetro es la información que se envía
Queue::later(600, 'Correos', array('titulo'=>'Titulo para el correo', 'contenido'=>'contenido del correo'));
?>

```

{% include middle-post-ad.html %} 
<hr />

<h2>Manejador de Tareas</h2>

<p>Cada tarea que se inserta en la cola tiene un manejador (clase que se encargara de ejecutar la tarea). Esta clase debe tener un método llamada <strong>fire</strong>, el cual recibirá por defecto la ejecución de la tarea. <strong>Fire</strong> recibirá dos parámetros, el primero es un objeto con la información general de la tarea y el segundo es un array con los parámetros que se enviaron al encolarla. Al final del código de la tarea debemos borrarla permanentemente.</p>

```php

<?php
class Correos {

    public function fire($tarea, $datos){
        //código que ejecutara la tarea
        
        //cuando la tarea se ejecute debemos borrarla
        $tarea->delete();        
    }

}
?>

```

<p>En caso de que necesitemos utilizar otro método que no sea <strong>fire</strong>, entonces debemos establecerlo al momento de insertar la tarea. Para hacer esto colocamos el nombre de la clase y el nombre del método separados con arroba <strong>(@)</strong> <code>Correos@enviar_correo</code>. Estos métodos también deberán tener dos parámetros como <strong>fire</strong>.</p>

<hr />

<h2>Verificar Cola</h2>

<p>Para ejecutar las tareas Laravel incluye una funcionalidad con Artisan, la cual busca tareas nuevas las desencola y las ejecuta. Para comenzar a esperar tareas debemos ejecutar el comando <strong>queue:listen</strong> en la consola. Si ya habían tareas encoladas al momento que se active, entonces serán desencoladas y ejecutadas.</p>

```sh
// este comando quedara abierto esperando por tareas nuevas que procesar
$ php artisan queue:listen
```

<hr />

<h2>Conclusión</h2>

<p>Podemos observar que las colas nos pueden ayudar a quitarnos de encima tareas pesadas que no necesiten feedback para el usuario y así brindar una mejor experiencia. Cualquier duda o comentario estaré atento a la sección de comentarios.</p>
