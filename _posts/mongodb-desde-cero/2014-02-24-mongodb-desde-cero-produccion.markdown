---
layout: post
status: publish
published: true
title: Producción
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
date: 2014-02-24 22:30:59.000000000 -04:30
serie: MongoDB desde Cero
description: Llegamos al final de la serie, veamos qué debemos tener en cuenta antes de usar lo aprendido en un ambiente de producción.
dificultad: Intermedio
duracion: 15
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
Luego de pasar por un espectro de temas de esta solución de base de datos NoSQL hemos llegado al final de la serie. Pasamos desde lo más sencillo aprendiendo qué es MongoDB, de qué esta compuesto y como se instala a las tareas más avanzadas de manipulación de datos. Para culminar la serie es vital mencionar varios aspectos que se deben considerar al usar MongoDB en un ambiente de producción.

***

## Seguridad

Debemos siempre proteger nuestras instancias de base de datos y la información que estas contienen, por ello es altamente recomendado establecer los usuarios con sus respectivos niveles de acceso a las instancias, esto evitará que cualquier individuo con o sin acceso a las mismas pueda realizar operaciones que no debería estar haciendo.

No utilices el puerto estándar de las instancias (27017 para `mongod` por ejemplo), el conocimiento por agentes externos de donde se alojan tus servicios es el primer paso que puede desatar un ataque.

Protege los accesos, dentro de lo posible trata de limitar por medio de reglas de *firewall* el acceso para que solo las aplicaciones que deben comunicarse con la base de datos sean las autorizadas a establecer una conexión con el servidor.

Para más detalles puede volver a echar un vistazo a la entrada de [Seguridad.](http://codehero.co/mongodb-desde-cero-seguridad/)

***

## Infraestructura

Siempre utiliza sistemas operativos de 64bit. Los paquetes de 32bit de MongoDB solo pueden almacenar 2GB de datos, estos son ideales para ambientes de prueba y aprender pero no para el despliegue de la base de datos final.

Si estás buscando maximizar el rendimiento de entrada y salida de la base de datos se recomienda invertir en memoria RAM y discos de estado sólido (SSD), incrementar el poder de procesamiento al agregar más núcleos de CPU o actualizar a uno más potente puede ayudar pero los cambios no son tan significativos.

Siempre habilita memoria *swap* en sistemas Linux, esto evitará errores de escasez de memoria que pueda matar algún proceso de Mongo.

Trate de utilizar almacenamiento local en lugar de sistemas de archivos remotos, esto aplica en general para varios sistemas de base de datos, no solo MongoDB. En caso de utilizarlos, opta por servicios de protocolo  iSCSI y no NFS, ya que este último puede causar múltiples escenarios de errores, incompatibilidades y degradación en el rendimiento. Algunos ejemplos de esto serían el EBS de Amazon y unidades locales montadas como sistemas de archivos para máquinas virtuales.

En ambientes Linux que posean NUMA (Acceso de memoria no uniforme) se debe desactivar este comportamiento para MongoDB para evitar múltiples escenarios de problemas y degradación en el rendimiento. Esto también aplica para otras bases de datos como MySQL.

***



## Disponibilidad y Rendimiento

Se recomienda ampliamente utilizar [*replica sets*](http://codehero.co/mongodb-desde-cero-replicacion-parte-i/), esto ayudará a mantener la base de datos siempre disponible sin importar si alguno de sus nodos falla.

Siempre debes tener un número impar de miembros, preferiblemente repartidos en *datacenters* separados ya que cuando un proveedor de servicios falla suele fallar por *datacenter* completo.

Recuerda que puedes utilizar los tipos especiales de miembros secundarios para tareas especiales como reportes y respaldos, de esta manera no se estará generando una carga adicional sobre los miembros principales.

Si tu aplicación que se comunica con la base de datos tiene un nivel muy elevado de lecturas puedes habilitar la lectura a miembros secundarios, esto permitirá balancear la carga para que el primario no se someta a tanto estrés.

Para manejo de volúmenes de datos muy grandes considera utilizar [fragmentación](http://codehero.co/mongodb-desde-cero-fragmentacion-parte-i/) esto te permitirá escalar tu infraestructura para soportar más datos manteniendo un alto nivel de rendimiento.

Nunca te olvides de construir los [índices](http://codehero.co/mongodb-desde-cero-indices-parte-i/) necesarios para los tipos de búsquedas más frecuentes para incrementar la velocidad de las operaciones.

***

## Prevención

Siempre [respalda](http://codehero.co/mongodb-desde-cero-respaldos-y-restauracion/) con frecuencia la información de tu base de datos. Esto es imperativo para cualquier solución de base de datos y debe ser tomada muy en serio ya que nadie quiere perder información valiosa que pueda comprometer la aplicación que esta soporta.

Mantén monitoreado tu sistema, de esta manera puedes detectar degradación en el rendimiento y estar al tanto de fallas que puedan ocurrir.

Para ambos casos los compañeros de 10gen (compañía detrás del desarrollo de MongoDB) nos ofrecen una herramienta tipo *cloud* llamada [MMS](https://mms.mongodb.com/‎) (Servicio de administración de MongoDB), esta monitoreará de manera gratuita todas tus instancias de base de datos y te avisará si alguna falla, y por una cuota mensual también va respaldando los datos de tu base de datos de manera frecuente.

Para monitorear también puede utilizar [Munin](http://codehero.co/como-monitorear-los-recursos-de-un-servidor-utilizando-munin/) con el *plugin* de MongoDB.

***

## Alternativas

Si prefieres que alguien más se encargue de la carga pesada administrativa de la base de datos puedes utilizar servicios *cloud* como [MongoHQ](http://www.mongohq.com/) o [MongoLab](https://mongolab.com/‎), de esta manera se tercerizan las tareas más pesadas como la fragmentación, replicación, respaldos y monitoreo. Incluso tienen planes gratis para que puedas ir desarrollando sobre ellos y determines si es lo que deseas.

***

## Conclusión

Bueno, han sido unos meses muy interesantes y productivos desde que empezamos con MongoDB aquí en CODEHERO, espero que lo hayan aprovechado y disfrutado, ciertamente yo lo hice y aprendí junto con ustedes. Hay varios detalles que no tocamos pero creo que hemos cubierto lo suficiente como para enfrentarnos a la mayoría de las situaciones que se nos pueden presentar. Fue un placer guiarlos a través de este camino del NoSQL, y siempre pueden hacernos saber sus dudas, inquietudes y comentarios.
