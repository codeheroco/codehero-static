---
layout: post
status: publish
published: true
title: Variables, Operadores y Estructuras de Control
author: Carlos Picca
author_login: carlos
author_email: carlospicca@gmail.com
wordpress_id: 1014
wordpress_url: http://codehero.co/?p=1014
date: 2013-06-14 08:27:34.000000000 -04:30
serie: Python desde Cero
dificultad: Novato
duracion: 25
description: Vamos a aprender las variables y sus tipos de datos, los operadores que podemos usar y las estructuras de control que podemos usar en Python.
categories:
- Cursos
- Python
tags:
- Python
- Tutorial
---
<p>Bienvenidos una vez más a Python desde Cero, serie en donde aprendemos Python desde cero. En el capítulo anterior descargamos Python, lo instalamos, nos paseamos por las diferentes maneras sobre como ejecutar scripts y hicimos nuestro primer programa, un Hola Mundo!.</p>

<p>Hoy, aprenderemos las variables y sus tipos de datos, los operadores que podemos usar y las estructuras de control que deberíamos utilizar para desarrollar nuestro propio código.</p>

<p>Como el capítulo de hoy va a hacer un aprendizaje dinámico, vamos a usar el Shell de Python ya que nos permite ejecutar línea por línea el código que deseemos probar.</p>

<p>Para ejecutar el Shell de Python haremos lo siguiente:</p>

<h4>Windows</h4>

<p>Debemos navegar a la carpeta de instalación de Python y hacer doble-click en <code>python.exe</code>. Les recomiendo que si van a desarrollar en Python, creen un atajo para así no tener que estar realizando todo este proceso cada vez que queramos iniciar el Shell.</p>

<h4>Mac o Linux</h4>

<p>Abrimos el Terminal y tipeamos <code>python</code></p>

<p>Si les aparece el siguiente mensaje quiere decir que ya estamos dentro del Shell</p>

```python
Python 2.7.5 (default, Oct 11 2012, 20:14:37)
[GCC 4.2.1 Compatible Apple Clang 4.0 (tags/Apple/clang-418.0.60)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

<blockquote>
  <p>Observamos que estamos usando Python 2, configuración que dejamos en el capítulo anterior (<code>Python 2.7.5</code>). Si por alguna razón decidieron instalar Python 3, estén atentos porque pueden existir algunas diferencias en los comandos de código que vamos a usar.</p>
</blockquote>

<hr />

<h2>Variables</h2>

<p>Pensemos que una variable es un lugar en donde podemos guardar diferentes tipos de datos. Crear una variable en Python es más sencillo que en otros lenguajes de programación. La estructura es la siguiente:</p>

<div class="alert alert-success">
  nombre = valor
</div>

<p>Donde <code>nombre</code> es el nombre que le quieras dar a la variable y <code>valor</code> es el valor que le quieras asignar a dicha variable.</p>

<h2>Tipos de Datos</h2>

<h3>Números</h3>

<p>Veamos un ejemplo:</p>

```python
>>> estados = 12
```

<p>Estaríamos asignando <code>12</code> a la variable <code>estados</code>.</p>

<p>Si tipeamos el nombre de la variable en el Shell, este nos devolvería el valor. Veamos:</p>

```python
>>> estados
12
```

<p>Python soporta diferente tipos de números por ejemplo:</p>

<h6>Enteros (int)</h6>

```python
>>> entero = 10
```

<h6>Decimales (Float)</h6>

```python
>>> decimal = 10.5
```

<blockquote>
  <p>Como puedes observar no es necesario declarar el tipo de variable como en otros lenguajes, Python lo descifra por ti.</p>
</blockquote>

<h3>Cadena de caracteres (Strings)</h3>

<p>Podemos almacenar un texto dentro de una variable siempre y cuando este dentro de comillas simples o dobles. Veamos un ejemplo:</p>

```python
>>> saludo = “Bienvenido a Codehero.co”
```

<p>Si tipeamos el nombre de la variable en el Shell, este nos devolvería el valor. Veamos:</p>

```python
>>> saludo
'Bienvenido a Codehero.co'
```

<blockquote>
  <p>Si queremos usar comillas simples dentro de una declaración o viceversa lo podemos hacer haciendo uso de <code>\</code> delante de las comillas que deseemos que pertenezcan al texto. Veamos un ejemplo:</p>
</blockquote>

```python
>>> mensaje = "Dicen que \'Codehero.co\' es el mejor sitio para aprender a programar"
>>> mensaje
"Dicen que 'Codehero.co' es el mejor sitio para aprender a programar"
```

<h3>Booleans</h3>

<p>Representación de Verdadero(<strong>True</strong>) o Falso(<strong>False</strong>) dentro de una variable. Veamos un ejemplo:</p>

```python
>>> esHombre = True
```

<p>Asignamos a la variable <code>esHombre</code> el valor de True (Verdadero). Si tipeamos el nombre de la variable en el Shell, este nos devolvería el valor. Veamos:</p>

```python
>>> esHombre
True
```

<blockquote>
  <p>En Python es importante que la primera letra de <code>True</code> o <code>False</code> este en mayúscula.</p>
</blockquote>

<h3>Vectores (Array)</h3>

<p>Es un conjunto de objetos encapsulados dentro de una sola variable. En Python se denominan listas. Veamos un ejemplo de cómo crear una lista:</p>

```python
>>> miLista = [1, 2, 3]
```

<blockquote>
  <p>Observemos que todos los objeto que queramos encapsular deben estar entre corchetes <code>[ ]</code>.</p>
</blockquote>

<p>En el ejemplo anterior asignamos a <code>miLista</code> los objetos 1, 2 y 3. Si tipeamos el nombre de la variable en el Shell, este nos devolvería el valor. Veamos:</p>

```python
>>> miLista
[1, 2, 3]
```

<p>Las listas pueden contener objetos diferentes, por ejemplo:</p>

```python
>>> miLista = [1, 'codehero', False]
```

<p>Además, pueden encapsular listas dentro de la misma lista, ejemplo:</p>

```python
>>> miLista = [1, [4, ‘codehero’, 9], True]
```

<p>Ahora si queremos saber o retornar un valor en específico dentro de una lista lo hacemos de la siguiente manera:</p>

<div class="alert alert-success">
  nombre_de_la_lista[El número del objeto en el orden de creación]
</div>

<p>Veamos un ejemplo:</p>

```python
>>> miLista = [1, [4, 'codehero', 9], True]
>>> miLista[0]
1
>>> miLista[2]
True
```

<blockquote>
  <p>Debemos observar que en Python los objetos dentro de una lista se indexan a partir del 0, eso quiere decir que mi primer objeto va estar en la posición 0 y el segundo en la posición 1 y así sucesivamente.</p>
</blockquote>

<p>Otra característica de porque Python es un lenguaje sencillo de utilizar, es que podemos crear variables en línea y asignarles su valor respectivamente, veamos como se hace:</p>

```python
>>> a,b,c = 1,2,3
```

<p>Observemos que creamos una variable <code>a</code>, una <code>b</code> y una <code>c</code> y le asignamos 1, 2, 3 respectivamente.</p>

<p>Así mismo podemos asignarle el mismo valor a múltiples variables veamos como:</p>

```python
>>> a = b = c = 1
```

<p>Asignamos 1 a la variable <code>a</code>, <code>b</code> y <code>c</code>.</p>

<blockquote>
  <p>En Python es importante asignarle un valor a una variable la primera vez que la creamos, de lo contrario nos arrojará un error. La solución a este detalle es asignar valores básicos o neutros dependiendo del tipo de dato. Ejemplo: <code>numero = 0</code>, <code>mensaje = “”</code>.</p>
</blockquote>

<hr />

<h2>Comentarios</h2>

<p>Veamos la manera de como comentar el código en Python. Uno crea comentarios principalmente para recordar que tipo de funcionalidad tiene ese código en particular. Para comentar usamos <code>#</code>, todo lo que este escrito después del numeral no será tomado en cuenta. Veamos unos ejemplos:</p>

```python
>>> #Esto es un comentario
>>> nombre = ‘codehero’ #Asignamos el nombre del sitio a la variable nombre
```

<hr />

<h2>Operadores</h2>

<p>Son elementos que nos permiten manipular las variables. Veamos unos ejemplos:</p>

```python
2 + 3 #Adición, retorna 5  
8 - 5 #Sustracción, retorna 3  
2 * 6 #Multiplicación, retorna 12  
12 / 3 #Division, retorna 4  
7 % 3 #Modulo, retorna el residuo de la division, 1 en este caso.  
3**2 #Potencias, retorna 9 
```

<p>Nosotros también podemos asignar a la misma variable el resultado de una operación. Veamos el siguiente código:</p>

```python
x = 2
x += 4 #Agrega 4 a x, ahora x es igual a 6  
x /= 2 #Divide x por 2, ahora x es igual 3  
```

<p>Los operadores no solo funcionan con números, también los podemos usar en cadenas de caracteres. Por ejemplo, si tenemos las siguientes variables <code>a = ‘Codehero’</code> y <code>b = ‘es el mejor’</code> las podemos concatenar de la siguiente forma:</p>

```python
>>> a = 'Codehero '
>>> b = 'es el mejor'
>>> a + b
'Codehero es el mejor'
```

<hr />

<h2>Estructuras de control</h2>

<p>Una vez que hayas creado y manipulado variables, las estructura de control te permitirán manejar el flujo de la data. Los dos tipos de estructuras que aprenderemos el día de hoy son:</p>

<h3>Condicionales</h3>

<p>Los condicionales te permiten ejecutar diferentes bloques de código dependiendo de que valor posea una variable en cuestión. Veamos unos ejemplos:</p>

<blockquote>
  <p>Para esta parte del tutorial vamos a usar scripts ya que vamos a necesitar ejecutar más de una línea de código a la vez. Para saber como ejecutar un script desde la consola te recomiendo que revises el capítulo anterior).</p>
</blockquote>

```python
esActivo = True
if esActivo:
   print ‘Codehero esta activo’
```

<p>Lo que hace el código anterior es chequear si la variable <code>esActivo</code> es igual a <code>True</code>, como la variable la declaramos <code>esActivo = True</code>, al ejecutar el script nos va a retornar <code>Codehero esta activo</code>.</p>

<h3>Tipos de condicionales:</h3>

<h5>Menor</h5>

<p>Valida si una variable es menor a otra.</p>

```python
if 2 &lt; 3:
   print ‘Dos es menor que tres’
```

<h5>Mayor</h5>

<p>Valida si una variable es mayor a otra.</p>

```python
if 2 > 3:
   print ‘Dos es mayor que tres’
```

<h5>Igual</h5>

<p>Valida si una variable es igual a otra.</p>

```python
if 2 == 3:
   print ‘Dos es igual que tres’
```

<h5>Diferente</h5>

<p>Valida si una variable es diferente a otra.</p>

```python
if 2 != 3:
   print ‘Dos es diferente que tres’
```

<h5>Mayor Igual</h5>

<p>Valida si una variable es diferente a otra.</p>

```python
if 2 >= 3:
   print ‘Dos es mayor o igual que tres’
```

<h5>Menor Igual</h5>

<p>Valida si una variable es diferente a otra.</p>

```python
if 2 &lt;= 3:
   print ‘Dos es menor o igual que tres’
```

<p>Hasta ahora vimos la manera de ejecutar un solo bloque de código pero que pasa cuando quiero ejecutar diferentes bloques, sencillo, usamos el comando <code>else</code>. Veamos un ejemplo:</p>

```python
esActivo = False
if esActivo:
   print ‘Es activo’
else:
   print ‘No esta activo’
```

<p>Si queremos ejecutar más de dos bloques con varias condiciones usamos el comando <code>elif</code>. Veamos como:</p>

```python
a = 15
if a &lt; 3:
   print ‘Es menor que tres’
elif a == 5:
   print ‘Es igual a cinco’
else:
   print ‘Es mayor que quince’
```

<h3>Bucles</h3>

<p>Es una sentencia que se realiza repetidas veces a un trozo aislado de código. Hoy vamos a aprender los bucles mas básicos que son <code>for</code> y <code>while</code></p>

<h4>Bucle For</h4>

<p>Es un bucle en la que se puede indicar el número mínimo de iteraciones. Veamos un ejemplo:</p>

```python
miLista = [1,2,3,4,5]

for a in miLista:
   print a 
```

<p>Si lo ejecutamos obtenemos:</p>

```python
1
2
3
4
5
```

<h4>Bucle While</h4>

<p>Su propósito es repetir un bloque de código mientras una condición se mantenga verdadera.</p>

```python
a,b = 0,5

while a &lt; b:
   print a
   a += 1 
```

<blockquote>
  <p>Observemos que en este caso para detener el ciclo necesitamos aumentar el valor de la variable <code>a</code> con la siguiente instrucción <code>a += 1</code></p>
</blockquote>

<p>Si lo ejecutamos obtenemos:</p>

```python
0
1
2
3
4
```

<hr />

<h2>Conclusión</h2>

<p>Esto es todo por ahora, pero hoy cubrimos suficientes técnicas como para que vayan practicando. Siéntase libres de leer el tutorial una y otra vez hasta que tenga sentido. Cualquier duda que tengan se las contestaré a través de los comentarios, además espero que se unan y le echen un vistazo a todo el resto de la serie!</p>
