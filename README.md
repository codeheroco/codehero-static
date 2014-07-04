# Codehero Static

Codehero estático.

## Wiki

Tenemos el Información particular en el [wiki][wiki].

## Detalles de instalación

Para instalar el blog en su máquina tenemos las instrucciones en un [wiki de instalación][wiki-inst].

## ¿Cómo correr el servidor?

Hay dos formas que funcionan perfectamente. Nosotros utilizamos un Rake task o el comando natural de Jekyll.

Para utilizar el rake task:
```sh
$ rake server
```

Comando de Jekyll
```sh
$ bundle exec jekyll serve --watch --drafts --limit_posts 15
```

Limitamos los posts para que Jekyll no demore tanto en regenerar el blog.

## Contribución

- Clonar el Repositorio
- Efectuar cambios en repositorio clonado
- Hacer pull-request a master

[wiki]: https://github.com/albertogg/codehero-jekyll/wiki
[wiki-inst]: https://github.com/albertogg/codehero-jekyll/wiki/detalles-de-instalacion.md
