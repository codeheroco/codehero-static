# Codehero-Jekyll.

Se supone que es Codehero 2.0, más rápido, mejor y más económico.

## Dependencias.

Actualmente hay un archivo llamado `.ruby-version` en el repositorio,
probablemente si usan un manejador de versiones de ruby como (rbenv, chruby o
rvm) no tengan ninguna dificultad para instalar esta versión (se vale llamarme
si tienen un peo).

- Ruby 2.0.0-p451
- Bundler

Si estan usando rbenv:
```sh
$ brew update
$ brew upgrade rbenv ruby-build rbenv-gem-rehash
```

Si lo quieren instalar:
```sh
$ brew update
$ brew install rbenv ruby-build rbenv-gem-rehash
```

> Deben exportar `if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi` en `.bashrc` o `.zshrc`.

Cuando termine la instalación reinicien la consola. **La cierran y la vuelven a
abrir** o si estan en zsh:
```sh
$ exec $SHELL -l
```

Si están en bash:
```sh
$ bash -l
```

Revisen la instalación completa en el [README de rbenv para Mac](https://github.com/sstephenson/rbenv#homebrew-on-mac-os-x)
o simplemente lean [toda la instalación](https://github.com/sstephenson/rbenv#installation).

## Instalación

Primero que nada hacen un clone del proyecto. Todas las dependencias del proyecto
se encuentran en el archivo `Gemfile`, por lo tanto instalalar es cosa de bundler.

Luego instalan la versión de ruby del archivo `.ruby-version`. ***Este archivo
estará disponible una vez que hayan clonado el repositorio en su maquina.***

```sh
$ rbenv install | xargs cat .ruby-version
```

Cuando termine de instalar esa versión de ruby la setean como la versión por
defecto a utilizar en su maquína. En este caso es la versión `2.0.0-p451`
```sh
$ rbenv global 2.0.0-p451
```

Revisan que sea la versión por defecto y listo.
```sh
$ ruby -v # ruby 2.0.0p451 (2014-02-24 revision 45167) [x86_64-darwin13.1.0]
```

Continuamos con la instalación del aplicativo y no de ruby.

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

Luego cambian la variable dentro del archivo `.env`:

```sh
ENV=development
```

La diferencia entre producción y development es el css minificado y que el
servidor se queda escuchando por cambios en los archivos por ahora.

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

Para que no se vuelva mierda el repo la mejor manera para contribuir es la
siguiente:

- Crear una rama local (feature branch).
- Trabajar de manera local en esa rama.
- Realizar todos los commits que desean o son necesarios.
- Cuando terminan hacen `push` de la rama local al repo remoto.
- Crean un `pull request` de los cambios realizados. (así vemos facilmente los cambios)
- Todos verificamos que los commits no rompen nada.
- (Opcional) Si alguien quiere corregir algo lo hace.
- Se hace un `merge` de la rama en `master` se borra el feature branch.
- Repetir el proceso.

Se pueden ir a la puta madre, si:

- hacen un `git push -f` para subir un commit de manera forzada.
- Si no utilizan `git pull --rebase` para descargar el remote.
- Suben archivos con trailing whitespaces.

