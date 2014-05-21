# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'ansi_stream/version'

Gem::Specification.new do |spec|
  spec.name          = "ansi_stream"
  spec.version       = AnsiStream::VERSION
  spec.authors       = ["Guillaume Malette"]
  spec.email         = ["gmalette@gmail.com"]
  spec.summary       = %q{Javascipt to colorize HTML with span}
  spec.description   = %q{Javascipt to colorize HTML with span}
  spec.homepage      = ""
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0")
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.6"
  spec.add_development_dependency "rake"
  spec.add_development_dependency "jasmine"
  spec.add_development_dependency "phantomjs", "~> 1.8"
  spec.add_development_dependency "coffee-script"
end
