---
layout: post
status: publish
published: true
title: Controladores
author: Oscar González
author_login: oscar
author_email: gonzalezgreco@gmail.com
author_url: http://www.oscarvgg.com
wordpress_id: 1097
wordpress_url: http://codehero.co/?p=1097
date: 2013-06-24 04:35:15.000000000 -04:30
dificultad: Novato
duracion: 20
categories:
- Cursos
- iOS
tags:
- iOS
- desde cero
- controladores
---
<p>Bienvenidos una vez más a <strong><em>iOS desde Cero</em></strong>. En este capítulo de la serie vamos a empezar a desarrollar aplicaciones, ¡Yei!. Aprenderemos las habilidades básicas mínimas que necesitas saber para poder construir cualquier aplicación de iOS utilizando Xcode.</p>

<hr />

<h2>Modelo-Vista-Controlador (MVC)</h2>

<p>El patrón de diseño de arquitectura o modelo de arquitectura de software MVC, es un patrón fundamental en el desarrollo de aplicaciones para iOS. Éste ha estado presente desde los años 70. Su filosofía parte principalmente de la idea de separar dependencias en tres módulos básicos para hacer el código más legible.</p>

<ul>
<li><strong>Modelos:</strong> Los modelos representan la lógica de la aplicación, generalmente son las clases de acceden a datos (persistencia).</li>
<li><strong>Vistas:</strong> Las vistas son las interfaces gráficas que los usuarios ven.</li>
<li><strong>Controladores:</strong> Son los encargados recibir los eventos disparados por las vistas y ejecutar las acciones correspondientes a dichos eventos en los modelos.</li>
</ul>

<p>Lo bueno de esto es que es muy flexible. Dependiendo del nivel de complejidad de nuestra aplicación, éste patrón puede reducirse a solo vistas y controladores, como extenderse a usar más capas más allá de los modelos.</p>

<p>Básicamente el patrón MVC se representa de la siguiente manera:</p>

<p><img src="http://i.imgur.com/2vKGyqM.png" alt="1 - MVC-ios-desde-cero-controladores" class="aligncenter size-full wp-image-1102" /></p>

<hr />

<h2>Conectando la vista con el controlador</h2>

<p>En Xcode las vistas vienen siendo los archivos .xib y los .storyboard, y los modelos y controladores son simplemente clases de Objective-C. Podrías no utilizar archivos para las vistas y generarlas por código desde los controladores, pero requiere mucho más trabajo, es preferible utilizar vistas siempre que se pueda.</p>

<p>Los objetos en los controladores que deben ser conectados con la interfaz se llaman outlets. Lo que debemos hacer en Xcode es conectar los outlets de los controladores con su representación gráfica:</p>

<p><img src="http://i.imgur.com/W2FYaCE.png" alt="2 - Conecciones Outlets - ios-desde-cero-controladores" class="aligncenter size-full wp-image-1103" /></p>

<p>Vamos a poner esto en práctica creando un nuevo proyecto en Xcode, haremos una app sencilla que permita a los usuarios introducir su nombre y les retorne un mensaje de saludo.</p>

<p><img src="http://i.imgur.com/2NhlGRs.png" alt="xcode-nuevo-proyecto-ios-desde-cero-controladores" class="aligncenter size-full wp-image-1101" /></p>

<p>Esta vez no vamos a seleccionar <strong>Use Storyboards</strong>, vamos a usar solo xibs, pero si seguiremos usando ARC (automatic reference counting), este es el standard que Apple quiere que todos usemos de ahora en adelante.</p>

<p>Una vez que tengamos la ventana principal de Xcode frente a nosotros, seleccionamos ViewController.xib del navegador de archivos y veremos entonces como el editor despliega el Interface Builder.</p>

<p>Vamos a agregar tres objetos a nuestra interfaz:</p>

<p><img src="http://i.imgur.com/US7ObBL.png" alt="agregando-text-field-ios-desde-cero-controladores" class="aligncenter size-full wp-image-1100" /></p>

<ol>
<li><p>En la parte inferior del inspector escribimos text. En la lista que está inmediatamente arriba, seleccionamos <strong>Text Field</strong> y lo arrastramos hasta la interfaz. Yo lo voy a colocar en la parte superior y lo voy a estirar un poco para tener mejor visibilidad. Tomate la libertad de modificarlo como quieras (o puedas).</p></li>
<li><p>En el inspector podemos editar algunas propiedades de los objetos que seleccionamos, juega con estos como quieras, es bueno que te familiarices con lo que puedes hacer a través Interface Builder porque así puedes sacar el máximo de él, ya verás en el futuro que hay algunas otras que solo pueden hacerse por código.</p></li>
</ol>

<p><img src="http://i.imgur.com/8bRsrOc.png" alt="agragando-boton-ios-desde-cero-controladores" class="aligncenter size-full wp-image-1098" /></p>

<ol>
<li>Ahora agregamos un botón, este será el que el usuario debe presionar para recibir el mensaje de saludo. Igualmente puedes hacerle los cambios que quieras, yo voy a agrandarlo un poco para que sea más fácil de seleccionar.</li>
</ol>

<p><img src="http://i.imgur.com/W4Wxi7sh.png" alt="agregando-label-ios-desde-cero-controladores" class="aligncenter size-full wp-image-1099" /></p>

<ol>
<li><p>Ahora solo hace falta agregar un <strong>Label</strong> para mostrarle el mensaje de saludo al usuario.</p></li>
<li><p>Yo le coloqué un mensaje desde el inspector solo para saber donde está. Sin texto el label es completamente invisible. Luego por código reemplazaremos este mensaje.</p></li>
</ol>

<p>Bien, ya tenemos nuestra interfaz lista, solo falta crear nuestros outlets en el código y conectarlos con la vista. La manera más fácil de hacerlo es la siguiente:</p>

<p>Seleccionamos el editor asistente para que Xcode coloque lado a lado, la vista y la clase controladora.</p>

<p><img src="http://i.imgur.com/kaPTnLg.png" alt="asistente-xcode-ios-desde-cero-controladores" class="aligncenter size-full wp-image-1115" /></p>

<p>Si su pantalla es pequeña como la que estoy usando en este momento (Macbook Pro 13') y el panel izquierdo de Interface Builder (Document Outline) les molesta, pueden colapsarlo haciendo click en el botón de la esquina inferior izquierda.</p>

<p><img src="http://i.imgur.com/lqg2gL8.png" alt="boton-ocultar-document-outline-ios-desde-cero-controladores" class="aligncenter size-full wp-image-1108" /></p>

<p>Si en el editor que aparece del lado derecho no muestra el <em>header file: ViewController.h</em>, puedes navegar hasta él haciendo click en el navegador superior del editor.</p>

<p><img src="http://i.imgur.com/N8mK8u0.png" alt="navegador-archivos-editor-ios-desde-cero-controladores" class="aligncenter size-full wp-image-1106" /></p>

<p>Manteniendo la tecla <strong><em>control</em></strong> presionada, hacemos click sobre el <em>text field</em> y arrastramos hasta el editor del lado derecho.</p>

<p><img src="http://i.imgur.com/Ln37iio.png" alt="conectar-outlet-ios-desde-cero-controladores" class="aligncenter size-full wp-image-1114" /></p>

<p>Entonces aparecerá una pequeña ventana preguntándonos:</p>

<p>[<img src="http://i.imgur.com/W3LZdHE.png" alt="agregar-outlet-ios-desde-cero-controladores" class="aligncenter size-medium wp-image-1111" />][11]</p>

<ol>
<li>El tipo de conexión: Seleccionamos <em>Outlet</em></li>
<li>El nombre del atributo que vamos a crear: Yo lo llamé <em>nameField</em>, tu puedes llamarlo como quieras.</li>
<li>En el tipo dejamos: <em>UITextField</em>, este es un objeto de UIKit, el framework de apple que contiene todos los elementos de interfaz gráfica de iOS. <em>UITextField</em> representa un campo de texto en código.</li>
<li>Y por último, Storage, lo dejamos en <em>weak</em>, todos los elementos de interfaz gráfica deberían ser <em>weak</em>. ¿Por qué?. Esto lo estaré explicando en el tutorial de manejo de memoria del curso <strong><em>Objective-C desde Cero</em></strong>.</li>
</ol>

<p>Repetimos el mismo proceso para el label. yo llamaré el outlet messageLabel.</p>

<p>Para el botón, el proceso es similar, solo que con una ligera diferencia. En lugar de seleccionar <em>outlet</em> para el tipo de conexión, seleccionamos <em>Action</em>. Esto es porque no queremos al botón en nuestro código, no vamos a modificar ninguna de sus propiedades. Lo que queremos es recibir el evento de cuando sea presionado por el usuario.</p>

<p><img src="http://i.imgur.com/A4x8EwN.png" alt="agregar-outlet-button-ios-desde-cero-controladores" class="aligncenter size-full wp-image-1110" /></p>

<ol>
<li>Seleccionamos Action entonces como dijimos anteriormente.</li>
<li>Le colocamos un nombre al metodo que será llamado cuando se dispare este evento. Yo lo llamé <em>buttonSelected</em></li>
<li>En <em>Type</em> seleccionamos <em>UIButton</em>, podría ser id, pero yo prefiero tener el botón. Cuando el evento se dispare podemos recibir al botón como argumento del método, por eso prefiero recibirlo como UIButton en lugar de id, así evito tener que hacer un <em>casting</em> (casteo, convertirlo, etc). <em>"id" es el tipo de objeto general de Objective-C, un "id" puede ser cualquier objeto, es como el "var" de C#</em></li>
<li>El evento será <em>TouchUpInside</em>, esto significa que el método será llamado cuando el usuario levante el dedo luego de presionar el botón.</li>
<li>En Arguments, seleccionamos none, en este caso no vamos a hacer nada con el botón, solo recibir el evento. En algunos casos podrías necesitar recibir el botón, por ejemplo: para cambiarle el titulo, cambiarle el color, cuando es presionado. Este no es el caso, así que lo dejamos en none.</li>
</ol>

<p>Ahora, si todo salió bien, tu código debería lucir así:</p>

<pre>#import &lt;UIKit/UIKit.h>

@interface ViewController : UIViewController

@property (weak, nonatomic) IBOutlet UITextField *nameField;
@property (weak, nonatomic) IBOutlet UILabel *messageLabel;


- (IBAction)buttonSelected;

@end
</pre>

<p>Y del lado izquierdo del editor del código, deberías ver unos pequeños círculos rellenos, al lado de tus outlets. Esto significa que han sido conectados correctamente.</p>

<p><img src="http://i.imgur.com/S2s7ogu.png" alt="outlets-conectados-ios-desde-cero-controladores" class="aligncenter size-full wp-image-1109" /></p>

<hr />

<h2>Programando el controlador</h2>

<p>Bien, ahora vamos a la implementación del controlador, seleccionamos ViewController.m del navegador de archivos.</p>

<p>En este momento debes estar preguntándote, ¿Qué demonios es esto?. Ok, en Objective-C las clases se separan en archivos .h y .m.</p>

<ul>
<li>Los archivos .h son los <em>Header File</em>. Estos son los que revelan los atributos y métodos que serán públicos al resto de la aplicación.</li>
<li>Los archivos .m resguardan la implementación de los métodos que anunciamos en el Header. Todos los métodos o propiedades que estén en este archivo y no estén anunciados en el Header, serán privados.</li>
</ul>

<div class="alert alert-info">
  <h4>
    ¡Alerta!
  </h4> Más sobre orientación a objetos será explicado con mayor detalle en el curso 
  
  <a href="http://codehero.co/objective-c-desde-cero/">Objective-C desde Cero</a>.
</div>

<p>Entonces si abres el .m deberías ver el siguiente código:</p>

<pre>#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction)buttonSelected {
}


@end
</pre>

<p>Nos encontramos con 3 métodos que Xcode ha generado para nosotros.</p>

<ol>
<li>viewDidLoad: Este método lo tienen todos los controladores en iOS. Este método es llamado cada vez que la aplicación termina de cargar la vista. Esto significa que ya ha leído el archivo .xib y esta lista para mostrarla en la pantalla. Más sobre el ciclo de vida de una vista puede verse en la documentación.</li>
<li>didReceiveMemoryWarning: este método también lo tienen todos los UIViewControllers, es llamado cuando se recibe una alerta de memoria. En su implementación deberías liberar toda la memoria que tu aplicación este consumiendo y pueda ser liberada para evitar que se caiga.</li>
<li>buttonSelected, este es el metodo que generamos para ser llamado cuando se dispare el evento TouchUpInside del botón.</li>
</ol>

<p>Entonces en este último método deberíamos captar el nombre que el usuario introdujo en el <em>text field</em> y desplegarlo en el mensaje que va en el <em>label</em>. Esto lo hacemos de la siguiente manera:</p>

<p>Primero creamos un <em>string</em> con el mensaje y el nombre que aparece en el <em>text field</em>:</p>

<pre>NSString *message = [NSString stringWithFormat:@"Hola, %@", self.nameField.text];
</pre>

<p><em>NSString</em> es la clase de apple para manejar strings, stringWithFormat es un metodo estático de la clase que retorna un objeto del mismo tipo. En Objective-C, los strings se representan con el carácter "@" como prefijo. "%@" es el formato para representar un objeto dentro de un string (%f representa float, %i un int, %c un char, etc), en este caso el objeto es otro string (esta es una manera de concatenar).</p>

<p>Luego, asignamos el mensaje al label:</p>

<pre>[self.messageLabel setText:message];
</pre>

<p>Todo el código junto del método debería verse así:</p>

<pre>- (IBAction)buttonSelected {
    
    NSString *message = [NSString stringWithFormat:@"Hola, %@", self.nameField.text];
    
    [self.messageLabel setText:message];
}
</pre>

<p>Tal vez te preguntes. Si hablo español, ¿Por qué programo en inglés?. Bueno, esto es una cuestión de estilo, yo prefiero programar en ingles porque la mayoría de las palabras son más cortas y requieren menos conectivos.</p>

<p>Bueno, volviendo al tema...</p>

<p>Ahora corremos la app. Seleccionamos el <em>Text field</em>, escribimos nuestro nombre (podemos usar el teclado de la máquina, no tenemos que usar el del simulador, duh) y hacemos click en el botón. Debería verse así:</p>

<p><img src="http://i.imgur.com/WwVY9p6.png" alt="iphone-app-ios-desde-cero-controladores" class="aligncenter size-full wp-image-1112" /></p>

<hr />

<h2>Conclusión</h2>

<p>¡Felicidades, has escrito tu primera aplicación!. Muy simple, pero es un comienzo. En el próximo tutorial hablaremos del elemento de interfaz más importante (a mi juicio) de iOS, el UITableView.</p>

<p>¡Nos vemos!</p>
