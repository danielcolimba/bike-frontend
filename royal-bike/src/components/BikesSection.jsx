import { useEffect, useState } from "react";

const BikesSection = () => {
  const [sellBikes, setSellBikes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/top-bicycles/")
      .then((res) => res.json())
      .then((data) => {
        setSellBikes(data);
      })
      .catch((err) => console.error(err));
  }, []);

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
            <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition duration-200 shadow-lg">
              Comprar ahora
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BikesSection;
