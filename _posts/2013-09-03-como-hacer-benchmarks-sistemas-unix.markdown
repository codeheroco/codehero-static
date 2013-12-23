---
layout: post
status: publish
published: true
title: Cómo Hacer Benchmarks a Sistemas *nix
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
wordpress_id: 2147
wordpress_url: http://codehero.co/?p=2147
date: 2013-09-03 00:00:40.000000000 -04:30
categories:
- Cómo lo hago
- Pruebas de Carga
tags:
- pruebas de carga
- pruebas de estres
- pruebas de stress
- benchmark
- unix
- linode
- aws
- digital ocean
---
<p>Muchas veces nos hemos encontrado en la situación que deseamos comparar el rendimiento y capacidades de varios computadores; sin embargo las diferencias entre tecnologías de hardware puede ser dificil de indetificar cual es el mejor a simple vista, para estos casos es de gran utilidad herramientas que sean capaces otorgar una calificación o índice que sirva de comparación, este proceso se les conoce como <strong>benchmark</strong>.</p>

<hr />

<h2>¿Qué es un benchmark?</h2>

<p>Las herramientas de <em>benchmarking</em> están compuestas de una serie de pruebas y procedimientos que consisten en aplicar a un sistema diferentes algoritmos conocidos sobre los cuales se tiene una estadistica base comparativa comprobada y en base a esto se determina un puntaje acorde al comportamiento resultante del sistema.</p>

<p>Dichas pruebas generan altos niveles de carga y estrés para lograr determinar las capacidades del objetivo.</p>

<p>En el mercado existen distintas herramientas de <em>benchmarking</em> enfocadas a diferentes areas, el area particular de evaluación de capacidades en video y <em>renderización</em> es uno de los más comunes, el cual pone bajo diferentes pruebas el hardware DirectX para determinar el rendimiento del sistema para juegos de alta calidad. También existen herramientas como <a href="http://www.primatelabs.com/geekbench/">Geekbench</a> es una de las más conocidas en OS X.</p>

<hr />

<h2>UnixBench</h2>

<p>Para nuestro caso utilizaremos esta herramienta que cuenta con diferentes estrategia y algoritmos de <em>benchmarking</em> como el <a href="http://es.wikipedia.org/wiki/Dhrystone">Dhrystone</a>, el <a href="http://es.wikipedia.org/wiki/Whetstone">Whetstone</a> y otras más. Nos ofrece la ventaja de ser compatible con múltiples sistemas Unix y es utilizado ampliamente, sobre todo para determinar rendimiento de diferentes proveedores de VPS (Servidores Privados Virtuales).</p>

<p>Primero descarguemoslo:</p>

<pre>$ wget https://byte-unixbench.googlecode.com/files/UnixBench5.1.3.tgz
</pre>

<p>Si tu sistema no posee <code>wget</code> lo puedes hacer por <code>curl</code> tambien:</p>

<pre>$ curl https://byte-unixbench.googlecode.com/files/UnixBench5.1.3.tgz -o UnixBench5.1.3.tgz
</pre>

<p>Luego lo descomprimimos y compilamos:</p>

<pre>$ tar xzf UnixBench5.1.3.tgz
$ cd UnixBench
$ make
</pre>

<p>Finalmente ejecutamos la herramienta:</p>

<pre>$ ./Run
</pre>

<p>Esto dará inicio la proceso de <em>benchmarking</em>, luego de varios minutos obtendremos los resultados, de muestra mostremos este de una instancia Micro de AWS:</p>

<pre>========================================================================
   BYTE UNIX Benchmarks (Version 5.1.3)

   System: ip-10-155-221-123: GNU/Linux
   OS: GNU/Linux -- 3.2.0-40-virtual -- #64-Ubuntu SMP Mon Mar 25 22:07:32 UTC 2013
   Machine: i686 (i386)
   Language: en_US.utf8 (charmap="UTF-8", collate="UTF-8")
   CPU 0: Intel(R) Xeon(R) CPU E5-2650 0 @ 2.00GHz (3591.3 bogomips)
          Hyper-Threading, MMX, Physical Address Ext, SYSENTER/SYSEXIT
   16:47:22 up 20 days,  3:35,  1 user,  load average: 0.16, 0.06, 0.06; runlevel 2

------------------------------------------------------------------------
Benchmark Run: Tue Aug 27 2013 16:47:22 - 17:16:48
1 CPU in system; running 1 parallel copy of tests

Dhrystone 2 using register variables        7379217.5 lps   (10.1 s, 7 samples)
Double-Precision Whetstone                      864.0 MWIPS (20.7 s, 7 samples)
Execl Throughput                                519.5 lps   (29.7 s, 2 samples)
File Copy 1024 bufsize 2000 maxblocks        175877.9 KBps  (30.0 s, 2 samples)
File Copy 256 bufsize 500 maxblocks           48260.0 KBps  (30.0 s, 2 samples)
File Copy 4096 bufsize 8000 maxblocks        453880.0 KBps  (30.1 s, 2 samples)
Pipe Throughput                              123147.2 lps   (10.0 s, 7 samples)
Pipe-based Context Switching                  13587.6 lps   (10.1 s, 7 samples)
Process Creation                                894.4 lps   (30.1 s, 2 samples)
Shell Scripts (1 concurrent)                    516.9 lpm   (60.2 s, 2 samples)
Shell Scripts (8 concurrent)                     68.2 lpm   (61.6 s, 2 samples)
System Call Overhead                          75310.3 lps   (10.1 s, 7 samples)

System Benchmarks Index Values               BASELINE       RESULT    INDEX
Dhrystone 2 using register variables         116700.0    7379217.5    632.3
Double-Precision Whetstone                       55.0        864.0    157.1
Execl Throughput                                 43.0        519.5    120.8
File Copy 1024 bufsize 2000 maxblocks          3960.0     175877.9    444.1
File Copy 256 bufsize 500 maxblocks            1655.0      48260.0    291.6
File Copy 4096 bufsize 8000 maxblocks          5800.0     453880.0    782.6
Pipe Throughput                               12440.0     123147.2     99.0
Pipe-based Context Switching                   4000.0      13587.6     34.0
Process Creation                                126.0        894.4     71.0
Shell Scripts (1 concurrent)                     42.4        516.9    121.9
Shell Scripts (8 concurrent)                      6.0         68.2    113.6
System Call Overhead                          15000.0      75310.3     50.2
                                                                   ========
System Benchmarks Index Score                                         155.6
</pre>

<p>En el informe podemos notar algunos detalles del equipo, como la cantidad y tipo de unidades de procesamiento.</p>

<p>En los resultados observemos que para cada tipo de prueba se tiene un valor base, el valor resultante de la prueba y la calificación otorgada. Finalmente observamos la calificación final otorgada por la herramienta (155.6).</p>

<p>Hagamoslo en otro sistema para comparar, en un Linode Basico obtenemos algo así:</p>

<pre>========================================================================
   BYTE UNIX Benchmarks (Version 5.1.3)

   System: localhost: GNU/Linux
   OS: GNU/Linux -- 3.9.3-x86-linode52 -- #1 SMP Mon May 20 09:32:28 EDT 2013
   Machine: i686 (i386)
   Language: en_US.utf8 (charmap="UTF-8", collate="UTF-8")
   CPU 0: Intel(R) Xeon(R) CPU L5520 @ 2.27GHz (4533.5 bogomips)
          Hyper-Threading, MMX, Physical Address Ext
   CPU 1: Intel(R) Xeon(R) CPU L5520 @ 2.27GHz (4533.5 bogomips)
          Hyper-Threading, MMX, Physical Address Ext
   CPU 2: Intel(R) Xeon(R) CPU L5520 @ 2.27GHz (4533.5 bogomips)
          Hyper-Threading, MMX, Physical Address Ext
   CPU 3: Intel(R) Xeon(R) CPU L5520 @ 2.27GHz (4533.5 bogomips)
          Hyper-Threading, MMX, Physical Address Ext
   CPU 4: Intel(R) Xeon(R) CPU L5520 @ 2.27GHz (4533.5 bogomips)
          Hyper-Threading, MMX, Physical Address Ext
   CPU 5: Intel(R) Xeon(R) CPU L5520 @ 2.27GHz (4533.5 bogomips)
          Hyper-Threading, MMX, Physical Address Ext
   CPU 6: Intel(R) Xeon(R) CPU L5520 @ 2.27GHz (4533.5 bogomips)
          Hyper-Threading, MMX, Physical Address Ext
   CPU 7: Intel(R) Xeon(R) CPU L5520 @ 2.27GHz (4533.5 bogomips)
          Hyper-Threading, MMX, Physical Address Ext
   13:06:49 up 20 min,  1 user,  load average: 0.06, 0.19, 0.21; runlevel 2

------------------------------------------------------------------------
Benchmark Run: Tue Aug 27 2013 13:06:49 - 13:35:05
8 CPUs in system; running 1 parallel copy of tests

Dhrystone 2 using register variables       14353651.1 lps   (10.0 s, 7 samples)
Double-Precision Whetstone                     2511.1 MWIPS (10.0 s, 7 samples)
Execl Throughput                               1547.1 lps   (30.0 s, 2 samples)
File Copy 1024 bufsize 2000 maxblocks        432072.9 KBps  (30.0 s, 2 samples)
File Copy 256 bufsize 500 maxblocks          112451.4 KBps  (30.0 s, 2 samples)
File Copy 4096 bufsize 8000 maxblocks       1100643.8 KBps  (30.0 s, 2 samples)
Pipe Throughput                              622147.3 lps   (10.0 s, 7 samples)
Pipe-based Context Switching                  40320.8 lps   (10.0 s, 7 samples)
Process Creation                               3111.7 lps   (30.0 s, 2 samples)
Shell Scripts (1 concurrent)                   4769.6 lpm   (60.0 s, 2 samples)
Shell Scripts (8 concurrent)                   1588.5 lpm   (60.0 s, 2 samples)
System Call Overhead                         482402.5 lps   (10.0 s, 7 samples)

System Benchmarks Index Values               BASELINE       RESULT    INDEX
Dhrystone 2 using register variables         116700.0   14353651.1   1230.0
Double-Precision Whetstone                       55.0       2511.1    456.6
Execl Throughput                                 43.0       1547.1    359.8
File Copy 1024 bufsize 2000 maxblocks          3960.0     432072.9   1091.1
File Copy 256 bufsize 500 maxblocks            1655.0     112451.4    679.5
File Copy 4096 bufsize 8000 maxblocks          5800.0    1100643.8   1897.7
Pipe Throughput                               12440.0     622147.3    500.1
Pipe-based Context Switching                   4000.0      40320.8    100.8
Process Creation                                126.0       3111.7    247.0
Shell Scripts (1 concurrent)                     42.4       4769.6   1124.9
Shell Scripts (8 concurrent)                      6.0       1588.5   2647.6
System Call Overhead                          15000.0     482402.5    321.6
                                                                   ========
System Benchmarks Index Score                                         622.6

------------------------------------------------------------------------
Benchmark Run: Tue Aug 27 2013 13:35:05 - 14:03:00
8 CPUs in system; running 8 parallel copies of tests

Dhrystone 2 using register variables       63707678.6 lps   (10.0 s, 7 samples)
Double-Precision Whetstone                    17187.2 MWIPS (10.3 s, 7 samples)
Execl Throughput                               7657.5 lps   (30.0 s, 2 samples)
File Copy 1024 bufsize 2000 maxblocks        589907.5 KBps  (30.0 s, 2 samples)
File Copy 256 bufsize 500 maxblocks          151504.8 KBps  (30.0 s, 2 samples)
File Copy 4096 bufsize 8000 maxblocks       1795849.7 KBps  (30.0 s, 2 samples)
Pipe Throughput                             3272519.5 lps   (10.0 s, 7 samples)
Pipe-based Context Switching                 362213.8 lps   (10.0 s, 7 samples)
Process Creation                              13809.3 lps   (30.0 s, 2 samples)
Shell Scripts (1 concurrent)                  16251.5 lpm   (60.0 s, 2 samples)
Shell Scripts (8 concurrent)                   2139.6 lpm   (60.1 s, 2 samples)
System Call Overhead                        3129971.9 lps   (10.0 s, 7 samples)

System Benchmarks Index Values               BASELINE       RESULT    INDEX
Dhrystone 2 using register variables         116700.0   63707678.6   5459.1
Double-Precision Whetstone                       55.0      17187.2   3124.9
Execl Throughput                                 43.0       7657.5   1780.8
File Copy 1024 bufsize 2000 maxblocks          3960.0     589907.5   1489.7
File Copy 256 bufsize 500 maxblocks            1655.0     151504.8    915.4
File Copy 4096 bufsize 8000 maxblocks          5800.0    1795849.7   3096.3
Pipe Throughput                               12440.0    3272519.5   2630.6
Pipe-based Context Switching                   4000.0     362213.8    905.5
Process Creation                                126.0      13809.3   1096.0
Shell Scripts (1 concurrent)                     42.4      16251.5   3832.9
Shell Scripts (8 concurrent)                      6.0       2139.6   3566.0
System Call Overhead                          15000.0    3129971.9   2086.6
                                                                   ========
System Benchmarks Index Score                                        2146.2

</pre>

<p>Ya que este tipo de VPS posee 8 unidades de procesamiento, la herramienta ejecutó 2 conjuntos de pruebas, la primera ejecutó una copia de cada una de las pruebas (al igual que en la de AWS) y en la segunda ejecutó 8 copias paralelas de cada prueba, por lo que en este caso el primer conjunto de resultados sería el más apropiado para comparar con el de AWS.</p>

<p>En el caso de Linode, al tener 8 unidades de procesamiento obtenemos un resultado mucho mayor al de AWS (622.6), pero te preguntarás:</p>

<blockquote>
  <p>¿No debería ser mínimo 8 veces mayor ya que tiene 8 unidades de CPU además de ser de mayor velocidad (2.27GHz contra 2.0GHz)?</p>
</blockquote>

<p>La instancia básica de Linode especifica que en efecto se otorgan 8 unidades de CPU; sin embargo se ofrece la menor prioridad de uso, es decir, como los VPS funcionan varios en conjunto compartiendo recursos de un mismo servidor físico, el poder completo de los 8 núcleos no estarán disponibles para uso exclusivo y mucho menos en el caso de tener una instancia con la menor prioridad.</p>

<p>Inicialmente se pretendía tomar como caso de estudio una instancia de Digital Ocean, lamentablemente ya no está disponible ningún plan de prueba, ni siquiera teniendo cupones ya que sin un método de pago comprobado el sistema no permite la creación de instancias, por lo que no se pude tomar en cuenta para la comparación en este escrito.</p>

<hr />

<h2>Conclusión</h2>

<p><a href="http://codehero.co/como-hacer-pruebas-de-carga-servidores-web/">La semana pasada aprendimos a poner bajo prueba las capacidades de un servidor web</a>, ahora también sabemos como determinar las capacidades de un sistema. Recuerda que no debes basar tu criterio únicamente en los resultados que obtengas, debes tomar en cuenta el objetivo para el cual esta destinado tu sistema, quizás necesites un sistema con bajo poder de procesamiento pero con mucha memoria (como para bases de datos grandes de <a href="http://codehero.co/como-instalar-configurar-y-usar-redis/">Redis</a>) o con accesos veloces a disco (alta persistencia de datos), <strong>el poder de procesamiento no lo es todo</strong>. Estas practicas nos permiten hacer elecciones objetivas cuando nos vemos en la necesidad de optimizar los procesos o buscar alguna solución que se adapte mejor a nuestros objetivos.</p>
