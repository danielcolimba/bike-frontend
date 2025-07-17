/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { API_ENDPOINTS } from "../config/rutes";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const fetchCart = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setCartCount(0);
      return;
    }

    try {
      const res = await fetch(API_ENDPOINTS.CART_VIEW, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        // La nueva estructura devuelve { items: [...] }
        if (data.items && Array.isArray(data.items)) {
          const totalItems = data.items.reduce((sum, item) => sum + item.quantity, 0);
          setCartCount(totalItems);
        } else {
          setCartCount(0);
        }
      } else {
        setCartCount(0);
      }
    } catch (err) {
      console.error("Error al obtener el carrito", err);
      setCartCount(0);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
};