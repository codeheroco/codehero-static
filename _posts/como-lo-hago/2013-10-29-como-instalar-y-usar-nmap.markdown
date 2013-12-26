---
layout: post
status: publish
published: true
title: Cómo Instalar y Usar Nmap
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
wordpress_id: 2481
wordpress_url: http://codehero.co/?p=2481
date: 2013-10-29 00:05:13.000000000 -04:30
categories:
- Cómo lo hago
- nmap
tags:
- seguridad
- nmap
- hosts
- tcp
- redes
- descubrimiento
- syn
---
<p>Un factor muy importante a considerar en la seguridad de una red o un equipo con acceso a la misma, es aquel que define el nivel de exposición de los servicios que esta ofrece. Esto con la finalidad de delimitar o al menos conocer sus puntos de entrada y salida de una red o equipo y obtener información detallada sobre el ellos. Para cumplir con este propósito, esta semana hablaremos de un conocido escáner de redes llamado <strong>nmap</strong>.</p>

<hr />

<h2>¿Qué es nmap?</h2>

<p>Nmap se define como una suite de herramientas de descubrimiento de redes de código abierto, ha sido utilizada desde hace mucho tiempo en procesos de auditorias de seguridad ya que la misma permite determinar los puntos de acceso de una red y logra extraer grandes y útiles cantidades de información de la misma. Algunos de los puntos que caracterizan a esta herramienta son sus capacidades de determinar lo siguiente:</p>

<ul>
<li><em>Hosts</em> en una red.</li>
<li>Servicios ofrecidos por cada <em>host</em>.</li>
<li>Tipos de paquetes y firewalls que utilizan.</li>
<li>Sistema operativo que ejecutan.</li>
<li>Y mucho más...</li>
</ul>

<p>Como podrás imaginar, esta herramienta permite determinar los puntos débiles los cuales pueden ser aprovechados por individuos con malas intenciones para perjudicar la integridad de la red o aquellos que la componen. Su uso relacionado al <em>hacking</em> ha sido tan controversial que ha figurado en varios filmes famosos a nivel mundial como Matrix Recargado, Duro de Matar 4, Bourne Ultimatum, La Chica del Dragón Tatuado e incluso en la reciente película de ciencia ficción protagonizada por Matt Damon, Elysium.</p>

<p>Sin duda <strong>nmap</strong> permite conocer información importante de una red, pero no creas que con él ya tendrás acceso inmediato a la misma como lo has visto en los filmes, conocer vulnerabilidades y/o puntos de acceso es muy diferente a saber explotarlos (y este último no es el objetivo de este curso), es nuestro derecho como usuarios saber como protegernos al conocer esta información, y en <strong>CODEHERO</strong> es nuestro deber guiarte para lograrlo.</p>

<blockquote>
  <p>Ten en cuenta que el uso de esta herramienta a niveles abiertos puede estar prohibido en tu país o jurisdicción, lo que aprendas aquí debes utilizarlo en redes y ambientes propios y controlados.</p>
</blockquote>

<hr />

<h2>¿Cómo lo instalo?</h2>

<p>El primer paso para experimentar con esta herramienta es instalarla, como siempre aquí te enseñamos la manera más sencilla y eficiente de hacerlo.</p>

<h3>Mac OS X</h3>

<p>Utilizaremos nuestro manejador de paquetes favorito, <a href="http://codehero.co/como-lo-hago-instalar-homebrew/">Homebrew:</a></p>

<pre>$ brew install nmap
</pre>

<h3>Debian</h3>

<p>Para sistemas basados en Debian como Ubuntu utilizaremos el manejador de paquetes por defecto del sistema:</p>

<pre>$ apt-get install nmap
</pre>

<h3>Fedora</h3>

<p>Para sistemas basados en Fedora como CentOS o Red Hat utilizaremos el manejador de paquetes YUM:</p>

<pre>$ yum install nmap
</pre>

<h3>Windows</h3>

<p>En caso de ambientes Windows deben dirigirse al <a href="http://nmap.org/download.html">portal de descargas de nmap</a> y descargar el instalador.</p>

<blockquote>
  <p>Durante la instalación, si se te ofrece la opción, debes seleccionar instalar WinPcap.</p>
</blockquote>

<p>Para el caso particular de ambientes Windows, al ejecutar el comando que ejecutará las funciones de <strong>nmap</strong> deberás estar ubicado (por línea de comandos) en el directorio donde fue instalado (donde se encuentre el nmap.exe)</p>

<hr />

<h2>Usos básicos</h2>

<p>El uso de esta herramienta puede ser bastante extenso, por esta razón trataremos de cubrir solo algunos de los casos de uso básicos y más utilizados. Para mayor información pueden acceder a la <a href="http://nmap.org/man/es/">guía de referencia en español de nmap.</a>.</p>

<p>A continuación iremos probando progresivamente los comandos más comunes de <strong>nmap</strong>.</p>

<h3>Escaneo Ping</h3>

<p>Uno de los más utilizados por muchos ya que permite determinar los <em>hosts</em> que se encuentran activos en una red, probemos con nuestra red local (en mi caso es la <code>192.168.0.1</code>).</p>

<pre>$ nmap -sP 192.168.0.1/24

Nmap scan report for dlinkrouter.interlink.net.ve (192.168.0.1)
Host is up (0.0027s latency).
Nmap scan report for 192.168.0.100
Host is up (0.00037s latency).
Nmap scan report for 192.168.0.102
Host is up (0.049s latency).
Nmap scan report for 192.168.0.104
Host is up (0.015s latency).
Nmap done: 256 IP addresses (4 hosts up) scanned in 16.16 seconds
</pre>

<p>Podemos apreciar que <strong>nmap</strong> ha encontrado 4 hosts activos, el router y 3 más, evidentemente una de ellas es el computador donde estoy escribiendo, pero los otros 2 los descubriremos pronto.</p>

<blockquote>
  <p>Notemos que hemos puesto un <code>/24</code> luego de la IP inicial que define mi red, esto indica que los primeros 24 bits de la IP definen la subred y los 8 bits restantes definen el espacio reservado para los <em>hosts</em>, es posible también indicarlo de las siguiente manera: <code>192.168.0.1-255</code> ó <code>192.168.0.*</code> lo cual de igualmente significa que se debe tomar la subred de <em>hosts</em> que van desde el 192.168.0.<code>1</code>, 192.168.0.<code>2</code> ... al 192.168.0.<code>255</code>. Este tipo de subred es la más común para redes locales domésticas.</p>
</blockquote>

<h3>Escaneo TCP Connect</h3>

<p>Este se define como el escaneo de puertos más simple, este listará aquellos puertos abiertos y asequibles. Probemos con una de las direcciones IP que encontramos antes para ver de qué se trata:</p>

<pre>$ nmap –sT 192.168.0.104

Nmap scan report for 192.168.0.104
Host is up (0.012s latency).
Not shown: 991 closed ports
PORT      STATE SERVICE
80/tcp    open  http
135/tcp   open  msrpc
139/tcp   open  netbios-ssn
443/tcp   open  https
445/tcp   open  microsoft-ds
2869/tcp  open  icslap
3580/tcp  open  nati-svrloc
10243/tcp open  unknown
31038/tcp open  unknown
</pre>

<p>Podremos notar algunos de los puertos abiertos para este <em>host</em> y los servicios que corren en los mismos.</p>

<h3>Escaneo TCP SYN</h3>

<p>Este tipo de escaneo se basa en no establecer una conexión completa con el <em>host</em> para descubrirlo, esto se logra al monitorear los primeros pasos al establecer una conexión conocidos como el <strong>saludo de tres vías</strong>, este comando ejecuta la siguiente lógica para realizar su magia:</p>

<ul>
<li><strong>nmap</strong> envía al puerto del <em>host</em> el paquete SYN (sincronizar) para notificar que quiere establecer una conexión.</li>
<li>Si el <em>host</em> responde con un SYN/ACK (sincronizado y reconocido) entonces el puerto esta abierto.</li>
<li><strong>nmap</strong> envía un paquete RST (resetear) para cerrar la conexión inmediatamente, esto con la intención de no establecer completamente la conexión y de que el intento de conexión no aparezca en las bitácoras de aplicación.</li>
</ul>

<blockquote>
  <p>Este método se consideró inicialmente como <em>stealth</em> (sigiloso) por esta última razón; sin embargo es de resaltar que varios firewalls modernos son capaces de detectar un escaneo TCP SYN simple.</p>
</blockquote>

<pre>$ nmap –sS 192.168.0.104
</pre>

<h3>Escaneo FIN, Null y Xmas Tree</h3>

<p>Debido al alto número de firewalls buscando atrapar los paquetes SYN que puedan poner al descubierto los <em>hosts</em> detrás del mismo, vienen al juego estos tipos de escaneos lo cuales se basan en establecer un juego definido de banderas en el encabezado de la petición TCP con la intención de tratar de evitar el filtrado.</p>

<pre>$ nmap –sF 192.168.0.104
...
$ nmap –sN 192.168.0.104
...
$ nmap –sX 192.168.0.104
...
</pre>

<h3>Obtener Sistema Operativo del Host</h3>

<p>Es común la necesidad de saber a que nos enfrentamos cuando estamos tratando con el descubrimiento de redes, para esto podemos habilitar la detección de sistema operativo de la siguiente manera:</p>

<pre>$ nmap -O 192.168.0.102

...
Nmap scan report for 192.168.0.102
Host is up (0.012s latency).
Not shown: 999 closed ports
PORT      STATE SERVICE
62078/tcp open  iphone-sync
MAC Address: **************** (Apple)
Device type: media device|phone
Running: Apple iOS 4.X|5.X|6.X
OS CPE: cpe:/o:apple:iphone_os:4 cpe:/a:apple:apple_tv:4 cpe:/o:apple:iphone_os:5 cpe:/o:apple:iphone_os:6
OS details: Apple Mac OS X 10.8.0 - 10.8.3 (Mountain Lion) or iOS 4.4.2 - 6.1.3 (Darwin 11.0.0 - 12.3.0)
Network Distance: 1 hop

OS detection performed. Please report any incorrect results at http://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 59.95 seconds
</pre>

<h3>Escaneo de lista</h3>

<p>Este comando nos permitirá conocer los nombres de los <em>hosts</em> o direcciones IP de aquella dirección que indiquemos, esto incluye la resolución de nombre DNS. Tengamos en cuenta que este tipo de escaneo no le hará <em>ping</em> a los hosts ni escaneará sus puertos.</p>

<pre>$ nmap -sL google.com

Nmap scan report for google.com (190.142.193.30)
Other addresses for google.com (not scanned): 190.142.193.25 190.142.193.39 190.142.193.44 190.142.193.50 190.142.193.59 190.142.193.45 190.142.193.20 190.142.193.35 190.142.193.29 190.142.193.40 190.142.193.49 190.142.193.34 190.142.193.24 190.142.193.55 190.142.193.54
Nmap done: 1 IP address (0 hosts up) scanned in 0.65 seconds
</pre>

<p>Podremos notar que hemos logrado obtener una lista de <em>hosts</em> sobre los cuales está operando Google en este momento.</p>

<hr />

<h2>Conclusión</h2>

<p>Esta herramienta es sumamente poderosa, aquí solo hemos tocado la superficie sobre lo que es capaz, recuerda visitar el <a href="http://nmap.org/man/es/">portal web de nmap</a> para más información, más comandos y funcionalidades. Saber qué esta expuesto de una red es el primer paso para lograr protegerla, si encuentras puertos extraños que no deberían estar abiertos, cierralos, estos pueden ser entradas a atacantes e incluso algunos virus. Algunos otros puertos muy normales como el SSH, si no lo usas nunca, considera en cerrarlo, mientras más controlado este un sistema menos oportunidad existe para violentarlo.</p>
