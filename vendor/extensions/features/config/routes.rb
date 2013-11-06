Refinery::Core::Engine.routes.draw do

  # Frontend routes
  namespace :features do
    resources :features, :path => '', :only => [:index, :show]
  end

  # Admin routes
  namespace :features, :path => '' do
    namespace :admin, :path => Refinery::Core.backend_route do
      resources :features, :except => :show do
        collection do
          post :update_positions
        end
      end
    end
  end

end
