# This file is part of ChiVO, the Chilean Virtual Observatory
# Copyright (C) 2015 Jonathan Antognini Cavieres <jonathan.antognini@gmail.com>
#                    Cesar Parra Moreno <cparra@csrg.cl>
#                    Constanza Soto <constanza.soto.12@sansano.usm.cl>
#                    Jose Miguel Castro <jcastro@csrg.cl>
#                    Marco Salinas <marco.salinas.12@sansano.usm.cl>
#                    Felipe Morales <felipe.moralesm.12@sansano.usm.cl>
#                    Luis E. Arevalo R. <arevalo@luchox.cl>
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


ENV["RAILS_ENV"] ||= "test"
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'

class ActiveSupport::TestCase
  ActiveRecord::Migration.check_pending!

  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  #
  # Note: You'll currently still have to declare fixtures explicitly in integration tests
  # -- they do not yet inherit this setting
  fixtures :all

  # Add more helper methods to be used by all tests here...
end
