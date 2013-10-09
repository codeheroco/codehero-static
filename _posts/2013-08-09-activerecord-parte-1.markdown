---
layout: post
status: publish
published: true
title: ActiveRecord parte 1
author: Ricardo Sampayo
author_login: ricardo
author_email: ricardo9588@gmail.com
author_url: http://www.ricardosampayo.com
wordpress_id: 1922
wordpress_url: http://codehero.co/?p=1922
date: 2013-08-09 00:01:05.000000000 -04:30
categories:
- Cursos
- Ruby on Rails
tags:
- Cursos
- Ruby on Rails
- curso
- ActiveRecord
comments: []
---
<p>Las series de cursos Ruby on Rails en CodeHero buscan otorgarte los conocimientos necesarios, para que puedas desarrollar tus propias aplicaciones Web. Hasta este capítulo ya tenemos suficientes herramientas para comenzar con nuestra aplicación Web, abarcando temas básicos como instalación, estructura y funcionamiento de vistas dinámicas.</p>

<p>En este nuevo capítulo conoceremos mas sobre 'ActiveRecord' herramienta que nos proporciona Ruby para acceder a la base de datos sin ejecutar código SQL. En este curso les mostraremos sintaxis y ejemplos para agilizar el proceso de aprendizaje.</p>

<hr />

<h2>¿Qué es ActiveRecord?</h2>

<p>Active Record es una clase para la administración y funcionamiento de los modelos. Esta clase proporciona la capa objeto-relacional que sigue rigurosamente el estándar ORM (Tablas en Clases, Registros en Objetos, y Campos en Atributos), facilita el entendimiento del código asociado a base de datos y encapsula la lógica específica haciéndola más fácil de usar para nosotros los programadores.</p>

<h3>Ventajas del ActiveRecord</h3>

<ul>
<li>Manejo de entidades con objetos de Ruby.</li>
<li>Las acciones del CRUD (Insertar, leer, modificar y eliminar) están encapsuladas así que se reduce el código y se hace más fácil de comprender.</li>
<li>Código fácil de entender y mantener</li>
<li>Se reduce el uso de código SQL considerablemente lo que implica sierta independencia del manejador de base de datos que usamos.</li>
</ul>

<hr />

<h2>Recuperando objeto único</h2>

<p>ActiveRecord ofrece cinco maneras para obtener un objeto único que iremos demostrando una a una:</p>

<h3>Find</h3>

<p>Esta función nos permite obtener un objeto de la base de datos buscándolo por el identificador primario (primary key), un Ejemplo de esto seria:</p>

<pre># suponiendo existe el modelo Usuario
usuario = Usuario.find(10)
</pre>

<p>Suponiendo que 'Usuario' es el modelo que accede a base de datos, este ejemplo ejecuta el siguiente comando MySQL:</p>

<pre>SELECT * FROM usuarios WHERE usuarios.id = 10 LIMIT 1
</pre>

<h3>take</h3>

<p>Esta función simplemente toma un objeto de la base de datos sin un orden específico. Veamos un ejemplo y la ejecución SQL que éste ejecuta:</p>

<pre>usuario = Usuario.take
</pre>

<p>Este ejemplo ejecuta por detrás del código el siguiente comando SQL:</p>

<pre>SELECT * FROM usuarios LIMIT 1
</pre>

<h3>first y last</h3>

<p>Estas útiles funciones nos dan el primer y último registro del objeto que estemos solicitando respectivamente. Veamos ejemplos de estas funciones y la equivalencia en sintaxis SQL:</p>

<pre># primer objeto de la tabla
usuario = Usuario.first

# ultimo Objeto de la lista
usuario = Usuario.last
</pre>

<p>El equivalente a la ejecución de estos ejemplos sería lo siguiente:</p>

<pre># primer objeto de la tabla
SELECT * FROM usuarios ORDER BY usuarios.id ASC LIMIT 1

# ultimo Objeto de la lista
SELECT * FROM usuarios ORDER BY usuarios.id DESC LIMIT 1
</pre>

<h3>find_by</h3>

<p>Esta última función recupera el primer registro que coincida con las características dadas, veamos un ejemplo con su equivalencia SQL para entender mejor:</p>

<pre>Usuario.find_by nombre: 'Ricardo', apellido: 'Sampayo'
</pre>

<p>El equivalente comando SQL para este ejemplo es el siguiente:</p>

<pre>SELECT * FROM usuarios WHERE nombre = 'Ricardo' and  apellido = 'Sampayo' LIMIT 1
</pre>

<hr />

<h2>Recuperación de varios objetos en lotes</h2>

<p>Las funciones que mostraremos a continuación nos permite obtener listas de objetos.</p>

<h3>all</h3>

<p>Esta función como su nombre nos dice recupera todos los registros de una tabla retornando en un arreglos de objetos. Ejemplo y equivalencia en SQL:</p>

<pre>usuarios = Usuario.all
</pre>

<p>Su equivalente sentencia SQL:</p>

<pre>SELECT * FROM usuarios 
</pre>

<h3>find_each</h3>

<p>El find_each método recupera un lote de registros y a continuación podemos manipular cada uno de los registros de forma individual. Este proceso ocurre hasta que haya procesado todos los objetos. Veamos unos ejemplos para comprender mejor esto:</p>

<pre># por defecto este primer ejemplo nos da los primeros 1000 registros 

Usuario.find_each do |user|
  . . . # se manipula cada uno de los objetos  
end

# En este otro ejemplo se extraen 5000 registros partiendo del usuario con identificador 15

Usuario.find_each(start: 15, batch_size: 5000) do |user|
  . . . # se manipula cada uno de los objetos  
end

</pre>

<hr />

<h2>Condiciones</h2>

<p>ActiveRecord también nos provee métodos que nos permite especificar las condiciones para limitar los registros devueltos, lo que representa el 'WHERE' en sentencias SQL. Estas condiciones bien se pueden especificar de tres formas diferentes.</p>

<p>Primero mostraremos un ejemplo estableciendo como condición una cadena de caracteres ('String' es la que menos les recomiendo):</p>

<pre># todos los usuarios que se llamen Ricardo
usuarios = Usuario.where("nombre = 'Ricardo'")

#todos los usuarios que su nombre comience por Ri
usuarios = Usuario.where("nombre LIKE 'Ri%'")
</pre>

<p>Estos ejemplos ejecutan la siguiente sentencia SQL respectivamente:</p>

<pre># todos los usuarios que se llamen Ricardo
SELECT * FROM usuarios WHERE nombre = 'Ricardo';

#todos los usuarios que su nombre comience por Ri
SELECT * FROM usuarios WHERE nombre like 'Ri%' ;

</pre>

<p>A continuación mostraremos unos ejemplos más seguros para establecer condiciones de búsqueda, al igual que lo hemos hecho hasta ahora mostrando la sentencia SQL para ayudarnos a entrar en contexto:</p>

<pre># todos los usuarios que se llamen Ricardo
Usuario.where("nombre = ?", 'Ricardo')

# todos los usuarios mayores de 18 y menores de 50 años
Usuario.where("edad >= :init_edad AND edad &lt;= :fin_edad", {init_edad: 18, fin_edad: 50})

</pre>

<p>Su equivalente SQL:</p>

<pre>SELECT * FROM usuarios WHERE nombre = 'Ricardo';

SELECT * FROM usuarios WHERE edad >= 18 and edad &lt;= 50;
</pre>

<p>Por último también podemos establecer nuestras condiciones de búsqueda como si fueran objetos ('Hash'), veamos un ejemplo para explicar esto mejor:</p>

<pre># todos los usuarios que se llamen Ricardo
Usuario.where(nombre: 'Ricardo')

# Todos los usuarios que el nombre sea DIFERENTE de Ricardo
Usuario.where.not(nombre: 'Ricardo')
</pre>

<p>Su equivalente SQL:</p>

<pre>SELECT * FROM usuarios WHERE nombre = 'Ricardo';

SELECT * FROM usuarios WHERE nombre != 'Ricardo';

</pre>

<hr />

<h2>Ordenando</h2>

<p>Al igual que con las condiciones ActiveRecord también nos permite solicitar una lista registros ordenados por algunos de los campos (El equivalente al ORDER BY en SQL).</p>

<p>Por ejemplo ordenaremos en este caso los usuarios por fecha de última modificación ('updated_at' campos que se crean automáticamente para auditoria) de la siguiere manera:</p>

<pre>ordenando por updated_al de forma ascendente 
Usuario.order("updated_at")

Ordenando por fecha de modificación decreciente y por nombre ascendente
Usuario.order("updated_at DESC , nombre ASC")
</pre>

<p>Su equivalente SQL:</p>

<pre>SELECT * FROM usuarios ORDER BY usuarios.updated_at ASC;

SELECT * FROM usuarios ORDER BY usuarios.updated_at DESC , usuarios.nombre ASC;
</pre>

<hr />

<h2>Limit y Offset</h2>

<p>Estas dos funciones nos permiten limitar la cantidad de elementos solicitados a la base de datos empezando desde un punto específico. un ejemplo de esto es lo siguiente:</p>

<pre>solo 8 usuarios sin orden especifico
Usuario.limit(8)

solo 5 usuarios sin orden especifico comenzando desde la fila 31
Usuario.limit(5).offset(30)
</pre>

<p>Su equivalente SQL:</p>

<pre>SELECT * FROM usuarios LIMIT 8 ;

SELECT * FROM usuarios LIMIT 5 OFFSET 30;
</pre>

<hr />

<h2>Group y Having</h2>

<p>Al igual que con sintaxis SQL ActiveRecord nos permite hacer agrupaciones por algún campo de la base de datos y especificar condiciones a estos grupos veamos un ejemplo:</p>

<pre>#Trae la fecha de actualización y el promedio de la edad 
#agrupados por día y donde el promedio sea mayor a 18

Usuario.select(date(updated_at) as ordered_date, avg(edad) as edad_avg").group("date(updated_at)").having("avg(edad) > ?", 18)
</pre>

<hr />

<h2>Conclusión</h2>

<p>En esta lección conocimos básicamente como hacer peticiones a la base de datos sin necesidad de utilizar sintaxis SQL, vimos las ventajas más importantes de ActiveRecord y algunos conceptos básico para entrar en materia para el próximo capítulo.</p>

<p>En nuestro próximo capítulo estaremos profundizando un poco más sobre ActiveRecord, ya que aún nos queda mucho de este tema.</p>

<p>No dude en hacernos saber sus dudas y comentarios en la sección de comentarios y además espero que te unas a nuestra comunidad y revises nuestros otros cursos.</p>

<p>¡Hasta el próximo capítulo!</p>
