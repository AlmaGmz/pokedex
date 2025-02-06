import PokemonCard from "./PokemonCard"
import '../styles/PokemonList.scss'

function PokemonList({pokemons}) {
  return (
    <div className="pokelist">
    {pokemons.map(pokemon => 
      <PokemonCard
       key={pokemon.name}
       url={pokemon.url}/>
    )}
    </div>
  )
}

export default PokemonList