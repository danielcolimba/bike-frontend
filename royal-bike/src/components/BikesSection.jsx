import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config/rutes";

const BikesSection = () => {
  const [sellBikes, setSellBikes] = useState([]);
  const { fetchCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(API_ENDPOINTS.TOP_BICYCLES)
      .then((res) => res.json())
      .then((data) => {
        setSellBikes(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleBuyNow = async (productId) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Debes iniciar sesión para agregar productos.");
      return;
    }
    console.log("Token enviado:", token);
    try {
      const res = await fetch(API_ENDPOINTS.CART_ADD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: 1,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Respuesta del servidor no OK:", errorData);
        // Si el token no es válido, redirigir al login
        if (errorData.code === "token_not_valid") {
          alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
          return;
        }
        alert(
          "Error al agregar al carrito: " +
            (errorData.detail || "Error desconocido")
        );
        return;
      }

      const data = await res.json();
      console.log("Producto agregado:", data);
      alert("Producto agregado al carrito exitosamente");
      fetchCart();
      navigate("/cart");
    } catch (error) {
      console.error("Error de red:", error);
      alert("Error de conexión. Por favor, intenta nuevamente.");
    }
  };

  return (
    <section className="py-12 bg-white">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
        Bicicletas Más Vendidas
      </h2>
      <div className="grid md:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto">
        {sellBikes.map((bike, index) => (
          <div key={index} className="bg-gray-100 shadow-md rounded-3xl p-6">
            <img
              src={bike.image_url}
              alt={bike.name}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="text-2xl font-semibold text-gray-800">
              {bike.name}
            </h3>
            <p className="text-gray-600 mt-2">{bike.description}</p>
            <p className="text-3xl text-blue-600 font-bold my-2">
              ${bike.price}
            </p>
            <button
              onClick={() => handleBuyNow(bike.id)}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition duration-200 shadow-lg"
            >
              Comprar ahora
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BikesSection;
