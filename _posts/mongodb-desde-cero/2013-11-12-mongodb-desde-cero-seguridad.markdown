---
layout: post
status: publish
published: true
title: Seguridad
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
wordpress_id: 2567
wordpress_url: http://codehero.co/?p=2567
date: 2013-11-12 00:05:36.000000000 -04:30
serie: MongoDB desde Cero
thumbnail: http://i.imgur.com/XFFMeqB.png
categories:
- Cursos
- MongoDB
tags:
- seguridad
- admin
- mongo
- mongodb
- iptables
- firewall
- auth
- autenticacion
- autorización
- rest
---
<p>Hemos progresado mucho desde que empezamos esta serie; sin embargo, antes de pensar en implementar este tipo de base de datos en un ambiente de producción debemos saber como protegerla para que no pueda ser violentada y la información que esta contiene no sea robada o alterada, para ello esta semana hablaremos sobre las consideraciones de seguridad a tomar en cuenta al usar MongoDB.</p>

<hr />

<h2>Autenticación</h2>

<p>El primer método de protección de la base de datos es quizás el más común. Evitar que cualquiera pueda acceder a la instancia mediante unas credenciales. El procedimiento es bastante intuitivo, debemos ingresar a la instancia, crear un usuario administrador y reiniciar dicha instancia. Veamos de que se trata:</p>

<p>Primero ingresemos a la instancia y nos cambiaremos a la base de datos administradora que reside dentro de ella:</p>

<pre>$ mongo
MongoDB shell version: 2.4.7
...
> use admin
switched to db admin
</pre>

<p>Ahora creemos nuestro nuevo usuario administrador:</p>

<pre>> db.addUser('jonathan','c0d3h3r0')
</pre>

<p>Bien, ahora en el archivo de configuración de la instancia habilitaremos la autenticación:</p>

<pre>auth = true
</pre>

<p>Finalmente reiniciemos la instancia, volvamos a acceder a ella y tratemos de listar las bases de datos:</p>

<pre>$ mongo
MongoDB shell version: 2.4.7
...
>  show dbs
Sun Nov 10 17:14:05.505 listDatabases failed:{ "ok" : 0, "errmsg" : "unauthorized" } at src/mongo/shell/mongo.js:46
</pre>

<blockquote>
  <p>Si no recuerdas donde está el archivo de configuración para tu tipo de sistema o cómo reiniciar los servicios, vuelve a <a href="http://codehero.co/mongodb-desde-cero-introduccion-e-instalacion/">nuestra primera entrada de la serie.</a></p>
</blockquote>

<p>Notaremos que hemos recibido un error de <code>unauthorized</code> (no autorizado). Suministremos nuestras credenciales para poder trabajar con normalidad:</p>

<pre>> use admin
switched to db admin
> db.auth('jonathan','c0d3h3r0')
1
> show dbs
admin   0.203125GB
codehero    0.203125GB
local   0.078125GB
test    0.203125GB
</pre>

<p>Como nuestras credenciales residen en la base de datos administrador, notemos que debimos cambiar a ella para autorizarnos.</p>

<p>Si quisiéramos crear un usuario para una base de datos en particular, luego de estar autorizado como el usuario administrador nos cambiamos a la base de datos que queramos y creamos un usuario de la misma manera que antes. Este usuario solo podrá realizar operaciones sobre esta base de datos especificada:</p>

<pre>...
> use codehero
switched to db codehero
> db.addUser('blogAdmin','1234')
{
    "user" : "blogAdmin",
    "readOnly" : false,
    "pwd" : "49e2220035d3d25cf3010bb9ff9f8ad9",
    "_id" : ObjectId("5280083e4c857f20fa16e052")
}
</pre>

<hr />

<h2>Autorización</h2>

<p>Cuando estamos creando los usuarios sobre una base de datos es común que queramos definir ciertas restricciones para cada uno de ellos solo pueda realizar ciertas operaciones sobre la base de datos. A este conjunto de restricciones o privilegios se les conoce como <strong>Roles</strong>, veamos los diferentes tipos de roles que hay:</p>

<ul>
<li><code>read</code> - permite realizar operaciones de lectura sobre las colecciones que componen una BD.</li>
<li><code>readWrite</code> - operaciones de lectura y escritura sobre las colecciones de una BD.</li>
<li><code>dbAdmin</code> - permite realizar diversas tareas administrativas de una BD.</li>
<li><code>userAdmin</code> - ofrece acceso de lectura y escrituro a la colección de usuarios de una BD.</li>
</ul>

<h3>Múltiples bases de datos</h3>

<p>Estos roles permiten realizar las operaciones que se indicaron anteriormente pero para cualquier base de datos, por lo tanto deben ser definidas en la base de datos <code>admin</code>.</p>

<ul>
<li><code>readAnyDatabase</code></li>
<li><code>readWriteAnyDatabase</code></li>
<li><code>userAdminAnyDatabase</code></li>
<li><code>dbAdminAnyDatabase</code></li>
</ul>

<h3>Administrativo</h3>

<ul>
<li><code>clusterAdmin</code> - permite el acceso a diferentes operaciones referentes al sistema como tal, utilizado especialmente en estrategias de replicación y fragmentación.</li>
</ul>

<p>Para definir los roles que un usuario puede tener, cuando estemos agregando el usuario lo haremos mediante un documento como este:</p>

<pre><code>db.addUser({
    user: 'nombre_de_usuario',
    pwd: 'contraseña',
    roles: ['rol1','rol2', ... ]
})
</code></pre>

<hr />

<h2>Exposición</h2>

<p>Otra manera de controlar el acceso a nuestra base de datos es manipulando los niveles a los que esta se encuentra expuesta la instancia, veamos algunas estrategias de como lograrlo.</p>

<h3>Página de estatus</h3>

<p>Si accedes por medio del explorador de internet a la dirección donde se encuentra tu instancia de MongoDB especificando el puerto <code>28017</code> (por defecto), podremos notar una página como esta:</p>

<p><a href="http://i.imgur.com/AMZPFMw.png"><img src="http://i.imgur.com/AMZPFMw.png" alt="Mongo Status Page" /></a></p>

<p>Evidentemente es una página que no queremos quede al descubierto en nuestro ambiente de producción ya que revela muchísima información sensible.</p>

<p>Por esto, en nuestro archivo de configuración colocaremos lo siguiente:</p>

<pre>nohttpinterface = true
</pre>

<p>Si deseas mantenerla disponible solo para aquellas personas en las que confías, es recomendable ajustar tus opciones en el <em>firewall</em> para que información tan sensible no quede a la vista de todos.</p>

<h3>Interface REST</h3>

<p>Si al entrar en la página anterior intentaste acceder a alguno de los vínculos de comandos o estatus, te habrás dado cuenta que ha ocurrido un error de que no tienes REST activado. Esta interface interactiva permite realizar algunas tareas administrativas que pueden ser de utilidad.</p>

<p>Para activarlo, solo debemos colocar en nuestra archivo de configuración:</p>

<pre>rest = true
</pre>

<blockquote>
  <p>Esta interface no implementa ningún tipo de autenticación por lo que se recomienda tener cuidado al ser expuesta.</p>
</blockquote>

<h3>Ligado de IPs</h3>

<p>Otra manera muy efectiva de limitar el acceso es usar el parámetro <code>bind_ip</code>, esto definirá qué direcciones IP pueden tener acceso a la instancia.</p>

<p>Para activarlo basta con especificarlo en nuestro archivo de configuración:</p>

<pre>bind_ip = 127.0.0.1  # suponiendo que solo quieremos que acceda algo en el mismo equipo

# o si queremos especificar varios, lo podemos hacer separándolos por coma:

bind_ip = 127.0.0.1, 192.168.0.105, 192.168.0.111
</pre>

<blockquote>
  <p>Esto no es una garantía absoluta ya que un especialista en seguridad podría hacerse pasar por una IP en la que tu instancia confía mediante lo que se conoce como IP Spoofing.</p>
</blockquote>

<h3>El puerto</h3>

<p>Quizás uno de los detalles más pasados por alto. Usar el puerto principal por defecto (27017) puede llevar a que cualquiera que sepa que estás utilizando MongoDB sabrá el puerto que debe atacar para hacerse con la base de datos. Es recomendable cambiar este puerto en un ambiente de producción, basta tan solo especificarlo en nuestro archivo de configuración:</p>

<pre>port = 22622
</pre>

<blockquote>
  <p>En caso de cambiar el puerto de la instancia, la página de estatus se encontrará en el puerto especificado + 1000, en este caso se encontraría en el 23622.</p>
</blockquote>

<h3>Firewall</h3>

<p>Siendo el método más confiado, establecer políticas de <em>firewall</em> permite que únicamente aquellos que le sea permitido el acceso al servidor puedan acceder a la instancia de base de datos.</p>

<p>En caso de instalar en un VPS, es probable que tengas alguna interfaz gráfica en el área de administración que te permita manipular las opciones del <em>firewall</em>.</p>

<p>De lo contrario siempre puedes utilizar soluciones personalizadas de <em>firewall</em> como <strong>iptables</strong> en sistemas Linux, <strong>ipfw</strong> en sistemas Mac OS X / FreeBSD y <strong>netsh</strong> en sistemas Windows.</p>

<hr />

<h2>Conclusión</h2>

<p>Proteger los datos que residen en las bases de datos las cuales alimentan las aplicaciones que ofrecemos es un derecho y nuestro deber como desarrolladores ya que a nadie le gustaría que la información que le confiaste a una aplicación en particular ande rondando por ahí a la vista de todos. Ahora que sabes como hacerlo, estás un paso más cerca de ser un <a href="http://codehero.co"><strong>héroe</strong></a> en MongoDB.</p>
