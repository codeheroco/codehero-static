---
layout: post
status: publish
published: true
title: Proyecto
author: Ramses Velasquez
author_login: ramses
author_email: cotufa9@gmail.com
date: 2013-11-12 10:16:59.000000000 -04:30
serie: Laravel 4 desde Cero
description: Tutorial para ver todas las funciones que hemos aprendiendo en la creacion de un mini proyecto con Laravel 4
dificultad: novato
duracion: 20
categories:
- Cursos
- Laravel
tags:
- php
- laravel
- laravel 4
---
<p>En este nuevo capítulo de la serie de Laravel 4 vamos a crear un proyecto completo. Este proyecto consistirá de una lista de productos y vendedores en donde cada vendedor tienes sus productos. Esto nos servirá para entender como se pueden unir todas las funciones que hemos venido viendo en el curso.</p>

<p>El proyecto constara de tres secciones:</p>

<ul>
<li>La primera sección sera la página inicio y tendrá una lista de todos los vendedores y sus respectivos productos. </li>
<li>La segunda sección tendrá un formulario para crear vendedores con su nombre y apellido, también tendrá una lista de todos los vendedores. </li>
<li>La tercera sección tendrá un formulario para crear productos y una lista con todos los que se han creado. Los productos tendrán una descripción, precio y vendedor a quien pertenecen. </li>
</ul>

<hr />

<h2>Tablas y Estructura</h2>

<p>Para crear el proyecto primero debemos crear las tablas en la base de datos. Son dos tablas muy sencillas que nos servirán para guardar los vendedores y los productos.</p>

```sql 
CREATE TABLE  `codehero-laravel`.`vendedor` (
`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`nombre` VARCHAR( 100 ) NOT NULL ,
`apellido` VARCHAR( 100 ) NOT NULL ,
`created_at` TIMESTAMP NOT NULL ,
`updated_at` TIMESTAMP NOT NULL
) ENGINE = INNODB;

CREATE TABLE  `codehero-laravel`.`producto` (
`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`vendedor_id` INT NOT NULL ,
`descripcion` VARCHAR( 255 ) NOT NULL ,
`precio` DECIMAL( 10, 2 ) NOT NULL ,
`created_at` TIMESTAMP NOT NULL ,
`updated_at` TIMESTAMP NOT NULL
) ENGINE = INNODB;

```

<p>Ahora que tenemos las dos tablas creadas en nuestra base datos procedemos a crear el proyecto de Laravel. Para hacer esto vamos a utilizar <strong>Composer</strong> con su comando <code>composer create-project laravel/laravel sistema --prefer-dist</code> como ya lo hemos visto en el primer capítulo de la serie. Cuando tengamos el proyecto creado debemos configurar la conexión a la base de datos como ya lo hemos hecho anteriormente.</p>

<hr />

<h2>Bootstrap</h2>

<p>Para este nuevo proyecto que estamos haciendo vamos a utilizar <strong>Twitter Bootstrap</strong>, para darle un poco de estilo a nuestra interfaz. Para los que no conocen Bootstrap, es un front-end framework que nos permite darle estilo a nuestro HTML de manera muy sencilla.</p>

<p>Lo primero que hay que hacer para agregar este framework a nuestro proyecto es descargarlo de la pagina <a href="getbootstrap.com">www.getbootstrap.com</a>. Bootstrap esta formado por varios archivos pero nosotros utilizaremos solo el bootstrap.min.css y el bootstrap.min.js. Los cuales vamos a colocar en las carpetas <code>public/css</code> y <code>public/js</code> respectivamente, si no están creadas entonces la creamos.</p>

<p>Vamos a utilizar uno de los demos que ya existe en la pagina bootstrap, el cual podemos descargar desde <a href="http://getbootstrap.com/examples/jumbotron-narrow/jumbotron-narrow.css">demo css</a>, para darle un poco mas de estilo a nuestro proyecto. El archivo css lo vamos a incluir en la carpeta <code>public/css</code>, junto con el css de bootstrap.</p>

<hr />

<h2>Modelos</h2>

<p>Con la estructura del proyecto lista y los estilos de bootstrap descargados, vamos a pasar a crear los modelos de nuestro proyecto. Como hemos dicho anteriormente, los modelos se crean en la carpeta <code>app/models</code>.</p>

<p>El primer modelo que vamos a crear es <strong>Vendedor.php</strong>, este modelo tendrá una relación con el modelo de Producto que vamos a crear mas adelante y una función para agregar los vendedores siguiendo unas regla de validación.</p>

```php 
<?php
class Vendedor extends Eloquent  {

    protected $table = 'vendedor';
    // declaramos la tabla que usa el modelo 
    protected $fillable = array('nombre', 'apellido');
    // declaramos los campos con los que se puede crear el objeto desde el form

    public function productos(){
        // creamos una relación con el modelo de Producto
        return $this->hasMany('Producto', 'vendedor_id');
    }
    
    public static function agregarVendedor($input){
        // función que recibe como parámetro la información del formulario para crear el Vendedor
        
        $respuesta = array();
        
        // Declaramos reglas para validar que el nombre y apellido sean obligatorios y de longitud maxima 100
        $reglas =  array(
            'nombre'  => array('required', 'max:100'),  
            'apellido' => array('required', 'max:100'), 
        );
                
        $validator = Validator::make($input, $reglas);
        
        // verificamos que los datos cumplan la validación 
        if ($validator->fails()){
            
            // si no cumple las reglas se van a devolver los errores al controlador 
            $respuesta['mensaje'] = $validator;
            $respuesta['error']   = true;
        }else{
        
            // en caso de cumplir las reglas se crea el objeto Vendedor
            $vendedor = static::create($input);        
            
            // se retorna un mensaje de éxito al controlador
            $respuesta['mensaje'] = 'Vendedor creado!';
            $respuesta['error']   = false;
            $respuesta['data']    = $vendedor;
        }     
        
        return $respuesta; 
  }
}

?>
```

<p>El segundo modelo que tendrá nuestro proyecto sera <strong>Producto.php</strong> y va a contar con una función que sirve para crear los productos tomando en cuenta ciertas reglas de validación.</p>

```php 
<?php
class Producto extends Eloquent  {

    protected $table = 'producto';
    protected $fillable = array('descripcion', 'precio', 'vendedor_id');

    public static function agregarProducto($input){
        
        $respuesta = array();

        $reglas =  array(
            'vendedor_id'  => 'required',
            'descripcion'  => array('required', 'max:255'),  
            'precio' => array('required', 'numeric'), 
        );
        
        $validator = Validator::make($input, $reglas);
        
        if ($validator->fails()){
            $respuesta['mensaje'] = $validator;
            $respuesta['error']   = true;
        }else{
            
            $producto = static::create($input);
                               
            $respuesta['mensaje'] = 'Producto creado!';
            $respuesta['error']   = false;
            $respuesta['data']    = $producto;
        }
        
        return $respuesta; 
    }
}
?>
```

<hr />

<h2>Controladores</h2>

<p>Ahora es el turno de crear los controladores, que van en la carpeta <code>app/controllers</code>. El primero que vamos a crear sera <strong>VendedorController.php</strong>, el cual tiene un método para ver los vendedores y otro para crear un vendedor.</p>

```php 
<?php
class VendedorController extends BaseController {

    public function mostrarVendedores(){
        $vendedores = Vendedor::all();
        // obtenemos todos los vendedores y los pasamos a la vista 
        return View::make('vendedor.lista', array('vendedores' => $vendedores));
    }

    public function crearVendedor(){
        
        // llamamos a la función de agregar vendedor en el modelo y le pasamos los datos del formulario 
        $respuesta = Vendedor::agregarVendedor(Input::all());
        
        // Dependiendo de la respuesta del modelo 
        // retornamos los mensajes de error con los datos viejos del formulario 
        // o un mensaje de éxito de la operación 
        if ($respuesta['error'] == true){
            return Redirect::to('vendedor')->withErrors($respuesta['mensaje'] )->withInput();
        }else{
            return Redirect::to('vendedor')->with('mensaje', $respuesta['mensaje']);
        }
    }
}
?>
```

<p>El otro controlador que vamos a crear es <strong>ProductoController.php</strong>. Este controlador también tiene un método para listar los productos y otro para crear un producto.</p>

```php 
<?php
class ProductoController extends BaseController {

    public function mostrarProductos(){

        $productos = Producto::all();
        $vendedores = Vendedor::all();
        // buscamos todos los productos y todos los vendedores y los pasamos a la vista
        return View::make('producto.lista', array('productos' => $productos, 'vendedores'=> $vendedores));
    }

    public function crearProducto(){

        $respuesta = Producto::agregarProducto(Input::all());
        
        if ($respuesta['error'] == true){
            return Redirect::to('producto')->withErrors($respuesta['mensaje'] )->withInput();
        }else{
            return Redirect::to('producto')->with('mensaje', $respuesta['mensaje']);
        }
    }
}

?>
```

<hr />

{% include middle-post-ad.html %}

<h2>Rutas</h2>

<p>Con los controladores y modelos creados, vamos a pasar a crear las rutas que utilizara nuestro proyecto en el archivo <strong>routes.php</strong>. Se pueden observar 5 rutas, una para el inicio y las otras para ver las listas y crear los vendedores y productos.</p>

```php 
<?php
Route::get('/', function()
{   
    // Con la funcion with() podemos traer todos los vendedores 
    // con sus respectivos productos. Esta funcion recibe como parametro 
    // alguna relacion que tenga el modelo al que se este llamando y 
    // la incluye en los resultados que devuelve el get()
    $vendedores = Vendedor::with('productos')->get();
    return View::make('inicio', array('vendedores'=> $vendedores));
});

Route::get('vendedor', 'VendedorController@mostrarVendedores');

Route::post('vendedor', 'VendedorController@crearVendedor');

Route::get('producto', 'ProductoController@mostrarProductos');

Route::post('producto', 'ProductoController@crearProducto');
?>
```

<hr />

<h2>Vistas</h2>

<p>Ya hemos creado las rutas, los modelos y los controladores, ahora solo nos faltan las vistas en <code>app/views</code> para tener nuestro proyecto listo. La primera lista que vamos a crear sera <strong>plantilla.blade.php</strong> y tendrá el esqueleto HTML de nuestro proyecto. En esta vista colocamos la función <strong>@yield()</strong> que ya vimos anteriormente y que nos permite incrustar HTML en nuestra plantilla.</p>

```html
{% raw %}
<!DOCTYPE html>
<html>
  <head>
    <title>Tienda</title>
    <!--Incluimos el CSS de bootstrap y el CSS de la plantilla
    que usamos con los helpers de Laravel-->
    {{HTML::style('css/bootstrap.min.css')}}
    {{HTML::style('css/jumbotron-narrow.css')}}

    </head>
    <body>

    <div class="container">
      <div class="header">

        <ul class="nav nav-pills pull-right">
          <li>{{HTML::link('/', 'Inicio')}}</li>
          <li>{{HTML::link('vendedor', 'Vendedores')}}</li>
          <li>{{HTML::link('producto', 'Productos')}}</li>
        </ul>

        <h3 class="text-muted">Tienda</h3>
      </div>

      @yield('contenido')
      <!-- Aqui se incluiran los codigos de las vistas que 
      use cada metodo de los controladores --> 

      <div class="footer">
        <p>&copy; Codehero 2013</p>
      </div>

    </div> 

    <!-- Incluimos la libreria jQuery  -->
    <script src="https://code.jquery.com/jquery.js"></script>
    <!-- Incluimos el JS de bootstrap con el Helper de Laravel -->
    {{HTML::script('js/bootstrap.min.js')}}
  </body>
</html>
{%endraw%}
```

<p>La segunda vista que vamos a crear es <strong>inicio.blade.php</strong> y contiene un título y la lista de vendedores con sus productos.</p>

```html
{% raw %}

@extends('plantilla')

@section('contenido') 

<div class="jumbotron">
  <h1>Tienda</h1>
  <p class="lead">Se pueden crear vendedores y productos en sus secciones<p>
</div>

<div class="row marketing">

  <!-- Aquí listamos todos los vendedores -->
  @foreach($vendedores as $vendedor)
    <div class="panel panel-primary">
        
        <div class="panel-heading">{{ $vendedor->nombre.' '.$vendedor->apellido}}</div>
       
        
        <ul class="list-group">
          <!-- Aquí listamos todos los productos de un vendedor -->
          @foreach($vendedor->productos as $producto)
            <li class="list-group-item">{{ $producto->descripcion .' '. $producto->precio}}</li>
          @endforeach
        </ul>

    </div>
  @endforeach

</div>

@stop

{%endraw%}
```

<p>La tercera vista va a ir en <code>app/views/vendedor</code> y se llama <strong>lista.blade.php</strong>. Contiene un formulario para crear un vendedor y la lista de los vendedores existentes. Esta vista también tiene unas funciones que sirve para mostrar un mensaje de éxito o los errores que puedan ocurrir al crear un vendedor.</p>

```html
{% raw %}

@extends('plantilla')
@section('contenido') 
<div class="row marketing">
    <h3>Crear Vendedor</h3>

    {{ Form::open(array('url' => 'vendedor')) }}    
    <!-- El mensaje que se envía por el redirect en el controlador lo podemos obtener
    con la función get de la clase Session -->
        @if (Session::get('mensaje') )
          <!-- Si hay un mensaje, entonces lo imprimimos y le damos estilo con bootstrap -->
          <div class="alert alert-success">{{Session::get('mensaje')}}</div>
        @endif
        <div class="form-group">
          {{Form::label('nombre', 'Nombre')}}
          {{Form::text('nombre', Input::old('nombre'), array('class'=>'form-control', 'placeholder'=>'nombre vendedor', 'autocomplete'=>'off'))}}
        </div>
          <!-- Verificamos si hubo algún error en el campo --> 
          @if( $errors->has('nombre') )          
              <!-- En caso de que haya un error, entonces los imprimos y utilizamos algún estilo de bootstrap -->
              <div class="alert alert-danger">
              @foreach($errors->get('nombre') as $error )   
                  * {{ $error }}</br>
              @endforeach
              </div>
          @endif
        <div class="form-group">
          {{Form::label('apellido', 'Apellido')}}
          {{Form::text('apellido', Input::old('apellido'), array('class'=>'form-control', 'placeholder'=>'apellido vendedor', 'autocomplete'=>'off'))}}
        </div>
          @if( $errors->has('apellido') )
                <div class="alert alert-danger">
                @foreach($errors->get('apellido') as $error )
                    * {{ $error }}</br>
                @endforeach
                </div>
          @endif
        {{Form::submit('Guardar', array('class'=>'btn btn-success'))}}
        {{Form::reset('Resetear', array('class'=>'btn btn-default'))}}

    {{ Form::close() }}
</div>
<h3>Vendedores</h3>
<div class="list-group">
    @foreach($vendedores as $vendedor)
      <a href="#" class="list-group-item">{{$vendedor->nombre.' '.$vendedor->apellido}}</a>
    @endforeach 
</div>
@stop

{%endraw%}
```

<p>La cuarta vista va a ir en <code>app/views/producto</code> y se llama <strong>lista.blade.php</strong>. Contiene un formulario para crear un producto y la lista de los productos existentes. Al igual que la vista anterior, esta vista también tiene funciones para mostrar los mensajes de éxito o error.</p>

```html
{% raw %}

@extends('plantilla')
@section('contenido')
<div class="row marketing">
    <h3>Crear Producto</h3>
    {{ Form::open(array('url' => 'producto')) }}
        @if (Session::get('mensaje') )
          <div class="alert alert-success">{{Session::get('mensaje')}}</div>
        @endif
        <div class="form-group">
          {{Form::label('descripcion', 'Descripcion')}}
          {{Form::text('descripcion', Input::old('descripcion'), array('class'=>'form-control', 'placeholder'=>'descripcion del producto', 'autocomplete'=>'off'))}}
        </div>     
        @if( $errors->has('descripcion') )
              <div class="alert alert-danger">
              @foreach($errors->get('descripcion') as $error )   
                  * {{ $error }}</br>
              @endforeach
              </div>
        @endif
        <div class="form-group">
          {{Form::label('precio', 'Precio')}}
          {{Form::text('precio', Input::old('precio'), array('class'=>'form-control', 'placeholder'=>'precio del producto', 'autocomplete'=>'off'))}}
        </div>
        @if( $errors->has('precio') )
              <div class="alert alert-danger">
              @foreach($errors->get('precio') as $error )   
                  * {{ $error }}</br>
              @endforeach
              </div>
        @endif
        <div class="form-group"><!-- Creamos un select para escoger cual vendedor es dueño del producto -->
          {{Form::label('vendedor_id', 'Vendedor')}}
          <select class="form-control" name="vendedor_id">
            @foreach($vendedores as $vendedor)
              <option value="{{$vendedor->id}}">{{$vendedor->nombre.' '.$vendedor->apellido}}</option>
            @endforeach 
          </select>
        </div>
        @if( $errors->has('vendedor_id') )
              <div class="alert alert-danger">
              @foreach($errors->get('vendedor_id') as $error )   
                  * {{ $error }}</br>
              @endforeach
              </div>
        @endif
        {{Form::submit('Guardar', array('class'=>'btn btn-success'))}}
        {{Form::reset('Resetear', array('class'=>'btn btn-default'))}}
    {{ Form::close() }}
</div>
<h3>Productos</h3>
<div class="list-group">
    @foreach($productos as $producto)
      <a href="#" class="list-group-item">{{$producto->descripcion.' '.$producto->precio}}</a>
    @endforeach 
</div>
@stop

{% endraw %}
```


<hr />

<h2>Resultados</h2>

<p>Con todo el código listo podemos pasar a probar nuestro proyecto y ver el estilo que le agrega Bootstrap. La primera pantalla que deberiamos ver es el inicio, cuando tengamo productos y vendedores los podremos ver en la lista.</p>

<p><a href="http://i.imgur.com/bojPrFi.png"><img src="http://i.imgur.com/bojPrFi.png" alt="laravel - proyecto muestra de vista inicio" class="aligncenter size-full wp-image-2587" /></a></p>

<p>Las dos siguientes imágenes muestran las pantallas que veremos cuando creamos un vendedor. Si el vendedor fue creado entonces se mostrara un mensaje de éxito, en caso contrario veremos los mensajes de errores.</p>

<p><a href="http://i.imgur.com/oJOQZaU.png"><img src="http://i.imgur.com/oJOQZaU.png" alt="laravel - proyecto muestra de vista crear vendedor" class="aligncenter size-full wp-image-2586" /></a></p>

<p><a href="http://i.imgur.com/Kk2vc0W.png"><img src="http://i.imgur.com/Kk2vc0W.png" alt="laravel - proyecto muestra de errores" class="aligncenter size-full wp-image-2592" /></a></p>

<p>Por último podemos ver la vista de crear un producto, en esta observamos el formulario con el campo para elegir a que vendedor pertenece el producto.</p>

<p><a href="http://i.imgur.com/nWUpqAj.png"><img src="http://i.imgur.com/nWUpqAj.png" alt="laravel - proyecto muestra de vista crear producto" class="aligncenter size-full wp-image-2588" /></a></p>

<hr />

<h2>Conclusión</h2>

<p>En este capítulo hemos hecho un pequeño proyecto que nos sirve para juntar algunos de los conocimientos que hemos adquirido en el curso. Esta es una manera de hacer los proyectos con Laravel 4, pero no quiere decir que sea la única. Cada quien logra su estilo con la practica y recomiendo que le agreguen mas funcionalidades al proyecto para practicar. Cualquier duda o comentario estaré atento a la sección de preguntas.</p>
