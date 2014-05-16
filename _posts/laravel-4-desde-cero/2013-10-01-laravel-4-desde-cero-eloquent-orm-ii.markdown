---
layout: post
status: publish
published: true
title: Eloquent ORM II
author: Ramses Velasquez
author_login: ramses
author_email: cotufa9@gmail.com
date: 2013-10-01 00:00:59.000000000 -04:30
serie: Laravel 4 desde Cero
description: Tutorial con información sobre declaración y uso de relaciones en Laravel 4 con Eloquent ORM
dificultad: novato
duracion: 20
categories:
- Cursos
- Laravel
tags:
- php
- laravel
- laravel 4
- eloquent orm
- relaciones
---
<p>En este nuevo capítulo de Laravel vamos aprender como relacionar nuestros modelos, ya que casi siempre los datos en las diferentes tablas de un proyecto están relacionados. Esto se logra gracias a Eloquent ORM, que nos proporciona una manera sencilla relacionar modelos (uno a uno, uno a muchos y muchos a muchos).</p>

<p>Veamos rápidamente un ejemplo para luego explicar con detalle como es todo el proceso.</p>

```php
<?php
Class Articulo extends Eloquent{

    public function comentarios(){
        return $this->hasMany('Comentario');
    }

}
?>
```

```php
<?php
Class Comentario extends Eloquent{

    public function articulo(){
        return $this->belongsTo('Articulo');
    }

}
?>
```

<p>Como podemos observar aquí se establece una relación entre Articulo y Comentario, en donde un Articulo tiene varios comentarios y un Comentario pertenece a un Articulo. Ahora vamos a ver como mas detalle como definir y utilizar todos los tipos de relaciones que Eloquent ORM nos proporciona.</p>

<h2>Tipos de Relaciones</h2>

<p>Cada relación se declara en los modelos dentro de una función estática con el nombre que se le quiera dar, por ejemplo el en ejemplo anterior un <strong>Articulo</strong> tiene varios <strong>comentarios()</strong>. Esta función estática debe retornar el tipo de relación, el modelo con el cual se relaciona y en los casos que sea necesarios, algunas propiedades extras.</p>

<h3>Uno a Uno</h3>

<p>Supongamos que tenemos un modelo Persona y otro modelo Pasaporte, lo cual nos da una relación <strong>Uno a Uno</strong>(Asumiendo que solo puedes tener un pasaporte). Primero debemos declarar la relación en el modelo Usuario.</p>

```php
<?php
Class Persona extends Eloquent{

    public function pasaporte(){
        return $this->hasOne('Pasaporte', 'persona_id');
        // Para declarar una relación uno a uno se utiliza la función hasOne().
        // Esta función recibe como primer parámetro el modelo con el cual queremos hacer la relación
        // en este caso es Pasaporte.
        // El segundo parámetro es el campo id con el cual se relación el modelo.
        // En este caso Eloquent busca el pasaporte que tenga persona_id igual al
        // id de la Persona
    }

}
?>
```

<p>Ahora que ya hemos declarado la relación, es momento de aprender como utilizarla. Para esto simplemente llamamos a la función con un objeto Persona, veamos el siguiente ejemplo:</p>

```php
<?php
    $persona = Persona::find(1);
    $pasaporte = $persona->pasaporte;
?>
```

<p><strong>$pasaporte</strong> contiene un objeto con todos los datos del pasaporte de la persona.</p>

<h3>Uno a Muchos</h3>

<p>Para explicar Uno a Muchos vamos a suponer que tenemos un modelo Asignatura y otro Temas, donde existe una relación de una Asignatura tiene muchos Temas. Con esto en mente podemos pasar a declarar la relación en Asignatura.</p>

```php
<?php

Class Asignatura extends Eloquent{

    public function temas(){
        return $this->hasMany('Tema', 'asignatura_id');
        // Para declarar una relación uno a muchos se hace uso de la función hasMany().
        // Al igual que hasOne, esta función recibe dos parámetros.
        // El primero es el modelo al cual se desea asociar
        // El segundo es el id con el que se van a relacionar los modelos.
    }
}
?>
```

<p>Con la relación declarada pasemos a aprender como hacer uso de ella y como filtrar los datos que retorna.</p>

```php
<?php
$asignatura = Asignatura::find(1);

$temas = $asignatura->temas;
// Esto retorna un arreglo con los objetos de todas las temas que tiene la asignatura 1

$temas_obligatorios = $asignatura->temas()->where('obligatorio', '=', '1')->get();
// También se pueden agregar filtros, en este caso solo retorna los temas en los que
// el campo obligatorio sea igual a 1

?>
```



<h3>Muchos a Muchos</h3>

<p>Muchos a muchos a veces es muy tedioso de manejar, pero con Laravel es muy sencillo. Para enteder esta relación vamos a suponer que tenemos tres tablas <strong>profesores</strong>, <strong>asignaturas</strong> y <strong>profesor_asignatura</strong>, las cuales son manejadas por dos modelos Profesor y Asignatura. Estas tienen una relación de muchos a muchos donde un profesor puede dictar muchas asignaturas y una asignatura puede ser dictada por muchos profesores. Vamos a ver como se declara la relación en este caso:</p>

```php
<?php
Class Profesor extends Eloquent{

    public function asignaturas(){
        return $this->belongsToMany('Asignatura', 'profesor_asignatura', 'profesor_id', 'asignatura_id');
    }
}
?>
```

```php
<?php
Class Asignatura extends Eloquent{

    public function profesores(){
        return $this->belongsToMany('Profesor', 'profesor_asignatura', 'asignatura_id', 'profesor_id');
    }
}
?>
```

<p>En este caso hemos declarado la relación de los dos lados, para muchos a muchos se utiliza la función <strong>belongsToMany</strong> que recibe 4 parametros. El primero es el otro módelo cual el cual se quiere hacer relación, el segundo es la tabla que contiene los ids de los dos modelos y hace la unión. El tercer y cuarto parámetro son los nombres de los id que Laravel debe buscar en la tabla intermedia para hacer la relación.</p>

<p>Para hacer uso de esta relación es igual que las anteriores, veamos un ejemplo:</p>

```php
<?php

$profesores = Asignatura::find(1)->profesores;
// $profesores va a contener un arreglo con todos los profesores que tiene la asignatura 1

$asignaturas = Profesor::find(1)->asignaturas;
// $asignaturas va a contener un arreglo con todas las asignaturas que da el profesor 1
?>
```

<p>¿Pero que sucede si necesitamos utilizar o guardar alguna información en la tabla intermedia ? Pues se declara los campos que sean necesarios en la relación, veamos un ejemplo de esto. Vamos a asumir que la tabla <strong>profesore_asignatura</strong> tiene los campos salon y hora.</p>

```php
<?php
Class Profesor extends Eloquent{

    public function asignaturas(){
        return $this->belongsToMany('Asignatura', 'profesor_asignatura', 'profesor_id', 'asignatura_id')
                        ->withPivot('salon', 'hora');
    }
}
?>
```

<p>Como podemos observar los campos se agregan con la función <strong>withPivot</strong>, pasando como parametro el nombre del campo de la tabla intermedia que se desea utilizar. Ahora cuando hagamos uso de <code>$profesores = Asignatura::find(1)->profesores;</code>, <strong>$profesores</strong> tambien va a tener los campos de la tabla intermedia.</p>

<p>Para utilizar los campos que se encuentran en la tabla del medio se debe utilizar la propieda <strong>pivot</strong>, veamos un ejemplo:</p>

```php
<?php

$profesor = Profesor::find(1);
$asignaturas = $profesor->asignaturas;

foreach( $asignaturas as $asignatura ){
    echo $asignatura->nombre;
    // las propiedades de una asignatura se utilizan directamente con el objeto

    echo $asignatura->pivot->salon;
    // pero las de la tabla intermedia se deben utilizar anteponiendo primero 'pivot'
}
?>
```

<p>Vamos a ver como podemos insertar y eliminar datos utilizando la relacion de muchos a muchos.</p>

```php
<?php

$profesor = Profesor::find(1);
$profesor->asignaturas()->attach(5);
// Aqui estamos guardando en $profesor el Profesor numero 1
// luego mediante la relacion asignaturas() llamamos a la funcion attach()
// esta funcion recibe como paramtro el id de la asignatura que se desea
// relacionar con el Profesor 1

$profesor->asignaturas()->attach(5, array('salon'=>'P14', 'hora'=>'5:00 PM'));
// Cuando queremos insertar datos en la tabla del medio utilizamos la misma funcion attach()
// pero con un segundo parametro que es un arreglo con los datos de la tabla intermedia

$profesor->asignaturas()->detach(5);
// para borrar una relacion se utiliza la función detach()
// en este caso borrara la relacion que tiene el profesor 1
// con la asignatura 5
?>
```

<h3>Pertenece a</h3>

<p>La última relación que vamos a ver es la de Pertenece a. Cuando declaramos una relación de Uno a Uno o de Uno a Muchos, tambien ncesitamos una relación inversa y para esto tenemos a Pertenece a. Volvamos un momento a nuestra relación de una Asignatura tiene muchos Temas. Ya tenemos una relacion para buscar todos los temas de una asignatura, pero ahora necesitamos buscar la Asignatura a la cual un Tema en especifico pertenece.</p>

```php
<?php
Class Tema extends Eloquent {
    public function asignatura()
    {
        return $this->belongsTo('Asignatura', 'asignatura_id');
        // La relación Pertenece a se declara con la función belongsTo
        // esta acepta dos parámetros
        // El primero es la tabla a donde pertecene la relación
        // El segundo es el id de la tabla padre en la tabla actual
        // En este caso seria el id de Asignatura en tema
    }
}
?>
```

<p>La manera de hacer uso de esta relación es igual a todas las anteriores.</p>

```php
<?php
$asignatura = Tema::find(1)->asignatura;
?>
```

<p><strong>$asignatura</strong> contiene el registro al cual el tema 1 pertence.</p>

<hr />

<h2>Conclusión</h2>

<p>En este tutorial hemos aprendido a relacionar los modelos, de esta manera nos ahorramos algunas lineas de codigo y todo queda más ordenado. Para aprender totalmente este tipo de relaciones hay que practicarlas y experimentar con ellas, al final veras que es muy sencillo utilizarlas. Cualquier duda dejala en la sección de comentarios.</p>
