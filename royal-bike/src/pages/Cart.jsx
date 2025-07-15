// src/pages/Cart.jsx
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaPlus, FaMinus, FaTrash } from "react-icons/fa";

const list_of_products = [
  {
    id: 1,
    name: "Speedster Road 300",
    image_url: "https://example.com/images/speedster.jpg",
    price: 999.99,
    quantity: 2,
    weight: 8.5,
    color: "Rojo",
    material: "Aluminio",
    wheel_size: "700c",
  },
  {
    id: 2,
    name: "Mountain Climber XT",
    image_url: "https://example.com/images/climber.jpg",
    price: 1249.5,
    quantity: 1,
    weight: 12.2,
    color: "Negro",
    material: "Carbono",
    wheel_size: '29"',
  },
  {
    id: 3,
    name: "Urban Glide 2.0",
    image_url: "https://example.com/images/urban.jpg",
    price: 789.0,
    quantity: 3,
    weight: 10.0,
    color: "Gris",
    material: "Acero",
    wheel_size: "700c",
  },
];

const TAX_RATE = 0.12;

const Cart = ({
  cartItems = list_of_products,
  increment,
  decrement,
  remove,
}) => {
  const navigate = useNavigate();
  const hasItems = cartItems.length > 0;

  // cálculos de totales
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow p-6">
        {/* Título */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          Your Shopping Cart
        </h1>
        <hr className="border-gray-300 mb-6" />

        {!hasItems ? (
          // Estado vacío
          <div className="text-center py-20">
            <FaShoppingCart className="text-gray-400 text-6xl mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <button
              onClick={() => navigate("/products")}
              className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
            >
              Go to Products
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
                  className="flex items-center bg-gray-50 rounded-lg p-4"
                >
                  {/* Imagen */}
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />

                  {/* Detalle del producto */}
                  <div className="flex-1 flex flex-col items-center">
                    <h2 className="text-lg font-semibold text-gray-800 text-center">
                      {item.name}
                    </h2>

                    {/* Controles de cantidad */}
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => decrement(item.id)}
                        className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        <FaMinus className="text-gray-600" />
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        onClick={() => increment(item.id)}
                        className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        <FaPlus className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                  {/* Precios */}
                  <div className="flex flex-col text-gray-600 px-4">
                    <span>Price: ${item.price.toFixed(2)}</span>
                    <span className="mt-4">+VAT: ${(item.price * TAX_RATE).toFixed(2)}</span>
                  </div>

                  {/* Botón eliminar */}
                  <button
                    onClick={() => remove(item.id)}
                    className="p-2 text-red-500 hover:text-red-700 px-7 cursor-pointer"
                  >
                    <FaTrash size={22}/>
                  </button>
                </div>
              ))}
            </div>

            {/* Barra lateral de totales */}
            <div className="w-full lg:w-1/3 bg-gray-50 rounded-lg p-6 shadow-inner">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Order Summary
              </h2>
              <div className="flex justify-between text-gray-600 mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 mb-4">
                <span>VAT (12%)</span>
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
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
