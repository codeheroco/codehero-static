# Rubygems compile rake task.
desc "compile and run the site"
task :server do
  pids = [
    spawn("jekyll serve --watch --drafts"),
    spawn("bundle exec compass watch")
  ]

  trap "INT" do
    Process.kill 0, *pids
    exit 0
  end

  loop do
    sleep 1
  end
end
