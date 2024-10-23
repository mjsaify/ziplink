import { Toaster } from "./components/ui/toaster"
import AppContextProvider from "./reducer"
import { AppRouter } from "./routes"

const App = () => {

  return (
    <AppContextProvider>
      <AppRouter />
      <Toaster />
    </AppContextProvider>
  )
}

export default App