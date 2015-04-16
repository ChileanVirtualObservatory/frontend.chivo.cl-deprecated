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


Web::Application.routes.draw do
  devise_for :users
  root to: 'home#index'
  #get 'about', to: 'home#about'
  #get 'institutions', to: 'home#institutions'
  #get 'workshop-program', to: 'home#workshop-program'
  
  match 'query/conesearch' => 'query#conesearch', via: [:get, :post]
  match 'query/imagesearch' => 'query#imagesearch', via: [:get, :post]
  match 'query/spectralsearch' => 'query#spectralsearch', via: [:get, :post]
  #match 'query/tablesearch' => 'query#tablesearch', via: [:get, :post]
  #match 'query/advancesearch' => 'query#advancesearch', via: [:get, :post]
  #match 'query/all_searches' => 'query#all_searches', via: [:get, :post]

  #match 'form_option/option1' => 'form_option#option1', via: [:get]
  #match 'form_option/option2' => 'form_option#option2', via: [:get]
  #match 'form_option/option3' => 'form_option#option3', via: [:get]
  #match 'form_option/alma' => 'form_option#alma', via: [:get]
  #match 'form_option/alma2' => 'form_option#alma2', via: [:get]

  #match 'all_news' => 'news#all_news', via: [:get]
  #match 'undergraduate_thesis' => 'news#undergraduate_thesis', via: [:get]
  #match 'workshop_august_2014' => 'news#workshop_august_2014', via: [:get]
  #match 'chilean_joins_international_virtual_observatory' => 'news#chilean_joins_international_virtual_observatory', via: [:get]
  #match 'chilean_development_of_astronomical_computing_for_alma' => 'news#chilean_development_of_astronomical_computing_for_alma', via: [:get]
  #match 'ivoa_newsletter_012_may_2014' => 'news#ivoa_newsletter_012_may_2014', via: [:get]
  #match 'spie_astronomical_telescopes_instrumentation_2014' => 'news#spie_astronomical_telescopes_instrumentation_2014', via: [:get]
end
