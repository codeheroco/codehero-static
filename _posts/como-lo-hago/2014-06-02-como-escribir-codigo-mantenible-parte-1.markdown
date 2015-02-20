---
layout: post
status: publish
title: Como escribir código mantenible - parte 1
author: Oscar González
author_login: oscar
description: El propósito de escribir código mantenible es facilitar la comprensión del mismo tanto para nosotros mismos como para otros desarrolladores
dificultad: Aprendiz
duracion: 20
thumbnail: http://i.imgur.com/ERooO8q.jpg
categories:
- Cómo lo hago
- programar
tags:
- como lo hago
- how to
- codigo
---
Cualquiera puede aprender a programar, pero no todo el mundo sabe escribir buen código. Parto de esta premisa como inspiración para escribir este artículo, ya que me ha tocado, en algunas ocasiones, continuar, revisar, corregir, contribuir, etc, el código que escribió otra persona. En muchas oportunidades esta experiencia ha sido nefasta, por eso quiero presentar este artículo que trae un conjunto de técnicas para mejorar la legibilidad y por tanto la mantenibilidad de nuestro código.

* * *

## Mantenibilidad

El propósito de escribir código mantenible es facilitar la comprensión del mismo tanto para nosotros mismos como para otros desarrolladores. Esto, por supuesto, hace menos cuesta arriba la incorporación de nuevo personal al proyecto, disminuye la complejidad al incluir nuevos módulos y reduce los tiempos en nuestra planificación.

* * *

## Técnicas

Las técnicas presentadas a continuación son las que considero más importantes, algunas fueron extraídas de MDSN, Wikipedia y mi experiencia.

Según MDSN (y yo estoy de acuerdo), hay tres tipos de técnicas:

*   Nombres
*   Comentarios
*   Y formato.

### Nombres

Los nombres influencian mucho la interpretación que le damos a los símbolos que vemos creamos. Por ejemplo una variable llamada "sum" nos da a entender que almacena una suma. Sin embargo, en programación debemos ser más específicos, la idea es proporcionar la mayor cantidad de información al lector sin depender tanto del contexto. Por ejemplo, si llamamos a la variable "sumaNotas", en lugar de "sum", obtendremos un mejor entendimiento significado de esa variable.

También es muy importante el el uso consistente de una convención de nombres. Las más usadas son "Camel Case" y "Pascal Case". Camel Case propone que los nombres empiecen con minúscula y luego concatenar cada palabra con mayúscula en la primera letra (Ej: calcularTotalFactura()). Pascal Case es igual solo que con mayúscula en la primera letra (Ej: CalcularTotalFactura()). Eso si, utiliza una a la vez, no varias en un mismo proyecto, preferiblemente utiliza la convención que usa el lenguaje en el que programas o framework que utilizas.

Algo que veo mucho en el mundo laboral es la variedad de idiomas en los que programa la gente. Hay que ser consistentes en el idioma en que se va a programar un proyecto, si no veremos cosas como "eliminarDuplicados()", y luego dos lineas más abajo "findUser()", y en el peor de los casos "destroyAmigo()". Dejemos esos "Hasta la vista, Baby" para las películas.

Evita usar abreviaciones. Por supuesto que todo el mundo sabe a que te refieres con "num", "min", "max", pero en los casos en los que no es tan evidente, es conveniente escribir la palabra completa.

A continuación, algunas técnicas más especificas para mejorar nuestros nombres de símbolos:

**Funciones**

*   Como dije anteriormente, evitar ambigüedades, calcularPromedio() es mejor que calcular().
*   Evitar redundancia. Por ejemplo, un atributo de la clase Persona, no debería llamarse "idPersona", con solo "id" basta.
*   Utiliza nombres que den idea del valor que retornan, por ejemplo, getName(), generateRandomString().

**Variables**

*   Las variables de tipo boolean, deberían empezar con el prefijo "is". Como casi siempre las creamos para ser evaluadas en los condicionales (Ej: if), mejora bastante la legibilidad utilizar algo como `if (isComplete) {`.
*   Usa nombres, en lo posible, que den una idea del tipo de dato de la variable, por ejemplo, edad: int, nombre: string, altura: float.
*   Evita utilizar nombres con caracteres especiales como $, %, para indicar el tipo de dato
*   Evitar usar nombres como a, b, c, d, i, j, k; utiliza nombres que tengan un significado
*   Esto depende mucho del lenguaje, pero por lo general, las constantes llevan nombres en mayúsculas, en otros casos llevan "\_" para separar palabras y en otros son Camel Case pero llevan la letra "k" como prefijo (Ej: PI, SERVER\_URL, kDefaultPort). Lo importante es usar una sola convención.

> Hay que ser consistentes en el idioma en que se va a programar un proyecto, si no veremos cosas como "eliminarDuplicados()", y luego dos lineas más abajo "findUser()", y en el peor de los casos "destroyAmigo()". Dejemos esos "Hasta la vista, Baby" para las películas.

### Comentarios

Los comentarios ayudan a documentar el código. Esto es de suma importancia, ya que no importa cuan buenos sean los nombres de nuestras variables, funciones o clases, siempre se requiere de una explicación para entender mejor la lógica del código.

Algunas técnicas que recomiendo:

*   Cuando agregues código nuevo, asegúrate de mantener de actualizados los comentarios.
*   Escribe comentarios en la linea superior a las variables, funciones, clases, etc. Evita escribirlos al final de la linea, justo al lado de la declaración. Sin embargo este tipo decomentarios son buenos si la linea es corta y el comentario esta separado por un tab.
*   Antes de hacer deploy o release de tu proyecto, elimina los comentarios que ya no apliquen, como por ejemplo, `// TODO: call that función`
*   Usa oraciones completas cuando escribas comentarios. La idea es reducir la ambigüedad. Comentarios como `// compra`
*   Comenta el código que lo requiera cuanto antes, dejarlo para después podría hacer se te olvide su propósito. En la universidad solíamos bromear, "hoy dios y yo sabemos lo que programé aquí, mañana solo dios sabe".
*   Es cierto que los desarrolladores gozamos de una especie de humor negro que nos caracteriza, algunos programadores incluso lo llevan al código. Evítalo, los comentarios superfluos nos hacen perder tiempo en lecturas largas innecesarias.
*   Comenta solo lo que no sea obvio en el código, evita sobrecargar de comentarios.
*   Usa comentarios especialmente en ciclos y condicionales, estos son puntos cruciales donde cuesta más entender el porqué de las cosas. Por ejemplo, `// si ya terminó la descarga` es un buen comentario para `if (isCompleted)`.
*   Siempre deja un espacio después de los delimitadores de comentarios. Por ejemplo, `// esto es un comentario :)` es más fácil de leer que `//esto es un comentario :(`
*   Utiliza siempre un mismo estilo de comentarios. Con esto me refiero a redacción, puntuación, estructura. La consistencia es la clave.

Al hacer release o deploy de tu proyecto, utiliza un generador de documentación. Este tipo de herramientas, por lo general, generan una colección de archivos HTML a partir de los comentarios en el código fuente.

* * *

## Continuará

Este artículo ya se esta haciendo muy largo, por lo tanto voy a dejar la sección de **formato** para una segunda parte. Además incluiré algunas recomendaciones con ejemplos de código.

Hasta la próxima.
