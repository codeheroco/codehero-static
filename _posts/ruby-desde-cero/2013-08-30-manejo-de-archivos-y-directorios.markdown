---
layout: post
status: publish
published: true
title: Manejo de Archivos y Directorios
author: Ricardo Sampayo
author_login: ricardo
author_email: ricardo9588@gmail.com
author_url: http://www.ricardosampayo.com
date: 2013-08-30 00:01:41.000000000 -04:30
serie: Ruby desde Cero
dificultad: Intermedio
duracion: 30
description: Nuevo curso de Ruby desde cero esta vez aprenderemos a manejar archivos y directorios.
categories:
- Cursos
- Ruby
tags:
- Ruby
- Archivos
- Directorios
---
<p>Bienvenidos una vez más a Ruby desde cero, curso con el cual aprendemos del lenguaje sin necesidad de tener previo conocimiento en el tema. En el capítulo anterior estuvimos estudiando el concepto de módulos aplicado al lenguaje. En este nuevo capítulo estaremos estudiando el manejo de archivos en Ruby, desde como abrirlo hasta como escribir y leer información del mismo.</p>

<hr />

<h2>Rutas y Directorios</h2>

<p>La rutas son las direcciones que nos indican cómo llegar a un archivo o directorio en el sistema. Para este capítulo aprenderemos una serie de conceptos básicos para manejarnos entre directorios con Ruby.</p>

<p>A continuación estudiaremos una serie de comandos básicos para el manejo de rutas y directorios con Ruby.</p>

<h3>Ruta actual <code>pwd()</code></h3>

<p>Para los que están familiarizados con comandos SHELL, seguramente reconocerán este método. <code>pwd</code> simplemente nos da la ruta del directorio actual donde estemos trabajando, aunque este concepto es bastante sencillo. Veamos un ejemplo para comprender mejor el concepto de ruta actual.</p>

```sh
$ irb
>> Dir.pwd
   "/Users/ricardosampayo/Desktop"
```

<p>Como ven el método <code>pwd</code> de la clase <strong>Dir</strong> nos da la información de la ruta actual donde se ejecute ese comando. En el caso del ejemplo está ubicado en mi escritorio.</p>

<h3>Cambiar de Directorio <code>chdir()</code></h3>

<p><code>chdir</code> simplemente nos permite movernos a un directorio siempre y cuando sepamos la ruta. Este método es similar al <code>cd</code> en SHELL. Veamos un ejemplo:</p>

> Todos los ejemplos utilizados en este curso son mediante el [REPL](http://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) `irb` o `pry`.

```ruby
>> Dir.pwd              #ruta actual
   "/Users/ricardosampayo/Desktop"
#nos cambiamos al directorio test dentro del directorio actual
>> Dir.chdir "test"
   0
>> Dir.pwd              #nueva ruta actual
   "/Users/ricardosampayo/Desktop/test"
```

```ruby
>> Dir.pwd              #ruta actual
   "/Users/ricardosampayo"
# nos cambiamos a la carptea test utilizando la ruta absoluta
>> Dir.chdir "/Users/ricardosampayo/Desktop/test"
   0
>> Dir.pwd              #nueva ruta actual
   "/Users/ricardosampayo/Desktop/test"
```

<p>Como pueden ver en los ejemplos, es posible cambiarnos de directorio utilizando tanto la ruta relativa como absoluta del sistema.</p>

<h3>Buscar en un directorio <code>glob()</code></h3>

<p><code>glob</code> nos permite buscar archivos dentro del directorio de trabajo. Veamos un ejemplo para probar este método:</p>

```ruby
>> Dir.glob "*.rb"          # Consultamos todos los archivos con extensión rb
   ["codeheroRuby.rb", "codeheroRubyClases.rb", "modulo_ruby.rb"]
```

<p>Como vemos en el ejemplo podemos utilizar un asterisco ** ( * ) ** como un comodín para buscar cualquier coincidencia, por eso en este caso nos lista todos los archivos que terminen en <strong>.rb</strong>, si colocáramos ** Dir.glob "*" ** nos listaría todos los archivos dentro del directorio que estemos manejando.</p>

<h3>Crear nuevos directorios <code>mkdir()</code></h3>

<p>Al igual que en sistemas operativos basados en Unix <code>mkdir</code> nos crea nuevos directorios o carpetas. Este método recibe como variable la ruta y el nombre de la nueva carpeta que estamos creando, veamos el siguiente ejemplo:</p>

```ruby
# consultamos la carpeta
>> Dir.glob "*"
   []
# creamos la nueva carpeta, no colocamos ruta por lo tanto
# se crea en la carpeta donde estemos trabajando
>> Dir.mkdir "test"
   0
# consultamos nuevamente la dirección para verificar que efectivamente
# creamos una nueva carpeta o directorio
>> Dir.glob "*"
   ["test"]
```

<hr />

<h2>Archivos</h2>

<p>Una vez entendamos cómo manipular los directorios nos vamos a la gestión de archivos. En esta parte del capítulo aprenderemos todo lo relacionado con el manejo de archivos.</p>

<h3>¿Cómo crear un archivo?</h3>

<p>Para abrir un archivo simplemente debemos crear un objeto de la clase <strong>File</strong> (<code>File.new()</code>) o utilizar el método estático open (<code>File.open()</code>) y esto nos devolverá un objeto de tipo File al que podremos manipular.</p>

<p>Para acceder a los archivos debemos pasarle un segundo valor por parámetros que nos indica como vamos abrir el archivo. Veamos los parámetros para abrir y crear un archivo:</p>



<ul>
<li><strong>r</strong>: (sólo lectura) <strong>Modo por defecto</strong>.</li>
<li><strong>r+</strong>: (lectura y escritura) Comienza la escritura al principio del archivo.</li>
<li><strong>w</strong>: (sólo escritura) Borra el contenido del archivo o crea un nuevo archivo para escritura.</li>
<li><strong>w+</strong>: (lectura y escritura) Borra el contenido del archivo o crea un nuevo archivo para lectura y escritura. </li>
<li><strong>a</strong>: (sólo escritura) Comienza la escritura al final del archivo si existe y si no crea uno nuevo.</li>
<li><strong>a+</strong>: (lectura y escritura) permite leer y escribir ubicando el cursor al final del archivo si éste existe y si no crea uno nuevo.</li>
</ul>

<p>Veamos ejemplos de cómo crear y obtener un archivo:</p>

```ruby
#consultamos el directorio donde estamos trabajando
>> Dir.glob "*"
   ["test"]
#creamos y obtenemos un archivo nuevo
>> archivo =File.new("pruebaCodeHero.txt","w")
   File:pruebaCodeHero.txt
#intentamos crear un archivo pasándole por parámetro solo lectura
>> archivo =File.new("pruebaCodeHeroError.txt","r")
   Errno::ENOENT: No such file or directory - pruebaCodeHeroError.txt
# consultamos nuevamente la carpeta
>> Dir.glob "*"
   ["pruebaCodeHero.txt", "test"]
```

<p>Como vemos en el ejemplo es importante el uso de los parámetros que nos dan los permisos para manejar los archivos. En el ejemplo vemos claramente cómo intentamos crear un archivo otorgándole permisos únicamente de lectura y éste nos da un error ya que el archivo no existe y no tiene permisos de crear uno nuevo.</p>

<h3>¿Cómo leer un archivo?</h3>

<p>En Ruby el comando para leer un archivo es <code>read()</code>.</p>

```ruby
Es importante tener en cuenta que las cadenas de caracteres(strings) de Ruby pueden     tener datos binarios y no sólo de texto.
```

<p>Veamos un ejemplo simple para ver cómo funciona bien esto. En el ejemplo preparamos un archivo de texto con dos lineas escritas.</p>

```ruby
#tomamos el archivo (ya estaba creado con las dos lineas escritas)
>> archivo =File.new("pruebaCodeHero.txt","r")
   File:pruebaCodeHero.txt
#leemos el archivo
>> archivo.read
   "Esto es Codehero\nLa mejor herramienta para aprender a programar en espaniol"
```

<p>Como vemos el <code>read()</code> nos da la lectura completa del archivo pero, ¿qué pasa si necesitamos más, Si necesitamos leer línea por línea?. En Ruby disponemos de una serie de métodos que nos hacen la vida fácil para leer los archivos.</p>

<ul>
<li><code>rewind</code> - Nos regresa a la primera línea del archivo </li>
<li><code>readline</code> - Nos lee una línea y nos ubica en la siguiente línea </li>
<li><code>readlines</code> - Nos da un arreglo de las líneas que tenemos por delante en el archivo y nos ubica al final.</li>
<li><code>lineno</code> - Nos da la línea donde estamos ubicados.</li>
</ul>

<p>Veamos estos métodos aplicados a nuestro ejemplo anterior:</p>

```ruby
#tomamos el archivo (ya estaba creado con las dos lineas escritas)
>> archivo =File.new("pruebaCodeHero.txt","r")
   File:pruebaCodeHero.txt
#leemos la primera linea
>> archivo.readline
  "Esto es Codehero\n"
#leemos la segunda linea
>> archivo.readline
   "La mejor herramienta para aprender a programar en espaniol"
#en que linea estamos?
>> archivo.lineno
   2
#pedimos una tercera linea (obviamente error)
>> archivo.readline
   EOFError: end of file reached
#regresamos al principio
>> archivo.rewind
   0
#pedimos todas las lineas en un array
>> archivo.readlines
   ["Esto es Codehero\n", "La mejor herramienta para aprender a programar en espaniol"]
```

```ruby
En Ruby una vez hayamos leído una línea no la veremos más a menos que regresemos en el archivo.
```

<h3>¿Cómo escribir un archivo?</h3>

<p>En Ruby para escribir información en un archivo usamos el método <code>write()</code> o <code>puts()</code>. La principal diferencia es que puts añade un salto de línea luego de escribirla y write no.</p>

<p>Vemos un ejemplo de cómo escribir en nuestro archivo</p>

```ruby
#tomamos el archivo (al colocar w+ lo limpia)
>> archivo =File.new("pruebaCodeHero.txt","w+")
   File:pruebaCodeHero.txt
#escribimos con un salto de linea al final
>> archivo.puts "Codehero"
   nil
#escribimos
>> archivo.write "los mejores cursos"
   18
#escribimos con un salto de linea al final
>> archivo.puts " en espaniol"
   nil
#escribimos
>> archivo.write "por Ricardo Sampayo"
   19
#regresamos al comienzo de la linea
>> archivo.rewind
   0
#imprimimos un arras con las lineas dentro del archivo
>> archivo.readlines
   ["Codehero\n", "los mejores cursos en espaniol\n", "por Ricardo Sampayo"]
```

<h3>¿Cómo eliminar y renombrar un archivo?</h3>

<p>En Ruby podemos remover un archivo usando el método <code>delete(nombre)</code> y renombrarlo con el método <code>rename(nombre_viejo, nombre_nuevo)</code>, Veamos un ejemplo de esto</p>

```ruby
#consultamos el directorio
>> Dir.glob "*"
   ["pruebaCodeHero.txt", "test"]
#renombramos el archivo
>> File.rename("pruebaCodeHero.txt","listoParaBorrar.txt")
   0
#consultamos nuevamente el directorio para ver los cambios
>> Dir.glob "*"
   ["listoParaBorrar.txt", "test"]
#borramos el archivo
>> File.delete("listoParaBorrar.txt")
   1
#consultamos nuevamente el directorio para ver los cambios
>> Dir.glob "*"
   ["test"]
```

<hr />

<h2>Conclusión</h2>

<p>En este capítulo aprendimos todo lo relacionado con el manejo de archivos y directorios en Ruby, funciones básicas como abrirlos, leerlos, editarlos y eliminarlos.</p>

<p>Si te surgen dudas con nuestros cursos, no te detengas y danos tus comentarios, que con gusto estamos dispuestos a resolver tus inquietudes.</p>

<p>¡Hasta el próximo capítulo!</p>
