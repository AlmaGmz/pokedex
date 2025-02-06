import { useEffect, useState } from "react"
import axios from "axios"
import { useName } from "../../hooks/useName"
import PokemonList from "./components/PokemonList"
import { Link } from "react-router"
import '/src/app/pokedex/styles/Pokedex.scss'

const POKEAPI_BASE = 'https://pokeapi.co/api/v2'

function Pokedex () {
  const [pokemons, setPokemons] = useState([])  
  const [filteredPokemons, setFilteredPokemons] = useState([])  
  const [search, setSearch] = useState('')  
  const [types, setTypes] = useState([])  
  const [selectedType, setSelectedType] = useState('all')  
  const [singlePokemon, setSinglePokemon] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')  
  const [loading, setLoading] = useState(false)  

  // Paginación
  const [itemsPerPage, setItemsPerPage] = useState(21);  
  const [currentPage, setCurrentPage] = useState(1);  

  const { name, clearName } = useName()

  const getInitialPokemons = () => {
    setLoading(true)
    axios
      .get(`${POKEAPI_BASE}/pokemon?limit=500`)
      .then(({ data }) => {
        setPokemons(data.results)
        setFilteredPokemons(data.results)
        setSinglePokemon(null)
        setErrorMessage('')
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getInitialPokemons()
  },[])

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${POKEAPI_BASE}/type?limit=18`)
      .then(({ data }) => {
        console.log(data.results)
        setTypes(data.results)})
      .finally(() => setLoading(false))
  },[])

  useEffect(() => {
    if (!search) {
      setFilteredPokemons(pokemons)
      setSinglePokemon(null)
      setErrorMessage('')
      return
    }
    setFilteredPokemons(
      pokemons.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search, pokemons])

  useEffect(() => {
    if (selectedType === 'all') {
      getInitialPokemons()
      return
    }
    setLoading(true)
    axios.get(`${POKEAPI_BASE}/type/${selectedType}`)
      .then(({ data }) => {
        const typePokemons = data.pokemon.map(p => p.pokemon)
        setPokemons(typePokemons)
        setFilteredPokemons(typePokemons)
        setSinglePokemon(null)
        setErrorMessage('')
      })
      .finally(() => setLoading(false))
  }, [selectedType])

  const searchPokemon = () => {
    if (!search) {
      getInitialPokemons()
      setErrorMessage('')
      return
    }
    setLoading(true)
    axios.get(`${POKEAPI_BASE}/pokemon/${search}`)
      .then(({ data }) => {
        if (selectedType !== 'all') {
          const isOfType = data.types.some(t => t.type.name === selectedType)
          if (!isOfType) {
            setSinglePokemon(null)
            setErrorMessage('The pokemon is not of the selected type')
            return
          }
        }
        setSinglePokemon(data)
        setErrorMessage('')
      })
      .catch(() => {
        setSinglePokemon(null)
        setErrorMessage('Pokemon not found')
      })
      .finally(() => setLoading(false))
  }

  
  const paginatePokemons = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredPokemons.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="pokedex">
      <h1 className="pokedex__title">POKEDEX</h1>
      {name && (
        <div>
          <p className="pokedex__text"> Welcome {name}, here you can find your favorite pokemon</p>
          <button className="btn__exit" onClick={clearName}>Exit</button>
        </div>
      )}
      <input 
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Filter or search by name or id"
        onKeyDown={(e) => e.key === 'Enter' && searchPokemon()}
      />
      <button className="btn" onClick={searchPokemon}>Search</button>
      <select 
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="all" className="btn__all">All</option>
        {types.map(type => (
          <option key={type.name} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>

      
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      
      <div className="pagination">
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>

      
      {loading ? (
        <p className="loading-message">Loading...</p>
      ) : (
        singlePokemon ? (
          <Link to={`/pokedex/${singlePokemon.name}`}>
            <h2>{singlePokemon?.name}</h2>
            <img src={singlePokemon?.sprites?.other['official-artwork']?.front_default} alt={singlePokemon.name} />
          </Link>
        ) : (
          <PokemonList pokemons={paginatePokemons()} />
        )
      )}
    </div>
  )
}

export default Pokedex
