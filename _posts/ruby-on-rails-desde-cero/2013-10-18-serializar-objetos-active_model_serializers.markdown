---
layout: post
status: publish
published: true
title: 'Serializar Objetos (active_model_serializers) '
author: Ricardo Sampayo
author_login: ricardo
author_email: ricardo9588@gmail.com
author_url: http://www.ricardosampayo.com
wordpress_id: 2416
wordpress_url: http://codehero.co/?p=2416
date: 2013-10-18 00:03:27.000000000 -04:30
serie: Ruby on Rails desde Cero
thumbnail: http://i.imgur.com/ZPAm5Mn.png?1
description: Curso Ruby on Rails desde Cero, en este capítulo estaremos describiendo e implementando una gema para serializar objetos llamada active_model_serializers.
categories:
- Cursos
- Ruby on Rails
tags:
- Cursos
- curso
- active_model_serializers
- serializador
---
<p>Las series de cursos Ruby on Rails en CodeHero buscan otorgarte los conocimientos necesarios, para que puedas desarrollar tus propias aplicaciones Web. En capítulos anteriores hemos aprendido muchas de las ventajas del framework, desde la instalación y la puesta en marcha de nuestras aplicaciones hasta el capítulo anterior, donde estuvimos estudiando ActiveModel y algunas de sus características.</p>

<p>En este nuevo capítulo estaremos estudiando la serialización de objetos, pero a diferencia de la introducción que vimos en el <a href="http://codehero.co/activemodel/">capítulo anterior</a> en ésta estaremos haciendo uso de una gema llamada <code>active_model_serializers</code></p>

<hr />

<h2>¿Qué hace la gema active_model_serializers?</h2>

<p>Esta gema básicamente nos ayuda a serializar los objetos, al igual que como hicimos en el capítulo anterior usando <code>ActiveModel::Serializers</code>, pero con la diferencia que esta gema nos agrega una serie de funcionalidades que nos ayudan al manejo de estos objetos e incluso nos separan la lógica de serialización de nuestros controladores y modelos. Por lo general utilizamos esta gema para realizar APIs con formato JSON.</p>

<hr />

<h2>Demostración</h2>

<p>Para la demostración de esta maravillosa gema veremos desde su instalación hasta la implementación, en algunos ejemplos sencillos, que podrás desarrollar fácilmente tu aplicación.</p>

<h3>Instalación</h3>

<p>Hasta este momento no hemos visto ni instalado ninguna gema en nuestra aplicación, ya es hora de hacerlo y como todo en Ruby on Rails te daras cuenta de lo fácil que resulta.</p>

<p>Básicamente la instalación de esta gema, en Ruby on Rails y en nuestra aplicación, sigue dos sencillos pasos. Primero agregamos en el archivo Gemlife nuestra gema de la siguiente manera:</p>

```ruby
gem "active_model_serializers"
```

<p>Luego, nos vamos a nuestra consola o terminal y nos dirigimos hasta el directorio donde está el proyecto. Entramos dentro de la carpeta del proyecto y ejecutamos la famosa línea de código para instalar las gemas:</p>

```sh
$ bundle install
```

<p>Una vez realizados estos dos sencillos pasos ya nuestra aplicación está lista para hacer uso de nuestra gema serializadora.</p>

<h3>¿Cómo creamos el serializador?</h3>

<p>Para crear el serializador sólo basta con ejecutar un línea de comando en nuestra consola o terminal. Si queremos crear un modelo desde cero y ya estamos seguros que vamos a necesitar serializar los objetos, porque queremos hacer un API o simplemente queremos mostrarlo en un formato de uso común (JSON), utilizamos el siguiente comando:</p>

```sh
$ rails g resource nombre_modelo atributo1:string atributo2:string
```

<p>o</p>

```sh
$ rails generate resource nombre_modelo atributo1:string atributo2:string
```

<p>Como ven este comando nos crea los mismos archivos que cuando creamos un modelo, sólo que adicionalmente en la carpeta <strong>app</strong> nos agrega una nueva carpeta llamada <strong>serializers</strong> y a ésta un archivo Ruby donde desarrollamos la lógica para serializar.</p>

<p>También es posible crear un serializador a un objeto ya existente en nuestra aplicación de la siguiente manera:</p>

```sh
$ rails g serializer nombre_modelo
```

<p>o</p>

```sh
$ rails generate serializer nombre_modelo
```

<p>Este comando sólo nos crea la clase en Ruby, donde desarrollamos la lógica para serializar el objeto que indicamos.</p>

<h3>¿Cómo usar el serializador?</h3>

<p>Una vez que creamos nuestro serializador nos damos cuenta que tenemos unos archivos Ruby nuevos dentro de la carpeta Serializer que se debió haber creado. Estos archivos deben tener algo como esto:</p>

```ruby
class UsuariosSerializer < ActiveModel::Serializer
  attributes :id, :nombre, :apellido, :nacimiento, :sexo
end
```

{% include middle-post-ad.html %}

<p>Como ven es una simple clase que extiende de <code>ActiveModel::Serializer</code> con los atributos del modelo que en nuestro caso es <strong>Usuario</strong>.</p>

<blockquote>
  <p>Probablemente cuando creamos el serializador con la segunda opción de este tutorial, debamos agregar los atributos del modelo a mano (Por defecto sólo se crea con el id)</p>
</blockquote>

<p>Una vez revisada y modificada la clase serializadora del modelo simplemente nos vamos a nuestro controlador y creamos un método (Recuerda agregar la ruta al archivo routes.rb). Por ejemplo:</p>

```ruby
class Usuario < ApplicationController
  def serializador
    @ejemplo1    = Usuario.all
    render json: @ejemplo1
  end
end
```

<p>Listo!, con este comando ya tenemos a todos los usuarios impresos en formato JSON en nuestra aplicación.</p>

```json
{
  "nombreControlador": [
    {
      "id": 6,
      "nombre": "Ramses",
      "apellido": "Velasquez",
      "nacimiento": "1968-05-09",
      "sexo": "m"
    },
    {
      "id": 7,
      "nombre": "Perez",
      "apellido": "Juana",
      "nacimiento": "1996-05-09",
      "sexo": "f"
    }
  ]
}
```

<h3>¿Cómo cambiar la estructura del JSON?</h3>

<p>Probablemente necesitemos ocultar algunos atributos de nuestro modelo, cambiar el formato del algunos atributos e incluso agregar funciones que puedan cambiar la estructura de nuestro modelo original. El uso de funciones, el manejar la lógica de serialización completamente separada de nuestra aplicación y poder definir nuestros propios atributos, es lo que hace verdaderamente útil esta gema.</p>

<p>Imaginemos que necesitamos a los usuarios, pero en este caso particular sólo nos hace falta el nombre completo y la fecha de nacimiento de cada uno de los usuarios. Debemos desarrollar el serializador de la siguiente forma:</p>

```ruby
class UsuarioSerializer < ActiveModel::Serializer
  attributes :nacimiento, {full_name: :full_name}

  def full_name
    "#{object.nombre} #{object.apellido}"
  end
end
```

<p>Como ven en el ejemplo, desarrollamos una función llamada <code>full_name</code> donde concatenamos el nombre, ya que, para nuestro uso interno usamos el nombre por separado. Por último, para mostrar los atributos que queremos simplemente los sacamos o agregamos a nuestra lista de atributos.</p>

<p>Si deseáramos agregarle información extra a nuestra salida en formato JSON pudiéramos agregarlo directamente en nuestro controlador con la etiqueta <code>meta</code>. Veamos el siguiente ejemplo y la salida que genera:</p>

```ruby
def serializador
  @ejemplo1    = Usuario.all
  # meta_key es para cambiarle el nombre a la etiqueta que estamos agregando
  render json: @ejemplo1 , meta: {total: 10}, meta_key: 'meta_object'
end
```

<p>Para tener una salida parecida a la siguiente:</p>

```json
{
  "nombre_controlador": [
    {
      "nacimiento": "1988-05-09",
      "full_name": "Ricardo Sampayo"
    }
  ],
  "meta_object": {
    "total": 10
  }
}
```

<p>Por último, para terminar con este punto, esta gema también nos ofrece la posibilidad de tener varios serializadores con estructuras diferentes para ser usados según sea el caso. Por ejemplo, el serializador que hemos utilizado hasta ahora sólo tiene fecha de nacimiento y el nombre completo, pero, pudiéramos necesitar otro serializador que provea toda la información del modelo sin necesidad de aplicarle cambios al serializador principal. Veamos en el siguiente ejemplo cómo podemos llamar a un serializador diferente.</p>

```ruby
def serializador
  @ejemplo1    = Usuario.first
  render json: @ejemplo1 , serializer: UsuarioCustomSerializer
end
```

<p>En caso de que el objeto que vayamos a serializar sea un <strong>arreglo de objetos</strong> utilizamos el siguiente:</p>

```ruby
def serializador
  @ejemplo1    = Usuario.all
  render json: @ejemplo1 , each_serializer: UsuarioCustomSerializer
end
```

<hr />

<h2>Conclusión</h2>

<p>En esta lección hemos estudiado una nueva y muy útil gema para desarrollar en Ruby on Rails. Esta gema, aunque ofrece algunas funciones que ya nos ofrece el framework y estudiamos en el capítulo anterior <a href="http://codehero.co/activemodel/">ActiveModel</a>, nos otorga más libertad al serializar nuestros objetos y aún más importante nos mantiene el código separado de la lógica de negocios manteniendo el código limpio, ordenado y eficiente.</p>

<p>Una vez más te recomiendo echarle un vistazo a la serie completa de Ruby desde cero, así como a las otras series de CodeHero, agradeciendo de antemano todas sus dudas y comentarios en la sección de comentarios.</p>

<p>¡Hasta el próximo capítulo!</p>
