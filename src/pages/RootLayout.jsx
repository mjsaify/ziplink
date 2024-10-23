import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom"
const RootLayout = () => {
  return (
    <main className="px-6">
      <Navbar />
      <Outlet/>
    </main>
  )
}

export default RootLayout