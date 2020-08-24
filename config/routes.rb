Rails.application.routes.draw do

  devise_for :users
  resources :users do
    resources :syn_data_requests
  end

  root 'pages#home'

  get '/about' => 'pages#about'
  get '/prism_dashboard' => 'pages#prism_dashboard'
  get '/our_methods' => 'pages#our_methods'
  get '/requests/new' => 'syn_data_requests#new'
  get 'user/requests' => 'syn_data_requests#show'

  get '/get_data' => 'prism#get_data'
  get '/get_data_500' => 'prism#get_data_500'
  post '/get_subset' => 'prism#get_subset'

  devise_scope :user do
    get '/sign-in' => "devise/sessions#new", :as => :login
  end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
