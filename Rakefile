require 'dotenv/tasks'
require 'fileutils'
require 'colorator'
require 'active_support/core_ext'

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

desc "Copies everything from the bootstrap-sass gem into the project!"
task :update_tb do
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
task :update_fa do
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

desc "Creating a new draft for post"
task :new_draft do
  print "Cual es el nombre del post que desea redactar? E.j: Rebase y Stash \n"
  @name = STDIN.gets.chomp

  print "¿Número de días que restan para que salga el post? E.j: 2\n"
  @dias = STDIN.gets.chomp
  @fecha_relativa = Time.now + @dias.to_i.days
  @fecha_relativa = @fecha_relativa.strftime("%F")
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

  print "El post está contenido en una serie? [y/n] \n"
  @pertenece = STDIN.gets.chomp
  if @pertenece == 'y'
    print <<-series

Seleccione el nombre de la serie a la que pertenece el post:

  1) Sinatra desde Cero
  2) Ruby on Rails desde Cero
  3) MongoDB desde Cero
  4) jQuery desde Cero
  5) PHP desde Cero
  6) Laravel 4 desde Cero
  7) Node.js desde Cero
    series
    case STDIN.gets.chomp
    when "1"
      @serie = "Sinatra desde Cero"
    when "2"
      @serie = "Ruby on Rails desde Cero"
    when "3"
      @serie = "MongoDB desde Cero"
    when "4"
      @serie = "jQuery desde Cero"
    when "5"
      @serie = "PHP desde Cero"
    when "6"
      @serie = "Laravel 4 desde Cero"
    when "7"
      @serie = "Node.js desde Cero"
    else
      @serie = "Otra serie"
    end
  end

  @slug = "#{@serie} #{@name}"
  @slug = @slug.downcase.strip.gsub(' ', '-')
  FileUtils.touch("_drafts/#{@fecha_relativa}-#{@slug}.md")
  open("_drafts/#{@fecha_relativa}-#{@slug}.md", 'a' ) do |file|
    file.puts "---"
    file.puts "layout: post"
    file.puts "status: publish"
    file.puts "title: #{@name}"
    file.puts "author: #{@autor}"
    file.puts "author_login: #{@handle}"
    file.puts "date: #{@fecha_relativa}"
    file.puts "description: Escribir una descripción menor a 155 caracteres aquí."
    if @pertenece == 'y'
      file.puts "serie: #{@serie}"
      file.puts "categories:"
      file.puts "- Cursos"
      file.puts "tags:"
      file.puts "- #{@serie}"
    else
      file.puts "categories:"
      file.puts "- Cómo lo hago"
      file.puts "tags:"
      file.puts "thumbnail:"
    end
    file.puts "---"
    file.puts "Aquí el contenido"
  end
end
