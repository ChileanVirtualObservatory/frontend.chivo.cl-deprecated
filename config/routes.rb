Web::Application.routes.draw do
  root to: 'home#index'
  get 'about', to: 'home#about'
  get 'institutions', to: 'home#institutions'
  
  match 'query' => 'query#index', via: [:post, :get]
  match 'query/conesearch' => 'query#conesearch', via: [:get, :post]
  match 'query/imagesearch' => 'query#imagesearch', via: [:get, :post]
  match 'query/spectralsearch' => 'query#spectralsearch', via: [:get, :post]
  match 'query/tablesearch' => 'query#tablesearch', via: [:get, :post]
  match 'query/advancesearch' => 'query#advancesearch', via: [:get, :post]
end