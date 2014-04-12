---
layout: post
status: publish
published: true
title: ActiveRecord Asociaciones
author: Ricardo Sampayo
author_login: ricardo
author_email: ricardo9588@gmail.com
author_url: http://www.ricardosampayo.com
date: 2013-08-23 00:01:03.000000000 -04:30
serie: Ruby on Rails desde Cero
dificultad: Aprendiz
duracion: 30
description: Ruby on Rails desde Cero, serie en la cual aprenderemos del framework, aprendiendo en este capítulo de las asociaciones con ActiveRecord.
categories:
- Cursos
- Ruby on Rails
tags:
- Ruby on Rails
- ActiveRecord
- Asociaciones
- has_many
- belongs_to
- has_one
---
<p>Las series de cursos Ruby on Rails en CodeHero buscan otorgarte los conocimientos necesarios, para que puedas desarrollar tus propias aplicaciones Web. En el capítulo anterior estudiamos conceptos básicos de ActiveRecord, pero aún nos quedan conceptos de este tema.</p>

<p>En este nuevo capítulo estudiaremos las asociaciones con ActiveRecord, tema que se debe conocer bien para luego proseguir con la parte dos de ActiveRecord.</p>

<hr />

<h2>Asociaciones</h2>

<p>¿Por qué necesitamos las asociaciones entre los modelos? Porque hacen operaciones comunes más simple y más fácil en el código. Por ejemplo, si tenemos una aplicación Rails sencilla que incluye un modelo para los usuarios y un modelo para las direcciones y cada usuario puede tener varias direcciones, entonces, tendríamos que hacer consultas y validaciones por separado para cada uno de los objetos, esto aunque no esta mal, es ineficiente. Veamos cómo es la sintaxis utilizando las asociaciones de Rails para el ejemplo y así posteriormente mostrar los tipos de asociaciones de tablas que podemos hacer para simplificarnos la vida:</p>

```ruby
class Usuario < ActiveRecord::Base
  has_many :direccions, dependent: :destroy
end

class Direccion < ActiveRecord::Base
  belongs_to :Usuario
end
```

<p>Con esta sintaxis le estamos diciendo a Rails que un usuario puede tener muchas direcciones ("has_many") y una dirección sólo puede tener un Usuario ("belongs_to"), a su vez al agregar la dependencia de "destroy" le estaríamos agregando una relación de cascada al eliminar usuarios, es decir, si borramos un usuario eliminaríamos todas sus direcciones de inmediato.</p>

<h3>Tipos de asociaciones</h3>

<p>En Rails, tenemos seis tipos de asociaciones para enlazar modelos ActiveRecord, que son los siguientes:</p>

<h4>belongs_to</h4>

<p>Esta asociación establece una relación de <strong>uno a uno</strong> con otro modelo, de forma que cada instancia del modelo "pertenece" a una instancia del otro modelo. Por ejemplo, si la aplicación tiene Usuarios y Direcciones y cada dirección le pertenece a <strong>un</strong> usuario, esto se definiría así:</p>

```ruby
class Direccion < ActiveRecord::Base
  belongs_to :usuario
end
```

<h4>has_one</h4>

<p>Esta asociación también establece un <strong>uno a uno</strong> con otro modelo, pero con algunas diferencias con respecto a tipo de asociación anterior. Esta asociación indica que cada instancia de un modelo contiene o posee una instancia de otro modelo. Por ejemplo, si cada Usuario tiene <strong>una</strong> Dirección, se declararía de la siguiente manera:</p>

```ruby
class Usuario < ActiveRecord::Base
  has_one :direccion
end
```

<p>Llegado a este punto quizás te preguntarás, si al crear una relación <strong>uno a uno</strong>, qué tipo de asociación debemos elegir para cada uno de los componentes.</p>

<p>La diferencia básicamente es que <strong>has_one</strong> nos dice que le pertenece algún objeto y el <strong>belongs_to</strong> que pertenece a algo, tal y como vimos en el ejemplo anterior un usuario posee una dirección y la dirección le pertenece a un usuario.</p>

<h4>has_many</h4>

<p>Esta asociación indica el enlace de <strong>uno a muchos</strong> con otro modelo. Esta asociación pueden encontrarse por lo general en el opuesto de un "belongs_to" e indica que cada objeto de un modelo puede tener muchos objetos relacionados a él (o ninguno). Por ejemplo Un usuario puede tener múltiples direcciones, eso se declararía de la siguiente manera:</p>

```ruby
class Usuario < ActiveRecord::Base
  has_many :direccions
end
```

{% include middle-post-ad.html %}

<h4>has_many :through</h4>

<p>Esta asociación se utiliza a menudo para establecer conexiones de  <strong>muchos a muchos</strong> con otro modelo. Esta asociación al igual que "has_many" nos indica que cada objeto de un modelo puede tener muchos objetos asociados, la única diferencia es que para lograr un muchos a muchos debemos agregar un tercer modelo que relacione los anteriores. Entendamos mejor esto con un ejemplo: Si a un cliente lo visitan a su dirección muchos vendedores y un Vendedor visita muchos clientes, esta afirmación se declararía de la siguiente manera:</p>

```ruby
class Usuario < ActiveRecord::Base
  has_many :direccions
  has_many :vendedors, through: :direccions
end

class Direccion < ActiveRecord::Base
  belongs_to :vendedor
  belongs_to :usuario
end

class Vendedor < ActiveRecord::Base
  has_many :direccions
  has_many :usuarios, through: :direccions
end
```

<p>Con este ejemplo al invocar un vendedor podemos tener todas las direcciones y los clientes a visitar rápidamente.</p>

<h4>has_one :through</h4>

<p>Esta asociación se utiliza para realizar enlaces <strong>uno a uno</strong> y nos es útil para establecer algunos atajos a través de otra entidad, por ejemplo si un usuario tiene una dirección y a su vez esta dirección tienen un número de teléfono, quizás sea apropiado establecer un atajo para obtener todos los teléfonos de un usuario, esta afirmación se pudiera establecer de la siguiente manera:</p>

```ruby
class Usuario < ActiveRecord::Base
  has_one :direccion
  has_one :telefono, through: :direccion
end

class Direccion < ActiveRecord::Base
  belongs_to :usuario
  has_one :telefono
end

class Telefono < ActiveRecord::Base
  belongs_to :direccion
end
```

<h4>has_and_belongs_to_many</h4>

<p>Por último esta asociación crea una relación de  <strong>muchos a muchos</strong> con otro modelo, sin necesidad de declarar un modelo para la entidad débil que enlaza estas dos entidades en la base de datos. Por ejemplo, si tenemos una aplicación en donde un vendedor puede atender a múltiples clientes y a su vez un cliente puede ser atendido por múltiples vendedores (sin que nos importe la entidad que los relacionaría en la base de datos), entonces podemos diseñar esta estructura de la siguiente forma:</p>

```ruby
class Vendedor < ActiveRecord::Base
  has_and_belongs_to_many :clientes
end

class Cliente < ActiveRecord::Base
  has_and_belongs_to_many :vendedors
end
```

<p>Al igual que con el has_one y belongs_to llegado a este punto podríamos preguntarnos: ¿Qué debemos utilizar para establecer una relación de muchos a muchos: <strong>has_and_belongs_to_many o has_many :through</strong>?</p>

<p>La respuesta la tenemos estudiando la necesidad del problema, si en nuestro planteamiento vemos necesario trabajar con el modelo que relaciona las dos entidades principales utilizamos <strong>has_many :through</strong>, o por el contrario, no tenemos pensado hacer ningún uso de esta entidad relación a nivel de código, nos conviene más utilizar <strong>has_and_belongs_to_many</strong></p>

<h3>Polimorfismo en las asociaciones</h3>

<p>Ésta es una forma de asociación un poco más avanzada que nos permite relacionar un modelo y éste pueda pertenecer a más de un modelo en una sola asociación. El típico ejemplo para atender mejor esto, es el del objeto multimedia, por lo general utilizamos este modelo para asociarlo a otros objetos como usuarios o productos y así estos últimos puedan manejar sus imágenes independientes. Veamos como sería esto en código:</p>

```ruby
class Multimedia < ActiveRecord::Base
  belongs_to :multimediable, polymorphic: true
end

class Usuario < ActiveRecord::Base
  has_many :multimedias, as: :multimediable
end

class Producto < ActiveRecord::Base
  has_many :multimedias, as: :multimediable
end
```

<hr />

<h2>Conclusión</h2>

<p>En esta lección conocimos la estructura para establecer relaciones o asociaciones entre modelos, conceptos bastante útiles que nos permitirán crear y manipular bases de datos complejas sin necesidad de interactuar con código SQL.</p>

<p>Una vez más te recomiendo echarle un vistazo a la serie completa de <a href="http://codehero.co/category/cursos/rails/">Ruby desde cero</a>, agradeciendo de antemano todas sus dudas y comentarios en la sección de comentarios.</p>

<p>¡Hasta el próximo capítulo!</p>
