---
layout: post
status: publish
published: true
title: Recorriendo el Documento
author: Oscar González
author_login: oscar
author_email: gonzalezgreco@gmail.com
author_url: http://www.oscarvgg.com
wordpress_id: 2827
wordpress_url: http://codehero.co/?p=2827
date: 2013-12-09 01:12:17.000000000 -04:30
dificultad: Novato
duracion: 20
categories:
- Cursos
- jQuery
tags:
- desde cero
- jquery
- dom
- documento
- recorrer
---
<p>En este capítulo hablaremos de como iterar sobre elementos del documento.</p>

<hr />

<h2>Funciones</h2>

<p>Para iterar sobre la información obtenida del documento disponemos de las siguientes funciones:</p>

<ul>
<li><code>size()</code>: Retorna el numero de elementos en la lista de resultados. También se puede obtener a través de la propiedad <code>length</code>;</li>
<li><code>get()</code>: Retorna una lista de elementos del DOM. Esta función es útil cuando se necesitan hacer operaciones en el DOM en lugar de usar funciones de jQuery.</li>
<li><code>get(posición)</code>: Retorna un elemento del DOM que esta en la posición especificada.</li>
<li><code>find({expresión})</code>: Busca elementos que cumplen con la expresión especificada.</li>
<li><code>each(callback(i, element))</code>: Ejecuta una función dentro del contexto de cada elemento seleccionado. Ejecuta un callback recibiendo como parámetro la posición de cada elemento y el propio elemento.</li>
</ul>

<p>Veamos unos ejemplos usando el documento HTML que utilizamos en el tutorial anterior:</p>

<p><img src="http://i.imgur.com/AIfY8ri.png" alt="enter image description here" /></p>

<hr />

<h2>Size() y length</h2>

<p>Probemos el funcionamiento de size y length imprimiendo por consola cuantos elementos <code>&lt;p&gt;</code> hay en el documento:</p>

<pre>
<script type="text/javascript">

    $("document").ready(function() {

      console.log('Hay ' + $('p').length + ' elementos <p> en el documento');
      console.log('Hay ' + $('p').size() + ' elementos <p> en el documento');

    });

</script>
</pre>

<p>Esto debe imprimir en la consola de javascript del browser:</p>

<pre lang="javascript">
> Hay 4 elementos <p> en el documento
</pre>

<hr />

<h2>get()</h2>

<p>Probemos imprimir el resutado de get():</p>

<pre>
<script type="text/javascript">

    $("document").ready(function() {

      console.log('Lista: \n' + $('li').get());

    });

</script>
</pre>

<p>Debemos obtener:</p>

<pre lang="javascript">
> Lista: 
[object HTMLLIElement],[object HTMLLIElement],[object HTMLLIElement],[object HTMLLIElement]
</pre>

<p>Nótese que obtenemos varios elementos <code>[object HTMLLIElement]</code> esto significa que son objetos DOM; ahora si quisiéramos pudiéramos objetener alguna de sus propiedades:</p>

<pre>
<script type="text/javascript">

    $("document").ready(function() {

      var liElement = $('li').get(0).innerText;

      console.log('Texto en <li> posicion cero: ' + liElement);

    });

</script>
</pre>

<p>Para una mejor lectura del código, coloqué el valor del texto que contiene el elemento en la posición "0" (cero) de todos los `<li> del documento en una variable y lo imprimí por consola.</p>

<pre lang="javascript">
> Texto en <li> posicion cero: item 1
</pre>

<hr />

<h2>Find()</h2>

<p>Usemos ahora find() para encontrar elementos:</p>

<pre>
<script type="text/javascript">

    $("document").ready(function() {

      $('body').find('p.class1').css('border', '3px solid red');

    });

</script>
</pre>

<p>Podemos ver como el <code>&lt;p&gt;</code> que contiene el texto "Mario" se le pinta el borde de rojo. Con la función "css" le aplicamos una regla de css.</p>

<p>También podemos usar filtros para encontrar elementos:</p>

<pre>
<script type="text/javascript">

    $("document").ready(function() {

      $('body').find(':contains ("i")').css('border', '3px solid red');

    });

</script>
</pre>

<p>Con esto veremos que todos los elementos que contengan una letra "i" se les pintará el borde de rojo.</p>

<hr />

<h2>each()</h2>

<p>Vamos a iterar sobre los elementos seleccionados con each() para mostrar alguna de sus propiedades:</p>

<pre>
<script type="text/javascript">

    $("document").ready(function() {

      $('li').each(function(i, item) {

        var text = item.innerText;

        console.log('El texto del elemento ' + i + ' es: ' + text);

      });

    });

</script>
</pre>

<p>En este caso imprimo el texto interno de cada uno de los elementos seleccionados.</p>

<p>Los parámetros del callback son opcionales, podemos prescindir de cualquiera de los dos o de los dos a la vez. Si no incluyéramos el parámetro "ítem", pudiéramos usar <code>this</code>, este refiere al elemento que está en el contexto de la función, en este caso el <code>&lt;li&gt;</code> de cada iteración.</p>

<pre>
<script type="text/javascript">

    $("document").ready(function() {

      $('li').each(function(i) {

        var text = this.innerText;

        console.log('El texto del elemento ' + i + ' es: ' + text);

      });

    });

</script>
</pre>

<p>De cualquiera de las dos maneras obtenemos el mismo resultado:</p>

<pre lang="javascript">
> El texto del elemento 0 es: item 1
> El texto del elemento 1 es: item 2
> El texto del elemento 2 es: item 3
> El texto del elemento 3 es: item 4 
</pre>

<hr />

<h2>Conclusión</h2>

<p>Con estas funciones obtenemos un poder más en nuestra lista de habilidades de jQuery. Y seguimos avanzando. Este ha sido solo un capitulo más de muchos que faltan por venir.</p>

<p>Si te gustó este tutorial no olvides compartirlo en las redes sociales de tu preferencia. Ayuda a expandir el conocimiento, por favor.</p>

<p>Como siempre, cualquier duda que surja, no lo pienses dos veces antes de dejarla en la sección de comentarios de más abajo.</p>

<p>¡Hasta el próximo tutorial!</p>
