---
layout: post
status: publish
published: true
title: ActiveRecord parte 2
author: Ricardo Sampayo
author_login: ricardo
author_email: ricardo9588@gmail.com
author_url: http://www.ricardosampayo.com
wordpress_id: 2184
wordpress_url: http://codehero.co/?p=2184
date: 2013-09-06 00:01:39.000000000 -04:30
categories:
- Cursos
- Ruby on Rails
tags:
- Cursos
- Ruby on Rails
- ActiveRecord
- Scopes
- Joins
---
<p>Las series de cursos Ruby on Rails en CodeHero buscan otorgarte los conocimientos necesarios para que puedas desarrollar tus propias aplicaciones Web. Hasta este capítulo ya tenemos suficientes herramientas para comenzar con nuestra aplicación Web, abarcando temas básicos como instalación, estructura, vistas dinámicas e incluso conocimos un poco de ActiveRecord.</p>

<p>En este nuevo capítulo conoceremos más sobre ‘ActiveRecord’, herramienta que nos proporciona Ruby para acceder a la base de datos sin ejecutar código SQL. Si eres nuevo en nuestra comunidad te recomiendo le eches un vistazo a la serie <a href="http://codehero.co/series/ruby-on-rails-desde-cero/">Ruby on Rails desde cero</a> para ponernos al día con el tema que desarrollaremos a continuación. En este curso les mostraremos sintaxis y ejemplos para agilizar el proceso de aprendizaje.</p>

<hr />

<h2>Consultas entre tablas (joins Tables)</h2>

<p>ActiveRecord en Rails nos ofrece métodos de búsqueda llamada <strong>joins</strong> para hacer consultas en base de datos uniendo múltiples tablas, por ejemplo, si tenemos usuarios asociados a direcciones quizás nos vemos en la necesidad de obtener todos los usuarios que vivan en Venezuela, esta consulta podríamos resumirla en una sola sentencia con ayuda de los <strong>joins</strong> (Para conocer más acerca de las asociaciones te invito a que revises <a href="http://codehero.co/activerecord-asociaciones/">ActiveRecord Asociaciones</a>). Hay múltiples maneras de utilizar estos tipos de métodos.</p>

<h3>Utilizando fragmentos de SQL</h3>

<p>Una forma de utilizar Joins en Ruby on Rails es agregando fragmentos de código SQL a nuestra sentencia de ActiveRecord, por ejemplo si quisiéramos realizar la siguiente consulta <strong>SQL</strong>:</p>

<pre>SELECT usuarios.* FROM usuarios 
    INNER JOIN direccions ON direccions.usuario_id = usuarios.id
</pre>

<p>Esta consulta nos otorga todos los usuarios que tengan al menos una dirección, con este método para realizar esa consulta con Rails simplemente agregamos el fragmento donde se especifica el join y lo agregamos de la siguiente manera:</p>

<pre>Usuario.joins('INNER JOIN direccions ON direccions.usuario_id = usuarios.id')
</pre>

<h3>Utilizando las herramientas Rails</h3>

<p>ActiveRecord nos permite utilizar los nombres de las variables definidas en el modelo como un atajo para construir consultas de objetos asociados entre si. Este método sólo funciona con <strong>INNER JOIN</strong>. Este tipo de uso para los joins es el más recomendado, ya que evitas completamente el uso de código SQL nativo. Veamos mejor esto en una serie de ejemplos:</p>

<p>El primer ejemplo para entender mejor de que estamos hablando, lo podemos ilustrar reproduciendo el ejemplo anterior pero con este tipo de formato:</p>

<pre>Usuario.joins(:direccions)
</pre>

<p>¿Cómo haríamos si quisiéramos todos los usuarios que tienen alguna dirección y que tengan al menos una factura (suponiendo que un usuario esta asociado de alguna manera a direcciones y facturas)?</p>

<pre>Usuario.joins(:direccions, :facturas)
</pre>

<p>Con esta sentencia responderíamos de forma eficiente la pregunta formulada recibiendo a todos los usuarios con al menos una dirección y una factura. El código SQL que ejecuta esta sentencia es la siguiente:</p>

<pre>SELECT usuarios.* FROM usuarios
  INNER JOIN direccions ON usuarios.usuario_id= direccions.id
  INNER JOIN facturas ON facturas.usuario_id = usuarios.id
</pre>

<p>Por último desarrollaremos un ejemplo un poco más complejo, con el cual se muestra una consulta con asociaciones anidadas, es decir, objetos asociados al objeto principal y estos a su vez con mas asociaciones. Veamos los ejemplos de una vez.</p>

<p>En este ejemplo haremos una consulta de usuarios que tengan al menos una dirección y que estas direcciones les pertenezcan al menos un teléfono (suponiendo que son tres objetos diferentes asociados de alguna de las maneras estudiadas en capítulos anteriores), veamos esto en código:</p>

<pre>Usuario.joins(direccions: :telefonos)
</pre>

<p>El comando SQL que ejecuta esta sentencia es el siguiente:</p>

<pre>SELECT usuarios.* FROM usuarios
  INNER JOIN direccions ON usuarios.usuario_id= direccions.id
  INNER JOIN telefonos ON telefonos.direccion_id = direccions.id
</pre>

<h3>Unión entre tablas con condiciones</h3>

<p>Por último para cerrar con el tema de consultas anidadas con <strong>Joins</strong>, estudiaremos cómo desarrollar consultas y agregarles condiciones para así realizar búsquedas más específicas. El uso de condiciones para estas consultas son las mismas ya estudiadas en capítulos anteriores. Vemos un ejemplo de esto:</p>

<pre>Usuario.joins(:direccions).where(direcions: {pais: 'Venezuela'})
</pre>

<p>La sentencia que utilizamos en el ejemplo nos trae a todos los usuarios que tengan una dirección en Venezuela. La sintaxis SQL que genera esta sentencia es la siguiente:</p>

<pre>SELECT usuarios.* FROM usuarios 
    INNER JOIN direccions ON direccions.usuario_id = usuarios.id 
    WHERE direccions.pais = 'Venezuela'
</pre>

<hr />

<h2>Scopes</h2>

<p>Esta característica de Rails nos permite especificar consultas que suponemos que reutilizaremos a menudo en el código en una especie de variable que luego usaremos de manera más limpia y eficiente. Veamos cómo se declara esta maravillosa característica para luego mostrar algunos ejemplos básicos.</p>

<pre>class Usuario &lt; ActiveRecord::Base
  scope :masculino, -> { where(sexo: "masculino") }
end
</pre>

<p>En esta sentencia simplemente declaramos una función que nos especifica una condición de búsqueda donde el sexo sea igual a masculino. Veamos un ejemplo de cómo usamos esto:</p>

<pre>Usuario.masculino
</pre>

<p>Como ven, con esta simple y elegante línea de código consultamos a todos los usuarios hombres de la base de datos.</p>

<p>Veamos ahora como hacer un <code>scope</code> que reciba argumentos:</p>

<pre>class Usuario &lt; ActiveRecord::Base
  scope :mayor_que, ->(time) { where("nacimiento &lt; ?", time) }
end
</pre>

<p>Esta sentencia simplemente nos da una condición para consultar a todos los usuarios que nacieron antes de una fecha específica. Veamos cómo es la sintaxis para utilizar esta sentencia:</p>

<pre>Usuario.mayor_que(Time.zone.parse("1988-05-09"))
</pre>

<p>En este ejemplo traemos a todos los usuarios que nacieron antes del <strong>09 de mayo de 1988</strong>.</p>

<p>Por último Rails también nos permite utilizar varios <code>scope</code> para una misma consulta. Veamos cómo se declara esto y luego cuál sería la llamada para ejecutar el ejemplo:</p>

<pre>class Usuario &lt; ActiveRecord::Base
  scope :masculino, -> { where(sexo: "masculino") }
  scope :mayor_que, ->(time) { where("nacimiento &lt; ?", time) }
end
</pre>

<p>Esta sentencia se llama de la siguiente manera:</p>

<pre>Usuario.masculino.mayor_que(Time.zone.parse("1988-05-09"))
 </pre>

<p>Como seguramente ya nos hemos dado cuenta por los dos ejemplos anteriores estos nos trae a todos los Usuarios <strong>masculinos</strong> que nacieron antes del <strong>09 de mayo de 1988</strong>.</p>

<hr />

<h2>Conclusión</h2>

<p>En esta lección conocimos dos conceptos que en mi opinión son importantísimos para el desarrollo en Rails interactuando con la base de datos sin utilizar sintaxis SQL nativa. Aprendimos cómo realizar consultas entre tablas relacionadas y cómo mantener nuestro código limpio y elegante utilizando los <code>scope</code></p>

<p>No dude en hacernos saber sus dudas y comentarios en la sección de comentarios y además espero que te unas a nuestra comunidad y revises nuestros otros cursos.</p>

<p>¡Hasta el próximo capítulo!</p>
