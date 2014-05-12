---
layout: post
status: publish
published: true
title: Instalación & Configuración
author: Carlos Picca
author_login: carlos
author_email: carlospicca@gmail.com
wordpress_id: 918
wordpress_url: http://codehero.co/?p=918
date: 2013-06-09 22:12:07.000000000 -04:30
serie: Python desde Cero
dificultad: Novato
duracion: 20
description: Python desde Cero, serie en la cual aprenderemos Python desde Cero. En esta sesión, estudiaremos como instalar y configurar Python en nuestros computadores.
categories:
- Cursos
- Python
tags:
- Python
- instalacion
- configuracion
---
<p>Bienvenido a Python desde Cero, serie en la cual aprenderemos Python desde Cero. En esta sesión, estudiaremos como instalar y configurar Python en nuestros computadores.</p>

<hr />

<h2>¿Qué es Python?</h2>

<p>Python es un gran lenguaje que puede servir para desarrollar fácilmente tanto aplicaciones pequeñas como aplicaciones de gran embergadura. Entre muchas características que hacen de Python un gran lenguaje de programación acá encontramos las tres principales:</p>

<ul>
<li><strong>Alto nivel</strong> - Ya que su sintaxis es sencilla, lo hace un gran lenguaje para aprender a programar por primera vez. A su vez facilita el desarrollo de aplicaciones, ya que acorta el número de líneas de código a desarrollar con respecto a otros lenguajes de programación.</li>
<li><strong>Multipropósito</strong> - Puede ser usado para desarrollar tanto scripts sencillos como para desarrollar sitios web dinámicos.</li>
<li><strong>Posee una gran librería pre-instalada de apoyo</strong> - Cabe la posibilidad que dentro de la librería ya estén desarrolladas muchas de las cosas comunes que quieras hacer, así nos evitamos programar un módulo desde cero.</li>
</ul>

<hr />

<h2>Instalación</h2>

<p>Ok, ya que conocemos un poco de Python, empecemos a usarlo. Lo primero es saber que existen dos versiones disponibles.</p>

<h3>Versiones</h3>

<p>Existen dos versiones activas de Python las cuales podemos descargar:</p>

<h3>Python 2</h3>

<p>La más compatible, ya que como ha estado más tiempo en el mercado existen una gran de cantidad de librerías que puedes ser usadas con esta versión y así facilitar el desarrollo de nuestras aplicaciones.</p>

<h3>Python 3</h3>

<p>Funcionalidades mejoradas con respecto a versión anterior pero es prácticamente incompatible con Python 2.</p>

<blockquote>
  <p>Es importante resaltar que escoger la versión es un paso muy importante ya que migrar de Python 2 a Python 3 no es tan fácil, debido a que usan sintaxis de desarrollo diferentes.</p>
</blockquote>

<p>Para este tutorial vamos a usar la Python 2, así que descarguemos la ultima versión disponible. A continuación se muestra el procedimiento a seguir para los diferentes sistemas operativos:</p>

<h3>Mac OS</h3>

<p>Para poder instalar la última versión de Python (2.7.5) en el sistema operativo debemos tener previamente instalado <a href="http://mxcl.github.io/homebrew/">Homebrew</a>. Utilizaremos el siguiente comando para iniciar la instalación:</p>

```bash
$ brew install python --framework
```

<p>Este paso instalará todos los componentes necesarios y tardará unos minutos, una vez que culmine debemos exportar está ruta al <em>PATH</em> del usuario.</p>

```bash
$ export PATH=/usr/local/share/python:$PATH
```

<p>La bandera <strong><em>--framework</em></strong> le indica a Homebrew que debe compilar Python en estilo Framework. Esto se realiza porque la versión de Python que venía con <em>Snow Leopard</em> se encontraba compilada de esta manera, y se sigue utilizando solo por prevención de errors en instalaciones futuras.</p>

<p>Una vez finalizada la instalación, ya deberíamos tener Python corriendo en nuestro sistema.</p>

<p><strong><em>Nota:</em></strong> Si por el contrario desean instalar la versión 3 de Python lo pueden hacer de la misma manera utilizando el siguiente comando:</p>

```bash
$ brew install python3 --framework
```

<h3>Windows</h3>

<p>Descarguemos desde <a href="http://python.org/download/releases/">python.org/releases</a> la versión ‘Windows X86-64 MSI Installer’ (Última versión estable de Python 2 para Windows hasta la fecha del tutorial). Una vez descargado, hacemos doble-click en el instalador y aceptamos todas la condiciones del instalador, no hay que preocuparnos por configuraciones avanzadas, el instalador es sencillo de usar. Una vez finalizada la instalación, ya deberíamos tener Python corriendo en nuestro sistema.</p>

<h3>Linux</h3>

<p>Si se encuentran en una distribución basada en Debian y quieren instalar una versión de Python distinta a la que viene con el Sistema Operativo. Existe un PPA (Paquete Personal de Archivo) que nos facilita la tarea de instalación.</p>

```bash
$ sudo add-apt-repository ppa:fkrull/deadsnakes
$ sudo apt-get update
$ sudo apt-get install python2.7
```

<p>Si todo funcionó exitosamente deberíamos tener la ultima versión de Python 2.7 corriendo en el sistema.</p>

<hr />

<h2>Cómo usarlo</h2>

<p>Una vez instalado, nos vamos a encontrar con tres maneras de usar Python:</p>

<ul>
<li><strong>Python Shell</strong> - la consola de Python, la cual nos permite ejecutar comandos línea por línea.</li>
<li><strong>IDLE GUI</strong> - una aplicación que nos permite escribir scripts más complejos para luego ejecutarlos de manera sencilla.</li>
<li><strong>Editor de texto</strong> - cualquier editor de texto que corra en tu sistema operativo te permitirá escribir un script. Luego lo guardarás con la extensión <code>.py</code> y lo ejecutarás desde el Shell.</li>
</ul>

<h3>Shell</h3>

<p>Veamos primero el Shell y como interactuar con él:</p>

<h3>Mac y Linux</h3>

<p>Abrimos el terminal de nuestras máquinas y ingresamos el siguiente comando: python</p>

<h3>Windows</h3>

<p>Debemos navegar hasta el directorio de instalación de Python. Por defecto, debería ser <code>C:\Python27</code> Una vez ahí, ejecutamos <code>python.exe</code></p>

<p>Si nos aparece lo siguiente, accedimos satisfactoriamente al Shell de Python:</p>

```bash
Python 2.7.5 (v2.7.3:70274d53c1dd, Apr  9 2012, 20:52:43)
[GCC 4.2.1 (Apple Inc. build 5666) (dot 3)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

<h3>IDLE</h3>

<p>Para abrir el IDLE de Python navegamos hasta la carpeta de instalación de Python y ejecutamos el archivo denominado IDLE (<em>Para Mac/Linux/Windows</em>). Una vez abierto, vemos que la aplicación nos proporciona el <strong>Shell</strong>. La funcionalidad más importante que ofrece es la capacidad de crear y modificar archivos.</p>

<hr />

<h2>Hola Mundo!</h2>

<p>Desarrollemos nuestro primer programa!, empezamos por crear un archivo nuevo dentro del IDLE de Python, en mi caso, como estoy usando Mac OS el comando para realizar esta acción es <code>Ctrl + N</code>.</p>

<p>En el editor de texto que nos aparece, tecleamos la siguiente instrucción:</p>

<p>print “Hola Mundo!”</p>

<p>La función print nos permite imprimir cualquier texto que deseemos mientras este entre comillas.</p>

<p>Guardamos el documento (<em>en mi caso</em> <code>Ctrl + S</code>) y lo vamos a llamar <strong>tutorial.py</strong>. Ahora para correrlo desde el <strong>IDLE</strong> lo único que tenemos que hacer es presionar la tecla <code>F5</code> y el programa automáticamente se ejecutará.</p>

```bash
Python 2.7.5 (v3.3.0:bd8afb90ebf2, Apr  9 2012, 21:52:43)
[GCC 4.2.1 (Apple Inc. build 5666) (dot 3)] on darwin
Type "copyright", "credits" or "license()" for more information.
>>>
================================ RESTART================================
>>>
Hola Mundo!
>>>
```

<blockquote>
  <p>Personalmente pienso que el IDLE de Python no es la mejor manera ni de aprender ni de desarrollar programas en Python, ya que es muy lento y le faltan muchas de las características importantes que ofrecen los editores de código de hoy en día.</p>
</blockquote>

<p>Les dejo una lista de unos de los mejores IDE que andan por ahí:</p>

<ul>
<li><a href="http://code.google.com/p/pyscripter/">PyScripter</a> (Windows)</li>
<li><a href="http://www.eclipse.org/downloads/">Eclipse</a> con <a href="http://pydev.org">PyDev</a> plugin (Windows)</li>
<li><a href="http://dlc.sun.com.edgesuite.net/netbeans/6.5/python/ea/">Netbeans for Python</a> (Windows, Mac, Linux, Solaris)</li>
<li><a href="http://www.microsoft.com/en-us/download/details.aspx?id=12752">Visual Studio</a> con <a href="http://pytools.codeplex.com">Python Tools</a> (Windows)</li>
<li><a href="http://eric-ide.python-projects.org">Eric IDE</a>, mejor en Linux, lo encontrarás en el Ubuntu Software center</li>
</ul>

<hr />

<h2>Ejecución Sencilla vs. Engorrosa</h2>

<p>Ya vimos que podemos ejecutar un script desde el <strong>IDLE GUI</strong>, ahora veamos otras maneras como podemos ejecutar dicho script.</p>

<p>Vamos a suponer que queremos ejecutar el archivo <strong>tutorial.py</strong>, existen dos maneras para hacerlo la manera sencilla o la manera engorrosa:</p>

<h3>Vía Engorrosa</h3>

<p>Navegamos hasta el directorio donde se encuentra ubicado <strong>tutorial.py</strong> (<em>En mi caso esta en la carpeta ~/Documents/Tutoriales/Python/capitulo1/</em>) y luego usamos el comando <strong><em>“python + el nombre del archivo”</em></strong> para ejecutarlo, veamos como sería ese código:</p>

```bash
$ cd ~/Documents/Tutoriales/Python/capitulo1/
$ python tutorial.py
$ Hola Mundo!
```

<p>Una vez ejecutado el script nos imprime el <code>Hola mundo!</code> al igual como lo hizo cuando lo corrimos desde IDLE de Python.</p>

<h3>Vía Sencilla</h3>

<p>Lo primero que hay que hacer es abrir el <strong>tutorial.py</strong> con el IDE o editor de texto de nuestra preferencia y agregarle la siguiente línea para indicarle al terminal que lenguaje o motor de interpretación va a usar</p>

```python
#!/usr/local/bin/python
```

<p>Nos quedaría lo siguiente:</p>

```python
#!/usr/local/bin/python
print “Hola Mundo!”
```

<p>Lo segundo, tendríamos que darle permisología de ejecución a <strong>tutorial.py</strong> con la siguiente instrucción en el terminal</p>

```bash
$ chmod 755 tutorial.py
```

<p>Por último ejecutaríamos el archivo desde el terminal de la siguiente manera</p>

```bash
$ ./tutorial.py
```

<p>Si todo esta correcto debería imprimir lo siguiente:</p>

```bash
Hola Mundo!
```

<hr />

<h2>Conclusión</h2>

<p>En esta lección, instalamos un Python desde cero, discutimos las características importantes del lenguaje, hablamos sobre las mejores herramientas para escribir nuestro código y hicimos nuestro primer programa!. Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de esta serie.</p>
