---
layout: post
status: publish
published: true
title: Variables y Objetos.
author: Ricardo Sampayo
author_login: ricardo
author_email: ricardo9588@gmail.com
author_url: http://www.ricardosampayo.com
wordpress_id: 993
wordpress_url: http://codehero.co/?p=993
date: 2013-06-12 14:09:29.000000000 -04:30
categories:
- Cursos
- Ruby
tags:
- Ruby
- Objetos
- variables
- desde cero
comments:
- id: 192
  author: 'Ruby desde Cero: Orientación a Objetos – parte 1. | CODEHERO'
  author_email: ''
  author_url: http://codehero.co/ruby-desde-cero-orientacion-a-objetos-parte-1/
  date: '2013-07-17 00:03:47 -0430'
  date_gmt: '2013-07-17 04:33:47 -0430'
  content: '[...] Para mostrar estos ejemplos utilizaremos algunos de los tipos de
    variables que estudiamos en el Capítulo 2: Variables y Objetos. [...]'
---
<h1>Ruby desde cero: variables y Objetos.</h1>

<p>Bienvenidos a este nuevo capítulo de Ruby desde cero, hasta este capitulo ya aprendimos a instalar y configurar Ruby en nuestros computadores de manera sencilla, pero aun nos falta mucho recorrido. Para este nuevo capítulo mostraremos al detalle las variables nativas del lenguaje y los objetos Ruby.</p>

<h2>Variables y Constantes.</h2>

<p>Las variables y constantes en Ruby se consideran posiciones de memoria, que guardan los datos que creamos necesitar para el desarrollo de nuestro programa.</p>

<p>El lenguaje reconoce cualquier palabra con las siguientes características como variables:</p>

<ul>
<li>deben empezar con un letra minúscula o un guión bajo (_)</li>
<li>deben estar formadas por letras, números y/o guiones bajos.</li>
</ul>

<p>Por convención se estableció que deben ser llamadas con manera tal que definan su funcionalidad, escritas en minúscula y separadas por (_) como el siguiente ejemplo.</p>

<pre><code>~» first_name = 'Ricardo'
  "Ricardo" 
~» puts first_name
Ricardo
</code></pre>

<p>Por otro lado para que Ruby reconozca una constante debe ser nombrada al menos con la primera letra en mayúscula y obviamente nos es posible modificarla, en el siguiente ejemplo vemos como Ruby nos da una advertencia al intentar cambiar su valor.</p>

<pre><code>~» CONSTANT = 10
  10 
~» puts CONSTANT
  10 
~» CONSTANT = 20
(irb):94: warning: already initialized constant CONSTANT
</code></pre>

<p>El lenguaje maneja cinco tipos de variables:</p>

<h3>Variables Globales</h3>

<p>Estas variables tienen un alcance global del sistema, lo que significa que pueden consultarse y modificarse en cualquier parte del código. Estas variables se reconocen porque están precedidas del símbolo <strong>$</strong>. No se recomienda el uso excesivo de este tipo de variables.</p>

<pre><code>$global_variable
</code></pre>

<h3>Variables de Instancia.</h3>

<p>Las variables de instancia se definen dentro de la clase y se inicializan cada vez que se crea un objeto de esa clase. Estas variables se reconocen porque están precedidas del símbolo <strong>@</strong>.</p>

<pre><code>@variable
</code></pre>

<h3>Variables de clases.</h3>

<p>Estas variables deben ser inicializadas antes de que puedan ser utilizadas por los objetos del la clase. Esta variable son compartidas entre los objetos o módulos donde se definen, es decir, una variable de clase al ser alterada por uno de sus objetos, los demás podrán ver estos cambios. Estas variables se reconocen porque están precedidas del símbolo <strong>@@</strong>.</p>

<pre><code>@@variable
</code></pre>

<h3>Variables locales y de bloques.</h3>

<p>Estas son las variables de menos alcance en el sistema, se definen y utilizan hasta que se termine el método y Ruby limpie la memoria. Estas variables no tienen ningún símbolo predecesor, pero debemos tener cuidado de no utilizar palabras reservadas por Ruby</p>

<pre><code>variable
</code></pre>

<h2>Objetos Ruby</h2>

<p>En este Bloque del tutorial veremos alguno de los objetos de Ruby, sus funciones y su manipulación.</p>

<h3>Objetos numéricos enteros y flotantes</h3>

<p>los objetos numéricos enteros en Ruby heredan de la clase <em>Fixnum</em> mientras estén el rango que el lenguaje permite, todo lo exceda esos rangos pertenecerá a la clase <em>Bignum</em>. Por otro lado también existe los números que admiten decimales solo que estos pertenecen a otra clase <em>Float</em>. algunos ejemplos de los objetos numéricos:</p>

<ul>
<li><p>Definición de objetos</p>

<pre><code>~» 12.class  
  Fixnum 
~» -12.class
   Fixnum 
~» 123213213213123123123123.class   
   Bignum 
~» 0xf23.class      #Hexadecimal
   Fixnum 
~» 0b1011.class     #binario
   Fixnum 
~» 0.3.class      
 ~» Float 
~» 4.0e6.class      #notación científica
 ~» Float  
</code></pre></li>
<li><p>Ejemplos</p>

<pre><code>~» puts 1 + 2
3
~» puts 1 - 2
-1
~» puts 1 * 2
2
~» puts 1 / 2
0
~» puts 4 / 2   # Retorna el valor entero de la división
2
~» puts 5 / 2
2
~» puts 5 % 2   # Retorna el módulo de 5 y 2
1
~» puts 1 / 2.0
0.5
~» puts 9 / 2  
4.5
</code></pre>

<p>En el siguiente cuadro mostraremos la lista de posibles operadores para trabajar con los objetos numéricos. Estos están en orden de mayor a menor rango de presencia, es decir se ejecutaran primero los operadores superiores de la tabla.</p></li>
</ul>

<p><img src="http://codehero.co/oc-content/uploads/2013/07/ruby-operadores.png" alt="operadores" /></p>

<h3>Cadena de caracteres</h3>

<p>Estas cadenas son simples secuencias de caracteres entre comillas simples o dobles.Este objeto pertenece a la clase <em>String</em>. Algunos ejemplos para la manipulación de estos objetos:</p>

<pre><code>~» "CodeHero".class            #clase
   String 

 ~» saludo = 'hola'             #declaramos variable saludo
   "hola" 

~» sujeto = 'CodeHero'          #declaramos variable sujeto
   "CodeHero" 

~» saludo + ' ' + sujeto        #Concatenamos String con +
   "hola CodeHero" 

~» 'codehero '*3
   "codehero codehero codehero " 

~» puts "siguenos en Twitter \"@CodeHeroBlog\""  #Escapamos caracteres especiales con \
siguenos en Twitter "@CodeHeroBlog"

~» puts "\t \"\\t\": es un tab\n \"\\n\": salto de linea"   # /t tab /n salto linea
     "\t": es un tab
 "\n": salto de linea

~» saludo.reverse           #retorna la cadena de caracteres al revés 
   "aloh" 

~» saludo.capitalize        #primera letra en mayúscula
   "Hola" 

~» saludo.upcase            # toda la cadena en mayúscula
   "HOLA"   

~» saludo.length            #tamaño de la cadena
   4 

~» saludo[0]                #caracter en la posición 0
   "h" 
</code></pre>

<h3>Ruby arreglos</h3>

<p>Un arreglo es un objeto donde es posible almacenaruna serie de otros objetos (guardan la posición de memoria) para luego poder manipularlos con facilidad.Los arreglos pertenecen a la clase de <em>Array</em>.</p>

<p>En los arreglos es posible almacenar cadenas de caracteres (String), números (Bignum, Fixnum y Float), otros arreglos (Array) y no necesariamente tienen que ser del mismo tipo de dato, a continuación unos ejemplos de arreglos y manipulación de los mismos:</p>

<pre><code>~» arrelo_codefuel.class             #clase
  Array 

 ~» arrelo_codefuel = []             #arreglo vacío
  [] 

~» arrelo_codefuel = ["a","b","c","d"] #arreglo de String
  ["a", "b", "c", "d"]

~» arrelo_codefuel[1]                   #objeto en la posición 1
  "b" 

~» arrelo_codefuel &lt;&lt; "e"               #agregar un objeto
  ["a", "b", "c", "d", "e"] 

~» arrelo_codefuel.clear                #vaciar
  [] 

~» arrelo_codefuel=[1,2,3,4]
  [1, 2, 3, 4] 
~» puts arrelo_codefuel                 #imprimir arreglo
1
2
3
4

~» arrelo_codefuel.reverse              #voltear arreglo
  [4, 3, 2, 1] 

~» arrelo_codefuel &lt;&lt; 0                 
  [1, 2, 3, 4, 0] 
~» arrelo_codefuel.sort                 #ordenar Arreglo
  [0, 1, 2, 3, 4] 

~» arrelo_codefuel &lt;&lt; 2
  [1, 2, 3, 4, 0, 2] 
~» arrelo_codefuel.uniq                 #Arreglo de objetos únicos
  [1, 2, 3, 4, 0] 

~» arrelo_codefuel.delete_at(1)         #Borrar posición 1
  2 
~» arrelo_codefuel
  [1, 3, 4, 0, 2] 

~» arrelo_codefuel.delete(4)            #Borrar objeto 4
  4 
~» arrelo_codefuel
  [1, 3, 0, 2] 

~» arrelo_codefuel + [9,10,12]          #Agregar 3 objetos mas
  [1, 3, 0, 2, 9, 10, 12] 

~» arrelo_codefuel =  [1,2,"CodeHero",[1,2,3]]  #Arreglo combinado
  [1, 2, "CodeHero", [1, 2, 3]] 
</code></pre>

<h3>Ruby Hashes</h3>

<p>Este objeto es de gran utilidad para crear objetos improvisados o arreglos con una clave. Este Objeto consiste en agregar a una lista en pares Clave/Valor separados por coma (,) entre secuencias y (=>) entre la clave y el valor. A continuación unos ejemplos de este objeto y su manipulación:</p>

<pre><code>~» hashes_codefuel.class                 #clase
  Hash 

~» hashes_codefuel = {'nombre'=&gt;'Ricardo','apellido'=&gt;'Sampayo'}    #creamos un Hashes
  {"nombre"=&gt;"Ricardo", "apellido"=&gt;"Sampayo"} 

~» hashes_codefuel['nombre']        #objeto con la clave 'nombre'
  "Ricardo" 

~» hashes_codefuel.keys             #arreglo de claves
 =&gt; ["nombre", "apellido"] 

~» hashes_codefuel.values           #arreglo de valores
  ["Ricardo", "Sampayo"] 

~» hashes_codefuel.length           #tamaño
  2 

~» hashes_codefuel['sexo']='Masculino'  #agregar un nuevo campo
  "Masculino" 
~» hashes_codefuel
  {"nombre"=&gt;"Ricardo", "apellido"=&gt;"Sampayo", "sexo"=&gt;"Masculino"} 

~» hashes_codefuel.clear        #vaciar Objeto
  {} 
</code></pre>

<h2>Conclusión.</h2>

<p>En este capitulo conocimos a detalle las variables y objetos del lenguaje, pero aun queda mucho. Para el próximo capitulo estaremos viendo Estructuras de control y aprenderemos como definir métodos en Ruby.</p>
