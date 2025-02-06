import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import './index.css'
import AppRouter from './routes/AppRouter.jsx'
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <AppRouter />
  </HashRouter>,
)
