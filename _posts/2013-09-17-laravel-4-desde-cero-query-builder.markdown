---
layout: post
status: publish
published: true
title: Query Builder
author: Ramses Velasquez
author_login: ramses
author_email: cotufa9@gmail.com
wordpress_id: 2250
wordpress_url: http://codehero.co/?p=2250
date: 2013-09-17 00:00:47.000000000 -04:30
categories:
- Cursos
- Laravel
tags:
- php
- laravel
- sql
- Query Builder
- POO
---
<p>En el pasado capítulo vimos lo básico para manejar los CRUD de los modelos que tenga nuestro proyecto de Laravel. Ahora aprenderemos a utilizar SQL escrito por nosotros o con las funciones que nos provee Laravel a traves de <strong>Query Builder</strong>.</p>

<hr />

<h2>Sentencias SQL</h2>

<p>Lo primero que aprenderemos en este capítulo será a realizar sentencias SQL desde Laravel 4. Revisaremos las funciones para realizar un <strong>SELECT</strong>, <strong>INSERT</strong>, <strong>UPDATE</strong> y <strong>DELETE</strong>. Para realizar este tipo de sentencias solo es necesario tener configurado los parámetros de conexión a la base de datos, lo cual aprendimos a hacer en los pasados capítulos de esta serie. Todas estas consultas se realizan haciendo uso de la clase <strong>DB</strong>.</p>

<h3>Select</h3>

<p>Para la realización de un SELECT hacemos uso de la función estática <strong>select</strong>, esta regresara un arreglo con objetos. Cada objeto es cada tupla que la consulta regresa. La función puede recibir dos parámetros, el primero es obligatorio y es el texto con al consulta. El segundo parámetro es opcional y consiste en un arreglo con las variables que se le quieran pasar a la consulta, para esto se coloca en la consulta un sigo de interrogación en donde se quiere sustituir alguna variable. Veamos un ejemplo de esto:</p>

<pre>$resultado = DB::select('SELECT * FROM carros WHERE color = ?', array('blanco'));
// En este caso ? será remplazado por blanco 
// SELECT * FROM carros WHERE color = 'Blanco'
</pre>

<p>Esta consulta retorna el siguiente arreglo:</p>

<pre>array(1) {
  [0]=>
  array(2) {
    [0]=>
    object(stdClass)#124 (6) {
      ["id"]=>
      string(1) "2"
      ["modelo"]=>
      string(8) "Corrolla"
      ["color"]=>
      string(6) "Blanco"
      ["placa"]=>
      string(7) "MGF 333"
      ["created_at"]=>
      string(19) "2013-09-16 13:51:33"
      ["updated_at"]=>
      string(19) "2013-09-16 13:51:33"
    }
    [1]=>
    object(stdClass)#125 (6) {
      ["id"]=>
      string(1) "5"
      ["modelo"]=>
      string(4) "Meru"
      ["color"]=>
      string(6) "Blanco"
      ["placa"]=>
      string(7) "DJF 333"
      ["created_at"]=>
      string(19) "2013-09-16 13:51:33"
      ["updated_at"]=>
      string(19) "2013-09-16 13:51:33"
    }
  }
}

</pre>

<p>Podemos observar que es un arreglo con objetos. En donde cada objeto es una fila de la consulta que se realizo a la base de datos.</p>

<h3>Insert</h3>

<p>Para insertar en la base de datos sin utilizar los modelos utilizamos la función estática <strong>insert</strong>. Esta función no retorna nada y al igual que la función <strong>select</strong>, recibe dos parámetros. El primero es la sentencia y el segundo es el arreglo con los valores a insertar.</p>

<pre>DB::insert("INSERT INTO carros (id, modelo, color, placa) VALUES (NULL, ?, ?, ?)", array('QQ', 'Verde', 'GFT 888') );
// Podemos observar como se sustituyen los valores en las posiciones de los ? 
</pre>

<h3>Update</h3>

<p>Para realizar un UPDATE utilizamos la función estática <strong>update</strong>, igual que las anteriores, esta recibe dos parámetros. El primero es la sentencia SQL y el segundo es el arreglo con los paramtros. Esta función devuelve un número entero con la cantidad de filas que fueron editadas cuando se ejecuto el UPDATE.</p>

<pre>$filas_editadas = DB::update('UPDATE carros SET placa = ? WHERE id = ? ', array( 'JUH 111', 2));
</pre>

<h3>Delete</h3>

<p>Por ultimo veremos como hacer uso de la sentencia DELETE con la función estática <strong>delete</strong>. Al igual que <strong>update</strong>, recibe dos parametros y retorna un entero con la cantidad de filas borradas.</p>

<pre>$cantidad_borradas = DB::delete('DELETE FROM carros WHERE id = ? ', array(6) );
</pre>

<hr />

<h2>Query Builder</h2>

<p>Laravel 4 cuenta con una librería para crear las sentencias SQL con POO ( Programación Orientada a Objetos), de esta manera nos evitamos escribir SQL directamente. Utilizando esta librería para hacer las consultas, nos evitamos inyección de SQL y nuestras consultas funcionaran en todas las base datos sin ningún problema, ya que Laravel será quien escriba la sentencia. Por último debemos saber que esta librería funciona mediante encadenamiento de métodos, sobre lo cual veremos un ejemplo a continuación.</p>

<pre>Class::creador()->cadena()->cadena()->cadena()->disparador();

// Primero se debe poner un creador que es quien instancia la clase. 
// Luego se le pueden pasar métodos opcionales que modifican la instancia
// Por ultimo se debe usar un disparador que es quien retorna el resultado
</pre>

<p>Ahora veamos un ejemplo con métodos reales:</p>

<pre>$usuarios = DB::table('usuarios')->where('sexo', '=', 'M')->get();
// SELECT * FROM usuarios WHERE sexo = 'M'
</pre>

<p>Esta consulta retorna un arreglo de objeto con todos los resultados obtenidos de la base de datos. <strong>table('usuarios')</strong> crea el objeto para ser usado con la tabla de usuarios, <strong>where()</strong> es el modificador encadenado y <strong>get()</strong> es el disparador que retorna el arreglo de objetos.</p>

<h3>Disparadores</h3>

<p>Veamos una lista con los diferentes disparadores:</p>

<ul>
<li><strong>get()</strong>: Devuelve todos los campos de todos los objetos que son obtenidos por la consulta en un arreglo. Si solo se desean ciertos campos, se pueden pasar un arreglo con los nombres de esos campos en especifico. </li>
<li><strong>first()</strong>: Retorna el primer objeto obtenido por la consulta. Se pueden especificar los campos que se desean obtener de ese objeto pasando un arreglo con los nombres como parámetro. </li>
<li><strong>lists()</strong>: Este disparador retorna un arreglo con un solo dato de los resultados encontrados por la consulta, el dato que se desea obtener se debe pasar como parámetro. Opcionalmente se le puede colocar otro dato como clave al arreglo, este seria el segundo parámetro. </li>
<li><strong>count()</strong>: Retorna un entero con la cantidad de datos encontrados en la consulta. </li>
<li><strong>max()</strong>: Recibe como parámetro un campo de la tabla, el cual evalúa para buscar y retornar su máximo valor. </li>
<li><strong>min()</strong>: Recibe como parámetro un campo de la tabla, el cual evalúa para buscar y retornar su mínimo valor. </li>
</ul>

<h3>Modificadores</h3>

<p>Veamos la lista de los principales modificadores:</p>

<ul>
<li><strong>where()</strong>: Se pueden encadenar varios <strong>where</strong> esto se uniria con <strong>AND</strong> al utilizar esta función. Recibe tres parámetros ( $primerodato, 'operador', $segundodato). </li>
<li><strong>orWhere()</strong>: Funciona igual que el <strong>where</strong>, pero se unen con <strong>OR</strong>. </li>
<li><strong>whereBetween()</strong>: Agrega la función <strong>BETWEEN</strong> al where. Recibe dos parámetros, el campo a comparar y un arreglo con los dos valores del rango. </li>
<li><strong>whereIn()</strong>: Agrega la función <strong>IN</strong> al where. Recibe dos parámetros, el campo a evaluar y un arreglo con los valores del <strong>IN</strong>.</li>
<li><strong>whereNotIn()</strong>: Agrega la función <strong>IN</strong> negada al where. Recibe dos parámetros, el campo a evaluar y un arreglo con los valores del <strong>NOT IN</strong>. </li>
<li><strong>whereNull()</strong>: Agrega la función <strong>IS NULL</strong> al where. Recibe como parámetro el campo a verificar.</li>
<li><strong>orderBy()</strong>: Agrega la sentencia <strong>ORDER BY</strong> a la consulta. Recibe dos parámetros ($campo, $orientacion). </li>
<li><strong>groupBy()</strong>: Agrega la sentencia <strong>GROUP BY</strong> a la consulta. Recibe como parámetro el campo por el cual se va a agrupar. </li>
<li><strong>take()</strong>: Dependiendo del motor de base dates que utilicemos indica a la misma obtener solo cierta cantidad de regístros de la consulta realizada. Recibe como parámetro la cantidad que se desea obtener. </li>
<li><strong>skip()</strong>: Dependiendo del motor de base dates que utilicemos indica a la misma saltar cierta cantidad de registros. Recibe como parámetros la cantidad que se desea omitir y siempre debe ir acompañada de <strong>take()</strong>. </li>
</ul>

<p>Veamos unos ejemplos para entender todo esto mas claro. Tengamos en cuenta que se pueden tener tantos modificadores como sea necesario y disparadores debe ser uno solo.</p>

<pre>$resultado = DB::table('carros')->get();

$resultado = DB::table('carros')->count();

$resultado = DB::table('carros')->where('color', '=', 'Verde')->get();

$resultado = DB::table('carros')->where('color', '=', 'Verde')->get(array('id', 'modelo', 'color'));

$resultado = DB::table('carros')->where('color', '=', 'Verde')->first();

$resultado = DB::table('carros')->where('color', '=', 'Verde')->first(array('id', 'modelo', 'color'));

$resultado = DB::table('carros')->where('color', '=', 'Verde')->count();

$resultado = DB::table('carros')->where('color', '=', 'Verde')->max('id');

$resultado = DB::table('carros')->where('color', '=', 'Blanco')->where('modelo','=','Corrolla')->get();

$resultado = DB::table('carros')->where('color', '=', 'Blanco')->orWhere('placa','=','JUH 111')->get();

$resultado = DB::table('carros')->whereBetween('id', array('1', '4'))->get();

$resultado = DB::table('carros')->whereNull('color')->get();

$resultado = DB::table('carros')->orderBy('modelo', 'Desc')->get();

$resultado = DB::table('carros')->groupBy('color')->get(array('color'));

$resultado = DB::table('carros')->take(4)->skip(3)->get();

</pre>

<h3>Query Builder y Modelos</h3>

<p>Por último debemos saber que todas las consultas que hacemos con el Query Builder las podemos hacer de igual manera con los modelos. El modelo actuaría como el creador de la consulta, ya que cada modelo tiene una tabla asociada.</p>

<pre>// Si asumimos que tenemos un modelo llamado Carros, el cual utiliza la tabla carros en la base datos
// entonces los dos códigos serian equivalentes. 

$resultado = DB::table('carros')->where('color', '=', 'Verde')->get(array('id', 'modelo', 'color'));

$resultado = Carros::where('color', '=', 'Verde')->get(array('id', 'modelo', 'color'));
</pre>

<hr />

<h2>Conclusiones</h2>

<p>En este capítulo aprendimos a realizar consultas a la base de datos con SQL puro o con la libreria Query Builder. Ahora queda al gusto y las necesidades de cada quien de que manera buscar la información en la base de datos para desarrollar grandes sistemas. Cualquier duda estare antento a responderla en la sección de comentarios.</p>
