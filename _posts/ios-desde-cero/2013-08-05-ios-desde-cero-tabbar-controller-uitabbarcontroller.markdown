---
layout: post
status: publish
published: true
title: Tab Bar Controller (UITabBarController)
author: Oscar González
author_login: oscar
author_email: gonzalezgreco@gmail.com
author_url: http://www.oscarvgg.com
wordpress_id: 1868
wordpress_url: http://codehero.co/?p=1868
date: 2013-08-05 00:57:15.000000000 -04:30
serie: iOS desde Cero
dificultad: Novato
duracion: 20
categories:
- Cursos
- iOS
tags:
- desde cero
- tabbar
- tab
- bar
- uitabbar
- uitabbarcontroller
---
<p>En el capítulo anterior de la serie iOS desde Cero, hablamos sobre como crear aplicaciones con varias vistas y como cambiar de una a otra. En el capítulo de hoy continuaremos hablando de aplicaciones con múltiples vistas pero utilizando el controlador tab bar.</p>

<hr />

<h2>Creando el proyecto</h2>

<p>Abramos Xcode para crear un nuevo proyecto. Vamos a File -> New -> Project…</p>

<p><img src="http://i.imgur.com/Qf9SR3A.png" alt="creando un nuevo proyecto en Xcode" class="aligncenter size-full wp-image-1593" /></p>

<p>Seleccionamos "Application" en la sección de iOS y hacemos doble click en "Tabbed Application".</p>

<p><img src="http://i.imgur.com/U01q36V.png" alt="creando un tabbed application en Xcode" class="aligncenter size-full wp-image-1869" /></p>

<p>Le damos un nombre a nuestro proyecto, seleccionamos arc (automatic reference counting) y guardamos.</p>

<p><img src="http://i.imgur.com/JiBRHct.png" alt="dandole nombre al proyecto de tabbed application en Xcode" class="aligncenter size-full wp-image-1872" /></p>

<h2>Explorando el código generado</h2>

<p>Si observamos nuestro navegador de archivos, nos encontraremos con que Xcode ha generado un conjunto de clases por nosotros.</p>

<p>Corramos el proyecto para ver que hace este código.</p>

<p><img src="http://i.imgur.com/2lvmCg4.png" alt="proyecto de tabber application corriendo primera vez" class="aligncenter size-full wp-image-1870" /></p>

<p>Vemos que tenemos una aplicación con un tabbar de dos botones.</p>

<p>Vamos a abrir <strong>FirstViewController.xib</strong>. Observamos una vista que contiene un label, un textview y una barra negra en la parte inferior que parece representar el tabbar, pero en realidad no lo es. Esta barra simula la presencia del tabbar. Si hacemos click sobre ella, podemos notar que en el Attribute Inspector, en su sección Simulated Metrics, al atributo Bottom bar está asignado el valor <em>Tab bar</em>. Esto es simplemente para ayudar al desarrollador a visualizar el look final, podemos dejar de asignar este valor e igualmente el controlador se vería en el tab bar.</p>

<p><img src="http://i.imgur.com/ZwjsP2Vh.png" alt="firstviewcontroller primer tab del tabbar" class="aligncenter size-full wp-image-1871" /></p>

<p>Si vamos a <strong>SecondViewController.xib</strong> tampoco encontraremos ningún tab bar.</p>

<p>Hasta ahora hemos visto que solo hay dos view controllers que corresponden a los tabs del tab bar. Pero entonces, ¿Dónde esta el tab bar?.</p>

<p>Abramos <strong>AppDelegate.m</strong>. Como podemos ver todo el código que instancia el tab bar está en el método <em>application:didFinishLaunchingWithOptions</em>.</p>

<pre>- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    // 1
    self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    
    // 2
    UIViewController *viewController1 = [[FirstViewController alloc] initWithNibName:@"FirstViewController" bundle:nil];
    UIViewController *viewController2 = [[SecondViewController alloc] initWithNibName:@"SecondViewController" bundle:nil];
    
    //3
    self.tabBarController = [[UITabBarController alloc] init];
    
    //4
    self.tabBarController.viewControllers = @[viewController1, viewController2];
    
    //5
    self.window.rootViewController = self.tabBarController;
    
    //6
    [self.window makeKeyAndVisible];
    
    return YES;
}
</pre>

<p>Veamos que está pasando:</p>

<ol>
<li>Alocamos la ventana;</li>
<li>Instanciamos los dos view controlles que vamos a mostrar en el tab bar;</li>
<li>Instanciamos el tab bar controller;</li>
<li>Asignamos los dos view controllers;</li>
<li>Asignamos el tab bar como vista raiz de la ventana;</li>
<li>Y la hacemos visible.</li>
</ol>

<hr />

<h2>Agregando otro tab al tab bar</h2>

<p>Ahora que ya entendemos como funciona la lógica de la aplicación que tenemos, vamos a crear otro controlador para agregarlo como una tercera pestaña del tabbar.</p>

<p>En Xcode vamos a File -> New -> File…</p>

<p>Seleccionamos <em>Objective-C Class</em> en la división de <strong>iOS</strong>.</p>

<p><img src="http://i.imgur.com/fRyLZht.png" alt="asignando un nombre a nueva clase en Xcode" class="aligncenter size-full wp-image-1874" /></p>

<p>Le ponemos un nombre a nuestra clase. En mi caso será <em>ThirdViewController</em> y heredará de UIViewController.</p>

<p><img src="http://i.imgur.com/ixQAJ0Vh.png" alt="creación de nueva clase en Xcode" class="aligncenter size-full wp-image-1873" /></p>

<p>Ahora vayamos a ThridViewController.xib y manipulemos un poco nuestra vista. Agreguemos un label que diga "Third View" para saber que es la tercera vista y si queremos podemos colocar el bottom bar como lo tienen los otros view controllers que generó Xcode, nuevamente esto es opcional.</p>

<p><img src="http://i.imgur.com/ixQAJ0Vh.png" alt="tercer view controller ThirdViewController.xib en interface builder" class="aligncenter size-full wp-image-1875" /></p>

<p>Para agregarlo como un tercer tab, simplente tenemos que ir a <strong>AppDelegate.m</strong> e importar <em>ThirdViewController.h</em>:</p>

<pre>#import "ThirdViewController.h"
</pre>

<p>Instanciar el view controller en application:didFinishLaunchingWithOptions:</p>

<pre>UIViewController *viewController3 = [[ThirdViewController alloc] initWithNibName:@"ThirdViewController"
                                                                              bundle:nil];
</pre>

<p>Y asignarlo al tabbar:</p>

<pre>self.tabBarController.viewControllers = @[viewController1,
                                              viewController2,
                                              viewController3];
</pre>

<p>El método ahora debe lucir de la siguiente manera:</p>

<pre>- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{

    self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];

    UIViewController *viewController1 = [[FirstViewController alloc] initWithNibName:@"FirstViewController"
                                                                              bundle:nil];
    UIViewController *viewController2 = [[SecondViewController alloc] initWithNibName:@"SecondViewController"
                                                                               bundle:nil];
    UIViewController *viewController3 = [[ThirdViewController alloc] initWithNibName:@"ThirdViewController"
                                                                              bundle:nil];

    self.tabBarController = [[UITabBarController alloc] init];
    self.tabBarController.viewControllers = @[viewController1,
                                              viewController2,
                                              viewController3];
    
    self.window.rootViewController = self.tabBarController;
    [self.window makeKeyAndVisible];
    
    return YES;
}
</pre>

<p>Si corremos la aplicación vemos que el view controller aparece como una tercera vista, pero aún no tiene ninguna imagen ni texto en el botón</p>

<p><img src="http://i.imgur.com/dNv2dTg.png" alt="aplicación corriendo con tres tabs" class="aligncenter size-full wp-image-1876" /></p>

<hr />

<h2>Asignando imagen y texto al tercer tab</h2>

<p>Si vamos a la implementación de <em>FirstViewController</em> y <em>SecondViewController</em>, vemos que el método <em>initWithNibName:bundle</em> asigna un titulo con un localizedString (estos se usan usar traducciones, pero en este ejemplo podría utilizar un simple NSString) y una imagen:</p>

<pre>- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        self.title = NSLocalizedString(@"First", @"First");
        self.tabBarItem.image = [UIImage imageNamed:@"first"];
    }
    return self;
}
</pre>

<p>Para el caso de <em>ThirdViewController</em> no vamos a hacerlo de esta manera porque quiero enseñarles como utilizar los botones que vienen integrados con el framework.</p>

<p>Abrimos <strong>ThirdViewController.m</strong> y nos vamos al método <em>initWithNibName:bundle</em> y dentro del if colocamos:</p>

<pre>self.tabBarItem = [[UITabBarItem alloc] initWithTabBarSystemItem:UITabBarSystemItemFavorites
                                                             tag:99];
</pre>

<p>Analicemos esta línea de código.</p>

<p>En la parte <em>initWithTabBarSystemItem:</em> pasamos como parámetro <em>UITabBarSystemItemFavorites</em>, este valor hace que se muestre la imagen de la estrella con el título "Favorites". Este valor es parte de un enum que contiene otros valores como:</p>

<pre>UITabBarSystemItemMore
UITabBarSystemItemFavorites
UITabBarSystemItemFeatured
UITabBarSystemItemTopRated
UITabBarSystemItemRecents
UITabBarSystemItemContacts
UITabBarSystemItemHistory
UITabBarSystemItemBookmarks
UITabBarSystemItemSearch
UITabBarSystemItemDownloads
UITabBarSystemItemMostRecent
UITabBarSystemItemMostViewed
</pre>

<p>En la parte <em>tag:</em> podemos asignar cualquier valor, esto es simplemente un identificador. Yo usé 99.</p>

<p>Ahora, si corremos la app una vez más observaremos como ya el tercer tab tiene su imagen y título.</p>

<p><img src="http://i.imgur.com/FVErkXB.png" alt="aplicación corriendo con tres tabs donde la tercera tiene titulo e imagen" class="aligncenter size-full wp-image-1877" /></p>

<hr />

<h2>Conclusión</h2>

<p>En este capítulo hemos aprendido a utilizar el UITabBarController, uno de los que generan más dudas en los aprendices de iOS.</p>

<p>Como siempre cualquier duda o comentario no dejen de publicarlo en su sección correspondiente más abajo.</p>

<p>¡Hasta la aproxima!.</p>

<p>Adios.</p>
