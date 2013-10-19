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
