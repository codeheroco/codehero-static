---
layout: post
status: publish
published: true
title: Pruebas unitarias (Testing)
author: Ricardo Sampayo
author_login: ricardo
author_email: ricardo9588@gmail.com
author_url: http://www.ricardosampayo.com
date: 2013-11-15 00:01:30.000000000 -04:30
serie: Ruby on Rails desde Cero
dificultad: Intermedio
duracion: 20
description: Ruby on Rails desde cero te ofrecemos las herramientas necesarias para implementar software de calidad utilizando pruebas unitarias en Rails.
categories:
- Cursos
- Ruby on Rails
tags:
- Ruby on Rails
- pruebas unitarias
- pruebas
- Tests
- Seeds
- Modelos
---
<p>Las series de cursos Ruby on Rails en CodeHero buscan ofrecerte las herramientas básicas necesarias para que puedas desarrollar tus propias aplicaciones Web. En este nivel del curso ya deben tener suficiente información para empezar a desarrollar una aplicación web.</p>

<p>En este nuevo capítulo estaremos estudiando sobre las pruebas unitarias del sistema. Además definiremos un poco los conceptos y como siempre lo demostraremos con ejemplos sencillos para comprender mejor de qué se trata el tema en código.</p>

<hr />

<h2>¿Por qué usar pruebas para nuestras aplicaciones?</h2>

<p>Esta pregunta quizás todos los nuevos desarrolladores se la cuestionen a la hora de programar. Diseñar nuestra aplicación web en base a pruebas nos da muchísimos beneficios, ya que evalúan los métodos que el desarrollador considere de importancia, evaluando si el funcionamiento es correcto.</p>

<p>Imaginemos un ejemplo simple: Si tenemos un método dentro de algunos de nuestros modelos, que reciba dos valores, los sume y retorne una respuesta, pudiéramos hacer una prueba unitaria que pruebe el método con dos valores predeterminados de los cuales conozcamos de antemano su respuesta. Algo así:</p>

```ruby
test "suma_simple" do
  assert_equal( suma(2,2), 4 )
end
```

<p>En esta pequeña prueba se verifica que el resultado de la suma sea igual a cuatro, si esto es así, la prueba resultará exitosa.</p>

<p>En Rails resulta bastante fácil el desarrollo de pruebas, ya que usamos la consola para crear nuestros controladores, modelos o helpers que se van creando dentro de la carpeta <code>test</code> ordenados por tipo.</p>

<p>Otro motivo para no temerle a las pruebas es la fácil ejecución de ellas. Sólo basta con una línea de comando y tendremos un diagnóstico completo de las pruebas satisfactorias y así asegurar que el código se adhiere a la funcionalidad deseada, incluso después de algunas modificaciones de nuestra aplicación.</p>

<p>En las pruebas de Rails podemos realizar todo tipo de validaciones que nos indiquen si está funcionando o no correctamente, incluso se pueden simular peticiones del navegador y por lo tanto, usted puede probar la respuesta de su aplicación sin tener que hacerlo a través del navegador.</p>

<hr />

<h2>Preparación de las pruebas.</h2>

<p>Antes de desarrollar nuestras pruebas, debemos conocer una serie de componentes importantes que interactúan con nuestra pruebas.</p>

<h3>Entorno</h3>

<p>Debemos saber que todas las aplicaciones que desarrollamos en Rails tienen por defecto tres entornos: Entorno de desarrollo, entorno de producción, y entorno para pruebas. Esto significa que cada uno de ellos es completamente aislado del resto, lo que nos da la confianza de realizar todas las pruebas que queramos sin alterar nuestro ambiente de producción o de desarrollo.</p>

<h3>Estructura</h3>

<p>Como ya mencionamos en la primera parte de este tutorial, la estructura de las pruebas prácticamente está alojada en una carpeta definida por Rails llamada <code>test</code> y básicamente esta es la estructura:</p>

<ul>
<li>controllers/</li>
<li>helpers/</li>
<li>test_helper.rb</li>
<li>fixtures/ </li>
<li>integration/</li>
<li>models/</li>
</ul>

<p>Una estructura bastante sencilla de explicarlo es: <code>models</code> se hacen las pruebas de nuestros modelos de la aplicación; <code>controllers</code> las pruebas de los controladores; <code>integration</code> está destinado para contener las pruebas que involucren integración con nuestra aplicación; <code>fixtures</code> es una forma de organizar nuestros datos de prueba y por último <code>test_helper.rb</code> es un archivo que contiene la configuración por defecto para sus análisis.</p>

<h3>Datos</h3>

<p>Los datos que vamos a utilizar de pruebas se guardan en la carpeta <code>fixtures</code> y nos sirven para ser usados en las pruebas. De estos archivos, existe uno para cada modelo que tenemos en la aplicación y son independientes de la base de datos. La estructura del contenido de estos archivos es más o menos así:</p>

```ruby
# Read about fixtures at http://api.rubyonrails.org/classes/ActiveRecord/Fixtures.html
one:
  nombre: Ricardo
  apellido: Sampayo
  nacimiento: 1988-05-09
  sexo: m

two:
  nombre: CodeHero
  apellido: Cursos
  nacimiento: 2013-09-05
  sexo: m
```

<p>Se puede observar fácilmente en la estructura que se crean dos objetos de tipo usuario.</p>

<hr />

<h2>¿Cómo ejecutar pruebas?</h2>

<p>Ejecutar pruebas en Rails es bastante sencillo sólo debemos ejecutar unas líneas de comando y ver qué resultados nos arroja. Primero debemos asegurarnos de que la base de datos de prueba esté creada con éxito, si no debemos ejecutar los comandos ya estudiados para generarla. (Recuerde que la configuración de las bases de datos está en el archivo database.yml).</p>

{% include middle-post-ad.html %}

```sh
$ bundle exec rake db:migrate
$ bundle exec rake db:test:load
```

<p>Algunos de los comandos para preparar la aplicación de pruebas son:</p>

<ul>
<li><code>rake db:test:clone</code> crea una base de datos de pruebas basado en el actual.</li>
<li><code>rake db:test:clone_structure</code> Crea nuevamente la estructura de la base de datos de prueba según la base de datos de desarrollo.</li>
<li><code>rake db:test:load</code> Crea la base de datos de prueba con el esquema <strong>schema.rb</strong>.</li>
<li><code>rake db:test:prepare</code> Comprueba migraciones y cargar el esquema de prueba.</li>
<li><code>rake db:test:purge</code> Vacía la base de datos.</li>
</ul>

<p>Listo! una vez comprobado y preparado nuestro ambiente de pruebas sólo nos queda saber cómo ejecutar pruebas. Sólo debemos ejecutar la siguiente límea de comando para llamar a todas las pruebas del sistema.</p>

```sh
$ bundle exec rake test
```

<p>Y obtendremos algo así:</p>

```sh
Run options: --seed 20850
# Running tests:
.
Finished tests in 0.094405s, 10.5927 tests/s, 10.5927 assertions/s.
1 tests, 1 assertions, 0 failures, 0 errors, 0 skips
```

<p>También podemos llamar a los test de forma independiente, con el nombre de la prueba:</p>

```sh
$ bundle exec rake test test/models/usuario_test.rb
```

<p>O incluso más detallada con el nombre del método dentro de la prueba.</p>

```sh
$ bundle exec rake test test/models/usuario_test.rb test_prueba_codehero
```

<p>Para este caso forzamos una prueba para que falle y tenemos esto como resultado:</p>

```sh
Run options: -n test_prueba_codehero --seed 51120
# Running tests:
F
Finished tests in 0.056565s, 17.6788 tests/s, 17.6788 assertions/s.
  1) Failure:
UsuarioTest#test_prueba_codehero [/Users/ricardosampayo/Documents/CodeHero/ruby_on_rails_activerecord/test/models/usuario_test.rb:6]:
Failed assertion, no message given.
1 tests, 1 assertions, 1 failures, 0 errors, 0 skips
```

<p>Como vemos, el resultado de las pruebas es bastante completo, nos indica tanto la cantidad de pruebas que se ejecutaron, como el resultado de ellas indicándonos fallas o errores, incluso vemos cuales pruebas son las que tienen problemas y el rendimiento de la ejecución.</p>

<blockquote>
  <p>TDD (Desarrollo basado en pruebas) es uno de los enfoques de desarrollo del software más importantes hasta el momento, éste consiste en primero pensar y desarrollar una prueba y luego desarrollamos la aplicación basada ésta.</p>
</blockquote>

<p>Es una buena práctica tener al menos una prueba para cada una de las validaciones y por lo menos una prueba por cada método en el modelo.</p>

<h3>Ejemplo</h3>

<p>Vamos a ejecutar una serie de pruebas variadas para mostrar un poco cómo funcionan las pruebas.</p>

<p>En esta prueba desarrollaremos tres métodos que actúan sobre el objeto <em>Usuario</em> y validan que se pueda guardar un usuario, el nombre de un usuario sea el correcto, entre otras.</p>

```ruby
require 'test_helper'

class UsuarioTest < ActiveSupport::TestCase
  test "guardar_usuario" do
    user1 = Usuario.new({ apellido: 'Sampayo', nombre: 'Ricardo', nacimiento: Time.zone.parse("1988-05-09"), sexo: 'm' })
    assert user1.save
  end

  test "validar_nombre" do
    user1 = Usuario.new({ apellido: 'Sampayo', nombre: 'Ricardo', nacimiento: Time.zone.parse("1988-05-09"), sexo: 'm' })
    assert_equal( user1.nombre, 'Ricardo')
  end

  test "prueba_fallida" do
    assert false
  end
end
```

<p>El resultado al ejecutar estas pruebas es el siguiente:</p>

```ruby
Run options: --seed 43885
# Running tests:
.F.
Finished tests in 0.076813s, 39.0559 tests/s, 39.0559 assertions/s.
  1) Failure:
UsuarioTest#test_prueba_fallida [/Users/ricardosampayo/Documents/CodeHero/ruby_on_rails_activerecord/test/models/usuario_test.rb:16]:
Failed assertion, no message given.
3 tests, 3 assertions, 1 failures, 0 errors, 0 skips
```

<p>Probablemente se hayan dado cuenta de que hay varios tipos de afirmaciones para las pruebas, veremos unas cuantas a continuación:</p>

<ul>
<li><code>assert (test, [MSG])</code> verifica si la prueba es verdadera.</li>
<li><code>assert_not (test, [MSG])</code> verifica si la prueba es falsa.</li>
<li><code>assert_equal (expected, actual, [MSG])</code> asegura que dos variables son iguales. </li>
<li><code>assert_not_equal (expected, actual, [MSG])</code> asegura que dos variables son diferentes. </li>
<li><code>assert_nil (obj, [MSG])</code> asegura que el objeto es nulo.</li>
<li><code>assert_not_nil (obj, [MSG])</code> asegura que el objeto no es nulo.</li>
<li><code>assert_match (regexp, cadena, [MSG])</code> asegura que la respuesta coincida con una expresión regular.</li>
<li><code>assert_no_match (regexp, cadena, [MSG])</code> asegura que la respuesta no coincida con una expresión regular.</li>
<li><code>assert_kind_of (clase, obj, [MSG])</code> asegura que el objeto coincida con una clase.</li>
<li><code>assert_not_kind_of (regexp, cadena, [MSG])</code> asegura que el objeto no coincida con una clase.</li>
</ul>

<hr />

<h2>Conclusión</h2>

<p>En esta lección hemos estudiado básicamente las pruebas unitarias en Ruby on Rails, mostrando la definición, características importantes e importancia de desarrollar framework utilizando pruebas y algunos ejemplos básicos.</p>

<p>Una vez más te recomiendo echarle un vistazo a la serie completa de <a href="http://codehero.co/series/ruby-on-rails-desde-cero/">Ruby on Rails desde cero</a>, así como a las otras series de CodeHero, agradeciendo de antemano todas sus dudas y comentarios en la sección de comentarios.</p>

<p>¡Hasta el próximo capítulo!</p>
