---
layout: post
status: publish
title: Cómo escribir Markdown - Parte II
author: Jonathan Wiesel
author_login: jonathan
description: Seguimos aprendiendo como escribir texto en la web sin saber nada de código, esto es Markdown.
dificultad: Novato
duracion: 10
thumbnail: http://i.imgur.com/Sls4kgY.png
categories:
- Cómo lo hago
- markdown
tags:
- como lo hago
- howto
- markdown
- web
- html
- bloques
---
En la [entrada pasada](http://codehero.co/como-escribir-markdown-parte-i/) estuvimos viendo la sintaxis que utiliza Markdown para formatear el texto en un nivel muy básico. En esta entrada veremos el resto de la documentación que es donde reside la verdadera magia y utilidad del Markdown, sigue leyendo para conocer más.

***

## Enlaces

Colocar enlaces o *links* es sumamente útil e importante ya que permite referenciar contenido ubicado en un lugar diferente a la página en la que estamos. De hecho al principio de esta entrada pasaste por uno, veamos como lo hacemos:

```
En la [entrada pasada](http://codehero.co/como-escribir-markdown-parte-i/)...
```

Colocamos entre corchetes `[]` el texto que queremos tenga el enlace y seguidamente colocamos entre paréntesis `()` el enlace de destino.

Si prefieres hacerlo de una manera más ordenada que tener las referencias en el medio de tu texto puedes hacerlo también de la siguiente manera:

```
En la [entrada pasada][1]...
...
...
    [1]: http://codehero.co/como-escribir-markdown-parte-i/
```

O incluso:

```
En la [entrada pasada]...
...
...
    [entrada pasada]: http://codehero.co/como-escribir-markdown-parte-i/
```

***

## Imágenes

¿Qué son muchas palabras sin imágenes de prueba que lo demuestren? Una imagen vale más que mil palabras, llaman la atención al momento y en muchas ocasiones nos permiten expresar cosas que con solo texto no serían lo mismo. Afortunadamente es igual de sencillo de escribir que los enlaces, solo debes preceder con el símbolo `!`:

```
![texto alterno](url-de-imagen)
```

De igual manera puedes utilizar la sintaxis alternativa que mostramos en los enlaces para tener tu texto más organizado.

***

## Tablas *

Hay veces que organizar información en una tabla nos ayuda a entenderla y/o visualizarla de una mejor manera, así sean nuestros horarios de la universidad.

Para ello dibujamos las líneas de la tabla con *pipes* (`|`) para delimitar las columnas y guiones (`-`) para separar el encabezado del resto de las filas:

```
| Encabezado 1    | Encabezado 2 |
|-----------------|--------------|
| probemos        | algo         |
| probemos alguna | otra cosa    |

```

Se vería así:

| Encabezado 1    | Encabezado 2 |
|-----------------|--------------|
| probemos        | algo         |
| probemos alguna | otra cosa    |

No es necesario que los *pipes* estén alineados, y los "bordes" son opcionales, por ejemplo:

```
Encabezado 1 | Encabezado 2
---|---
probemos | algo
probemos alguna | otra cosa
```
Esto generaría la misma tabla.

También puedes alinear el texto de tus columnas colocando el símbolo de dos puntos (`:`) en el separador hecho con guiones del lado que deseas que esté alineado:

```
| Alineado a la izq. | Centrado | Alineado a la der. |
|:-------------------|:--------:|-------------------:|
| prueba             | prueba   | prueba             |
```

Se vería así:

| Alineado a la izq. | Centrado | Alineado a la der. |
|:-------------------|:--------:|-------------------:|
| prueba             | prueba   | prueba             |

> (\*) No todos los *parsers* de Markdown soportan el uso tablas o todas sus opciones por no ser parte del estándar unificado.

***

## Código

Si has leído alguna de las entradas en el blog de seguro te habrás dado cuenta que es común encontrarse con piezas de código y que los colores en los que el mismo se encuentra resaltado hace juego con el lenguaje al que pertenece.

### Sintaxis de triple *backtick* *

Colocar este tipo de bloques es muy fácil, solo debemos encerrar el bloque de código que deseamos entre 3 *backticks* (```) seguido del nombre del lenguaje al que pertenece el código que deseas colocar:

    ```lenguaje
    x = y
    ...
    ```

Un ejemplo de código en JavaScript sería algo así:


    ```js
    function test() {
 	   console.log('testing!')
    }
    ```


Esto generaría un agradable bloque de código con *syntax highlighting*:

```js
function test() {
  console.log('testing!')
}
```

También podemos colocar bloques de texto pre-formateado sin especificar lenguaje alguno tan solo obviando la especificación del lenguaje de lo que colocaremos dentro de los *backticks*.

> De hecho los bloques de esta entrada están hechos de esta manera.

### Sintaxis de pre-espaciado

Otra manera de colocar texto o código pre-formateado pero sin lenguaje especificado es "indentando" nuestro texto con 4 espacios, lo escribiríamos así:

```
    x = y
    //notemos que hay 4 espacios de separación entre el margen y lo que escribimos.
```

Y se vería así:

    x = y
    //notemos que hay 4 espacios de separación entre el margen y lo que escribimos.

> (*) El estándar unificado de Markdown solo soporta la sintaxis de pre-espaciado.

***

## HTML en línea

Por si fuera poco todo lo que podemos hacer con Markdown, también podemos utilizar HTML puro para satisfacer nuestras necesidades web que Markdown no llega a abarcar, tales como [embeber un video de YouTube](http://codehero.co/estructura-modular-de-proyectos/) o [embeber una pieza de JSBin](http://codehero.co/javascript-desmitificado-clausuras/), las posibilidades son infinitas.
***

## Conclusión

Con este lenguaje hemos visto que escribir para la web es ahora más sencillo que nunca, no es necesario saber de código (y ahora tampoco necesitas de una interfaz WYSIWYG) para formatear tu texto de la manera correcta y que se vea en web como debe verse.
