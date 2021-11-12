class Pokemon < ApplicationRecord
  validates :name, presence: true
  validates :number, presence: true
  validates :image, presence: true
  validates :pokemon_type, presence: true
  validates :weight, presence: true
  validates :abilities, presence: true
  validates :description, presence: true
  validates :evolutions, presence: true
  validates :evolution_chain, presence: true
end
