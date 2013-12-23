---
layout: post
status: publish
published: true
title: Estructuras de control (IF & LOOPS)
author: Ricardo Sampayo
author_login: ricardo
author_email: ricardo9588@gmail.com
author_url: http://www.ricardosampayo.com
wordpress_id: 1041
wordpress_url: http://codehero.co/?p=1041
date: 2013-06-19 03:35:35.000000000 -04:30
categories:
- Cursos
- Ruby
tags:
- Ruby
- desde cero
- estructuras
- loops
- ciclos
---
<p>Bienvenidos una vez más a Ruby desde Cero. Hasta este capítulo hemos aprendido como instalar, configurar Ruby en nuestros computadores y conocimos un poco las variables y objetos principales del sistema.</p>

<p>Para este nuevo capítulo, veremos las estructuras de control del sistema donde nos pasaremos por las estructuras condicional y las estructuras iterativas. Detallando en cada una de ellas la sintaxis y demostración.</p>

<hr />

<h2>Estructuras de control.</h2>

<p>Ruby ofrece diferentes estructuras de control que nos permiten alterar el flujo de la ejecución del programa, en este turorial veremos las siguientes.</p>

<ul>
<li>Estructuras de control condicionales (IF ELSE ELSIF UNLESS CASE).</li>
<li>Estructuras de control iterativas (BUCLES).</li>
</ul>

<h3>Estructuras de control condicionales</h3>

<p>Estas estructuras nos ofrecen alterar el funcionamiento de un procedimiento según una condición.</p>

<h4>IF ELSE ELSIF</h4>

<p>Estas estructuras simplemente revisan que una condición se cumpla para ejecutar una parte del código. Cabe destacar que los valores nulos (<strong>nil</strong>) o los ceros en valores numéricos se consideran valores falsos. Para empezar debemos conocer la sintaxis de este tipo de estructuras (lo que esta entre corchetes ([]) no es obligatorio).</p>

<pre>if conditional [then]
      code...
[elsif conditional [then]
      code...]...
[else
      code...]
end
</pre>

<p>En el primer ejemplo ejecutaremos un programa sencillo de las estructuras de control para ir familiarizándonos con la sintaxis:</p>

<pre>#!/usr/bin/ruby

name = "Ricardo"

if name == "Ricardo"
    puts "Hola Ricardo"
end

if name == "RicArDO"
    puts "Si es RicArDO"
else
    puts name + " no es igual a RicArDO"
end
</pre>

<p>y el resultado al ejecutar el Scripts es:</p>

<pre>>> ruby Desktop/conditionalCodehero.rb 
Hola Ricardo
Ricardo no es igual a RicArDO
</pre>

<p>En este ejemplo vemos cómo se ejecuta una condición sencilla y es importante destacar como influye el uso de mayúsculas y minúsculas al comparar cadena de caracteres.</p>

<p>A continuación mostraremos ejemplos de estructuras condicionales utilizando números y booleanos.</p>

<pre>#!/usr/bin/ruby

numero = 3

if numero > 5 
    puts  "#{numero} es mayor que 5"
elsif numero == 3
    puts "#{numero} es igual a 3"
else
    puts "#{numero} es menor que 5 pero no es igual a 3"
end

if numero > 3 
    puts "#{numero} es mayor que 3"
end

isVerdadero = false

if (!isVerdadero) and (numero >= 3)
    puts "la variable es falsa y el número es mayor o igual a 3"
end
</pre>

<p>Al ejecutar este Script tenemos como resultado lo siguiente:</p>

<pre>>> ruby Desktop/conditionalCodehero.rb 
3 es igual a 3
la variable es falsa y el número es mayor o igual a 3
</pre>

<p>En este ejemplo destacamos el uso de ELSIF para extender y hacer mas especifica la condición en el primer bloque de código y el uso de múltiples condicionales.</p>

<h4>UNLESS</h4>

<p>Este tipo de estructuras de control nos sirven para verificar la existencia de una variable, esto es mas fácil demostrarlo con un ejemplo:</p>

<pre>#!/usr/bin/ruby

numero = nil
isVerdadero = false

puts "El número existe" if numero
puts "El número no existe" unless numero
puts "La variable es falsa o no existe" unless isVerdadero

numero = 3
puts "El número ahora si existe" if numero
</pre>

<p>Al ejecutar el Script obtenemos el siguiente resultado:</p>

<pre>>>ruby Desktop/conditionalCodehero.rb
El número no existe
La variable es falsa o no existe
El número ahora si existe
</pre>

<p>En este ejemplo se imprimen las lineas sólo si la condición se cumple.</p>

<h4>CASE</h4>

<p>Esta estructura al igual que las anteriores simplemente revisan que las condiciones se cumpla para ejecutar una parte del código. Este tipo de estructura es bastante útil y elegante cuando se tienen varias opciones de condiciones. La sintaxis de esta estructura es la siguiente.</p>

<pre>case expresión
    [condición [, condición ...] [then]
       code ]...
    [else
       code ]
    end 
</pre>

<p>Para familiarizarnos con la sintaxis y entender mejor esta estructura, mostraremos un ejemplo fácil.</p>

<pre>#!/usr/bin/ruby

edad =  5
case edad
when 0 .. 2
    puts "Bebe"
when 3 .. 6
    puts "Niñito"
when 7 .. 12
    puts "Niño"
when 13 .. 18
    puts "Adolescente"
else
    puts "Adulto"
end

numero =  5
case numero
when 0 .. 2 , 4..10
    puts "el número esta entre 0 y 2 o 4 y 10"
when 3
    puts "el número es 3"
else
    puts "el número es negativo o mayor que 10"
end 

nombre =  "CodeHero"
case nombre
when "CodeHero"
    puts "SI! esto es CodeHero"
else
    puts "No lo es"
    end
</pre>

<p>Al ejecutar el Script tenemos como resultado:</p>

<pre>>> ruby Desktop/conditionalCodehero.rb  
Niñito
el número esta entre 0 y 2 o 4 y 10
SI! esto es CodeHero    
</pre>

<p>En el ejemplo vemos que ejecutamos tres estructuras condicionales donde sacamos conclusiones interesantes de cada una de ellas. En el primero simplemente vemos la sintaxis aplicada en un ejemplo y como utilizamos objetos de rangos para comparar la variable edad. El segundo ejemplo básicamente es lo mismo, pero en ésta observamos cómo separando las condiciones por (,) logramos un (OR). Por último vemos como Ruby en los CASE permite el uso de cadena de caracteres (la mayoría de los lenguajes no aceptan esto).</p>

<h3>Bucles</h3>

<p>Bucles de Ruby se utilizan para ejecutar el mismo bloque de código una cantidad específica de veces. En este capítulo se detallan todas las sentencias de bucles apoyados por Ruby. Es importante tener cuidado con los bucles y asegurarse que la sentencia de parada se ejecute al menos una vez, para evitar bucles infinitos que bloqueen el sistema.</p>

<h4>WHILE</h4>

<p>Estos bucles o ciclos se ejecutan hasta que la condición sea verdadera. Para empezar debemos conocer la sintaxis:</p>

<pre>while conditional [do]
   code
end
</pre>

<p>Para comprender mejor estos bucles lo demostraremos con un ejemplo fácil:</p>

<pre>#!/usr/bin/ruby

numero = 0

while numero &lt; 5  do
   puts("el número es: #{numero}" )
   numero = numero +1
end
</pre>

<p>Y el resultado de este Script es una recorrida por los números desde el 0 hasta que se cumpla la condición de parada, que es cuando el número sea menor a cinco.</p>

<pre>>> ruby Desktop/conditionalCodehero.rb     
    el número es: 0
    el número es: 1
    el número es: 2
    el número es: 3
    el número es: 4 
</pre>

<h4>REPEAT</h4>

<p>Estos bucles se ejecutan siempre al menos una vez, ya que entra en el bloque de código y al final se verifica la condición de salida. La sintaxis de este tipo de bucles es:</p>

<pre>código while condición
</pre>

<p>O de la siguiente manera:</p>

<pre>begin 
  código 
end while condición 
</pre>

<p>Para demostrar el funcionamiento de estos tipos de bucles, veamos este ejemplo:</p>

<pre>#!/usr/bin/ruby

numero = 0
begin
   puts("el número es: i = #{numero}" )
   numero +=1
end while numero &lt; 5    
</pre>

<p>Ejecutamos el Script obteniendo lo siguiente como resultado:</p>

<pre>>> ruby Desktop/conditionalCodehero.rb     
el número es: i = 0
el número es: i = 1
el número es: i = 2
el número es: i = 3
el número es: i = 4 
</pre>

<h4>UNTIL LOOP</h4>

<p>Este tipo de loop se ejecuta hasta que la condición de parada sea falsa, la sintaxis se define de la siguiente manera:</p>

<pre>until Condición [do]
   código
end
</pre>

<p>Lo demostramos con el siguiente ejemplo, en donde el bloque de código interno al bucles se ejecuta mientras el numero no sea mayor que cinco:</p>

<pre>#!/usr/bin/ruby

numero = 0
until numero > 5  do
   puts("El número es #{numero}" )
   numero +=1
end
</pre>

<p>El resultado de este Scripts es:</p>

<pre>ruby Desktop/conditionalCodehero.rb  
El número es 0
El número es 1
El número es 2
El número es 3
El número es 4
El número es 5
</pre>

<h4>FOR</h4>

<p>Estos bucles se ejecutan una vez por cada elemento. Éstos tienen configurado un rango de valores que indican cuantas veces se va a ejecutar. Primero les definimos la sintaxis para posteriormente ir con el ejemplo y comprender mejor esto:</p>

<pre>for variable [, variable ...] in expresión [do]
   Código
end
</pre>

<p>En el ejemplo vamos a poder ver como la variable simplemente incrementa sola, hasta cumplir con la expresión que en este caso es un objeto de tipo Rango con valores desde el 0 hasta el 3:</p>

<pre>#!/usr/bin/ruby

for i in 0..3
   puts "El valor de la variable es: #{i}"
end
</pre>

<p>Dando como resultado lo siguiente:</p>

<pre>>> ruby Desktop/conditionalCodehero.rb         
el valor de la variable es: 0
el valor de la variable es: 1
el valor de la variable es: 2
el valor de la variable es: 3
</pre>

<hr />

<h2>Conclusión</h2>

<p>En este capítulo aprendimos técnicas muy importantes del lenguaje y se los aseguro lo van a utilizar muchísimo en sus programas, por esta razón les recomiendo que practiquen hasta dominar las estructuras de control y siéntanse libres en consultar cualquier duda a través de los comentarios.</p>

<p>¡Hasta el próximo capítulo!</p>
