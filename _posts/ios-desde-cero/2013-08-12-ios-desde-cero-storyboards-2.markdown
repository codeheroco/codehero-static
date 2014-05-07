---
layout: post
status: publish
published: true
title: Storyboards
author: Oscar González
author_login: oscar
author_email: gonzalezgreco@gmail.com
author_url: http://www.oscarvgg.com
wordpress_id: 1940
wordpress_url: http://codehero.co/?p=1940
date: 2013-08-12 01:31:42.000000000 -04:30
serie: iOS desde Cero
dificultad: Novato
duracion: 25
categories:
- Cursos
- iOS
tags:
- iOS
- desde cero
- stotyboard
---
<p>Los storyboards son una de las características más emocionantes del iOS SDK. Hoy esteremos dándole un vistazo a esta funcionalidad en iOS desde Cero.</p>

<p>En esencia, los Storyboards son un nuevo tipo de contenedor disponible en Xcode para mantener colecciones de xib's (nibs). Como resultado, puede que nunca necesites utilizar un archivo xib independiente de nuevo. Un Storyboard no sólo contiene una colección de xib's, sino que también permite controlar visualmente cómo estos transicionan entre sí. Esto significa que todo el flujo de la interfaz de la aplicación se puede modelar y visualizar a través de un único archivo. Generalmente, el flujo de interfaz requiere de la capacidad de obtener instancias de controladores a los que desea avanzar, enviar datos a dichas instancias, e incluso mostrarlas mediante alguna transición.</p>

<hr />

<h2>Creando un nuevo proyecto</h2>

<p>Creamos un nuevo proyecto de tipo "Single View Application".</p>

<p><img src="http://i.imgur.com/hJ8mvzh.png" alt="Single View application Vista unica" class="aligncenter size-full wp-image-1942" /></p>

<p>Le colocamos un nombre a nuestro proyecto y habilitamos el check que dice "Use Storyboards".</p>

<p><img src="http://i.imgur.com/ONjCt9L.png" alt="guardando proyecto" class="aligncenter size-full wp-image-1943" /></p>

<hr />

<h2>Creando escenas</h2>

<p>Todas las vistas que arrastremos a un Storyboard se les llama escenas. Algunas de estas pueden tener archivos .h y .m, otras pueden ser completamente configuradas por Interface Builder.</p>

<p>Agreguemos un Table View Controller a nuestro storyboard.</p>

<p><img src="http://i.imgur.com/lu7aCiRh.png" alt="Agregando un table view" class="aligncenter size-full wp-image-1944" /></p>

<p>Habiendo seleccionado el tableview en el inspector podemos convertirlo en un tableview estático, esto quiere decir que su contenido puede ser modelador en Interface Builder.</p>

<p>Si hacemos click en una de las celdas que viene por defecto en el controlador podemos colocarle un estilo. Yo le colocaré estilo Basic:</p>

<p><img src="http://i.imgur.com/lu7aCiRh.png" alt="estilo de celda de table view" class="aligncenter size-full wp-image-1946" /></p>

<p>Y colocarle como identificador "myCell".</p>

<p>Ahora podemos hacer doble click sobre la celda y editar el texto del label que contiene.</p>

<p><img src="http://i.imgur.com/gbp1QYMh.png" alt="estilo de celda de table view" class="aligncenter size-full wp-image-1945" /></p>

<p>Agreguemos un botón en el primer view controller.</p>

<p><img src="http://i.imgur.com/EV2OREph.png" alt="imagen de button en primer viewcontroller" class="aligncenter size-full wp-image-1947" /></p>

<p>Ahora agreguemos un tercer view controller con un label:</p>

<p><img src="http://i.imgur.com/7r858MPh.png" alt="tercer view controller con label" class="aligncenter size-full wp-image-1948" /></p>

<hr />

<h2>Creando transiciones</h2>

<p>Las transiciones se logran haciendo segues. Los segues conectan escenas.</p>

<p>Vamos a hacer <em>ctrl + click</em> sobre el botón del primer view controller y arrastrando hasta el table view controller creamos nuestro primer segue. Asegurate de hacer click en <em>Push</em> en el menú contextual que aparece.</p>

<p><img src="http://i.imgur.com/GEKSS9Y.png" alt="conectar primer view controller con table view controller" class="aligncenter size-full wp-image-1951" /></p>

<p>Y ahora podemos observar como aparece una flecha entre los dos controladores. Esto significa que al hacer click sobre el botón, la app navegará hasta el table view cotroller.</p>

<p>Si corremos esta aplicación en este momento nos daremos cuenta que al hacer tap sobre el botón no nos va a llevar a ningún lado. Esto es porque la aplicación necesita de un Navigation controller para poder cambiar de una vista a otra. Esto lo logramos haciendo click en el primer view controller y haciendo click en Editor -> Product -> Embed In -> Navigation Controller envolvemos el primer view controller en un Navigation Controller.</p>

<p><img src="http://i.imgur.com/fuidhaKh.png" alt="Screen Shot 2013-08-11 at 11.47.46 PM" class="aligncenter size-full wp-image-1954" /></p>

<p><img src="http://i.imgur.com/sanPUip.png" alt="navigation controller conectado a view controller por storyboard" class="aligncenter size-full wp-image-1953" /></p>

<p>Ahora si podemos correr el proyecto y ver como funciona la transición.</p>

<hr />

<h2>Pasando valores de una vista a otra</h2>

<p>Usando segues se puede pasar pasar datos de una vista a otra fácilmente. Primero que nada necesitamos crear una clase y asignarla al tercer view controller que creamos (el que tiene el label).</p>

<p>Vamos a File -> New -> File…</p>

<p>Seleccionamos "Objective-C Class" y la guardamos asegurándonos de que sea una subclase de UIViewController. Yo la llamé LabelViewController.</p>

<p>Ahora volvemos al Storyboard y asignamos a LabelViewController como clase controlador de la escena. Esto lo hacemos haciendo click sobre el tercer view controller y asignándolo en el inspector de identidad.</p>

<p><img src="http://i.imgur.com/zAqExcr.png" alt="asignación de clase a escena de storyboard" class="aligncenter size-full wp-image-1955" /></p>

<p>Ahora creamos un outlet en el controlador para el label de la escena y un property string para guardar el valor que esta va a contener.</p>

<p><img src="http://i.imgur.com/zuQHib2.png" alt="conectar el outlet del label" class="aligncenter size-full wp-image-1956" /></p>

<p>Después de esto nuestro código debería lucir de la siguiente manera:</p>

```obj-c
@interface LabelViewController : UIViewController


@property (nonatomic, strong) NSString *labelValue;

@property (weak, nonatomic) IBOutlet UILabel *label;

@end
```


<p>Ahora en la implementación de la clase asignamos el valor del labelValue a label cuando cargue la vista (recuerda que antes de que este evento se dispare los outlets no existen).</p>

```obj-c
- (void)viewDidLoad
{
    [super viewDidLoad];

    [_label setText:_labelValue];
}
```


<p>Ahora debemos crear otra clase para el table view controller, de modo que podamos pasar los datos de una a la otra. Repetimos el mismo procedimiento para crear una clase solo que ahora vamos a heredar de UITableViewController.</p>

<p><img src="http://i.imgur.com/aNRGGLc.png" alt="creación de clase de table view controller" class="aligncenter size-full wp-image-1957" /></p>

<p>Asignamos la clase a la escena.</p>

<p><img src="http://codehero.co/oc-content/uploads/2013/08/Screen-Shot-2013-08-12-at-12.23.46-AM.png" alt="asignar clase a table view controller" class="aligncenter size-full wp-image-1958" /></p>

<p>Conectamos con un segue las escenas.</p>

<p><img src="http://i.imgur.com/0QssMcq.png" alt="crear segue de table view controller a otro controller" class="aligncenter size-full wp-image-1959" /></p>

<p>Para pasar un valor de una vista a otra se debe sobre escribir el método prepareForSegue:sender: en el controlador de partida, por lo tanto en TableViewController debemos implementarlo. (recuerda importar labelViewController en TableViewController)</p>

```obj-c
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    LabelViewController *nextViewController = [segue destinationViewController];
    nextViewController.labelValue = @"Hola desde el Table View";
}
```


<p>Y debemos configurar nuestro table view.</p>

```obj-c
- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
#warning Potentially incomplete method implementation.
    // Return the number of sections.
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
#warning Incomplete method implementation.
    // Return the number of rows in the section.
    return 1;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    static NSString *CellIdentifier = @"myCell";
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:CellIdentifier];

    if (cell == nil) {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault
                                      reuseIdentifier:CellIdentifier];
    }

    return cell;
}
```


<p>Ahora si corremos el proyecto y navegamos hasta el tercer view controller, podremos ver como el último view controller muestra un mensaje que dice "Hola desde el Table View" en un label.</p>

<hr />

<h2>Conclusión</h2>

<p>Los Storyboards nos permiten ahorrarnos muchas lineas de código que antes teníamos que escribir obligatoriamente, pero su uso no permite crear views fuera de una escena, para esto se requeriría un archivo xib, ambos se complementan y ninguno reemplaza al otro.</p>

<p>Adios.</p>
