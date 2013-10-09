---
layout: post
status: publish
published: true
title: Operadores
author: Ramses Velasquez
author_login: ramses
author_email: cotufa9@gmail.com
wordpress_id: 1798
wordpress_url: http://codehero.co/?p=1798
date: 2013-07-30 00:00:00.000000000 -04:30
categories:
- Cursos
- PHP
tags:
- php
- desde cero
- operadores
comments: []
---
<p>Bienvenidos a un nuevo capítulo de la serie PHP desde Cero, en esta oportunidad revisaremos cuales son y para que sirven los <strong>operadores</strong> en PHP.</p>

<p>Los operadores en PHP y en cualquier otro lenguaje de programación, nos permiten realizar operaciones como asignar, multiplicar, concatenar o comparar sobre variables y datos. Los operadores trabajan con operandos, que son lo que especifican las variable y datos que se van a usar en una operación. Dependiendo del lugar de los datos y los operadores se darán diferentes resultados.</p>

<p>Ya en el primer capítulo de PHP hablamos del operador mas importante, el operador de asignación (<strong>=</strong>) que sirve para asignar un valor a una variable. A continuación revisaremos los tipos de operadores que existen en PHP.</p>

<hr />

<h2>Operadores Aritméticos</h2>

<p>Este tipo de operadores sirven para realizar operaciones matemáticas.</p>

<p><a href="http://codehero.co/oc-content/uploads/2013/07/php_operadores_aritmeticos.png"><img src="http://codehero.co/oc-content/uploads/2013/07/php_operadores_aritmeticos.png" alt="operadores aritméticos en php" class="aligncenter size-full wp-image-1802" /></a></p>

<p>Los operadores aritméticos siempre necesitan dos operandos, uno de cada lado del operador. Veamos unos ejemplos:</p>

<pre><?php 
$num = 1 + 2; 
$num = 1 - 2; 
$num = 1 * 2; 
$num = 1 / 2; 
$num = 1 % 2; 
?>
</pre>

<p>En las operaciones se suele utilizar los paréntesis para indicar el orden en el que serán ejecutadas y como se agruparan. Aquí se aplica el mismo orden que en matemáticas, por ejemplo si tenemos <code>$var = 2 + 4 * 3;</code> primero se lleva acabo la multiplicación y luego la suma. Si queremos hacerlo al revés entonces usamos paréntesis <code>$var = (2 + 4) * 3;</code>.</p>

<hr />

<h2>Operadores de Comparación</h2>

<p>Los operadores de comparación proveen la habilidad de comparar un valor contra otro valor y retornar verdadero (True) o falso ( False ) dependiendo del tipo de comparación. Por ejemplo, puedes usar una comparación para verificar que una variable sea igual a un número o que dos Strings sean idénticos. PHP provee una amplia lista de compradores para todas las necesidades.</p>

<p>Los operadores de comparación son usados con dos operandos, uno de cada lado del operador. En la siguiente tabla se ven todos los operadores con un ejemplo.</p>

<p><a href="http://codehero.co/oc-content/uploads/2013/07/php_operadores_comparacion.png"><img src="http://codehero.co/oc-content/uploads/2013/07/php_operadores_comparacion.png" alt="operadores de comparación en php" class="aligncenter size-full wp-image-1803" /></a></p>

<hr />

<h2>Operadores Lógicos</h2>

<p>Los operadores lógicos sirven para evaluar partes de expresiones devolviendo True o False, ayudan a tomar decisiones de como el script debe ejecutarse. Los operadores lógicos de PHP son los siguientes:</p>

<p><a href="http://codehero.co/oc-content/uploads/2013/07/php_operadores_logicos.png"><img src="http://codehero.co/oc-content/uploads/2013/07/php_operadores_logicos.png" alt="php_operadores_logicos" class="aligncenter size-full wp-image-1805" /></a></p>

<p>Estos operadores se entenderán de manera mas clara cuando se unan con las estructuras de control, pero por ahora debemos saber cuales son y que hace cada uno.</p>

<hr />

<h2>Operadores de Incremento/Decremento</h2>

<p>Cuando se programa en cualquier lenguaje es muy común tener que incrementar el valor de una variable en 1. Esto se puede lograr con el siguiente código <code>$variable = $variable + 1;</code>. Sin embargo, si usamos los operadores de incremento/decremento es mas sencillo. Estos operadores son <strong>++</strong> (para incrementar) y <strong>--</strong> (para "decrementar") y se combinan con un operando que será la variable a editar.</p>

<p>Hay dos maneras que usar estos operadores, ya que se pueden colocar antes o después de la variable. Si se coloca antes, entonces primero se hace la operación(sumar 1 o restar 1) y luego se utiliza la variable. Si se coloca después, primero se utiliza la variable y luego se lleva a cabo la operación (sumar 1 o restar 1). Veamos unos ejemplos para tener una mejor idea de como funciona.</p>

<pre><?php 
$variable1 = 10;
$variable2 = 10;
$variable3 = 10;
$variable4 = 10;
echo $variable1 ++ ; // Esto imprimida 10 y luego incrementara la variable en uno 
echo $variable1;
echo $variable2 --; // Esto imprimida 10 y luego restara 1 a la variable
echo $variable2;
echo ++ $variable3; // Aquí se incrementa 1 primero y luego se imprime. Por lo tanto se imprime 11
echo $variable3;
echo -- $variable4;// Se resta primero 1 y luego se imprime, el resultado será 9;
echo $variable4;
?>
</pre>

<hr />

<h2>Operador de Concatenación</h2>

<p>Este operador se usa para unir diferentes valores(String o números) y nuevas cadenas de caracteres (Strings), es representado por un punto (<strong>.</strong>). Veamos unos ejemplos:</p>

<pre><?php 

echo 'Mi color favorito es el '  . 'Rojo'; // el resultado es -> Mi color favorito es el Rojo

$animal = "Perro";

// se puede usar para unir variables con textos 
echo 'Mi animal preferido es el ' . $animal; // el resultado es -> Mi animal preferido es el Perro

$numero = 9;

echo "Me gusta el numero " . $numero; // el resultado es -> Me gusta el numero 9

?>
</pre>

<hr />

<h2>Operadores de Asignación</h2>

<p>El operador de asignación principal ( <strong>=</strong> ) también puede ser combinado con los operadores aritméticos y de concatenación. Esto nos sirve para acortar operaciones que se van a realizar sobre una variable y guardar el resultado sobre la misma. Por ejemplo si necesitamos sumar 5 a una variable lo haríamos de la siguiente manera.</p>

<p><code>$variable = $variable + 5 ;</code></p>

<p>Pero con el operador de asignación unido con el operador de suma entonces obtenemos algo mas corto.</p>

<p><code>$variable += 5;</code></p>

<p>A continuación veremos todos los operadores de asignación:</p>

<p><a href="http://codehero.co/oc-content/uploads/2013/07/php_operadores_asignacion.png"><img src="http://codehero.co/oc-content/uploads/2013/07/php_operadores_asignacion.png" alt="operadores de asignación en php" class="aligncenter size-full wp-image-1804" /></a></p>

<hr />

<h2>Conclusión</h2>

<p>Creo que por ahora esto es suficiente información, ya hemos aprendido todos los operadores que nos brinda PHP. Para poder hacer grandes aplicaciones primero tenemos que tener claro todos estos conceptos, como usarlos y que resultado esperar de cada operación que se ejecuta.</p>

<p>Ahora tomate tu tiempo, practica y experimenta posibles combinaciones para que entiendas el funcionamiento de todos los operadores de PHP. Cualquier duda que tengan estaré pendiente de contestarla en la sección de comentarios.</p>
