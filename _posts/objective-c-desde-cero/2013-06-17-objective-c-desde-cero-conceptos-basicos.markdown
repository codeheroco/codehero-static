---
layout: post
status: publish
published: true
title: Conceptos Básicos
author: Oscar González
author_login: oscar
author_email: gonzalezgreco@gmail.com
author_url: http://www.oscarvgg.com
wordpress_id: 1022
wordpress_url: http://codehero.co/?p=1022
date: 2013-06-17 03:30:24.000000000 -04:30
categories:
- Cursos
- Objective-C
tags:
- Objective-C
- desde cero
- conceptos
- basico
---
<p>Bienvenido a esta nueva serie que se estará presentando alternativamente a la serie "iOS desde Cero", para fortalecer las bases que te harán entender mejor y desarrollar aplicaciones más robustas, tanto para Mac OS X como para iOS.</p>

<hr />

<h2>Historia</h2>

<p>Hace 41 años atrás (1972) nace el lenguaje C, introduciendo una sintaxis innovadora que se convirtió luego en la más popular del mundo, influenciando a muchos lenguajes que utilizamos hoy en día.</p>

<p>En 1980 aparece SmallTalk, el primer lenguaje orientado a objetos. Fue entonces cuando se pensó que se podría crear un lenguaje como C pero con orientación a objetos, y así nació C++ en el 83. Más adelante, en 1986 fue creado Objective-C como una extensión del lenguaje C, añadiéndole: clases, objetos, métodos, protocolos, excepciones, propiedades y categorías.</p>

<p>En 1988 Objective-C fue adoptado por NeXT (la compañía que fundó Steve Jobs cuando dejó Apple). Este fue utilizado como base para construir el sistema operativo que correrían sus computadores, NeXTStep.</p>

<p>En el 96 Apple compró NeXT, y su sistema operativo, NextStep, pasó a convertirse en Mac OS X en 2001. Es por esto que verás que la mayoría de las clases del SDK de iOS y Mac tienen el prefijo "NS", porque provienen de NeXTStep.</p>

<p>En 2007 se introdujo el iPhone, cuyo sistema operativo sería basado en las tecnologías de Mac. Es por esta razón que Objective-C también es el lenguaje utilizado para programar las aplicaciones nativas de iOS.</p>

<p>Toda esta plataforma de Apple está sentada sobre más de 20 años de historia y evolución de Objective-C, por eso no puede ser eliminado del cuadro.</p>

<hr />

<h2>El lenguaje</h2>

<p>Objective-C al principio puede parecer intimidante porque se ve muy diferente, si vienes de lenguajes como Java o C++, pero la verdad es que es bastante sencillo.</p>

<p>A diferencia de C++, Java o C#, Objective-C no esta basado en C, Objective-C es C. Por lo tanto podrías copiar código de un programa hecho en C y pegarlo en uno de Objective-C y este compilará.</p>

<p>Vamos a dar inicio a este tutorial. Abrimos Xcode (en este caso uso la versión 4.6.2) y creamos un nuevo proyecto seleccionando <strong><em>Application > Command Line Tool</em></strong>.</p>

<div class="alert alert-info">
  <h4>
    ¡Alerta!
  </h4> Los siguientes ejemplos son Objective-C puro, no son específicos del desarrollo iOS ni de Mac OS X, sino del lenguaje. Para información básica sobre Xcode y como usarlo puedes revisar el primer capítulo de la serie 
  
  <a href="http://codehero.co/ios-sdk-desde-cero-introduccion/">"iOS desde Cero"</a>.
</div>

<p><a href="http://codehero.co/oc-content/uploads/2013/06/1-Xcode-Nuevo-Proyecto.jpeg"><img src="http://i.imgur.com/QiJyGLe.jpg" alt="ventana de Xcode Nuevo Proyecto" class="aligncenter size-full wp-image-1032" /></a></p>

<p>En la siguiente ventana colocamos el nombre del producto, el nombre de la organización, el identificador de la compañía, y seleccionamos "Foundation" del combo y chequeamos "Use Automatic Reference Counting"</p>

<p><a href="http://codehero.co/oc-content/uploads/2013/06/2-Xcode-Proyecto-Descripcion.jpeg"><img src="http://i.imgur.com/lFFxFjS.jpg" alt="detalle de proyecto - objective-c" class="aligncenter size-full wp-image-1033" /></a></p>

<blockquote>
  <p><strong>"Foundation"</strong> es un framework de Apple que facilita el manejo de estructuras básicas como colecciones, strings, fechas, entre otros.</p>
  
  <p><strong>"Automatic Reference Counting"</strong> (ARC) en un manejador de memoria (no recolector de basura como el de Java o C#) que nos ahorrará tener que hacer release (similar a delete o free en C++). ARC lleva el conteo de referencias (punteros) a direcciones de memoria y es capaz de hacer la liberación del espacio automáticamente por nosotros cuando el conteo llega a cero. En otras palabras, cuando creas un objeto, este es alocado en memoria y apuntado por una variable que llamamos "apuntador", cuando esta variable deja de existir (Ej: Terminó la ejecución de la función donde fue creado), el espacio de memoria no es apuntado por nadie, por lo tanto ARC lo borra.</p>
</blockquote>

<p>Guardamos en el directorio de nuestra preferencia y empezamos a programar.</p>

<h3>Estructura de un programa</h3>

<p>Si todo salió bien, deberíamos ver un archivo llamado main.m con el siguiente código:</p>

<pre>//
//  main.m
//  Ejemplo 1 - Objective-C
//
//  Created by Oscar Vicente González Greco on 16/6/13.
//  Copyright (c) 2013 Codehero. All rights reserved.
//

#import &lt;Foundation/Foundation.h>       //1

int main(int argc, const char * argv[]) //2
{

    @autoreleasepool {                  //3
        
        // insert code here...          //4
        NSLog(@"Hello, World!");        //5
        
    }
    return 0;                           //6
}
</pre>

<ol>
<li>En esta línea importamos el foundation framework. De esta menear le dijimos a la aplicación que vamos a utilizarlo.</li>
<li>No importa si programas para iOS o Mac, todas las aplicaciones en Objective-C inician con la función main. Xcode siempre la va incluir por nosotros, por lo tanto no es necesario que la escribamos.</li>
<li><em>autoreleasepool</em> tiene que ver con manejo de memoria, por ahora vamos a ignorarlo, esto lo estaré explicando junto a ARC con más detalle en futuros capítulos.</li>
<li>Esto es un comentario. También podemos comentar con /* */ como en la mayoría de los lenguajes modernos.</li>
<li><em>NSLog</em> se usa para escribir mensajes de salida (imprimir por pantalla), es el equivalente, a printf de C++, system.out.println de Java o console.writeline de C#.</li>
<li>Este es el final de la función main, indicando que fue exitosa la ejecución.</li>
</ol>

<blockquote>
  <p>Objective-C es un lenguaje case sensitive, esto significa que <em>main</em> es diferente de <em>Main</em>.</p>
  
  <p>Por otro lado, no es sensible a espacios en blanco por lo que la función <em>main</em> se podría declarar también de la siguiente manera:</p>
</blockquote>

<pre>int main(int argc, 
         const char * argv[])
...
</pre>

<h3>Corriendo la aplicación</h3>

<p>Objective-C es un lenguaje que debe ser compilado. A diferencia de Javascript, PHP, Ruby o Python, que son lenguajes interpretados.</p>

<p>Para compilar podemos seleccionar <strong><em>Product > Build</em></strong> o presionar <strong><em>Command+B</em></strong> que es el atajo. Si no dañamos nada del proyecto que generó Xcode para nosotros, debería decir "Build Succeeded".</p>

<p>Si queremos correr la aplicación seleccionamos el botón de la esquina superior izquierda que dice "Run" o podemos también ir a <strong><em>Product > Run</em></strong>, o presionar el atajo <strong><em>Command+R</em></strong>. Xcode compila y corre el programa (no es necesario compilar y correr manualmente, xcode compila siempre antes de correr).</p>

<p>En la parte inferior de la ventana veremos que apareció un panel, este contiene a la consola del lado derecho.</p>

<p><a href="http://codehero.co/oc-content/uploads/2013/06/3-Objective-C-Corriendo-el-programa-Consola.jpeg"><img src="http://i.imgur.com/8iN5Yr5.jpg" alt="Consola de xcode" class="aligncenter size-full wp-image-1034" /></a></p>

<p>Luego de correr la aplicación debería decir:</p>

<pre>> Ejemplo 1 - Objective-C[3812:303] Hello, World!
</pre>

<p>Este es el mensaje que mandamos a imprimir con NSLog.</p>

<h3>Variables</h3>

<p>Todas las variables en Objective-C se declaran igual que en C. La estructura de la definición es la siguiente:</p>

<pre>int myVariable = 10;
</pre>

<div class="alert alert-success">
  tipoDeDato NombreDeVariable = Valor;
</div>

<p>Los tipos de dato primitivos en Objective-C son los mismos que en C solo que incluimos uno más:</p>

<ul>
<li><strong>int</strong>: para numeros enteros</li>
<li><strong>float</strong>: para puntos flotante (valores con decimales)</li>
<li><strong>double</strong>: un punto flotante de mayor precisión (dobla la cantidad de decimales de float)</li>
<li><strong>char</strong>: para carateres simples</li>
<li><strong>BOOL</strong>: este es el que incluimos que no tenia C, es para valores booleanos (verdadero o falso, en objective-C: YES o NO)</li>
</ul>

<h3>Condicionales</h3>

<p>Los condicionales también son idénticos a los de C:</p>

<pre>if (a == b) {
    // this...
}
else {
    // that...
}
</pre>

<pre>switch (numbers) {
    case 1:
        // something
        break;
    case 2:
        // other something
        break;
        
    default:
        // none of the above
        break;
}
</pre>

<h3>Ciclos</h3>

<p>Igualmente los mismo de C:</p>

<pre>do {
   // something
} while (a > b);
</pre>

<pre>while (a > b) {
    // loop
}
</pre>

<pre>for (int i = 0; i &lt; 10; i++) {
    // loop
}
</pre>

<p>Incluimos uno más que es el <em>"For In"</em> o <em>"For each"</em>:</p>

<pre>for (NSString *name in users) {
    // do something with the user
}
</pre>

<p>Este es para recorrer colecciones de objetos, más adelante los explicaré con detalle.</p>

<hr />

<h2>Conclusión</h2>

<p>Hasta ahora lo que hemos visto de Objective-C no es muy diferente de C. En el próximo capitulo hablaremos de operadores, numeros, strings (cadenas de caracteres), enumeradores, entre otras cosas antes de introducirnos a la orientación a objetos.</p>
