---
layout: post
status: publish
published: true
title: Cómo Instalar y Configurar Chef
author: Jonathan Wiesel
author_login: jonathan
author_email: jonathan@codehero.co
author_url: http://jonathanwiesel.com/
wordpress_id: 1623
wordpress_url: http://codehero.co/?p=1623
date: 2013-07-23 00:00:29.000000000 -04:30
thumbnail: http://i.imgur.com/j5VGZcA.png
categories:
- Cómo lo hago
- Chef
tags:
- howto
- vagrant
- chef
- suministro
---
#Cómo Lo Hago: Instalar y configurar Chef

[La semana pasada hablamos de Vagrant](http://codehero.co/como-instalar-y-configurar-vagrant/), una herramienta muy útil que cumple el propósito de facilitar el proceso de construcción de ambientes virtuales de manera automatizada; sin embargo la instalación de software y su configuración en los ambientes es quizás una de las tareas más importantes de este proceso, es por ello que esta semana hablaremos de una de las más utilizadas herramientas de automatización y suministro, **Chef**.

***
##¿Qué es Chef?
Es un *framework* de automatización de infraestructura de sistemas, esto permite desplegar aplicaciones y sistemas a cualquier ambiente físico, virtual o en la nube fácilmente con un enfoque en la preparación de instalación y configuración previa del ambiente. Como su nombre lo indica, la herramienta pretende seguir un conjunto de pasos o **recetas** con el propósito de presentar un producto final ya listo para trabajar y/o probar.

Existen 2 tipos de versiones:

**Chef Server** está enfocado a ser el servidor central que, en comunicación con los equipos de trabajo, permite suministrar a los diferentes ambientes o **nodos** con las diversas configuraciones que sean necesarias, las cuales se mantienen alojadas en el servidor. Además ofrece varias ventajas particulares del trabajo de varios nodos como balanceo de carga, escalabilidad, búsquedas rápidas por tipo (*Ej. todos los ambientes Ubuntu Precise, o todos los ambientes con 4GB de RAM*), y mucho más.

Por el contrario, **Chef Solo** es la versión de código abierto y reside localmente en el nodo, esto quiere decir que toda la información y recetas necesarias para configurar el nodo deben estar presentes en su disco duro.


>Para nuestro caso, esta última será la versión que utilizaremos a lo largo de este escrito.

***

##¿De qué esta compuesto?
Como mencionamos anteriormente se encuentran los servidores finales llamados **Nodos**, los cuales son los principales destinos de todo el proceso que se ejecutará, además tenemos las **Estaciones de Trabajo**, como su nombre lo indica, es el sistema que los desarrolladores manipulamos directamente para crear las piezas que luego serán desplegadas a los nodos.

También tenemos las **Recetas**, son archivos escritos en lenguaje [Ruby](http://codehero.co/ruby-desde-cero-variables-y-objetos-2/) que ejecutan una serie de comandos para instalar y configurar software, mientras que un conjunto de recetas relacionadas con un mismo procedimiento se denomina **Recetario**. Supongamos el caso de un sencillo servidor web, tendríamos una receta que instale Nginx y otra MySQL, podríamos crear un recetario llamado `simple web server cookbook` que contenga estas recetas.

A la configuración reutilizable a implementar en cada nodo se le denomina **Rol**, retomando el ejemplo del servidor web, quisiéramos que cualquier nodo con dicho tipo de rol sea configurado para tener abierto los puertos 80 y 443 (http y https) y que se instale Nginx (mediante una receta), en este caso se crea un rol para el cual se especificarán los atributos involucrados (como los puertos abiertos) y las recetas a utilizar (como la de instalación de Nginx).

Hablando del tema de almacenamiento, entra en juego el **Repositorio Chef**, también denominado **Cocina** este se encarga de reunir toda ese código fuente de instalaciones y configuraciones que creamos en nuestras estaciones de trabajo, por lo que es altamente recomendable que sea sincronizado con un control de versiones como [Git.](http://codehero.co/git-desde-cero-instalacion-configuracion-y-comandos-basicos/)

***

##Complementos

**Knife**, el cuchillo de Chef, es una herramienta de linea de comandos que provee una interface de comunicación entre el repositorio Chef que tenemos localmente en nuestra estación de trabajo y el Chef Server. En nuestro caso como estaremos utilizando Chef Solo, necesitaremos la versión particular de **Knife Solo**, debido a que el enfoque *"Solo"* refiere a que no existe un Chef Server sino que nuestro propio nodo actúa como tal, siguiendo el concepto de Knife, su versión *Solo* nos ofrece una interface de comunicación directa con otros nodos.

**Librarian**, el bibliotecario, nos ofrece un manejo de dependencias de los recetarios en el repositorio,  además de facilitar el manejo e recetarios fuera de él, ofreciendo la gran ventaja de utilizar el código de los mismos directo desde la fuente.

Y por supuesto **[Vagrant](http://codehero.co/como-instalar-y-configurar-vagrant/)**, el cual se integra muy bien con Chef, en caso de que quieras desplegar a ambientes virtuales esta herramienta te ayudará a crearlos con una enorme facilidad, de lo contrario igual le puedes sacar gran provecho al crear un ambiente virtual *"conejillo de indias"* para probar tus configuraciones y recetas de Chef.

***

##¿Cómo comienzo?

[Instalemos Vagrant y creemos un ambiente virtual de prueba](http://codehero.co/como-instalar-y-configurar-vagrant/), posteriormente procedemos a instalar el resto de los componentes que nos harán falta (se recomienda tener una versión de Ruby superior a 1.9.2):

```sh
$ gem install knife-solo
```

Basta con solo instalar knife-solo debido a que entre sus dependencias se encuentran Chef y Librarian.

Luego creemos un directorio para nuestra ***cocina*** e iniciémosla:

```sh
$ knife configure -r . --defaults
$ knife solo init .
```

Esto hará que *knife* cree una archivo de configuración básico (utilizado principalmente en Chef Server pero si no lo creamos Knife no nos dejará trabajar) y construya la estructura de directorios y archivos que sigue los estándares de Chef para definir una *cocina*.

Ahora crearemos con Librarian el archivo ***Cheffile*** que nos permitirá manejar los recetarios:

```sh
$ librarian-chef init
```

Ahora procedemos a abrir el nuevo *Cheffile* y le indicamos algunos recetarios a usar, puedes [ingresar al portal de Opscode y ver todos los que tienen disponibles](http://community.opscode.com/cookbooks), para nuestro ejemplo seguiremos el caso del servidor web sencillo así que agregaremos la siguiente línea al archivo:

```sh
cookbook 'nginx', :git => 'http://github.com/opscode-cookbooks/nginx'
```

En este caso estamos asignando el recetario de Nginx, notemos además que hemos especificado el repositorio Git donde se debe buscar el código fuente del mismo, si no especificamos este parámetro Librarian lo buscará en el sitio especificado en la variable `site`, en este caso sería el sitio del API de la comunidad de Opscode (`site 'http://community.opscode.com/api/v1'`).

Finalmente dejamos que Librarian se encargue de buscar y descargar las recetas que necesitamos:

```sh
$ librarian-chef install

Installing apt (2.0.0)
Installing build-essential (1.4.0)
Installing ohai (1.1.10)
Installing yum (2.3.0)
Installing runit (1.1.6)
Installing nginx (1.7.1)

$ ls cookbooks

apt
build-essential
nginx
ohai
runit
yum
```

Como podemos notar, Librarian ha instalado los recetarios que especificamos y además se encargó de instalar sus dependencias. Ahora las podremos encontrar en el directorio *cookbooks*.

***

##Nodo normal

Crearemos nuestro primer nodo, supongamos que este no tiene el soporte nativo para el suministro de Chef, para esto usaremos nuestro ambiente conejillo de indias de Vagrant sin hacer uso del dicha funcionalidad. Editemos el Vagrantfile y verifiquemos que el script de suministro que teníamos en el tutorial de Vagrant esté comentado:

```sh
# config.vm.provision :shell, :path => "instala_apache.sh"
```

Para crear el nodo debemos especificar la dirección en la que se encuentra y su nombre de usuario, para esto debemos agregar la siguiente línea al Vagrantfile y colocar algo así:

```sh
config.vm.network :private_network, ip: "192.168.33.10"
```

Esto le asignará una dirección IP estática al ambiente virtual (no tiene que ser esta misma), lo cual nos permitirá acceder a él una vez esté instalado un servidor web, además necesitamos esta dirección para crear el nodo.

Ahora sabiendo esta IP podremos crear el nodo:

```sh
$ knife solo prepare vagrant@192.168.33.10
```

> El nombre de usuario y contraseña por defecto del ambiente es `vagrant`.

Esto detectará automáticamente la versión del sistema operativo que se encuentra en el servidor e instalará Chef, Ruby y Rubygems en él, con la intención de preparar el ambiente para el suministro que se llevará a cabo.

Este proceso creará el directorio `/nodes` un archivo cascarón .json para que especifiquemos la configuración e instalación, si lo abrimos veremos que se encuentra casi vacío, lo que nos da entrada a jugar con la configuración, agreguemos algunos detalles:

```json
{
  "nginx": {
    "version": "1.2.3",
    "source": {
      "modules": ["http_ssl_module"]
    }
  },
  "run_list": [
    "recipe[nginx::source]"
  ]
}
```

La variable *run_list* posee los roles o recetas a instalar en el nodo, en este caso instalaremos la receta *source* del recetario Nginx. En la parte superior podemos especificar diferentes atributos que tomarán las recetas, en este caso especificamos la versión de Nginx y que queremos que se incluya el modulo de SSL.

Por último debemos suministrar al ambiente con nuestra cocina y la configuración de recetas que hemos creado:

```sh
$ knife solo cook vagrant@192.168.33.10
```

Para verificar que en efecto se ha instalado la receta de Nginx que especificamos, vayamos al explorador de internet y verifiquemos la dirección del servidor:

![](http://i.imgur.com/sKzWVcD.png)

Notemos que la parte inferior refleja que, en efecto, Nginx v1.2.3 está instalado y está sirviéndonos esta página 404.

###¿Cuál es la desventaja de este método?

Debido a que el suministro del ambiente se hace en vivo con *knife*, si el ambiente es destruido perderemos la configuración y tendremos que volver a suministrarlo utilizando:

```sh
$ knife solo bootstrap vagrant@192.168.33.10
```

>Este comando es equivalente a hacer `prepare` y luego `cook`.

***
##Nodo Vagrant con soporte nativo

>Debido a una incompatibilidad entre la versión de Chef que trae la caja de Vagrant que usamos en el tutorial pasado y la ultima versión del recetario *apt* nos vemos en la necesidad de editar el Cheffile y usar recetarios más antiguos, quedando de la siguiente manera:

>```sh
>site 'http://community.opscode.com/api/v1'
>cookbook 'runit', '~> 0.16.2' #necesario para nginx
>cookbook 'nginx', '~> 1.1.2'
>```

>Luego, usando Librarian, volvemos a construir los recetarios:

>```sh
>$ librarian-chef install
>Installing build-essential (1.4.0)
>Installing ohai (1.1.10)
>Installing nginx (1.1.4)
>Installing runit (0.16.2)
>```

Ahora retomando nuevamente el paso, construimos nuestro archivo .json con la misma estructura que el método anterior y la guardamos en el directorio `/nodes`:

####vagrant_node.json
```json
{
  "nginx": {
    "version": "1.2.3",
    "source": {
      "modules": ["http_ssl_module"]
    }
  },
  "run_list": [
    "recipe[nginx::source]"
  ]
}
```

Ahora debemos editar el Vagrantfile y agregar lo siguiente:
```sh
VAGRANT_JSON = JSON.parse(Pathname(__FILE__).dirname.join('nodes', 'vagrant_node.json').read)

   config.vm.provision :chef_solo do |chef|
     chef.cookbooks_path = "cookbooks"
     chef.roles_path = "roles"
     chef.data_bags_path = "data_bags"
     chef.provisioning_path = "/tmp/vagrant-chef"

     chef.run_list = VAGRANT_JSON.delete('run_list')
     chef.json = VAGRANT_JSON
   end
```

Lo que hemos colocado en el Vagrantfile es la configuración de suministro nativa de Chef que ofrece Vagrant y la relacionamos con los directorios de nuestra cocina y el archivo json que dictará la configuración e instalación de las piezas de software. Este procedimiento será ejecutado durante el período de levantamiento del ambiente, probémoslo ahora:

```sh
$ vagrant up
...
```

En la salida que va expulsando el terminal mientras se levanta el ambiente podremos notar acciones referentes al proceso de suministro como por ejemplo:

```sh
Generating chef JSON and uploading...
Running chef-solo...
…
[2013-07-23T03:22:50+00:00] INFO: *** Chef 10.14.2 ***
[2013-07-23T03:22:52+00:00] INFO: Setting the run_list to ["recipe[nginx::source]"] from JSON
[2013-07-23T03:22:52+00:00] INFO: Run List is [recipe[nginx::source]]
[2013-07-23T03:22:52+00:00] INFO: Run List expands to [nginx::source]
…
[2013-07-23T03:22:55+00:00] INFO: directory[/etc/nginx] created directory /etc/nginx
…
[2013-07-23T03:22:55+00:00] INFO: directory[/var/log/nginx] created directory /var/log/nginx
…
[2013-07-23T03:22:55+00:00] INFO: directory[/etc/nginx/sites-available] created directory /etc/nginx/sites-available
…
[2013-07-23T03:22:55+00:00] INFO: directory[/etc/nginx/sites-enabled] created directory /etc/nginx/sites-enabled
…
[2013-07-23T03:22:55+00:00] INFO: directory[/etc/nginx/conf.d] created directory /etc/nginx/conf.d
…
[2013-07-23T03:23:54+00:00] INFO: Processing remote_file[http://nginx.org/download/nginx-1.2.3.tar.gz] action create (nginx::source line 58)
…
…
[2013-07-23T03:24:05+00:00] INFO: link[/etc/service/nginx] created
...
[2013-07-23T03:25:15+00:00] INFO: Processing service[nginx] action restart (nginx::source line 172)
[2013-07-23T03:25:16+00:00] INFO: service[nginx] restarted
[2013-07-23T03:25:16+00:00] INFO: template[nginx.conf] sending reload action to service[nginx] (delayed)
[2013-07-23T03:25:16+00:00] INFO: Processing service[nginx] action reload (nginx::source line 82)
[2013-07-23T03:25:16+00:00] INFO: service[nginx] reloaded
[2013-07-23T03:25:16+00:00] INFO: bash[compile_nginx_source] sending restart action to service[nginx] (delayed)
[2013-07-23T03:25:16+00:00] INFO: Processing service[nginx] action restart (nginx::source line 82)
[2013-07-23T03:25:17+00:00] INFO: service[nginx] restarted

[2013-07-23T03:25:17+00:00] INFO: Chef Run complete in 144.99354 seconds
```

###¿Cuál es la ventaja de este método?

Debido a que el suministro se hace durante el proceso de levantamiento y que la configuración de dicho suministro está ligada al Vagrantfile, no importa si los ambientes son destruidos, con solo ejecutar `vagrant up` nuevamente tendremos nuestro ambiente virtual previamente configurado.

***
##Conclusión

Aprendimos que instalar y configurar software en diferentes ambientes puede ser una tarea menos tediosa de lo que estamos acostumbrados, el truco está en construir correctamente todas las piezas que necesitamos para al suministrar a un ambiente podamos empezar a trabajar de una vez. Muchas otras cosas son posibles con Chef, puedes crear tus propias recetas, crear tus roles completamente personalizados para cuando necesites implementar la misma configuración en varios ambientes, y mucho más.


