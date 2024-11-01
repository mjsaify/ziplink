import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom"
const RootLayout = () => {
  return (
    <>
      <Navbar />
      <main className="px-6">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default RootLayout