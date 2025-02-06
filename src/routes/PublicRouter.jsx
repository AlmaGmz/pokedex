import { Navigate } from "react-router"
import { useName } from "../hooks/useName"

function PublicRouter({ children }) {
  const { name } = useName()

  if (name){
    return <Navigate to='/pokedex'/>
  }

  return children ? children : <Outlet/>
}

export default PublicRouter