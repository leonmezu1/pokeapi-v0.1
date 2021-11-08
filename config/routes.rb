Rails.application.routes.draw do
  root 'pokemons#index'
  resources :pokemon, only: %i[index show]
  post 'search', to: 'pokemons#search'
  #get 'pokemons#show'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
