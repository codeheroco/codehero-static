---
layout: post
status: publish
published: true
title: Como crear módulos
author: Oscar González
author_login: oscar
author_email: gonzalezgreco@gmail.com
author_url: http://www.oscarvgg.com
wordpress_id: 2788
wordpress_url: http://codehero.co/?p=2788
date: 2013-12-02 00:10:36.000000000 -04:30
categories:
- Node.js
tags:
- desde cero
- express
- require
- modulo
- exports
---
<p>En este capítulo les voy a hablar sobre como crear sus propios módulos de Node.js. Este tutorial no tiene que ver necesariamente con Express sino con Node directamente. Pero antes de continuar, un poco de teoría.</p>

<p>Si han estado siguiendo esta serie se deben haber dado cuenta que hacemos uso constante de sentencias como: <code>module.exports = holaMundo;</code>, <code>var miModulo = require('./MiModulo');</code>, <code>var express = require('express');</code>. Estas sentencias son invocaciones a módulos.</p>

<p>Un módulo es un archivo con código, o también puede ser un archivo compilado de Node.js. En estos archivos declaramos clases, propiedades, métodos, entre otros. Normalmente estos son privados a otros módulos, es decir, no se puede acceder a ellos desde otros archivos. Entonces te preguntarás: "Pero a lo largo de esta serie hemos estado utilizando módulos que pueden acceder a código de otros módulos", y eso es porque hemos estado utilizando inconscientemente el API CommonJS que viene incluido con Node.</p>

<hr />

<h2>CommonJS</h2>

<p>CommonJS protege la privacidad de los módulos evitando exponerlos a un contexto global y revelando cada uno, solo a los otros módulos que estén conectados con el mismo.</p>

<p>Esto se logra empleando el patrón "Módulo". Éste consiste en dos partes: Requerir el módulo y exportar el módulo. Veámoslo con un ejemplo:</p>

<p>Cuando creamos un proyecto con Express encontramos el en app.js el siguiente código entre otras sentencias:</p>

<pre>var http = require('http'); // 1

http.createServer(app).listen(app.get('port'), function(){ // 2
  console.log('Express server listening on port ' + app.get('port'));
});
</pre>

<ol>
<li>Creamos primero una referencia al módulo http;</li>
<li>Y hacemos uso de él a través de la variable http que creamos.</li>
</ol>

<p>Ahora para exportar un módulo hacemos lo siguiente:</p>

<pre>var miClase = function () { // 1

    this.miAtributo;

    this.unMetodo = function () {
    
        // hacer algo
    
    }
    
    return this;
}

module.exports = miClase; //2
</pre>

<ol>
<li>Definimos la clase;</li>
<li>Y la exportamos.</li>
</ol>

<p>Los módulo no necesariamente tienen que se clases. Ya veremos eso.</p>

<hr />

<h2>Creando módulos propios</h2>

<p>Entonces empecemos a crear nuestro módulo.</p>

<p>Primero necesitamos crear un archivo que contenga al módulo.</p>

<pre>// HealthComponent.js

var health = 10;

var getHit = function (amount) {
    
    health -= amount;
    
}

module.exports.health = health; // 1
module.exports.getHit = getHit;

</pre>

<ol>
<li>Para exponer los módulos usé el mismo nombre de la variable o método por convención. Podia haber usado cualquier nombre.</li>
</ol>

<p>Como podemos observar no fue necesario usar una clase, pero tal vez habría sido más útil ya que solo habría tenido que exportar la clase y no cada propiedad y método por separado.</p>

<p>Ahora vamos a otro archivo a importar nuestro módulo y utilizarlo.</p>

<pre>// app.js

var myHealthComponent = require('./HealthComponent.js');

console.log('Vida actual: ', myHealthComponent.health);
console.log('Fuiste atacado, tus vidas disminuyeron a: ' + myHealthComponent.getHit(1));
</pre>

<p>Esto debería imprimir por consola:</p>

<pre>$ Vida actual: 10
$Fuiste atacado, tus vidas disminuyeron a: 9
</pre>

<hr />

<h2>Otras maneras de requerir módulos</h2>

<p>Si convirtiéramos "HealthComponent.js" en una clase se exportaría de la siguiente manera:</p>

<pre>// HealthComponent.js

var HealthComponent = function (initialHealth) {

    this.health = initialHealth;
    
    this.getHit = function (amount) {
        
        this.health -= amount;
        
    }
    
    return this;
}

module.exports = HealthComponent;
</pre>

<p>Ahora podría requerirla de dos maneras distintas:</p>

<pre>var HealthComponent = require('./HealthComponent.js');

var myHealthComponent = new HealthComponent(10);
</pre>

<p>En esta varsión importo la clase primero y luego la instáncio con un valor de vida inicial de 10.</p>

<pre>var myHealthComponent = require('./HealthComponent.js')(10);
</pre>

<p>Y en esta la importo y creo la instancia en una sola línea.</p>

<h3>Direcciones de componentes</h3>

<p>Hasta ahora hemos requerido módulos que son del API de Node (como "http") o módulo que están en direcciones relativas ("./HealthComponent.js" o "../HealthComponent.js")</p>

<p>También podemos requerir módulos por su dirección absoluta:</p>

<pre>var modulo = require('home/components/HealthComponent.js');
</pre>

<p>Si quisiéramos requerirlo solo por el nombre <code>var health = require("HealthComponent");</code> tendríamos que colocarlo en la carpeta de módulos de node (node_modules).</p>

<p>Por ejemplo si nuestro módulo que están en "/home/components/HealthComponent.js", requiriera un módulo llamado "Personaje" y lo importara de la siguiente manera <code>var health = require("Personaje");</code>, este tendría que esta en "node_modules"</p>

<p>Node busca al módulo en los siguientes directorios en este orden:</p>

<ol>
<li>/home/components/node_modules/Personaje.js</li>
<li>/home/node_modules/Personaje.js</li>
<li>/node_modules/Personaje.js</li>
</ol>

<p>De no encontrarlo en el primero, pasa al segundo y así sucesivamente hasta llegar a "node_modules". Si no lo encuentra en el último, entices retornará un error "Cannot find module".</p>

<h3>Usando carpetas como módulos</h3>

<p>Supongamos que queremos separar los controladores en varias carpetas en nuestro proyecto, algo así:</p>

<pre>Project
--Controllers
----home
------index.js
------other.js
----login
----users
</pre>

<p>En la carpeta home podríamos tener un archivo index.js. Esto le dice a Node que este archivo debe correrse primero. También podría tener la extensión .node (index.node). Y este luego requerir a otro módulo dentro de la misma carpeta.</p>

<pre>// index.js

var o = require("./other.js");
</pre>

<p>Incluso podríamos reemplazar index.js con un archivo package.json que cumple la misma función, éste contendría el siguiente código:</p>

<pre>{
  "name": "Home",
  "main": "other.js"
}
</pre>

<hr />

<h2>Conclusión</h2>

<p>Con esto damos por terminado el tutorial del día de hoy. Espero que ahora tengas un mejor entendimiento de como funcionan los módulos en Node.js y te atrevas a crear los tuyos.</p>

<p>Cualquier duda o comentario, como siempre déjalo en la sección correspondiente más abajo. Con gusto atenderé tus inquietudes.</p>

<p>Hasta la próxima.</p>
