---
layout: post
status: publish
published: true
title: ActionController Parte 2
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
date: 2014-01-16 01:08:19.000000000 -04:30
serie: Ruby on Rails desde Cero
description: Capítulo 13 de la serie Ruby on Rails desde Cero, donde hablamos sobre strong parameters, filtros y rendering del contenido todo dentro del actioncontroller
dificultad: Novato
duracion: 20
categories:
- Cursos
- Ruby on Rails
tags:
- Ruby on Rails
- Controladores
- Filtros
- Rendering
- Ruby
---
Las series de cursos Ruby on Rails en CodeHero buscan otorgarte los conocimientos necesarios, para que puedas desarrollar tus propias aplicaciones Web. En el capítulo anterior aprendimos como se generan los controladores para la aplicación, que representan los métodos en nuestros controladores y cómo se leen parámetros ya sean en el URL o enviados por POST dentro de un formulario.

En este nuevo capítulo aprenderemos un poco más sobre la estructura de una aplicación en Rails, como funcionan los controladores para dar seguridad a nuestra aplicación, y para poder entregar la información al usuario en el formato que nos lo pida.

* * *

## Strong Parameters

Hace un par de años más o menos Rails fue víctima de una vulnerabilidad conocida como Mass Assigment. En esta vulnerabilidad el usuario podía enviar mediante parámetros información a todos los campos que se encontraran relacionados a una tabla particular, pudiendo acceder a ciertos campos privados o delicados. Desde el momento que se recibió la alerta de seguridad hasta el día de hoy se ha cambiado en un par oportunidades la manera de proteger al usuario de dicha vulnerabilidad.

En las versiones de Rails 3.0.x, 3.1.x y 3.2.x existió una manera de prevenir esto llamada *"white listing"*; se activaba mediante una opción de configuración y comprendía en utilizar el método llamado `attr_accessible` dentro de cada uno de los modelos de Rails como medio de verificación para conocer cuales eran los posibles parámetros a utilizar en mass assigment dejando por fuera los que se consideraban privados.

Posterior a eso surgió una mejor estrategia que se apuntala en el controlador para solucionar el problema. La misma es llamada Strong Parameters, y funciona de la siguen manera:

Se debe de igual forma realizar un *"white listing"* de los parámetros que deseamos y declaralos como seguros, para esto utilizamos el método `permit` el cual le indica a la aplicación cuales son los campos que se pueden utilizar en mass assigment evitando de esta manera cualquier imprevisto.

Vamos a probar en código como se ve esto que acabamos de explicar:

```ruby
class PublicacionsController < ApplicationController
  def create
    @publicacion = Publicacion.new(parametros_permitidos_publicacion)

      if @publicacion.save
        redirect_to @publicacion
      else
        render action: 'new'
      end
    end
  end

  private

    def parametros_permitidos_publicacion
      params.require(:publicacion).permit(:estado, :ano)
    end
end
```

Si vemos el siguiente controlador podemos darnos cuenta del método `parametros_permitidos_publicacion` que se encuentra como un método privado  y permite dos campos, `:estado` y `:ano`. Estos dos atributos son parte del objeto `:publicacion`, este método es llamado dentro del método `create` cuando se crea un nuevo objeto de tipo Publicación.

Si llegase a ocurrir que se están asignado más parámetros de los que ya están permitidos dicha petición devuelve un error 400 para evitar la vulnerabilidad.

Esta funcionalidad viene incluida por defecto en las versiones de Rails mayores o iguales a la versión 4.0, pero se puede activar en todas las versiones 3.x mediante el uso de la gema [strong_parameters](https://github.com/rails/strong_parameters).

{% include middle-post-ad.html %}

* * *

## Filters

Los filtros son métodos que interactúan cuando una petición HTTP llega a un controlador y se corren antes, después o durante (antes y después) de la petición. Hasta Rails 3.2.x los filtros eran llamados `before_filter`, `after_filter` y `around_filter`; después de Rails > 4.0 se llaman `before_action`, `after_action` y `around_action`; es decir, se llaman distinto pero su función es la misma.

Entre las funciones más comunes para los filtros está: Comprobar que el usuario se encuentra dentro de la sesión para poder realizar un `create`, `update` o `detroy`. También pudiésemos realizar un filtro para cualquier acción que sea repetitiva como un query, y así no tener que escribirlo en repetidas oportunidades.

```ruby
class PublicacionsController < ApplicationController
  before_action :en_sesion, only: [:create, :update, :destroy]

  def create
    @publicacion = Publicacion.new(parametros_permitidos_publicacion)

      if @publicacion.save
        redirect_to @publicacion
      else
        render action: 'new'
      end
    end
  end

  private

    def en_sesion
      unless esta_en_sesion? # variable que indica la sesión.
        redirect_to pagina_de_login
      end
    end

    def parametros_permitidos_publicacion
      params.require(:publicacion).permit(:estado, :ano)
    end
end
```

Aquí estamos mostrando el ejemplo de la sesión del usuario. Entonces, el método `before_action` se está activando únicamente para crear, actualizar o destruir un recurso de base de datos y pregunta si el usuario está en sesión, de no estarlo lo llevará a la pagina de login para que inicie sesión y permitirle las acciones de modificación de información del CRUD.

* * *

## Rendering

Cuando hablamos rendering nos referimos al formato en el que se presentará la información al usuario o cliente, es decir, XML, HTTP, o JSON. Esto se logra mediante el uso de los métodos `respond_to` y `respond_with`. Tenemos dos opciones para utilizar estos métodos, la primera que es la que por lo general vemos cuando generamos un scaffold:

```ruby
class PublicacionsController < ApplicationController
  def create
    @publicacion = Publicacion.new(parametros_permitidos_publicacion)

    respond_to do |format|
      if @publicacion.save
        format.html { redirect_to @publicacion }
        format.json { render action: 'show', status: :created, location: @publicacion }
      else
        format.html { render action: 'new' }
        format.json { render json: @publicacion.errors, status: :unprocessable_entity }
      end
    end
  end
```

La segunda manera que implica un poco menos de código repetido:

```ruby
class PublicacionsController < ApplicationController
  respond_to :html, :json, :xml

  def create
    @publicacion = Publicacion.new(parametros_permitidos_publicacion)

    if @publicacion.save
      respond_with(@publicacion, status: :created, location: @publicacion) do |format|
        format.html { redirect_to @publicacion }
    else
      respond_with(@publicacion.errors, status: :unprocessable_entity) do |format|
        format.html { render action: :new }
      end
    end
  end
```

Particularmente me inclino más por la segunda opción aunque realmente realizan exactamente lo mismo, pero nos ahorramos unas lineas de código que suelen ser muy repetitivas. Generalmente utilizamos el rendering cuando nuestra aplicación funciona al mismo tiempo como un API, y necesita responder en JSON o XML.

* * *

## Conclusión.

En esta lección comenzamos a adentrarnos un poco más en los detalles de los controladores de Rails, particularmente vimos como se usa la nueva herramienta para protegernos de la asignación masiva de atributos que se encuentra en Rails >= 4.0. Como se utilizan de una manera muy básica los filtros y como se realiza el rendering para los formatos más particulares de presentación de información, que son json, html y xml. El próximo capítulo hablaremos de enrutamiento en Rails y veremos como se representan los métodos de los controladores en la tabla de enrutamiento. Siéntanse libres en consultar cualquier duda a través de los comentarios.

¡Hasta el próximo capítulo!
