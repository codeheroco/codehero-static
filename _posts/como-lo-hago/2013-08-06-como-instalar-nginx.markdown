---
layout: post
status: publish
published: true
title: Cómo Instalar Nginx
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
wordpress_id: 1851
wordpress_url: http://codehero.co/?p=1851
date: 2013-08-06 00:00:18.000000000 -04:30
thumbnail: http://i.imgur.com/4gIHp9Q.jpg
categories:
- Cómo lo hago
- Nginx
tags:
- nginx
- apache
- fastcgi
- lighttpd
- webserver
- servidor web
- proxy
---
<p>Desde hace mucho tiempo cuando nos hemos encontrado en la necesidad de un servidor HTTP, la primera solución que nos venia a la cabeza era Apache; sin embargo los tiempos han cambiado, las exigencias de los desarrolladores y clientes han incrementado y el uso de este antiguo gigante ha venido disminuyendo cada vez mas, esta semana hablaremos de su mayor contendiente, Nginx.</p>

<hr />

<h2>¿Qué es Nginx?</h2>

<p>Realmente pronunciando "engine-x" (no "enyinx"), es un servidor HTTP, <em>proxy</em> en reversa, balanceador de carga y proxy de correo electrónico, basado en el concepto del código abierto. Enfocado en una arquitectura de manejo de eventos asíncronos en lugar de hilos o <em>threads</em> es reconocido por su alto desempeño, bajo consumo de recursos, estabilidad, escalabilidad y configuración sencilla.</p>

<p>Se estima que más del 14% de los sitios en internet están servidos o <em>proxiados</em> por Nginx, entre ellos podemos mencionar algunos de gran relevancia que seguro conocerás como GitHub, Wordpress.com, Netflix, Heroku, SoundCloud y muchos más.</p>

<hr />

<h2>Nginx vs. Apache</h2>

<p>Mencionemos algunas características que ilustrarán las ventajas que ofrece Nginx en contraste con el servidor web más conocido en el mercado.</p>

<ul>
<li>Manejo de concurrencia de entre 4 y 8 veces mayor.</li>
<li>Servicio de recursos estáticos de hasta 300% más rápido. </li>
<li>Consumo de memoria de hasta 20 veces menos.</li>
</ul>

<p>Con estas premisas podemos además concluir lo siguiente:</p>

<blockquote>
  <p>Alta concurrencia + alta velocidad de respuesta + ridículamente bajo consumo de recursos = <strong>Alta escalabilidad y estabilidad</strong></p>
</blockquote>

<p>Tomemos un caso de estudio, un actual ingeniero de software en Facebook que para el momento de la declaración trabajada como CTO de la empresa de juegos en línea Mochi Media, la cual que mantenía sus servidores bajo Nginx y FreeBSD.</p>

<p>Al no tener que crear nuevos procesos en la creación de hilos, el consumo de memoria es significativamente bajo, tan bajo como a merced del alto trafico de varios cientos de peticiones por segundo en un sólo servidor, el consumo es de unos 15MB de RAM y 10% de CPU. Mientras que con Apache no logra manejar el mismo nivel de concurrencia además de crear miles de procesos que inundan la memoria con más de 400MB de RAM, el consumo del procesador es ligeramente mayor y por ende, un rendimiento más lento y susceptible a fallar o caerse.</p>

<p>Referencia: <a href="https://groups.google.com/forum/#!topic/turbogears/pWlg6jjj6m0">TurboGears</a></p>

<hr />

<h2>Instalación</h2>

<p>Con todo lo que hemos visto, si no has probado aun Nginx debes estar desesperado por ver el poder que esconde, procedamos con el proceso de instalación.</p>

<h3>Mac OS X</h3>

<p>Como de costumbre en este sistema operativo, el procedimiento de instalación por excelencia es por <a href="http://codehero.co/como-lo-hago-instalar-homebrew/">Homebrew</a>. Tan solo ejecutando el siguiente comando estaremos listos:</p>

<pre>$ brew install nginx
</pre>

<p>La dependencia PCRE (Expresiones Regulares Compatibles con Perl) será instalada ya que es necesaria para construir Nginx.</p>

<p>Para iniciar el proceso solo debemos correr el comando <code>nginx</code> en la consola.</p>

<blockquote>
  <p>Ya que realizamos la instalación por Homebrew no necesitaremos utilizar el comando <em>sudo</em> para llamar al comando <code>nginx</code>. Sin embargo si queremos que Nginx corra en un puerto menor al 1024 (Ej. el 80 como es de costumbre), luego de cambiar el puerto en el archivo de configuración, sí necesitaremos hacer uso del prefijo <em>sudo</em>.</p>
</blockquote>

<h3>Linux</h3>

<p>Para este caso el proceso de instalación es casi igual de sencillo:</p>

<pre>$ sudo apt-get update
$ sudo apt-get install nginx
</pre>

<p>Luego para iniciar el proceso lo haremos ejecutando <code>sudo nginx</code>.</p>

<h3>FreeBSD</h3>

<p>En este sistema operativo utilizaremos la colección de puertos, la cual nos ofrece una manera sencilla de instalar software:</p>

<pre>$ cd /usr/ports/www/nginx
$ sudo make install clean
</pre>

<p>Y en el instalador podemos dejar los módulos por defecto o seleccionar adicionalmente el que desees.</p>

<p>Posteriormente para iniciar el proceso ejecutamos <code>sudo nginx</code>.</p>

<h3>Windows</h3>

<p>Para este caso particular debemos descargar manualmente la última versión del comprimido en la <a href="http://nginx.org/en/download.html">página oficial de Nginx</a>.</p>

<blockquote>
  <p>Para este sistema operativo no se debe esperar altos niveles rendimiento ni altos niveles de concurrencia debido a que existen varios problemas y conflictos conocidos, el funcionamiento de Nginx en Windows se considera en estado <em>beta</em>.</p>
</blockquote>

<p>Luego descomprimiremos el archivo que descargamos y usando la consola navegaremos al nuevo directorio para iniciar el proceso:</p>

<pre>$ cd directorio\nginx\descomprimido
$ start nginx
</pre>

<h3>Prueba</h3>

<p>Luego de haber instalado e iniciado Nginx, probemos que efectivamente sirve dirigiéndonos a la dirección web donde fue instalado (si estamos instalando localmente será <code>localhost</code>) y especificando el puerto por defecto de instalación (en OS X, Homebrew durante la instalación debió indicarlo, suele ser <code>8080</code>. Los demás suelen establecerlo directamente en el <code>80</code>), y veremos una página como esta:</p>

<p><img src="http://i.imgur.com/KAWLZng.png" alt="" /></p>

<blockquote>
  <p>Puede que haya conflictos con el puerto si tienes instalado otro servidor web como Apache que se encuentre en funcionamiento y escuchando el mismo puerto, esto lo solucionaremos más adelante en la configuración.</p>
</blockquote>

<hr />

<h2>Configuración</h2>

<p>Bien, ahora que sabemos que nuestro servidor funciona conozcamos algunos aspectos de la configuración de Nginx, para esto debemos abrir el archivo que la contiene.</p>

<h3>Mac OS X y FreeBSD</h3>

<pre>/usr/local/etc/nginx/nginx.conf
</pre>

<h3>Linux</h3>

<pre>/etc/nginx/sites-available/default
</pre>

<h3>Windows</h3>

<pre>directorio_donde_descomprimimos_nginx\conf\nginx.conf
</pre>

<p></br></p>

<p>Podremos notar que la estructura del archivo es bastante intuitiva, veamos algunos datos básicos.</p>

<p>Para iniciar, cada host virtual está delimitado de la siguiente manera:</p>

<pre>server {
    ...
}
</pre>

<p>Dentro de cada host podremos especificar cosas como:</p>

<ul>
<li>El puerto donde escucha Nginx y el nombre del host:</li>
</ul>

<pre>...
listen       80;
server_name  dominio.com;
...
</pre>

<ul>
<li>El directorio raíz del servidor y nombres de los archivos <em>index</em>:</li>
</ul>

<pre>…
root   /Users/jonathanwiesel/www;
index  index.html index.htm;
...
</pre>

<ul>
<li>Ubicaciones, estas nos sirven para delimitar diferentes comportamientos para cada área especifica del servidor, Nginx siempre tratará de buscar la ubicación más especifica, de lo contrario recurrirá a la ubicación por defecto <code>/</code>:</li>
</ul>

<pre>location ~ ^/foro/(?P.*)$ {
    return 301 $scheme://foro.dominio.com/$1;
}
</pre>

<p>En este caso cualquier ubicación que tenga el sufijo /foro será transferida al subdominio <code>foro.dominio.com</code>.</p>

<p>Un ejemplo de <em>caching</em> de imágenes bastante útil:</p>

<pre>location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
    expires 30d;
}
</pre>

<p>Esto le indicará al explorador del cliente que debe mantener en cache por 30 días cualquier ubicación que termine con alguna de estas extensiones, es decir, cualquier archivo de imagen con estas extensiones. Esto incrementará dramáticamente la velocidad de carga de la página con dichas imágenes en futuras visitas del usuario.</p>

<ul>
<li>PHP-FastCGI:</li>
</ul>

<pre>location ~ \.php$ {
        fastcgi_pass  localhost:9000;

        fastcgi_param  QUERY_STRING       $query_string;
        fastcgi_param  REQUEST_METHOD     $request_method;
        fastcgi_param  CONTENT_TYPE       $content_type;
        fastcgi_param  CONTENT_LENGTH     $content_length;

        fastcgi_param  SCRIPT_NAME        $fastcgi_script_name;
        fastcgi_param SCRIPT_FILENAME     $document_root$fastcgi_script_name;
        fastcgi_param  REQUEST_URI        $request_uri;
        fastcgi_param  DOCUMENT_URI       $document_uri;
        fastcgi_param  DOCUMENT_ROOT      $document_root;
        fastcgi_param  SERVER_PROTOCOL    $server_protocol;

        fastcgi_param  REMOTE_ADDR        $remote_addr;
        fastcgi_param  REMOTE_PORT        $remote_port;
        fastcgi_param  SERVER_ADDR        $server_addr;
        fastcgi_param  SERVER_PORT        $server_port;
        fastcgi_param  SERVER_NAME        $server_name;

        include       fastcgi_params;
}
</pre>

<p>También podemos establecer host virtuales HTTPS:</p>

<pre>server {
       listen 443;
       server_name localhost;

       root html;
       index index.html index.htm;

       ssl on;
       ssl_certificate cert.pem;
       ssl_certificate_key cert.key;

       ssl_session_timeout 5m;

       ssl_protocols SSLv3 TLSv1;
       ssl_ciphers ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv3:+EXP;
       ssl_prefer_server_ciphers on;
       …
}
</pre>

<p>Proxies en reversa a Apache (cortesía de <a href="http://www.cyberciti.biz/tips/using-nginx-as-reverse-proxy.html">nixCraft</a>):</p>

<pre>upstream apachephp  {
    server 192.168.1.11:80;
}

server {
    listen       202.54.1.1:80;
    server_name  www.dominio.com;

    access_log  /var/log/nginx/log/www.dominio.access.log  main;
    error_log  /var/log/nginx/log/www.dominio.error.log;
    root   /usr/share/nginx/html;
    index  index.html index.htm;

    ## mandamos la petición a apache ##
    location / {
        proxy_pass  http://apachephp;
        proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
        proxy_redirect off;
        proxy_buffering off;
        proxy_set_header        Host              $host;
        proxy_set_header        X-Real-IP         $remote_addr;
        proxy_set_header        X-Forwarded-For   $proxy_add_x_forwarded_for;
   }
}
</pre>

<hr />

<h2>Conclusión</h2>

<p>Nginx es una herramienta muy poderosa, capaz de muchas cosas impresionantes y sin apoderarse de tu presupuesto en hardware. Ciertamente no es el único que desea destronar a Apache, <a href="http://www.lighttpd.net/">Lighttpd</a> es una buena solución a considerar, lo importante es probar otras opciones y no quedarnos con lo que conocemos y nos sentimos cómodos ya que experimentando es la manera que podemos determinar con propiedad qué es lo beneficioso para nosotros.</p>
