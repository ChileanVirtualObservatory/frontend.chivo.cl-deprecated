# This file is part of ChiVO, the Chilean Virtual Observatory
# A project sponsored by FONDEF (D11I1060)
# Copyright (C) 2015 Universidad Tecnica Federico Santa Maria
#                    Universidad de Chile
#                    Pontificia Universidad Catolica
#                    Universidad de Concepcion
#                    Universidad de Santiago
#
# This program is free software; you can redistribute it and/or modify 
# it under the terms of the GNU General Public License as published by 
# the Free Software Foundation; either version 2 of the License, or 
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 
# 02110-1301, USA or visit <http://www.gnu.org/licenses/>.


source 'https://rubygems.org'

ruby "2.1.0"

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.0.0'

# Use sqlite3 as the database for Active Record
gem 'sqlite3', group: :development
gem 'pry-rails', group: :development

group :production do
  gem 'pg'
  gem 'rails_12factor'
end

# Use SCSS for stylesheets
gem 'sass-rails', '~> 4.0.0'

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

# Use CoffeeScript for .js.coffee assets and views
gem 'coffee-rails', '~> 4.0.0'

# See https://github.com/sstephenson/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 1.2'

gem 'bootstrap-sass', '~> 3.0.2.0'
gem 'font-awesome-rails'
gem 'flexslider', path: 'vendor/flexslider'
gem 'parallax-slider', path: 'vendor/parallax-slider'
gem 'jquery-migrate-rails'
gem 'rest-client'

group :doc do
  # bundle exec rake doc:rails generates the API under doc/api.
  gem 'sdoc', require: false
end

# Use nokogiri to join VOTables 
gem  'nokogiri'

# Devise is a flexible authentication solution for Rails based on Warden
gem 'devise'

# JSON to parse all resources of DACHS
gem 'json'

# Use ActiveModel has_secure_password
# gem 'bcrypt-ruby', '~> 3.0.0'

# Use unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano', group: :development

# Use debugger
# gem 'debugger', group: [:development, :test]

gem 'remotipart', '~> 1.2'
