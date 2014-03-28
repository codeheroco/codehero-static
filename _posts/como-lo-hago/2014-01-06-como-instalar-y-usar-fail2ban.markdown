---
layout: post
status: publish
published: true
title: Cómo Instalar y Usar Fail2Ban
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
wordpress_id: 2889
wordpress_url: http://codehero.co/?p=2889
date: 2014-01-06 23:26:47.000000000 -04:30
categories:
- Cómo lo hago
- fail2ban
tags:
- nginx
- iptables
- firewall
- ssh
- fail2ban
- ip
- bloqueo
- ban
- baneo
- banning
- jaula
- jail
---
<p>La seguridad en nuestros computadores y servidores es un factor crítico que debemos tomar en cuenta, especialmente cuando tenemos servicios que son visibles al mundo a través de la red. Esta semana aprenderemos como mantener bajo control a aquellos que se atrevan a intentar violentar nuestros sistemas.</p>

<hr />

<h2>¿Qué es Fail2Ban?</h2>

<p>Esta herramienta de <a href="https://github.com/fail2ban/fail2ban">código abierto</a> permite bloquear o vetar a aquellos que al tratar de violentar un servicio produzcan errores de autenticación.</p>

<p>El procedimiento que sigue <strong>Fail2Ban</strong> para lograr su cometido está basado en el escaneo de las bitácoras o <em>logs</em> que almacenan los intentos fallidos de autenticación y según las reglas establecidas en la configuración de la herramienta se puede proceder a vetar al responsable mediante el establecimiento de reglas de rechazo de IP en el firewall del sistema.</p>

<p>Fail2Ban se puede configurar para que escanee varias bitácoras de distintos servicios como SSH, servidores web, y más.</p>

<hr />

<h2>¿Cómo lo instalo?</h2>

<p>Para el momento de este escrito, la última versión de <strong>Fail2Ban</strong> es la v0.8.11. El único requerimiento de sistema necesario es tener instalado Python en un versión mayor o igual a la v2.6.</p>

<h3>Mac OS X</h3>

<p>Como de costumbre utilizaremos el método predilecto de instalación por <a href="http://codehero.co/como-lo-hago-instalar-homebrew/">Homebrew</a>, para ello solo debemos ejecutar lo siguiente en el terminal:</p>

<pre>
$ brew update
...
$ brew install fail2ban
</pre>

<h3>Debian</h3>

<p>Para sistemas basados en Debian como Ubuntu podemos utilizar el manejador de paquetes por defecto que trae el sistema:</p>

<pre>
$ sudo apt-get update
...
$ sudo apt-get install fail2ban
</pre>

<h3>Fedora</h3>

<p>Para sistemas basados en Fedora también utilizaremos el manejador de paquetes por defecto del sistema:</p>

<pre>
$ yum update
...
$ yum install fail2ban
</pre>

<hr />

<h2>¿Cómo lo configuro?</h2>

<p>Ahora debemos localizar el archivo de configuración de Fail2Ban en nuestro sistema. Este se debe encontrar en una ruta como esta:</p>

<pre>
/etc/fail2ban/jail.conf
</pre>

<blockquote>
  <p>Debido a que Homebrew instala los paquetes en un directorio local del usuario, en el caso de Mac OS X el directorio sería: <code>/usr/local/etc/fail2ban/jail.conf</code>. Este será el que verás referenciado durante el curso ya que estoy trabajando en un computador con Mac OS X.</p>
</blockquote>

<p>Es recomendable que este archivo de configuración no sea editado directamente para cumplir con nuestras necesidades para evitar problemas al actualizar, por ello haremos una copia del archivo <code>jail.conf</code> que llamaremos <code>jail.local</code> en el mismo directorio. Este será el que modificaremos.</p>

<blockquote>
  <p>Fail2Ban al iniciar su servicio lee primero el archivo por defecto de configuración <code>jail.conf</code> y posteriormente el declarado local <code>jail.local</code>, por lo que en realidad solo necesitaríamos especificar en el local lo diferente al por defecto. Para fines educativos de esta entrada trataremos el <code>jail.local</code> como un todo.</p>
</blockquote>

<p>Ahora veamos algunos datos del contenido de este archivo de configuración:</p>

<pre>
$ cp /usr/local/etc/fail2ban/jail.conf /usr/local/etc/fail2ban/jail.local
$ cat /usr/local/etc/fail2ban/jail.local
...
</pre>

<p>Veremos primero una sección <code>[DEFAULT]</code> con los siguientes parámetros:</p>

<ul>
<li><code>ignoreip</code> - direcciones que no serán tomadas en cuenta por Fail2Ban, esto evitará que tu mismo puedas quedar sin acceso.</li>
<li><code>bantime</code> - tiempo en segundos que durará el bloqueo de la dirección.</li>
<li><code>maxretry</code> - cantidad máxima de intentos fallidos de autenticación antes de ser bloqueado.</li>
<li><code>findtime</code> - ventana de tiempo en segundos durante el cual se toma en cuenta el parámetro <code>maxretry</code>.</li>
<li><code>backend</code> - el programa o algoritmo utilizado para "escuchar" o verificar la modificación de un archivo o bitácora.</li>
<li><code>usedns</code> - si un <em>hostname</em> es encontrado en lugar de una dirección se define aquí si se debe ejecutar un <em>DNS Lookup</em> para resolverlo.</li>
</ul>

<p>Más abajo podremos ver varios ejemplos para distintos servicios y comportamientos de bloqueo, a estas definiciones se les llama <strong>cárceles</strong> o <strong><em>jails</em></strong>. Estas poseen una estructura con varios parámetros, los más comunes son los siguientes particulares:</p>

<ul>
<li><code>enabled</code> - habilitar / inhabilitar  esta cárcel.</li>
<li><code>filter</code> - expresión regular para buscar en la bitácora lineas que coincidan.</li>
<li><code>action</code> - acciones a ejecutar o comportamiento de la cárcel.</li>
<li><code>logpath</code> - ruta hacia el archivo bitácora a escanear.</li>
</ul>

<p>También es posible especificar varios de los parámetros que se encuentran en la sección <code>[DEFAULT]</code> para que en dicha cárcel en particular el parámetro tome un valor distinto.</p>

<blockquote>
  <p>En versiones de Linux es común encontrar que las acciones por defecto se encuentran predefinidas en la sección principal de <code>[DEFAULT]</code> en una variable global <code>action</code> que puede referenciar al <code>banaction</code> por defecto para todas las jaulas y así no tener que repetirlo en cada una.</p>
</blockquote>

<h3>Filtros</h3>

<p>Si nos dirigimos al directorio de filtros que trae Fail2Ban notaremos todos aquellos que vienen incluidos por defecto, evidentemente pudieses crear el tuyo propio:</p>

<pre>
$ ls /usr/local/etc/fail2ban/filter.d
3proxy.conf           cyrus-imap.conf       pam-generic.conf      selinux-ssh.conf
apache-auth.conf      dovecot.conf          perdition.conf        sieve.conf
apache-badbots.conf   dropbear.conf         php-url-fopen.conf    sogo-auth.conf
apache-common.conf    exim-common.conf      postfix-sasl.conf     sshd-ddos.conf
apache-nohome.conf    exim-spam.conf        postfix.conf          sshd.conf
apache-noscript.conf  exim.conf             proftpd.conf          suhosin.conf
apache-overflows.conf gssftpd.conf          pure-ftpd.conf        uwimap-auth.conf
assp.conf             lighttpd-auth.conf    qmail.conf            vsftpd.conf
asterisk.conf         lighttpd-fastcgi.conf recidive.conf         webmin-auth.conf
common.conf           mysqld-auth.conf      roundcube-auth.conf   wuftpd.conf
courierlogin.conf     named-refused.conf    sasl.conf             xinetd-fail.conf
couriersmtp.conf      nginx-http-auth.conf  selinux-common.conf
</pre>

<p>Si entramos en uno de ellos notaremos el parámetro vital, <code>failregex</code>. Este define las expresiones regulares que determinarán las líneas en las bitácoras que deben ser procesadas por las acciones definidas en la cárcel.</p>

<pre>
$ cat /usr/local/etc/fail2ban/filter.d/sshd.conf
...
failregex = ^%(__prefix_line)s(?:error: PAM: )?[aA]uthentication (?:failure|error) for .* from <HOST>( via \S+)?\s*$
            ^%(__prefix_line)s(?:error: PAM: )?User not known to the underlying authentication module for .* from <HOST>\s*$
            ^%(__prefix_line)sFailed \S+ for .*? from <HOST>(?: port \d*)?(?: ssh\d*)?(: (ruser .*|(\S+ ID \S+ \(serial \d+\) CA )?\S+ %(__md5hex)s(, client user ".*", client host ".*")?))?\s*$
            ^%(__prefix_line)sROOT LOGIN REFUSED.* FROM <HOST>\s*$
            ^%(__prefix_line)s[iI](?:llegal|nvalid) user .* from <HOST>\s*$
            ^%(__prefix_line)sUser .+ from <HOST> not allowed because not listed in AllowUsers\s*$
            ^%(__prefix_line)sUser .+ from <HOST> not allowed because listed in DenyUsers\s*$
            ^%(__prefix_line)sUser .+ from <HOST> not allowed because not in any group\s*$
            ^%(__prefix_line)srefused connect from \S+ \(<HOST>\)\s*$
            ^%(__prefix_line)sUser .+ from <HOST> not allowed because a group is listed in DenyGroups\s*$
            ^%(__prefix_line)sUser .+ from <HOST> not allowed because none of user's groups are listed in AllowGroups\s*$
...
</pre>

<h3>Acciones</h3>

<p>Algo parecido podremos apreciar al dirigirnos al directorio de acciones de Fail2Ban:</p>

<pre>
$ ls /usr/local/etc/fail2ban/action.d
apf.conf                            iptables-xt_recent-echo.conf
bsd-ipfw.conf                       iptables.conf
complain.conf                       mail-buffered.conf
dshield.conf                        mail-whois-lines.conf
dummy.conf                          mail-whois.conf
firewall-cmd-direct-new.conf        mail.conf
hostsdeny.conf                      mynetwatchman.conf
ipfilter.conf                       osx-afctl.conf
ipfw.conf                           osx-ipfw.conf
iptables-allports.conf              pf.conf
iptables-blocktype.conf             route.conf
iptables-ipset-proto4.conf          sendmail-buffered.conf
iptables-ipset-proto6-allports.conf sendmail-common.conf
iptables-ipset-proto6.conf          sendmail-whois-lines.conf
iptables-multiport-log.conf         sendmail-whois.conf
iptables-multiport.conf             sendmail.conf
iptables-new.conf                   shorewall.conf
</pre>

<p>Si entramos a alguna de ellas notaremos los siguientes parámetros en la sección de <code>[DEFINITION]</code>:</p>

<p>Preparación:</p>

<ul>
<li><code>actionstart</code> - comandos ejecutados al iniciar el servicio de Fail2Ban</li>
<li><code>actionstop</code> - comandos ejecutados al detenerse el servicio de Fail2Ban</li>
</ul>

<p>Verificación:</p>

<ul>
<li><code>actioncheck</code> - comandos ejecutados justo antes de cada comando de bloqueo</li>
</ul>

<p>Ejecución:</p>

<ul>
<li><code>actionban</code> - comandos ejecutados para bloquear un <em>host</em> al encontrar una coincidencia en los filtros de la cárcel.</li>
<li><code>actionunban</code> - comandos ejecutados para desbloquear un <em>host</em> una vez haya pasado el período de bloqueo (<em>bantime</em>).</li>
</ul>

<p>Notarás que la mayoría de estos comandos poseen variables que serán evaluadas en momento de ejecución, aquellas encerradas entre llaves punteadas (<code>&lt;&gt;</code>). Por ello más abajo encontraremos la sección de <code>[INIT]</code> en la cual encontraremos la definición e inicialización por defecto de estas variables.</p>

<p>Si retomamos lo que vimos en el archivo <code>jail.local</code> notarás que lo indicado en el parámetro <code>action</code> en una cárcel viene siendo como una llamada a un método pasandole parámetros específicos en un lenguaje de programación común. Lo cual en realidad estaría referenciando al archivo de configuración de la acción pasandole los valores deseados a las variables.</p>

<hr />

<h2>Demostración</h2>

<p>Muy bien, ahora usaremos un computador con Ubuntu para demostrar una de las configuraciones más comunes sobre todo en los VPS, controlar el acceso por SSH.</p>

<p>Primero debemos editar en el archivo <code>jail.local</code> y habilitaremos la jaula llamada <code>ssh</code> si no se encuentra ya activa por defecto y la modificaremos para que se vea algo parecido a esto:</p>

<pre>
[ssh]

enabled  = true
port     = ssh
filter   = sshd
logpath  = /var/log/auth.log
maxretry = 3
findtime = 600
bantime  = 60
</pre>

<p>Esta jaula utilizará el archivo <code>sshd.conf</code> que se encuentra en el directorio de filtros de fail2ban y si buscamos más arriba en las variables por defecto notaremos la acción por defecto referenciada de una manera parecida a esta:</p>

<pre>
action = %(action_)s
...
action_ = %(banaction)s[name=%(__name__)s, port="%(port)s", protocol="%(protocol)s", chain="%(chain)s"]
...
banaction = iptables-multiport
...
</pre>

<p>Esto indica que la jaula tomará las acciones del archivo <code>iptables-multiport.conf</code> que se encuentra en el directorio de acciones de fail2ban.</p>

<p>Como te imaginarás las acciones de esta jaula están relacionadas a bloquear en el firewall del Kernel de Linux al infractor que falle 3 veces en la autenticación por el protocolo SSH.</p>

<p>Adicionalmente se encuentran predefinidos un par de parámetros que permitirán enviar un correo electrónico en caso de ocurrir un bloqueo (esto si nuestro equipo tiene un servidor de correo configurado):</p>

<pre>
destemail = jonathan@codehero.co
...
mta = sendmail
</pre>

<blockquote>
  <p>Segun tu sistema operativo es posible que estas acciones o comportamientos no se encuentren globalizados sino definidos especificamente en cada jaula.</p>
</blockquote>

<p>Ahora solo queda proceder a iniciar el servicio de fail2ban. Para ello ejecutaremos:</p>

<pre>
$ sudo service fail2ban start
</pre>

<p>Ahora desde otro computador tratemos de acceder por SSH a este equipo introduciendo 3 veces la clave erronea. (En mi caso el equipo protegido se encuentra en la IP <code>192.168.33.10</code>):</p>

<pre>
otroComputador:~$ ssh ubuntu@192.168.33.10
ubuntu@192.168.33.10's password:
Permission denied, please try again.
ubuntu@192.168.33.10's password:
Permission denied, please try again.
ubuntu@192.168.33.10's password:
Permission denied (publickey,password).
</pre>

<p>Casualmente al fallar 3 veces la clave, el servidor cesará de pedirla y nos desconectará, <strong>esto es un comportamiento estándar, NO de Fail2Ban.</strong></p>

<p>Ahora probemos volver a ingresar una 4 vez:</p>

<pre>
otroComputador:~$ ssh ubuntu@192.168.33.10
ssh: connect to host 192.168.33.10 port 22: Operation timed out
</pre>

<p>Como podremos notar el servidor nos ha bloqueado y por ello no nos responde, <strong>este SI es el comportamiento de Fail2Ban.</strong></p>

<p>Si esperamos un minuto y volvemos a tratar veremos que ya no seguimos bloqueados y podemos volver a tratar (esto por la regla que estipulamos en la jaula de que el tiempo de bloqueo o <code>bantime</code> es de 60 segundos):</p>

<pre>
otroComputador:~$ ssh ubuntu@192.168.33.10
ubuntu@192.168.33.10's password:
...
</pre>

<p>Si en nuestro equipo con Fail2Ban vemos su bitácora veremos algo como esto:</p>

<pre>
...
2014-01-07 03:04:01,872 fail2ban.jail   : INFO   Creating new jail 'ssh'
2014-01-07 03:04:01,877 fail2ban.jail   : INFO   Jail 'ssh' uses Gamin
2014-01-07 03:04:01,894 fail2ban.filter : INFO   Added logfile = /var/log/auth.log
2014-01-07 03:04:01,894 fail2ban.filter : INFO   Set maxRetry = 3
2014-01-07 03:04:01,895 fail2ban.filter : INFO   Set findtime = 600
2014-01-07 03:04:01,896 fail2ban.actions: INFO   Set banTime = 60
2014-01-07 03:04:01,936 fail2ban.jail   : INFO   Jail 'ssh' started
2014-01-07 03:04:04,006 fail2ban.actions: WARNING [ssh] Ban 192.168.33.1
2014-01-07 03:05:04,298 fail2ban.actions: WARNING [ssh] Unban 192.168.33.1
...
</pre>

<p>Podrás notar como la jaula de SSH fue creada e iniciada, además de cuando se bloqueó una dirección y luego de 1 minuto que fue desbloqueada.</p>

<hr />

<h2>Conclusión</h2>

<p>Siempre hemos insistido que la seguridad es un derecho para todos y por eso tratamos de dar las herramientas necesarias para que puedas protegerte de acciones que puedan perjudicarte a tí o tus sistemas, Fail2Ban ciertamente puede ayudarte a mantener estas situaciones un poco más controladas, aunque una única herramienta nunca es garantía de nada pero siempre es bueno estar preparado en varias areas para finalmente tener una estrategia global de seguridad y protección. Herramientas como estas pueden ayudar a proteger servicios ante ataque DDoS (Ataques Distribuidos de Negación de Servicio) y <em>bots</em> que al ser bloqueados se dan cuenta que no pueden continuar y se mueven hacia el siguiente objetivo.</p>
