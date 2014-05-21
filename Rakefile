require "bundler/gem_tasks"
require 'jasmine'
require 'coffee-script'
require 'fileutils'
load 'jasmine/tasks/jasmine.rake'

task :compile do
  def compile(file, target)
    File.new(target, "w").write(CoffeeScript.compile(File.read(file), bare: true))
  end

  def compile_dir(source_dir, target_dir)
    FileUtils.mkdir_p target_dir

    Dir["#{source_dir}/**/*.coffee"].each do |file|
      target = "#{target_dir}/#{File.basename(file, ".coffee")}.js"
      compile(file, target)
    end
  end

  compile_dir('vendor', 'tmp/assets')
  compile_dir('spec', 'tmp/spec')
end

task :test do
end

task default: [:compile, 'jasmine:ci']
