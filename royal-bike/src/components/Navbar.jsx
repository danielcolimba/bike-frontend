// src/components/Navbar.jsx
import { FaShoppingCart } from "react-icons/fa";
import logo from "../assets/logo_site.png";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-2 py-2 flex justify-between items-center">
        {/* Sección izquierda */}
        <div className="flex items-center space-x-8">
          <img src={logo} alt="BikeStore Logo" className="h-16 w-16" />
          <span className="text-4xl font-bold text-amber-300">
            The Royal Bike
          </span>
        </div>

        {/* Sección derecha */}
        <div className="flex items-center space-x-8">
          <a href="/" className="text-gray-700 hover:text-gray-900 transition">
            Home
          </a>
          <a
            href="/products"
            className="text-gray-700 hover:text-gray-900 transition"
          >
            Bicycles
          </a>
          <a
            href="/cart"
            className="flex items-center text-gray-700 hover:text-gray-900 transition"
          >
            <FaShoppingCart /> Cart
          </a>
          <button
            className="px-4 py-2 border border-amber-300 text-gray-700 rounded hover:bg-blue-50 transition"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </button>
          <button className="px-4 py-2 bg-amber-300 text-white rounded hover:bg-blue-700 transition">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
