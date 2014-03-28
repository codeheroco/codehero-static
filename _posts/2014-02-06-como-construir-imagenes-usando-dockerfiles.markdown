---
layout: post
status: publish
published: true
title: Cómo construir imágenes usando Dockerfiles
author: Alberto Grespan
author_login: albertogg
author_email: albertogrespan@gmail.com
author_url: http://albertogrespan.com
wordpress_id: 2984
wordpress_url: http://codehero.co/?p=2984
date: 2014-02-06 01:21:50.000000000 -04:30
categories:
- Cómo lo hago
- Docker
tags:
- nginx
- docker
- Dockerfile
---
<p>En una entrada anterior vimos como se instalaba y se utilizada <em>Docker</em> para crear ambientes tanto de desarrollo como producción que funcionaran como embalaje para desplegar la aplicación. En esta veremos como se automatiza el proceso de creación de imágenes utilizando un conjunto de instrucciones que nos presta <em>Docker</em> en una especie de <a href="http://es.wikipedia.org/wiki/Lenguaje_espec%C3%ADfico_del_dominio">DSL</a> para facilitarnos la vida.</p>

<blockquote>
  <p>Si no leíste la <a href="http://codehero.co/como-instalar-y-usar-Docker/">entrada anterior</a> te recomendamos hacerlo ya que entenderás mucho mejor lo que ocurrirá aquí y te servirá de guía si aún no lo has instalado.</p>
</blockquote>

<hr />

<h2>¿Qué necesitamos para automatizar una imagen?</h2>

<p>Para automatizar el proceso de creación de imágenes necesitamos pocas cosas:</p>

<ul>
<li>Tener Docker instalado.</li>
<li>Crear un Dockerfile.</li>
<li>Conocer un poco el DSL.</li>
<li>Saber que tarea repetitiva queremos automatizar.</li>
<li>Construir el contenedor.</li>
<li>Ser felices.</li>
</ul>

<hr />

<h2>¿Qué es un <em>Dockerfile</em> y cómo se crea?</h2>

<p>Un <em>Dockerfile</em> no es más que un archivo que reconoce Docker y que contiene una serie de instrucciones para automatizar el proceso de creación de un contenedor. En pocas palabras en este archivo vamos a agregar todo lo que necesitemos en nuestro contenedor para que cada vez que queramos correr el <em>script</em> de construcción obtengamos un contenedor completamente fresco y actualizado.</p>

<h3>¿Cómo creo un <em>Dockerfile</em>?</h3>

<p>Para crear este archivo debemos hacerlo de manera manual, utilizando el comando <code>touch</code> en un directorio de vuestra preferencia.</p>

<pre>$ touch Dockerfile
</pre>

<p>Este comando se encuentra en todos los Sistemas Operativos basados en Unix, si quieren utilizarlo en Windows pueden hacer uso de esta librería <a href="http://unxutils.sourceforge.net/">unxutils</a> o sencillamente crearlo de otra manera.</p>

<hr />

<h2>¿Cómo construyo el contenedor?</h2>

<p>Una vez que hayamos creado el <em>Dockerfile</em> vamos a poder hacer uso del comando <code>build</code> que proporciona Docker. Este comando se encarga de correr una a una las líneas que se encuentran dentro del archivo y al finalizar si todo salió correctamente tendremos un contenedor listo para usar.</p>

<h3>Comando build</h3>

<p>El comando <code>build</code> lo podemos utilizamos de la siguiente manera:</p>

<pre>$ docker build -t nombre/nombre-de-contenedor .
</pre>

<p>Con este comando estamos utilizando el Dockerfile que se encuentra en la carpeta o directorio donde estamos parados, y creando una imagen que se llama nombre/nombre-de-contenedor. El parámetro <code>-t</code> dentro del comando <code>build</code> se utiliza para marcar o nombrar un contenedor y de esta manera poder ubicarlo fácilmente.</p>

<blockquote>
  <p>El <em>nombre</em> es referente a el nombre de la persona que crea el contenedor o nombre del proyecto que lo utilizará. El <em>nombre-del-contenedor</em> será el identificador personal de ese contenedor. El conjunto de nombre/nombre-de-contenedor son utilizados para especificar el nombre del REPOSITORIO tanto en Docker como en su <a href="https://index.docker.io/">indice</a>.</p>
</blockquote>

<hr />

<h2>Conociendo el DSL de docker</h2>

<p>En está entrada construiremos un contenedor de nginx basado en Ubuntu y su versión LTS 12.04 que nos funcione para servir cualquier página web. En la <a href="http://codehero.co/como-instalar-y-usar-Docker/">entrada anterior</a> hicimos algo similar aquí automatizaremos el proceso y haremos algo un poco más complejo.</p>

<p>Comencemos agregando las siguientes líneas al <em>Dockerfile</em>:</p>

<h3>FROM Y MAINTAINER</h3>

<pre>FROM ubuntu:12.04
MAINTAINER Alberto Grespan "alberto@codehero.co"
</pre>

<p>Aquí le estamos indicando a Docker que cuando vaya a crear nuestro contenedor realice lo siguiente:</p>

<ul>
<li>Busca en tú índice de imágenes una que se llama <code>ubuntu:12.04</code> y utilízala como base de nuestro contenedor. Es decir que nuestro contenedor se basará en la estructura de carpetas, archivos y paquetes que conoce y tiene esta versión de Ubuntu.</li>
<li>El creador y mantenedor de la imagen se llama <em>Alberto Grespan</em> y su correo es <em>alberto@codehero.co</em></li>
</ul>

<p>Estos son aspectos importantes que debemos conocer, ya que son la base que rige el resto de los comandos que utilizaremos.</p>

<h3>RUN y ENV</h3>

<p>El comando <code>RUN</code> ejecuta directamente comandos dentro de el contenedor, y luego persiste los cambios en el contenedor una vez persistidos los cambios continua al siguiente paso (línea) que se encuentre en el <em>Dockerfile</em>.</p>

<p>El comando <code>ENV</code> como se pueden imaginar establece variables de ambiente de nuestro contenedor y funciona de la misma manera que un <code>export</code> en Linux o Unix. Algo <strong>muy importamte</strong> con respecto a esto, es que las variables de ambiente se pasan a todas las instrucciones de <code>RUN</code> que se ejecuten posteriores a su declaración.</p>

<pre>RUN apt-get update -y

RUN apt-get install -y language-pack-en
ENV LANGUAGE en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LC_ALL en_US.UTF-8

RUN locale-gen en_US.UTF-8
RUN dpkg-reconfigure locales
</pre>

<p>No quiero entrar mucho en detalles de Sistema Operativo pero, estamos actualizando la paquetería conocida por Ubuntu y luego instalando un paquete de lenguajes en inglés, estoy instalando el de inglés porque casi todo necesita estar en <code>en_US.UTF-8</code> lamentablemente, y la codificación es un tema bastante complejo.</p>

<p>Una vez que la actualización de paquetes e instalación culminan estoy estableciendo las variables de ambientes del contenedor referentes al lenguaje del mismo y configurando el contenedor para que las utilice por defecto.</p>

<blockquote>
  <p>Si vas a hacer un contenedor de Ruby te recomiendo utilices esta serie de comandos antes descritos para ahorrarte una pesadilla.</p>
</blockquote>

<pre>RUN apt-get install -y python-software-properties vim

RUN add-apt-repository "deb http://archive.ubuntu.com/ubuntu $(lsb_release -sc) universe"
RUN add-apt-repository ppa:nginx/stable

RUN apt-get update -y
RUN apt-get update -y --fix-missing

RUN apt-get -y install nginx
</pre>

<p>En este fragmento le estamos diciendo a Ubuntu que se aprenda un nuevo URL a un repositorio oficial de nginx el cual nos permitirá instalar la última versión estable de nginx que a la fecha es la <code>1.4.4</code>. Una vez aprendido el repositorio instalaremos dicha versión.</p>

<h3>ADD, EXPOSE y CMD</h3>

<p>El comando <code>ADD</code> es utilizado para copiar archivos hacia el contenedor, por lo tanto utiliza dos argumentos que son la fuente y el destino, si la fuente es un URL Docker se encarga de bajar el archivo de Internet y copiarlo al destino descrito.</p>

<p>Por otro lado el comando <code>EXPOSE</code> lo utilizamos para asociar puertos, permitiéndonos exponer un contenedor con el mundo (la computadora anfitrión).</p>

<p>El comando <code>CMD</code> es de cierta manera muy similar al comando <code>RUN</code> con la ligera diferencia que no se ejecuta el comando descrito cuando se corre el comando <code>build</code> sino cuando instanciamos (ponemos a funcionar) el contenedor.</p>

<pre>RUN mv /etc/nginx/nginx.conf /etc/nginx/nginx.conf.old
ADD https://gist.github.com/albertogg/8837962/raw/5f49760b953cfafe5cdcab5c2a1350bd7f3b244b/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx"]
</pre>

<p>Que sucede en esta última etapa de nuestro contenedor, pues estamos cambiando el nombre de la configuración que trae nginx por defecto a <code>/etc/nginx/nginx.conf.old</code> ya que no deberíamos borrar nada <em>nunca</em> y mediante el comando <code>ADD</code> estamos descargando una configuración personalizada que he hecho para vosotros. Podemos decir que la única particularidad que tiene es que nginx no corre daemonizado sino que corre en foreground para mantener nuestro contenedor activo.</p>

<p>Utilizando el comando <code>EXPOSE</code> estamos indicando que nuestro contenedor debe exponer el puerto 80 a la máquina anfitrión y por último en lo que arranquemos el contenedor se ejecutará el <code>CMD</code> y el mismo debe debe correr el comando <code>nginx</code> para comenzar a servir nuestra página.</p>

<h3>ENTRYPOINT, VOLUME y WORKDIR</h3>

<p>El comando <code>VOLUME</code> permite al contenedor crear un punto de montura mediante un nombre, es decir si escribimos <code>VOLUME ["/var/www"]</code> estaremos creando un punto de montura en el directorio especificado y esto permite compartir dicho punto de montura con otros contenedores o con la máquina anfitrión.</p>

<p>El comando <code>WORKDIR</code> es bastante sencillo, el mismo nos permite especificarle a Docker en que directorio va a ejecutar un <code>CMD</code>. Puede ser algo cómo <code>WORKDIR /var/www</code></p>

<p>El comando <code>ENTRYPOINT</code> se utiliza generalmente en conjunto con el comando <code>CMD</code> y este especifica un comando a ejecutar, se utiliza principalmente cuando estamos repitiendo mucho el uso de un comando particular. Un ejemplo:</p>

<pre>CMD "Hola mundo!"
ENTRYPOINT ["/bin/echo"]
</pre>

<p>Esto ejecutará el <code>CMD</code> cuando el contenedor arranque e imprimirá el mensaje <code>Hola mundo!</code>. Cabe destacar que el comando <code>ENTRYPOINT</code> solo se puede declarar una vez.</p>

<hr />

<h2>¿Cómo correr el contenedor creado?</h2>

<p>Una vez que hayamos terminado de agregar al <em>Dockerfile</em> todo lo que hemos visto en esta entrada y hayamos utilizado el comando <code>build</code> y todo haya salido como se espera deberíamos ver algo así cuando ejecutemos el siguiente comando:</p>

<pre>vagrant@packer-virtualbox:~$ sudo docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             VIRTUAL SIZE
codehero/nginx      latest              01ede6f2dbd6        1 days ago         590.1 MB
ubuntu              12.04               8dbd9e392a96        10 months ago       128 MB
</pre>

<p>El ver que nuestra imagen se encuentra creada nos dice que todo ha salido correctamente y podemos lanzar el contenedor a ruedo. Para realizar esto empleamos el siguiente comando:</p>

<pre>$ NGINX=$(sudo docker run -d -p 80:80 codehero/nginx)
</pre>

<p>Aquí estamos creando una variable de ambiente llamada <code>NGINX</code> que ejecuta el contenedor en <em>background</em> <code>-d</code> y está indicándole a la máquina anfitrión que su puerto <code>-p</code> 80 va a estar atado al puerto 80 del contenedor, por consiguiente todo lo que sirvamos desde nuestro contenedor mediante nginx será visto en la máquina anfitrión directamente sin especificar ningún puerto.</p>

<p>Si prueban colocar la dirección IP de su máquina virtual en su navegador de internet podrán apreciar la famosa página que contiene el mensaje <strong>Welcome to nginx!</strong>.</p>

<hr />

<h2>Conclusión</h2>

<p>Esta semana pudimos adentrarnos un poco más en esta increíble herramienta llamada Docker. Aprendimos como automatizar el proceso de crear un contenedor mediante su DSL. Puedo dar fe que teniendo bajo la manga el conocimiento de la automatización a la hora de crear contenedores te puede ayudar a olvidarte de los famosos ambientes de producción y desarrollo ya que muy fácilmente puedes emular la máquina de producción o simplemente desplegar tu aplicación en la máquina de producción con el mismo contenedor que utilizaste en el desarrollo, salvando días de angustia. Te invitamos a experimentar un poco más con Docker y que nos dejes cualquier comentario que desees referente a él!</p>
