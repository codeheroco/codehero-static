---
layout: post
status: publish
published: true
title: Introducción
author: Oscar González
author_login: oscar
author_email: gonzalezgreco@gmail.com
author_url: http://www.oscarvgg.com
wordpress_id: 947
wordpress_url: http://codehero.co/?p=947
date: 2013-06-10 04:40:39.000000000 -04:30
serie: iOS desde Cero
dificultad: Novato
duracion: 20
categories:
- Cursos
- iOS
tags:
- iOS
- Tutorial
- desde cero
- indroduccion
---
<p>Es esta serie voy a mostrarte como desarrollar aplicaciones para iPhone, iPod Touch y iPad utilizando el iOS SDK. Durante el progreso de esta serie elaboraremos varias aplicaciones para ilustrar los procesos básicos y técnicas de programación fundamentales para tu formación como desarrollador de esta plataforma.</p>

<hr />

<h2>Antes de continuar</h2>

<p>Debes saber que para desarrollar iOS debes tener una Mac. Hasta el momento de esta escritura, no se pueden crear aplicaciones para iPhone, iPad o iPod Touch en un sistema operativo distinto a Mac OS X.</p>

<p>También deberías registrarte como Apple Developer (Desarrollador de Apple). Esto te dará acceso a la documentación y a ejemplos de código que podrían ser muy útiles. Puedes hacerlo accediendo al <a href="https://developer.apple.com/">Apple Developer Center</a>, es totalmente gratis.</p>

<p>Para poder probar tus aplicaciones en un dispositivo real (iPhone, iPad o iPod Touch), deberás adquirir una licencia del iOS Developer Program (Programa de desarrolladores iOS) por un módico precio de $99. De lo contrario deberás conformarte con el simulador incluido en el SDK.</p>

<p>Por último debes saber que voy a asumir que ya sabes programar, no importa que lenguaje. A pesar de que voy a explicar la sintaxis del lenguaje Objective-C (el lenguaje utilizado para programar en iOS y Mac OS X), ya tu deberías saber lo que es un condicional, un ciclo (loops), una clase, una interfaz, un método, etc. Venir de otros lenguajes orientados a objetos va a ser de mucha ayuda, pero tienes que mentalizarte que estás entrando en otro mundo. Algunos conceptos de C++, Java, C#, Javascript o cualquier similar, servirán como base, pero algunos otros pueden ser muy diferentes. Entonces, se paciente, lee con calma y no te preocupes si estás confundido, al final verás que es más sencillo de lo que parece.</p>

<hr />

<h2>Las Herramientas a Utilizar</h2>

<p>A continuación revisaremos cuales son las aplicaciones que estaremos utilizando con mayor frecuencia muestras desarrollamos aplicaciones para iOS.</p>

<h3>Xcode</h3>

<p>Xcode es un entorno de desarrollo creado por Apple y es la aplicación principal de la suite de desarrollo de aplicaciones para iOS y Mac Os X. Se puede descargar desde la Mac App Store o desde el <a href="https://developer.apple.com/xcode/">portal de desarrolladores de Apple</a> totalmente gratis. Asegúrate de siempre mantener esta aplicación actualizada hasta su versión más reciente, Apple la mejora con bastante frecuencia. La versión utilizada en este tutorial es la 4.6.2, pero podrías tener una más nueva.</p>

<p>Descargalo (pesa al rededor de 1.6 GB a la fecha de este escrito) e instálalo (debería ser una instalación "siguiente, siguiente, siguiente", pero el "deber ser" es que leas los términos y condiciones).</p>

<p>Para que empieces a ensuciarte las manos y no te aburras, vamos a abrir Xcode.</p>

<p>Deberías ver una ventana de bienvenida con una lista de los proyecto recientemente abiertos del lado derecho; si lo acabas de instalar, esta lista debería estar vacía.</p>

<p><img src="http://i.imgur.com/HA7sUzN.jpg" alt="Xcode - Ventana de Bienvenida" class="aligncenter size-full wp-image-961" /></p>

<p>Vamos a crear un nuevo proyecto. Haz click en "Create a new Xcode project" en la ventana de bienvenida o puedes también ir a, File > New > Project, y Escoge (doble click) la plantilla "Single View Application".</p>

<p>En las opciones del proyecto colocamos lo siguiente:</p>

<ul>
<li><strong>Product Name:</strong> Este es el nombre de la aplicación, el nombre que queremos que tenga debajo del icono en la pantalla del teléfono. Yo le voy a poner "Prueba".</li>
<li><strong>Organization Name:</strong> El nombre de la organización que desarrolla la app. Yo voy a colocar Codehero.</li>
<li><strong>Company Identifier:</strong> El identificador de tu compañía. Apple recomienda que sean un reverse url (url en reverso). Yo voy a ponerle co.Codehero.</li>
<li><strong>Class Prefix:</strong> Este es el prefijo que quieres para el nombre de tus clases. En este caso yo no quiero ninguno, así que lo voy a dejar en blanco.</li>
<li><strong>Devices:</strong> El dispositivo para el cual estas desarrollando tu aplicación. iPhone, engloba también iPod Touch, y iPad engloba iPad mini. Universal quiere decir que tu aplicación funciona tanto para iPhone como para iPad; esto lo explicaremos en el futuro. Por ahora, seleccionaré iPhone.</li>
<li><strong>Use Storyboards:</strong> Selecciónalo. Este es el tipo de archivos para diseñar nuestra interfaz. Ya hablaremos de ellos más adelante también,</li>
<li><strong>Use Automatic Reference Counting:</strong> Selecciónalo. Esto es para no tener que encargarnos manualmente de la liberación de memoria.</li>
<li><strong>Include Unit Tests:</strong> No queremos pruebas unitarias para esta demostración así que dejémoslo vacío.</li>
</ul>

<p><img src="http://i.imgur.com/47XFu7G.jpg" alt="Opciones de proyecto en Xcode" class="aligncenter size-full wp-image-962" /></p>

<p>Hacemos click en continuar y guardamos el proyecto en la dirección de nuestra preferencia.</p>

<p>Ahora tenemos ante nosotros la ventana principal del proyecto. Te explicaré la función de cada parte.</p>

<p><img src="https://i.imgur.com/7J0eM2t.jpg" alt="Ventana principal de Xcode" class="aligncenter size-full wp-image-967" /></p>

<ol>
<li>Del lado izquierdo tenemos el navegador de archivos, este consta con una lista de archivos y grupos que conforman el proyecto. Los grupos se ven como carpetas en la lista, pero no necesariamente son directorios reales en la carpeta del proyecto;</li>
<li>En el medio tenemos el editor;</li>
<li>Y del lado derecho tenemos el inspector. Este es un componente de contexto que cambia dependiendo de lo que seleccionemos en el editor.</li>
<li>En su parte inferior derecha tenemos una librería de elementos de código e interfaz.</li>
</ol>

<h3>Interface Builder</h3>

<p>Si seleccionas el archivo MainStoryboard.storyboard, el editor lo abrirá en Interface Builder. Este es un módulo de Xcode (antes una aplicación por separado), que sirve para construir las interfaces de usuario que se desplegarán en la pantalla.</p>

<p><img src="http://i.imgur.com/hJQ5WsJ.jpg" alt="ventana principal de Interface builder" class="aligncenter size-full wp-image-968" /></p>

<ol>
<li>Del lado izquierdo, justo después del navegador de archivos, tenemos una lista jerárquica de las vistas que tenemos en el editor. </li>
<li>En la librería (debajo del inspector) podemos arrastrar elementos de interfaz para incluirlos en nuestro diseño.</li>
</ol>

<p>Estos storyboards fueron introducidos desde iOS 5 para facilitar el desarrollo de interfaces. Sin embargo, aun se puede utilizar la forma, por así decirlo, "antigua", que es utilizando archivos .xib. Luego en esta serie dedicaremos un capitulo entero para hablar de las diferencias y similitudes entre los xib y storyboards.</p>

<h3>iOS Simulator</h3>

<p>Ahora podemos correr nuestra aplicación. Haz click en el botón "Run" (en la esquina superior izquierda) y verás como Xcode compila y corre. La aplicación se ejecutará en el iOS Simulator.</p>

<p><img src="http://i.imgur.com/3XfQHWv.jpg" alt="iOS desde Cero - iOS Simulator" class="aligncenter size-full wp-image-969" /></p>

<p>En este momento solo vemos un rectángulo blanco, es porque nuestra vista está vacía, pero pronto le daremos más vida. Por ahora solo te hablaré de algunas de las cosas que puede y no puede hacer el simulador.</p>

<p>El simulador de iOS no tiene:</p>

<ul>
<li>Cámara (y no, no puede usar la del computador);</li>
<li>Acelerómetro;</li>
<li>Brujula;</li>
<li>Ni giroscopio.</li>
</ul>

<p>Si tu aplicación necesita alguno de estos tienes que correr tu aplicación en un dispositivo real. Sin embargo, puedes simular algunos comportamientos como:</p>

<ul>
<li>Rotar a la izquierda</li>
<li>Rotar a la derecha</li>
<li>Un gesto de agitar.</li>
<li>Una advertencia de memoria.</li>
<li>Una llamada.</li>
<li>Una entrada de un teclado externo;</li>
<li>Y salida a TV.</li>
</ul>

<p>Todos estos los puedes encontrar en el menú "Hardware"</p>

<hr />

<h2>Conclusión</h2>

<p>Aun queda mucha tela que cortar. Solo hemos empezado a rasgar corteza del desarrollo iOS. En el próximo tutorial vamos a empezar a conocer el lenguaje Objective-C y escribir nuestra primera aplicación.</p>

<p>¡Hasta entonces!.</p>
