---
layout: post
status: publish
title: Cómo escribir Markdown - Parte I
author: Jonathan Wiesel
author_login: jonathan
description: Escribir texto que se renderize en HTML es más fácil de lo que imaginas. Aprende a escribir en Markdown.
dificultad: Novato
duracion: 15
thumbnail: http://i.imgur.com/Sls4kgY.png
categories:
- Cómo lo hago
- markdown
tags:
- como lo hago
- howto
- markdown
- web
- tumblr
- wordpress
- cms
- html
---
Nos encontramos en una época donde el medio de comunicación más grande esta basado en la web. Cada vez más personas se adentran
al mundo digital para crear o compartir contenido, ciertamente para poder escribir en la web en medios como blogs se suele depender
de lo que llamamos manejadores de contenido, estas son herramientas diseñadas para que los usuarios puedan escribir de manera
natural en un pequeño editor de texto con su barra de herramientas tipo Microsoft Word para formatear el texto como lo deseen. Si
tomamos el caso de Tumblr sería algo como esto:

![Tumblr editor](http://i.imgur.com/LInmyAc.png)

Ciertamente es una manera fácil de otorgar a los usuarios sin ningún tipo de conocimiento de programación, la capacidad de generar
contenido que al ser publicado se convierte en su versión HTML y logramos ver de manera correcta según el tema de nuestro sitio, y
con un estilo agradable a la vista.

Esto no significa que la manera de escribir de estos usuarios no se pueda estandarizar para que se vea de la manera correcta
sin importar el portar o el manejador de contenido que se utilice, por ello esta semana presentamos una pequeña entrada del uso
de Markdown.

***

## Qué es Markdown

Se le define tanto como al software escrito en Perl el cual convierte el texto escrito en HTML y adicionalmente,
a la sintaxis utilizada para llegar al resultado HTML que esperamos. Una sintaxis pensada para ser sencilla para cualquiera
que desee escribir en la web, sin necesidad de conocimientos de la misma.

Hoy en día la mayoría de los manejadores de contenido como Wordpress o Drupal, e incluso muchos clientes de correo, soportan la
el uso de la sintaxis Markdown, ya sea nativamente en la implementación principal o mediante de complementos instalables, esto con
la intención de facilitar la creación de texto formateado sin la necesidad de implementar estilos o conocer de HTML. Estos
manejadores utilizan un analizador o *parser* para convertir el texto escrito en Markdown a HTML.

Veamos ahora la sintaxis.

***

## Párrafos

Si estuviéramos escribiendo normalmente en un editor común, para definir un párrafo simplemente presionaríamos
un par de `Enter` y veremos nuestro cursor ir un par de líneas más abajo para escribir en un párrafo nuevo.

> En HTML se le conoce como `<p>` de párrafo o *paragraph*.

En Markdown es tan fácil como en un editor normal.

Adicionalmente tenemos la ventaja de que un único salto de línea **no**, separa el texto en múltiples líneas, si escribimos
algo así:

```
Un texto.
Otro texto.
```

Se verá así:

```
Un texto. Otro texto.
```

> Utilizar múltiples líneas de separación se reduce igualmente a un único espacio de separación entre los párrafos.

***

## Encabezados

En un editor normal necesitaríamos de la barra de herramientas para definir un estilo de encabezado para un texto, o si te sientes
un poco desordenado bastaría con subirle al tamaño de la fuente y poner lo en negrita.

> En HTML se les conoce como `<h1>`, `<h2>`, etc, de header.

En Markdown es muy sencillo, simplemente debes colocar el caracter numeral (`#`) de prefijo al encabezado, mientras más de estos
tenga de menor grado será el encabezado (hasta 6).

Por ejemplo uno encabezado `<h1>` (el más grande) y uno `<h3>` se escribirían así:

```
# Gran encabezado

### Pequeño encabezado
```

Y se verá así:

# Gran encabezado

### Pequeño encabezado

Adicionalmente, solo para `<h1>` y `<h2>` puedes utilizar la sintaxis [*setex*](http://docutils.sourceforge.net/mirror/setext.html),
la cual te permite "subrayar" con 3 o más símbolos de igual (`=`) para producir un encabezado `<h1>` o con guiones (`-`) para `<h2>`:

```
Gran encabezado
====

Mediano encabezado
----
```

***

## Separadores

Los separadores normalmente no son posibles de dibujar en editores sencillos.

> En HTML se convierten en `<hr>` de horizontal rules.

Se delimitan al escribir 3 o más asteriscos o guiones. Pueden estar seguidos o separados por un espacio, no importa.

```
* * *

***

- - -

---
```

Estas marcas horizontales son las que puedes apreciar que separan cada una de la pequeñas secciones de esta entrada. Como la que
viene ahora.

***

## Énfasis

Este formateado es el conocido como itálico y negrita.

> En HTML sería `<em>` y `<strong>`.

Para crear texto con formato itálico tan solo debes rodear el texto entre simples asteriscos o subguiones, y para negrita entre
dobles:

```
*texto italico.*
_texto italico._

**texto negrita.**
__texto negrita.__
```

Se vería algo así:

*texto italico.* __texto negrita.__

## Tachado*

Este permite colocar texto como si lo estuviésemos tachando, utilizado mucho noticias que fueron corregidas o actualizadas.

> EN HTML sería `<strike>` de strikethrough.

Basta con rodear el texto entre doble virgulillas o tildes de eñe:

```
~~texto tachado.~~
```

> (*) Esta opción no está disponible para todos los parsers de Markdown, ya que no es parte del estándar unificado.

***

## Citas

El estilo de cita normalmente no se encuentra de manera fácil en un editor de texto común. En esta entrada lo has visto ya varias
veces, cada vez que mencionamos el equivalente en HTML como lo que sigue:

> En HTML sería `<blockquote>`.

Solo debemos colocar el carácter de "mayor que" (`>`) como prefijo al texto que le sigue:

```
> Esta es una cita.
```

Se vería:

> Esta es una cita.

***

## Listas

Para definir una lista de objetivos solemos utilizar la funcionalidad de viñetas para listas sin orden especifico y
listas numeradas.

> En HTML sería `<ul>` para listas sin orden, `<ol>` para listas ordenadas y `<li>` para definir cada item de la lista.

En Markdown las definimos simplemente prefijando cada ítem con un asterisco (`*`), guión (`-`) o símbolo de más (`+`) para listas
sin orden. Para listas ordenadas prefijamos con el número que le corresponde y un punto:

```
* Compra leche.
* Comprar pan.

1. Primero ir al mercado.
3. De último ir a la casa.
2. Luego pasar por la oficina.  
```

Se vería así:

* Compra leche.
* Comprar pan.

1. Primero ir al mercado.
3. De último ir a la casa.
2. Luego pasar por la oficina.  

> Notemos que en la listas ordenadas **NO** se respeta el orden que especifica el número, sino el orden en el cual se escribieron.

***

## Conclusión

Hemos visto el inicio de cómo escribir en una sintaxis diferentes pero que nos trae muchas ventajas para que nuestro contenido
pueda tener un formato adecuado sin depender del lugar donde lo estamos escribiendo. No te preocupes si algún lugar donde quieres
escribir Markdown no lo soporte, muchos de ellos si entienden HTML puro, así que pueden buscar cualquier convertidor que traduzca
tu texto a HTML y suministrarlo. Hasta la próxima parte...
