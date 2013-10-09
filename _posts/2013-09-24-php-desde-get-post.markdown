---
layout: post
status: publish
published: true
title: Get & Post
author: Ramses Velasquez
author_login: ramses
author_email: cotufa9@gmail.com
wordpress_id: 2292
wordpress_url: http://codehero.co/?p=2292
date: 2013-09-24 00:00:30.000000000 -04:30
categories:
- Cursos
- PHP
tags:
- php
- variables
- formularios
- get
- post
- enlaces
comments: []
---
<p>En este nuevo capitulo de PHP aprenderemos como enviar información a un script PHP para que los sitios sean interactivos. Para este capítulo se necesita tener conocimientos básico de HTML y formularios, ya que los formularios será la principal manera de enviar la información al script.</p>

<p>Cuando creamos un sitio web y queremos enviar información que el usuario ha introducido utilizamos los métodos POST y GET. En teoría cada uno tiene su propósito específico y vamos aprender cuales son estos.</p>

<p>El usuario puede enviar información al servidor principalmente de dos maneras, mediante parámetros en enlaces HTML y por medio de los formularios. La primera solo sirve con el método GET, en cambio con los formularios se pueden utilizar las dos, aunque siempre es recomendable utilizar POST para enviar información desde un formulario. Vamos a ver ahora las características principales de cada uno y como manejarlos en PHP.</p>

<hr />

<h2>Get</h2>

<p>Cuando enviamos datos con el método GET, estos son enviados en el URL y cuando la página que solicitamos termine de cargar estos datos serán visibles para el usuario. Veamos un ejemplo de esto:</p>

<pre><a href="http://localhost/pagina.php?categoria=ropa&producto=3">ver</a>
</pre>

<p>Observemos el URL, estamos llamando al PHP pagina.php y luego tenemos una serie de datos. Estos son los datos que estamos enviando al servidor por medio del método GET, esto se hace mediante un esquema nombre/valor. Todo lo que vaya después del signo de interrogación <strong>?</strong> serán datos que se están enviando al servidor y para enviar varios los separamos con un signo <strong>&amp;</strong>.</p>

<p>¿ Ahora como podemos obtener estos datos en nuestro escript PHP ? Pues con la variable global <strong>$_GET</strong>. PHP recibe estos datos y los convierte en un arreglo asociativo almacenado en <strong>$_GET</strong>.</p>

<pre>$categoria = $_GET['categoria'];
$producto = $_GET['producto'];

echo "Selecciono el producto " . $producto . " de la categoría ". $categoria;

// Estos nos imprimirá en el navegador -> Selecciono el producto 3 de la categoría ropa
</pre>

<p>Ahora vemos algunas características del método GET:</p>

<ul>
<li>Produce una gran cadena de nombres/valores que se concatena al final del nombre de la página. </li>
<li>Tiene una longitud máxima de 2048 caracteres. </li>
<li>No es correcto pasar información sensible como claves por GET.</li>
<li>No sirve para enviar información binaria como documentos o documentos, solo aceptar caracteres ASCII. </li>
<li>La información enviada por GET es visible por todo el mundo. </li>
</ul>

<p>También podemos enviar información por el método GET a través de un formulario HTML.</p>

<pre><form action="pagina.php" method="GET" >
  Categoria: <input type="text" name="name" />
      Producto: 
          <select name="producto" >
              <option value="1"> Polo </option>
              <option value="2"> Quiksilver </option>
              <option value="3"> Tommy </option>
          </select >
  <input type="submit" value="Enviar" />
  
</form >
</pre>

<p>La variable $_GET tomara como clave para guardar los valores el nombre que se le de al dato con el parametro <strong>name</strong> en el HTML.</p>

<hr />

<h2>Post</h2>

<p>Al contrario de GET, POST solo funciona enviando la información mediante formularios y no la muestra en el URL. La información que es enviada por POST va en el cuerpo de la solicitud HTTP y esta puede ir o no encriptada. Veamos un ejemplo de como manejar la información enviada por este método en PHP.</p>

<p>Primero creamos el formulario indicando que el método es POST.</p>

<pre><form action="pagina.php" method="POST" >
  Usuario: <input type="text" name="usuario" />
      Clave: <input type="password" name="clave" />
      <input type="submit" value="Enviar" />
  
</form >
</pre>

<p>Como podemos ver hay un campo contraseña, el cual seria muy inseguro pasar por GET y que alguien lo lograra ver en el URL.</p>

<p>Ahora creamos el script de PHP para recibir estos datos que introduce el usuario.</p>

<pre>$usuario = $_POST['usuario'];
$clave = $_POST['clave'];
echo "Usuario " . $usuario . " y clave ". $clave;
</pre>

<p>Como podemos ver obtenemos los datos de la misma manera que con el método GET, solo que ahora la variable se llama $_POST.</p>

<p>Ahora vemos algunas características del método POST:</p>

<ul>
<li>No tiene ninguna restricción de tamaño.</li>
<li>Acepta caracteres ASCII y datos binarios. </li>
<li>Si se usa bajo el protocolo HTPPS entonces los datos vieja de manera segura. </li>
</ul>

<hr />

<h2>Files</h2>

<p>Para realizar el envío de datos binario como documentos o imágenes se hace mediante un formulario con el método POST, pero hay que especificarle al formulario que va a enviar datos binarios.</p>

<p>Veamos un ejemplo de esto :</p>

<pre><form enctype="multipart/form-data" action="pagina.php" method="POST" >
  Archivo: <input name="archivo" type="file" />
      <input type="submit" value="Enviar" />
  
</form >
</pre>

<p>Como podemos ver ahora en la etiqueta del <strong>form</strong> también agregamos <code>enctype="multipart/form-data"</code>, lo cual dice al formulario que también va a enviar datos binarios. Podemos observar que de igual manera se utilizar POST, pero en el PHP que procesa los datos en vez de utilizar la variable $&#95;POST se utiliza $&#95;FILE. Todos los archivos con su información (ruta temporal, nombre, tamaño y tipo de archivo) se acceden mediante el arreglo asociativo $_FILE.</p>

<pre>if ($_FILES["archivo"]["error"] > 0)
  {
  echo "Error: " . $_FILES["archivo"]["error"] . "<br />";
  }
else
  {
  echo "Nombre: " . $_FILES["archivo"]["name"] . "<br />";
  echo "Tipo: " . $_FILES["archivo"]["type"] . "<br />";
  echo "Tamaño: ". $_FILES["archivo"]["size"]  . "<br />";
  echo "Ruta: " . $_FILES["archivo"]["tmp_name"];
  }
</pre>

<hr />

<h2>Conclusión</h2>

<p>Hemos aprendido como enviar información a nuestros scripts de PHP con los métodos GET y POST. Esto nos da un poco más de conocimiento para crear sitios completos con PHP y que sean realmente interactivos. Cualquier duda que tengas estaré atento a responder en los comentarios.</p>
