---
layout: post
status: publish
published: true
title: NSOperations y NSOperationQueues
author: Ricardo Sampayo
author_login: ricardo
author_email: ricardo9588@gmail.com
author_url: http://www.ricardosampayo.com
wordpress_id: 2379
wordpress_url: http://codehero.co/?p=2379
date: 2013-10-11 00:24:05.000000000 -04:30
categories:
- Cursos
- iOS
tags:
- iOS
- Cursos
- NSOperationQueues
- NSOperations
---
<p>Bienvenidos una vez más a iOS desde Cero, curso con el cual aprenderemos a programar sin necesidad de previo conocimiento en el lenguaje. En capítulos anteriores, conocimos algunos de los componentes iOS como UITableViews y Storyboards que estaremos utilizando en este nuevo curso.</p>

<p>Para este capítulo estaremos estudiando los NSOperations y NSOperationQueues atributos o clases que nos servirán para mejorar el performance de nuestras aplicaciones móviles.</p>

<hr />

<h2>NSOperations y NSOperationQueues</h2>

<p><strong>NSOperation</strong> y <strong>NSOperationQueue</strong> son clases de Objective-C (operativas a partir de 10.6 y iOS 4) que básicamente gestionan el manejo de procesos simultáneos (hilos). Estas clases almacenan en una cola los procesos a ejecutar hasta que se cancele explícitamente o se termine la ejecución de cada uno de los procesos.</p>

<p>Es posible que después de esta definición, y si han tenido algún tipo de contacto con el lenguaje, hayan escuchado hablar de Grand Central Dispatch (<strong>GCD</strong>), que en pocas palabras también nos ayuda a manejar múltiples operaciones en una especie de simultaneidad pero a diferencia de nuestras clases ésta es de muy bajo nivel lo que nos hace difícil la manipulación de nuestros procesos. Apple por otro lado nos recomienda siempre utilizar la abstracción de más alto nivel y de ahí ir descendiendo siempre y cuando las mediciones muestren que lo necesitamos.</p>

<hr />

<h2>Demostración</h2>

<p>Para demostrar el uso de estas clases, entender mejor cómo funciona y lo importante que son para mejorar el rendimiento de la aplicación, desarrollaremos un ejemplo desde cero:</p>

<p>El ejemplo consta de un <strong>UITableView</strong> sencillo (ya aprendido en <a href="http://codehero.co/ios-desde-cero-table-views-uitableview/">Capítulos anteriores</a>) que carga y procesa una lista de urls donde están almacenadas una serie de imágenes. Para desarrollar esto, lo primero que debemos hacer es crear nuestro TableView en el StoryBoard dando como resultado algo parecido a éste:</p>

<p><img src="http://i.imgur.com/ovFggfi.png?1" alt="StroyBoard" /></p>

<p>Como se observa en la imagen el ViewController consta de un <strong>UItableView</strong> que contiene una celda (Recuerden agregar el identificador de la celda) a la que agregaremos un <strong>UIImageView</strong> donde posteriormente cargaremos nuestra imagen, un <strong>UILabel</strong> en el que identificaremos la posición de la celda.</p>

<p>Luego creamos una clase que hereda de <strong>UITableViewCell</strong>, para nuestro caso llamaremos RSCell y en la cual declaramos los componente ya graficados en la celda del UItableView en el StoryBoard de la siguiente manera:</p>

<pre>@property (nonatomic,weak) IBOutlet UIImageView *imageCell;
@property (nonatomic,weak) IBOutlet UILabel *labelDescription;
</pre>

<p>Una vez creada la clase de la celda y hechas las asociaciones correspondientes a los componentes del StoryBoard vamos de una vez a armar nuestro DataSource con los requisitos mínimos para su funcionamiento, y de la forma más básica sin aún hacer uso de nuestra clase NSOperations y NSOperationQueues, obteniendo como resultado la siguiente implementación del DataSource:</p>

<pre>#pragma mark dataSource

-(NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section{
    return _datasource.count;
}
-(UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    NSString *identificador =@"myCell";
    RSCell *cell = [tableView dequeueReusableCellWithIdentifier:identificador];
    
    if (!cell)
    {
        cell = [[RSCell alloc] initWithStyle:UITableViewCellStyleDefault
                                      reuseIdentifier:identificador];
    }
    cell.labelDescription.text = [NSString stringWithFormat:@"position %i",indexPath.row];
    
    NSData * imageData = [[NSData alloc] initWithContentsOfURL: [NSURL URLWithString: [_datasource objectAtIndex:indexPath.row]]];

    UIImage *image = [UIImage imageWithData:imageData];
    [cell.imageCell setImage:image];
    return cell;
}
</pre>

<p>Si están siguiendo los pasos de manera ordenada ya pueden correr la aplicación y darse cuenta que el performance de la misma es horrible, es prácticamente imposible mover el UITableview para ver el resto de las celdas, debido a que se están cargando las imágenes cada vez que se aproxima una celda al rango de visibilidad.</p>

<h3>¿Cómo mejorar el performance de nuestra Aplicación?</h3>

<p>La respuesta a esta pregunta es hacer uso del tema que estamos desarrollando en este curso, que básicamente libera al proceso principal de la carga de la imagen agregándola a un proceso secundario en paralelo y haciendo posible que la aplicación continúe mientras cargamos nuestras imágenes. Por otro lado, al agregar la funcionalidad de la carga a otro proceso en paralelo no podremos modificar la interfaz que es manejada por el proceso principal, así que, una vez finalizada la carga debemos retornarla al proceso principal para hacer modificaciones en la interfaz gráfica.</p>

<blockquote>
  <p>Un proceso paralelo al principal <strong>NO</strong> puede interactuar con la interfaz de usuario hasta retornarlo al mainQueue</p>
</blockquote>

<p>Veamos cómo modificando el método <code>tableView:cellForRowAtIndexPath:</code> para hacer uso del <strong>NSOperationQueues</strong> y hacer la aplicación más dinámica.</p>

<p>implementaremos nuestra clase de la siguiente forma:</p>

<pre>-(UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    NSString *identificador =@"myCell";
    RSCell *cell = [tableView dequeueReusableCellWithIdentifier:identificador];
    
    if (!cell)
    {
        cell = [[RSCell alloc] initWithStyle:UITableViewCellStyleDefault
                             reuseIdentifier:identificador];
    }
    [cell.imageCell setImage:nil];
    cell.labelDescription.text = [NSString stringWithFormat:@"position %i",indexPath.row];
    
    // Creamos nuesta Queue
    NSOperationQueue *queue = [[NSOperationQueue alloc] init];
    [queue setName:@"Carga de imagenes"];
    
    // Agregamos bloques de operaciones a nuestro Queue
    [queue addOperationWithBlock:^{
        NSData * imageData = [[NSData alloc] initWithContentsOfURL:
                              [NSURL URLWithString: [_datasource objectAtIndex:indexPath.row]]];
        UIImage *image = [UIImage imageWithData:imageData];
        
        // Retornamos al mainQueue la imagen para ser agregada a la celda
        [[NSOperationQueue mainQueue] addOperationWithBlock:^{
            [cell.imageCell setImage:image];
            
        }];
        
    }];
    
    
    return cell;
}
</pre>

<p>Finalmente ya podemos correr nuestra aplicación y darnos cuenta del gran cambio que hacen estas clases a una aplicación para mejorar el performance y la experiencia del usuario. Si todo salió bien pudiéramos tener una aplicación como esta:</p>

<p><img src="http://i.imgur.com/x4rNZ9Z.png?1" alt="aplicacion_final" /></p>

<hr />

<h2>Conclusión</h2>

<p>En este capítulo aprendimos los conceptos básicos para implementar un NSOperations y NSOperationQueues en nuestra aplicación y así lograr que ésta pueda realizar múltiples tareas sin afectar el flujo original de la aplicación móvil.</p>

<p>Para ampliar tus conocimientos de estas clases te invito a revisar todos los métodos de <a href="https://developer.apple.com/library/mac/documentation/Cocoa/Reference/NSOperation_class/Reference/Reference.html">NSOperations</a> y <a href="https://developer.apple.com/library/ios/documentation/cocoa/reference/NSOperationQueue_class/Reference/Reference.html">NSOperationQueues</a> en la documentación oficial de Apple.</p>

<p>Una vez más te recomiendo echarle un vistazo a la serie completa de <a href="http://codehero.co/series/ios-desde-cero/">iOS desde cero</a>, así como a las otras series de CodeHero, agradeciendo de antemano todas sus dudas y comentarios en la sección de comentarios.</p>

<p>¡Hasta el próximo capítulo!</p>
