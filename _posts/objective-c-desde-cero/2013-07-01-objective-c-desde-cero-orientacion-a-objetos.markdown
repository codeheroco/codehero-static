---
layout: post
status: publish
published: true
title: Orientación a Objetos
author: Oscar González
author_login: oscar
author_email: gonzalezgreco@gmail.com
author_url: http://www.oscarvgg.com
wordpress_id: 1245
wordpress_url: http://codehero.co/?p=1245
date: 2013-07-01 00:00:44.000000000 -04:30
serie: Objective-C desde Cero
dificultad: Novato
duracion: 20
description: En este capítulo de Objective-C desde Cero hablaremos de como este lenguaje implementa clases, objetos, métodos y apuntadores
categories:
- Cursos
- Objective-C
tags:
- Objective-C
- Objetos
- clases
- desde cero
---
<p>En este capítulo de <strong><em>Objective-C desde Cero</em></strong> hablaremos de como este lenguaje implementa el paradigma orientado a objetos.</p>

<hr />

<h2>Clases</h2>

<p>En Objective-C las clases son representadas mediante el uso de dos archivos, en lugar de uno como Java y C#, estos archivos son llamados encabezado e implementación, y llevan las extensiones .h y .m respectivamente.</p>

<div class="alert alert-info">
  <h4>
    ¡Alerta!
  </h4> Para esta demostración vamos a abrir Xcode y vamos crear un proyecto nuevo de tipo "Command Line Tool" exactamente igual al del capitulo anterior, esta vez yo lo voy a llamar "Ejemplo - Objetos". Si no sabes como hacerlo, revisa:

  <a href="">Objective-C desde Cero - Conceptos Básicos</a>
</div>

<p>Una vez tengamos la ventana principal de Xcode con nuestro proyecto listo para desarrollase, vamos a crear una clase nueva. Hacemos click derecho en nuestra capeta principal del proyecto (option + click) y seleccionamos New File.</p>

<p><a href="http://codehero.co/oc-content/uploads/2013/06/Screen-Shot-2013-06-30-at-8.45.14-PM.png"><img src="http://i.imgur.com/NlJO9ow.png" alt="Imagen de menu New File Xcode" class="aligncenter size-full wp-image-1246" /></a></p>

<p>En el menú de plantillas seleccionamos Objective-C Class.</p>

<p><a href="http://codehero.co/oc-content/uploads/2013/06/Screen-Shot-2013-06-30-at-8.45.55-PM.png"><img src="http://i.imgur.com/WCQL5PW.png" alt="imagen de menú de plantillas de Xcode - selección: Objective-C Class" class="aligncenter size-full wp-image-1247" /></a></p>

<p>Llamamos a nuestra clase <strong><em>Person</em></strong> e indicamos que es una subclase de <strong><em>NSObject</em></strong>. En Objective-C, todas las clases heredan de <strong><em>NSObject</em></strong>, así como en java todas de <strong><em>Object</em></strong>.</p>

<p><a href="http://codehero.co/oc-content/uploads/2013/06/Screen-Shot-2013-06-30-at-8.46.51-PM.png"><img src="http://i.imgur.com/7aeHQJe.png" alt="Imagen de nombre de clase Person" class="aligncenter size-full wp-image-1248" /></a></p>

<p>Guardamos el archivo en la carpeta de nuestro proyecto, le damos a *&#42;Create&#42; y veremos como aparece nuestra clase en el navegador de archivos. Vamos de una vez al archivo .h (encabezado).</p>

<p><a href="http://codehero.co/oc-content/uploads/2013/06/Screen-Shot-2013-06-30-at-8.47.18-PM.png"><img src="http://i.imgur.com/n67OY81.png" alt="Imagen de navegador de archivos con Person.h seleccionado" class="aligncenter size-full wp-image-1249" /></a></p>

<p>Debería contener lo siguiente:</p>

<pre>#import &lt;Foundation/Foundation.h>

@interface Person : NSObject

@end
</pre>

<blockquote>
  <p>En los archivos .h de las clases anunciamos los atributos y métodos que serán públicos.</p>
</blockquote>

<p>Si vamos al .m (implementación), encontraremos el siguiente código:</p>

<pre>#import "Person.h"

@implementation Person

@end

</pre>

<blockquote>
  <p>Todo lo que coloquemos en el .m de una clase y no esté declarado en el .h, será privado.</p>
</blockquote>

<hr />

<h2>Apuntadores</h2>

<p>Los apuntadores son variables que hacen referencia a objetos. Estudiemos la estructura de un apuntador. Vamos al archivo main.m e importamos nuestra clase <strong><em>Person</em></strong> (en cualquier lugar antes de la función main). Debe lucir así:</p>

<pre>#import "Person.h"

#import &lt;Foundation/Foundation.h>

int main(int argc, const char * argv[])
{

    @autoreleasepool {

        // insert code here...
        NSLog(@"Hello, World!");

    }
    return 0;
}
</pre>

<p>Ahora borramos todo lo que esté dentro del bloque <strong><em>@autoreleasepool</em></strong> ya que no lo vamos a necesitar y agregamos el siguiente código:</p>

<pre>Person *oscar = [[Person alloc] init];
</pre>

<ol>
<li>Person es nuestro tipo de dato, queremos guardar en la variable una referencia a un objeto de tipo Person.</li>
<li>El "*" (asterisco) indica que esta variable es un puntero.</li>
<li>Ahora nos topamos con [[Person alloc] init]. Con esto creamos una instancia de la clase person. "alloc" reserva un espacio en memoria para la variable. Una vez tengamos esta instancia le decimos "init", este es el constructor por defecto de todas las clases en Objective-C. Este bloque de código podría ser reemplazado por [Person new], esto es el equivalente a hacer [[Person alloc] init]. Cualquiera de los dos es válido y generan el mismo resultado, sin embargo yo prefiero seguir haciendo <strong>alloc</strong> e <strong>init</strong> ya que init puede ser sobrescrito o sobrecargado para recibir parámetros.</li>
</ol>

<p>El archivo main.m debe lucir así ahora:</p>

<pre>#import "Person.h"

#import &lt;Foundation/Foundation.h>

int main(int argc, const char * argv[])
{

    @autoreleasepool {

        Person *oscar = [[Person alloc] init];

    }
    return 0;
}
</pre>

<hr />

<h2>Mensajes</h2>

<p>En Objective-C, a los métodos de las clases se les llama <strong><em>Mensajes</em></strong>, ya veremos porqué. Sin embargo yo sigo llamándolos métodos, es por costumbre, Objective-C no fue el primer lenguaje que aprendí.</p>

<p>Vamos a agregar cuatro métodos al encabezado de nuestra clase <strong><em>Person</em></strong>.</p>

<ul>
<li>El primero será walk (caminar)</li>
</ul>

<pre>- (void)walk;
</pre>

<p>Revisemos la estructura del metodo:</p>

<ol>
<li>Primero nos encontramos con el carácter "-" (guión). Esto indica que el método es de instancia, es decir, para poder llamarlo debes hacerlo a través de un objeto instancia de la clase. Si quisiéramos hacer que el método fuera estático, entonces deberíamos cambiar el "-" por "+" (más)</li>
<li>Tenemos ahora "(void)". Esto significa que nuestro método el un procedimiento, no una función, entonces no va a retornar ningún valor.</li>
<li>Por último está "walk", este es el nombre del método.</li>
</ol>

<ul>
<li>Seguimos con saltar y le pasamos una altura:</li>
</ul>

<pre>- (void)jumpHeight:(float)centimeters;
</pre>

<ol>
<li>Aquí todo es similar hasta que llegamos a los dos puntos ":", estos indican que viene un parámetro.</li>
<li>"(float)", este es el tipo de dato del parametro entre paréntesis.</li>
<li>"centimeters" es el nombre del parametro.</li>
</ol>

<ul>
<li>Ahora correr una distancia con una velocidad:</li>
</ul>

<pre>- (void)runDistance:(float)meters withSpeed:(float)speed;
</pre>

<ol>
<li>Este método recibe dos parámetros: centimeters y speed; ambos de tipo float. El nombre completo del método es "runDistance:withSpeed:", y aquí es donde muchos se confunden, en Objective-C los nombres de los métodos deberían anunciar o dar una idea de que tipo son los parámetros que reciben, por eso "runDistance:{parámetro distancia} withSpeed:{parámetro velocidad}". Esto una genialidad, ya que el código se hace más "mantenible" al facilitar la identificación de los parámetros que reciben los métodos, y esto se hace más evidente cuando llamamos a los métodos, ya vamos a ver.</li>
</ol>

<ul>
<li>Por último agregaremos el método estático "edad":</li>
</ul>

<pre>+ (int)age;
</pre>

<ol>
<li>En este caso vemos que empieza con "+" porque es un método estático (puede ser invocado sin hacer una instancia de la clase).</li>
<li>"(int)" es el tipo de dato que retorna, esto nos hace darnos cuenta que este método es una función y que retorna un int</li>
<li>El nombre del método es age. (La edad normalmente debería ser un método de instancia, pero para efectos de esta demostración lo vamos a dejar estático)</li>
</ol>

<p>Nuestro encabezado debería verse así:</p>

<pre>#import &lt;Foundation/Foundation.h>

@interface Person : NSObject

- (void)walk;
- (void)jumpHeight:(float)centimeters;
- (void)runDistance:(float)meters withSpeed:(float)speed;
+ (int)age;

@end
</pre>

<p>Ahora en el archivo de implementación (.m) vamos a escribir lo que hacen cada unos de estos métodos.</p>

<pre>- (void)walk
{
    NSLog(@"Caminando");
}
</pre>

<p>En walk vamos a imprimir por consola "Caminando". Los string en Objective-C se declaran empezando por "@" y luego entre comillas el mensaje.</p>

<pre>- (void)jumpHeight:(float)centimeters
{
    NSLog(@"Saltando %f centímetros", centimeters);
}
</pre>

<p>En el mensaje vamos a incluir la altura que le pasamos. %f será reemplazado por el valor de tipo <em>float</em> que le pasamos.</p>

<pre>- (void)runDistance:(float)meters withSpeed:(float)speed
{
    NSLog(@"Corriendo %f metros a %f m/h", meters, speed);
}
</pre>

<p>Aquí imprimimos los dos parámetros.</p>

<pre>+(int)age
{
int myAge = 24

NSLog(@"mi edad es %i años", myAge);

return myAge;
}
</pre>

<p>En este imprimimos un simple mensaje de solo texto.</p>

<p>Person.m debería lucir de la siguiente manera:</p>

<pre>#import "Person.h"

@implementation Person

- (void)walk
{
    NSLog(@"Caminando");
}


- (void)jumpHeight:(float)centimeters
{
    NSLog(@"Saltando %f centímetros", centimeters);
}


- (void)runDistance:(float)meters withSpeed:(float)speed
{
    NSLog(@"Corriendo %f metros a %f m/h", meters, speed);
}


+ (int)age
{
int myAge = 24

NSLog(@"mi edad es %i años", myAge);

return myAge;
}

@end

</pre>

<p>Ahora vamos a main.m a llamar a estos metodos, Esto lo hacemos de la siguiente manera:</p>

<pre>[oscar walk];

[oscar jumpHeight:107.3f];  

[oscar runDistance:10.5f withSpeed:8.0f];

[Person age];
</pre>

<p>¿Ahora ves por qué se llaman mensajes?, es como si le hablaras a la clase/objeto para que haga algo.</p>

<ol>
<li>Los métodos de instancia los llamamos a través del objeto (tres primeras invocaciones). oscar, camina, salta, corre, etc,</li>
<li>Los métodos estaticos se llamar a través de la clase (cuarta invocación).</li>
<li>¿Por qué hay una "f" después de los números con decimales?. Así es como se expresan en Objective-C.</li>
</ol>

<p>El archivo main.m debe lucir de la siguiente manera:</p>

<pre>#import "Person.h"

#import &lt;Foundation/Foundation.h>

int main(int argc, const char * argv[])
{

    @autoreleasepool {

        Person *oscar = [[Person alloc] init];

        [oscar walk];

        [oscar jumpHeight:107.3f];

        [oscar runDistance:10.5f withSpeed:8.0f];

        [Person age];

    }
    return 0;
}
</pre>

<p>Si corremos este programa en Xcode, debería imprimir lo siguiente en la consola:</p>

<pre>Caminando
Saltando 107.300003 centímetros
Corriendo 10.500000 metros a 8.000000 m/h
Mi edad es 25 años
</pre>

<hr />

<h2>Conclusión</h2>

<p>En este capítulo aprendimos a escribir clases, agregarle métodos, pasarle mensajes a objetos, hacer instancias de clases y a crear punteros.</p>

<p>En el próximo vamos a hablar de atributos, las clases más utilizadas del framework Foundation de Apple y como Objective-C maneja la memoria.</p>

<p>Si tienes dudas o preguntas no dejes de exponerlas en los comentarios.</p>

<p>¡Nos vemos!</p>
