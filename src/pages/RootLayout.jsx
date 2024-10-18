import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
const RootLayout = () => {
  return (
    <>
      <Navbar />
      <main className="px-6">
        <Outlet />
      </main>
    </>
  )
}

export default RootLayout