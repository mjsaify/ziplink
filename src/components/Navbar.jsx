import { CiLogin } from "react-icons/ci";

const Navbar = () => {
  return (
    <header className="container px-6 py-8">
      <nav>
        <ul className="flex justify-between items-center">
          <li>
            <h1 className="gradient-heading text-4xl font-semibold">ZipLink</h1>
          </li>
          <li>
            <button
              className="flex items-center gap-x-2 border py-2 px-6 rounded-full font-semibold text-base bg-grey text-white border-grey-lite"
            >
              Login
              <CiLogin className="text-2xl text-lite"/>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar