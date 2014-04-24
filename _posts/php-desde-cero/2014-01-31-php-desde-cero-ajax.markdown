---
layout: post
status: publish
published: true
title: AJAX
author: Ramses Velasquez
author_login: ramses
author_email: cotufa9@gmail.com
date: 2014-01-31 00:01:25.000000000 -04:30
serie: PHP desde Cero
description: Creacion de formulario que envia peticiones mediante AJAX a PHP
dificultad: novato
duracion: 20
categories:
- Cursos
- PHP
tags:
- php
- jquery
- ajax
---
<p>En este nuevo capítulo de PHP vamos a crear una lista de persona y un pequeño formulario para agregar y lo manejaremos mediante AJAX <strong>(Asynchronous JavaScript And XML)</strong>. Esta es una técnica de desarrollo web que nos permite enviar y recibir información de algún servidor sin tener que refrescar todo el sitio web y así poderle brindar una mejor experiencia al usuario. Hoy en día la mayoría de los sitios utilizan AJAX y en esta ocasión vamos a aprender como utilizarlo con la ayuda de jQuery.</p>

<p>Crearemos una tabla en la que se vera la información de las personas (nombre, correo y sexo) que han sido creadas y un link para eliminar a cada una. Justo abajo de la tabla tendremos un formulario para crear personas con la información ya mencionada. La acción de agregar y eliminar la manejaremos a través de AJAX, de esta manera veremos como hacer una petición GET y una petición POST con esta técnica. Para darle un poco de estilo al HTML que vamos a tener, utilizaremos Twitter Bootstrap.</p>

<hr />

<h2>Base de Datos</h2>

<p>Lo primero que vamos a hacer es crear nuestra tabla en la base de datos que vayamos a utilizar y utilizamos el siguiente esquema.</p>

```sql
CREATE TABLE `personas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `correo` varchar(150) NOT NULL,
  `sexo` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
```


<p>Con la base de datos creadas, creamos el archivo de conexión a la misma y lo llamamos conexion.php. El archivo va a tener el siguiente código y debemos colocar los datos de nuestra base de datos.</p>

```php
<?php
$db = new mysqli('localhost', 'usuario', 'clave', 'nombre_basedatos');
if($db->connect_errno > 0){
    die('Imposible conectar [' . $db->connect_error . ']');
}
?>
```


<hr />

<h2>Twitter Bootstrap</h2>

<p>Ahora vamos a bajar los archivos necesarios para implementar bootstrap del siguiente <a href="http://getbootstrap.com/">link</a>. Cuando tengamos los archivos debemos colocar los Javascript en una carpeta llamada <strong>js</strong> y los CSS en una carpeta llamada <strong>css</strong> en el directorio que estamos creando el proyecto. El directorio debería quedar de esta manera:</p>

```
+-- js
|   +-- bootstrap.min.js
+-- css
|   +-- bootstrap.min.css
|   +-- bootstrap-theme.min.css
```


<hr />

<h2>Index.php</h2>

<p>Con lo anterior ya listo, nos toca crear el index.php en la carpeta principal. En este código vamos a tener nuestra lista de personas, el formulario para crear y los códigos de jQuery para hacer las peticiones AJAX.</p>

```html
    <?php
        // primero que nada incluimos la conexión para poder buscar la lista de personas
        require 'conexion.php';

        // hacemos el query para buscar a todas las personas que tengamos creadas en la base de datos
        $sql = "SELECT * FROM personas";

        if(!$resultado = $db->query($sql)){
            die('Ocurrio un error ejecutando el query [' . $db->error . ']');
        }
        $db->close();
    ?>



<div class="container">
  <div class="jumbotron">
    <h1>Lista de personas</h1>
  </div>
  <table class="table" id="tabla">
    <thead>
      <tr>
        <th>Id</th>
        <th>Nombre</th>
        <th>Correo</th>
        <th>Sexo</th>
        <th>&nbsp</th>
      </tr>
    </thead>
    <tbody>
      <?php  
          // Creamos la tabla con los campos que queremos mostrar de las personas
          // Iteramos a través de los resultados que nos devolvió la consulta
          // Le colocamos un id a cada fila para cuando las vayamos a eliminar con jQuery
          // La acción de eliminar la llamamos a través de un evento onclick e indicando el id a eliminar
          while($fila = $resultado->fetch_assoc()){
            echo '
              <tr id="fila_'.$fila['id'].'">
                <td>'.$fila['id'].'</td>
                <td>'.$fila['nombre'].'</td>
                <td>'.$fila['correo'].'</td>
                <td>'.($fila['sexo'] == 1 ? 'M':'F').'</td>
                <td><a onclick="eliminar('.$fila['id'].')">Eliminar</a></td>
              </tr>';
           }
       ?>
    </tbody>
  </table>

  <!--
     Creamos el formulario que vamos a enviar para crear una persona
     Este formulario lo vamos a enviar por AJAX con jQuery y por eso le colocamos un id
     La dirección a donde se enviara el formulario va en el código de jQuery y no en el formulario
  -->
</div>

<!-- link para importar jQuery a nuestro proyecto -->


<script src="https://code.jquery.com/jquery.js"></script>
<!-- link con el archivo JavaScript de bootstrap -->

<script src="js/bootstrap.min.js"></script>

    <script type="text/javascript">

        // Esta primera función agrega un disparador de  evento a la acción submit,
        // esto quiere decir que cuando se presione el botón de submit del formulario
        // con id 'formulario' entonces se ejecutara el código contenido en el.
        $( "#formulario" ).submit(function( event ) {
            event.preventDefault();

            // Como estamos enviamos un formulario, la acción a realizar por AJAX debe ser post.
            // Vamos a ver los parámetros que necesita el método $.post de jQuery para funcionar
            // 1. Dirección a donde se va a enviar el formulario por medio de POST
            // 2. Datos del formulario, la función serializa() convierte el formulario en una cadena de texto
            // 3. Función que se ejecutara cuando se reciba la respuesta del servidor.

            $.post('agregar.php',
            $('#formulario').serialize(),
            function(data) {

                // Si todo salió bien en el servidor se devolvera éxito => true y se ejecutara el else
                // pero si algo salió mal entonces se mostrar una alerta con el mensaje error
                if (data.exito != true){
                    alert('Error');
                }else{

                    // Si la persona se creo bien en la base de datos entonces insertamos una fila
                    // con su información al final de la tabla
                    $('#tabla tr:last').after(
                     '<tr id="fila_'+data.id+'">'+
                          '<td>'+data.id+'</td>'+
                          '<td>'+data.nombre+'</td>'+
                          '<td>'+data.correo+'</td>'+
                          '<td>'+data.sexo+'</td>'+
                          '<td><a onclick="eliminar('+data.id+')">Eliminar</a></td>'+
                        '</tr>'
                     );
                }
            });

        });

        //Esta es la función que se llama al eliminar una persona de la tabla
        function eliminar(id){

            // con el método $.get hacemos una petición GET mediante AJAX con jQuery
            // 1. El primer parámetro es la dirección a donde se va a hacer la petición y los parámetros de la misma
            // en este caso el parámetro será el id de la persona que se va a eliminar.                 // 2. El segundo parámetro es la función que se va a ejecutar cuando se reciba la respuesta del servidor
            $.get('eliminar.php?id='+id,
            function(data){
                if (data.exito != true){
                  alert('Error');
                }else{
                    // si la respuesta fue exitosa entonces eliminamos la fila de la tabla
                    $('#fila_'+id).remove();
                }
            });
        }
   </script>

```


<hr />

{% include middle-post-ad.html %}

<h2>Agregar y Eliminar</h2>

<p>Por último vamos a crear los script PHP que recibirán las peticiones GET y POST y darán respuesta a las peticiones AJAX. Los datos se reciben con las variables <strong>$_GET</strong> y <strong>$_POST</strong> y la respuesta se devuelve con un <strong>echo</strong>. Hay diferentes formas de enviar la respuesta al cliente, pero en nuestro ejemplo la enviaremos con formato <strong>JSON</strong>. Para esto debemos indicarle al explorador que lo que le estamos enviando es un texto que debe leer como <strong>JSON</strong>. Veamos los códigos para entender esto mejor. El primer script será el encargado de recibir las peticiones POST para agregar personas.</p>

```php
<?php
// agregar.php
require 'conexion.php';

extract($_POST);

$sql = "INSERT INTO personas (id, nombre, correo, sexo) VALUES (NULL, '$nombre', '$correo', $sexo)";

if(! $db->query($sql)){
     die('Ocurrio un error ejecutando el query [' . $db->error . ']');
}else{

    // Con la función header podemos indicar al explorar que el tipo de contenido será JSON
    // en caso de no hacer esto en el PHP entonces tendríamos que convertir el texto a JSON en el javascript
    header('Content-Type: application/json');

    //Luego vamos a crear un arreglo con toda la información que queremos enviar como respuesta y lo convertimos a JSON
    // para esto utilizamos la función json_encode
    echo json_encode(array('exito'=>true, 'id'=>$db->insert_id, 'nombre'=>$nombre, 'correo'=>$correo, 'sexo'=> ($sexo == 1? 'M':'F') ));
}

$db->close();

?>
```


<p>El segundo script será el encargado de borrar a las personas y recibirá peticiones GET.</p>

```php
<?php
// eliminar.php
require 'conexion.php';

$id = $_GET['id'];

$sql = "DELETE FROM personas WHERE id = '$id' ";

if(! $db->query($sql)){
     die('Ocurrio un error ejecutando el query [' . $db->error . ']');
}else{

    header('Content-Type: application/json');
    echo json_encode(array('exito'=>true));
}

$db->close();

?>
```


<hr />

<h2>Resultado</h2>

<p>El resultado final de todo nuestro código debería ser la lista de personas con el formulario final. Como puedes observar todo funciona sin tener que refrescar o recargar la página.</p>

<p><img src="http://i.imgur.com/BpdfE1Pl.png" alt="php-ajax-jquery" /></p>

<hr />

<h2>Conclusión</h2>

<p>En esta ocasión hemos aprendido a realizar peticiones GET y POST AJAX con jQuery y scritps PHP, esto nos sirve para tener sitios web mas dinámicos y amigables para los usuarios. Siempre hay que intentar buscar un balance entre no hacer todo con AJAX y no tener nada de AJAX, ya que cualquier de los dos extremos es incomodo para la experiencia de los usuarios. Cualquier duda o comentario estaré atento a la sección de comentarios.</p>
