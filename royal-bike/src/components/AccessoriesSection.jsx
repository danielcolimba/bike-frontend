import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const AccessoriesSection = () => {
  const [listGear, setListGear] = useState([]);
  const { fetchCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
      fetch("http://localhost:8000/api/gear-discounts/")
        .then((res) => res.json())
        .then((data) => {
          setListGear(data);
        })
        .catch((err) => console.error(err));
    }, []);

  

  const accessories = listGear.map((item) => ({
    name: item.name,
    image: item.image_url,
    price: item.price - (item.price * item.discount / 100),
    originalPrice: item.price,
    id: item.id
  }));

  const handleBuyNow = async (productId) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Debes iniciar sesión para agregar productos.");
      return;
    }
    try {
      const res = await fetch("http://localhost:8000/api/cart/add/", {
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
    <section className="py-12 bg-gray-900">
      <h2 className="text-4xl font-extrabold text-center text-white mb-10">
        Accesorios con Descuento
      </h2>
      <div className="grid md:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto">
        {accessories.map((item, index) => (
          <div
            key={index}
            className="relative bg-gray-800 shadow-lg rounded-3xl p-6"
          >

            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />

            <h3 className="text-2xl font-semibold text-white">
              {item.name}
            </h3>

            {/* Precio con descuento */}
            {/* Mostrar precio con descuento y a un lago el precio original tachado */}
            <div className='flex items-center mt-2 '>
            
              

              <p className="text-3xl text-yellow-500 font-bold">
                $ {item.price}
              </p>
              <span className="text-gray-400 line-through text-m font-bold ml-4">
                {item.originalPrice}
              </span>
            </div>

            <button onClick={() => handleBuyNow(item.id)}
            className="mt-4 bg-yellow-500 text-gray-900 px-4 py-2 rounded-xl hover:bg-yellow-600 transition">
              Comprar
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AccessoriesSection;