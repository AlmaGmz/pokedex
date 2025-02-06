import { useRef, useState } from "react"
import { useNavigate } from "react-router"
import { useName } from "../../hooks/useName"
import './styles/Home.scss'

function Home() {
  const inputRef = useRef()
  const { setName, name } = useName()
  const navigate = useNavigate()
  
 
  const [errorMessage, setErrorMessage] = useState("")

  const handleSetName = () => {
    if (!inputRef.current.value) {
      setErrorMessage("You must enter your name to continue")
      return
    }

    
    setName(inputRef.current.value)
    navigate("/pokedex")
  }

  return (
    <div className="home">
      <h1 className="home__title">POKEDEX</h1>
      <h2 className="home__subtitle">Hello Coach!</h2>
      <p className="home__text">To start, tell me your name</p>
      
      <input 
        type="text" 
        ref={inputRef}
        placeholder="Your name"
        onKeyDown={(e) => e.key === 'Enter' && handleSetName()} 
      />
     <button className="btn__star" onClick={handleSetName}>Start</button>
      {errorMessage && <p className="error-message-home">{errorMessage}</p>}

      
    </div>
  )
}

export default Home
