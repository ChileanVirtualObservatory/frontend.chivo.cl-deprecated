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
end