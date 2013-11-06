# Encoding: UTF-8

Gem::Specification.new do |s|
  s.platform          = Gem::Platform::RUBY
  s.name              = 'refinerycms-features'
  s.author            = 'fernandez.chl@gmail.com'
  s.version           = '1.0'
  s.description       = 'Ruby on Rails Features extension for Refinery CMS'
  s.date              = '2013-11-06'
  s.summary           = 'Features extension for Refinery CMS'
  s.require_paths     = %w(lib)
  s.files             = Dir["{app,config,db,lib}/**/*"] + ["readme.md"]

  # Runtime dependencies
  s.add_dependency             'refinerycms-core',    '~> 2.1.0'

  # Development dependencies (usually used for testing)
  s.add_development_dependency 'refinerycms-testing', '~> 2.1.0'
end
