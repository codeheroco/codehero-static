---
layout: post
status: publish
published: true
title: Funciones
author: Ramses Velasquez
author_login: ramses
author_email: cotufa9@gmail.com
wordpress_id: 2093
wordpress_url: http://codehero.co/?p=2093
date: 2013-08-27 00:00:21.000000000 -04:30
categories:
- Cursos
- PHP
tags:
- funciones
- php
- variables
- ambito
- referencia
- parametros
comments: []
---
<p>En el mundo de la programación hay dos maneras de escribir código. Una es escribiendo códigos largos, extensos y repitiendo pedazos del código. La otra es dividiendo el código en pequeñas partes que se puedan volver a usar sin que se tenga que repetir el mismo código una y otra vez. Obviamente la segunda manera es la correcta y aquí es donde entran en juego las <strong>funciones</strong> (function).</p>

<hr />

<h2>¿Qué es una Función?</h2>

<p>Las funciones son básicamente pedazos de código que pueden ser llamados desde un script para realizar una tarea especifica.  A las funciones se les pueden pasar argumentos o parámetros de ser necesario para que utilicen sus valores para realizar alguna operación y retorna algún valor al final de la ejecución.</p>

<p>En PHP existen dos tipos de funciones, las que PHP trae por defecto  ara que el programador las utilice y las que el programador crea desde cero dependiendo de sus necesidades.</p>

<hr />

<h2>¿Como Escribir una Función en PHP?</h2>

<p>El primer paso crear una función en PHP es ponerle un nombre con el cual se pueda hacer referencia a la misma. Las convenciones para los nombres de las funciones son las mismas que para las variables. Por lo tanto, el nombre de la función debe empezar con una letra o con un guión bajo (_) y no se permiten espacios o signos de puntuación. Por ultimo debes tener cuidado de que el nombre no sea el mismo que el de alguna función nativa de PHP.</p>

<p>Las funciones en PHP se crean usando la palabra clave <strong>function</strong> seguida por el nombre y por ultimo un para de paréntesis <strong>()</strong>. El código que ejecutara la función es encerrado entre corchetes. Veamos un ejemplo sencillo de como se declara una función.</p>

<pre>
<?php
function imprimirHola()
{
       echo "Hola";
}
?>
</pre>

<hr />

<h2>¿Como Retornar un Valor de una Función?</h2>

<p>Las funciones pueden retornar un valor al final de su ejecución si es que el programador lo necesita. Este valor puede ser de cualquier tipo y se hace con la sentencia <strong>return</strong>.</p>

<pre>
<?php
function retornarDiez()
{
     return 10;
}
?>
</pre>

<hr />

<h2>Pasando Parámetros a la Función</h2>

<p>Los parámetros o argumentos pueden ser pasados a una función y no hay limitación en cuanto al numero de parámetros que puedan ser. 
Una función puede ser diseñada para aceptar parámetros mediante la colocación de los parámetros que se esperan dentro de los paréntesis que van después del nombre de la función. Las parámetros que escriben como si fueran variables y si son varios se deben separar con comas. En el siguiente ejemplo vamos a utilizar los parámetros <strong>$param1</strong> y <strong>$param2</strong>. Estas parámetros pueden ser utilizados dentro de la función como variables normales.</p>

<pre>
<?php
function sumarNumeros ($parametro1, $parametro2)
{
     return $parametro1 + $parametro2;
    // En esta función podemos observar como se reciben dos parámetros para luego sumarlos 
    // y devolver el resultado .
}
?>
</pre>

<h2>Llamando a una Función</h2>

<p>Las funciones en PHP se llaman usando el nombre con el cual se declararon, junto con los valores que se pasen como parámetros si es que son necesarios. En el siguiente ejemplo llamaremos a la función <strong>sumarNumeros</strong>.</p>

<pre>
<?php
function sumarNumeros ($parametro1, $parametro2)
{
     return $parametro1 + $parametro2;
}

echo sumarNumeros( 10 , 20);
    // aquí estamos haciendo la llamada a la función
    // y estamos pasando como parámetros los numeros 10 y 20

?>
</pre>

<hr />

<h2>Parámetros por Referencia</h2>

<p>En el ejemplo anterior solo pasamos dos constantes a la función. Pero si hubiéramos pasado dos variables y dentro de las función estas variables se hubieran visto modificadas cuando la función terminara las variables seguirían teniendo del mismo valor con el que entraron a la función. Veamos un ejemplo de esto:</p>

<pre>
<?php
function sumarNumeros ($parametro1, $parametro2)
{
        $parametro1 += 10;
        $parametro2 += 10;
        return $parametro1 + $parametro2;
}

$param1 = 10;
$param2 = 20;

echo "Antes param1 = ".$param1.", param2 = ".$param1." <br>";
addNumbers ($param1, $param2);
echo "Después param1 = ".$param1.", param2 = ".$param1." <br>";

// La salida del escript anterior será la siguiente
// Antes param1 = 10, param2 = 20
// Después param1 = 10, param2 = 20

?>
</pre>

<p>Si queremos que la función pueda modificar los valores de las variables que se le pasan por parámetros entonces tenemos que pasarlas por referencia. Esto significa que le estamos pasando una referencia a la variable y no solamente el valor de la misma. Para especificar que estamos pasando la variable por referencia tenemos que anteponer el sigo <strong>et (&amp;)</strong> al nombre de la variable en la declaración de la función. Veamos un ejemplo de como funciona esto.</p>

<pre>
<?php
function sumarNumeros (&$parametro1, &$parametro2)
{
        $parametro1 += 10;
        $parametro2 += 10;
        return $parametro1 + $parametro2;
}

$param1 = 10;
$param2 = 20;

echo "Antes param1 = ".$param1.", param2 = ".$param1." <br>";
addNumbers ($param1, $param2);
echo "Después param1 = ".$param1.", param2 = ".$param1." <br>";

// La salida del escript anterior será la siguiente
// Recordemos que estamos pasando las variables por referencia 
// y por lo tanto la variable es modifica desde adentro de la función 
// Antes param1 = 10, param2 = 20
// Después param1 = 20, param2 = 30

?>
</pre>

<hr />

<h2>Alcance o Ambito de Variables</h2>

<p>Ahora que sabemos como utilizar las funciones en PHP debemos aprender cual es el alcance ("scope") de las variables en PHP. Cuando una variable es declarada fuera de la función entonces su alcance es global, es decir es accesible desde cualquier parte del script que se este usando. Por otro lado, cuando una variable es declarada dentro de una función entonces se dice que tiene un alcance local, lo que quiere decir que solo se puede utilizar dentro de la función en la cual se declaro.</p>

<p>Esto quiere decir que puedes tener una variable global y una variable local con el mismo nombre pero con diferentes valores. En el siguen ejemplo la variable  <strong>$cadena</strong> en los dos ámbitos, local y global con diferentes valores.</p>

<pre>
<?php
function mostrarCadena()
{
        $cadena = "Cadena local";
        echo "Cadena 2 = ".$cadena."<br>";
}

$cadena = "Cadena global";
echo "Cadena 1 = ".$cadena."<br>";

mostrarCadena();

// el resultado de este script será el siguiente
// Cadena 1 = Cadena global
// Cadena 2 = Cadena local

?>
</pre>

<p>Esto puede ser un problema si queremos acceder a una variable global en un ámbito local y hay conflicto por lo nombre de las variables. Pero PHP proporciona la variable <strong>$GLOBALS</strong>, que no es mas que un arreglo que contiene todas las variables globales. Por lo tanto si queremos acceder a una variable global dentro de una función, pero la función ya posee una variable con ese nombre entonces accedemos con $GLOBALS. Veamos un ejemplo de como podemos utilizar esto</p>

<pre>
<?php
function mostrarCadena ()
{

       $cadena = "Cadena local";
        echo "Cadena 2 = ".$cadena."<br>";
       
       echo "Cadena 1 GLOBAL = ".$GLOBALS['cadena']."<br>";

}


$cadena = "Cadena global";
echo "Cadena 1 = ".$cadena."<br>";

mostrarCadena();

// el resultado de este script será el siguiente
// Cadena 1 = Cadena global
// Cadena 2 = Cadena local
// Cadena 1 GLOBAL = Cadena global

?>
</pre>

<hr />

<h2>Conclusión</h2>

<p>En esta oportunidad hemos aprendido como crear nuestras funciones en PHP. Esto nos va a hacer la vida mucho mas fácil ya que podemos llamar a pedazos de código y así nuestro script será mas ordenado y eficiente. Cualquier duda estaré atento a responderte en la sección de comentarios.</p>
