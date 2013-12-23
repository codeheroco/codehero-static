---
layout: post
status: publish
published: true
title: Clases, Atributos y Métodos
author: Carlos Picca
author_login: carlos
author_email: carlospicca@gmail.com
wordpress_id: 1647
wordpress_url: http://codehero.co/?p=1647
date: 2013-07-24 00:00:02.000000000 -04:30
categories:
- Cursos
- Python
tags:
- Python
- clases
- curso
- metodos
- instanciar
- atributos
- oo
- orientado a objetos
---
<p>Bienvenidos una vez más a Python desde Cero, curso en el cual aprendemos a programar sin conocimiento alguno. En el capítulo anterior, te enseñe como crear módulos en Python, como importarlos en nuestros programas, y como usar los módulos que vienen incorporados en el lenguaje. Si eres nuevo en este curso, te recomiendo que le eches un vistazo al capítulo anterior para que te pongas en contexto (<a href="http://codehero.co/python-desde-cero-modulos/">Capítulo 4</a>)</p>

<p>Hoy, vamos a aprender a programar orientado a objetos, es decir, vamos a aprender a definir una clase, como definir sus atributos, como instanciarla y como generar la lógica necesaria para su completo funcionamiento.</p>

<hr />

<h2>¿Cómo definimos una clase?</h2>

<p>Para definir una clase en Python, solo tenemos que hacer uso de la palabra clave <strong>‘class’</strong>, seguida del nombre que le quieras asignar, seguido de un doble punto. Veamos un ejemplo:</p>

<pre>class mascota:
</pre>

<blockquote>
  <p>Si observamos el ejemplo, podemos apreciar que creamos una clase llamada mascota.</p>
</blockquote>

<p>Debemos resaltar dos puntos importantes a la hora de crear una clase en Python:</p>

<ul>
<li><strong>Código identado</strong> - Todo el código que va poseer la clase debe estar identando, no puede estar a la misma altura que la declaración de la clase ya que el interprete levantará un error.</li>
<li><strong>Sin paréntesis</strong> - Cuando creamos una clase en Python no debemos colocar paréntesis después del nombre, al menos, que quisiéramos que la misma herede las características de otra clase.</li>
</ul>

<hr />

<h2>Atributos de una clase</h2>

<p>De nada nos sirve una clase sin atributos que la definan, es por eso que debemos asignarle a la <strong>clase mascota</strong> algunas propiedades. Veamos como:</p>

<pre>class mascota:
   numero_de_patas = 0
   color = “marrón”
</pre>

<blockquote>
  <p>Observemos que para definir los atributos, lo único que tenemos que hacer es declarar algunas variables dentro de la clase. En el ejemplo, declaramos <code>numero_de_patas</code> y <code>color</code>, dos características de la mascota que quisiéramos guardar en el objeto. En cuanto a los atributos de una clase no existen limites, puedes usar cuantos tu quieras para cumplir con la definición de ese objeto.</p>
</blockquote>

<p>Es importante saber que cuando definimos atributos tenemos que estar pendiente de:</p>

<ul>
<li><strong>Asignarle siempre un valor</strong> - Siempre cuando declaremos un atributo en una clase en Python, debemos asignarle un valor por defecto ya que sino el interprete disparará una excepción.</li>
<li><strong>Nombre de atributos</strong> - Los nombres que le asignes a los atributos siempre deben ser los más sencillos y descriptivos posibles.</li>
</ul>

<hr />

<h2>¿Cómo instanciar una clase?</h2>

<p>Una declaración de una clase no es algo que uno pueda manipular directamente, es por eso que tenemos que instanciar un objeto de esa clase para así modificar los atributos que esta posea. Para instanciar una clase en Python, lo único que tenemos que hacer, es asignar a una variable el nombre de la clase seguida de paréntesis. Veamos como, siguiendo el ejemplo anterior:</p>

<pre>class mascota:
   numero_de_patas = 0
   color = “marrón”

perro = mascota()
</pre>

<hr />

<h2>Ahora que ya sabemos instanciar una clase, ¿Cómo modificamos sus atributos?</h2>

<p>Para referenciar una propiedad o atributo de un objeto en Python, lo único que tenemos que hacer es seguir la siguiente estructura <code>nombre_variable + . + nombre_atributo</code>. Veamos como, dado el ejemplo anterior:</p>

<pre>perro.numero_de_patas
</pre>

<blockquote>
  <p>Observemos que lo que estamos haciendo, es referenciar el valor contenido en el atributo <code>numero_de_patas</code>, es decir, estamos obteniendo el valor de la propiedad <code>numero_de_patas</code> del objeto <code>perro</code>.</p>
</blockquote>

<p>Nosotros podemos tratar es propiedad como si fuera una variable cualquiera, es por eso que podemos modificar el valor de ese atributo. Veamos como:</p>

<pre>class mascota:
   numero_de_patas = 0
   color = “marrón”

perro = mascota()
perro.numero_de_patas = 4
perro.color = “negro”
print "El perro tiene “ + perro.numero_de_patas + “ patas y es de color “ + perro.color
</pre>

<p>Si ejecutamos el código anterior podemos observar que nos imprime lo siguiente:</p>

<pre>El perro tiene 4 patas y es de color negro
</pre>

<p>Esto se debe a que modificamos las propiedades del objeto <em>perro</em>, ya que es un <em>“perro”</em> lo que estábamos definiendo, decidí asignarle 4 al número de patas con la siguiente expresión <code>perro.numero_de_patas = 4</code> y negro al color de la mascota con la siguiente expresión <code>perro.color = “negro”</code>.</p>

<hr />

<h2>¿Cómo creamos una lógica dentro de las clases?</h2>

<p>Okey, hasta ahora hemos visto como usar clases y objetos como estructuras o contenedores de información, pero que pasa si queremos hacer tareas más complejas con su data, necesitamos una manera de introducir algo de lógica a esos objetos. Es en este momento cuando los <strong>métodos</strong> vienen a ayudarnos.</p>

<p>Los <strong>Métodos</strong>, son esencialmente funciones contenidas dentro de las clases. Para definir un método es exactamente la misma manera como definíamos una función en capítulos anteriores. La única diferencia es que esa función ahora pertenece a esa clase y para invocarla tenemos que llamar primero a la variable que posee la clase para después poder hacer uso de ese método en particular.</p>

<p>Para definir un método debemos usar la palabra clave <strong>def</strong>, luego, el nombre que le queramos dar al método, seguido de <code>(self):</code>. Veamos como definir un método siguiendo los ejemplos anteriores:</p>

<pre>class mascota:
   numero_de_patas = 0
   color = “marrón”

   def dormir(self):  
        print "zzz"  

perro = mascota()
</pre>

<blockquote>
  <p>Observemos que definimos un método dentro de la clase mascota llamado <code>dormir</code>. La función de este método es imprimir <strong>”zzz”</strong> cada vez que lo invoquemos.</p>
</blockquote>

<p>Para que un método funcione dentro de una clase es necesario cumplir con lo siguiente:</p>

<ul>
<li><strong>Extra identado</strong> - Todo el bloque del código que vas a definir para ese método va tener que poseer un extra de identación para que el interprete de Python lo entienda.</li>
<li><strong>Siempre debe poseer un argumento “self”</strong> - Cada vez que declares un método en Python, vas a tener que agregarle el argumento <strong>self</strong> para que cuando ese método sea invocado, Python le pase el objeto instanciado y así pueda operar con los valores actuales de esa instancia. Si no incluyes ese argumento y ejecutas el código Python disparará una excepción y el programa se detendrá.</li>
</ul>

<p>Si quieres pasarle argumentos creados por ti al método, lo haces como si pasarás múltiples argumentos a una función. Para mayor información sobre como pasar argumentos a una función, revisa el <a href="http://codehero.co/python-desde-cero-funciones/">capítulo sobre funciones</a>.</p>

<p>Ahora, ¿Cómo usamos ese método que acabamos de crear?. Sencillo, lo único que tenemos que hacer es instanciar una clase <strong>mascota</strong> y luego, a través de ella, invocar al método <strong>dormir</strong>. Veamos como:</p>

<pre>class mascota:
   numero_de_patas = 0
   color = “marrón”

   def dormir(self):  
        print "zzz"  

perro = mascota()
perro.dormir()
</pre>

<blockquote>
  <p>Observemos que al final del script invocamos al método dormir cuando ejecutamos esta instrucción <code>perro.dormir()</code>. Siempre para referenciar las funciones debemos usar el siguiente esquema <code>nombre_variable + . + nombre_método + ()</code>. Es importante destacar que no debemos pasarle ningún atributo al método ya que Python lo hace por nosotros para satisfacer el argumento <strong>self</strong>, es decir, Python automáticamente le pasa como argumento la instancia de ese objeto al método que estemos invocando.</p>
</blockquote>

<p>Si ejecutamos el código anterior, debemos observar que imprime el mensaje que escribimos en el método.</p>

<pre>zzz
</pre>

<hr />

<h2>Conclusión</h2>

<p>En esta lección, aprendimos a programar orientado a objetos, es decir, aprendimos como definir una clase, como definir sus atributos, como instanciarla y como generar la lógica necesaria para su completo funcionamiento. Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso. Te espero la próxima semana!</p>
