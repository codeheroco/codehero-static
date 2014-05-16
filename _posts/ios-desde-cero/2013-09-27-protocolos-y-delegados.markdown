---
layout: post
status: publish
published: true
title: Protocolos y delegados
author: Ricardo Sampayo
author_login: ricardo
author_email: ricardo9588@gmail.com
author_url: http://www.ricardosampayo.com
wordpress_id: 2321
wordpress_url: http://codehero.co/?p=2321
date: 2013-09-27 00:35:04.000000000 -04:30
serie: iOS desde Cero
dificultad: Novato
duracion: 20
github: https://github.com/codeheroco/iOS_protocol
categories:
- Cursos
- iOS
tags:
- iOS
- Cursos
- Protocolo
- Delegate
---
<p>Bienvenidos una vez más a iOS desde Cero. En este capítulo de la serie estudiaremos un tema bastante importante y que frecuentemente veremos en el desarrollo iOS. Aprenderemos conceptos básicos, y demostraremos estos conceptos con sus respectivos ejemplos.</p>

<p>Para este curso primero definiremos los conceptos y al final desarrollaremos un pequeño ejemplo que abarca todo el tema.</p>

<hr />

<h2>Protocolos</h2>

<p>Los protocolos en iOS son métodos que actúan sobre un objeto y pueden ser implementados por cualquier clase. Básicamente tienen la declaración de una serie de métodos que ejecuta otra clase y se espera que le agreguemos funcionalidad según lo necesite cada una de las clases que invocan esta otra clase. Apple nos provee una serie de situaciones por las que probablemente deberíamos utilizar un protocolo:</p>

<ul>
<li>Declarar los métodos que se espera que otros implementen.</li>
<li>Declarar la interfaz a un objeto, ocultando su clase.</li>
<li>Capturar similitudes entre las clases que no están jerárquicamente relacionadas.</li>
</ul>

<p>Para empezar debemos recordar que los protocolos no tienen una implementación de los métodos que ahí están declarados, por lo tanto su declaración sólo es necesaria en los archivos <code>.h</code>. Veamos la sintaxis de un protocolo sencillo:</p>

```obj-c
@protocol ProtocolName

@optional
// Lista de métodos opcionales
@required
// Lista de métodos requeridos y obligatorios

@end
```


<p>Un ejemplo que probablemente conocemos, si hemos seguido la serie de tutoriales iOS, son los <strong>UITableView</strong> ya que los métodos que implementamos para configurar, cargar con información nuestra tabla y manejar los eventos que éste lance son parte de los protocolos <strong>UITableViewDataSource</strong> y <strong>UITableViewDelegate</strong>. Algunos de estos métodos son los siguientes:</p>

```obj-c
// Delegate
- (void)tableView:(UITableView *)tableView didUnhighlightRowAtIndexPath:(NSIndexPath *)indexPath;

// DataSource Requeridos
- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath;
- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section;

// DataSource Opcionales
- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView;
```


<hr />

<h2>Delegados</h2>

<p>Los delegados (<strong>delegate</strong>) son un patrón en donde un objeto actúa en nombre de un coordinador asociado a otro objeto. Un delegate básicamente delega el control de la interfaz de usuario para un evento, o al menos se le pregunta para interpretar el evento de una manera específica en la aplicación, es decir mantiene una especie de vínculo con el objeto que le permite recibir los mensajes que el objeto genérico genera.</p>

<p>El funcionamiento de un delegate nos permite coordinar su apariencia y estado con cambios que se producen en otras partes de un programa, cambia generalmente provocado por las acciones del usuario. Más importante aún, los delegates hacen posible que un objeto pueda alterar el comportamiento de otro objeto sin la necesidad de tener una relación de herencia entre los objetos. El delegate es casi siempre uno de los objetos personalizados, y por definición, incorpora la lógica específica de la aplicación que el objeto genérico y el delegate no conoce.</p>

<p>Definiremos un delegate en este curso de la siguiente manera, y asociado a un protocolo que después la clase que lo invoque deberá implementar.</p>

```obj-c
@interface ViewController ()<ProtocolName >{
    id <ProtocolName> delegate;
}
```


<hr />

<h2>Ejemplo</h2>

<p>En este ejemplo desarrollaremos una aplicación que descargue un archivo desde una URL y nos indique el progreso de la descarga.</p>

<p>Supongamos que tenemos una clase con una serie de métodos que básicamente descarga un archivo en una URL y lo guarda dentro del dispositivo. Pero queremos saber e imprimir en la vista el progreso de la descarga paso a paso.</p>

<p>Creamos nuestro archivo protocolo.</p>

<p><img src="http://i.imgur.com/WOINV9j.png?1" alt="foto" /></p>

<p>Lo nombramos con el nombre que queramos para este ejemplo lo llamaremos <strong>FileDataAccessDelegate</strong></p>

<p>Como se dan cuenta sólo se crea un archivo <code>.h</code> y en este agregamos todos los métodos que vamos a utilizar tanto en la clase que descarga el archivo como en la que lo invoca.</p>

```obj-c
// Método que se ejecuta una vez descargado y almacenado el archivo
-(void)dowloadFinishLoading:(NSString *)filePath andName:(NSString *)name;

// Método que se ejecuta cuando termina la descarga
-(void)dowloadDidFinishLoading:(NSString *)name;

// Método que se ejecuta una vez si ocurre un error
-(void)dowloadFinishLoading:(NSURLConnection *)connection didFailWithError:(NSError *)error andName:(NSString *)name;

// Método que se va ejecutando mientras se descarga el archivo
- (void)dowloadChangeLoading:(NSURLConnection *)connection didReceiveData:(NSData *)data andProgress:(float)progress;

// Método que se ejecuta al iniciar la descarga
- (void)dowloadInitLoading:(NSURLConnection *)connection didReceiveResponse:(NSURLResponse *)response;
```


<p>Luego agregamos a nuestra clase el delegate.</p>

```obj-c
// No olviden importar el protocolo en el encabezado de la clase
@property (nonatomic,strong) id&lt; FileDataAccessDelegate >delegate;
```


<p>Por último invocamos los métodos del protocolo en los puntos claves de la clase por ejemplo; cuando se esté descargando agregamos las siguiente líneas:</p>

```obj-c
if ([self.delegate respondsToSelector:@selector(dowloadInitLoading:didReceiveResponse:)])
{
    [self.delegate dowloadInitLoading:connection didReceiveResponse:response];
}
```


<p>Listo!, ya tenemos nuestra clase para descargar un archivo con el protocolo y el delegate implementado, ahora solo nos queda algo de carpintería para invocar esta clase, descargar el archivo a nuestros dispositivos y hacer uso de los métodos del protocolo para ir actualizando la vista.</p>

```obj-c
(IBAction)descargar:(id)sender{
    FileDataAccess *file = [[FileDataAccess alloc] init];
    [file descargarArchivo:@"http://codehero.co/oc-content/uploads/2013/08/Screen-Shot-2013-08-12-at-1.04.36-AM.png" nombre:@"imagen.png"];
    file.delegate=self;
}

#pragma mark Delegete File
-(void)dowloadFinishLoading:(NSString *)filePath andName:(NSString *)name{
    NSLog(@"termina de descargar y guardar con exito");
     _progreso.text = @"listo!";
}
-(void)dowloadDidFinishLoading:(NSString *)name{
    NSLog(@"termina de descargar");
}
-(void)dowloadFinishLoading:(NSURLConnection *)connection didFailWithError:(NSError *)error andName:(NSString *)name{
    NSLog(@"Error");
}
- (void)dowloadChangeLoading:(NSURLConnection *)connection didReceiveData:(NSData *)data andProgress:(float)progress{
    _progreso.text = [NSString stringWithFormat:@"%.2f%%",progress*100];
}
- (void)dowloadInitLoading:(NSURLConnection *)connection didReceiveResponse:(NSURLResponse *)response{
    NSLog(@"inicia de descargar");
}
```


<p>Construímos un poco la interfaz y probablemente tengamos como resultado algo así:</p>

<p><img src="http://i.imgur.com/e0Mhnw4.png?1" alt="foto" /></p>

<hr />

<h2>Conclusión</h2>

<p>En esta lección, hemos aprendido un poco más de los protocolos y delegados en iOS, Aprendimos su funcionalidad y cómo se crea un protocolo desde cero. Te recomiendo eches un vistazo al repositorio establecido para este tema para comprenderlo mejor viendo la aplicación en funcionamiento.</p>

<p>Una vez más te recomiendo echarle un vistazo a la serie completa de <a href="http://codehero.co/series/ios-desde-cero/">iOS desde cero</a>, así como a las otras series de CodeHero, agradeciendo de antemano todas sus dudas y comentarios en la sección de comentarios.</p>

<p>¡Hasta el próximo capítulo!</p>
