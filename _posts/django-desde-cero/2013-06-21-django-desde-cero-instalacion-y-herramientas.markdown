---
layout: post
status: publish
published: true
title: Instalación y herramientas
author: Carlos Picca
author_login: carlos
author_email: carlospicca@gmail.com
wordpress_id: 1076
wordpress_url: http://codehero.co/?p=1076
date: 2013-06-21 08:33:27.000000000 -04:30
serie: Django desde Cero
dificultad: Novato
duracion: 30
description: Curso en el cual aprenderemos Django desde Cero. En esta clase, estudiaremos como instalar las herramientas que nos facilitarán la instalación de Django.
categories:
- Cursos
- Django
tags:
- Django
- virtualenv
- easy_install
- pip
- desde cero
- instalacion
- herramientas
---
<p>Bienvenido a Django desde Cero, curso en el cual aprenderas Django sin conocimiento alguno. En esta clase, estudiaremos como instalar las herramientas que nos facilitarán la instalación de Django en nuestros computadores, a su vez, crearemos un ambiente virtual de desarrollo e iniciaremos nuestro primer proyecto.</p>

<h2>¿Qué es Django?</h2>

<p>Es un framework de desarrollo web de código abierto, escrito en Python, que respeta el paradigma conocido como Model Template View. Fue desarrollado en origen para gestionar varias páginas orientadas a noticias de la World Company de Lawrence, Kansas, y fue liberada al público bajo una licencia BSD en julio de 2005; el framework fue nombrado en alusión al guitarrista de jazz gitano Django Reinhardt.</p>

<p>La meta fundamental es facilitar la creación de sitios web complejos. Django pone énfasis en el re-uso, la conectividad y extensibilidad de componentes, el desarrollo rápido y el principio No te repitas (DRY, del inglés Don't Repeat Yourself).</p>

<h2>Herramientas para su instalación y gestión</h2>

<p>Veamos tres herramientas que nos ayudarán a desarrollar nuestro sitio dinámico en Django.</p>

<h3>Easy_install</h3>

<p>Es un gestor de paquetes para el lenguaje de programación Python que suministra un formato estándar para distribuir programas y bibliotecas, basado en el envoltorio llamado huevos de Python (Python eggs).</p>

<p>Veamos como instalar esta herramienta en los diferentes sistemas operativos:</p>

<h5>Mac y Linux</h5>

<p>Esta herramienta ya viene pre-intslada con el sistema operativo.</p>

<h5>Windows</h5>

<p>Debemos descargar <a href="https://bitbucket.org/pypa/setuptools/raw/0.7.4/ez_setup.py">ez_setup.py</a> y ejecutarlo. Una vez que la instalación se hay completado, el programa <code>easy_install.exe</code> se encontrará en el directorio de Scripts dentro de la carpeta de instalación de Python.</p>

<h3>Pip</h3>

<p>Es un sistema usado para instalar y gestionar paquetes de software desarrollados en Python. Una lista de todos los paquetes que gestiona el manejador, se pueden encontrar en el índex de paquetes de Python (<a href="https://pypi.python.org/pypi">PyPI</a>).</p>

<p>Veamos como instalar esta herramienta en los diferentes sistemas operativos:</p>

<h5>Mac y Linux</h5>

<p>La herramienta que descargamos anteriormente nos facilitará el proceso de instalación. Solo debemos tipear la siguiente línea:</p>

```python
$ easy_install pip
```

<h5>Windows</h5>

<p>La herramienta que descargamos anteriormente nos facilitará el proceso de instalación. Solo debemos tipear la siguiente línea:</p>

```python
c:\Python27\Scripts\easy_install.exe pip
```

<h3>Virtualenv</h3>

<p>Es una herramienta que nos permite crear entornos virtuales para Python. Proporcionándonos un gran número de posibilidades, que van desde realizar test, probar la integración de un módulo con distintas versiones, hasta realizar despliegues web.</p>

<blockquote>
  <p>Una vez que Pip haya sido instalado en la máquina, instalar cualquier otro módulo del índex de paquetes de Python será pan comido. Vemos como:</p>
</blockquote>

<h5>Mac y Linux</h5>

```python
$ pip install virtualenv
```

<h5>Windows</h5>

```python
c:\Python27\Scripts\pip.exe install virtualenv
```

<hr />

<h2>Instalando Django</h2>

<p>Una vez finalizada la instalación de todas las herramientas pasemos al motivo principal de este curso, la instalación de Django. Lo primero que debemos hacer es configurar un ambiente virtual para así no dañar nuestro sistema.</p>

<blockquote>
  <p>De ahora en adelante, todas las instrucciones del curso estarán basadas en formatos <strong>Mac</strong> y <strong>Linux</strong>. De estar usando <strong>Windows</strong> les recomiendo restructurar las líneas de comando ya que existen algunas diferencias para ese sistema operativo en particular.</p>
</blockquote>

```python
$ virtualenv --no-site-packages AMBIENTE-CODEHERO
```

<p>Desglosemos las sintaxis de la instrucción. <code>virtualenv</code> lo usamos para invocar al módulo que nos genera el ambiente virtual. <code>--no-site-packages</code> es una opción de virtualenv, la cual nos permite crear un ambiente de desarrollo virtual sin ningún paquete instalado y por último encontramos <code>AMBIENTE-CODEHERO</code>, nombre que va a tener la capeta del ambiente virtual (puede ser cualquier nombre que ustedes deseen, con la excepción que no sea la palabra <strong>python</strong>).</p>

<blockquote>
  <p>Virtualenv instala por nosotros las herramientas que instalamos con anterioridad (easy_install y pip).</p>
</blockquote>

```python
New python executable in AMBIENTE-CODEHERO/bin/python
Installing setuptools............done.
Installing pip...............done.
```

<p>Es acá donde observamos la funcionalidad principal de virtualenv ya que si listamos el contenido de la carpeta que contiene el ambiente virtual podemos observar que se instaló un nuevo Shell, el cual podemos hacer uso de él para así no dañar el de nuestro propio sistema.</p>

```python
$ ls -l
total 0
drwxr-xr-x  13 root  staff  442 Jun 21 02:52 bin
drwxr-xr-x   3 root  staff  102 Jun 21 02:52 include
drwxr-xr-x   3 root  staff  102 Jun 21 02:52 lib
```

<p>Lo segundo que debemos hacer, es activar nuestro nuevo ambiente de desarrollo virtual. Veamos como lo podemos hacer:</p>

```python
$ source AMBIENTE-CODEHERO/bin/activate
```

<p>La función de este comando es decirle a nuestro Shell actual que estamos cambiando de contexto hacia nuestro ambiente virtual.</p>

<blockquote>
  <p>Importante destacar que todos los paquetes que instalemos de ahora en adelante se instalarán sobre este Shell o contexto virtual y no afectará nuestro sistema base (<em>siempre y cuando el ambiente virtual este activo</em>).</p>
</blockquote>

```python
$ (AMBIENTE-CODEHERO) ...
```

<p>Si observamos <code>(AMBIENTE-CODEHERO)</code>, nos encontramos dentro del ambiente virtual.</p>

<p>Tercero, una vez que tengamos listo nuestro ambiente virtual, podemos proceder e instalar Django de la siguiente manera:</p>

```python
$ pip install django
```

<p>Podemos observar que la ultima versión disponible hasta el momento de este curso es la <code>1.5.1</code>.</p>

```python
Searching for django
Reading http://pypi.python.org/simple/django/
Best match: Django 1.5.1
Downloading http://pypi.python.org/packages/source/D/Django/Django-1.5.1.tar.gz#md5=7465f6383264ba167a9a031d6b058bff
Processing Django-1.5.1.tar.gz
.
.
.
```

<p>Para saber si instalamos correctamente Django tipeamos lo siguiente:</p>

```python
$ python
>>> from django import get_version
>>>  get_version()
'1.5.1'
>>>
```

<p>Si les devuelve el número de la versión quiere decir que el paquete fue instalado satisfactoriamente.</p>

<hr />

<h2>Como usar Django</h2>

<p>Lo primero que necesitamos hacer es crear un nuevo proyecto, para ello vamos a usar la siguiente línea de comando:</p>

```python
django-admin.py startproject codehero_web
```

<p>Desglosemos el comando: <code>django-admin.py</code> es un script que nos permite gestionar todas las funcionalidades que ofrece Django (Se encuentra dentro de la carpeta <code>bin/</code>). <code>startproject</code> es la opción necesaria para iniciar un proyecto. Y por último, <code>codehero_web</code> es el nombre que le asignamos a este proyecto en particular (ustedes pueden elegir el que ustedes deseen).</p>

<p>Si listamos la carpeta en donde estamos trabajando con <code>ls -l</code> podemos observar que ahora encontramos una carpeta con el nombre dl proyecto.</p>

```python
$ ls -l
total 0
drwxr-xr-x  14 root  staff  476 Jun 21 02:57 bin
drwxr-xr-x   4 root  staff  136 Jun 21 03:02 codehero_web
drwxr-xr-x   3 root  staff  102 Jun 21 02:52 include
drwxr-xr-x   3 root  staff  102 Jun 21 02:52 lib
```

<p>Naveguemos dentro de <code>codehero_web</code> y listemos su contenido de la siguiente forma:</p>

```python
cd codehero_web/ && ls -l
total 8
drwxr-xr-x  6 root  staff  204 Jun 21 03:02 codehero_web
-rw-r--r--  1 root  staff  255 Jun 21 03:02 manage.py
```

<p>Podemos observar que ahora tenemos un script llamado <code>manage.py</code>. Este en particular es muy importante ya que nos permite realizar toda la gestión del proyecto. Por los momentos, en esta lección nos enfocaremos en una de sus funcionalidades, más adelante en los siguientes capítulos cubriremos muchas más.</p>

<p>Ahora necesitamos correr el servidor para comprobar que nuestro proyecto se pueda navegar en un explorador. Lo hacemos con el siguiente comando 'runserver':</p>

```python
$ python manage.py runserver
```

```python
Validating models...

0 errors found
June 21, 2013 - 02:37:44
Django version 1.5.1, using settings 'codehero_web.settings'
Development server is running at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

<p>Si te aparece este mensaje hemos levantado el servidor exitosamente!. Ahora veamos el proyecto desde el explorador. Naveguemos a la siguiente dirección: <a href="http://127.0.0.1:8000/">http://127.0.0.1:8000/</a> nos debería aparecer lo siguiente:</p>

<p><img src="http://i.imgur.com/3Uoy5YK.jpg" alt="FOTO" /></p>

<blockquote>
  <p>Para detener el servidor lo único que tenemos que hacer es presionar <code>Ctrl + C</code>.</p>
</blockquote>

<p>Por último, veamos como desactivar el ambiente virtual de desarrollo. Para detener o desactivar el ambiente lo único que tenemos que hacer es tipear el siguiente comando:</p>

```python
$ deactivate
```

<hr />

<h2>Conclusión</h2>

<p>En esta lección, instalamos un Django desde cero, las herramientas que nos facilitarán su configuración y creamos nuestro primer proyecto!. Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso. Te espero la próxima semana!</p>
