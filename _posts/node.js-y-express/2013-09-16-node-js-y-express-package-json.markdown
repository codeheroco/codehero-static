---
layout: post
status: publish
published: true
title: Package.json
author: Oscar González
author_login: oscar
author_email: gonzalezgreco@gmail.com
author_url: http://www.oscarvgg.com
wordpress_id: 2237
wordpress_url: http://codehero.co/?p=2237
date: 2013-09-16 00:00:17.000000000 -04:30
serie: Node.js y Express
dificultad: Novato
duracion: 10
description: En este capítulo te mostraré la funcion del archivo package.json en una aplicación Node.js
categories:
- Node.js
tags:
- desde cero
- configuracion
- node
- express
- package
- json
- config
---
<p>Como mencioné anteriormente en el capitulo <em><a href="http://codehero.co/nodejs-y-express-definiendo-rutas/">Definiendo Rutas</a></em>, Package.json es un archivo dentro de nuestras aplicaciones de Node cuyo fin es documentar un paquete de Node. En nuestro caso el paquete sería la aplicación que estamos desarrollando.</p>

<p>Vamos a abrir el proyecto que veníamos desarrollando en los capítulos anteriores y abrimos el archivo package.json. Actualmente debería lucir así:</p>

```javascript
{
  "name": "Ejemplo",
  "version": "0.0.1",
  "dependencies": {
    "express": "3.3.5"
  }
}
```


<p>Como habíamos dicho esta configuración dice que nuestro proyecto se llama “Ejemplo”, está en la versión 0.0.1 y su única dependencia es Express.</p>

<hr />

<h2>Atributo "private"</h2>

<p>A este json podemos agregarle el atributo <code>"private": true</code>, que significa que nuestro paquete es privado, no va distribuirse en NPM, por ejemplo.</p>

<hr />

<h2>Atributo "author"</h2>

<p>En este miembro se define el autor de la aplicación:</p>

```javascript
"author": "oscar gonzález"
```


<hr />

<h2>Atributo "scripts"</h2>

<p>Ahora podemos continuar agregando <code>"scripts": {}</code>, este es bastante similar a rake en ruby, en "scripts" podemos agregar cualquier código que deba ser ejecutado vía npm. El script más común a ejecutar es "start", este corre cuando se inicia la aplicación.</p>

```javascript
"scripts": {
    "start": "node app.js"
}
```


<p>Con este script podemos correr nuestro servidor ejecutando <code>npm start</code> a través de la linea de comandos, estando situados en el directorio del proyecto.</p>

<p>Incluso puedes definir tus propios scripts con nombres custom, como por ejemplo:</p>

```javascript
"build": "./scripts/build.js"
```


<p>Entonces cuando corramos <code>npm build</code>, se ejecutará el contenido del archivo build.js.</p>

<p>Existen más scripts standard que puedes utilizar en este miembro del archivo Package.json, éstos pueden ser encontrados en la <a href="https://npmjs.org/doc/scripts.html">página de npm</a>.</p>

<hr />

<h2>Atributo "dependencies"</h2>

<p>Actualmente esta implementación de package.json solo tiene una dependencia, express, versión 3.3.5. Como es evidente las claves de este este atributo representan el nombre de la dependencia, y su valor es la versión.</p>

<p>Aquí pudiéramos agregar más dependencias. Supongamos que queremos agregar jade, simplemente se debe agregar debajo:</p>

```javascript
"dependencies": {
    "express": "3.3.5",
    "jade": "*"
}
```


<p>Nótese que como versión he utilizado un asterisco ("*"), esto significa que no me importa versión que esté instalada, puedo utilizar cualquiera.</p>

<p>También pudiera colocar "x" si no me importa alguna versión menor:</p>

```javascript
"dependencies": {
    "express": "3.3.x"
}
```


<p>También pudiera usar operadores como ">", "<", ">=", "<=":</p>

```javascript
"dependencies": {
    "express": ">=3.3.5"
}
```


<p>En el <a href="http://blog.nodejitsu.com/package-dependencies-done-right">blog de nodejitsu</a> hay un artículo sobre las mejores prácticas al momento de definir dependencias.</p>

<hr />

<h2>Atributo "devDependencies"</h2>

<p>Pueden ocurrir casos en los que queramos instalar dependencias que solo necesitamos en la etapa de desarrollo, para esto esta el atributo <code>"devDependencies": {}</code>.</p>

<p>Seguramente has notado que cuando desarrollamos en Node, cada vez que hacemos algún cambio en el proyecto tenemos que detener y volver a iniciar el servidor. "Nodemon" observa los archivos de nuestro proyecto y reinicia el servidor cada vez que detecta cambios en alguno de ellos. Esta seria una dependencia muy útil mientras estamos desarrollado y que no es necesaria en producción:</p>

```javascript
"devDependencies": {
    "nodemon": "*"
}
```


<p>Entonces si ahora corremos <code>npm install</code> en el directorio del proyecto se instalará localmente (solo para el uso del proyecto), si hiciéramos <code>sudo npm install -g nodemon</code> se instalaría globalmente.</p>

<p>En el caso de instalar nodemon globalmente podríamos hacer <code>nodemon app.js</code>, en el directorio del proyecto y ya.</p>

<p>Si lo instaláramos solo localmente como lo es el caso de declararlo en "devDependencies", pudiéramos ir al atributo scripts y cambiar el valor del script "start":</p>

```javascript
"scripts": {
    "start": "nodemon app.js"
}
```


<p>Ahora cuando corramos <code>npm start</code> en el directorio del proyecto iniciaríamos nodemon de una vez.</p>

<h3>Ignorando Archivos con Nodemon</h3>

<p>Supongamos que no queremos que nodemon reinicie el servidor cuando se hagan cambios en los archivos estáticos del proyecto, como por ejemplo, los que están en el directorio "/public". En este caso debemos crear un archivo llamado ".nodemonignore" que cumple una función similar a ".gitignore" en git.</p>

<p>// .nodemonignore</p>

```javascript
./public/*
```


<p>Ahora cuando corramos nodemon no se reiniciará el servidor cuando modifiquemos algún archivo dentro del directorio "/public".</p>

<hr />

<h2>Atributo "engines"</h2>

<p>Se puede controlar incluso en que versión de Node o NPM debe correrse el proyecto:</p>

```javascript
"engines": {
    "node": ">=0.10.3 <0.12",
    "npm": "~1.0.20"
}
```


<hr />

<h2>Conclusión</h2>

<p>En este capítulo te mostré cual es el propósito del archivo package.json en una aplicación Node.js, ahora podrás sacar provecho de esta herramienta. Para mayor información de este tema puedes revisar la <a href="https://npmjs.org/doc/json.html">documentación de npm sobre package.json</a>.</p>

<p>Si te surge alguna duda no olvides que puedes dejarlas en los comentarios, más abajo en esta misma página, con gusto las responderé.</p>

<p>Saludos y hasta la próxima.</p>
