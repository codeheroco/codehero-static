---
layout: post
status: publish
published: true
title: Logger
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
wordpress_id: 3095
wordpress_url: http://codehero.co/?p=3095
date: 2014-03-06 04:08:26.000000000 -04:30
categories:
- Cursos
- Ruby on Rails
tags:
- Ruby
- Ruby on Rails
- Logger
---
<p>Las series de cursos Ruby on Rails en CodeHero buscan otorgarte los conocimientos necesarios, para que puedas desarrollar tus propias aplicaciones Web. En el capítulo anterior aprendimos como se generan los controladores para la aplicación, que representan los métodos en nuestros controladores y cómo se leen parámetros ya sean en el URL o enviados por POST dentro de un formulario.</p>

<p>En este nuevo capítulo aprenderemos veremos como funciona el archivo ve Log y el <em>Logger</em> dentro de Rails para almacenar cosas como, errores, advertencias y acciones que realice el usuario dentro de nuestra aplicación.</p>

<hr />

<h2>¿Qué es un archivo de Log?</h2>

<p>En informática, el concepto de historial o de logging designa la grabación secuencial en un archivo o en una base de datos de todos los acontecimientos que afectan un proceso particular (aplicación, actividad de una red informática...). El término (en inglés log file o simplemente log) designa al archivo que contiene estas grabaciones. Generalmente fechadas y clasificadas por orden cronológico, estos últimos permiten analizar paso a paso la actividad interna del proceso y sus interacciones con su medio.</p>

<p>fuente <a href="http://es.wikipedia.org/wiki/Historial">wikipedia</a>.</p>

<hr />

<h2>¿Cómo funciona el logger en Rails?</h2>

<p>El logger de Rails hace uso de la librería que hemos venido hablando llamada <code>ActiveSupport</code>, especialmente de una clase llamada <code>ActiveSupport::Logger</code> que se encarga de escribir directo a los archivos de log.</p>

<h3>Niveles de logging</h3>

<p>Cómo deben pensar existen diversas categorías de eventos que podemos almacenar en nuestro archivo de log, unas más importantes que otras. Entre las categorías que ofrece Rails tenemos:</p>

<ul>
<li>debug</li>
<li>info</li>
<li>warn</li>
<li>error</li>
<li>fatal</li>
</ul>

<p>Estas categorías existen porque normalmente en el log arrojamos muchísimas cosas, tales como, peticiones y cargas de páginas, información sobre objetos, errores, advertencias de funcionalidad deprecadas, caídas del sistema, entre otras. Todo esto con fecha y hora al momento de ocurrir.</p>

<h3>Cómo escribimos en el Log</h3>

<p>Para escribir en el log debemos de manera particular escoger cuál de los niveles de logging vamos a necesitar y luego llamar <code>logger.info</code> o <code>loger.warning</code> etc.</p>

<p>Hagamos una demostración de como funciona dentro de una aplicación:</p>

<p>Dentro de cualquier controlador de una aplicación podemos utilizar el logger de la siguiente manera.</p>

<blockquote>
  <p>Para este ejemplo vamos a utilizar un controlador creado mediante <code>scaffold</code> y le agregaremos eventos de logging cuando creemos un objeto en base de datos.</p>
</blockquote>

<pre lang="ruby">def create
  @sale = Sale.new(sale_params)

  respond_to do |format|
    if @sale.save
      logger.info "#{@sale.attributes.inspect} se guardó correctamente"
      format.html { redirect_to @sale, notice: 'Sale was successfully created.' }
      format.json { render action: 'show', status: :created, location: @sale }
    else
      format.html { render action: 'new' }
      format.json { render json: @sale.errors, status: :unprocessable_entity }
    end
  end
end
</pre>

<p>Podemos apreciar que fácilmente hemos agregado una línea referente a el logger y además la información que contiene en el objeto que fue creado en base de datos en conjunto con un <em>String</em> con referencia a esa información. De esta misma manera podemos emplear cualquier tipo de logging.</p>

<h4>¿Cómo se ve en el log?</h4>

<p>Dependiendo del tipo de log, sea producción o desarrollo apreciaremos pequeñas diferencias pero muy importantes.</p>

<p>A continuación vamos a ver el "log" de producción que se encuentra en la carpeta <code>log/development.log</code>:</p>

<pre lang="sh">Started POST "/es/sales" for 127.0.0.1 at 2014-03-05 21:54:55 -0430
Processing by SalesController#create as HTML
  Parameters: {"utf8"=>"✓", "authenticity_token"=>"Xl87IvP99L8D7Rhi6JJS/AHokCOvEKMalxx6vShcs40=", "sale"=>{"precio"=>"25", "nombre"=>"mouse"}, "commit"=>"Create Sale", "locale"=>"es"}
   (0.1ms)  begin transaction
  SQL (0.4ms)  INSERT INTO "sales" ("created_at", "nombre", "precio", "updated_at") VALUES (?, ?, ?, ?)  [["created_at", Thu, 06 Mar 2014 02:24:55 UTC +00:00], ["nombre", "mouse"], ["precio", "25"], ["updated_at", Thu, 06 Mar 2014 02:24:55 UTC +00:00]]
   (0.8ms)  commit transaction
{"id"=>5, "precio"=>"25", "nombre"=>"mouse", "created_at"=>Thu, 06 Mar 2014 02:24:55 UTC +00:00, "updated_at"=>Thu, 06 Mar 2014 02:24:55 UTC +00:00} se guardó correctamente
Redirected to http://localhost:3000/es/sales/5
Completed 302 Found in 6ms (ActiveRecord: 1.2ms)
</pre>

<p>Aquí podemos observar que una vez que se insertó correctamente el objeto en la base de datos y luego vemos el objeto en conjunto con la descripción que agregamos nosotros al log. Algo que debemos destacar en este log de <em>desarrollo</em> es que no se ve ninguna etiqueta que diferencie el nivel de logging. Es decir, no existe diferencia entre un log de <code>warn</code> o de <code>info</code> y tampoco detalla la fecha exacta del evento.</p>

<p>Pero si ahora vemos el log cuando realizamos la misma operación de agregar un objeto pero ahora en ambiente de producción podemos ver lo siguiente:</p>

<pre lang="sh">I, [2014-03-05T22:45:18.415376 #71235]  INFO -- : {"id"=>1, "precio"=>"40", "nombre"=>"hola", "created_at"=>Thu, 06 Mar 2014 03:15:18 UTC +00:00, "updated_at"=>Thu, 06 Mar 2014 03:15:18 UTC +00:00} se guardó correctamente
E, [2014-03-05T22:45:18.415509 #71235] ERROR -- : {"id"=>1, "precio"=>"40", "nombre"=>"hola", "created_at"=>Thu, 06 Mar 2014 03:15:18 UTC +00:00, "updated_at"=>Thu, 06 Mar 2014 03:15:18 UTC +00:00} se guardó el error en el log
</pre>

<p>La <code>I</code> determina que es un objeto de tipo <code>info</code> tiene la el <code>timestamp</code> bien definido y además escribe en letras mayúsculas <code>INFO</code> y posteriormente el mensaje tal cual lo habíamos escrito en el controlador. Yo agregué otro mensaje de error para mostrar las diferencias y podemos ver que escribe y representa correctamente un error en el log.</p>

<p>Al escribir en el log de producción los diferentes niveles de esta manera debemos entender que la razón a esto es poder filtrar todos los errores, warnings, o fallas graves fácilmente.</p>

<h2>¿Cómo utilizar un logger alternativo?</h2>

<p>En general en todas las comunidades existen diversas alternativas a librerías que nos presentan los frameworks; con el logger ocurre exactamente lo mismo. Si deseamos utilizar una librería de logger externa o algún servicio que nos proporcione valor agregado a los errores de nuestra aplicación tal cómo <a href="https://logentries.com/doc/ruby/">logentries</a> pudiésemos fácilmente definirlo como la librería a utilizar por defecto en la aplicación.</p>

<p>Podemos agregarlo particularmente a un ambiente o agregarlo a la aplicación como tal. Rails no tiene definido un punto o archivo específico para realizar esto. Si se desea agregar a un ambiente particular podemos agregarlo a <code>config/enviroments/production.rb</code> o a cualquier otro. Si queremos que funcione en toda la aplicación podríamos agregarlo a el archivo <code>config/application.rb</code> o en un Initializer <code>config/initializers</code>.</p>

<hr />

<h2>Conclusión.</h2>

<p>En esta lección aprendimos a utilizar una de las propiedades de <code>activesupport</code> en particular para el uso de i18n o internacionalización de nuestras aplicaciones. En el próximo capítulo estaremos hablando un poco más de las funcionalidad de la librería <code>activesupport</code> de Rails. Siéntanse libres en consultar cualquier duda a través de los comentarios.</p>

<p>¡Hasta el próximo capítulo!</p>
