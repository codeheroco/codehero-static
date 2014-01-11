---
layout: post
status: publish
published: true
title: Clases y Objetos
author: Carlos Picca
author_login: carlos
author_email: carlospicca@gmail.com
wordpress_id: 2113
wordpress_url: http://codehero.co/?p=2113
date: 2013-08-28 01:35:26.000000000 -04:30
categories:
- Cursos
- Ember.js
tags:
- Objetos
- clases
- metodos
- ember
- ember.js
- instancias
---
<p>Bienvenidos Ember.js desde Cero, curso en el cual aprendemos a programar sin conocimiento alguno. En el capítulo anterior, te enseñe una introducción a Ember.js, sus beneficios y creamos nuestra primera app con el framework. Si eres nuevo en este curso, te recomiendo que le eches un vistazo al capítulo anterior para que te pongas en contexto (<a href="http://codehero.co/ember-js-desde-cero-introduccion-e-instalacion/">Capítulo 1 - Introducción e Instalación</a>)</p>

<p>Hoy, vamos a aprender todo lo relacionado con las clases y los objetos dentro de Ember.js.</p>

<hr />

<h2>Clases</h2>

<p>Hasta que el <a href="http://www.ecmascript.org/">ECMAScript 6</a> no salga al mercado, el equipo de <a href="http://emberjs.com/">Ember.js</a> ha decidido implementar su propia versión para el manejo de objetos dentro del framework. El manejo de objeto de Ember.js no se parece en nada a como estamos acostumbrados con <strong>JavaScript</strong>, es mas, trata de imitar tanto como puede a el modelo orientado objeto que conocemos en la actualidad.</p>

<p>La manera mas fácil de aprender el uso de objetos y clases en Ember.js es a través de un ejemplo, es por eso que vamos a trabajar sobre el ejemplo que usamos en el capitulo anterior <a href="http://codehero.co/ember-js-desde-cero-introduccion-e-instalacion/">Capítulo 1 - Introducción e Instalación</a>.</p>

<hr />

<h2>¿Cómo creamos una clase?</h2>

<p>Imaginemos por un instante que quisiéramos crear una app que maneje marcapáginas, en ese caso tendríamos un <em>clase Marcapagina</em>.</p>

<blockquote>
  <p>Por el contrario en <strong>JavaScript</strong> no habríamos podido hacer esto ya que no tendríamos acceso a clases, solo prototipos y a objetos que instancian dicho prototipo.</p>
</blockquote>

<p>La manera de lograr un clase en Ember.js es extendiendo de <strong>EmberObject</strong>. Veamos como:</p>

<p>En el archivo <code>index.html</code> agregaríamos el siguiente código justo abajo de <code>window.App = Ember.Application.create()</code>:</p>

<pre>var Marcapagina = Ember.Object.extend();
</pre>

<blockquote>
  <p>Observemos lo siguiente:</p>
  
  <ul>
  <li><p><em>Marcapagina</em> esta capitalizada para denotar que es una clase.</p></li>
  <li><p>Si queremos que la variable <em>Marcapagina</em> sea una clase en Ember.js debemos igualarla a <code>Ember.Object.extend()</code>.</p></li>
  </ul>
</blockquote>

<p>El archivo <code>index.html</code> debería lucir así:</p>

<p><img src="http://i.imgur.com/8LrDEBb.png" alt="ember-js-html" /></p>

<p>Si probamos la clase en el consola del explorador deberíamos encontrar lo siguiente:</p>

<p>Solo tipea el nombre de la clase, en este caso <em>Marcapagina</em>.</p>

<p><img src="http://i.imgur.com/5ei8dJ3.png" alt="clase-ember-js" /></p>

<blockquote>
  <p>No te preocupes!, esta bien que nos responda <code>(unknow mixin)</code>.</p>
</blockquote>

<hr />

<h2>¿Cómo instanciamos una clase?</h2>

<p>Ahora que <em>Marcapagina</em> ya es una clase definida veamos como instanciar un objeto. Para instanciar un objeto en Ember.js solo debemos igualarla a una variable y invocar el método <code>create()</code> de la misma. En nuestro caso la clase que queremos instanciar es <em>Marcapagina</em>. Veamos como:</p>

<pre>var marcapagina = Marcapagina.create();
</pre>

<p>El archivo <code>index.html</code> debería lucir así:</p>

<p><img src="http://i.imgur.com/hw3h4zm.png" alt="ember-js-html-II" /></p>

<p>Si probamos la instancia en el consola del explorador deberíamos encontrar lo siguiente:</p>

<p>Solo tipea el nombre de la variable, en este caso <code>marcapagina</code>.</p>

<p><img src="http://i.imgur.com/ZAHzCUJ.png" alt="instancia-ember-js" /></p>

<blockquote>
  <p>Observemos que el explorador nos denota que esa variable es una instancia de una clase.</p>
</blockquote>

<hr />

<h2>¿Cómo creamos atributos en la clase?</h2>

<p>Existen dos manera para agregarle atributos a una clase en Ember.js.</p>

<p>La primera es definir los atributos dentro de la declaración de la misma clase, de esta manera todos los atributos serian iguales para todas las instancias. Veamos como:</p>

<pre>var Marcapagina = Ember.Object.extend({

    nombre: "Codehero",
    url: “http://codehero.co”
});
</pre>

<p>El archivo <code>index.html</code> debería lucir así:</p>

<p><img src="http://i.imgur.com/IVrJWs8.png" alt="ember-js-html-III" /></p>

<p>Probemos en la consola del explorador. Deberíamos obtener lo siguiente:</p>

<p>Solo tipea el nombre de la variable, en este caso <code>marcapagina</code>.</p>

<p><img src="http://i.imgur.com/GIkc60f.png" alt="atributos-ember-js-I" /></p>

<blockquote>
  <p>Observemos que dentro de la declaración de la clase que tenemos instanciada en la variable <code>marcapagina</code> se encuentran los dos atributos (<strong>nombre</strong> y <strong>url</strong>).</p>
</blockquote>

<p>La otra manera es agregarlos en la misma instancia de la clase, es decir, cuando estemos instanciando la clase podemos agregarle atributos. De esta manera los atributos serían solos de ese instancia. Veamos como:</p>

<pre>var marcapagina = Marcapagina.create({ nombre: "Codehero", url: "http://codehero.co"});
</pre>

<p>El archivo <code>index.html</code> debería lucir así:</p>

<p><img src="http://i.imgur.com/nFnaDjO.png" alt="ember-js-html-iv" /></p>

<p>Si probamos en en la consola del explorador vamos a observar que los atributos existen (<strong>nombre</strong> y <strong>url</strong>):</p>

<p><img src="http://i.imgur.com/5GsXlHp.png" alt="atributos-ember-js-II" /></p>

<hr />

<h2>¿Cómo obtenemos el valor de un atributo?</h2>

<p>Para acceder a los atributos de una instancia en Ember.js usamos el método <code>get()</code>. Veamos como:</p>

<p>Por ejemplo si queremos acceder al atributo <strong>nombre</strong> que creamos anteriormente en la clase, haríamos lo siguiente:</p>

<blockquote>
  <p>La manera mas dinámica y didáctica de entenderlo es a través de la consola del explorador pero ten en cuenta que este código puede ser usado en el script.</p>
</blockquote>

<p>En la consola del explorador tipeamos:</p>

<pre>marcapagina.get("nombre")
</pre>

<p>Nos retornaría el valor que esta alojado en ese atributo, en nuestro caso <code>Codehero</code>.</p>

<p><img src="http://i.imgur.com/1Onh96H.png" alt="get-ember-js" /></p>

<hr />

<h2>¿Cómo establecer el valor de un atributo?</h2>

<p>Para establecer el valor de atributos de una instancia en Ember.js usamos el método <code>set(*nombre_atributo*, *valor*)</code>. Veamos como:</p>

<p>Por ejemplo si queremos establecer el atributo <strong>url</strong> que creamos anteriormente en la clase, haríamos lo siguiente:</p>

<blockquote>
  <p>La manera mas dinámica y didáctica de entenderlo es a través de la consola del explorador pero ten en cuenta que este código puede ser usado también en el script.</p>
</blockquote>

<p>En la consola del explorador tipeamos:</p>

<pre>marcapagina.set("url", "http://www.codehero.co")
</pre>

<p>Si luego accediéramos a ese valor, nos retornaría el nuevo valor que alojamos en ese atributo, en nuestro caso <code>http://www.codehero.co</code>.</p>

<p><img src="http://i.imgur.com/bv7k5YQ.png" alt="set-ember-js" /></p>

<hr />

<h2>¿Cómo crear métodos o funciones?</h2>

<p>Para crear métodos en Ember.js, solo debemos definirlos dentro de la declaración de la clase. Veamos como:</p>

<p>Imaginemos por un momento necesitamos un método que nos imprima el hipervinculo del marcapáginas.</p>

<p>Para solucionar esto, dentro del método <code>extend()</code> agregamos las siguientes lineas:</p>

<pre>var Marcapagina = Ember.Object.extend({

    convertir_en_link: function() {
        
        return "<a href='" + this.get("url") + "'>"
        + this.get("nombre")
        + "</a>";
    }
});
</pre>

<p>El archivo <code>index.html</code> debería lucir así:</p>

<p><img src="http://i.imgur.com/U9HDWLG.png" alt="ember-js-html-V" /></p>

<p>Si lo probáramos en la consola del explorador. Tipeamos <code>marcapagina.convertir_en_link()</code>:</p>

<p>Deberíamos obtener lo siguiente:</p>

<p><img src="http://i.imgur.com/f5QBs1a.png" alt="metodo-ember-js" /></p>

<hr />

<h2>Conclusión</h2>

<p>En esta lección, vimos todo lo relacionado con las clases y los objetos dentro de Ember.js. Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso.</p>

<p>¡Te espero la próxima semana!</p>
