# encoding: utf-8

require 'dotenv/tasks'
require 'fileutils'
require 'colorator'
require 'active_support/core_ext'
require 'yaml'

SERIES = Array.new
DRAFTS = Array.new
POST_DIRECTORIES = Array.new

# Rubygems compile rake task.
desc "compile and run the site"
task :server => :dotenv do
  env = ENV['ENV'] || "development"
  if env.eql? "production"
      system %Q{bundle exec jekyll build}
  else
    pids = [
      spawn("bundle exec jekyll serve --watch --drafts")
    ]

    trap "INT" do
      Process.kill 0, *pids
      exit 0
    end

    loop do
      sleep 1
    end
  end
end

def abort_with(message = nil)
  $stdout.puts message.red
  abort
end

YAML::load(File.open("_data/series.yml")).each do |serie|
  if serie['status'] == '(Serie en Progreso)'
    SERIES << serie['name']
  end
end

def dir_directories(array, dir)
  unless array.any?
    Dir.foreach(dir) do |fname|
      next if fname == '.' or fname == '..' or fname == '.keep'
      array.push(fname)
    end
  end
end

def print_array(array)
  i = 1
  array.each do |name|
    puts "#{i}) #{name}"
    i += 1
  end
end

namespace :upgrade do
  desc "Copies everything from the bootstrap-sass gem into the project!"
  task :twitter_bootstrap do
    puts "Are you sure you want to update twitter bootstrap? [y/n]"
    case $stdin.gets.chomp
    when 'y'
      begin
        puts "Copying..."
        sh "cp -r $(bundle show bootstrap-sass)/vendor/assets/stylesheets/bootstrap/* _assets/stylesheets/bootstrap/"
        sh "cp -r $(bundle show bootstrap-sass)/vendor/assets/javascripts/bootstrap/* _assets/javascript/bootstrap/"
        sh "cp -r $(bundle show bootstrap-sass)/vendor/assets/fonts/bootstrap/* _assets/fonts/bootstrap/"
        sh "mv _assets/stylesheets/bootstrap/bootstrap.scss _assets/stylesheets/bootstrap/_bootstrap.scss"
        puts "Copied!"
      rescue
        abort_with "The bootstrap-sass gem may not be installed!"
      end
    when 'n'
      puts "Aborting..."
    end
  end

  desc "Copies everything from the font-awesome-sass gem into the project!"
  task :font_awesome do
    puts "Are you sure you want to update FontAwesome? [y/n]"
    case $stdin.gets.chomp
    when 'y'
      begin
        puts "Copying..."
        sh "cp -r $(bundle show font-awesome-sass)/vendor/assets/stylesheets/font-awesome/* _assets/stylesheets/font-awesome/"
        sh "cp $(bundle show font-awesome-sass)/vendor/assets/stylesheets/font-awesome.scss _assets/stylesheets/font-awesome/"
        sh "mv _assets/stylesheets/font-awesome/font-awesome.scss _assets/stylesheets/font-awesome/_font-awesome.scss"
        sh "cp -r $(bundle show font-awesome-sass)/vendor/assets/fonts/* _assets/fonts/font-awesome/"
        puts "Copied!"
      rescue
        abort_with "The font-awesome-sass gem may not be installed!"
      end
    when 'n'
      puts "Aborting..."
    end
  end
end

namespace :draft do
  desc "This task will guide you on the process of creating a new draft post"
  task :new do
    puts "Cual es el nombre del post que desea redactar? E.j: Rebase y Stash"
    @name = STDIN.gets.chomp

    print <<-eos

  Seleccione el nombre del Autor marcando el número que lo representa:

    1) Alberto
    2) Jonathan
    3) Oscar
    4) Ramses
    5) Carlos
    eos
    case STDIN.gets.chomp
    when "1"
      @autor = "Alberto Grespan"
      @handle = "albertogg"
    when "2"
      @autor = "Jonathan Wiesel"
      @handle = "jonathan"
    when "3"
      @autor = "Oscar González"
      @handle = "oscar"
    when "4"
      @autor = "Ramses Velasquez"
      @handle = "ramses"
    when "5"
      @autor = "Carlos Picca"
      @handle = "carlos"
    else
      @autor = "Otro Autor"
      @handle = "otro"
    end

    puts "El post está contenido en una serie? [y/n]"
    @pertenece = STDIN.gets.chomp
    if @pertenece == 'y'
      puts "Seleccione el nombre de la serie a la que pertenece el post:"

      print_array(SERIES)
      belong_to_serie = STDIN.gets.chomp
      @serie = SERIES.fetch(belong_to_serie.to_i - 1)
    end

    print <<-dificultad
  Seleccione mediante el número la dificultad del post:

    1) Novato
    2) Aprendiz
    3) Intermedio
    4) Avanzado
    5) Heroe
    dificultad
    case STDIN.gets.chomp
    when "1"
      @dificultad = "Novato"
    when "2"
      @dificultad = "Aprendiz"
    when "3"
      @dificultad = "Intermedio"
    when "4"
      @dificultad = "Avanzado"
    else
      @dificultad = "Heroe"
    end

    puts "Introduzca la duración en minutos que se demora en leer el post:"
    @duracion = STDIN.gets.chomp

    puts "El post tiene repo en Github? [y/n]"
    case STDIN.gets.chomp
    when 'y'
      puts "Introduzca el URL completo al repo:"
      @github = STDIN.gets.chomp
    else
      @github = 'n'
    end

    @slug = "#{@serie} #{@name}"
    @slug = @slug.tr('ÁáÉéÍíÓóÚú', 'AaEeIiOoUu')
    @slug = @slug.downcase.strip.gsub(' ', '-')
    File.open("_drafts/#{@slug}.md", 'a' ) do |file|
      file.puts "---"
      file.puts "layout: post"
      file.puts "status: publish"
      file.puts "title: #{@name}"
      file.puts "author: #{@autor}"
      file.puts "author_login: #{@handle}"
      file.puts "description: Escribir una descripción menor a 155 caracteres aquí."
      file.puts "dificultad: #{@dificultad}"
      file.puts "duracion: #{@duracion}"
      unless @github == 'n'
        file.puts "github: #{@github}"
      end
      if @pertenece == 'y'
        file.puts "serie: #{@serie}"
        file.puts "categories:"
        file.puts "- Cursos"
        file.puts "- #{@serie}"
        file.puts "tags:"
        file.puts "- #{@serie}"
      else
        file.puts "thumbnail:"
        file.puts "categories:"
        file.puts "tags:"
      end
      file.puts "---"
    end
  end

  desc "This task will guide you on the process of copying the draft to the posts folder"
  task :ready do
    puts "Nombres de posts que se encuentran en la carpeta drafts"
    dir_directories(DRAFTS, "_drafts")
    print_array(DRAFTS)
    puts "Seleccione el archivo a publicar:"
    selected_draft = STDIN.gets.chomp
    @publish = DRAFTS.fetch(selected_draft.to_i - 1)
    puts "Listado de directorios (series) donde es posible publicar el draft:"
    dir_directories(POST_DIRECTORIES, "_posts")
    print_array(POST_DIRECTORIES)
    puts "Introduzca el nombre del directorio (de la lista antes mostrada) a donde desea copiar el draft:"
    selected_directory = STDIN.gets.chomp
    @copy_dir = POST_DIRECTORIES.fetch(selected_directory.to_i - 1)
    puts "¿Número de días que restan para que salga el post? E.j: 2"
    @dias = STDIN.gets.chomp
    @post_date = Time.now + @dias.to_i.days
    @post_date = @post_date.strftime("%F")
    FileUtils.mv("_drafts/#{@publish}", "_posts/#{@copy_dir}/#{@post_date}-#{@publish}")
    puts "Publicando artículo... moviendo draft a la carpeta de _posts/#{@copy_dir}"
  end
end
