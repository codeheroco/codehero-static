---
layout: post
status: publish
published: true
title: Clases y Objetos
author: Carlos Picca
author_login: carlos
author_email: carlospicca@gmail.com
wordpress_id: 2896
wordpress_url: http://codehero.co/?p=2896
date: 2014-01-08 08:37:13.000000000 -04:30
categories:
- Cursos
- Java
tags:
- clases
- curso
- variables
- java
- objectos
---
<p>Bienvenidos Java desde Cero, curso en el cual aprendemos a programar sin conocimiento alguno. En el capítulo anterior, aprendimos todo lo relacionado a la sintaxis básica que posee Java a la hora de desarrollar una aplicación. Si eres nuevo en este curso, te recomiendo que le eches un vistazo al capítulo anterior para que te pongas en contexto (<a href="http://codehero.co/java-desde-cero-sintaxis-basica/">Capítulo 2 - Sintaxis básica</a>)</p>

<p>Hoy, vamos a ver todo lo relacionado al manejo de objetos y clases dentro de Java.</p>

<hr />

<h2>Clases</h2>

<p>Una clase es una plantilla de la que se crean los objetos individuales.</p>

<p>A continuación vamos a ver un ejemplo de una clase en Java:</p>

<pre lang=“java”>
public class Carro{
   String marca;
   int kilometraje;
   String color;

   void encender(){
   }
   
   void acelerar(){
   }
   
   void apagar(){
   }
}
</pre>

<p>Una clase puede contener cualquiera de los siguientes tipos de variables:</p>

<ul>
<li><p><strong>Variables locales</strong>: Las variables definidas dentro de los métodos, los constructores o los bloques se denominan variables locales. Se declara la variable y se inicializa en el método y la variable será destruida cuando el método se ha completado.</p></li>
<li><p><strong>Variables de instancia</strong>: Las variables de instancia son variables dentro de una clase, pero fuera de cualquier método. Estas variables se crean instancias cuando se carga la clase. Las variables de instancia se puede acceder desde el interior de cualquier método, constructor o bloques de esa clase en particular.</p></li>
<li><p><strong>Variables de clase</strong>: Las variables de clase son variables declaradas dentro una clase y fuera de cualquier método. En el ejemplo anterior <strong>marca</strong>, <strong>kilometraje</strong> y <strong>color</strong> son variables de clase Carro.</p></li>
</ul>

<p>Una clase en Java puede tener cualquier número de métodos para acceder o modificar el comportamiento de dicha clase. En el ejemplo anterior <strong>encender</strong>, <strong>acelerar</strong> y <strong>apagar</strong> son métodos de clase Carro.</p>

<p>Una vez que tenemos una idea general de que es una clase en Java y cuales son sus características es importante revisar los siguientes aspectos:</p>

<hr />

<h2>Constructores</h2>

<p>Cuando se discute acerca de las clases, uno de los temas más importantes tópicos serian los constructores. Cada clase tiene un constructor. Si no escribimos explícitamente un constructor para una clase el compilador de Java genera un constructor predeterminado para esa clase.</p>

<p>Cada vez que se crea un nuevo objeto, se invocará al menos un constructor. La regla principal de los constructores es que ellos deben tener el mismo nombre que la clase. Como dato importante una clase puede tener más de un constructor.</p>

<p>Vemos un ejemplo:</p>

<pre lang=“java”>
public class Carro{
   public carro(){
   }

   public carro(String marca){
      // El constructor tiene solo un parametro, en este caso marca
   }
}
</pre>

<blockquote>
  <p>Observemos que en el ejemplo anterior tenemos dos constructores el primero que es un con constructor sencillo en el cual podemos inicializar variables de la clase con los valores que nosotros queramos y el segundo es un constructor el cual acepta un parámetro, es decir, para poder instanciar un objeto de esta clase con este constructor siempre vamos a tener que pasarle el nombre de la marca.</p>
</blockquote>

<hr />

<h2>¿Cómo crear un objeto?</h2>

<p>Como se mencionó anteriormente, una clase proporciona los planos de objetos. Así que, básicamente, un objeto se crea de una clase. En Java, la palabra clave <strong>new</strong> se utiliza para crear nuevos objetos.</p>

<p>Existen tres pasos al crear un objeto de una clase:</p>

<ul>
<li><strong>Declarar</strong>: Debemos declarar una variable con su nombre y con el tipo de objeto que va a contener.</li>
<li><strong>Instanciar</strong>: La palabra clave <strong>new</strong> se utiliza para crear el objeto.</li>
<li><strong>Inicialización</strong>: La palabra clave <strong>new</strong> va seguida de una llamada a un constructor. Esta llamada inicializa el nuevo objeto.</li>
</ul>

<p>Si seguimos el modelo del ejemplo anterior:</p>

<pre lang=“java”>
public class Carro{

   public carro(String marca){
      // El constructor tiene solo un parametro, en este caso marca
      System.out.println(“La marca es : " + marca ); 
   }
   public static void main(String []args){
      // Creamos la variable carro
      Carro miCarro = new Carro( "Ford" );
   }
}
</pre>

<blockquote>
  <p>Observemos que poseemos un constructor el cual recibe un parametro, en este caso la marca del carro, el cual va a imprimir el nombre de la marca cada vez que inicializemos un objeto de la clase carro.</p>
  
  <p>A su vez con <code>Carro miCarro = new Carro( "Ford" )</code> estamos cumpliendo los pasos que explicamos anteriormente ya que declaramos una variable llamada <code>miCarro</code> de la clase <code>Carro</code>, la instanciamos al hacerle <strong>new</strong> y la inicializamos al llamar al constructor con <code>Carro( "Ford" )</code>.</p>
</blockquote>

<p>Si compilamos el condigo anterior obtenemos:</p>

<pre>La marca es : Ford</pre>

<hr />

<h2>Acceso a variables</h2>

<p>Se accede a las variables y métodos de instancia a través de los objetos creados.</p>

<p>Para acceder a la instancia de una variable la ruta de acceso completa debe ser el siguiente:</p>

<pre lang=“java”>
/* Primero creamos un objeto */
Objeto = new Constructor();

/* Ahora llamamos a la variable de la clase de la siguiente manera */
Objeto.nombreDeLaVariable;

/* También podemos acceder al método de la clase */
Objeto.nombreDelMetodo();
</pre>

<hr />

<h2>Ejemplo</h2>

<p>Veamos un ejemplo que recopile todo lo que vimos hasta ahora:</p>

<pre lang=“java”>
public class Carro{
   
   int kilometraje;

   public Carro(String marca){
      // El constructor tiene solo un parametro, en este caso marca
      System.out.println(“La marca es : " + marca );
   }
   public void setKilometraje( int kilometraje ){
       this.kilometraje = kilometraje;
   }

   public int getKilometraje( ){
       System.out.println(“El kilometraje es : " + kilometraje ); 
       return this.kilometraje;
   }
   public static void main(String []args){
      /* Creación */
      Carro miCarro = new Carro( "Ford" );

      /* Seteamos el kilometraje del carro */
      miCarro.setKilometraje( 2000 );

      /* Obtenemos el kilometraje del carro */
      miCarro.getKilometraje( );

      /* También podemos acceder a la variable de la clase */
      System.out.println(“Valor variable : " + miCarro.kilometraje ); 
   }
}
</pre>

<blockquote>
  <p>Observemos lo siguiente: tenemos una clase llamada <strong>Carro</strong>, la cual posee un constructor, dos métodos para modificar los valores de las variables de la clase(<code>getKilometraje</code> y <code>setKilometraje</code>). Y por ultimo tenemos un programa el cual instancia una variable de la clase Carro, le asigna el kilometraje de 2000 a ese objeto y luego lo imprime en la consola.</p>
</blockquote>

<p>Si compilamos el ejemplo obtenemos:</p>

<pre>
La marca es : Ford
El kilometraje es : 2000
Valor variable : 2000
</pre>

<hr />

<h2>Conclusión</h2>

<p>En esta lección, vimos todo lo relacionado al manejo de objetos y clases dentro de Java. Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso.</p>

<p>¡Te espero la próxima semana!</p>
