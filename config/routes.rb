Notely::Application.routes.draw do
	root :to => 'home#index'
	resources :notes
	resources :sessions, :only => [:create, :destroy]
	resources :users, :only => [:create ]
	match '*a', :to => 'home#index'
end
