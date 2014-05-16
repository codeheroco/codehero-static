---
layout: post
status: publish
published: true
title: Selectores y Filtros Básicos
author: Oscar González
author_login: oscar
author_email: gonzalezgreco@gmail.com
author_url: http://www.oscarvgg.com
wordpress_id: 2571
wordpress_url: http://codehero.co/?p=2571
date: 2013-11-11 00:51:54.000000000 -04:30
serie: jQuery desde Cero
dificultad: Novato
duracion: 10
description: En este capítulo de jQuery desde cero voy a hablarles de los Selectores y los filtros que podemos aplicar a un documento html.
categories:
- Cursos
- jQuery
tags:
- selectores
- filtros
---
<p>En este capítulo de jQuery desde cero voy a hablarles de los Selectores y los filtros.</p>

<hr />

<h2>Selectores</h2>

<p>Los selectores nos permiten obtener contenido del documento para poder manipularlo. Digamos que es la parte query de jQuery.</p>

<p>Al ser utilizados, los selectores retornan un array de objetos que coinciden con los criterios especificados. Este array no es un conjunto de objetos del DOM, más bien son objetos de Query con un gran número de funciones y propiedades predefinidas para realizar operaciones con los mismos.</p>

<h3>Simples</h3>

<p>Los selectores básicos están basados en la sintaxis de CSS y funcionan más o menos de la misma manera.</p>

<p>Algunos selectores básicos son:</p>

| Selector | Descripción |
| -------- | ----------- |
| Nombre de Etiqueta | Encuentra elementos por etiqueta HTML |
| #id | Encuentra elementos por ID o identificador |
| .clase | encuentra elementos por clase |
| etiqueta.clase | Encuentra elementos del tipo de la etiqueta que tengan la clase "clase" |
| etiqueta#id.clase | Encuentra elementos del tipo de la etiqueta que tienen el ID "id" y la clase "clase" |
| * | Encuentra todos los elementos de la página |

<p>Veamos unos ejemplos dada la siguiente página:</p>

```javascript
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Prueba Selectores</title>

  <script type="text/javascript" src="javascript/jquery-2.0.3.min.js"></script>

</head>
<body>

  <ul id="todo-list">
    <li class="a">Estudiar</li>
    <li class="b">Ir al gimnasio</li>
    <li class="a">Comprar pan</li>
    <li class="b">Enviar correos del trabajo</li>
  </ul>

  <p>Párrafo 1</p>
  <p>Párrafo 2</p>
  <p>Párrafo 3</p>
  <p>Párrafo 4</p>
  <p>Párrafo 5</p>

</body>
</html>
```

<p>Podemos obtener:</p>

```javascript
// Obtener todas las etiquetas "p"
$('p');

// Obtener la etiqueta con id "list-1"
$('$list-1');

// Obtener todas las etiquetas con clase "b" que están dentro de un ul
$('ul .b');
```


<h3>Compuestos</h3>

<p>Estos selectores permiten obtener objetos por jerarquía y combinación. Estos son:</p>

| Selector | Descripción |
| -------- | ----------- |
| selector, selector, ... | Encuentra todos los selectores especificados |
| .clase1.clase2 | Encuentra todos los elementos que tienen aplicada la "clase1" y "clase2" |
| padre>hijo | encuentra todos los elementos tipo "hijo" que son hijos directos del elemento de tipo "padre" |
| ancestro descendiente | Encuentra todos los elementos que están contenidos dentro de elementos de tipo "ancestro" |
| previo + próximo | Encuentra todos los elementos "próximo" que están junto a uno tipo "previo" |
| previo ~ hermanos | Encuentra todos los elementos que vienen después de "previo" y cumplen con el selector "hermanos" |

<p>Utilizando el mismo HTML del ejemplo anterior, probemos algunos de estos selectores:</p>

```javascript
// obtener todos los elementos "p" y todos los "li" que tengan la clase "b"
$('p, li.b');

// Obtener el elemento "p" que viene después de "ul"
$('ul + p');

// Obtener el elemento "p" que viene después de "ul"
$('ul + p');

// Obtener los hermanos del elemento "p" que viene después de "ul"
$('ul ~ p');
```


<hr />

<h2>Filtros Básicos</h2>

<p>Los filtros mantienen la simplicidad de la sintaxis y se utilizan para proveer un mayor control sobre como los elementos son seleccionados en el documento.</p>

<p>Los filtros en jQuery vienen en 6 catagorias distintas: Básicos, Contenido, visibilidad, atributo, hijo, formulario. En este capítulo solo hablaremos de los básicos: estos permiten refinar un selector incluyendo elementos que cumplen con ciertas condiciones.</p>

| Selector | Descripción |
| -------- | ----------- |
| :first | Selecciona solo el primero de los elementos en la lista |
| :last | Selecciona solo el último de los elementos en la lista |
| :even | Selecciona solo los elementos en posiciones pares de la lista |
| :odd | Selecciona solo los elementos en posiciones impares de la lista |
| :eq(n) | Obtiene elementos que están solo en el indice especificado |
| :gt(n) | Incluye elementos que están después del indice especificado |
| :lt(n) | Incluye elementos que están antes del indice especificado |
| :heder | Selecciona todos los elementos tipo encabezado (H1, H2, H3, etc.) |
| :animated | Selecciona todos los elementos que están siendo animados |
| :not(selector) | Incluye todos los elementos que no cumplen con el selector proporcionado |

<p>Volviendo a utilizar el html que venimos trabajando desde el comienzo del capítulo, tenemos:</p>

```javascript
// Obtener el primer elemento "p"
$("p:first");

// Obtener el último elemento p
$("p:last");

// Obtener los elementos "p" pares
$("p:even");

// Obtener los elementos "p" impares
$("p:odd")

//obtener el primer elementos que tenga la clase "a" aplicada
$(".a:first")

// obtener los elementos pares que tengan la clase "b" aplicada
$(".b:even")

// obtener todos los elementos que están después del indice 1
$("p:gt(1)")

// Obtener los elementos "p" menos el que esta en la posición 2
$("p:not(p:eq(2))")
```

<hr />

<h2>Conclusión</h2>

<p>Eso es todo encanto a selectores y filtros básicos. Ahora es solo cuestión de jugar con ellos y combinarlos en todas las maneras que sea necesario.</p>

<p>No olvides dejar tus dudas y comentarios en la sección de más abajo.</p>

<p>Hasta la próxima.</p>
