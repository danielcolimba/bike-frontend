import {
  FaTachometerAlt,
  FaPalette,
  FaCogs,
  FaWeightHanging,
  FaShoppingCart,
} from "react-icons/fa";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Products = () => {
  const [bicycles, setBicycles] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchCart } = useCart();
  const location = useLocation();

  useEffect(() => {
    fetch("http://localhost:8000/api/products/")
      .then((res) => res.json())
      .then((data) => {
        const onlyBikes = data.filter((item) => item.type === "bicycle");
        const onlyAccessories = data.filter(
          (item) => item.type === "accessory"
        );

        setBicycles(onlyBikes);
        setAccessories(onlyAccessories);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar los productos:", err);
        setLoading(false);
      });
  }, []);

  // 🔹 Segundo useEffect: scroll a la sección si hay hash
  useEffect(() => {
    if (!loading) {
      const hash = location.hash;
      if (hash) {
        setTimeout(() => {
          const target = document.querySelector(hash);
          if (target) {
            const y = target.getBoundingClientRect().top + window.scrollY - 100; // Ajusta -100 si tienes navbar fija
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }, 100); // Esperar unos ms a que el DOM termine de pintar
      }
    }
  }, [loading, location]);

  const addToCart = async (productId) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Debes iniciar sesión para agregar productos.");
      return;
    }
    console.log("Token enviado:", token);
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
        alert("Error al agregar al carrito: " + (errorData.detail || "Error desconocido"));
        return;
      }

      const data = await res.json();
      console.log("Producto agregado:", data);
      alert("Producto agregado al carrito exitosamente");
      // Actualizar el contador del carrito
      fetchCart();
    } catch (error) {
      console.error("Error de red:", error);
      alert("Error de conexión. Por favor, intenta nuevamente.");
    }
  };

  return (
    <>
      <main className="py-16 bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-12 text-center">
            Nuestras Bicicletas
          </h1>

          {/* Grid de tarjetas */}
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {loading
              ? Array(3)
                  .fill()
                  .map((_, index) => (
                    <div
                      key={index}
                      className="bg-white animate-pulse rounded-2xl shadow-md h-[320px]"
                    ></div>
                  ))
              : bicycles.map((bike) => (
                  <div
                    key={bike.id}
                    className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col h-full"
                  >
                    {/* 1. Imagen */}
                    <img
                      src={bike.image_url}
                      alt={bike.name}
                      className="w-full h-48 object-cover"
                    />

                    {/* 2. Contenido: nombre, descripción, atributos y precio */}
                    <div className="p-6 flex flex-col flex-1 justify-between">
                      {/* 2.1 Título + descripción */}
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                          {bike.name}
                        </h2>
                        <p className="text-gray-600 text-sm mb-4">
                          {bike.description || "Sin descripción disponible."}
                        </p>
                      </div>

                      {/* 2.2 Atributos en grid 2x2 */}
                      <div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-gray-600">
                          <div className="flex items-center space-x-1">
                            <FaTachometerAlt className="text-yellow-500" />
                            <span className="font-bold">Aro:</span>
                            <span className="text-sm">
                              {bike.bicycle?.wheel_size || ""}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FaPalette className="text-yellow-500" />
                            <span className="font-bold">Color:</span>
                            <span className="text-sm">
                              {bike.bicycle?.color || ""}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FaCogs className="text-yellow-500" />
                            <span className="font-bold">Material:</span>
                            <span className="text-sm">
                              {bike.bicycle?.material || ""}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FaWeightHanging className="text-yellow-500" />
                            <span className="font-bold">Peso:</span>
                            <span className="text-sm">
                              {bike.bicycle?.weight
                                ? `${bike.bicycle?.weight} kg`
                                : ""}
                            </span>
                          </div>
                        </div>

                        {/* 2.3 Precio */}
                        <p className="text-yellow-500 text-lg font-bold mt-4">
                          ${bike.price}
                        </p>
                      </div>
                    </div>

                    {/* 3. Footer de botones */}
                    <div className="flex space-x-2 px-6 pb-6">
                      <button className="flex-1 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition">
                        Ver detalles
                      </button>
                      <button
                        onClick={() => addToCart(bike.id)}
                        className="flex-1 py-2 bg-white text-yellow-500 border border-yellow-500 font-semibold rounded-lg hover:bg-gray-100 transition"
                      >
                        <FaShoppingCart className="inline mr-2" />
                        Agregar al carrito
                      </button>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-16">
          <h1
            id="accesorios"
            className="text-4xl font-extrabold text-gray-800 mb-12 text-center"
          >
            Nuestros Accesorios
          </h1>

          {/* Grid de tarjetas */}
          <div className="grid md:grid-cols-4 gap-8 items-stretch">
            {loading
              ? Array(3)
                  .fill()
                  .map((_, index) => (
                    <div
                      key={index}
                      className="bg-white animate-pulse rounded-2xl shadow-md h-[320px]"
                    ></div>
                  ))
              : accessories.map((accesory) => (
                  <div
                    key={accesory.id}
                    className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col h-full"
                  >
                    {/* 1. Imagen */}
                    <img
                      src={accesory.image_url}
                      alt={accesory.name}
                      className="w-full h-48 object-cover"
                    />

                    {/* 2. Contenido: nombre, descripción, atributos y precio */}
                    <div className="p-6 flex flex-col flex-1 justify-between">
                      {/* 2.1 Título + descripción */}
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                          {accesory.name}
                        </h2>
                        <p className="text-gray-600 text-sm mb-4">
                          {accesory.description ||
                            "Sin descripción disponible."}
                        </p>
                      </div>
                      <div>
                        {/* 2.3 Precio */}
                        <p className="text-yellow-500 text-lg font-bold">
                          ${accesory.price}
                        </p>
                      </div>
                    </div>

                    {/* 3. Footer de botones */}
                    <div className="flex space-x-2 px-6 pb-6">
                      <button className="flex-1 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition">
                        Ver detalles
                      </button>
                      <button 
                        onClick={() => addToCart(accesory.id)}
                        className="flex-1 py-2 bg-white text-yellow-500 border border-yellow-500 font-semibold rounded-lg hover:bg-gray-100 transition"
                      >
                        <FaShoppingCart className="inline mr-2" />
                        Agregar al carrito
                      </button>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white text-center py-6">
        <section>
          <Footer />
        </section>
      </footer>
    </>
  );
};

export default Products;
