require 'mina/git'
require 'mina/bundler'
require 'mina/rbenv'

# Basic settings:
#   domain       - The hostname to SSH to.
#   deploy_to    - Path to deploy into.
#   repository   - Git repo to clone from. (needed by mina/git)
#   branch       - Branch name to deploy. (needed by mina/git)

set :term_mode, nil
set :domain, '192.168.1.122'
set :deploy_to, '/var/www/codehero-jekyll'
set :repository, 'git@github.com:albertogg/codehero-jekyll.git'
set :branch, 'master'

# Optional settings:
set :user, ENV['user']    # Username in the server to SSH to.
set :port, ENV['port']    # SSH port number.
set :rbenv_path, "/usr/local/rbenv"

# This task is the environment that is loaded for most commands, such as
# `mina deploy` or `mina rake`.
task :environment do
  queue %{export RBENV_ROOT=#{rbenv_path}}
  invoke :'rbenv:load'
end

# Put any custom mkdir's in here for when `mina setup` is ran.
# For Rails apps, we'll make some of the shared paths that are shared between
# all releases.
desc "Deploys the current version to the server."
task :deploy => :environment do
  deploy do
    # Put things that will set up an empty directory into a fully set-up
    # instance of your project.
    invoke :'git:clone'
    invoke :'bundle:install'
    queue "mv .env-sample .env"
    queue "rake server"
  end
end

