---
layout: post
status: publish
published: true
title: Variables & Constantes
author: Ramses Velasquez
author_login: ramses
author_email: cotufa9@gmail.com
date: 2013-07-16 00:00:20.000000000 -04:30
serie: PHP desde Cero
description: En este capítulo aprenderemos a manejar las variables y las constantes en PHP y veremos cuales son los principales tipos de datos que se utilizan.
dificultad: novato
duracion: 20
categories:
- Cursos
- PHP
tags:
- php
- variables
- constantes
- desde cero
---
<p>Una gran parte de desarrollar scripts y de la programación en general tiene que ver con el manejo y manipulación de datos. En el caso de PHP los datos pueden ir desde simples números enteros, hasta objetos con diferentes propiedades. Para hacer uso de estos datos y poder manipularlos utilizamos las variables y constantes.</p>

<hr />

<h2>Creando Variables en PHP</h2>

<p>Cuando se declara una variable en PHP se le asigna un nombre para referenciarla en diferentes lugares del script. Con este nombre se puede acceder y modificar el valor de la variable.</p>

<p>Antes de aprender a manejar las variables en PHP es importante conocer las reglas que se aplican a la hora de crearlas. Todas las variables de PHP llevan como prefijo el signo (<strong>$</strong>), esto es lo que le indica al interprete que va a manejar una variable. El primer carácter del nombre de la variable debe ser una letra o un carácter de subrayado (<strong>_</strong>). Los siguientes caracteres deben ser solo letras, números o caracteres de subrayado. El resto de caracteres no puede ser usados en los nombres de las variables.</p>

<p>Aquí están unos ejemplos de nombres validos e inválidos para variables:</p>

```php
<?php
$_miNombre  // valido
$miNombre   // valido
$__variable // valido
$variable21 // valido
$_1Grande   // invalido - carácter de subrayado debe estar seguido de una letra al principio
$1Grande    // invalido - se debe empezar con letra o carácter de subrayado
$_er-t      // invalido - contiene un guión -
?>
```

<p>Hay que tener en cuenta que PHP distingue las mayúsculas y las minúsculas en los nombres de las variables, por lo tanto <code>$variable</code> es diferente a <code>$Variable</code>.</p>

<hr />

<h2>Asignando Valor a las Variables</h2>

<p>Los valores se asignan usando el operador de asignación de PHP, el cual es representado por el signo (<strong>=</strong>). Para asignar un valor a una variable se coloca primero el nombre de la variable, luego el operador de asignación seguidor por el valor que se el desee colocar a la variable y por último se termina la sentencia con un (<strong>;</strong>).</p>

<p>Veamos varios ejemplos de asignación de variables:</p>

```php
<?php
    // creando variable nueva y asignando cadena de texto
    $codeHero = "tutoriales";

    // creando variable nueva y asignando un entero
    $numero = 21;

    // resignado valor de $numero en $codeHero, ahora las dos variables tienen el valor de 21
    $codeHero = $numero;
?>
```

<hr />

<h2>Accediendo a Valor de Variables</h2>

<p>Ahora que sabemos como crear y asignar valores a las variables vamos a aprender como acceder al valor que tienen almacenado. Hacer uso del valor que tiene una variable es tan fácil como referenciar la variable en donde necesitemos utilizar su valor.</p>

<p>Por ejemplo, si queremos imprimir en pantalla el valor asignado en una variable llamada <code>$cantidad</code> simplemente escribimos el nombre de la variable a la derecha del comando <strong>echo</strong>.</p>

```php
<?php
    echo $cantidad;
?>
```

<p>Otra opción es imprimir el valor de la variable dentro de una cadena de caracteres. Para esto simplemente colocamos la cadena de texto con comillas dobles y dentro el nombre de la variable, igual que antes utilizando el comando <strong>echo</strong>.</p>

```php
<?php
    echo "La cantidad es: $cantidad";
?>
```

<hr />

<h2>Tipos de Variables</h2>

<p>En esta oportunidad estudiaremos los tipos de variables enteros(integer), punto flotante(float), cadenas de caracteres(string) y booleanos. Los tipos más complejos como arreglos y objetos se verán mas adelante en sus propios capítulos.</p>

<p>Hay que tener en cuenta que en PHP, a diferencia de otros lenguajes como Java o C, no se les define un tipo de dato a las variables. Esto quiere decir que una variable no esta amarrada a un solo tipo de dato. Por lo tanto una variable puede ser creada como String y luego pasar a ser un Integer o la combinación que necesitemos.</p>

<h3>Tipo de Variable Integer</h3>

<p>Las variables de tipo entero son capaces de almacenar un número entero entre el rango de -2147483648 a 2147483647. Los valores negativos se asignan colocando un signo (<strong>-</strong>) delante del número. Si el número que se asigna a una variable supera los números del rango anterior entonces la variable pasa a ser de tipo punto flotante (float).</p>

<p>Ejemplos de asignación de enteros:</p>

```php
<?php
    $entero = 10;

    $enteroNegativo = -13457231;
?>
```



<h3>Tipo de variable Float</h3>

<p>Las variables de tipo punto flotante contienen números que requieren decimales. Ademas este tipo de variable puede contener números más grandes que una variable de tipo entera, como por ejemplo (1.067, 0.25, 423454567098, 84664435.9576).</p>

<p>Ejemplos de asignación de float:</p>

```php
<?php
    $coma_flotante = 9234.98;

    $coma_flotante_mas_preciso = 9547894367.987483701
?>
```

<h3>Tipo de Variable Booleana</h3>

<p>Este tipo de variable sirve solo para tomar los valores de verdadero (<strong>True</strong>) o falso (<strong>False</strong>). Estas variables se usan normalmente como banderas para comprobar si una condición se cumplió o no. Es bueno saber que PHP interpreta estos valores internamente como 1 y 0, aunque no sean lo mismo un booleano True que un entero 1.</p>

```php
<?php  
    $ejecutar = True;

    $terminar_programa = False;
?>
```

<h3>Tipo de Variable String</h3>

<p>En este tipo de datos se guardan cadenas de caracteres como palabras u oraciones. Para un mejor control de estas variables PHP permite el manejo completo o parcial de una cadena de caracteres.</p>

<p>Para asignar un String encerramos el texto entre comillas simples (<strong>'</strong>) o comillas dobles (<strong>"</strong>). Si el texto que se desea guardar contiene comillas dobles o simples, entonces se utilizan las comillas contrarias para encerrar el texto.</p>

```php
<?php

    $cadena = "Una cadena de caracteres";

    $cadena2 = 'Otra cadena de caracteres';

    $cadena3 = "Esta cadena contiene 'comillas simples'";

    $cadena4 = 'Y esta otra contiene "comillas dobles"';

?>
```

<p>También se puede escapar las comillas utilizando (****) antes de la comillas. Este caracter le dice al interprete PHP que lea la comilla como un caracter que se quiere mostrar y no como un delimitador.</p>

```php
<?php

    $cadena5 = 'Esta cadena contiene \'comillas simples\'';

    $cadena6 = "Y esta otra contiene \"comillas dobles\" y \'comillas simples\'";
?>
```

<hr />

<h2>Que son las Constantes?</h2>

<p>Algo constante es algo que no cambia o no varía, esto es exactamente lo que se busca con las constantes en PHP. Las constantes son lo opuesto a las variables en PHP, ya que una vez que se le define su valor este no cambia.</p>

<p>Las constantes son útiles para definir valores que no van a cambiar. Por ejemplo, podemos definir una constante llamada <em>PI</em> que contenga el valor de 3,14. Este valor no va a cambiar, por lo tanto es más lógico utilizar una constante en vez de una variable. La diferencia entre una constante y una variable es que la constante es global, por lo tanto se puede utilizar en todo el ámbito del script sin ningún problema. Quizás esta característica no sea muy relevante ahora, pero a medida que vayamos aprendiendo más veremos con claridad su utilidad.</p>

<hr />

<h2>Definiendo una Constante</h2>

<p>En PHP las constantes se manejan un poco diferente a las variables. Para la asignación de su valor no se utiliza el signo (<strong>=</strong>), si no que se hace uso de la función <code>define('NOMBRE','VALOR')</code> aceptando como primer parámetro el nombre de la constante y como segundo parámetro el dato a asignar. El nombre de la constante no lleva un (<strong>$</strong>) como prefijo y normalmente por convención va todo en mayúsculas.</p>

```php
<?php

    define('URL', 'codehero.co');

    define('FECHA_CREACION', 2013);

?>
```

<hr />

<h2>Accediendo al Valor de Constantes</h2>

<p>Para acceder al valor de una constante simplemente hacemos referencia a su nombre en donde necesitemos su valor, igual que como lo hacemos con las variables solo que en este caso no aplica el signo (<strong>$</strong>).</p>

```php
<?php

    echo URL;

    echo FECHA_CREACION;
?>
```

<hr />

<h2>Conclusión</h2>

<p>En este capitulo conocimos con detalle las variables y las constantes con sus respectivas características. Aprendimos cuales son los principales tipos de datos que se manejan en PHP y que puede almacenar cada uno. En el próximo capítulo veremos operadores, estructuras de control y como darle utilidad a los datos que ya sabemos manejar.</p>

<p>Cualquier duda que tengan estaré feliz responder en los comentarios. Espero que continúen aprendiendo PHP en codehero.</p>
