---
layout: post
status: publish
published: true
title: Orientación a Objetos – Parte 1
author: Ricardo Sampayo
author_login: ricardo
author_email: ricardo9588@gmail.com
author_url: http://www.ricardosampayo.com
date: 2013-07-17 00:01:30.000000000 -04:30
serie: Ruby desde Cero
dificultad: Novato
duracion: 30
description: Ruby desde cero, curso de Orientación a Objetos - Parte 1, Estudiaremos detallando para cada una de ellas la sintaxis y realizaremos una demostración.
categories:
- Cursos
- Ruby
tags:
- Ruby
- Objetos
- desde cero
---
<p>Bienvenidos una vez más a Ruby desde Cero. Hasta este capítulo hemos aprendido cómo instalar y configurar Ruby en nuestros computadores profundizando nuestros conocimientos acerca del lenguaje.</p>

<p>Para este nuevo capítulo, estaremos estudiando las clases en Ruby, detallando para cada una de ellas la sintaxis y demostración. Les recomiendo seguir la serie desde cero para comprender mejor este capítulo.</p>

<h2>Clases.</h2>

<p>En Ruby como en otros lenguajes que implementan el paradigma orientado a objetos, una clase se puede definir como una plantilla o una serie de instrucciones para crear un objeto. Las clases son creadas pensando en la reutilizaron de código y en las mismas se definen los atributos y el comportamiento que tendrán todos los objetos creados a partir de ella.</p>

<p>Una clase por lo general representa un sustantivo, como un objeto, persona, lugar o cosa dentro de la aplicación. Fundamentalmente, delimita los posibles estados y define el comportamiento del concepto que representa.</p>

<p>Tomemos el ejemplo de un vehículo: Consta de ruedas, la potencia y la capacidad del tanque de combustible; estas características forman los atributos del objeto vehículo. Se puede diferenciar un vehículo de la otra con la ayuda de estas características.</p>

<p>Un vehículo puede tener ciertas funciones o procedimientos a los que llamamos comportamiento, como la detención, la conducción y exceso de velocidad.</p>

<p>Un ejemplo de como se definiría la clase vehículo en Ruby es la siguiente:</p>

```ruby
class Vehiculo
  @numero_de_ruedas
  @caballos_de_fuerza
  @tipo_de_tanque
  @capacidad

  def exceso_velocidad
  end

  def manejar
  end

  def detenerse
  end
end
```

<p>Para comprender mejor las clases vamos a definir una a una sus características.</p>

<h3>Instancia</h3>

<p>Una instancia de un objeto en Ruby es la creación del mismo partiendo de una clase, cabe destacar que estos objetos son completamente independientes y pueden tener comportamientos y variables distintos entre ellos.</p>

<p>Un ejemplo de como se instancian los objetos en Ruby es el siguiente:</p>

```ruby
class Vehiculo
  def detenerse
    "frenando . . ."
  end
end

automovil = Vehiculo.new
puts "El vehiculo esta " + automovil.detenerse

camion = Vehiculo.new
puts "El camion esta " + camion.detenerse

moto = Vehiculo.new
puts "La moto esta " + moto.detenerse
```

<p>En el ejemplo se define una clase "vehiculo" bastante sencilla con un método único para detenerlo. Se crean tres objetos de tipo vehículo completamente diferentes pero con el mismo comportamiento. El resultado del ejemplo es el siguiente:</p>

```ruby
El vehiculo esta frenando . . .
El camion esta frenando . . .
La moto esta frenando . . .
```

<h3>Atributos</h3>

<p>Los atributos en una clases son las características que definen el objeto, en el caso del vehículo los atributos pueden ser cantidad de ruedas, caballos de fuerza, cantidad de gasolina, etc. Las clases no tienen limites de atributos, así que no sean tímidos con los atributos.</p>

<p>Para mostrar estos ejemplos utilizaremos algunos de los tipos de variables que estudiamos en el <a href="http://codehero.co/ruby-desde-cero-variables-y-objetos-2/">Capítulo 2: Variables y Objetos</a>.</p>

{% include middle-post-ad.html %}

```ruby
class Vehiculo
  def numero_ruedas
    @numero_ruedas
  end

  def numero_ruedas=(numero)
    @numero_ruedas = numero
  end
end

automovil = Vehiculo.new
automovil.numero_ruedas = 4
puts "El vehiculo tiene " + automovil.numero_ruedas.to_s + " ruedas."

camion = Vehiculo.new
camion.numero_ruedas = 8
puts "El camion tiene " + camion.numero_ruedas.to_s + " ruedas."

moto = Vehiculo.new
moto.numero_ruedas = 2
puts "La moto tiene " + moto.numero_ruedas.to_s + " ruedas."
```

<p>En este ejemplo podemos ver una variable de instancia "numero_ruedas", pero a ésta no se le puede acceder de manera directa, si no, a través de métodos (getter y setters). El resultado de esta ejecución es la siguiente:</p>

```ruby
El vehiculo tiene 4 ruedas.
El camion tiene 8 ruedas.
La moto tiene 2 ruedas.
```

<p>En el siguiente ejemplo veremos cómo se declaran y utilizan las variables públicas o de lectura y escritura únicamente:</p>

```ruby
class Vehiculo
  attr_accessor :marca                # variable publica
  attr_reader :color                  # variable publica de solo lectura
  attr_writer :velocidad_max          # variable publica de solo escritura

  def velocidad_max           # sin este metodo no se puede leer
                              # el color fuera de la clase
    @velocidad_max
  end

  def preparar_variables  # este metodo escribe las variabbles de solo lectura
    @color = "Amarillo"
  end

  def numero_ruedas
    @numero_ruedas
  end

  def numero_ruedas=(numero)
    @numero_ruedas = numero
  end
end

automovil = Vehiculo.new
automovil.numero_ruedas = 4
automovil.velocidad_max = "180 km"
automovil.marca = "Nissan"
automovil.preparar_variables
puts "El vehiculo tiene " + automovil.numero_ruedas.to_s + " ruedas."
puts "velocidad max: " + automovil.velocidad_max + " marca: " + automovil.marca
puts "color: " + automovil.color

camion = Vehiculo.new
camion.numero_ruedas = 8
camion.velocidad_max = "120 km"
camion.marca = "Toyota"
camion.preparar_variables
puts "El camion tiene " + camion.numero_ruedas.to_s + " ruedas."
puts "velocidad max: " + camion.velocidad_max + " marca: " + camion.marca
puts "color: " + camion.color
```

<p>En el ejemplo vemos cómo 'marca' es una variable pública, 'color' y 'velocidad_max' son sólo de lectura y escritura respectivamente. Al ejecutar el ejemplo tenemos como resultado lo siguiente:</p>

```ruby
El vehiculo tiene 4 ruedas.
velocidad max: 180 km marca: Nissan
color: Amarillo

El camion tiene 8 ruedas.
velocidad max: 120 km marca: Toyota
color: Amarillo
```

<h3>Inicializar</h3>

<p>Este método se ejecuta automáticamente cuando se instancia la clase del objeto sin necesidad de llamarlo. Para demostrarlo modificaremos un poco el método anterior de la siguiente manera:</p>

```ruby
class Vehiculo
  attr_accessor :marca                # variable publica
  attr_reader :color                  # variable publica de solo lectura
  attr_writer :velocidad_max          # variable publica de solo escritura

  def initialize          # este método se llama automáticamente al instanciar el objeto
    @color = "Amarillo"
  end

  def velocidad_max           # sin este método no se puede leer
                              # el color fuera de la clase
    @velocidad_max
  end

  def numero_ruedas
    @numero_ruedas
  end

  def numero_ruedas=(numero)
    @numero_ruedas = numero
  end
end

automovil = Vehiculo.new
automovil.numero_ruedas = 4
automovil.velocidad_max = "180 km"
automovil.marca = "Nissan"

puts "El vehiculo tiene " + automovil.numero_ruedas.to_s + " ruedas."
puts "velocidad max: " + automovil.velocidad_max + " marca: " + automovil.marca
puts "color: " + automovil.color

camion = Vehiculo.new
camion.numero_ruedas = 8
camion.velocidad_max = "120 km"
camion.marca = "Toyota"

puts "El camion tiene " + camion.numero_ruedas.to_s + " ruedas."
puts "velocidad max: " + camion.velocidad_max + " marca: " + camion.marca
puts "color: " + camion.color
```

<p>Como ven en este objeto se eliminó el método 'preparar_variables' y se agregó el método 'initialize' que se llama automáticamente luego de instanciar el objeto. El resultado de este ejemplo es exactamente igual al primero.</p>

<h3>Métodos</h3>

<p>Los métodos en una clases son las que definen el comportamiento del objeto, en el caso del vehículo los métodos pueden ser cantidad de vehículos instanciados, modificar o consultar algún atributo, etc. En los ejemplos anteriores ya hicimos uso de métodos de clases para consultar y modificar los atributos de la clase.</p>

<p>En el ejemplo aprenderemos a crear métodos estáticos, que se pueden llamar sin instanciar la clase, y a usar por primera vez en el curso las variables de clase:</p>

```ruby
class Vehiculo
  attr_accessor :marca                # variable publica
  attr_reader :color                  # variable publica de solo lectura
  attr_writer :velocidad_max          # variable publica de solo escritura

  @@cantidad_de_vehiculos_instanciados = 0

  def initialize          # este metodo se llama automaticamente al instanciar el objeto
    @color = "Amarillo"
    @@cantidad_de_vehiculos_instanciados +=1
  end

  def velocidad_max           # sin este metodo no se puede leer
                              # el color fuera de la clase
    @velocidad_max
  end

  def numero_ruedas
    @numero_ruedas
  end

  def numero_ruedas=(numero)
    @numero_ruedas = numero
  end

  def self.numero_vehiculos_instanciados
    @@cantidad_de_vehiculos_instanciados
  end
end

automovil = Vehiculo.new
automovil.numero_ruedas = 4
automovil.velocidad_max = "180 km"
automovil.marca = "Nissan"

puts "El vehiculo tiene " + automovil.numero_ruedas.to_s + " ruedas."
puts "velocidad max: " + automovil.velocidad_max + " marca: " + automovil.marca
puts "color: " + automovil.color

camion = Vehiculo.new
camion.numero_ruedas = 8
camion.velocidad_max = "120 km"
camion.marca = "Toyota"

puts "El camion tiene " + camion.numero_ruedas.to_s + " ruedas."
puts "velocidad max: " + camion.velocidad_max + " marca: " + camion.marca
puts "color: " + camion.color

puts "cantidad de vehiculos intanciados: " + Vehiculo.numero_vehiculos_instanciados.to_s
```

<p>En el ejemplo vemos como se declaran las variables estáticas ('self.numero_vehiculos_instanciados') es importante destacar que no hace falta inicializar el objeto para llamar al método y el uso de las variables de clase, para este caso la utilizamos para que sume la cantidad de vehículos creados a partir de la clase 'Vehiculo'. El resultado del ejemplo es el siguiente:</p>

```ruby
El vehiculo tiene 4 ruedas.
velocidad max: 180 km marca: Nissan
color: Amarillo

El camion tiene 8 ruedas.
velocidad max: 120 km marca: Toyota
color: Amarillo

cantidad de vehiculos intanciados: 2
```

<h2>Conclusión</h2>

<p>En este capítulo hemos adquirido herramientas importantes sobre las clases en Ruby, cómo realizar instancias de clases y a manipular los objetos generados a través de las clases.</p>

<p>Aún nos falta un poco para completar este tema de las clases, para el próximo capítulo estaremos estudiando las herencias entre clases.</p>

<p>Si te surgen dudas con nuestros cursos, no te detengas y danos tus comentarios, que con gusto estamos dispuestos a resolver tus inquietudes.</p>

<p>¡Hasta el próximo capítulo!</p>
