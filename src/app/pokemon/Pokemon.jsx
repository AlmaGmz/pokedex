import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import '../pokemon/styles/Pokemon.scss';

const POKEAPI_BASE = 'https://pokeapi.co/api/v2';

function Pokemon() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    if (!name) {
      console.error("El nombre del Pokémon no es válido.");
      return;
    }

    const fetchPokemon = async () => {
      try {
        const response = await axios.get(`${POKEAPI_BASE}/pokemon/${name}`);
        setPokemon(response.data);
      } catch (error) {
        console.error("Error al obtener los datos del Pokémon", error);
      }
    };

    fetchPokemon();
  }, [name]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }


  const typeColors = {
    fire: '#F08030',
    water: '#6390F0',
    grass: '#7AC74C',
    electric: '#F7D02C',
    psychic: '#F95587',
    ice: '#96D9D6',
    dragon: '#6F35FC',
    dark: '#705848',
    fairy: '#D685AD',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    rock: '#B6A136',
    ghost: '#735797',
    steel: '#B7B7CE',
    bug: '#A8B820',
    normal: '#A8A77A',
  };

  
  const pokemonType = pokemon.types[0].type.name;
  const typeClass = `type--${pokemonType}`;
  const pokemonImage = pokemon.sprites.other['official-artwork'].front_default;


  const statColors = {
    hp: '#FF6347',       
    attack: '#FF9800',   
    defense: '#4CAF50',  
    special_attack: '#3F51B5', 
    special_defense: '#9C27B0', 
    speed: '#2196F3'     
  };

  const getStatColor = (statName) => {
    const name = statName.toLowerCase().replace("-", "_");
    return statColors[name] || '#FF6384';  
  };

  return (
    <div className={`pokemon-container ${typeClass}`}>
      <div className="pokemon-header">
        <h1 className={`pokemon-header__name ${typeClass}`}>{pokemon.name}</h1>

       
        <div
          className="pokemon-types-title"
          style={{
            color: typeColors[pokemonType] || '#A8A77A', 
          }}
        >
          Types
        </div>

        
        <div className="pokemon-types">
          {pokemon.types.map((type, index) => (
            <span
              key={index}
              className="pokemon-header__type"
              style={{
                backgroundColor: typeColors[type.type.name] || '#A8A77A', }}
            >
              {type.type.name}
              {index < pokemon.types.length - 1 && ' / '} 
            </span>
          ))}
        </div>

        <img src={pokemonImage} alt={pokemon.name} />
      </div>

      <div className="pokemon-body">
        <h2 className={`pokemon-stats ${typeClass}`}>Stats</h2>

        
        {pokemon.stats.length > 0 ? (
          <div className="container">
            <div className="row">
              {pokemon.stats.map((stat, index) => (
                <div key={index} className="col-12 col-md-4 mb-3">
                  <div className="progress" style={{ height: '40px' }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${stat.base_stat}%`,
                        backgroundColor: getStatColor(stat.stat.name), 
                      }}
                      aria-valuenow={stat.base_stat}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {stat.stat.name}: {stat.base_stat}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>Unable to load stats data</div>
        )}

         <div
          className="pokemon-moves-title"
          style={{
            color: typeColors[pokemonType] || '#A8A77A', 
          }}
        >
          Moves
        </div>

        
        <div className="pokemon-moves-container">
          {pokemon.moves.slice(0, 10).map((move, index) => (
            <div key={index} className="pokemon-move">
              <span
                style={{
                  backgroundColor: typeColors[pokemonType] || '#A8A77A', 
                }}
              >
                {move.move.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pokemon;
