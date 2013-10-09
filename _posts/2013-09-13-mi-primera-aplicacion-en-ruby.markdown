---
layout: post
status: publish
published: true
title: Mi primera aplicación en Ruby
author: Ricardo Sampayo
author_login: ricardo
author_email: ricardo9588@gmail.com
author_url: http://www.ricardosampayo.com
wordpress_id: 2230
wordpress_url: http://codehero.co/?p=2230
date: 2013-09-13 00:01:40.000000000 -04:30
categories:
- Cursos
- Ruby
tags:
- Ruby
- Cursos
- Aplicación
comments: []
---
<p>Bienvenidos una vez más a Ruby desde cero, curso con el cual aprendemos del lenguaje sin necesidad de tener previo conocimiento en el tema. Hasta este capítulo ya abarcamos todos los puntos del curso, lo que nos hace héroes en Ruby desde Cero.</p>

<p>Para finalizar con este curso desarrollaremos una pequeña aplicación en la que tocaremos muchos de los conceptos vistos en la serie. La aplicación consiste en una simple lista de estudiantes donde tendremos funcionalidad de agregar, buscar, listar y ordenar a los estudiantes guardados en un archivo plano.</p>

<blockquote>
  <p>NOTA: En las líneas de código se omitirán los acentos.</p>
</blockquote>

<hr />

<h2>Estructura principal</h2>

<p>Para empezar con nuestro proyecto final prepararemos la estructura de nuestro proyecto empezando con un archivo que inicia el sistema (la llamaremos <strong>init.rb</strong>), un controlador (llamado <strong>controlador.rb</strong>) dentro de un directorio (<strong>lib</strong>) y nuestro archivo de texto plano (<strong>estudiantes.txt</strong>), el cual funcionará como base de datos. Empecemos con el código de <code>init.rb</code>:</p>

<pre>## Declaramos la ruta del proyecto 
APP_ROOT = File.dirname(__FILE__)

# Agregamos la ruta del directorio lib a nuestro proyecto para despreocuparnos
# al agregarla en todo momento
# File.join(APP_ROOT, 'lib') =>  APP_ROOT/lib
$:.unshift( File.join(APP_ROOT, 'lib') )

# Le decimos a Ruby que vamos a utilizar el controlador
require 'controlador'

# Inicializamos nuestro controlador 
controlador = Controlador.new('estudiantes.txt')

# Disparamos nuestro proceso principal
controlador.launch!

</pre>

<p>Luego configuramos nuestra clase controlador, que tendrá el constructor de la clase, un par de métodos para el encabezado y pie del sistema y por último el método que dispara los eventos del sistema.</p>

<pre>class Controlador
  
  # constructor de la clase. En esta verificaremos 
  # si existe el archivo plano con los estudiantes 
  # y si no creamos uno nuevo
  def initialize(path=nil)

  end

 # launch! este metodo tiene un loop que va a recibir las acciones 
 # que tendra la aplicacion para procesarlas,
 # llama al encabezado y pie de aplicacion al principio y al final
  def launch!
    introduction
    
    conclusion
  end
  
  # Encabezado de la aplicacion
  def introduction
    puts "#" * 60
    puts "\n\n--- Bienvenido a al tutorial de CODEHERO ---\n"
    puts "Este ejemplo pertenece a la serie Ruby desde Cero.\n\n"
  end

  # Pie de la aplicacion
  def conclusion
    puts "#" * 60
    puts "\n\n--- Bienvenido a al tutorial de CODEHERO ---\n\n"
    puts "Este ejemplo pertenece a la serie Ruby desde Cero.\n\n"
  end
          
end
</pre>

<p>Hasta este momento ya utilizamos algunos conceptos estudiados en el curso como manejo de directorios, clases y objetos. Al ejecutar nuestra aplicación, así como la tenemos, tendremos lo siguiente:</p>

<pre>############################################################


--- Bienvenido a al tutorial de CODEHERO ---
Este ejemplo pertenece a la serie Ruby desde Cero.


--- Hasta luego y recuerda visitarnos en www.CodeHero.co! ---


############################################################
</pre>

<hr />

<h2>Lógica y modelos de la aplicación</h2>

<p>Esta etapa es de las más importante de nuestra aplicación, crearemos una nueva clase modelo ("<strong>estudiante.rb</strong>") donde tendremos toda la lógica correspondiente al estudiante y editaremos brevemente nuestro controlador para que el sistema funcione bien. Empecemos con el modelo:</p>

<pre>class Estudiante

  # Variable de clases con la direccion del archivo plano
  @@filepath = nil
  def self.filepath=(path=nil)
    @@filepath = File.join(APP_ROOT, path)
  end
  
  attr_accessor :nombre, :identificador, :fecha_nacimiento
  
  # Verificamos que el archivo exista
  def self.existe_archivo?
    if @@filepath && File.exists?(@@filepath)
      return true
    else
      return false
    end
  end
  
  # Validamos que el archivo exista, sea legible y modificable
  def self.validar_archivo?
    return false unless @@filepath
    return false unless File.exists?(@@filepath)
    return false unless File.readable?(@@filepath)
    return false unless File.writable?(@@filepath)
    return true
  end
  
  # Crea un archivo con permisos de escritura
  def self.crear_archivo
    File.open(@@filepath, 'w') unless existe_archivo?
    return validar_archivo?
  end
  
  # Recorremos el archivo plano y retornamos un arreglo con los 
  # objetos estudiantes que esten en el
  def self.restaurantes_guardados
  
    estudiantes = []
    if validar_archivo?
      file = File.new(@@filepath, 'r')
      file.each_line do |line|
        estudiantes &lt;&lt; Estudiante.new.importar_linea(line.chomp)
      end
      file.close
    end
    return estudiantes

  end
  
  # Constructor de la aplicacion, recibe los datos introducidos 
  # desde la aplicacion
  def initialize(args={})
    @nombre           = args[:nombre]    || ""
    @identificador    = args[:identificador] || ""
    @fecha_nacimiento = args[:fecha_nacimiento]   || ""
  end
  
  # Guarda el archivo el estudiante en el archivo plano
  def guardar
    return false unless Estudiante.validar_archivo?
    File.open(@@filepath, 'a') do |file|
      file.puts "#{[@nombre, @identificador, @fecha_nacimiento].join("\t")}\n"
    end
    return true
  end
  
end
</pre>

<p>Una vez tenemos nuestro modelo <strong>Estudiante</strong> con la funcionalidad de agregar y listar sus objetos y todas las funciones que verifican el archivo, plano donde vamos almacenar la información, modificamos nuestro controlador para agregarle funcionalidad <code>launch!</code> y empiece a tomar color nuestra aplicación.</p>

<pre># launch! este metodo tiene un loop que va a recibir las acciones 
 # que tendra la aplicacion para procesarlas
 # llama al encabezado y pie de aplicacion al principio y al final
  def launch!
    introduction
    
    result = nil
    until result == :quit
      action, args = acciones
      result = hacer_accion(action, args)
    end
        conclusion
  end
  
  # Nos da las acciones que vamos a utilizar en nuestro proyecto
  # y nos prepara el sistema para recibir las acciones por el usuario
  def acciones
    action = nil
    
    puts "Acciones: " + ['listar', 'buscar', 'agregar', 'salir'].join(", ")
    print "> "
    user_response = gets.chomp
    args = user_response.downcase.strip.split(' ')
    action = args.shift
 
    return action, args
  end
  
  # Recibe la accion que se solicito por pantalla y
  # se llama a las funciones que cumplan los requisitos del usuario
  def hacer_accion(action, args=[])
    case action
    when 'listar'
      puts "listamos a los estudiantes"
    when 'buscar'
      puts "Buscamos por palabra clave"
    when 'agregar'
      puts "Agregamos un estudiante"
    when 'salir'
      return :quit
    else
      puts "\nel comando no es valido\n"
    end
  end
</pre>

<p>Una vez modificadas estas clases con unos ajustes extras, que podrán ver en nuestro repositorio establecido para el proyecto, tendremos el siguiente resultado.</p>

<pre>############################################################


--- Bienvenido a al tutorial de CODEHERO ---
Este ejemplo pertenece a la serie Ruby desde Cero.

Acciones: listar, buscar, agregar, salir
> listar
listamos a los estudiantes

Acciones: listar, buscar, agregar, salir
> buscar 
Buscamos por palabra clave

Acciones: listar, buscar, agregar, salir
> agregar
Agregamos un estudiante

Acciones: listar, buscar, agregar, salir
> CodeHero

El comando no es valido

Acciones: listar, buscar, agregar, salir
> salir

--- Hasta luego y recuerda visitarnos en www.CodeHero.co! ---


############################################################
</pre>

<p>Por último, le agregamos a nuestro controlador las acciones del proyecto (agregar, listar y buscar) que llaman a funciones dentro del modelo Estudiante, veamos estos métodos:</p>

<pre># trae todos los estudiantes que esten en la base de datos
 def listar(args=[])
    
    puts "Listando usuarios"
    estudiantes = Estudiante.restaurantes_guardados
        prepara_tabla(estudiantes)
    puts "Ordena escribiendo: 'listar nombre' o 'listar por identificador'\n\n"
  end
  
  # primero consulta todos los estudiantes del archivo de texto
  # luego busca que en alguno de sus atributos tenga la palabra clave 
  # que se esta buscando.
  def buscar(keyword="")
    puts "Buscar usaurio"
    if keyword
      estudiantes = Estudiante.restaurantes_guardados
      found = estudiantes.select do |estd|
        estd.nombre.downcase.include?(keyword.downcase) || 
        estd.identificador.downcase.include?(keyword.downcase) || 
        estd.fecha_nacimiento.downcase.include?(keyword.downcase)
      end
      prepara_tabla(found)
    else
      puts "Examples: 'buscar Ricardo', 'buscar 12345', 'buscar sampayo'\n\n"
    end
  end
  
  # Crea la estructura para recibir los datos en una especie de formulario
  # los recibe crea un objeto Estudiante y lo guarda en el archivo
  def agregar
    puts "Agregar estudiante"
        args = {}
    print "Nombre del estudiante: "
    args[:nombre] = gets.chomp.strip

    print "identificador: "
    args[:identificador] = gets.chomp.strip
    
    print "fecha de nacimiento: "
    args[:fecha_nacimiento] = gets.chomp.strip
    
    estudiante = Estudiante.new(args)
    
    if estudiante.guardar
      puts "\nBien! Se agrego el usuario\n\n"
    else
      puts "\nError: No se agrego el usuario\n\n"
    end
  end
</pre>

<hr />

<h2>Utilizando módulos</h2>

<p>En este caso utilizaremos módulos para agregarle una funcionalidad extra a la clase <code>String</code> que nos edite nuestra cadena de caracteres para que cada palabra empiece en mayúscula. La clase para esto es la siguiente:</p>

<pre>class String
  
  def titleize
    self.split(' ').collect {|word| word.capitalize}.join(" ")
  end
  
end

</pre>

<p>El método donde hacemos uso del módulo anterior para imprimir el nombre de los usuarios, es el siguiente:</p>

<pre>def prepara_tabla(estudiantes=[])
   print " " + "Identificador".ljust(30)
   print " " + "Nombre".ljust(20)
   print " " + "Fecha".rjust(6) + "\n"
   puts "-" * 60
   estudiantes.each do |rest|
     line =  " " &lt;&lt; rest.identificador.ljust(30)
     line &lt;&lt; " " + rest.nombre.titleize.ljust(20)
     line &lt;&lt; " " + rest.fecha_nacimiento.rjust(6)
     puts line
   end
   puts "No hay estudiantes" if estudiantes.empty?
   puts "-" * 60
end
</pre>

<hr />

<h2>Conclusión</h2>

<p>En este último capítulo vimos cómo crear una aplicación sencilla en Ruby para listar y agregar estudiantes a una lista escolar. Este capítulo tiene grandes bloques de código donde se explica en cada uno de los comentarios la funcionalidad del código. Te invito a que te descargues el código de nuestro repositorio de <a href="https://github.com/codeheroco/ruby_proyecto_final">GitHub</a> para que pruebes el proyecto y estoy seguro que entenderás mucho mejor este capítulo.</p>

<p>Felicidades por lograr el nivel máximo en nuestra serie Ruby desde cero y te recomiendo que no te quedes solo con la teoría que aquí te damos, si no, que sigas practicando y te volverás un verdadero héroe en este lenguaje.</p>

<p>Te recordamos que Ruby es un lenguaje de programación potente y flexible que te recomiendo siempre tener en cuenta a la hora de cualquier desarrollo por sus características, orden, facilidad de aprendizaje y comprensión del código.</p>

<p>También te recomiendo si quieres seguir con este lenguaje le eches un vistazo a nuestra serie <a href="http://codehero.co/series/ruby-on-rails-desde-cero/">Ruby on Rails desde cero</a>, para aprender del famoso Ruby on Rails, framework de desarrollo web de código abierto, siguiendo el paradigma de la arquitectura Modelo Vista Controlador (MVC), el cual permite un desarrollo más eficiente, desacoplado y sostenible de las aplicaciones.</p>

<p>¡Hasta el próximo capítulo!</p>
