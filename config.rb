require 'bootstrap-sass'
require 'dotenv'
Dotenv.load

environment = ENV['ENV'].to_sym || :development
project_type = :stand_alone
relative_assets = true
output_style = (environment.eql? :production) ? :compressed : :expanded
css_dir = "assets/stylesheets/"
sass_dir = css_dir
javascripts_dir = "assets/javascript/"
images_dir = "assets/images/"
fonts_dir = "assets/fonts/"
