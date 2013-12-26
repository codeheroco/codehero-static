---
layout: post
status: publish
published: true
title: Replicación - Parte I
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
wordpress_id: 2823
wordpress_url: http://codehero.co/?p=2823
date: 2013-12-10 00:05:06.000000000 -04:30
categories:
- Cursos
- MongoDB
tags:
- mongo
- mongodb
- replicacion
- replica
- set
- replica set
- árbitro
- miembro
- elección
- elecciones
- prioridad
---
<p>Una de las técnicas utilizadas ampliamente en sistemas de producción es la replicación de los datos a través de distintas instancias y computadores para asegurar que la información esté siempre disponible y reducir los riesgos de pérdida o corrupción de la misma. Esta semana veremos como encargarnos de esto en MongoDB.</p>

<hr />

<h2>Funcionamiento conceptual</h2>

<p>El principal propósito de la implementación de estrategias de replicación de datos es incrementar la redundancia de los mismos, esto nos permite tener una base de datos de alta disponibilidad e integridad. Una base de datos al tener varias copias exactas en diferentes infraestructuras separadas asegura que si una de las instancias falla, ya sea una falla catastrófica a nivel de hardware o situaciones diversas que pudiesen corromper y/o evitar el acceso a la data, el sistema que dicha base de datos alimente no se vea afectado ya que existen otras instancias espejo que tomarán el lugar de la original mediante un proceso transparente para los usuarios finales.</p>

<hr />

<h2>Arquitectura</h2>

<p>En MongoDB, al grupo de instancias que poseerán la misma información se les denomina <strong>replica set</strong> o grupo de replicación.</p>

<p>Un <strong>replica set</strong> en MongoDB está compuesto por 2 tipos principales de miembros, instancias <strong>primarias</strong> y <strong>secundarias</strong>, teniendo una única instancia <strong>primaria</strong> la cual aceptará todas las operaciones de escritura provenientes de los sistemas cliente. Las operaciones de lectura son dirigidas por defecto a la instancia primaria; sin embargo es posible configurar la lectura a instancias secundarias.</p>

<p><img src="http://i.imgur.com/lb5E4xm.png" alt="Interacción cliente" /></p>

<p>Estas operaciones que alteran los datos son escritas en un archivo llamado <strong>oplog</strong> o bitácora de operaciones, los miembros secundarios replican este archivo del miembro primario y ejecutan las mismas operaciones sobre su conjunto de datos, esto permite tener la misma información en las diferentes instancias.</p>

<p><img src="http://i.imgur.com/UuBqsGV.png" alt="Replicación" /></p>

<blockquote>
  <p>Debemos tomar en cuenta que debido a que el procedimiento de replicación se realiza de manera asíncrona, es posible que clientes que consulten directamente a miembros secundarios no obtengan la información más reciente.</p>
</blockquote>

<h3>Tipos de miembros secundarios</h3>

<p>Existen 3 configuraciones especiales para los miembros secundarios, esto nos permitirá delimitar su funcionamiento para un fin específico.</p>

<h4>Miembro de prioridad 0</h4>

<p>Se le denomina a un miembro secundario configurado con prioridad 0, esto evitará que dicho miembro pueda ser elegido a convertirse en miembro primario en caso de que aquel falle.</p>

<h4>Miembro escondido</h4>

<p>Son miembros secundarios de tipo prioridad 0 pero que además se les niega la posibilidad de ser accesibles para lectura por parte de los sistemas cliente.</p>

<h4>Miembro retrasado</h4>

<p>También son miembros de prioridad 0 y poseen la cualidad particular de mantener un estado retrasado de la base de datos, suele utilizarse como instancias de respaldo ya que no han sido afectadas por las últimas operaciones que pudiesen estar alterando de manera no deseada la información. Debido al estado retrasado de este miembro se recomienda que también se defina como un miembro escondido.</p>

<hr />

<h2>Elecciones</h2>

<p>La arquitectura de los <strong>replica set</strong> dicta que los miembros deben enviar latidos o <em>pings</em> entre ellos cada 2 segundos, si en un período de 10 segundos el latido no es devuelto, se marca al miembro en cuestión como inaccesible.</p>

<p><img src="http://i.imgur.com/BxYXNBP.png" alt="Latidos" /></p>

<h3>Llamar a elección</h3>

<p>Una elección se lleva a cabo cuando no existe un miembro primario, este deja de responder o este es obligado a darse de baja, veamos las diferentes condiciones:</p>

<ul>
<li>La iniciación de un nuevo <strong>replica set</strong>.</li>
<li>Un miembro secundario pierde contacto con el primario.</li>
<li>El miembro primario es obligado a convertirse en secundario.</li>
<li>Si un secundario es elegible para elecciones y posee un mayor indice de prioridad.</li>
</ul>

<h3>Prioridad</h3>

<p>La elección de un nuevo miembro primario se basa inicial y principalmente en la comparación de prioridades de aquellos miembros elegibles, esta prioridad es por defecto 1, esto para darles a todos los miembros la posibilidad de ser elegidos.</p>

<p>Si un miembro de mayor prioridad alcanza a tener al día su información con al menos 10 segundos con respecto al <strong>oplog</strong>, se declara una elección para darle a dicho nodo de mayor prioridad la oportunidad de convertirse en primario.</p>

<blockquote>
  <p>Recuerda que los miembros con prioridad 0 no pueden ser elegidos como primarios.</p>
</blockquote>

<h3>Optime</h3>

<p>Se toma en cuenta la estampilla de tiempo más reciente de la última operación que el miembro aplicó del <strong>oplog</strong>, por ello se llama <strong>optime</strong> o tiempo de operación.</p>

<h3>Conectividad</h3>

<p>Otro aspecto a considerar es la capacidad que tiene el candidato para conectarse con la mayoría de de los miembros en el grupo.</p>

<blockquote>
  <p>En este caso particular se le llama "miembros" a aquellos que poseen la capacidad para votar. Al configurar un miembro del <strong>replica set</strong> se puede indicar si a este se le permite votar o no y cuantos votos posee cada uno.</p>
</blockquote>

<h3>Negaciones en elecciones</h3>

<p>Cualquier miembro del <strong>replica set</strong> puede vetar o negar una elección (incluyendo aquellos miembros que no votan) si ocurre alguna las siguientes situaciones:</p>

<ul>
<li>Si el miembro que busca la elección no es parte del grupo de votantes.</li>
<li>Si el miembro que busca la elección no está al día con las operaciones más recientes en el <strong>oplog</strong> que son accesibles por el <strong>replica set</strong>.</li>
<li>Si el miembro que busca la elección posee una prioridad menor a algún otro miembro que también sea elegible.</li>
<li>Si el miembro primario para el momento posee un <strong>optime</strong> mayor o igual que aquel que busca la elección (desde el punto de vista del miembro votante).</li>
</ul>

<hr />

<h2>Consideraciones</h2>

<p>Existen varios aspectos a considerar cuando se desea implementar una estrategia de replicación, varias de ellas aplican a sistemas de bases de datos comunes.</p>

<h3>Miembros impares</h3>

<p>Procura que la cantidad de miembros en tu <strong>replica set</strong> sea impar, esto facilitará los procesos de elecciones y solicitará menos recursos y menos tiempo.</p>

<p>Para estos casos es posible configurar un miembro <strong>árbitro</strong>. Este tipo de miembros <strong>no</strong> poseen una copia del conjunto de datos y por ende no pueden volverse primarios. Pueden ser de gran utilidad cuando no posees la infraestructura para soportar un miembro más pero deseas seguir el estándar de miembros impares ya que la cantidad de recursos que necesita es mucho menor.</p>

<h3>Número de miembros</h3>

<p>Un <strong>replica set</strong> puede tener un máximo de 12 miembros y solo 7 de ellos con la capacidad de votar. En caso de que tu solución necesite un mayor número de miembros es posible implementar la estrategia precedente a los <strong>replica set</strong> conocida como <a href="http://docs.mongodb.org/manual/core/master-slave/">replicación maestro-esclavo</a>. Se debe tomar en cuenta que esta estrategia ofrece menos redundancia y no soporta el proceso automático de recuperación a fallas como lo hacen los <strong>replica set</strong> con los latidos y elecciones.</p>

<h3>Distribución geográfica</h3>

<p>Procura subdividir los miembros de tu <strong>replica set</strong> en distintos centros de datos, esto asegurará que si algo le sucede al centro de datos, tu base de datos se mantendrá activa. De igual manera trata de mantener una mayoría en uno de los centros para garantizar que los miembros puedan elegir a un primario en caso de que la comunicación entre otros miembros localizados en otro centro se vea dificultado.</p>

<p>Inclusive puedes tener un miembro tipo prioridad 0 en un centro de datos aparte como respaldo.</p>

<h3>Balanceo de carga</h3>

<p>Como mencionamos inicialmente, es posible configurar el <strong>replica set</strong> para soportar la lectura de miembros secundarios, esto permitirá balancear la carga en ambientes que puedan encontrarse bajos altos niveles de estrés y concurrencia.</p>

<hr />

<h2>Conclusión</h2>

<p>Esta semana hemos visto mucha teoría de lo que amerita implementar una estrategia de replicación para nuestra base de datos en MongoDB, ciertamente es mucho que digerir pero no te preocupes que la semana que viene llevaremos esto a la práctica para que lo puedas ver con mayor facilidad. Sin embargo nos vemos en la necesidad de tocar todos estos aspectos debido a que es parte clave de lo será tu ambiente de producción final.</p>
