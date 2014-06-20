Web::Application.routes.draw do
  devise_for :users
  root to: 'home#index'
  get 'about', to: 'home#about'
  get 'institutions', to: 'home#institutions'
  get 'workshop-program', to: 'home#workshop-program'
  
  match 'query/conesearch' => 'query#conesearch', via: [:get, :post]
  match 'query/imagesearch' => 'query#imagesearch', via: [:get, :post]
  match 'query/spectralsearch' => 'query#spectralsearch', via: [:get, :post]
  match 'query/tablesearch' => 'query#tablesearch', via: [:get, :post]
  match 'query/advancesearch' => 'query#advancesearch', via: [:get, :post]

  match 'form_option/option1' => 'form_option#option1', via: [:get]
  match 'form_option/option2' => 'form_option#option2', via: [:get]
  match 'form_option/option3' => 'form_option#option3', via: [:get]
  match 'form_option/alma' => 'form_option#alma', via: [:get]
  match 'form_option/alma2' => 'form_option#alma2', via: [:get]
  match 'chilean_joins_international_virtual_observatory' => 'news#chilean_joins_international_virtual_observatory', via: [:get]
  match 'chilean_development_of_astronomical_computing_for_alma' => 'news#chilean_development_of_astronomical_computing_for_alma', via: [:get]
  match 'ivoa_newsletter_012_may_2014' => 'news#ivoa_newsletter_012_may_2014', via: [:get]
end