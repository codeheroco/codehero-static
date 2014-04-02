---
layout: post
status: publish
published: true
title: Fragmentación - Parte I
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
date: 2014-01-13 23:30:14.000000000 -04:30
serie: MongoDB desde Cero
description: Replicar y repartir información entre diferentes instancias son los temas de las últimas semana, por ello hablaremos de la fragmentación de datos en MongoDB
dificultad: Avanzado
duracion: 20
categories:
- Cursos
- MongoDB
tags:
- mongo
- mongodb
- router
- shard
- sharding
- fragmento
- fragmentacion
- mongos
- llave
- cardinalidad
- aleatoriedad
- divisibilidad
---
En las entradas pasadas hemos iniciado a hablar de temas de *clusterización*, es decir, poseer varias instancias para escalar nuestra solución de base de datos. Sin embargo podemos llevar nuestro concepto de *cluster* más alla de lo que hemos visto con los [**replica sets**](http://codehero.co/mongodb-desde-cero-replicacion-parte-i/) al repartir información entre diferentes instancias, por ello esta semana hablaremos de la fragmentación de datos en MongoDB.
***
##Propósito
Si estas desarrollando un servicio que se va haciendo popular o los niveles de acceso a base de datos son cada vez más altos, empezarás a notar que tu base de datos está siendo martillada por el exceso de tráfico y tu servidor esté sufriendo por los altos niveles de procesamiento continuo y te podrías ver en la necesidad de actualizar tu infraestructura para soportar la demanda.

Entra en juego la fragmentación de datos, esta permite separar las colecciones por conjuntos de documentos en diferentes instancias o **fragmentos**. Esta estrategia te permite escalar tu base de datos horizontalmente al agregar más equipos para repartir la información en lugar de obligar a mejorar el que tienes.

> La mayoría de las veces resulta más costoso tener un único computador de altas capacidades que varios de gama inferior.

Por lo tanto si tenemos una colección muy grande, digamos de 1TB por ejemplo, resultaría prudente particionarla en diferentes **fragmentos**, digamos 5, para que la información de dicha colección pueda ser distribuida en 200GB entre cada uno de ellos, esto a su vez distribuye la carga a nivel de procesamiento.

En MongoDB la unidad de base de datos que se fragmenta son las colecciones. Por lo tanto una colección que sea declarada como fragmentada podría poseer distintos documentos en los fragmentos del *cluster*.

> Un único documento nunca estará repartido entre fragmentos. Un documento puede tener un tamaño máximo de 16MB, en caso de necesitar mayor tamaño para un documento se necesitaría implementar la solución de GridFS el cual separa el documento en varios trozos o *chunks*.

***

{% include middle-post-ad.html %}

##Arquitectura
Un *cluster* de fragmentación suele poseer una arquitectura como esta:

![Arquitectura de fragmentación](http://i.imgur.com/R6T7wKW.png)

Como puedes notar existen 4 componentes claves de la arquitectura. Hablemos un poco sobre cada uno de ellos:

###Aplicación y Driver
Las aplicaciones cuando necesitan comunicarse con la base de datos de MongoDB lo hacen a traves de un *driver*, estos tienen implementados los métodos y protocolos necesarios para comunicarse correctamente con la base de datos encapsulando la complejidad del proceso al desarrollador.

###Fragmento
Un fragmento o *shard* es aquel que posee los datos fragmentados de las colecciones que componen la base de datos como tal, este suele estar compuesto por un ***replica set*** preferiblemente; sin embargo en ambientes de desarrollo podría ser una única instancia por fragmento.


###Router
Debido a que las aplicaciones ven la base de datos como un todo, el **router** es el encargado de recibir las peticiones y dirigir las operaciones necesarias al fragmento o fragmentos correspondiente(s).

> En ambientes de producción es común tener varios *routers* para balancear la carga de peticiones de los clientes.

###Servidores de configuración
Este tipo de instancias se encargan de almacenar la **metadata** del cluster de fragmentación, es decir, **qué rangos definen un trozo de una colección y qué trozos se encuentran en qué fragmento.** Esta información es almacenada en caché por el router para lograr un óptimo tiempo de procesamiento.

> En ambientes de producción se **deben** tener 3 servidores de configuración ya que si solo se posee uno y este falla, el cluster puede quedar inaccesible.

***
##Escoger llave de fragmentación

MongoDB separa una colección en los trozos correspondientes para repartir a los diferentes fragmentos por medio de una llave de fragmentación. Esta llave viene siendo uno de los campos perteneciente a los documentos el cual debe poseer las siguientes características:

###Cardinalidad y Divisibilidad

Una llave de fragmentación debe tener una alta cardinalidad para asegurar que los documentos puedan ser efectivamente divididos en los distintos fragmentos, es decir, suponiendo que escogemos una llave de fragmentación que posee solo 3 valores posibles y tenemos 10 fragmentos, no podríamos separar los documentos en los 10 fragmentos al solo tener 3 valores posibles para separar. Mientras más valores posibles pueda tener la llave de fragmentación será más fácil y eficiente la separación de los trozos en los fragmentos.

> Incluso si solo tienes 3 fragmentos puedes correr el riesgo al no cumplir la característica que veremos a continuación.

###Aleatoriedad
Adicionalmente es muy importante que la llave de fragmentación posea un alto nivel de aleatoriedad, esto se debe a que si utilizamos una llave que siga un patrón incremental como una fecha o un ID, traerá como consecuencia que cuando estemos insertando documentos, el mismo fragmento estará siendo utilizando constantemente durante el rango de valores definido para él, esto sin duda mantendrá los datos separados óptimamente pero pondrá siempre bajo estrés a un fragmento en lapsos de tiempo mientras que los otros posiblemente queden con muy poca actividad (a este comportamiento se le conoce como ***hotspotting***).

> Para casos donde los campos de tus documentos se ven limitados para cumplir con estas condiciones, es posible tener una **llave de fragmentación compuesta**. Incluso es posible escoger un campo que siga patrones incrementales y utilizarlo como **llave de fragmentación *hasheada***, lo cual creará un *hash* del valor del campo y esto logrará que tenga un alto nivel de aleatoriedad.

Adicionalmente debemos recalcar que una llave de fragmentación siempre deberá poseer un índice, de lo contrario el rendimiento del sistema no sería muy bueno y se estaría sacrificando a costas de poder escalar nuestro sistema. Normalmente si dicho campo no posee un índice, la tratar de agregar el fragmento al *cluster* MongoDB te obligará a crearlo o éste lo creará por ti.

***
##Conclusión
Al igual que cuando hablamos de replicación, esto es un tema con mucha teoría y aspectos a considerar por lo que dejaremos la parte práctica para la semana siguiente. Como estarás notando esta estrategia de *clusterización* tiene mucho que ofrecer y verás no es tan difícil de implementar aunque se deben tomar en consideración muchos aspectos y la arquitectura es un poco más compleja de lo que estamos acostumbrados, hasta la semana que viene.
