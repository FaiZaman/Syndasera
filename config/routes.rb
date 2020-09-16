Rails.application.routes.draw do

  devise_for :users
  resources :users do
    resources :syn_data_requests
  end

  root 'pages#home'

  get '/about' => 'pages#about'
  get '/prism_evaluation' => 'pages#prism_evaluation'
  get '/prism_dashboard' => 'pages#prism_dashboard'
  get '/our_methods' => 'pages#our_methods'
  get '/requests/new' => 'syn_data_requests#new'
  get 'user/requests' => 'syn_data_requests#index'
  get 'user/requests/show' => 'syn_data_requests#show'

  get '/get_data' => 'prism#get_data'
  get '/get_data_500' => 'prism#get_data_500'
  get '/get_data_1000' => 'prism#get_data_1000'
  post '/filter_data' => 'prism#filter_data'

  get '/get_tSNE_data' => 'eval#get_tSNE_data'
  get '/get_PCA_data' => 'eval#get_PCA_data'
  get '/get_tPred_data' => 'eval#get_tPred_data'
  get '/get_MSE3_data' => 'eval#get_MSE3_data'
  get '/get_cat_data' => 'eval#get_cat_data'
  get '/get_num_data' => 'eval#get_num_data'
  get '/get_num_data_5000' => 'eval#get_num_data_5000'
  get '/get_MSE1_data' => 'eval#get_MSE1_data'
  get '/get_auto_visit_data' => 'eval#get_auto_visit_data'
  get '/get_auto_malaria_data' => 'eval#get_auto_malaria_data'

  devise_scope :user do
    get '/sign-in' => "devise/sessions#new", :as => :login
  end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
