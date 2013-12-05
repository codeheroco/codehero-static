require 'dotenv/tasks'
# Rubygems compile rake task.
desc "compile and run the site"
task :server => :dotenv do
  env = ENV['ENV'] || "development"
  if env.eql? "production"
      system %Q{bundle exec jekyll build}
  else
    pids = [
      spawn("bundle exec jekyll serve --watch --drafts"),
      spawn("bundle exec scss --watch _assets/stylesheets:_assets/stylesheets")
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

desc "Copies everything from the bootstrap-sass gem into the proyect!"
task :update_tb do
  puts "Are you sure you want to update twitter bootstrap? [yn]"
  case $stdin.gets.chomp
  when 'y'
    puts "Copying..."
    sh "cp -r $(bundle show bootstrap-sass)/vendor/assets/stylesheets/bootstrap/* _assets/stylesheets/bootstrap/"
    sh "cp -r $(bundle show bootstrap-sass)/vendor/assets/javascripts/bootstrap/* _assets/javascript/bootstrap/"
    sh "cp -r $(bundle show bootstrap-sass)/vendor/assets/fonts/bootstrap/* fonts/bootstrap/"
    sh "rm _assets/stylesheets/bootstrap/bootstrap.scss"
    puts "Copied!"
  when 'n'
    puts "Aborting..."
  end
end
