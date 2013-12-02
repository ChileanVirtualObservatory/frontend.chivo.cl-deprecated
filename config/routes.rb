Web::Application.routes.draw do
  root to: 'home#index'
  get 'about', to: 'home#about'
  get 'institutions', to: 'home#institutions'
  post 'query/conesearch'
  get 'query/index'
end