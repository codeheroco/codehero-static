---
layout: post
status: publish
published: true
title: Time Zones
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
date: 2014-03-13 00:00:51.000000000 -04:30
serie: Ruby on Rails desde Cero
description: Capítulo 18 de la serie Ruby on Rails desde Cero, donde hablamos sobre Time Zones y las buenas prácticas al utilizarlo.
dificultad: Intermedio
duracion: 20
categories:
- Cursos
- Ruby on Rails
tags:
- Ruby
- Ruby on Rails
- Time Zones
- ActiveSupport
---
Las series de cursos Ruby on Rails en CodeHero buscan otorgarte los conocimientos necesarios, para que puedas desarrollar tus propias aplicaciones Web. En el capítulo anterior aprendimos como se generan los controladores para la aplicación, que representan los métodos en nuestros controladores y cómo se leen parámetros ya sean en el URL o enviados por POST dentro de un formulario.

En este nuevo capítulo aprenderemos como funcionan los time zones o husos horarios en Rails.

* * *

## ¿Qué son Time zones (Husos Horarios)?

En geografía, huso horario es cada una de las veinticuatro áreas en que se divide la Tierra, siguiendo la misma definición de tiempo cronométrico. Se llaman así porque tienen forma de huso de hilar, y están centrados en meridianos de una longitud que es un múltiplo de 15°. Anteriormente, se usaba el tiempo solar aparente, con lo que las diferencias de hora entre una ciudad y otra eran de unos pocos minutos en los casos en los que las ciudades comparadas no se encontraban sobre un mismo meridiano. El empleo de los husos horarios corrigió el problema parcialmente, al sincronizar los relojes de una región al mismo tiempo solar medio.
Todos los husos horarios se definen en relación con el denominado tiempo universal coordinado (UTC), huso horario centrado sobre el meridiano de Greenwich que recibe ese nombre por pasar por el observatorio de Greenwich (Londres).
Puesto que la Tierra gira de oeste a este, al pasar de un huso horario a otro en dirección este hay que sumar una hora. Por el contrario, al pasar de este a oeste hay que restar una hora. El meridiano de 180°, conocido como línea internacional de cambio de fecha, marca el cambio de día.

Información extraída de [wikipedia](http://es.wikipedia.org/wiki/Huso_horario)

### Time zones en programación

Cuando programamos una aplicación que posiblemente sea utilizada en más de un pais debemos procurar el manejo de husos horarios, esto nos deja en manos de las librerías existentes nativas del lenguaje o de algún tercero. Si te ha tocado trabajar con time zones probablemente compartas mi opinion: "Todos los programadores odiamos los time zones". Esto debido a que muchas veces las librerías son engorrosas de utilizar, o simplemente pensamos que estamos haciendo lo correcto y no es así. Bueno, basta de explicaciones, vamos al grano.

## ¿Cómo funcionan en Rails?

Los time zones o husos horarios en Rails al igual que muchos otros temas que ya hemos tocado, está atado con la libreriá ActiveSupport. También podemos utilizar la clase `Date` nativa de Ruby que contiene la subclase `DateTime` pero sencillamente *recomiendo utilizar ActiveSupport* ya veremos porqué.

### Configuración de time_zone por defecto

Rails tiene una variable encargada de manejar el huso horario de nuestra aplicación, independientemente de la ubicación donde se encuentre instalado el servidor o el huso horario que éste tenga en su configuración el Sistema Operativo. ¿Qué permite esto? pues sencillo, la *base de datos* (todas) por lo general almacenan la información en UTC (+00:00), al utilizar la variable en la configuración de Rails ActiveRecord realizará el cambio de huso horario automáticamente en todas nuestros *queries*.

¿Donde se encuentra dicha configuración?
dentro del directorio `config/application.rb`

```ruby
# config.time_zone = "Europe/Madrid"
```

Para cambiar el huso horario basta con buscar el horario de preferencia en la lista de [constantes](http://api.rubyonrails.org/classes/ActiveSupport/TimeZone.html) de ActiveSupport o haciendo uso del siguiente rake task `rake time:zones:all`.

Vale destacar que podemos especificar el horario únicamente con el nombre

```ruby
config.time_zone = "Guadalajara"
```

### Time.zone

Una vez que hayamos especificado el huso horario de nuestra preferencia vamos a poder utilizar la clase `Time`, y el método `zone` retornará el valor de la configuración.

```ruby
[33] pry(main)> require 'active_support/all'
[57] pry(main)> Time.zone = "Berlin"
=> "Berlin"
[58] pry(main)> Time.now.in_time_zone.to_s
=> "2014-03-13 02:22:48 +0100"
[59] pry(main)> DateTime.now.in_time_zone.to_s
=> "2014-03-13 02:22:55 +0100"
[60] pry(main)> Time.zone.now.to_s
=> "2014-03-13 02:23:54 +0100"
[61] pry(main)> DateTime.now.to_s
=> "2014-03-12T20:55:08-04:30"
[62] pry(main)> Time.now.to_s
=> "2014-03-12 20:55:18 -0430"
```

{% include middle-post-ad.html %}

Podemos ver que se ha guardado "Berlin" como el huso horario de preferencia, esto es exactamente igual que utilizar el `config.time_zone`. Luego podemos ver que al utilizar `Time.now.in_time_zone.to_s` nos retorna correctamente la hora en en "Berlin". De igual manera `DateTime.now.in_time_zone.to_s` y `Time.zone.now.to_s`. También podemos apreciar que `DateTime.now.to_s` y `Time.now.to_s` son capaces de leer el huso horario pero en este caso el de mi computadora omitiendo nuestra variable de `Time.zone` y con esto es que debemos tener cuidado. Se puede cometer el error de utilizar estas variables sin ser las que necesitamos y queremos.

## Diferentes métodos

Rails a través de la librería ActiveSupport nos otorga varios métodos que nos facilitan múltiples tareas cómo:

- Fechas pasadas.
- Fechas a futuro.
- Tiempo actual.
- Tiempo en otros formatos.

### Fechas Pasadas

```ruby
[64] pry(main)> 1.day.ago.to_s
=> "2014-03-12 03:19:57 +0100"
[65] pry(main)> 2.hours.ago.to_s
=> "2014-03-13 01:20:14 +0100"
```

El método `ago` en conjunto con la fecha nos permite tener una fecha tentativa pasada sea un mes `month`, semana `week`, día `day` u hora `hours`.

### Fechas a futuro

```ruby
[66] pry(main)> 3.days.from_now.to_s
=> "2014-03-16 03:20:32 +0100"
[67] pry(main)> 2.weeks.from_now.to_s
=> "2014-03-27 03:30:18 +0100"
```

El método `from_now` al igual que el `ago` nos permite tener fechas en tiempo futuro sea por año, mes, dia u hora. Este es una función o método que podemos utilizar para crear fechas de caducidad en nuestra aplicación.

### Tiempo Actual

```ruby
[69] pry(main)> Time.current.to_s
=> "2014-03-13 03:21:08 +0100"
```

Este método podríamos decir que es una manera "resumida" de escribir `Time.zone.now.to_s`.

### Fecha Actual

```ruby
[68] pry(main)> Date.current.to_s
=> "2014-03-13"
[70] pry(main)> Time.zone.today.to_s
=> "2014-03-13"
```

Utilizando el método `current` sobre la clase `Date` y utilizando `Time.zone.today` nos retorna la fecha con el formato *año/mes/día* de la fecha actual.

### Tiempo en otros contactos

```ruby
[71] pry(main)> Time.zone.now.utc.iso8601.to_s
=> "2014-03-13T02:21:45Z"
```

En este caso utilizamos dos (2) tipos de formatos directamente en la consulta. Aplicamos el huso horario `utc` y luego el formato `iso8601` que es un standard utilizado en la mayoría de las bases de datos.

## Querying

Para utilizar husos horarios dentro de los queries y preguntar si una venta fue creada antes o después de una fecha podemos realizar lo siguiente:

Primero agregamos un objeto en base de datos.

```ruby
ale.create(precio: '40', nombre: 'mouse')
   (0.1ms)  begin transaction
  SQL (4.1ms)  INSERT INTO "sales" ("created_at", "nombre", "precio", "updated_at") VALUES (?, ?, ?, ?)  [["created_at", Thu, 13 Mar 2014 03:10:07 UTC +00:00], ["nombre", "mouse"], ["precio", "40"], ["updated_at", Thu, 13 Mar 2014 03:10:07 UTC +00:00]]
   (0.5ms)  commit transaction
=> #<Sale id: 1, precio: "40", nombre: "mouse", created_at: "2014-03-13 03:10:07", updated_at: "2014-03-13 03:10:07">
```

Segundo podemos preguntar si una venta se a realizado posterior de la fecha actual y luego anterior a la fecha actual.

```ruby
irb(main):009:0> s = Sale.where(["created_at > ?", Time.zone.now])
  Sale Load (0.2ms)  SELECT "sales".* FROM "sales" WHERE (created_at > '2014-03-13 03:11:17.960605')
=> #<ActiveRecord::Relation []>
irb(main):010:0> s = Sale.where(["created_at < ?", Time.zone.now])
  Sale Load (0.1ms)  SELECT "sales".* FROM "sales" WHERE (created_at < '2014-03-13 03:11:25.425127')
=> #<ActiveRecord::Relation [#<Sale id: 1, precio: "40", nombre: "mouse", created_at: "2014-03-13 03:10:07", updated_at: "2014-03-13 03:10:07">]>
```

Tambien podemos preguntar si se creó con fechas tentativas:

irb(main):011:0> s = Sale.where(["created_at < ?", 2.weeks.ago.to_s])
  Sale Load (0.2ms)  SELECT "sales".* FROM "sales" WHERE (created_at < '2014-02-27 03:18:38 UTC')
=> #<ActiveRecord::Relation []>
irb(main):012:0> s = Sale.where(["created_at < ?", 2.weeks.from_now.to_s])
  Sale Load (0.1ms)  SELECT "sales".* FROM "sales" WHERE (created_at < '2014-03-27 03:18:48 UTC')
=> #<ActiveRecord::Relation [#<Sale id: 1, precio: "40", nombre: "mouse", created_at: "2014-03-13 03:10:07", updated_at: "2014-03-13 03:10:07">]>
```

Una recomendación que hago es que cuando vayan a preguntar en un query con una fecha utilicen siempre los métodos de ActiveSupport.

## El deber ser en un api

Si nuestra aplicación tiene un API o funciona mediante un API, se recomienda SIEMPRE como buena práctica enviar la información al cliente en el huso horario UTC +00:00 y dejar en manos de el cliente transformar la información en el formato que requiera el usuario. Por otra parte también se recomienda utilizar el formato `iso8601` que mostramos anteriormente.

Pueden leer sobre esto [aquí](http://devblog.avdi.org/2009/10/25/iso8601-dates-in-ruby/).

* * *

## Conclusión.

En esta lección aprendimos a utilizar una propiedad más de `activesupport`particularmente Time Zones o husos horarios que nos permiten tener aplicaciones que se comporten correctamente a nivel mundial, como podemos realizar consultas con time zones y además las buenas prácticas de el uso de las mismas. Siéntanse libres en consultar cualquier duda a través de los comentarios.

¡Hasta el próximo capítulo!
