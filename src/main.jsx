import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppContextProvider from './reducer';
import { Toaster } from './components/ui/toaster';
import { BrowserRouter } from 'react-router-dom'; 
import { AppRouter } from './routes';
import './index.css'
import Navbar from './components/Navbar';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <Navbar/>
        <AppRouter/>
        <Toaster />
      </AppContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
