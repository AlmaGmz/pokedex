import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router"
import '../styles/PokemonCard.scss'

function PokemonCard({ url }) {
  const [pokemon, setPokemon] = useState({})

    useEffect(() => {
      axios
      .get(url)
      .then (({ data }) =>{
      console.log(data);
      setPokemon(data)})

    }, [url])

    if (!pokemon) return <p>Loading...</p>

    const types = pokemon?.types?.map(t => t.type.name) ||[]
    console.log("Tipos:",types)
  const ability = pokemon?.abilities?.map(a => a.ability.name)

  const [hp, attack, defense, , , speed] = pokemon?.stats || []


  return (
    <Link to={`/pokedex/${pokemon.name}`} className={`pokecard type--${types?.[0]}`}>
      <div className="pokecard__header">
        <img
          className="pokecard__header-img"
          src={pokemon?.sprites?.other['official-artwork']?.front_default}
          alt={pokemon.name}
        />
      </div>
      <div className="pokecard__body">
        <h2 className="pokecard__body-name">{pokemon?.name}</h2>
        <p className="pokecard__types-label">Types</p>
        <h3 className="pokecard__body-types">{types?.join(' / ')}</h3>
       
        <div className="pokecard__stats">
          <div className="pokecard__stats-item">
            hp <span>{hp?.base_stat}</span> </div>        
          <div className="pokecard__stats-item">
            attack <span>{attack?.base_stat}</span>
          </div>
          <div className="pokecard__stats-item">
            defense <span>{defense?.base_stat}</span>
          </div>
          <div className="pokecard__stats-item">
            speed <span>{speed?.base_stat}</span>
          </div>
        </div>
      </div> 
      </Link>
  )
}
export default PokemonCard