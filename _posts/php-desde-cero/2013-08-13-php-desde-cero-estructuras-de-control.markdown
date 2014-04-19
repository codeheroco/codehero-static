---
layout: post
status: publish
published: true
title: Estructuras de Control
author: Ramses Velasquez
author_login: ramses
author_email: cotufa9@gmail.com
date: 2013-08-13 00:00:35.000000000 -04:30
serie: PHP desde Cero
description: Tutorial para aprender las diferentes estructuras de control que posee PHP. While, Do While, For, If, Switch Case.
dificultad: novato
duracion: 20
categories:
- Cursos
- PHP
tags:
- Tutorial
- php
- estructuras
- control
- while
- for
---
<p>Bienvenidos a un nuevo capítulo de la serie PHP desde Cero, en los anteriores capítulos vimos cuales eran los tipos de variables, constantes y los operadores de asignación en PHP. En esta oportunidad estudiaremos cuales son las estructuras de control y aprenderemos como utilizarlas con lo que hemos aprendido anteriormente.</p>

<p>Para que un script sea útil debe poder tomar decisiones y repetir tareas dependiendo de los datos que tenga, esto se logra con las estructuras de control. Por ejemplo, cuando hacemos inicio de sesión queremos que solo sea efectivo si el usuario ingreso correctamente la clave.</p>

<p>En términos de programación esto se llama <strong>control de flujo</strong> y <strong>bucles</strong>. Esto son estructuras que nos brinda PHP y nos permite que el código tome decisiones basadas en ciertos criterios. Estas estructuras se pueden descomponer en dos categorías.</p>

<p>Sentencias Condicionales:</p>

<ul>
<li>Sentencia if</li>
<li>Sentencia if ... else</li>
<li>Sentencia switch case</li>
</ul>

<p>Sentencias de Bucles:</p>

<ul>
<li>Bucle for</li>
<li>Bucle while</li>
<li>Bucle do .. while</li>
</ul>

<hr />

<h2>Sentencias Condicionales</h2>

<p>Las sentencias condicionales son el núcleo para la toma de decisiones en los scripts de PHP. Estas sentencias básicamente controlan si parte de un código es ejecutado o no dependiendo del valor (True o False) que devuelve de una expresión que es evaluada. Visto de otra manera, estas sentencias dicen que camino se debe tomar a la hora de ejecutar el código. Las sentencias condicionales que provee PHP ( y casi todos los lenguajes de programación ) son <strong>if</strong>, <strong>if … else</strong>, <strong>if .. elseif</strong> y <strong>switch case</strong>.</p>

<h3>Sentencia If</h3>

<p>El bloque mas básico de un código condicional es el <strong>if</strong>. La primera línea de esta sentencia consiste en la palabra <strong>if</strong> seguida por la expresión que será evaluada entre paréntesis.</p>

```php
<?php
$variable = 1;
if ($variable > 2)
?>
```

<p>En el ejemplo anterior si el valor de <strong>$variable</strong> es menor que 2 la expresión será evaluada como True, si no entonces será False.</p>

<p>El segundo paso para construir la sentencia <strong>if</strong> es especificar el código que será ejecutado si la expresión es evaluada como True. Esto se logra colocando el código que se desee ejecutar entre llaves <strong>{}</strong>. Si la condición no se cumple entonces el interprete PHP ignora el código rodeado por las llaves <strong>{}</strong>.</p>

```php
<?php
$variable = 1;
if ($variable < 2)
{
     // instrucciones que seran ejecutadas si la condición se cumple
     echo 'El valor de mi variable es menor que 2';
     $variable++;
}
?>
```

<h3>Sentencia If .. Else</h3>

<p>La sentencia if anterior nos permite especificar que hacer si la expresión que se evalúa es verdadera. Sin embargo, no nos permite especificar que hacer cuando la expresión es evaluada como falsa. Aquí es donde aparece la sentencia <strong>if… else</strong>.</p>

<p>La sintaxis para <strong>if .. else</strong> es la misma que para el <strong>if</strong>, pero se le agrega la sentencia <strong>else</strong> para especificar la acción alternativa cuando la expresión sea falsa.</p>

```php
<?php
$usuario = "juan";
if ($usuario == "admin")
{
      // Se ejecuta cuando la expresión es True
      echo 'Hola Admin, tiene todos los permisos';
}
else
{
      // Se ejecuta cuando la expresión es False
      echo 'Hola ' . $usuario ;
}
?>
```

<p>Como se puede ver en el anterior ejemplo el código que sigue la sentencia <strong>if</strong> se ejecuta si la expresión que se evaluó es True, en cambio si la expresión fue False entonces se ejecuta el código que esta después de la sentencia <strong>else</strong>.</p>

<p>La sentencias <strong>if .. else</strong> pueden ser creadas con un nivel mas de control. Esta seria la sentencia <strong>if .. elseif</strong>, con la cual se pueden anidar varios <strong>if</strong>.</p>

```php
<?php
$usuario = "supervisor";
if ($usuario == "admin")
{
      echo 'Hola Admin, tiene todos los permisos';
}
else if ($usuario == "supervisor")
{
      echo 'Hola Supervisor';
}
else
{
      echo 'Hola ' . $usuario ;
}
?>
```

<h3>Sentencia Switch Case</h3>

<p>La sentencia <strong>if .. else</strong> funciona bien si queremos evaluar pocas opciones, pero cuando la cantidad de posibilidades se incrementa no es muy practico utilizar esta vía. En estos casos es cuando aparece la sentencia <strong>switch case</strong>, la cual se define de la siguiente manera.</p>

```php
<?php
switch ($variable)
{
     case "constante1" :
      Codigo PHP
     break;

     case "constante1" :
      Codigo PHP
     break;

     case "constante1" :
       Codigo PHP
     break;

     default :
      Codigo PHP
     break;
}
?>
```

<p>Pueden haber toda la cantidad de sentencias <strong>case</strong> que sean necesarias para comparar todas las opciones que se necesiten. Cuando una coincidencia es encontrada el código que encuentra justo después del <strong>case</strong> es ejecutado hasta donde se encuentre el <strong>break</strong>. La sentencia <strong>break;</strong> es muy importante ya que sin esta todos los cases siguientes se ejecutarían también. La sentencia <strong>default</strong> especifica la acción a ejecutar en caso que de que ninguno de los case se hayan ejecutado.</p>

```php
<?php
$carro = "Edge";
// La comparación en el switch verifica que la variable se igual a alguno de los datos de los case
switch ($carro)
{
     case "Caravan" :
     print "Construido por Dodge";
     break;

     case "Supra" :
     print "Construido por Toyota";
     break;

     case "Edge" :
     // En este caso se ejecutara este código
     print "Construido por Ford";
     break;

     case "540i" :
     print "Construido por BMW";
     break;

     case "Prelude" :
     print "Construido por Honda";
     break;

     default  :
     print "Modelo desconocido ";
     break;
}
?>
```

<hr />

{% include middle-post-ad.html %}

<h2>Sentencias de Bucles</h2>

<p>Los bucles son la principal manera de indicarle al interprete de PHP que ejecute una tarea varias veces hasta que una condición se cumpla. Las sentencias para ejecutar bucles son <strong>while</strong>, <strong>do .. while</strong> y <strong>for</strong>.</p>

<h3>Bucles For</h3>

<p>Supongamos que deseamos sumar un numero a si mismo 10 veces. Una manera de hacerlo seria la siguiente:</p>

```php
<?php
$variable = 10;

$variable += $variable;
$variable += $variable;
$variable += $variable;
$variable += $variable;
$variable += $variable;
$variable += $variable;
$variable += $variable;
$variable += $variable;
$variable += $variable;
$variable += $variable;
?>
```

<p>Esto solucionaría el problema que tenemos, pero que pasa si tenemos que hacerlo 100 veces o 1000 veces. Para estos casos tenemos el bucle <strong>for</strong>, el cual se declara de la siguiente manera.</p>

```php
<?php
for ( inicializador ; expresion condicional ; expresion bucle )
{
      // Código PHP que se va a repetir
}
?>
```

<p>El inicializador es una variable numérica que es puesta con el valor en donde se desea comenzar, normalmente se utiliza <code>$i = 0</code>. La expresión condicional especifica la condición que se debe aprobar para que el ciclo continúe, por ejemplo <code>$i &lt; 1000</code>. Mientras <strong>$i</strong> sea menor que 1000 entonces el ciclo continuara repitiendose. Por ultimo viene la expresión bucle, la cual especifica la acción a realizar con la variable <strong>$i</strong>. Por ejemplo, incrementar en 1 <code>$i++</code>.</p>

<p>Cuando juntamos todo esto podemos crear un bucle <strong>for</strong></p>

```php
<?php
$j = 10;
for ($i=0; $i<10; $i++)
{
      $j += $j;
}
?>
```

<h3>Bucles While</h3>

<p>El bucle <strong>for</strong> que vimos anteriormente funciona muy bien cuando sabemos la cantidad de veces que necesitamos repetir el código con anterioridad. En muchas ocaciones será necesario repetir un código pero sin saber cuando la condición de parada será cumplida, para estos casos esta el bucle <strong>while</strong>.</p>

<p>Basicamente, el bucle <strong>while</strong> repite el código hasta que una cierta condición se cumpla. La sintaxis de este bucle es la siguiente</p>

```php
<?php
while (condicion)
{
      // PHP Código que se repite
}
?>
```

<p>En el siguiente código la condición es una expresión que puede devolver True o False y podemos ver que el código que se repetirá será <code>$variable = $variable + $j;</code>.</p>

```php
<?php
$variable = 0;
$j = 10;

while ($variable < 100 )
{
      $variable = $variable + $j;
}
?>
```

<p>Aquí la expresión del bucle evalúa si <strong>$variable</strong> es menor a 100. Si <strong>$variable</strong> es mayor a 100, entonces el interprete de PHP omitirá todo el código que este dentro de las llaves <strong>{}</strong>. Pero si <strong>$variable</strong> es menor a 100, entonces el código dentro de las llaves es ejecutado y la condición de vuelve a evaluar. Este proceso se repite hasta que <strong>$variable</strong> sea mayor a 100.</p>

<h3>Bucles Do .. While</h3>

<p>Podemos pensar en este bucle como un <strong>while</strong> invertido. El bucle <strong>while</strong> primero evalúa la expresión y luego ejecuta el código dependiendo del resultado. Si la expresión que se evaluó retorna False la primera vez entonces el código nunca se ejecuta. En cambio el <strong>do .. while</strong> primero ejecuta el código y luego evalúa la expresión, en caso de que sea True entonces se vuelve a ejecutar y asi hasta que la expresión sea False.</p>

```php
<?php
do
{
    // Código PHP que se repite
} while (condicion)
?>
```

<p>En el siguiente ejemplo el bucle va a continuar hasta que <strong>$i</strong> sea igual a 0, pero el <strong>do .. while</strong> asegura que minimo se ejecute una vez.</p>

```php
<?php
$i = 10;
do
{
 $i--;
} while ($i > 0)
?>
```

<hr />

<h2>Conclusión</h2>

<p>En este capítulo hemos aprendido las estructuras de control de PHP, las cuales son muy importantes para darle lógica a nuestros scripts. Por esto es bueno que tengamos claro cuando se debe usar cada una y esto solo se logra a través de la practica. Cualquier duda estaré atento para responderla en la sección de comentarios.</p>
