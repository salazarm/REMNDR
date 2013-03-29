Notely::Application.routes.draw do
	root :to => 'home#index'
	resources :notes
	resources :sessions, :only => [:create, :destroy]
	resources :users
	match '*a', :to => 'home#index'
end
