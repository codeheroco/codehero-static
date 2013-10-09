---
layout: post
status: publish
published: true
title: Módulos
author: Carlos Picca
author_login: carlos
author_email: carlospicca@gmail.com
wordpress_id: 1394
wordpress_url: http://codehero.co/?p=1394
date: 2013-07-12 07:14:59.000000000 -04:30
categories:
- Cursos
- Python
tags:
- Python
- Módulos
- datetime
- math
- urllib2
comments:
- id: 197
  author: 'Python desde Cero: Clases, Atributos y Métodos - CODEHERO'
  author_email: ''
  author_url: http://codehero.co/python-desde-cero-clases-atributos-y-metodos/
  date: '2013-07-24 00:00:14 -0430'
  date_gmt: '2013-07-24 04:30:14 -0430'
  content: '[...] Módulos [...]'
---
<p>Bienvenidos una vez más a Python desde Cero, curso en el cual aprendemos a programar sin conocimiento alguno. En el capítulo anterior, te enseñe como crear y usar funciones dentro de Python. Si eres nuevo en este curso, te recomiendo que le eches un vistazo al capítulo anterior para que te pongas en contexto (<a href="http://codehero.co/python-desde-cero-funciones/">Capítulo 3</a>)</p>

<p>Hoy, vamos a aprender a desarrollar nuestros propios módulos, como importarlos en nuestras aplicaciones y a como usar los que ya vienen incorporados con el lenguaje.</p>

<hr />

<h2>Módulos</h2>

<p>Los módulos en Python son grupos de funciones alojadas dentro de un archivo <code>.py</code>.</p>

<p>Como observamos en capítulos anteriores, uno no puede desarrollar una aplicación compleja sin organizar nuestro código en funciones, y mientras que nuestro programa continua creciendo cada vez más y más, vamos a necesitar una manera para organizarlo a un nivel que no se vuelva engorroso de mantener, es ahí donde viene a la mano los módulos. Con ellos podemos organizar un grupo de funciones como si fueran un conjunto de herramientas las cuales podemos hacer uso de ellas cada vez que las necesitemos.</p>

<p>Los módulos son bastante fáciles de crear, ya que son scripts sencillos de Python. Vemos como crear un módulo:</p>

<blockquote>
  <p>Vamos a necesitar abrir un nuevo archivo en un editor de texto o en un IDE de tu preferencia. Para que el curso tenga sentido, voy a continuar con el ejemplo que utilizamos en el ultimo <a href="http://codehero.co/python-desde-cero-funciones/">capítulo</a>, crear un carrito de compra (ecommerce). Solo que esta vez vamos a calcular el impuesto de un articulo en especifico dado su precio.</p>
</blockquote>

<pre>def calcularImpuesto(precio, impuesto):
   precioNuevo = precio / 100 * (100 + impuesto)
   return precioNuevo
</pre>

<p>Observemos que fue sencillo de realizar, lo que hicimos fue definir una función llamada <code>calcularImpuesto</code> la cual toma dos argumentos <code>precio</code> y <code>impuesto</code>, para luego calcular y retornar el valor total del articulo.</p>

<p>Para que este código sea o cumpla como un módulo en Python, lo único que tenemos que hacer es guardarlo con la extensión <code>.py</code> en el mismo directorio donde residen nuestros otros scripts de la aplicación. Vamos a guardar el archivo con el siguiente nombre: <code>finanzas.py</code> y así nuestro módulo será el módulo de finanzas.</p>

<hr />

<h2>¿Cómo importar un módulo?</h2>

<p>Para usar los módulos existen dos posibilidades, podemos usar la palabra clave <code>import</code> o la palabra clave <code>from</code>. <code>import</code> es la manera más simple y más coman de usar, ya que que importa todas las funcionalidades existentes dentro del archivo <code>.py</code> en donde este alojado ese módulo. Veamos como importar el ejemplo anterior en donde teníamos el módulo de finanzas (<code>finanzas.py</code>):</p>

<pre>import finanzas
</pre>

<p>Observemos que para importar el módulo no hizo falta escribir la extensión del archivo. Una vez que Python interprete esta linea de código podemos tener a nuestra disposición la función <code>calcularImpuesto</code> que definimos anteriormente.</p>

<p>La otra manera es usando la palabra clave <code>from</code>, la cual importará única y exclusivamente la función que uno le pasa como parámetro, es decir, imaginemos que tenemos un módulo que posee miles y miles de funciones, para que importar todas esas funciones dentro de nuestro script si solo vamos a necesitar una, es en este caso donde viene a la mano el <strong>from</strong>. Una de las prácticas más recomendadas dentro de Python es hacer uso de la palabra <em>from</em> cuando se esta trabajando con módulos, ya que salva tiempo de procesamiento y recursos de la máquina en cuestión.</p>

<p>Veamos como importar una funcionalidad del módulo de finanzas:</p>

<pre>from finanzas import calcularImpuesto
</pre>

<p>Observemos que necesitamos especificar de que módulo queremos obtener nuestra función con <code>from + MÓDULO</code> y luego la función que queremos importar <code>import + FUNCIÓN</code>. En nuestro caso, del módulo de <strong>finanzas</strong> importa la función <strong>calcularImpuesto</strong>.</p>

<p>También puedes importar varias funciones a la vez, solo necesitas separarlas por comas.</p>

<pre>from finanzas import calcularImpuesto, calcularDescuento
</pre>

<p>Incluso puedes importar todas las funciones usando un <strong>wildcard</strong></p>

<pre>from finanzas import *
</pre>

<p>Después de importar los módulos, la manera de usar las funciones es la siguiente: el nombre del módulo, seguido de un punto, seguido del nombre de la función a usar. Veamos un ejemplo:</p>

<pre>import finanzas
print finanzas.calcularImpuesto(100, 5)
</pre>

<p>Si corremos el script, debería imprimir 105. Una prueba sencilla, pero significa que nuestro módulo funcionó a la perfección!</p>

<hr />

<h2>Módulos Incorporados</h2>

<p>Existen miles de módulos incorporados dentro de Python. Debido a que el rango es extenso, es imposible cubrirlos todos dentro de este curso, por lo que solo me voy basar en los más útiles. Si quieres conocer más sobre los módulos incorporados en Python te invito a que le eches un vistazo a la página oficial donde encontrarás toda la <a href="http://docs.python.org/2/library/index.html">documentación</a> necesaria. Veamos cuales son esos módulos:</p>

<ul>
<li><strong>math</strong></li>
<li><strong>os</strong></li>
<li><strong>datetime</strong></li>
<li><strong>urllib2</strong></li>
</ul>

<h3>math</h3>

<p>El módulo de <strong>math</strong> nos provee el acceso a funciones y constantes matemáticas. Veamos unos ejemplos:</p>

<pre>import math
 
math.pi #Pi, 3.14...
math.e  #Número de Euler, 2.71...
 
math.degrees(2)  #2 radianes = 114.59 grados
math.radians(60) #60 grados = 1.04 radianes
 
math.sin(2)    #Seno de 2 radianes
math.cos(0.5)  #Coseno de 0.5 radianes
math.tan(0.23) #Tangente de 0.23 radianes
 
math.factorial(5) #1 * 2 * 3 * 4 * 5 = 120
math.sqrt(49)   #Raíz cuadrada de 49 = 7
</pre>

<p>Existe miles de funciones dentro de este módulo te invito a que las revises todas <a href="http://docs.python.org/library/math.html">aquí</a>.</p>

<h3>datetime</h3>

<p>Si necesitas trabajar con fechas y tiempos, entonces el módulo <strong>datetime</strong> es el indicado para ti. Veamos un ejemplo con los usos más comunes:</p>

<pre>import datetime
from datetime import date
import time

time.time() #Retorna el número de segundos desde el 1 de enero de 1970 (Unix Epoch)
 
date.fromtimestamp(123456789)   #Convierte número de segundos en un objeto tipo date
date.fromtimestamp(time.time()) #Podemos combinar las funciones time y fromtimestamp para representar el tiempo actual

currentDate = date.fromtimestamp(time.time()) #Creamos una variable con la representación del tiempo actual
currentDate.strftime("%d/%m/%y") #Le coloca el siguiente formato a la fecha DD/MM/YY
 
currentDate.isoformat() #Le coloca el formato estándar ISO a esa fecha
</pre>

<p>Existe miles de funciones dentro de este módulo te invito a que las revises todas <a href="http://docs.python.org/2/library/datetime.html">aquí</a>.</p>

<h3>os</h3>

<p>Este módulo te permite trabajar con el sistema operativo en el cual Python este ejecutándose, ya sea Windows, Mac o Linux. Nos enfocaremos en la funcionalidad <strong>path</strong> ya que es la más común. <strong>Path</strong> nos permite manipular y encontrar propiedades de los archivos y carpetas que existen en el sistema. Vemos unos ejemplos:</p>

<pre>from os import path
 
path.exists("/Users/Picca") #Cheque si un directorio existe

path.getatime("/Users") #Retorna la fecha en la cual ese directorio fue accedido por ultima vez
path.getmtime("/Users") #Retorna la fecha en la cual ese directorio fue modificado por ultima vez

path.getsize("/Users/Picca/Desktop/boot") #Retorna el tamaño en bytes de ese archivo

path.join("C:", "Users") #Retorna la siguiente dirección "C:/Users"
</pre>

<p>Existe miles de funciones dentro de este módulo te invito a que las revises todas <a href="http://docs.python.org/2/library/os.html">aquí</a>.</p>

<h3>urllib2</h3>

<p>Este módulo permite interactuar con la web. La función más común es la <strong>urlopen</strong> la cual nos permite descargar una página o un archivo que exista en la web. Veamos unos ejemplos:</p>

<pre>import urllib2
urllib2.urlopen("http://codehero.co")
</pre>

<p>Este scritp descargará el HTML de la pagina web <strong>codehero.co</strong>.</p>

<pre>import urllib2
urllib2.urlopen("http://codehero.co").read(100)
</pre>

<p>Al igual que en el ejemplo anterior, se descargará el HTML de <strong>codehero.co</strong> pero ahora solo nos devolverá los primeros 100 caracteres. Para así después poder extraer los trozos que nos sean necesarios.</p>

<p>Existe miles de funciones dentro de este módulo te invito a que las revises todas <a href="http://docs.python.org/2/library/urllib2.html">aquí</a>.</p>

<hr />

<h2>Conclusión</h2>

<p>En esta lección, aprendimos como crear módulos en Python, como importarlos en nuestros programas, y como usar los módulos que vienen incorporados en el lenguaje. Te invito a que practiques y crees tus propios módulos ya que lo mejor de todo es que los puedes reutilizar en diferentes aplicaciones que estés desarrollando. Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso. Te espero la próxima semana!</p>
