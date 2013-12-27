---
layout: post
status: publish
published: true
title: BREACH, la nueva vulnerabilidad SSL
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
wordpress_id: 1904
wordpress_url: http://codehero.co/?p=1904
date: 2013-08-08 00:00:36.000000000 -04:30
thumbnail: http://i.imgur.com/xQXfZEn.png
categories:
- Artículos
- Notícias
tags:
- black hat
- ssl
- breach
- https
---
<p>Muchísimo talento y abundante información interesante se ha dado a conocer por los expertos en seguridad informática en la conferencia de Black Hat de Las Vegas la semana pasada, un tema en particular que llamó nuestra atención fue la vulnerabilidad BREACH presentada por Angelo Prado y Yoel Gluck, ambos Jefes de Seguridad en Salesforce.com, junto a Neal Harris, experto en criptografía actualmente desenvolviéndose como ingeniero de seguridad de aplicaciones en Square Inc.</p>

<p>Estos caballeros demostraron que podían extraer información de respuestas a solicitudes HTTP estando bajo protocolo SSL, siempre y cuando la aplicación que emite las respuestas cumpliera las siguientes condiciones:</p>

<ul>
<li>El servidor use compresión a nivel HTTP.</li>
<li>En el cuerpo de las respuestas HTTP se refleje información introducida por el solicitante.</li>
<li>En el cuerpo de las respuestas HTTP se reflejen claves secretas como <em>tokens</em> CSRF.</li>
</ul>

<p></br>
Así que si posees una aplicación web que cumpla con estas características es recomendable que tomes acciones correctivas rápidamente antes que sea demasiado tarde.</p>

<p>Cuando creíamos que poseer un certificado SSL y establecer un canal HTTPS de comunicación era el método más seguro para establecer un canal entre los usuarios y nuestra aplicación web, estos expertos han demostrado que todo aquello que sea desarrollados para proteger y esconder es posible descifrarlo, revelarlo y tomar provecho de ello.</p>

<p>Para el video, presentación, escrito y mayor información sobre el tema pueden dirigirse a la <a href="http://breachattack.com/">página oficial de BREACH</a>, inclusive el código de una aplicación que determine si tu aplicación web es vulnerable estará disponible en poco tiempo en su portal.</p>
