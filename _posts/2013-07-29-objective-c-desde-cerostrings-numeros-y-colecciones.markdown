---
layout: post
status: publish
published: true
title: Strings, Números y Colecciones
author: Oscar González
author_login: oscar
author_email: gonzalezgreco@gmail.com
author_url: http://www.oscarvgg.com
wordpress_id: 1786
wordpress_url: http://codehero.co/?p=1786
date: 2013-07-29 00:00:05.000000000 -04:30
categories:
- Cursos
- Objective-C
tags:
- Objective-C
- desde cero
- string
- coleccion
- nsarray
- nsstring
- nsdiccionary
- nsmutablediccionary
- nsmutablearray
- nsmutablestring
comments: []
---
<p>En el capítulo anterior hablamos de como hacer nuestras propias clases.</p>

<p>En el capítulo de hoy hablaremos de algunas de las clases más usadas que provee Apple en su Foundation Framework. Estas clases nos hacen la vida más fácil proporcionándonos manejo de objetos básicos sin tener que preocuparnos nosotros por ellos.</p>

<p>Hoy hablaremos sobre cadenas de caracteres o Strings, y de la clase NSNumber para manejar objetos con números. En cuando a colecciones tocaremos las más importantes: NSArray, NSMutableArray, NSDiccionary y NSMutableDiccionary.</p>

<hr />

<h2>Empezando</h2>

<p>Como siempre abrimos Xcode y esta vez crearemos un nuevo proyecto de tipo "Command Line Tool".</p>

<p><a href="http://codehero.co/oc-content/uploads/2013/07/Screen-Shot-2013-07-28-at-6.41.28-PM.png"><img src="http://codehero.co/oc-content/uploads/2013/07/Screen-Shot-2013-07-28-at-6.41.28-PM.png" alt="nuevo proyecto xcode" class="aligncenter size-full wp-image-1787" /></a></p>

<p>Yo voy a llamar a mi proyecto "Clases de Apple". Usaremos "Automatic Reference Counting"</p>

<p><a href="http://codehero.co/oc-content/uploads/2013/07/Screen-Shot-2013-07-28-at-6.42.07-PM.png"><img src="http://codehero.co/oc-content/uploads/2013/07/Screen-Shot-2013-07-28-at-6.42.07-PM.png" alt="nombrar de proyecto en xcode" class="aligncenter size-full wp-image-1788" /></a></p>

<hr />

<h2>Strings</h2>

<p>Los strings son cadenas de caractes Unicode estáticas para representar texto. Cuando digo estáticas me refiero a que una vez instanciado un string no podemos cambiar su contenido a menos de lo volvamos a inicializar con otro valor.</p>

<p>En Objective-C la clase NSString es la que maneja estas cadenas de caracteres.</p>

<p>Entonces, vamos a abrir Xcode y nos vamos a main.m. Borramos todo lo que este dentro del bloque <em>@Autoreleasepool</em> y vamos a crear un string.</p>

<pre>NSString *test1 = @"Hola mundo";
</pre>

<p>Esta es la manera más fácil de inicializar un string. Utilizando la forma literal.</p>

<p>También podemos crear un string utilizando uno de los constructores de la clase.</p>

<pre>NSString *test2 = [[NSString alloc] initWithString:test1];
</pre>

<p>En esta ocasión hemos inicializado <em>test2</em> con el contenido de <em>test1</em>.</p>

<p>Existen muchos constructores y métodos estáticos que inicializan la clase NSString. Con ellos podemos incluir otros tipos de datos y hacerlos formar parte del texto que queramos formar.</p>

<pre>int anInteger = 48;
        
NSString *test3 = [NSString stringWithFormat:@"El numero es: %i", anInteger];
</pre>

<p><em>%i</em> es reemplazado por el valor de la variable <em>anInteger</em>. Dependiendo del tipo de dato de la variable el especificador de formato varía. Por ejemplo, si la variable fuera de tipo <em>double</em>, usaríamos <em>%d</em>, si fuera otro string usaríamos %@. Para conocer más sobre especificadores de formato, te invito a revisar la <a href="http://developer.apple.com/library/mac/#documentation/Cocoa/Conceptual/Strings/Articles/formatSpecifiers.html#//apple_ref/doc/uid/TP40004265-SW1">documentación de Apple</a>.</p>

<h3>Strings mutables</h3>

<p>Los strings mutables son aquellos que se pueden modificar, es decir, una vez inicializados se les puede agregar o quitar caracteres.</p>

<pre>NSMutableString *test4 = [NSMutableString stringWithFormat:@"Hola "];
[test4 appendString:@"mundo"];
        
NSLog(@"test4 contiene: %@", test4);
</pre>

<p>Aquí vemos como he creado el string <em>test</em> con el valor <em>"Hola "</em> y luego le he agregado la palabra <em>"mundo"</em>. Si corremos ahora esta aplicacion veremos como imprimirá por consola</p>

<pre>test4 contiene: Hola mundo
</pre>

<hr />

<h2>Colecciones</h2>

<p>Las colecciones son objetos que permiten manejar grupos de objetos del mismo tipo o distintos.</p>

<h3>NSArray</h3>

<p>Los arrays o arreglos también tienen varias formas de instanciarse:</p>

<pre>NSArray *testArray = @[test1, test2, test3, test4];
</pre>

<p>Esta es la forma literal. En este caso he creado un array con todos los strings que creé anteriormente. Ahora vemos como se hace por el constructor.</p>

<pre>NSArray *testArray2 = [[NSArray alloc] initWithObjects:test1, test2, test3, test4, nil];
</pre>

<p>Cuando declaramos arrays en esta forma siempre debemos cerrar con <em>nil</em>.</p>

<p>Si queremos obtener un valor del array, lo hacemos de la siguiente manera:</p>

<pre>NSString *string = [testArray objectAtIndex:2];
</pre>

<p>Los arrays son estáticos, al igual que los NSString no se pueden modificar una vez inicializados.</p>

<h3>NSMutableArray</h3>

<p>La contraparte modificable de NSArray es NSMutablearray.</p>

<pre>// 1
NSMutableArray *testMutableArray = [[NSMutableArray alloc] initWithArray:testArray];
NSLog(@"testMutableArray: %@", testMutableArray);

// 2
[testMutableArray addObject:testArray2];
NSLog(@"testMutableArray: %@", testMutableArray);

// 3
[testMutableArray removeObjectAtIndex:2];
NSLog(@"testMutableArray: %@", testMutableArray);

// 4
[testMutableArray removeLastObject];
NSLog(@"testMutableArray: %@", testMutableArray);

// 5
[testMutableArray removeAllObjects];
NSLog(@"testMutableArray: %@", testMutableArray);
</pre>

<p>Bien, aquí vemos algunas cosas que podemos hacer con el <em>NSMutableArray</em>:</p>

<ol>
<li>Se instancia la clase con el contenido de un array. También podemos instanciar un mutable array sin otro array, utilizando <em>initWithObjects</em> al igual que NSArray;</li>
<li>Agregué <em>testArray2</em> a <em>testMutableArray</em>. Cuando agregas se inserta al final de la lista;</li>
<li>Aquí elimino de la lista el objeto en la posición 2;</li>
<li>Así elimino el objeto en la ultima posición;</li>
<li>Y por último elimino todos los objetos que queden.</li>
</ol>

<p>Por cada invocación que hice de los métodos de <em>NSMutableArray</em> hice un <em>NSLog</em> para que vieras como va cambiando el array.</p>

<h3>NSDiccionary</h3>

<p>Los diccionarios son colecciones inmutables (no se puede modificar una vez instanciado) de asociaciones clave-valor, es decir, por cada clave que se inserte, se debe insertar un valor.</p>

<pre>NSDictionary *testDiccionary = @{@"valor 1": test1,
                                 @"valor 2": test2,
                                 @"valor 3": test3,
                                 @"valor 4": test4
                                 };
</pre>

<p>Para obtener valores del diccionario debemos pedirlo por clave:</p>

<pre>NSString *string2 = [testDiccionary objectForKey:@"valor 2"];
</pre>

<h3>NSMutableDiccionary</h3>

<p>Los diccionarios mutables son aquellos que si se pueden modificar, al igual que <em>NSMutableString</em> y <em>NSMutableArray</em>.</p>

<pre>// 1
NSMutableDictionary *testMutableDiccionary = [[NSMutableDictionary alloc] initWithDictionary:testDiccionary];
NSLog(@"testMutableDiccionary: %@", testMutableDiccionary);

// 2
[testMutableDiccionary setValue:testArray forKey:@"valor 5"];
NSLog(@"testMutableDiccionary: %@", testMutableDiccionary);

// 3
[testMutableDiccionary removeObjectForKey:@"valor 2"];
NSLog(@"testMutableDiccionary: %@", testMutableDiccionary);

// 4
[testMutableDiccionary removeObjectsForKeys:@[@"valor 4", @"valor 1"]];
NSLog(@"testMutableDiccionary: %@", testMutableDiccionary);

// 5
[testMutableDiccionary removeAllObjects];
NSLog(@"testMutableDiccionary: %@", testMutableDiccionary);
</pre>

<ol>
<li>Se instancia la clase con el contenido de un diccionario;</li>
<li>Agregué <em>testArray</em> a <em>testMutableDiccionary</em> con la clave "valor 5".;</li>
<li>Aquí elimino el objeto con la clave "valor 2";</li>
<li>Así elimino los objetos con las claves "valor 4" y "valor 1";</li>
<li>Y por último elimino todos los objetos que queden.</li>
</ol>

<p>Igualmente imprimí por consola cada invocación que hice de los métodos de <em>NSMutableDiccionary</em> para que se viera como va cambiando el diccionario.</p>

<h2>Números</h2>

<p>Si quisiéramos crear un arreglo o un diccionario de números no podríamos porque los <em>NSArray</em>, <em>NSMutableArray</em>, <em>NSDiccionary</em> y <em>NSMutableDiccionary</em>, solo aceptan objetos como elementos de la colección y los números son tipos de datos primitivos (int, double, float, etc). Por esto es que Apple introdujo la clase <em>NSNumber</em>.</p>

<p><em>NSNumber</em> es un envoltorio de estos tipos de datos primitivos para poder ser almacenados en colecciones. Veamos como se usan:</p>

<pre>NSNumber *aNumber = [NSNumber numberWithInt:5];
NSNumber *aNumber2 = [NSNumber numberWithBool:YES];
NSNumber *aNumber3 = [NSNumber numberWithFloat:4.5f];
</pre>

<p>Aquí instanciamos tres <em>NSNumber</em>, unos con un <em>int</em>, otro con un <em>BOOL</em> y otro con un <em>float</em>.</p>

<p>Ahora, podemos agregarlos a un array:</p>

<pre>NSArray *numbers = @[aNumber, aNumber2, aNumber3];
</pre>

<p>Si lo queremos volver a convertir en su valor original:</p>

<pre>NSLog(@"aNumber: %i", [[numbers objectAtIndex:0] intValue]);
NSLog(@"aNumber2: %i", [[numbers objectAtIndex:1] boolValue]);
NSLog(@"aNumber3: %.1f", [[numbers objectAtIndex:2] floatValue]);
</pre>

<p>Aquí los pido al array <em>numbers</em> por su posición y luego al <em>NSNumber</em> que retorna le pido que me retorne su valor <em>int</em>, <em>bool</em>, <em>float</em>, etc, según sea el caso.</p>

<hr />

<h2>Conclusión</h2>

<p>En este capítulo hemos aprendido a manejar unas de las clases más usadas al programar en Objective-C. Estas clases nos serán de mucha ayuda cuando trabajemos, por ejemplo, con tablas en iOS y Mac OS X.</p>

<p>Si tienes alguna pregunta no dudes en dejarla en los comentarios, con mucho gusto la responderé para ti.</p>

<p>Ya será hasta el próximo capítulo de Objective-C desde Cero.</p>

<p>Adiós.</p>
