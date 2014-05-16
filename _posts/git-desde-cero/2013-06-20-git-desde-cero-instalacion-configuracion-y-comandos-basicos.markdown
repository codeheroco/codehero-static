---
layout: post
status: publish
published: true
title: Instalación, configuración y comandos básicos
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
date: 2013-06-20 04:33:06.000000000 -04:30
serie: Git desde Cero
dificultad: Novato
duracion: 30
description: Git desde Cero, serie en la cual aprenderemos Git desde Cero. Estudiaremos como instalar, configurar y utilizar Git para nuestros proyectos.
categories:
- Cursos
- Git
tags:
- Git
- desde cero
- instalacion
- configuracion
- basico
---
<p>Bienvenidos a <strong><em>Git desde cero</em></strong>, esta serie de tutoriales tratará explicar y alejar el miedo que algunos de nosotros sentimos cuando comenzamos a utilizar un controlador de versiones por primera vez.</p>

<hr />

<h2>¿Qué es Git?</h2>

<p>Git en pocas palabras es un controlador de versiones distribuido. Para ampliar este significado debemos responder primero la siguiente pregunta. <strong>¿Qué es un controlador de versiones?</strong> Un controlador de versiones es un sistema que registra los cambios en un archivo o conjunto de archivos a través del tiempo para que se puedan recuperar versiones específicas de los mismos más adelante.</p>

<p>Ahora, <strong>¿Por qué es distribuido?</strong> Cuando los usuarios descargan la última versión de los archivos no solo están descargando los archivos; sino también realizando una copia fiel y exacta (copia de seguridad) del repositorio (carpeta donde se alojan estos archivos) de esta manera si dicho repositorio muere, cualquiera de los usuarios que descargaron estos archivos pueden restaurar el estado de ese del mismo haciendo uso de su copia de seguridad. Por otra parte esto permite que se puedan tener varios repositorios remotos para poder trabajar y colaborar con diferentes grupos de personas al mismo tiempo en un mismo proyecto, cosa que no es posible con los sistemas centralizados.</p>

<p>Características que destacan de Git como control de versiones:</p>

<ul>
<li><strong>Fotografías rápidas, NO diferencias</strong> - A la hora de guardar la información de varios archivos, Git toma una fotografía rápida del estado de los mismos y guarda las referencias de esta fotografía. Luego para ser eficiente revisa los archivos que no fueron modificados y cambia las referencias de los mismos a su versión anterior.</li>
<li><strong>Casi todas las operaciones son locales</strong> - Sí ya descargaste un repositorio no es necesario estar conectado a una red o conexión a internet para trabajar sobre archivos, todo lo necesario se encuentra en tu computadora.</li>
<li><strong>Integridad de la data</strong> - Git antes de guardar la fotografía del estado de un archivo realiza un <a href="http://es.wikipedia.org/wiki/Suma_de_verificaci%C3%B3n">checksum</a> de la data. De esta manera es imposible cambiar el contenido de cualquier archivo sin que Git lo note.</li>
<li><strong>Git generalmente solo añade data</strong> - Al trabajar en cualquier archivo y almacenar los cambios se está agregando data a la base de datos de Git. Esto nos da la seguridad de que si estos cambios fueron persistidos es muy difícil que se pierdan.</li>
<li><strong>Trabaja con tres estados</strong> - Lo más importante para recordar de Git son los tres(3) estados en que los archivos residen: consolidada (committed), modificados y en escenario (stage). Modificado, se han detectado cambios en el archivo pero no se han consolidado. Consolidado, el archivo y su data han sido guardados satisfactoriamente en la base de datos de Git. En escenario se han marcado las modificaciones de un archivo y su próximo paso será consolidar la data.</li>
</ul>

<hr />

<h2>Instalación</h2>

<p>Ya que conocemos un poco sobre Git, es hora de instalarlo. Dependiendo del Sistema Operativo en que nos encontremos utilizaremos la instalación apropiada.</p>

<h3>Mac OS</h3>

<p><strong><em>Método Recomendado</em></strong>: Para realizar la instalación en este Sistema Operativo es recomendable tener instalado <a href="http://mxcl.github.io/homebrew/">Homebrew</a>. Haciendo uso del Terminal.app y de hombrew, escribimos el siguiente comando:</p>

```sh
$ brew install git
```

<p>Si el terminal no es de tú preferencia puede hacer uso de un cliente de interfaz gráfica para realizar la instalación de Git. El cliente de <a href="http://mac.github.com/">Github</a> nos facilita esta tarea.</p>

<h3>Linux</h3>

<p>Si nos encontramos en distribuciones como Fedora, podemos hacer uso del manejador de paquetes de dicha distribución y mediante el siguiente comando instalaremos Git:</p>



```sh
$ yum install git-core
```

<p>Si nos encontramos en distribuciones basadas en Debian, tal como Ubuntu, utilizamos el siguiente comando:</p>

```sh
$ apt-get install git
```

<h3>Windows</h3>

<p>Si nos encontramos el Windows la manera más sencilla de realizar la instalación es descargar el <a href="http://git-scm.com/download/win">Instalador</a> y seguir los pasos.</p>

<hr />

<h2>Configuración</h2>

<p>Ya que tenemos Git instalado, es tiempo de configurarlo. Para esto, tenemos que abrir el Terminal.</p>

<h3>Configuración del nombre de usuario</h3>

<p>Lo primero que de debe hacer es decirle a Git cual será nombre de la persona que hará uso de él:</p>

```sh
$ git config --global user.name "Pedro Perez"
```

<h3>Configuración del email</h3>

<p>Git hace uso del email del usuario cuando consolida la data, por esta razón necesitamos configurarlo:</p>

```sh
$ git config --global user.email "pedroperez@ejemplo.com"
```

<p><strong>Podemos revisar que estén bien escritos</strong> haciendo uso del siguiente comando:</p>

```sh
$ git config --list
user.name=Pedro Perez
user.email=pedroperez@ejemplo.com
```

<p>También debemos conocer que Git guarda esta información dentro del archivo oculto <strong><em>.gitconfig</em></strong> en el <strong><em>Home</em></strong> del usuario. Utilizando el siguiente comando podemos observar la información suministramos durante la configuración:</p>

```sh
$ cat ~/.gitconfig
[user]
        name = Pedro Perez
        email = pedroperez@ejemplo.com
```

<hr />

<h2>Cuenta en Github.com</h2>

<p>Previamente explicamos que no es necesario estar conectado a una red o tener conexión a internet para poder hacer uso de Git. Con esto no queremos decir que únicamente haremos uso de esta herramienta manera local, sino más bien queremos que nuestros archivos (código, fotos, etc.…) se encuentren tanto en nuestro computador como en un servidor remoto. Por esta razón se recomienda abrir una cuenta en <a href="http://github.com/">Github.com</a> de manera gratuita para el alojamiento remoto de nuestros archivos.</p>

<hr />

<h2>Comandos básicos</h2>

<p>Tenemos Git instalado y listo para usar, ha llegado el momento de conocer los pasos necesarios para la inicialización de un repositorio, agregar archivos al escenario y consolidarlos.</p>

<h3>Inicialización de un repositorio</h3>

<p>Un repositorio no es más que una carpeta o conjunto de carpetas que contienen archivos.</p>

<p>Podemos crear una carpeta y luego iniciar el repositorio dentro, utilizando los siguientes comandos:</p>

```sh
$ mkdir Ejemplo && cd Ejemplo
$ git init .
```

<p>Con el comando <strong>git init</strong> se crea una carpeta oculta llamada <strong>.git</strong> (se encuentra dentro de la carpeta <em>Ejemplo</em>) y contiene toda la información necesaria para que podamos realizar las versiones (copias de seguridad) de nuestro proyecto. En este punto Git no está llevando el control de ningún archivo.</p>

<h3>Agregar archivos al escenario</h3>

<p>Con nuestro repositorio listo, queremos llevar el control de nuestro primer archivo. Para esto debemos crearlo dentro de nuestra carpeta <em>Ejemplo</em> y agregarlo al escenario:</p>

```sh
$ touch Archivo1.txt # Creamos el archivo vacío
$ echo 'Hola Mundo' >> Archivo1.txt  # Le agregamos texto al archivo
$ git add Archivo1.txt # colocamos el archivo en escenario
```

<p>Al ejecutar el comando <strong>git add Archivo1.txt</strong> estamos confirmando (agregando el archivo al escenario) que los cambios que realizamos sobre <em>Archivo1.txt</em> se quieren respaldar la próxima vez que consolidemos la data.</p>

<h3>Consolidar la información.</h3>

<p>Para consolidar el archivo previamente creado y puesto en escenario debemos utilizar el siguiente comando:</p>

```sh
$ git commit -m "Commit Inicial"
```

<p><strong><em>nota:</em></strong> La bandera <strong>-m</strong> indica que se debe consolidar el archivo con un mensaje informativo.</p>

<hr />

<h2>Conclusión</h2>

<p>En este capítulo aprendimos los conceptos básicos de Git; tales como instalación en múltiples Sistemas Operativos, configuración desde cero y a persistir información en su base de datos. En los próximo capítulos iremos conociendo más comandos y trataremos de enseñarle al usuario el flujo de trabajo que utilizamos en Codehero cuando hacemos uso de esta herramienta.</p>
