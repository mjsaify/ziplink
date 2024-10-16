import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import RootLayout from './pages/RootLayout';
import AppContextProvider from './reducer';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <h1 className='text-red-500 text-3xl font-semibold'>404 Page Not Found</h1>,
    children: [],
  }
]);


createRoot(document.getElementById('root')).render(
  <AppContextProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  </AppContextProvider>
)
