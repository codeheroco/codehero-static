require 'dotenv/tasks'
require 'colorator'

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
      sh "cp -r $(bundle show bootstrap-sass)/vendor/assets/fonts/bootstrap/* fonts/bootstrap/"
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
      sh "cp -r $(bundle show font-awesome-sass)/vendor/assets/fonts/* fonts/font-awesome/"
      puts "Copied!"
    rescue
      abort_with "The font-awesome-sass gem may not be installed!"
    end
  when 'n'
    puts "Aborting..."
  end
end
