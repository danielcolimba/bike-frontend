// src/components/ServicesSection.jsx
import { FaBicycle, FaTools, FaUsers } from "react-icons/fa";

const services = [
  {
    id: "venta",
    title: "Venta de bicicletas",
    description:
      "Ofrecemos una gran variedad de bicicletas de calidad para todos los gustos.",
    icon: <FaBicycle size={40} />,
    bgImage: "https://i.ibb.co/G4pvm4D0/sell.jpg",
  },
  {
    id: "mantenimiento",
    title: "Servicio de mantenimiento",
    description:
      "Reparamos, ajustamos y mejoramos tu bicicleta para que esté siempre lista.",
    icon: <FaTools size={40} />,
    bgImage: "https://i.ibb.co/PvyWJGN5/mantain.webp",
  },
  {
    id: "nosotros",
    title: "Sobre nosotros",
    description:
      "Somos apasionados del ciclismo, con años de experiencia en el sector.",
    icon: <FaUsers size={40} />,
    bgImage: "https://i.ibb.co/jk6Jkpfk/about.jpg",
  },
];

const ServicesSection = () => {
return (
    <div className="py-16 px-6 bg-gray-100">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Nuestros Servicios
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service) => (
                <div
                    key={service.id}
                    id={service.id}
                    className="relative rounded-2xl overflow-hidden shadow-lg h-80 flex flex-col items-center justify-center text-white bg-center bg-cover p-4"
                >
                    {/* Imagen de fondo con overlay oscuro */}
                    <div
                        className="absolute inset-0 bg-center bg-cover z-0 flex items-center justify-center"
                        style={{
                            backgroundImage: `url(${service.bgImage})`,
                            filter: "brightness(0.3)", // Oscurece la imagen
                        }}
                    ></div>

                    {/* Contenido en primer plano */}
                    <div className="relative z-10 text-center px-6">
                        <div className="mb-4 flex justify-center">{service.icon}</div>
                        <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                        <p className="text-sm">{service.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
};

export default ServicesSection;
