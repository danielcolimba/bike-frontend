// src/pages/Cart.jsx
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const TAX_RATE = 0.12;

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        alert("Debes iniciar sesión para ver el carrito.");
        window.location.href = "/login";
        return;
      }

      try {
        // Verificar que el token sea válido
        jwtDecode(token);

        // Hacer la petición al backend para obtener los productos del carrito
        const response = await fetch("http://localhost:8000/api/cart/view/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
            localStorage.removeItem("accessToken");
            window.location.href = "/login";
            return;
          }
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Datos del carrito:", data);
        
        // El backend devuelve un objeto con la propiedad items
        if (data.items && Array.isArray(data.items)) {
          setCartItems(data.items);
        } else {
          setCartItems([]);
        }
        
      } catch (err) {
        console.error("Error al obtener el carrito:", err);
        
        if (err.name === "InvalidTokenError") {
          console.error("Token inválido:", err);
          localStorage.removeItem("accessToken");
          window.location.href = "/login";
        } else {
          alert("Error al cargar el carrito. Intenta nuevamente.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);


  const navigate = useNavigate();
  const hasItems = cartItems.length > 0;

  // cálculos de totales
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (parseFloat(item.price) * item.quantity),
    0
  );
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  // Función para actualizar cantidad
  const updateQuantity = async (productId, newQuantity) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const response = await fetch("http://localhost:8000/api/cart/update/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: newQuantity,
        }),
      });

      if (response.ok) {
        // Actualizar el estado local
        setCartItems(cartItems.map(item => 
          item.id === productId ? { ...item, quantity: newQuantity } : item
        ));
      }
    } catch (error) {
      console.error("Error al actualizar cantidad:", error);
    }
  };

  // Función para eliminar item
  const removeItem = async (productId) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const response = await fetch("http://localhost:8000/api/cart/remove/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: productId,
        }),
      });

      if (response.ok) {
        // Actualizar el estado local
        setCartItems(cartItems.filter(item => item.id !== productId));
      }
    } catch (error) {
      console.error("Error al eliminar item:", error);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow p-6">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando carrito...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow p-6">
        {/* Título */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          Tu Carrito de Compras
        </h1>
        <hr className="border-gray-300 mb-6" />

        {!hasItems ? (
          // Estado vacío
          <div className="text-center py-20">
            <FaShoppingCart className="text-gray-400 text-6xl mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Tu carrito está vacío</p>
            <button
              onClick={() => navigate("/products")}
              className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
            >
              Ver Productos
            </button>
          </div>
        ) : (
          // Estado con items
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Lista de productos */}
            <div className="flex-1 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center bg-gray-200 rounded-lg p-4"
                >
                  {/* Imagen */}
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-50 h-30 object-cover rounded"
                  />

                  {/* Detalle del producto */}
                  <div className="flex-1 flex flex-col items-center">
                    <h2 className="text-lg font-semibold text-gray-800 text-center">
                      {item.name}
                    </h2>
                    
                    {/* Tipo de producto */}
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.type === 'bicycle' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {item.type === 'bicycle' ? 'Bicicleta' : 'Accesorio'}
                      </span>
                        <span className="text-xs text-gray-500">
                          Cat: {item.category}
                        </span>
                    </div>

                    {/* Controles de cantidad */}
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        <FaMinus className="text-gray-600" />
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        <FaPlus className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                  {/* Precios */}
                  <div className="flex flex-col text-gray-600 px-4">
                    <span>Precio: ${parseFloat(item.price).toFixed(2)}</span>
                    <span className="mt-2 text-sm">
                      IVA (12%): ${(parseFloat(item.price) * item.quantity * TAX_RATE).toFixed(2)}
                    </span>
                  </div>

                  {/* Botón eliminar */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-red-500 hover:text-red-700 px-7 cursor-pointer"
                  >
                    <FaTrash size={22} />
                  </button>
                </div>
              ))}
            </div>

            {/* Barra lateral de totales */}
            <div className="w-full lg:w-1/3 bg-gray-50 rounded-lg p-6 shadow-inner">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Resumen del Pedido
              </h2>
              
              {/* Detalle por producto */}
              <div className="space-y-2 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm text-gray-600">
                    <span>{item.name} x{item.quantity}</span>
                    <span>${parseFloat(item.subtotal).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <hr className="border-gray-300 mb-4" />
              
              <div className="flex justify-between text-gray-600 mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 mb-4">
                <span>IVA (12%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <hr className="border-gray-300 mb-4" />
              <div className="flex justify-between text-gray-800 text-xl font-bold mb-6">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                onClick={() => {
                  /* lógica de pago */
                }}
                className="w-full py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition"
              >
                Proceder al Pago
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
