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

  // Cálculos de totales con descuentos
  const subtotalOriginal = cartItems.reduce(
    (sum, item) => sum + (parseFloat(item.price) * item.quantity),
    0
  );

  const totalDescuento = cartItems.reduce(
    (sum, item) => {
      const discount = item.discount || 0;
      const descuentoMonto = (parseFloat(item.price) * item.quantity * discount) / 100;
      return sum + descuentoMonto;
    },
    0
  );

  const subtotal = subtotalOriginal - totalDescuento;
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
      {cartItems.map((item) => {
        const hasDiscount = item.discount && item.discount > 0;
        const originalPrice = parseFloat(item.price);
        const discountAmount = hasDiscount ? (originalPrice * item.discount) / 100 : 0;
        const discountedPrice = originalPrice - discountAmount;
        
        return (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
          >
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Imagen del producto */}
              <div className="flex-shrink-0">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-32 h-32 sm:w-40 sm:h-32 object-cover rounded-lg border border-gray-100"
                />
              </div>

              {/* Información del producto */}
              <div className="flex-1 min-w-0">
                {/* Header con nombre y badges */}
                <div className="mb-3">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.name}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
                      item.type === 'bicycle' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {item.type === 'bicycle' ? 'Bicicleta' : 'Accesorio'}
                    </span>
                    {hasDiscount ? (
                      <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                        -{item.discount}% OFF
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                        Sin descuento
                      </span>
                    )}
                  </div>
                </div>

                {/* Controles de cantidad y precios */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  {/* Controles de cantidad */}
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700 mr-3">Cantidad:</span>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="p-2 hover:bg-gray-50 transition-colors rounded-l-lg"
                      >
                        <FaMinus className="w-3 h-3 text-gray-600" />
                      </button>
                      <span className="px-4 py-2 text-sm font-medium border-x border-gray-300 min-w-[50px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-50 transition-colors rounded-r-lg"
                      >
                        <FaPlus className="w-3 h-3 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Información de precios */}
                  <div className="text-right">
                    <div className="space-y-1">
                      {hasDiscount ? (
                        <>
                          <div className="text-sm text-gray-500">
                            <span className="line-through">Precio: ${originalPrice.toFixed(2)}</span>
                          </div>
                          <div className="text-sm text-green-600">
                            Precio con descuento: ${discountedPrice.toFixed(2)}
                          </div>
                        </>
                      ) : (
                        <div className="text-sm font-semibold text-gray-900">
                          Precio: ${originalPrice.toFixed(2)}
                        </div>
                      )}
                      
                      <div className="text-sm text-gray-600">
                        IVA (12%): ${(discountedPrice * item.quantity * TAX_RATE).toFixed(2)}
                      </div>
                      
                      <div className="text-lg font-bold text-gray-900 border-t border-gray-200 pt-1">
                        Subtotal: ${(discountedPrice * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón eliminar */}
              <div className="flex-shrink-0 flex sm:flex-col justify-end items-start">
                <button
                  onClick={() => removeItem(item.id)}
                  className="inline-flex items-center justify-center w-10 h-10 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  title="Eliminar producto"
                >
                  <FaTrash size={16} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>

    {/* Barra lateral de totales */}
    <div className="w-full lg:w-96 bg-gray-50 rounded-xl p-6 shadow-sm h-fit sticky top-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Resumen del Pedido
      </h2>
      
      {/* Detalle por producto */}
      <div className="space-y-3 mb-6">
        {cartItems.map((item) => {
          const hasDiscount = item.discount && item.discount > 0;
          const originalPrice = parseFloat(item.price);
          const discountedPrice = hasDiscount 
            ? originalPrice - (originalPrice * item.discount) / 100 
            : originalPrice;
          const subtotalItem = discountedPrice * item.quantity;
          
          return (
            <div key={item.id} className="flex justify-between items-center text-sm">
              <span className="text-gray-700 flex-1 mr-2">
                {item.name} <span className="text-gray-500">×{item.quantity}</span>
              </span>
              <span className="font-medium text-gray-900">
                ${subtotalItem.toFixed(2)}
              </span>
            </div>
          );
        })}
      </div>
      
      <hr className="border-gray-300 mb-6" />
      
      {/* Cálculos de totales */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal original</span>
          <span>${subtotalOriginal.toFixed(2)}</span>
        </div>
        
        {totalDescuento > 0 && (
          <div className="flex justify-between text-green-600 font-medium">
            <span>Descuentos aplicados</span>
            <span>-${totalDescuento.toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-gray-600">
          <span>IVA (12%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>
      
      <hr className="border-gray-300 mb-6" />
      
      <div className="flex justify-between items-center text-xl font-bold text-gray-900 mb-6">
        <span>Total</span>
        <span className="text-2xl text-yellow-600">${total.toFixed(2)}</span>
      </div>
      
      <button
        onClick={() => {
          /* lógica de pago */
        }}
        className="w-full py-4 bg-yellow-500 text-white font-semibold text-lg rounded-xl hover:bg-yellow-600 transition-colors shadow-lg hover:shadow-xl"
      >
        Proceder al Pago
      </button>
      
      <button
        onClick={() => navigate("/products")}
        className="w-full mt-3 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
      >
        Continuar Comprando
      </button>
    </div>
  </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
