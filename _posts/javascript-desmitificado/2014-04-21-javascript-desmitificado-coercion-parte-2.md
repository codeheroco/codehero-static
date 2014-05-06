---
layout: post
title: Coercion Parte 2
status: published
type: post
author: Oscar González
author_login: oscar
author_email: gonzalezgreco@gmail.com
author_url: http://www.oscarvgg.com
date: 2014-04-21 00:00:00.000000000 -04:30
serie: Javascript Desmitificado
dificultad: Heroe
duracion: 10
description: Continuemos con más de coerción. En esta oportunidad voy a presentar su parte más confusa y compleja.
categories:
- Cursos
- JavaScript
tags: []
---
<p>Continuemos con más de coerción. En esta oportunidad voy a presentar su parte más confusa y compleja.</p>
<p>Como es muy difícil imaginar ejemplos para esta sección del contenido de la serie, voy a estar extrayendo la mayoría del código de este capítulo del libro “Expert Javascript” de Mark Daggett.</p>
<p>¿Preparados para ser sorprendidos?.</p>
<hr />
<h2>Coerción... increíble</h2>
<p>Veamos el siguiente ejemplo. Puedes probarlo en una consola de JavaScript; abres el terminal (consola), y si tienes Node.js instalado, solo escribe <code>node</code> y presiona enter, escribe el código de abajo y vuelve a presionar enter.</p>
<pre lang="javascript" >++[[]][+[]]+[+[]] // => '10'
</pre>
<p>¿Increíble, no es cierto?. Si escribimos <code>++[[]][+[]]+[+[]]</code> en una consola de javascript, retorna un string con el valor de '10'.</p>
<p>Voy a explicarlo por partes.</p>
<p><code>[[]]</code> es un array vacío dentro de otro array.</p>
<p><code>[+[]]</code> retorna <code>[0]</code>, ya que el <code>+</code> forza el array interno a su valor numérico.</p>
<p>Entonces quedamos con <code>++[[]][0]</code>. Si lo vemos bien, el primer array es accedido en su posición cero, es similar a <code>myArray[0]</code>. Entonces esta primera parte retornaría el array interno <code>[]</code>. Si ahora aplicamos el <code>++</code>, entonces forzamos el array a su valor numérico, <code>0</code>, pero a la vez lo estamos incrementando, entonces retorna <code>1</code>:</p>
<pre lang="javascript" >++[[]][0] // => 1
</pre>
<p>Quedamos entonces con <code>1+[+[]]</code>. Como el primer valor es un numero y el segundo un array ([0]), entonces el resultado no será combinado por suma sino por concatenación. Resultado en <code>'10'</code></p>
<hr />
<h2>Coercion de Operadores Lógicos</h2>
<p>Los operadores lógicos se utilizan para retornar valores booleanos, pero en ciertas ocasiones son útiles para simplificar código.</p>
<h3>&amp;&amp; (AND)</h3>
<p>Todos conocemos la función de AND a estas alturas. Combina varios resultados booleanos en uno solo.</p>
<pre lang="javascript" >true && true // => true

true && true && false // => false
</pre>
<h3>|| (OR)</h3>
<p>Aparte de su uso común (Ej: true || false = false; true || true = true). También se puede utilizar para asignar valores por defecto:</p>
<pre lang="javascript" >var name = myArray[3] || 'No name';

var bank = myMoney || 10;
</pre>
<h3>! (NOT)</h3>
<p>El operador NOT, toma un operando ubicado a su derecha, que debe ser un valor buleano, y retorna true si es false o false si es true.</p>
<pre lang="javascript" >!true // => false

!false // => true
</pre>
<p>Si el valor no es buleano, será forzado a boleano y luego lo aplicará el operador:</p>
<pre lang="javascript" >// forzado a false
!0 // => true

// forzado a true
!1 // => false

// forzado a true
!'1' // => false

// forzado a false
!undefined // => true

// forza el array a numero (0), luego a false
!+[] // => true
</pre>
<hr />
<h2>Última sorpresa</h2>
<p>Todo lo explicado anteriormente sobre coerción se demuestra a su máxima expresión con el programa jsfuck. Su funcionamiento puede ser probado en <a href="http://www.jsfuck.com/">http://www.jsfuck.com/</a>. Es realmente sorprendente como el siguiente código de 2288 caracteres resulta en el string <code>'codehero'</code>:</p>
<pre lang="javascript" >([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+
[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(!
[]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!!
[]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+([][[]]+[])[!+[]+!+[]]+
(!![]+[])[!+[]+!+[]+!+[]]+(+(+!+[]+[+[]]+[+!+[]]))[(!![]+[])[+[]]+(!![]+[][(![]
+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+
[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+(+![]+([]+[])[([][(![]+[])
[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])
[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+
([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!
+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]
+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+([!
[]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]
+!+[]]+(!![]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+
[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+
[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+
(!![]+[])[+[]]+(!![]+[])[+!+[]]+([![]]+[][[]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+
(+![]+[![]]+([]+[])[([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]
+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]]+[])[!+[]+!+[]
+!+[]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+
(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+[]]]+([]
[[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([]
[[]]+[])[+[]]+([][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]
+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]]+[])[!+[]+!+[]+!+[]]
+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+
[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]])[+!+[]+[+
[]]]+(!![]+[])[+!+[]]])[!+[]+!+[]+[+[]]]](!+[]+!+[]+[+!+[]])[+!+[]]+(!![]+[])[!
+[]+!+[]+!+[]]+(!![]+[])[+!+[]]+(!![]+[][(![]+[])[+[]]+([![]]+[][[]])[+!+[]+[+
[]]]+(![]+[])[!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+
[]]])[+!+[]+[+[]]] // => 'codehero'
</pre>
<hr />
<h2>Cierre</h2>
<p>Todo este asunto de la coerción puede parecer inútil, y tal vez saber utilizarlo al punto de poder escribir 'codehero' con expresiones forzosas parezca osado. Pero al final del día aporta un entendimiento profundo del lenguaje Javascript.</p>
<p>¿Te ha gustado esta entrada?. Comenta y pregunta lo que quieras en la sección de más abajo, quiero saber cuales son tus impresiones.</p>
<p>Recuerda siempre compartir en las redes sociales. Ayuda a que se esparza el conocimiento.</p>
<p>Hasta una próxima entrega de la serie.</p>
