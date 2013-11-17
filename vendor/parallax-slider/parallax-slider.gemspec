# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'parallax/slider/version'

Gem::Specification.new do |spec|
  spec.name          = "parallax-slider"
  spec.version       = Parallax::Slider::VERSION
  spec.authors       = ["Christopher Fernández"]
  spec.email         = ["fernandez.chl@gmail.com"]
  spec.description   = %q{Parallax Slider javascript plugin}
  spec.summary       = %q{Parallax Slider javascript plugin}
  spec.homepage      = ""
  spec.license       = "MIT"

  spec.files         = Dir["{lib,vendor}/**/*"]
  spec.require_paths = ["lib"]

  spec.add_dependency "railties", ">= 3.1.0"
  spec.add_development_dependency "sprockets-rails", "~> 2.0.0"
end
