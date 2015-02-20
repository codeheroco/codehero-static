---
layout: post
status: publish
title: Como escribir código mantenible - parte 2
author: Oscar González
author_login: oscar
description: En el tutorial anterior hable de técnicas para escribir nombres y comentarios fáciles de mantener. Ahora sigamos con el formato del código.
dificultad: Aprendiz
duracion: 10
thumbnail: http://i.imgur.com/ERooO8q.jpg
categories:
- Cómo lo hago
- cursos
tags:
- eficiencia
- formato
- legibilidad
---
Continuemos con la parte final de como escribir código mantenible.

En el tutorial anterior hable de técnicas para escribir nombres y comentarios fáciles de mantener. Ahora sigamos con el formato del código.

* * *

## Formato

El formato del código hace que la organización lógica sobresalte. Esto favorece nuestro entendimiento (para cuando ya no nos acordemos que hicimos - porque pasa...) y el entendimiento de otros desarrolladores.

Algunas técnicas:

*   Utiliza una cantidad fija de espacios para el indentado. Yo recomiendo seguir la convención de cada lenguaje: en Javascript se suelen usar 2 espacios; en Java, C#, Objectice-C, Swift (si, ya lo he revisado), se suele usar 4 espacios.
*   Alinea las llaves con los bloques de código que cierran, y utiliza la convención del lenguaje: en Javascript abren a la derecha, en C# en la linea de abajo. Ej:

```js
// javascript
if (name === "oscar") {

  // hacer algo
}
```

```csharp
// C#
if (String.Compare(name, "oscar"))
{
  // hacer algo
}
```

*   Establece un número de lineas y columnas que el código o comentarios puede tener para evitar tener que hacer scroll para leer. Se suelen usar métodos de aproximadamente 30 lineas de largo y no más anchos de la columna 80.
*   Deja una linea en blanco antes y después de cada operador, mejora la visibilidad:

```js
function compare(operator1, operador2) {

  if (operator1 > operador2) {

    return true;
  }

  return false;
}
```

*   Utiliza el `else` solo cuando sea necesario. Si no quedan más opciones que evaluar luego del `if`, puedes retornar de una vez (Ver ejemplo de código anterior).
*   Deja un espacio después de cada coma.

```js
function operate(operator1, operador2, operator3) {

  // hacer algo
}
```

*   Crea párrafos de código dejando lineas en blanco, así podrás proporcionar mayor entendimiento para lineas que se relacionan entre si:

```js
// circles
var circle1;
var circle2;
var circle3;

// squares
var square1;
var square2;
var square3;

operate(circle1, circle2, circle3);

operate(square1, square2, square3);

```

*   Evita escribir más de una sentencia por línea (en lo posible).

```js
// no muy bueno
if (!closed) return;

// más legible
if (!closed) {
  return;
}
```

*   Divide el código lógicamente en distintos archivos. (Ej: cada clase en archivos separados).
*   No utilices números en forma literal usa variables o constantes para darle un significado.

```csharp
// mal
for (var i = 0; i &lt; 7; i++) {
  // algo
}

// bien
const ENANOS = 7;
for (var i = 0; i &lt; ENANOS; i++)
{
  // algo
}
```

*   Utiliza switch cuando aplique, evita esos `if`, tras `if`, tras `if`, "n" cantidad de veces.

* * *

## Algunas consideraciones especiales

Utilízalas sabiamente cuando apliquen:

*   Utiliza variables del tamaño que sean necesarias. En c# a veces un `short` (entero de 16 bits) puede ser suficiente y no necesitar un `int` (entero de 32 bits)
*   Mantén el alcance de una variable lo más corto posible para evitar confusiones.
*   Utiliza funciones y variables para un solo propósito.
*   Utiliza solo la cantidad de atributos públicos en una clase como sean necesarios, es mejor crear atributos privados para favorecer al encapsulamiento.
*   Evita escribir código SQL del lado de la aplicación, utiliza un ORM.
*   Evita hacer casting de objetos y cuando sea necesario y no trivial comenta las razones.
*   Captura los errores usando try-catch-finally. Ayudará a hacer más robusta tu aplicación.
*   Utiliza logs, te ayudarán a identificar errores.
*   Crea tus propias excepciones heredando de "Exception" o su subclase que mejor aplique (SQLException, IndexOutOfRangeException) a tu caso.
*   Evita las variables globales en lo posible.

## Conclusión

Utilizar técnicas consistentes y buenas prácticas de programación mejoran nuestro código y por tanto la mantenibilidad, entendimiento, extensión y calidad de nuestra aplicación.

Hasta la próxima.
