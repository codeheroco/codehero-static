---
layout: post
status: publish
title: Calidad
author: Oscar González
author_login: oscar
description: Hoy hablaré de como escribir código JavaScript de buena calidad y cuales son los mecanismos mediante los cuales ésta puede ser medida.
dificultad: Heroe
duracion: 10
serie: JavaScript Desmitificado
categories:
- Cursos
- JavaScript Desmitificado
tags:
- JavaScript Desmitificado
---

Ya hablamos de lo básico: objetos, funciones, clausuras; pasamos por temas más complicados como la coerción y concurrencia. Ahora ha llegado el momento de terminar esta serie. Hoy hablaré de como escribir código JavaScript de buena calidad y cuales son los mecanismos mediante los cuales ésta puede ser medida.

***

## La calidad

La calidad como tal es algo muy difícil de definir, sin embargo, algunos autores afirman que es una condición de excelencia que pretende medir cualidades. Ésta puede ser subjetiva u objetiva segun lo que se este evaluando. La calidad subjetiva refiere a la idea de la aplicación de las habilidades de un individuos adquiridas por la experiencia. La Objetiva, por otro lado, puede ser cuantificada mediante ciertos mecanismos.

***

## Cómo medir la calidad

Mark Daggett propone seis métricas para medir la calidad del código en su libro "Expert JavaScript". Aunque estas mismas sirven también para medir código en cualquier lenguaje. Estas métricas son:

* Estética: Refiere a la coherencia visual del código y a si sigue las convenciones del lenguaje: formato, estilos de nombres; si el código es legible.
* Completitud: Alude a si el código cumple su propósito.
* Rendimiento: Mide la eficiencia del código. Puede incluir, tamaño de la solución, uso eficiente de recursos del sistema, tiempo de carga, número de bugs.
* Esfuerzo: Refiere a al costo de producir o soportar el código.
* Durabilidad: Alude al tiempo que puede permanecer efectiva la solución. ¿Es confiable?
* Recepción: Mide como otros programadores perciben el código. ¿Es fácil de entender?

***

## Cómo medir la calidad en JavaScript

Existen varias herramientas con las que podemos medir la calidad del código en JavaScript.

### JSlint y JSHint

Estas dos herramientas permiten validar la sintaxis de nuestro código y en algunos casos pueden indicarnos donde incurrimos en malas prácticas.

### Complexity Report

Esta es una aplicación de linea de comando que analiza archivos de javacript y genera un reporte de complejidad.

Podemos instalarla con "npm":

```bash
	$ npm install -g complexity-report
```

y luego para generar un reporte:

```bash
	$ cr {dirección de archivo}
```

Esta útil herramienta no solo nos permite ver la cantidad de lineas de código, argumentos por función o indice de mantenibilidad, entre otras cosas, si no que también puede configurarse para evitar hacer deploy de una aplicación si el código no alcanza un requerimiento mínimo de calidad.

### Plato

Plato es genial. No hace mucho que lo descubrí y ya no puedo dejar de usarlo. Esta herramienta de análisis de calidad que permite generar reportes con gráficas basandose en los resultados de JSLint y Complexity-Report. 

Puedes visitar [la página de la librería en Github](https://github.com/es-analysis/plato) y ver algunos ejemplos de los reportes que es capaz de generar sobre librerías o aplicaciones famosas como jQuery y Grunt. 

***

## Pruebas

Puedo escribir una serie completa sobre cómo probar nuestro código, por lo tanto voy explicar este punto brevemente y muy por encima, como puede mejorar la calidad de lo que estamos desarrollando y que herramientas podemos utilizar.

Las pruebas nos facilitan reducir el número de bugs en nuestro programa. Básicamente una prueba es una función que ejecuta funciones de nuestro programa y se asegura de obtener los resultados esperados. Idealmente, la prueba se escribe antes de escribir la función que se va a probar, por lo tanto, esta debe fallar primero, y luego se debe desarrollar la función para hacerla acertar.

### Mocha

Mi herramienta favorita para hacer pruebas en Javascript es Mocha. Esta fue desarrollada por el creador de Express, el framework MVC de Node.js

Se puede instalar facilite con npm:

```bach
	$ npm install -g mocha
```

Luego podemos escribir una prueba.

```javascript

	describe('User tests', function() {
	
	  describe('Save to database', function() {
	  
	    it('Should save without error', function(done){
	    
	      var user = new User('Oscar');
	      
	      user.save(function(err){
	        
	        if (err) throw err;
	        
	        done();
	      });
	    });
	  });
	});

```

***

## Conclusión

Con este capítulo cerramos esta serie. Hicimos un recorrido sobre los temas más oscuros de JavaScript para que finalmente fueran desnitrificados. Estemos orgullosos de lo que hemos aprendido.

Si te ha gustado esta entrada, compártela y ayuda a esparcir el conocimiento.

Espero escuchar de ti en la sección de comentarios más abajo.

Adiós.