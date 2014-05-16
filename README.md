# Codehero-Jekyll.

Se supone que es Codehero 2.0, más rápido, mejor y más económico.

## Dependencias.

Actualmente la versión de Ruby está dictada por lo que se encuentra en el `Gemfile`. Aquí está descrito explicitamente que la versión tiene que ser `2.0.0` sin importar la versión de parche. De igual forma este archivo README siempre estará actualizado con la última versión de Ruby y parche que se esté utilizando.

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

Primero que nada hacen un clone del proyecto. Todas las dependencias del proyecto se encuentran en el archivo llamado `Gemfile`, por lo tanto necesitamos instalar una gema o librería llamada bundler que también nos pedirá la versión de ruby que este contenga.

```sh
$ rbenv install 2.0.0-p451
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
