Rails.application.routes.draw do

  devise_for :users
  root 'pages#home'

  get '/about' => 'pages#about'
  get '/make_request' => 'pages#make_request'
  get '/prism_dashboard' => 'pages#prism_dashboard'
  get '/present_data' => 'pages#present_data'
  devise_scope :user do
    get '/sign-in' => "devise/sessions#new", :as => :login
  end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
