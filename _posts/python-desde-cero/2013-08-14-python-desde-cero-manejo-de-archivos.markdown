---
layout: post
status: publish
published: true
title: Manejo de Archivos
author: Carlos Picca
author_login: carlos
author_email: carlospicca@gmail.com
wordpress_id: 1982
wordpress_url: http://codehero.co/?p=1982
date: 2013-08-14 00:28:41.000000000 -04:30
serie: Python desde Cero
dificultad: Novato
duracion: 20
description: Curso en el cual aprenderemos Python desde Cero. En esta clase, aprenderemos todo lo relacionado con el manejo de archivos en Python.
categories:
- Cursos
- Python
tags:
- Python
- archivo
- modos
- escribir
- leer
- cerrar
- abrir
---
<p>Bienvenidos una vez más a Python desde Cero, curso en el cual aprendemos a programar sin conocimiento alguno. En el capítulo anterior, te enseñe todo lo relacionado con el módulo MySQLdb, en otras palabras, aprendimos a conectarnos a una base de datos MySql, a crear tablas, y a como insertar, obtener, modificar y eliminar registros de la base da datos usando el API de Python para BD. Si eres nuevo en este curso, te recomiendo que le eches un vistazo al capítulo anterior para que te pongas en contexto (<a href="http://codehero.co/python-desde-cero-bases-de-datos/">Capítulo 6 - Bases de Datos</a>)</p>

<p>Hoy, vamos a aprender todo lo relacionado con el manejo de archivos en Python, desde como abrirlo hasta como escribir y leer información del mismo.</p>

<hr />

<h2>¿Cómo abrimos un archivo?</h2>

<p>Antes de que podamos leer o escribir un archivo, hay que abrirlo con la función de Python <code>open()</code>. Esta función crea un objeto <strong>archivo</strong> que se utiliza para llamar a otros métodos de apoyo asociados. Veamos cual es la sintaxis:</p>

```python
objecto_archivo = open(file_name [, access_mode][, buffering])
```

<p>Describamos un poco los argumentos de la función:</p>

<ul>
<li><strong>file_name</strong> - Nombre del archivo que se desea acceder.</li>
<li><strong>access_mode</strong> - Determina el modo en el que el archivo tiene que ser abierto, es decir. leer, escribir, etc. El modo de acceso de archivos por defecto es de <strong>lectura</strong>.</li>
<li><strong>buffering</strong> - Si el valor de búfer se establece en 0, ningún almacenamiento temporal se llevará a cabo. Si el valor es 1, el búfer se realizara por linea.</li>
</ul>

<p>Aquí está una lista con los diferentes modos de apertura de un archivo:</p>

<p><img src="http://i.imgur.com/sbFA1c9.png" alt="modos-apertura-archivos-python" /></p>

<hr />

<h2>¿Cuáles son los atributos más importantes de un archivo?</h2>

<p>Una vez que hemos abierto el archivo, podemos obtener la información relacionada a el mismo. Veamos una lista con todos los atributos más importantes relacionados al tipo de objeto:</p>

<p><img src="http://i.imgur.com/mm0WPEw.png" alt="atributos-archivos-python" /></p>

<p>Veamos un ejemplo sobre como utilizar todo lo que hemos visto hasta ahora:</p>

```python
#!/usr/bin/python

# Abrimos el archivo codehero.txt
fo = open("codehero.txt", "wb")
print "Nombre del archivo : ", fo.name
print "Cerrado o no : ", fo.closed
print "Modo de apertura : ", fo.mode
```

<p>Si ejecutamos el script anterior debemos obtener el siguiente resultado:</p>

```python
Nombre del archivo:  codehero.txt
Cerrado o no :  False
Modo de apertura :  wb
```

<hr />

<h2>¿Cómo cerramos un archivo?</h2>

<p>Para cerrar un archivo usamos el método <code>close()</code>, el cual limpia cualquier información que no haya sido escrita y cierra el archivo. Después que este método es ejecutado no podemos ejecutar ninguna escritura.</p>

<p>Python automáticamente cierra el archivo una ves que la referencia del objeto es asignada a un nuevo archivo.</p>

<blockquote>
  <p>Es una buena practica hacer uso del método <strong>close()</strong> para cerrar los archivos una vez que terminemos de trabajar con ellos.</p>
</blockquote>

<p>Veamos la sintaxis que debemos usar:</p>

```python
objecto_archivo.close();
```

<p>Veamos como usar <code>close()</code> con un ejemplo:</p>

```python
#!/usr/bin/python

# Abrimos el archivo codehero.txt
fo = open("codehero.txt", "wb")
print "Nombre del archivo: ", fo.name

# Cerramos el archivo codehero.txt
fo.close()
```

<p>Si ejecutamos el script anterior obtenemos:</p>

```python
Nombre del archivo:  codehero.txt
```

<hr />

<h2>¿Cómo escribir un archivo?</h2>

<p>En Python para escribir información en un archivo usamos el método <code>write()</code>.</p>

<blockquote>
  <p>Es importante tener en cuenta que las cadenas de caracteres(strings) de Python pueden tener datos binarios y no sólo de texto.</p>

  <p>El método <code>write()</code> no añade un carácter de nueva línea ('\ n') al final de la cadena.</p>
</blockquote>

<p>Veamos la sintaxis para poder escribir en un archivo:</p>

```python
objecto_archivo.write(string);
```

<blockquote>
  <p>Observemos que <code>string</code> es el texto que queremos escribir en el archivo.</p>
</blockquote>

<p>Veamos como usar <code>write()</code> con un ejemplo:</p>

```python
#!/usr/bin/python

# Abrimos el archivo codehero.txt
fo = open("/tmp/codehero.txt", "wb")
fo.write( "Codehero es una gran pagina para aprender a programar Python.\nSíguenos en @codeheroblog!!\n");

# Cerramos el archivo codehero.txt
fo.close()
```

<p>Si ejecutamos el script anterior obtenemos:</p>

```python
Codehero es una gran pagina para aprender a programar Python.
Síguenos en @codeheroblog!!
```

<hr />

<h2>¿Cómo leer un archivo?</h2>

<p>En Python para leer información de un archivo usamos el método <code>read()</code>.</p>

<blockquote>
  <p>Es importante tener en cuenta que las cadenas de caracteres(strings) de Python pueden tener datos binarios y no sólo de texto.</p>
</blockquote>

<p>Veamos la sintaxis para poder leer un archivo:</p>

```python
objecto_archivo.read([count]);
```

<blockquote>
  <p>Observemos que <code>count</code> es el numero de bytes a leer del archivo.</p>
</blockquote>

<p>Veamos como usar <code>read()</code> con un ejemplo:</p>

```python
#!/usr/bin/python

# Abrimos el archivo codehero.txt
fo = open("/tmp/codehero.txt", "r+")
str = fo.read(10);
print "La lectura es : ", str

# Cerramos el archivo codehero.txt
fo.close()
```

<p>Si ejecutamos el script anterior obtenemos:</p>

```python
La lectura es : Codehero es
```

<hr />

<h2>¿Cómo renombramos un archivo?</h2>

<p>En Python para renombrar un archivo usamos el método <code>rename()</code>.</p>

<p>Veamos la sintaxis para poder renombrar un archivo:</p>

```python
os.rename(current_file_name, new_file_name)
```

<blockquote>
  <p>Observemos que <code>current_file_name</code> es el nombre del archivo que queremos renombrar y <code>new_file_name</code> es el nuevo nombre que le queremos dar.</p>
</blockquote>

<p>Veamos como usar <code>rename()</code> con un ejemplo:</p>

```python
#!/usr/bin/python
import os

# Renombramos codehero.txt por codehero2.txt
os.rename( "codehero.txt", "codehero2.txt" )
```

<hr />

<h2>¿Cómo removemos un archivo?</h2>

<p>En Python para remover un archivo usamos el método <code>remove()</code>.</p>

<p>Veamos la sintaxis para poder leer un archivo:</p>

```python
os.remove(file_name)
```

<blockquote>
  <p>Observemos que <code>file_name</code> es el nombre del archivo que queremos remover.</p>
</blockquote>

<p>Veamos como usar <code>remove()</code> con un ejemplo:</p>

```python
#!/usr/bin/python
import os

# Eliminamos el archivo codehero.txt
os.remove("codehero.txt")
```

<hr />

<h2>Conclusión</h2>

<p>En esta lección, aprendimos todo lo relacionado con el manejo de archivos en Python, desde como abrirlo hasta como escribir y leer información del mismo. Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso.</p>

<p>Nos vemos en la próxima serie de Python, <strong>¡Python Avanzado!</strong></p>

<p><em>¡Hasta entonces...!</em></p>
