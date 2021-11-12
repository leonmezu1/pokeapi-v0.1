require "rails_helper"
require "rspec/autorun"

RSpec.describe Pokemon, type: :model do
  let(:pokemon) { build(:pokemon) }

  after(:each) do
    Pokemon.destroy_all
  end

  describe "Model instance creation" do
    it "can be created if valid" do
      expect(pokemon).to be_valid
    end

    it "is invalid when name is empty" do
      pokemon.name = nil
      expect(pokemon).to_not be_valid
    end

    it "is invalid when number is empty" do
      pokemon.number = nil
      expect(pokemon).to_not be_valid
    end

    it "is invalid when image is empty" do
      pokemon.image = nil
      expect(pokemon).to_not be_valid
    end

    it "is invalid when pokemon_type is empty" do
      pokemon.pokemon_type = nil
      expect(pokemon).to_not be_valid
    end

    it "is invalid when weight is empty" do
      pokemon.weight = nil
      expect(pokemon).to_not be_valid
    end

    it "is invalid when abilities is empty" do
      pokemon.abilities = nil
      expect(pokemon).to_not be_valid
    end

    it "is invalid when description is empty" do
      pokemon.description = nil
      expect(pokemon).to_not be_valid
    end

    it "is invalid when evolutions is empty" do
      pokemon.evolutions = nil
      expect(pokemon).to_not be_valid
    end

    it "is invalid when evolution_chain is empty" do
      pokemon.evolution_chain = nil
      expect(pokemon).to_not be_valid
    end
  end
end
