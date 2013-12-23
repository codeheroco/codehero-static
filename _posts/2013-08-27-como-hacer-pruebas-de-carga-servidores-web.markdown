---
layout: post
status: publish
published: true
title: Cómo Hacer Pruebas de Carga a Servidores Web
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
wordpress_id: 2101
wordpress_url: http://codehero.co/?p=2101
date: 2013-08-27 00:05:01.000000000 -04:30
categories:
- Cómo lo hago
- Pruebas de Carga
tags:
- pruebas de carga
- pruebas de estres
- pruebas de stress
- ab
- apachebench
- siege
---
<p>Cuando estás desarrollando un aplicativo web que podría estar bajo altos niveles de tráfico, luego de configurarla y tener todo listo para hacerla disponible al mundo es una buena práctica ponerla bajo pruebas de estrés y pruebas de carga para determinar su capacidad y velocidad de respuesta, esto permite saber los límites bajo los cuales tu aplicación se comportará de manera apropiada y te permitirá saber cuando necesitarás implementar diferentes estrategias de optimización como a niveles de configuración del servidor o a veces implementar soluciones de balanceo de carga.</p>

<hr />

<h2>¿Qué es una prueba de carga?</h2>

<p>Una prueba de carga se define como el proceso que se le impone a un sistema basado en una cantidad predefinida de peticiones o procedimientos con la finalidad de determinar su comportamiento esperado para dicha situación.</p>

<hr />

<h2>¿Cual es la diferencia con una prueba de estrés?</h2>

<p>Mucha gente los define como sinónimos y no hacen ninguna distinción; sin embargo el concepto de pruebas de estrés refiere al caso particular de determinar el comportamiento del sistema bajo un nivel de exigencia mayor al que es capaz de manejar, de ahí el origen de su nombre.</p>

<p>Bajo este tipo de pruebas el sistema se satura y los escenarios más comunes suelen ser:</p>

<ul>
<li><p>El sistema va respondiendo lo que puede y desecha algunas peticiones.</p></li>
<li><p>El sistema responde todas las peticiones pero con un retraso considerable.</p></li>
<li><p>El sistema colapsa y queda fuera de línea.</p></li>
</ul>

<blockquote>
  <p>Muchos ataques DDoS se basan en este principio para inundar de peticiones a un servicio con la intención de hacerlo colapsar si el mismo no posee medidas de seguridad que lo protejan en estos casos.</p>
</blockquote>

<hr />

<h2>Herramientas de pruebas de carga HTTP</h2>

<p>Existen muchas herramientas en el mercado que satisfacen este propósito, varias de ellas pagas, aquí en lo posible tratamos de enfocaros en soluciones de código abierto así que les hablaremos de algunas muy interesantes y dejaremos que ustedes decidan cual les parece la más apropiada para sus necesidades.</p>

<blockquote>
  <p>Para la realización de pruebas de este tipo se recomienda establecer una línea base sin niveles de concurrencia e ir aumentándolo para poder apreciar la evolución del comportamiento.</p>
</blockquote>

<p>Todas ofrecen otras opciones y funcionalidades que los hacen más flexibles pero aquí solo veremos ejemplos básicos.</p>

<hr />

<h2>ApacheBench</h2>

<p>Esta herramienta como su nombre lo indica nos la entrega la fundación Apache y ofrece múltiples opciones, además viene preinstalada en los sistemas Mac OS X.</p>

<blockquote>
  <p>Se recomienda actualizar la versión que viene preinstalada para evitar varios problemas conocidos.</p>
</blockquote>

<pre>> $ brew tap homebrew/dupes 
> ...
> $ brew install ab
> </pre>

<p>Para instalarlo en sistemas Linux basados en Debian basta con ejecutar el siguiente comando:</p>

<pre>$ sudo apt-get install apache2-utils
</pre>

<p>Ahora solo queda empezar a probar contra un servidor. Ya que no queremos que nos bloqueen de ningún sitio por estar atacándolo sin merced, lo haremos contra uno local.</p>

<p>El formato más común para realizar una prueba es algo como esto:</p>

<pre>$ ab -n 10000 -c 100 -g grafica.data http://localhost:8888/loadTesting/test
</pre>

<ul>
<li><code>ab</code> nos permite hacer uso de la herramienta.</li>
<li><code>-n</code> especificamos la cantidad de peticiones que deseamos enviar.</li>
<li><code>-c</code> especificamos la cantidad de conexiones concurrentes.</li>
<li><code>-g</code> podemos generar una gráfica de gnuplot para apreciar mejor los resultados.</li>
<li>Finalmente colocamos la dirección que deseamos probar.</li>
</ul>

<p>Tendríamos como resultado una salida así:</p>

<pre>This is ApacheBench, Version 2.3 &lt;$Revision: 1373084 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient)
Completed 1000 requests
Completed 2000 requests
Completed 3000 requests
Completed 4000 requests
Completed 5000 requests
Completed 6000 requests
Completed 7000 requests
Completed 8000 requests
Completed 9000 requests
Completed 10000 requests
Finished 10000 requests


Server Software:        Apache/2.2.22
Server Hostname:        localhost
Server Port:            8888

Document Path:          /loadTesting/test
Document Length:        43 bytes

Concurrency Level:      100
Time taken for tests:   68.749 seconds
Complete requests:      10000
Failed requests:        0
Write errors:           0
Total transferred:      6660000 bytes
HTML transferred:       430000 bytes
Requests per second:    145.46 [#/sec] (mean)
Time per request:       687.489 [ms] (mean)
Time per request:       6.875 [ms] (mean, across all concurrent requests)
Transfer rate:          94.60 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0  152 154.5    108     598
Processing:    16  533 287.5    520    2137
Waiting:        1  487 283.0    483    2063
Total:         87  685 259.6    618    2425

Percentage of the requests served within a certain time (ms)
  50%    618
  66%    733
  75%    835
  80%    905
  90%   1045
  95%   1154
  98%   1318
  99%   1475
 100%   2425 (longest request)
</pre>

<p>Podemos apreciar varios datos de interés como:</p>

<ul>
<li>Tiempos promedio de peticiones por segundo.</li>
<li>Tiempo promedio para cumplir una petición.</li>
<li>Velocidad de transferencia. </li>
<li>Tiempos por estado de petición.</li>
</ul>

<hr />

<h2>Siege</h2>

<p>Una herramienta utilizada ampliamente por desarrolladores (y algunos <em>hacktivistas</em>) para realización de pruebas de carga. Cortesía de JoeDog Software</p>

<p>En Mac OS X el procedimiento de instalación es el de costumbre:</p>

<pre>$ brew install siege
</pre>

<p>En Debian Linux igual de fácil con:</p>

<pre>$ apt-get install siege
</pre>

<p>Hagamos una prueba parecida a la que hicimos con ApacheBench:</p>

<pre>$ siege -t 60s -c 100 -b -q http://localhost:8888/loadTesting/test
</pre>

<ul>
<li><code>siege</code> nos permite hacer uso de la herramienta.</li>
<li><code>-t</code> especificamos el tiempo que tomará la prueba.</li>
<li><code>-c</code> especificamos la cantidad de conexiones concurrentes.</li>
<li><code>-b</code> obliga a no tener ningún retraso entre cada usuario simulado (modo benchmark).</li>
<li><code>-q</code> elimina la salida resultante de cada petición que va mostrando el proceso durante la prueba.</li>
<li>Finalmente colocamos la dirección que deseamos probar.</li>
</ul>

<p>Tendríamos como resultado una salida así:</p>

<pre>Transactions:                   7718 hits
Availability:                   100.00 %
Elapsed time:                   59.83 secs
Data transferred:               0.32 MB
Response time:                  0.77 secs
Transaction rate:               129.00 trans/sec
Throughput:                     0.01 MB/sec
Concurrency:                    98.97
Successful transactions:        7718
Failed transactions:               0
Longest transaction:            2.74
Shortest transaction:           0.02
</pre>

<p>También podemos especificar con el atributo <code>-f</code> la ruta a un archivo donde puedes especificar múltiples direcciones que deseas atacar en la misma prueba, además el atributo <code>-d</code> permite colocar un intervalo de retraso entre cada usuario simulado, lo cual simularía un comportamiento más natural.</p>

<hr />

<h2>Conclusión</h2>

<p>Esta práctica de aplicación de pruebas de carga es de suma utilidad especialmente cuando te encuentras en la parte de ajustes de configuración del servidor y/o aplicación ya que te permite identificar los límites y posibles fallas antes de que ocurran en un ambiente productivo. Inclusive si estás indeciso y no te decides en qué tecnología aplicar para un proyecto particular y cual sería el de mayor aguante, puedes hacer un boceto de cada una y ponerlos a prueba para tomar una decisión más objetiva.</p>
