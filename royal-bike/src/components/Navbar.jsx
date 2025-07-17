// src/components/Navbar.jsx
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo_site.png";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const { cartCount, fetchCart } = useCart();
  
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        // Actualizar el carrito cuando el usuario está logueado
        fetchCart();
      } catch (err) {
        console.error("Token inválido:", err);
        localStorage.removeItem("accessToken");
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [fetchCart]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    // Limpiar el contador del carrito al cerrar sesión
    fetchCart();
    window.location.href = "/";
  };

  const toggleMenu = () => setShowMenu(!showMenu);

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
            Inicio
          </a>
          <a
            href="/products"
            className="text-gray-700 hover:text-gray-900 transition"
          >
            Bicicletas
          </a>
          <a
            href="/cart"
            className="relative flex items-center text-gray-700 hover:text-gray-900 transition group"
          >
            <FaShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-yellow-500 transition-colors"/>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </a>
          {user ? (
            <div className="relative">
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={toggleMenu}
              >
                <FaUser className="w-6 h-6 text-gray-700" />
                <span className="text-gray-700 font-medium">
                  {user.username}
                </span>
                <span className="text-gray-600">▼</span>
              </div>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-md z-50">
                  <div className="px-4 py-2 text-sm text-gray-800 border-b">
                    {user.email}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                className="px-4 py-2 border border-amber-300 text-gray-700 rounded hover:bg-blue-50 transition"
                onClick={() => (window.location.href = "/login")}
              >
                Login
              </button>
              <button
                className="px-4 py-2 bg-amber-300 text-white rounded hover:bg-yellow-600 transition"
                onClick={() => (window.location.href = "/register")}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
