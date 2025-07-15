import bike1 from '../assets/bike1.png';
import bike2 from '../assets/bike2.png';
import bike3 from '../assets/bike3.png';

const accessories = [
  {
    id: 1,
    name: "Bicicleta de montaña",
    price: "$300",
    originalPrice: "$400",
    image: bike1,
  },
  {
    id: 2,
    name: "Bicicleta urbana",
    price: "$250",
    originalPrice: "$400",
    image: bike2,
  },
  {
    id: 3,
    name: "Bicicleta eléctrica",
    price: "$700",
    originalPrice: "$400",
    image: bike3,
  },
];

const AccessoriesSection = () => {
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
            <div className='flex items-center mt-2 space-x-5'>
              <p className="text-3xl text-yellow-500 font-bold">
                {item.price}
              </p>
              <span className="text-gray-400 line-through text-m font-bold">
                {item.originalPrice}
              </span>
            </div>

            <button className="mt-4 bg-yellow-500 text-gray-900 px-4 py-2 rounded-xl hover:bg-yellow-600 transition">
              Comprar
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AccessoriesSection;