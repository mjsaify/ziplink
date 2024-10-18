import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppContextProvider from './reducer';
import AppRoutes from './routes';
import './index.css'

const router = createBrowserRouter(AppRoutes);


createRoot(document.getElementById('root')).render(
  <AppContextProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  </AppContextProvider>
)
