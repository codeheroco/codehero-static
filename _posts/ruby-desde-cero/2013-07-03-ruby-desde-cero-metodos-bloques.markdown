---
layout: post
status: publish
published: true
title: Métodos & bloques
author: Ricardo Sampayo
author_login: ricardo
author_email: ricardo9588@gmail.com
author_url: http://www.ricardosampayo.com
date: 2013-07-03 00:00:02.000000000 -04:30
serie: Ruby desde Cero
dificultad: Novato
duracion: 20
description: Ruby desde cero, cursos de los métodos y bloques de Ruby, Detallando para cada una de ellas la sintaxis y demostración.
categories:
- Cursos
- Ruby
tags:
- Ruby
- desde cero
- metodos
- bloques
---
<p>Bienvenidos una vez más a Ruby desde Cero. Hasta este capítulo hemos aprendido como instalar, configurar Ruby en nuestros computadores y conocimos un poco las variables, objetos y estructuras de control principales del sistema.</p>

<p>Para este nuevo capítulo, estaremos estudiando los métodos y bloques de lenguaje, Detallando para cada una de ellas la sintaxis y demostración.</p>

<hr />

<h2>Métodos</h2>

<p>Los métodos en Ruby son muy similares a las funciones en otros lenguajes de programación. Son utilizados para agrupar una o mas instrucciones, para ser reutilizadas a los largo del programa con una sola instrucción.</p>

<p>Los nombres de los métodos deben comenzar con letra minúscula, para que el lenguaje no lo confunda con una constante y deben ser definidos antes de su invocación para evitar excepciones.</p>

<p>Primero antes de empezar con los ejemplos conoceremos la sintaxis de los métodos:</p>

```ruby
def nombre_del_metodo
  codigo...
end
```

<p>A continuación ejemplo de métodos sencillos para familiarizarnos con la sintaxis:</p>

```ruby
def bienvenido                      #imprime saludo de bienvenida
  puts "Hola CodeHero"
end

def sumatoria                       #método que imprime una suma entre dos números
  puts 2 + 3
end

def es_verdadero?                   #método que imprime una variable Booleana
  valor = 3
  if valor > 5
    puts "verdadero"
  else
    puts "falso"
  end
end

def palabra_mas_larga               #Imprime la palabra mas larga de un arreglo
  frutas = ["fresa", "pera", "manzana","kiwi"]
  palabra_larga = frutas.inject do |fruta1, fruta2|
    fruta1.length > fruta2.length ? fruta1 : fruta2
  end
  puts palabra_larga
end

#Llamadas a los métodos:
bienvenido
sumatoria
es_verdadero?
palabra_mas_larga
```

<p>En el ejemplo vimos como se declaran 5 métodos con procedimientos diferentes y las llamadas a ellos una vez declarados los métodos. dando como resultado lo siguiente:</p>

```ruby
Hola CodeHero   #llamada a bienvenido
5               #llamada a sumatoria
falso           #llamada es_verdadero?
manzana         #llamada a palabra_mas_larga
```

<hr />

<h2>Métodos con argumentos</h2>

<p>Los métodos al igual que otros lenguajes permiten declararse con argumentos para recibir variables y hacer los métodos mas interactivos.</p>

<p>La sintaxis de estos métodos es exactamente igual con la única diferencia que se declaran las variables que reciben a continuación del nombre entre paréntesis (()) y separados por coma de la siguiente manera:</p>

```ruby
def nombre_del_metodo (variable1,variable2, . . .)
  codigo...
end
```

<p>Ó</p>

```ruby
def nombre_del_metodo (variable1 = valor1,variable2 = valor2, . . .)
  codigo...
end
```

<p>Para la demostración modificaremos un poco el ejemplo anterior, agregándole argumentos a alguno de los métodos de la siguiente manera:</p>

```ruby
def bienvenido (nombre)                 #imprime saludo de bienvenida
  puts "Hola #{nombre}"
end

def sumatoria (valor1,valor2 = 3)       #método que imprime una suma entre dos números
  puts valor1 + valor2
end

def es_verdadero? (valor)               #método que imprime una variable Booleana
  if valor > 5
    puts "verdadero"
  else
    puts "falso"
  end
end

def palabra_mas_larga (frutas)          #Imprime la palabra mas larga de un arreglo
  palabra_larga = frutas.inject do |fruta1, fruta2|
    fruta1.length > fruta2.length ? fruta1 : fruta2
  end
  puts palabra_larga
end

#Llamadas a los métodos:
bienvenido ("Ricardo")
bienvenido ("CodeHero")

sumatoria (4)
sumatoria (7)

es_verdadero? (6)
es_verdadero? (2)

palabra_mas_larga (["banana", "naranja", "cereza","durazno"])
```

<p>Arrojando como resultado de las llamada a lo largo del código lo siguiente:</p>

```ruby
Hola Ricardo
Hola CodeHero
7
10
verdadero
falso
durazno
```

<hr />

<h2>Funciones</h2>

<p>Las funciones en Ruby son exactamente iguales que los métodos lo único que estas retornan un objeto. La sintaxis de estos tipos de métodos es la siguiente:</p>

```ruby
def nombre_del_metodo (variable1,variable2, . . .)
  codigo...
  return valor
end
```

{% include middle-post-ad.html %}

<p>Al igual que los métodos anteriores modificaremos un poco la estructura del ejemplo para que apliquen las funciones y para aumentar la complejidad y utilizar conceptos estudiados anteriormente. Para este caso vamos a usar variables de instancia:</p>

```ruby
@frutas = ["banana", "naranja", "cereza","pera"]
def bienvenido (nombre)                 #imprime saludo de bienvenida
  return "Hola #{nombre}"
end

def sumatoria (valor1,valor2 = 3)       #método que imprime una suma entre dos números
  return valor1 + valor2
end

def es_verdadero? (valor)               #método que imprime una variable Booleana
  if valor > 5
    return "verdadero"
  else
    return "falso"
  end
end

def palabra_mas_larga                   #Imprime la palabra mas larga de un arreglo
  palabra_larga = @frutas.inject do |fruta1, fruta2|
    fruta1.length > fruta2.length ? fruta1 : fruta2
  end
  puts palabra_larga
end

#Llamadas a los métodos:
respuesta = bienvenido ("Ricardo")
puts "resultado de bienvenido(\"Ricardo\"): " + respuesta
respuesta = bienvenido ("CodeHero")
puts "resultado de bienvenido(\"CodeHero\"): " +respuesta

respuesta = sumatoria (4)
puts "resultado de sumatoria(4): " +respuesta.to_s
respuesta = sumatoria (7)
puts "resultado de sumatoria(7): " +respuesta.to_s

respuesta = es_verdadero? (6)
puts "resultado de es_verdadero?(6): " +respuesta
respuesta = es_verdadero? (2)
puts "resultado de es_verdadero?(2): " +respuesta

palabra_mas_larga
@frutas = @frutas + ["pina","patilla","mandarinas"]  #altera la variable de instancia
palabra_mas_larga
```

<p>En el código se puede ver como algunos métodos retornan un resultado que posteriormente es alterado e impreso:</p>

```ruby
resultado de bienvenido("Ricardo"): Hola Ricardo
resultado de bienvenido("CodeHero"): Hola CodeHero
resultado de sumatoria(4): 7
resultado de sumatoria(7): 10
resultado de es_verdadero?(6): verdadero
resultado de es_verdadero?(2): falso
naranja
mandarinas
```

<p>En el ejemplo se puede observar cómo funcionan las variables de instancias antes definidas en otros capítulos de la serie, pero nunca demostradas hasta este momento. La variables están definidas fuera de los métodos internos y tiene como peculiaridad la posibilidad de alterarlas desde cualquier lugar con acceso a ella.</p>

<hr />

<h2>Bloques</h2>

<p>Los bloques en Ruby son una de las mejores características del lenguaje, son simplemente bloques de código entre corchetes ({}) que se pueden asociar a un método. Estos códigos no se ejecutan en el momento que se declaran si no en el momento en el cual pertenecen a un método específico y éste los llama.</p>

<p>La sintaxis de estas atractivas funciones es la siguiente:</p>

```ruby
nombre_del_bloque {
  código …
}
```

<p>En el siguiente ejemplo ejecutaremos un programa sencillo para familiarizarnos con la sintaxis y entender un poco mejor estas complejas características del lenguaje:</p>

```ruby
def bienvenido (nombre)                 #imprime saludo de bienvenida
  puts "Hola #{nombre}"
  yield
end

#Llamadas a los métodos:
bienvenido ("Ricardo") { puts "CodeHero. Cursos en el mejor idioma: CASTELLANO"}
bienvenido ("CodeHero") { puts "CodeHero. Cursos en el mejor idioma: CASTELLANO"}
```

<p>En el ejemplo se puede ver como se llama un método enviándole un bloque de código a ejecutar, cabe destacar que <em>yield</em> hace ejecutar el código del bloque dentro del método arrojando como resultado lo siguiente:</p>

```ruby
Hola Ricardo
CodeHero. Cursos en el mejor idioma: CASTELLANO
Hola CodeHero
CodeHero. Cursos en el mejor idioma: CASTELLANO
```

<p>En el siguiente ejemplo demostraremos cómo los bloques también tienen argumentos y la manera de consultar si existe un bloque a ejecutar:</p>

```ruby
def bienvenido (nombre)
  puts "Hola #{nombre}"       #imprime saludo de bienvenida
  if block_given?
    yield('CASTELLANO')
  end
end

#Llamadas a los métodos:
bienvenido ("Ricardo") {  |idioma| puts "CodeHero Cursos en el mejor idioma: " + idioma}
bienvenido ("CodeHero")
```

<p>En el código se puede ver como se evitan excepciones de código al preguntar si existe un bloque a ejecutar y como pasarle los argumentos a un bloque de código:</p>

```ruby
Hola Ricardo
CodeHero Cursos en el mejor idioma: CASTELLANO
Hola CodeHero
```

<hr />

<h2>Conclusión</h2>

<p>En este capítulo hemos adquirido herramientas importantes sobre los métodos y bloques en Ruby. Si te surgen dudas con nuestros cursos, no te detengas y danos tus comentarios, que con gusto estamos dispuestos a resolver tus inquietudes.</p>

<p>¡Hasta el próximo capítulo!</p>
