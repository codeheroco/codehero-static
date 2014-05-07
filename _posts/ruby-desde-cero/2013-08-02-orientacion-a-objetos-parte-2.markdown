---
layout: post
status: publish
published: true
title: Orientación a Objetos – Parte 2
author: Ricardo Sampayo
author_login: ricardo
author_email: ricardo9588@gmail.com
author_url: http://www.ricardosampayo.com
date: 2013-08-02 00:01:12.000000000 -04:30
serie: Ruby desde Cero
dificultad: Aprendiz
duracion: 30
description: Ruby desde cero, curso de Orientación a Objetos - Parte 2, Estudiaremos detallando para cada una de ellas la sintaxis y realizaremos una demostración.
categories:
- Cursos
- Ruby
tags:
- Ruby
- Objetos
- Clase
- Herencia
---
<p>Bienvenidos una vez más a Ruby desde Cero. En el capítulo anterior estudiamos la primera parte del paradigma orientado a objetos aplicado al lenguaje.</p>

<p>En este nuevo capítulo veremos un poco más sobre el manejo de clases en Ruby, detallando para cada una de ellas sintaxis y ejemplos sencillos de fácil comprensión. Les recomiendo echar un vistazo a <a href="http://codehero.co/ruby-desde-cero-orientacion-a-objetos-parte-1/">Ruby desde Cero: Orientación a Objetos – Parte 1</a>, ya que, continuaremos con los desarrollando el contenido.</p>

<hr />

<h2>Herencia.</h2>

<p>Es uno de los mecanismos mas utilizados en la programación orientada a objetos que nos facilitan la reutilización y la extensibilidad del código. La herencia es la relación entre una clase general y otra más específica. Por ejemplo: Si declaramos una clase Ave derivada de una clase Animal, todos los métodos y variables asociadas con la clase Animal, serán automáticamente heredados por la subclase Ave. Veamos el siguiente gráfico para comprender mejor esto:</p>

<p><img src="http://i.imgur.com/i4Uhwbg.jpg?1" alt="herencia_ruby" /></p>

<p>Como vemos en el gráfico tenemos cinco componentes que heredan del componente 'Animal', estas subclases heredan todos los atributos y comportamientos del padre, incluso es posible alterarlos o agregarles nuevos atributos. El beneficio de la herencia es que las clases inferiores de la jerarquía obtienen las características de los de arriba, sino que también pueden añadir características específicas propias.</p>

<p>En Ruby, una clase sólo puede heredar de una sola clase padre. Algunos otros idiomas admiten la herencia múltiple, una característica que permite a las clases que hereden características de varias clases, pero Ruby no lo soporta.</p>

<p>La sintaxis para heredar de una clase es la siguiente:</p>

```ruby
class Objeto < Objeto_padre
end
```

<p>Para demostrar observemos el siguiente ejemplo:</p>

```ruby
class Animal
  attr_reader :habitat
  attr_accessor :descripcion
  attr_reader :color                  # variable publica de solo lectura

  def initialize          # este metodo se llama automaticamente al instanciar el objeto
  end

  def respiracion
    puts "Inhala y exhala"
  end

  def color
    @color
  end

  def color=(color)
    @color = color
  end
end

class Reptil < Animal
  def initialize          # este metodo se llama automaticamente al instanciar el objeto
    @habitat = "tierra"
  end
end

class Ave < Animal
  def initialize          # este metodo se llama automaticamente al instanciar el objeto
    @habitat = "Aire"
  end
end

reptil = Reptil.new
reptil.descripcion = "Lagarto"
reptil.color = "verde"

puts "El Animal es un: " + reptil.descripcion + ", color: " + reptil.color + ', habitat natural: ' +reptil.habitat
reptil.respiracion

ave = Ave.new
ave.descripcion = "Buho"
ave.color = "marron"

puts "El Animal es un: " + ave.descripcion + ", color: " + ave.color + ', habitat natural: ' +ave.habitat
ave.respiracion
```

<p>En el ejemplo vemos como se componen tres clases (Animal (padre), Pez y Reptil (Subclases)). Vemos como Pez y Reptil heredan los atributos y comportamientos de la clase padre, por lo tanto desde el punto de vista del programador los Reptiles y Aves tienen una serie de atributos predefinidos (color, hábitat y descripción) y un comportamiento de respiración que simplemente inhala y exhala. Veamos el resultado de esto a continuación:</p>

```sh
El Animal es un: Lagarto, color: verde, habitat natural: tierra
Inhala y exhala
El Animal es un: Buho, color: marron, habitat natural: Aire
Inhala y exhala
```

<p>Con el manejo de herencia surgen una serie de conceptos que hacen del paradigma orientado a objetos una técnica irresistible de usar. Estos conceptos los definimos a continuación:</p>

<h3>Sustitución de métodos (Overriding)</h3>

<p>La programación orientada a objetos existe una característica del lenguaje que permite una una implementación específica de un método que ya está proporcionado por una de sus superclases. Las modificaciones de las subclases reemplazan la implementación de la superclase.</p>



<p>A continuación mostraremos un ejemplo sencillo para entender mejor el concepto:</p>

```ruby
class Principal
  def metodo_prueba
    puts 'Es un metodo de la clase principal'
  end
end

class Subclase_uno < Principal
  def metodo_prueba
    puts 'Se sustituye el metodo principal'
  end
end

class Subclase_dos < Principal
end

principal = Principal.new
principal.metodo_prueba
puts "++++----++++"
secundario = Subclase_uno.new
secundario.metodo_prueba
puts "++++----++++"
tercero = Subclase_dos.new
tercero.metodo_prueba
```

<p>En este ejemplo se puede ver claramente como el objeto denominado 'Subclase_uno' remplaza el método 'metodo_prueba' del padre con otras características y como el objeto 'subclase_dos' simplemente hereda los métodos con el mismo comportamiento. Aquí el resultado de la ejecución del programa:</p>

```sh
Es un metodo de la clase principal
++++----++++
Se sustituye el metodo principal
++++----++++
Es un metodo de la clase principal
```

<h3>Acceder a los métodos de la superclase</h3>

<p>La programación orientada a objetos tiene una característica del lenguaje que permite que un método de una subclase poder tomar el comportamiento de la clase padre, para proporcionar características nuevas a las clases ya definidas en el método de la superclase. Las modificaciones de las subclases agregan nuevos comportamientos al método de la superclase.</p>

<p>Para demostrar esto veremos un ejemplo bastante sencillo, que seguramente nos ayudará a entender mejor este concepto:</p>

```ruby
class Principal
  def metodo_prueba
    puts 'Es un metodo de la clase principal'
  end
end

class Subclase_uno < Principal
  def metodo_prueba
    super()
    puts 'y se le agrega este nuevo comportamiento'
  end
end

principal = Principal.new
principal.metodo_prueba
puts "++++----++++"
secundario = Subclase_uno.new
secundario.metodo_prueba
```

<p>En el ejemplo vemos como la subclase ('Subclase_uno') sustituye el método del padre (metodo_prueba) llamando a su implementación en la clase padre con la función <strong>'super()</strong>' para así agregarle nuevos comportamientos al método. El resultado al ejecutar este pequeño programa es el siguiente:</p>

```sh
Es un metodo de la clase principal
++++----++++
Es un metodo de la clase principal
y se le agrega este nuevo comportamiento
```

<blockquote>
  <p>En conclusión la herencia permite crear una clase que es un perfeccionamiento o especialización de otra clase.</p>
</blockquote>

<hr />

<h2>Sobrecarga de Métodos</h2>

<p>En muchos lenguajes es posible crear dos versiones diferentes de un método con el mismo nombre. Sin embargo, una clase de Ruby sólo puede tener un método con un nombre (Si se definen dos métodos con el mismo nombre Ruby reconoce únicamente el ultimo definido). Una solución para este problema es crear un método único con una lógica para verificar cuantos y que tipos de argumentos hay. Demostremos esto con un ejemplo:</p>

```ruby
class Codehero
  def initialize(*args)
    if args.size > 1
      puts 'No se permiten dos o mas atributos'
    else
      if args.size == 0
        hola_mundo
      else
        hola(args[0])
      end
    end
  end

  def hola_mundo
    puts "Hola CodeHero"
  end

  def hola(name)
    puts "Hola #{name}"
  end
end

ejemplo1 = Codehero.new('Ricardo Sampayo')
ejemplo2 = Codehero.new
ejemplo3 = Codehero.new('Ricardo','Sampayo')
```

<p>En el ejemplo vemos como creamos un único constructor ('initialize') y en éste colocamos una lógica para manejar argumentos, que consiste en: si el constructor recibe más de un argumento imprime un mensaje de error, si no recibe argumentos llama al método 'hola_mundo' y si recibe un argumento llama al método 'hola' con la variable recibida. El resultado de esta ejecución es la siguiente:</p>

```sh
Hola Ricardo Sampayo
Hola CodeHero
No se permiten dos o mas atributos
```

<hr />

<h2>Conclusión</h2>

<p>En este capítulo hemos adquirido herramientas importantes sobre el paradigma orientado a Objetos en Ruby, cómo el uso de herencias y sus conceptos más importantes y la sobrecarga de métodos.</p>

<p>Si te surgen dudas con nuestros cursos, no te detengas y danos tus comentarios, que con gusto estamos dispuestos a resolver tus inquietudes.</p>

<p>¡Hasta el próximo capítulo!</p>
