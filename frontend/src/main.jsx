import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Global CSS handled by App.jsx via styles/global.css
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
