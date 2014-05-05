---
layout: post
status: publish
published: true
title: Orientación a Objetos - parte 2
author: Oscar González
author_login: oscar
author_email: gonzalezgreco@gmail.com
author_url: http://www.oscarvgg.com
wordpress_id: 1399
wordpress_url: http://codehero.co/?p=1399
date: 2013-07-15 00:00:58.000000000 -04:30
serie: Objective-C desde Cero
dificultad: Novato
duracion: 20
github: https://github.com/codeheroco/objective-c-orientacion-a-objetos-2
description: En este capítulo de orientación a objetos, hablaremos de como agregar atributos y propiedades, como crear protocolos y como extender una clase mediante el uso de categorías.
categories:
- Cursos
- Objective-C
tags:
- Objective-C
- Objetos
- clases
- categorias
- protocolos
- desde cero
---
<p>Bienvenido de vuelta a <strong><em>Objective-C desde Cero</em></strong>, en el capítulo anterior estuvimos hablando de clases, mensajes, apuntadores y objetos.</p>

<p>En este capítulo seguiremos hablando de orientación a objetos. Esta vez explicaré como agregar atributos y propiedades a nuestras clases, como crear interfaces (protocolos) y como extender la funcionalidad de una clase mediante el uso de categorías.</p>

<div class="alert alert-info">
  <h4>
    ¡Alerta!
  </h4>

  <span>En este capítulo seguiremos trabajando sobre el proyecto del capítulo anterior. Si no venías siguiendo la serie, puedes clonarlo del siguiente <a href="https://github.com/codeheroco/objective-c-orientacion-a-objetos" target="blank">repo de GitHub</a>. Si quieres leer en capitulo anterior, puedes visitarlo <a href="http://codehero.co/objective-c-desde-cero-orientacion-a-objetos/" target="blank">aquí</a></span>
</div>

<p>Comencemos entonces.</p>

<hr />

<h2>Atributos de un clase</h2>

<p>Los atributos o ivars (como se llaman en objective-c) proporcionan un poderoso método de asociar información declarativa. Una vez asociada a una entidad, el atributo puede ser consultado en tiempo de ejecución y utilizarse en cualquier número de maneras.</p>

<p>Para agregar atributos a una clase solo tenemos que declarar variables entre llaves en el encabezado.</p>

<p>A continuación vemos un ejemplo de como quedaría el encabezado de nuestra clase <strong><em>person</em></strong> luego de agregarle atributos.</p>

<pre>@interface Person : NSObject
{
    NSString *name;
    NSDate *birthDate;
    float height;
    float weight;
}

- (void)walk;
- (void)jumpHeight:(float)centimeters;
- (void)runDistance:(float)meters withSpeed:(float)speed;
+ (int)age;

@end
</pre>

<p>En este ejemplo le dimos un nombre, fecha de nacimiento, altura y peso a la persona.</p>

<h3>Encapsulamiento</h3>

<p>Existen tres palabras clave para hacer uso de encapsulamiento: @public, @private y @protected. Todas las variables que estén declaradas debajo de estas palabras serán afectadas por estos modificadores. Por defecto el compilador tomará como protected todas las que no estén afectadas por algún modificador explícitamente.</p>

<p>Para los efectos de este ejemplo aplicaremos estos modificadores de la siguiente manera:</p>

<pre>@interface Person : NSObject
{
    NSString *name;

    @public
    NSDate *birthDate;

    @private
    float height;

    @protected
    float weight;
}
</pre>

<p><strong><em>Name</em></strong> por defecto es protected.</p>

<h2>Propiedades</h2>

<p>Las propiedades son una manera conveniente de generar getter y setters para nuestros atributos.</p>

<p>Nuestra clase quedaría de la siguiente manera:</p>

<pre>@interface Person : NSObject
{
    NSString *name;

    @public
    NSDate *birthDate;

    @private
    float height;

    @protected
    float weight;
}

@property (nonatomic, strong) NSString *name;
@property (nonatomic, strong) NSDate *birthDate;
@property (nonatomic, assign, readonly) float height;
@property (nonatomic, assign) float weight;
@property (nonatomic, strong) NSString *lastName;
@property (nonatomic, assign, getter = isBusinessPerson) BOOL businessPerson;

- (void)walk;
- (void)jumpHeight:(float)centimeters;
- (void)runDistance:(float)meters withSpeed:(float)speed;
+ (int)age;

@end
</pre>

<p>Las propiedades no tienen que estar siempre respaldadas por una variable de instancia (ivar). Por ejemplo, las propiedades <em>lastName</em> y <em>businessPerson</em> no tienen ivars que las respalden.</p>

<p>Objective-C no provee una manera de poder hacer métodos public, private o protected, y como las propiedades en el fondo son métodos get y set, por ende, tampoco se puede para las propiedades.</p>

<h3>Agregando métodos de acceso</h3>

<p>Las propiedades tienen atributos propios que definen su comportamiento. Por defecto todas son <em>readwrite</em>, significa que se les puede asignar un valor desde fuera. Lo contrario es <em>readonly</em>, a este tipo solo se le puede cambiar su valor a través de la variable de instancia (ivar) que la respalda.</p>

<p>También se pueden declarar metodos de acceso personalizado como tenemos en la propiedad <em>businessPerson</em>:</p>

<pre>@property (nonatomic, assign, getter = isBusinessPerson) BOOL businessPerson;
</pre>

<p>En este caso el compilador generará un método get llamado <em>isBusinessPerson</em> y no businessPerson.</p>

<h3>Atomic y Nonatomic</h3>

<p>Por defecto todas las propiedades son <em>Atomic</em>. Esto significa que los métodos de acceso aseguran que un valor es siempre totalmente asignado u obtenido, incluso cuando los métodos de acceso son invocados de forma simultánea desde hilos diferentes.</p>

<p>Puedes utilizar <em>Nonatomic</em> para especificar que los métodos de acceso devuelvan un valor directamente, sin ninguna garantía sobre lo que suceda si ese mismo valor es accedido de forma simultánea desde diferentes hilos. Por esta razón, es más rápido para acceder a una propiedad <em>nonatomic</em> que una <em>atomic</em>.</p>

<h3>Strong, weak y copy.</h3>

<p><em>Strong</em> indica que el valor debe ser retenido, normalmente se utiliza para cuando la propiedad guarda un objeto.</p>

<p><em>Assign</em> se utiliza para valores escalares como int, float, BOOL.</p>

<p><em>Copy</em> es para cuando una copia del objeto deba ser usada para la asignación.</p>

<h3>Sintetizadores</h3>

<p>Todas la propiedades deben ser sintetizadas en el archivo de implementación de una clase. Hoy en día el compilador puede auto-sintetizar las propiedades, sin embargo aún puedes hacerlo a mano.</p>

<pre>@synthesize name, birthDate …
</pre>

<p>Si dejamos las propiedades auto-sintetizadas, se acceden a ellas con su mismo nombre y agregándole "&#95;" al comienzo. Por ejemplo, la propiedad &#42;name&#42;, en el archivo .m se llama &#95;name.</p>

<h3>Asignando valores por defecto</h3>

<p>Vamos a sobreescribir el constructor de la clase person para asignar unos valores por defecto. En el archivo .m escribimos el siguiente método.</p>

<pre>- (id)init
{
    self = [super init];

    if (self)
    {
        // asignando a una variable por su nombre
        name = @"Oscar";

        // asignando por propiedad con metodo de acceso
        [self setName:@"Oscar"];
        [self setBusinessPerson:YES];

        // asignando por propiedad sin metodo de acceso
        _name = @"Oscar";
        _businessPerson = YES;

        // asignando por propiedad con sintaxys de punto
        self.name = @"Oscar";
        self.businessPerson = YES;

        // Accediendo a una variable por su metodo personalizado
        if ([self isBusinessPerson])
        {
            // Accediendo a una variable por su propiedad
            NSLog(@"%@ es una persona de negocios", self.name);
            NSLog(@"%@ es una persona de negocios", [self name]);
            NSLog(@"%@ es una persona de negocios", _name);

            // estos tres últimos hacen lo mismo.
        }

    }

    return self;
}
</pre>

<p>Como puedes ver hay muchas maneras de hacer las cosas.</p>

<hr />

<h2>Protocolos</h2>

<p>Las interfaces en Objective-C son llamadas protocolos.</p>

<p>En los protocolos podemos declarar métodos y propiedades (pero luego deben ser sintetizadas en el .m de la clase que implemente el protocolo, no se pueden auto-sintetizar).</p>

<p>Para crear un protocolo en nuestro proyecto vamos a File > New y seleccionamos "Cocoa Touch" -> "Objective-C protocolo".</p>

<p><img src="http://i.imgur.com/n4g41uO.png" alt="Nuevo protocolo en Xcode" class="aligncenter size-full wp-image-1401" /></p>

<p>Y especificamos el nombre de nuestro protocolo. Yo lo llamé Entidad.</p>

<p><img src="http://i.imgur.com/Bh3S8QV.png" alt="Nombre de nuevo protocolo en Xcode" class="aligncenter size-full wp-image-1400" /></p>

<p>Ahora simplemente agregamos las propiedades o métodos que queramos.</p>

<pre>@protocol Entity &lt;NSObject>

@property (nonatomic, assign) int identifier;

- (void)generateIdentifier;

@end
</pre>

<p>Ahora hacemos que nuestra clase Person implemente estos métodos.</p>

<p>Person .h:</p>

<pre>#import "Entity.h"

#import &lt;Foundation/Foundation.h>

@interface Person : NSObject &lt;Entity>

...
</pre>

<p>Es importante recordar que hay que importar <em>Entity.h</em></p>

<p>Person .m:</p>

<pre>…
@synthesize identifier;
…
</pre>

<p>Hay que sintetizar <em>identifier</em> porque viene de un protocolo.</p>

<p>Person .m:</p>

<pre>…
@synthesize identifier;
…
</pre>

<p>Implementamos el método generateIdentifier":</p>

<p>Person .m:</p>

<pre>…
- (void)generateIdentifier
{
    self.identifier = 123545;

    NSLog(@"Mi identificador es: %i", self.identifier);
}
…
</pre>

<hr />

<h2>Categorías</h2>

<p>Las categorías son una manera de agregar métodos a una clase sin necesidad de heredar de ella.</p>

<p>Supongamos que queremos agregar un método a nuestra clase <em>Person</em> sin tocarla.</p>

<p>En Xcode vamos a File > New y seleccionamos "Cocoa Touch" -> "Objective-C class extension".</p>

<p><img src="http://i.imgur.com/ZVnUPd3.png" alt="Nueva categoría en Xcode" class="aligncenter size-full wp-image-1403" /></p>

<p>Y especificamos el nombre de nuestra categoría y la clase que extiende. Yo la llamé Runner.</p>

<p><img src="http://i.imgur.com/doGf0Gp.png" alt="Nombre de nueva categoría en Xcode" class="aligncenter size-full wp-image-1402" /></p>

<p>Agregar un método se hace exactamente igual que como hacemos con las clases. Escribimos la declaración en el .h y la implementación en el .m. Luego con solo importar la categoría todas las instancias de la clase Person, tendrán esta método.</p>

<p>Yo voy a incluir el método <em>run</em> a nuestra clase:</p>

<p>Person+Runner.h</p>

<pre>#import "Person.h"

@interface Person (Runner)

- (void)run;

@end
</pre>

<p>Person+Runner.m</p>

<pre>#import "Person+Runner.h"

@implementation Person (Runner)

- (void)run
{
    NSLog(@"Corriendo");
}

@end
</pre>

<hr />

<h2>Actualizando main.m</h2>

<p>Ahora vamos a main.m e incluiremos llamados los nuevos métodos.</p>

<p>main.m</p>

<pre>#import "Person+Runner.h" // cambiamos Person.h por la categoria ya que esta ya la incluye

#import &lt;Foundation/Foundation.h>

int main(int argc, const char * argv[])
{

    @autoreleasepool {

        Person *oscar = [[Person alloc] init]; // ahora este utiliza el nuevo init que escribimos

        [oscar walk];

        [oscar jumpHeight:107.3f];

        [oscar runDistance:10.5f withSpeed:8.0f];

        [Person age];

        // Método del protocolo
        [oscar generateIdentifier];

        // Método de la categoria
        [oscar run];
    }
    return 0;
}
</pre>

<hr />

<h2>Conclusión</h2>

<p>En este capítulo hemos aprendido el lado que faltaba de la orientación a objetos de Objective-C. Hemos visto como crear ivars, propiedades, protocolos y categorías. Y con esto hemos cubierto todos los conceptos básicos necesarios para trabajar con objetos.</p>

<p>¡Hasta el próximo capítulo!.</p>
