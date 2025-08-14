
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// to navigate between pages
import { BrowserRouter } from 'react-router-dom'
// importing ClerkProvider
 import { ClerkProvider } from '@clerk/clerk-react'
// importing Publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY


if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById('root')).render(
  
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
   
)
