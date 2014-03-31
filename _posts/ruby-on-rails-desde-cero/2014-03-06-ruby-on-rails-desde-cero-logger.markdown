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
serie: Ruby on Rails desde Cero
description: Capítulo numero 17 de la serie Ruby on Rails desde cero donde aprendemos a utilizar el log de y hablamos como lo podemos utilizar el logger de activesupport
categories:
- Cursos
- Ruby on Rails
tags:
- Ruby
- Ruby on Rails
- Logger
---
Las series de cursos Ruby on Rails en CodeHero buscan otorgarte los conocimientos necesarios, para que puedas desarrollar tus propias aplicaciones Web. En el capítulo anterior aprendimos como se generan los controladores para la aplicación, que representan los métodos en nuestros controladores y cómo se leen parámetros ya sean en el URL o enviados por POST dentro de un formulario.

En este nuevo capítulo aprenderemos veremos como funciona el archivo ve Log y el *Logger* dentro de Rails para almacenar cosas como, errores, advertencias y acciones que realice el usuario dentro de nuestra aplicación.

* * *

## ¿Qué es un archivo de Log?

En informática, el concepto de historial o de logging designa la grabación secuencial en un archivo o en una base de datos de todos los acontecimientos que afectan un proceso particular (aplicación, actividad de una red informática...). El término (en inglés log file o simplemente log) designa al archivo que contiene estas grabaciones. Generalmente fechadas y clasificadas por orden cronológico, estos últimos permiten analizar paso a paso la actividad interna del proceso y sus interacciones con su medio.

fuente [wikipedia](http://es.wikipedia.org/wiki/Historial).

* * *

## ¿Cómo funciona el logger en Rails?

El logger de Rails hace uso de la librería que hemos venido hablando llamada `ActiveSupport`, especialmente de una clase llamada `ActiveSupport::Logger` que se encarga de escribir directo a los archivos de log.

### Niveles de logging

Cómo deben pensar existen diversas categorías de eventos que podemos almacenar en nuestro archivo de log, unas más importantes que otras. Entre las categorías que ofrece Rails tenemos:

- debug
- info
- warn
- error
- fatal

Estas categorías existen porque normalmente en el log arrojamos muchísimas cosas, tales como, peticiones y cargas de páginas, información sobre objetos, errores, advertencias de funcionalidad deprecadas, caídas del sistema, entre otras. Todo esto con fecha y hora al momento de ocurrir.

### Cómo escribimos en el Log

Para escribir en el log debemos de manera particular escoger cuál de los niveles de logging vamos a necesitar y luego llamar `logger.info` o `loger.warning` etc.

Hagamos una demostración de como funciona dentro de una aplicación:

Dentro de cualquier controlador de una aplicación podemos utilizar el logger de la siguiente manera.

> Para este ejemplo vamos a utilizar un controlador creado mediante `scaffold` y le agregaremos eventos de logging cuando creemos un objeto en base de datos.

```ruby
def create
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
```

Podemos apreciar que fácilmente hemos agregado una línea referente a el logger y además la información que contiene en el objeto que fue creado en base de datos en conjunto con un *String* con referencia a esa información. De esta misma manera podemos emplear cualquier tipo de logging.

#### ¿Cómo se ve en el log?

Dependiendo del tipo de log, sea producción o desarrollo apreciaremos pequeñas diferencias pero muy importantes.

A continuación vamos a ver el "log" de producción que se encuentra en la carpeta `log/development.log`:

```sh
Started POST "/es/sales" for 127.0.0.1 at 2014-03-05 21:54:55 -0430
Processing by SalesController#create as HTML
  Parameters: {"utf8"=>"✓", "authenticity_token"=>"Xl87IvP99L8D7Rhi6JJS/AHokCOvEKMalxx6vShcs40=", "sale"=>{"precio"=>"25", "nombre"=>"mouse"}, "commit"=>"Create Sale", "locale"=>"es"}
   (0.1ms)  begin transaction
  SQL (0.4ms)  INSERT INTO "sales" ("created_at", "nombre", "precio", "updated_at") VALUES (?, ?, ?, ?)  [["created_at", Thu, 06 Mar 2014 02:24:55 UTC +00:00], ["nombre", "mouse"], ["precio", "25"], ["updated_at", Thu, 06 Mar 2014 02:24:55 UTC +00:00]]
   (0.8ms)  commit transaction
{"id"=>5, "precio"=>"25", "nombre"=>"mouse", "created_at"=>Thu, 06 Mar 2014 02:24:55 UTC +00:00, "updated_at"=>Thu, 06 Mar 2014 02:24:55 UTC +00:00} se guardó correctamente
Redirected to http://localhost:3000/es/sales/5
Completed 302 Found in 6ms (ActiveRecord: 1.2ms)
```

Aquí podemos observar que una vez que se insertó correctamente el objeto en la base de datos y luego vemos el objeto en conjunto con la descripción que agregamos nosotros al log. Algo que debemos destacar en este log de *desarrollo* es que no se ve ninguna etiqueta que diferencie el nivel de logging. Es decir, no existe diferencia entre un log de `warn` o de `info` y tampoco detalla la fecha exacta del evento.

Pero si ahora vemos el log cuando realizamos la misma operación de agregar un objeto pero ahora en ambiente de producción podemos ver lo siguiente:

```sh
I, [2014-03-05T22:45:18.415376 #71235]  INFO -- : {"id"=>1, "precio"=>"40", "nombre"=>"hola", "created_at"=>Thu, 06 Mar 2014 03:15:18 UTC +00:00, "updated_at"=>Thu, 06 Mar 2014 03:15:18 UTC +00:00} se guardó correctamente
E, [2014-03-05T22:45:18.415509 #71235] ERROR -- : {"id"=>1, "precio"=>"40", "nombre"=>"hola", "created_at"=>Thu, 06 Mar 2014 03:15:18 UTC +00:00, "updated_at"=>Thu, 06 Mar 2014 03:15:18 UTC +00:00} se guardó el error en el log
```

La `I` determina que es un objeto de tipo `info` tiene la el `timestamp` bien definido y además escribe en letras mayúsculas `INFO` y posteriormente el mensaje tal cual lo habíamos escrito en el controlador. Yo agregué otro mensaje de error para mostrar las diferencias y podemos ver que escribe y representa correctamente un error en el log.

Al escribir en el log de producción los diferentes niveles de esta manera debemos entender que la razón a esto es poder filtrar todos los errores, warnings, o fallas graves fácilmente.

## ¿Cómo utilizar un logger alternativo?

En general en todas las comunidades existen diversas alternativas a librerías que nos presentan los frameworks; con el logger ocurre exactamente lo mismo. Si deseamos utilizar una librería de logger externa o algún servicio que nos proporcione valor agregado a los errores de nuestra aplicación tal cómo [logentries](https://logentries.com/doc/ruby/) pudiésemos fácilmente definirlo como la librería a utilizar por defecto en la aplicación.

Podemos agregarlo particularmente a un ambiente o agregarlo a la aplicación como tal. Rails no tiene definido un punto o archivo específico para realizar esto. Si se desea agregar a un ambiente particular podemos agregarlo a `config/enviroments/production.rb` o a cualquier otro. Si queremos que funcione en toda la aplicación podríamos agregarlo a el archivo `config/application.rb` o en un Initializer `config/initializers`.

* * *

## Conclusión.

En esta lección aprendimos a utilizar una de las propiedades de `activesupport` en particular para el uso de i18n o internacionalización de nuestras aplicaciones. En el próximo capítulo estaremos hablando un poco más de las funcionalidad de la librería `activesupport` de Rails. Siéntanse libres en consultar cualquier duda a través de los comentarios.

¡Hasta el próximo capítulo!
