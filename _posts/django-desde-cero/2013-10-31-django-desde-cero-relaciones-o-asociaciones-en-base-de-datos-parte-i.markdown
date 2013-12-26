---
layout: post
status: publish
published: true
title: Relaciones o Asociaciones en Base de Datos (Parte I)
author: Carlos Picca
author_login: carlos
author_email: carlospicca@gmail.com
wordpress_id: 2496
wordpress_url: http://codehero.co/?p=2496
date: 2013-10-31 01:18:35.000000000 -04:30
categories:
- Cursos
- Django
tags:
- Django
- Base de datos
- db
- Asociaciones
- modelo
- relaciones
- manytomany
- manytoone
---
<p>Bienvenidos una vez más a Django desde Cero, curso en el cual aprendemos a programar sin conocimiento alguno. En el capítulo anterior, te enseñe como crear validadores de formularios. Los validadores nos ayudan a prevenir información errónea en nuestra app. Si eres nuevo en este curso, te recomiendo que le eches un vistazo al capítulo anterior para que te pongas en contexto (<a href="http://codehero.co/django-desde-cero-validaciones-de-formulario/">Capítulo 7 -  Validaciones de formulario </a>)</p>

<p>Este tutorial es muy largo para darlo en un solo capitulo es por eso que lo voy a dividir en dos partes.</p>

<p>Hoy, vamos a ver como crear asociaciones en las bases de datos con la ayuda de Django, como crear el formulario para rellenar dicha asociación, como definir el url que nos va ayudar a crear las asociaciones y finalmente como crear la vista la cual va a procesar la información que guardemos en dicho formulario.</p>

<p>La próxima semana veremos como crear el template o la plantilla necesaria para crear el comentario, agregaremos un botón el cual nos va a permitir desde el artículo agregar los comentarios y por último, veremos como desplegar todos los comentarios disponible dentro de un artículo.</p>

<div class="alert alert-info">
  <h4>
    ¡Alerta!
  </h4> Todos los ejemplos usados en el tutorial de son una continuación de los ejemplos del capitulo anterior.
</div>

<hr />

<h2>¿Como crear una asociación o relación de base de datos en Django?</h2>

<p>Lo primero que tenemos que hacer para definir una relación de base de datos en Django es crear dos modelos que puedan ser asociados uno con el otro, en nuestro caso ya poseemos uno, el modelo <strong>articulo</strong>, solo nos faltaría el segundo. Veamos como crearlo:</p>

<p>Agreguemos al archivo <code>models.py</code> que se encuentra en la app <code>blog</code> el siguiente código:</p>

<pre>
class Comentario(models.Model):
   nombre = models.CharField(max_length = 200)
   cuerpo = models.TextField()
   fecha_pub = models.DateTimeField('fecha publicacion')
   articulo = models.ForeignKey(Articulo)
</pre>

<blockquote>
  <p>Observemos lo siguiente:</p>
  
  <ul>
  <li>Creamos un modelo llamado <strong>Comentario</strong>, el cual va a guardar todos los comentarios realizados a un artículo.</li>
  <li>Con <code>nombre = models.CharField(max_length = 200)</code> guardamos el nombre de la persona que realizo el comentario.</li>
  <li>Con <code>cuerpo = models.TextField()</code> guardamos el cuerpo del comentario.</li>
  <li>Con <code>fecha_pub = models.DateTimeField('fecha publicacion')</code> guardamos la fecha en que es publicado dicho comentario</li>
  <li>Con <code>articulo = models.ForeignKey(Articulo)</code> guardamos la relación que existe entre el <strong>articulo y el **comentario</strong></li>
  </ul>
</blockquote>

<p>Si no sabes como crear un modelo en Django te recomiendo que le eches un ojo a <a href="http://codehero.co/django-desde-cero-modelos-y-base-de-datos/">Modelos en Django</a>.</p>

<p>Cabe resaltar que existen diferentes maneras de crear relaciones de bases de datos dentro del framework de Django, veamos las más importantes:</p>

<ul>
<li><strong>Muchos a uno</strong>: Para definir este tipo de relación usamos <code>ForeignKey()</code>. Sirve para asociar un modelo a muchos modelos diferentes (1:n). Ejemplo: una marca de carros posee varios carros.</li>
<li><strong>Muchos a muchos</strong>: Para definir este tipo de relación usamos <code>ManyToManyField()</code>. Sirve para asociar varios modelos a muchos modelos diferentes (n:n). Ejemplo: diferentes pizzas poseen diferentes toppings.</li>
</ul>

<blockquote>
  <p>En el ejemplo de los <strong>comentarios</strong> estamos usando la asociación (1:n).</p>
</blockquote>

<p>Si quieres saber mas acerca de los tipos de asociaciones que puedes realizar en Django te recomiendo que visites <a href="https://docs.djangoproject.com/en/dev/topics/db/models/">Relaciones de modelos en Django</a>.</p>

<p>Una vez que realicemos la asociación debemos permitir la manera que el usuario pueda hacer uso de dicha asociación. Veamos como:</p>

<p>Lo primero que tenemos que hacer es crear un <strong>form</strong> para dicho modelo, para realizar esto vamos a agregar el siguiente código al archivo <code>forms.py</code> dentro de nuestra app:</p>

<pre>
class ComentarioForm(forms.ModelForm):

   class Meta:
      model = Comentario
      fields = ('nombre', ‘cuerpo')
</pre>

<blockquote>
  <p>Observemos que creamos un form para el modelo <strong>Comentario</strong> con la ayuda de Django. Con <code>model = Comentario</code> asignamos el modelo correspondiente al form que queremos desplegar y con <code>fields = ( ‘nombre’, ‘cuerpo’ )</code> le indicamos a Django que solo puede mostrar estos campos en vez de todos los que restan en el modelo.</p>
</blockquote>

<p>Si no sabes como crear un form o formularios en Django te recomiendo que le eches un ojo a <a href="http://codehero.co/django-desde-cero-formularios-forms/">Formularios en Django</a>.</p>

<p>Ahora lo que tenemos que hacer es agregar un <strong>url</strong> para que podamos acceder a la vista de crear los comentarios. Para esto necesitamos agregar lo siguiente al archivo <code>urls.py</code> dentro de la app <code>blog</code>:</p>

<pre>
    url(r'^agregar_comentario/(?P<articulo_id>\d+)/$', 'blog.views.agregar_comentario'),
</pre>

<p>Si no sabes como crear urls en Django te recomiendo que le eches un ojo a <a href="http://codehero.co/django-desde-cero-urls-avanzadas/">Urls en Django</a>.</p>

<p>Seguido a esto debemos crear la vista a la cual va a acceder el la url que creamos anteriormente para eso agregamos el siguiente código al archivo <code>views.py</code> en la app <code>blog</code>:</p>

<pre>
def agregar_comentario(request, articulo_id):
    articulo = Articulo.objects.get(id=articulo_id)

    if request.POST:
      form = ComentarioForm(request.POST)
      if form.is_valid():
        comentario = form.save(commit=False)

        comentario.fecha_pub = timezone.now()
        comentario.articulo = articulo

        comentario.save()

        return HttpResponseRedirect('/articulos/obtener/%s' % articulo_id)
    else:
        form = ComentarioForm()
     
    args = {}
    args.update(csrf(request))
    
    args['articulo'] = articulo
    args['form'] = form

    return render_to_response('agregar_comentario.html', args)
</pre>

<blockquote>
  <p>Observemos lo siguiente:</p>
  
  <ul>
  <li>Con <code>articulo = Articulo.objects.get(id=articulo_id)</code> estamos obteniendo el articulo con el id que provee la url, es decir, el artículo al cual debemos agregar el comentario.</li>
  <li>Con <code>comentario = form.save(commit=False)</code> guardamos la instancia del comentario una vez que sea valida pero no le hacemos commit, es decir, no la guardamos en la base de datos.</li>
  <li>Con <code>comentario.fecha_pub = timezone.now()</code> asignamos la hora cuando creamos el comentario.</li>
  <li>Con <code>comentario.articulo = articulo</code> asignamos el articulo al comentario.</li>
  <li>Con <code>comentario.save()</code> guardamos todo en la base de datos.</li>
  <li>Y finalmente redirigimos a obtener el artículo al cual le agregamos el comentario.</li>
  </ul>
</blockquote>

<p>Si no sabes como crear una vista en Django te recomiendo que le eches un ojo a <a href="http://codehero.co/django-desde-cero-vistas-dinamicas/">Vistas en Django</a>.</p>

<p>Hasta acá vamos a llegar con el tutorial de hoy, en el próximo capitulo terminaremos de ver como  crear el template o la plantilla necesaria para crear el comentario, agregaremos un botón el cual nos va a permitir desde el artículo agregar los comentarios y por ultimo, veremos como desplegar todos los comentarios disponible dentro de un artículo.</p>

<hr />

<h2>Conclusión</h2>

<p>En esta lección, aprendimos como crear asociaciones en las bases de datos con la ayuda de Django, como crear el formulario para rellenar dicha asociación, como definir el url que nos va ayudar a crear las asociaciones y finalmente como crear la vista la cual va a procesar la información que guardemos en dicho formulario. Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso.</p>

<p>¡Te espero la próxima semana con la <strong>Parte II</strong>!</p>
