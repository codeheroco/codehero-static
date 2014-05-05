---
layout: post
status: publish
published: true
title: imágenes y textos
author: Ricardo Sampayo
author_login: ricardo
author_email: ricardo9588@gmail.com
author_url: http://www.ricardosampayo.com
wordpress_id: 2564
wordpress_url: http://codehero.co/?p=2564
date: 2013-11-08 00:05:02.000000000 -04:30
dificultad: Novato
duracion: 15
categories:
- Cursos
- iOS 7 decodificado
tags:
- iOS7
- fuentes
- imágenes
- textos
---
<p>Bienvenidos a iOS 7 Descodificado, una nueva serie que hemos creado para mostrarte las nuevas herramientas que Apple a introducido en su nueva actualización de iOS. En capítulos anteriores vimos algunos nuevos cambios a nivel de interfaz que Apple introdujo en esta nueva actualización.</p>

<p>En este nuevo capítulo estudiaremos algunas de las características, métodos y herramientas que han sido modificadas o añadidas en esta nueva actualización, para hacer uso de las imágenes y la gestión de textos en nuestra aplicación.</p>

<hr />

<h2>Imagenes</h2>

<p>En esta nueva versión de iOS Apple nos facilita la gestión de imágenes en nuestras aplicaciones, habilitando una sección o carpeta en nuestros proyectos para guardar las imágenes que usaremos en la aplicación. Esta nueva sección se llama <code>Images.xcassets</code></p>

<p>Algunos se preguntaran que beneficios puede traer un directorio nuevo a nuestros proyectos, pues en mi opinión muchísimos, empezando con mantenernos nuestro código y estructura de proyectos más organizada y segundo es bien sabido que apple con sus diferentes dispositivos y resoluciones de pantalla nos ha obligado a usar diferentes imágenes que se adapten a cada uno de sus dispositivos.</p>

<ul>
<li>iPhone 3gs - 320x480 1x </li>
<li>iPhone 4 - 320x480 1x and 2x </li>
<li>iPad 1+2 - 768x1024 1x</li>
<li>iPad 3 - 768x1024 1x and 2x </li>
<li>iPhone 5 - 320x568 1x and 2x </li>
<li>Futuros dispositivos <code>¿?</code> </li>
</ul>

<p>Con esta nueva versión podremos ubicar en nuestro proyecto rápidamente donde están las imágenes a utilizar y como veremos en la imagen a continuación están agrupadas por nombre.</p>

<p><img src="http://i.imgur.com/sgF1ShJ.png?1" alt="foto" /></p>

<p>En la imagen podemos ver como dentro de la carpeta de imágenes antes mencionada contiene tres objetos (AppIcon,LaunchImage,logo) y en este caso el seleccionado (lobo) contiene las dos imágenes correspondientes para las diferentes versiones de iPhone que hay por el momento (Retina y no retina).</p>

<hr />

<h2>Fuentes y campos de texto</h2>

<p>El manejo de las fuentes y los campos de texto en esta nueva versión del sistema imperativo a traído cambios significativos en su uso. Deprecando muchos de los métodos de los campos de texto y agregando algunos nuevos que estudiaremos a continuación:</p>

<h3>Asignación de fuentes (UIFontDescriptor)</h3>

<p>En iOS 7 cambiaron la forma de asignarle una fuente a un campo de texto, recordemos cual era la sintaxis antes de esta nueva versión.</p>

<pre>UIFont *fuente = [UIFont fontWithName:@"HelveticaNeue-Italic" size:18];
</pre>

<p>Ahora en esta nueva versión del sistema operativo incorporaron un nuevo elemento que nos permite describir una fuente, para luego ser utilizada mas adelante. Con este nuevo objeto podemos guardar primero la familia de la fuente y luego crear nuevos objetos a partir de el, con nuevas características (negrita, cursiva, ligera, regular, etc.).</p>

<p>Veamos un ejemplo para generar un tipo de letra <code>HelveticaNeue</code> y cursiva:</p>

<pre>UIFontDescriptor *fuenteBase =
    [UIFontDescriptor fontDescriptorWithFontAttributes:
        @{UIFontDescriptorFamilyAttribute:@"Helvetica Neue"}];


UIFontDescriptor *cursiva =
    [fuenteBase fontDescriptorWithSymbolicTraits:UIFontDescriptorTraitItalic];


UIFont *fuente = [UIFont fontWithDescriptor:cursiva size:18];

self.label.font = font;
</pre>

<p>Como ven primero declaramos una descripción con la fuente base, luego, partiendo de esa, creamos nuestra letra cursiva para posteriormente crear la fuente que asignaremos a nuestro objeto de texto.</p>

<h3>Tamaño de un texto</h3>

<p>Este es otro de los métodos que fueron cambiados para iOS 7, este método nos permite saber el tamaño que necesita un campo de texto para mostrar un texto. Veamos como se hacia antes:</p>

<pre>CGSize tamanioLabel = [@"Bienvenidos a nuestros cursos en CodeHero" sizeWithFont:self.label.font];

self.label.frame = CGRectMake(0, 0, tamanioLabel.width, tamanioLabel.height);
</pre>

<p>En iOS 7 descubrir el tamaño que requiero un texto para poder ser visto completo en un label se calcula de la siguiente manera:</p>

<pre>CGSize tamanioLabel = [@"Bienvenidos a nuestros cursos en CodeHero" sizeWithAttributes:
    @{NSFontAttributeName: fuente,
      UIFontDescriptorTraitsAttribute: @(UIFontDescriptorTraitBold)};
];

self.label.frame = CGRectMake(0, 0, labelSize.width, labelSize.height);
</pre>

<p>Como ven el nuevo método es bastante sencillo, contiene nuevos elementos y se le puede asignar un diccionario de atributos para mejorar la precisión en que este detecta el tamaño, para este caso le hemos dicho la fuente que estamos utilizando.</p>

<h3>Campos de texto</h3>

<p>Los campos de textos también han sido foco de modificaciones en el nuevo sistema operativo. Se le agregaron una serie de clases, que nos dan a los programadores mas opciones para manipular estos objetos que usamos tan frecuentemente. Veamos el kit de clases de los campos de texto</p>

<ul>
<li>￼<strong>UITextView</strong>: Esta clase es simplemente la vista que muestra el texto dentro de un UIScrollView</li>
<li><strong>NSTextContainer</strong> Determina el espacio que tiene el texto para ser distribuido y proporciona el tamaño de este espacio</li>
<li><strong>NSLayoutManager</strong> Cumple la function de un especie de conductor entre el ￼NSTextStorage y el NSTextContainer.</li>
<li><strong>￼NSTextStorage</strong> es el <em>NSMutableAttributedString</em></li>
</ul>

<p>Veamos en que nos afecta esto al momento de programar, a través de en unas imágenes que estoy seguro que ayudaran a comprender mejor estos conceptos, al menos el uso del <em>NSTextContainer</em>, que para este curso es el importante</p>

<p><img src="http://i.imgur.com/izLdcYJ.png?1" alt="foto" /></p>

<p>En la imagen vemos un poco la estructura de un nuevo UITextView. Lo primero que vemos en la imagen es que prácticamente que hay una gran vista que contiene al <strong>textContainer</strong> y este a su vez nuestro texto. Las ventajas principal que vemos con esta estructura es que podemos adaptar el texto con los márgenes que queramos fácilmente. En la siguiente imagen vemos como están definidos los márgenes.</p>

<p><img src="http://i.imgur.com/j3UVlen.png?1" alt="foto" /></p>

<h3>Textos Dinámicos</h3>

<p>Entre otra de las novedades de Apple en iOS 7 para los campos de textos, es el uso de textos dinámicos que permiten a los usuarios de nuestras aplicaciones elegir un tamaño de texto base que se utiliza en todo el dispositivo.</p>

<p>En este sistema operativo ya viene con unas fuentes por defecto que hacen uso de esta propiedad ajustando los textos según as necesidades del usuario. Estas fuentes son las siguientes.</p>

<ul>
<li>UIFontTextStyleHeadline (Títulos)</li>
<li>UIFontTextStyleSubheadline (Subtitulos)</li>
<li>UIFontTextStyleBody (Parrafos)</li>
<li>UIFontTextStyleCaption1 </li>
<li>UIFontTextStyleCaption2 </li>
<li>UIFontTextStyleFootnote</li>
</ul>

<p>Al usar estos componentes como nuestras fuentes aumentara y disminuirá el tamaño según la configuración que el usuario final tenga en su dispositivo. La forma de agregar estos atributos a un campo de texto es la siguiente:</p>

<pre>UIFontDescriptor *body = [UIFontDescriptor
preferredFontDescriptorWithTextStyle:UIFontTextStyleBody];
￼

UIFont *fuente = [UIFont fontWithDescriptor:body size:0];
</pre>

<p>En este ejemplo vemos como se crea una fuente utilizando estos atributos que por defecto son para párrafos y contenido.</p>

<p>Llegado a este punto probablemente te estés preguntando cómo ponerle estilo propio a estas fuentes dinámicas. Pues es bastante fácil y lo vamos a ver con un ejemplo sencillo.</p>

<pre>// Primero declaramos nuestro descriptor con la fuente dinámica que prefieran
UIFontDescriptor *baseFont =[UIFontDescriptor preferredFontDescriptorWithTextStyle:UIFontTextStyleBody];

// Luego le agregamos estilo a la fuente (negrita en este caso)
UIFontDescriptor *boldBase = [baseFont fontDescriptorWithSymbolicTraits:UIFontDescriptorTraitBold];

// Creamos nuestra fuente final con size 0 (!importante)
UIFont *labelFont = [UIFont fontWithDescriptor:boldBase size:0];

self.label.font = labelFont;

[self.view setNeedsLayout];
</pre>

<p>En este ejemplo tenemos que destacar un par de novedades importantes, primero nos damos cuento que lo que hacemos es añadirle estilos extra a una fuente dinámica ya existente y segundo y más importante el tamaño de la fuente debe ser <code>0</code> para que este se adapte al sistema.</p>

<p>Luego de asignar nuestra fuente, debemos agregar un observador que escuche la petición del sistema de hacer crecer o decrecer las fuentes de la aplicación. Esto lo pudiéramos hacer en el método <code>viewDidLoad</code> y es algo así:</p>

<pre>- (void)viewDidLoad
{
    [[NSNotificationCenter defaultCenter]
        addObserver:self selector:@selector(contentSizeChanged:)
        name:@"UIContentSizeCategoryDidChangeNotification"
     object:nil];

  }
</pre>

<p>Por último para terminar con este punto veamos donde se cambia la configuración del tamaño de letra en nuestros dispositivos. Tendremos que acceder a <em>Settings > General > Text Size</em> y ahí veremos que tenemos un slider que configuramos a nuestro gusto.</p>

<p><img src="http://i.imgur.com/zqGp7uF.png?1" alt="foto" /></p>

<hr />

<h2>Conclusión.</h2>

<p>En este nueva serie estaremos estudiando los cambios y bondades que nos ofrece Apple con su nuevo sistema operativo iOS 7 a nivel de programación. En este capítulo estuvimos los cambios mas importantes que impactaron en el uso de campos de textos y los beneficios de el nuevo directorio de imágenes incorporado en nuestros proyectos.</p>

<p>Una vez más te recomiendo echarle un vistazo a la serie <a href="http://codehero.co/series/ios-desde-cero/">iOS desde cero</a> y a mantenerte alerta a los nuevos capítulos de esta nueva serie, agradeciendo de antemano todas sus dudas y comentarios en la sección de comentarios.</p>

<p>¡Hasta el próximo capítulo!</p>
