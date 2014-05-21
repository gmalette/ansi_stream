require "bundler/gem_tasks"
require 'jasmine'
require 'coffee-script'
load 'jasmine/tasks/jasmine.rake'

task :vendorize do
  def compile(file, target)
    File.new(target, "w").write(CoffeeScript.compile(File.read(file), bare: true))
  end

  Dir['src/**/*.coffee'].each do |file|
    target = file.gsub(/^src/, "vendor/assets").gsub(/.coffee$/, ".js")
    compile(file, target)
  end

  Dir['spec/**/*.coffee'].each do |file|
    target = file.gsub(/.coffee$/, ".js")
    compile(file, target)
  end
end

task :test do
end

task default: [:vendorize, 'jasmine:ci']
