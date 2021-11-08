class PokemonsController < ApplicationController
  def index
  end

  def show
  end

  def pokemon
    @pokemon ||= Pokemon.find(params[:id])
  end

  def search
    @pokemons = Pokemon.where('LOWER(name) LIKE ?', "%#{params[:search].downcase}%")
    render json: { pokemons: @pokemons }
  end
end
