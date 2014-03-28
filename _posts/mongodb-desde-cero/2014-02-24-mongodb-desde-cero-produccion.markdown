---
layout: post
status: publish
published: true
title: Producción
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
wordpress_id: 3049
wordpress_url: http://codehero.co/?p=3049
date: 2014-02-24 22:30:59.000000000 -04:30
categories:
- Cursos
- MongoDB
tags:
- seguridad
- mongo
- mongodb
- respaldo
- replicacion
- fragmentacion
- producción
- mongohq
- mongolab
- 64bit
- mms
- disponibilidad
- rendiemiento
---
<p>Luego de pasar por un espectro de temas de esta solución de base de datos NoSQL hemos llegado al final de la serie. Pasamos desde lo más sencillo aprendiendo qué es MongoDB, de qué esta compuesto y como se instala a las tareas más avanzadas de manipulación de datos. Para culminar la serie es vital mencionar varios aspectos que se deben considerar al usar MongoDB en un ambiente de producción.</p>

<hr />

<h2>Seguridad</h2>

<p>Debemos siempre proteger nuestras instancias de base de datos y la información que estas contienen, por ello es altamente recomendado establecer los usuarios con sus respectivos niveles de acceso a las instancias, esto evitará que cualquier individuo con o sin acceso a las mismas pueda realizar operaciones que no debería estar haciendo.</p>

<p>No utilices el puerto estándar de las instancias (27017 para <code>mongod</code> por ejemplo), el conocimiento por agentes externos de donde se alojan tus servicios es el primer paso que puede desatar un ataque.</p>

<p>Protege los accesos, dentro de lo posible trata de limitar por medio de reglas de <em>firewall</em> el acceso para que solo las aplicaciones que deben comunicarse con la base de datos sean las autorizadas a establecer una conexión con el servidor.</p>

<p>Para más detalles puede volver a echar un vistazo a la entrada de <a href="http://codehero.co/mongodb-desde-cero-seguridad/">Seguridad.</a></p>

<hr />

<h2>Infraestructura</h2>

<p>Siempre utiliza sistemas operativos de 64bit. Los paquetes de 32bit de MongoDB solo pueden almacenar 2GB de datos, estos son ideales para ambientes de prueba y aprender pero no para el despliegue de la base de datos final.</p>

<p>Si estás buscando maximizar el rendimiento de entrada y salida de la base de datos se recomienda invertir en memoria RAM y discos de estado sólido (SSD), incrementar el poder de procesamiento al agregar más núcleos de CPU o actualizar a uno más potente puede ayudar pero los cambios no son tan significativos.</p>

<p>Siempre habilita memoria <em>swap</em> en sistemas Linux, esto evitará errores de escasez de memoria que pueda matar algún proceso de Mongo.</p>

<p>Trate de utilizar almacenamiento local en lugar de sistemas de archivos remotos, esto aplica en general para varios sistemas de base de datos, no solo MongoDB. En caso de utilizarlos, opta por servicios de protocolo iSCSI y no NFS, ya que este último puede causar múltiples escenarios de errores, incompatibilidades y degradación en el rendimiento. Algunos ejemplos de esto serían el EBS de Amazon y unidades locales montadas como sistemas de archivos para máquinas virtuales.</p>

<p>En ambientes Linux que posean NUMA (Acceso de memoria no uniforme) se debe desactivar este comportamiento para MongoDB para evitar múltiples escenarios de problemas y degradación en el rendimiento. Esto también aplica para otras bases de datos como MySQL.</p>

<hr />

<h2>Disponibilidad y Rendimiento</h2>

<p>Se recomienda ampliamente utilizar <a href="http://codehero.co/mongodb-desde-cero-replicacion-parte-i/"><em>replica sets</em></a>, esto ayudará a mantener la base de datos siempre disponible sin importar si alguno de sus nodos falla.</p>

<p>Siempre debes tener un número impar de miembros, preferiblemente repartidos en <em>datacenters</em> separados ya que cuando un proveedor de servicios falla suele fallar por <em>datacenter</em> completo.</p>

<p>Recuerda que puedes utilizar los tipos especiales de miembros secundarios para tareas especiales como reportes y respaldos, de esta manera no se estará generando una carga adicional sobre los miembros principales.</p>

<p>Si tu aplicación que se comunica con la base de datos tiene un nivel muy elevado de lecturas puedes habilitar la lectura a miembros secundarios, esto permitirá balancear la carga para que el primario no se someta a tanto estrés.</p>

<p>Para manejo de volúmenes de datos muy grandes considera utilizar <a href="http://codehero.co/mongodb-desde-cero-fragmentacion-parte-i/">fragmentación</a> esto te permitirá escalar tu infraestructura para soportar más datos manteniendo un alto nivel de rendimiento.</p>

<p>Nunca te olvides de construir los <a href="http://codehero.co/mongodb-desde-cero-indices-parte-i/">índices</a> necesarios para los tipos de búsquedas más frecuentes para incrementar la velocidad de las operaciones.</p>

<hr />

<h2>Prevención</h2>

<p>Siempre <a href="http://codehero.co/mongodb-desde-cero-respaldos-y-restauracion/">respalda</a> con frecuencia la información de tu base de datos. Esto es imperativo para cualquier solución de base de datos y debe ser tomada muy en serio ya que nadie quiere perder información valiosa que pueda comprometer la aplicación que esta soporta.</p>

<p>Mantén monitoreado tu sistema, de esta manera puedes detectar degradación en el rendimiento y estar al tanto de fallas que puedan ocurrir.</p>

<p>Para ambos casos los compañeros de 10gen (compañía detrás del desarrollo de MongoDB) nos ofrecen una herramienta tipo <em>cloud</em> llamada <a href="https://mms.mongodb.com/‎">MMS</a> (Servicio de administración de MongoDB), esta monitoreará de manera gratuita todas tus instancias de base de datos y te avisará si alguna falla, y por una cuota mensual también va respaldando los datos de tu base de datos de manera frecuente.</p>

<p>Para monitorear también puede utilizar <a href="http://codehero.co/como-monitorear-los-recursos-de-un-servidor-utilizando-munin/">Munin</a> con el <em>plugin</em> de MongoDB.</p>

<hr />

<h2>Alternativas</h2>

<p>Si prefieres que alguien más se encargue de la carga pesada administrativa de la base de datos puedes utilizar servicios <em>cloud</em> como <a href="http://www.mongohq.com/">MongoHQ</a> o <a href="https://mongolab.com/‎">MongoLab</a>, de esta manera se tercerizan las tareas más pesadas como la fragmentación, replicación, respaldos y monitoreo. Incluso tienen planes gratis para que puedas ir desarrollando sobre ellos y determines si es lo que deseas.</p>

<hr />

<h2>Conclusión</h2>

<p>Bueno, han sido unos meses muy interesantes y productivos desde que empezamos con MongoDB aquí en CODEHERO, espero que lo hayan aprovechado y disfrutado, ciertamente yo lo hice y aprendí junto con ustedes. Hay varios detalles que no tocamos pero creo que hemos cubierto lo suficiente como para enfrentarnos a la mayoría de las situaciones que se nos pueden presentar. Fue un placer guiarlos a través de este camino del NoSQL, y siempre pueden hacernos saber sus dudas, inquietudes y comentarios.</p>
