---
layout: post
status: publish
published: true
title: Bases de Datos
author: Carlos Picca
author_login: carlos
author_email: carlospicca@gmail.com
wordpress_id: 1819
wordpress_url: http://codehero.co/?p=1819
date: 2013-07-31 02:58:51.000000000 -04:30
categories:
- Cursos
- Python
tags:
- Python
- Base de datos
- bd
- MySql
- MySQLdb
- insertar
- eliminar
- obtener
- crear
---
<p>Bienvenidos una vez más a Python desde Cero, curso en el cual aprendemos a programar sin conocimiento alguno. En el capítulo anterior, te enseñe a programar orientado a objetos, es decir, aprendimos como definir una clase, como definir sus atributos, como instanciarla y como generar la lógica necesaria para su completo funcionamiento. Si eres nuevo en este curso, te recomiendo que le eches un vistazo al capítulo anterior para que te pongas en contexto (<a href="http://codehero.co/python-desde-cero-clases-atributos-y-metodos/">Capítulo 5 - Clases, Atributos y Métodos</a>)</p>

<p>Hoy, vamos a aprender todo lo relacionado con el módulo <strong>MySQLdb</strong>, en otras palabras, aprenderemos a conectarnos a una base de datos MySql, a crear tablas, y a como insertar, obtener, modificar y eliminar registros de la base da datos usando el API de Python para BD.</p>

<hr />

<h2>Bases de Datos</h2>

<p>El estándar de Python para las interfaces de bases de datos es el <strong>Python DB-API</strong>. La mayoría de las interfaces de bases de datos de Python se adhieren a este estándar, por lo que dicho API es compatible con una amplia gama de servidores de bases de datos, entre ellos:</p>

<ul>
<li>GadFly</li>
<li>mSQL</li>
<li>MySQL</li>
<li>PostgreSQL</li>
<li>Microsoft SQL Server 2000</li>
<li>Informix</li>
<li>Interbase</li>
<li>Oracle</li>
<li>Sybase</li>
</ul>

<blockquote>
  <p>Si quieres saber más información sobre la listas de base de datos compatible con Python te recomiendo que visites <a href="http://wiki.python.org/moin/DatabaseInterfaces">Interfaces y API’s de bases de datos para Python</a>.</p>
  
  <p>Es importante resaltar que si quieres hacer uso de una base de datos digamos Oracle (por poner un ejemplo) vas a tener que descargar el módulo respectivo para este tipo de base de datos.</p>
</blockquote>

<hr />

<h2>¿Qué es MySQLdb?</h2>

<p>MySQLdb es una interfaz para la conexión a un servidor de base de datos MySQL desde Python.</p>

<h3>¿Cómo instalar MySQLdb?</h3>

<p>Antes de continuar, vamos a asegurarnos de que no tengamos instalado MySQLdb en nuestras máquinas. Creemos un script con lo siguiente y ejecutemoslo:</p>

<pre>#!/usr/bin/python

import MySQLdb
</pre>

<p>Si se produce el siguiente error entonces significa que el módulo de <strong>MySQLdb</strong> no está instalado en nuestra máquina:</p>

<pre>Traceback (most recent call last):
  File "prueba.py", line 3, in &lt;module>
    import MySQLdb
ImportError: No module named MySQLdb
</pre>

<p>Existen dos formas para instalar el módulo de <strong>MySQLdb</strong>, la manera sencilla, ejecutando el siguiente comando:</p>

<pre>pip install MySQL-python
</pre>

<p>y la manera engorrosa, donde debemos descargar de <a href="http://sourceforge.net/projects/mysql-python/">Descargas MySQLdb</a> el módulo, y una vez descargado ejecutamos los siguientes comandos:</p>

<pre>$ gunzip MySQL-python-1.2.2.tar.gz
$ tar -xvf MySQL-python-1.2.2.tar
$ cd MySQL-python-1.2.2
$ python setup.py build
$ python setup.py install
</pre>

<blockquote>
  <p>Asegúrate de tener los privilegios de root para realizar la instalación.</p>
</blockquote>

<hr />

<h2>Conexión a la base de datos</h2>

<p>Antes de conectarnos a una base de datos en MySQL asegúrate de cumplir con lo siguiente:</p>

<ul>
<li>Haber creado una base de datos llamada <strong>prueba_db</strong>.</li>
<li>Haber creado un usuario de conexión que posea las siguientes características: <strong>usuario: usuarioprueba</strong> y <strong>clave: prueba123</strong>.</li>
</ul>

<p>La mejor manera de ver y entender como conectarnos a una base de datos en Python es a través de un ejemplo:</p>

<pre>#!/usr/bin/python

import MySQLdb

# Establecemos la conexión con la base de datos
bd = MySQLdb.connect("localhost","usuarioprueba","prueba123","prueba_db" )

# Preparamos el cursor que nos va a ayudar a realizar las operaciones con la base de datos
cursor = bd.cursor()

# Ejecutamos un query SQL usando el método execute() que nos proporciona el cursor
cursor.execute("SELECT VERSION()")

# Extraemos una sola fila usando el método fetchone()
data = cursor.fetchone()

print "Versión Base de Datos : %s " % data

# Nos desconectamos de la base de datos
bd.close()
</pre>

<p>Si ejecutamos el script anterior nos debería aparecer lo siguiente:</p>

<pre>Versión Base de Datos : 5.0.45
</pre>

<blockquote>
  <p>Observemos que un objeto de conexión fue retornado una vez que se estableció una conexión exitosa con la base de datos, este objeto se asignó a la variable <code>bd</code>. Luego, esta variable <code>bd</code> es usada para crear un cursor, el cual es el medio por donde podemos ejecutar queries SQL. En nuestro caso ejecutamos <code>SELECT VERSION()</code>, dicho query retorna la versión de la base de datos. Por último, cerramos la sesión establecida con la base de datos para así no gastar recursos.</p>
</blockquote>

<hr />

<h2>¿Cómo creamos una tabla en la base de datos?</h2>

<p>Una vez que sabemos como establecer una conexión con la base de datos, estamos listos para crear tablas en la base de datos utilizando el método <code>execute</code> del cursor que creamos anteriormente. Veamos como crear una tabla denominada <strong>empleado</strong> dentro de nuestra base de datos:</p>

<pre>#!/usr/bin/python

import MySQLdb

# Establecemos la conexión con la base de datos
bd = MySQLdb.connect("localhost","usuarioprueba","prueba123","prueba_db" )

# Preparamos el cursor que nos va a ayudar a realizar las operaciones con la base de datos
cursor = bd.cursor()

# Creamos la tabla empleado
sql = "CREATE TABLE EMPLEADO (
         NOMBRE  CHAR(20) NOT NULL,
         APELLIDO  CHAR(20),
         EDAD INT,  
         SEXO CHAR(1),
         SALARIO FLOAT )"

cursor.execute(sql)

# Nos desconectamos de la base de datos 
bd.close()
</pre>

<blockquote>
  <p>Observemos que a través del método <code>execute</code> del <code>cursor</code> podemos ejecutar cualquier tipo de query que deseemos, en este caso un <code>CREATE</code>.</p>
</blockquote>

<hr />

<h2>¿Cómo insertamos un empleado en la base de datos?</h2>

<p>La operación <strong>insertar</strong> es necesario si deseas crear registros en una tabla de base de datos. Veamos como insertar un empleado dentro de la tabla <strong>EMPLEADO</strong> que creamos anteriormente.</p>

<pre>#!/usr/bin/python

import MySQLdb

# Establecemos la conexión con la base de datos
bd = MySQLdb.connect("localhost","usuarioprueba","prueba123","prueba_db" )

# Preparamos el cursor que nos va a ayudar a realizar las operaciones con la base de datos
cursor = bd.cursor()

# Preparamos el query SQL para insertar un registro en la BD
sql = "INSERT INTO EMPLEADO (NOMBRE,
         APELLIDO, EDAD, SEXO, SALARIO)
         VALUES ('Carlos', 'Picca', 24, 'M', 2000)"
try:
   # Ejecutamos el comando
   cursor.execute(sql)
   # Efectuamos los cambios en la base de datos
   bd.commit()
except:
   # Si se genero algún error revertamos la operación
   bd.rollback()

# Nos desconectamos de la base de datos 
bd.close()
</pre>

<blockquote>
  <p>Observemos que para que los cambios sean efectuados en la base de datos es necesario usar <code>bd.commit()</code>. Si queremos reversar los cambios efectuados podemos usar <code>bd.rollback()</code>.</p>
</blockquote>

<hr />

<h2>¿Cómo obtenemos todos los empleados registrados en la base de datos?</h2>

<p>La operación <strong>lectura</strong> es necesaria si quieres buscar información dentro de la base de datos.</p>

<p>Veamos los métodos mas usados a la hora de ejecutar un lectura en la base de datos desde Python:</p>

<ul>
<li><strong>fetchone()</strong> - Este método obtiene la primera fila de un conjunto de resultados de una consulta a la BD. </li>
<li><strong>fetchall()</strong> - Este método obtiene todos los registros de un conjunto de resultados de una consulta a la BD. </li>
<li><strong>rowcount</strong> - Este es un atributo de sólo lectura y devuelve el número de filas afectadas por el método <code>execute</code>.</li>
</ul>

<p>Veamos como obtener todos los registros de la tabla <strong>EMPLEADO</strong>:</p>

<pre>#!/usr/bin/python

import MySQLdb

# Establecemos la conexión con la base de datos
bd = MySQLdb.connect("localhost","usuarioprueba","prueba123","prueba_db" )

# Preparamos el cursor que nos va a ayudar a realizar las operaciones con la base de datos
cursor = bd.cursor()

# Preparamos el query SQL para obtener todos los empleados de la BD 
sql = "SELECT * FROM EMPLEADO"
try:
   # Ejecutamos el comando
   cursor.execute(sql)
   # Obtenemos todos los registros en una lista de listas
   resultados = cursor.fetchall()
   for registro in resultados:
      nombre = registro[0]
      apellido = registro[1]
      edad = registro[2]
      sexo = registro[3]
      salario = registro[4]
      # Imprimimos los resultados obtenidos
      print "nombre=%s, apellido=%s, edad=%d, sexo=%s, salario=%d" % (nombre, apellido, edad, sexo, salario)
except:
   print "Error: No se pudo obtener la data"

# Nos desconectamos de la base de datos 
bd.close()
</pre>

<p>Si has seguido los ejemplos anteriores y ejecutas el script, deberás obtener un solo empleado ya que solo habíamos insertado un solo registro:</p>

<pre>nombre=Carlos, apellido=Picca, edad=24, sexo=M, salario=2000
</pre>

<hr />

<h2>¿Cómo modificamos a un empleado en la base de datos?</h2>

<p>La operación <strong>actualización</strong> significa actualizar uno o más registros que ya están disponibles en la base de datos. Veamos como modificar la edad de un empleado cuyo salario sea igual a <code>2000</code>:</p>

<pre>#!/usr/bin/python

import MySQLdb

# Establecemos la conexión con la base de datos
bd = MySQLdb.connect("localhost","usuarioprueba","prueba123","prueba_db" )

# Preparamos el cursor que nos va a ayudar a realizar las operaciones con la base de datos
cursor = bd.cursor()

# Preparamos el query SQL para modificar el registro
sql = "UPDATE EMPLEADO SET EDAD = EDAD + 1 WHERE SALARIO = 2000"
try:
   # Ejecutamos el comando
   cursor.execute(sql)
   # Efectuamos los cambios en la base de datos
   bd.commit()
except:
   # Si se genero algún error revertamos la operación
   bd.rollback()

# Nos desconectamos de la base de datos 
bd.close()
</pre>

<hr />

<h2>¿Cómo eliminamos a un empleado en la base de datos?</h2>

<p>La operación <strong>eliminar</strong> es necesario si desea eliminar uno o varios registros de la base de datos. Veamos como eliminar a un empleado cuyo apellido sea igual a <code>Picca</code>:</p>

<pre>#!/usr/bin/python

import MySQLdb

# Establecemos la conexión con la base de datos
bd = MySQLdb.connect("localhost","usuarioprueba","prueba123","prueba_db" )

# Preparamos el cursor que nos va a ayudar a realizar las operaciones con la base de datos
cursor = bd.cursor()

# Preparamos el query SQL para eliminar al empleado 
sql = "DELETE FROM EMPLEADO WHERE APELLIDO=‘Picca’"
try:
   # Ejecutamos el comando
   cursor.execute(sql)
   # Efectuamos los cambios en la base de datos
   bd.commit()
except:
   # Si se genero algún error revertamos la operación
   bd.rollback()

# Nos desconectamos de la base de datos 
bd.close()
</pre>

<hr />

<h2>Conclusión</h2>

<p>En esta lección, aprendimos todo lo relacionado con el módulo MySQLdb, en otras palabras, aprendimos a conectarnos a una base de datos MySql, a crear tablas, y a como insertar, obtener, modificar y eliminar registros de la base da datos usando el API de Python para BD. Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso. Te espero la próxima semana!</p>
