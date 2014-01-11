---
layout: post
status: publish
published: true
title: Cookies & Sessions
author: Ramses Velasquez
author_login: ramses
author_email: cotufa9@gmail.com
wordpress_id: 2358
wordpress_url: http://codehero.co/?p=2358
date: 2013-10-08 00:59:27.000000000 -04:30
categories:
- Cursos
- PHP
tags:
- php
- cookie
- session
---
<p>En este capítulo de PHP vamos a conocer dos componentes muy importantes de la programación web, las <strong>Cookies</strong> y las <strong>Sessions</strong>. Los servidores web normalmente no guardan los estados, esto quiere decir que no saben quien visitó una página o cuales ha visitado un usuario especifico, ni que ha hecho en ellas. Aquí es donde entran las <strong>Cookies</strong> y las <strong>Sessions</strong>, estas nos proveen mecanismos para seguir lo que hace un usuario en nuestra web y así poder brindarle un mejor servicio. Cada una tiene su propósito, funciones y características específicas, las cuales veremos en este capítulo. Con este información podras escoger cual de las dos necesitas implementar dependiendo de tus necesidades.</p>

<p>Las dos nos permiten almacenar datos que son accesibles desde diferentes páginas de un sitio web, pero cada una lo hace con un enfoque diferente.</p>

<p>Las <strong>Cookies</strong> se almacenan en el disco duro del usuario que visita el sitio web, estas solo pueden ser accedidas por los dominios que el creador declare. Pueden permanecer un gran tiempo almacenadas, incluso hasta después que dejas el sitio. Estas tienen un tamaño limitado de espacio, por lo cual solo sirven para datos específicos.</p>

<p>Las <strong>Sessions</strong> se almacenan en el servidor, esto quiere decir que no son visibles por otros sitios web. Tampoco tienen un máximo de tamaño y se puede almacenar data sensible de manera segura, ya que no se transmiten al usuario como lo hacen las <strong>Cookies</strong>.</p>

<hr />

<h2>Cookies</h2>

<p>Las <strong>Cookies</strong> proveen un mecanismo que permite guardar pequeñas cantidad de información. Esto permite mantener configuración que el usuario usa en el sitio web como colores de fondo, opciones de ordenamiento o nombres que ya han ingresado y no desean volver a ingresar cada vez que accedan.</p>

<p>Antes de implementar las <strong>Cookies</strong> hay que tener en cuenta que el usuario las puede deshabilitar, por lo tanto no es recomendable hacer un sitio web que dependa de esto para funcionar.</p>

<h3>Estructura</h3>

<p>Los datos en una <strong>Cookie</strong> se almacenan con la estructura de nombre/valor. Por ejemplo, si queremos almacenar el nombre de un usuario usaríamos <strong>usuario=Pedro</strong>. Una <strong>Cookie</strong> también contiene información adicional como la fecha de expiración y el dominio.</p>

<pre>usuario=Pedro; expires=FechaConFormato; domain=dominio.com
</pre>

<h4>Nombre/Valor</h4>

<p>La primera parte de una Cookie define el nombre y el valor que esta almacena. Por ejemplo, si queremos guardar el tipo de moneda que el usuario desea ver <strong>moneda=USD</strong>. Este es el único parámetro obligatorio, todos los demás son opcionales y se colocan dependiendo de las necesidades.</p>

<h4>Fecha de Expiración</h4>

<p>Este parámetro opcional (expires=) especifica la fecha hasta la cual se debe guardar la Cookie. Normalmente se utiliza la función <strong>time()</strong> para establecer el valor de esta fecha.</p>

<h4>Ruta</h4>

<p>El parámetro (path=) permite establecer los directorios del sitio web en donde se puede utilizar la Cookie. Si se coloca '/', entonces se podrá hacer uso de la Cookie desde todo el sitio web. Por defecto solo esta disponible la carpeta desde la cual se esta declarando y sus subcarpetas.</p>

<h4>Dominio</h4>

<p>En este parámetro(domain=) se especifica el dominio o subdominio que donde esta disponible la Cookie.</p>

<h4>Seguridad</h4>

<p>Este parámetro (secure=) determina si la Cookie solo se puede enviar a través de una conexión segura con HTTPS.</p>

<h3>Crear una Cookie</h3>

<p>Las Cookies se crean utilizando la función <strong>setcookie()</strong>. Los argumentos que esta función acepta son para establecer los parámetros que explicamos anteriormente, empezando por el nombre de la Cookie y su valor. Veamos un ejemplo de como se crea una Cookie:</p>

<pre>setcookie('nombreUsuario', 'Pedro', time() + 4800);

</pre>

<p>Esta función crea una Cookie en la computadora de quien abra la página(asumiendo que tiene las Cookie habilitadas), la cual se llama <strong>nombreUsuario</strong>, contiene el valor <strong>Pedro</strong> y expira (se mantiene activa) 4800 segundos después de su creación.</p>

<h3>Leer una Cookie</h3>

<p>Como los explicamos anteriormente, las Cookies se almacenan en el disco duro del usuario y cuando se hace una petición a la pagina donde se creo estas son enviadas al servidor. PHP guarda las Cokies en un arreglo global asociativo con el nombre de <strong>$_COOKIE</strong>, veamos un ejemplo de como acceder a la Cookie nombreUsuario:</p>

<pre>if (isset($_COOKIE['nombreUsuario'])){
    echo 'Valor de la Cookie '. $_COOKIE['nombreUsuario'];
}else{
    echo 'No hay Cookies';
}
</pre>

<h3>Borrar una Cookie</h3>

<p>Para borrar una Cookie utilizamos la misma función que para crearla, pero con el parámetro de valor vacío y con el tiempo negativo.</p>

<pre>setCookie('nombreUsuario', '', time() - 1000);
</pre>

<hr />

<h2>Sessions</h2>

<p>Las <strong>Sessions</strong> en PHP permiten que las páginas web puedan ser tratadas como un grupo, ya que podemos compartir variables en diferentes páginas. Una de las debilidades de las Cookies es que se guardan en la computadora del usuario y por lo tanto pueden ser modificadas, en cambio en las Sessions en PHP solo se guarda un Cookie ID para saber cual es el archivo Session del usuario en el servidor. De esta manera el usuario no tiene acceso a las Sessions, lo que la hace mas segura.</p>

<h3>Crear una Session</h3>

<p>Para crear una Session se debe utilizar la función <strong>session_start()</strong>, la cual obtiene la información que tenga almacenada del usuario y rellena el arreglo asociativo llamado <strong>$_SESSION</strong>. En comparación con las Cookies, las Sessions son mas sencillas de usar, ya que una vez que la iniciaste solo debes llenar o leer el arreglo <strong>$_SESSION</strong>.</p>

<pre>session_start();

$_SESSION['nombre'] = 'Pedro';
$_SESSION['apellido'] = 'Garcia';

</pre>

<p>Hemos iniciado una Session y declaro un nombre y un apellido en ella. Ahora esta información estará disponible en todas las paginas que el usuario visite y se inicie la Session.</p>

<h3>Leer una Session</h3>

<p>Para leer algún dato almacenado en Sessions se debe inicializar con <strong>session_start()</strong> y luego se accede al dato que se necesite.</p>

<pre>session_start();

if (isset($_SESSION['nombre'])){
    echo $_SESSION['nombre']; 
}else{
    echo 'No existe nombre en $_SESSION';
}

</pre>

<p>Como podemos observar, el uso de las Sessions es muy sencillo en comparación a las Cookies.</p>

<hr />

<h2>Conclusión</h2>

<p>En este capítulo hemos aprendido las principales características y diferencias entres las <strong>Cookies</strong> y las <strong>Sessions</strong>, como podemos ver cada una tiene sus propósitos. Escoger una u otra (o ambas) dependerá de las necesidades que se tengan a la hora de crear un sitio web, pero gracias a estas el sitio podrá ser mas dinámico. Cualquier duda o comentario estaré atento a la sección de comentarios.</p>
