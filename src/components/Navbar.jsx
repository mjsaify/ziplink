import { useState } from 'react';
import { CiLogin } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useContextProvider } from "../reducer";
import { LayoutDashboard, Link2Icon, LogOutIcon, Menu, X } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, LogoutUser, setIsAuthenticated } = useContextProvider();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    const response = await LogoutUser();
    if (response.success) {
      setIsAuthenticated(false)
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("token");
      navigate("/login");
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  const NavItems = () => (
    <>
      {!isAuthenticated ? (
        <>
          <li className="w-full md:w-auto">
            <Link to="/login" className="w-full block">
              <button
                className="w-full md:w-auto flex items-center justify-center gap-x-2 border py-2 px-6 rounded-full font-semibold text-base bg-grey text-white border-grey-lite"
              >
                Login
                <CiLogin className="text-2xl text-lite" />
              </button>
            </Link>
          </li>
          <li className="w-full md:w-auto">
            <Link to="/signup" className="w-full block">
              <button
                className="w-full md:w-auto border py-2 px-6 rounded-full font-semibold text-base bg-brand-primary-blue text-white border-brand-primary-blue"
              >
                Register Now
              </button>
            </Link>
          </li>
        </>
      ) : (
        <>
          <li className="w-full md:w-auto">
            <Link to="/dashboard" className="w-full block">
              <button type="button" className="w-full md:w-auto flex justify-center items-center text-white outline-none py-2 px-4 hover:bg-gray-700 rounded">
                <LayoutDashboard className="mr-2" /> Dashboard
              </button>
            </Link>
          </li>
          <li className="w-full md:w-auto">
            <Link to="/links" className="w-full block">
              <button type="button" className="w-full md:w-auto flex justify-center items-center text-white outline-none py-2 px-4 hover:bg-gray-700 rounded">
                <Link2Icon className="mr-2" /> Links
              </button>
            </Link>
          </li>
          <li className="w-full md:w-auto">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full md:w-auto flex justify-center items-center rounded bg-expired-link text-white p-2 px-4 font-semibold text-base hover:text-white hover:bg-black"
            >
              Logout<LogOutIcon className="w-4 ml-2" />
            </button>
          </li>
        </>
      )}
    </>
  )

  return (
    <header className="py-8 px-6">
      <nav className="">
        <div className="flex justify-between items-center">
          <Link to="/">
            <h1 className="gradient-heading text-4xl font-semibold lg:text-5xl">ZipLink</h1>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-x-6">
            <NavItems />
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4">
            <ul className="flex flex-col items-start gap-y-4">
              <NavItems />
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar