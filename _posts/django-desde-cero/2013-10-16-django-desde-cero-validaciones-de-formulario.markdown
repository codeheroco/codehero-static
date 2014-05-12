---
layout: post
status: publish
published: true
title: Validaciones de formulario
author: Carlos Picca
author_login: carlos
author_email: carlospicca@gmail.com
wordpress_id: 2407
wordpress_url: http://codehero.co/?p=2407
date: 2013-10-16 01:35:18.000000000 -04:30
serie: Django desde Cero
dificultad: Aprendiz
duracion: 20
description: Curso en el cual aprenderemos Django desde Cero. En esta clase, estudiaremos como crear validación de formularios. Los validadores previenen data errónea.
categories:
- Cursos
- Django
tags:
- formularios
- form
- Validaciones
- validation
- cleaned_data
- validadores
---
<p>Bienvenidos una vez más a Django desde Cero, curso en el cual aprendemos a programar sin conocimiento alguno. En el capítulo anterior, te enseñe como crear urls avanzadas las cuales nos servirán para manejar información a través de nuestras apps. Si eres nuevo en este curso, te recomiendo que le eches un vistazo al capítulo anterior para que te pongas en contexto (<a href="http://codehero.co/django-desde-cero-urls-avanzadas/">Capítulo 6 - Urls Avanzadas</a>)</p>

<p>Hoy, vamos a ver como crear validación de formularios. Los validadores nos ayudan a prevenir información errónea en nuestra app.</p>

<div class="alert alert-info">
  <h4>
    ¡Alerta!
  </h4> Todos los ejemplos usados en el tutorial de son una continuación de los ejemplos del capitulo anterior.
</div>

<hr />

<h2>¿Qué es una validación de formulario en Django?</h2>

<p>Los validadores son funciones simples que toman un solo argumento y disparan un <strong>ValidationError</strong> en el caso de que una entrada sea no válida. Estos nos sirven para crear alarmas cuando los usuarios insertan información errónea en los campos de un formulario de nuestra app.</p>

<hr />

<h2>¿Cómo crear un validador en Django?</h2>

<p>Supongamos que queremos validar los campos <strong>autor</strong>, <strong>fecha</strong>, <strong>texto</strong> y <strong>titulo</strong> que tenemos disponible en nuestro modelo <strong>Articulo</strong>, recordemos que estamos utilizando el ejemplo que dejamos en el capitulo anterior <a href="http://codehero.co/django-desde-cero-urls-avanzadas/">urls avanzadas</a>.</p>

<p>Lo primero que tenemos que hacer es declarar un método dentro de la misma clase (<em>ArticuloForm</em>), en donde definiremos toda nuestra lógica de validación para un campo del formulario en especifico. Vamos a empezar por validar el campo del autor. Para eso vamos a agregar la siguiente función al archivo <code>forms.py</code> dentro de nuestra app <em>blog</em>.</p>

```python
def clean_autor(self):
      diccionario_limpio = self.cleaned_data

      autor = diccionario_limpio.get('autor')

      if len(autor) < 3:
         raise forms.ValidationError("El autor debe contener mas de tres caracteres")

      return autor
```

<p>Observemos lo siguiente:</p>

<ul>
<li>Por convención debemos denominar nuestro método con el prefijo <strong>clean</strong> seguido del nombre del campo. En nuestro caso seria <code>clean_autor</code>.</li>
<li>Siempre debemos obtener el diccionario de data que proviene del formulario de manera limpia, para eso utilizamos la siguiente instrucción <code>diccionario_limpio = self.cleaned_data</code>.</li>
<li>Una vez que obtengamos el diccionario debemos obtener el campo que queremos validar. Eso lo hacemos con la siguiente instrucción <code>autor = diccionario_limpio.get('autor')</code>. En nuestro caso debemos retornar autor.</li>
<li>Seguido, generamos la validación, si queremos validar que el autor no puede tener menos de 3 letras usamos <code>if len(autor) < 3:</code>. Si el campo posee mas de 3 caracteres levantamos un <strong>ValidationError</strong> a través de <code>raise forms.ValidationError("El autor debe contener mas de tres caracteres")</code>.</li>
<li>Por último, necesitamos retornar el campo validado como tal.</li>
</ul>

<p>Este mismo procedimiento debemos usarlo con todos los campos que queramos validar. Para no extender el tutorial y dejarlo lo mas simple posible les voy a dejar el archivo completo con todas las validaciones necesarias para verificar todos los campos que venimos usando.</p>

```python
from django import forms
from models import Articulo

from django.utils import timezone


class ArticuloForm(forms.ModelForm):

   class Meta:
      model = Articulo

   #Validamos que el autor no sea menor a 3 caracteres
   def clean_autor(self):
      diccionario_limpio = self.cleaned_data

      autor = diccionario_limpio.get('autor')

      if len(autor) < 3:
         raise forms.ValidationError("El autor debe contener mas de tres caracteres")

      return autor

   #Validamos que el titulo no sea mayor a 50 caracteres
   def clean_titulo(self):
      diccionario_limpio = self.cleaned_data

      titulo = diccionario_limpio.get('titulo')

      if len(titulo) > 50:
         raise forms.ValidationError("El titulo debe ser menor a 50 caracteres")

      return titulo

   #Validamos que el texto no sea mayor a 400 caracteres
   def clean_texto(self):
      diccionario_limpio = self.cleaned_data

      texto = diccionario_limpio.get('texto')

      if len(texto) > 400:
         raise forms.ValidationError("El texto no debe estar vacio")

      return texto

   #Validamos que la fecha no sea mayor a la fecha actual
   def clean_fecha(self):
      diccionario_limpio = self.cleaned_data

      fecha_articulo = diccionario_limpio.get('fecha')

      #Obtenemos la fecha actual
      fecha_actual = timezone.now()

      if fecha_actual < fecha_articulo:
         raise forms.ValidationError("El fecha no debe ser mayor al dia de hoy")

      return fecha_articulo
```

<hr />

<h2>Probemos nuestras validaciones</h2>

<p>Para poder probar nuestras validaciones debemos encender nuestro servidor y navegar al formulario <a href="http://127.0.0.1:8000/crear/">http://127.0.0.1:8000/crear/</a> para crear un <em>articulo</em>. Si no sabes como arrancar el servidor te invito a que visites <a href="http://codehero.co/django-desde-cero-instalacion-y-herramientas/">Django Instalación y Herramientas</a>.</p>

<p>Supongamos que colocamos datos erróneos en los campos, debería aparecernos lo siguiente:</p>

<p><img src="http://i.imgur.com/O8WISfY.png" alt="error-form-validation-django" /></p>

<blockquote>
  <p>Como pueden observar se validaron todos los campos respectivos.</p>
</blockquote>

<p>Ahora si colocamos datos correctos:</p>

<p><img src="http://i.imgur.com/xHVTYaA.png" alt="good-form-validation-django" /></p>

<blockquote>
  <p>Podemos observar que se guardo exitosamente el articulo.</p>
</blockquote>

<p>Si quieres saber mayor información sobre validadores en Django vista <a href="https://docs.djangoproject.com/en/dev/ref/forms/validation/">Uso de validadores en Django</a></p>

<hr />

<h2>Conclusión</h2>

<p>En esta lección, aprendimos como crear validadores de formularios. Los validadores nos ayudan a prevenir información errónea en nuestra app. Si tienes alguna pregunta, yo estaré feliz de responderte en los comentarios, además espero que te unas y le eches un vistazo a todo el resto de este curso.</p>

<p>¡Te espero la próxima semana!</p>
