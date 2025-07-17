// src/components/Footer.jsx
import {
  FaBars,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import logo from "../assets/logo_site.png";
import { CiMap } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-5">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        {/* Izquierda: logo, menú y redes */}
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Logo y nombre */}
          <div className="flex items-center space-x-4">
            <img src={logo} alt="BikeStore Logo" className="h-10 w-10" />
            <span className="text-3xl font-bold">BikeStore</span>
          </div>

          {/* Enlaces tipo hamburguesa */}
          <nav className="flex flex-col space-y-5">
            <a href="/" className="hover:underline text-base">
              Inicio
            </a>
            <a href="/products" className="hover:underline text-base">
              Bicicletas
            </a>
            
            <a href="/products#accesorios" className="hover:underline text-base">
              Accesorios
            </a>
          </nav>

          {/* Iconos sociales */}
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-400">
              <FaFacebookF size={22} />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaInstagram size={22} />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaTwitter size={22} />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaYoutube size={22} />
            </a>
          </div>
        </div>

        {/* Derecha: horario y ubicación */}
        <div className="flex flex-col items-center text-center space-y-6">
          <h3 className="text-xl font-semibold mb-4">Horarios de atención</h3>
          <ul className="mb-6 space-y-2 text-gray-200">
            <li className="text-xs">Lun – Vie: 9:00 AM – 6:00 PM</li>
            <li className="text-xs">Sab: 10:00 AM – 4:00 PM</li>
            <li className="text-xs">Dom: Cerrado</li>
          </ul>
          <h3 className="text-xl font-semibold mb-4">Contáctenos</h3>
          <ul className="mb-6 space-y-2 text-gray-200">
            <li className="text-xs">Mail: contacto@bikestore.com</li>
            <li className="text-xs">Tel: +593 999 999 999</li>
          </ul>
        </div>

        <div className="flex flex-col items-center text-center">
          {/* Logo and "Where to Find Us?" in the same line */}
          <div className="flex items-center justify-center space-x-4 mb-2">
            <h3 className="text-xl font-semibold flex items-center">
              ¿Dónde encontrarnos? <CiMap size={30} className="ml-2" />
            </h3>
          </div>
          <div className="w-full h-48 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps?q=Avenida+Río+Amazonas+%26+Rumipamba&output=embed"
              width="100%"
              height="100%"
              className="border-0"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
      <p>&copy; 2025 The Royal Bike. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
