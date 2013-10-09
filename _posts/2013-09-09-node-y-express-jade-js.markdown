---
layout: post
status: publish
published: true
title: Jade.js
author: Oscar González
author_login: oscar
author_email: gonzalezgreco@gmail.com
author_url: http://www.oscarvgg.com
wordpress_id: 2198
wordpress_url: http://codehero.co/?p=2198
date: 2013-09-09 00:03:06.000000000 -04:30
categories:
- Cursos
- Node.js
tags:
- desde cero
- node
- express
- jade
- plantillas
- templates
comments: []
---
<p>En este capitulo de <em>Node.js y Express</em> voy a hablarte de un tópico que tocamos muy por encima en el capítulo anterior, Jade.js.</p>

<p>Jade es un lenguaje de plantillas desarrollado por el creador de Express para simplificar la sintaxis de HTML y acelerar el proceso de desarrollo.</p>

<p>Este lenguaje intercambia tener que cerrar las etiquetas HTML por la indentación, es decir, todo bloque de texto que esté hacia la derecha de la etiqueta que abre, significa que va dentro.</p>

<p>También elimina los símbolos "&lt;" y ">", y los parámetros de cada etiquetas se pasan entre paréntesis como si fuera una función.</p>

<p>Veamos un ejemplo:</p>

<hr />

<h2>Sintaxis Básica de Jade</h2>

<pre>h1 Hola, mi nombre es Oscar

h2 y me gusta programar en los siguientes lenguajes:

ul
    li Javascript
    li Objective-C
</pre>

<p>Como podemos ver, se elimina el marckup para darle al código un look mucho más limpio.</p>

<p>Si queremos agregar clases o id, solo tenemos que colocarlo al lado:</p>

<pre>h1.titulo Hola, mi nombre es Oscar

h2.subtitulo y me gusta programar en los siguientes lenguajes:

ul#lenguajes
    li Javascript
    li Objective-C
</pre>

<p>Podemos agregar todos los que queramos y combinarlos.</p>

<pre>h1.titulo Hola, mi nombre es Oscar

h2.subtitulo.cursiva y me gusta programar en los siguientes lenguajes:

ul#lenguajes.lista
    li Javascript
    li Objective-C
</pre>

<p>Ahora supongamos que queremos escribir un texto muy largo, en una sola línea podría ser tedioso. En jade podemos separar el contenido de una etiqueta en varias lineas utilizando el carácter "|" (pipe):</p>

<pre>p un texto corto

p
    | un 
    | texto
    | muy
    |largo
</pre>

<p>También hay una forma simplificada, y es agregando un punto después de la etiqueta:</p>

<pre>p.
    un
    texto
    muy
    largo
</pre>

<hr />

<h2>Etiquetas Style y Script</h2>

<p>Todo el contenido de las etiquetas style y script será convertido a CSS y Javascript respectivamente:</p>

<pre>style
    h1 {
        color: blue;
    }
</pre>

<pre>script
    var a = 1;
</pre>

<hr />

<h2>Javacript</h2>

<p>Jade soporta javascript embebido en el documento agregando el carácter "-" por delante, este código será ejecutado en el lado servidor y no del lado del cliente.</p>

<pre>- var name = 'oscar';

ul
    li Mi nombre es: #{ name }

</pre>

<p>También podemos mostrar el contenido de la variable asignándolo a la etiqueta:</p>

<pre>- var name = 'oscar';

ul
    li= #{ name }

</pre>

<p>Si quisiéramos agregar HTML en el código tenemos que reemplazar "#" por "!", de lo contrario el código será impreso como texto.</p>

<pre>- var name = '<span>oscar</span>';

ul
    li= !{ name }

</pre>

<hr />

<h2>Pasando Parametros</h2>

<p>Como mencioné anteriormente, los parámetros de las etiquetas se pasan entre paréntesis como si fueran funciones:</p>

<pre>a(href="/profile", rel="nofollow") ver el perfil
</pre>

<p>Otro ejemplo más complejo:</p>

<pre>- var name = '<span>oscar</span>';

ul
    li= !{ name }
        a(href="/delete") x
</pre>

<p>Este coloca un link dentro de un elemento de una lista justo después de su valor.</p>

<hr />

<h2>Mixins</h2>

<p>Puedes pensar en los mixins como si fueran funciones, estos permiten reutilizar bloques de código de la siguiente manera:</p>

<p>Supongamos que tengo un array de objetos y quiero mostrarlos en una lista, pero este patrón patrón podría repetirse en varias partes de mi código.</p>

<pre>- var authors = [ {name: 'oscar', tutorial: 'iOS'}, {name: 'carlos', tutorial: 'django'}, {name: 'alberto', tutorial: 'git'}, {name: 'jonathan', tutorial: 'how to'}, {name: 'ricardo', tutorial: 'rails'}, {name: 'ramses', tutorial: 'php'}];

mixing authorInfo(authorObject)
    li Autor: #{ authorObject.name } - Curso: #{ authorObject.tutorial }
</pre>

<p>Vemos como el mixin recibe un objeto llamado author y lo muestra en un elemento de lista. Ahora podemos llamarlo:</p>

<pre>ul
    each author in authors
        mixin authorInfo(author)
</pre>

<hr />

<h2>Importando Archivos</h2>

<p>Supongamos que queremos que el mixin anterior aparezca también en otros archivos de mi aplicación. Con Jade podemos guardar en mixin en otro archivo y fácilmente importarlo en otros.</p>

<pre>// author-info.jade

mixing authorInfo(authorObject)
    li Autor: #{ authorObject.name } - Curso: #{ authorObject.tutorial }

</pre>

<p>Ahora en nuestra plantilla podemos importar el archivo del mixin:</p>

<pre>- var authors = [ {name: 'oscar', tutorial: 'iOS'}, {name: 'carlos', tutorial: 'django'}, {name: 'alberto', tutorial: 'git'}, {name: 'jonathan', tutorial: 'how to'}, {name: 'ricardo', tutorial: 'rails'}, {name: 'ramses', tutorial: 'php'}];

include author-info

ul
    each author in authors
        mixin authorInfo(author)

</pre>

<hr />

<h2>Conclusión</h2>

<p>Jade es un lenguaje de plantillas poderoso y simple, un complemento excelente para nuestras aplicaciones de Node.js y Express.</p>

<p>Como siempre cualquier duda, puedes dejarla más abajo en la sección de comentarios.</p>

<p>Saludos.</p>
