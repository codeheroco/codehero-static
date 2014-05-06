---
layout: post
status: publish
published: true
title: Navigation Controller
author: Oscar González
author_login: oscar
author_email: gonzalezgreco@gmail.com
author_url: http://www.oscarvgg.com
wordpress_id: 1592
wordpress_url: http://codehero.co/?p=1592
date: 2013-07-22 00:36:47.000000000 -04:30
serie: iOS desde Cero
dificultad: Novato
duracion: 20
categories:
- Cursos
- iOS
tags:
- iOS
- desde cero
- navigation
- navegacion
---
<h1>iOS desde Cero: Navigation Controller</h1>

<p>Como vimos en el capítulo anterior los table views son una excelente manera de desplegar data tabular. Ahora, en este nuevo capitulo vamos a hablar de como navegar de una vista a otra utilizando un navigation controller.</p>

<hr />

<h2>Un nuevo proyecto</h2>

<p>Vamos a crear un nuevo proyecto en Xcode para esta demostración.</p>

<p>Abrimos Xcode y hacemes click en File -> New -> Project…</p>

<p>Seleccionamos Application en la sección de iOS y hacemos doble click en Empty Application.</p>

<p>Le damos un nombre a nuestro proyecto, seleccionamos arc (automatic reference counting) y guardamos. Ya en esto deberíamos ser unos expertos.</p>

<p>En este proyecto hemos creado una nueva aplicación vacía. Si la corremos veremos que solo se muestra una pantalla en blanco.</p>

<p>Ahora, los próximos objetivos para completar esta demostración son: instanciar y asignar el primer view controller a la ventana, luego crear otro view controller, y navegar hasta él pasándole un parámetro desde el view controller anterior.</p>

<hr />

<h2>Creando el primer View Controller</h2>

<p>Vamos a File -> New -> File…, y le hacemos click a Cocoa Touch en el menú iOS y seleccionamos Objective-C Class.</p>

<p>Ahora le damos un nombre a nuestra clases, le decimos que hereda de <em>UIViewController</em> y le decimos que lo queremos con un Xib para interfaz de usuario. Yo lo voy a llamar <em>MainViewController</em>.</p>

<p><img src="http://i.imgur.com/syS6cGt.jpg" alt="creando-MainViewCotroller" class="aligncenter size-full wp-image-1596" /></p>

<p>Ahora vamos <strong>MainViewController.xib</strong> y arrastramos un botón a la vista. Yo le escribí de titulo "Ir a la próxima vista". Este botón al hacerle click nos va a llevar a la próxima vista. Pero primero hay que escribir el código que haga esta magia.</p>

<p><img src="http://i.imgur.com/Iyf9jnCh.png" alt="agregando el boton" class="aligncenter size-full wp-image-1597" /></p>

<p>En la vista del asistente, de modo que tengamos el editor de vistas y de código lado a lado (asegurare que el editor de código esté en en archivo <strong>MainViewController.h</strong>), sosteniendo la tecla control hacemos click sobre el botón y arrastramos hasta el código.</p>

<p><img src="http://i.imgur.com/On7cZYm.png" alt="conectando-el-outlet-del-boton" class="aligncenter size-full wp-image-1598" /></p>

<p>Creamos una acción. Yo la llamé <em>goToTheNextView</em> y nos aseguramos que esté seleccionado "Touch Up Inside". Este es el método que se va a llamar al presionar el botón.</p>

<p><img src="http://i.imgur.com/IX8UdD6.png" alt="creando-la-accion-del-boton" class="aligncenter size-full wp-image-1599" /></p>

<p>Ahora antes de navegar al segundo view controller tenemos que crearlo.</p>

<hr />

<h2>Creando el segundo View Controller</h2>

<p>Vamos nuevamente a File -> New -> File… y creamos otro view controller. En este caso yo lo llamé <em>NextViewController</em>.</p>

<p>Abrimos <strong>NextViewController.xib</strong> y le agregamos un label a la vista. En esta vamos a mostrar un mensaje enviado desde la vista anterior, pero ya llegaremos a eso, por ahora vamos a conectar el label con el código mediante un outlet como lo hicimos con el botón.</p>

<p><img src="http://i.imgur.com/B43HVn7.png" alt="conectando-el-outlet-del-label" class="aligncenter size-full wp-image-1600" /></p>

<p>Le colocamos un nombre, yo lo llamé "label".</p>

<p><img src="http://i.imgur.com/R3BifTz.png" alt="creando-outlet-del-label" class="aligncenter size-full wp-image-1601" /></p>

<hr />

<h2>De vuelta al primer view controller</h2>

<p>Ya que creamos el segundo view controller podemos volver al primero para escribir el código que nos va a llevar hasta el segundo.</p>

<p>Abrimos <strong>MainViewController.m</strong> e importamos el segundo view controller en el primero antes de la implementación:</p>

<pre>#import "NextViewController.h"
</pre>

<p>Ahora vamos al método de la acción del botón que creamos, <em>goToNextView:</em> y escribimos:</p>

<pre>- (IBAction)goToNextView:(UIButton *)sender {
    
    NextViewController *nextView = [[NextViewController alloc] initWithNibName:nil
                                                                        bundle:nil];      // 1 
    
    
    [self.navigationController pushViewController:nextView
                                         animated:YES];             // 2
}
</pre>

<ol>
<li>Creamos uns instancia de <em>NextViewController</em> llamada <em>nextView</em>. Con indicarle <em>initWithNibName:nil bundle:nil</em> el objeto asume que el xib se llama igual que la clase.</li>
<li>Todos los <em>UIViewController</em> tienen una propiedad llamada navigationController. Esta es una referencia al navigation controller que permite la navegación de una vista a otra, ya hablaremos de esto con mayor detalle. Aquí le decimos a este navigation controller que navegue a <em>nextView</em> y que lo haga con animación.</li>
</ol>

<p>Si corremos la aplicación en este momento seguiremos viendo la misma pantalla blanca que teníamos al comienzo. Esto es porque aún no hemos dicho a la aplicación con que vista empezar.</p>

<hr />

<h2>Creando el Navigation Controller</h2>

<p>Abrimos <strong>AppDelegate.m</strong> y vamos al método <em>application:didFinishLaunchingWithOptions:</em>. Cuando abrimos la aplicación por primera vez, este método es llamado. Aquí es donde debemos crear nuestro navigation controller y decirle a la app que inicie con <em>MainViewController</em>.</p>

<p>Primero importamos <em>MainViewController</em>:</p>

<pre>#import "MainViewController.h"
</pre>

<p>Inicialmente <em>application:didFinishLaunchingWithOptions:</em> debería lucir así:</p>

<pre>- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    // Override point for customization after application launch.
    self.window.backgroundColor = [UIColor whiteColor];
    [self.window makeKeyAndVisible];
    return YES;
}
</pre>

<p>Nosotros vamos a modificarlo para que luzca así:</p>

<pre>- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    
    // 1
    MainViewController *mainView = [[MainViewController alloc] initWithNibName:nil
                                                                        bundle:nil];
    
    // 2
    UINavigationController *navigationController = [[UINavigationController alloc] initWithRootViewController:mainView];
    
    // 3
    [self.window setRootViewController:navigationController];
    
    self.window.backgroundColor = [UIColor whiteColor];
    [self.window makeKeyAndVisible];
    return YES;
}
</pre>

<ol>
<li>Creamos una instancia de <em>MainViewController</em> llamada <em>mainView</em>.</li>
<li>Creamos una instancia de un navigation controller y le decimos que inicie con <em>mainView</em> como vista inicial. Desde este momento a la propiedad <em>navigationController</em> de <em>mainView</em> se le asigna automáticamente este navigation controller, así es como luego podemos llamarlo desde la acción del botón de <em>MainViewController</em>.</li>
<li>Y le decimos a la ventana que inicie con el navigation controller. Todas las aplicaciones deberían tener una sola ventana. Las ventanas solo pueden cargar un solo view controller.</li>
</ol>

<p>Ahora si corremos la app, podemos ver que aparece <em>MainViewController</em> y si le damos al botón navegamos a <em>NextViewController</em>.</p>

<hr />

<h2>¿Como funciona?</h2>

<p>Los navigation controller no son visibles. UINavigationController es un controlador que maneja una lista de view controlers y permite la navegación de uno hasta otro. La barra azul de arriba viene con el navigation controller, podemos hacerla invisible si queremos.</p>

<p>El botón de "volver" que aparece cuando navegamos a la segunda vista lo coloca automáticamente el navigation controller, no tenemos que hacer nada para que aparezca.</p>

<p>Cuando llamamos a <em>pushViewController:animated</em> en <em>MainViewController</em> le estamos agregando al navigation controller un nuevo view controller a su lista interna y trasicionamos de una vista a otra.</p>

<p><img src="http://i.imgur.com/gtzJp9F.jpg" alt="explicación-navigation-controller" class="aligncenter size-full wp-image-1602" /></p>

<hr />

<h2>Pasando objetos / parámetros de una vista a otra</h2>

<p>Vamos a <strong>NextViewController.h</strong> y agregamos una propiedad que retenga el texto que vamos a asignar al label:</p>

<pre>@property (nonatomic, strong) NSString *text;
</pre>

<p>Ahora en <strong>NextViewController.m</strong> ubicamos <em>viewDidLoad</em> y asignamos el texto al label:</p>

<pre>- (void)viewDidLoad
{
    [super viewDidLoad];
    
    [_label setText:_text];
}
</pre>

<p>Volvemos a <strong>MainViewController.m</strong> y nos posicionamos sobre el método que se dispara cuando se presiona el botón, <em>goToNextView:</em>, y le agregamos el siguiente código antes de hacer "push" a la siguiente vista.</p>

<pre>[nextView setText:@"Hola desde la vista anterior"];
</pre>

<p>Mediante propiedades o métodos podemos pasar objetos o parámetros de una clase a otra. En este caso estoy asignando el valor del label de <em>NextViewController</em> desde <em>MainViewController</em>. <em>goToNextView:</em> debería lucir así ahora:</p>

<pre>- (IBAction)goToNextView:(UIButton *)sender {
    
    NextViewController *nextView = [[NextViewController alloc] initWithNibName:nil
                                                                        bundle:nil];
    
    [nextView setText:@"Hola desde la vista anterior"];
    
    [self.navigationController pushViewController:nextView
                                         animated:YES];
}
</pre>

<p>¿Por qué no asignar el texto directamente al label?. Porque los outlets no se inicializan antes de <em>ViewDidLoad</em> ser llamado. <em>ViewDidLoad</em> es llamado luego de que la vista carga, y la vista carga cuando la app va a mostrarla por pantalla, por lo tanto cuando la asignamos por código antes de esta ser mostrada, el label aun no existe, por eso debemos pasar el texto primero y luego este es asignado al label.</p>

<p>Ahora si corremos la aplicación veremos como el label de la segunda vista muestra el mensaje enviado desde la primera.</p>

<hr />

<h2>Conclusión</h2>

<p>En este capítulo aprendimos a utilizar el navigation controller, uno de los controladores más importantes de iOS, pero no solo eso, aprendimos a hacer una aplicación vacía también, donde tuvimos que asignar manualmente la primera vista de la aplicación.</p>

<p>Espero que haya quedado todo claro y que estés de acuerdo conmigo en que los navigation controllers no son tan complicados.</p>

<p>Cualquier duda házmela saber en los comentarios. Ya será hasta el próximo capítulo.</p>

<p>Adios.</p>
