---
layout: post
status: publish
published: true
title: ActionController Parte 2
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
wordpress_id: 2918
wordpress_url: http://codehero.co/?p=2918
date: 2014-01-16 01:08:19.000000000 -04:30
categories:
- Cursos
- Ruby on Rails
tags:
- Cursos
- Ruby on Rails
- curso
---
<p>Las series de cursos Ruby on Rails en CodeHero buscan otorgarte los conocimientos necesarios, para que puedas desarrollar tus propias aplicaciones Web. En el capítulo anterior aprendimos como se generan los controladores para la aplicación, que representan los métodos en nuestros controladores y cómo se leen parámetros ya sean en el URL o enviados por POST dentro de un formulario.</p>

<p>En este nuevo capítulo aprenderemos un poco más sobre la estructura de una aplicación en Rails, como funcionan los controladores para dar seguridad a nuestra aplicación, y para poder entregar la información al usuario en el formato que nos lo pida.</p>

<hr />

<h2>Strong Parameters</h2>

<p>Hace un par de años más o menos Rails fue víctima de una vulnerabilidad conocida como Mass Assigment. En esta vulnerabilidad el usuario podía enviar mediante parámetros información a todos los campos que se encontraran relacionados a una tabla particular, pudiendo acceder a ciertos campos privados o delicados. Desde el momento que se recibió la alerta de seguridad hasta el día de hoy se ha cambiado en un par oportunidades la manera de proteger al usuario de dicha vulnerabilidad.</p>

<p>En las versiones de Rails 3.0.x, 3.1.x y 3.2.x existió una manera de prevenir esto llamada <em>"white listing"</em>; se activaba mediante una opción de configuración y comprendía en utilizar el método llamado <code>attr_accessible</code> dentro de cada uno de los modelos de Rails como medio de verificación para conocer cuales eran los posibles parámetros a utilizar en mass assigment dejando por fuera los que se consideraban privados.</p>

<p>Posterior a eso surgió una mejor estrategia que se apuntala en el controlador para solucionar el problema. La misma es llamada Strong Parameters, y funciona de la siguen manera:</p>

<p>Se debe de igual forma realizar un <em>"white listing"</em> de los parámetros que deseamos y declaralos como seguros, para esto utilizamos el método <code>permit</code> el cual le indica a la aplicación cuales son los campos que se pueden utilizar en mass assigment evitando de esta manera cualquier imprevisto.</p>

<p>Vamos a probar en código como se ve esto que acabamos de explicar:</p>

<pre>class PublicacionsController &lt; ApplicationController
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
</pre>

<p>Si vemos el siguiente controlador podemos darnos cuenta del método <code>parametros_permitidos_publicacion</code> que se encuentra como un método privado y permite dos campos, <code>:estado</code> y <code>:ano</code>. Estos dos atributos son parte del objeto <code>:publicacion</code>, este método es llamado dentro del método <code>create</code> cuando se crea un nuevo objeto de tipo Publicación.</p>

<p>Si llegase a ocurrir que se están asignado más parámetros de los que ya están permitidos dicha petición devuelve un error 400 para evitar la vulnerabilidad.</p>

<p>Esta funcionalidad viene incluida por defecto en las versiones de Rails mayores o iguales a la versión 4.0, pero se puede activar en todas las versiones 3.x mediante el uso de la gema <a href="https://github.com/rails/strong_parameters">strong_parameters</a>.</p>

<hr />

<h2>Filters</h2>

<p>Los filtros son métodos que interactúan cuando una petición HTTP llega a un controlador y se corren antes, después o durante (antes y después) de la petición. Hasta Rails 3.2.x los filtros eran llamados <code>before_filter</code>, <code>after_filter</code> y <code>around_filter</code>; después de Rails > 4.0 se llaman <code>before_action</code>, <code>after_action</code> y <code>around_action</code>; es decir, se llaman distinto pero su función es la misma.</p>

<p>Entre las funciones más comunes para los filtros está: Comprobar que el usuario se encuentra dentro de la sesión para poder realizar un <code>create</code>, <code>update</code> o <code>detroy</code>. También pudiésemos realizar un filtro para cualquier acción que sea repetitiva como un query, y así no tener que escribirlo en repetidas oportunidades.</p>

<pre>class PublicacionsController &lt; ApplicationController
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
</pre>

<p>Aquí estamos mostrando el ejemplo de la sesión del usuario. Entonces, el método <code>before_action</code> se está activando únicamente para crear, actualizar o destruir un recurso de base de datos y pregunta si el usuario está en sesión, de no estarlo lo llevará a la pagina de login para que inicie sesión y permitirle las acciones de modificación de información del CRUD.</p>

<hr />

<h2>Rendering</h2>

<p>Cuando hablamos rendering nos referimos al formato en el que se presentará la información al usuario o cliente, es decir, XML, HTTP, o JSON. Esto se logra mediante el uso de los métodos <code>respond_to</code> y <code>respond_with</code>. Tenemos dos opciones para utilizar estos métodos, la primera que es la que por lo general vemos cuando generamos un scaffold:</p>

<pre>class PublicacionsController &lt; ApplicationController
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
</pre>

<p>La segunda manera que implica un poco menos de código repetido:</p>

<pre>class PublicacionsController &lt; ApplicationController
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
</pre>

<p>Particularmente me inclino más por la segunda opción aunque realmente realizan exactamente lo mismo, pero nos ahorramos unas lineas de código que suelen ser muy repetitivas. Generalmente utilizamos el rendering cuando nuestra aplicación funciona al mismo tiempo como un API, y necesita responder en JSON o XML.</p>

<hr />

<h2>Conclusión.</h2>

<p>En esta lección comenzamos a adentrarnos un poco más en los detalles de los controladores de Rails, particularmente vimos como se usa la nueva herramienta para protegernos de la asignación masiva de atributos que se encuentra en Rails >= 4.0. Como se utilizan de una manera muy básica los filtros y como se realiza el rendering para los formatos más particulares de presentación de información, que son json, html y xml. El próximo capítulo hablaremos de enrutamiento en Rails y veremos como se representan los métodos de los controladores en la tabla de enrutamiento. Siéntanse libres en consultar cualquier duda a través de los comentarios.</p>

<p>¡Hasta el próximo capítulo!</p>
