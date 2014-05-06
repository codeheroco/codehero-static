---
layout: post
status: publish
published: true
title: Table Views (UITableView)
author: Oscar González
author_login: oscar
author_email: gonzalezgreco@gmail.com
author_url: http://www.oscarvgg.com
wordpress_id: 1338
wordpress_url: http://codehero.co/?p=1338
date: 2013-07-08 00:00:17.000000000 -04:30
serie: iOS desde Cero
dificultad: Novato
duracion: 30
categories:
- Cursos
- iOS
tags:
- iOS
- table views
- uitableview
- desde cero
---
<p>En este capitulo de <strong><em>iOS desde Cero</em></strong> hablaremos del componente de interfaz gráfica más utilizado de iOS, los Table Views.</p>

<hr />

<h2>Preparando el proyecto en Xcode</h2>

<p>En esto ya somos unos expertos. Abrimos Xcode y creamos un nuevo proyecto (Seleccionamos "Single View Application" y quitamos el check de Use storyboards; seguiremos usando Xib's por ahora)</p>

<p><img src="http://i.imgur.com/WOTWpIb.png" alt="Creación del proyecto en Xcode" class="aligncenter size-full wp-image-1339" /></p>

<p>Vamos a ViewController.xib y agregamos un "Table View" desde el inspector a nuestra vista.</p>

<p><img src="http://i.imgur.com/VaVdSEw.png" alt="Agregar UITableView a ViewController" class="aligncenter size-full wp-image-1340" /></p>

<p>Ahora conectamos el table view con el código. La manera más fácil es la que aprendimos en la lección anterior. Colocamos el editor en modo asistente y haciendo Option+click arrastramos desde el controlador hasta el código</p>

<p><img src="http://i.imgur.com/WGSY7anh.png" alt="Conectando UITableView con el código" class="aligncenter size-full wp-image-1341" /></p>

<p>Ya tenemos el table view conectado al código, ahora vamos a agregar un array como un atributo de la clase para guardar lógicamente el contenido de nuestra tabla.</p>

<pre>{
    NSArray *content;
}
</pre>

<p><em>NSArray</em> es la clase incluida por Apple en el Foundation Framework, para manejar arrays. Luego de incluirlo nuestra clase debería lucir de la siguiente manera:</p>

<pre>#import &lt;UIKit/UIKit.h>

@interface ViewController : UIViewController
{
    NSArray *content;
}

@property (weak, nonatomic) IBOutlet UITableView *tableView;

@end

</pre>

<p>Ahora vamos a introducir un concepto del cual no habíamos hablado, los protocolos.</p>

<hr />

<h2>Fuente de datos y delegados</h2>

<p>Objective-C las interfaces son llamadas protocolos. En nuestra clase ViewController necesitamos implementar dos de estos para poder llenar de contenido la tabla y recibir los eventos que se generen en la vista:</p>

<pre>&lt;UITableViewDataSource, UITableViewDelegate>
</pre>

<p>Esto lo colocamos justo al lado del nombre de la clase de la cual heredamos en el encabezado. Luego, nuestra clase debe lucir de la siguiente manera:</p>

<pre>#import &lt;UIKit/UIKit.h>

@interface ViewController : UIViewController &lt;UITableViewDataSource, UITableViewDelegate>


@property (weak, nonatomic) IBOutlet UITableView *tableView;

@end
</pre>

<ul>
<li><strong>UITableViewDataSource:</strong> Los data source se encargan de cargar cargar los datos que va a mostrar la tabla en sus celdas.</li>
<li><strong>UITableViewDelegate:</strong> Los delegados son los que manejan los eventos disparados desde otra clase. En este caso la clase UITableView va a recibir ciertas acciones por parte de los usuarios y las va a delegar a nuestra clase ViewController.</li>
</ul>

<p>Vamos ahora al método <em>viewDidLoad</em> en la implementación de nuestra clase (archivo .m). Aquí tenemos que decirle a nuestro table view que su fuente de datos y su delegado son esta clase.</p>

<pre>- (void)viewDidLoad
{
    [super viewDidLoad];
    
    [self.tableView setDataSource:self];
    [self.tableView setDelegate:self];
}
</pre>

<p>Llamando a los metodos <em>setDataSource:</em> y <em>setDelegate:</em> de UITableView, asignamos como fuente de datos y delegado de la tabla a nuestra clase.</p>

<hr />

<h2>Llenando la tabla</h2>

<p>En <em>UITableViewDataSource</em> están los métodos que la tabla invoca para llenarse de contenido cuando es cargada desde el archivo Xib. Nosotros debemos implementar estos métodos para que nuestro table view pueda cargar contenido en sus celdas.</p>

<p>Pero primero lo primero. Tenemos que llenar el array con algo para poder mostrar en la tabla. Yo lo voy a llenar de nombres de ciudades del mundo:</p>

<pre>- (void)viewDidLoad
{
    [super viewDidLoad];
    
    [self.tableView setDataSource:self];
    [self.tableView setDelegate:self];
    
    content = @[@"Caracas",
                @"Los Angeles",
                @"Nueva York",
                @"Buenos Aires",
                @"Madrid",
                @"Berlin",
                @"Londres",
                @"Moscú",
                @"Hong Kong",
                @"Tokio",
                @"Melbourne"];
}
</pre>

<p>Esta es la forma literal de declarar un <em>NSArray</em>, también podrías hacerlos mediante el constructor <em>[[NSArray alloc] initWithObjects:…]</em> pero sería más largo.</p>

<p>Ya tenemos el contenido, ahora veamos como colocarla en la tabla.</p>

<p>En el data source hay 2 métodos requeridos que debemos implementer para que funcione el table view: <em>tableView:cellForRowAtIndexPath:</em> y <em>tableView:numberOfRowsInSection:</em>.</p>

<p>En <em>tableView:numberOfRowsInSection:</em> retornamos el número de filas que queremos en la tabla, en este caso es la cantidad de ciudades en el array:</p>

<pre>- (NSInteger)tableView:(UITableView *)tableView
 numberOfRowsInSection:(NSInteger)section
{
    return [content count];
}
</pre>

<p>En <em>tableView:cellForRowAtIndexPath:</em> retornamos la celda que va en el indice dado. La diferencia es que este método tiene un formato recomendado en su estructura:</p>

<pre>- (UITableViewCell *)tableView:(UITableView *)tableView
         cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"myCell"];
    
    if (!cell)
    {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault
                                      reuseIdentifier:@"myCell"];
    }
}
</pre>

<p>Este método debería tener siempre esta estructura. Cuando desplazamos la tabla, vamos dejando celdas fuera de la pantalla, estas celdas las podemos reutilizar para aprovechar memoria. Con este código extraemos una celda que ya no sea visible y la reutilizamos, es por esto también que tienen un identificador de reuso (reuse identifier), para saber que tipo de celda es y saber si la puede reutilizar para el próximo indice a mostrar.</p>

<p>Luego de este bloque podemos agregar el contenido y estilizar la celda como queramos, por ahora yo solo voy a mostrar el nombre de la ciudad que guardo en el array. En la propiedad "Etiqueta de texto" de las celdas, voy a asignar el nombre de la ciudad que esta en el indice dado:</p>

<pre>- (UITableViewCell *)tableView:(UITableView *)tableView
         cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"myCell"];
    
    if (!cell)
    {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault
                                      reuseIdentifier:@"myCell"];
    }
    
    NSString *cityName = [content objectAtIndex:indexPath.row];
    [cell.textLabel setText:cityName];
    
    return cell;
}
</pre>

<p>Ahora si corremos la aplicación deberíamos ver la tabla llena con los nombres de las ciudades.</p>

<p><img src="http://i.imgur.com/155kMPS.png" alt="Imagen-de-la-app-corriendo-con-el-uitableview" class="aligncenter size-full wp-image-1342" /></p>

<h2>Delegando los toques de recibe la tabla</h2>

<p>En el delegado no hay métodos requeridos para ser implementados. Dependiendo de nuestra necesidad podemos implementar el que mejor se ajuste al requerimiento. Yo voy a implementar el más común en mis proyectos, <em>tableView:didSelectRowAtIndexPath:</em>, este es invocado cuando el usuario selecciona una celda de la tabla:</p>

<pre>- (void)tableView:(UITableView *)tableView
didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    NSLog(@"Seleccionaste el indice: %i", indexPath.row);
}
</pre>

<p>Aquí imprimí por consola el indice seleccionado.</p>

<hr />

<h2>Conclusión</h2>

<p>En este capítulo aprendimos los conceptos básicos para implementar un table view en nuestra app. Para ampliar tus conocimientos y experimentar con otros métodos de UITableViewDataSource y UITableViewDelegate visita la documentación de Apple sobre [data source][5] y [delegate][6].</p>

<p>En estas direcciones está todo lo que necesitas saber sobre estos protocolos, solo que está en inglés. Si tienes alguna duda o no sabes inglés puedes dejar tus preguntas abajo en los comentarios.</p>

<p>Saludos.</p>
