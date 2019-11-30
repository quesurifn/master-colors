Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/colors/generate', to: 'colors#generate'
  resources :users, param: :_email
  resources :tags
  resources :likes
  resources :colors
  post '/auth/login', to: 'authentication#login'
  get '/*a', to: 'application#not_found'
end
