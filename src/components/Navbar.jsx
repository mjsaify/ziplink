import { CiLogin } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useContextProvider } from "../reducer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { LogOutIcon } from "lucide-react";
import { DashboardIcon } from "@radix-ui/react-icons";


const Navbar = () => {
  const { isAuthenticated, LogoutUser, setIsAuthenticated } = useContextProvider();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await LogoutUser();
    if (response.success) {
      setIsAuthenticated(false)
      localStorage.removeItem("isAuthenticated");
      navigate("/login");
    }
  }


  return (
    <header className="container mx-auto px-12 py-8">
      <nav className="flex justify-between items-center">
        <Link to="/">
          <h1 className="gradient-heading text-4xl font-semibold lg:text-5xl">ZipLink</h1>
        </Link>
        <ul className="flex gap-x-6">
          {
            !isAuthenticated ?
              (
                <>
                  <li>
                    <Link to="/login">
                      <button
                        className="flex items-center gap-x-2 border py-2 px-6 rounded-full font-semibold text-base bg-grey text-white border-grey-lite"
                      >
                        Login
                        <CiLogin className="text-2xl text-lite" />
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup">
                      <button
                        className="border py-2 px-6 rounded-full font-semibold text-base bg-brand-primary-blue text-white border-brand-primary-blue"
                      >
                        Register Now
                      </button>
                    </Link>
                  </li>
                </>
              )
              :
              (
                <DropdownMenu>
                  <DropdownMenuTrigger className="rounded-full h-16 w-16 border-2 border-white text-white">Profile</DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <DashboardIcon/>
                      <Link to="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <button type="button" onClick={handleLogout} className="flex text-red-500 outline-none"><LogOutIcon className="w-4 mr-2"/>Logout</button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

              )
          }
        </ul>
      </nav>
    </header>
  )
}

export default Navbar