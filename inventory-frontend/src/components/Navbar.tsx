import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icons for mobile menu

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const logout = authContext?.logout;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="p-4 bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand / Logo */}
        <Link
          to="/"
          className="text-xl font-semibold hover:text-gray-200 transition"
        >
          MyInventory
        </Link>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Nav Links */}
        <ul
          className={`md:flex md:space-x-6 ${
            menuOpen ? "block" : "hidden"
          } absolute md:relative top-16 md:top-0 left-0 md:flex-row bg-blue-600 md:bg-transparent w-full md:w-auto p-4 md:p-0`}
        >
          {user ? (
            <>
              <li>
                <Link
                  to="/dashboard"
                  className="block py-2 px-4 hover:bg-blue-700 rounded-md md:hover:bg-transparent"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="block py-2 px-4 bg-red-500 hover:bg-red-600 rounded-md"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="block py-2 px-4 hover:bg-blue-700 rounded-md"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="block py-2 px-4 bg-green-500 hover:bg-green-600 rounded-md"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
