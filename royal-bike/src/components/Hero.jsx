import cyclistBanner from "../assets/banner.avif";
import { Link } from "react-router-dom";

// src/components/Hero.jsx
const Hero = () => {
  return (
    <section className="relative h-[400px] flex items-center justify-center text-center overflow-hidden">
      {/* Imagen de fondo del ciclista */}
      <img
        src={cyclistBanner}
        alt="Ciclista heroico"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      {/* Degradado negro de abajo hacia arriba */}
      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 60%, transparent 100%)",
        }}
      ></div>

      {/* Contenido del banner */}
      <div className="relative z-20 max-w-3xl px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
          Viaja como la realeza, todos los días
        </h1>
        <p className="text-lg md:text-xl text-white mb-6">
          Experimenta la emoción de la carretera con motos y equipamiento diseñados para la comodidad, el estilo y la aventura. Únete a una comunidad acogedora en la que se celebra cada viaje, porque tú y tu moto merecéis un trato digno de la realeza.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="/products"
            className="px-6 py-3 bg-amber-400 text-white font-semibold rounded hover:bg-yellow-600 transition"
          >
            Comprar ahora
          </a>
          <Link to="/products#accesorios">
            <button className="px-6 py-3 bg-amber-100 text-gray-700 font-semibold rounded hover:bg-yellow-400 transition">
              Ver Accesorios
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
