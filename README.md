# Codehero-Jekyll.

Se supone que es Codehero 2.0, más rápido, mejor y más económico.

## Dependencias.

Actualmente hay un archivo llamado `.ruby-version` en el repositorio,
probablemente si usan un manejador de versiones de ruby como (rbenv, chruby o
rvm) no tengan ninguna dificultad para instalar esta versión (se vale llamarme
si tienen un peo).

- Ruby 2.0.0-p247
- Bundler

## Instalación

Primero que nada hacen un clone del proyecto. Todas las dependencias del proyecto
se encuentran en el archivo `Gemfile`, por lo tanto instalalar es cosa de bundler.

Sino tienen bundler:
```sh
$ gem install bundler
```

Luego de que lo tengan instalado:
```sh
$ bundle install
```

## Variables de entorno.

Por el momento no es necesario crear esto, aunque es lo recomendable.

```sh
$ cp .env-sample .env
```

El archivo `.env` está en el `.gitignore` no se debería subir.

Luego cambian la variable `ENV` a development. La diferencia entre producción y
development es el css minificado y que el servidor se queda escuchando por
cambios en los archivos por ahora.

Cabe destacar que a medida que se necesiten más variables se irán agregando.

## ¿Cómo correr el servidor?

```sh
$ rake server
$ open http://localhost:3000
```

## ¿Cómo se realiza un deploy en producción?

Se hará con [mina](http://nadarei.co/mina/) por ahora no hay nada, pero
seguramente será un `rake task`, algo como `rake deploy`.

## Git y Contribución.

Por amor a cristo no vuelvan mierda el repo.

Se pueden ir a la puta madre, si:

- hacen un `git push -f`
- Sino utilizan `git pull --rebase`
- Suben archivos con trailing whitespaces.

