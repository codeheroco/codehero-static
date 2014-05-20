---
layout: post
status: publish
published: true
title: Funciones
author: Carlos Picca
author_login: carlos
author_email: carlospicca@gmail.com
wordpress_id: 1221
wordpress_url: http://codehero.co/?p=1221
date: 2013-06-28 08:44:18.000000000 -04:30
serie: Python desde Cero
dificultad: Novato
duracion: 25
description: Hoy, aprenderemos todo lo que tiene que ver con las funciones dentro de Python, desde los tipos hasta los estándares necesarios para desarrollar una función
categories:
- Cursos
- Python
tags:
- Python
- funciones
---
<p>Bienvenidos una vez más a Python desde Cero, curso en el cual aprendemos a programar sin conocimiento alguno. En el capítulo anterior, te enseñe todo lo referente al uso de variables, operadores y estructuras de control. Si eres nuevo en este curso, te recomiendo que le eches un vistazo a los capítulos anteriores para que te pongas en contexto (<a href="http://codehero.co/python-desde-cero-variables-operadores-y-estructuras-de-control/">Capítulo 2</a>)</p>

<p>Hoy, aprenderemos todo lo que tiene que ver con las funciones dentro de Python, desde los tipos hasta los estándares necesarios para desarrollar una buena función.</p>

<h2>¿Qué es una Función?</h2>

<p>Una función es un bloque de código el cual puede ser ejecutado cuando y cuantas veces deseemos. Son de gran ayuda cuando necesitamos que un programa ejecute cierta operación muchas veces.</p>

<p>Existen dos tipos de funciones, las creadas por ti, la cuales incluyen el código que tu deseas ejecutar, y las que vienen incluidas con Python, las cuales sirven para realizar procedimientos básicos, como por ejemplo convertir un integer en un string o saber cual es el tamaño de dicho string.</p>

<hr />

<h2>Funciones – Creadas por ti</h2>

<p>La mejor manera de enseñar a usar las funciones, es con un ejemplo, por lo que imaginemos que queremos hacer un programa para un carrito de compras online el cual toma todos los costos de los artículos que desees comprar y los suma para luego retornar el costo total de la compra.</p>

<p>Vamos a escribir una función que nos permita agarrar dos precios de artículos de compra, sumarlos y después imprimir ese valor. Veamos como hacerlo:</p>

```python
#nuestros dos precios de los artículos
articulo1 = 10  #articulo 1 posee un precio de 10
articulo2 = 25  #articulo 2 posee un precio de 25
 
def totalizarCompra():
   costoTotal = articulo1 + articulo2
   print costoTotal
 
totalizarCompra()
```

<p>Para definir una función en Python lo único que debemos usar es la palabra clave <code>def</code> y luego colocar el nombre que le queremos dar a la función, en este caso <strong>totalizarCompra</strong>. Luego, tipeamos dos paréntesis (<em>más adelante veremos que se puede hacer con esos paréntesis pero por los momentos vamos a mantenerlo simple</em>), y finalmente agregamos dos puntos.</p>

<p>Después de esto, todo el código que deseemos agregar a la función debe estar identado (al igual que con los <code>if</code>, <code>while</code>, etc . Para más información te invito a repasar el capítulo <a href="http://codehero.co/python-desde-cero-variables-operadores-y-estructuras-de-control/">anterior</a>). Para poder ejecutar dicha función lo único que necesitamos hacer es tipear el nombre de la función seguida de dos paréntesis (e.j. <code>totalizarCompra()</code>).</p>

<p>Si ejecutamos el script podemos observar que nos retorna <strong>35</strong>, lo que es correcto.</p>

```bash
$ python2.7 carritoCompra.py
$ 35
```

<h3>Argumentos</h3>

<p>Hasta los momentos nuestra función parece un poco rígida, ya que no puede manejar variables o valores externos dentro del bloque de código. Veamos como podemos hacer para que esta función tome algunos argumentos o valores externos.</p>

<p>Imaginemos por un momento que la función <code>totalizarCosto()</code> la queremos usar en otra parte de nuestro programa, pero en vez de siempre sumar los mismos valores <code>articulo1 + articulo2</code>, sumemos artículos diferentes con diferentes precios. Para llevar a cabo este requerimiento, vamos a usar los <em>‘argumentos’</em>, los cuales van a estar definidos dentro de los dos paréntesis que posee la función.</p>

<blockquote>
  <p>Un <strong>argumento</strong> es la vía para pasar información a una función cuando no sabemos el valor o valores que esa variable posee.</p>
</blockquote>

<p>¿Confundido?, veamos el ejemplo anterior y salgamos de las dudas. Ya sabemos que necesitamos agregarle argumentos a la función. Veamos como:</p>

```python
articulo1 = 10  #articulo 1 posee un precio de 10
articulo2 = 40  #articulo 2 posee un precio de 40
articulo3 = 5  #articulo 3 posee un precio de 5
articulo4 = 25  #articulo 4 posee un precio de 25
 
def totalizarCompra(item1, item2):
   costoTotal = item1 + item2
   print costoTotal
 
totalizarCompra(articulo1, articulo2)
```

<blockquote>
  <p>Los <strong>argumentos</strong> van definidos dentro de los paréntesis de la función. Cada argumento que deseamos generar debe tener tu propio nombre y deben estar separado por comas. Este actúa como una referencia temporal hacia la información que le pasamos a la función mientras que esta ejecuta el bloque del código.</p>
</blockquote>

<p>Observemos que lo primero que hicimos fue agregar dos artículos más <code>articulo3</code> y <code>articulo4</code> para poder probar el script con diferentes artículos. Segundo, agregamos dos argumentos <code>item1</code> y <code>item2</code> los cuales mantendrán el valor de los artículos para así después sumarlos.</p>

<p>Por último, veamos que pasa cuando invocamos la función con los dos argumentos <code>totalizarCompra(articulo1, articulo2)</code>. Lo primero que ocurre es que las dos variables que le pasamos <code>articulo1</code> y <code>articulo2</code> se convierten en los argumentos item1 y item2 respectivamente. Esto siempre ocurre en el orden que que uno define los argumentos, es decir, la primera variable que pasamos es asignada al primer argumento, las segunda al segundo argumento y así sucesivamente.</p>

<p>Segundo, las variables que le pasamos se convierten variables locales dentro del bloque de código de la función, esto significa que podemos hacer uso de esas variables fácilmente (<code>item1</code> y <code>item2</code>).</p>

<p>Suficiente explicaciones, ahora ejecutemos el script y veamos que nos devuelve:</p>

```bash
$ python2.7 carritoCompra.py
$ 50
```

<p>Como podemos ver, nos devolvió la suma del <code>articulo1</code> y <code>articulo2</code>. Ahora veamos que pasa si en vez de pasarle <code>articulo1</code> y <code>articulo2</code> como argumentos, le pasamos <code>articulo3</code> y <code>articulo4</code>. Cambiemos solo la última línea del script por <code>totalizarCompra(articulo3, articulo4)</code></p>

```python
articulo1 = 10  #articulo 1 posee un precio de 10
articulo2 = 40  #articulo 2 posee un precio de 40
articulo3 = 5  #articulo 3 posee un precio de 5
articulo4 = 25  #articulo 4 posee un precio de 25
 
def totalizarCompra(item1, item2):
   costoTotal = item1 + item2
   print costoTotal
 
totalizarCompra(articulo3, articulo4)
```

<p>Si ejecutamos el script podemos observar que exitosamente imprime <strong>30</strong>, la suma del <code>articulos3</code> y del <code>articulo4</code>, ya que esos fueron los argumentos que les pasamos.</p>

```bash
$ python2.7 carritoCompra.py
$ 30
```

<h3>¿Cómo retornar valores dentro de una función?</h3>

<p>Por último, veamos una de las características más importantes dentro del capítulo de funciones, la forma de como retornar valores dentro de una función.</p>

<p>Hasta ahora hemos visto como hacer funciones que no retornan ninguna información, pero ¿qué pasa sí necesitamos guardar la respuesta de <code>totalizarCompra(articulo3, articulo4)</code> en vez de imprimirla?</p>

<p>La respuesta es sencilla, lo único que debemos hacer es asignar en la función que variable va a hacer el valor de retorno. La manera de asignar o decirle a la función que retorne una variable es con la palabra clave <code>return</code>.Veamos el ejemplo anterior, vamos a remplazar la palabra <code>print</code> de la función <code>totalizarCompra()</code> por la palabra <code>return</code>. Así la función sabrá que deberá retornar el valor de <code>costoTotal</code> y no imprimirlo.</p>

```python
articulo1 = 10  #articulo 1 posee un precio de 10
articulo2 = 40  #articulo 2 posee un precio de 40
articulo3 = 5  #articulo 3 posee un precio de 5
articulo4 = 25  #articulo 4 posee un precio de 25
 
def totalizarCompra(item1, item2):
   costoTotal = item1 + item2
   return costoTotal

total1 = totalizarCompra(articulo1, articulo2)
total2 = totalizarCompra(articulo3, articulo4)

print total1
print total2
```

<p>Obviamente, la función no va imprimir la respuesta sino que va a devolver a las variables <code>toatl1</code> y <code>total2</code>, los valores correspondientes a la suma de sus artículos, es decir, <code>total1</code> va a recibir la suma de <code>articulo1</code> y <code>articulo2</code>, y <code>total2</code> va a recibir la suma de <code>articulo3</code> y `articulo4’.</p>

<p>Si ejecutamos el script observamos:</p>

```bash
$ python2.7 carritoCompra.py
$ 50
$ 30
```

<hr />

<h2>Funciones – Incorporadas</h2>

<p>Existen operaciones que son muy usadas dentro de la programación, es por eso que Python las incluye para que así las podamos usar en cualquiera de nuestros programas que estemos desarrollando.</p>

<p>La manera para invocar dichas funciones es exactamente la misma como invocamos las funciones que desarrollamos nosotros pero con la única deferencia que <strong>no</strong> debemos definirlas con anterioridad.</p>

<p>En este capítulo, vamos a pasearnos por la funciones más importantes y más usadas dentro del mundo de la programación, pero existen miles y miles de funciones que Python pone a tu disposición para que hagas uso de ellas, si quieres echarle un ojo te recomiendo la <a href="http://www.python.org/">documentación de Python</a>.</p>

<h3>str()</h3>

<p>Primero, veamos una de las funciones más usadas en Python: el convertidor a <strong>string</strong>. Muchas de las veces que uno desarrolla aplicaciones se encuentra con la necesidad de convertir una variable que contiene un número en una cadena de caracteres. Como por ejemplo:</p>

```python
numero = 10
print 'El número es ' + numero
```

<p>Si ejecutamos ese script nos encontraremos con un error ya que le estamos pidiendo a Python que añada un número a una cadena de caracteres. Es en este caso donde <strong>srt()</strong> sale al rescate!, ya que esta toma el valor del número y lo retorna como un string(cadena de caracteres). De esta manera Python entenderá que <code>+</code> no significará sumar los dos elementos sino concatenar o juntar dos cadenas de caracteres. Veamos como:</p>

```python
numero = 10
print 'El número es ' + str(numero)
```

<p>Ahora si ejecutamos este trozo de código, observamos que nos imprime la cadena de caracteres sin ningún problema:</p>

```bash
$ El número es 10
```

<p><strong>str()</strong> no solo acepta valores tipo integer, también puede aceptar diferente tipos de dato como por ejemplo Booleans.</p>

```python
bool = True
print 'El valor de la variable es ' + str(bool)
```

<h3>len()</h3>

<p>Otra tarea muy común es saber cual es el tamaño de una cadena de caracteres, es ahí donde Python nos cubre las espaldas y nos proporciona **len(), función que toma una cadena de caracteres y nos retorna el tamaño de la misma en forma de número. Veamos como usarla:</p>

```python
cadena = 'Hola Codehero!'
print len(string)
```

<p>Si ejecutamos el código vemos que imprime 14, que es el número de caracteres que posee ese <code>Hola Codehero!</code>.</p>

```bash
$ 14
```

<h3>range()</h3>

<p>Finalmente, veamos una función que no es tan común pero que viene a la mano una vez que uno empieza a desarrollar programas más complejos en Python. Estamos hablando de <strong>range</strong>, función que nos permite crear una lista de números dado el número al cual queremos llegar, es decir, si queremos crear una lista de número del 0 al 10, es mucho más fácil hacerlo con esta función que tipear todos los números uno a uno.</p>

<p>Veamos como usarla:</p>

```python
numeros = range(11)
print(numeros)
```

<p>Lo único que necesitamos para usar la función es pasarle como argumento el número que deseamos alcanzar <code>range(numero)</code>.</p>

<blockquote>
  <p>Es importante saber que la función genera el ciclo de número hasta el número menor al que le pasamos como argumento. Por lo que si queremos crear 10 números, debemos pasarle 11 como argumento.</p>
</blockquote>

<p>Ahora veamos como hacer si quiero solo los número del 5 al 10:</p>

```python
numeros = range(5, 11)
print(numeros)
```

<p>Podemos observar que range también puede tomar dos argumentos, siendo el primero el número inicial y el segundo el número final de la serie.</p>

<p>Ya para finalizar veamos como hacer si solo quiero los números impares del 1 al 10:</p>

```python
numeros = range(5, 11, 2)
print(numeros)
```

<p>Observemos que range también puede tomar 3 argumentos, siendo el primero el número inicial y el segundo el número final de la serie y el tercero la cantidad de números que debe sumar entre cada iteración.</p>

<hr />

<h2>Conclusión</h2>

<p>En esta lección, aprendimos como crear en Python nuestras propias funciones y como usar las funciones que ya viene incorporadas en el lenguaje!. Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso. Te espero la próxima semana!</p>
