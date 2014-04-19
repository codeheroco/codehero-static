---
layout: post
status: publish
published: true
title: Operadores
author: Ramses Velasquez
author_login: ramses
author_email: cotufa9@gmail.com
date: 2013-07-30 00:00:00.000000000 -04:30
serie: PHP desde Cero
description: En este capítulo aprenderemos a manejar los operadores en PHP.
dificultad: novato
duracion: 20
categories:
- Cursos
- PHP
tags:
- php
- desde cero
- operadores
---
<p>Bienvenidos a un nuevo capítulo de la serie PHP desde Cero, en esta oportunidad revisaremos cuales son y para que sirven los <strong>operadores</strong> en PHP.</p>

<p>Los operadores en PHP y en cualquier otro lenguaje de programación, nos permiten realizar operaciones como asignar, multiplicar, concatenar o comparar sobre variables y datos. Los operadores trabajan con operandos, que son lo que especifican las variable y datos que se van a usar en una operación. Dependiendo del lugar de los datos y los operadores se darán diferentes resultados.</p>

<p>Ya en el primer capítulo de PHP hablamos del operador mas importante, el operador de asignación (<strong>=</strong>) que sirve para asignar un valor a una variable. A continuación revisaremos los tipos de operadores que existen en PHP.</p>

<hr />

<h2>Operadores Aritméticos</h2>

<p>Este tipo de operadores sirven para realizar operaciones matemáticas.</p>


Operador   | Tipo           | Descripción				                        | Ejemplo
-----------| -------------  | ------------		                           | ---------------
+          | Suma           | Calcula la suma de dos operandos	         | $total = 10 + 20;
-          | Resta          | Calcula la diferencia entre dos operandos  |  $total = 10 - 20;
*          | Multiplicación | Multiplica dos operandos      		         |  $total = 10 * 20;
/          | División       | Divide dos operandos                       |  $total = 10 / 20;
%          | Modulo         | Calcula el residuo de una división         |  $total = 10 % 20;

<p>Los operadores aritméticos siempre necesitan dos operandos, uno de cada lado del operador. Veamos unos ejemplos:</p>

```php
<?php
$num = 1 + 2;
$num = 1 - 2;
$num = 1 * 2;
$num = 1 / 2;
$num = 1 % 2;
?>
```

<p>En las operaciones se suele utilizar los paréntesis para indicar el orden en el que serán ejecutadas y como se agruparan. Aquí se aplica el mismo orden que en matemáticas, por ejemplo si tenemos <code>$var = 2 + 4 * 3;</code> primero se lleva acabo la multiplicación y luego la suma. Si queremos hacerlo al revés entonces usamos paréntesis <code>$var = (2 + 4) * 3;</code>.</p>

<hr />

<h2>Operadores de Comparación</h2>

<p>Los operadores de comparación proveen la habilidad de comparar un valor contra otro valor y retornar verdadero (True) o falso ( False ) dependiendo del tipo de comparación. Por ejemplo, puedes usar una comparación para verificar que una variable sea igual a un número o que dos Strings sean idénticos. PHP provee una amplia lista de compradores para todas las necesidades.</p>

<p>Los operadores de comparación son usados con dos operandos, uno de cada lado del operador. En la siguiente tabla se ven todos los operadores con un ejemplo.</p>

Operador   | Tipo              | Descripción			                                                                   | Ejemplo
-----------| -------------     | ------------		                                                                    | ---------------
==         | Igual a           | Retorna True si el primer operando es igual al segundo                              | $var = 1 == 1; // el valor de $var será True
!=  o <>   | Diferente a       | Retornan True si el primer operando es diferente al segundo                         | $var = 1 != 1; // el valor de $var sera False
===        | Igual a           | Retorna True si el primer operando es igual al segundo en valor y tipo de dato      | $var = 1=== 1; // el valor de $var será True
!==        | Igual a           | Retorna True si el primer operando no es igual al segundo en valor y tipo de dato   | $var = 1 !== '1'; // el valor de $var será False
<          | Menor que         | Retorna True si el primer operando es menor que el segundo                          | $var = 1 < 2; // el valor de $var será True
>          | Mayor que         | Retorna True si el primer operando es mayor que el segundo                          | $var = 1 > 2; // el valor de $var será False
<=         | Menor o igual que | Retorna True si el primer operando es menor o igual que el segundo                  | $var = 1 <= 1; // el valor de $var será True
>=         | Mayor o igual que | Retorna True si el primer operando es mayor o igual que el segundo                  | $var = 1 >= 2; // el valor de $var será False

<hr />

<h2>Operadores Lógicos</h2>

<p>Los operadores lógicos sirven para evaluar partes de expresiones devolviendo True o False, ayudan a tomar decisiones de como el script debe ejecutarse. Los operadores lógicos de PHP son los siguientes:</p>

Operador   | Tipo | Descripción			                                           | Ejemplo
-----------| -----| ------------		                                            | ---------------
 &&        | AND  | Realiza una operación lógica "AND"                          | $var = True && True; // $var tendrá valor True $var = True && False; // $var tendrá valor False
 ||        | OR   | Realiza una operación lógica "OR"                           | $var = True || True; // $var tendrá valor True $var = True || False; // $var tendrá valor True
 xor       | XOR  | Realiza una operación lógica "XOR" ( OR exclusivo)          | $var = True xor True; // $var tendrá valor False $var = True && False; // $var tendrá valor True
 !         | NOT  | Realiza una negación de la operación a la cual se anteponga | $var = ! True ; // $var tendrá valor False $var = ! False; // $var tendrá valor True

<p>Estos operadores se entenderán de manera mas clara cuando se unan con las estructuras de control, pero por ahora debemos saber cuales son y que hace cada uno.</p>

<hr />

<h2>Operadores de Incremento/Decremento</h2>

<p>Cuando se programa en cualquier lenguaje es muy común tener que incrementar el valor de una variable en 1. Esto se puede lograr con el siguiente código <code>$variable = $variable + 1;</code>. Sin embargo, si usamos los operadores de incremento/decremento es mas sencillo. Estos operadores son <strong>++</strong> (para incrementar) y <strong>--</strong> (para "decrementar") y se combinan con un operando que será la variable a editar.</p>

<p>Hay dos maneras que usar estos operadores, ya que se pueden colocar antes o después de la variable. Si se coloca antes, entonces primero se hace la operación(sumar 1 o restar 1) y luego se utiliza la variable. Si se coloca después, primero se utiliza la variable y luego se lleva a cabo la operación (sumar 1 o restar 1). Veamos unos ejemplos para tener una mejor idea de como funciona.</p>

```php
<?php
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
```

{% include middle-post-ad.html %}

<hr />

<h2>Operador de Concatenación</h2>

<p>Este operador se usa para unir diferentes valores(String o números) y nuevas cadenas de caracteres (Strings), es representado por un punto (<strong>.</strong>). Veamos unos ejemplos:</p>

```php
<?php

echo 'Mi color favorito es el '  . 'Rojo'; // el resultado es -> Mi color favorito es el Rojo

$animal = "Perro";

// se puede usar para unir variables con textos
echo 'Mi animal preferido es el ' . $animal; // el resultado es -> Mi animal preferido es el Perro

$numero = 9;

echo "Me gusta el numero " . $numero; // el resultado es -> Me gusta el numero 9

?>
```

<hr />

<h2>Operadores de Asignación</h2>

<p>El operador de asignación principal ( <strong>=</strong> ) también puede ser combinado con los operadores aritméticos y de concatenación. Esto nos sirve para acortar operaciones que se van a realizar sobre una variable y guardar el resultado sobre la misma. Por ejemplo si necesitamos sumar 5 a una variable lo haríamos de la siguiente manera.</p>

<p><code>$variable = $variable + 5 ;</code></p>

<p>Pero con el operador de asignación unido con el operador de suma entonces obtenemos algo mas corto.</p>

<p><code>$variable += 5;</code></p>

<p>A continuación veremos todos los operadores de asignación:</p>

Operador | Tipo                      | Descripción			                                                                                             | Ejemplo
---------| -------------             | ------------		                                                                                              | ---------------
 =       | Asignación                | Realiza la asignación de un valor que este a la derecha a una variable que este a la izquierda del operador   | $var = 10 ;
 +=      | Suma-Asignación           | Suma el valor de la derecha al valor de la variable a la izquierda y lo asigna en la variable                 | $var = 10; $var += 5; // $var será 15
 -=      | Resta-Asignación          | Resta el valor de la derecha al valor de la variable a la izquierda y lo  asigna en la variable               | $var = 10; $var -= 5; // $var será 5
 *=      | Multiplicación-Asignación | Multiplica el valor de la derecha y el valor de la variable a la izquierda y lo asigna en la variable         | $var = 10; $var *= 5; // $var será 50
 /=      | División-Asignación       | Divide el valor de la derecha y el valor de la variable a la izquierda y lo asigna en la variable             | $var = 10; $var /= 5; // $var será 2
 %=      | Módulo-Asignación         | Calcula el módulo del valor de la derecha y el valor de la variable a la izquierda y lo asigna en la variable | $var = 10; $var %= 5; // $var será 0
 .=      | Concatena-Asignación      | Concatena el valor de la derecha y el valor de la variable a la izquierda y lo asigna en la variable          | $var = 'code'; $var .= 'hero'; // $var será codehero

<hr />

<h2>Conclusión</h2>

<p>Creo que por ahora esto es suficiente información, ya hemos aprendido todos los operadores que nos brinda PHP. Para poder hacer grandes aplicaciones primero tenemos que tener claro todos estos conceptos, como usarlos y que resultado esperar de cada operación que se ejecuta.</p>

<p>Ahora tomate tu tiempo, practica y experimenta posibles combinaciones para que entiendas el funcionamiento de todos los operadores de PHP. Cualquier duda que tengan estaré pendiente de contestarla en la sección de comentarios.</p>
