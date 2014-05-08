---
layout: post
status: publish
published: true
title: Filtros Avanzados
author: Oscar González
author_login: oscar
author_email: gonzalezgreco@gmail.com
author_url: http://www.oscarvgg.com
wordpress_id: 2669
wordpress_url: http://codehero.co/?p=2669
date: 2013-11-25 00:09:53.000000000 -04:30
serie: jQuery desde Cero
dificultad: Heroe
duracion: 15
description: En este capítulo vamos a estudiar otro grupo de filtros que llevan un paso más adelante el refinamiento de nuestra selección de elementos del documento.
categories:
- Cursos
- jQuery
tags:
- jquery
- selectores
- filtros
---
<p>En el capitulo anterior de jQuery desde Cero hablamos de los selectores y los filtros básicos.</p>

<p>En este capítulo vamos a estudiar otro grupo de filtros que llevan un paso más adelante el refinamiento de nuestra selección de elementos del documento.</p>

<hr />

<h2>Filtros de atributos</h2>

<p>Los filtros de atributos son aquellos que refinan los resultados de un selector según los atributos que tenga el elemento.</p>

<p>Podemos filtrar por atributo de la siguiente manera:</p>

<ol>
<li><p><code>[nombreDeAtributo]</code>: Este incluye elementos que tengan el atributo especificado;</p></li>
<li><p><code>[nombreDeAtributo=valor]</code>: incluye los elementos que tengan el atributo solicitado y el valor asignado al mismo;</p></li>
<li><p><code>[nombreDeAtributo!=valor]</code>: incluye los elementos que tengan el atributo solicitado y un el valor asignado al mismo que sea distinto al especificado;</p></li>
<li><p><code>[nombreDeAtributo^=valor]</code>: incluye los elementos que tengan el atributo solicitado y un el valor asignado al mismo empiece con el especificado;</p></li>
<li><p><code>[nombreDeAtributo$=valor]</code>: incluye los elementos que tengan el atributo solicitado y un el valor asignado al mismo empiece con el especificado;</p></li>
<li><p><code>[nombreDeAtributo*=valor]</code>: incluye los elementos que tengan el atributo solicitado y contenga el valor especificado;</p></li>
<li><p><code>[nombreDeAtributo][nombreDeAtributoN]</code>: incluye los elementos que tengan los atributos solicitados.</p></li>
</ol>

<p>Veamos algunos ejemplos dado el siguiente html:</p>

```javascript
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Prueba Selectores</title>

  <script type="text/javascript" src="javascript/jquery-2.0.3.min.js"></script>

</head>
<body>

  <ul id="list1">
    <li class="a">Item 1</li>
    <li class="b">Item 2</li>
    <li class="a">Item 3</li>
    <li class="b">Item 4</li>
  </ul>

  <p class="class1">Mario</p>
  <p class="paragraph1">Luigi</p>
  <p class="class2">Toad</p>
  <p class="paragraph2">Bowser</p>

</body>
</html>
```

<p>Realizaremos las siguientes consultas:</p>

```javascript
<script type="text/javascript">

    $("document").ready(function() {

      // seleccionar todos los párrafos que tengan el atributo class
      $('p[class]');

      // seleccionar todos los párrafos que tengan el atributo id con el valor paragraph1
      $('p[id=paragraph1]');

      // seleccionar todos los párrafos cuyo id empiece por "para"
      $('p[id^=para]');

      // seleccionar todos los párrafos cuyo id empiece por "para" y tenga un atributo llamado align que contenga "center"
      $('p[id^=para][align*=center]');

    });

</script>
```


<hr />

<h2>Filtros de Contenido</h2>

<p>Éstos permiten examinar el contenido de elementos seleccionados para determinar si deben ser incluidos o no en los resultados.</p>

<ol>
<li><code>:contains(texto)</code>: Filtra la selección para incluir solo los que elementos que contengan el texto especificado;</li>
<li><code>:empty</code> Filtra la selección para incluir solo elementos vacios;</li>
<li><code>:has(selector)</code>: Retorna elementos que contienen al menos un elemento con el selector especificado;</li>
<li><code>:parent</code>: Encuentra elementos que son padres, es decir, que confinen al menos otro elemento.</li>
</ol>

<p>Utilizando el mismo HTML anterior veamos los siguientes filtros:</p>

```javascript
// seleccionar todos los párrafos que contengan la palabra "Luigi"
$('p:contains(Luigi)');
```


<p>Ahora si probáramos con <code>$(':contains(a)');</code>, estaríamos seleccionando todos los elementos que contengas una letra "a" sin importar de que tipo sean. Entonces nos retornaría: <code>p, p, body</code>, ¿Por qué body?, porque como los padres contienen a los hijos entonces su contenido es considerado como propio. Tendriamos que hacer una búsqueda un poco mas especifica si quisiéramos solo los <code><p></code>.</p>

<p>Sigamos:</p>

```javascript
// Seleccionar todos los párrafos que contienen al menos un hijo (incluyendo texto)
$('p:parent');

// Seleccionar todos los ul que contengan li con la clase "a"
$('ul:has(li[class=a])');
```


<h2>Filtros de Visibilidad</h2>

<p>Seleccionan los elementos que sean visibles o no.</p>

1. **visible:** Incluye todos los elementos visibles;
2. **hidden:** Incluye solo los elementos que estén ocultos.
</ol>


```javascript
// Seleccionar todos los ul que estén visibles
$('ul:visible');
```

<hr />

<h2>Filtros hijo</h2>

<p>Los filtros hijo refinan un selector examinando la relación que cada elemento tiene con su elemento padre:</p>

<ol>
<li><code>nth-child(indice)</code>: Toma el elementos en cierto indice;</li>
<li><code>nth-child(even)</code>: Toma solo elementos pares;</li>
<li><code>nth-child(odd)</code>: Toma solo elementos impares;</li>
<li><code>nth-child(equation)</code>: Toma solo elementos que satisfagan la formula Xn+M;</li>
<li><code>first-child</code>: Toma el primer elemento hijo del padre</li>
<li><code>last-child</code>: Toma el último elemento hijo del padre</li>
<li><code>only-child</code>: Toma el único elemento hijo que contiene el padre</li>
</ol>

<p>Vamos los ejemplos a continuación:</p>

```javascript
// Seleccionar el elemento li que este de segundo en un elemento ul
$('ul li:nth-child(2)');

// Seleccionar el elemento li que este de último en un elemento ul
$('ul li:last-child');

// Seleccionar el elemento li que esté en una posición 2n en un elemento ul
$('ul li:nth-child(2n)');

// Seleccionar el elemento li que esté en una posición 2n en un elemento ul
$('ul li:nth-child(2n)');

```


<h2>Filtros de Formulario</h2>

<p>Este tipo de filtros funcionan más o menos igual que los demás solo que son específicos para ayudarnos a trabajar con formularios.</p>

<ol>
<li><code>:input</code>: Encuentra todos los input: select, textarea, button;</li>
<li><code>:text</code>: Selecciona todos los elementos de texto;</li>
<li><code>:password</code>: Selecciona todos los elementos tipo password;</li>
<li><code>:checkbox</code>: Selecciona todos los elementos de tipo checkbox;</li>
<li><code>:submit</code>: Selecciona todos los elementos de tipo submit;</li>
<li><code>:reset</code>: Selecciona todos los elementos de de tipo reset;</li>
<li><code>:image</code>: Selecciona todos los elementos de tipo image;</li>
<li><code>:button</code>: Selecciona todos los elementos button;</li>
<li><code>:file</code>: Selecciona todos los elementos file;</li>
<li><code>:enabled</code>: Selecciona todos los elementos que están habilitados;</li>
<li><code>:disabled</code>: Selecciona todos los elementos que están inhabilitados;</li>
<li><code>:checked</code>: Selecciona todos los elementos que están en estado de "check" como radiobuttons o checkboxes</li>
<li><code>:selected</code>: Selecciona todos los elementos que están seleccionados.</li>
</ol>

<hr />

<h2>Conclusión</h2>

<p>Eso es todo por hoy.</p>

<p>Con éste capítulo cerramos el tema de los filtros y selectores.</p>

<p>Cualquier duda déjala en la sección de comentarios de más abajo.</p>

<p>Hasta la próxima.</p>
