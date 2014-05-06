---
layout: post
status: publish
published: true
title: Interfaz gráfica
author: Ricardo Sampayo
author_login: ricardo
author_email: ricardo9588@gmail.com
author_url: http://www.ricardosampayo.com
wordpress_id: 2454
wordpress_url: http://codehero.co/?p=2454
date: 2013-10-25 00:39:08.000000000 -04:30
serie: iOS 7 Decodificado
dificultad: Aprendiz
duracion: 20
description: Curso que busca darte las herramientas para desarrollar tus app en iOS7. Este capítulo una introducción y las diferencia básicas a nivel de interfaz gráfica
categories:
- Cursos
- iOS 7 decodificado
tags:
- iOS7
- Interfaz gráfica
---
<p>Bienvenidos a iOS 7 Descodificado, una nueva serie que hemos creado para mostrarte las nuevas herramientas que Apple a introducido en su nueva actualización de iOS. En este primer capítulo vamos a comparar las diferencias entre las ambas versiones, a nivel de interfaz gráfica y algunas herramientas para alterar la nueva imagen de los objetos.</p>

<hr />

<h2>Introducción</h2>

<p>Para empezar con nuestra serie primero vamos a visualizar una misma aplicación en el nuevo <strong>iOS 7</strong> y el anterior sistema <strong>iOS 6</strong>, y así comprender más fácilmente el cambio que Apple introdujo con la nueva actualización.</p>

<p><img src="http://i.imgur.com/ZPUbD70.png?1" alt="comparation" /> En esta primera imagen podemos observar la evolución que nos Apple nos presenta en el nuevo sistema operativo, haciendo énfasis en 3 elementos importantes:</p>

<ul>
<li><strong>StatusBar</strong>: Este componente aunque sigue mostrando elementos básicos del dispositivo (operadora, hora, nivel de batería entre otros), la barra desaparece y nuestro espacio de trabajo crece los 20 pixelees que antes ocupaba este componente.</li>
<li><strong>Botones</strong>: Los botones por defecto cambiaron como ven en la imagen, eliminando los bordes del botón y dejando simplemente el título del mismo.</li>
<li><strong>TintColor del Tab Bar</strong>: El TintColor en iOS7 aplicado al Tap bar nos deja la barra del tap bar del color por defecto y el TintColor se aplica a los componente internos de ésta(botones), dejándonos una interfaz más plana y elegante.</li>
</ul>

<p><img src="http://i.imgur.com/LKIPRSF.png?1" alt="comparation" /> En la imagen vemos una pantalla nueva en donde ubicamos un <strong>Table View</strong> y un <strong>Navigation Bar</strong>, y una vez más vemos los cambios destacados por el ejemplo anterior y agregamos dos nuevos componentes:</p>

<ul>
<li><strong>Navigation Bar</strong>: En éste se ve que se le aplican las mismas características del Tab bar. El Tint Color se le aplica a los componentes internos del elemento (cambios que veremos en el siguiente ejemplo).</li>
<li><strong>Fuentes</strong>: Las fuente por defecto cambian entre los dos sistemas operativos.</li>
</ul>

<p><img src="http://i.imgur.com/MbcFnf6.png?1" alt="comparation" /></p>

<p>Por último para terminar con el repaso de elementos gráficos básicos que cambiaron con el nuevo sistema operativo de Apple, vemos cómo en esta última pantalla los componentes del <strong>navigation bar</strong> adoptan el color del tint Color.</p>

<hr />

<h2>Nuevas propiedades.</h2>

<p>Como vemos en lo que va de capítulo Apple hizo un cambio significativo a nivel de interfaz en este nuevo sistema operativo, por lo que se vio en la necesidad de agregar nuevos métodos y propiedades a algunos atributos para facilitar a los programadores la adaptación a estos cambios. Veamos algunas de estas propiedades.</p>

<h3>Tamaño de la barra superior</h3>

<p>Como vimos en la primera parte de este curso algunos componentes se mantienen, pero a nivel de programación no ocupan espacio dentro de nuestras vistas como por ejemplo el status bar.</p>

<p>A nivel de programación podemos obtener el espacio que esta ocupando nuestro <strong>statusBar</strong> con la siguiente propiedad.</p>

<pre>self.topLayoutGuide.length
</pre>

<p>Veamos en un ejemplo: Suponiendo que debemos agregar una sub-vista del tamaño de la pantalla de nuestra aplicación, pero sin agarrar el espacio que ocupa la barra superior, resolveríamos de la siguiente manera::</p>

<pre>- (void)viewWillLayoutSubviews
{
    [super viewWillLayoutSubviews];
￼    self.vistaContenedora.frame = CGRectMake(
        0,
        self.topLayoutGuide.length,
        CGRectGetWidth(self.view.frame),
        CGRectGetHeight(self.view.frame) - self.topLayoutGuide.length
    );
}
</pre>

<p>Este código simplemente modifica el tamaño y la posición de la vista, restando a la misma el espacio que cubriría la barra superior en caso de existir. En caso de existir un Status bar estos serían los valores.</p>

<ul>
<li><strong>Valor en x</strong>: 0</li>
<li><strong>Valor en y</strong>: 20</li>
<li><strong>Ancho</strong>: 320</li>
<li><strong>Alto</strong>: 568 - 20 (Pantalla completa)</li>
</ul>

<h3>Tamaño de la barra inferior</h3>

<p>Esto es básicamente lo mismo que el punto anterior pero aplica a las barras que están en la parte inferior. En el caso de la aplicación que estamos usando de ejemplo seria un tap Bar. La propiedad creada para saber este tamaño es:</p>

<pre>self.bottomLayoutGuide.length
</pre>

<p>Y lo pudiéramos aplicar para crear una vista contenedora a la que le agregamos los objetos necesarios para construir una aplicación:</p>

<pre>- (void)viewWillLayoutSubviews
{
    [super viewWillLayoutSubviews];
    self.contentSubview.frame = CGRectMake(
        0,
        self.topLayoutGuide.length,
        CGRectGetWidth(self.view.frame),
        CGRectGetHeight(self.view.frame)
            - self.topLayoutGuide.length
            - self.bottomLayoutGuide.length
    );
}
</pre>

<p>Creando una vista posiblemente con los siguientes valores:</p>

<ul>
<li><strong>Valor en x</strong>: 0</li>
<li><strong>Valor en y</strong>: 20 (suponiendo que tenemos status bar)</li>
<li><strong>Ancho</strong>: 320</li>
<li><strong>Alto</strong>: 568 - 20 - 49 (Pantalla completa y suponiendo que tenemos tap bar)</li>
</ul>

<h3>Esconder el statusBar</h3>

<p>iOS 7 también nos ofrece un método para esconder el StatusBar, éste consiste de un método que retorna un valor booleano que le indica al sistema si mostrar o no el componente.</p>

<pre>- (BOOL)prefersStatusBarHidden
{
    return YES;
}
</pre>

<h3>Márgenes a las vistas</h3>

<p>iOS 7 también nos provee una propiedad que nos permite agregarle márgenes a las vistas y así no tener que agregar una vista extra que contiene los objetos reales de la aplicación. Por ejemplo, si quisiéramos agregar la siguiente estructura:</p>

<p><img src="http://i.imgur.com/s76hmec.png?1" alt="imagen" /></p>

<p>Si creamos esta estructura, tal y como vemos en la imagen, tendremos el label pegado completamente a la parte superior de la aplicación por debajo del navigation bar. Tenemos dos opciones para solucionar este problema: La primera solución es la mencionada anteriormente, agregando una vista a la vista principal respetando los tamaños de la barra superior e inferior; y segunda opción es agregándole márgenes manualmente a la vista. La propiedad que nos ofrece Apple para esto es la siguiente:</p>

<pre>self.automaticallyAdjustsScrollViewInsets
</pre>

<p>y en este caso se lo podemos aplicar para agregarle márgenes a nuestro ScrolView de la siguiente forma:</p>

<pre>- (void)loadView
{
    self.automaticallyAdjustsScrollViewInsets = NO;
}


- (void)viewWillLayoutSubviews
{
    [super viewWillLayoutSubviews];
￼￼
    self.contentSubview.contentInset = UIEdgeInsetsMake(64, 0, 0, 0);
    self.contentSubview.contentOffset = CGPointMake(0, -64);
    self.contentSubview.frame = CGRectMake(
                            0,
                            0,
                            CGRectGetWidth(self.view.frame),
                            CGRectGetHeight(self.view.frame)
    );
}
</pre>

<p>Como vemos en el ejemplo modificamos la propiedad en negativo y manualmente agregamos los márgenes (contentInset y contentOffset) al contentSubview (en este caso es el Scroll view). Esto hace que lo que agreguemos en él se dibuje dentro de los márgenes ya predefinidos.</p>

<hr />

<h2>Apariencia en iOS7</h2>

<p>En iOS 7 tenemos nuevas propiedades para jugar con la apariencia de componentes del sistema.</p>

<p>El bien conocido <code>tintColor</code> que consiste en agregarle color a los componente del sistema tal y como se muestra en la siguiente imagen:</p>

<p><img src="http://i.imgur.com/Lz2TY0B.png?1" alt="imagen" /></p>

<p>El <code>tintColor</code> modifica todos los componentes dentro de la vista, por ejemplo pudiéramos agregar la siguiente línea de código en el <code>appDelegate.m</code> ...</p>

<pre>self.window.tintColor = [UIColor greenColor];
</pre>

<p>Para decirle a nuestra aplicación que todos sus componentes son de color verde, hasta que se le diga lo contrario en una vista especifica:</p>

<pre>self.view.tintColor = [UIColor yellowColor];
</pre>

<p>Por último para terminar con este punto, Apple nos da tres nuevas opciones para jugar con la apariencia de nuestros navigation bar</p>

<ul>
<li>barStyle (Estilos predeterminados de iOS 7)</li>
<li>tintColor (Agrega el color a los componentes de la barra)</li>
<li>barTintColor (Agrega el color a la barra en si)</li>
</ul>

<hr />

<h2>Conclusión</h2>

<p>En este nueva serie estaremos estudiando los cambios y bondades que nos ofrece Apple con su nuevo sistema operativo iOS 7. En este capítulo estuvimos viendo detalles que cambiaron a nivel gráfico y algunos tips a nivel de programación para atacar estos nuevos cambios.</p>

<p>Una vez más te recomiendo echarle un vistazo a la serie <a href="http://codehero.co/series/ios-desde-cero/">iOS desde cero</a> y a mantenerte alerta a los nuevos capítulos de esta nueva serie, agradeciendo de antemano todas sus dudas y comentarios en la sección de comentarios.</p>

<p>¡Hasta el próximo capítulo!</p>
